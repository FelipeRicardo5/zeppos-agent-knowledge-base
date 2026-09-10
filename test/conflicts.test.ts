import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrich } from "../src/enrich/index.js";
import { renderConflicts } from "../src/render/conflicts.js";
import type { RawUnit } from "../src/types.js";

// Eval 01 called conflict reporting the purest moat this project has: the
// disagreement exists only because several fronts are merged, so no upstream
// page and no agent reading the official site can see it.
//
// What the measurement changed is the shape. Scalar fields barely disagree at
// all — the tests below pin why the comparison has to be normalised, and why
// the interesting cases are structural instead.

function unit(overrides: Partial<RawUnit> & Pick<RawUnit, "sourceKind">): RawUnit {
  return {
    module: "@zos/sensor",
    symbol: "Weather",
    kind: "function",
    sourceFile: path.join("zeppos-docs", "docs", "reference", "Weather.mdx"),
    ...overrides,
  };
}

describe("enrich conflicts", () => {
  it("does not call a trailing full stop a disagreement", () => {
    // Raw, 147 of 513 symbols "disagree" about their description, and every one
    // of them is punctuation or the `permission code:` note the reference page
    // carries and the llms dump drops. Reporting those buries the one that
    // matters.
    const [record] = enrich([
      unit({ sourceKind: "docs-reference", description: "Weather Forecasts sensor." }),
      unit({ sourceKind: "llms", description: "Weather Forecasts sensor" }),
    ]);

    assert.equal(record.conflicts, undefined);
  });

  it("ignores a permission note only one source carries", () => {
    const [record] = enrich([
      unit({
        sourceKind: "docs-reference",
        description: "Blood oxygen sensor. permission code: `data:user.hd.spo2`",
      }),
      unit({ sourceKind: "llms", description: "Blood oxygen sensor" }),
    ]);

    assert.equal(record.conflicts, undefined);
  });

  it("reports a description that still differs after normalising", () => {
    // The one real case in the corpus: the reference page marks `Weather`
    // deprecated in a `:::warning` block and `static/llms` describes it as
    // current. An agent given the losing version recommends a dead API.
    const [record] = enrich([
      unit({
        sourceKind: "docs-reference",
        description: "This interface has been deprecated. Weather Forecasts sensor",
      }),
      unit({ sourceKind: "llms", description: "Weather Forecasts sensor" }),
    ]);

    assert.equal(record.conflicts?.length, 1);
    assert.equal(record.conflicts?.[0].field, "description");
    assert.deepEqual(
      record.conflicts?.[0].claims.map((c) => c.source),
      ["docs-reference", "llms"],
    );
    // The winner is first, so a reader can see what the record resolved to.
    assert.match(record.description ?? "", /deprecated/);
  });

  it("reports a disagreement about API_LEVEL", () => {
    // None exists today — the one axis the project claims works never
    // disagrees — so this pins the detector rather than a finding.
    const [record] = enrich([
      unit({ sourceKind: "docs-reference", apiLevel: 3 }),
      unit({ sourceKind: "llms", apiLevel: 2 }),
    ]);

    assert.deepEqual(
      record.conflicts?.map((c) => c.field),
      ["apiLevel"],
    );
  });

  it("never reports `kind`, which is this extractor's guess and not a claim", () => {
    // The two fronts disagree about it 98 times: `parseMarkdown` guesses from
    // the page text and `parseLlmsContent` hardcodes `function`. Reporting it
    // would dress a bug of ours as a contradiction of theirs.
    const [record] = enrich([
      unit({ sourceKind: "docs-reference", kind: "value" }),
      unit({ sourceKind: "llms", kind: "function" }),
    ]);

    assert.equal(record.conflicts, undefined);
  });
});

const symbol = (over: Record<string, unknown>) => ({
  id: `${over.module}.${over.symbol}`,
  type: "function",
  runtimes: ["device-app"],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/x.mdx",
  extractedAt: "2026-09-10",
  ...over,
});

const example = (over: Record<string, unknown>) => ({
  id: "demo",
  name: "demo",
  tree: "application",
  platformVersion: "4.2",
  files: [],
  usages: [],
  memberCalls: [],
  globalCalls: [],
  symbols: [],
  runtimes: ["device-app"],
  source: "sample-app",
  confidence: "OBSERVED",
  originalPath: "zeppos-samples/application/4.2/demo",
  extractedAt: "2026-09-10",
  ...over,
});

async function fixture(modules: Record<string, unknown>, examples: Record<string, unknown>[]) {
  const root = await mkdtemp(path.join(os.tmpdir(), "conflicts-"));
  const symbolsDir = path.join(root, "symbols");
  const examplesDir = path.join(root, "examples");
  await mkdir(symbolsDir, { recursive: true });
  await mkdir(examplesDir, { recursive: true });
  for (const [slug, value] of Object.entries(modules)) {
    await writeFile(path.join(symbolsDir, `${slug}.json`), JSON.stringify(value));
  }
  for (const e of examples) {
    await writeFile(path.join(examplesDir, `${e.id as string}.json`), JSON.stringify(e));
  }
  return { symbolsDir, examplesDir, out: path.join(root, "out") };
}

describe("render conflicts", () => {
  it("reports a value written in code one edit from a documented symbol", async () => {
    // `widget.GRADKIENT_POLYLINE` is written in official sample code and in the
    // watchface reference; `GRADIENT_POLYLINE` is the page. Both are OFFICIAL
    // and one of them does not work.
    const { symbolsDir, examplesDir, out } = await fixture(
      {
        "zos-ui": {
          module: "@zos/ui",
          symbols: [
            symbol({ module: "@zos/ui", symbol: "GRADIENT_POLYLINE" }),
            symbol({
              module: "@zos/ui",
              symbol: "widget",
              enums: [
                {
                  name: "widget",
                  qualified: true,
                  members: [{ value: "GRADKIENT_POLYLINE", confidence: "OBSERVED" }],
                },
              ],
            }),
          ],
        },
      },
      [],
    );

    await renderConflicts(symbolsDir, examplesDir, out);
    const page = await readFile(path.join(out, "conflicts", "index.md"), "utf-8");

    assert.match(page, /`widget\.GRADKIENT_POLYLINE`/);
    assert.match(page, /GRADIENT_POLYLINE/);
  });

  it("does not compare names too short to collide meaningfully", async () => {
    // `prop.SRC` and the `ARC` widget are one edit apart and unrelated. At
    // three characters an edit distance says nothing, and that pair is the only
    // false positive the length floor removes from the real corpus.
    const { symbolsDir, examplesDir, out } = await fixture(
      {
        "zos-ui": {
          module: "@zos/ui",
          symbols: [
            symbol({ module: "@zos/ui", symbol: "ARC" }),
            symbol({
              module: "@zos/ui",
              symbol: "prop",
              enums: [
                { name: "prop", qualified: true, members: [{ value: "SRC", confidence: "OFFICIAL" }] },
              ],
            }),
          ],
        },
      },
      [],
    );

    await renderConflicts(symbolsDir, examplesDir, out);
    const page = await readFile(path.join(out, "conflicts", "index.md"), "utf-8");

    assert.doesNotMatch(page, /prop\.SRC/);
  });

  it("resolves a method call inside the sample's own runtime", async () => {
    // The watchface front made `@zos/ui.setProperty` and `hmUI.setProperty`
    // share a name. They are two APIs for two runtimes, not two readings of one
    // call, and the sample says which it is. Taking the union across samples
    // turned every shared name into a false conflict.
    const { symbolsDir, examplesDir, out } = await fixture(
      {
        "zos-ui": {
          module: "@zos/ui",
          symbols: [symbol({ module: "@zos/ui", symbol: "setProperty", runtimes: ["device-app"] })],
        },
        hmUI: {
          module: "hmUI",
          symbols: [symbol({ module: "hmUI", symbol: "setProperty", runtimes: ["watchface"] })],
        },
      },
      [
        example({ id: "app", runtimes: ["device-app"], memberCalls: [{ method: "setProperty", snippets: [] }] }),
        example({ id: "face", runtimes: ["watchface"], memberCalls: [{ method: "setProperty", snippets: [] }] }),
      ],
    );

    const { conflicts } = await renderConflicts(symbolsDir, examplesDir, out);
    const page = await readFile(path.join(out, "conflicts", "index.md"), "utf-8");

    assert.equal(conflicts, 0);
    assert.match(page, /Every method seen in sample code matches exactly one thing/);
  });

  it("reports a call that matches both a module symbol and an instance member", async () => {
    // The claim the base was getting wrong: `.getItem()` was reported as
    // `settings-storage.getItem`, a Settings App function, in Device App
    // samples where it is `localStorage.getItem`.
    const { symbolsDir, examplesDir, out } = await fixture(
      {
        "zos-storage": {
          module: "@zos/storage",
          symbols: [
            symbol({
              module: "@zos/storage",
              symbol: "localStorage",
              members: [{ name: "getItem" }],
            }),
          ],
        },
        "settings-storage": {
          module: "settings-storage",
          symbols: [symbol({ module: "settings-storage", symbol: "getItem" })],
        },
      },
      [example({ id: "app", memberCalls: [{ method: "getItem", snippets: [] }] })],
    );

    await renderConflicts(symbolsDir, examplesDir, out);
    const page = await readFile(path.join(out, "conflicts", "index.md"), "utf-8");

    assert.match(page, /`\.getItem\(\)`/);
    assert.match(page, /`settings-storage\.getItem`/);
    assert.match(page, /`@zos\/storage\.localStorage`/);
  });
});

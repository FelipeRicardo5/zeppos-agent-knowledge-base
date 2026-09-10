import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichAppJson } from "../src/enrich/index.js";
import { parseAppJson } from "../src/parse/manifest.js";
import { renderManifest } from "../src/render/manifest.js";
import type { AppJsonRecord, ExampleRecord, ManifestSection, SymbolRecord } from "../src/types.js";

const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const page = async (): Promise<{
  sections: Map<string, ManifestSection>;
  record: Awaited<ReturnType<typeof parseAppJson>>[number];
}> => {
  const [record] = await parseAppJson(CACHE);
  return { sections: new Map(record.sections.map((s) => [s.path, s])), record };
};

describe("parseAppJson", () => {
  it("reads the whole key tree from one page", async () => {
    const { record } = await page();

    assert.deepEqual(
      record.sections.map((s) => s.path),
      [
        "",
        "configVersion",
        "app",
        "app.version",
        "permissions",
        "targets",
        "targets.module",
        "targets.module.page",
        "targets.module.app-side",
        "targets.module.setting",
        "targets.platforms",
        "targets.designWidth",
      ],
    );
  });

  it("nests by row membership, not by heading depth", async () => {
    // The trap this front exists to avoid. `### module: object` is a child of
    // `targets` written at the same depth as `targets` itself, while
    // `#### platforms` is its sibling one level deeper. Reading `#` would file
    // `module` at the root and `platforms` under `module`.
    const { sections } = await page();

    assert.equal(sections.get("targets.module")?.parent, "targets");
    assert.equal(sections.get("targets.platforms")?.parent, "targets");
    assert.equal(sections.get("targets.module.page")?.parent, "targets.module");
  });

  it("does not read `Minimum Version` as an API_LEVEL", async () => {
    // The column holds `v2`/`v3` — the configVersion of the file. Filing it as a
    // number would claim `appId` needs API_LEVEL 2.
    const { sections } = await page();
    const appId = sections.get("app")?.props.find((p) => p.name === "appId");

    assert.equal(appId?.minConfigVersion, "v2");
    assert.equal(Object.hasOwn(appId ?? {}, "apiLevel"), false);
  });

  it("keeps a conditional Required cell verbatim instead of flattening it", async () => {
    // "YES, required when `appType` is `app`." is not `true`: reducing it would
    // claim every watchface needs a `page` module.
    const { sections } = await page();
    const props = sections.get("targets.module")?.props ?? [];
    const pageKey = props.find((p) => p.name === "page");
    const appSide = props.find((p) => p.name === "app-side");

    assert.equal(pageKey?.required, undefined);
    assert.equal(pageKey?.requiredNote, "YES, required when appType is app.");
    assert.equal(appSide?.required, false);
    assert.equal(appSide?.requiredNote, undefined);
  });

  it("reports an object key the page never describes rather than dropping it", async () => {
    const { record } = await page();

    assert.deepEqual(
      record.gaps.map((gap) => gap.path),
      ["targets.module.app-service"],
    );
    assert.equal(record.gaps[0].description, "The configuration of Background Service.");
  });

  it("attributes a runtime only to the module entry points that state one", async () => {
    const { sections } = await page();

    assert.equal(sections.get("targets.module.app-side")?.runtime, "side-service");
    assert.equal(sections.get("targets.module.setting")?.runtime, "settings");
    assert.equal(sections.get("targets.module.page")?.runtime, "device-app");
    // A key outside `module` configures no runtime, however object-shaped.
    assert.equal(sections.get("targets.platforms")?.runtime, undefined);
    assert.equal(sections.get("app.version")?.runtime, undefined);
  });

  it("places an example on the key it illustrates, not the heading above it", async () => {
    // The page shows the whole `app` object *after* the `version` subsection, so
    // attributing a fence to the heading it follows files the `app` example
    // under `app.version`. Every example here is a one-key object naming what it
    // is about, which is the more reliable signal.
    const { sections } = await page();

    assert.deepEqual(
      sections.get("app")?.examples.map((e) => e.line),
      [45],
      "the one-key `app` example belongs to `app`, not to the heading above it",
    );
    assert.deepEqual(sections.get("app.version")?.examples, []);
    assert.deepEqual(
      sections.get("targets.platforms")?.examples.map((e) => e.line),
      [109],
    );
  });

  it("keeps the whole-file example without filing its heading as a key", async () => {
    // `## Complete app.json example` matches no row in any table, so it is not a
    // key — but its fence is the only place the keys are shown composed.
    const { record, sections } = await page();

    assert.equal(sections.has("Complete"), false);
    assert.match(record.completeExample?.code ?? "", /"configVersion": "v2"/);
    assert.equal(record.completeExample?.file, "zeppos-docs/docs/reference/app-json.mdx");
  });

  it("cites every excerpt to a posix path, whatever the host separator", async () => {
    // The same portability contract `readSource` has for line endings: a Windows
    // sync must not cite a backslash path a Linux sync of the same commit does
    // not. `enrich` normalizes `originalPath` only — these are nested deeper.
    const { record } = await page();
    const files = record.sections.flatMap((s) => s.examples.map((e) => e.file));

    assert.ok(files.length > 0, "the fixture has examples to cite");
    for (const file of files) assert.doesNotMatch(file, /\\/);
  });

  it("returns nothing when the page is not in the cache", async () => {
    const empty = await mkdtemp(path.join(os.tmpdir(), "zk-manifest-"));

    assert.deepEqual(await parseAppJson(empty), []);
  });
});

describe("enrichAppJson", () => {
  it("stamps the documented schema OFFICIAL", async () => {
    const [record] = enrichAppJson(await parseAppJson(CACHE));

    assert.equal(record.confidence, "OFFICIAL");
    assert.equal(record.source, "docs-app-json");
    assert.equal(record.originalPath, "zeppos-docs/docs/reference/app-json.mdx");
  });
});

// --- render ---------------------------------------------------------------

const symbol = (overrides: Partial<SymbolRecord> = {}): SymbolRecord => ({
  id: "@zos/alarm.set",
  module: "@zos/alarm",
  symbol: "set",
  type: "function",
  description: "Sets an alarm. permission code: `device:os.alarm`",
  runtimes: ["device-app"],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/device-app-api/newAPI/alarm/set.mdx",
  extractedAt: "2026-09-09",
  ...overrides,
});

const example = (overrides: Partial<ExampleRecord> = {}): ExampleRecord => ({
  id: "demo",
  name: "demo",
  tree: "application",
  platformVersion: "4.2",
  manifest: {
    appType: "app",
    permissions: ["device:os.alarm"],
    targets: ["gtr-3"],
    platforms: [{ deviceSource: 226 }],
    keys: ["app", "configVersion", "permissions", "targets"],
    keyPaths: [
      "app",
      "app.appId",
      "app.extType",
      "targets.*",
      "targets.*.module",
      "targets.*.module.data-widget",
      "targets.*.platforms.dw",
    ],
  },
  files: [],
  usages: [],
  memberCalls: [],
  globalCalls: [],
  symbols: [],
  runtimes: ["device-app"],
  source: "sample-app",
  confidence: "OBSERVED",
  originalPath: "zeppos-samples/application/4.2/demo",
  extractedAt: "2026-09-09",
  ...overrides,
});

/** Lays out a data dir the way `store` writes one, then renders from it. */
async function renderInto(record: AppJsonRecord | null): Promise<Map<string, string>> {
  const root = await mkdtemp(path.join(os.tmpdir(), "zk-manifest-render-"));
  const dataDir = path.join(root, "data");
  const examplesDir = path.join(dataDir, "examples");
  const symbolsDir = path.join(dataDir, "symbols");
  await mkdir(examplesDir, { recursive: true });
  await mkdir(symbolsDir, { recursive: true });

  const appJsonFile = path.join(dataDir, "app-json.json");
  await writeFile(appJsonFile, JSON.stringify(record), "utf-8");
  await writeFile(path.join(examplesDir, "demo.json"), JSON.stringify(example()), "utf-8");
  await writeFile(
    path.join(symbolsDir, "zos-alarm.json"),
    JSON.stringify({ module: "@zos/alarm", symbols: [symbol()] }),
    "utf-8",
  );

  await renderManifest(appJsonFile, examplesDir, symbolsDir, root);

  const dir = path.join(root, "manifest");
  const pages = new Map<string, string>();
  for (const name of ["index.md", "app.md", "targets.md"]) {
    try {
      pages.set(name, await readFile(path.join(dir, name), "utf-8"));
    } catch {
      // Not every key earns a page; the assertions say which must.
    }
  }
  return pages;
}

const rendered = async () => renderInto(enrichAppJson(await parseAppJson(CACHE))[0]);

describe("renderManifest", () => {
  it("gives a page to the keys with a shape and keeps the scalars on the index", async () => {
    const pages = await rendered();

    assert.ok(pages.has("app.md"), "`app` has a table and a child");
    assert.ok(pages.has("targets.md"), "`targets` has a subtree");
    assert.match(pages.get("index.md") ?? "", /### `configVersion`/);
    assert.match(pages.get("index.md") ?? "", /### `permissions`/);
  });

  it("names the runtime each module entry point turns on", async () => {
    const index = (await rendered()).get("index.md") ?? "";

    assert.match(index, /`app-side` \| \[Side Service\]\(\.\.\/runtimes\/side-service\.md\)/);
    assert.match(index, /`setting` \| \[Settings App\]\(\.\.\/runtimes\/settings\.md\)/);
  });

  it("states the runtimes no documented key reaches", async () => {
    // The finding, not an omission: nothing in the `module` table ships a
    // Workout Extension, yet six sample apps are one.
    const index = (await rendered()).get("index.md") ?? "";

    assert.match(index, /No documented `module` key reaches/);
    assert.match(index, /Workout Extension/);
  });

  it("diffs the documented tree against the sample manifests, both ways", async () => {
    const index = (await rendered()).get("index.md") ?? "";

    assert.match(index, /`app\.extType` \| 1 of 1/, "a real key the page never mentions");
    assert.match(index, /`targets\.\*\.module\.data-widget` \| 1 of 1/);
    assert.match(index, /- `app\.venderId`/, "documented, and no sample uses it");
    assert.doesNotMatch(
      index,
      /^\| `targets\.\*` \|/m,
      "the collapsed target name is documented by construction, not a finding",
    );
  });

  it("joins a permission to the symbol whose docs state it", async () => {
    const index = (await rendered()).get("index.md") ?? "";

    assert.match(index, /`device:os\.alarm` \| `@zos\/alarm\.set` \| 1 of 1/);
  });

  it("states the gap rather than vanishing when the front produced nothing", async () => {
    // A deleted page reads like "app.json needs no configuration", which is the
    // one thing it must never read like.
    const pages = await renderInto(null);

    assert.match(pages.get("index.md") ?? "", /produced no record/);
    assert.equal(pages.has("app.md"), false);
  });
});

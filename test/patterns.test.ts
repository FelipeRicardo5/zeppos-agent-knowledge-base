import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichPatterns } from "../src/enrich/index.js";
import { parsePatterns, patternSlug } from "../src/parse/patterns.js";
import { renderPatterns } from "../src/render/patterns.js";
import type { PatternRecord } from "../src/types.js";

const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byId = async () => new Map((await parsePatterns(CACHE)).map((p) => [p.id, p]));

describe("parsePatterns (guides front)", () => {
  it("slugs the guide filename, whatever its casing", () => {
    assert.equal(patternSlug("Basic-environment-construction.mdx"), "basic-environment-construction");
    assert.equal(patternSlug("i18n.mdx"), "i18n");
  });

  it("takes the title from frontmatter and the summary from the lead prose", async () => {
    const pattern = (await byId()).get("cross-page-communications");

    assert.equal(pattern?.title, "Cross-Page Communications");
    assert.match(pattern?.summary ?? "", /^When a Mini Program has more than one page/);
    // Link URLs are dropped so the summary reads as prose, and the bullet list is
    // skipped because in these guides it previews the headings that follow.
    assert.match(pattern?.summary ?? "", /solution ideas for some common scenarios/);
    assert.doesNotMatch(pattern?.summary ?? "", /Page jumping/);
  });

  it("falls back to the first section when the guide has no lead prose", async () => {
    // Five of the eleven guides open straight into `## Introduction` / `## Intro`
    // instead of leading with prose. The heading itself must not leak in.
    const pattern = (await byId()).get("bluetooth-communication");

    assert.match(pattern?.summary ?? "", /^Communication between "Device App"/);
    assert.doesNotMatch(pattern?.summary ?? "", /Introduction/);
    assert.doesNotMatch(pattern?.summary ?? "", /:::/);
  });

  it("splits on `##` and strips a link out of the heading", async () => {
    const pattern = (await byId()).get("cross-page-communications");

    assert.deepEqual(
      pattern?.approaches.map((a) => a.heading),
      ["Page Jumping", "Via sessionStorage API"],
    );
  });

  it("collects the symbols the guide's own code imports", async () => {
    const pattern = (await byId()).get("cross-page-communications");

    assert.deepEqual(pattern?.approaches[0].symbols, ["@zos/router.push"]);
    assert.deepEqual(pattern?.approaches[1].symbols, ["@zos/storage.sessionStorage"]);
  });

  it("records a namespace import as a module, since it names no symbol", async () => {
    const usage = (await byId()).get("bluetooth-communication")?.approaches[1];

    assert.deepEqual(usage?.symbols, ["@zos/app.getPackageInfo"]);
    assert.deepEqual(usage?.modules, ["@zos/ble"], "`import * as ble` names no symbol");
  });

  it("reads both fence title spellings and maps the file to a runtime", async () => {
    // `title=pageA.js` and `title="app.js"` both occur upstream.
    const jumping = (await byId()).get("cross-page-communications")?.approaches[0];
    assert.equal(jumping?.snippets[0].title, "pageA.js");
    assert.equal(jumping?.snippets[0].runtime, "device-app");

    const usage = (await byId()).get("bluetooth-communication")?.approaches[1];
    assert.equal(usage?.snippets[0].title, "app.js");
    assert.equal(usage?.snippets[0].runtime, "device-app");
    assert.equal(usage?.snippets[1].title, "app-side/index.js");
    assert.equal(usage?.snippets[1].runtime, "side-service", "app-side/ is the Side Service dir");
  });

  it("claims no runtime for a fence that is not runnable Zepp OS code", async () => {
    const usage = (await byId()).get("bluetooth-communication")?.approaches[1];
    const shell = usage?.snippets.find((s) => s.language === "sh");

    assert.ok(shell, "the sh fence is still captured");
    assert.equal(shell.runtime, undefined, "a shell block belongs to no runtime");
  });

  it("resolves linked reference pages to cache-relative paths, dropping the rest", async () => {
    const pattern = (await byId()).get("cross-page-communications");

    assert.deepEqual(pattern?.referencePages, [
      "zeppos-docs/docs/reference/device-app-api/newAPI/router/push.mdx",
      "zeppos-docs/docs/reference/device-app-api/newAPI/storage/sessionStorage.mdx",
    ]);
  });
});

describe("enrichPatterns", () => {
  it("rolls the approach sets up to the pattern, sorted and de-duplicated", () => {
    const [record] = enrichPatterns([
      {
        id: "demo",
        title: "Demo",
        approaches: [
          {
            heading: "B",
            symbols: ["@zos/ui.widget"],
            modules: ["@zos/ble"],
            snippets: [{ language: "js", title: "page.js", runtime: "device-app", code: "" }],
          },
          {
            heading: "A",
            symbols: ["@zos/ui.createWidget", "@zos/ui.widget"],
            modules: ["@zos/ble"],
            snippets: [{ language: "js", title: "app-side/index.js", runtime: "side-service", code: "" }],
          },
        ],
        referencePages: [],
        sourceFile: path.join("zeppos-docs", "docs", "guides", "best-practice", "demo.mdx"),
      },
    ]);

    assert.deepEqual(record.symbols, ["@zos/ui.createWidget", "@zos/ui.widget"]);
    assert.deepEqual(record.modules, ["@zos/ble"]);
    assert.deepEqual(record.runtimes, ["device-app", "side-service"]);
    assert.equal(record.confidence, "OFFICIAL", "a best-practice guide is official docs");
    assert.equal(record.originalPath, "zeppos-docs/docs/guides/best-practice/demo.mdx");
  });

  it("leaves runtimes empty when no fence title states one", () => {
    const [record] = enrichPatterns([
      {
        id: "demo",
        title: "Demo",
        approaches: [{ heading: "A", symbols: [], modules: [], snippets: [{ language: "js", code: "" }] }],
        referencePages: [],
        sourceFile: "zeppos-docs/docs/guides/best-practice/demo.mdx",
      },
    ]);

    assert.deepEqual(record.runtimes, []);
  });
});

const pattern = (overrides: Partial<PatternRecord> = {}): PatternRecord => ({
  id: "demo",
  title: "Demo Pattern",
  summary: "How to do the thing.",
  approaches: [
    {
      heading: "Step one",
      symbols: ["@zos/router.push"],
      modules: [],
      snippets: [{ language: "js", title: "pageA.js", runtime: "device-app", code: "push({})" }],
    },
  ],
  symbols: ["@zos/router.push"],
  modules: [],
  runtimes: ["device-app"],
  referencePages: [],
  source: "docs-guide",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/guides/best-practice/demo.mdx",
  extractedAt: "2026-09-04",
  ...overrides,
});

const symbolRecord = (id: string, minApiLevel: number | undefined) => {
  const [module, symbol] = [id.slice(0, id.lastIndexOf(".")), id.slice(id.lastIndexOf(".") + 1)];
  return {
    id,
    module,
    symbol,
    type: "function",
    minApiLevel,
    runtimes: ["device-app"],
    source: "docs-reference",
    confidence: "OFFICIAL",
    originalPath: "zeppos-docs/docs/reference/x.mdx",
    extractedAt: "2026-09-04",
  };
};

async function fixture(
  patterns: PatternRecord[],
  symbols: Record<string, unknown>,
): Promise<{ patternsDir: string; symbolsDir: string; out: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "render-patterns-"));
  const patternsDir = path.join(root, "patterns");
  const symbolsDir = path.join(root, "symbols");
  await mkdir(patternsDir, { recursive: true });
  await mkdir(symbolsDir, { recursive: true });
  for (const p of patterns) {
    await writeFile(path.join(patternsDir, `${p.id}.json`), JSON.stringify(p));
  }
  for (const [slug, value] of Object.entries(symbols)) {
    await writeFile(path.join(symbolsDir, `${slug}.json`), JSON.stringify(value));
  }
  return { patternsDir, symbolsDir, out: path.join(root, "out") };
}

describe("renderPatterns", () => {
  it("writes one page per pattern plus an index", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([pattern()], {
      "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] },
    });

    const counts = await renderPatterns(patternsDir, symbolsDir, out);

    assert.deepEqual(counts, { patterns: 1 });
    assert.deepEqual((await readdir(path.join(out, "patterns"))).sort(), ["demo.md", "index.md"]);
  });

  it("derives the pattern's minimum API_LEVEL as the highest of its symbols", async () => {
    // The point of the view: no upstream page states what the *pattern* needs.
    const { patternsDir, symbolsDir, out } = await fixture(
      [pattern({ symbols: ["@zos/router.push", "@zos/storage.LocalStorage"] })],
      {
        "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] },
        "zos-storage": {
          module: "@zos/storage",
          symbols: [symbolRecord("@zos/storage.LocalStorage", 3)],
        },
      },
    );

    await renderPatterns(patternsDir, symbolsDir, out);
    const page = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");

    assert.match(page, /\*\*Minimum API_LEVEL: >= 3\.\*\*/);
    assert.match(page, /`@zos\/storage.LocalStorage` \| >= 3 \| Device App \| yes \|/);
  });

  it("says not stated when no symbol the pattern uses documents a minimum", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([pattern()], {
      "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", undefined)] },
    });

    await renderPatterns(patternsDir, symbolsDir, out);
    const page = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");

    assert.match(page, /\*\*Minimum API_LEVEL: not stated\.\*\*/);
    assert.doesNotMatch(page, />= 0/, "a missing minimum must never render as level 0");
  });

  it("flags a symbol the guide uses that this KB has no record for", async () => {
    // The guide proves the symbol exists, so this is an extraction gap here.
    const { patternsDir, symbolsDir, out } = await fixture(
      [pattern({ symbols: ["@zos/router.push", "@zos/ghost.missing"] })],
      { "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] } },
    );

    await renderPatterns(patternsDir, symbolsDir, out);
    const page = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");
    const index = await readFile(path.join(out, "patterns", "index.md"), "utf-8");

    assert.match(page, /`@zos\/ghost.missing` \| — \| — \| \*\*no record\*\* \|/);
    assert.match(page, /not fully verifiable/);
    assert.match(index, /## Symbols used by a guide but absent from this KB/);
    assert.match(index, /- `@zos\/ghost.missing`/);
  });

  it("indexes which patterns use a symbol", async () => {
    const { patternsDir, symbolsDir, out } = await fixture(
      [pattern(), pattern({ id: "other", title: "Other Pattern" })],
      { "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] } },
    );

    await renderPatterns(patternsDir, symbolsDir, out);
    const index = await readFile(path.join(out, "patterns", "index.md"), "utf-8");

    assert.match(index, /- `@zos\/router.push` — \[demo\]\(demo\.md\), \[other\]\(other\.md\)/);
  });

  it("states the absence when a guide imports no @zos module at all", async () => {
    const { patternsDir, symbolsDir, out } = await fixture(
      [pattern({ symbols: [], approaches: [{ heading: "A", symbols: [], modules: [], snippets: [] }] })],
      {},
    );

    await renderPatterns(patternsDir, symbolsDir, out);
    const page = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");

    assert.match(page, /prose and configuration only/);
  });

  it("reproduces the guide's snippets under their approach", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([pattern()], {
      "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] },
    });

    await renderPatterns(patternsDir, symbolsDir, out);
    const page = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");

    assert.match(page, /## Step one/);
    assert.match(page, /`pageA.js` — Device App/);
    assert.match(page, /```js\npush\(\{\}\)\n```/);
  });

  it("a rerun produces identical output (idempotent)", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([pattern()], {
      "zos-router": { module: "@zos/router", symbols: [symbolRecord("@zos/router.push", 2)] },
    });

    await renderPatterns(patternsDir, symbolsDir, out);
    const first = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");
    await renderPatterns(patternsDir, symbolsDir, out);
    const second = await readFile(path.join(out, "patterns", "demo.md"), "utf-8");

    assert.equal(first, second);
  });

  it("refuses to write when a pattern would claim the generated index slug", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([pattern({ id: "index" })], {});

    await assert.rejects(renderPatterns(patternsDir, symbolsDir, out), /Pattern id collision/);
  });

  it("names the offending file when a pattern file is not a pattern", async () => {
    const { patternsDir, symbolsDir, out } = await fixture([], {});
    await writeFile(path.join(patternsDir, "junk.json"), JSON.stringify({ nope: true }), "utf-8");

    await assert.rejects(renderPatterns(patternsDir, symbolsDir, out), /junk\.json: not a pattern file/);
  });
});

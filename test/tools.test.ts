import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichTools } from "../src/enrich/index.js";
import { parseTools } from "../src/parse/tools.js";
import { renderTools } from "../src/render/tools.js";

// The last empty output directory, and the last question of every task: the app
// is written, now how does it run? Each case below pins something the reading
// of `guides/tools/` decided, rather than something the item predicted.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

describe("parseTools", () => {
  it("reads a command out of the backticked span, not the whole heading", async () => {
    // `## \`zeus create\` Create project` — the heading is a command and then a
    // title, so the name is the backticked part and the rest is dropped.
    const [tools] = await parseTools(CACHE);

    assert.deepEqual(
      tools.commands.map((c) => c.name),
      ["zeus create", "zeus dev"],
    );
    assert.equal(tools.commands[0].summary, "Create project.");
  });

  it("keeps the prompts `zeus create` asks, verbatim", async () => {
    // Each answer writes a key into `app.json` and the CLI page never says
    // which. Keeping them verbatim is what lets the render make that join.
    const [tools] = await parseTools(CACHE);

    assert.deepEqual(tools.prompts, [
      "What type of application should be created? APP",
      "Should this application contain a app-side component? Yes",
    ]);
  });

  it("rebuilds full paths from the tree art and attributes a runtime to each", async () => {
    // Reading names without the paths looked cheaper and was wrong: the real
    // tree lists `index.js` three times at three depths, and a name-only read
    // called the project root a Device App directory, which no source says.
    // The runtime comes from `runtimeForAppFile`, the same rule every symbol in
    // this base is attributed by.
    const [tools] = await parseTools(CACHE);

    assert.deepEqual(
      tools.scaffold.map((entry) => [entry.name, entry.runtime]),
      [
        ["app-side/index.js", "side-service"],
        ["app.js", "device-app"],
        ["setting/index.js", "settings"],
      ],
    );
  });

  it("leaves `app.json` out of the scaffold, because it belongs to no runtime", async () => {
    // `runtimeForAppFile` is documented as always answering, defaulting to
    // device-app. That is right for a code file and wrong for the manifest,
    // which `manifest/` covers.
    const [tools] = await parseTools(CACHE);

    assert.ok(!tools.scaffold.some((entry) => entry.name.endsWith("app.json")));
  });

  it("does not file the `tree` fence as a shell snippet", async () => {
    // The scaffold table already carries it, attributed. A second copy tagged
    // `sh` would be a duplicate and mislabelled.
    const [tools] = await parseTools(CACHE);
    const create = tools.commands[0];

    assert.equal(create.snippets.length, 2);
    assert.ok(!create.snippets.some((s) => s.code.includes("└──")));
  });

  it("cites a posix path whatever OS ran the sync", async () => {
    // Every other front normalises this. Here it would also make the render
    // differ between a Windows and a Linux run, which CI diffs.
    const [tools] = await parseTools(CACHE);

    assert.ok(!tools.sourceFiles.some((file) => file.includes("\\")));
    assert.ok(!tools.commands.some((c) => c.snippets.some((s) => s.file.includes("\\"))));
  });

  it("reads a package's tier from the heading it sits under", async () => {
    // `RECOMMENDED` and `COMMUNITY` were reserved when this base was designed
    // and described as needing a manual curation pass. This page states them,
    // so they are derived like everything else.
    const [tools] = await parseTools(CACHE);

    assert.deepEqual(
      tools.packages.map((p) => [p.name, p.confidence]),
      [
        ["ZML", "RECOMMENDED"],
        ["zeppos-fx", "COMMUNITY"],
      ],
    );
    assert.equal(tools.packages[0].url, "https://github.com/zepp-health/zml");
    assert.match(tools.packages[0].description ?? "", /^A mini development library/);
  });

  it("returns nothing when the pages are absent, rather than throwing", async () => {
    const empty = await parseTools(path.join(import.meta.dirname, "fixtures", "nope"));

    assert.deepEqual(empty, []);
  });
});

async function fixture(tools: unknown, appJson: unknown, symbols: Record<string, unknown>) {
  const root = await mkdtemp(path.join(os.tmpdir(), "render-tools-"));
  const symbolsDir = path.join(root, "symbols");
  await mkdir(symbolsDir, { recursive: true });
  for (const [slug, value] of Object.entries(symbols)) {
    await writeFile(path.join(symbolsDir, `${slug}.json`), JSON.stringify(value));
  }
  const toolsFile = path.join(root, "tools.json");
  const appJsonFile = path.join(root, "app-json.json");
  await writeFile(toolsFile, JSON.stringify(tools));
  await writeFile(appJsonFile, JSON.stringify(appJson));
  return { toolsFile, appJsonFile, symbolsDir, out: path.join(root, "out") };
}

const APP_JSON = {
  sections: [
    { path: "targets.module.app-side", key: "app-side", props: [], examples: [], runtime: "side-service" },
    { path: "targets.module.page", key: "page", props: [], examples: [], runtime: "device-app" },
  ],
  gaps: [],
  source: "docs-app-json",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/app-json.mdx",
  extractedAt: "2026-09-10",
};

describe("render tools", () => {
  it("joins each scaffolded file to the module key that turns its runtime on", async () => {
    // The join that makes the page more than a copy of the CLI page: nothing
    // upstream connects the question the CLI asks to the `app.json` key it
    // writes, and getting that wrong breaks a build before any API runs.
    const [raw] = await parseTools(CACHE);
    const { toolsFile, appJsonFile, symbolsDir, out } = await fixture(
      enrichTools([raw])[0],
      APP_JSON,
      {},
    );

    await renderTools(toolsFile, appJsonFile, symbolsDir, out);
    const page = await readFile(path.join(out, "tools", "index.md"), "utf-8");

    assert.match(page, /`app-side\/index\.js`.*Side Service.*targets\.module\.app-side/);
    assert.match(page, /`app\.js`.*Device App.*targets\.module\.page/);
    assert.match(page, /\*\*derived\*\*, not stated/);
  });

  it("names the runtimes the default template does not scaffold", async () => {
    const [raw] = await parseTools(CACHE);
    const { toolsFile, appJsonFile, symbolsDir, out } = await fixture(
      enrichTools([raw])[0],
      APP_JSON,
      {},
    );

    await renderTools(toolsFile, appJsonFile, symbolsDir, out);
    const page = await readFile(path.join(out, "tools", "index.md"), "utf-8");

    assert.match(page, /Watchface and Workout Extension/);
  });

  it("counts the symbols this base already holds for a recommended package", async () => {
    // ZML is the first package the docs recommend, and the base holds
    // `@zeppos/zml` symbols whose only evidence was an import line in a sample.
    const [raw] = await parseTools(CACHE);
    const { toolsFile, appJsonFile, symbolsDir, out } = await fixture(
      enrichTools([raw])[0],
      APP_JSON,
      {
        zml: {
          module: "@zeppos/zml/base-page",
          symbols: [
            {
              id: "@zeppos/zml/base-page.BasePage",
              module: "@zeppos/zml/base-page",
              symbol: "BasePage",
              type: "function",
              runtimes: ["device-app"],
              source: "sample",
              confidence: "OBSERVED",
              originalPath: "zeppos-samples/x.js",
              extractedAt: "2026-09-10",
            },
          ],
        },
      },
    );

    await renderTools(toolsFile, appJsonFile, symbolsDir, out);
    const page = await readFile(path.join(out, "tools", "index.md"), "utf-8");

    assert.match(page, /\[ZML\].*RECOMMENDED.*1 in 1 module/);
    assert.match(page, /A dash in the symbols column means this base holds nothing/);
  });

  it("states the gap when the front produced nothing", async () => {
    // A missing page reads as "no tooling is needed", which is the one thing it
    // must never read as.
    const { toolsFile, appJsonFile, symbolsDir, out } = await fixture(null, APP_JSON, {});

    await renderTools(toolsFile, appJsonFile, symbolsDir, out);
    const page = await readFile(path.join(out, "tools", "index.md"), "utf-8");

    assert.match(page, /\*\*Nothing extracted\.\*\*/);
    assert.match(page, /not a statement that no tooling is needed/);
  });

  it("says the Watchface Maker pages are out of scope, not pending", async () => {
    // 12 of the 23 pages are a no-code web GUI walkthrough. An agent cannot
    // drive a GUI, so leaving them silently unread would read as a gap.
    const [raw] = await parseTools(CACHE);
    const { toolsFile, appJsonFile, symbolsDir, out } = await fixture(
      enrichTools([raw])[0],
      APP_JSON,
      {},
    );

    await renderTools(toolsFile, appJsonFile, symbolsDir, out);
    const page = await readFile(path.join(out, "tools", "index.md"), "utf-8");

    assert.match(page, /out of scope rather than pending/);
  });
});

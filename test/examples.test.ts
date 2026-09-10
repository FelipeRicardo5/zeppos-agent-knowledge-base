import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichExamples } from "../src/enrich/index.js";
import { exampleSlug, parseExamples } from "../src/parse/examples.js";
import { renderExamples } from "../src/render/examples.js";
import type { ExampleRecord, RawExample, SymbolRecord } from "../src/types.js";

// The samples are the only source of code that runs, and the first eval run made
// them the answer to its root finding: no record says how a symbol is called.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byId = async () => new Map((await parseExamples(CACHE)).map((e) => [e.id, e]));

describe("parseExamples", () => {
  it("finds one app per app.json and names it from its directory", async () => {
    const examples = await parseExamples(CACHE);

    assert.deepEqual(
      examples.map((e) => e.id).sort(),
      ["application-4-2-simple-keyboard", "watchface-3-0-timer"],
    );
    assert.equal(exampleSlug("zeppos-samples/application/2.0/post-health-data/MiniProgram"), "application-2-0-post-health-data-miniprogram");
  });

  it("reads the tree and platform version from the path", async () => {
    const examples = await byId();

    assert.equal(examples.get("application-4-2-simple-keyboard")?.tree, "application");
    assert.equal(examples.get("application-4-2-simple-keyboard")?.platformVersion, "4.2");
    assert.equal(examples.get("watchface-3-0-timer")?.tree, "watchface");
  });

  it("reads the manifest's shape, permissions and targets", async () => {
    // `app.json` blocked the first eval run. Upstream documents the file; these
    // are files that build, so their keys say what is actually required.
    const manifest = (await byId()).get("application-4-2-simple-keyboard")?.manifest;

    assert.equal(manifest?.appType, "app");
    assert.deepEqual(manifest?.permissions, ["data:os.device.info", "device:os.input.method"]);
    assert.deepEqual(manifest?.targets, ["gt.r", "gt.s"]);
    assert.deepEqual(manifest?.keys, [
      "app",
      "configVersion",
      "defaultLanguage",
      "i18n",
      "permissions",
      "runtime",
      "targets",
    ]);
  });

  it("attributes each file to a runtime from its path inside the app", async () => {
    const files = (await byId()).get("application-4-2-simple-keyboard")?.files ?? [];

    assert.ok(files.length > 0);
    // `setting/` is the Settings App wherever the app itself lives, so one sample
    // spans two runtimes — the same rule the samples front uses.
    assert.deepEqual([...new Set(files.map((f) => f.runtime))].sort(), ["device-app", "settings"]);
    assert.deepEqual([...new Set(((await byId()).get("watchface-3-0-timer")?.files ?? []).map((f) => f.runtime))], [
      "watchface",
    ]);
  });

  it("quotes a real call to an imported symbol, cited to file and line", async () => {
    const usage = (await byId())
      .get("application-4-2-simple-keyboard")
      ?.usages.find((u) => u.id === "@zos/ui.createWidget");

    assert.ok(usage, "createWidget is imported and called");
    assert.match(usage.snippets[0].code, /createWidget\(/);
    assert.match(usage.snippets[0].file, /simple-keyboard/);
    assert.ok(usage.snippets[0].line > 0, "the line is 1-indexed so a reader can go look");
  });

  it("never quotes the import line as if it were a call", async () => {
    const example = (await byId()).get("application-4-2-simple-keyboard");

    for (const usage of example?.usages ?? []) {
      for (const snippet of usage.snippets) {
        assert.doesNotMatch(snippet.code, /^import\b/, `${usage.id} quoted its own import`);
      }
    }
  });

  it("captures a member call the samples front could never see", async () => {
    // `setProperty` is never imported, so no import line names it — and updating
    // a widget is documented nowhere upstream. The eval run tripped on exactly
    // this.
    const call = (await byId())
      .get("application-4-2-simple-keyboard")
      ?.memberCalls.find((c) => c.method === "setProperty");

    assert.ok(call, "a method called on a value is still evidence");
    assert.match(call.snippets[0].code, /setProperty\(/);
  });

  it("extends a snippet until its brackets balance", async () => {
    // A one-line excerpt of a multi-line call shows a dangling `(`, which is
    // worse than no excerpt.
    const call = (await byId())
      .get("application-4-2-simple-keyboard")
      ?.memberCalls.find((c) => c.method === "setProperty");
    const code = call?.snippets[0].code ?? "";

    assert.match(code, /text: `value: \$\{value\}`/, "the argument object is included");
    assert.equal(
      [...code].filter((c) => c === "(").length,
      [...code].filter((c) => c === ")").length,
      "parentheses balance",
    );
  });

  it("captures the phone runtimes' global calls, which no import can reveal", async () => {
    // A Settings App file imports nothing that names a module: AppSettingsPage,
    // View, TextInput and Button are all globals. Every `setting/` file therefore
    // produced zero excerpts, which was the largest gap the second eval run found
    // — and `AppSettingsPage` has no symbol record anywhere, so code is the only
    // evidence it exists.
    const calls = (await byId()).get("application-4-2-simple-keyboard")?.globalCalls ?? [];
    const names = calls.map((c) => c.method);

    assert.ok(names.includes("AppSettingsPage"), "the settings entry point");
    assert.ok(names.includes("View"), "and the components it builds with");
    assert.ok(names.includes("TextInput"));
    assert.match(
      calls.find((c) => c.method === "AppSettingsPage")?.snippets[0].code ?? "",
      /AppSettingsPage\(\{/,
    );
  });

  it("does not mistake a method definition for a call", async () => {
    // `addItem(value) {` and `build(props) {` are the sample's own methods. A
    // bare-call regex cannot tell them from a call, and taking them filed the
    // sample's helpers as platform API.
    const names = ((await byId()).get("application-4-2-simple-keyboard")?.globalCalls ?? []).map(
      (c) => c.method,
    );

    assert.ok(!names.includes("addItem"), "defined in this file, not called");
    assert.ok(!names.includes("build"));
  });

  it("collects global calls only in the phone runtimes", async () => {
    // In a Device App file a bare call is almost always an imported symbol, which
    // `usages` already covers with a certain module id.
    const watchface = (await byId()).get("watchface-3-0-timer");

    assert.deepEqual(watchface?.globalCalls, []);
  });

  it("skips generic method names that would attach noise to a symbol", async () => {
    const examples = await parseExamples(CACHE);
    const methods = examples.flatMap((e) => e.memberCalls.map((c) => c.method));

    for (const noise of ["log", "map", "push", "toString"]) {
      assert.ok(!methods.includes(noise), `${noise} is a built-in, not Zepp OS API`);
    }
  });
});

const symbol = (id: string): SymbolRecord => ({
  id,
  module: id.slice(0, id.lastIndexOf(".")),
  symbol: id.slice(id.lastIndexOf(".") + 1),
  type: "function",
  runtimes: ["device-app"],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/x.mdx",
  extractedAt: "2026-09-08",
});

describe("enrichExamples", () => {
  const raw = (overrides: Partial<RawExample> = {}): RawExample => ({
    id: "demo",
    name: "demo",
    tree: "application",
    platformVersion: "4.2",
    files: [
      { path: "page/index.js", runtime: "device-app", symbols: ["@zos/ui.createWidget"] },
      { path: "app-side/index.js", runtime: "side-service", symbols: [] },
    ],
    usages: [],
    memberCalls: [
      { method: "setProperty", snippets: [{ file: "a.js", line: 1, code: "x.setProperty(1)" }] },
      { method: "cursorWidget", snippets: [{ file: "a.js", line: 2, code: "x.cursorWidget()" }] },
    ],
    globalCalls: [
      { method: "AppSettingsPage", snippets: [{ file: "s.js", line: 1, code: "AppSettingsPage({})" }] },
    ],
    sourceDir: path.join("zeppos-samples", "application", "4.2", "demo"),
    ...overrides,
  });

  it("keeps only the member calls a known symbol shares a name with", () => {
    // parse cannot filter these — it has no symbol table. Without the join, a
    // hundred receiver-specific names ride along attached to nothing.
    const [record] = enrichExamples([raw()], [symbol("@zos/ui.setProperty")]);

    assert.deepEqual(
      record.memberCalls.map((c) => c.method),
      ["setProperty"],
    );
  });

  it("keeps every global call, filter or no filter", () => {
    // These come only from the phone runtimes, and the symbols missing there are
    // exactly what a filter would drop: `AppSettingsPage` has no record at all.
    const [record] = enrichExamples([raw()], [symbol("@zos/ui.setProperty")]);

    assert.deepEqual(
      record.globalCalls.map((c) => c.method),
      ["AppSettingsPage"],
      "filtering would discard the evidence for the gap this closes",
    );
  });

  it("unions the symbols and runtimes over the app's files", () => {
    const [record] = enrichExamples([raw()], []);

    assert.deepEqual(record.symbols, ["@zos/ui.createWidget"]);
    assert.deepEqual(record.runtimes, ["device-app", "side-service"]);
  });

  it("marks sample code OBSERVED, not OFFICIAL", () => {
    const [record] = enrichExamples([raw()], []);

    assert.equal(record.confidence, "OBSERVED", "code that runs is not a documented contract");
    assert.equal(record.originalPath, "zeppos-samples/application/4.2/demo");
  });
});

const example = (overrides: Partial<ExampleRecord> = {}): ExampleRecord => ({
  id: "demo",
  name: "demo",
  tree: "application",
  platformVersion: "4.2",
  manifest: {
    appType: "app",
    permissions: ["device:os.alarm"],
    targets: ["gt.r"],
    platforms: [],
    keys: ["app", "permissions"],
    keyPaths: ["app", "app.appType", "permissions"],
  },
  files: [{ path: "page/index.js", runtime: "device-app", symbols: ["@zos/ui.createWidget"] }],
  usages: [
    {
      id: "@zos/ui.createWidget",
      snippets: [{ file: "zeppos-samples/a/page/index.js", line: 12, code: "createWidget(widget.TEXT, {})" }],
    },
  ],
  memberCalls: [
    {
      method: "setProperty",
      snippets: [{ file: "zeppos-samples/a/page/index.js", line: 20, code: "text.setProperty(prop.MORE, {})" }],
    },
  ],
  globalCalls: [
    {
      method: "AppSettingsPage",
      snippets: [{ file: "zeppos-samples/a/setting/index.js", line: 3, code: "AppSettingsPage({})" }],
    },
  ],
  symbols: ["@zos/ui.createWidget"],
  runtimes: ["device-app"],
  source: "sample-app",
  confidence: "OBSERVED",
  originalPath: "zeppos-samples/application/4.2/demo",
  extractedAt: "2026-09-08",
  ...overrides,
});

async function fixture(examples: ExampleRecord[], symbols: SymbolRecord[]) {
  const root = await mkdtemp(path.join(os.tmpdir(), "render-examples-"));
  const examplesDir = path.join(root, "examples");
  const symbolsDir = path.join(root, "symbols");
  await mkdir(examplesDir, { recursive: true });
  await mkdir(symbolsDir, { recursive: true });
  for (const e of examples) await writeFile(path.join(examplesDir, `${e.id}.json`), JSON.stringify(e));
  if (symbols.length > 0) {
    await writeFile(
      path.join(symbolsDir, "mod.json"),
      JSON.stringify({ module: symbols[0].module, symbols }),
    );
  }
  return { examplesDir, symbolsDir, out: path.join(root, "out") };
}

describe("renderExamples", () => {
  it("writes one page per app plus an index", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], []);

    assert.deepEqual(await renderExamples(examplesDir, symbolsDir, out), { examples: 1 });
    assert.deepEqual((await readdir(path.join(out, "examples"))).sort(), ["demo.md", "index.md"]);
  });

  it("quotes the code with its file and line", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], []);

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /```js\ncreateWidget\(widget\.TEXT, \{\}\)\n```/);
    assert.match(page, /line 12/);
  });

  it("indexes where a symbol is used", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], [symbol("@zos/ui.createWidget")]);

    await renderExamples(examplesDir, symbolsDir, out);
    const index = await readFile(path.join(out, "examples", "index.md"), "utf-8");

    assert.match(index, /## Where a symbol is used/);
    assert.match(index, /- `@zos\/ui.createWidget` — \[demo\]\(demo\.md\)/);
  });

  it("names the owner of a member call and says the match is by name", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], [symbol("@zos/ui.setProperty")]);

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /`\.setProperty\(\)` — `@zos\/ui.setProperty`/);
    assert.match(page, /receiver's type is \*\*not\*\* resolved/);
  });

  it("says a member call is ambiguous rather than naming one winner", async () => {
    // What the base was getting wrong. With one candidate the row names it;
    // with several it must not pick, because the receiver's type is never
    // resolved and the wrong pick sends a reader to another runtime's API.
    const { examplesDir, symbolsDir, out } = await fixture(
      [example()],
      [symbol("@zos/ui.setProperty"), symbol("@zos/page.setProperty")],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /`\.setProperty\(\)` — \*\*ambiguous\*\*/);
    assert.match(page, /`@zos\/ui.setProperty`/);
    assert.match(page, /`@zos\/page.setProperty`/);
  });

  it("drops a candidate from a runtime the sample does not use", async () => {
    // The watchface front made `@zos/ui.setProperty` and `hmUI.setProperty`
    // share a name. In a Device App sample only one of them is a reading of
    // the call, and the sample's own runtimes say which.
    const { examplesDir, symbolsDir, out } = await fixture(
      [example()],
      [symbol("@zos/ui.setProperty"), { ...symbol("hmUI.setProperty"), runtimes: ["watchface"] }],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /`\.setProperty\(\)` — `@zos\/ui.setProperty`/);
    assert.doesNotMatch(page, /hmUI\.setProperty/);
  });

  it("counts how many manifests use each app.json key", async () => {
    const { examplesDir, symbolsDir, out } = await fixture(
      [example(), example({ id: "other", name: "other" })],
      [],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const index = await readFile(path.join(out, "examples", "index.md"), "utf-8");

    assert.match(index, /\| `app` \| 2 of 2 \|/);
    assert.match(index, /- `device:os.alarm` — 2 samples/);
  });

  it("flags a symbol the samples use that this KB has no record for", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], []);

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /`@zos\/ui.createWidget` \*\(no record in this KB\)\*/);
  });

  it("a rerun produces identical output (idempotent)", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example()], []);

    await renderExamples(examplesDir, symbolsDir, out);
    const first = await readFile(path.join(out, "examples", "demo.md"), "utf-8");
    await renderExamples(examplesDir, symbolsDir, out);
    const second = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.equal(first, second);
  });

  it("refuses to write when an app would claim the generated index slug", async () => {
    const { examplesDir, symbolsDir, out } = await fixture([example({ id: "index" })], []);

    await assert.rejects(renderExamples(examplesDir, symbolsDir, out), /Example id collision/);
  });
});

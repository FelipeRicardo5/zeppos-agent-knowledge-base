import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichExamples } from "../src/enrich/index.js";
import { exampleSlug, parseExamples, parseSampleCatalogue } from "../src/parse/examples.js";
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
      [
        "application-4-2-simple-keyboard",
        "watchface-1-0-simple",
        "watchface-3-0-timer",
        "workout-extensions-3-5-pace-master",
      ],
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

  it("resolves each `module` key to the file it turns on", async () => {
    // The manifest writes an extensionless path and the loader supplies the
    // extension, so "which file is this app's Settings App" is a question only
    // the manifest and the file tree answer together. Nothing upstream joins
    // them, and three eval runs had to guess the layout of what they wrote.
    const entries = (await byId()).get("application-4-2-simple-keyboard")?.manifest?.entryPoints ?? [];
    const setting = entries.find((e) => e.module === "setting");

    assert.equal(setting?.path, "setting/index", "verbatim, as the manifest writes it");
    assert.equal(setting?.file, "setting/index.js", "resolved against the app's own files");
    assert.equal(setting?.runtime, "settings", "labelled by the same path rule every record uses");
    assert.equal(setting?.target, "gt.r", "and by the target key that declares it");
  });

  it("reads all four forms a `module` key uses to name a file", async () => {
    // The reference page documents `path` and `pages`. `services` is on
    // `app-service`, a row it types `object` and gives no section at all, and
    // `widgets[].path` is on the `data-widget` key it never mentions. A walker
    // reading `path` alone finds no entry point for a Background Service or a
    // Workout Extension.
    const examples = await byId();
    const shape = (id: string, module: string) =>
      examples.get(id)?.manifest?.entryPoints.find((e) => e.module === module)?.shape;

    assert.equal(shape("application-4-2-simple-keyboard", "page"), "pages");
    assert.equal(shape("application-4-2-simple-keyboard", "setting"), "path");
    assert.equal(shape("application-4-2-simple-keyboard", "app-service"), "services");
    assert.equal(shape("workout-extensions-3-5-pace-master", "data-widget"), "widgets");
  });

  it("leaves a declared path that matches no file unresolved, rather than inventing one", async () => {
    // Every declared path in the real corpus resolves. That is what makes an
    // unresolved one worth reporting instead of hiding — a manifest naming a
    // file nobody wrote is a build that fails before any API runs.
    const entries = (await byId()).get("application-4-2-simple-keyboard")?.manifest?.entryPoints ?? [];
    const missing = entries.find((e) => e.path === "app-service/never-written");

    assert.ok(missing, "the declaration is kept");
    assert.equal(missing.file, undefined, "and no file is claimed for it");
    assert.equal(missing.runtime, undefined, "so it gets no runtime either");
  });

  it("reads `module` and `platforms` from a manifest that has no `targets`", async () => {
    // Two layouts, both calling themselves `configVersion: v2`, so that field
    // does not separate them. Reading only the nested form left the one sample
    // using the flat one with no hardware selector at all, while its manifest
    // states them plainly.
    const manifest = (await byId()).get("watchface-1-0-simple")?.manifest;

    assert.equal(manifest?.layout, "flat");
    assert.deepEqual(manifest?.targets, [], "there is no target key to name");
    assert.deepEqual(
      manifest?.platforms.map((p) => p.deviceSource).sort((a, b) => Number(a) - Number(b)),
      [229, 6095106],
    );
    assert.equal(manifest?.entryPoints[0]?.file, "watchface/default-target/index.js");
    assert.equal(manifest?.entryPoints[0]?.target, undefined, "a flat manifest has none");
  });

  it("keeps what the app says it is, and drops a field left blank", async () => {
    // `app.*` is publisher data and stays out — except these, which are the only
    // statement any source makes about what a sample is *for*. A blank string
    // says no more than a missing key, so both read as absence.
    const examples = await byId();
    const keyboard = examples.get("application-4-2-simple-keyboard")?.manifest?.identity;
    const workout = examples.get("workout-extensions-3-5-pace-master")?.manifest?.identity;

    assert.equal(keyboard?.appName, "simple-keyboard");
    assert.equal(keyboard?.description, "simple keyboard sample");
    assert.equal(keyboard?.version, "1.0.0");
    assert.equal(workout?.extType, "workout", "what `appType: app` alone cannot say");
    assert.equal(workout?.description, undefined, "written as an empty string");
  });

  it("reads the samples README as the only source that groups an app with its siblings", async () => {
    // HelloWorld at four platform versions is one app four times, and nothing in
    // a directory name says so. The README is a hand-maintained list beside the
    // tree, so it is read as evidence and diffed against the tree, not trusted.
    const entries = await parseSampleCatalogue(CACHE);

    assert.deepEqual(
      entries.find((entry) => entry.dir === "application/4.2/simple-keyboard"),
      { family: "Keyboard", category: "Application", dir: "application/4.2/simple-keyboard" },
    );
    assert.ok(
      entries.some((entry) => entry.dir === "workout-extensions/3.5/pace-master"),
      "a doubled separator in a link still joins — the real README writes one",
    );
    assert.ok(
      !entries.some((entry) => entry.dir.startsWith("http")),
      "the documentation link is not a sample",
    );
  });

  it("leaves an app the README never links without a family, rather than guessing one", async () => {
    // A sample linked from nowhere is invisible to a reader working from the
    // list. Filing it under a family inferred from its directory would hide that.
    const examples = await byId();

    assert.equal(examples.get("application-4-2-simple-keyboard")?.family, "Keyboard");
    assert.equal(examples.get("application-4-2-simple-keyboard")?.category, "Application");
    assert.equal(examples.get("watchface-3-0-timer")?.family, undefined);
    assert.equal(examples.get("watchface-3-0-timer")?.category, undefined);
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
    messages: [],
    messageShapes: [],
    globalCalls: [
      { method: "AppSettingsPage", snippets: [{ file: "s.js", line: 1, code: "AppSettingsPage({})" }] },
    ],
    sourceDir: path.join("zeppos-samples", "application", "4.2", "demo"),
    ...overrides,
  });

  it("labels a member call as resolved rather than dropping the rest", () => {
    // This used to keep only the calls a symbol shared a name with. That
    // criterion was circular — "this base does not know it" deleted exactly the
    // evidence that would have closed a gap — and it hid `this.request`, which
    // twelve sample call sites show and an eval run had to guess the shape of.
    // Noise is excluded in parse now, by whether the app defines the method.
    const [record] = enrichExamples([raw()], [symbol("@zos/ui.setProperty")]);

    assert.deepEqual(
      record.memberCalls.map((c) => [c.method, c.resolved]),
      [
        ["setProperty", true],
        ["cursorWidget", false],
      ],
    );
  });

  it("keeps an unresolved call, because that is the gap it is evidence of", () => {
    const [record] = enrichExamples([raw()], []);

    assert.deepEqual(
      record.memberCalls.filter((c) => c.resolved === false).map((c) => c.method),
      ["setProperty", "cursorWidget"],
      "a call no symbol backs is the finding, not the noise",
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
    values: {},
    layout: "targets",
    identity: {},
    entryPoints: [],
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
  messages: [],
  messageShapes: [],
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

  it("resolves each `module` key to a file, a runtime and a target", async () => {
    const { examplesDir, symbolsDir, out } = await fixture(
      [
        example({
          manifest: {
            appType: "app",
            permissions: [],
            targets: ["gt.r"],
            platforms: [],
            keys: ["app", "targets"],
            values: { "runtime.apiVersion.target": ["4.0"] },
            keyPaths: ["app"],
            layout: "targets",
            identity: { appName: "Demo", description: "a demo application" },
            entryPoints: [
              {
                module: "app-side",
                target: "gt.r",
                path: "app-side/index",
                file: "app-side/index.js",
                shape: "path",
                runtime: "side-service",
              },
              { module: "app-service", path: "app-service/late", shape: "services" },
            ],
          },
        }),
      ],
      [],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /## Entry points/);
    assert.match(page, /\| `app-side` \| `app-side\/index` \| `path` \| `app-side\/index\.js` \| Side Service \| `gt\.r` \|/);
    // A path nothing matches is stated as unmatched. Every path in the real
    // corpus resolves, so this is the row that would be a finding.
    assert.match(page, /\*\*no file matches\*\*/);
    assert.match(page, /Installs on: target `4\.0`/);
    assert.match(page, /\*\*Demo\*\* — a demo application/);
  });

  it("marks a manifest that has no `targets` key as the other layout", async () => {
    const { examplesDir, symbolsDir, out } = await fixture(
      [
        example({
          manifest: {
            appType: "watchface",
            permissions: [],
            targets: [],
            platforms: [{ deviceSource: 229 }],
            keys: ["app", "module", "platforms"],
            values: {},
            keyPaths: ["module"],
            layout: "flat",
            identity: {},
            entryPoints: [],
          },
        }),
      ],
      [],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const page = await readFile(path.join(out, "examples", "demo.md"), "utf-8");

    assert.match(page, /Layout: `flat`/);
    assert.match(page, /declares no `module` path, so nothing here says which file runs/);
  });

  it("groups an app with its siblings and names the ones the README never lists", async () => {
    const { examplesDir, symbolsDir, out } = await fixture(
      [
        example({ id: "demo", name: "demo", family: "Demo", category: "Application", platformVersion: "2.0" }),
        example({ id: "demo-4", name: "demo", family: "Demo", category: "Application", platformVersion: "4.0" }),
        example({ id: "stray", name: "stray", platformVersion: "3.0" }),
      ],
      [],
    );

    await renderExamples(examplesDir, symbolsDir, out);
    const index = await readFile(path.join(out, "examples", "index.md"), "utf-8");

    assert.match(index, /## The same app, across platform versions/);
    assert.match(index, /\| Application \/ Demo \| \[2\.0\]\(demo\.md\) · \[4\.0\]\(demo-4\.md\) \|/);
    assert.match(index, /## Samples the README does not list/);
    assert.match(index, /\[stray\]\(stray\.md\)/);
    assert.match(index, /\*not listed\*/, "and the row says so rather than leaving the column blank");
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

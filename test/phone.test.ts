import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { enrich } from "../src/enrich/index.js";
import { parsePhoneApis } from "../src/parse/phone.js";
import type { RawUnit } from "../src/types.js";

// The Side Service and the Settings App are two of the three parts of a Mini
// Program, and both were at zero. Each case below pins one of the four shapes
// their 22 pages take, or one of the bugs a shape produced.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byId = (units: RawUnit[]) => new Map(units.map((u) => [`${u.module}.${u.symbol}`, u]));

describe("parsePhoneApis", () => {
  it("attributes each tree to its runtime", async () => {
    const units = await parsePhoneApis(CACHE);

    assert.ok(units.length > 0);
    assert.deepEqual(
      [...new Set(units.map((u) => u.runtimeHint))].sort(),
      ["settings", "side-service"],
      "these are the two runtimes that execute in the Zepp App",
    );
  });

  it("reads a page whose `##` headings are the symbols", async () => {
    const units = byId(await parsePhoneApis(CACHE));

    assert.equal(units.get("settings-storage.setItem")?.description, "Storing key-value pairs.");
    assert.ok(units.get("settings-storage.length"), "`## length: number` names the member `length`");
  });

  it("drops the `###` that describe a symbol rather than naming one", async () => {
    // `### Type` and `## Code example` belong to the symbol above them — the same
    // rule the llms front already applies.
    const units = await parsePhoneApis(CACHE);
    const structural = units.filter((u) => ["Type", "Types", "Code example"].includes(u.symbol));

    assert.deepEqual(structural, []);
  });

  it("reads a page whose `##` names a module and `###` the symbols", async () => {
    // `## network.downloader module` — the " module" suffix is the signal that
    // the symbols sit one level down.
    const units = byId(await parsePhoneApis(CACHE));

    assert.equal(units.get("download-file.downloadFile")?.description, "return `DownloadTask` object");
    assert.ok(!units.has("download-file.network.downloader"), "the module heading is not a symbol");
  });

  it("never files a `: object` heading as a symbol", async () => {
    // These name the shape of a parameter or a returned value. Filing them made
    // `select.mdx` report `SelectOption` instead of `Select`, and gave
    // `download-file.mdx` a `DownloadTask` symbol described by its first method.
    const units = await parsePhoneApis(CACHE);
    const shapes = units.filter((u) =>
      ["SelectOption", "DownloadTask", "Options", "Props", "Result"].includes(u.symbol),
    );

    assert.deepEqual(shapes, []);
    assert.ok(byId(units).has("ui.Select"), "select.mdx documents Select");
  });

  it("treats a page with no symbol heading as the symbol itself", async () => {
    const units = byId(await parsePhoneApis(CACHE));

    assert.ok(units.has("ui.Button"));
    assert.ok(units.has("fetch.fetch"), "fetch.mdx has no heading at all");
  });

  it("takes the capitalisation from the page's code, not its prose", async () => {
    // `fetch` is a lowercase global; the Settings App components are capitalised.
    // The frontmatter title is prose ("Fetch API", "Auth OAUTH") and the props
    // table writes "content on the button", so only example code is evidence.
    const units = byId(await parsePhoneApis(CACHE));

    assert.ok(units.has("fetch.fetch"), "`await fetch(url)` in the example decides");
    assert.ok(units.has("ui.Button"), "not `button`, from 'content on the button'");
    assert.ok(units.has("ui.Auth"), "no example names it, so the title's first word wins");
  });

  it("finds a symbol hidden under a structural `##`", async () => {
    // `global.mdx` puts `### console.log()` under `## Basic functions`.
    const unit = byId(await parsePhoneApis(CACHE)).get("global.console.log");

    assert.ok(unit, "the trailing `()` is decoration, not part of the name");
    assert.match(unit.description ?? "", /^Console prints a log/);
  });

  it("groups a directory of pages into one pseudo-module", async () => {
    // Per-page ids gave 13 module files holding one symbol each, against the
    // store's one-file-per-module rule. `ui/` is the family Settings.render draws
    // from, so it is the module.
    const units = await parsePhoneApis(CACHE);
    const ui = units.filter((u) => u.module === "ui").map((u) => u.symbol);

    assert.deepEqual(ui.sort(), ["Auth", "Button", "Select"]);
  });

  it("follows an MDX re-export so the target's symbols carry this runtime", async () => {
    // `app-settings-api/settings-storage.mdx` is nothing but
    // `import Content from '../side-service-api/settings-storage.mdx'` plus
    // `<Content/>`. The page states that these symbols are valid in the Settings
    // App too — a multi-runtime fact from the source, not an inference.
    const units = await parsePhoneApis(CACHE);
    const setItem = units.filter((u) => u.module === "settings-storage" && u.symbol === "setItem");

    assert.equal(setItem.length, 2, "one observation per tree");
    assert.deepEqual(
      setItem.map((u) => u.runtimeHint).sort(),
      ["settings", "side-service"],
    );
  });

  it("states no API_LEVEL, because no page in either tree does", async () => {
    // Checked across all 22 pages upstream. Absence is *not stated*, never a
    // claim that any level works.
    const units = await parsePhoneApis(CACHE);

    assert.deepEqual(
      units.filter((u) => u.apiLevel !== undefined),
      [],
    );
  });
});

describe("enrich with the phone fronts", () => {
  it("merges the two trees' observations into one multi-runtime record", () => {
    const records = enrich(await_units());

    const setItem = records.find((r) => r.id === "settings-storage.setItem");
    assert.deepEqual(setItem?.runtimes, ["settings", "side-service"]);
    assert.equal(setItem?.confidence, "OFFICIAL", "a reference page is official documentation");
  });

  function await_units(): RawUnit[] {
    const base = {
      module: "settings-storage",
      symbol: "setItem",
      kind: "function" as const,
      sourceKind: "docs-phone-api" as const,
    };
    return [
      { ...base, runtimeHint: "side-service", sourceFile: "a/settings-storage.mdx" },
      { ...base, runtimeHint: "settings", sourceFile: "b/settings-storage.mdx" },
    ];
  }
});

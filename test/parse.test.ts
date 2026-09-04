import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { parseLlmsContent, parseMarkdown, parseSamples } from "../src/parse/index.js";
import type { RawUnit } from "../src/types.js";

// Fixtures are trimmed excerpts of the real upstream files, kept faithful to the
// format quirks that have already produced bugs. Every case below pins one.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byId = (units: RawUnit[]) => new Map(units.map((u) => [`${u.module}.${u.symbol}`, u]));

describe("parseMarkdown (docs-reference front)", () => {
  it("resolves the module from the example import, not the docs-site import", async () => {
    // Reference pages open with `import useBaseUrl from '@docusaurus/useBaseUrl'`
    // before any example, so "first @ import wins" filed symbols under Docusaurus.
    const unit = byId(await parseMarkdown(CACHE)).get("@zos/ui.openInspector");

    assert.ok(unit, "openInspector should be extracted");
    assert.equal(unit.module, "@zos/ui");
  });

  it("reads API_LEVEL from both badge phrasings", async () => {
    const units = byId(await parseMarkdown(CACHE));

    assert.equal(units.get("@zos/router.back")?.apiLevel, 2); // "Start from API_LEVEL"
    assert.equal(units.get("@zos/ui.openInspector")?.apiLevel, 4); // "Supported since API_LEVEL"
  });

  it("extracts the description between the heading and the first section", async () => {
    const unit = byId(await parseMarkdown(CACHE)).get("@zos/router.back");

    assert.equal(unit?.description, "Closes the current page to return to the previous page.");
  });

  it("skips a page with no module import at all", async () => {
    const units = await parseMarkdown(CACHE);

    assert.equal(
      units.filter((u) => u.symbol === "overview").length,
      0,
      "an overview page attributes to no module and must not produce a record",
    );
  });

  it("attributes the runtime from the reference tree the page lives in", async () => {
    const unit = byId(await parseMarkdown(CACHE)).get("@zos/router.back");

    assert.equal(unit?.runtimeHint, "device-app", "device-app-api/ pages document the Device App");
  });

  it(
    "reads the description from frontmatter when the page has no H1",
    { todo: "94 reference pages title via frontmatter; their descriptions are currently lost" },
    async () => {
      const unit = byId(await parseMarkdown(CACHE)).get("@zos/ui.openInspector");

      assert.ok(unit?.description);
    },
  );
});

describe("parseLlmsContent (llms front)", () => {
  it("extracts module-level constants with their API_LEVEL", async () => {
    const constant = byId(await parseLlmsContent(CACHE)).get("@zos/router.SYSTEM_APP_STATUS");

    assert.equal(constant?.kind, "constant");
    assert.equal(constant?.apiLevel, 3);
    assert.equal(constant?.description, "Activity");
  });

  it("keeps the first symbol of a module that has a Constants table", async () => {
    // `---` trails each symbol section, so the first chunk holds Constants *and*
    // the first symbol — which was being swallowed with the constants.
    const unit = byId(await parseLlmsContent(CACHE)).get("@zos/router.back");

    assert.ok(unit, "back is the first symbol after the Constants table");
    assert.equal(unit.apiLevel, 2);
  });

  it("keeps the first symbol of a module that has no Constants table", async () => {
    // Most module files have no Constants table. Assuming the first heading was
    // always "Constants" labelled the first symbol "Type" and dropped the real one.
    const units = await parseLlmsContent(CACHE);
    const appAccess = units.filter((u) => u.module === "@zos/app-access");

    assert.deepEqual(
      appAccess.map((u) => u.symbol),
      ["getSportData"],
    );
    assert.equal(appAccess[0].apiLevel, 3);
  });

  it("takes the module from the import block, not the H1 that mirrors the file name", async () => {
    // `@zos/ui` is split across files whose H1 reads "@zos/ui-methods" and similar.
    // Those ids are not importable; the import lines inside the file are the truth.
    const units = await parseLlmsContent(CACHE);
    const fromSplitFile = units.filter((u) => u.sourceFile.includes("ui-methods"));

    assert.ok(fromSplitFile.length > 0, "the split file should still yield symbols");
    assert.deepEqual([...new Set(fromSplitFile.map((u) => u.module))], ["@zos/ui"]);
  });

  it("ignores foreign modules imported by a symbol's example code", async () => {
    // deleteWidget's example also imports `@zos/router`; only the `### Import`
    // block decides the module.
    const unit = byId(await parseLlmsContent(CACHE)).get("@zos/ui.deleteWidget");

    assert.ok(unit, "deleteWidget belongs to @zos/ui, not to the example's @zos/router");
  });

  it("keeps the H1 module for a file whose imports agree with it", async () => {
    const units = await parseLlmsContent(CACHE);
    const router = units.filter((u) => u.sourceFile.includes("@zos-router"));

    assert.deepEqual([...new Set(router.map((u) => u.module))], ["@zos/router"]);
  });

  it("never emits a symbol's own sub-headings as symbols", async () => {
    const units = await parseLlmsContent(CACHE);
    const nested = units.filter((u) => ["Type", "Example", "Parameters"].includes(u.symbol));

    assert.deepEqual(nested, [], "`## Type` / `## Example` belong to the symbol above them");
  });

  it("parses a CRLF checkout the same as an LF one", async () => {
    // git clones the official repos, so on Windows (`core.autocrlf`) the whole
    // cache arrives CRLF. Regexes anchored with `$` stopped matching and the
    // `## Constants` tables silently vanished — a sync on Windows produced a
    // materially smaller KB than the same commit synced on Linux.
    const constant = byId(await parseLlmsContent(CACHE)).get("@zos/interaction.MODAL_CONFIRM");

    assert.ok(constant, "a constant row in a CRLF file must still be extracted");
    assert.equal(constant.kind, "constant");
    assert.equal(constant.apiLevel, 2);
    assert.equal(constant.description, "Modal Confirm button");
  });

  it("reads every `## Constants` group, not only the first chunk's", async () => {
    // A module documents its constants as several groups, and they are spread
    // across `---` chunks — sometimes after the chunk's symbol. Reading only the
    // first chunk found 61 of the 249 constant rows upstream.
    const units = byId(await parseLlmsContent(CACHE));

    assert.ok(units.get("@zos/interaction.MODAL_CONFIRM"), "first group, before any symbol");
    assert.ok(units.get("@zos/interaction.GESTURE_UP"), "second group, after the chunk's symbol");
    assert.equal(units.get("@zos/interaction.GESTURE_DOWN")?.apiLevel, 2);
  });

  it("never files a topic heading as a symbol", async () => {
    // `## Widget Animation` and `## keyboard API` group several symbols, which the
    // section's own `### Import` names. Filing the title invented the id
    // `@zos/ui.Widget Animation`, which nothing can import.
    const units = await parseLlmsContent(CACHE);
    const spaced = units.filter((u) => /\s/.test(u.symbol));

    assert.deepEqual(spaced, [], "a heading with whitespace is a title, not a symbol");
    assert.ok(
      byId(units).get("@zos/interaction.onKey"),
      "the real symbol under the topic heading is still extracted",
    );
  });

  it("attributes every llms unit to the Device App API it restructures", async () => {
    const units = await parseLlmsContent(CACHE);

    assert.ok(units.length > 0);
    assert.deepEqual([...new Set(units.map((u) => u.runtimeHint))], ["device-app"]);
  });
});

describe("parseSamples (samples front)", () => {
  it("records every symbol of a multi-line import", async () => {
    const units = await parseSamples(CACHE);
    const uiSymbols = units.filter((u) => u.module === "@zos/ui").map((u) => u.symbol);

    assert.deepEqual(uiSymbols.sort(), ["createWidget", "deleteWidget", "keyboard", "widget"]);
  });

  it("records the exported name of an aliased import, not the local alias", async () => {
    const units = byId(await parseSamples(CACHE));

    assert.ok(units.has("@zos/ui.widget"), "`widget as idOfWidget` exports `widget`");
    assert.ok(!units.has("@zos/ui.idOfWidget"));
  });

  it("classifies SCREAMING_CASE as a constant and the rest as functions", async () => {
    const units = byId(await parseSamples(CACHE));

    assert.equal(units.get("@zos/device.SCREEN_SHAPE_SQUARE")?.kind, "constant");
    assert.equal(units.get("@zos/device.getDeviceInfo")?.kind, "function");
  });

  it("attributes every unit to the file it was seen in", async () => {
    const unit = byId(await parseSamples(CACHE)).get("@zos/utils.px");

    assert.match(unit?.sourceFile ?? "", /simple-keyboard/);
    assert.equal(unit?.sourceKind, "sample");
  });

  it("separates the sample trees by runtime", async () => {
    // The samples front is the only one that observes more than one runtime, and
    // it is what makes the axis carry information rather than one constant.
    const units = byId(await parseSamples(CACHE));

    assert.equal(units.get("@zos/ui.createWidget")?.runtimeHint, "device-app"); // application/
    assert.equal(units.get("@zos/app.getScene")?.runtimeHint, "watchface"); // watchface/
  });
});

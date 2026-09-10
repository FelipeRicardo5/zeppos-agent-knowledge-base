import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { parseWatchface } from "../src/parse/watchface.js";
import type { RawUnit } from "../src/types.js";

// The `hm*` API: 89 reference pages the base did not read at all, and said so.
// Fixtures are trimmed real pages, each one pinning a case that had to be
// measured rather than assumed.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byId = (units: RawUnit[]) => new Map(units.map((u) => [`${u.module}.${u.symbol}`, u]));

describe("parseWatchface", () => {
  it("reads a global's page with no import line to key on", async () => {
    // Why the tree was skipped: the two symbol fronts resolve a module from an
    // `import`, and this API has none — `hmSetting` is a global. The signature
    // and the property table are in the same shapes `device-app-api` uses, so
    // both existing extractors read them unchanged.
    const unit = byId(await parseWatchface(CACHE)).get("hmSetting.getDeviceInfo");

    assert.ok(unit, "a page with no import still names a module");
    assert.equal(unit.signature, "() => deviceInfo");
    assert.equal(unit.description, "Gets the device information.");
    assert.deepEqual(unit.shapes?.map((s) => s.name), ["deviceInfo"]);
    assert.equal(unit.runtimeHint, "watchface");
  });

  it("states no API_LEVEL, because no page in the tree does", async () => {
    // Absence of evidence. Not one of the 89 pages carries a badge, so these
    // symbols answer "does this exist" and never "since when" — the same shape
    // of gap the Settings App and the Side Service have.
    const units = await parseWatchface(CACHE);

    assert.deepEqual(
      units.filter((u) => u.apiLevel !== undefined),
      [],
    );
  });

  it("takes the module from the page's own code, not from its directory", async () => {
    // `hmUI/widget/data_type.mdx` sits in the widget directory and the code
    // writes `hmUI.data_type`. Trusting the path would have filed it as
    // `hmUI.widget.data_type`, an id nothing can write — the same directory
    // collision that once mis-filed 10 symbols under the wrong runtime.
    const units = byId(await parseWatchface(CACHE));

    assert.ok(units.has("hmUI.data_type"));
    assert.ok(!units.has("hmUI.widget.data_type"));
    // And the sibling in the same directory, whose code agrees with the path.
    assert.ok(units.has("hmUI.widget.TEXT"));
  });

  it("splits a doubly-qualified enum into its global and its name", async () => {
    // Watchface enums are reached through the global: `hmUI.align.LEFT`, not
    // `align.LEFT`. Left whole, the symbol would be named `hmUI.align` with no
    // module; split, the id reads the way an `@zos` one does.
    const align = byId(await parseWatchface(CACHE)).get("hmUI.align");

    assert.ok(align, "hmUI.align is a symbol of its own");
    assert.equal(align.enums?.[0].name, "align");
    // Source order here: `enrich` is what sorts an enum's members, because it
    // is what merges several pages' partial views of one set.
    assert.deepEqual(
      align.enums?.[0].members.map((m) => m.value),
      ["LEFT", "CENTER_H"],
    );
  });

  it("treats a page at the tree root as a module and its methods as symbols", async () => {
    // `hmBle.mdx` has no parent directory, so there is no namespace for it to
    // be a symbol of: the page *is* the module. Its `## Method` entries are
    // called on the global — `hmBle.send(...)` — so they are symbols rather
    // than members of a value.
    const units = byId(await parseWatchface(CACHE));

    assert.ok(units.has("hmBle.send"));
    assert.equal(units.get("hmBle.send")?.signature, "(data: object, size: number) => void");
    assert.ok(units.has("hmBle.disConnect"));
    // The page itself is never a symbol; its `sidebar_label` is "hmBle BLE".
    assert.ok(!units.has("hmBle.hmBle"));
  });

  it("strips the argument list a method heading writes after the name", async () => {
    // `### send(data, size)`. The reference tree writes bare names and only
    // ever empty parens, so this only shows up here.
    const names = (await parseWatchface(CACHE))
      .filter((u) => u.module === "hmBle")
      .map((u) => u.symbol);

    assert.deepEqual(names.sort(), ["disConnect", "send"]);
  });

  it("attributes every symbol to the watchface runtime", async () => {
    const units = await parseWatchface(CACHE);

    assert.ok(units.length > 0);
    assert.deepEqual([...new Set(units.map((u) => u.runtimeHint))], ["watchface"]);
    assert.deepEqual([...new Set(units.map((u) => u.sourceKind))], ["docs-watchface"]);
  });
});

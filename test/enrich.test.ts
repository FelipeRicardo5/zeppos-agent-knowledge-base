import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { enrich } from "../src/enrich/index.js";
import type { RawUnit } from "../src/types.js";

function unit(overrides: Partial<RawUnit> & Pick<RawUnit, "sourceKind">): RawUnit {
  return {
    module: "@zos/router",
    symbol: "back",
    kind: "function",
    sourceFile: path.join("zeppos-docs", "docs", "reference", "back.mdx"),
    ...overrides,
  };
}

describe("enrich", () => {
  it("merges observations of the same symbol into one record", () => {
    const records = enrich([
      unit({ sourceKind: "docs-reference" }),
      unit({ sourceKind: "llms" }),
      unit({ sourceKind: "sample" }),
    ]);

    assert.equal(records.length, 1);
    assert.equal(records[0].id, "@zos/router.back");
    assert.equal(records[0].module, "@zos/router");
    assert.equal(records[0].symbol, "back");
  });

  it("prefers docs-reference over llms for a field both state", () => {
    const records = enrich([
      unit({ sourceKind: "llms", description: "from llms", apiLevel: 9 }),
      unit({ sourceKind: "docs-reference", description: "from docs", apiLevel: 2 }),
    ]);

    assert.equal(records[0].description, "from docs");
    assert.equal(records[0].minApiLevel, 2);
    assert.equal(records[0].source, "docs-reference");
  });

  it("falls back to a lower-priority source for a field the primary lacks", () => {
    const records = enrich([
      unit({ sourceKind: "docs-reference" }), // no description, no apiLevel
      unit({ sourceKind: "llms", description: "from llms", apiLevel: 3 }),
    ]);

    assert.equal(records[0].source, "docs-reference");
    assert.equal(records[0].description, "from llms");
    assert.equal(records[0].minApiLevel, 3);
  });

  it("leaves minApiLevel absent when no source states one", () => {
    const records = enrich([unit({ sourceKind: "sample" })]);

    assert.equal(records[0].minApiLevel, undefined, "an API_LEVEL is never fabricated");
  });

  it("marks a symbol documented by either docs front as OFFICIAL", () => {
    const fromDocs = enrich([unit({ sourceKind: "docs-reference" })]);
    const fromLlms = enrich([unit({ sourceKind: "llms" })]);

    assert.equal(fromDocs[0].confidence, "OFFICIAL");
    assert.equal(fromLlms[0].confidence, "OFFICIAL");
  });

  it("marks a symbol seen only in sample code as OBSERVED", () => {
    const records = enrich([unit({ sourceKind: "sample" })]);

    assert.equal(records[0].confidence, "OBSERVED");
  });

  it("normalizes originalPath to posix so the JSON does not depend on the OS", () => {
    const records = enrich([unit({ sourceKind: "docs-reference" })]);

    assert.equal(records[0].originalPath, "zeppos-docs/docs/reference/back.mdx");
  });

  it("unions the runtimes rather than letting the top-priority source win", () => {
    // Each front observes a different runtime, so they are not competing claims
    // about the same one: a symbol documented for the Device App and also seen in
    // a watchface sample is valid in both.
    const records = enrich([
      unit({ sourceKind: "docs-reference", runtimeHint: "device-app" }),
      unit({ sourceKind: "sample", runtimeHint: "watchface" }),
    ]);

    assert.deepEqual(records[0].runtimes, ["device-app", "watchface"]);
  });

  it("sorts and de-duplicates the runtimes so the walk order cannot change the JSON", () => {
    const records = enrich([
      unit({ sourceKind: "sample", runtimeHint: "watchface" }),
      unit({ sourceKind: "sample", runtimeHint: "device-app" }),
      unit({ sourceKind: "docs-reference", runtimeHint: "device-app" }),
    ]);

    assert.deepEqual(records[0].runtimes, ["device-app", "watchface"]);
  });

  it("leaves runtimes empty when no source path attributed one", () => {
    const records = enrich([unit({ sourceKind: "docs-reference" })]);

    assert.deepEqual(records[0].runtimes, [], "a runtime is never fabricated either");
  });

  it("sorts records by id so a rerun produces no diff", () => {
    const records = enrich([
      unit({ sourceKind: "docs-reference", symbol: "push" }),
      unit({ sourceKind: "docs-reference", symbol: "back" }),
      unit({ sourceKind: "docs-reference", module: "@zos/app", symbol: "getPackageInfo" }),
    ]);

    assert.deepEqual(
      records.map((r) => r.id),
      ["@zos/app.getPackageInfo", "@zos/router.back", "@zos/router.push"],
    );
  });
});

describe("enrich enums", () => {
  const align = (members: [string, string][], source: RawUnit["sourceKind"], confidence: "OFFICIAL" | "OBSERVED") =>
    unit({
      module: "@zos/ui",
      symbol: "align",
      kind: "constant",
      sourceKind: source,
      enums: [
        {
          name: "align",
          qualified: true,
          members: members.map(([value, description]) => ({
            value,
            ...(description ? { description } : {}),
            confidence,
          })),
        },
      ],
    });

  it("unions members across sources instead of letting one source win", () => {
    // The reason this field is not resolved by priority like every other one.
    // `align` is documented on `ui/widget/TEXT.mdx` with six members and on
    // `ui/widget/PAGE_INDICATOR.mdx` with three: two partial views of one set,
    // not two competing claims. Taking the higher-priority page would have
    // returned three members and called that the enum.
    const [record] = enrich([
      align([["LEFT", "left"], ["RIGHT", "right"]], "docs-reference", "OFFICIAL"),
      align([["TOP", "top"], ["LEFT", "left again"]], "docs-reference", "OFFICIAL"),
    ]);

    assert.deepEqual(
      record.enums?.[0].members.map((m) => m.value),
      ["LEFT", "RIGHT", "TOP"],
    );
    // First source in priority order wins the field, as everywhere else.
    assert.equal(record.enums?.[0].members[0].description, "left");
  });

  it("keeps a documented member OFFICIAL when sample code writes it too", () => {
    const [record] = enrich([
      align([["LEFT", "left"]], "docs-reference", "OFFICIAL"),
      align([["LEFT", ""], ["CENTER_H", ""]], "sample", "OBSERVED"),
    ]);

    const members = new Map(record.enums?.[0].members.map((m) => [m.value, m]));
    assert.equal(members.get("LEFT")?.confidence, "OFFICIAL");
    assert.equal(members.get("LEFT")?.description, "left");
    // Sample code is evidence a value exists, never evidence it is documented.
    assert.equal(members.get("CENTER_H")?.confidence, "OBSERVED");
  });

  it("keeps a list partial even when another source adds members to it", () => {
    // `createWidget`'s widget-id table says the rest are not listed. 24 more
    // values in sample code do not make that table complete, and the page has
    // to keep saying so — neither source is the whole set.
    const documented = align([["LEFT", "left"]], "docs-reference", "OFFICIAL");
    documented.enums![0].partial = true;

    const [record] = enrich([documented, align([["TOP", ""]], "sample", "OBSERVED")]);

    assert.equal(record.enums?.[0].partial, true);
    assert.equal(record.enums?.[0].members.length, 2);
  });

  it("upgrades a symbol seen only in samples to OFFICIAL once a page documents its members", () => {
    // What this front changed about the OBSERVED tier: `align`, `widget`,
    // `text_style` and `prop` were name-only sightings in sample code, with no
    // description and no level, which by the base's own absence-of-evidence
    // rule left every Device App UI uncertifiable.
    const [record] = enrich([
      unit({ module: "@zos/ui", symbol: "align", sourceKind: "sample" }),
      align([["LEFT", "left"]], "docs-reference", "OFFICIAL"),
    ]);

    assert.equal(record.confidence, "OFFICIAL");
    assert.equal(record.enums?.[0].members.length, 1);
  });
});

describe("enum member order", () => {
  it("sorts a numeric value domain numerically, not as text", () => {
    // The weather `index` runs 0..28 and `ERROR_CODE` ends at 255. Sorted as
    // text they read `0, 1, 10, 2`, which makes a 29-row lookup table unusable
    // for the one thing it is for.
    const [record] = enrich([
      unit({
        module: "@zos/sensor",
        symbol: "Weather",
        sourceKind: "docs-reference",
        enums: [
          {
            name: "index",
            qualified: false,
            members: ["10", "2", "0", "255"].map((value) => ({ value, confidence: "OFFICIAL" as const })),
          },
        ],
      }),
    ]);

    assert.deepEqual(
      record.enums?.[0].members.map((m) => m.value),
      ["0", "2", "10", "255"],
    );
  });

  it("sorts a named value set alphabetically", () => {
    const [record] = enrich([
      unit({
        module: "@zos/ui",
        symbol: "align",
        sourceKind: "docs-reference",
        enums: [
          {
            name: "align",
            qualified: true,
            members: ["TOP", "BOTTOM", "CENTER_H"].map((value) => ({
              value,
              confidence: "OFFICIAL" as const,
            })),
          },
        ],
      }),
    ]);

    assert.deepEqual(
      record.enums?.[0].members.map((m) => m.value),
      ["BOTTOM", "CENTER_H", "TOP"],
    );
  });
});

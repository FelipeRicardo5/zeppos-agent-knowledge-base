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

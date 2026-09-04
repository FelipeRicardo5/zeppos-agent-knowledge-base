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

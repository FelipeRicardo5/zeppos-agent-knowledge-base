import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { censusOf } from "../src/index/census.js";
import { absences, notCovered } from "../src/mcp/answer.js";
import type { ModuleFile } from "../src/store/index.js";
import type { SymbolRecord } from "../src/types.js";

// The honesty layer. Every other test here asks whether a fact was extracted
// correctly; these ask whether a *missing* fact is reported in a way a reader
// cannot mistake for "no such thing" or "anything goes".

const record = (overrides: Partial<SymbolRecord> = {}): SymbolRecord => ({
  id: "hmUI.createWidget",
  module: "hmUI",
  symbol: "createWidget",
  type: "function",
  runtimes: ["watchface"],
  source: "docs-watchface",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/watchface/api/hmUI.mdx",
  extractedAt: "2026-09-11",
  ...overrides,
});

const modules = (symbols: SymbolRecord[]): ModuleFile[] => [
  { module: "hmUI", symbols } as ModuleFile,
];

describe("absences", () => {
  it("says nothing about a field the record states", () => {
    const base = modules([record({ minApiLevel: 3 })]);
    const found = absences(record({ minApiLevel: 3 }), censusOf(base));

    assert.equal(
      found.find((a) => a.field === "minApiLevel"),
      undefined,
    );
  });

  it("treats an empty array as absent, not as an answer", () => {
    // `permissions: []` read as "no permission needed" is the exact mistake
    // the eval found an agent making. It means nothing was extracted.
    const base = modules([record({ permissions: [] })]);
    const found = absences(record({ permissions: [] }), censusOf(base));

    assert.ok(found.some((a) => a.field === "permissions"));
  });

  it("refuses to let absence read as permission to pick a value", () => {
    const found = absences(record(), censusOf(modules([record()])));
    const level = found.find((a) => a.field === "minApiLevel");

    assert.ok(level);
    assert.match(level.meaning, /absence of evidence, not evidence that any level works/);
  });

  it("quotes how broadly the field is absent, per runtime", () => {
    // A base-wide figure would hide the thing that actually matters: the
    // Device App can be certified for a device and no other runtime can.
    const base = modules([
      record({ minApiLevel: 3, runtimes: ["device-app"] }),
      record({ id: "hmUI.a", runtimes: ["device-app"] }),
      record({ id: "hmUI.b", runtimes: ["watchface"] }),
    ]);
    const found = absences(record({ runtimes: ["device-app", "watchface"] }), censusOf(base));
    const level = found.find((a) => a.field === "minApiLevel");

    assert.deepEqual(level?.coverage, [
      { runtime: "device-app", field: "minApiLevel", stated: 1, total: 2 },
      { runtime: "watchface", field: "minApiLevel", stated: 0, total: 1 },
    ]);
  });
});

describe("notCovered", () => {
  it("never lets a miss read as a denial that the symbol exists", () => {
    const miss = notCovered("@zos/ui.nope");

    assert.equal(miss.found, false);
    assert.match(miss.meaning, /not covered, never that the symbol does not exist/);
  });
});

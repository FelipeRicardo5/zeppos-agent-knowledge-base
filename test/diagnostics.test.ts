import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { unreadHeaders } from "../src/parse/diagnostics.js";
import { readsHeader } from "../src/parse/spec.js";

// Every parser bug this project has had was one upstream table whose column
// heading no map recognised, dropped without an error — eight of them in a
// single session, each found by accident. This is the check that makes the
// ninth arrive as a number instead of as a silence.
const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

describe("unreadHeaders", () => {
  it("reports a table heading no column map reads", async () => {
    const rows = await unreadHeaders(CACHE);

    assert.ok(rows.length > 0, "the fixtures contain headings nothing reads");
    for (const row of rows) {
      assert.ok(!readsHeader(row.header), `${row.header} is reported yet read`);
      assert.ok(row.tables > 0);
      assert.ok(row.files.length > 0, "a report with no file to open is not actionable");
    }
  });

  it("says nothing about a heading the maps do read", async () => {
    const rows = await unreadHeaders(CACHE);
    const reported = new Set(rows.map((r) => r.header));

    for (const known of ["property", "properties", "value", "parameter", "callback name"]) {
      assert.ok(!reported.has(known), `${known} is read and must not be reported`);
    }
  });

  it("counts a table once, not once per row", async () => {
    // The cost of missing a table is the table. A 39-row one is not 39
    // findings, and ranking by rows would bury a small table that matters.
    const rows = await unreadHeaders(CACHE);

    for (const row of rows) {
      assert.ok(row.tables <= 20, `${row.header} reports ${row.tables} — counting rows, not tables`);
    }
  });

  it("asks the column maps rather than keeping a copy of them", () => {
    // The first version held its own list of read headings. The entry added the
    // same hour to read a Chinese-headed table was then reported as unread, and
    // a list that hid `callback name` kept the DELEGATE lifecycle invisible.
    // There is no second source of truth here, so there is nothing to check
    // against — only something to drift from.
    assert.equal(readsHeader("Callback Name"), true);
    assert.equal(readsHeader("Properties"), true);
    assert.equal(readsHeader("\u53c2\u6570"), true);
    assert.equal(readsHeader("Preparation Items"), false);
  });
});

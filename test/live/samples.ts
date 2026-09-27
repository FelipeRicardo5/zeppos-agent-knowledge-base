import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import { before, describe, it } from "node:test";
import { check } from "../../src/check/index.js";
import { loadBase } from "../../src/mcp/base.js";
import type { Base } from "../../src/mcp/base.js";
import { readExampleFiles } from "../../src/store/read.js";
import type { ExampleRecord } from "../../src/types.js";

// `check` against the real sample apps, which live in `.cache/` and are put
// there by `npm run sync`.
//
// Not named `*.test.ts`, so `npm test` does not collect it. That is the whole
// point of the file: `npm test` is hermetic — fixtures only, no cache, no
// network — and this measurement cannot be. Run by `npm run test:samples`, and
// by the weekly sync workflow, which has just cloned the cache.
//
// It was a `*.test.ts` once. It passed on every machine that had run `sync` and
// failed in CI with an ENOENT naming a path nobody had, which is the shape this
// separation exists to prevent: a test whose result depends on what happens to
// be on the disk says nothing about the code.
//
// The apps are not hardcoded. Each one's directory is read from the
// `originalPath` the base itself recorded, so an app upstream renames or moves
// follows the next sync instead of turning into a second ENOENT.

const CACHE_DIR = ".cache";
const EXAMPLES_DIR = path.join("data", "examples");

let base: Base;
let examples: ExampleRecord[];

before(async () => {
  // An absence has to carry why it is absent. Without this the first app fails
  // with a bare ENOENT on a path the reader has no reason to recognise.
  try {
    await access(CACHE_DIR);
  } catch {
    throw new Error(
      `No ${CACHE_DIR}/ directory. These checks read the real sample apps, which ` +
        "`npm run sync` clones from upstream. Run it first, or run `npm test` for " +
        "the hermetic suite.",
    );
  }

  base = await loadBase(".");
  examples = await readExampleFiles(EXAMPLES_DIR);
  assert.ok(examples.length > 0, `no example records under ${EXAMPLES_DIR}`);
});

describe("check, against the official samples", () => {
  it("contradicts none of them", async () => {
    // These apps ship and work. A violation here is this base being wrong about
    // shipped code, not the app being wrong — which is why it fails loudly and
    // names the app rather than counting.
    const contradicted: string[] = [];

    for (const example of examples) {
      const report = await check(path.join(CACHE_DIR, example.originalPath), base);
      if (report.counts.VIOLATION > 0) {
        const detail = report.findings
          .filter((f) => f.status === "VIOLATION")
          .map((f) => `${f.rule} ${f.subject}`)
          .join(", ");
        contradicted.push(`${example.id}: ${detail}`);
      }
    }

    assert.deepEqual(contradicted, [], "this base contradicts code that ships");
  });

  it("still cannot vouch for all of it", async () => {
    // The measurement the three-way verdict exists for, and the reason `check`
    // never answers pass/fail: zero violations across every official sample,
    // and symbols in them this base has nothing to say about. If this ever
    // stops being true it is a coverage result worth reading, not a green tick.
    let vouched = 0;
    let unverifiable = 0;

    for (const example of examples) {
      const report = await check(path.join(CACHE_DIR, example.originalPath), base);
      vouched += report.counts.VOUCHED;
      unverifiable += report.counts.UNVERIFIABLE;
    }

    console.log(
      `${examples.length} official samples: ${vouched} vouched, ${unverifiable} unverifiable, 0 violations`,
    );

    assert.ok(vouched > 0, "the base vouched for nothing in any official sample");
    assert.ok(unverifiable > 0, "no violation is not approval");
  });
});

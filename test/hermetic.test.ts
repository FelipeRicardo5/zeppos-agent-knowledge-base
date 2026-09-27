import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";

// The suite's own contract: `npm test` is fixtures only — no cache, no network.
//
// This exists because breaking it is invisible locally. A test that reads
// `.cache/` passes on every machine that has run `npm run sync` and fails only
// in CI, with an ENOENT naming a path the reader has no reason to recognise.
// One did, for as long as it took someone to look at a red build.
//
// A test that needs the real upstream checkout is not forbidden — it belongs in
// `test/live/`, outside the `test/**/*.test.ts` glob, run by `npm run
// test:samples` and by the sync workflow, which has just cloned the cache.

const CACHE_READ = /\.cache\b/;
const FETCH_IMPORT = /from\s+["'][^"']*\/fetch\//;

/**
 * The file with its comments removed.
 *
 * Without this the check reads its own explanation: every one of these files
 * says in prose what it must not do, and the first version of this test failed
 * on a sentence naming `.cache/` inside a comment. What is being looked for is
 * a path the code opens, so the prose has to go first.
 *
 * `//` is only a comment when it does not follow a colon, which is what keeps a
 * URL in a comment from swallowing the rest of its line.
 */
function code(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Every file `npm test` collects, which is the glob in package.json. */
async function collected(): Promise<string[]> {
  const entries = await readdir("test", { recursive: true, withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".test.ts"))
    .map((e) => path.join(e.parentPath ?? e.path, e.name));
}

describe("the hermetic suite", () => {
  it("collects files, so the glob is not silently matching nothing", async () => {
    assert.ok((await collected()).length > 5);
  });

  it("reads no path under .cache/", async () => {
    const offenders: string[] = [];

    for (const file of await collected()) {
      if (path.basename(file) === "hermetic.test.ts") continue; // the patterns above
      if (CACHE_READ.test(code(await readFile(file, "utf-8")))) offenders.push(file);
    }

    assert.deepEqual(
      offenders,
      [],
      "a collected test reads .cache/, which CI does not have — move it to test/live/",
    );
  });

  it("imports nothing from the fetch stage", async () => {
    // `fetch` is the one stage that touches the network. Nothing `npm test`
    // collects may reach it, on any path.
    const offenders: string[] = [];

    for (const file of await collected()) {
      if (path.basename(file) === "hermetic.test.ts") continue;
      if (FETCH_IMPORT.test(code(await readFile(file, "utf-8")))) offenders.push(file);
    }

    assert.deepEqual(offenders, [], "a collected test imports the fetch stage");
  });
});

import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { restampVersion } from "../src/store/index.js";

// The version an isolated eval run cites. It lives in `data/manifest.json`
// because the copy is built with `git archive` and has no `.git` to ask — so if
// the manifest is behind, two runs measuring different bases report the same
// version and the comparison between them is silently wrong.
//
// Until this existed the stamp was written only by `sync`, which meant a
// release had to re-fetch both upstream repositories and commit whatever they
// had changed along with it. Hence: render stamps it, and stamps nothing else.

async function manifestDir(manifest: unknown): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "store-"));
  await writeFile(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  return dir;
}

const synced = {
  version: "0.2.0",
  lastSyncAt: "2026-09-22T20:25:03.762Z",
  sources: { "zeppos-docs": { commit: "c08725b2" } },
  recordCounts: { symbols: 513 },
};

describe("restampVersion", () => {
  it("moves the version to the one package.json states", async () => {
    const dir = await manifestDir(synced);

    const moved = await restampVersion(dir, "0.3.0");

    assert.deepEqual(moved, { from: "0.2.0", to: "0.3.0" });
    const written = JSON.parse(await readFile(path.join(dir, "manifest.json"), "utf-8"));
    assert.equal(written.version, "0.3.0");
  });

  it("leaves every claim a sync made alone", async () => {
    // The other fields describe a fetch. A render that rewrote `lastSyncAt` or
    // `recordCounts` would be asserting a sync that never ran, which is the
    // same class of untruth as a hand-typed count.
    const dir = await manifestDir(synced);

    await restampVersion(dir, "0.3.0");

    const written = JSON.parse(await readFile(path.join(dir, "manifest.json"), "utf-8"));
    assert.equal(written.lastSyncAt, synced.lastSyncAt);
    assert.deepEqual(written.sources, synced.sources);
    assert.deepEqual(written.recordCounts, synced.recordCounts);
  });

  it("reports nothing when the version already matches", async () => {
    // Render runs on every change and CI diffs its output: a rewrite that
    // changed no value would still be a write, and a write that reports itself
    // trains a reader to ignore the line.
    const dir = await manifestDir(synced);

    assert.equal(await restampVersion(dir, "0.2.0"), undefined);
  });

  it("does not invent a manifest for a tree that never synced", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "store-"));

    assert.equal(await restampVersion(dir, "0.3.0"), undefined);
  });
});

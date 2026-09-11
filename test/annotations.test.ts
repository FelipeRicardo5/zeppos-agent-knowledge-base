import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  annotationLines,
  annotationsFor,
  readAnnotations,
  staleAnnotations,
} from "../src/render/annotations.js";
import type { Annotation, SymbolRecord } from "../src/types.js";

// The one input a human writes. Everything else in this repository traces to a
// source, so this is the only place a claim can exist without one — which makes
// the rules around it the point, not the reading of a JSON file.

const note = (overrides: Partial<Annotation> = {}): Annotation => ({
  id: "@zos/ui.GRADIENT_POLYLINE",
  confidence: "INFERRED",
  note: "Every sample writes GRADKIENT_POLYLINE.",
  writtenAgainst: { symbol: "GRADIENT_POLYLINE" },
  date: "2026-09-11",
  ...overrides,
});

const record = (overrides: Partial<SymbolRecord> = {}): SymbolRecord => ({
  id: "@zos/ui.GRADIENT_POLYLINE",
  module: "@zos/ui",
  symbol: "GRADIENT_POLYLINE",
  type: "constant",
  runtimes: ["device-app"],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/x.mdx",
  extractedAt: "2026-09-11",
  ...overrides,
});

const index = (records: SymbolRecord[]) => new Map(records.map((r) => [r.id, r]));

async function fixture(content: string | undefined) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "annotations-"));
  if (content !== undefined) {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "symbols.json"), content);
  }
  return dir;
}

describe("readAnnotations", () => {
  it("treats an absent file as nothing to say", async () => {
    // The normal state of a repository with no hand-written judgements in it.
    const dir = await fixture(undefined);

    assert.deepEqual(await readAnnotations(dir), []);
  });

  it("throws on a malformed file rather than dropping it", async () => {
    // Silently discarding a human judgement is worse than failing the run that
    // would have hidden it — the whole point is that someone chose to write it.
    const dir = await fixture(JSON.stringify([{ id: "@zos/ui.X" }]));

    await assert.rejects(readAnnotations(dir), /expected an array/);
  });

  it("reads a well-formed file", async () => {
    const dir = await fixture(JSON.stringify([note()]));
    const [read] = await readAnnotations(dir);

    assert.equal(read.id, "@zos/ui.GRADIENT_POLYLINE");
    assert.equal(read.confidence, "INFERRED");
  });
});

describe("staleAnnotations", () => {
  it("reports a note whose symbol is gone", async () => {
    // Upstream deleted or renamed it, so the note is about nothing.
    const stale = staleAnnotations([note()], index([]));

    assert.equal(stale.length, 1);
    assert.match(stale[0].reason, /no symbol has this id/);
  });

  it("reports a note whose pinned value moved", () => {
    // The claim was written against a name, a level or a description. When that
    // changes the note may have become a lie, and nobody would notice — this
    // repository's own prose has gone stale three times exactly that way.
    const stale = staleAnnotations(
      [note({ writtenAgainst: { symbol: "GRADIENT_POLYLINE_OLD" } })],
      index([record()]),
    );

    assert.equal(stale.length, 1);
    assert.match(stale[0].reason, /`symbol` was "GRADIENT_POLYLINE_OLD".*is now "GRADIENT_POLYLINE"/);
  });

  it("says nothing while the ground has not moved", () => {
    assert.deepEqual(staleAnnotations([note()], index([record()])), []);
  });

  it("checks every pinned field, not only the first", () => {
    const stale = staleAnnotations(
      [note({ writtenAgainst: { symbol: "GRADIENT_POLYLINE", confidence: "OBSERVED" } })],
      index([record()]),
    );

    assert.equal(stale.length, 1);
    assert.match(stale[0].reason, /`confidence`/);
  });
});

describe("annotationLines", () => {
  it("marks a note as human, with its tier and date", () => {
    // A reader has to be able to tell at a glance that a person wrote this. The
    // base's one property is that every other statement traces to a source, and
    // a note that reads like extraction destroys it.
    const lines = annotationLines(note()).join("\n");

    assert.match(lines, /\*\*Note — `INFERRED`, written 2026-09-11\.\*\*/);
    assert.match(lines, /Not extracted from any/);
    assert.match(lines, /Every sample writes GRADKIENT_POLYLINE\./);
  });

  it("selects only the notes for one symbol", () => {
    const notes = [note(), note({ id: "@zos/ui.TEXT", note: "Something else." })];

    assert.deepEqual(
      annotationsFor(notes, "@zos/ui.TEXT").map((n) => n.note),
      ["Something else."],
    );
  });
});

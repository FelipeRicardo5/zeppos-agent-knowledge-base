import { readFile } from "node:fs/promises";
import path from "node:path";
import type { SymbolRecord } from "../types.js";
import { readAnnotations, staleAnnotations } from "../render/annotations.js";
import { readModuleFiles } from "../render/shared.js";
import { ANSWERS } from "./answers.js";

// Stage 5, and the one the project had never had: does the base *answer*?
//
// `test/` proves the extractor does not regress against fixtures. `eval/` proves
// an agent can get through a task, but it needs a fresh isolated session and a
// human to read the report, so it runs rarely. Between the two there was nothing
// that could be run on demand to check that a real question still gets a real
// answer — item 14 on the roadmap, and every aggregate check done by hand while
// the last seven items were built.
//
// It reads the **rendered pages**, not just the JSON, because an agent reads
// Markdown. A fact that survives into `data/` and dies in the render is still a
// wrong answer.
//
// Deliberately not part of `npm test`. The suite is hermetic and runs against
// fixtures; this needs a synced `data/` and a rendered tree, so it is its own
// command and says plainly when it cannot run.

export interface Base {
  /** Annotations whose pinned values no longer match the records. */
  stale: () => { id: string; reason: string }[];
  /** Every symbol record, across every module. */
  symbols: () => SymbolRecord[];
  /** One record by id, or undefined. */
  symbol: (id: string) => SymbolRecord | undefined;
  /** A rendered page's text, by path relative to the output root. */
  page: (relative: string) => string;
}

export interface VerifyResult {
  total: number;
  failures: { question: string; why: string; detail: string }[];
}

async function loadBase(
  symbolsDir: string,
  outDir: string,
  pages: string[],
  annotationsDir: string,
): Promise<Base> {
  const modules = await readModuleFiles(symbolsDir);
  const records = modules.flatMap((m) => m.symbols);
  const byId = new Map(records.map((r) => [r.id, r]));
  const notes = await readAnnotations(annotationsDir);

  const text = new Map<string, string>();
  for (const relative of pages) {
    try {
      text.set(relative, await readFile(path.join(outDir, relative), "utf-8"));
    } catch {
      // Recorded as empty rather than thrown: a missing page should fail the
      // question that needs it, naming the question, not abort the whole run.
      text.set(relative, "");
    }
  }

  return {
    stale: () =>
      staleAnnotations(notes, byId).map(({ annotation, reason }) => ({
        id: annotation.id,
        reason,
      })),
    symbols: () => records,
    symbol: (id) => byId.get(id),
    page: (relative) => text.get(relative) ?? "",
  };
}

/** Every page any question reads. Loaded up front so a run is one pass. */
const PAGES = [
  "api/index.md",
  "api/lookup.md",
  "api/hmSensor.md",
  "api/zos-alarm.md",
  "api/zos-sensor.md",
  "api/zos-ui.md",
  "compatibility/index.md",
  "compatibility/devices.md",
  "conflicts/index.md",
  "examples/index.md",
  "patterns/multi-screen-adaption.md",
  "runtimes/watchface.md",
];

export async function verify(
  symbolsDir: string,
  outDir: string,
  annotationsDir: string,
): Promise<VerifyResult> {
  const base = await loadBase(symbolsDir, outDir, PAGES, annotationsDir);
  const failures: VerifyResult["failures"] = [];

  for (const answer of ANSWERS) {
    let detail: string | undefined;
    try {
      detail = answer.check(base);
    } catch (error) {
      detail = `the check threw: ${(error as Error).message}`;
    }
    if (detail !== undefined) {
      failures.push({ question: answer.question, why: answer.why, detail });
    }
  }

  return { total: ANSWERS.length, failures };
}

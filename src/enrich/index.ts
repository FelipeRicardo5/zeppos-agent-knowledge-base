import path from "node:path";
import type { Confidence, RawUnit, SymbolRecord } from "../types.js";

// Stage 3: enrich — group the three fronts' observations by symbol id and
// reconcile them into one normalized record per symbol.
//
// Source priority for any field with multiple candidates: docs-reference > llms
// > sample. docs-reference and llms both come from the official zeppos-docs repo
// (a documented claim), so either alone earns OFFICIAL confidence. A symbol seen
// only in sample code (real usage, no doc entry) earns OBSERVED. RECOMMENDED and
// COMMUNITY aren't derivable from these three automated fronts — they're left for
// a future manual-curation pass, per the open questions in README.md.
//
// `runtimes` is the one field that is unioned rather than resolved by priority,
// because each front observes a different runtime rather than a competing claim
// about the same one. See src/parse/runtime.ts for where the hints come from.

const SOURCE_PRIORITY = ["docs-reference", "llms", "sample"] as const;

function bestOf<T extends RawUnit>(units: T[]): T[] {
  return [...units].sort(
    (a, b) => SOURCE_PRIORITY.indexOf(a.sourceKind) - SOURCE_PRIORITY.indexOf(b.sourceKind),
  );
}

// Paths are persisted posix-style so the JSON is identical whatever OS synced it.
function toPosixPath(file: string): string {
  return file.split(path.sep).join("/");
}

function confidenceFor(units: RawUnit[]): Confidence {
  const hasDocs = units.some((u) => u.sourceKind === "docs-reference" || u.sourceKind === "llms");
  return hasDocs ? "OFFICIAL" : "OBSERVED";
}

export function enrich(rawUnits: RawUnit[]): SymbolRecord[] {
  const groups = new Map<string, RawUnit[]>();

  for (const unit of rawUnits) {
    const id = `${unit.module}.${unit.symbol}`;
    const group = groups.get(id);
    if (group) group.push(unit);
    else groups.set(id, [unit]);
  }

  const records: SymbolRecord[] = [];
  const extractedAt = new Date().toISOString().slice(0, 10);

  for (const [id, units] of groups) {
    const ranked = bestOf(units);
    const primary = ranked[0];
    const withApiLevel = ranked.find((u) => u.apiLevel !== undefined);
    const withDescription = ranked.find((u) => u.description !== undefined);
    // Unioned, not prioritized: a symbol documented under the Device App API and
    // also seen in a watchface sample is valid in both, so both are evidence. The
    // sort keeps the persisted JSON identical whatever order the walk produced.
    const runtimes = [...new Set(units.map((u) => u.runtimeHint).filter((r) => r !== undefined))].sort();

    records.push({
      id,
      module: primary.module,
      symbol: primary.symbol,
      type: primary.kind,
      description: withDescription?.description,
      minApiLevel: withApiLevel?.apiLevel,
      runtimes,
      source: primary.sourceKind,
      confidence: confidenceFor(units),
      originalPath: toPosixPath(primary.sourceFile),
      extractedAt,
    });
  }

  return records.sort((a, b) => a.id.localeCompare(b.id));
}

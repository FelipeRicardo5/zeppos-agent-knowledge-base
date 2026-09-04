import path from "node:path";
import { deviceSlug } from "../parse/devices.js";
import type {
  Confidence,
  DeviceRecord,
  PatternRecord,
  RawDevice,
  RawPattern,
  RawUnit,
  Runtime,
  SymbolRecord,
} from "../types.js";

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

/**
 * Patterns enrich: one guide in, one record out. There is nothing to reconcile —
 * each guide is a single source — so this only rolls the per-approach symbol,
 * module and runtime sets up to the pattern and normalizes the metadata.
 *
 * `runtimes` stays what the guide's own fence titles state. The runtimes of the
 * symbols it uses are *not* folded in: that would copy symbol data into the
 * pattern record and let the two drift, so render joins them instead.
 */
export function enrichPatterns(rawPatterns: RawPattern[]): PatternRecord[] {
  const extractedAt = new Date().toISOString().slice(0, 10);

  return rawPatterns
    .map((pattern) => ({
      id: pattern.id,
      title: pattern.title,
      summary: pattern.summary,
      approaches: pattern.approaches,
      symbols: [...new Set(pattern.approaches.flatMap((a) => a.symbols))].sort(),
      modules: [...new Set(pattern.approaches.flatMap((a) => a.modules))].sort(),
      runtimes: [
        ...new Set(
          pattern.approaches
            .flatMap((a) => a.snippets.map((s) => s.runtime))
            .filter((runtime): runtime is Runtime => runtime !== undefined),
        ),
      ].sort(),
      referencePages: pattern.referencePages,
      // A best-practice guide is official documentation, like docs-reference.
      source: "docs-guide" as const,
      confidence: "OFFICIAL" as Confidence,
      originalPath: toPosixPath(pattern.sourceFile),
      extractedAt,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Devices enrich: one table row in, one record out. Nothing to reconcile — the
 * device list is a single source — so this only adds the slug and the metadata.
 *
 * Sorted by name rather than by API_LEVEL so the persisted JSON depends on the
 * source content and not on values that shift when a device gets an update; the
 * render view sorts by level for reading.
 */
export function enrichDevices(rawDevices: RawDevice[]): DeviceRecord[] {
  const extractedAt = new Date().toISOString().slice(0, 10);

  return rawDevices
    .map(({ sourceFile, ...device }) => ({
      ...device,
      slug: deviceSlug(device.name),
      source: "docs-device-list" as const,
      confidence: "OFFICIAL" as Confidence,
      originalPath: toPosixPath(sourceFile),
      extractedAt,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

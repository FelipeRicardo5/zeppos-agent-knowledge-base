import type { ModuleFile } from "../store/index.js";
import type { Runtime, SymbolRecord } from "../types.js";

// How much of each runtime this base actually states, counted from the data.
//
// The base has always known this and never said it in a number. `runtimes/`
// derived exactly one such statement — whether a runtime documents a
// permission — and that one line is what stopped an eval run from reading an
// empty `permissions` array as "none needed". The rest of the axes were left
// to prose in the changelog, which is the form that goes stale.
//
// Counting them here, from the loaded records, gives both consumers the same
// figures: the rendered runtime page and the tool answering why a field is
// missing. Neither writes a number down.
//
// Per runtime rather than base-wide, because that is where the silences are.
// A symbol attributed to two runtimes counts in both — the question "can this
// base certify a watchface" is about the watchface tree, and a `@zos/*` symbol
// a watchface may also use is part of that answer.

/**
 * The axes worth counting.
 *
 * Each is here because a run has been blocked or forced into an assumption by
 * its absence — not because it can be absent, since most fields can.
 * `description` is deliberately out: nobody has been stopped by its absence.
 */
export const CENSUS_FIELDS = ["minApiLevel", "signature", "members", "permissions"] as const;

export type CensusField = (typeof CENSUS_FIELDS)[number];

/** How many symbols of a runtime state a field, out of how many exist. */
export interface Coverage {
  runtime: Runtime;
  field: CensusField;
  stated: number;
  total: number;
}

/**
 * Whether a record states a field.
 *
 * An empty array counts as absent. `permissions: []` read as "no permission
 * needed" is the precise mistake this whole layer exists to prevent — it means
 * nothing was extracted, not that nothing is required.
 */
export function states(record: SymbolRecord, field: CensusField): boolean {
  const value = record[field];
  return Array.isArray(value) ? value.length > 0 : value !== undefined;
}

export type Census = Map<Runtime, Map<CensusField, Coverage>>;

/** Count every axis for every runtime present in the records. */
export function censusOf(modules: ModuleFile[]): Census {
  const census: Census = new Map();

  for (const module of modules) {
    for (const record of module.symbols) {
      for (const runtime of record.runtimes) {
        let byField = census.get(runtime);
        if (!byField) census.set(runtime, (byField = new Map()));

        for (const field of CENSUS_FIELDS) {
          const seen = byField.get(field) ?? { runtime, field, stated: 0, total: 0 };
          byField.set(field, {
            runtime,
            field,
            stated: seen.stated + (states(record, field) ? 1 : 0),
            total: seen.total + 1,
          });
        }
      }
    }
  }

  return census;
}

/** Every axis of one runtime, in declared order, for a caller that renders a table. */
export function coverageOf(census: Census, runtime: Runtime): Coverage[] {
  const byField = census.get(runtime);
  if (!byField) return [];
  return CENSUS_FIELDS.map((field) => byField.get(field)).filter(
    (c): c is Coverage => c !== undefined,
  );
}

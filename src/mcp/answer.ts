import {
  CENSUS_FIELDS,
  type Census,
  type CensusField,
  type Coverage,
  states,
} from "../index/census.js";
import type { SymbolRecord } from "../types.js";

// Why a field is missing, said out loud, in the payload.
//
// This is the piece that decides whether the server inherits the base's one
// property or destroys it. Every rendered page in this repository states what
// it does not know: `compatibility/` prints `not stated` rather than a guess,
// `runtimes/` derives how much of each axis its runtime actually states. A
// tool that answers `{ minApiLevel: undefined }` and stops has dropped all of
// it, and an agent reading that JSON cannot tell "nobody documented this" from
// "the extractor failed" from "any level works". The server would then be
// *less honest than the Markdown it was built from*, which is the worst
// outcome available to this project.
//
// The split with `index/census.ts` is the rule that keeps it true: **that file
// counts, this file says what a count means.** What absence means is a
// property of this base and never changes, so it is written here as a
// sentence. How much is absent is a fact about today's data, so it is never
// written down at all. Prose with figures baked into it has gone stale in this
// repository three times, twice in the very file that forbids it.

/** What absence of each axis licenses a reader to conclude — and what it does not. */
const MEANING: Record<CensusField, string> = {
  minApiLevel:
    "No source states a minimum API_LEVEL for this symbol. That is absence of " +
    "evidence, not evidence that any level works: this base cannot tell you " +
    "whether the symbol runs on a given device.",
  signature:
    "No source states how to call this symbol — only that it exists. Argument " +
    "names, arity and order are unknown rather than empty.",
  members:
    "No source documents what can be called on a value this symbol produces. " +
    "Members are recorded only where a page declares a Methods section.",
  permissions:
    "No source states a permission for this symbol. An empty permissions array " +
    "is therefore the citable choice, not a verified one.",
};

/** A field that is not there, and what a reader may conclude from that. */
export interface Absence {
  field: CensusField;
  /** Definitional — a statement about evidence, never about a value. */
  meaning: string;
  /** How broadly the field is absent, in the runtimes this symbol belongs to. */
  coverage: Coverage[];
}

/**
 * Every counted axis this record does not state.
 *
 * Returns an empty array for a fully documented symbol — a shape a caller can
 * ignore without a special case.
 */
export function absences(record: SymbolRecord, census: Census): Absence[] {
  return CENSUS_FIELDS.filter((field) => !states(record, field)).map((field) => ({
    field,
    meaning: MEANING[field],
    coverage: record.runtimes
      .map((runtime) => census.get(runtime)?.get(field))
      .filter((c): c is Coverage => c !== undefined),
  }));
}

/** What a caller gets when no record carries the id it asked for. */
export interface NotCovered {
  found: false;
  id: string;
  meaning: string;
  /** Names that do resolve, when the id looks like a near miss. */
  suggestions: string[];
}

/**
 * A miss, said the only way this base is allowed to say it.
 *
 * The distinction is the whole product. This base is a projection of two
 * upstream repositories, and both eval runs show the failure mode is an agent
 * reading "not in the base" as "does not exist" and then inventing a
 * replacement.
 */
export function notCovered(id: string, suggestions: string[] = []): NotCovered {
  return {
    found: false,
    id,
    meaning:
      "No record in this base carries that id. That means not covered, never " +
      "that the symbol does not exist — this base is a projection of the " +
      "upstream documentation and samples, not an inventory of the platform.",
    suggestions,
  };
}

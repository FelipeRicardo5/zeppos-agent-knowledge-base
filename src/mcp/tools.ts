import { relatives } from "../index/modules.js";
import { type NameEntry, writtenAs } from "../index/names.js";
import { moduleSlug } from "../store/index.js";
import type { DeviceRecord, PatternRecord, Runtime, SymbolRecord } from "../types.js";
import { type Absence, type NotCovered, absences, notCovered } from "./answer.js";
import type { Base } from "./base.js";

// The tool surface.
//
// Pure functions over a loaded `Base`, with the MCP wiring kept out. That is
// not tidiness: it is what lets the acceptance test call every tool directly,
// so the suite measures the answers rather than the transport.
//
// Two rules run through all of them.
//
// **Every answer cites the page it came from.** The tools are a faster route
// into this base, never a replacement for it — an agent that cannot show where
// an answer came from has the same problem it had before the base existed.
//
// **Every absence says why**, via `answer.ts`. A tool that returns a record
// with fields quietly missing is less honest than the Markdown, and the
// Markdown is the thing being replaced at the point of use.

/** Where in the rendered base an answer can be read in full. */
function citeSymbol(record: SymbolRecord): string {
  return `api/${moduleSlug(record.module)}.md#${`${record.module}.${record.symbol}`
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, "")
    .replace(/ /g, "-")}`;
}

export interface SymbolAnswer {
  found: true;
  record: SymbolRecord;
  /** Counted axes this record does not state, and what that means. */
  absences: Absence[];
  /** Hand-written notes about it. Never merged into the record. */
  notes: { note: string; confidence: string; date: string }[];
  /**
   * The module that holds this symbol's contents, when the symbol is itself a
   * namespace. `hmSensor.id` is a constant here *and* a module of 18 ids.
   */
  contentsIn?: string;
  cite: string;
}

/**
 * One symbol by id.
 *
 * A miss returns `notCovered`, never an empty record — the difference between
 * "this base has no record" and "this does not exist" is the product.
 */
export function getSymbol(base: Base, id: string): SymbolAnswer | NotCovered {
  const record = base.symbols.get(id);
  if (!record) return notCovered(id, suggestFor(base, id));

  const namespaced = base.modules.find((m) => m.module === id);

  return {
    found: true,
    record,
    absences: absences(record, base.census),
    notes: base.annotations
      .filter((a) => a.id === id)
      .map((a) => ({ note: a.note, confidence: a.confidence, date: a.date })),
    contentsIn: namespaced?.module,
    cite: citeSymbol(record),
  };
}

/** Ids that resolve, for an id that did not. Cheap: exact name, then suffix. */
function suggestFor(base: Base, id: string): string[] {
  const bare = id.slice(id.lastIndexOf(".") + 1);
  const byName = (base.names.get(bare) ?? []).map((e) => e.owner.id);
  if (byName.length > 0) return [...new Set(byName)].slice(0, 8);
  return [...base.symbols.keys()].filter((known) => known.endsWith(`.${bare}`)).slice(0, 8);
}

export interface LookupHit {
  name: string;
  kind: NameEntry["kind"];
  /** How the name is written in code — the half an owner alone does not give. */
  writtenAs: string;
  owner: string;
  runtimes: Runtime[];
  minApiLevel?: number;
  cite: string;
}

/**
 * A bare name, and everything that owns it.
 *
 * The most-wanted change the second eval run named: every other index in this
 * base is keyed by where a thing sits, and an agent reading someone else's code
 * arrives with a name and nothing else.
 */
export function lookup(base: Base, name: string): LookupHit[] {
  return (base.names.get(name) ?? []).map((entry) => ({
    name: entry.name,
    kind: entry.kind,
    writtenAs: writtenAs(entry),
    owner: entry.owner.id,
    runtimes: entry.owner.runtimes,
    minApiLevel: entry.owner.minApiLevel,
    cite: citeSymbol(entry.owner),
  }));
}

export interface ModuleAnswer {
  found: true;
  module: string;
  symbols: { symbol: string; id: string; type: string; minApiLevel?: number }[];
  /**
   * Submodules, and how many symbols each holds.
   *
   * Load-bearing, not a convenience. A consumer that lists `hmSensor` without
   * naming `hmSensor.id` reproduces the exact failure that cost an eval run two
   * requirements: it read the parent, found a bare constant, and reported the
   * child's 18 records as missing.
   */
  submodules: { module: string; symbols: number; cite: string }[];
  partOf?: string;
  cite: string;
}

export function listModule(base: Base, module: string): ModuleAnswer | NotCovered {
  const found = base.modules.find((m) => m.module === module);
  if (!found) {
    return notCovered(
      module,
      base.modules.map((m) => m.module).filter((name) => name.includes(module)).slice(0, 8),
    );
  }

  const { parent, children } = relatives(module, base.modules);

  return {
    found: true,
    module,
    symbols: found.symbols.map((r) => ({
      symbol: r.symbol,
      id: r.id,
      type: r.type,
      minApiLevel: r.minApiLevel,
    })),
    submodules: children.map((name) => ({
      module: name,
      symbols: base.modules.find((m) => m.module === name)?.symbols.length ?? 0,
      cite: `api/${moduleSlug(name)}.md`,
    })),
    partOf: parent,
    cite: `api/${moduleSlug(module)}.md`,
  };
}

export type Verdict = "RUNS" | "TOO_NEW" | "UNKNOWN" | "NOT_COVERED";

export interface CompatibilityAnswer {
  id: string;
  verdict: Verdict;
  minApiLevel?: number;
  against: { apiLevel: number; device?: string };
  reason: string;
  cite: string;
}

/**
 * Whether symbols run at a target level.
 *
 * `UNKNOWN` is the answer that matters, and it is returned rather than a guess:
 * 160 of the base's 513 symbols state no level at all, and whole runtimes state
 * none. A tool that collapsed that into `RUNS` would certify code this base
 * cannot certify.
 */
export function checkCompatibility(
  base: Base,
  ids: string[],
  target: { apiLevel?: number; device?: string },
): CompatibilityAnswer[] | NotCovered {
  let apiLevel = target.apiLevel;
  let device: DeviceRecord | undefined;

  if (target.device !== undefined) {
    device = base.devices.find(
      (d) => d.name === target.device || d.slug === target.device,
    );
    if (!device) return notCovered(target.device, base.devices.map((d) => d.name).slice(0, 8));
    if (device.latestApiLevel === undefined) {
      return notCovered(
        target.device,
        [],
      );
    }
    apiLevel = device.latestApiLevel;
  }

  if (apiLevel === undefined) {
    throw new Error("checkCompatibility needs an apiLevel or a device");
  }

  const against = { apiLevel, device: device?.name };

  return ids.map((id) => {
    const record = base.symbols.get(id);
    if (!record) {
      return {
        id,
        verdict: "NOT_COVERED" as const,
        against,
        reason:
          "No record in this base carries that id — not covered, never that the " +
          "symbol does not exist.",
        cite: "api/lookup.md",
      };
    }

    const cite = citeSymbol(record);
    if (record.minApiLevel === undefined) {
      return {
        id,
        verdict: "UNKNOWN" as const,
        against,
        reason:
          "No source states a minimum API_LEVEL for this symbol, so this base " +
          "cannot say whether it runs. That is absence of evidence, not a pass.",
        cite,
      };
    }

    return {
      id,
      verdict: record.minApiLevel <= apiLevel ? ("RUNS" as const) : ("TOO_NEW" as const),
      minApiLevel: record.minApiLevel,
      against,
      reason:
        record.minApiLevel <= apiLevel
          ? `States a minimum of ${record.minApiLevel}, at or below the target ${apiLevel}.`
          : `States a minimum of ${record.minApiLevel}, above the target ${apiLevel}.`,
      cite,
    };
  });
}

export interface RuntimeAnswer {
  runtime: Runtime;
  symbols: { id: string; minApiLevel?: number }[];
  /** What this base states about the runtime, counted — the honest header. */
  coverage: { field: string; stated: number; total: number }[];
  cite: string;
}

export function listByRuntime(base: Base, runtime: Runtime): RuntimeAnswer {
  const symbols = base.modules
    .flatMap((m) => m.symbols)
    .filter((r) => r.runtimes.includes(runtime));

  return {
    runtime,
    symbols: symbols.map((r) => ({ id: r.id, minApiLevel: r.minApiLevel })),
    coverage: [...(base.census.get(runtime)?.values() ?? [])].map((c) => ({
      field: c.field,
      stated: c.stated,
      total: c.total,
    })),
    cite: `runtimes/${runtime}.md`,
  };
}

export interface LevelAnswer {
  apiLevel: number;
  /** Symbols whose stated minimum is at or below the level. */
  available: string[];
  /** Symbols that state nothing — neither available nor unavailable. */
  unknown: string[];
  cite: string;
}

export function listByApiLevel(base: Base, apiLevel: number): LevelAnswer {
  const all = base.modules.flatMap((m) => m.symbols);
  return {
    apiLevel,
    available: all
      .filter((r) => r.minApiLevel !== undefined && r.minApiLevel <= apiLevel)
      .map((r) => r.id),
    unknown: all.filter((r) => r.minApiLevel === undefined).map((r) => r.id),
    cite: `compatibility/index.md`,
  };
}

export interface CallCandidate {
  id: string;
  kind: NameEntry["kind"];
  writtenAs: string;
  runtimes: Runtime[];
  cite: string;
}

/**
 * What a bare `.foo()` in someone's code could be.
 *
 * The receiver's type is never resolved — that needs flow analysis this base
 * does not do — so this is a name match and says so. Narrowing by runtime is
 * what makes it useful rather than a list: `.getItem()` resolves to a Settings
 * App function and to `@zos/storage` members, and only one of those is in
 * scope in the file being read.
 */
export function resolveCall(
  base: Base,
  name: string,
  runtime?: Runtime,
): { name: string; resolved: boolean; candidates: CallCandidate[]; caveat: string } {
  const hits = (base.names.get(name) ?? []).filter(
    (e) => e.kind !== "enum value" && (runtime === undefined || e.owner.runtimes.includes(runtime)),
  );

  return {
    name,
    resolved: hits.length === 1,
    candidates: hits.map((e) => ({
      id: e.owner.id,
      kind: e.kind,
      writtenAs: writtenAs(e),
      runtimes: e.owner.runtimes,
      cite: citeSymbol(e.owner),
    })),
    caveat:
      "Matched by name only — the receiver's type is not resolved. More than one " +
      "candidate means this base cannot tell them apart, not that the call is wrong.",
  };
}

export interface DeviceAnswer {
  found: true;
  device: DeviceRecord;
  cite: string;
}

export function getDevice(base: Base, name: string): DeviceAnswer | NotCovered {
  const device = base.devices.find(
    (d) => d.name === name || d.slug === name || d.name.endsWith(` ${name}`),
  );
  if (!device) {
    return notCovered(
      name,
      base.devices
        .map((d) => d.name)
        .filter((known) => known.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 8),
    );
  }
  return { found: true, device, cite: "compatibility/devices.md" };
}

export function listPatterns(base: Base): { id: string; title: string; runtimes: Runtime[]; cite: string }[] {
  return base.patterns.map((p) => ({
    id: p.id,
    title: p.title,
    runtimes: p.runtimes,
    cite: `patterns/${p.id}.md`,
  }));
}

export function getPattern(
  base: Base,
  id: string,
): { found: true; pattern: PatternRecord; cite: string } | NotCovered {
  const pattern = base.patterns.find((p) => p.id === id);
  if (!pattern) return notCovered(id, base.patterns.map((p) => p.id));
  return { found: true, pattern, cite: `patterns/${id}.md` };
}

/**
 * What this base is, and when it was built.
 *
 * First tool an agent should call and the one that makes a report comparable:
 * an eval copy is built with `git archive` and has no `.git`, so the manifest
 * version is the only thing a run can name.
 */
export function getFreshness(base: Base): {
  version: string;
  lastSyncAt: string;
  sources: Record<string, { commit: string }>;
  recordCounts: Record<string, number>;
  limits: string;
} {
  return {
    ...base.manifest,
    limits:
      "A symbol absent from this base is not covered, never non-existent. " +
      "Coverage is uneven by runtime — call list_by_runtime for the counted " +
      "state of the one you are building.",
  };
}

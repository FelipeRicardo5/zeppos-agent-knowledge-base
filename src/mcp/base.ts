import { readFile } from "node:fs/promises";
import path from "node:path";
import { type Census, censusOf } from "../index/census.js";
import { type NameEntry, nameIndex } from "../index/names.js";
import { readAnnotations } from "../render/annotations.js";
import type { ModuleFile } from "../store/index.js";
import {
  indexSymbols,
  readAppJsonFile,
  readDeviceFile,
  readExampleFiles,
  readModuleFiles,
  readPatternFiles,
} from "../store/read.js";
import type {
  Annotation,
  AppJsonRecord,
  DeviceRecord,
  ExampleRecord,
  PatternRecord,
  SymbolRecord,
  SyncManifest,
} from "../types.js";

// Everything the tools answer from, loaded once.
//
// A read-only consumer of `data/`, which is the whole safety argument for the
// server: `sync` writes that directory, CI proves `data/ -> Markdown` is
// reproducible, and a second reader of the same JSON adds no way to corrupt
// it. The server never fetches, never parses upstream, never writes.
//
// Deliberately *not* the `Base` that `src/verify/` uses. That one loads
// rendered Markdown on purpose — its question is whether a fact survives into
// the pages an agent reads, and a fact that lives in `data/` and dies in the
// render is still a wrong answer there. Reusing it here would have made the
// server depend on the presentation layer to read its own records.
//
// Loaded eagerly and held. The whole base is a few megabytes of JSON, every
// tool joins across most of it, and a stdio server that re-read the tree per
// call would answer the same question differently if `sync` ran mid-session.

export interface Base {
  /** From `data/manifest.json` — what a caller cites when reporting an answer. */
  manifest: SyncManifest;
  modules: ModuleFile[];
  /** Every symbol keyed by id. */
  symbols: Map<string, SymbolRecord>;
  /** Every name keyed by what you would type to search for it. */
  names: Map<string, NameEntry[]>;
  /** How much of each axis each runtime states, for explaining an absence. */
  census: Census;
  devices: DeviceRecord[];
  patterns: PatternRecord[];
  examples: ExampleRecord[];
  appJson?: AppJsonRecord;
  /** The one input a human writes. Never merged into a record. */
  annotations: Annotation[];
}

function isManifest(value: unknown): value is SyncManifest {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<SyncManifest>;
  return typeof candidate.version === "string" && typeof candidate.lastSyncAt === "string";
}

/**
 * Load the base from a checkout.
 *
 * `root` is the repository root rather than `data/`, because `annotations/` is
 * a sibling of it and a caller should not have to know that.
 */
export async function loadBase(root = "."): Promise<Base> {
  const dataDir = path.join(root, "data");

  const manifestRaw = await readFile(path.join(dataDir, "manifest.json"), "utf-8");
  const manifest: unknown = JSON.parse(manifestRaw);
  if (!isManifest(manifest)) {
    throw new Error("data/manifest.json: not a sync manifest — expected { version, lastSyncAt }");
  }

  const modules = await readModuleFiles(path.join(dataDir, "symbols"));

  return {
    manifest,
    modules,
    symbols: indexSymbols(modules),
    names: nameIndex(modules),
    census: censusOf(modules),
    devices: await readDeviceFile(path.join(dataDir, "devices.json")),
    patterns: await readPatternFiles(path.join(dataDir, "patterns")),
    examples: await readExampleFiles(path.join(dataDir, "examples")),
    appJson: await readAppJsonFile(path.join(dataDir, "app-json.json")),
    annotations: await readAnnotations(path.join(root, "annotations")),
  };
}

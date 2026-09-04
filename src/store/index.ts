import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DeviceRecord, PatternRecord, SymbolRecord, SyncManifest } from "../types.js";

// Persistence of the JSON source of truth: one file per module (README decision),
// so a diff shows which module changed and each file stays small enough to read.
// The filename is only a slug — the canonical module id lives inside the file.

export interface ModuleFile {
  module: string;
  symbols: SymbolRecord[];
}

export function moduleSlug(module: string): string {
  return module.replace(/^@/, "").replace(/[^A-Za-z0-9._-]/g, "-");
}

function groupByModule(records: SymbolRecord[]): Map<string, SymbolRecord[]> {
  const groups = new Map<string, SymbolRecord[]>();
  for (const record of records) {
    const group = groups.get(record.module);
    if (group) group.push(record);
    else groups.set(record.module, [record]);
  }
  return groups;
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await writeFile(file, JSON.stringify(value, null, 2) + "\n", "utf-8");
}

/**
 * Rewrites the whole symbols directory so a module that disappears upstream also
 * disappears here — the stage stays idempotent, and a rerun is a no-op in git.
 */
export async function writeSymbols(records: SymbolRecord[], dataDir: string): Promise<number> {
  const symbolsDir = path.join(dataDir, "symbols");
  await mkdir(symbolsDir, { recursive: true });

  for (const entry of await readdir(symbolsDir)) {
    if (entry.endsWith(".json")) await rm(path.join(symbolsDir, entry));
  }

  const groups = groupByModule(records);
  const slugs = new Map<string, string>();

  for (const [module, symbols] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    const slug = moduleSlug(module);
    const claimedBy = slugs.get(slug);
    if (claimedBy) {
      throw new Error(`Module slug collision: "${module}" and "${claimedBy}" both map to ${slug}.json`);
    }
    slugs.set(slug, module);

    const moduleFile: ModuleFile = {
      module,
      symbols: [...symbols].sort((a, b) => a.symbol.localeCompare(b.symbol)),
    };
    await writeJson(path.join(symbolsDir, `${slug}.json`), moduleFile);
  }

  return groups.size;
}

export async function writeManifest(manifest: SyncManifest, dataDir: string): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeJson(path.join(dataDir, "manifest.json"), manifest);
}

/**
 * Rewrites the whole patterns directory, one file per pattern — same idempotence
 * contract as `writeSymbols`. A pattern is already a coherent unit the size of
 * one guide, so the id is the filename and there is no grouping decision to make.
 */
export async function writePatterns(patterns: PatternRecord[], dataDir: string): Promise<number> {
  const patternsDir = path.join(dataDir, "patterns");
  await mkdir(patternsDir, { recursive: true });

  for (const entry of await readdir(patternsDir)) {
    if (entry.endsWith(".json")) await rm(path.join(patternsDir, entry));
  }

  for (const pattern of patterns) {
    await writeJson(path.join(patternsDir, `${pattern.id}.json`), pattern);
  }

  return patterns.length;
}

/**
 * Writes the device list as one file. Unlike symbols there is no grouping
 * decision to make: the source is a single table of ~40 rows, so one file per
 * device would mean forty tiny files and a sync diff nobody can read, while the
 * whole list stays small enough to open at once.
 */
export async function writeDevices(devices: DeviceRecord[], dataDir: string): Promise<number> {
  await mkdir(dataDir, { recursive: true });
  await writeJson(path.join(dataDir, "devices.json"), devices);
  return devices.length;
}

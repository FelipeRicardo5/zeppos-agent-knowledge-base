import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type {
  AppJsonRecord,
  DeviceRecord,
  ExampleRecord,
  PatternRecord,
  SymbolRecord,
} from "../types.js";
import type { ModuleFile } from "./index.js";

// Reading `data/` back.
//
// These sat in `src/render/` for as long as rendering was the only consumer.
// It is not any more: a tool server is a second reader of the same JSON, and
// leaving the readers under `render/` would have made the data layer depend on
// the presentation layer to get at its own files.
//
// They also arrived as five copies of one function. Each read a directory or a
// file, parsed it, checked a shape and threw a message naming the file. The
// copies had already drifted in what they said; the generic pair below is what
// they were all trying to be.
//
// The validation is deliberately shallow — enough to catch a file that is not
// what its name claims, not a schema check. `sync` writes these, `render` and
// the server read them, and a deep validator here would be a second definition
// of the types racing the first.

async function parse<T>(file: string, is: (value: unknown) => value is T, shape: string): Promise<T> {
  const raw = await readFile(file, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${path.basename(file)}: invalid JSON (${(error as Error).message})`);
  }
  if (!is(parsed)) {
    throw new Error(`${path.basename(file)}: not ${shape}`);
  }
  return parsed;
}

/** Every `.json` in a directory, parsed and sorted by the key that names it. */
async function readJsonDir<T>(
  dir: string,
  is: (value: unknown) => value is T,
  shape: string,
  key: (value: T) => string,
): Promise<T[]> {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  const records: T[] = [];
  for (const file of files) {
    records.push(await parse(path.join(dir, file), is, shape));
  }
  return records.sort((a, b) => key(a).localeCompare(key(b)));
}

function isModuleFile(value: unknown): value is ModuleFile {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ModuleFile>;
  return typeof candidate.module === "string" && Array.isArray(candidate.symbols);
}

export function readModuleFiles(symbolsDir: string): Promise<ModuleFile[]> {
  return readJsonDir(
    symbolsDir,
    isModuleFile,
    "a module file — expected { module: string, symbols: [] }",
    (m) => m.module,
  );
}

function isExampleRecord(value: unknown): value is ExampleRecord {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ExampleRecord>;
  return (
    typeof candidate.id === "string" &&
    Array.isArray(candidate.files) &&
    Array.isArray(candidate.usages) &&
    Array.isArray(candidate.symbols)
  );
}

export function readExampleFiles(examplesDir: string): Promise<ExampleRecord[]> {
  return readJsonDir(
    examplesDir,
    isExampleRecord,
    "an example file — expected { id, files, usages, symbols }",
    (e) => e.id,
  );
}

function isPatternRecord(value: unknown): value is PatternRecord {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<PatternRecord>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    Array.isArray(candidate.approaches) &&
    Array.isArray(candidate.symbols)
  );
}

export function readPatternFiles(patternsDir: string): Promise<PatternRecord[]> {
  return readJsonDir(
    patternsDir,
    isPatternRecord,
    "a pattern file — expected { id, title, approaches, symbols }",
    (p) => p.id,
  );
}

function isDeviceList(value: unknown): value is DeviceRecord[] {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === "object" && entry !== null && "name" in entry)
  );
}

/** The device list is one JSON array, not a directory — see `writeDevices`. */
export function readDeviceFile(devicesFile: string): Promise<DeviceRecord[]> {
  return parse(devicesFile, isDeviceList, "a device list — expected an array of { name, ... }");
}

function isAppJsonRecord(value: unknown): value is AppJsonRecord {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<AppJsonRecord>;
  return Array.isArray(candidate.sections) && Array.isArray(candidate.gaps);
}

/** `undefined` when the front produced nothing — see `writeAppJson`. */
export async function readAppJsonFile(file: string): Promise<AppJsonRecord | undefined> {
  const raw = await readFile(file, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${path.basename(file)}: invalid JSON (${(error as Error).message})`);
  }
  // A literal `null` is how the front records "this produced nothing", which is
  // a state the generic reader has no way to express.
  if (parsed === null) return undefined;
  if (!isAppJsonRecord(parsed)) {
    throw new Error(`${path.basename(file)}: not an app.json record — expected { sections, gaps }`);
  }
  return parsed;
}

/** Every symbol record keyed by id, for the joins every consumer needs. */
export function indexSymbols(modules: ModuleFile[]): Map<string, SymbolRecord> {
  return new Map(modules.flatMap((m) => m.symbols).map((record) => [record.id, record]));
}

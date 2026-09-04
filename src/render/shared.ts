import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ModuleFile } from "../store/index.js";
import type { DeviceRecord, SymbolRecord } from "../types.js";

// Helpers shared by the render views. Each view owns its own out dir and its own
// Markdown, but they all agree on how a page is written, how an out dir is
// rewritten, and how a missing API_LEVEL is labelled — so those live here rather
// than being restated per view and drifting apart.

export const INDEX_FILE = "index.md";

/** Hand-written, so a view's rewrite of its dir must leave them alone. */
export const PRESERVED = new Set(["README.md", "README.pt-BR.md"]);

/**
 * A missing minimum means no source states one. It does *not* mean the symbol
 * works on every level, so the label must not read like "any".
 */
export const NOT_STATED = "not stated";

/** A pipe would end the cell early, and free-form strings reach these tables. */
export function cell(value: string): string {
  return value.replace(/\|/g, "\|");
}

export function apiLevelLabel(minApiLevel: number | undefined): string {
  return minApiLevel === undefined ? NOT_STATED : `>= ${minApiLevel}`;
}

export async function writePage(file: string, content: string): Promise<void> {
  await writeFile(file, `${content.replace(/\n+$/, "")}\n`, "utf-8");
}

/**
 * Creates the out dir and drops the pages a previous run generated, so content
 * that disappeared upstream disappears here too. Only generated `.md` files go;
 * a curated README in the dir survives.
 */
export async function prepareOutDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
  for (const entry of await readdir(dir)) {
    if (entry.endsWith(".md") && !PRESERVED.has(entry)) await rm(path.join(dir, entry));
  }
}

function isModuleFile(value: unknown): value is ModuleFile {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ModuleFile>;
  return typeof candidate.module === "string" && Array.isArray(candidate.symbols);
}

export async function readModuleFiles(symbolsDir: string): Promise<ModuleFile[]> {
  const files = (await readdir(symbolsDir)).filter((f) => f.endsWith(".json"));
  const modules: ModuleFile[] = [];
  for (const file of files) {
    const raw = await readFile(path.join(symbolsDir, file), "utf-8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${file}: invalid JSON (${(error as Error).message})`);
    }
    if (!isModuleFile(parsed)) {
      throw new Error(`${file}: not a module file — expected { module: string, symbols: [] }`);
    }
    modules.push(parsed);
  }
  return modules.sort((a, b) => a.module.localeCompare(b.module));
}

/** Every symbol record keyed by id, for the joins the pattern view needs. */
export function indexSymbols(modules: ModuleFile[]): Map<string, SymbolRecord> {
  return new Map(modules.flatMap((m) => m.symbols).map((record) => [record.id, record]));
}

function isDeviceList(value: unknown): value is DeviceRecord[] {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === "object" && entry !== null && "name" in entry)
  );
}

/** The device list is one JSON array, not a directory — see `writeDevices`. */
export async function readDeviceFile(devicesFile: string): Promise<DeviceRecord[]> {
  const raw = await readFile(devicesFile, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${devicesFile}: invalid JSON (${(error as Error).message})`);
  }
  if (!isDeviceList(parsed)) {
    throw new Error(`${devicesFile}: not a device list — expected an array of { name, ... }`);
  }
  return parsed;
}

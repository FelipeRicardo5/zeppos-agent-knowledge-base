import path from "node:path";
import type { DeviceSource, RawDevice, ScreenShape, ScreenSpec } from "../types.js";
import { readSource } from "./util.js";

// Front 5: reference/related-resources/device-list.mdx — the hardware table.
//
// This is the only source that ties an API_LEVEL to a device, so it is what turns
// "this symbol needs API_LEVEL >= 4.2" into "this runs on a Bip 6 but not on a
// Bip 5". One file, two tables with *different* columns:
//
//   ## Devices with Zepp OS      10 columns, including API_LEVEL and OS version
//   ## Non-Zepp OS Devices        7 columns, neither of those
//
// Columns are therefore resolved by header name, never by position: a reordered
// or inserted column upstream then produces a loud error instead of silently
// filing a screen resolution as an API_LEVEL. A required column that goes
// missing throws for the same reason.

const DEVICE_LIST = [
  "zeppos-docs",
  "docs",
  "reference",
  "related-resources",
  "device-list.mdx",
];

/** `-` fills every cell the table has no value for, and never means zero. */
const NOT_STATED = "-";

const SHAPES: Record<string, ScreenShape> = {
  round: "round",
  square: "square",
  band: "band",
};

export function deviceSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** A markdown table row split into trimmed cells, or undefined if not a row. */
function cells(line: string): string[] | undefined {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return undefined;
  return trimmed
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

/** The `| --- | --- |` rule under a header, which carries no data. */
function isSeparator(row: string[]): boolean {
  return row.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function stated(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const cleaned = value.replace(/`/g, "").trim();
  return cleaned === "" || cleaned === NOT_STATED ? undefined : cleaned;
}

function statedNumber(value: string | undefined): number | undefined {
  const cleaned = stated(value);
  if (cleaned === undefined) return undefined;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** `` `8519936*`, `8519937` `` — the `*` marks the Mainland China version. */
function parseDeviceSources(value: string | undefined): DeviceSource[] {
  if (value === undefined) return [];

  return [...value.matchAll(/`([^`]+)`/g)]
    .map(([, raw]) => raw.trim())
    .filter((id) => id.length > 0 && id !== NOT_STATED)
    .map((id) => ({
      id: id.replace(/\*$/, ""),
      mainlandChina: id.endsWith("*"),
    }));
}

/** `480 x 480` — also written with different spacing across rows. */
function parseResolution(value: string | undefined): { width: number; height: number } | undefined {
  const cleaned = stated(value);
  if (cleaned === undefined) return undefined;

  const match = cleaned.match(/^(\d+)\s*[x×]\s*(\d+)$/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : undefined;
}

function parseShape(value: string | undefined): ScreenShape | undefined {
  const cleaned = stated(value);
  return cleaned === undefined ? undefined : SHAPES[cleaned.toLowerCase()];
}

/** YES / NO, or `-` where the table states nothing — which is not the same as NO. */
function parseYesNo(value: string | undefined): boolean | undefined {
  const cleaned = stated(value);
  if (cleaned === undefined) return undefined;
  const upper = cleaned.toUpperCase();
  if (upper === "YES") return true;
  if (upper === "NO") return false;
  return undefined;
}

const COLUMNS = {
  name: "Equipment name",
  apiLevel: "Latest API_LEVEL",
  osVersion: "Latest Zepp OS Version",
  deviceSource: "deviceSource",
  shape: "Screen shape",
  radius: "Screen radius",
  resolution: "Screen resolution",
  keys: "physical-keys number",
  preview: "Watchface preview image resolution",
  secondaryWidget: "SecondaryWidget support",
} as const;

/**
 * Header cell -> index. Matched on a normalized prefix because the two tables
 * disagree on wording for the same column ("Screen radius size" in one, "Screen
 * radius" in the other).
 */
function headerIndex(header: string[]): Map<string, number> {
  const index = new Map<string, number>();
  header.forEach((cell, position) => index.set(cell.toLowerCase(), position));
  return index;
}

function column(index: Map<string, number>, label: string): number | undefined {
  const wanted = label.toLowerCase();
  for (const [cell, position] of index) {
    if (cell.startsWith(wanted)) return position;
  }
  return undefined;
}

function parseTable(header: string[], rows: string[][], runsZeppOs: boolean, sourceFile: string): RawDevice[] {
  const index = headerIndex(header);
  const at = (label: string) => column(index, label);

  const nameAt = at(COLUMNS.name);
  if (nameAt === undefined) {
    throw new Error(`${sourceFile}: device table has no "${COLUMNS.name}" column`);
  }

  const positions = {
    apiLevel: at(COLUMNS.apiLevel),
    osVersion: at(COLUMNS.osVersion),
    deviceSource: at(COLUMNS.deviceSource),
    shape: at(COLUMNS.shape),
    radius: at(COLUMNS.radius),
    resolution: at(COLUMNS.resolution),
    keys: at(COLUMNS.keys),
    preview: at(COLUMNS.preview),
    secondaryWidget: at(COLUMNS.secondaryWidget),
  };

  const pick = (row: string[], position: number | undefined) =>
    position === undefined ? undefined : row[position];

  const devices: RawDevice[] = [];

  for (const row of rows) {
    const name = stated(pick(row, nameAt));
    if (name === undefined) continue;

    const screen: ScreenSpec = {
      shape: parseShape(pick(row, positions.shape)),
      radius: statedNumber(pick(row, positions.radius)),
      ...parseResolution(pick(row, positions.resolution)),
    };

    devices.push({
      name,
      latestApiLevel: statedNumber(pick(row, positions.apiLevel)),
      latestOsVersion: stated(pick(row, positions.osVersion)),
      deviceSources: parseDeviceSources(pick(row, positions.deviceSource)),
      screen,
      physicalKeys: statedNumber(pick(row, positions.keys)),
      watchfacePreview: parseResolution(pick(row, positions.preview)),
      secondaryWidget: parseYesNo(pick(row, positions.secondaryWidget)),
      runsZeppOs,
      sourceFile,
    });
  }

  return devices;
}

/**
 * The `##` section each table sits under decides whether its rows run Zepp OS.
 * Matched on the heading rather than on table order, so a new section inserted
 * upstream doesn't silently flip the flag on every device.
 */
const ZEPP_OS_HEADING = /^##\s+Devices with Zepp OS/im;
const NON_ZEPP_OS_HEADING = /^##\s+Non-Zepp OS Devices/im;

export async function parseDevices(cacheDir: string): Promise<RawDevice[]> {
  const file = path.join(cacheDir, ...DEVICE_LIST);
  const content = await readSource(file);
  const sourceFile = path.relative(cacheDir, file);

  if (!ZEPP_OS_HEADING.test(content)) {
    throw new Error(`${sourceFile}: no "Devices with Zepp OS" section — the table layout changed`);
  }

  const devices: RawDevice[] = [];
  let runsZeppOs: boolean | undefined;
  let header: string[] | undefined;
  let rows: string[][] = [];

  const flush = () => {
    if (header && rows.length > 0 && runsZeppOs !== undefined) {
      devices.push(...parseTable(header, rows, runsZeppOs, sourceFile));
    }
    header = undefined;
    rows = [];
  };

  for (const line of content.split("\n")) {
    if (ZEPP_OS_HEADING.test(line)) {
      flush();
      runsZeppOs = true;
      continue;
    }
    if (NON_ZEPP_OS_HEADING.test(line)) {
      flush();
      runsZeppOs = false;
      continue;
    }

    const row = cells(line);
    if (row === undefined) {
      // Prose, an admonition or a blank line ends the table it follows.
      flush();
      continue;
    }
    if (isSeparator(row)) continue;

    if (header === undefined) header = row;
    else rows.push(row);
  }

  flush();

  if (devices.length === 0) {
    throw new Error(`${sourceFile}: matched the section headings but produced no devices`);
  }

  return devices;
}

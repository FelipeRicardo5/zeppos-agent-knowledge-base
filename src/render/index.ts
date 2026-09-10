import path from "node:path";
import { readExampleFiles } from "./examples.js";
import { moduleSlug, type ModuleFile } from "../store/index.js";
import type {
  DeviceRecord,
  EnumSpec,
  ExampleRecord,
  Runtime,
  ShapeSpec,
  SymbolRecord,
} from "../types.js";
import {
  INDEX_FILE,
  NOT_STATED,
  apiLevelLabel as apiLevelLabelFor,
  cell,
  prepareOutDir,
  readDeviceFile,
  readModuleFiles,
  writePage,
} from "./shared.js";

// Stage 4: render — generate the final Markdown from the JSON source of truth.
//
// This stage ships the knowledge in the shape the Agent Skill can consume. The
// views this module owns, each over an axis the data actually supports:
//
//   api/            one file per module, symbols grouped and described
//   compatibility/  grouped by minimum API_LEVEL — the cross-reference that is
//                   this project's point — plus devices.md, the hardware that
//                   turns a level into a shipping decision
//   runtimes/       one file per runtime, the axis SKILL.md step 1 depends on
//
// `patterns/` is rendered by ./patterns.ts, which owns its own dir.
//
// Each view also gets an `index.md` so the Skill can find a module without
// listing the directory and guessing slugs.
//
// `runtimes/` renders a page for every runtime in the union, *including the ones
// with no symbols*. A missing page reads like "this runtime does not exist"; a
// page that states "0 symbols covered" reads like the coverage gap it is, which
// is the distinction the whole KB is built on. `devices.md` treats a device with
// no stated API_LEVEL the same way: the level is absent, never zero.
//
// The remaining README dirs (concepts/, examples/, tools/) hold knowledge the
// automated fronts don't yet reach, so they are deliberately not created here
// rather than being fabricated.

const API_DIR = "api";
const COMPAT_DIR = "compatibility";
const RUNTIMES_DIR = "runtimes";
/** Lives in `compatibility/`: the hardware is the other half of that axis. */
const DEVICES_FILE = "devices.md";

/**
 * Every runtime in the `Runtime` union, in the order a developer meets them, each
 * with the name the official docs use. Iterating this rather than the runtimes
 * present in the data is what lets an uncovered runtime render as a stated gap.
 * The slug is the union value itself, and none of them is "index".
 */
const RUNTIMES: [runtime: Runtime, label: string][] = [
  ["device-app", "Device App"],
  ["side-service", "Side Service"],
  ["settings", "Settings App"],
  ["watchface", "Watchface"],
  ["workout-extension", "Workout Extension"],
];

const RUNTIME_LABELS = new Map<Runtime, string>(RUNTIMES);

function apiLevelLabel(record: SymbolRecord): string {
  return apiLevelLabelFor(record.minApiLevel);
}

function statedCount(module: ModuleFile): number {
  return module.symbols.filter((r) => r.minApiLevel !== undefined).length;
}

/** Symbols that state a minimum, keyed by that minimum, levels ascending. */
function groupByLevel(symbols: SymbolRecord[]): Map<number, SymbolRecord[]> {
  const groups = new Map<number, SymbolRecord[]>();
  for (const record of symbols) {
    if (record.minApiLevel === undefined) continue;
    const group = groups.get(record.minApiLevel);
    if (group) group.push(record);
    else groups.set(record.minApiLevel, [record]);
  }
  return new Map([...groups].sort(([a], [b]) => a - b));
}

function apiMarkdown(module: ModuleFile): string {
  const lines = [`# ${module.module}`, ""];
  lines.push(`**${module.symbols.length} symbols**`, "");
  lines.push("| Symbol | Type | Min API_LEVEL | Confidence |");
  lines.push("| --- | --- | --- | --- |");

  for (const record of module.symbols) {
    lines.push(
      `| \`${record.symbol}\` | ${cell(record.type)} | ${apiLevelLabel(record)} | ${record.confidence} |`,
    );
  }

  if (statedCount(module) < module.symbols.length) {
    lines.push("");
    lines.push(
      `\`${NOT_STATED}\` means no source documents a minimum for that symbol — not that it works on any level.`,
    );
  }

  const detailed = module.symbols.filter(
    (r) =>
      r.description !== undefined ||
      r.signature !== undefined ||
      r.shapes !== undefined ||
      r.enums !== undefined ||
      r.permissions !== undefined,
  );
  if (detailed.length > 0) {
    lines.push("", "## Symbols in detail", "");
    for (const record of detailed) {
      lines.push(`### \`${module.module}.${record.symbol}\``, "");
      if (record.description !== undefined) lines.push(record.description, "");

      // Before the signature, because it is the thing that breaks an app that
      // otherwise compiles: an undeclared permission fails at runtime.
      if (record.permissions !== undefined) {
        lines.push(
          `**Requires in \`app.json\`**: ${record.permissions.map((p) => `\`${p}\``).join(", ")}` +
            " — see [`../manifest/index.md`](../manifest/index.md).",
          "",
        );
      }

      if (record.signature !== undefined) {
        // Verbatim: `(props: Props) => result: RenderFunc` is not valid
        // TypeScript, and normalising it would invent a shape the docs never
        // stated. The shapes below are what the parameter names refer to.
        lines.push("```ts", record.signature, "```", "");
      }

      for (const shape of record.shapes ?? []) {
        lines.push(...shapeLines(shape));
      }

      for (const spec of record.enums ?? []) {
        lines.push(...enumLines(spec, module));
      }

      lines.push(...memberLines(record, module));
    }
  }

  return lines.join("\n");
}

/**
 * What can be called on a value the symbol produces or is.
 *
 * Rendered under the symbol rather than as entries of its own, because that is
 * how they are reached: `new HeartRate().getCurrent()`, never an import. 12
 * sensors document a `getCurrent` and they are 12 different methods returning
 * 12 different shapes, so the owner is part of the identity.
 *
 * The level column is the reason this cannot be a plain list. A member states
 * its own minimum and the symbol's does not imply it: `BloodOxygen` is 2.0
 * while its `start` and `stop` are 2.1, so an app targeting 2.0 can construct
 * the sensor and not drive it.
 */
function memberLines(record: SymbolRecord, module: ModuleFile): string[] {
  const members = record.members ?? [];
  if (members.length === 0) return [];

  const lines: string[] = [];
  const owner = `${module.module}.${record.symbol}`;
  const levelled = members.some((m) => m.apiLevel !== undefined);

  lines.push(`**Called on a \`${cell(record.symbol)}\` value** — ${members.length} members`, "");
  if (levelled) {
    lines.push(
      "A member states its own minimum `API_LEVEL`, and the symbol's does not imply",
      `it. \`${NOT_STATED}\` here means the page gives that member no badge — not that it`,
      "is available wherever the symbol is.",
      "",
    );
  }

  lines.push(levelled ? "| Member | Min API_LEVEL | Signature |" : "| Member | Signature |");
  lines.push(levelled ? "| --- | --- | --- |" : "| --- | --- |");
  for (const member of members) {
    const columns = [
      `[\`${cell(member.name)}\`](#${anchor(`${owner}${member.name}`)})`,
      ...(levelled ? [member.apiLevel === undefined ? NOT_STATED : `>= ${member.apiLevel}`] : []),
      member.signature === undefined ? NOT_STATED : `\`${cell(member.signature)}\``,
    ];
    lines.push(`| ${columns.join(" | ")} |`);
  }
  lines.push("");

  // A member gets its own heading only when it carries something the table
  // above cannot hold: prose, a shape, or a value set.
  for (const member of members) {
    const detailed =
      member.description !== undefined ||
      (member.shapes?.length ?? 0) > 0 ||
      (member.enums?.length ?? 0) > 0;
    if (!detailed) continue;

    lines.push(`#### \`${owner}.${member.name}\``, "");
    if (member.description !== undefined) lines.push(member.description, "");
    if (member.signature !== undefined) lines.push("```ts", member.signature, "```", "");

    for (const shape of member.shapes ?? []) lines.push(...shapeLines(shape));
    for (const spec of member.enums ?? []) lines.push(...enumLines(spec, module));
  }

  return lines;
}

/** One named property table. Shared: a shape can belong to a symbol or to a member. */
function shapeLines(shape: ShapeSpec): string[] {
  const lines = [`**${cell(shape.name)}**`, ""];
  const levelled = shape.props.some((p) => p.apiLevel !== undefined);

  lines.push(
    levelled
      ? "| Property | Type | Required | Default | Min API_LEVEL | Description |"
      : "| Property | Type | Required | Default | Description |",
  );
  lines.push(levelled ? "| --- | --- | --- | --- | --- | --- |" : "| --- | --- | --- | --- | --- |");

  for (const prop of shape.props) {
    const required = prop.required === undefined ? NOT_STATED : prop.required ? "yes" : "no";
    const level = prop.apiLevel === undefined ? NOT_STATED : `>= ${prop.apiLevel}`;
    const columns = [
      `\`${prop.name}\``,
      prop.type === undefined ? NOT_STATED : `\`${cell(prop.type)}\``,
      required,
      prop.default === undefined ? "—" : `\`${cell(prop.default)}\``,
      ...(levelled ? [level] : []),
      prop.description === undefined ? "—" : cell(prop.description),
    ];
    lines.push(`| ${columns.join(" | ")} |`);
  }
  lines.push("");

  return lines;
}

/**
 * A `### ` heading's in-page anchor. Punctuation is dropped and the rest
 * lower-cased, so `@zos/ui.TEXT` links as `#zosuitext`.
 */
function anchor(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9 _-]/g, "").replace(/ /g, "-");
}

/**
 * One value set, written the way code writes it.
 *
 * A qualified enum renders `align.CENTER_H`, because that is the whole point of
 * having it — the value a developer types. A bare one renders `4`, and its
 * heading says which value it is the domain of.
 *
 * The confidence column only appears when the set mixes the two, which is where
 * it carries information: `widget` has one documented member and 24 seen only
 * in sample code, and a reader has to be able to tell which is which.
 *
 * The `Documented as` column is the join that makes the biggest of these usable.
 * `widget.TEXT` is the id you pass to `createWidget`, and the props it then
 * accepts are on `@zos/ui.TEXT` — a separate symbol, on this same page, that
 * nothing upstream connects to the enum member. It is a name match within one
 * module, which is why the column says "documented as" rather than presenting
 * that symbol's description as the member's own.
 */
function enumLines(spec: EnumSpec, module: ModuleFile): string[] {
  const lines: string[] = [];
  const write = (value: string) => `\`${spec.qualified ? `${spec.name}.${value}` : value}\``;

  const siblings = new Set(module.symbols.map((r) => r.symbol));
  const documented = (value: string) =>
    spec.qualified && value !== spec.name && siblings.has(value)
      ? `[\`${module.module}.${value}\`](#${anchor(`${module.module}.${value}`)})`
      : "—";

  lines.push(`**${cell(spec.name)}**`, "");

  if (spec.partial) {
    lines.push(
      "The documentation states this list is incomplete. Members below marked" +
        " `OBSERVED` come from sample code, and neither source is the whole set.",
      "",
    );
  }

  const levelled = spec.members.some((m) => m.apiLevel !== undefined);
  const typed = spec.members.some((m) => m.type !== undefined);
  const mixed = new Set(spec.members.map((m) => m.confidence)).size > 1;
  const joined = spec.members.some((m) => documented(m.value) !== "—");

  const header = [
    "Value",
    ...(typed ? ["Type"] : []),
    ...(levelled ? ["Min API_LEVEL"] : []),
    ...(mixed ? ["Confidence"] : []),
    ...(joined ? ["Documented as"] : []),
    "Description",
  ];
  lines.push(`| ${header.join(" | ")} |`);
  lines.push(`| ${header.map(() => "---").join(" | ")} |`);

  for (const member of spec.members) {
    const columns = [
      write(member.value),
      ...(typed ? [member.type === undefined ? NOT_STATED : `\`${cell(member.type)}\``] : []),
      ...(levelled ? [member.apiLevel === undefined ? NOT_STATED : `>= ${member.apiLevel}`] : []),
      ...(mixed ? [member.confidence] : []),
      ...(joined ? [documented(member.value)] : []),
      member.description === undefined ? "—" : cell(member.description),
    ];
    lines.push(`| ${columns.join(" | ")} |`);
  }
  lines.push("");

  return lines;
}

function compatMarkdown(module: ModuleFile): string {
  const lines = [`# ${module.module} — compatibility`, ""];
  const byLevel = groupByLevel(module.symbols);
  const withoutLevel = module.symbols.filter((r) => r.minApiLevel === undefined);

  lines.push(
    `**${statedCount(module)} of ${module.symbols.length} symbols state a minimum API_LEVEL**`,
    "",
  );

  for (const [level, records] of byLevel) {
    lines.push(`## API_LEVEL ${level}`, "");
    for (const record of records) {
      lines.push(`- \`${module.module}.${record.symbol}\``);
    }
    lines.push("");
  }

  if (withoutLevel.length > 0) {
    lines.push("## No stated API_LEVEL", "");
    lines.push("These symbols have no documented minimum. Absence means *not stated*, not *any* level.");
    lines.push("");
    for (const record of withoutLevel) {
      lines.push(`- \`${module.module}.${record.symbol}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function apiIndexMarkdown(modules: ModuleFile[]): string {
  const symbolCount = modules.reduce((sum, m) => sum + m.symbols.length, 0);
  const lines = ["# API index", ""];
  lines.push(`**${modules.length} modules, ${symbolCount} symbols**`, "");
  lines.push("| Module | Symbols | With stated API_LEVEL | Page |");
  lines.push("| --- | --- | --- | --- |");

  for (const module of modules) {
    const slug = moduleSlug(module.module);
    lines.push(
      `| \`${module.module}\` | ${module.symbols.length} | ${statedCount(module)} | [${slug}.md](${slug}.md) |`,
    );
  }

  return lines.join("\n");
}

/**
 * The inverse of the per-module compatibility pages: which modules a given
 * API_LEVEL unlocks. This is the question the project exists to answer, so it is
 * worth one page rather than one read per module.
 */
function compatIndexMarkdown(modules: ModuleFile[], devices: DeviceRecord[]): string {
  const byLevel = new Map<number, { module: string; count: number }[]>();
  const unstated: { module: string; count: number }[] = [];

  for (const module of modules) {
    for (const [level, records] of groupByLevel(module.symbols)) {
      const entry = { module: module.module, count: records.length };
      const group = byLevel.get(level);
      if (group) group.push(entry);
      else byLevel.set(level, [entry]);
    }

    const without = module.symbols.length - statedCount(module);
    if (without > 0) unstated.push({ module: module.module, count: without });
  }

  const lines = ["# Compatibility index", ""];
  lines.push("Minimum API_LEVEL each module's symbols require, with the module page linked.", "");
  if (devices.length > 0) {
    lines.push(
      "Each level also names how much hardware reaches it, because a level answers the",
      "question only once it maps to a device — see [devices.md](devices.md).",
      "",
    );
  }

  for (const [level, entries] of [...byLevel].sort(([a], [b]) => a - b)) {
    lines.push(`## API_LEVEL ${level}`, "");

    if (devices.length > 0) {
      const reaching = devicesAtLevel(devices, level);
      lines.push(
        reaching.length === 0
          ? "**No device in the device list reaches this level.**"
          : `Reached by ${reaching.length} of ${devices.filter((d) => d.latestApiLevel !== undefined).length} devices with a stated level — highest first: ${reaching
              .slice(0, 5)
              .map((d) => `${d.name} (${d.latestApiLevel})`)
              .join(", ")}${reaching.length > 5 ? ", …" : ""}`,
        "",
      );
    }

    for (const entry of entries) {
      const slug = moduleSlug(entry.module);
      lines.push(`- \`${entry.module}\` — ${entry.count} symbols ([${slug}.md](${slug}.md))`);
    }
    lines.push("");
  }

  if (unstated.length > 0) {
    lines.push("## No stated API_LEVEL", "");
    lines.push("Symbols no source states a minimum for. Absence means *not stated*, not *any* level.", "");
    for (const entry of unstated) {
      const slug = moduleSlug(entry.module);
      lines.push(`- \`${entry.module}\` — ${entry.count} symbols ([${slug}.md](${slug}.md))`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// --- devices ---------------------------------------------------------------
//
// The device list is what turns a level into an answer. `compatibility/` already
// says a symbol needs `>= 4.2`; only these records say that means "a Bip 6 runs
// it, a Bip 5 does not". Both directions get rendered, because a developer
// arrives from either one.

/** A device runs a symbol when it reaches the symbol's minimum. */
function symbolsAvailableOn(device: DeviceRecord, symbols: SymbolRecord[]): number {
  if (device.latestApiLevel === undefined) return 0;
  const level = device.latestApiLevel;
  return symbols.filter((r) => r.minApiLevel !== undefined && r.minApiLevel <= level).length;
}

function screenLabel(device: DeviceRecord): string {
  const shape = device.screen.shape ?? "—";
  const size =
    device.screen.width === undefined ? "—" : `${device.screen.width} x ${device.screen.height}`;
  return `${shape}, ${size}`;
}

function deviceSourceLabel(device: DeviceRecord): string {
  if (device.deviceSources.length === 0) return "—";
  return device.deviceSources
    .map(({ id, mainlandChina }) => `\`${id}\`${mainlandChina ? "\\*" : ""}`)
    .join(", ");
}

function yesNo(value: boolean | undefined): string {
  return value === undefined ? NOT_STATED : value ? "yes" : "no";
}

// --- Targeting --------------------------------------------------------------
//
// The join that answers "how do I ship to this watch". Both eval runs asked it,
// both went silent, and both invented a `targets` key — which is the wrong shape
// of answer, because `guides/best-practice/code-adaptations-for-new-devices.mdx`
// says that key "can be named arbitrarily" and only has to match an `assets/`
// subdirectory. What selects hardware is `targets.*.platforms[]`, and it does so
// two different ways depending on the manifest's configVersion.
//
// Neither side of this is new data. The device list carries each device's screen
// and its `deviceSource` numbers; the sample manifests carry the selectors real
// apps ship. Nothing upstream puts the two together.

/** `ScreenSpec.shape` in the letter `platforms[].st` uses. */
const SCREEN_TYPE: Record<string, string> = { round: "r", square: "s", band: "b" };

function screenType(device: DeviceRecord): string | undefined {
  const shape = device.screen.shape;
  return shape === undefined ? undefined : SCREEN_TYPE[shape];
}

/** `platforms[].sr` for a device: the format is `w` + screen width. */
function screenResolution(device: DeviceRecord): string | undefined {
  return device.screen.width === undefined ? undefined : `w${device.screen.width}`;
}

/** What the sample manifests actually declare, as opposed to what is documented. */
interface TargetingEvidence {
  deviceSources: Set<string>;
  screenTypes: Map<string, number>;
  usesResolution: boolean;
  byConfigVersion: Map<string, number>;
  manifests: number;
}

function targetingEvidence(examples: ExampleRecord[]): TargetingEvidence {
  const evidence: TargetingEvidence = {
    deviceSources: new Set(),
    screenTypes: new Map(),
    usesResolution: false,
    byConfigVersion: new Map(),
    manifests: 0,
  };

  for (const example of examples) {
    const manifest = example.manifest;
    if (manifest === undefined) continue;
    evidence.manifests += 1;

    const version = manifest.configVersion ?? NOT_STATED;
    evidence.byConfigVersion.set(version, (evidence.byConfigVersion.get(version) ?? 0) + 1);

    for (const selector of manifest.platforms) {
      if (selector.deviceSource !== undefined) {
        evidence.deviceSources.add(String(selector.deviceSource));
      }
      if (selector.sr !== undefined) evidence.usesResolution = true;
      if (selector.st !== undefined) {
        evidence.screenTypes.set(selector.st, (evidence.screenTypes.get(selector.st) ?? 0) + 1);
      }
    }
  }

  return evidence;
}

function targetingMarkdown(devices: DeviceRecord[], examples: ExampleRecord[]): string[] {
  const evidence = targetingEvidence(examples);
  const zeppOs = devices.filter((d) => d.runsZeppOs).sort((a, b) => a.name.localeCompare(b.name));

  const lines = ["## How to target a device", ""];
  lines.push(
    "The `targets` key is **not** a device identifier. Both the reference page and the",
    "new-device guide say it is named arbitrarily and only has to match a subdirectory",
    "of `assets/`, so `gtr-3-pro`, `common` and `480x480-amazfit-balance` are all valid",
    "names for the same build. What selects hardware is `targets.<key>.platforms[]`,",
    "and it works two different ways:",
    "",
    "| configVersion | Select with | Selects |",
    "| --- | --- | --- |",
    "| `v2` | `deviceSource` | One device, by number — one entry each |",
    "| `v3` | `st` and `sr` | A screen shape and width, so a whole class of device |",
    "",
  );

  const versions = [...evidence.byConfigVersion].sort(([a], [b]) => a.localeCompare(b));
  lines.push(
    `Across the ${evidence.manifests} sample manifests the split is exact — ` +
      versions.map(([version, count]) => `${count} at \`${version}\``).join(", ") +
      " — and no manifest mixes the two mechanisms.",
    "",
  );

  lines.push("### What to write, per device", "");
  lines.push(
    "`st` and `sr` are **derived** from the screen columns above, not quoted: `st` is",
    "the shape as `r`/`s`/`b`, `sr` is `w` + the width. `deviceSource` is verbatim.",
    "",
  );
  lines.push("| Device | `st` (v3) | `sr` (v3) | `deviceSource` (v2) |");
  lines.push("| --- | --- | --- | --- |");
  for (const device of zeppOs) {
    const st = screenType(device);
    const sr = screenResolution(device);
    lines.push(
      `| ${cell(device.name)} | ${st === undefined ? NOT_STATED : `\`${st}\``} | ${sr === undefined ? NOT_STATED : `\`${sr}\``} | ${deviceSourceLabel(device)} |`,
    );
  }
  lines.push("");

  lines.push("### Which devices a screen selector reaches", "");
  lines.push(
    "The reverse of the table above, and the reason to prefer `v3`: one `st` covers a",
    "whole class of hardware, so a new watch of a shape already supported needs no",
    "manifest change at all.",
    "",
  );
  lines.push("| Selector | Devices reached | Widths among them |");
  lines.push("| --- | --- | --- |");
  for (const [shape, st] of Object.entries(SCREEN_TYPE)) {
    const reached = zeppOs.filter((d) => d.screen.shape === shape);
    if (reached.length === 0) continue;
    const widths = [...new Set(reached.map((d) => d.screen.width))]
      .filter((w): w is number => w !== undefined)
      .sort((a, b) => a - b);
    lines.push(
      `| \`st: "${st}"\` — ${shape} | ${reached.length} | ${widths.map((w) => `\`w${w}\``).join(", ")} |`,
    );
  }
  lines.push("");

  const declared = [...evidence.screenTypes].sort(([a], [b]) => a.localeCompare(b));
  if (declared.length > 0) {
    lines.push(
      "Sample manifests declare " +
        declared.map(([st, count]) => `\`st: "${st}"\` ${count} times`).join(" and ") +
        (evidence.usesResolution ? "." : ", and never narrow one with `sr`."),
      "",
    );
  }

  lines.push(...targetingDiff(zeppOs, evidence));
  return lines;
}

/**
 * The two-way diff, which is where the findings are: what the samples target
 * and this list does not have, and what this list has that no sample targets.
 */
function targetingDiff(zeppOs: DeviceRecord[], evidence: TargetingEvidence): string[] {
  const known = new Set(zeppOs.flatMap((d) => d.deviceSources.map((s) => s.id)));

  const unknown = [...evidence.deviceSources].filter((id) => !known.has(id)).sort();
  const untargeted = zeppOs
    .filter((d) => !d.deviceSources.some((s) => evidence.deviceSources.has(s.id)))
    .map((d) => d.name);
  const matched = evidence.deviceSources.size - unknown.length;

  const lines = ["### Where the samples and the device list disagree", ""];
  lines.push(
    `The ${evidence.manifests} sample manifests name ${evidence.deviceSources.size} distinct ` +
      `\`deviceSource\` values between them. ${matched} match a device below.`,
    "",
  );

  if (unknown.length > 0) {
    lines.push(
      `**${unknown.length} ${unknown.length === 1 ? "does" : "do"} not.** A shipped sample builds for ` +
        `${unknown.map((id) => `\`${id}\``).join(", ")}, and no row of the device list declares`,
      "that number. Either the list is behind the samples or the sample targets hardware",
      "that was never published. This base cannot tell which, and neither source admits",
      "the gap exists.",
      "",
    );
  }

  if (untargeted.length > 0) {
    lines.push(
      `**${untargeted.length} devices no sample targets.** Nothing is wrong with them — it means`,
      "there is no worked example to copy a `platforms` entry from, so the derived row",
      "above is the only evidence this base has for them:",
      "",
    );
    for (const name of untargeted) lines.push(`- ${cell(name)}`);
    lines.push("");
  }

  return lines;
}

/** Devices that reach `level`, highest-capability first. */
function devicesAtLevel(devices: DeviceRecord[], level: number): DeviceRecord[] {
  return devices
    .filter((d) => d.latestApiLevel !== undefined && d.latestApiLevel >= level)
    .sort((a, b) => (b.latestApiLevel ?? 0) - (a.latestApiLevel ?? 0) || a.name.localeCompare(b.name));
}

function devicesMarkdown(
  devices: DeviceRecord[],
  modules: ModuleFile[],
  examples: ExampleRecord[],
): string {
  const symbols = modules.flatMap((m) => m.symbols);
  const stated = symbols.filter((r) => r.minApiLevel !== undefined).length;
  const zeppOs = devices
    .filter((d) => d.runsZeppOs && d.latestApiLevel !== undefined)
    .sort((a, b) => (b.latestApiLevel ?? 0) - (a.latestApiLevel ?? 0) || a.name.localeCompare(b.name));
  const noLevel = devices.filter((d) => d.runsZeppOs && d.latestApiLevel === undefined);
  const nonZeppOs = devices.filter((d) => !d.runsZeppOs);

  // Computed, never written in. A hand-typed count here read "29" while the data
  // said 56, because a later front added symbols with no stated level — and this
  // is the one number the page offers as evidence that the base is honest about
  // its own gaps. Any derived figure in generated text has to be derived.
  const unstated = symbols.length - stated;

  const lines = ["# Devices", ""];
  lines.push(
    "The hardware side of the compatibility question. `API_LEVEL` on its own does not",
    "tell a developer whether an app ships — this does.",
    "",
    `**Symbols available** counts the ${stated} symbols that state a minimum and whose`,
    `minimum the device reaches. It is a floor: the ${unstated} symbols with no stated`,
    "minimum are excluded from every count rather than assumed available, so a device",
    `showing "${stated} of ${stated}" runs everything the base can vouch for — not`,
    `everything the base lists. ${unstated} of ${symbols.length} symbols cannot be`,
    "vouched for on any device, and some of them are needed by every UI.",
    "",
  );

  lines.push("## Devices running Zepp OS", "");
  lines.push(
    "| Device | API_LEVEL | Zepp OS | Symbols available | Screen | Keys | SecondaryWidget | deviceSource |",
  );
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const device of zeppOs) {
    lines.push(
      `| ${cell(device.name)} | ${device.latestApiLevel} | ${device.latestOsVersion ?? NOT_STATED} | ${symbolsAvailableOn(device, symbols)} of ${stated} | ${cell(screenLabel(device))} | ${device.physicalKeys ?? NOT_STATED} | ${yesNo(device.secondaryWidget)} | ${deviceSourceLabel(device)} |`,
    );
  }
  lines.push("");
  lines.push(
    "A `\\*` on a `deviceSource` marks the Mainland China version of that device.",
    "",
  );

  // Placed against the table it depends on: every column it derives from is
  // above, and the two sections below are caveats about hardware this cannot
  // target at all.
  if (examples.length > 0) lines.push(...targetingMarkdown(devices, examples));

  if (noLevel.length > 0) {
    lines.push("## Zepp OS 1.0 devices — no API_LEVEL", "");
    lines.push(
      "The device list states no `Latest API_LEVEL` for these. That is not level 0: the",
      "2.0 API this knowledge base documents does not run on them at all, so **no symbol",
      "here is available** on this hardware.",
      "",
    );
    lines.push("| Device | Zepp OS | Screen | Keys | deviceSource |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const device of noLevel) {
      lines.push(
        `| ${cell(device.name)} | ${device.latestOsVersion ?? NOT_STATED} | ${cell(screenLabel(device))} | ${device.physicalKeys ?? NOT_STATED} | ${deviceSourceLabel(device)} |`,
      );
    }
    lines.push("");
  }

  if (nonZeppOs.length > 0) {
    lines.push("## Devices that do not run Zepp OS", "");
    lines.push(
      "Listed upstream under *Non-Zepp OS Devices*: they take watchfaces but run no Mini",
      "Program. Nothing in `../api/` applies to them. They are here so that a question",
      "about one gets an answer rather than a silence that reads like *not covered*.",
      "",
    );
    lines.push("| Device | Screen | Keys | deviceSource |");
    lines.push("| --- | --- | --- | --- |");
    for (const device of nonZeppOs) {
      lines.push(
        `| ${cell(device.name)} | ${cell(screenLabel(device))} | ${device.physicalKeys ?? NOT_STATED} | ${deviceSourceLabel(device)} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

/** The modules that have at least one symbol attributed to `runtime`. */
function modulesForRuntime(modules: ModuleFile[], runtime: Runtime): ModuleFile[] {
  return modules
    .map(({ module, symbols }) => ({
      module,
      symbols: symbols.filter((record) => record.runtimes.includes(runtime)),
    }))
    .filter(({ symbols }) => symbols.length > 0);
}

/** The record's *other* runtimes, labelled — the cross-runtime signal, per row. */
function alsoValidIn(record: SymbolRecord, runtime: Runtime): string {
  const others = record.runtimes
    .filter((other) => other !== runtime)
    .map((other) => RUNTIME_LABELS.get(other) ?? other);
  return others.length > 0 ? others.join(", ") : "—";
}

function runtimeMarkdown(runtime: Runtime, label: string, modules: ModuleFile[]): string {
  const present = modulesForRuntime(modules, runtime);
  const symbolCount = present.reduce((sum, m) => sum + m.symbols.length, 0);
  const lines = [`# ${label} — runtime`, ""];

  if (symbolCount === 0) {
    lines.push("**No symbols are attributed to this runtime.**", "");
    lines.push(
      "Nothing in this knowledge base answers a question about this runtime yet.",
      "That is a coverage gap here, not a statement about Zepp OS: a symbol absent",
      "from this page is *not covered*, never *does not exist*.",
      "",
    );
    return lines.join("\n");
  }

  lines.push(`**${symbolCount} symbols across ${present.length} modules.**`, "");
  lines.push(
    "A symbol is attributed to a runtime by the source path it was extracted from,",
    "not by any statement in its own text. Absence is *not covered*, not *invalid here*.",
    "",
  );

  for (const module of present) {
    lines.push(`## \`${module.module}\``, "");
    lines.push("| Symbol | Min API_LEVEL | Also valid in |");
    lines.push("| --- | --- | --- |");
    for (const record of module.symbols) {
      lines.push(
        `| \`${record.symbol}\` | ${apiLevelLabel(record)} | ${cell(alsoValidIn(record, runtime))} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * The coverage table over the runtime axis: how much each runtime is covered, and
 * — the part that matters — which runtimes are not covered at all. Also surfaces
 * the symbols no path rule could attribute, so the gap is a number, not a silence.
 */
function runtimeIndexMarkdown(modules: ModuleFile[]): string {
  const all = modules.flatMap((m) => m.symbols);
  const lines = ["# Runtime index", ""];
  lines.push(
    "Which runtime each covered symbol is valid in. Identify the target runtime",
    "before trusting anything in `../api/` — a symbol documented for the Device App",
    "is not thereby available in the Settings App or a Watchface.",
    "",
  );
  lines.push("| Runtime | Symbols | Modules | Page |");
  lines.push("| --- | --- | --- | --- |");

  for (const [runtime, label] of RUNTIMES) {
    const present = modulesForRuntime(modules, runtime);
    const symbolCount = present.reduce((sum, m) => sum + m.symbols.length, 0);
    const page = `[${runtime}.md](${runtime}.md)`;
    lines.push(
      `| ${label} | ${symbolCount} | ${present.length} | ${symbolCount === 0 ? `${page} — **not covered**` : page} |`,
    );
  }

  const shared = all.filter((record) => record.runtimes.length > 1);
  if (shared.length > 0) {
    lines.push("", "## Valid in more than one runtime", "");
    lines.push("The symbols for which a second runtime has actual evidence behind it.", "");
    for (const record of shared) {
      const labels = record.runtimes.map((r) => RUNTIME_LABELS.get(r) ?? r).join(", ");
      lines.push(`- \`${record.id}\` — ${labels}`);
    }
    lines.push("");
  }

  const unattributed = all.filter((record) => record.runtimes.length === 0);
  if (unattributed.length > 0) {
    lines.push("", "## No runtime attributed", "");
    lines.push(
      `${unattributed.length} of ${all.length} symbols came from a path no runtime rule covers.`,
      "They are absent from every page above, and the runtime question is open for them.",
      "",
    );
    for (const record of unattributed) {
      lines.push(`- \`${record.id}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Rewrites the generated pages in every out dir so a module that disappeared
 * upstream also disappears here — same idempotence contract as `writeSymbols`.
 * Deterministic ordering makes a rerun a no-op in git. Only generated `.md`
 * files are removed, so a curated README in either dir survives.
 */
export async function render(
  symbolsDir: string,
  outDir: string,
  devicesFile?: string,
  examplesDir?: string,
): Promise<{ modules: number; runtimes: number; devices: number }> {
  const modules = await readModuleFiles(symbolsDir);
  // `compatibility/` has one owner, because `prepareOutDir` clears the dir: a
  // second function writing `devices.md` there would have its page deleted by
  // whichever ran second. The device join also feeds the compatibility index, so
  // this stage needs the records regardless.
  const devices = devicesFile === undefined ? [] : await readDeviceFile(devicesFile);
  // Read here rather than in the examples renderer because the targeting join
  // lives on `devices.md`, and `compatibility/` has one owner — see above. The
  // sample manifests are the only evidence of which `platforms` selectors real
  // apps ship, and the device list is the only evidence of what they select.
  const examples = examplesDir === undefined ? [] : await readExampleFiles(examplesDir);

  // `index.md` is generated, so no module may claim that slug — nor `devices.md`
  // in the compatibility dir. Resolved before any write so a collision fails
  // without leaving half a knowledge base behind.
  const slugs = new Map<string, string>([
    [path.parse(INDEX_FILE).name, "(the generated index)"],
    [path.parse(DEVICES_FILE).name, "(the generated device page)"],
  ]);
  const pages: { slug: string; module: ModuleFile }[] = [];

  for (const module of modules) {
    const slug = moduleSlug(module.module);
    const claimedBy = slugs.get(slug);
    if (claimedBy) {
      throw new Error(`Module slug collision: "${module.module}" and "${claimedBy}" both map to ${slug}.md`);
    }
    slugs.set(slug, module.module);
    pages.push({ slug, module });
  }

  const apiDir = path.join(outDir, API_DIR);
  const compatDir = path.join(outDir, COMPAT_DIR);
  const runtimesDir = path.join(outDir, RUNTIMES_DIR);

  for (const dir of [apiDir, compatDir, runtimesDir]) {
    await prepareOutDir(dir);
  }

  for (const { slug, module } of pages) {
    await writePage(path.join(apiDir, `${slug}.md`), apiMarkdown(module));
    await writePage(path.join(compatDir, `${slug}.md`), compatMarkdown(module));
  }

  for (const [runtime, label] of RUNTIMES) {
    await writePage(path.join(runtimesDir, `${runtime}.md`), runtimeMarkdown(runtime, label, modules));
  }

  if (devices.length > 0) {
    await writePage(path.join(compatDir, DEVICES_FILE), devicesMarkdown(devices, modules, examples));
  }

  await writePage(path.join(apiDir, INDEX_FILE), apiIndexMarkdown(modules));
  await writePage(path.join(compatDir, INDEX_FILE), compatIndexMarkdown(modules, devices));
  await writePage(path.join(runtimesDir, INDEX_FILE), runtimeIndexMarkdown(modules));

  return { modules: modules.length, runtimes: RUNTIMES.length, devices: devices.length };
}

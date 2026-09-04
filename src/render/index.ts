import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { moduleSlug, type ModuleFile } from "../store/index.js";
import type { Runtime, SymbolRecord } from "../types.js";

// Stage 4: render — generate the final Markdown from the JSON source of truth.
//
// This stage ships the knowledge in the shape the Agent Skill can consume. Three
// views, each over an axis the data actually supports:
//
//   api/            one file per module, symbols grouped and described
//   compatibility/  grouped by minimum API_LEVEL — the cross-reference that is
//                   this project's point
//   runtimes/       one file per runtime, the axis SKILL.md step 1 depends on
//
// Each view also gets an `index.md` so the Skill can find a module without
// listing the directory and guessing slugs.
//
// `runtimes/` renders a page for every runtime in the union, *including the ones
// with no symbols*. A missing page reads like "this runtime does not exist"; a
// page that states "0 symbols covered" reads like the coverage gap it is, which
// is the distinction the whole KB is built on.
//
// The remaining README dirs (concepts/, patterns/, examples/, tools/) hold
// knowledge the three automated fronts don't yet reach, so they are deliberately
// not created here rather than being fabricated.

const API_DIR = "api";
const COMPAT_DIR = "compatibility";
const RUNTIMES_DIR = "runtimes";
const INDEX_FILE = "index.md";

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

// Hand-written, so the rewrite in `render` must leave them alone.
const PRESERVED = new Set(["README.md", "README.pt-BR.md"]);

// A missing minimum means no source states one. It does *not* mean the symbol
// works on every level, so the label must not read like "any".
const NOT_STATED = "not stated";

function isModuleFile(value: unknown): value is ModuleFile {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ModuleFile>;
  return typeof candidate.module === "string" && Array.isArray(candidate.symbols);
}

async function readModuleFiles(symbolsDir: string): Promise<ModuleFile[]> {
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

// A pipe would end the cell early, and `type` is a free-form string upstream.
function cell(value: string): string {
  return value.replace(/\|/g, "\\|");
}

function apiLevelLabel(record: SymbolRecord): string {
  return record.minApiLevel === undefined ? NOT_STATED : `>= ${record.minApiLevel}`;
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

  const described = module.symbols.filter((r) => r.description !== undefined);
  if (described.length > 0) {
    lines.push("", "## Descriptions", "");
    for (const record of described) {
      lines.push(`### \`${module.module}.${record.symbol}\``, "");
      lines.push(record.description!, "");
    }
  }

  return lines.join("\n");
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
function compatIndexMarkdown(modules: ModuleFile[]): string {
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

  for (const [level, entries] of [...byLevel].sort(([a], [b]) => a - b)) {
    lines.push(`## API_LEVEL ${level}`, "");
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

async function writePage(file: string, content: string): Promise<void> {
  await writeFile(file, `${content.replace(/\n+$/, "")}\n`, "utf-8");
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
): Promise<{ modules: number; runtimes: number }> {
  const modules = await readModuleFiles(symbolsDir);

  // `index.md` is generated, so no module may claim that slug. Resolved before
  // any write so a collision fails without leaving half a knowledge base behind.
  const slugs = new Map<string, string>([[path.parse(INDEX_FILE).name, "(the generated index)"]]);
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
    await mkdir(dir, { recursive: true });
    for (const entry of await readdir(dir)) {
      if (entry.endsWith(".md") && !PRESERVED.has(entry)) await rm(path.join(dir, entry));
    }
  }

  for (const { slug, module } of pages) {
    await writePage(path.join(apiDir, `${slug}.md`), apiMarkdown(module));
    await writePage(path.join(compatDir, `${slug}.md`), compatMarkdown(module));
  }

  for (const [runtime, label] of RUNTIMES) {
    await writePage(path.join(runtimesDir, `${runtime}.md`), runtimeMarkdown(runtime, label, modules));
  }

  await writePage(path.join(apiDir, INDEX_FILE), apiIndexMarkdown(modules));
  await writePage(path.join(compatDir, INDEX_FILE), compatIndexMarkdown(modules));
  await writePage(path.join(runtimesDir, INDEX_FILE), runtimeIndexMarkdown(modules));

  return { modules: modules.length, runtimes: RUNTIMES.length };
}

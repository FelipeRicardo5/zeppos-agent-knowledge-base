import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { moduleSlug } from "../store/index.js";
import type { PatternRecord, Runtime, SymbolRecord } from "../types.js";
import {
  INDEX_FILE,
  NOT_STATED,
  apiLevelLabel,
  cell,
  indexSymbols,
  prepareOutDir,
  readModuleFiles,
  writePage,
} from "./shared.js";

// The `patterns/` view: one page per best-practice guide.
//
// A page that only restated the guide would make this a documentation mirror,
// which the project is not. What it adds is the join against the symbol records:
//
//   - the minimum API_LEVEL the *whole pattern* needs — the highest minimum among
//     the symbols its code uses. No single upstream page states this;
//   - which of those symbols this KB has no record for, so a gap is visible
//     instead of the pattern looking fully verified;
//   - the inverse index on the index page: given a symbol, which patterns use it.
//
// The guide's own snippets are reproduced under each approach, attributed to the
// source file, because a pattern without its code is just a link.

const PATTERNS_DIR = "patterns";

const RUNTIME_LABELS: Record<Runtime, string> = {
  "device-app": "Device App",
  "side-service": "Side Service",
  settings: "Settings App",
  watchface: "Watchface",
  "workout-extension": "Workout Extension",
};

function runtimeLabels(runtimes: Runtime[]): string {
  return runtimes.map((runtime) => RUNTIME_LABELS[runtime]).join(", ");
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

export async function readPatternFiles(patternsDir: string): Promise<PatternRecord[]> {
  const files = (await readdir(patternsDir)).filter((f) => f.endsWith(".json"));
  const patterns: PatternRecord[] = [];

  for (const file of files) {
    const raw = await readFile(path.join(patternsDir, file), "utf-8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${file}: invalid JSON (${(error as Error).message})`);
    }
    if (!isPatternRecord(parsed)) {
      throw new Error(`${file}: not a pattern file — expected { id, title, approaches, symbols }`);
    }
    patterns.push(parsed);
  }

  return patterns.sort((a, b) => a.id.localeCompare(b.id));
}

interface ResolvedSymbol {
  id: string;
  record?: SymbolRecord;
}

function resolve(symbols: string[], known: Map<string, SymbolRecord>): ResolvedSymbol[] {
  return symbols.map((id) => ({ id, record: known.get(id) }));
}

/**
 * The highest minimum among the symbols a pattern uses — the level a developer
 * actually needs to follow it, since every symbol in the snippet must be
 * available. `undefined` when no used symbol states a minimum.
 *
 * Symbols the KB has no record for are skipped rather than treated as level 0:
 * the result is a floor derived from known symbols, never a guarantee.
 */
function requiredApiLevel(resolved: ResolvedSymbol[]): number | undefined {
  const levels = resolved
    .map(({ record }) => record?.minApiLevel)
    .filter((level): level is number => level !== undefined);

  return levels.length > 0 ? Math.max(...levels) : undefined;
}

function symbolTable(resolved: ResolvedSymbol[]): string[] {
  const lines = ["| Symbol | Min API_LEVEL | Runtimes | In this KB |", "| --- | --- | --- | --- |"];

  for (const { id, record } of resolved) {
    const level = record ? apiLevelLabel(record.minApiLevel) : "—";
    const runtimes = record && record.runtimes.length > 0 ? runtimeLabels(record.runtimes) : "—";
    const covered = record ? "yes" : "**no record**";
    lines.push(`| \`${id}\` | ${level} | ${cell(runtimes)} | ${covered} |`);
  }

  return lines;
}

function patternMarkdown(pattern: PatternRecord, known: Map<string, SymbolRecord>): string {
  const resolved = resolve(pattern.symbols, known);
  const required = requiredApiLevel(resolved);
  const missing = resolved.filter(({ record }) => record === undefined);
  const lines = [`# ${pattern.title}`, ""];

  if (pattern.summary) lines.push(pattern.summary, "");

  lines.push(
    required === undefined
      ? `**Minimum API_LEVEL: ${NOT_STATED}.** No symbol this pattern uses documents one.`
      : `**Minimum API_LEVEL: >= ${required}.** The highest minimum among the ${resolved.length} symbols this pattern's code uses — every one of them has to be available.`,
    "",
  );

  if (pattern.runtimes.length > 0) {
    lines.push(`Runtimes the guide's own file names state: ${runtimeLabels(pattern.runtimes)}.`, "");
  }

  lines.push(`Source: \`${pattern.originalPath}\``, "");

  if (resolved.length > 0) {
    lines.push("## Symbols used", "");
    lines.push(...symbolTable(resolved));
    lines.push("");
    if (missing.length > 0) {
      lines.push(
        `${missing.length} of these have no record in this KB, so this pattern is **not fully verifiable** here. Absence is *not covered*, not *does not exist*.`,
        "",
      );
    }
  } else {
    lines.push(
      "## Symbols used",
      "",
      "None. This guide's code imports no `@zos` module, so there is nothing here to check against `../api/` — it is prose and configuration only.",
      "",
    );
  }

  if (pattern.modules.length > 0) {
    lines.push("## Modules imported wholesale", "");
    lines.push(
      "Imported as a namespace (`import * as x from '...'`), so no single symbol is named.",
      "",
    );
    for (const module of pattern.modules) {
      lines.push(`- \`${module}\` — see [../api/${moduleSlug(module)}.md](../api/${moduleSlug(module)}.md)`);
    }
    lines.push("");
  }

  for (const approach of pattern.approaches) {
    lines.push(`## ${approach.heading}`, "");

    if (approach.symbols.length > 0) {
      lines.push(`Symbols: ${approach.symbols.map((id) => `\`${id}\``).join(", ")}`, "");
    }

    for (const snippet of approach.snippets) {
      if (snippet.title) {
        const runtime = snippet.runtime ? ` — ${RUNTIME_LABELS[snippet.runtime]}` : "";
        lines.push(`\`${snippet.title}\`${runtime}`, "");
      }
      lines.push(`\`\`\`${snippet.language}`, snippet.code, "```", "");
    }
  }

  if (pattern.referencePages.length > 0) {
    lines.push("## Reference pages the guide links to", "");
    for (const page of pattern.referencePages) {
      lines.push(`- \`${page}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * The pattern list, plus the inverse index a retrieval system actually wants:
 * given a symbol, which patterns show it in use. That direction exists nowhere
 * upstream — the guides link to the reference pages, never the other way round.
 */
function patternIndexMarkdown(patterns: PatternRecord[], known: Map<string, SymbolRecord>): string {
  const lines = ["# Patterns index", ""];
  lines.push(
    `**${patterns.length} patterns**, extracted from the official best-practice guides.`,
    "",
    "A pattern is a task, not a symbol. `Minimum API_LEVEL` is derived here: it is the",
    "highest minimum among the symbols the guide's own code uses, which no single",
    "upstream page states.",
    "",
  );
  lines.push("| Pattern | Approaches | Symbols | Minimum API_LEVEL | Page |");
  lines.push("| --- | --- | --- | --- | --- |");

  for (const pattern of patterns) {
    const resolved = resolve(pattern.symbols, known);
    const required = requiredApiLevel(resolved);
    lines.push(
      `| ${cell(pattern.title)} | ${pattern.approaches.length} | ${pattern.symbols.length} | ${
        required === undefined ? NOT_STATED : `>= ${required}`
      } | [${pattern.id}.md](${pattern.id}.md) |`,
    );
  }

  const usedBy = new Map<string, string[]>();
  for (const pattern of patterns) {
    for (const id of pattern.symbols) {
      const group = usedBy.get(id);
      if (group) group.push(pattern.id);
      else usedBy.set(id, [pattern.id]);
    }
  }

  if (usedBy.size > 0) {
    lines.push("", "## Which patterns use a symbol", "");
    lines.push(
      "The inverse of the guides' own links. Use it to find working code for a symbol",
      "found in `../api/`.",
      "",
    );
    for (const [id, ids] of [...usedBy].sort(([a], [b]) => a.localeCompare(b))) {
      const flag = known.has(id) ? "" : " *(no record in this KB)*";
      lines.push(`- \`${id}\`${flag} — ${ids.map((p) => `[${p}](${p}.md)`).join(", ")}`);
    }
    lines.push("");
  }

  const unknown = [...usedBy.keys()].filter((id) => !known.has(id));
  if (unknown.length > 0) {
    lines.push("", "## Symbols used by a guide but absent from this KB", "");
    lines.push(
      `${unknown.length} symbols appear in official guide code with no record in \`../api/\`.`,
      "Each is a real extraction gap: the guide proves the symbol exists, so absence here",
      "is this KB's coverage, never the platform's.",
      "",
    );
    for (const id of unknown.sort()) {
      lines.push(`- \`${id}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Rewrites `patterns/` from the pattern JSON, joined against the symbol JSON.
 * Same contract as `render`: only generated `.md` files are replaced, and a
 * rerun is a no-op in git.
 */
export async function renderPatterns(
  patternsDir: string,
  symbolsDir: string,
  outDir: string,
): Promise<{ patterns: number }> {
  const patterns = await readPatternFiles(patternsDir);
  const known = indexSymbols(await readModuleFiles(symbolsDir));

  // `index.md` is generated, so no pattern may claim that slug.
  const indexSlug = path.parse(INDEX_FILE).name;
  const claimed = patterns.find((pattern) => pattern.id === indexSlug);
  if (claimed) {
    throw new Error(`Pattern id collision: "${claimed.title}" maps to the generated ${INDEX_FILE}`);
  }

  const dir = path.join(outDir, PATTERNS_DIR);
  await prepareOutDir(dir);

  for (const pattern of patterns) {
    await writePage(path.join(dir, `${pattern.id}.md`), patternMarkdown(pattern, known));
  }
  await writePage(path.join(dir, INDEX_FILE), patternIndexMarkdown(patterns, known));

  return { patterns: patterns.length };
}

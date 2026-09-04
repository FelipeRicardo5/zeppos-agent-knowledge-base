// Stage 2: parse — three fronts over the raw cached content.
//
// Every front also attributes a runtime, which no content states — see
// ./runtime.ts, where the path-based rules and their doc anchors live.

import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RawUnit } from "../types.js";
import { runtimeForPath } from "./runtime.js";
import { walkFiles } from "./util.js";

const IMPORT_RE = /import\s*(?:\{([^}]*)\})?[^'"]*from\s+['"](@[^'"]+)['"]/g;
// The badge line is a blockquote, but its wording varies ("Start from API_LEVEL",
// "Supported since API_LEVEL"), so match the blockquote rather than one phrasing.
const API_LEVEL_RE = /^>.*API_LEVEL\s+`(\d+(?:\.\d+)?)`/m;

// Docs-site machinery imported by the MDX page itself, not Zepp OS API surface.
const DOCS_SITE_SCOPES = ["@docusaurus/", "@site/", "@theme/"];

/**
 * A reference page often opens with a Docusaurus component import before any
 * example code, so "first @ import wins" misattributes the symbol. Prefer the
 * import that actually names this symbol; fall back to the first import that
 * isn't docs-site machinery.
 */
function resolveModule(content: string, symbol: string): string | undefined {
  let fallback: string | undefined;

  for (const [, namedImports, module] of content.matchAll(IMPORT_RE)) {
    if (DOCS_SITE_SCOPES.some((scope) => module.startsWith(scope))) continue;

    const names = (namedImports ?? "").split(",").map((name) => name.trim().split(/\s+as\s+/)[0].trim());
    if (names.includes(symbol)) return module;

    fallback ??= module;
  }

  return fallback;
}

function importedModules(text: string): string[] {
  return [...text.matchAll(IMPORT_RE)]
    .map(([, , module]) => module)
    .filter((module) => !DOCS_SITE_SCOPES.some((scope) => module.startsWith(scope)));
}

/** Most-imported module, first occurrence winning a tie so the result is stable. */
function dominantModule(modules: string[]): string | undefined {
  const counts = new Map<string, number>();
  for (const module of modules) counts.set(module, (counts.get(module) ?? 0) + 1);

  let best: string | undefined;
  let bestCount = 0;
  for (const [module, count] of counts) {
    if (count > bestCount) [best, bestCount] = [module, count];
  }
  return best;
}

const IMPORT_BLOCK_RE = /###\s+Import\s*```[a-z]*\n([\s\S]*?)```/;

/** The module named by a symbol's own `### Import` block, ignoring example code. */
function importBlockModule(chunk: string): string | undefined {
  const block = chunk.match(IMPORT_BLOCK_RE);
  return block ? importedModules(block[1])[0] : undefined;
}

/**
 * Front 1: docs/reference/**\/*.mdx — one file per symbol, filename == symbol name.
 * The module is read from the `import { symbol } from '@zos/module'` line in the
 * file's own example, since the directory name doesn't reliably match the module id.
 */
export async function parseMarkdown(cacheDir: string): Promise<RawUnit[]> {
  const referenceDir = path.join(cacheDir, "zeppos-docs", "docs", "reference");
  const files = await walkFiles(referenceDir, [".mdx", ".md"]);
  const units: RawUnit[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    const symbol = path.basename(file, path.extname(file));
    const sourceFile = path.relative(cacheDir, file);

    const module = resolveModule(content, symbol);
    if (!module) continue; // no example import -> can't attribute a module, skip

    const apiLevelMatch = content.match(API_LEVEL_RE);
    const description = extractDescription(content);

    units.push({
      module,
      symbol,
      kind: content.includes("function " + symbol) ? "function" : "value",
      description,
      apiLevel: apiLevelMatch ? Number(apiLevelMatch[1]) : undefined,
      runtimeHint: runtimeForPath(sourceFile),
      sourceFile,
      sourceKind: "docs-reference",
    });
  }

  return units;
}

function extractDescription(content: string): string | undefined {
  const lines = content.split("\n");
  const headingIndex = lines.findIndex((line) => line.startsWith("# "));
  // finds the next ## heading (it could be ## Type, ## Example, ## Parameters, etc)
  const typeIndex = lines.findIndex((line) => line.startsWith("## "));
  if (headingIndex === -1 || typeIndex === -1) return undefined;

  const body = lines
    .slice(headingIndex + 1, typeIndex)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith(">"));

  return body.length > 0 ? body.join(" ") : undefined;
}

const CONSTANT_ROW_RE = /^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([\d.]+)\s*\|$/;

const LLMS_API_LEVEL_RE = /(?:^>.*API_LEVEL\s+`(\d+(?:\.\d+)?)`|-\s*API_LEVEL:\s*(\d+(?:\.\d+)?))/m;

/**
 * Front 2: static/llms/@zos-*.md — one file per module. Each real symbol block is
 * separated by a `---` rule; inside a block the first `## heading` is the symbol
 * name (nested `## Type` / `## Example` / `## Parameters` headings that follow
 * belong to the same symbol, not siblings — the source dumps a docs-reference-style
 * copy inline). The chunk before the first `---` carries the module-level
 * `## Constants` table.
 */
export async function parseLlmsContent(cacheDir: string): Promise<RawUnit[]> {
  const llmsDir = path.join(cacheDir, "zeppos-docs", "static", "llms");
  const files = await walkFiles(llmsDir, [".md"]);
  const units: RawUnit[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    const sourceFile = path.relative(cacheDir, file);
    const runtimeHint = runtimeForPath(sourceFile);

    const moduleMatch = content.match(/^#\s+(@\S+)/m);
    if (!moduleMatch) continue;

    // The H1 mirrors the file name, and `@zos/ui` is split across several files
    // whose H1 reads "@zos/ui-methods", "@zos/ui-widget-basic" and so on — ids you
    // cannot import. The import lines inside the file state the real module, so
    // they win; the H1 is only a fallback for a file that imports nothing.
    const fileModule = dominantModule(importedModules(content)) ?? moduleMatch[1];

    // `---` trails each symbol section rather than leading it, so the chunk before
    // the first `---` holds the module-level `## Constants` table (when the module
    // has one — most don't) AND the first symbol's section. Split the header at its
    // first non-"Constants" heading: everything before it is module-level, the rest
    // is that first symbol's chunk.
    const [rawHeader, ...restChunks] = content.split(/^---\s*$/m);
    const firstSymbolAt = [...rawHeader.matchAll(/^##\s+(.+)$/gm)].find(
      (match) => match[1].trim() !== "Constants",
    )?.index;

    const header = firstSymbolAt === undefined ? rawHeader : rawHeader.slice(0, firstSymbolAt);
    const symbolChunks =
      firstSymbolAt === undefined ? restChunks : [rawHeader.slice(firstSymbolAt), ...restChunks];

    for (const line of header.split("\n")) {
      const rowMatch = line.match(CONSTANT_ROW_RE);
      if (!rowMatch) continue;
      const [, name, description, apiLevel] = rowMatch;
      units.push({
        module: fileModule,
        symbol: name,
        kind: "constant",
        description: description.trim(),
        apiLevel: Number(apiLevel),
        runtimeHint,
        sourceFile,
        sourceKind: "llms",
      });
    }

    for (const chunk of symbolChunks) {
      const headingMatch = chunk.match(/^##\s+(.+)$/m);
      if (!headingMatch) continue;
      const symbol = headingMatch[1].trim();

      const descriptionMatch = chunk.match(/-\s*Description:\s*(.+)/);
      const apiLevelMatch = chunk.match(LLMS_API_LEVEL_RE);

      units.push({
        module: importBlockModule(chunk) ?? fileModule,
        symbol,
        kind: "function",
        description: descriptionMatch ? descriptionMatch[1].trim() : undefined,
        apiLevel: apiLevelMatch ? Number(apiLevelMatch[1] ?? apiLevelMatch[2]) : undefined,
        runtimeHint,
        sourceFile,
        sourceKind: "llms",
      });
    }
  }

  return units;
}

const MULTI_IMPORT_RE = /import\s*\{([^}]*)\}\s*from\s*['"](@[^'"]+)['"]/g;

/**
 * Front 3: samples/**\/*.js — real usage of `@zos/*` symbols in shipped example apps.
 * These are OBSERVED (not documented) confidence signals, resolved at enrich time.
 */
export async function parseSamples(cacheDir: string): Promise<RawUnit[]> {
  const samplesDir = path.join(cacheDir, "zeppos-samples");
  const files = await walkFiles(samplesDir, [".js"]);
  const units: RawUnit[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    const sourceFile = path.relative(cacheDir, file);
    const runtimeHint = runtimeForPath(sourceFile);

    for (const match of content.matchAll(MULTI_IMPORT_RE)) {
      const [, namedImports, module] = match;
      const symbols = namedImports
        .split(",")
        .map((s) => s.trim().split(/\s+as\s+/)[0].trim())
        .filter(Boolean);

      for (const symbol of symbols) {
        units.push({
          module,
          symbol,
          kind: /^[A-Z][A-Z0-9_]*$/.test(symbol) ? "constant" : "function",
          runtimeHint,
          sourceFile,
          sourceKind: "sample",
        });
      }
    }
  }

  return units;
}

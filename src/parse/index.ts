// Stage 2: parse — three fronts over the raw cached content.
//
// Every front also attributes a runtime, which no content states — see
// ./runtime.ts, where the path-based rules and their doc anchors live.

import path from "node:path";
import type { RawUnit } from "../types.js";
import { runtimeForPath } from "./runtime.js";
import { readSource, walkFiles } from "./util.js";

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
    const content = await readSource(file);
    const symbol = path.basename(file, path.extname(file));
    const sourceFile = path.relative(cacheDir, file);

    // The import wins; the directory is the fallback for a page documenting a
    // runtime global, which has nothing to import. A page under neither rule
    // attributes to no module and is skipped rather than guessed at.
    const module = resolveModule(content, symbol) ?? moduleFromPath(sourceFile);
    if (!module) continue;

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

const NON_SYMBOL_PAGES = new Set(["overview", "index", "readme"]);

/** A line that is nothing but an image — `media/Player.mdx` opens with one. */
const IMAGE_ONLY_RE = /^!\[[^\]]*\]\([^)]*\)$/;
/**
 * An HTML or JSX tag, however many lines it spans. These pages are MDX, so an
 * illustration is markdown on one page and a tag on another: `ui/VIEW_CONTAINER.mdx`
 * opens with a `<div style={{...}}>` wrapping an `<img>`, which made its
 * "description" 999 characters of layout markup. `ui/openInspector.mdx` breaks
 * the same `<img>` across five lines, so a per-line filter leaves its
 * `src={useBaseUrl(...)}` attributes behind — the tag has to go as a unit.
 * `[^>]` matches newlines, which is what makes that work.
 */
const MARKUP_TAG_RE = /<\/?[A-Za-z][^>]*>/g;
/** A self-closing tag's tail, left behind once the tag itself is stripped. */
const MARKUP_TAIL_RE = /^\/?>$/;
/** Docusaurus admonition fences: `:::info`, `:::caution`, and the bare closer. */
const ADMONITION_RE = /^:::/;

/**
 * The line the page's own prose starts after: its H1, or the close of its
 * frontmatter when it has no H1.
 *
 * 140 of the 241 reference pages title with an H1 and the other 101 title in the
 * frontmatter instead. Anchoring on the H1 alone returned nothing for every page
 * of the second kind, losing 68 descriptions.
 */
function proseStart(lines: string[]): number | undefined {
  const h1 = lines.findIndex((line) => line.startsWith("# "));
  if (h1 !== -1) return h1 + 1;

  if (lines[0]?.trim() !== "---") return undefined;
  const close = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  return close === -1 ? undefined : close + 1;
}

/**
 * The page's prose description: the text between its title and its first section.
 *
 * The end is the first `## ` or code fence *after* the start, not the first in
 * the file: on a frontmatter-titled page the sections sit above where the old
 * H1 anchor would have been, and a page with no `## ` at all would otherwise
 * swallow its example code.
 *
 * Dropped from the prose: the API_LEVEL badge blockquote, MDX component imports,
 * standalone images, and the `:::info` fence markers — the marker lines only,
 * so the content inside them survives (that is where a permission code is
 * stated).
 */
function extractDescription(content: string): string | undefined {
  const lines = content.split("\n");
  const start = proseStart(lines);
  if (start === undefined) return undefined;

  let end = lines.findIndex(
    (line, index) => index >= start && (line.startsWith("## ") || line.trimStart().startsWith("```")),
  );
  if (end === -1) end = lines.length;

  const body = lines
    .slice(start, end)
    // The badge blockquote goes before tags are stripped: it is a whole line and
    // its `[API_LEVEL](...)` link would otherwise survive as bare text.
    .filter((line) => !line.trimStart().startsWith(">"))
    .join("\n")
    .replace(MARKUP_TAG_RE, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("import "))
    .filter((line) => !IMAGE_ONLY_RE.test(line))
    .filter((line) => !MARKUP_TAIL_RE.test(line))
    .filter((line) => !ADMONITION_RE.test(line));

  return body.length > 0 ? body.join(" ") : undefined;
}

/**
 * `newAPI/<dir>/<symbol>.mdx` read as a module id — used only when the page has
 * no import line at all.
 *
 * Measured against the 222 pages that do have one: 221 agree with `@zos/<dir>`.
 * The single exception is `transfer-file/TransferFile.mdx`, which imports
 * `@zos/ble/TransferFile`, a submodule the directory name cannot express. So the
 * import stays the primary source and this is the fallback — which is exactly
 * what the 19 pages documenting runtime globals need (`getApp`, `setTimeout`,
 * `console`, `Buffer`, `App`, `Page`, and 5 under `ui/`): being globals, they
 * have nothing to import, so they were skipped entirely and their descriptions
 * never reached the `@zos/global` and `@zos/ui` records the llms front had built.
 */
function moduleFromPath(sourceFile: string): string | undefined {
  const segments = sourceFile.split(path.sep).join("/").split("/");
  const page = segments[segments.length - 1].replace(/\.[^.]+$/, "").toLowerCase();
  // A page that titles the module rather than a symbol. `router/overview.mdx`
  // describes the module and imports nothing, so the directory fallback would
  // file it as `@zos/router.overview` — an id nothing can import. None exist
  // upstream today; the guard is here because the fallback is what would turn
  // one into a fabricated symbol the day one appears.
  if (NON_SYMBOL_PAGES.has(page)) return undefined;

  const at = segments.indexOf("newAPI");
  if (at === -1) return undefined;

  const dir = segments[at + 1];
  // The segment after `newAPI` is the page itself when it sits directly in it.
  return dir === undefined || dir === segments[segments.length - 1] ? undefined : `@zos/${dir}`;
}

const CONSTANT_ROW_RE = /^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([\d.]+)\s*\|$/;

const LLMS_API_LEVEL_RE = /(?:^>.*API_LEVEL\s+`(\d+(?:\.\d+)?)`|-\s*API_LEVEL:\s*(\d+(?:\.\d+)?))/m;

const HEADING_RE = /^##\s+(.+)$/;
const CONSTANTS_HEADING = "Constants";

/**
 * `##` headings that title a section of the document rather than a symbol.
 * `Constants` heads a table of them; `Overview`, `Usage` and `Submodules` head
 * prose and link lists. Filing them as symbols invented ids like
 * `@zos/ui.Submodules`, which nothing can import — the same failure as the
 * multi-word topic headings the whitespace check catches, except these are one
 * word so it does not see them.
 */
const STRUCTURAL_HEADINGS = new Set([
  CONSTANTS_HEADING,
  "Overview",
  "Usage",
  "Submodules",
  // Normally a `###` under a symbol, but `@zos-ui.md` promotes it to `##`.
  "Import",
]);

/**
 * Constant rows under every `## Constants` heading in a chunk.
 *
 * A module documents its constants as several groups, not one table:
 * `@zos/interaction` has separate `## Constants` sections for keys, gestures, key
 * events and wrist motions, and they are spread across chunks — sometimes *after*
 * the chunk's symbol rather than before it. Reading rows only from the file's
 * first chunk found 61 of 249. Scoping to each `## Constants` region instead
 * picks up all of them while still ignoring the parameter tables that sit under
 * other headings, which are not module constants and must not become symbols.
 */
function constantRows(chunk: string): { name: string; description: string; apiLevel: number }[] {
  const rows: { name: string; description: string; apiLevel: number }[] = [];
  let inConstants = false;

  for (const line of chunk.split("\n")) {
    const heading = line.match(HEADING_RE);
    if (heading) {
      inConstants = heading[1].trim() === CONSTANTS_HEADING;
      continue;
    }
    if (!inConstants) continue;

    const rowMatch = line.match(CONSTANT_ROW_RE);
    if (rowMatch) {
      rows.push({ name: rowMatch[1], description: rowMatch[2].trim(), apiLevel: Number(rowMatch[3]) });
    }
  }

  return rows;
}

/**
 * Front 2: static/llms/@zos-*.md — one file per module. Each real symbol block is
 * separated by a `---` rule; inside a block the first `## heading` is the symbol
 * name (nested `## Type` / `## Example` / `## Parameters` headings that follow
 * belong to the same symbol, not siblings — the source dumps a docs-reference-style
 * copy inline). `## Constants` headings are the exception: they name a table of
 * module constants rather than a symbol, and occur in several chunks per file.
 */
export async function parseLlmsContent(cacheDir: string): Promise<RawUnit[]> {
  const llmsDir = path.join(cacheDir, "zeppos-docs", "static", "llms");
  const files = await walkFiles(llmsDir, [".md"]);
  const units: RawUnit[] = [];

  for (const file of files) {
    const content = await readSource(file);
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

    // header and symbolChunks partition the file, so every `## Constants` region
    // is scanned exactly once.
    for (const chunk of [header, ...symbolChunks]) {
      for (const { name, description, apiLevel } of constantRows(chunk)) {
        units.push({
          module: fileModule,
          symbol: name,
          kind: "constant",
          description,
          apiLevel,
          runtimeHint,
          sourceFile,
          sourceKind: "llms",
        });
      }
    }

    for (const chunk of symbolChunks) {
      // `## Constants` names a table, not a symbol, so it can never be the symbol
      // this chunk is about — take the first heading that isn't one.
      //
      // A heading containing whitespace is a topic title, not a symbol: `## Widget
      // Animation` and `## keyboard API` group several symbols, which the section's
      // own `### Import` block then names. Filing the title as a symbol invented
      // `@zos/ui.Widget Animation`, an id nothing can import.
      const symbol = [...chunk.matchAll(/^##\s+(.+)$/gm)]
        .map((match) => match[1].trim())
        .find((heading) => !STRUCTURAL_HEADINGS.has(heading) && !/\s/.test(heading));
      if (symbol === undefined) continue;

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
    const content = await readSource(file);
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

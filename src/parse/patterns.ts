import path from "node:path";
import type { PatternApproach, PatternSnippet, RawPattern } from "../types.js";
import { runtimeForAppFile } from "./runtime.js";
import { readSource, walkFiles } from "./util.js";

// Front 4: docs/guides/best-practice/**.mdx — task-shaped guides, one file per task.
//
// The other three fronts answer "does this symbol exist, where, and since when".
// This one answers "how do I do X" — and the part that makes it more than a copy
// of the guide is the symbol set: every `@zos` import the guide's own code uses.
// Render joins those ids against the symbol records to derive the minimum
// API_LEVEL the whole pattern needs, which no single page states.
//
// The guides are prose, so only the parts with a fixed shape are extracted:
// frontmatter title, `##` sections, fenced code blocks, and the reference pages
// the guide links to. Nothing is inferred from the prose itself.

const GUIDES_DIR = ["zeppos-docs", "docs", "guides", "best-practice"];

/** ```lang meta \n code \n``` — meta is everything after the language on the fence. */
const FENCE_RE = /^```(\w*)([^\n]*)\n([\s\S]*?)^```/gm;

// Both `title=page.js` and `title="class.js"` occur in these files.
const FENCE_TITLE_RE = /title=(?:"([^"]*)"|([^\s"]+))/;

const NAMED_IMPORT_RE = /import\s*\{([^}]*)\}\s*from\s*['"](@[^'"]+)['"]/g;
// `import * as ble from '@zos/ble'` — the module is used, no symbol is named.
const NAMESPACE_IMPORT_RE = /import\s*\*\s*as\s+\w+\s*from\s*['"](@[^'"]+)['"]/g;

const FRONTMATTER_TITLE_RE = /^---\n([\s\S]*?)\n---/;
const MARKDOWN_LINK_RE = /\[([^\]]*)\]\(([^)]*)\)/g;

/** Only `js` fences hold runnable Zepp OS code; `sh`, `txt` and `json` don't. */
const CODE_LANGUAGE = "js";

export function patternSlug(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function frontmatterTitle(content: string): string | undefined {
  const block = content.match(FRONTMATTER_TITLE_RE);
  if (!block) return undefined;
  const line = block[1].split("\n").find((l) => l.startsWith("title:"));
  return line?.slice("title:".length).trim().replace(/^['"]|['"]$/g, "");
}

/**
 * Prose from one chunk of a guide. Admonition markers (`:::tip`) and link URLs
 * are dropped so the result reads as a sentence; bullet lists are dropped too,
 * because in these files they preview the `##` headings that follow.
 */
function extractProse(lead: string): string | undefined {
  const body = lead
    .replace(FRONTMATTER_TITLE_RE, "")
    .replace(FENCE_RE, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith(":::"))
    .filter((line) => !line.startsWith("-") && !line.startsWith("*"))
    .filter((line) => !line.startsWith("import "))
    .map((line) => line.replace(MARKDOWN_LINK_RE, "$1"));

  return body.length > 0 ? body.join(" ") : undefined;
}

/** A `##` chunk minus its own heading line — `split` leaves the heading in it. */
function withoutHeading(section: string): string {
  return section.slice(section.indexOf("\n") + 1);
}

function parseSnippets(section: string): PatternSnippet[] {
  const snippets: PatternSnippet[] = [];

  for (const [, language, meta, code] of section.matchAll(FENCE_RE)) {
    const titleMatch = meta.match(FENCE_TITLE_RE);
    const title = titleMatch?.[1] ?? titleMatch?.[2];

    snippets.push({
      language,
      title,
      // A title only implies a runtime when it names a file of runnable code.
      runtime: title !== undefined && language === CODE_LANGUAGE ? runtimeForAppFile(title) : undefined,
      code: code.replace(/\n+$/, ""),
    });
  }

  return snippets;
}

function usedApi(snippets: PatternSnippet[]): { symbols: string[]; modules: string[] } {
  const symbols = new Set<string>();
  const modules = new Set<string>();

  for (const snippet of snippets) {
    if (snippet.language !== CODE_LANGUAGE) continue;

    for (const [, namedImports, module] of snippet.code.matchAll(NAMED_IMPORT_RE)) {
      for (const name of namedImports.split(",")) {
        const symbol = name.trim().split(/\s+as\s+/)[0].trim();
        if (symbol) symbols.add(`${module}.${symbol}`);
      }
    }

    for (const [, module] of snippet.code.matchAll(NAMESPACE_IMPORT_RE)) {
      modules.add(module);
    }
  }

  return { symbols: [...symbols].sort(), modules: [...modules].sort() };
}

/**
 * Reference pages the guide links to, as cache-relative paths. Links are written
 * relative to the guide, so they are resolved against its directory; anything
 * that doesn't land under `docs/reference/` is a link to a sample or another
 * guide and is not a reference page.
 */
function referencePages(content: string, sourceFile: string): string[] {
  const fromDir = path.posix.dirname(sourceFile.split(path.sep).join("/"));
  const pages = new Set<string>();

  for (const [, , url] of content.matchAll(MARKDOWN_LINK_RE)) {
    if (url.startsWith("http") || url.startsWith("#")) continue;
    const target = path.posix.normalize(path.posix.join(fromDir, url.split("#")[0]));
    if (target.startsWith("zeppos-docs/docs/reference/")) pages.add(target);
  }

  return [...pages].sort();
}

export async function parsePatterns(cacheDir: string): Promise<RawPattern[]> {
  const guidesDir = path.join(cacheDir, ...GUIDES_DIR);
  const files = await walkFiles(guidesDir, [".mdx", ".md"]);
  const patterns: RawPattern[] = [];

  for (const file of files) {
    const content = await readSource(file);
    const sourceFile = path.relative(cacheDir, file);

    const title = frontmatterTitle(content);
    // Every guide in this directory has a frontmatter title; one without it is a
    // format change worth failing loudly on rather than filing under its slug.
    if (title === undefined) {
      throw new Error(`${sourceFile}: guide has no frontmatter title`);
    }

    const [lead, ...rest] = content.split(/^## /m);
    // Six of these guides open with prose before the first `##`; the other five
    // put the same paragraph inside a section (`## Introduction`, `## Intro`).
    // Taking the first prose block either way avoids matching heading names.
    const summary =
      extractProse(lead) ?? (rest.length > 0 ? extractProse(withoutHeading(rest[0])) : undefined);
    const approaches: PatternApproach[] = rest.map((section) => {
      // A heading can carry a link — `## Via [sessionStorage API](...)`.
      const heading = section
        .slice(0, section.indexOf("\n"))
        .trim()
        .replace(MARKDOWN_LINK_RE, "$1");
      const snippets = parseSnippets(section);
      return { heading, ...usedApi(snippets), snippets };
    });

    patterns.push({
      id: patternSlug(path.basename(file)),
      title,
      summary,
      approaches,
      referencePages: referencePages(content, sourceFile),
      sourceFile,
    });
  }

  return patterns.sort((a, b) => a.id.localeCompare(b.id));
}

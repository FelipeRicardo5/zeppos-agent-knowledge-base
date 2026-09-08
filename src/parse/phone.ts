import path from "node:path";
import type { RawUnit } from "../types.js";
import { runtimeForPath } from "./runtime.js";
import { extractShapes, extractSignature } from "./spec.js";
import { readSource, walkFiles } from "./util.js";

// Front 6: the two runtimes that execute in the Zepp App on the phone —
// `docs/reference/side-service-api/**` and `docs/reference/app-settings-api/**`.
//
// Both were at zero. The docs-reference front skips these pages because it keys
// on an `import { x } from '@zos/...'` line and these APIs are globals
// (`fetch`, `settings.settingsStorage`, `messaging.peerSocket`) or Settings App
// components, so there is nothing to import. Together they are two of the three
// parts of a Mini Program that `guides/architecture/arc.mdx` describes, which is
// why they matter more than their 22 pages suggest.
//
// Measured across all 22 pages, they take four shapes — not 22:
//
//   PAGE_SYMBOL   the page *is* the symbol; its title names it and no `##` does.
//                 All 13 `app-settings-api/ui/*` pages (Button, Select, ...).
//   H2_SYMBOLS    each `##` names a symbol, and the `###` under it (`Type`,
//                 `Code example`) belong to it — the same rule the llms front
//                 already uses. `settings-storage.mdx`, `messaging.mdx`.
//   H2_MODULE     the `##` names a module and each `###` under it names a
//                 symbol. Signalled by the heading ending in " module":
//                 `## network.downloader module`, `## image module`.
//   NO_HEADING    no heading at all, so the filename names the symbol —
//                 `fetch.mdx` documents `fetch`.
//
// A real MDX AST would hand over the heading tree but not the decision of which
// depth is a symbol, and that decision is what varies here. The signal for it is
// textual (" module"), so the shape is detected rather than parsed.
//
// Not extracted: methods at `####` on an object a function returns
// (`DownloadTask.cancel`, `Onbox.enqueFile`). They are real API but reached
// through a returned instance, not named at module level, so filing them beside
// module symbols would misrepresent how they are called.

const RUNTIME_DIRS = [
  ["zeppos-docs", "docs", "reference", "side-service-api"],
  ["zeppos-docs", "docs", "reference", "app-settings-api"],
];

/**
 * `##`/`###` headings that title a part of the page rather than a symbol. Same
 * problem the llms front has, and the same answer: name them.
 */
const STRUCTURAL_HEADINGS = new Set([
  "type",
  "types",
  "props",
  "parameters",
  "example",
  "code example",
  "full example",
  "basic functions",
  "usage",
  "overview",
  "result",
  "options",
]);

/** `## network.downloader module` — the heading names a module, not a symbol. */
const MODULE_HEADING_RE = /\s+module$/i;
/** `## length: number` — a heading naming a member, with its type annotated. */
const ANNOTATED_HEADING_RE = /^(.*?)\s*:\s*[A-Za-z<>[\]|\s]+$/;
/**
 * `### Options: object`, `### DownloadTask: object`, `### SelectOption: object` —
 * the shape of a parameter or of a returned value, not a symbol of the module.
 * Filing them as symbols made `select.mdx` report `SelectOption` instead of
 * `Select`, and gave `download-file.mdx` a `DownloadTask` symbol described by
 * its first method.
 */
const SHAPE_HEADING_RE = /:\s*object$/i;

const FRONTMATTER_TITLE_RE = /^---\n([\s\S]*?)\n---/;
const MARKUP_TAG_RE = /<\/?[A-Za-z][^>]*>/g;
const CODE_FENCE_RE = /```[a-z]*\n([\s\S]*?)```/g;

/** `import Content from '../side-service-api/settings-storage.mdx'` + `<Content/>`. */
const MDX_REEXPORT_RE = /^import\s+\w+\s+from\s+['"]([^'"]+\.mdx)['"]/m;

function frontmatterTitle(content: string): string | undefined {
  const block = content.match(FRONTMATTER_TITLE_RE);
  if (!block) return undefined;
  const line = block[1].split("\n").find((l) => l.startsWith("title:"));
  return line?.slice("title:".length).trim().replace(/^['"]|['"]$/g, "");
}

/**
 * The importable-looking name a heading states. `## length: number` names
 * `length`; `### console.log()` names `console.log`; backticks and trailing
 * punctuation are decoration.
 */
function symbolFromHeading(heading: string): string | undefined {
  const raw = heading.trim().replace(/`/g, "");
  if (SHAPE_HEADING_RE.test(raw)) return undefined;

  let name = raw.replace(ANNOTATED_HEADING_RE, "$1").trim();
  name = name.replace(/\(\s*\)$/, "").trim();

  if (name.length === 0) return undefined;
  if (STRUCTURAL_HEADINGS.has(name.toLowerCase())) return undefined;
  if (MODULE_HEADING_RE.test(name)) return undefined;
  // A symbol name never contains whitespace — a heading that does is a title.
  if (/\s/.test(name)) return undefined;

  return name;
}

/**
 * A page's pseudo-module id. These APIs are globals with no import, so there is
 * no module id to read and the docs' own grouping is the closest thing to one:
 * the containing directory when the page sits in one (`ui/button.mdx` -> `ui`,
 * the family `Settings.render` draws from), otherwise the filename.
 *
 * The tree name is deliberately dropped. Both trees document `settings-storage`
 * and `global`, so both map to the same id, enrich merges the two observations,
 * and the record comes out valid in *both* runtimes — the fact the sources state
 * (`app-settings-api`'s page is literally a re-export of the Side Service one)
 * rather than something inferred.
 *
 * Grouping by directory also keeps the store's one-file-per-module rule honest:
 * per-page ids gave 13 files holding one symbol each.
 *
 * The id is a locator into this knowledge base, not something to type in code.
 */
function pseudoModule(sourceFile: string): string {
  const segments = sourceFile.split(path.sep).join("/").split("/");
  const at = segments.indexOf("reference");
  const dir = segments.slice(at + 2, -1);
  if (dir.length > 0) return dir.join("/");

  return segments[segments.length - 1].replace(/\.[^.]+$/, "");
}

/**
 * The name a page-as-symbol states, with the capitalisation the platform uses.
 *
 * The filename gives the name but not the case, and the frontmatter title is
 * prose ("Fetch API", "Auth OAUTH"). The two conventions here really do differ —
 * Settings App components are capitalised (`Button`, `Auth`) while `fetch` is a
 * lowercase global — so the page's own *code* decides: the spelling in an
 * example is what a developer types.
 *
 * Only code, never prose: `button.mdx` writes "content on the button" in a props
 * table, and reading that made the symbol `button` instead of `Button`. The
 * title's first word is the fallback for a page whose examples never name it,
 * and the filename the last resort.
 */
function pageSymbol(page: string, content: string): string {
  const word = new RegExp(`\\b${page}\\b`, "i");

  // Code first: prose capitalises mid-sentence ("The Fetch API can be used"),
  // while `await fetch(url)` in an example is how it is actually written.
  const code = [...content.matchAll(CODE_FENCE_RE)].map(([, block]) => block).join("\n");
  const inCode = code.match(word);
  if (inCode) return inCode[0];

  const firstWord = frontmatterTitle(content)?.trim().split(/\s+/)[0];
  return firstWord?.toLowerCase() === page.toLowerCase() ? firstWord : page;
}

interface Section {
  heading: string;
  depth: number;
  body: string;
}

function sections(content: string): Section[] {
  const found: Section[] = [];
  let current: Section | undefined;

  for (const line of content.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      if (current) found.push(current);
      current = { heading: match[2].trim(), depth: match[1].length, body: "" };
      continue;
    }
    if (current) current.body += `${line}\n`;
  }

  if (current) found.push(current);
  return found;
}

/** The first prose paragraph of a chunk, with code, tables and markup dropped. */
function description(body: string): string | undefined {
  const prose: string[] = [];

  for (const raw of body.replace(MARKUP_TAG_RE, "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) break; // the example ends the prose
    if (line.startsWith("|") || line.startsWith(":::") || line.startsWith(">")) continue;
    if (line.startsWith("import ") || line.startsWith("#")) continue;
    if (line.length === 0) {
      if (prose.length > 0) break; // one paragraph is enough
      continue;
    }
    prose.push(line);
  }

  return prose.length > 0 ? prose.join(" ") : undefined;
}

/**
 * A page whose whole body is another page rendered inside it —
 * `app-settings-api/settings-storage.mdx` re-exports the Side Service one. The
 * target's symbols are valid in *this* page's runtime too, which is a
 * multi-runtime fact stated by the source rather than inferred.
 */
function reexportTarget(content: string, sourceFile: string): string | undefined {
  const match = content.match(MDX_REEXPORT_RE);
  if (!match) return undefined;

  const posix = sourceFile.split(path.sep).join("/");
  return path.posix.normalize(path.posix.join(path.posix.dirname(posix), match[1]));
}

/** `Props` first: it is what the signature's parameter refers to. */
function shapesOrUndefined(shapes: ReturnType<typeof extractShapes>) {
  if (shapes.length === 0) return undefined;
  return [...shapes].sort((a, b) => Number(b.name === "Props") - Number(a.name === "Props"));
}

function unitsFor(content: string, sourceFile: string): RawUnit[] {
  const module = pseudoModule(sourceFile);
  const runtimeHint = runtimeForPath(sourceFile);
  const base = { module, sourceFile, sourceKind: "docs-phone-api" as const, runtimeHint };
  const all = sections(content);

  // H2_MODULE: a `## ... module` heading puts the symbols one level down.
  const moduleHeadings = all.filter((s) => s.depth === 2 && MODULE_HEADING_RE.test(s.heading));
  if (moduleHeadings.length > 0) {
    return all
      .filter((section) => section.depth === 3)
      .flatMap((section) => {
        const symbol = symbolFromHeading(section.heading);
        return symbol === undefined
          ? []
          : [
              {
                ...base,
                symbol,
                kind: "function" as const,
                description: description(section.body),
                signature: extractSignature(section.body),
                shapes: shapesOrUndefined(extractShapes(section.body)),
              },
            ];
      });
  }

  // H2_SYMBOLS: each `##` is a symbol; its `###` children describe it.
  const h2Symbols = all
    .filter((section) => section.depth === 2)
    .flatMap((section) => {
      const symbol = symbolFromHeading(section.heading);
      return symbol === undefined
        ? []
        : [{ ...base, symbol, kind: "function" as const, description: description(section.body) }];
    });
  if (h2Symbols.length > 0) return h2Symbols;

  // Nothing at `##` named a symbol, so look one level down before giving up on
  // headings entirely — `global.mdx` hides `### console.log()` under
  // `## Basic functions`.
  const h3Symbols = all
    .filter((section) => section.depth === 3)
    .flatMap((section) => {
      const symbol = symbolFromHeading(section.heading);
      return symbol === undefined
        ? []
        : [{ ...base, symbol, kind: "function" as const, description: description(section.body) }];
    });
  if (h3Symbols.length > 0) return h3Symbols;

  // PAGE_SYMBOL / NO_HEADING: the page itself is the symbol. Its frontmatter
  // title is prose ("Fetch API", "Button"), so the filename is the name and the
  // title is only a fallback when the two agree.
  const page = path.basename(sourceFile, path.extname(sourceFile));
  const symbol = pageSymbol(page, content);

  // A page-as-symbol page *is* the component's documentation, so its signature
  // and property tables belong to that one symbol. This is where the 13 Settings
  // App components stop being bare names.
  return [
    {
      ...base,
      symbol,
      kind: "function" as const,
      description: description(content.replace(FRONTMATTER_TITLE_RE, "")),
      signature: extractSignature(content),
      shapes: shapesOrUndefined(extractShapes(content)),
    },
  ];
}

/**
 * No page in either tree states an API_LEVEL — checked across all 22 — so every
 * record here leaves `apiLevel` undefined. That is *not stated*, which is the
 * contract the rest of the pipeline already has: absence of a level is absence
 * of evidence, never a claim that any level works.
 */
export async function parsePhoneApis(cacheDir: string): Promise<RawUnit[]> {
  const contents = new Map<string, string>();
  const files: string[] = [];

  for (const dir of RUNTIME_DIRS) {
    for (const file of await walkFiles(path.join(cacheDir, ...dir), [".mdx", ".md"])) {
      const sourceFile = path.relative(cacheDir, file);
      contents.set(sourceFile.split(path.sep).join("/"), await readSource(file));
      files.push(sourceFile);
    }
  }

  const units: RawUnit[] = [];

  for (const sourceFile of files) {
    const posix = sourceFile.split(path.sep).join("/");
    const content = contents.get(posix)!;

    // A re-export page has no headings of its own; its symbols are the target's,
    // recorded against this page so they carry this page's runtime.
    const target = reexportTarget(content, sourceFile);
    const source = target === undefined ? content : contents.get(target);
    if (source === undefined) {
      throw new Error(`${posix}: re-exports ${target}, which is not in either runtime tree`);
    }

    units.push(...unitsFor(source, sourceFile));
  }

  return units;
}

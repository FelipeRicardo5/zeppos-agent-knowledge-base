import path from "node:path";
import type {
  CodeSnippet,
  ManifestGap,
  ManifestProp,
  ManifestSection,
  RawAppJson,
  Runtime,
} from "../types.js";
import { cells, clean, isSeparator } from "./spec.js";
import { readSource } from "./util.js";

// Front 8: `docs/reference/app-json.mdx` — the Mini Program manifest.
//
// One file, and until now the only reference page the pipeline skipped for a
// mechanical reason rather than a coverage one: it imports nothing and matches
// no runtime prefix, so `resolveModule` returned undefined and the page was
// dropped. It is also the file every Mini Program must get right before a single
// API call matters.
//
// The page is a tree of property tables. Two properties of the source shape this
// parse, and both are stated in the `app.json` block of ../types.ts:
//
//   * heading depth does not encode nesting, so the parent is derived from row
//     membership instead;
//   * three `module` keys are typed `object` and given no section, so they are
//     recorded as gaps rather than silently dropped.
//
// `docs/watchface/app-json.md` is not a second source: it is six lines that
// import the reference page and render it. So the watchface tree's manifest
// documentation *is* this file.

const APP_JSON_PAGE = ["zeppos-docs", "docs", "reference", "app-json.mdx"];

/** Column header -> field. Resolved by name, never by position. */
const COLUMNS: Record<string, keyof ManifestProp> = {
  properties: "name",
  property: "name",
  name: "name",
  type: "type",
  required: "required",
  description: "description",
  minimumversion: "minConfigVersion",
};

/** `### app`, `#### version: object`, `### permissions: Array` — the key alone. */
const HEADING_RE = /^(#{2,5})\s+(.+?)\s*$/;
/** The `: object` / `: Array` / `: string` annotation a heading may carry. */
const TYPE_ANNOTATION_RE = /\s*:\s*(?:object|array(?:<[^>]*>)?|string|number|boolean)\s*$/i;

/**
 * The runtime each `targets.module` entry point turns on.
 *
 * This is the one join the source cannot make and an agent most needs: "which
 * key do I add to ship a Side Service" is answered nowhere upstream. It is not
 * invented here either —
 *
 *   `setting` and `app-side`   already map to a runtime in ./runtime.ts, whose
 *                              PHONE_DIRS reads them as directories in a real
 *                              app tree, citing folder-structure.mdx;
 *   `page` and `watchface`     are named by the module table's own Description
 *                              column ("in Device App module", "of watchface
 *                              module");
 *   the two widget keys        are device-app per the note at the top of
 *                              ../types.ts: an extra entry point on the watch,
 *                              not an extra runtime.
 *
 * `app-service` and `app-event` are absent on purpose. The page gives them no
 * section and names no runtime for them, so neither does this — they surface as
 * gaps instead.
 */
const MODULE_RUNTIMES: Record<string, Runtime> = {
  page: "device-app",
  "app-widget": "device-app",
  "secondary-widget": "device-app",
  "watch-widget": "watchface",
  watchface: "watchface",
  "app-side": "side-service",
  setting: "settings",
};

/** The `module` section's path, the only one whose keys carry a runtime. */
const MODULE_PATH = "targets.module";

/** A type cell that promises an object with a shape of its own. */
function namesAnObject(type: string | undefined): boolean {
  return type !== undefined && /object/i.test(type);
}

function toProp(header: string[], row: string[]): ManifestProp | undefined {
  const prop: Partial<ManifestProp> = {};

  header.forEach((label, index) => {
    const field = COLUMNS[label.toLowerCase().replace(/\s+/g, "")];
    if (field === undefined) return;

    const value = clean(row[index]);
    if (value === undefined) return;

    if (field === "required") {
      // `YES` and `NO` are a boolean; anything longer is a condition
      // ("YES, required when `appType` is `app`.") and is kept verbatim, because
      // flattening it to `true` would claim every Mini Program needs a
      // `watchface` module and every watchface a `page`.
      if (/^yes$/i.test(value)) prop.required = true;
      else if (/^no$/i.test(value)) prop.required = false;
      else prop.requiredNote = value;
    } else {
      prop[field] = value as never;
    }
  });

  return prop.name === undefined ? undefined : (prop as ManifestProp);
}

/** A heading's key: `version: object` -> `version`. */
function headingKey(heading: string): string {
  return heading.replace(/`/g, "").replace(TYPE_ANNOTATION_RE, "").trim();
}

/**
 * A code fence, with the key its own content is about.
 *
 * Every example on this page is a one-key object naming what it illustrates:
 * `{ "designWidth": 390 }`, `{ "module": { ... } }`. That is more reliable than
 * the heading a fence follows, because the page puts the whole `app` example
 * *after* the `version` subsection — going by the heading files the `app`
 * example under `app.version`.
 */
interface Example {
  snippet: CodeSnippet;
  /** The fence's single top-level key, when it has exactly one. */
  topKey?: string;
}

interface Block {
  key: string;
  /** Whitespace in a heading means a title ("Configuration items"), not a key. */
  isKey: boolean;
  props: ManifestProp[];
  examples: Example[];
}

/** A `"key":` at the top level of a fenced object. */
const TOP_LEVEL_KEY_RE = /^\s*"([^"]+)"\s*:/;

/**
 * The one top-level key a fence's object declares, or undefined when it has
 * none, several, or is not an object literal.
 *
 * Read by scanning rather than with `JSON.parse`, because these fences are `js`
 * and several are not valid JSON: they carry `// ...` comments, a trailing
 * comma, and in one case a full-width comma (`，`).
 */
function fenceTopKey(code: string): string | undefined {
  const body = code.trim();
  if (!body.startsWith("{")) return undefined;

  const keys: string[] = [];
  let depth = 0;
  for (const line of body.split("\n")) {
    if (depth === 1) {
      const key = line.match(TOP_LEVEL_KEY_RE);
      if (key) keys.push(key[1]);
    }
    for (const char of line) {
      if (char === "{" || char === "[") depth += 1;
      else if (char === "}" || char === "]") depth -= 1;
    }
  }

  return keys.length === 1 ? keys[0] : undefined;
}

/**
 * Splits the page into blocks: one per heading, each with the property table and
 * the code fences that follow it.
 *
 * Fences are collected in the same walk rather than by a second pass, because a
 * fence belongs to whichever heading precedes it and that is only knowable here.
 * `line` is 1-indexed at the opening delimiter, so a reader can open the page at
 * the excerpt — the same contract the examples front's snippets have.
 */
function readBlocks(content: string, sourceFile: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");

  let current: Block | undefined;
  let header: string[] | undefined;
  let fence: { line: number; code: string[] } | undefined;

  for (const [index, line] of lines.entries()) {
    if (fence !== undefined) {
      if (line.trimStart().startsWith("```")) {
        const code = fence.code.join("\n");
        current?.examples.push({
          snippet: { file: sourceFile, line: fence.line, code },
          topKey: fenceTopKey(code),
        });
        fence = undefined;
      } else {
        fence.code.push(line);
      }
      continue;
    }

    if (line.trimStart().startsWith("```")) {
      fence = { line: index + 1, code: [] };
      header = undefined;
      continue;
    }

    const heading = line.match(HEADING_RE);
    if (heading) {
      const key = headingKey(heading[2]);
      current = { key, isKey: !/\s/.test(key), props: [], examples: [] };
      blocks.push(current);
      header = undefined;
      continue;
    }

    const row = cells(line);
    if (row === undefined) {
      header = undefined;
      continue;
    }
    if (isSeparator(row)) continue;

    if (header === undefined) {
      // A header row is one naming at least two columns this front knows.
      const known = row.filter((c) => COLUMNS[c.toLowerCase().replace(/\s+/g, "")] !== undefined);
      if (known.length >= 2) header = row;
      continue;
    }

    const prop = toProp(header, row);
    if (prop && current) current.props.push(prop);
  }

  return blocks;
}

/**
 * Front 8: the `app.json` schema, as a tree of keys with their property tables.
 *
 * Returns at most one raw record — the page is a single file — or none when the
 * page is absent from the cache, so a source that moves upstream shows up as an
 * empty front rather than a crash.
 */
export async function parseAppJson(cacheDir: string): Promise<RawAppJson[]> {
  const file = path.join(cacheDir, ...APP_JSON_PAGE);
  let content: string;
  try {
    content = await readSource(file);
  } catch {
    return [];
  }

  // Posix-normalized here, not at enrich: enrich only rewrites `originalPath`,
  // and this same string is embedded in every example snippet's `file`. A
  // Windows sync would otherwise cite a backslash path while a Linux sync of the
  // same commit cited the posix one — the portability contract `readSource` has
  // for line endings, one level deeper.
  const sourceFile = path.relative(cacheDir, file).split(path.sep).join("/");
  const blocks = readBlocks(content, sourceFile);

  const sections: ManifestSection[] = [];
  /** Every section that has a row named `x`, most recent last. */
  const parentsByRow = new Map<string, string[]>();

  /** Fences, held back until every section exists to place them against. */
  const pending: { example: Example; fallback: string }[] = [];

  const remember = (section: ManifestSection) => {
    sections.push(section);
    for (const prop of section.props) {
      parentsByRow.set(prop.name, [...(parentsByRow.get(prop.name) ?? []), section.path]);
    }
  };

  let completeExample: CodeSnippet | undefined;

  for (const block of blocks) {
    if (sections.length === 0) {
      // The first block with a table is the file root — `## Configuration
      // items`, which lists the top-level keys. Nothing before it can be a key,
      // because no table yet exists to have a row naming it.
      if (block.props.length === 0) continue;
      remember({ path: "", key: "", props: block.props, examples: [] });
      continue;
    }

    // The parent is the most recent section carrying a row of this name.
    // Document order is depth-first here, so "most recent" resolves a name
    // appearing in two tables to the nearer one. A heading nothing declares is
    // not a key: `## Complete app.json example` lands here, as would any prose
    // heading a future revision adds.
    const parent = block.isKey ? parentsByRow.get(block.key)?.at(-1) : undefined;
    if (parent === undefined) {
      // The page closes with the whole file as one example. Keep the last
      // unattached fence: it is the only place a reader sees the keys composed.
      const last = block.examples.at(-1);
      if (last) completeExample = last.snippet;
      continue;
    }

    const sectionPath = parent === "" ? block.key : `${parent}.${block.key}`;
    remember({
      path: sectionPath,
      key: block.key,
      parent,
      props: block.props,
      examples: [],
      runtime: parent === MODULE_PATH ? MODULE_RUNTIMES[block.key] : undefined,
    });
    for (const example of block.examples) pending.push({ example, fallback: sectionPath });
  }

  // Place each fence on the key it is about, falling back to the heading it
  // followed when its own content does not say. Section keys are unique on this
  // page; were a future revision to duplicate one, the first wins, which is no
  // worse than the heading it would otherwise have used.
  const byKey = new Map(sections.map((section) => [section.key, section]));
  for (const { example, fallback } of pending) {
    const target =
      (example.topKey === undefined ? undefined : byKey.get(example.topKey)) ??
      sections.find((section) => section.path === fallback);
    target?.examples.push(example.snippet);
  }

  // A key promised as an object that never got a section of its own. Reported,
  // not dropped: `targets.module.app-service` is the Background Service switch
  // and its shape is undocumented upstream.
  const documented = new Set(sections.map((section) => section.path));
  const gaps: ManifestGap[] = [];
  for (const section of sections) {
    for (const prop of section.props) {
      if (!namesAnObject(prop.type)) continue;
      const propPath = section.path === "" ? prop.name : `${section.path}.${prop.name}`;
      if (documented.has(propPath)) continue;
      gaps.push({
        path: propPath,
        type: prop.type,
        description: prop.description,
        runtime: section.path === MODULE_PATH ? MODULE_RUNTIMES[prop.name] : undefined,
      });
    }
  }

  return [{ sections, gaps, completeExample, sourceFile }];
}

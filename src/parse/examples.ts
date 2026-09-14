import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type {
  CodeSnippet,
  ExampleFile,
  ExampleManifest,
  PlatformSelector,
  MemberCallUsage,
  MessageLiteral,
  MessageSite,
  RawExample,
  SymbolUsage,
} from "../types.js";
import { runtimeForPath } from "./runtime.js";
import { readSource, walkFiles } from "./util.js";

// Front 7: the 33 official sample apps, read as code rather than as a list of
// import names.
//
// The samples front already walks these files, but only to record which symbols
// exist. That threw away what the first eval run identified as the base's root
// gap: no record says *how* a symbol is called. A signature would say
// `(props: Props) => RenderFunc`; a sample shows what goes in `props`. And some
// things appear only here — updating a widget's text is documented nowhere
// upstream and appears in 65 sample files.
//
// Two kinds of evidence come out, deliberately kept apart:
//
//   usages       an imported symbol and real calls to it. The symbol id is
//                certain, because the import line states the module.
//   memberCalls  a method called on some value (`text.setProperty(...)`). The
//                receiver's type is *not* resolved — that needs flow analysis —
//                so only the method name is recorded and `render` joins it
//                against the symbol records by name, saying so. This is the only
//                way `setProperty` surfaces at all: it is never imported.
//
// Each app's `app.json` is read too. Not for its values — an `appId` belongs to
// whoever registered it — but for its shape: which keys a real manifest has,
// what permissions it declares, what its targets are called. The eval run found
// `app.json` half-blocking, and 33 valid examples answer that better than prose.

const SAMPLES_REPO = "zeppos-samples";

/** How many excerpts to keep per symbol or method. Two show a pattern; twenty bury it. */
const SNIPPETS_PER_SYMBOL = 2;
/** A statement longer than this is a whole function, not an illustration. */
const MAX_SNIPPET_LINES = 12;

const NAMED_IMPORT_RE = /import\s*\{([^}]*)\}\s*from\s*['"](@[^'"]+)['"]/g;
/** `text.setProperty(`, `sensor.addEventListener(` — receiver unresolved. */
const MEMBER_CALL_RE = /\.([a-zA-Z_$][\w$]*)\s*\(/g;
/**
 * A bare call — `View(...)`, `AppSettingsPage({...})` — with no receiver and no
 * import. Collected only in the phone runtimes, where the whole API is global:
 * a `setting/` file imports nothing that names a module, so every one of them
 * produced zero excerpts until now. In a Device App file a bare call is almost
 * always an imported symbol, which `usages` already covers.
 */
const BARE_CALL_RE = /(?<![.\w$])([A-Za-z_$][\w$]*)\s*\(/g;
/** Language constructs that a bare-call regex cannot tell from a function. */
const KEYWORDS = new Set([
  "if",
  "for",
  "while",
  "switch",
  "catch",
  "function",
  "return",
  "typeof",
  "new",
  "async",
  "await",
  "encodeURI",
  "decodeURI",
  "encodeURIComponent",
  "decodeURIComponent",
  "throw",
  "delete",
  "void",
  "in",
  "of",
  "do",
  "else",
  "case",
  "require",
  "Number",
  "String",
  "Boolean",
  "Object",
  "Array",
  "JSON",
  "Math",
  "Date",
  "Promise",
  "Error",
]);
/**
 * Where a string literal sits, and what that position is — the syntactic fact,
 * not a reading of it.
 *
 * Nothing in the samples declares a channel between runtimes: no import, no
 * shared symbol, no type. What is observable is that the same literal occurs as
 * the value of a `type` property in one file and as the operand of a comparison
 * in another. Recording the position keeps the observation separable from the
 * conclusion a reader draws from it.
 *
 * Any quoted string qualifies. Filtering by shape — only SCREAMING_CASE, say —
 * looked right and was not: `DELETE` and `ADD` are real message tags in
 * `todo-list`, while `GET` and `POST` are HTTP verbs passed to `fetch`. What
 * separates them is not how they are spelled but whether they occur in more
 * than one file, which is decided per app after every file is read.
 */
const MESSAGE_PATTERNS: [MessageSite["position"], RegExp][] = [
  ["call argument", /\b(?:type|method)\s*:\s*['"]([^'"]+)['"]/g],
  ["comparison", /\b(?:type|method)\s*===?\s*['"]([^'"]+)['"]/g],
  ["switch case", /\bcase\s+['"]([^'"]+)['"]/g],
];

/**
 * A literal must occur in at least this many of an app's files to be recorded.
 *
 * One file means it is the app's own data: `pizza` and `sausage` live in the
 * calories sample's `utils/constants.js`, and `POST` only ever appears in the
 * one `app-side/index.js` that calls `fetch`. Two files is what a tag passed
 * between them looks like.
 */
const MESSAGE_MIN_FILES = 2;

/**
 * Lines that show what a message *carries*, rather than which message it is.
 *
 * The literals say a tag travels; these say what travels with it. They hold no
 * literal themselves, so the message patterns never see them — and they are
 * exactly what an eval run got wrong, writing `{method, params}` where
 * `app-side/index.js` destructures `const { type, params } = req`.
 *
 * Recorded verbatim and never turned into a signature. `request(options: {type:
 * string, params: object})` would be a type no source declares; the
 * destructuring is a line a person wrote.
 */
const ENVELOPE_PATTERNS: [MessageSite["position"], RegExp][] = [
  ["destructuring", /\b(?:const|let|var)\s*\{[^}]*\}\s*=\s*(?:req|request|data|payload|res)\b/g],
  ["handler definition", /\b(?:async\s+)?on(?:Request|Call|Message)\s*\(/g],
];

/** The phone runtimes, whose API is global and therefore invisible to imports. */
const PHONE_RUNTIMES = new Set(["settings", "side-service"]);
/**
 * A method or function *definition*, not a call: `addTodoList(val) {`,
 * `build(props) {`, `onInit() {`. A bare-call regex cannot tell the two apart,
 * and taking definitions filed the sample's own helpers as platform API.
 *
 * `AppSettingsPage({` survives, because its `{` is inside the parentheses as an
 * argument rather than after them as a body.
 */
const DEFINITION_LINE_RE = /^\s*(?:async\s+)?[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{\s*$/;

/**
 * Method names that belong to JavaScript, not to Zepp OS.
 *
 * This list carries the whole burden of keeping noise out now that an unresolved
 * call is no longer dropped. The criterion is deliberately narrow — a name is
 * here only if it is an ECMAScript or Node built-in — because the previous
 * criterion, "no symbol in this base shares the name", was circular and hid
 * `getLogger`, which 27 of the 33 samples call and nothing here documents.
 *
 * Ambiguous names are left in rather than guessed at. `get` and `delete` are
 * probably `Map`, but a platform API could carry them, and an unresolved call is
 * already labelled as one this base cannot account for. Over-excluding would
 * hide the next `getLogger`; under-excluding costs a row a reader can see is
 * unresolved.
 */
const NOISE_METHODS = new Set([
  "log",
  "warn",
  "error",
  "info",
  "debug",
  "push",
  "pop",
  "shift",
  "map",
  "filter",
  "forEach",
  "reduce",
  "find",
  "join",
  "split",
  "slice",
  "splice",
  "concat",
  "indexOf",
  "includes",
  "replace",
  "trim",
  "toString",
  "parse",
  "stringify",
  "then",
  "catch",
  "bind",
  "call",
  "apply",
  "test",
  "match",
  "keys",
  "values",
  "entries",
  "from",
  "sort",
  "toFixed",
  "findIndex",
  "findLast",
  "toUpperCase",
  "toLowerCase",
  "charCodeAt",
  "charAt",
  "padStart",
  "padEnd",
  "startsWith",
  "endsWith",
  "substring",
  "repeat",
  "assign",
  "fill",
  "now",
  "resolve",
  "reject",
  "race",
  "all",
  "allSettled",
  "finally",
  "subarray",
  "alloc",
  "every",
  "some",
  "flat",
  "flatMap",
  "readUInt8",
  "readUInt16LE",
  "readUInt32LE",
  "writeUInt8",
  "writeUInt16LE",
  "writeUInt32LE",
  "useFakeTimers",
  "floor",
  "random",
  "ceil",
  "round",
  "abs",
  "max",
  "min",
]);

export function exampleSlug(sourceDir: string): string {
  return sourceDir
    .split(path.sep)
    .join("/")
    .replace(new RegExp(`^${SAMPLES_REPO}/`), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * The statement starting at `line`, extended until its brackets balance so a
 * multi-line call reads whole. Capped, because past a dozen lines the excerpt
 * stops illustrating and starts being the function it lives in.
 */
function statementAt(lines: string[], start: number): string {
  let depth = 0;
  const collected: string[] = [];

  for (let index = start; index < lines.length && collected.length < MAX_SNIPPET_LINES; index++) {
    const line = lines[index];
    collected.push(line);

    for (const char of line) {
      if (char === "(" || char === "{" || char === "[") depth++;
      else if (char === ")" || char === "}" || char === "]") depth--;
    }

    if (depth <= 0 && collected.length > 0) break;
  }

  // Re-indent to the first line's margin so the excerpt reads on its own.
  const margin = collected[0].length - collected[0].trimStart().length;
  return collected.map((line) => line.slice(margin)).join("\n").trimEnd();
}

/** Lines where `name` is called, as `name(` or `.name(`. */
function callSites(lines: string[], name: string): number[] {
  const call = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\(`);
  const found: number[] = [];

  for (const [index, line] of lines.entries()) {
    // The import line names the symbol without calling it.
    if (/^\s*import\b/.test(line)) continue;
    if (call.test(line)) found.push(index);
  }

  return found;
}

function snippetsFor(lines: string[], name: string, file: string): CodeSnippet[] {
  return callSites(lines, name)
    .slice(0, SNIPPETS_PER_SYMBOL)
    .map((index) => ({ file, line: index + 1, code: statementAt(lines, index) }));
}

/** Shared by both manifest walkers: a deeply nested file must not blow the stack during a sync. */
const MAX_KEY_DEPTH = 12;

/**
 * Key paths whose *value* is worth keeping.
 *
 * Values were excluded wholesale, for a good reason stated on `keyPaths`: an
 * `appId` belongs to whoever registered it. The blanket exclusion also dropped
 * `runtime.apiVersion`, which identifies nobody and is the field that decides
 * whether an app installs on its target range — an eval run had to invent
 * `"4.2.0"` where every sample writes `"4.0"`, the API_LEVEL itself rather than
 * a semver.
 *
 * So: an allowlist, not a filter on what looks sensitive. Each entry is a
 * platform fact. Nothing under `app.` is here, because that object is entirely
 * about the publisher — id, name, icon, vendor, description.
 */
const VALUED_PATHS = new Set([
  "runtime.apiVersion.compatible",
  "runtime.apiVersion.minVersion",
  "runtime.apiVersion.target",
  // Which file turns each runtime on. Architecture, and the one thing a reader
  // copying a sample's layout has to get right.
  "targets.*.module.page.pages",
  "targets.*.module.app-side.path",
  "targets.*.module.setting.path",
  "targets.*.module.watchface.path",
  "targets.*.module.app-service.path",
]);

/**
 * The values at the allowlisted paths, collected under the same path-collapsing
 * rules `keyPaths` uses so the two line up.
 *
 * Always a list: several targets collapse onto one `targets.*` path and each
 * may state its own value, and a scalar is a list of one. A caller that wants
 * "the" value is asking a question the data does not always answer.
 */
function valuesAt(
  value: unknown,
  prefix = "",
  depth = 0,
  into: Map<string, string[]> = new Map(),
): Map<string, string[]> {
  if (depth > MAX_KEY_DEPTH) return into;

  if (Array.isArray(value)) {
    if (VALUED_PATHS.has(prefix)) {
      for (const entry of value) {
        if (typeof entry !== "string") continue;
        const seen = into.get(prefix) ?? [];
        if (!seen.includes(entry)) into.set(prefix, [...seen, entry]);
      }
      return into;
    }
    for (const entry of value) valuesAt(entry, prefix, depth + 1, into);
    return into;
  }

  if (typeof value === "object" && value !== null) {
    for (const [key, child] of Object.entries(value)) {
      const segment = prefix === "targets" ? "*" : key;
      valuesAt(child, prefix === "" ? key : `${prefix}.${segment}`, depth + 1, into);
    }
    return into;
  }

  if (VALUED_PATHS.has(prefix) && (typeof value === "string" || typeof value === "number")) {
    const seen = into.get(prefix) ?? [];
    const text = String(value);
    if (!seen.includes(text)) into.set(prefix, [...seen, text]);
  }

  return into;
}

/**
 * Every key path in a manifest, dotted.
 *
 * Arrays are walked through rather than indexed — `platforms[0].st` and
 * `platforms[1].st` are the same key — and the immediate children of `targets`
 * are collapsed to `*`, because those names are chosen per project (`gtr-3-pro`,
 * `common`) and keying on them would make every sample incomparable.
 *
 * Recursion is depth-capped: this reads files from a repo, and a manifest that
 * nests pathologically would otherwise blow the stack during a sync.
 */
function keyPaths(value: unknown, prefix = "", depth = 0): string[] {
  if (depth > MAX_KEY_DEPTH || typeof value !== "object" || value === null) return [];

  if (Array.isArray(value)) {
    return [...new Set(value.flatMap((entry) => keyPaths(entry, prefix, depth + 1)))];
  }

  const paths: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    const name = prefix === "targets" ? "*" : key;
    const dotted = prefix === "" ? name : `${prefix}.${name}`;
    paths.push(dotted);
    paths.push(...keyPaths(child, dotted, depth + 1));
  }
  return [...new Set(paths)];
}

async function readManifest(appJson: string): Promise<ExampleManifest | undefined> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(appJson, "utf-8"));
  } catch {
    // A sample with a malformed manifest is the sample's problem, not a reason
    // to drop the code beside it.
    return undefined;
  }
  if (typeof parsed !== "object" || parsed === null) return undefined;

  const manifest = parsed as Record<string, unknown>;
  const app = (manifest.app ?? {}) as Record<string, unknown>;
  const targets = manifest.targets;
  const isObject = typeof targets === "object" && targets !== null && !Array.isArray(targets);

  return {
    appType: typeof app.appType === "string" ? app.appType : undefined,
    configVersion: typeof manifest.configVersion === "string" ? manifest.configVersion : undefined,
    permissions: Array.isArray(manifest.permissions)
      ? manifest.permissions.filter((p): p is string => typeof p === "string").sort()
      : [],
    targets: isObject ? Object.keys(targets as object).sort() : [],
    platforms: isObject ? platformSelectors(targets as Record<string, unknown>) : [],
    keys: Object.keys(manifest).sort(),
    keyPaths: keyPaths(manifest).sort(),
    values: Object.fromEntries([...valuesAt(manifest)].sort(([a], [b]) => a.localeCompare(b))),
  };
}

/**
 * Every distinct `targets.*.platforms[]` entry in the manifest.
 *
 * This is the field that says which hardware a sample builds for, and the
 * `targets` key above it is not: the reference page calls that key "named
 * arbitrarily" and requires only that it match an `assets/` subdirectory. Both
 * eval runs asked what the `targets` key for a given watch is and invented one,
 * because the base offered nothing better to look at.
 *
 * Kept verbatim and unmerged across the two generations, because they are not
 * interchangeable: a v2 manifest names `deviceSource` numbers and a v3 one
 * names a screen shape instead.
 */
function platformSelectors(targets: Record<string, unknown>): PlatformSelector[] {
  const seen = new Map<string, PlatformSelector>();

  for (const target of Object.values(targets)) {
    const platforms = (target as Record<string, unknown> | null)?.platforms;
    if (!Array.isArray(platforms)) continue;

    for (const entry of platforms) {
      if (typeof entry !== "object" || entry === null) continue;
      const { deviceSource, st, sr } = entry as Record<string, unknown>;

      const selector: PlatformSelector = {
        ...(typeof deviceSource === "number" ? { deviceSource } : {}),
        ...(typeof st === "string" ? { st } : {}),
        ...(typeof sr === "string" ? { sr } : {}),
      };
      // `name` is dropped on purpose: the page calls it a "device description,
      // named by the developer", so it is a label like the target key, not an
      // identifier anything can be joined on.
      if (Object.keys(selector).length > 0) seen.set(JSON.stringify(selector), selector);
    }
  }

  return [...seen.values()].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

/** Every directory holding an `app.json` — one sample app each. */
async function appDirs(samplesDir: string): Promise<string[]> {
  const found: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    if (entries.some((e) => e.isFile() && e.name === "app.json")) {
      found.push(dir);
      return; // an app is a leaf; nested app.json would be a different sample
    }
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".git") {
        await walk(path.join(dir, entry.name));
      }
    }
  }

  await walk(samplesDir);
  return found.sort();
}

export async function parseExamples(cacheDir: string): Promise<RawExample[]> {
  const samplesDir = path.join(cacheDir, SAMPLES_REPO);
  const examples: RawExample[] = [];

  for (const appDir of await appDirs(samplesDir)) {
    const sourceDir = path.relative(cacheDir, appDir);
    const segments = sourceDir.split(path.sep).join("/").split("/");
    const [, tree, platformVersion] = [segments[0], segments[1], segments[2]];

    const files: ExampleFile[] = [];
    const usages = new Map<string, CodeSnippet[]>();
    const memberCalls = new Map<string, CodeSnippet[]>();
    const globalCalls = new Map<string, CodeSnippet[]>();
    // Every method the app defines for itself, across all of its files. A call
    // to one of these is the sample calling its own helper; a call to anything
    // else came from outside the app. That distinction is a parse-time fact —
    // it is about the code, not about what this base happens to know already —
    // so it belongs here rather than in a join against the symbol table.
    const definedInApp = new Set<string>();
    const messages = new Map<string, MessageSite[]>();
    const envelopes: MessageSite[] = [];

    for (const file of await walkFiles(appDir, [".js"])) {
      const content = await readSource(file);
      const lines = content.split("\n");
      const cacheRelative = path.relative(cacheDir, file).split(path.sep).join("/");
      const appRelative = path.relative(appDir, file).split(path.sep).join("/");

      const symbols: string[] = [];

      for (const line of lines) {
        if (!DEFINITION_LINE_RE.test(line)) continue;
        definedInApp.add(line.trim().replace(/^async\s+/, "").split("(")[0].trim());
      }

      for (const [, namedImports, module] of content.matchAll(NAMED_IMPORT_RE)) {
        for (const raw of namedImports.split(",")) {
          const symbol = raw.trim().split(/\s+as\s+/)[0].trim();
          if (!symbol) continue;

          const id = `${module}.${symbol}`;
          symbols.push(id);

          const existing = usages.get(id) ?? [];
          if (existing.length < SNIPPETS_PER_SYMBOL) {
            usages.set(id, [...existing, ...snippetsFor(lines, symbol, cacheRelative)].slice(0, SNIPPETS_PER_SYMBOL));
          }
        }
      }

      for (const [, method] of content.matchAll(MEMBER_CALL_RE)) {
        if (NOISE_METHODS.has(method)) continue;

        const existing = memberCalls.get(method) ?? [];
        if (existing.length >= SNIPPETS_PER_SYMBOL) continue;
        memberCalls.set(
          method,
          [...existing, ...snippetsFor(lines, method, cacheRelative)].slice(0, SNIPPETS_PER_SYMBOL),
        );
      }

      const runtime = runtimeForPath(`${SAMPLES_REPO}/${tree}/${platformVersion}/${appRelative}`);

      for (const [index, line] of lines.entries()) {
        for (const [position, pattern] of ENVELOPE_PATTERNS) {
          if (!pattern.test(line)) continue;
          pattern.lastIndex = 0;
          envelopes.push({
            runtime,
            position,
            file: cacheRelative,
            line: index + 1,
            code: statementAt(lines, index),
          });
        }
        for (const [position, pattern] of MESSAGE_PATTERNS) {
          for (const [, value] of line.matchAll(pattern)) {
            messages.set(value, [
              ...(messages.get(value) ?? []),
              { runtime, position, file: cacheRelative, line: index + 1, code: statementAt(lines, index) },
            ]);
          }
        }
      }

      if (runtime !== undefined && PHONE_RUNTIMES.has(runtime)) {
        const defined = new Set(
          lines
            .filter((line) => DEFINITION_LINE_RE.test(line))
            .map((line) => line.trim().replace(/^async\s+/, "").split("(")[0].trim()),
        );

        for (const [, name] of content.matchAll(BARE_CALL_RE)) {
          if (KEYWORDS.has(name) || NOISE_METHODS.has(name) || defined.has(name)) continue;

          const existing = globalCalls.get(name) ?? [];
          if (existing.length >= SNIPPETS_PER_SYMBOL) continue;
          globalCalls.set(
            name,
            [...existing, ...snippetsFor(lines, name, cacheRelative)].slice(0, SNIPPETS_PER_SYMBOL),
          );
        }
      }

      files.push({
        path: appRelative,
        // The app-relative path is what the runtime rules read: `app-side/` is
        // the Side Service wherever the app itself lives.
        runtime,
        symbols: [...new Set(symbols)].sort(),
      });
    }

    examples.push({
      id: exampleSlug(sourceDir),
      // The directory name, not `app.appName` — that is often an i18n key.
      name: path.basename(sourceDir),
      tree,
      platformVersion,
      manifest: await readManifest(path.join(appDir, "app.json")),
      files: files.sort((a, b) => a.path.localeCompare(b.path)),
      usages: [...usages]
        .map(([id, snippets]): SymbolUsage => ({ id, snippets }))
        .filter(({ snippets }) => snippets.length > 0)
        .sort((a, b) => a.id.localeCompare(b.id)),
      messageShapes: envelopes,
      messages: [...messages]
        // A literal in one file is the app's own data, not a tag it passes.
        .filter(([, sites]) => new Set(sites.map((s) => s.file)).size >= MESSAGE_MIN_FILES)
        .map(([value, sites]): MessageLiteral => ({ value, sites }))
        .sort((a, b) => a.value.localeCompare(b.value)),
      memberCalls: [...memberCalls]
        .map(([method, snippets]): MemberCallUsage => ({ method, snippets }))
        // A method the app also defines is the sample calling its own helper —
        // `getSleepData`, `responseCall`. Anything left was called and never
        // defined here, so it came from outside the app, which is the only
        // property that makes it worth recording.
        .filter(({ method, snippets }) => snippets.length > 0 && !definedInApp.has(method))
        .sort((a, b) => a.method.localeCompare(b.method)),
      globalCalls: [...globalCalls]
        .map(([method, snippets]): MemberCallUsage => ({ method, snippets }))
        .filter(({ snippets }) => snippets.length > 0)
        .sort((a, b) => a.method.localeCompare(b.method)),
      sourceDir,
    });
  }

  return examples.sort((a, b) => a.id.localeCompare(b.id));
}

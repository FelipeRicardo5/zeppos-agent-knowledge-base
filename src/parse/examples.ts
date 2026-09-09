import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type {
  CodeSnippet,
  ExampleFile,
  ExampleManifest,
  MemberCallUsage,
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
 * Method names too generic to be worth a snippet. Every one of these is either a
 * JavaScript built-in or a sample's own logger, and matching them by name later
 * would attach noise to unrelated symbols.
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
  if (depth > 12 || typeof value !== "object" || value === null) return [];

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

  return {
    appType: typeof app.appType === "string" ? app.appType : undefined,
    permissions: Array.isArray(manifest.permissions)
      ? manifest.permissions.filter((p): p is string => typeof p === "string").sort()
      : [],
    targets:
      typeof targets === "object" && targets !== null && !Array.isArray(targets)
        ? Object.keys(targets).sort()
        : [],
    keys: Object.keys(manifest).sort(),
    keyPaths: keyPaths(manifest).sort(),
  };
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

    for (const file of await walkFiles(appDir, [".js"])) {
      const content = await readSource(file);
      const lines = content.split("\n");
      const cacheRelative = path.relative(cacheDir, file).split(path.sep).join("/");
      const appRelative = path.relative(appDir, file).split(path.sep).join("/");

      const symbols: string[] = [];

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
      memberCalls: [...memberCalls]
        .map(([method, snippets]): MemberCallUsage => ({ method, snippets }))
        .filter(({ snippets }) => snippets.length > 0)
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

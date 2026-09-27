import { readFile } from "node:fs/promises";
import path from "node:path";
import { MEMBER_CALL_RE, NAMED_IMPORT_RE, NOISE_METHODS } from "../parse/examples.js";
import { runtimeForAppFile } from "../parse/runtime.js";
import { readSource, walkFiles } from "../parse/util.js";
import type { Runtime } from "../types.js";

// Reading an app somebody wrote, the same way this base reads the samples.
//
// The same patterns, deliberately imported rather than restated: a checker that
// resolved imports differently from the front that built the records would
// report violations the records cannot explain, and the drift would be silent.
//
// Nothing here judges. It produces what the files say — which symbol is
// imported where, which method is called, what the manifest declares — and
// `rules.ts` is where any of it becomes a finding.

export interface ScannedImport {
  id: string;
  module: string;
  symbol: string;
  line: number;
}

export interface ScannedFile {
  /** Relative to the app root, because that is what the runtime rule reads. */
  path: string;
  runtime: Runtime;
  imports: ScannedImport[];
  /** Method names called on some value. The receiver is not resolved. */
  calls: { method: string; line: number }[];
}

export interface ScannedManifest {
  permissions: string[];
  /**
   * `app.extType`. The one field that says an app is a workout extension rather
   * than a Mini Program, which is what tells a `data-widget/` file apart from a
   * keyboard's widget of the same name — see `runtimeForAppFile`.
   */
  extType?: string;
  /** `platforms[].deviceSource` ids — the only key that joins to the device list. */
  deviceSources: string[];
  /** Target keys. Recorded, but they join to no device; see `rules.ts`. */
  targets: string[];
  apiVersion: { compatible?: string; minVersion?: string; target?: string };
}

export interface ScannedApp {
  root: string;
  manifest?: ScannedManifest;
  files: ScannedFile[];
}

function readManifest(parsed: unknown): ScannedManifest | undefined {
  if (typeof parsed !== "object" || parsed === null) return undefined;
  const manifest = parsed as Record<string, unknown>;
  const targets = manifest.targets;
  const isObject = typeof targets === "object" && targets !== null && !Array.isArray(targets);

  const deviceSources: string[] = [];
  const targetKeys: string[] = [];
  if (isObject) {
    for (const [key, value] of Object.entries(targets as Record<string, unknown>)) {
      targetKeys.push(key);
      const platforms = (value as Record<string, unknown>)?.platforms;
      if (!Array.isArray(platforms)) continue;
      for (const platform of platforms) {
        const source = (platform as Record<string, unknown>)?.deviceSource;
        if (source !== undefined) deviceSources.push(String(source));
      }
    }
  }

  const runtime = (manifest.runtime ?? {}) as Record<string, unknown>;
  const api = (runtime.apiVersion ?? {}) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value : undefined);

  const app = (manifest.app ?? {}) as Record<string, unknown>;

  return {
    extType: text(app.extType),
    permissions: Array.isArray(manifest.permissions)
      ? manifest.permissions.filter((p): p is string => typeof p === "string")
      : [],
    deviceSources: [...new Set(deviceSources)],
    targets: targetKeys.sort(),
    apiVersion: {
      compatible: text(api.compatible),
      minVersion: text(api.minVersion),
      target: text(api.target),
    },
  };
}

/** Read an app directory: its manifest, and every `.js` file under it. */
export async function scanApp(root: string): Promise<ScannedApp> {
  let manifest: ScannedManifest | undefined;
  try {
    manifest = readManifest(JSON.parse(await readFile(path.join(root, "app.json"), "utf-8")));
  } catch {
    // A missing or malformed `app.json` is itself a finding, raised in `rules.ts`
    // where it can be reported rather than thrown.
    manifest = undefined;
  }

  const files: ScannedFile[] = [];
  for (const file of await walkFiles(root, [".js"])) {
    const relative = path.relative(root, file).split(path.sep).join("/");
    const lines = (await readSource(file)).split("\n");

    const imports: ScannedImport[] = [];
    const calls: { method: string; line: number }[] = [];

    for (const [index, line] of lines.entries()) {
      for (const [, named, module] of line.matchAll(NAMED_IMPORT_RE)) {
        for (const raw of named.split(",")) {
          const symbol = raw.trim().split(/\s+as\s+/)[0].trim();
          if (symbol) imports.push({ id: `${module}.${symbol}`, module, symbol, line: index + 1 });
        }
      }
      if (/^\s*import\b/.test(line)) continue;
      for (const [, method] of line.matchAll(MEMBER_CALL_RE)) {
        if (!NOISE_METHODS.has(method)) calls.push({ method, line: index + 1 });
      }
    }

    files.push({
      path: relative,
      runtime: runtimeForAppFile(relative, manifest?.extType),
      imports,
      calls,
    });
  }

  return { root, manifest, files: files.sort((a, b) => a.path.localeCompare(b.path)) };
}

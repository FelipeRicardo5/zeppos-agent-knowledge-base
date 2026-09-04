import path from "node:path";
import type { Runtime } from "../types.js";

// Runtime attribution.
//
// No page or sample states its runtime in its content — the runtime is stated by
// *where the content lives*, and both official repos separate the runtimes by
// directory. So the path is the evidence, and this module is the only place that
// reading happens, on both the docs and the samples front.
//
// A path that matches no rule returns `undefined`, never a default. An
// unrecognized tree then shows up as an empty runtime axis rather than as a
// confident wrong answer, which is the same contract `minApiLevel` already has.

/**
 * Directories inside a sample app that run in the Zepp App on the phone rather
 * than on the watch. `guides/architecture/folder-structure.mdx` names both:
 * `app-side/` is the Side Service directory and `setting/` is the Settings App
 * directory. They are checked before the app-type tree because they hold true for
 * every app type — a workout extension can ship a Side Service too
 * (`workout-extensions/3.5/running-pace-master-with-side-service`).
 *
 * Sample paths only. In `zeppos-docs` a directory is a *module* name, and
 * `docs/reference/device-app-api/newAPI/settings/` is the device-side
 * `@zos/settings` module — nothing to do with the Settings App. The docs tree is
 * matched by prefix instead, so a module dir can never be read as a runtime.
 * The name is `setting`, singular; no sample uses the plural.
 */
const PHONE_DIRS: Record<string, Runtime> = {
  "app-side": "side-service",
  setting: "settings",
};

/**
 * Top-level trees in `zeppos-samples`, which separates the app types. Everything
 * inside a Mini Program that is not a PHONE_DIR runs on the watch — the same doc
 * lists `page/`, `app.js`, `app-widget/` and `secondary-widget/` as device-side —
 * so `application/` maps to "device-app" as its whole-tree default.
 */
const SAMPLE_TREES: Record<string, Runtime> = {
  application: "device-app",
  watchface: "watchface",
  "workout-extensions": "workout-extension",
};

/** Prefixes in `zeppos-docs`, each the API surface of exactly one runtime. */
const DOCS_PREFIXES: [prefix: string, runtime: Runtime][] = [
  ["docs/reference/device-app-api/", "device-app"],
  ["docs/reference/side-service-api/", "side-service"],
  ["docs/reference/app-settings-api/", "settings"],
  ["docs/watchface/", "watchface"],
  // The `@zos-*` files are the Device App API restructured for LLM consumption.
  ["static/llms/", "device-app"],
];

/**
 * Runtime of a path relative to an app's own root, rather than to the cache — a
 * code fence's `title=` in a guide states exactly such a path. `app-side/index.js`
 * is the Side Service and `setting/index.js` the Settings App; everything else in
 * an app tree runs on the watch per `folder-structure.mdx`, so a bare `page.js`
 * or `app.js` is the Device App. Unlike `runtimeForPath` this always answers,
 * because the caller has already established that the path *is* an app file.
 */
export function runtimeForAppFile(file: string): Runtime {
  for (const segment of toPosixPath(file).split("/")) {
    const phoneRuntime = PHONE_DIRS[segment];
    if (phoneRuntime) return phoneRuntime;
  }
  return "device-app";
}

/** Cache-relative paths are produced with the host separator; rules are posix. */
function toPosixPath(file: string): string {
  return file.split(path.sep).join("/");
}

/**
 * The runtime a cache-relative source path belongs to, or `undefined` when no
 * rule covers it. `sourceFile` on every `RawUnit` is exactly such a path.
 */
export function runtimeForPath(sourceFile: string): Runtime | undefined {
  const [repo, ...rest] = toPosixPath(sourceFile).split("/");

  if (repo === "zeppos-docs") {
    const relative = rest.join("/");
    // `docs/reference/app-json.mdx`, `related-resources/` and `revision-history.mdx`
    // describe configuration and devices, not one runtime's API — they match nothing.
    return DOCS_PREFIXES.find(([prefix]) => relative.startsWith(prefix))?.[1];
  }

  if (repo === "zeppos-samples") {
    for (const segment of rest) {
      const phoneRuntime = PHONE_DIRS[segment];
      if (phoneRuntime) return phoneRuntime;
    }
    return SAMPLE_TREES[rest[0]];
  }

  return undefined;
}

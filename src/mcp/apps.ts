import type { ExampleRecord, Runtime } from "../types.js";
import type { Base } from "./base.js";

// "Which whole sample is closest to what I have to build, and how is it put
// together?"
//
// The two questions the last eval run asked first, before it asked what any
// symbol did — and the page it returned to most was a sample app. Every other
// tool here is keyed by symbol: arrive with a name, leave with a record. This
// one is keyed by application, which is the unit a task is actually shaped
// like.
//
// What makes it more than a directory listing is the join. A `module` key names
// an extensionless path and the loader supplies the extension, so which file is
// an app's Side Service is a question the manifest and the file tree only
// answer together; the entry points carry that resolution, with the runtime
// each resolved file is attributed to. That is the architecture, stated rather
// than inferred from directory names.
//
// Two absences are reported rather than omitted, because both are easy to
// misread as a property of the sample:
//
//   family absent       the samples README does not link this directory. Four
//                       do not, and a reader working from that list never
//                       learns they exist. It says nothing about the sample.
//   description absent  the manifest leaves the field blank. Three unrelated
//                       apps also write the same description as each other, so
//                       presence is not identification either.

export interface AppSummary {
  app: string;
  name: string;
  /** What the manifest says it is, when it says anything. */
  says?: string;
  family?: string;
  category?: string;
  tree: string;
  platformVersion: string;
  runtimes: Runtime[];
  /** The `module` keys it declares — the app's architecture in one field. */
  modules: string[];
  symbols: number;
  /** Whether this app writes a message literal in more than one runtime. */
  passesMessages: boolean;
}

export interface AppQuery {
  /** Matched against the directory name, what it says it is, and its family. */
  text?: string;
  runtime?: Runtime;
  /** A `module` key the app must declare: `app-side`, `setting`, `data-widget`. */
  module?: string;
  tree?: string;
}

function summarize(example: ExampleRecord): AppSummary {
  const identity = example.manifest?.identity;
  const modules = [...new Set((example.manifest?.entryPoints ?? []).map((entry) => entry.module))].sort();

  return {
    app: example.id,
    name: example.name,
    ...(identity?.description ?? identity?.appName
      ? { says: identity?.description ?? identity?.appName }
      : {}),
    ...(example.family === undefined ? {} : { family: example.family, category: example.category }),
    tree: example.tree,
    platformVersion: example.platformVersion,
    runtimes: example.runtimes,
    modules,
    symbols: example.symbols.length,
    passesMessages: (example.messages ?? []).some(
      (message) => new Set(message.sites.map((site) => site.runtime).filter(Boolean)).size > 1,
    ),
  };
}

/** Everything a row can be matched on, lowercased once. */
function haystack(example: ExampleRecord): string {
  const identity = example.manifest?.identity;
  return [example.id, example.name, example.family, example.category, identity?.appName, identity?.description]
    .filter((part): part is string => typeof part === "string")
    .join(" ")
    .toLowerCase();
}

export interface AppSearch {
  /** The filters applied, echoed so a caller can see what narrowed the list. */
  query: AppQuery;
  matched: number;
  of: number;
  apps: AppSummary[];
  notAsserted: string;
}

/**
 * Samples matching a query, ranked newest platform version first.
 *
 * Ranking by platform version rather than by match strength, deliberately: a
 * text match here is a substring, not a judgement about which app is closer to
 * a task, and pretending otherwise would put a confident order on a guess. The
 * newest version of a family is the one written against the current API, which
 * is a fact about the corpus rather than about the query.
 */
export function findApps(base: Base, query: AppQuery = {}): AppSearch {
  const text = query.text?.trim().toLowerCase();

  const apps = base.examples
    .filter((example) => {
      if (text !== undefined && text !== "" && !haystack(example).includes(text)) return false;
      if (query.runtime !== undefined && !example.runtimes.includes(query.runtime)) return false;
      if (query.tree !== undefined && example.tree !== query.tree) return false;
      if (
        query.module !== undefined &&
        !(example.manifest?.entryPoints ?? []).some((entry) => entry.module === query.module)
      ) {
        return false;
      }
      return true;
    })
    .map(summarize)
    .sort(
      (a, b) =>
        b.platformVersion.localeCompare(a.platformVersion, undefined, { numeric: true }) ||
        a.app.localeCompare(b.app),
    );

  return {
    query,
    matched: apps.length,
    of: base.examples.length,
    apps,
    notAsserted:
      "Matching is a substring over the directory name, what the manifest says the app is, " +
      "and its family. It is not a judgement that one sample is closer to your task than " +
      "another, and an app whose manifest says nothing cannot be matched on what it does.",
  };
}

export interface AppEntryPoint {
  module: string;
  declared: string;
  file?: string;
  runtime?: Runtime;
  target?: string;
  shape: string;
  /** Present only when the declared path matches no file in the app. */
  unresolved?: string;
}

export interface AppDescription {
  found: true;
  app: string;
  name: string;
  source: string;
  identity: { appName?: string; description?: string; appType?: string; extType?: string; version?: string };
  family?: string;
  category?: string;
  /** Other samples in the same family, newest first. Empty when it has none. */
  siblings: { app: string; platformVersion: string }[];
  platformVersion: string;
  runtimes: Runtime[];
  /** `targets` nests `module` and `platforms`; `flat` writes them at the top level. */
  layout: "targets" | "flat";
  apiVersion: Record<string, string[]>;
  permissions: string[];
  targets: string[];
  deviceSources: number[];
  entryPoints: AppEntryPoint[];
  filesByRuntime: Record<string, string[]>;
  notStated: string[];
  notAsserted: string;
}

export interface AppNotFound {
  found: false;
  requested: string;
  /** Ids that exist, so a caller can correct a near miss without a second call. */
  known: string[];
  reason: string;
}

/**
 * One application, assembled.
 *
 * The record the base had all the parts of and never put in one place: what the
 * app says it is, which file each `module` key turns on, which runtime that file
 * belongs to, and what the manifest declares around it. `notStated` carries the
 * absences that a reader would otherwise fill in from habit.
 */
export function describeApp(base: Base, app: string): AppDescription | AppNotFound {
  const example = base.examples.find((candidate) => candidate.id === app || candidate.name === app);

  if (example === undefined) {
    return {
      found: false,
      requested: app,
      known: base.examples.map((candidate) => candidate.id),
      reason:
        "No sample app in this base has that id or directory name. This base covers the " +
        "official samples repository only; a missing id means not covered, never that the " +
        "app does not exist.",
    };
  }

  const manifest = example.manifest;
  const entryPoints: AppEntryPoint[] = (manifest?.entryPoints ?? []).map((entry) => ({
    module: entry.module,
    declared: entry.path,
    ...(entry.file === undefined
      ? {
          unresolved:
            "The manifest declares this path and no file in the app matches it with a loadable " +
            "extension. Every declared path in the sample corpus resolves, so this is a finding.",
        }
      : { file: entry.file }),
    ...(entry.runtime === undefined ? {} : { runtime: entry.runtime }),
    ...(entry.target === undefined ? {} : { target: entry.target }),
    shape: entry.shape,
  }));

  const filesByRuntime: Record<string, string[]> = {};
  for (const file of example.files) {
    const key = file.runtime ?? "not attributed";
    filesByRuntime[key] = [...(filesByRuntime[key] ?? []), file.path];
  }

  const apiVersion = Object.fromEntries(
    Object.entries(manifest?.values ?? {})
      .filter(([path]) => path.startsWith("runtime.apiVersion."))
      .map(([path, values]) => [path.slice("runtime.apiVersion.".length), values]),
  );

  const siblings =
    example.family === undefined
      ? []
      : base.examples
          .filter((other) => other.family === example.family && other.id !== example.id)
          .map((other) => ({ app: other.id, platformVersion: other.platformVersion }))
          .sort((a, b) => b.platformVersion.localeCompare(a.platformVersion, undefined, { numeric: true }));

  const notStated: string[] = [];
  if (manifest === undefined) {
    notStated.push("This app has no readable `app.json`, so nothing here describes how it is configured.");
  }
  if (example.family === undefined) {
    notStated.push(
      "The samples README does not link this directory, so this app has no family and no " +
        "stated siblings. That is a fact about the README, not about the sample.",
    );
  }
  if (manifest?.identity.description === undefined) {
    notStated.push("The manifest states no `app.description`, so nothing says what this app is for.");
  }
  if (Object.keys(apiVersion).length === 0) {
    notStated.push(
      "The manifest states no `runtime.apiVersion`, so nothing here says which firmware range it installs on.",
    );
  }
  if (manifest !== undefined && manifest.permissions.length === 0) {
    notStated.push(
      "The manifest declares no permissions. Only the Device App tree documents permissions " +
        "upstream, so for any other runtime that is the only citable choice rather than a verified one.",
    );
  }

  return {
    found: true,
    app: example.id,
    name: example.name,
    source: example.originalPath,
    identity: manifest?.identity ?? {},
    ...(example.family === undefined ? {} : { family: example.family, category: example.category }),
    siblings,
    platformVersion: example.platformVersion,
    runtimes: example.runtimes,
    layout: manifest?.layout ?? "targets",
    apiVersion,
    permissions: manifest?.permissions ?? [],
    targets: manifest?.targets ?? [],
    deviceSources: (manifest?.platforms ?? [])
      .map((platform) => platform.deviceSource)
      .filter((source): source is number => typeof source === "number"),
    entryPoints,
    filesByRuntime,
    notStated,
    notAsserted:
      "Nothing here compiles or runs this app. The entry points are the manifest's own " +
      "declarations resolved against the files beside them, and the runtime on each is the " +
      "path rule this base uses everywhere — not a statement from the sample.",
  };
}

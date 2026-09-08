// The five runtimes the official sources actually distinguish.
//
// `guides/architecture/arc.mdx` names three parts of a Mini Program — Device App,
// Settings App, Side Service — and `guides/architecture/folder-structure.mdx`
// shows `app-side/` *is* the Side Service directory, so "app-side" and
// "side-service" were the same runtime under two names and only one is kept.
// Watchface and Workout Extension are separate app types with their own trees.
//
// Shortcut Card (`app-widget/`) and SecondaryWidget (`secondary-widget/`) are
// extra entry points, not extra runtimes: they execute on the watch under Zepp
// OS like the Device App, so they attribute to "device-app".
export type Runtime =
  | "device-app"
  | "side-service"
  | "settings"
  | "watchface"
  | "workout-extension";

export type Confidence =
  | "OFFICIAL"
  | "OBSERVED"
  | "RECOMMENDED"
  | "COMMUNITY"
  | "INFERRED";

export interface SymbolRecord {
  id: string; // e.g. "@zos/router.launchApp"
  module: string; // e.g. "@zos/router"
  symbol: string; // e.g. "launchApp"
  type: string;
  description?: string;
  // undefined when no source states it — never fabricated.
  minApiLevel?: number;
  runtimes: Runtime[];
  source: RawSourceKind;
  confidence: Confidence;
  originalPath: string;
  extractedAt: string; // ISO date
}

export type RawUnitKind = "function" | "constant" | "value";
export type RawSourceKind = "docs-reference" | "llms" | "sample" | "docs-phone-api";

// Output of the parse stage — pre-enrichment, one entry per observation.
// Enrich merges/reconciles observations of the same symbol across sources.
export interface RawUnit {
  module: string; // e.g. "@zos/router"
  symbol: string; // e.g. "back"
  kind: RawUnitKind;
  description?: string;
  apiLevel?: number;
  runtimeHint?: Runtime;
  sourceFile: string; // path relative to the cache dir
  sourceKind: RawSourceKind;
}

export interface SyncManifest {
  lastSyncAt: string;
  sources: Record<string, { commit: string }>;
  recordCounts: Record<string, number>;
}

// --- Patterns -------------------------------------------------------------
//
// A pattern is a task ("communicate between pages", "adapt to a round screen"),
// not a symbol, so it gets its own record rather than being forced into
// SymbolRecord. What makes it *checkable* rather than a copy of the guide is the
// symbol set: every `@zos` import the guide's own code uses. Render joins that
// against the symbol records to derive the minimum API_LEVEL the pattern needs
// and to flag the symbols this KB has no record for — neither of which the
// upstream guide states.

/** One `js` code block from a guide, kept verbatim with what the fence declares. */
export interface PatternSnippet {
  language: string;
  /** The fence's `title=` — the file the guide says this belongs in. */
  title?: string;
  /** Runtime the title implies, when the fence is `js` and names a file. */
  runtime?: Runtime;
  code: string;
}

/** One `##` section of a guide: a named way of doing the task. */
export interface PatternApproach {
  heading: string;
  /** Symbol ids used in this section's code, e.g. `@zos/router.push`. */
  symbols: string[];
  /** Modules imported wholesale here (`import * as ble from '@zos/ble'`). */
  modules: string[];
  snippets: PatternSnippet[];
}

/** Output of the patterns parse front, before enrich normalizes it. */
export interface RawPattern {
  id: string; // slug of the guide's filename, e.g. "cross-page-communications"
  title: string; // the guide's frontmatter title
  summary?: string; // the prose before the first `##`
  approaches: PatternApproach[];
  /** Reference pages the guide links to, cache-relative. */
  referencePages: string[];
  sourceFile: string; // path relative to the cache dir
}

export interface PatternRecord {
  id: string;
  title: string;
  summary?: string;
  approaches: PatternApproach[];
  /** Union of every approach's symbol ids, sorted. */
  symbols: string[];
  /** Union of every approach's wholesale-imported modules, sorted. */
  modules: string[];
  /**
   * Runtimes the guide's own fence titles name. Only what the source states —
   * the runtimes of the symbols it uses are resolved at render time instead, so
   * this stays a record of the guide rather than a copy of the symbol data.
   */
  runtimes: Runtime[];
  referencePages: string[];
  source: "docs-guide";
  confidence: Confidence;
  originalPath: string;
  extractedAt: string; // ISO date
}

// --- Devices --------------------------------------------------------------
//
// `reference/related-resources/device-list.mdx` is the only source that ties an
// API_LEVEL to hardware. Without it the KB answers "this needs API_LEVEL >= 4.2"
// when the question a developer actually has is "does it run on a Bip 6?".
// Render joins these against the symbol records to answer that directly.

export type ScreenShape = "round" | "square" | "band";

/** One `deviceSource` id. The `*` suffix upstream marks the China version. */
export interface DeviceSource {
  id: string;
  mainlandChina: boolean;
}

export interface ScreenSpec {
  shape?: ScreenShape;
  /** Corner radius. Stated for square and band screens only, never for round. */
  radius?: number;
  width?: number;
  height?: number;
}

export interface RawDevice {
  name: string; // verbatim — upstream is inconsistent about the "Amazfit" prefix
  /**
   * Highest API_LEVEL the device reaches. Absent when the table says `-`, which
   * is every Zepp OS 1.0 device: they run no 2.0-API Mini Program at all. `-` is
   * *not stated*, and must never be read as level 0.
   */
  latestApiLevel?: number;
  latestOsVersion?: string;
  deviceSources: DeviceSource[];
  screen: ScreenSpec;
  physicalKeys?: number;
  watchfacePreview?: { width: number; height: number };
  /** Absent when the table says `-` rather than YES/NO. */
  secondaryWidget?: boolean;
  /**
   * Which table the row came from. The second one is headed "Non-Zepp OS
   * Devices" — hardware that takes watchfaces but runs no Mini Program.
   */
  runsZeppOs: boolean;
  sourceFile: string;
}

export interface DeviceRecord extends Omit<RawDevice, "sourceFile"> {
  /** Slug of the name, so a device can be linked and sorted stably. */
  slug: string;
  source: "docs-device-list";
  confidence: Confidence;
  originalPath: string;
  extractedAt: string;
}

// --- Examples -------------------------------------------------------------
//
// The 33 official sample apps are 33k lines of JavaScript that runs. Until now
// the pipeline read them only for the *names* in their import lines, which threw
// away the one thing no other source has: how a symbol is actually called.
//
// The first eval run made that the root finding — no record carries a signature,
// so the base answered "may I use X" and never "how do I call X". A signature
// would say `(props: Props) => RenderFunc`; a sample says what goes in `props`.
// It also answers what the docs simply omit: updating a widget's text is
// documented nowhere upstream and appears in 65 sample files.

/** A verbatim excerpt of sample code, with where it came from. */
export interface CodeSnippet {
  /** Path relative to the cache dir, posix-normalized. */
  file: string;
  /** 1-indexed line the excerpt starts at, so a reader can go look. */
  line: number;
  code: string;
}

/** An imported symbol, with real calls to it. */
export interface SymbolUsage {
  /** Symbol id, e.g. `@zos/ui.createWidget`. */
  id: string;
  snippets: CodeSnippet[];
}

/**
 * A method called on some value (`text.setProperty(...)`). The receiver's type
 * is not resolved — that would need flow analysis — so this records the method
 * name and the code, and `render` joins it against the symbol records by name.
 * That join is what surfaces `setProperty`, which is never imported and so was
 * invisible to the samples front.
 */
export interface MemberCallUsage {
  method: string;
  snippets: CodeSnippet[];
}

export interface ExampleFile {
  /** Path relative to the app's own root, so the runtime rule can read it. */
  path: string;
  runtime?: Runtime;
  /** Symbol ids imported in this file. */
  symbols: string[];
}

/** The parts of a sample's `app.json` that generalize to another project. */
export interface ExampleManifest {
  appType?: string;
  /** Declared permission codes — the list to cross-check against symbols used. */
  permissions: string[];
  /** Target keys (`gt.r`, `gt.s`), which name the `assets/` subdirectories. */
  targets: string[];
  /** Keys present at the top level, so a reader sees the shape of a real file. */
  keys: string[];
}

export interface RawExample {
  id: string;
  name: string;
  /** `application`, `watchface` or `workout-extensions`. */
  tree: string;
  /** The version directory the sample sits in: `2.0`, `4.2`, ... */
  platformVersion: string;
  manifest?: ExampleManifest;
  files: ExampleFile[];
  usages: SymbolUsage[];
  memberCalls: MemberCallUsage[];
  sourceDir: string;
}

export interface ExampleRecord extends Omit<RawExample, "sourceDir"> {
  /** Union of every file's symbol ids, sorted. */
  symbols: string[];
  runtimes: Runtime[];
  source: "sample-app";
  confidence: Confidence;
  originalPath: string;
  extractedAt: string;
}

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

/** One row of a property table: what to pass, and whether it is optional. */
export interface PropSpec {
  name: string;
  description?: string;
  type?: string;
  required?: boolean;
  default?: string;
  /**
   * Some device-app tables state a minimum per property, so a symbol available
   * at one level can have a property that is not. Absent when the table has no
   * such column, which is not the same as "available since the symbol was".
   */
  apiLevel?: number;
}

/**
 * A named object shape the page declares — `Props`, `SelectOption`, `Options`.
 * A signature is unusable without them: `(props: Props) => RenderFunc` says
 * nothing on its own, and `Select`'s `options` needs `SelectOption`.
 */
export interface ShapeSpec {
  name: string;
  props: PropSpec[];
}

/** One row of a `Value | Description` table: a value the API accepts or returns. */
export interface EnumMember {
  /** The member alone — `CENTER_H` for `align.CENTER_H`, `4` for a bare `retCode`. */
  value: string;
  description?: string;
  type?: string;
  /**
   * Some tables state a minimum per member: `inputType` is 4.0 except `JSKB`,
   * which is 4.2. Absent is absent, never the owning symbol's level.
   */
  apiLevel?: number;
  /**
   * Per member, because one enum routinely mixes the two. `widget` documents a
   * single value in a table that then says "the rest are not listed"; 24 more
   * are written in sample code the docs point at.
   */
  confidence: Confidence;
}

/**
 * A set of values the API accepts or returns, from a `Value | Description`
 * table.
 *
 * Not a `ShapeSpec`: a shape says what an object's keys are, an enum says what
 * one value may be. `createWidget(widget.TEXT, { align_h: align.CENTER_H })` is
 * two enums and a shape, and the shapes front already had the shape.
 */
export interface EnumSpec {
  /** `align`, `text_style`, `retCode`, `TURN_TYPE`. */
  name: string;
  /**
   * True when the table's values are written `name.MEMBER` in code, which makes
   * `name` a symbol of its own — `align`, `widget`, `alg`. False for a bare
   * domain like `retCode` 0..10: it has no name you can write, and it belongs
   * to the symbol whose page declares it.
   */
  qualified: boolean;
  members: EnumMember[];
  /**
   * Upstream states the list is incomplete, or wrote a row this cannot read.
   * `createWidget`'s `WIDGET_ID` table lists one value, breaks the next one's
   * markup, and closes with "the rest of the values are not listed".
   */
  partial?: boolean;
}

/**
 * Something reached through a value rather than through an import.
 *
 * `new HeartRate().getCurrent()`, `localStorage.getItem(...)`,
 * `player.setSource(...)`. Deliberately a field on the owning record and not a
 * record of its own: every id in this base is something you can import, and
 * `@zos/sensor.getCurrent` would be an id nothing can. It is also not a symbol
 * in any useful sense — 12 different sensors document a `getCurrent`, and they
 * are 12 different methods with 12 different return shapes.
 *
 * The reference pages state these under a `Methods` heading, one per `###`
 * below it, and the extractor walked past all of them: eval 02 recorded "a
 * sensor instance's accessors" as an open gap, and `examples/` could only reach
 * them by matching a method name against the symbol table.
 */
export interface MemberSpec {
  name: string;
  description?: string;
  /** The fenced `ts` signature the page states, verbatim. */
  signature?: string;
  /**
   * Its own minimum, which the owning symbol's does not imply — `BloodOxygen`
   * is 2.0 and its `start` method is 2.1. Absent means no badge, never the
   * owner's level.
   */
  apiLevel?: number;
  /** Shapes declared under this member, such as what it returns. */
  shapes?: ShapeSpec[];
  /** Value sets declared under this member, such as a `retCode` domain. */
  enums?: EnumSpec[];
}

/** One source's version of a field the sources disagree about. */
export interface ConflictClaim {
  value: string;
  source: RawSourceKind;
  /** Where to go and check, posix-normalized. */
  originalPath: string;
}

/**
 * A field two official sources state differently.
 *
 * The purest thing this base can produce: the disagreement exists *only*
 * because several fronts are merged, and no upstream page knows it contradicts
 * another. `enrich` has always resolved these by source priority and said
 * nothing, which eval 01 called out.
 *
 * Compared after normalising away punctuation, markup and the trailing
 * permission note — without that, 147 of 513 symbols "disagree" and every one
 * of them is a full stop. One survives.
 */
export interface ConflictSpec {
  field: "description" | "apiLevel" | "signature";
  claims: ConflictClaim[];
}

export interface SymbolRecord {
  id: string; // e.g. "@zos/router.launchApp"
  module: string; // e.g. "@zos/router"
  symbol: string; // e.g. "launchApp"
  type: string;
  description?: string;
  // undefined when no source states it — never fabricated.
  minApiLevel?: number;
  /**
   * The call signature the docs state, verbatim. Both eval runs found its
   * absence to be the base's root gap: it recorded that a symbol exists and
   * never how to call it.
   */
  signature?: string;
  /** The object shapes the signature refers to, `Props` first where present. */
  shapes?: ShapeSpec[];
  /**
   * The value sets this symbol is. `@zos/ui.align` holds its own members;
   * `@zos/sensor.BloodOxygen` holds `retCode`, the domain of a value it returns.
   */
  enums?: EnumSpec[];
  /**
   * What can be called on a value this symbol produces or is. See `MemberSpec`
   * for why these are a field rather than symbols of their own.
   */
  members?: MemberSpec[];
  /**
   * Permission codes `app.json` must declare for this symbol to work, e.g.
   * `device:os.alarm`. A field rather than a phrase inside `description`,
   * because the question it answers is a lookup: an app that calls a sensor
   * without declaring it fails at runtime, not at build.
   */
  permissions?: string[];
  /** Fields whose sources disagree. Absent when they agree, which is the norm. */
  conflicts?: ConflictSpec[];
  runtimes: Runtime[];
  source: RawSourceKind;
  confidence: Confidence;
  originalPath: string;
  extractedAt: string; // ISO date
}

export type RawUnitKind = "function" | "constant" | "value";
export type RawSourceKind =
  | "docs-reference"
  | "llms"
  | "sample"
  | "docs-phone-api"
  // The `hm*` tree. Beside docs-reference in trust: official reference pages
  // for a runtime whose API is global and so has no import line to key on.
  | "docs-watchface";

// Output of the parse stage — pre-enrichment, one entry per observation.
// Enrich merges/reconciles observations of the same symbol across sources.
export interface RawUnit {
  module: string; // e.g. "@zos/router"
  symbol: string; // e.g. "back"
  kind: RawUnitKind;
  description?: string;
  apiLevel?: number;
  signature?: string;
  shapes?: ShapeSpec[];
  enums?: EnumSpec[];
  members?: MemberSpec[];
  permissions?: string[];
  runtimeHint?: Runtime;
  sourceFile: string; // path relative to the cache dir
  sourceKind: RawSourceKind;
}

export interface SyncManifest {
  /**
   * This base's own version, from `package.json`.
   *
   * Not decoration. Every eval task asks the agent to state what it measured,
   * and the isolated copy is built with `git archive`, which strips `.git` — so
   * the run that found the most had to report "no commit available". A version
   * inside the manifest is readable from the tree itself, which is the one
   * thing an agent is already reading, and it is what a consumer cites when
   * reporting a gap or when a served copy claims to be current.
   */
  version: string;
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

/**
 * How one `targets.*.platforms[]` entry picks the hardware it builds for.
 *
 * The two forms are generations, not alternatives, and the samples split on it
 * exactly: every v2 manifest selects by `deviceSource`, every v3 one by screen
 * shape. This is the field that answers "how do I ship to this watch" — the
 * `targets` key above it cannot, because the documentation says that key is
 * "named arbitrarily" and only has to match an `assets/` subdirectory.
 */
export interface PlatformSelector {
  /** v2: the device's own number, joinable to `DeviceRecord.deviceSources`. */
  deviceSource?: number;
  /** v3: screen shape — `r`, `s` or `b`, the same axis as `ScreenSpec.shape`. */
  st?: string;
  /** v3: screen resolution as `w<width>`, e.g. `w480`. */
  sr?: string;
}

/** The parts of a sample's `app.json` that generalize to another project. */
export interface ExampleManifest {
  appType?: string;
  /**
   * `v2` or `v3`. Kept because it decides how `platforms` selects hardware, and
   * a reader copying a v2 sample into a v3 project gets neither form right.
   */
  configVersion?: string;
  /** Declared permission codes — the list to cross-check against symbols used. */
  permissions: string[];
  /**
   * Target keys (`gt.r`, `gt.s`). These name the `assets/` subdirectories and
   * nothing else — upstream calls them arbitrary — so they are evidence about
   * this sample's layout, never about which device it runs on. For that, read
   * `platforms`.
   */
  targets: string[];
  /** Every distinct selector the manifest's targets declare, deduplicated. */
  platforms: PlatformSelector[];
  /** Keys present at the top level, so a reader sees the shape of a real file. */
  keys: string[];
  /**
   * Every key path in the file, dotted and sorted — `app.extType`,
   * `targets.*.module.data-widget`.
   *
   * The top-level `keys` list stops exactly where `app.json` gets hard. The
   * documented schema is a tree, so checking it against reality needs the tree:
   * a workout extension declares `app.extType` and a `data-widget` module, and
   * the reference page documents neither. Target names are arbitrary (`gtr-3`,
   * `common`), so that one segment is collapsed to `*` — otherwise every sample
   * would contribute paths nothing else can be compared with.
   *
   * Paths only; no values. An `appId` belongs to whoever registered it.
   */
  keyPaths: string[];
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
  /**
   * Bare function calls in a Settings App or Side Service file. Those runtimes
   * are all globals, so their code imports nothing that names a module — which
   * made every `setting/` file produce zero excerpts, the largest single gap the
   * second eval run found. `AppSettingsPage({...})` registers a settings page and
   * `View(...)` builds its UI; neither has an import line anywhere, so code is
   * the only evidence they exist.
   */
  globalCalls: MemberCallUsage[];
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

// --- app.json -------------------------------------------------------------
//
// `reference/app-json.mdx` is one file the pipeline skipped for a mechanical
// reason: it imports nothing and matches no runtime rule, so both symbol fronts
// walked past it. It is also on the critical path of every Mini Program — a
// wrong `targets`, a missing `module` entry point or an undeclared permission
// breaks the build (or, worse, the install) before any API matters.
//
// It is not a symbol and cannot be forced into `SymbolRecord`: it is a tree of
// configuration keys, each with its own property table.
//
// Two things the source does NOT do, which the parse has to get right:
//
//   nesting     heading depth does not encode it. `### module: object` is a
//               child of `targets` at the same depth as `targets` itself, while
//               `#### platforms` and `#### designWidth` are its siblings one
//               level deeper. So the parent is derived from *membership* — a
//               section is a child of the last table that has a row with its
//               name — never from `#`.
//   completeness three rows of the `module` table (`secondary-widget`,
//               `app-service`, `app-event`) are typed `object` and given no
//               section at all. Those are recorded as gaps rather than dropped:
//               `app-service` is what turns on the Background Service.

/**
 * One row of an `app.json` property table.
 *
 * Deliberately not `PropSpec`: this table's last column is `Minimum Version`,
 * whose values are `v2`/`v3` — the **configVersion of the file**, not an
 * API_LEVEL. Reusing `PropSpec.apiLevel` would have filed `v3` as level 3.
 */
export interface ManifestProp {
  name: string;
  type?: string;
  /** `true`/`false` only when the cell is exactly YES/NO. */
  required?: boolean;
  /**
   * The cell verbatim when it is conditional — `"YES, required when appType is
   * app."` is a real value, and reducing it to `true` would state that every
   * Mini Program needs a `watchface` module.
   */
  requiredNote?: string;
  description?: string;
  /** The `Minimum Version` cell: an app.json configVersion such as `v2`. */
  minConfigVersion?: string;
}

/** One documented object in `app.json` — `app`, `targets`, `targets.module`. */
export interface ManifestSection {
  /** Dotted key path from the file root, e.g. `targets.module.page`. */
  path: string;
  /** The key alone, e.g. `page`. Empty string for the file root. */
  key: string;
  /** Path of the section this one is a key of; absent for the root. */
  parent?: string;
  props: ManifestProp[];
  /** The section's own example blocks, verbatim and cited to a line. */
  examples: CodeSnippet[];
  /**
   * The runtime this key configures, where the source says so. Only `module`
   * entry points have one; every other key is runtime-agnostic.
   */
  runtime?: Runtime;
}

/** A key typed as an object that the page never gives a section to. */
export interface ManifestGap {
  path: string;
  type?: string;
  description?: string;
  /**
   * Set for a `module` entry point whose runtime is known even though its shape
   * is not — `secondary-widget` runs on the watch. Knowing which runtime a key
   * turns on is useful without knowing what goes inside it, and dropping it
   * would make the entry-point table read as though the runtime were unknown.
   */
  runtime?: Runtime;
}

export interface RawAppJson {
  sections: ManifestSection[];
  gaps: ManifestGap[];
  /** The whole-file example the page closes with. */
  completeExample?: CodeSnippet;
  sourceFile: string;
}

export interface AppJsonRecord extends Omit<RawAppJson, "sourceFile"> {
  source: "docs-app-json";
  confidence: Confidence;
  originalPath: string;
  extractedAt: string;
}

// --- Tools ----------------------------------------------------------------
//
// `guides/tools/` — the last output directory with nothing in it, and the last
// question of every task the base helps with: *how do I build and run this?*
// Nothing here answers it, and an agent that has just written an app cannot
// tell anyone how to see it on a watch.
//
// The item on the roadmap said "23 files". Reading them, **12 are walkthroughs
// of the Watchface Maker**, a no-code web GUI: zero `hm*` references between
// them and one code fence, which is a directory listing. They are documentation
// for a different product and an agent cannot drive a web GUI, so they are out
// of scope rather than merely low value. What is left is the CLI, the simulator
// and the recommended packages.
//
// Three joins make this more than a copy of the CLI page, and each reuses
// evidence the base already holds:
//
//   scaffold -> runtime   `zeus create` writes `app-side/`, `setting/`, `pages/`
//                         and `assets/<target>/`. Those are the same directory
//                         names `runtimeForAppFile` already reads to attribute a
//                         runtime, so the tree the CLI produces can be labelled
//                         without a new rule.
//   scaffold -> app.json  the same directories are what the `module` keys in
//                         `manifest/` turn on. Nothing upstream connects the
//                         prompt the CLI asks to the key it writes.
//   package -> symbols    `npm/officially-recommended.mdx` names ZML first, and
//                         the base already holds 11 `@zeppos/zml` symbols with
//                         no provenance at all.

/** One `zeus` subcommand the CLI page documents. */
export interface ToolCommand {
  /** `zeus create`, `zeus dev` — the command as it is typed. */
  name: string;
  /** What the page says it is for. */
  summary?: string;
  /** The shell blocks under it, verbatim. */
  snippets: CodeSnippet[];
}

/**
 * A file or directory `zeus create` scaffolds, with the runtime it belongs to.
 *
 * The runtime is **derived** — `runtimeForAppFile` reads it off the directory
 * name, the same rule the samples front uses — not stated by the CLI page,
 * which only draws the tree.
 */
export interface ScaffoldEntry {
  name: string;
  runtime: Runtime;
}

/**
 * An npm package the docs recommend.
 *
 * The confidence tier is read from the heading it sits under:
 * `## Officially maintained npm package` and `## Community works`. Those are
 * the first derivable uses of `RECOMMENDED` and `COMMUNITY`, which the v0
 * design reserved and described as needing a manual curation pass.
 */
export interface ToolPackage {
  name: string;
  url?: string;
  description?: string;
  confidence: Extract<Confidence, "RECOMMENDED" | "COMMUNITY">;
}

export interface RawTools {
  commands: ToolCommand[];
  /** The answers `zeus create` prompts for, verbatim. */
  prompts: string[];
  scaffold: ScaffoldEntry[];
  packages: ToolPackage[];
  sourceFiles: string[];
}

export interface ToolsRecord extends Omit<RawTools, "sourceFiles"> {
  source: "docs-guide";
  confidence: Confidence;
  /** Every page this was built from, posix-normalized. */
  originalPaths: string[];
  extractedAt: string;
}

// --- Annotations ----------------------------------------------------------
//
// The one thing in this repository a human writes and `render` reads.
//
// `render` overwrites every generated page and CI fails if the result differs
// from what is committed, so the only place a human judgement can live is an
// *input*. It is not under `data/`, which is the sync's output namespace —
// `writeSymbols` already deletes every JSON there before writing, and a
// hand-written file beside `devices.json` would be indistinguishable from a
// generated one by inspection. It lives in `annotations/`, beside `src/`.
//
// Two rules make it safe, and both exist because this project's own prose has
// gone stale three times:
//
//   never an override   an annotation is shown *beside* the extracted fact,
//                       tagged with its confidence and date, never merged into
//                       it. A page must not state something no source says in a
//                       voice indistinguishable from extraction — that is the
//                       property the whole base is for.
//   pinned              `writtenAgainst` records the field values the note was
//                       written against. When one moves, the annotation is
//                       reported as stale rather than left to rot: a
//                       hand-written claim ages the moment the data changes,
//                       and this is a machine for making hand-written claims.

export interface Annotation {
  /** The symbol id this is about. An id nothing resolves is itself stale. */
  id: string;
  /**
   * Always a human tier. `INFERRED` is a conclusion drawn from the records;
   * `COMMUNITY` and `RECOMMENDED` are claims about who vouches for something.
   */
  confidence: Extract<Confidence, "INFERRED" | "COMMUNITY" | "RECOMMENDED">;
  /** What the human is telling a reader, in full sentences. */
  note: string;
  /**
   * Record fields, and the values they had when the note was written. Any
   * mismatch means the ground moved and the note needs re-reading.
   */
  writtenAgainst?: Record<string, string>;
  /** ISO date, so a reader can weigh how old the judgement is. */
  date: string;
}

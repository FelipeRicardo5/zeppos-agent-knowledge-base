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
export type RawSourceKind = "docs-reference" | "llms" | "sample";

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

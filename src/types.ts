export type Runtime =
  | "device-app"
  | "app-side"
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
  type: string;
  minApiLevel: number;
  runtimes: Runtime[];
  source: string;
  confidence: Confidence;
  originalPath: string;
  extractedAt: string; // ISO date
}

export interface SyncManifest {
  lastSyncAt: string;
  sources: Record<string, { commit: string }>;
  recordCounts: Record<string, number>;
}

import type { SymbolRecord } from "../types.js";

// Stage 3: enrich — infer API_LEVEL, runtime, source, confidence tier.

export async function enrich(rawRecords: unknown[]): Promise<SymbolRecord[]> {
  throw new Error("not implemented");
}

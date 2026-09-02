import type { SymbolRecord } from "../types.js";

// Stage 4: render — generate final markdown from JSON source of truth.
// Output dirs: concepts/, api/, runtimes/, patterns/, examples/, compatibility/, tools/

export async function render(records: SymbolRecord[], outDir: string): Promise<void> {
  throw new Error("not implemented");
}

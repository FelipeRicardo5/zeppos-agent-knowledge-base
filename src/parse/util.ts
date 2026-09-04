import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

/**
 * Reads a cached source file with line endings normalized to LF.
 *
 * The official repos arrive via `git clone`, so on Windows (`core.autocrlf`) the
 * whole cache is CRLF while on macOS and Linux it is LF. Every regex in this
 * stage is written against LF, and the ones anchored with `$` or followed by a
 * literal newline stopped matching on a CRLF checkout without erroring — the
 * llms `## Constants` tables and every `### Import` block were being dropped, so
 * a sync on Windows produced a materially smaller knowledge base than the same
 * commit synced on Linux. Normalizing once here is the same portability
 * guarantee `originalPath` gives the persisted JSON.
 */
export async function readSource(file: string): Promise<string> {
  return (await readFile(file, "utf-8")).replace(/\r\n/g, "\n");
}

export async function walkFiles(dir: string, extensions: string[]): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath, extensions)));
    } else if (extensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

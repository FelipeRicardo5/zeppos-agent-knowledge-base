import path from "node:path";
import { cells, isSeparator, readsHeader } from "./spec.js";
import { readSource, walkFiles } from "./util.js";

// What the extractors are walking past.
//
// Every parser bug this project has had was the same failure: an upstream table
// whose column heading no map recognised, dropped without an error. Eight were
// found in a single session — `Properties`, `Optional Properties`, `Constant`,
// `Constants`, `Callback Name`, `Parameters`, `Property Name` — and every one
// was found *by accident*: by a diff against a types package, by an eval run
// eighteen months later, by reading a page for an unrelated reason.
//
// Adding a ninth entry to a column map does not address that. This does: it
// scans the cached corpus for the heading of every table's first column and
// reports the ones nothing reads, sorted by how much they cost. A new upstream
// heading then arrives as a number that changed in `data/diagnostics.json`, in
// the weekly sync PR, rather than as a silence.
//
// It reads the whole cache rather than only the files a front opened, because
// the failure being measured is exactly "a page nobody parsed properly".

/**
 * Headings that name a table this base has no concept for, with the reason.
 *
 * An allowlist, not a filter: without it the report is dominated by tables
 * about release dates and hardware, which are real and genuinely not symbol
 * documentation, and a report nobody reads is the same as no report.
 */
const NOT_SYMBOL_TABLES: Record<string, string> = {
  location: "the physical-keys page: a key's position on the case",
  version: "release-note tables",
  "1.0 api": "the 1.0-to-2.0 API migration table",
  "preparation items": "a quick-start checklist",
  "equipment name": "the device list, which has its own front",
  category: "a grouping column in a topic page",
  rules: "prose guidance, not a property table",
  sample: "an example-code column",
  algorithmid: "crypto algorithm ids, reached as enum values instead",
  "event_type value": "event tables reached through their symbol's enum",
};

export interface UnreadHeader {
  /** The heading as written, lower-cased. */
  header: string;
  tables: number;
  /** Cache-relative paths, capped so the record stays readable. */
  files: string[];
}

const normalize = (header: string): string => header.toLowerCase().replace(/[*`\s]/g, "");

/**
 * Every table whose first column nothing reads, worst first.
 *
 * A heading is counted once per table, not once per row: the cost of missing a
 * table is the table, and a 39-row one is not 39 findings.
 */
export async function unreadHeaders(cacheDir: string): Promise<UnreadHeader[]> {
  const docsDir = path.join(cacheDir, "zeppos-docs", "docs");
  const files = await walkFiles(docsDir, [".md", ".mdx"]);
  const found = new Map<string, { tables: number; files: Set<string> }>();

  for (const file of files) {
    const lines = (await readSource(file)).split("\n");
    const relative = path.relative(cacheDir, file).split(path.sep).join("/");

    lines.forEach((line, at) => {
      const header = cells(line);
      const next = cells(lines[at + 1] ?? "");
      // A header is the row a separator follows. Without that check a data row
      // reading `| value | number | ... |` is taken for a heading, which is how
      // an invented `Result` enum reached the records once.
      if (header === undefined || next === undefined || !isSeparator(next)) return;

      const first = normalize(header[0] ?? "");
      if (first.length === 0 || readsHeader(first)) return;

      const raw = (header[0] ?? "").toLowerCase().replace(/[*`]/g, "").trim();
      if (raw in NOT_SYMBOL_TABLES) return;

      const entry = found.get(raw) ?? { tables: 0, files: new Set<string>() };
      entry.tables += 1;
      entry.files.add(relative);
      found.set(raw, entry);
    });
  }

  return [...found]
    .map(([header, { tables, files }]) => ({
      header,
      tables,
      files: [...files].sort().slice(0, 5),
    }))
    .sort((a, b) => b.tables - a.tables || a.header.localeCompare(b.header));
}

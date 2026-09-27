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
};

/**
 * An allowlist entry that matched no table in the corpus.
 *
 * An entry here silences a heading permanently, so a wrong one is worse than
 * a missing column map: the map fails loudly the moment someone counts, and
 * this fails by staying quiet forever. Two of the entries written with this
 * file were false. `algorithmid` claimed its ids were "reached as enum values
 * instead"; `alg` carried one member of ten until the alias was added, and
 * `createCrypto` takes one of the nine that were missing. `event_type value`
 * silenced the domain of the picker callback's `event_type` parameter on two
 * pages. Both were found by reading the corpus for something else, which is
 * the failure mode this whole file was built to end.
 *
 * So the allowlist is measured the same way the headings are.
 */
export interface UnusedAllowlistEntry {
  header: string;
  reason: string;
}

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
export async function unreadHeaders(
  cacheDir: string,
): Promise<{ headers: UnreadHeader[]; unusedAllowlist: UnusedAllowlistEntry[] }> {
  const docsDir = path.join(cacheDir, "zeppos-docs", "docs");
  const files = await walkFiles(docsDir, [".md", ".mdx"]);
  const found = new Map<string, { tables: number; files: Set<string> }>();
  /** Allowlist entries that actually silenced something. */
  const silenced = new Set<string>();

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
      if (raw in NOT_SYMBOL_TABLES) {
        silenced.add(raw);
        return;
      }

      const entry = found.get(raw) ?? { tables: 0, files: new Set<string>() };
      entry.tables += 1;
      entry.files.add(relative);
      found.set(raw, entry);
    });
  }

  return {
    headers: [...found]
      .map(([header, { tables, files }]) => ({
        header,
        tables,
        files: [...files].sort().slice(0, 5),
      }))
      .sort((a, b) => b.tables - a.tables || a.header.localeCompare(b.header)),
    unusedAllowlist: Object.entries(NOT_SYMBOL_TABLES)
      .filter(([header]) => !silenced.has(header))
      .map(([header, reason]) => ({ header, reason }))
      .sort((a, b) => a.header.localeCompare(b.header)),
  };
}

import { type NameKind, nameIndex, writtenAs } from "../index/names.js";
import { moduleSlug, type ModuleFile } from "../store/index.js";
import type { SymbolRecord } from "../types.js";
import { NOT_STATED, apiLevelLabel, cell } from "./shared.js";

// The `lookup.md` view: the name index, as a page.
//
// The second eval run called a symbol-first reverse index "the most-wanted
// structural change": *where does `setInterval` live?* cost three file reads,
// because every index in this base is keyed by module, level or runtime — by
// where a thing sits rather than by what it is called. An agent reading someone
// else's code arrives with a bare name and nothing else.
//
// The index itself is built in `src/index/names.ts`, which knows nothing about
// Markdown. This file is one of its two consumers and owns only the rendering.

export const LOOKUP_FILE = "lookup.md";

/** `property` does not take an `s`, and the kinds are English rather than code. */
function plural(kind: NameKind, n: number): string {
  if (n === 1) return kind;
  return kind === "property" ? "properties" : `${kind}s`;
}

function anchorFor(record: SymbolRecord): string {
  const heading = `${record.module}.${record.symbol}`;
  return `${moduleSlug(record.module)}.md#${heading.toLowerCase().replace(/[^a-z0-9 _-]/g, "").replace(/ /g, "-")}`;
}

function lookupPage(modules: ModuleFile[]): string {
  const index = nameIndex(modules);
  const names = [...index.keys()].sort((a, b) => a.localeCompare(b));
  const entries = [...index.values()].flat();
  const counts = new Map<NameKind, number>();
  for (const entry of entries) counts.set(entry.kind, (counts.get(entry.kind) ?? 0) + 1);

  const ambiguous = names.filter((name) => (index.get(name) ?? []).length > 1);

  const lines = ["# Lookup — every name, and what owns it", ""];
  lines.push(
    "Start here when you have a bare name and nothing else: a symbol out of",
    "someone else's code, a method called on a value, a constant passed to a",
    "function, a property set on a widget. Every other index in this base is",
    "keyed by module, `API_LEVEL` or runtime — by where a thing sits rather than",
    "by what it is called.",
    "",
    `**${names.length} names**, ${entries.length} entries: ` +
      [...counts]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([kind, n]) => `${n} ${plural(kind, n)}`)
        .join(", ") +
      `. ${ambiguous.length} names have more than one owner.`,
    "",
    "**A name with several owners is not a duplicate.** 12 sensors document a",
    "`getCurrent` and they return 12 different shapes; `CENTER_H` belongs to",
    "`@zos/ui.align` in a Device App and `hmUI.align` in a watchface; `align_h`",
    "is a property of five widgets across two runtimes. Read the row whose",
    "runtime matches what you are building.",
    "",
    "Bare numeric domains are excluded — `retCode` 0..10, the weather `index`",
    "0..28. Those are values, not names, and indexing them put `0` here with",
    "eleven owners. Look those up on the owning symbol's page instead. A widely",
    "shared property is not that: `x` has 52 owners and the breadth is the",
    "answer, since it is a position prop on every widget.",
    "",
  );

  lines.push("| Name | Kind | Written as | Runtimes | Min API_LEVEL | Page |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const name of names) {
    for (const entry of index.get(name) ?? []) {
      const { owner } = entry;
      const runtimes = owner.runtimes.length > 0 ? owner.runtimes.join(", ") : NOT_STATED;
      lines.push(
        `| \`${name}\` | ${entry.kind} | \`${cell(writtenAs(entry))}\` | ${cell(runtimes)} | ` +
          `${apiLevelLabel(owner.minApiLevel)} | [${moduleSlug(owner.module)}](${anchorFor(owner)}) |`,
      );
    }
  }
  lines.push("");

  lines.push("## Names with more than one owner", "");
  lines.push(
    "Listed on their own because this is where a bare name stops being an answer.",
    "",
  );
  for (const name of ambiguous) {
    const owners = (index.get(name) ?? []).map((e) => `\`${e.owner.id}\` (${e.kind})`);
    lines.push(`- \`${name}\` — ${owners.join(", ")}`);
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * The name index, as markdown.
 *
 * Exported as text rather than as a writer: `api/` has one owner, because
 * `prepareOutDir` clears the directory and a second function writing there
 * would have its page deleted by whichever ran second. `render()` writes this
 * and reserves the slug alongside `index.md`.
 */
export function lookupMarkdown(modules: ModuleFile[]): string {
  return lookupPage(modules);
}

/** How many distinct names the index holds, for the run summary. */
export function lookupNameCount(modules: ModuleFile[]): number {
  return nameIndex(modules).size;
}

import { moduleSlug, type ModuleFile } from "../store/index.js";
import type { SymbolRecord } from "../types.js";
import { NOT_STATED, apiLevelLabel, cell } from "./shared.js";

// The `lookup.md` view: every name in the base, and what owns it.
//
// The second eval run called a symbol-first reverse index "the most-wanted
// structural change": *where does `setInterval` live?* cost three file reads,
// because every index in this base is keyed by module, level or runtime — by
// where a thing sits rather than by what it is called. An agent reading someone
// else's code arrives with a bare name and nothing else.
//
// Three kinds of name answer to that question and only one of them was
// indexed anywhere:
//
//   symbols    `setInterval` -> `@zos/global.setInterval`
//   members    `getCurrent` -> 12 different sensors, and they are 12 different
//              methods returning 12 different shapes, so the owner is the
//              answer rather than a detail
//   enum       `CENTER_H` -> `@zos/ui.align` and `hmUI.align`, one per runtime
//
// Bare value domains are left out on purpose. `retCode` runs 0..10 and the
// weather `index` 0..28; nobody looks up "where does `4` live", and including
// them put `0` in the index with eleven owners.

export const LOOKUP_FILE = "lookup.md";

/**
 * A name worth looking up: an identifier, not a number or a sentence.
 *
 * Dots and hyphens are allowed because three real symbols carry them —
 * `localStorage-instance` from a page filename, and `console.log`, which the
 * Side Service page titles that way because that is how it is written. A
 * dotted name is also indexed under its last segment, so looking up `log`
 * finds it; that is the whole point of a reverse index.
 */
const LOOKUP_NAME_RE = /^[A-Za-z_$][A-Za-z0-9_$.-]*$/;

type Kind = "symbol" | "member" | "enum value";

interface Entry {
  kind: Kind;
  /** The record that owns it, for the link and the compatibility columns. */
  owner: SymbolRecord;
  /** How the name is reached — `align.CENTER_H`, `.getCurrent()`. */
  written: string;
}

function collect(modules: ModuleFile[]): Map<string, Entry[]> {
  const index = new Map<string, Entry[]>();
  const add = (name: string, entry: Entry) => {
    if (!LOOKUP_NAME_RE.test(name)) return;
    index.set(name, [...(index.get(name) ?? []), entry]);

    const last = name.slice(name.lastIndexOf(".") + 1);
    if (last !== name && LOOKUP_NAME_RE.test(last)) {
      index.set(last, [...(index.get(last) ?? []), entry]);
    }
  };

  for (const module of modules) {
    for (const record of module.symbols) {
      add(record.symbol, { kind: "symbol", owner: record, written: record.id });

      for (const member of record.members ?? []) {
        add(member.name, { kind: "member", owner: record, written: `${record.id}.${member.name}()` });
      }

      const enums = [
        ...(record.enums ?? []).map((spec) => ({ spec, on: record.symbol })),
        ...(record.members ?? []).flatMap((member) =>
          (member.enums ?? []).map((spec) => ({ spec, on: `${record.symbol}.${member.name}` })),
        ),
      ];

      for (const { spec, on } of enums) {
        for (const value of spec.members) {
          add(value.value, {
            kind: "enum value",
            owner: record,
            // Qualified enums are written through their own name; a bare set is
            // a domain of the symbol, so the symbol is how you get to it.
            written: spec.qualified
              ? `${spec.name}.${value.value}`
              : `${module.module}.${on} -> ${spec.name}`,
          });
        }
      }
    }
  }

  return index;
}

function anchorFor(record: SymbolRecord): string {
  const heading = `${record.module}.${record.symbol}`;
  return `${moduleSlug(record.module)}.md#${heading.toLowerCase().replace(/[^a-z0-9 _-]/g, "").replace(/ /g, "-")}`;
}

function lookupPage(modules: ModuleFile[]): string {
  const index = collect(modules);
  const names = [...index.keys()].sort((a, b) => a.localeCompare(b));
  const entries = [...index.values()].flat();
  const counts = new Map<Kind, number>();
  for (const entry of entries) counts.set(entry.kind, (counts.get(entry.kind) ?? 0) + 1);

  const ambiguous = names.filter((name) => (index.get(name) ?? []).length > 1);

  const lines = ["# Lookup — every name, and what owns it", ""];
  lines.push(
    "Start here when you have a bare name and nothing else: a symbol out of",
    "someone else's code, a method called on a value, a constant passed to a",
    "function. Every other index in this base is keyed by module, `API_LEVEL` or",
    "runtime — by where a thing sits rather than by what it is called.",
    "",
    `**${names.length} names**, ${entries.length} entries: ` +
      [...counts]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([kind, n]) => `${n} ${kind}${n === 1 ? "" : "s"}`)
        .join(", ") +
      `. ${ambiguous.length} names have more than one owner.`,
    "",
    "**A name with several owners is not a duplicate.** 12 sensors document a",
    "`getCurrent` and they return 12 different shapes; `CENTER_H` belongs to",
    "`@zos/ui.align` in a Device App and `hmUI.align` in a watchface. Read the",
    "row whose runtime matches what you are building.",
    "",
    "Bare numeric domains are excluded — `retCode` 0..10, the weather `index`",
    "0..28. Those are values, not names, and indexing them put `0` here with",
    "eleven owners. Look those up on the owning symbol's page instead.",
    "",
  );

  lines.push("| Name | Kind | Written as | Runtimes | Min API_LEVEL | Page |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const name of names) {
    for (const entry of index.get(name) ?? []) {
      const { owner } = entry;
      const runtimes = owner.runtimes.length > 0 ? owner.runtimes.join(", ") : NOT_STATED;
      lines.push(
        `| \`${name}\` | ${entry.kind} | \`${cell(entry.written)}\` | ${cell(runtimes)} | ` +
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
  return collect(modules).size;
}

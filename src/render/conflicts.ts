import path from "node:path";
import type { ModuleFile } from "../store/index.js";
import type { ExampleRecord, Runtime, SymbolRecord } from "../types.js";

import { INDEX_FILE, cell, prepareOutDir, writePage } from "./shared.js";
import { readExampleFiles, readModuleFiles } from "../store/read.js";

// The `conflicts/` view: everywhere the sources contradict each other.
//
// Eval 01 called this the purest moat the project has. A conflict exists *only*
// because several fronts are merged — no upstream page knows another
// contradicts it, so no doc mirror can produce this list, and neither can an
// agent reading the official site.
//
// What is here is what was measured, and it is not what the item predicted.
// Scalar fields almost never disagree: `API_LEVEL` and signatures never do, and
// descriptions do exactly once out of 513 symbols after punctuation is
// normalised away. The disagreements that are real are *structural* — a name
// spelled one way in the docs and another in code, and a method call whose name
// resolves to several different things at once. Those get their own sections.
//
// Every row cites both sides with a source path, because the point is not to
// pick a winner. Where this base has to pick one, it says so.

const CONFLICTS_DIR = "conflicts";

/** Edit distance, for the name comparison below. */
function distance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }

  return previous[b.length];
}

/**
 * Names close enough that one is likely a typo for the other.
 *
 * One edit, and both names at least six characters. The length floor is not
 * decoration: at three characters `prop.SRC` and the `ARC` widget are one edit
 * apart and have nothing to do with each other, and that false positive is the
 * only thing the floor removes from the current corpus.
 */
const MIN_NAME_LENGTH = 6;

function isNearMiss(a: string, b: string): boolean {
  if (a === b) return false;
  if (a.length < MIN_NAME_LENGTH || b.length < MIN_NAME_LENGTH) return false;
  if (Math.abs(a.length - b.length) > 1) return false;
  return distance(a, b) === 1;
}

interface NameConflict {
  module: string;
  enumName: string;
  written: string;
  documented: string;
}

/**
 * A value code writes that is one edit from a symbol the docs describe.
 *
 * `widget.GRADKIENT_POLYLINE` appears in official sample code and in the
 * watchface reference; `@zos/ui.GRADIENT_POLYLINE` is the page documenting the
 * widget. One of the two is a typo, both are official, and a developer copying
 * the documented spelling may get `undefined`.
 */
function nameConflicts(modules: ModuleFile[]): NameConflict[] {
  const found: NameConflict[] = [];

  for (const module of modules) {
    const documented = new Set(module.symbols.map((r) => r.symbol));

    for (const record of module.symbols) {
      for (const spec of record.enums ?? []) {
        if (!spec.qualified) continue;

        for (const member of spec.members) {
          if (documented.has(member.value)) continue;
          for (const name of documented) {
            if (isNearMiss(name, member.value)) {
              found.push({
                module: module.module,
                enumName: spec.name,
                written: member.value,
                documented: name,
              });
            }
          }
        }
      }
    }
  }

  return found.sort((a, b) => a.written.localeCompare(b.written));
}

interface CallConflict {
  method: string;
  samples: number;
  symbols: string[];
  members: string[];
}

/**
 * A method call in sample code whose name resolves to more than one thing.
 *
 * `examples/` reaches these by matching the method name against the symbol
 * table, because the receiver's type is not resolved — that is stated on the
 * page. What was not stated is how often the match is ambiguous, and until
 * instance members existed the base could not even see the better candidate:
 * `.getItem()` was reported as `settings-storage.getItem`, a Settings App
 * function, in six Device App samples where it is `localStorage.getItem`.
 */
function callConflicts(modules: ModuleFile[], examples: ExampleRecord[]): CallConflict[] {
  const byName = new Map<string, { id: string; runtimes: Runtime[]; member: boolean }[]>();

  const add = (name: string, id: string, runtimes: Runtime[], member: boolean) =>
    byName.set(name, [...(byName.get(name) ?? []), { id, runtimes, member }]);

  for (const module of modules) {
    for (const record of module.symbols) {
      add(record.symbol, record.id, record.runtimes, false);
      for (const member of record.members ?? []) add(member.name, record.id, record.runtimes, true);
    }
  }

  // Resolved per sample, not across all of them. A sample declares its own
  // runtimes, and that is what decides which API a call belongs to: the same
  // `.setProperty()` is `hmUI.setProperty` in a watchface and
  // `@zos/ui.setProperty` in a Device App. Taking the union across samples put
  // both candidates on every row and turned every name the two APIs share into
  // a false conflict — 25 rows where 19 are real.
  const ambiguous = new Map<string, { samples: number; ids: Map<string, boolean> }>();

  for (const example of examples) {
    const runtimes = new Set(example.runtimes);

    for (const call of example.memberCalls) {
      const candidates = (byName.get(call.method) ?? []).filter(
        (c) => c.runtimes.length === 0 || c.runtimes.some((r) => runtimes.has(r)),
      );
      if (candidates.length < 2) continue;

      const entry = ambiguous.get(call.method) ?? { samples: 0, ids: new Map<string, boolean>() };
      entry.samples += 1;
      for (const candidate of candidates) entry.ids.set(candidate.id, candidate.member);
      ambiguous.set(call.method, entry);
    }
  }

  const found: CallConflict[] = [];
  for (const [method, { samples, ids }] of ambiguous) {
    found.push({
      method,
      samples,
      symbols: [...ids].filter(([, member]) => !member).map(([id]) => id).sort(),
      members: [...ids].filter(([, member]) => member).map(([id]) => id).sort(),
    });
  }

  return found
    .filter((row) => row.symbols.length + row.members.length > 1)
    .sort((a, b) => b.samples - a.samples || a.method.localeCompare(b.method));
}

/** `widget` is the one enum whose members are supposed to name documented symbols. */
function widgetDiff(modules: ModuleFile[]): { module: string; written: string[]; documented: string[] }[] {
  const rows: { module: string; written: string[]; documented: string[] }[] = [];
  const byModule = new Map(modules.map((m) => [m.module, m]));

  for (const module of modules) {
    const record = module.symbols.find((r) => r.symbol === "widget");
    const spec = record?.enums?.find((e) => e.name === "widget");
    if (!spec) continue;

    // The pages may sit beside the enum (`@zos/ui.TEXT`) or in a module named
    // after it (`hmUI.widget.TEXT`) — the watchface tree does the second, and
    // looking only beside the enum reported every one of its widgets missing.
    const pages = [module, byModule.get(`${module.module}.widget`)]
      .filter((m): m is ModuleFile => m !== undefined)
      .flatMap((m) => m.symbols)
      .filter((r) => /^[A-Z][A-Z0-9_]*$/.test(r.symbol))
      .map((r) => r.symbol);

    const members = new Set(spec.members.map((m) => m.value));
    rows.push({
      module: module.module,
      written: [...members].filter((m) => !pages.includes(m)).sort(),
      documented: pages.filter((p) => !members.has(p)).sort(),
    });
  }

  return rows;
}

function fieldConflicts(modules: ModuleFile[]): SymbolRecord[] {
  return modules.flatMap((m) => m.symbols).filter((r) => (r.conflicts?.length ?? 0) > 0);
}

function conflictsMarkdown(modules: ModuleFile[], examples: ExampleRecord[]): string {
  const fields = fieldConflicts(modules);
  const names = nameConflicts(modules);
  const calls = callConflicts(modules, examples);
  const widgets = widgetDiff(modules);

  const lines = ["# Conflicts", ""];
  lines.push(
    "Everywhere the official sources contradict each other, or this base cannot tell",
    "which of several answers is meant.",
    "",
    "None of this exists upstream. A conflict is only visible because several fronts",
    "are merged here, and no page on the official site knows that another page, or",
    "the sample code it ships, says something else. Every row cites both sides so the",
    "claim can be checked rather than trusted.",
    "",
    "Read it as a warning list, not an errata: where this base has to resolve a",
    "conflict it does so by source priority, and the page it lands on says nothing",
    "about the version that lost. That is what this page is for.",
    "",
  );

  lines.push("## A field two sources state differently", "");
  if (fields.length === 0) {
    lines.push("None. Every symbol observed by more than one front agrees on every field.", "");
  } else {
    lines.push(
      "Compared after normalising punctuation, markup and the trailing `permission",
      "code:` note. Without that, 147 symbols \"disagree\" and every one of them is a",
      "full stop. `API_LEVEL` and signatures never disagree at all.",
      "",
    );
    for (const record of fields) {
      for (const conflict of record.conflicts ?? []) {
        lines.push(`### \`${record.id}\` — \`${conflict.field}\``, "");
        for (const claim of conflict.claims) {
          lines.push(`- **${claim.source}** — ${cell(claim.value)}`);
          lines.push(`  <br/>\`${claim.originalPath}\``);
        }
        lines.push("", `This base resolves it to the **${conflict.claims[0].source}** value.`, "");
      }
    }
  }

  lines.push("## A name written one way and documented another", "");
  if (names.length === 0) {
    lines.push("None found.", "");
  } else {
    lines.push(
      "A value that appears in code, one edit away from a symbol the documentation",
      "describes, where no symbol of the written name exists. Both spellings are",
      "`OFFICIAL`; one of them does not work.",
      "",
    );
    lines.push("| Written in code | Documented symbol | Where |");
    lines.push("| --- | --- | --- |");
    for (const row of names) {
      lines.push(
        `| \`${row.enumName}.${row.written}\` | [\`${row.module}.${row.documented}\`](../api/${moduleFile(row.module)}) | ${cell(row.module)} |`,
      );
    }
    lines.push(
      "",
      "Only names of at least six characters, one edit apart, are compared: shorter",
      "ones collide by accident — `prop.SRC` and the `ARC` widget are one edit apart",
      "and unrelated. So this catches typos and misses renames.",
      "",
    );
  }

  lines.push("## A method call this base cannot resolve", "");
  if (calls.length === 0) {
    lines.push("None. Every method seen in sample code matches exactly one thing.", "");
  } else {
    lines.push(
      "`examples/` finds these by matching the method name against the symbol table —",
      "the receiver's type is never resolved, because that would need flow analysis.",
      "Where the name matches more than one thing, the match is a hint and nothing",
      "more. The instance members are usually the right answer and the module symbol",
      "the wrong one: `.getItem()` in a Device App is `localStorage.getItem`, not the",
      "Settings App's `settings-storage.getItem`.",
      "",
    );
    lines.push("| Call | Samples | Module symbols of that name | Instance members of that name |");
    lines.push("| --- | --- | --- | --- |");
    for (const row of calls) {
      lines.push(
        `| \`.${row.method}()\` | ${row.samples} | ${list(row.symbols)} | ${list(row.members)} |`,
      );
    }
    lines.push("");
  }

  lines.push("## `widget`: documented pages and written ids", "");
  for (const row of widgets) {
    lines.push(
      `In \`${row.module}\`, an id passed to \`createWidget\` should name a widget the`,
      "reference documents. Both directions have gaps, and the reference page itself",
      "says its list is incomplete.",
      "",
    );
    lines.push(
      row.written.length === 0
        ? "- Every id seen in code has a documented page."
        : `- **Written in code, no page**: ${row.written.map((n) => `\`${n}\``).join(", ")}`,
    );
    lines.push(
      row.documented.length === 0
        ? "- Every documented widget appears as an id."
        : `- **Documented, never written as an id**: ${row.documented.map((n) => `\`${n}\``).join(", ")}`,
    );
    lines.push("");
  }

  return lines.join("\n");
}

function list(ids: string[]): string {
  return ids.length === 0 ? "—" : ids.map((id) => `\`${id}\``).join(", ");
}

/** `@zos/ui` -> `zos-ui.md`, matching what the api view writes. */
function moduleFile(module: string): string {
  return `${module.replace(/^@/, "").replace(/[^A-Za-z0-9._-]/g, "-")}.md`;
}

export async function renderConflicts(
  symbolsDir: string,
  examplesDir: string,
  outDir: string,
): Promise<{ conflicts: number }> {
  const modules = await readModuleFiles(symbolsDir);
  const examples = await readExampleFiles(examplesDir);

  const dir = path.join(outDir, CONFLICTS_DIR);
  await prepareOutDir(dir);
  await writePage(path.join(dir, INDEX_FILE), conflictsMarkdown(modules, examples));

  const total =
    fieldConflicts(modules).length +
    nameConflicts(modules).length +
    callConflicts(modules, examples).length;
  return { conflicts: total };
}

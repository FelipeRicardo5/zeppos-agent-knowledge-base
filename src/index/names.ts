import type { ModuleFile } from "../store/index.js";
import type { SymbolRecord } from "../types.js";

// The name index: every name in the base, and what owns it.
//
// This lives outside `render/` because it has two consumers that want it in
// two shapes. `api/lookup.md` wants rows of Markdown; a tool answering *where
// does `setInterval` live?* wants the records. Building the index in the render
// layer and importing it from elsewhere would put presentation underneath data,
// and the display strings would leak into every answer.
//
// So the index is structural, and `writtenAs` derives the one string both
// consumers need. That string is not decoration: **how a name is reached** —
// `align.CENTER_H`, `.getCurrent()` — is the second half of the answer. A
// caller who learns that `CENTER_H` belongs to `@zos/ui.align` still cannot
// type it without knowing whether the set is reached through its own name.
//
// Four kinds of name answer the question, and only one of them was indexed
// anywhere before this existed:
//
//   symbols    `setInterval` -> `@zos/global.setInterval`
//   members    `getCurrent` -> 12 different sensors, and they are 12 different
//              methods returning 12 different shapes, so the owner is the
//              answer rather than a detail
//   enum       `CENTER_H` -> `@zos/ui.align` and `hmUI.align`, one per runtime
//   properties `align_h` -> the `Param` shape of 5 widgets in 2 runtimes
//
// Properties were the late addition, and the acceptance suite is what found
// them missing. An eval question asks *what values may `align_h` take when I
// create a TEXT widget* — an agent holding a property name out of someone's
// widget code, which is the exact case this index exists for — and the index
// returned nothing, because it knew symbols, members and enum values and not
// the props inside a shape. 624 names were absent. 400 of them have a single
// owner.
//
// Bare value domains are still left out. `retCode` runs 0..10 and the weather
// `index` 0..28; nobody looks up "where does `4` live", and including them put
// `0` in the index with eleven owners. A property name is not that: `x` has 52
// owners and the breadth *is* the answer — it is a position prop on every
// widget — where `0` with eleven owners answers nothing.

/**
 * A name worth looking up: an identifier, not a number or a sentence.
 *
 * Dots and hyphens are allowed because three real symbols carry them —
 * `localStorage-instance` from a page filename, and `console.log`, which the
 * Side Service page titles that way because that is how it is written. A
 * dotted name is also indexed under its last segment, so looking up `log`
 * finds it; that is the whole point of a reverse index.
 */
export const LOOKUP_NAME_RE = /^[A-Za-z_$][A-Za-z0-9_$.-]*$/;

export type NameKind = "symbol" | "member" | "enum value" | "property";

/** What owns a name, and enough structure to say how the name is reached. */
export type NameEntry =
  | { kind: "symbol"; name: string; owner: SymbolRecord }
  | { kind: "member"; name: string; owner: SymbolRecord; member: string }
  | {
      kind: "enum value";
      name: string;
      owner: SymbolRecord;
      /** The value set it belongs to — `align`, `text_style`. */
      set: string;
      /** Whether that set is reached through its own name. */
      qualified: boolean;
      /** What the set hangs off: the symbol, or `symbol.member`. */
      on: string;
    }
  | {
      kind: "property";
      name: string;
      owner: SymbolRecord;
      /** The shape it is a field of — `Param`, `Props`, `Result`. */
      shape: string;
      /** What the shape hangs off: the symbol, or `symbol.member`. */
      on: string;
    };

/**
 * How the name is written in code.
 *
 * A qualified set is reached through its own name; a bare set is a domain of
 * the symbol, so the symbol is how you get to it, and the arrow says the name
 * is a value of that set rather than a path you can type.
 */
export function writtenAs(entry: NameEntry): string {
  switch (entry.kind) {
    case "symbol":
      return entry.owner.id;
    case "member":
      return `${entry.owner.id}.${entry.member}()`;
    case "enum value":
      return entry.qualified
        ? `${entry.set}.${entry.name}`
        : `${entry.owner.module}.${entry.on} -> ${entry.set}`;
    case "property":
      // A prop is not a path you can type on its own — it is a field of an
      // object handed to the symbol, so the arrow points at where it goes.
      return `${entry.owner.module}.${entry.on} -> ${entry.shape}.${entry.name}`;
  }
}

/**
 * Every name in the base, keyed by what you would type to search for it.
 *
 * A dotted name appears twice — under itself and under its last segment — and
 * both keys point at the same entry, so a count of entries is not a count of
 * names.
 */
export function nameIndex(modules: ModuleFile[]): Map<string, NameEntry[]> {
  const index = new Map<string, NameEntry[]>();

  const add = (name: string, entry: NameEntry) => {
    if (!LOOKUP_NAME_RE.test(name)) return;
    index.set(name, [...(index.get(name) ?? []), entry]);

    const last = name.slice(name.lastIndexOf(".") + 1);
    if (last !== name && LOOKUP_NAME_RE.test(last)) {
      index.set(last, [...(index.get(last) ?? []), entry]);
    }
  };

  for (const module of modules) {
    for (const owner of module.symbols) {
      add(owner.symbol, { kind: "symbol", name: owner.symbol, owner });

      for (const member of owner.members ?? []) {
        add(member.name, { kind: "member", name: member.name, owner, member: member.name });
      }

      const shapes = [
        ...(owner.shapes ?? []).map((spec) => ({ spec, on: owner.symbol })),
        ...(owner.members ?? []).flatMap((member) =>
          (member.shapes ?? []).map((spec) => ({ spec, on: `${owner.symbol}.${member.name}` })),
        ),
      ];

      for (const { spec, on } of shapes) {
        for (const prop of spec.props) {
          add(prop.name, { kind: "property", name: prop.name, owner, shape: spec.name, on });
        }
      }

      const sets = [
        ...(owner.enums ?? []).map((spec) => ({ spec, on: owner.symbol })),
        ...(owner.members ?? []).flatMap((member) =>
          (member.enums ?? []).map((spec) => ({ spec, on: `${owner.symbol}.${member.name}` })),
        ),
      ];

      for (const { spec, on } of sets) {
        for (const value of spec.members) {
          add(value.value, {
            kind: "enum value",
            name: value.value,
            owner,
            set: spec.name,
            qualified: spec.qualified === true,
            on,
          });
        }
      }
    }
  }

  return index;
}

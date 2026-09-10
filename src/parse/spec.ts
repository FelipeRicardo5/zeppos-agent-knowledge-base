import type { EnumMember, EnumSpec, PropSpec, ShapeSpec } from "../types.js";

// Call shapes: the signature a page states and the property tables under it.
//
// Both eval runs found the same root gap — the base recorded that a symbol
// exists and never how to call it. `examples/` answered it with code that runs;
// this answers it with what the documentation actually declares, which the
// extractor was walking past. 182 of 269 reference pages carry a signature in a
// ```ts block under `## Type`, and the 13 Settings App components each carry a
// full property table that had been reduced to a bare name.
//
// Table columns are resolved by header name, never by position, because the two
// trees disagree on both order and wording:
//
//   app-settings-api/ui/*  | Name     | Description | Required | Type | Default |
//   device-app-api/**      | Property | Type | Required | DefaultValue | Description | API_LEVEL |
//
// A positional read would have filed a type as a description on one of them, and
// the device-app tables carry a per-property API_LEVEL that the other does not.

/** A ```ts block under a `Type`/`Types` heading, at any heading depth. */
const SIGNATURE_RE = /^#{2,4}\s+Types?\s*$\n+```ts\n([\s\S]*?)```/m;

/** `## Props: object`, `### SelectOption: object`, `#### Param` — a shape name. */
const SHAPE_HEADING_RE = /^#{2,5}\s+(.+?)\s*$/;

/** Column header -> the field it fills. Lower-cased before lookup. */
const COLUMNS: Record<string, keyof PropSpec> = {
  name: "name",
  property: "name",
  // Plural. 32 reference pages head the column `Properties` and 101 head it
  // `Property`, and the plural was missing here — so those 32 passed the header
  // check on their other columns, then produced a row with no name and were
  // dropped one by one, silently. That is the whole `ui/widget/` tree: `TEXT`,
  // `IMG`, `BUTTON` and the rest carried a description and a level and no
  // property table at all, which is the one thing needed to draw them.
  properties: "name",
  parameter: "name",
  description: "description",
  type: "type",
  required: "required",
  default: "default",
  defaultvalue: "default",
  api_level: "apiLevel",
};

/**
 * A markdown table row split into trimmed cells, or undefined if not a row.
 *
 * Exported because the `app.json` front reads the same markdown tables with a
 * different column vocabulary — its `Minimum Version` column is a configVersion,
 * not an API_LEVEL, so it cannot share `toProp` — and a second hand-rolled row
 * splitter is exactly the kind of drift that made a CRLF checkout parse smaller
 * than an LF one.
 */
export function cells(line: string): string[] | undefined {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return undefined;
  return trimmed
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function isSeparator(row: string[]): boolean {
  return row.every((cell) => /^:?-{3,}:?$/.test(cell));
}

/** `` `string` `` -> `string`; `<code>object</code>` -> `object`; `-` -> undefined. */
export function clean(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const text = value
    .replace(/<\/?code>/g, "")
    .replace(/`/g, "")
    .trim();
  return text === "" || text === "-" ? undefined : text;
}

function toProp(header: string[], row: string[]): PropSpec | undefined {
  const spec: Partial<PropSpec> = {};

  header.forEach((label, index) => {
    const field = COLUMNS[label.toLowerCase().replace(/\s+/g, "")];
    if (field === undefined) return;

    const value = clean(row[index]);
    if (value === undefined) return;

    if (field === "required") {
      spec.required = /^yes$/i.test(value) ? true : /^no$/i.test(value) ? false : undefined;
    } else if (field === "apiLevel") {
      const level = Number(value);
      if (Number.isFinite(level)) spec.apiLevel = level;
    } else {
      spec[field] = value as never;
    }
  });

  // A row with no name is a separator artefact or a continuation line.
  return spec.name === undefined ? undefined : (spec as PropSpec);
}

/**
 * The signature the page declares for the symbol, verbatim.
 *
 * Kept as written rather than parsed into parts: `(props: Props) => result:
 * RenderFunc` is not valid TypeScript, and normalising it would either lose
 * information or invent a shape the docs never stated.
 */
export function extractSignature(content: string): string | undefined {
  const match = content.match(SIGNATURE_RE);
  return match ? match[1].trim() : undefined;
}

/**
 * Every named property table on the page, keyed by the heading above it.
 *
 * The heading is the shape's name — `Props`, `SelectOption`, `Options`,
 * `DownloadTask` — because that is what the page's own signature refers to:
 * `(props: Props) => RenderFunc` is unusable without the `Props` table, and
 * `Select`'s `options` is unusable without `SelectOption`.
 */
export function extractShapes(content: string): ShapeSpec[] {
  const shapes: ShapeSpec[] = [];
  const lines = content.split("\n");

  let heading: string | undefined;
  let header: string[] | undefined;
  let props: PropSpec[] = [];

  const flush = () => {
    if (heading !== undefined && props.length > 0) {
      // `Props: object` names the shape `Props`; the annotation is noise.
      shapes.push({ name: heading.replace(/\s*:\s*object$/i, "").trim(), props });
    }
    header = undefined;
    props = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(SHAPE_HEADING_RE);
    if (headingMatch && line.startsWith("#")) {
      flush();
      heading = headingMatch[1].replace(/`/g, "").trim();
      continue;
    }

    const row = cells(line);
    if (row === undefined) {
      // Prose or a blank line ends the table it follows, but not the heading:
      // a page often puts a sentence between the two.
      if (header !== undefined) flush();
      continue;
    }
    if (isSeparator(row)) continue;

    if (header === undefined) {
      // A header is only a header if it names at least a name column and one more.
      const known = row.filter((cell) => COLUMNS[cell.toLowerCase().replace(/\s+/g, "")] !== undefined);
      if (known.length >= 2) header = row;
      continue;
    }

    const prop = toProp(header, row);
    if (prop) props.push(prop);
  }

  flush();
  return shapes;
}

// --- Enums ------------------------------------------------------------------
//
// A second kind of table the same pages carry, and the one thing a `createWidget`
// call cannot be written without. `spec.ts` already opened `ui/widget/TEXT.mdx`
// for its `Param` table and walked past the `ALIGN` and `TEXT_STYLE` tables
// directly below it — the fourth time a gap turned out to be a source already
// read for a fraction of what it holds.
//
// 19 reference pages carry 24 of these. Three things about them decide the shape
// of this code, and none is visible in the first file you open:
//
//   two owners     `align.CENTER_H` names its own symbol; `retCode` 0..10 is the
//                  domain of a value `BloodOxygen` returns and has no name you
//                  can write. The first belongs on `@zos/ui.align`, the second
//                  on the page's own symbol. The values say which — the heading
//                  does not (`### ALIGN alignment`, `## createCrypto`).
//   several owners per table
//                  `crypto/ECDSACrypto.mdx` puts `alg.*` and `ecp_dp.*` in one
//                  table, so a table maps to a list of enums, not to one.
//   partial upstream
//                  `ui/createWidget.mdx` lists one widget id, breaks the next
//                  row's markup (`| IMG\` |`) and closes with "the rest of the
//                  values are not listed". Reading that as three members would
//                  state the enum has three values. It has 42 — the samples
//                  front finds the rest, and `partial` says the table did not.

/** Column header -> the field it fills, for a `Value` table. */
const ENUM_COLUMNS: Record<string, keyof EnumMember> = {
  value: "value",
  description: "description",
  type: "type",
  api_level: "apiLevel",
};

/**
 * `align.CENTER_H`, `text_style.WRAP`, `ecp_dp.SECP192K1` — a member written the
 * way code writes it. The prefix is the enum, the suffix the member.
 *
 * The suffix must start uppercase. Every documented member does, and it keeps a
 * prose cell that happens to contain a dot from being read as a member.
 */
const QUALIFIED_MEMBER_RE = /^([a-z_][A-Za-z0-9_]*)\.([A-Z][A-Za-z0-9_]*)$/;

/** A row that says the list goes on rather than naming a value. */
const CONTINUES_RE = /^(?:\.{2,}|…)$/;

function normalizeHeader(cell: string): string {
  return cell.toLowerCase().replace(/\s+/g, "");
}

function toMember(header: string[], row: string[]): Partial<EnumMember> {
  const member: Partial<EnumMember> = {};

  header.forEach((label, index) => {
    const field = ENUM_COLUMNS[normalizeHeader(label)];
    if (field === undefined) return;

    const value = clean(row[index]);
    if (value === undefined) return;

    if (field === "apiLevel") {
      const level = Number(value);
      if (Number.isFinite(level)) member.apiLevel = level;
    } else {
      member[field] = value as never;
    }
  });

  return member;
}

/** A `Value` table's rows, before they are split between owners. */
interface ValueTable {
  heading: string | undefined;
  rows: Partial<EnumMember>[];
}

function valueTables(content: string): ValueTable[] {
  const tables: ValueTable[] = [];
  const lines = content.split("\n");

  let heading: string | undefined;
  let header: string[] | undefined;
  let rows: Partial<EnumMember>[] = [];

  const flush = () => {
    if (header !== undefined && rows.length > 0) tables.push({ heading, rows });
    header = undefined;
    rows = [];
  };

  lines.forEach((line, index) => {
    const headingMatch = line.match(SHAPE_HEADING_RE);
    if (headingMatch && line.startsWith("#")) {
      flush();
      heading = headingMatch[1].replace(/`/g, "").trim();
      return;
    }

    const row = cells(line);
    if (row === undefined) {
      if (header !== undefined) flush();
      return;
    }
    if (isSeparator(row)) return;

    if (header === undefined) {
      // A `Value` table is one whose *first* column is headed Value. Two checks,
      // and the second one is not optional: `sensor/BloodOxygen.mdx` documents a
      // `Result` shape whose first *data* row is `| value | number | ... |`, so
      // matching on the cell alone promoted a data row to a header and invented
      // an enum named `Result` with members `time` and `retCode`. A header is
      // the line a separator follows — that is the only structural difference
      // between the two, and markdown guarantees it.
      const next = cells(lines[index + 1] ?? "");
      if (normalizeHeader(row[0] ?? "") === "value" && next !== undefined && isSeparator(next)) {
        header = row;
      }
      return;
    }

    rows.push(toMember(header, row));
  });

  flush();
  return tables;
}

/**
 * Every value set the page declares.
 *
 * A table is *qualified* if any row writes its value as `enum.MEMBER`. In a
 * qualified table the rows that do not are damage, not data — `createWidget`
 * ends its widget-id table with a broken cell and a `...` — so they set
 * `partial` rather than becoming a member named after the breakage. In a bare
 * table (`retCode`, `TURN_TYPE`, weather `index`) every row is a member and the
 * heading is the only name there is.
 */
export function extractEnums(content: string): EnumSpec[] {
  const specs: EnumSpec[] = [];

  for (const { heading, rows } of valueTables(content)) {
    const named = rows.filter((row): row is Partial<EnumMember> & { value: string } =>
      row.value !== undefined,
    );
    if (named.length === 0) continue;

    const qualified = new Map<string, EnumMember[]>();
    let partial = false;

    for (const row of named) {
      const match = row.value.match(QUALIFIED_MEMBER_RE);
      if (!match) continue;
      const [, owner, member] = match;
      const members = qualified.get(owner) ?? [];
      members.push({ ...row, value: member, confidence: "OFFICIAL" });
      qualified.set(owner, members);
    }

    if (qualified.size > 0) {
      // Anything unreadable in a qualified table means the documented list is
      // shorter than the real one, which is the claim worth recording.
      partial = named.some((row) => !QUALIFIED_MEMBER_RE.test(row.value));
      for (const [name, members] of qualified) {
        specs.push({ name, qualified: true, members, ...(partial ? { partial } : {}) });
      }
      continue;
    }

    // Bare table. A trailing `...` is still a continuation marker, not a value.
    const members = named
      .filter((row) => !CONTINUES_RE.test(row.value))
      .map((row) => ({ ...row, confidence: "OFFICIAL" as const }));
    partial = members.length < named.length;

    // Nothing to key the set on. `related-resources/language-list.mdx` opens
    // with one of these — a real value domain (`getLanguage`'s return) that
    // belongs to a symbol on another page, which this front cannot resolve.
    if (heading === undefined || members.length === 0) continue;

    specs.push({ name: heading, qualified: false, members, ...(partial ? { partial } : {}) });
  }

  return specs;
}

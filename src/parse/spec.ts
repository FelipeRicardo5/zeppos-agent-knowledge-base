import type { PropSpec, ShapeSpec } from "../types.js";

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

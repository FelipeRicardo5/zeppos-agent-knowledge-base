import { readFile } from "node:fs/promises";
import path from "node:path";
import type {
  AppJsonRecord,
  CodeSnippet,
  ManifestProp,
  ManifestSection,
  Runtime,
  SymbolRecord,
} from "../types.js";

import { INDEX_FILE, cell, prepareOutDir, writePage } from "./shared.js";
import { indexSymbols, readAppJsonFile, readExampleFiles, readModuleFiles } from "../store/read.js";

// The `manifest/` view: `app.json`, the one file every Mini Program must get
// right before an API call matters.
//
// A dump of the reference page would be worth nothing — the page already exists
// upstream. This view earns its place with four joins the source cannot make:
//
//   key -> runtime      `targets.*.module.app-side` is what turns the Side
//                       Service on. Nothing upstream connects a manifest key to
//                       a runtime, so "which key ships a Settings App" is
//                       unanswerable from the docs alone.
//   documented vs real  the documented key tree, diffed against every key path
//                       in the 33 working sample manifests — in both
//                       directions. That is what surfaces `app.extType` and the
//                       `data-widget` module, which real workout extensions
//                       declare and this page never mentions.
//   permission -> symbol the permission strings that go in `permissions`, joined
//                       to the symbols whose own documentation states them. A
//                       missing permission fails at runtime, not at build.
//   undocumented keys   rows typed `object` that the page never describes. Named
//                       here rather than omitted, because `app-service` is the
//                       Background Service switch.

const MANIFEST_DIR = "manifest";

const RUNTIME_LABELS: Record<Runtime, string> = {
  "device-app": "Device App",
  "side-service": "Side Service",
  settings: "Settings App",
  watchface: "Watchface",
  "workout-extension": "Workout Extension",
};

const ALL_RUNTIMES = Object.keys(RUNTIME_LABELS) as Runtime[];

/**
 * A documented path in the shape a real file has.
 *
 * The reference page documents `targets` as a table of what each target's value
 * contains, so its own paths read `targets.module`. A real manifest names the
 * target (`targets.gtr-3.module`), and the examples front collapses that segment
 * to `*`. Inserting the same `*` here is what makes the two comparable at all.
 */
function observedShape(documentedPath: string): string {
  return documentedPath === "targets"
    ? "targets"
    : documentedPath.startsWith("targets.")
      ? `targets.*.${documentedPath.slice("targets.".length)}`
      : documentedPath;
}

function requiredLabel(prop: ManifestProp): string {
  if (prop.requiredNote) return prop.requiredNote;
  return prop.required === undefined ? "—" : prop.required ? "yes" : "no";
}

function propTable(props: ManifestProp[]): string[] {
  const lines = [
    "| Property | Type | Required | Since configVersion | Description |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const prop of props) {
    lines.push(
      `| \`${prop.name}\` | ${prop.type ? `\`${cell(prop.type)}\`` : "—"} | ${cell(requiredLabel(prop))} | ${prop.minConfigVersion ?? "—"} | ${cell(prop.description ?? "")} |`,
    );
  }
  return lines;
}

function exampleBlocks(examples: CodeSnippet[]): string[] {
  // Fenced `js`, not `json`, because that is what the page fences them as and
  // what they are: several carry `// ...` comments and a trailing comma, which
  // no JSON parser accepts. Labelling them `json` would present a block that
  // does not parse as one that does.
  return examples.flatMap((example) => [
    "```js",
    example.code.trim(),
    "```",
    `— \`${example.file}\`, line ${example.line}`,
    "",
  ]);
}

/** The sections at or under a path, in document order. */
function subtree(sections: ManifestSection[], root: string): ManifestSection[] {
  return sections.filter((s) => s.path === root || s.path.startsWith(`${root}.`));
}

function sectionMarkdown(section: ManifestSection, depth: number): string[] {
  const heading = "#".repeat(Math.min(depth + 2, 6));
  const lines = [`${heading} \`${section.path}\``, ""];

  if (section.runtime) {
    lines.push(
      `Configures the **${RUNTIME_LABELS[section.runtime]}** runtime — see [\`../runtimes/${section.runtime}.md\`](../runtimes/${section.runtime}.md).`,
      "",
    );
  }
  if (section.props.length > 0) lines.push(...propTable(section.props), "");
  else lines.push("The page states no property table for this key — only the example below.", "");

  lines.push(...exampleBlocks(section.examples));
  return lines;
}

/** One page per top-level key with a shape of its own. */
function keyPageMarkdown(record: AppJsonRecord, root: ManifestSection): string {
  const sections = subtree(record.sections, root.path);
  const lines = [
    `# \`app.json\` — \`${root.path}\``,
    "",
    `Source: \`${record.originalPath}\`. \`OFFICIAL\` — this is what the reference`,
    "page declares, not what a build was observed to accept.",
    "",
    `[Back to the manifest index](${INDEX_FILE}).`,
    "",
  ];

  for (const section of sections) {
    lines.push(...sectionMarkdown(section, section.path.split(".").length - root.path.split(".").length));
  }

  const gaps = record.gaps.filter((gap) => gap.path.startsWith(`${root.path}.`));
  if (gaps.length > 0) {
    lines.push("## Keys named here but never described", "");
    lines.push(
      "Each is typed as an object in a table above and given no section of its own",
      "anywhere on the page. The gap is upstream, not in this extraction.",
      "",
    );
    for (const gap of gaps) {
      lines.push(`- \`${gap.path}\` — ${gap.description ?? "no description"}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

interface Observed {
  /** Key path -> how many sample manifests contain it. */
  paths: Map<string, number>;
  /** Permission code -> how many sample manifests declare it. */
  permissions: Map<string, number>;
  manifests: number;
}

function indexMarkdown(
  record: AppJsonRecord,
  observed: Observed,
  symbols: Map<string, SymbolRecord>,
  pages: Map<string, string>,
): string {
  const root = record.sections.find((section) => section.path === "");
  /** Top-level sections that earned no page: rendered here or nowhere. */
  const inline = record.sections.filter(
    (section) => section.parent === "" && !pages.has(section.key),
  );
  const lines = [
    "# `app.json` — the Mini Program manifest",
    "",
    `Source: \`${record.originalPath}\`, ${record.sections.length} documented keys.`,
    "`OFFICIAL`.",
    "",
    "This file decides which runtimes an app has, which devices it installs on and",
    "which permissions it holds. Getting it wrong breaks the build or the install,",
    "before any API is reached — which is why it is here rather than left to the",
    "reference page it comes from.",
    "",
    "`docs/watchface/app-json.md` is the same page re-exported, so a watchface's",
    "manifest is documented here too.",
    "",
  ];

  if (root) {
    lines.push("## Top-level keys", "");
    lines.push(
      "| Key | Type | Required | Since configVersion | Detail | Description |",
      "| --- | --- | --- | --- | --- | --- |",
    );
    for (const prop of root.props) {
      const page = pages.get(prop.name);
      // "below" only when there really is something below: `debug` is a boolean
      // the page gives no section to at all, and pointing a reader at a section
      // that does not exist is worse than saying there is none.
      const detail = page ? `[${page}](${page})` : inline.some((s) => s.key === prop.name) ? "below" : "—";
      lines.push(
        `| \`${prop.name}\` | ${prop.type ? `\`${cell(prop.type)}\`` : "—"} | ${cell(requiredLabel(prop))} | ${prop.minConfigVersion ?? "—"} | ${detail} | ${cell(prop.description ?? "")} |`,
      );
    }
    lines.push("");
  }

  if (inline.length > 0) {
    lines.push("## The keys with no shape of their own", "");
    lines.push(
      "A string, a list or a free-form map — the page gives each of these an example",
      "and no property table, so there is nothing to tabulate and no page to open.",
      "",
    );
    for (const section of inline) {
      lines.push(`### \`${section.key}\``, "");
      lines.push(...exampleBlocks(section.examples));
    }
  }

  lines.push("## Entry points: which key turns on which runtime", "");
  lines.push(
    "The lookup this view exists for. Nothing upstream connects a manifest key to a",
    "runtime, so *\"which key do I add to ship a Side Service\"* cannot be answered",
    "from the reference page alone. Every key below sits under",
    "`targets.<target>.module`.",
    "",
    "| Key | Runtime | Required | Description |",
    "| --- | --- | --- | --- |",
  );

  const moduleSection = record.sections.find((section) => section.path === "targets.module");
  const covered = new Set<Runtime>();
  for (const prop of moduleSection?.props ?? []) {
    const keyPath = `targets.module.${prop.name}`;
    // A key with no section of its own can still have a known runtime — see the
    // note on `ManifestGap.runtime`. Falling back to it is what keeps
    // `secondary-widget` from reading as a key whose runtime nobody knows.
    const section = record.sections.find((s) => s.path === keyPath);
    const gap = record.gaps.find((g) => g.path === keyPath);
    const attributed = section?.runtime ?? gap?.runtime;
    if (attributed) covered.add(attributed);
    const runtime = attributed
      ? `[${RUNTIME_LABELS[attributed]}](../runtimes/${attributed}.md)`
      : "*not stated*";
    const shape = section ? "" : " *(shape undocumented)*";
    lines.push(
      `| \`${prop.name}\`${shape} | ${runtime} | ${cell(requiredLabel(prop))} | ${cell(prop.description ?? "")} |`,
    );
  }
  lines.push("");

  const uncovered = ALL_RUNTIMES.filter((runtime) => !covered.has(runtime));
  if (uncovered.length > 0) {
    lines.push(
      `**No documented \`module\` key reaches ${uncovered.map((r) => RUNTIME_LABELS[r]).join(", ")}.**`,
      "That is a hole in the reference page, not in this base — see the observed keys",
      "below for what shipped apps actually use.",
      "",
    );
  }

  // --- documented vs real -------------------------------------------------
  const documented = new Set<string>();
  /** A key whose section has no property table is free-form by the page's own
   * account (`i18n` is a locale map, `permissions` a string array), so its
   * children are not undocumented — they have nothing to be documented against. */
  const freeForm: string[] = [];
  // The target names themselves: `targets` is documented as "a table of what
  // each target contains", so the name segment is documented by construction.
  // Without this the collapsed `targets.*` reads as an undocumented key in 32 of
  // 33 samples, which is an artefact of the comparison, not a finding.
  documented.add("targets.*");
  for (const section of record.sections) {
    if (section.path !== "") documented.add(observedShape(section.path));
    if (section.path !== "" && section.props.length === 0) freeForm.push(observedShape(section.path));
    for (const prop of section.props) {
      documented.add(observedShape(section.path === "" ? prop.name : `${section.path}.${prop.name}`));
    }
  }

  const undocumented = [...observed.paths]
    .filter(([keyPath]) => !documented.has(keyPath))
    .filter(([keyPath]) => !freeForm.some((prefix) => keyPath.startsWith(`${prefix}.`)))
    .sort(([a], [b]) => a.localeCompare(b));

  lines.push("## Keys real manifests use that this page never mentions", "");
  lines.push(
    `Every key path in the ${observed.manifests} working sample manifests, diffed against`,
    "the documented tree above. `OBSERVED`: these come from files that build, not from",
    "a documented contract — but a key the docs omit is exactly the one an agent",
    "cannot invent.",
    "",
    "Keys under a free-form section are not listed: the page states that `i18n` is a",
    "locale map and `permissions` a list of strings, so their contents have nothing",
    "to be documented against.",
    "",
  );
  if (undocumented.length === 0) {
    lines.push("None — every key the samples use is documented.", "");
  } else {
    lines.push("| Key path | In how many samples |", "| --- | --- |");
    for (const [keyPath, count] of undocumented) {
      lines.push(`| \`${keyPath}\` | ${count} of ${observed.manifests} |`);
    }
    lines.push("");
  }

  const unused = [...documented]
    .filter((keyPath) => !observed.paths.has(keyPath))
    .sort((a, b) => a.localeCompare(b));
  if (unused.length > 0) {
    lines.push("## Documented keys no sample uses", "");
    lines.push(
      "Not a claim that they do not work — the samples are 33 apps, not the whole",
      "surface. It is a claim that this base has no working example of them, which is",
      "what an agent should be told before it writes one.",
      "",
    );
    for (const keyPath of unused) lines.push(`- \`${keyPath}\``);
    lines.push("");
  }

  // --- gaps ---------------------------------------------------------------
  if (record.gaps.length > 0) {
    lines.push("## Keys named but never described", "");
    lines.push(
      "Typed as an object in a table on the page, and given no section anywhere on",
      "it. The gap is upstream, not in this extraction. Each names a feature an",
      "agent cannot configure from the documentation alone; where a sample declares",
      "one, its real shape is in the observed keys above.",
      "",
      "| Key | Type | Description |",
      "| --- | --- | --- |",
    );
    for (const gap of record.gaps) {
      lines.push(
        `| \`${observedShape(gap.path)}\` | ${gap.type ? `\`${cell(gap.type)}\`` : "—"} | ${cell(gap.description ?? "")} |`,
      );
    }
    lines.push("");
  }

  // --- permissions --------------------------------------------------------
  // Read off the record's own field. It used to be a regex over the
  // description here, which meant this join depended on the exact wording of
  // upstream prose surviving into the rendered text.
  const needs = new Map<string, string[]>();
  for (const symbol of symbols.values()) {
    for (const code of symbol.permissions ?? []) {
      needs.set(code, [...(needs.get(code) ?? []), symbol.id]);
    }
  }

  const allPermissions = [...new Set([...needs.keys(), ...observed.permissions.keys()])].sort();
  if (allPermissions.length > 0) {
    lines.push("## `permissions`: what goes in the array", "");
    lines.push(
      "The page documents `permissions` as a list of strings and never says which",
      "strings. Two sources do: a symbol's own documentation states the permission it",
      "needs, and a working manifest declares one. Both are joined here.",
      "",
      "A permission a symbol needs and `app.json` omits fails **at runtime**, not at",
      "build — the worst class of error to hand an agent.",
      "",
      "| Permission | Symbols that state it | Samples declaring it |",
      "| --- | --- | --- |",
    );
    for (const code of allPermissions) {
      const ids = needs.get(code) ?? [];
      const symbolCell =
        ids.length === 0 ? "*none in this base*" : ids.map((id) => `\`${id}\``).join(", ");
      lines.push(
        `| \`${code}\` | ${cell(symbolCell)} | ${observed.permissions.get(code) ?? 0} of ${observed.manifests} |`,
      );
    }
    lines.push("");
  }

  lines.push("## `targets`: which devices to build for", "");
  lines.push(
    "`targets.<name>.platforms[].deviceSource` takes a device id. The ids, per",
    "device and with the API_LEVEL each device reaches, are in",
    "[`../compatibility/devices.md`](../compatibility/devices.md) — that page is the",
    "device join and is not restated here.",
    "",
  );

  if (record.completeExample) {
    lines.push("## A complete `app.json`", "");
    lines.push(
      "The page's own worked example, verbatim. It configures three devices only;",
      "the caution beside it upstream says the rest have to be added by hand.",
      "",
    );
    lines.push(...exampleBlocks([record.completeExample]));
  }

  return lines.join("\n");
}

/** Reads the sample manifests once, for the two joins that need them. */
async function readObserved(examplesDir: string): Promise<Observed> {
  const examples = await readExampleFiles(examplesDir);
  const manifests = examples.map((example) => example.manifest).filter((m) => m !== undefined);

  const paths = new Map<string, number>();
  const permissions = new Map<string, number>();
  for (const manifest of manifests) {
    for (const keyPath of manifest.keyPaths ?? []) paths.set(keyPath, (paths.get(keyPath) ?? 0) + 1);
    for (const code of manifest.permissions) {
      permissions.set(code, (permissions.get(code) ?? 0) + 1);
    }
  }

  return { paths, permissions, manifests: manifests.length };
}

/**
 * Rewrites `manifest/` from the app.json JSON, joined against the sample
 * manifests and the symbol records.
 *
 * A page per top-level key that has a shape — `app`, `runtime`, `targets`. The
 * scalar keys stay on the index: a page holding one example and no table is a
 * page a reader has to open to learn nothing.
 */
export async function renderManifest(
  appJsonFile: string,
  examplesDir: string,
  symbolsDir: string,
  outDir: string,
): Promise<{ manifestKeys: number }> {
  const record = await readAppJsonFile(appJsonFile);
  const dir = path.join(outDir, MANIFEST_DIR);
  await prepareOutDir(dir);

  if (!record) {
    await writePage(
      path.join(dir, INDEX_FILE),
      [
        "# `app.json` — the Mini Program manifest",
        "",
        "The manifest front produced no record on the last sync: the reference page",
        "was not found in the cache. This page states the gap rather than being",
        "deleted, so a missing source cannot be mistaken for a file that needs no",
        "configuration.",
      ].join("\n"),
    );
    return { manifestKeys: 0 };
  }

  const observed = await readObserved(examplesDir);
  const symbols = indexSymbols(await readModuleFiles(symbolsDir));

  // A top-level key earns a page when it has properties of its own or keys under
  // it; `configVersion` and `defaultLanguage` are one example each and stay put.
  const pages = new Map<string, string>();
  const roots = record.sections.filter(
    (section) =>
      section.parent === "" &&
      (section.props.length > 0 || record.sections.some((s) => s.parent === section.path)),
  );

  for (const root of roots) {
    const file = `${root.key}.md`;
    pages.set(root.key, file);
    await writePage(path.join(dir, file), keyPageMarkdown(record, root));
  }

  await writePage(path.join(dir, INDEX_FILE), indexMarkdown(record, observed, symbols, pages));
  return { manifestKeys: record.sections.length };
}

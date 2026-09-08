import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { CodeSnippet, ExampleRecord, Runtime, SymbolRecord } from "../types.js";
import { INDEX_FILE, cell, indexSymbols, prepareOutDir, readModuleFiles, writePage } from "./shared.js";

// The `examples/` view: the sample apps, read as answers to "how do I call this".
//
// `api/` says a symbol exists and `compatibility/` says since when. Neither says
// what to pass it, because no record carries a signature — the root finding of
// the first eval run. This view answers it the only way the sources allow: with
// code that runs, quoted verbatim and cited to its file and line.
//
// Three joins make it more than a code dump:
//
//   symbol -> apps      given a symbol from `api/`, where to see it used
//   method -> symbol    `setProperty` is never imported, so the samples front
//                       never saw it. Matching member calls by name against the
//                       symbol records surfaces it — and the page says the match
//                       is by name, not by resolved type, because it is.
//   app.json shapes     the keys, permissions and targets 33 real manifests use.
//                       Upstream documents the file; these show working ones.

const EXAMPLES_DIR = "examples";

const RUNTIME_LABELS: Record<Runtime, string> = {
  "device-app": "Device App",
  "side-service": "Side Service",
  settings: "Settings App",
  watchface: "Watchface",
  "workout-extension": "Workout Extension",
};

function runtimeLabels(runtimes: Runtime[]): string {
  return runtimes.length === 0 ? "—" : runtimes.map((r) => RUNTIME_LABELS[r]).join(", ");
}

function isExampleRecord(value: unknown): value is ExampleRecord {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ExampleRecord>;
  return (
    typeof candidate.id === "string" &&
    Array.isArray(candidate.files) &&
    Array.isArray(candidate.usages) &&
    Array.isArray(candidate.symbols)
  );
}

export async function readExampleFiles(examplesDir: string): Promise<ExampleRecord[]> {
  const files = (await readdir(examplesDir)).filter((f) => f.endsWith(".json"));
  const examples: ExampleRecord[] = [];

  for (const file of files) {
    const raw = await readFile(path.join(examplesDir, file), "utf-8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${file}: invalid JSON (${(error as Error).message})`);
    }
    if (!isExampleRecord(parsed)) {
      throw new Error(`${file}: not an example file — expected { id, files, usages, symbols }`);
    }
    examples.push(parsed);
  }

  return examples.sort((a, b) => a.id.localeCompare(b.id));
}

function snippetBlock(snippet: CodeSnippet): string[] {
  return ["```js", snippet.code, "```", `— \`${snippet.file}\`, line ${snippet.line}`, ""];
}

function exampleMarkdown(example: ExampleRecord, known: Map<string, SymbolRecord>): string {
  const lines = [`# ${example.name}`, ""];
  lines.push(
    `A ${example.tree === "application" ? "Mini Program" : example.tree.replace(/s$/, "")} sample`,
    `for platform ${example.platformVersion}. Runtimes present: ${runtimeLabels(example.runtimes)}.`,
    "",
    `Source: \`${example.originalPath}\``,
    "",
    "Every excerpt below is verbatim official sample code, cited to its file and",
    "line. This is `OBSERVED` evidence: it shows a call that works, not a",
    "documented contract.",
    "",
  );

  if (example.manifest) {
    const { manifest } = example;
    lines.push("## `app.json`", "");
    lines.push(`Top-level keys: ${manifest.keys.map((k) => `\`${k}\``).join(", ")}`, "");
    if (manifest.appType) lines.push(`\`app.appType\`: \`${manifest.appType}\``, "");
    lines.push(
      manifest.permissions.length === 0
        ? "Declares no permissions."
        : `Permissions: ${manifest.permissions.map((p) => `\`${p}\``).join(", ")}`,
      "",
    );
    if (manifest.targets.length > 0) {
      lines.push(
        `Targets: ${manifest.targets.map((t) => `\`${t}\``).join(", ")} — these key the \`assets/\` subdirectories.`,
        "",
      );
    }
  }

  const byRuntime = new Map<string, string[]>();
  for (const file of example.files) {
    const label = file.runtime ? RUNTIME_LABELS[file.runtime] : "not attributed";
    byRuntime.set(label, [...(byRuntime.get(label) ?? []), file.path]);
  }
  lines.push("## Files", "");
  for (const [label, paths] of [...byRuntime].sort()) {
    lines.push(`**${label}** — ${paths.map((p) => `\`${p}\``).join(", ")}`, "");
  }

  if (example.usages.length > 0) {
    lines.push("## Imported symbols, called", "");
    for (const usage of example.usages) {
      const record = known.get(usage.id);
      const note = record === undefined ? " *(no record in this KB)*" : "";
      lines.push(`### \`${usage.id}\`${note}`, "");
      for (const snippet of usage.snippets) lines.push(...snippetBlock(snippet));
    }
  }

  if (example.memberCalls.length > 0) {
    lines.push("## Methods called on a value", "");
    lines.push(
      "These are never imported, so no import line names their module. The name is",
      "matched against the symbol records; the receiver's type is **not** resolved,",
      "so treat the module as a strong hint rather than a fact.",
      "",
    );
    for (const call of example.memberCalls) {
      const owners = [...known.values()]
        .filter((record) => record.symbol === call.method)
        .map((record) => `\`${record.id}\``);
      lines.push(
        `### \`.${call.method}()\`${owners.length > 0 ? ` — likely ${owners.join(" or ")}` : ""}`,
        "",
      );
      for (const snippet of call.snippets) lines.push(...snippetBlock(snippet));
    }
  }

  if (example.globalCalls.length > 0) {
    lines.push("## Global calls in the phone runtimes", "");
    lines.push(
      "The Settings App and the Side Service are all globals: their files import",
      "nothing that names a module, so nothing else in this base can see these. Some",
      "have no symbol record at all — `AppSettingsPage`, which registers a settings",
      "page, is the clearest case. Here the code is the only evidence there is.",
      "",
    );
    for (const call of example.globalCalls) {
      const owners = [...known.values()]
        .filter((record) => record.symbol === call.method)
        .map((record) => `\`${record.id}\``);
      lines.push(
        `### \`${call.method}()\`${owners.length > 0 ? ` — recorded as ${owners.join(" or ")}` : " *(no record in this KB)*"}`,
        "",
      );
      for (const snippet of call.snippets) lines.push(...snippetBlock(snippet));
    }
  }

  return lines.join("\n");
}

function examplesIndexMarkdown(examples: ExampleRecord[], known: Map<string, SymbolRecord>): string {
  const lines = ["# Examples index", ""];
  lines.push(
    `**${examples.length} official sample apps**, read as code rather than as a list of`,
    "import names.",
    "",
    "`api/` says a symbol exists; `compatibility/` says since when. Neither says what",
    "to pass it, because no record carries a signature. These do, with excerpts cited",
    "to file and line — `OBSERVED` evidence of a call that works, not a documented",
    "contract.",
    "",
  );

  lines.push("| App | Type | Platform | Runtimes | Symbols | Page |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const example of examples) {
    lines.push(
      `| ${cell(example.name)} | ${example.tree} | ${example.platformVersion} | ${cell(runtimeLabels(example.runtimes))} | ${example.symbols.length} | [${example.id}.md](${example.id}.md) |`,
    );
  }

  const usedBy = new Map<string, string[]>();
  for (const example of examples) {
    for (const usage of example.usages) {
      usedBy.set(usage.id, [...(usedBy.get(usage.id) ?? []), example.id]);
    }
  }

  if (usedBy.size > 0) {
    lines.push("", "## Where a symbol is used", "");
    lines.push(
      "The lookup this view exists for: arrive with a symbol from `../api/`, leave with",
      "code that calls it.",
      "",
    );
    for (const [id, ids] of [...usedBy].sort(([a], [b]) => a.localeCompare(b))) {
      const missing = known.has(id) ? "" : " *(no record in this KB)*";
      lines.push(`- \`${id}\`${missing} — ${ids.map((e) => `[${e}](${e}.md)`).join(", ")}`);
    }
  }

  const methods = new Map<string, string[]>();
  for (const example of examples) {
    for (const call of example.memberCalls) {
      methods.set(call.method, [...(methods.get(call.method) ?? []), example.id]);
    }
  }

  if (methods.size > 0) {
    lines.push("", "## Methods called on a value", "");
    lines.push(
      "Never imported, so the samples front could not see them at all — `setProperty`",
      "is the one the eval run tripped over. Matched by name against the symbol",
      "records, with the receiver's type unresolved.",
      "",
    );
    for (const [method, ids] of [...methods].sort(([a], [b]) => a.localeCompare(b))) {
      const owners = [...known.values()]
        .filter((record) => record.symbol === method)
        .map((record) => `\`${record.id}\``)
        .join(" or ");
      lines.push(
        `- \`.${method}()\`${owners ? ` — likely ${owners}` : ""} — ${ids.map((e) => `[${e}](${e}.md)`).join(", ")}`,
      );
    }
  }

  const globals = new Map<string, string[]>();
  for (const example of examples) {
    for (const call of example.globalCalls) {
      globals.set(call.method, [...(globals.get(call.method) ?? []), example.id]);
    }
  }

  if (globals.size > 0) {
    lines.push("", "## Global calls in the phone runtimes", "");
    lines.push(
      "The Settings App and the Side Service are all globals, so their files import",
      "nothing and no other front can see this API at all. Entries marked *no record*",
      "exist only as code — `AppSettingsPage`, which registers a settings page, is the",
      "one a build cannot do without.",
      "",
    );
    for (const [method, ids] of [...globals].sort(([a], [b]) => a.localeCompare(b))) {
      const owners = [...known.values()]
        .filter((record) => record.symbol === method)
        .map((record) => `\`${record.id}\``)
        .join(" or ");
      const label = owners ? ` — recorded as ${owners}` : " *(no record in this KB)*";
      lines.push(`- \`${method}()\`${label} — ${ids.map((e) => `[${e}](${e}.md)`).join(", ")}`);
    }
  }

  const manifests = examples.map((e) => e.manifest).filter((m) => m !== undefined);
  if (manifests.length > 0) {
    const keys = new Map<string, number>();
    const permissions = new Map<string, number>();
    for (const manifest of manifests) {
      for (const key of manifest.keys) keys.set(key, (keys.get(key) ?? 0) + 1);
      for (const permission of manifest.permissions) {
        permissions.set(permission, (permissions.get(permission) ?? 0) + 1);
      }
    }

    lines.push("", "## What a real `app.json` contains", "");
    lines.push(
      `Across ${manifests.length} working manifests. Upstream documents the file;`,
      "these are files that build. The count is how many samples use each key, so a",
      "key present in all of them is not optional.",
      "",
    );
    lines.push("| Key | In how many samples |");
    lines.push("| --- | --- |");
    for (const [key, count] of [...keys].sort(([, a], [, b]) => b - a)) {
      lines.push(`| \`${key}\` | ${count} of ${manifests.length} |`);
    }

    lines.push("", "### Permissions declared", "");
    lines.push(
      "A permission a symbol needs but `app.json` omits fails at runtime, not at build.",
      "",
    );
    for (const [permission, count] of [...permissions].sort(([, a], [, b]) => b - a)) {
      lines.push(`- \`${permission}\` — ${count} sample${count === 1 ? "" : "s"}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/** Rewrites `examples/` from the example JSON, joined against the symbol JSON. */
export async function renderExamples(
  examplesDir: string,
  symbolsDir: string,
  outDir: string,
): Promise<{ examples: number }> {
  const examples = await readExampleFiles(examplesDir);
  const known = indexSymbols(await readModuleFiles(symbolsDir));

  const indexSlug = path.parse(INDEX_FILE).name;
  const claimed = examples.find((example) => example.id === indexSlug);
  if (claimed) {
    throw new Error(`Example id collision: "${claimed.name}" maps to the generated ${INDEX_FILE}`);
  }

  const dir = path.join(outDir, EXAMPLES_DIR);
  await prepareOutDir(dir);

  for (const example of examples) {
    await writePage(path.join(dir, `${example.id}.md`), exampleMarkdown(example, known));
  }
  await writePage(path.join(dir, INDEX_FILE), examplesIndexMarkdown(examples, known));

  return { examples: examples.length };
}

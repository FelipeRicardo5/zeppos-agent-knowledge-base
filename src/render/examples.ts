import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type {
  ExampleManifest,
  CodeSnippet,
  ExampleRecord,
  PlatformSelector,
  Runtime,
  SymbolRecord,
} from "../types.js";
import { INDEX_FILE, cell, prepareOutDir, writePage } from "./shared.js";
import { indexSymbols, readExampleFiles, readModuleFiles } from "../store/read.js";

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

/**
 * What a sample's `platforms[]` entries build for, in one line.
 *
 * The two generations stay apart because they are not interchangeable: a v2
 * manifest names `deviceSource` numbers and a v3 one names a screen shape, and
 * copying one form into a project using the other silently builds for nothing.
 * The numbers are grouped rather than repeated per entry — one sample lists 27.
 */
function buildsFor(selectors: PlatformSelector[]): string {
  const sources = selectors
    .map((s) => s.deviceSource)
    .filter((id): id is number => id !== undefined)
    .map((id) => `\`${id}\``);
  const screens = selectors
    .filter((s) => s.st !== undefined || s.sr !== undefined)
    .map((s) =>
      [
        ...(s.st === undefined ? [] : [`\`st: "${s.st}"\``]),
        ...(s.sr === undefined ? [] : [`\`sr: "${s.sr}"\``]),
      ].join(" + "),
    );

  return [
    ...(sources.length === 0 ? [] : [`\`deviceSource\` ${sources.join(", ")}`]),
    ...(screens.length === 0 ? [] : [screens.join(", ")]),
  ].join("; ");
}

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

/**
 * What a bare method name could be, scoped to the runtimes it was seen in.
 *
 * The receiver's type is never resolved — that would need flow analysis — so
 * this is a name match and the page says so. Two things make it less of a
 * guess than it was. Instance members are candidates now, and they are usually
 * the right answer: `.getItem()` was reported as `settings-storage.getItem`, a
 * Settings App function, in six Device App samples where it is
 * `localStorage.getItem`. And a candidate from another runtime is dropped,
 * because `hmUI.setProperty` is not a reading of a call in a Device App.
 *
 * Where several survive, they are all listed. `../conflicts/index.md` collects
 * those, because a page that names one winner is asserting something this base
 * cannot check.
 */
function callCandidates(
  method: string,
  runtimes: Runtime[],
  known: Map<string, SymbolRecord>,
): { symbols: string[]; members: string[] } {
  const inScope = (record: SymbolRecord) =>
    record.runtimes.length === 0 || record.runtimes.some((r) => runtimes.includes(r));

  const records = [...known.values()].filter(inScope);
  return {
    symbols: records.filter((r) => r.symbol === method).map((r) => `\`${r.id}\``),
    members: records
      .filter((r) => (r.members ?? []).some((m) => m.name === method))
      .map((r) => `\`${r.id}\``),
  };
}

/** How a member call is labelled: one candidate is a hint, several are a warning. */
function callLabel(method: string, runtimes: Runtime[], known: Map<string, SymbolRecord>): string {
  const { symbols, members } = callCandidates(method, runtimes, known);
  const all = [...symbols, ...members];

  if (all.length === 0) return " *(no record in this KB)*";
  if (all.length === 1) return ` — ${all[0]}`;

  const parts = [
    ...(symbols.length > 0 ? [`module ${symbols.join(" or ")}`] : []),
    ...(members.length > 0 ? [`called on ${members.join(" or ")}`] : []),
  ];
  return ` — **ambiguous**: ${parts.join("; ")}`;
}

function snippetBlock(snippet: CodeSnippet): string[] {
  return ["```js", snippet.code, "```", `— \`${snippet.file}\`, line ${snippet.line}`, ""];
}

/**
 * How this app's runtimes pass messages, as observations rather than as a graph.
 *
 * An eval run wrote `this.request({method, params})` where this corpus writes
 * `{type, params}` in twelve places. Nothing was missing from the samples; the
 * pieces were simply never put beside each other.
 *
 * Putting them beside each other is the risk this section manages. There is no
 * arrow and no "from → to": nothing in these files links a call to a handler —
 * no import, no shared symbol, no type — so an edge would be this base asserting
 * something no source states. What is observable is that both sites write the
 * same literal, and the section says that is the only thing grouping them. The
 * reader draws the conclusion, holding both citations.
 */
function wiringLines(example: ExampleRecord): string[] {
  const crossRuntime = (example.messages ?? []).filter(
    (message) =>
      new Set(message.sites.map((site) => site.runtime).filter(Boolean)).size > 1,
  );
  if (crossRuntime.length === 0 && (example.messageShapes ?? []).length === 0) return [];

  const lines = ["## Messages passed between runtimes", ""];
  lines.push(
    "Sites that write the same string literal in more than one of this app's",
    "runtimes. **That shared literal is the only thing grouping them** — no import,",
    "symbol or declaration in these files connects a call to a handler, so nothing",
    "below says one reaches the other. Both citations are here; the conclusion is",
    "the reader's.",
    "",
  );

  for (const message of crossRuntime) {
    lines.push(`### \`"${message.value}"\``, "");
    for (const site of message.sites) {
      lines.push(
        `**${site.runtime ?? "runtime not attributed"}** — ${site.position}`,
        "",
        "```js",
        site.code,
        "```",
        `— \`${site.file}\`, line ${site.line}`,
        "",
      );
    }
  }

  const shapes = example.messageShapes ?? [];
  if (shapes.length > 0) {
    lines.push("### What a message carries", "");
    lines.push(
      "Verbatim lines, never a synthesised signature: a type nothing declares would",
      "be this base inventing one.",
      "",
    );
    for (const site of shapes) {
      lines.push("```js", site.code, "```", `— \`${site.file}\`, line ${site.line}`, "");
    }
  }

  return lines;
}

/**
 * What the app calls itself, when it says anything.
 *
 * The page is titled by the directory, which is what every citation uses. The
 * two disagree often enough to be worth showing: one watchface directory named
 * `simple` holds an app called `chatGPT-demo`.
 */
function identityLine(example: ExampleRecord): string[] {
  const identity = example.manifest?.identity;
  if (identity === undefined || identity.appName === undefined) return [];

  const described = identity.description === undefined ? "" : ` — ${identity.description}`;
  return [`**${identity.appName}**${described}`, ""];
}

/**
 * The version range the app declares it installs on.
 *
 * `runtime.apiVersion` decides whether an app installs at all, and an eval run
 * invented `"4.2.0"` for it. Every sample writes the API_LEVEL itself.
 */
function apiVersionLine(manifest: ExampleManifest): string[] {
  const parts = (["target", "minVersion", "compatible"] as const)
    .map((field) => [field, manifest.values[`runtime.apiVersion.${field}`] ?? []] as const)
    .filter(([, values]) => values.length > 0)
    .map(([field, values]) => `${field} ${values.map((value) => `\`${value}\``).join(" / ")}`);

  if (parts.length === 0) return ["States no `runtime.apiVersion`.", ""];

  return [
    `Installs on: ${parts.join(", ")} — this field is the API_LEVEL, not a semver.`,
    "",
  ];
}

/** Which of the two manifest layouts this file uses, and where that puts things. */
function layoutLine(manifest: ExampleManifest): string[] {
  return [
    manifest.layout === "flat"
      ? "Layout: `flat` — `module` and `platforms` sit at the top level and there is no `targets` key. See [`../manifest/index.md`](../manifest/index.md)."
      : "Layout: `targets` — `module` and `platforms` sit under each target key.",
    "",
  ];
}

/**
 * Which file each `module` key turns on.
 *
 * The join nothing upstream states. A manifest writes an extensionless path and
 * the loader supplies the extension, so a reader copying this layout has to
 * know both halves; getting it wrong breaks the build before any API runs. The
 * runtime column is the project's own path rule applied to the resolved file,
 * which is how a `setting/` entry is named the Settings App rather than guessed.
 */
function entryPointLines(manifest: ExampleManifest): string[] {
  if (manifest.entryPoints.length === 0) {
    return [
      "## Entry points",
      "",
      "This manifest declares no `module` path, so nothing here says which file runs.",
      "",
    ];
  }

  const lines = [
    "## Entry points",
    "",
    "Which file each `module` key turns on. The manifest writes the path without",
    "an extension and the loader supplies it; the file column is that resolution",
    "against this app's own files.",
    "",
    "| `module` | Declared | Form | File | Runtime | Target |",
    "| --- | --- | --- | --- | --- | --- |",
  ];

  for (const entry of manifest.entryPoints) {
    lines.push(
      `| \`${entry.module}\` | \`${entry.path}\` | \`${entry.shape}\` | ` +
        (entry.file === undefined ? "**no file matches**" : `\`${entry.file}\``) +
        ` | ${entry.runtime === undefined ? "—" : RUNTIME_LABELS[entry.runtime]} | ` +
        `${entry.target === undefined ? "—" : `\`${entry.target}\``} |`,
    );
  }
  lines.push("");

  if (manifest.entryPoints.some((entry) => entry.file === undefined)) {
    lines.push(
      "A declared path matching no file is left as it stands. Every path in the",
      "sample corpus resolves, so this one is a finding rather than a gap in what",
      "was read.",
      "",
    );
  }

  return lines;
}

/**
 * Directories some manifest in the corpus names with a `module` key.
 *
 * Derived rather than listed. A hand-written list of "runtime directories"
 * would be a second source of truth beside the manifests, and it would be the
 * one that goes stale when upstream adds a key — which is how the
 * `data-widget` key stayed invisible while six samples shipped one.
 */
function entryDirectories(examples: ExampleRecord[]): Set<string> {
  return new Set(
    examples.flatMap((example) =>
      (example.manifest?.entryPoints ?? []).map((entry) => entry.path.split("/")[0]),
    ),
  );
}

/**
 * Code sitting in a directory that some app turns on with a `module` key, which
 * *this* app never names.
 *
 * The other direction of the entry-point diff, and the direction that has held
 * every finding since `manifest/`. Files nothing turns on still ship, still
 * read as part of the sample, and are the easiest thing for a reader to copy.
 */
function unreachedDirectories(example: ExampleRecord, entryDirs: Set<string>): string[] {
  const reached = new Set((example.manifest?.entryPoints ?? []).map((entry) => entry.path.split("/")[0]));
  const present = new Set(
    example.files.map((file) => file.path.split("/")[0]).filter((dir) => dir.includes(".") === false),
  );

  return [...present].filter((dir) => entryDirs.has(dir) && !reached.has(dir)).sort();
}

function exampleMarkdown(
  example: ExampleRecord,
  known: Map<string, SymbolRecord>,
  entryDirs: Set<string>,
): string {
  const lines = [`# ${example.name}`, ""];
  lines.push(...identityLine(example));
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
    if (manifest.identity.extType) {
      lines.push(`\`app.extType\`: \`${manifest.identity.extType}\` — what \`appType\` alone does not say.`, "");
    }
    lines.push(...apiVersionLine(manifest));
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
    // Named right after the target keys, because a key like
    // `320x380-amazfit-bip-5` reads as a device identifier and is not one:
    // upstream calls these names arbitrary. This is the line that says which
    // hardware the sample actually builds for.
    if (manifest.platforms.length > 0) {
      const version = manifest.configVersion;
      lines.push(
        `Builds for: ${buildsFor(manifest.platforms)}` +
          (version === undefined ? "" : ` (\`configVersion\` \`${version}\`)`) +
          ". See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.",
        "",
      );
    }
  }

  const byRuntime = new Map<string, string[]>();
  for (const file of example.files) {
    const label = file.runtime ? RUNTIME_LABELS[file.runtime] : "not attributed";
    byRuntime.set(label, [...(byRuntime.get(label) ?? []), file.path]);
  }
  if (example.manifest) {
    lines.push(...layoutLine(example.manifest));
    lines.push(...entryPointLines(example.manifest));

    const unreached = unreachedDirectories(example, entryDirs);
    if (unreached.length > 0) {
      lines.push(
        `Holds code under ${unreached.map((dir) => `\`${dir}/\``).join(", ")}, which other samples turn on with a ` +
          "`module` key and this manifest never names. Those files ship and nothing runs them.",
        "",
      );
    }
  }

  lines.push("## Files", "");
  for (const [label, paths] of [...byRuntime].sort()) {
    lines.push(`**${label}** — ${paths.map((p) => `\`${p}\``).join(", ")}`, "");
  }

  lines.push(...wiringLines(example));

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
      "matched against the symbol records, narrowed to this sample's runtimes; the",
      "receiver's type is **not** resolved, so treat the match as a hint rather than",
      "a fact. Where several candidates survive the row says **ambiguous** and names",
      "them all — see [`../conflicts/index.md`](../conflicts/index.md).",
      "",
    );
    for (const call of example.memberCalls) {
      lines.push(`### \`.${call.method}()\`${callLabel(call.method, example.runtimes, known)}`, "");
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

/**
 * The family view, and the two ways it disagrees with the tree.
 *
 * A family is the only statement that HelloWorld at four platform versions is
 * one app four times, and that ShowCase, `3.0-feature` and `4.0-feature` are one
 * family under three directory names sharing no substring. It comes from the
 * samples README, which is a hand-maintained list beside a directory tree — so
 * it is read here as evidence, and diffed against the tree in both directions.
 */
/**
 * A key that reads two records as the same app.
 *
 * The family when the README lists one, the directory name otherwise, folded
 * because the two spell it differently: the README writes `Timer` and the
 * directory `timer`. Without the fold, `watchface/1.0/timer` and
 * `watchface/3.0/timer` — one app at two versions — read as two apps that
 * happen to share a description.
 */
function sameApp(example: ExampleRecord): string {
  return (example.family ?? example.name).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function catalogueLines(examples: ExampleRecord[]): string[] {
  const lines: string[] = [];

  const byFamily = new Map<string, ExampleRecord[]>();
  for (const example of examples) {
    if (example.family === undefined) continue;
    const key = `${example.category} / ${example.family}`;
    byFamily.set(key, [...(byFamily.get(key) ?? []), example]);
  }

  const versioned = [...byFamily].filter(([, apps]) => apps.length > 1).sort(([a], [b]) => a.localeCompare(b));

  if (versioned.length > 0) {
    lines.push(
      "",
      "## The same app, across platform versions",
      "",
      "Where a family has more than one version, the newest is the one written",
      "against the current API and the older ones show what the same task looked",
      "like before it. Nothing in a directory name says these are the same app.",
      "",
      "| Family | Versions |",
      "| --- | --- |",
    );
    for (const [family, apps] of versioned) {
      const sorted = [...apps].sort((a, b) => a.platformVersion.localeCompare(b.platformVersion));
      lines.push(
        `| ${cell(family)} | ${sorted.map((app) => `[${app.platformVersion}](${app.id}.md)`).join(" · ")} |`,
      );
    }
  }

  const unlisted = examples.filter((example) => example.family === undefined);
  if (unlisted.length > 0) {
    lines.push(
      "",
      "## Samples the README does not list",
      "",
      `${unlisted.length} of the ${examples.length} sample directories are linked from nowhere in the`,
      "samples README, so a reader working from that list never learns they exist.",
      "They are here because this base reads the tree, not the list.",
      "",
    );
    for (const example of unlisted) {
      const says = example.manifest?.identity?.description ?? example.manifest?.identity?.appName;
      lines.push(`- [${example.name}](${example.id}.md) — \`${example.originalPath}\`${says === undefined ? "" : ` — ${says}`}`);
    }
    lines.push("");
  }

  // Two apps writing the same description is the description saying nothing.
  // Grouped by family, falling back to the directory name: an app the README
  // never lists has no family, and `watchface/1.0/timer` and `watchface/3.0/timer`
  // are one app at two versions rather than two apps sharing a description.
  // Worth naming, because the column above reads as identification and for
  // these rows it is not.
  const byDescription = new Map<string, ExampleRecord[]>();
  for (const example of examples) {
    const description = example.manifest?.identity?.description;
    if (description === undefined) continue;
    byDescription.set(description, [...(byDescription.get(description) ?? []), example]);
  }
  const shared = [...byDescription]
    .filter(([, apps]) => new Set(apps.map((app) => sameApp(app))).size > 1)
    .sort(([a], [b]) => a.localeCompare(b));

  const silent = examples.filter((example) => example.manifest?.identity?.description === undefined);

  if (shared.length > 0 || silent.length > 0) {
    lines.push("", "### Where the description identifies nothing", "");
    for (const [description, apps] of shared) {
      lines.push(
        `- \`${description}\` is written by ${apps.length} unrelated apps: ${apps.map((app) => `[${app.name}](${app.id}.md)`).join(", ")}`,
      );
    }
    if (silent.length > 0) {
      lines.push(
        `- ${silent.length} state no description at all: ${silent.map((app) => `[${app.name}](${app.id}.md)`).join(", ")}`,
      );
    }
    lines.push("");
  }

  return lines;
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

  lines.push(
    "An agent starting a task asks which whole sample is closest before it asks",
    "what any symbol does. The columns below are what that question needs: what the",
    "app says it is, which family it belongs to, and which `module` keys it",
    "declares — the keys are the app's architecture, since each one turns on a",
    "runtime and names the file that runs.",
    "",
  );
  lines.push("| App | Says it is | Family | Platform | Runtimes | `module` keys | Symbols |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");
  for (const example of examples) {
    const identity = example.manifest?.identity;
    const says = identity?.description ?? identity?.appName ?? "—";
    const family = example.family === undefined ? "*not listed*" : `${example.family} (${example.category})`;
    const modules = [...new Set((example.manifest?.entryPoints ?? []).map((entry) => entry.module))].sort();

    lines.push(
      `| [${cell(example.name)}](${example.id}.md) | ${cell(says)} | ${cell(family)} | ` +
        `${example.platformVersion} | ${cell(runtimeLabels(example.runtimes))} | ` +
        `${modules.length === 0 ? "—" : modules.map((m) => `\`${m}\``).join(", ")} | ${example.symbols.length} |`,
    );
  }

  lines.push(...catalogueLines(examples));

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
      "records and narrowed to the runtimes the call was seen in, with the receiver's",
      "type unresolved. **ambiguous** means several candidates survive that narrowing;",
      "[`../conflicts/index.md`](../conflicts/index.md) collects them.",
      "",
    );
    for (const [method, ids] of [...methods].sort(([a], [b]) => a.localeCompare(b))) {
      // Scoped to the runtimes of the samples this call was actually seen in,
      // for the same reason the per-app pages are: a Device App's
      // `.setProperty()` is not `hmUI.setProperty`.
      const runtimes = [
        ...new Set(examples.filter((e) => ids.includes(e.id)).flatMap((e) => e.runtimes)),
      ];
      lines.push(
        `- \`.${method}()\`${callLabel(method, runtimes, known)} — ${ids.map((e) => `[${e}](${e}.md)`).join(", ")}`,
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

  const entryDirs = entryDirectories(examples);
  for (const example of examples) {
    await writePage(path.join(dir, `${example.id}.md`), exampleMarkdown(example, known, entryDirs));
  }
  await writePage(path.join(dir, INDEX_FILE), examplesIndexMarkdown(examples, known));

  return { examples: examples.length };
}

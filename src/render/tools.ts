import { readFile } from "node:fs/promises";
import path from "node:path";
import type { AppJsonRecord, Runtime, SymbolRecord, ToolsRecord } from "../types.js";
import { INDEX_FILE, cell, prepareOutDir, readModuleFiles, writePage } from "./shared.js";

// The `tools/` view: how to build and run the thing the rest of this base helps
// you write.
//
// It was the last empty output directory, and the question it answers is the
// last one of every task — an agent that has just written an app could not say
// how to get it onto a watch.
//
// Three joins, each against evidence the base already holds, because a page
// that only listed the CLI's commands would be a copy of the CLI page:
//
//   scaffold -> runtime   `zeus create` writes `app-side/`, `setting/` and
//                         `pages/`, and those are the directory names
//                         `runtimeForAppFile` already reads. So the tree the
//                         CLI produces is labelled by the project's own rule
//                         rather than by a new one.
//   scaffold -> app.json  the same directories are what a `module` key turns
//                         on. Nothing upstream connects the question the CLI
//                         asks to the key it writes, and getting that wrong
//                         breaks a build before any API runs.
//   package -> symbols    ZML is the first package the docs recommend, and the
//                         base holds 11 `@zeppos/zml` symbols whose only
//                         evidence was an import line in a sample.

const TOOLS_DIR = "tools";

const RUNTIME_LABELS: Record<Runtime, string> = {
  "device-app": "Device App",
  "side-service": "Side Service",
  settings: "Settings App",
  watchface: "Watchface",
  "workout-extension": "Workout Extension",
};

/**
 * The `module` key that turns on a runtime, from the app.json record.
 *
 * Read off `ManifestSection.runtime`, which the manifest front already
 * attributes — so the join is between two extracted facts rather than a table
 * written here.
 */
function moduleKeyFor(runtime: Runtime, appJson: AppJsonRecord | undefined): string | undefined {
  const section = appJson?.sections.find((s) => s.runtime === runtime && s.path.includes("module."));
  if (section) return section.path;
  return appJson?.gaps.find((g) => g.runtime === runtime)?.path;
}

/** `@zeppos/zml/base-page` and friends, for the ZML row. */
function symbolsForPackage(name: string, symbols: SymbolRecord[]): SymbolRecord[] {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (slug.length < 3) return [];
  return symbols.filter((record) => record.module.toLowerCase().replace(/[^a-z0-9]/g, "").includes(slug));
}

function toolsMarkdown(
  tools: ToolsRecord | undefined,
  appJson: AppJsonRecord | undefined,
  symbols: SymbolRecord[],
): string {
  const lines = ["# Tools", ""];

  if (tools === undefined) {
    lines.push(
      "**Nothing extracted.** The tools front produced no record, so this base",
      "cannot say how to build or run a Mini Program. That is a coverage gap and",
      "not a statement that no tooling is needed — `guides/tools/` upstream",
      "documents a CLI, a simulator and a set of packages.",
      "",
    );
    return lines.join("\n");
  }

  lines.push(
    "The last question of every task, and the one the rest of this base does not",
    "answer: the app is written, now how does it run?",
    "",
    `Source: ${tools.originalPaths.map((p) => `\`${p}\``).join(", ")}. \`${tools.confidence}\`.`,
    "",
    "**Not covered, on purpose.** Twelve of the 23 pages under `guides/tools/` are",
    "walkthroughs of the Watchface Maker, a no-code web editor: no `hm*` API between",
    "them and one code fence, which is a directory listing. An agent cannot drive a",
    "web GUI, so they are out of scope rather than pending. A watchface written as",
    "code is `runtimes/watchface.md` and `api/hmUI.md`.",
    "",
  );

  lines.push("## Commands", "");
  lines.push("| Command | What it does |");
  lines.push("| --- | --- |");
  for (const command of tools.commands) {
    lines.push(`| \`${cell(command.name)}\` | ${command.summary === undefined ? "—" : cell(command.summary)} |`);
  }
  lines.push("");

  for (const command of tools.commands) {
    if (command.snippets.length === 0) continue;
    lines.push(`### \`${cell(command.name)}\``, "");
    for (const snippet of command.snippets) {
      lines.push("```sh", snippet.code, "```", `— \`${snippet.file}\`, line ${snippet.line}`, "");
    }
  }

  if (tools.prompts.length > 0) {
    lines.push("## What `zeus create` asks", "");
    lines.push(
      "Verbatim, because each answer writes a key into `app.json` and the CLI page",
      "never says which. The join is below.",
      "",
    );
    for (const prompt of tools.prompts) lines.push(`- \`${cell(prompt)}\``);
    lines.push("");
  }

  if (tools.scaffold.length > 0) {
    lines.push("## What it scaffolds, and which runtime each file is", "");
    lines.push(
      "The runtime column is **derived**, not stated: the CLI page draws the tree and",
      "says nothing about runtimes, and these are the same directory names",
      "[`src/parse/runtime.ts`](../src/parse/runtime.ts) reads to attribute every",
      "symbol in this base. The `app.json` column is the `module` key that turns each",
      "runtime on — get it wrong and the build fails before any API runs.",
      "",
    );
    lines.push("| Scaffolded file | Runtime | Turned on by |");
    lines.push("| --- | --- | --- |");
    for (const entry of tools.scaffold) {
      const key = moduleKeyFor(entry.runtime, appJson);
      lines.push(
        `| \`${cell(entry.name)}\` | [${RUNTIME_LABELS[entry.runtime]}](../runtimes/${entry.runtime}.md) | ` +
          `${key === undefined ? "—" : `[\`${key}\`](../manifest/targets.md)`} |`,
      );
    }
    lines.push("");

    const scaffolded = new Set(tools.scaffold.map((e) => e.runtime));
    const missing = (Object.keys(RUNTIME_LABELS) as Runtime[]).filter((r) => !scaffolded.has(r));
    if (missing.length > 0) {
      lines.push(
        `The default template scaffolds three of the five runtimes. ` +
          `${missing.map((r) => RUNTIME_LABELS[r]).join(" and ")} ` +
          `${missing.length === 1 ? "is" : "are"} not in it — the prompts offer other templates, and ` +
          "the pages above say what each runtime needs in `app.json`.",
        "",
      );
    }
  }

  if (tools.packages.length > 0) {
    lines.push("## Packages the docs recommend", "");
    lines.push(
      "The confidence tier is read from the heading each package sits under —",
      "*Officially maintained* against *Community works*. `RECOMMENDED` and",
      "`COMMUNITY` were reserved when this base was designed and described as",
      "needing a manual curation pass; this page is the first source that states",
      "one, so they are derived like everything else.",
      "",
    );
    lines.push("| Package | Tier | Symbols in this base | What it is |");
    lines.push("| --- | --- | --- | --- |");
    for (const pkg of tools.packages) {
      const owned = symbolsForPackage(pkg.name, symbols);
      const modules = [...new Set(owned.map((r) => r.module))];
      lines.push(
        `| ${pkg.url === undefined ? cell(pkg.name) : `[${cell(pkg.name)}](${pkg.url})`} | ` +
          `${pkg.confidence} | ` +
          `${modules.length === 0 ? "—" : `${owned.length} in ${modules.length} module${modules.length === 1 ? "" : "s"}`} | ` +
          `${pkg.description === undefined ? "—" : cell(pkg.description)} |`,
      );
    }
    lines.push(
      "",
      "**A dash in the symbols column means this base holds nothing for that",
      "package** — not that it has no API. Only the packages a sample app imports",
      "reach the symbol records at all, and the extractor reads no package's own",
      "source.",
      "",
    );
  }

  return lines.join("\n");
}

async function readTools(file: string): Promise<ToolsRecord | undefined> {
  try {
    const parsed = JSON.parse(await readFile(file, "utf-8"));
    return parsed === null ? undefined : (parsed as ToolsRecord);
  } catch {
    return undefined;
  }
}

async function readAppJson(file: string): Promise<AppJsonRecord | undefined> {
  try {
    const parsed = JSON.parse(await readFile(file, "utf-8"));
    return parsed === null ? undefined : (parsed as AppJsonRecord);
  } catch {
    return undefined;
  }
}

export async function renderTools(
  toolsFile: string,
  appJsonFile: string,
  symbolsDir: string,
  outDir: string,
): Promise<{ commands: number }> {
  const tools = await readTools(toolsFile);
  const appJson = await readAppJson(appJsonFile);
  const symbols = (await readModuleFiles(symbolsDir)).flatMap((m) => m.symbols);

  const dir = path.join(outDir, TOOLS_DIR);
  await prepareOutDir(dir);
  await writePage(path.join(dir, INDEX_FILE), toolsMarkdown(tools, appJson, symbols));

  return { commands: tools?.commands.length ?? 0 };
}

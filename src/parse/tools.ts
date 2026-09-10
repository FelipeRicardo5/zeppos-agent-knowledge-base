import path from "node:path";
import type { CodeSnippet, RawTools, ScaffoldEntry, ToolCommand, ToolPackage } from "../types.js";
import { runtimeForAppFile } from "./runtime.js";
import { readSource } from "./util.js";

/** Cache-relative paths come out with the host separator; citations are posix. */
function toPosixPath(file: string): string {
  return file.split(path.sep).join("/");
}

// Front 10: guides/tools/ — the Zeus CLI, the simulator and the npm packages.
//
// The last empty output directory, and the last question of every task: *how do
// I build and run this?* An agent that has just written an app could not tell
// anyone how to get it onto a watch.
//
// What the reading changed about the item. It was filed as "23 files, lowest
// knowledge value left". Twelve of the 23 are Watchface Maker walkthroughs — a
// no-code web GUI, zero `hm*` references between them, one code fence which is
// a directory listing — so they are documentation for a different product and
// an agent cannot drive a GUI. They are skipped, not deprioritised. The other
// eleven are the CLI, the simulator and the package list, and they answer a
// question nothing else here does.
//
// Two format notes, both from reading rather than guessing:
//
//   the command headings carry the command
//                 `## \`zeus create\` Create project` — the name is in
//                 backticks and the rest of the heading is a title, so the
//                 backticked span is the name and the remainder is dropped.
//   the scaffold is box-drawing art
//                 the `tree` fence uses `├──`, `└──` and `│`, and the prefix
//                 width is the depth. Reading names without rebuilding the
//                 paths looked cheaper and was wrong: the tree lists `index.js`
//                 three times at three depths, and it labelled the project root
//                 a Device App directory, which no source says. The paths are
//                 rebuilt, the example project name is dropped, and only leaves
//                 are attributed.

/** `## `zeus create` Create project` — the backticked span is the command. */
const COMMAND_HEADING_RE = /^##\s+`(zeus[^`]*)`/;

/** Any `##` heading, to close a command's region. */
const HEADING_RE = /^(#{2,3})\s+(.+?)\s*$/;

/** A fenced block, with its language. */
const FENCE_RE = /^```(\w*)/;

/** `? Which kind of template application need to created? Empty` — a CLI prompt. */
const PROMPT_RE = /^\?\s+(.+)$/;

/**
 * A line of the `tree` fence: the box-drawing prefix, then a name.
 *
 * The prefix is captured because its width is the depth — the fence indents by
 * four columns per level — and the depth is what turns a bare `index.js` into
 * `pages/example/index.js`. Without the path there is nothing to attribute: the
 * tree lists `index.js` three times at three depths, and calling the project
 * root a Device App directory, which is what a name-only read did, is not a
 * claim any source makes.
 */
const TREE_LINE_RE = /^([\s│├└─]*)[├└]──\s*(.+?)\s*$/;

/** `### [ZML](https://github.com/zepp-health/zml)` — a package and its home. */
const PACKAGE_HEADING_RE = /^###\s+\[([^\]]+)\]\(([^)]+)\)/;

/** `### [zeppos-fx](...) from [XiaomaiTX](...)` — the community form. */
const PACKAGE_SUFFIX_RE = /\s+from\s+\[[^\]]*\]\([^)]*\)\s*$/;

function fenceBlocks(lines: string[], from: number, to: number, file: string): CodeSnippet[] {
  const snippets: CodeSnippet[] = [];
  let open: { at: number; language: string; body: string[] } | undefined;

  for (let at = from; at < to; at += 1) {
    const fence = lines[at].trim().match(FENCE_RE);
    if (fence) {
      if (open) {
        // A `tree` fence is left out: the scaffold table already carries it,
        // attributed to a runtime, and a second copy tagged `sh` would be
        // both a duplicate and mislabelled.
        if (open.language !== "tree") {
          const code = open.body.join("\n").trim();
          if (code.length > 0) snippets.push({ file, line: open.at + 1, code });
        }
        open = undefined;
      } else {
        open = { at, language: fence[1], body: [] };
      }
      continue;
    }
    open?.body.push(lines[at]);
  }

  return snippets.filter((s) => s.code.length > 0);
}

/** Prose between a heading and whatever follows: the command's own summary. */
function summaryAfter(lines: string[], from: number, to: number): string | undefined {
  const prose: string[] = [];

  for (let at = from; at < to; at += 1) {
    const line = lines[at].trim();
    if (line.startsWith("```") || line.startsWith("#")) break;
    if (line.startsWith(":::") || line.length === 0) continue;
    prose.push(line);
  }

  return prose.length > 0 ? prose.join(" ") : undefined;
}

function parseCli(content: string, file: string): {
  commands: ToolCommand[];
  prompts: string[];
  scaffold: ScaffoldEntry[];
} {
  const lines = content.split("\n");
  const starts: number[] = [];
  lines.forEach((line, at) => {
    if (COMMAND_HEADING_RE.test(line)) starts.push(at);
  });

  const commands: ToolCommand[] = [];
  starts.forEach((start, nth) => {
    let end = starts[nth + 1] ?? lines.length;
    // A command's region ends at the next command *or* the next `##` of any
    // kind, so trailing sections do not get filed under the last command.
    for (let at = start + 1; at < end; at += 1) {
      const heading = lines[at].match(HEADING_RE);
      if (heading && heading[1].length === 2) {
        end = at;
        break;
      }
    }

    commands.push({
      name: (lines[start].match(COMMAND_HEADING_RE) as RegExpMatchArray)[1].trim(),
      summary: summaryAfter(lines, start + 1, end),
      snippets: fenceBlocks(lines, start, end, file),
    });
  });

  const prompts = lines
    .map((line) => line.trim().match(PROMPT_RE)?.[1])
    .filter((prompt): prompt is string => prompt !== undefined);

  // Full paths out of the `tree` fence. The depth comes from the prefix width,
  // four columns per level, and the first line is the project root rather than
  // a file in it.
  const paths: string[] = [];
  const stack: string[] = [];
  let inTree = false;

  for (const line of lines) {
    const fence = line.trim().match(FENCE_RE);
    if (fence) {
      inTree = fence[1] === "tree";
      if (inTree) stack.length = 0;
      continue;
    }
    if (!inTree) continue;

    const entry = line.match(TREE_LINE_RE);
    if (!entry) continue;
    // `# a comment` — the tree annotates some lines.
    const name = entry[2].split(/\s{2,}#/)[0].trim();
    if (name.length === 0) continue;

    const depth = Math.floor(entry[1].length / 4);
    stack.length = depth;
    stack[depth] = name;
    paths.push(stack.slice(0, depth + 1).join("/"));
  }

  // Only the leaves are attributed. A directory's runtime is whatever its
  // files' is, and `runtimeForAppFile` is documented as answering for a file.
  const scaffold = [...new Set(paths)]
    // `app.json` is configuration, not code: it belongs to no runtime, and
    // `runtimeForAppFile` would call it a Device App file because that is
    // its documented default. `manifest/` is where it is answered.
    .filter((entry) => /\.[a-z]+$/.test(entry) && !entry.endsWith("app.json"))
    // The first segment is the example project's own name, which the page
    // invites the reader to change. What is left is app-relative, which is what
    // `runtimeForAppFile` is documented against.
    .map((entry) => entry.split("/").slice(1).join("/"))
    .filter((entry) => entry.length > 0)
    .sort()
    .map((name) => ({ name, runtime: runtimeForAppFile(name) }));

  return { commands, prompts, scaffold };
}

function parsePackages(content: string): ToolPackage[] {
  const lines = content.split("\n");
  const packages: ToolPackage[] = [];
  // `## Officially maintained npm package` vs `## Community works`. The tier is
  // the heading, which is the first thing in the corpus that states one.
  let tier: ToolPackage["confidence"] = "RECOMMENDED";

  lines.forEach((line, at) => {
    const section = line.match(/^##\s+(.+)$/);
    if (section) {
      tier = /community/i.test(section[1]) ? "COMMUNITY" : "RECOMMENDED";
      return;
    }

    const heading = line.match(PACKAGE_HEADING_RE);
    if (!heading) return;

    const prose: string[] = [];
    for (let next = at + 1; next < lines.length; next += 1) {
      const text = lines[next].trim();
      if (text.startsWith("#")) break;
      // Illustrations are JSX on this page, and one package's description is
      // three paragraphs; the first is the one that describes it.
      if (text.startsWith("<") || text.startsWith("import ")) continue;
      if (text.length === 0) {
        if (prose.length > 0) break;
        continue;
      }
      prose.push(text);
    }

    packages.push({
      name: heading[1].replace(PACKAGE_SUFFIX_RE, "").trim(),
      url: heading[2],
      ...(prose.length > 0 ? { description: prose.join(" ") } : {}),
      confidence: tier,
    });
  });

  return packages;
}

export async function parseTools(cacheDir: string): Promise<RawTools[]> {
  const toolsDir = path.join(cacheDir, "zeppos-docs", "docs", "guides", "tools");
  const cliFile = path.join(toolsDir, "cli", "index.md");
  const npmFile = path.join(toolsDir, "npm", "officially-recommended.mdx");

  let cliContent: string;
  let npmContent: string;
  try {
    cliContent = await readSource(cliFile);
    npmContent = await readSource(npmFile);
  } catch {
    // A missing page is a coverage gap for the render to state, not a reason to
    // fail a sync — the same contract every other front has.
    return [];
  }

  // Posix, like every other front's `originalPath`: a cited path has to read
  // the same whatever OS synced it, and the render is diffed in CI.
  const cliPath = toPosixPath(path.relative(cacheDir, cliFile));
  const { commands, prompts, scaffold } = parseCli(cliContent, cliPath);

  return [
    {
      commands,
      prompts,
      scaffold,
      packages: parsePackages(npmContent),
      sourceFiles: [cliPath, toPosixPath(path.relative(cacheDir, npmFile))],
    },
  ];
}

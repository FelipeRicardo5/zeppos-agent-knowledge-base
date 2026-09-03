import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ModuleFile } from "../store/index.js";
import type { SymbolRecord } from "../types.js";

// Stage 4: render — generate the final Markdown from the JSON source of truth.
//
// This stage ships the knowledge in the shape the Agent Skill can consume. In v0
// only the axes the data actually supports are rendered: the `api/` view (one file
// per module, symbols grouped and described) and the `compatibility/` view (the
// cross-reference that is this project's point — grouped by minimum API_LEVEL,
// the one axis that is populated today; runtimes is empty and therefore omitted).
//
// The other README dirs (concepts/, runtimes/, patterns/, examples/, tools/) hold
// curated knowledge that is not derivable from the three automated fronts, so they
// are deliberately not created here rather than being fabricated.

const API_DIR = "api";
const COMPAT_DIR = "compatibility";

async function readModuleFiles(symbolsDir: string): Promise<ModuleFile[]> {
  const files = (await readdir(symbolsDir)).filter((f) => f.endsWith(".json"));
  const modules: ModuleFile[] = [];
  for (const file of files) {
    const raw = await readFile(path.join(symbolsDir, file), "utf-8");
    modules.push(JSON.parse(raw) as ModuleFile);
  }
  return modules.sort((a, b) => a.module.localeCompare(b.module));
}

function apiLevelLabel(record: SymbolRecord): string {
  return record.minApiLevel === undefined ? "any" : `>= ${record.minApiLevel}`;
}

function apiMarkdown(module: ModuleFile): string {
  const lines = [`# ${module.module}`, ""];
  lines.push(`**${module.symbols.length} symbols**`, "");
  lines.push("| Symbol | Type | Min API_LEVEL | Confidence |");
  lines.push("| --- | --- | --- | --- |");

  for (const record of module.symbols) {
    lines.push(
      `| \`${record.symbol}\` | ${record.type} | ${apiLevelLabel(record)} | ${record.confidence} |`,
    );
  }

  const described = module.symbols.filter((r) => r.description !== undefined);
  if (described.length > 0) {
    lines.push("", "## Descriptions", "");
    for (const record of described) {
      lines.push(`### \`${module.module}.${record.symbol}\``, "");
      lines.push(record.description!, "");
    }
  }

  return lines.join("\n");
}

function compatMarkdown(module: ModuleFile): string {
  const lines = [`# ${module.module} — compatibility`, ""];
  const withLevel = module.symbols.filter((r) => r.minApiLevel !== undefined);
  const withoutLevel = module.symbols.filter((r) => r.minApiLevel === undefined);

  lines.push(`**${withLevel.length} symbols with a stated minimum API_LEVEL**`, "");

  if (withLevel.length > 0) {
    const levels = [...new Set(withLevel.map((r) => r.minApiLevel))].sort((a, b) => a! - b!);
    for (const level of levels) {
      lines.push(`## API_LEVEL ${level}`, "");
      for (const record of withLevel.filter((r) => r.minApiLevel === level)) {
        lines.push(`- \`${module.module}.${record.symbol}\``);
      }
      lines.push("");
    }
  }

  if (withoutLevel.length > 0) {
    lines.push("## No stated API_LEVEL", "");
    lines.push("These symbols have no documented minimum. Absence means *not stated*, not *any* level.");
    lines.push("");
    for (const record of withoutLevel) {
      lines.push(`- \`${module.module}.${record.symbol}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Rewrites both out dirs entirely so a module that disappeared upstream also
 * disappears here — same idempotence contract as `writeSymbols`. Deterministic
 * ordering makes a rerun a no-op in git.
 */
export async function render(symbolsDir: string, outDir: string): Promise<{ api: number; compat: number }> {
  const modules = await readModuleFiles(symbolsDir);

  const apiDir = path.join(outDir, API_DIR);
  const compatDir = path.join(outDir, COMPAT_DIR);

  for (const dir of [apiDir, compatDir]) {
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
  }

  for (const module of modules) {
    const slug = module.module.replace(/^@/, "").replace(/[^A-Za-z0-9._-]/g, "-");
    await writeFile(path.join(apiDir, `${slug}.md`), apiMarkdown(module), "utf-8");
    await writeFile(path.join(compatDir, `${slug}.md`), compatMarkdown(module), "utf-8");
  }

  return { api: modules.length, compat: modules.length };
}

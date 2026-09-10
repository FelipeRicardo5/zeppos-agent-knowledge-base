import path from "node:path";
import type { RawUnit } from "../types.js";
import { runtimeForPath } from "./runtime.js";
import { extractEnums, extractMembers, extractShapes, extractSignature } from "./spec.js";
import { readSource, walkFiles } from "./util.js";

// Front 9: docs/watchface/api/** — the `hm*` API.
//
// The largest hole the base had: 89 API pages, none parsed, and the README said
// so in as many words. The three Watchface symbols here before this front were
// `@zos/*` calls seen in watchface *sample* code, not the API a watchface is
// actually written against.
//
// It was skipped for a mechanical reason rather than a hard one. The two symbol
// fronts key on an `import` line, and this API has none — `hmUI`, `hmFS`,
// `hmSensor` and `hmSetting` are globals — so `resolveModule` found nothing and
// `moduleFromPath` looks for a `newAPI` segment that this tree does not have.
//
// The format turned out to be close to `device-app-api`: `## Type` with a ```ts
// fence, `## Parameters` with property tables, prose under the frontmatter
// title. `extractSignature`, `extractShapes` and `extractEnums` all read it
// unchanged. What is different is what decides the id, and four things had to be
// measured rather than assumed:
//
//   the module is in the code, not the path
//                   `hmUI/widget/data_type.mdx` sits in the widget directory and
//                   the code writes `hmUI.data_type` — the same directory-name
//                   collision that once mis-filed 10 `@zos/settings` symbols. So
//                   the page's own example wins and the directory is the
//                   fallback. Across 89 pages the two signals never disagree
//                   where both exist, and the title agrees with them too.
//   no API_LEVEL anywhere
//                   Not one page in the tree states one, so every symbol here
//                   answers "does this exist" and never "since when". The same
//                   shape of gap as the Settings App and the Side Service.
//   the enums are doubly qualified
//                   `hmUI.align.LEFT`, not `align.LEFT`, because the namespace
//                   is reached through the global.
//   a page is not always a symbol
//                   `hmUI/widget/edit_watchface.mdx` is titled "Editable
//                   watchface" and documents the `hmUI.data_type` members. Filing
//                   it as a symbol would invent `hmUI.widget.edit_watchface`,
//                   which nothing can write — the same trap as the prose
//                   headings in the llms front. Its enum still lands.

/** `sidebar_label: getDeviceInfo` — the bare name, where the title is qualified. */
const SIDEBAR_LABEL_RE = /^sidebar_label:\s*(.+?)\s*$/m;

/** The frontmatter block, so prose can start after it. */
const FRONTMATTER_RE = /^---\n[\s\S]*?\n---\n/;

/**
 * `hmUI.createWidget`, `hmSensor.id.HEART`, `timer.createTimer` — the global
 * namespace a name is reached through, as the page's own example writes it.
 */
function moduleFromCode(content: string, symbol: string): string | undefined {
  const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const uses = content.matchAll(
    new RegExp(String.raw`\b((?:hm[A-Za-z]+|timer)(?:\.[A-Za-z_][A-Za-z0-9_]*)*?)\.${escaped}\b`, "g"),
  );

  const counts = new Map<string, number>();
  for (const [, prefix] of uses) counts.set(prefix, (counts.get(prefix) ?? 0) + 1);

  let best: string | undefined;
  let bestCount = 0;
  for (const [prefix, count] of counts) {
    if (count > bestCount) [best, bestCount] = [prefix, count];
  }
  return best;
}

/**
 * The directory chain as a global name: `api/hmSensor/sensorId/HEART.mdx` gives
 * `hmSensor.sensorId`.
 *
 * Only a fallback, and a lossy one — the code on that page writes
 * `hmSensor.id`, not `hmSensor.sensorId`. It is used for the five pages whose
 * example never writes the name, where a directory is the only evidence there
 * is, and those pages are all one level deep so the mismatch does not arise.
 */
function moduleFromDir(relative: string): string | undefined {
  const segments = relative.split(path.sep).join("/").split("/").slice(0, -1);
  return segments.length === 0 ? undefined : segments.join(".");
}

/** Prose between the frontmatter and the first section. */
function watchfaceDescription(content: string): string | undefined {
  const body = content.replace(FRONTMATTER_RE, "");
  const lines: string[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || trimmed.startsWith("```")) break;
    // A standalone illustration, which several widget pages open with.
    if (/^!\[[^\]]*\]\([^)]*\)$/.test(trimmed)) continue;
    if (trimmed.length > 0) lines.push(trimmed);
  }

  return lines.length > 0 ? lines.join(" ") : undefined;
}

export async function parseWatchface(cacheDir: string): Promise<RawUnit[]> {
  const apiDir = path.join(cacheDir, "zeppos-docs", "docs", "watchface", "api");
  const files = await walkFiles(apiDir, [".mdx", ".md"]);
  const units: RawUnit[] = [];

  for (const file of files) {
    const content = await readSource(file);
    const sourceFile = path.relative(cacheDir, file);
    const runtimeHint = runtimeForPath(sourceFile);

    const label = content.match(SIDEBAR_LABEL_RE)?.[1];
    const symbol = label ?? path.basename(file, path.extname(file));
    const relative = path.relative(apiDir, file);
    const parent = moduleFromDir(relative);

    const enums = extractEnums(content);

    // A page directly in `api/` names a module, not a symbol: there is no
    // parent namespace for it to belong to. `hmBle.mdx` is the only one, and
    // its `## Method` section lists six functions you call on the global —
    // `hmBle.send(...)` — so they are symbols of that module rather than
    // members of a value. Its own `sidebar_label` is "hmBle BLE", which is why
    // the name comes from the filename here.
    if (parent === undefined) {
      const module = path.basename(file, path.extname(file));
      for (const member of extractMembers(content)) {
        units.push({
          module,
          symbol: member.name,
          kind: "function",
          description: member.description,
          signature: member.signature,
          shapes: member.shapes,
          enums: member.enums,
          runtimeHint,
          sourceFile,
          sourceKind: "docs-watchface",
        });
      }
      continue;
    }

    // A label with whitespace titles a topic, not a symbol: "Editable watchface"
    // would become `hmUI.widget.edit_watchface`, an id nothing can write. The
    // page's enums are still real and still land, below.
    if (!/\s/.test(symbol)) {
      const module = moduleFromCode(content, symbol) ?? parent;
      if (module) {
        const shapes = extractShapes(content);
        const own = enums.filter((spec) => !spec.qualified);

        units.push({
          module,
          symbol,
          kind: /^[A-Z][A-Z0-9_]*$/.test(symbol) ? "constant" : "function",
          description: watchfaceDescription(content),
          // Deliberately absent. No page in this tree states an API_LEVEL, and
          // an absent level is absent evidence, never a claim of availability.
          signature: extractSignature(content),
          shapes: shapes.length > 0 ? shapes : undefined,
          enums: own.length > 0 ? own : undefined,
          runtimeHint,
          sourceFile,
          sourceKind: "docs-watchface",
        });
      }
    }

    for (const spec of enums) {
      if (!spec.qualified) continue;
      // `hmUI.align.LEFT` names the enum `hmUI.align`, which is the symbol
      // `align` on the global `hmUI` — split it so the id reads the way an
      // `@zos` one does, module and name apart.
      const at = spec.name.lastIndexOf(".");
      if (at === -1) continue;

      units.push({
        module: spec.name.slice(0, at),
        symbol: spec.name.slice(at + 1),
        kind: "constant",
        enums: [{ ...spec, name: spec.name.slice(at + 1) }],
        runtimeHint,
        sourceFile,
        sourceKind: "docs-watchface",
      });
    }
  }

  return units;
}

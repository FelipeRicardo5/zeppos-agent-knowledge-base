# Zepp OS Agent Knowledge Base

**English** · [Português](README.pt-BR.md)

A compatibility-aware knowledge base that sits between the official Zepp OS sources and the AI agents that write Zepp OS code.

This is **not** a documentation mirror. Official docs exist, but they aren't in a shape an agent can consume reliably when the question is *"can I call this API in this runtime, at this API_LEVEL?"*. This project extracts those sources into a structured layer where that question has a checkable answer.

Sources: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (reference pages and the LLM-oriented content in `static/llms`) and [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (real usage in shipped example apps).

## Status — v0, in development

| Stage | State |
| --- | --- |
| `fetch` — clone/update official repos into a local cache | implemented |
| `parse` — extract raw observations from docs, `static/llms` and samples | implemented |
| `enrich` — merge the three fronts into one record per symbol | implemented |
| `store` — write the JSON source of truth, one file per module | implemented |
| `render` — generate the final Markdown knowledge base | implemented (api/, compatibility/) |

Fixture-based tests cover all three parse fronts and the enrich merge: `npm test`.

Snapshot of the last sync (see [`data/manifest.json`](data/manifest.json) for live numbers):

- **276 symbols** across **34 modules**, from 222 reference pages + 226 `static/llms` entries + 622 sample imports
- 247 `OFFICIAL`, 29 `OBSERVED`
- 242 symbols carry a minimum `API_LEVEL`; 153 carry a description

## Coverage and limits

Read this before trusting an answer that came out of this KB.

- **Only the Device App API is covered.** The parser keys on the `import { x } from '@zos/...'` line that reference pages carry. `side-service-api` and `app-settings-api` pages use a different format without that line, and the watchface API (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) lives under a separate tree entirely. All of them are currently skipped.
- **The runtime axis is empty.** Every record ships `runtimes: []`. Since only one runtime's docs are parsed, this field cannot yet distinguish anything and is not populated rather than being filled with a constant.
- **A missing symbol means "not covered", not "does not exist."** With one runtime parsed out of six, absence carries no information about the real platform.
- **`API_LEVEL` is the one axis that works today.** It is read verbatim from the badge blockquote on each page (`Start from API_LEVEL`, or `Supported since API_LEVEL` — both wordings occur), never inferred.
- **Descriptions are missing for most symbols.** 94 reference pages carry their title in frontmatter instead of an H1, and the description extractor only reads the text under an H1. Tracked as a `todo` test in `test/parse.test.ts`.
- **Parser bugs are the main risk, and every one so far was the same failure**: a source format that looked regular in the first file and wasn't. Each is now pinned by a fixture test built from the real file that broke it, so a regression fails the suite instead of quietly producing wrong records.

## Quick start

```bash
npm install
npm run sync       # fetch -> parse -> enrich -> write data/
npm test           # fixture tests for the parsers and the enrich merge
npm run typecheck
```

`sync` clones the official repos into `.cache/` (untracked, ~ tens of MB) and rewrites `data/`. It is idempotent: running it twice in a row produces no diff.

`npm run render` rewrites `api/` and `compatibility/` from the JSON source of truth.

## How it works

Four stages, each idempotent and independently inspectable, so any one of them can be rerun without redoing the earlier ones. Execution is local and on demand — there is no scheduled CI job in v0.

1. **fetch** — clones or updates the official repos into `.cache/`, and records the exact commit of each. Third-party content, never versioned here.
2. **parse** — three independent fronts over the raw cache:
   - **docs-reference** — `docs/reference/**/*.mdx`, one file per symbol. The module is resolved from the import line in the page's own example, because the directory name doesn't reliably match the module id.
   - **llms** — `static/llms/@zos-*.md`, one file per module, reusing the structuring Zepp Health already did for LLM consumption. The module id comes from the import lines inside the file, not from the H1: `@zos/ui` is split across several files whose H1 reads `@zos/ui-methods`, `@zos/ui-widget-basic` and so on, and those ids can't be imported.
   - **samples** — every `@zos/*` import across the official example apps. Evidence of real usage, not a documentation claim.
3. **enrich** — groups observations by symbol id and normalizes the metadata that is the point of the project: minimum `API_LEVEL`, runtime, source and confidence tier. Field-level priority is `docs-reference` > `llms` > `sample`.
4. **render** — generates `api/` (symbols per module) and `compatibility/` (grouped by minimum `API_LEVEL`, the populated axis). The other README dirs (`concepts/`, `runtimes/`, `patterns/`, `examples/`, `tools/`) hold curated knowledge not derivable from the three automated fronts, so they are not generated yet. This is what the Agent Skill reads.

## Data model

### JSON is the source of truth, Markdown is derived

The structured JSON produced by parse/enrich is the source of truth. Markdown is a generated view of it. Two reasons:

1. Multiple representations of the same knowledge become possible later (Markdown for humans and for the Skill, JSON for a retrieval system or an MCP server) without duplicating extraction logic.
2. Versioning gets far more useful — a diff over structured JSON shows what changed semantically (a function's minimum `API_LEVEL` moving, say) instead of the textual noise a Markdown diff produces.

### `SymbolRecord`

| Field | Meaning |
| --- | --- |
| `id` | Canonical symbol id, module + name — `@zos/router.launchApp` |
| `module` / `symbol` | The two halves of the id, kept separate so grouping needs no string surgery |
| `type` | `function`, `constant` or `value` |
| `description` | Short description, when a source states one |
| `minApiLevel` | Minimum `API_LEVEL`. Absent when no source states it — never fabricated |
| `runtimes` | Runtimes the symbol is valid in (see *Coverage and limits*) |
| `source` | Which front the record was primarily built from |
| `confidence` | See below |
| `originalPath` | File the record was extracted from, posix-normalized |
| `extractedAt` | Extraction date |

### Confidence tiers

| Tier | Meaning |
| --- | --- |
| `OFFICIAL` | Stated by official documentation (`docs-reference` or `llms`) |
| `OBSERVED` | Seen in official sample code, with no documentation entry |
| `RECOMMENDED`, `COMMUNITY`, `INFERRED` | Reserved. Not derivable from the three automated fronts; left for a future curation pass |

### Sync manifest

[`data/manifest.json`](data/manifest.json) records the last sync date, the exact commit of every source repo, and the record counts. It is what makes each entry's "last verified" derivable instead of hand-maintained.

## Repository layout

```
src/
  fetch/    stage 1 — clone/update official repos
  parse/    stage 2 — three extraction fronts
  enrich/   stage 3 — merge and normalize into SymbolRecord
  store/    write the JSON source of truth + manifest
  render/   stage 4 — Markdown generation (api/, compatibility/)
  cli.ts    sync / render commands
data/
  manifest.json   sync state: date, source commits, counts
  symbols/        the JSON source of truth, one file per module
skills/
  zepp-os/SKILL.md   the Agent Skill
test/
  fixtures/cache/    trimmed excerpts of the real sources, in cache layout
  *.test.ts          parser and enrich tests
.cache/     cloned official repos (untracked)
```

The generated Markdown lands in `api/` and `compatibility/`. `concepts/`, `runtimes/`, `patterns/`, `examples/` and `tools/` stay empty until curated content exists to fill them.

## Design decisions

1. **Extraction is scripted from day one.** Populating the KB by hand would drift into a pile of inconsistent Markdown; scripting it forces a schema and an extraction standard up front.
2. **Extractor language: Node/TypeScript.** Native access to a real MDX parser, alignment with the Zepp OS ecosystem (the samples are already JS), and the same runtime as the Skill and any future MCP server. TypeScript over plain JS to type the record schema and catch malformed data at the parse/enrich boundary.
3. **JSON is the source of truth, not Markdown** (see above).
4. **One JSON file per module**, at `data/symbols/<module-slug>.json`. Each file carries the canonical module id and its symbols; the filename is only a derived slug (`@zos/router` → `zos-router.json`). With ~40 modules and ~330 symbols, one file per symbol would mean hundreds of tiny files and an unreadable sync diff. Grouping by module keeps the diff at the level where change actually happens — *what changed in `@zos/router`* — while each file stays small enough to read whole.
   - The write rewrites the whole directory, so a module that disappears upstream disappears here too.
   - `originalPath` is posix-normalized so the versioned JSON doesn't depend on which OS ran the sync.

## Open questions

1. **Generated vs. versioned Markdown** — should manual edits under the rendered Markdown directories always be overwritten by the next `render` (JSON as the single source of truth), or should there be an annotation mechanism that survives regeneration, to cover what the parser gets wrong?

## Agent Skill

[`skills/zepp-os/SKILL.md`](skills/zepp-os/SKILL.md) contains no documentation itself. It teaches an agent to *use* this knowledge base:

- identify the target runtime and the target `API_LEVEL` first
- verify compatibility before suggesting an API
- prefer official documentation and examples
- never assume browser or Node.js APIs exist on the Zepp OS runtime
- say so explicitly when the available documentation is insufficient

Given the coverage limits above, the Skill must also state what this KB does *not* cover, so an agent reports "not covered" rather than "does not exist."

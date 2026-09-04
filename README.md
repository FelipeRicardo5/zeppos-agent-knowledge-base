# Zepp OS Agent Knowledge Base

**English** · [Português](README.pt-BR.md)

A compatibility-aware knowledge base that sits between the official Zepp OS sources and the AI agents that write Zepp OS code.

This is **not** a documentation mirror. Official docs exist, but they aren't in a shape an agent can consume reliably when the question is *"can I call this API in this runtime, at this API_LEVEL?"*. This project extracts those sources into a structured layer where that question has a checkable answer.

Sources: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (reference pages and the LLM-oriented content in `static/llms`) and [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (real usage in shipped example apps).

## Status — v0, in development

| Stage | State |
| --- | --- |
| `fetch` — clone/update official repos into a local cache | implemented |
| `parse` — extract raw observations from docs, `static/llms`, samples, guides and the device list | implemented |
| `enrich` — merge the symbol fronts into one record per symbol | implemented |
| `store` — write the JSON source of truth, one file per module | implemented |
| `render` — generate the final Markdown knowledge base | implemented (api/, compatibility/, runtimes/, patterns/) |

Fixture-based tests cover all five parse fronts, runtime attribution, the enrich merge and every render view: `npm test` (97 passing, 1 `todo`).

Snapshot of the last sync (see [`data/manifest.json`](data/manifest.json) for live numbers):

- **383 symbols** across **34 modules**, from 222 reference pages + 445 `static/llms` entries + 622 sample imports
- 359 `OFFICIAL`, 24 `OBSERVED`
- 354 symbols carry a minimum `API_LEVEL`; 265 carry a description
- every symbol is attributed to at least one runtime: 375 Device App, 12 Workout Extension, 5 Side Service, 3 Watchface, 0 Settings App — 12 of them to more than one
- **11 patterns** from the best-practice guides, 32 approaches, using 17 distinct symbols — all 17 covered by the symbol records
- **41 devices**: 29 running Zepp OS with a stated `API_LEVEL`, 5 on Zepp OS 1.0 with none, 7 that run no Mini Program at all

## Coverage and limits

Read this before trusting an answer that came out of this KB.

- **The documented API surface is the Device App's.** The parser keys on the `import { x } from '@zos/...'` line that reference pages carry. `side-service-api` and `app-settings-api` pages don't have one — those runtimes use globals (`fetch`, `settingsStorage`, `Settings.render`), not `@zos` modules — and the watchface API (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) lives under a separate tree entirely. All of them are currently skipped by the docs fronts.
- **The runtime axis is populated, unevenly.** Every symbol carries at least one runtime, but 267 of 276 are Device App. The Side Service's 5 and the Watchface's 3 come from sample code, not from a documentation entry, and the Settings App has **none** — see [`runtimes/index.md`](runtimes/index.md), which states that gap rather than omitting the runtime.
- **A missing symbol means "not covered", not "does not exist."** This holds hardest on the runtime axis: a symbol absent from `runtimes/settings.md` says nothing about whether the Settings App can use it, because nothing has been extracted for that runtime at all.
- **Runtime is inferred from the source path, never from a page's text.** No page or sample states its runtime; both official repos separate the runtimes by directory, so the directory is the evidence. The rules and the doc that anchors each one live in [`src/parse/runtime.ts`](src/parse/runtime.ts). This is the axis most exposed to an upstream reorganization, and the reason it has its own test file.
- **`API_LEVEL` is the one axis that works today.** It is read verbatim from the badge blockquote on each page (`Start from API_LEVEL`, or `Supported since API_LEVEL` — both wordings occur), never inferred.
- **Descriptions are missing for most symbols.** 94 reference pages carry their title in frontmatter instead of an H1, and the description extractor only reads the text under an H1. Tracked as a `todo` test in `test/parse.test.ts`.
- **Parser bugs are the main risk, and every one so far was the same failure**: a source format that looked regular in the first file and wasn't. Each is now pinned by a fixture test built from the real file that broke it, so a regression fails the suite instead of quietly producing wrong records.
- **Fixtures pin regressions; they don't prove coverage.** Two bugs survived a green suite because the fixtures were written from the files already read. Both were found by running the real pipeline and looking at the aggregate counts: a CRLF checkout (see below) silently dropped 188 documented constants, and a path rule mis-filed 10 symbols under a runtime because a docs directory shares a name with an app directory. Aggregate the output of a new front before believing it.
- **The device list is a snapshot of *latest* levels, not a history.** It states the highest `API_LEVEL` each device reaches today, so a symbols-available count assumes the device is updated. It says nothing about which firmware a given user is actually on.
- **Line endings are normalized at the read boundary.** `git clone` gives a CRLF cache on Windows and an LF one elsewhere, and regexes anchored with `$` stopped matching without erroring — a sync on Windows produced a materially smaller KB than the same commit synced on Linux. `readSource` in `src/parse/util.ts` normalizes to LF so the parse output depends only on the commit.

## Quick start

```bash
npm install
npm run sync       # fetch -> parse -> enrich -> write data/
npm test           # fixture tests for the parsers and the enrich merge
npm run typecheck
```

`sync` clones the official repos into `.cache/` (untracked, ~ tens of MB) and rewrites `data/`. It is idempotent: running it twice in a row produces no diff.

`npm run render` rewrites `api/`, `compatibility/`, `runtimes/` and `patterns/` from the JSON source of truth. Each dir gets an `index.md` (the module list; the inverse view — which modules a given `API_LEVEL` unlocks, and which devices reach it; the runtime coverage table; and the pattern list with a symbol-to-patterns index). `compatibility/` also gets `devices.md`. A hand-written `README.md` in any of them is preserved; every other `.md` there is generated and overwritten.

## How it works

Four stages, each idempotent and independently inspectable, so any one of them can be rerun without redoing the earlier ones. Execution is local and on demand — there is no scheduled CI job in v0.

1. **fetch** — clones or updates the official repos into `.cache/`, and records the exact commit of each. Third-party content, never versioned here.
2. **parse** — five independent fronts over the raw cache:
   - **docs-reference** — `docs/reference/**/*.mdx`, one file per symbol. The module is resolved from the import line in the page's own example, because the directory name doesn't reliably match the module id.
   - **llms** — `static/llms/@zos-*.md`, one file per module, reusing the structuring Zepp Health already did for LLM consumption. The module id comes from the import lines inside the file, not from the H1: `@zos/ui` is split across several files whose H1 reads `@zos/ui-methods`, `@zos/ui-widget-basic` and so on, and those ids can't be imported.
   - **samples** — every `@zos/*` import across the official example apps. Evidence of real usage, not a documentation claim.
   - **guides** — `docs/guides/best-practice/**.mdx`, one file per task. Only the parts with a fixed shape are read: frontmatter title, `##` sections, fenced code blocks and the reference pages the guide links to. Nothing is inferred from the prose.
   - **device list** — `docs/reference/related-resources/device-list.mdx`, the only source that ties an `API_LEVEL` to hardware. One file, two tables with *different* columns, so columns are resolved by header name and a missing one throws.

   Each front also attributes a **runtime** from the path it read the unit from, since no content states one: `docs/reference/device-app-api/` is the Device App, `zeppos-samples/watchface/` is a Watchface, `app-side/` inside any sample app is the Side Service. A path no rule covers gets no runtime rather than a default.
3. **enrich** — groups observations by symbol id and normalizes the metadata that is the point of the project: minimum `API_LEVEL`, runtime, source and confidence tier. Field-level priority is `docs-reference` > `llms` > `sample` — except `runtimes`, which is **unioned** instead, because each front observes a different runtime rather than making a competing claim about the same one. A symbol documented under the Device App API and also seen in a watchface sample is valid in both.
4. **render** — generates four views, plus an `index.md` in each:
   - `api/` — symbols per module
   - `compatibility/` — grouped by minimum `API_LEVEL`, plus `devices.md`
   - `runtimes/` — one page per runtime
   - `patterns/` — one page per best-practice guide

   A symbol with no documented minimum is labelled `not stated`, never `any` — absence of a level is absence of evidence, not a compatibility claim. `runtimes/` renders a page for **every** runtime including the ones with no symbols, because a missing page reads like "this runtime does not exist" while a page stating "0 symbols covered" reads like the coverage gap it is. The remaining README dirs (`concepts/`, `examples/`, `tools/`) hold knowledge the automated fronts don't yet reach, so they are not generated. This is what the Agent Skill reads.

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
| `runtimes` | Runtimes the symbol has evidence for, from the source path. One of `device-app`, `side-service`, `settings`, `watchface`, `workout-extension` (see *Coverage and limits*) |
| `source` | Which front the record was primarily built from |
| `confidence` | See below |
| `originalPath` | File the record was extracted from, posix-normalized |
| `extractedAt` | Extraction date |

### Confidence tiers

| Tier | Meaning |
| --- | --- |
| `OFFICIAL` | Stated by official documentation (`docs-reference` or `llms`) |
| `OBSERVED` | Seen in official sample code, with no documentation entry |
| `RECOMMENDED`, `COMMUNITY`, `INFERRED` | Reserved. Not derivable from the automated fronts; left for a future curation pass |

### `PatternRecord`

A pattern is a task ("communicate between pages", "adapt to a round screen"), not a symbol, so it gets its own record and its own `data/patterns/<id>.json`.

| Field | Meaning |
| --- | --- |
| `id` / `title` | Slug of the guide's filename, and its frontmatter title |
| `summary` | The guide's own lead prose, or its first section's when it opens straight into `## Introduction` |
| `approaches` | One per `##` section: heading, the symbols its code imports, and its code blocks verbatim |
| `symbols` / `modules` | Union over the approaches. `modules` holds namespace imports (`import * as ble from '@zos/ble'`), which name no symbol |
| `runtimes` | Only what the guide's own fence titles state (`title=app-side/index.js` is the Side Service). The runtimes of the symbols it uses are resolved at render time instead, so the two can't drift |
| `referencePages` | Reference pages the guide links to, resolved to cache-relative paths |

**What makes a pattern checkable rather than a copy of the guide** is the join `render` performs against the symbol records:

- **the minimum `API_LEVEL` the whole pattern needs** — the highest minimum among the symbols its code uses, since every one of them has to be available. No upstream page states this. `Data Persistence` comes out at `>= 3` while the guide never mentions a level.
- **which of those symbols this KB has no record for**, so a gap is visible instead of the pattern looking fully verified.
- **the inverse index** on `patterns/index.md`: given a symbol, which patterns show it in use. The guides link to the reference pages; nothing upstream links back.

### `DeviceRecord`

`data/devices.json` — one file, because the source is a single table of 41 rows and one file per device would mean 41 tiny files and an unreadable sync diff.

| Field | Meaning |
| --- | --- |
| `name` | Verbatim. Upstream is inconsistent about the `Amazfit` prefix, so normalizing would invent names matching no official document |
| `latestApiLevel` | Highest level the device reaches. **Absent when the table says `-`**, which is every Zepp OS 1.0 device: the 2.0 API this KB documents does not run on them at all. `-` is *not stated*, never level 0 |
| `latestOsVersion` | Zepp OS version, e.g. `5.0` |
| `deviceSources` | The `deviceSource` ids, with `mainlandChina` set from the `*` suffix upstream |
| `screen` | `shape` (`round`, `square` or `band`), `radius` (square and band only), `width`/`height` |
| `physicalKeys`, `watchfacePreview`, `secondaryWidget` | Each absent where the table states `-` rather than a value |
| `runsZeppOs` | `false` for the rows under *Non-Zepp OS Devices* — hardware that takes watchfaces but runs no Mini Program |

**Why this front matters most for answering a real question.** `compatibility/` says a symbol needs `>= 4.2`. That is not the question a developer has; *"does it run on a Bip 6?"* is. `compatibility/devices.md` joins the two and answers it, and the compatibility index now names the hardware reaching each level. The join also produces a **symbols-available count per device** that exists nowhere upstream — an Amazfit Bip 5 (`API_LEVEL 2.1`) reaches 205 of the 354 symbols that state a minimum, a Balance 3 (`4.4`) reaches all 354.

The count is a floor, deliberately: the 29 symbols with no stated minimum are excluded rather than assumed available, and a device with no stated level counts zero symbols and is rendered in its own section saying so.

### Sync manifest

[`data/manifest.json`](data/manifest.json) records the last sync date, the exact commit of every source repo, and the record counts. It is what makes each entry's "last verified" derivable instead of hand-maintained.

## Repository layout

```
src/
  fetch/    stage 1 — clone/update official repos
  parse/    stage 2 — four extraction fronts
    devices.ts   the device-list front (columns resolved by header name)
    patterns.ts  the best-practice guides front
    runtime.ts   path -> runtime rules, with the doc anchoring each one
    util.ts      dir walk + the LF-normalizing read
  enrich/   stage 3 — merge and normalize into SymbolRecord / PatternRecord
  store/    write the JSON source of truth + manifest
  render/   stage 4 — Markdown generation
    patterns.ts  the patterns view and its join against the symbols
    shared.ts    helpers every view agrees on
  cli.ts    sync / render commands
data/
  manifest.json   sync state: date, source commits, counts
  devices.json    the device list: API_LEVEL, OS version, screen, deviceSource
  symbols/        the JSON source of truth, one file per module
  patterns/       one file per best-practice guide
skills/
  zepp-os/SKILL.md   the Agent Skill
concepts/
  README.md          note index (retrieval/RAG/MCP study notes)
test/
  fixtures/cache/    trimmed excerpts of the real sources, in cache layout
  *.test.ts          parser and enrich tests
.cache/     cloned official repos (untracked)
```

The generated Markdown lands in `api/`, `compatibility/`, `runtimes/` and `patterns/`. `concepts/` holds curated notes on retrieval/RAG/MCP and their relation to this project (see [concepts/README.md](concepts/README.md)). `examples/` and `tools/` stay empty until a front exists to fill them — the raw material for both is already in `.cache/` (the 33 sample apps, and `guides/tools/` + `guides/version-info/`), so they are a parsing job, not a curation job.

## Design decisions

1. **Extraction is scripted from day one.** Populating the KB by hand would drift into a pile of inconsistent Markdown; scripting it forces a schema and an extraction standard up front.
2. **Extractor language: Node/TypeScript.** Native access to a real MDX parser, alignment with the Zepp OS ecosystem (the samples are already JS), and the same runtime as the Skill and any future MCP server. TypeScript over plain JS to type the record schema and catch malformed data at the parse/enrich boundary.
3. **JSON is the source of truth, not Markdown** (see above).
4. **One JSON file per module**, at `data/symbols/<module-slug>.json`. Each file carries the canonical module id and its symbols; the filename is only a derived slug (`@zos/router` → `zos-router.json`). With ~40 modules and ~330 symbols, one file per symbol would mean hundreds of tiny files and an unreadable sync diff. Grouping by module keeps the diff at the level where change actually happens — *what changed in `@zos/router`* — while each file stays small enough to read whole.
   - The write rewrites the whole directory, so a module that disappears upstream disappears here too.
   - `originalPath` is posix-normalized so the versioned JSON doesn't depend on which OS ran the sync.
5. **Runtime is read from the source path, in one place.** No page or sample states which runtime it belongs to, but both official repos separate the runtimes by directory, so the path carries the fact. All the rules live in `src/parse/runtime.ts` with the doc that anchors each one, rather than being spread across the fronts that use them. A path matching no rule yields no runtime — the same "never fabricate" contract `minApiLevel` has.
6. **A pattern is its own record, and its value is the join.** Best-practice guides are prose, so extracting "the pattern" as text would make this a documentation mirror. What is extracted instead is the structured part — title, `##` sections, code blocks, the `@zos` imports inside them — and `render` joins those symbol ids against the symbol records. That produces the minimum `API_LEVEL` a whole task needs and the symbol-to-patterns index, neither of which exists upstream. Only the derived direction is computed at render time; the pattern JSON stays a record of one guide.
7. **`devices.md` lives in `compatibility/`, and that dir has one owner.** Hardware is the other half of the compatibility axis, not a separate one, so the page belongs there rather than in a `devices/` dir of its own. That forces `render` to own the whole dir: `prepareOutDir` clears it, so a second function writing into it would have its page deleted by whichever ran second. The device join also feeds the compatibility index, so the stage needs the records anyway.
8. **Reads normalize line endings, once, at the boundary.** `git clone` produces a CRLF cache on Windows and an LF one everywhere else, so a parse regex anchored with `$` matched on one machine and not the other, with no error either way. Every front reads through `readSource`, so the parse output depends on the source commit and nothing else — the same portability guarantee `originalPath` gives the persisted JSON.
9. **Five runtimes, not six.** `guides/architecture/arc.mdx` names three parts of a Mini Program — Device App, Settings App, Side Service — and `guides/architecture/folder-structure.mdx` shows `app-side/` **is** the Side Service directory. "App-side" and "Side Service" were the same runtime under two names, so only one is kept. Shortcut Card (`app-widget/`) and SecondaryWidget (`secondary-widget/`) are extra entry points rather than extra runtimes: they execute on the watch like the Device App, and attribute to it.

## Open questions

1. **Generated vs. versioned Markdown** — should manual edits under the rendered Markdown directories always be overwritten by the next `render` (JSON as the single source of truth), or should there be an annotation mechanism that survives regeneration, to cover what the parser gets wrong?

## Agent Skill

[`skills/zepp-os/SKILL.md`](skills/zepp-os/SKILL.md) contains no documentation itself. It teaches an agent to *use* this knowledge base:

- identify the target runtime and the target `API_LEVEL` first, via [`runtimes/index.md`](runtimes/index.md)
- verify both axes — `runtimes/` and `compatibility/` — before suggesting an API
- reach for [`patterns/`](patterns/index.md) when the question is a task rather than a symbol
- answer a hardware question from [`compatibility/devices.md`](compatibility/devices.md), never from a level alone
- prefer official documentation and examples
- never assume browser or Node.js APIs exist on the Zepp OS runtime
- say so explicitly when the available documentation is insufficient

Given the coverage limits above, the Skill must also state what this KB does *not* cover, so an agent reports "not covered" rather than "does not exist."

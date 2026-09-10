<img src="assets/logo.png" alt="Zepp OS Agent Knowledge Base" width="96" />

# Zepp OS Agent Knowledge Base

**English** · [Português](README.pt-BR.md)

A compatibility-aware knowledge base that sits between the official Zepp OS sources and the AI agents that write Zepp OS code.

This is **not** a documentation mirror. Official docs exist, but they aren't in a shape an agent can consume reliably when the question is *"can I call this API in this runtime, at this API_LEVEL?"*. This project extracts those sources into a structured layer where that question has a checkable answer.

Sources: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (reference pages and the LLM-oriented content in `static/llms`) and [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (real usage in shipped example apps).

## Status — v0, in development

| Stage | State |
| --- | --- |
| `fetch` — clone/update official repos into a local cache | implemented |
| `parse` — nine fronts: reference pages, the phone runtimes, the watchface `hm*` tree, `static/llms`, sample imports, sample apps, guides, the device list, `app.json` | implemented |
| `enrich` — merge the symbol fronts into one record per symbol | implemented |
| `store` — write the JSON source of truth, one file per module | implemented |
| `render` — generate the final Markdown knowledge base | implemented (api/, compatibility/, runtimes/, patterns/, examples/, manifest/, conflicts/) |

Fixture-based tests cover all nine parse fronts, runtime attribution, call-shape and value-set extraction, the enrich merge and every render view: `npm test` (225 passing, no `todo`). Those prove the extractor does not regress; they do not prove the base *answers well*, which is what [`eval/`](eval/README.md) is for.

Snapshot of the last sync (see [`data/manifest.json`](data/manifest.json) for live numbers):

- **513 symbols** across **50 modules**, from all 241 reference pages + 36 phone-runtime entries + **89 watchface `hm*` pages** + 443 `static/llms` entries + 785 sample observations
- 496 `OFFICIAL`, 17 `OBSERVED`
- 353 symbols carry a minimum `API_LEVEL`; 367 carry a description; **178 carry a call signature and 147 carry property tables** — 1157 properties, 591 of them with their own minimum level
- **27 value sets** on 24 symbols — 196 members, 124 of them stating their own minimum level. 146 come from a documented table and 50 from sample code, marked per member
- **257 instance members** on 46 symbols — what you call on a value rather than import: `new HeartRate().getCurrent()`, `localStorage.getItem(...)`. Every one carries a signature and prose, 44 state their own minimum level, and 60 of the shapes and 10 of the value sets above belong to a member rather than to the symbol
- **every runtime is covered**: 375 Device App, **105 Watchface**, 21 Settings App, 20 Side Service, 12 Workout Extension — 20 symbols valid in more than one
- **11 patterns** from the best-practice guides, 32 approaches, using 17 distinct symbols — all 17 covered by the symbol records
- **41 devices**: 29 running Zepp OS with a stated `API_LEVEL`, 5 on Zepp OS 1.0 with none, 7 that run no Mini Program at all
- **how to target each of them**: the `st`/`sr` screen selectors a v3 manifest needs, derived from the device's own screen, beside the `deviceSource` numbers a v2 one needs — plus the reverse index, and a two-way diff against what the 33 samples actually build for
- **33 sample apps** read as code, yielding 592 cited excerpts and the shape of 33 working `app.json` files
- **15 conflicts** the sources do not know they have: a description two official pages state differently, a widget id written one way in code and documented another, and 13 method calls whose name resolves to more than one thing inside the sample's own runtime. `conflicts/index.md` cites both sides of each
- **the `app.json` schema**: 20 documented keys with their property tables, 3 keys the reference page names and never describes, and a two-way diff against the 33 working manifests — 48 key paths real apps use that the page never mentions, 12 documented keys no sample uses, and 38 permission strings joined to the symbols that state them

## Coverage and limits

Read this before trusting an answer that came out of this KB.

- **The watchface `hm*` API states no `API_LEVEL` anywhere.** Not one of its 89 reference pages carries a badge, so its 102 symbols answer "does this exist" and never "since when" — the same shape of gap the Settings App and the Side Service have. Nothing in `compatibility/` can vouch for a watchface symbol on a given device.
- **A watchface symbol's id is a global path, not an import.** `hmUI.widget.TEXT`, `hmSensor.id.HEART`, `hmFS.open` — that is how the code writes them, and there is no `import` line anywhere in the tree. The module is read from the page's own example, with the directory as fallback: `hmUI/widget/data_type.mdx` is in the widget directory and the code writes `hmUI.data_type`.
- **The runtime axis is populated, unevenly.** Every runtime now has symbols, but 375 of 411 are Device App. The Settings App's 21 and the Side Service's 20 have **no `API_LEVEL` at all** — no page in either tree states one — so they answer "does this exist here" but not "since when".
- **Instance members are a field, never a symbol.** `getCurrent` is reached through a value (`new BloodOxygen().getCurrent()`), so it lives on the owning record rather than as `@zos/sensor.getCurrent`, an id nothing can import. 12 sensors document a `getCurrent` and they return 12 different shapes, which is why the owner is part of the identity. A member states its own minimum `API_LEVEL` and the symbol's does not imply it: `BloodOxygen` is 2.0 while its `start` and `stop` are 2.1.
- **A heading under `Methods` is not always a member.** `ui/widget/SYSTEM_KEYBOARD.mdx` lists `deleteKeyboard()` there and its own example imports it — a module function documented beside the widget. One case in 257, caught by that import rather than by a rule about names.
- **A missing symbol means "not covered", not "does not exist."** This holds hardest on the runtime axis: a symbol absent from `runtimes/settings.md` says nothing about whether the Settings App can use it, because nothing has been extracted for that runtime at all.
- **Runtime is inferred from the source path, never from a page's text.** No page or sample states its runtime; both official repos separate the runtimes by directory, so the directory is the evidence. The rules and the doc that anchors each one live in [`src/parse/runtime.ts`](src/parse/runtime.ts). This is the axis most exposed to an upstream reorganization, and the reason it has its own test file.
- **`API_LEVEL` is the one axis that works today.** It is read verbatim from the badge blockquote on each page (`Start from API_LEVEL`, or `Supported since API_LEVEL` — both wordings occur), never inferred.
- **44 of 411 symbols have no description.** 14 are name-only `OBSERVED` sightings in sample code, which carries no prose — 11 of those are `@zeppos/zml`, a helper library rather than platform API. The rest are pages with nothing between title and first section, plus the enum symbols whose pages document their members and never describe the set.
- **An enum's members are documented on the pages that use it, not on its own.** `align` is defined across `ui/widget/TEXT.mdx` and `ui/widget/PAGE_INDICATOR.mdx`, so its members are the *union* of what several pages state — the one field this base merges by union rather than by source priority. A member missing from every page that happened to mention the enum is missing here too.
- **`widget` is the one value set the documentation calls incomplete, and it says so.** The reference page lists a single widget id and then says "the rest of the values are not listed"; the other 24 are `OBSERVED`, read off sample code. Neither source is the whole set, and `api/zos-ui.md` states that rather than presenting 25 as the answer.
- **Members read from sample code are scoped to what the file imports.** `align.CENTER_H` counts because the file says `import { align } from '@zos/ui'` above it. That is also why watchface samples contribute none: they use the `hm*` globals, so their `widget.X` is a different `widget`.
- **Parser bugs are the main risk, and every one so far was the same failure**: a source format that looked regular in the first file and wasn't. Each is now pinned by a fixture test built from the real file that broke it, so a regression fails the suite instead of quietly producing wrong records.
- **Fixtures pin regressions; they don't prove coverage.** Two bugs survived a green suite because the fixtures were written from the files already read. Both were found by running the real pipeline and looking at the aggregate counts: a CRLF checkout (see below) silently dropped 188 documented constants, and a path rule mis-filed 10 symbols under a runtime because a docs directory shares a name with an app directory. Aggregate the output of a new front before believing it.
- **The documented `app.json` is incomplete, and the base says where.** The reference page names no `module` key that reaches the Workout Extension runtime, yet six samples are one — they use a `data-widget` key the page never mentions. `manifest/index.md` reports the diff in both directions rather than presenting the documented tree as the whole schema. Documented rows are `OFFICIAL`; observed key paths are `OBSERVED`, and 33 apps are not the whole surface either way.
- **The `targets` key in `app.json` is not a device identifier, and the base says so.** Upstream calls it "named arbitrarily" — it only has to match a subdirectory of `assets/`. Hardware is selected by `targets.*.platforms[]`: `deviceSource` numbers under configVersion v2, screen shape and width (`st`, `sr`) under v3. The 33 samples split exactly on that line, 14 to 19, and none mixes the two.
- **A device's `st` and `sr` are derived here, not quoted.** No source states them per device; they are the device list's own screen shape and width rewritten in the form `platforms[]` takes. `deviceSource` is verbatim.
- **Where two sources disagree, this base picks by priority and the page it lands on says nothing about the loser.** That is what [`conflicts/index.md`](conflicts/index.md) is for. Descriptions are compared after normalising punctuation and the `permission code:` note — raw, 147 symbols "disagree" and every one of them is a full stop. `API_LEVEL` and signatures never disagree. `kind` disagrees 98 times and is deliberately not reported: that is this extractor's own guess, not a claim either source makes.
- **A method call seen in sample code is matched by name, never by resolved type**, and narrowed to the runtimes of the sample it was seen in. Where several candidates survive, the row says `ambiguous` and names them all rather than picking. Before instance members existed the base could not see the better candidate at all and reported `.getItem()` as the Settings App's `settings-storage.getItem` in six Device App samples where it is `localStorage.getItem`.
- **Only 24 permission codes are documented, and 33 sample manifests declare 34.** The overlap is partial in both directions: `event:os.*`, `device:os.ble` and `gps` are declared by shipped samples and required by no symbol this base knows, so a permission absent from a symbol's record is *not covered*, never *not needed*. `manifest/index.md` joins both sides.
- **A pattern's required permissions are derived, not quoted.** Unioned over the symbols the guide's own code uses — the guide states none. `multi-screen-adaption` needs `data:os.device.info` and never says so.
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
2. **parse** — seven independent fronts over the raw cache:
   - **docs-reference** — `docs/reference/**/*.mdx`, one file per symbol. The module comes from the import line in the page's own example; when the page has none — it documents a runtime global like `setTimeout` or `console`, so there is nothing to import — it falls back to the `newAPI/<dir>` directory. Measured: 221 of the 222 pages that *do* have an import agree with the directory, the exception being a submodule (`@zos/ble/TransferFile`), so the import stays primary.
   - **phone runtimes** — `docs/reference/side-service-api/**` and `docs/reference/app-settings-api/**`. These APIs are globals (`fetch`, `settings.settingsStorage`, `messaging.peerSocket`) or Settings App components, so there is no import to key on and the docs-reference front skips them. Across all 22 pages they take four shapes — page-as-symbol, `##`-as-symbol, `##`-as-module with `###` symbols (signalled by the heading ending in the word `module`), and no heading at all — so the shape is detected rather than assumed.
   - **llms** — `static/llms/@zos-*.md`, one file per module, reusing the structuring Zepp Health already did for LLM consumption. The module id comes from the import lines inside the file, not from the H1: `@zos/ui` is split across several files whose H1 reads `@zos/ui-methods`, `@zos/ui-widget-basic` and so on, and those ids can't be imported.
   - **samples** — every `@zos/*` import across the official example apps. Evidence of real usage, not a documentation claim.
   - **guides** — `docs/guides/best-practice/**.mdx`, one file per task. Only the parts with a fixed shape are read: frontmatter title, `##` sections, fenced code blocks and the reference pages the guide links to. Nothing is inferred from the prose.
   - **sample apps** — the same 33 apps, read as *code* rather than as a list of import names. For each: its `app.json` shape, each file’s runtime, and verbatim excerpts of real calls cited to file and line. Also every method called on a value (`text.setProperty(...)`), whose receiver type is left unresolved and matched to a module by name at render time — the only way `setProperty` surfaces at all, since it is never imported.
   - **device list** — `docs/reference/related-resources/device-list.mdx`, the only source that ties an `API_LEVEL` to hardware. One file, two tables with *different* columns, so columns are resolved by header name and a missing one throws.

   Each front also attributes a **runtime** from the path it read the unit from, since no content states one: `docs/reference/device-app-api/` is the Device App, `zeppos-samples/watchface/` is a Watchface, `app-side/` inside any sample app is the Side Service. A path no rule covers gets no runtime rather than a default.
3. **enrich** — groups observations by symbol id and normalizes the metadata that is the point of the project: minimum `API_LEVEL`, runtime, source and confidence tier. Field-level priority is `docs-reference` > `llms` > `sample` — except `runtimes`, which is **unioned** instead, because each front observes a different runtime rather than making a competing claim about the same one. A symbol documented under the Device App API and also seen in a watchface sample is valid in both.
4. **render** — generates four views, plus an `index.md` in each:
   - `api/` — symbols per module
   - `compatibility/` — grouped by minimum `API_LEVEL`, plus `devices.md`
   - `runtimes/` — one page per runtime
   - `patterns/` — one page per best-practice guide
   - `examples/` — one page per sample app, indexed by symbol

   A symbol with no documented minimum is labelled `not stated`, never `any` — absence of a level is absence of evidence, not a compatibility claim. `runtimes/` renders a page for **every** runtime including the ones with no symbols, because a missing page reads like "this runtime does not exist" while a page stating "0 symbols covered" reads like the coverage gap it is. `concepts/` and `tools/` are the two dirs `render` does not write: `concepts/` is hand-written by design, and `tools/` waits on a front. This is what the Agent Skill reads.

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

`OFFICIAL` covers every front but `sample`: reference pages, the phone runtimes and `static/llms` are all official documentation.

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

### Call shapes: `signature` and `shapes`

Both eval runs found the same root gap — the base recorded that a symbol exists and never how to call it. The documentation *did* state it, and the extractor was walking past it: 182 of 269 reference pages carry a signature in a ```ts block under `## Type`, and each of the 13 Settings App components carries a full property table that had been reduced to a bare name.

| Field | Meaning |
| --- | --- |
| `signature` | The call signature the page states, **verbatim**. `(props: Props) => result: RenderFunc` is not valid TypeScript, so normalising it would either lose information or invent a shape the docs never stated |
| `shapes` | Every named property table on the page, keyed by the heading above it — `Props`, `SelectOption`, `Options`, `DownloadTask`. A signature is unusable without them, and `Select`'s `options` is unusable without `SelectOption`. `Props` sorts first |
| `enums` | The value sets this symbol *is* or *returns*. `@zos/ui.align` holds its own members, written as code writes them; `@zos/sensor.BloodOxygen` holds `retCode`, the domain of a value it returns. Each member may state its own `API_LEVEL` and its own confidence, and `partial` marks a set the documentation itself calls incomplete. The one field merged by **union** across sources rather than by priority — see *Coverage and limits* |
| `permissions` | Permission codes `app.json` must declare for the symbol to work. A field rather than a phrase inside `description`, because an undeclared permission fails at **runtime**, not at build — and because leaving it in the prose made 35 symbols read as disagreeing with `static/llms`, which omits the note |
| `members` | What can be called on a value this symbol produces or is — `getCurrent`, `getItem`, `setSource`. A field and not a record, because every id here is something you can import and `@zos/sensor.getCurrent` is not one. Each carries its own signature, prose, and optionally its own `API_LEVEL`, shapes and value sets |

Each property carries `type`, `required`, `default`, `description`, and sometimes its **own** minimum `API_LEVEL`: a symbol you may call can have a property you may not. 484 of the 643 properties state one.

Table columns are resolved by header name, never by position, because the two trees disagree on order *and* wording — `Name | Description | Required | Type | Default` in `app-settings-api`, `Property | Type | Required | DefaultValue | Description | API_LEVEL` in `device-app-api`. A positional read files a type as a description on one of them.

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

### `ExampleRecord`

`data/examples/<id>.json`, one per sample app. The first eval run found the base's
root gap: no record carries a signature, so it answered *may I use X* and never
*how do I call X*. A signature would say `(props: Props) => RenderFunc`; a sample
shows what goes in `props`. And some things exist only here — updating a widget's
text is documented nowhere upstream and appears in 65 sample files.

| Field | Meaning |
| --- | --- |
| `id` / `name` / `tree` / `platformVersion` | Slug and directory name, which tree (`application`, `watchface`, `workout-extensions`), and the version directory it sits in |
| `manifest` | The `app.json` **shape**: top-level keys, declared `permissions`, `targets`. Not its values — an `appId` belongs to whoever registered it |
| `files` | Each file's app-relative path, its runtime, and the symbols it imports |
| `usages` | An imported symbol id and up to two verbatim calls to it, each with file and 1-indexed line |
| `memberCalls` | A method called on some value, with its code. The receiver's **type is not resolved** — that needs flow analysis — so only the name is recorded, and `render` matches it to a module by name and says so |

`enrich` drops every member call whose name no known symbol shares, which is the
join `parse` cannot do: it has no symbol table. That filter cut 1930 raw excerpts
to 592 useful ones, keeping `setProperty` and discarding a hundred
receiver-specific names.

Sample code is `OBSERVED`. It proves a call that works, never a documented
contract, and the pages say so where they quote it.

### `AppJsonRecord`

[`data/app-json.json`](data/app-json.json), one record for the whole
`reference/app-json.mdx` page. `app.json` is not a symbol — it is a tree of
configuration keys, each with its own property table — and it is on the critical
path of every Mini Program: a wrong `targets`, a missing `module` entry point or
an undeclared permission breaks the build or the install before any API matters.

| Field | Meaning |
| --- | --- |
| `sections` | One per documented key: dotted `path`, `parent`, its property table, its verbatim examples, and the `runtime` it turns on where the source states one |
| `gaps` | Keys typed `object` in a table and given no section anywhere on the page — `targets.module.app-service`, the Background Service switch, is one |
| `completeExample` | The whole-file example the page closes with, cited to its line |

A property here carries `minConfigVersion`, not `apiLevel`: the page's last
column is headed *Minimum Version* and holds `v2`/`v3`, which is the
configVersion of the file, not an `API_LEVEL`. Reusing `PropSpec` would have
filed `v3` as level 3, which is why this front has its own row type.

Nesting is derived from **row membership, not heading depth**. `### module:
object` is a child of `targets` written at the same depth as `targets` itself,
while `#### platforms` is its sibling one level deeper — reading `#` would file
`module` at the root. A section is a child of the most recent table with a row
naming it.

### Sync manifest

[`data/manifest.json`](data/manifest.json) records the last sync date, the exact commit of every source repo, and the record counts. It is what makes each entry's "last verified" derivable instead of hand-maintained.

## Repository layout

```
src/
  fetch/    stage 1 — clone/update official repos
  parse/    stage 2 — four extraction fronts
    devices.ts   the device-list front (columns resolved by header name)
    patterns.ts  the best-practice guides front
    examples.ts  the sample apps read as code, with cited excerpts
    manifest.ts  the app.json schema, nested by row membership
    spec.ts      signatures and property tables, columns by header name
    phone.ts     the Side Service + Settings App front (four page shapes)
    runtime.ts   path -> runtime rules, with the doc anchoring each one
    util.ts      dir walk + the LF-normalizing read
  enrich/   stage 3 — merge and normalize into SymbolRecord / PatternRecord
  store/    write the JSON source of truth + manifest
  render/   stage 4 — Markdown generation
    examples.ts  the examples view: symbol -> code, method -> likely symbol
    manifest.ts  the app.json view: key -> runtime, documented vs. observed
    patterns.ts  the patterns view and its join against the symbols
    shared.ts    helpers every view agrees on
  cli.ts    sync / render commands
data/
  manifest.json   sync state: date, source commits, counts
  devices.json    the device list: API_LEVEL, OS version, screen, deviceSource
  app-json.json   the app.json schema: key tree, property tables, gaps
  symbols/        the JSON source of truth, one file per module
  patterns/       one file per best-practice guide
  examples/       one file per sample app: manifest, files, cited excerpts
skills/
  zepp-os/SKILL.md   the Agent Skill
concepts/
  README.md          note index, in two blocks
  dominio.md         the domain model: units, pipeline, what a "front" is
  simbolos.md        symbol, id, module, signature, shape
  runtimes.md        the five runtimes and how they are inferred
  api-level.md       the four version numbers that are not interchangeable
  confianca.md       OFFICIAL vs. OBSERVED, provenance, documented != complete
test/
  fixtures/cache/    trimmed excerpts of the real sources, in cache layout
  *.test.ts          parser and enrich tests
eval/
  task-*.md          tasks an agent attempts using only the rendered base
  results/           one report per run: the gaps it hit, ranked by cost
.cache/     cloned official repos (untracked)
assets/     this repository's own logo — not a Zepp OS app `assets/` directory
```

The generated Markdown lands in `api/`, `compatibility/`, `runtimes/`, `patterns/`, `examples/` and `manifest/`. `concepts/` holds hand-written notes in two blocks: **the domain model** — what a symbol is, what a runtime is, which of the four version numbers answers which question, what a confidence tier promises — and the retrieval stack (RAG, embeddings, vector stores, MCP) and its relation to this project. Start at [concepts/dominio.md](concepts/dominio.md); index at [concepts/README.md](concepts/README.md). `tools/` stays empty until a front exists to fill it — the raw material is already in `.cache/` (`guides/tools/` + `guides/version-info/`), so it is a parsing job, not a curation job.

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
9. **A description is the page's prose, and only that.** These are MDX pages, so the extractor has to know what is not prose: the `API_LEVEL` badge blockquote, MDX component imports, illustrations — written as markdown on one page and as a multi-line JSX tag on another, which is why tags are stripped as units rather than per line — and the `:::info` fence markers, whose *contents* are kept because that is where a permission code is stated. It ends at the first `## ` or code fence after the title so a page without sections doesn't swallow its example.
10. **A section heading is never a symbol.** `Constants`, `Overview`, `Usage`, `Submodules` and `Import` title parts of a document; a heading containing whitespace (`Widget Animation`, `keyboard API`) titles a group of symbols that its own `### Import` names. Both were being filed as symbols, inventing ids like `@zos/ui.Submodules` that nothing can import. A page named `overview`, `index` or `readme` is excluded from the directory fallback for the same reason.
11. **A pseudo-module id for an API with no import.** The phone runtimes are globals, so there is no module to read. The docs' own grouping stands in: the containing directory when a page sits in one (`ui/button.mdx` → `ui`, the family `Settings.render` draws from), else the filename. The tree name is deliberately dropped, so both trees' `settings-storage` pages map to one id, enrich merges them, and the record comes out valid in **both** runtimes — which is what the sources state, since `app-settings-api/settings-storage.mdx` is literally an MDX re-export of the Side Service page. These ids are locators into this knowledge base, not something to type in code.
12. **Sample code is a source, not a citation pool.** The samples front read 33k lines of working JavaScript for the *names* in its import lines and threw the rest away. Reading the same files as code answers the question a signature cannot — what to pass — and reaches API that has no import line at all. Excerpts are quoted verbatim with file and line rather than summarised, because the value is that the code runs.
13. **Five runtimes, not six.** `guides/architecture/arc.mdx` names three parts of a Mini Program — Device App, Settings App, Side Service — and `guides/architecture/folder-structure.mdx` shows `app-side/` **is** the Side Service directory. "App-side" and "Side Service" were the same runtime under two names, so only one is kept. Shortcut Card (`app-widget/`) and SecondaryWidget (`secondary-widget/`) are extra entry points rather than extra runtimes: they execute on the watch like the Device App, and attribute to it.

14. **`app.json` gets its own dir, and its gaps are content.** It is neither a symbol nor a runtime, so it belongs in neither `api/` nor `runtimes/`; `manifest/` owns its own dir for the same reason `compatibility/` owns `devices.md` — `prepareOutDir` clears a directory, so two writers cannot share one. Its value is four joins the source cannot make: manifest key → runtime (nothing upstream connects them, so *"which key ships a Side Service"* is otherwise unanswerable), the documented key tree diffed **both ways** against 33 working manifests, permission string → the symbols whose docs state it, and the keys the page types as objects and never describes. A page rendering only the documented tree would be a copy of the upstream page.

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

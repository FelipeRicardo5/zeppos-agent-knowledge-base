# Changelog

Versions are stamped into [`data/manifest.json`](data/manifest.json) by `render`,
so a consumer can cite what they read without a git checkout. That is not
bookkeeping: an eval run is handed a copy built with `git archive`, which has no
`.git`, and the run that found the most had to report "no commit available".

Until 0.3.0 only `sync` wrote that stamp, which made a release a network
operation: reaching the manifest meant re-fetching both upstream repositories
and committing whatever they had changed alongside the version. `0.2.0` has no
entry below for the same reason the stamp was easy to forget — the release was
a side effect of a sync rather than a step of its own.

## 0.3.0 — 2026-09-27

Built from the same sources as 0.2.0 — `zeppos-docs` at `c08725b2`,
`zeppos-samples` at `7cee748b`. Nothing was re-fetched: every change here is in
what this base reads out of sources it already held.

### The limitation 0.1.0 published, answered

That release listed this under what it cannot do:

> **A table that names its shape with a heading instead of a column is not
> read.** `hmSetting/setBrightScreen.mdx` states a return shape as
> `| Dscription | Type |` under a `### result` heading, and nothing connects the
> two.

It is read now. 88 pages write the name as the heading over a table with no
column for it, and every row had been dropped without an error — the failure
mode every parser bug in this project has had. **142 symbols carry 232 such
declarations**, and a signature that ends in a type no source on its page
defines went from **123 of 211 to 8**. Those 8 now say so on the page, because a
reader who follows `getScreenType(): screenType` and finds a bare word needs to
be told it is an upstream silence and not an omission here.

Three column maps were wrong in the same direction, and each was found by
reading the corpus for something else:

- `Dscription` and `Description-` — one upstream typo each, both heading the
  table that states what the function returns.
- `algorithmId` heads the `alg.*` rows in `crypto/`. Without it `alg` carried
  **1 member of 10**, and `createCrypto` cannot be called with the nine that
  were missing.
- The diagnostic's own allowlist had silenced that heading on a false claim.
  Entries that silence nothing are now reported on every sync; one is idle
  today (`location`).

### Figures that can no longer go stale

A number about the data, typed into prose, has shipped wrong five times in this
repository. Both READMEs now render their coverage table from `data/` on every
`npm run render`, from one computation, and CI diffs the result — so a stale
figure breaks the build instead of misleading a reader.

`site/` is the same rule applied to the landing page: generated from those
counts, committed, inside the CI diff, and published by `pages.yml`.

### Releasing no longer requires a fetch

`render` stamps `data/manifest.json` with the version in `package.json`, and
touches nothing else in it — `lastSyncAt`, `sources` and `recordCounts` are
claims about a fetch, and rewriting them outside one would assert a sync that
never happened. `data/manifest.json` joins the CI reproducibility diff, so a
bump that never reached the manifest fails the build rather than reaching an
eval run that has no `.git` to correct it from.

### What it still cannot do

Unchanged, and worth re-reading before depending on it: only the Device App can
be certified for a device (353 of 375 symbols state a minimum `API_LEVEL`,
against 3 of 105 for the Watchface runtime and **none** for the Settings App and
Side Service); no `hm*` symbol documents a permission; and 36 tables under 33
headings still have no column map. The Side Service remains the only runtime
that states nothing but a description on every axis.

## 0.1.0 — 2026-09-11

First tagged version. Built from `zeppos-docs` at `c08725b2` and
`zeppos-samples` at `7cee748b`.

### What it holds

**513 symbols across 50 modules**, from 241 reference pages, 89 watchface pages,
36 phone-runtime entries, 443 `static/llms` entries and 785 sample observations.
496 `OFFICIAL`, 17 `OBSERVED`.

| Axis | Coverage |
| --- | --- |
| Minimum `API_LEVEL` | 353 symbols |
| Descriptions | 435 symbols |
| Call signatures | 234 symbols |
| Object shapes | 358 shapes, 1473 properties, 591 with their own minimum level |
| Value sets | 73 sets, 492 members |
| Instance members | 257 on 46 symbols, 44 with their own minimum level |
| Permissions | 35 symbols, 24 distinct codes |
| Devices | 41, with the `st`/`sr`/`deviceSource` selectors each needs |
| Sample code | 33 apps, 653 cited excerpts |
| `app.json` | 20 documented keys, two-way diffed against 33 working manifests |
| Zeus CLI | 8 commands, joined to the runtimes their scaffold turns on |

Ten parse fronts, eight rendered views, and three things that check it:
`npm test` (262 fixture-based tests), `npm run verify` (20 questions asked of
the *rendered* pages), and CI, which re-renders and fails if the result differs
from what is committed.

### What it cannot do, measured

This is the half worth reading before depending on it.

- **Only the Device App can be certified for a device.** 353 of its 375 symbols
  state a minimum `API_LEVEL`. The Settings App and Side Service state **none**,
  the Watchface runtime states 3 of 105, and the Workout Extension 3 of 12 — no
  upstream page in those trees carries a badge. Those runtimes answer "does this
  exist" and never "will it run on the hardware I ship to".
- **No `hm*` symbol documents a permission**, so an empty `permissions` array in
  a watchface manifest is the only citable choice rather than a verified one.
- **A table that names its shape with a heading instead of a column is not
  read.** `hmSetting/setBrightScreen.mdx` states a return shape as
  `| Dscription | Type |` under a `### result` heading, and nothing connects the
  two. 255 tables across 157 pages of the symbol-documentation trees have no
  name-bearing column at all; an unknown share of those are shapes this base
  should hold. The `sync` diagnostic cannot see them, because their columns *are*
  read — it reports only headings nothing reads, 36 tables under 34 headings
  today, with an allowlist naming the ones that are legitimately not symbol
  documentation.
- **Methods reached through a returned object** are recorded only where a page
  declares a `Methods` section: 46 symbols carry them.
- **The editable-watchface mechanism is undocumented upstream.** The only page
  covering it is a walkthrough of a no-code web editor.
- **A missing symbol means *not covered*, never *does not exist*.**

Two independent evaluation runs are recorded in [`eval/results/`](eval/results/),
each scored by requirements the base can vouch for rather than by blocks: 3 of 5
on a full Mini Program, 4 of 7 on a watchface. Both reports list every
assumption the agent had to make.

### Notable in this version

- **`annotations/`** — the one input a human writes. Rendered beside an
  extracted fact, never merged into it, and pinned to the values it was written
  against so `verify` fails when the ground moves.
- **`api/lookup.md`** — 733 names indexed against their owner: symbols,
  instance members and enum values. 241 names have more than one owner, which
  the runtime column separates.
- **`conflicts/index.md`** — where the sources contradict each other, including
  13 method calls whose name resolves to more than one thing inside a sample's
  own runtime.
- **`data/diagnostics.json`** — the table headings nothing reads, so the next
  upstream format change arrives as a number that moved rather than as a
  silence.

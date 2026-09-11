# Changelog

Versions are stamped into [`data/manifest.json`](data/manifest.json) by `sync`,
so a consumer can cite what they read without a git checkout. That is not
bookkeeping: an eval run is handed a copy built with `git archive`, which has no
`.git`, and the run that found the most had to report "no commit available".

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

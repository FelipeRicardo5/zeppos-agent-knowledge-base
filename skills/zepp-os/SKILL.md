---
name: zepp-os
description: Guides an agent writing Zepp OS code to check runtime/API_LEVEL compatibility against this knowledge base before suggesting an API.
---

# Zepp OS

Before suggesting any Zepp OS API:

**If you are building rather than checking**, read in this order instead of the one
below, which is written for *may I use symbol X here*:

1. `../../examples/index.md` — find the closest whole sample and read its page end
   to end. Its **Methods called on a value** section is where the call shapes are, and
   many of them appear nowhere else in the base.
2. That sample's modern siblings, for the current idiom rather than a 2.0-era one.
3. `../../patterns/` for the cross-cutting mechanics — persistence, screen
   adaptation, `app.json` targets, logging, i18n.
4. `../../api/` and `../../compatibility/` **last**, as a verification pass over a
   design you already drafted.

`api/` is where a question ends, not where it starts. The steps below are that
verification pass.

1. **Identify the target runtime**: Device App, Side Service, Settings App, Watchface or Workout Extension. A full Mini Program uses three of them — Device App on the watch, Settings App and Side Service in the Zepp App — and a symbol from one is not available in another. `../../runtimes/index.md` lists all five with their coverage; `../../runtimes/<runtime>.md` lists the symbols attributed to one.
2. **Identify the target `API_LEVEL`** — or, better, the target *device*. `../../compatibility/devices.md` maps every device to the level it reaches, so "does this run on a Bip 6?" has a direct answer. A level alone is not one.
3. **Check the symbol on both axes before recommending it** — `../../runtimes/` for the runtime, `../../compatibility/` for the minimum `API_LEVEL`, `../../api/` for the module's symbols and descriptions.
4. **To see a symbol actually used**, go to `../../examples/index.md` — 33 sample apps indexed by symbol, with verbatim code. This is the only place that answers *how do I call this*; see below.
5. **When the question is a task rather than a symbol** ("how do I communicate between pages", "how do I adapt to a round screen"), start at `../../patterns/index.md`. Each pattern page carries the official snippet, the symbols it uses, and the minimum `API_LEVEL` the whole task needs — the highest minimum among those symbols. Its symbol-to-patterns index also goes the other way: given a symbol, it finds working code for it.
6. Prefer official docs and samples (confidence tier `OFFICIAL`/`OBSERVED`) over anything inferred.
7. Never assume a browser or Node.js API exists on the Zepp OS runtime.
8. If the knowledge base doesn't cover a symbol, or the answer is unclear, **say so explicitly** rather than guessing.

## Answering a device question

`../../compatibility/devices.md` has three sections, and which one a device is in changes the answer:

- **Devices running Zepp OS** — has a stated `API_LEVEL`. A symbol is available when its minimum is at or below that level. The page's *Symbols available* count is a floor: it excludes every symbol with no stated minimum rather than assuming it available, and that exclusion is large. Read the count off the page; never quote a number from here.
- **Zepp OS 1.0 devices** — the device list states no `API_LEVEL`. That is not level 0: **no symbol in this KB is available** on that hardware, because the 2.0 API does not run on it.
- **Devices that do not run Zepp OS** — takes watchfaces, runs no Mini Program. Nothing in `../../api/` applies.

The list records each device's *latest* level, so an answer assumes the device is updated. It says nothing about the firmware a given user is on — flag that when it matters.

## The gap that will bite you first

**A symbol with no stated `API_LEVEL` cannot be certified for any device**, and
that includes `@zos/ui.widget`, `align`, `text_style` and `prop` — which no
Device App UI compiles without. They are `OBSERVED`: seen in official sample
code with no documentation entry, so they carry no level and no description.

When you build a UI, say plainly that the level cannot be verified for the
widget primitives, instead of reporting a device's *Symbols available* count as
if it covered them. It does not.

That holds for the whole `OBSERVED` tier: every symbol in it is name-only — no
description, no level, no signature. Read it as "this exists" and nothing more.

## How to find out how a symbol is called

**No record has a signature.** `type` holds only `function`, `constant` or
`value` — no parameter list, no return type. So `api/` and `compatibility/`
answer *may I use X here*, and for *how do I call X* go to
`../../examples/index.md`.

It indexes 33 official sample apps by symbol: arrive with a symbol from `api/`,
leave with verbatim code that calls it, cited to a file and line. Two sections
matter most:

- **Where a symbol is used** — for anything with an import line.
- **Methods called on a value** — for anything without one. `setProperty` is
  never imported, so it appears nowhere else; this is where updating a widget
  after creation is answered, which upstream documents nowhere.

A method there is matched to its module **by name**, with the receiver's type
unresolved. Read `likely @zos/ui.setProperty` as a strong hint, not a fact.

Sample code is `OBSERVED`: it proves a call that works, not a documented
contract. Say which is which when you cite it.

Where a description and a sample disagree about a call — one showing a module
function, the other an instance method — the sample is code that runs. Prefer
it, and flag the conflict.

## Where `app.json` comes from

The base does not document `app.json` as a reference page, but
`../../examples/index.md` ends with what 33 working manifests contain: which
top-level keys appear in how many of them, and every permission they declare. A
key present in 33 of 33 is not optional. Each example page also shows that app's
own `permissions` and `targets`.

A permission a symbol needs but `app.json` omits fails at **runtime**, not at
build. Cross-check the two before saying a project is complete.

## What absence means here

This knowledge base is incomplete by construction, so a symbol you cannot find is
**not covered**, never **does not exist**. Report it that way.

- `not stated` in an `API_LEVEL` column means no source documents a minimum. It does *not* mean the symbol works at any level.
- The runtime axis is heavily skewed: 373 of 409 symbols are Device App. Every runtime is covered, but the Settings App's 21 and the Side Service's 20 carry **no `API_LEVEL`** — no page in either tree states one — so they answer "does this exist here" but not "since when".
- The **watchface `hm*` API is not covered at all** (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`). The 3 Watchface symbols here are `@zos/*` calls seen in watchface samples. Answer a `hm*` question from the official docs and say so.
- Methods reached through a returned object (`DownloadTask.cancel`, `Onbox.enqueFile`) are not recorded. Their parent function is.
- A pattern's `Minimum API_LEVEL` is **derived**, not quoted: it is the highest minimum among the symbols the guide's code uses, and it skips symbols this KB has no record for. Treat it as a floor, and check the page's own "no record" flag before calling a pattern verified.
- The Side Service and Settings App **are** covered: see `../../runtimes/side-service.md` and `../../runtimes/settings.md`, plus `../../api/fetch.md` and `../../api/settings-storage.md`. What is missing there is narrower than the runtime: the Settings App's **entry point** (the function that registers a settings page) and the **props of its `ui.*` components` — the base has 13 component names and one sentence of description across all of them. Those two, answer from the official docs and say so; everything else in those runtimes, answer from here.
- The watchface `hm*` API (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) is genuinely not extracted — 93 upstream pages, none of them parsed. The Watchface symbols here are `@zos/*` calls seen in watchface samples.

## Where the numbers come from

`../../data/manifest.json` records the exact upstream commit of each source repo and
the record counts for the last sync, so "last verified" is derivable rather than
claimed. Cite it when the freshness of an answer matters.

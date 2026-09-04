---
name: zepp-os
description: Guides an agent writing Zepp OS code to check runtime/API_LEVEL compatibility against this knowledge base before suggesting an API.
---

# Zepp OS

Before suggesting any Zepp OS API:

1. **Identify the target runtime**: Device App, Side Service, Settings App, Watchface or Workout Extension. `../../runtimes/index.md` lists all five with their coverage; `../../runtimes/<runtime>.md` lists the symbols attributed to one.
2. **Identify the target `API_LEVEL`** — or, better, the target *device*. `../../compatibility/devices.md` maps every device to the level it reaches, so "does this run on a Bip 6?" has a direct answer. A level alone is not one.
3. **Check the symbol on both axes before recommending it** — `../../runtimes/` for the runtime, `../../compatibility/` for the minimum `API_LEVEL`, `../../api/` for the module's symbols and descriptions.
4. **When the question is a task rather than a symbol** ("how do I communicate between pages", "how do I adapt to a round screen"), start at `../../patterns/index.md`. Each pattern page carries the official snippet, the symbols it uses, and the minimum `API_LEVEL` the whole task needs — the highest minimum among those symbols. Its symbol-to-patterns index also goes the other way: given a symbol, it finds working code for it.
5. Prefer official docs and samples (confidence tier `OFFICIAL`/`OBSERVED`) over anything inferred.
6. Never assume a browser or Node.js API exists on the Zepp OS runtime.
7. If the knowledge base doesn't cover a symbol, or the answer is unclear, **say so explicitly** rather than guessing.

## Answering a device question

`../../compatibility/devices.md` has three sections, and which one a device is in changes the answer:

- **Devices running Zepp OS** — has a stated `API_LEVEL`. A symbol is available when its minimum is at or below that level. The page's *Symbols available* count is a floor: it excludes the 29 symbols with no stated minimum rather than assuming them available.
- **Zepp OS 1.0 devices** — the device list states no `API_LEVEL`. That is not level 0: **no symbol in this KB is available** on that hardware, because the 2.0 API does not run on it.
- **Devices that do not run Zepp OS** — takes watchfaces, runs no Mini Program. Nothing in `../../api/` applies.

The list records each device's *latest* level, so an answer assumes the device is updated. It says nothing about the firmware a given user is on — flag that when it matters.

## What absence means here

This knowledge base is incomplete by construction, so a symbol you cannot find is
**not covered**, never **does not exist**. Report it that way.

- `not stated` in an `API_LEVEL` column means no source documents a minimum. It does *not* mean the symbol works at any level.
- The runtime axis is heavily skewed: 375 of 383 symbols are Device App. **The Settings App has no symbols at all**, and the Side Service's and Watchface's come from sample code rather than a documentation entry.
- A pattern's `Minimum API_LEVEL` is **derived**, not quoted: it is the highest minimum among the symbols the guide's code uses, and it skips symbols this KB has no record for. Treat it as a floor, and check the page's own "no record" flag before calling a pattern verified.
- The documented API surface is the Device App's `@zos/*` modules. The Side Service and Settings App use globals (`fetch`, `settingsStorage`, `Settings.render`) that are not extracted yet, and the watchface `hm*` API is not extracted either. Questions about those are outside what this KB can answer — answer from the official docs and say where the answer came from.

## Where the numbers come from

`../../data/manifest.json` records the exact upstream commit of each source repo and
the record counts for the last sync, so "last verified" is derivable rather than
claimed. Cite it when the freshness of an answer matters.

---
name: zepp-os
description: Guides an agent writing Zepp OS code to check runtime/API_LEVEL compatibility against this knowledge base before suggesting an API.
---

# Zepp OS

Before suggesting any Zepp OS API:

1. **Identify the target runtime**: Device App, Side Service, Settings App, Watchface or Workout Extension. `../../runtimes/index.md` lists all five with their coverage; `../../runtimes/<runtime>.md` lists the symbols attributed to one.
2. **Identify the target `API_LEVEL`.**
3. **Check the symbol on both axes before recommending it** — `../../runtimes/` for the runtime, `../../compatibility/` for the minimum `API_LEVEL`, `../../api/` for the module's symbols and descriptions.
4. Prefer official docs and samples (confidence tier `OFFICIAL`/`OBSERVED`) over anything inferred.
5. Never assume a browser or Node.js API exists on the Zepp OS runtime.
6. If the knowledge base doesn't cover a symbol, or the answer is unclear, **say so explicitly** rather than guessing.

## What absence means here

This knowledge base is incomplete by construction, so a symbol you cannot find is
**not covered**, never **does not exist**. Report it that way.

- `not stated` in an `API_LEVEL` column means no source documents a minimum. It does *not* mean the symbol works at any level.
- The runtime axis is heavily skewed: 267 of 276 symbols are Device App. **The Settings App has no symbols at all**, and the Side Service's and Watchface's come from sample code rather than a documentation entry.
- The documented API surface is the Device App's `@zos/*` modules. The Side Service and Settings App use globals (`fetch`, `settingsStorage`, `Settings.render`) that are not extracted yet, and the watchface `hm*` API is not extracted either. Questions about those are outside what this KB can answer — answer from the official docs and say where the answer came from.

## Where the numbers come from

`../../data/manifest.json` records the exact upstream commit of each source repo and
the record counts for the last sync, so "last verified" is derivable rather than
claimed. Cite it when the freshness of an answer matters.

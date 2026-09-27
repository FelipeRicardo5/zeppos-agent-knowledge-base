---
name: zepp-os-mcp
description: Guides an agent writing Zepp OS code to query this knowledge base through its MCP tools — the same base as the zepp-os skill, reached by asking instead of by reading.
---

# Zepp OS, queried

This is the `zepp-os` skill for a consumer that has the MCP server and not the
rendered tree. Same base, same rules, different reach: there are no files to
open, so every answer comes from a tool call and every tool result carries the
provenance a page would have shown.

**There is no fallback.** If a tool has no answer, that is the base going
silent, and a silence is reported — never filled from memory, from Zepp's
public docs, or from what a similar API does on another platform.

## Call `get_freshness` first

It returns the version, the upstream commits and the record counts. A report
that cannot name the version it read cannot be compared with another, and this
is the only place that version exists — the copy you are reading has no `.git`.

## If you are building, ask in this order

The order matters, and it is the opposite of the order that serves *may I use
symbol X here*. Three evaluation runs converged on it: `get_symbol` is where a
question ends, not where it starts.

1. **`find_app`** — which whole sample app is closest to the task. Filter by
   text, runtime, or the permission the design will need.
2. **`describe_app`** — that app assembled: what it declares itself to be, its
   entry points per runtime, its family and siblings. Read the siblings before
   copying an idiom; a 2.0-era app and its 4.0 sibling are the same app in two
   different languages.
3. **`describe_wiring`** — if the design crosses runtimes, this is the one that
   pays. It returns every site that writes a message and every site that reads
   one, in the same answer. The third evaluation run invented
   `this.request({method, params})`; twelve sample call sites write
   `{type, params}`, and the receiving half destructures exactly that. Use
   `list_wiring` to see which apps pass messages at all.
4. **`list_patterns` / `get_pattern`** — the cross-cutting mechanics:
   persistence, screen adaptation, logging, i18n. A pattern carries the minimum
   `API_LEVEL` the whole task needs, which no single symbol states.
5. **`get_symbol`, `list_module`, `check_compatibility`** — last, as a
   verification pass over a design you already drafted.

## If you have a bare name and nothing else

- **A name out of code you are reading** — `lookup`. It resolves symbols,
  instance members, enum values and shape properties in one call. A name with
  several owners is not a duplicate: `createWidget` exists in two runtimes and
  `setProperty` on more than one kind of value. Pick the owner whose runtime is
  the one you are building, and say which you picked.
- **A bare `.method()` on a value you did not create** — `resolve_call`. It
  answers with candidates, not a verdict, because the base cannot see what the
  value is.
- **A whole module** — `list_module`. Read its submodules: `hmSensor` holds
  three symbols and the 18 sensor ids live in `hmSensor.id`, which is a module
  of its own.

## Compatibility is two axes, and both are asked for

Never answer a hardware question from an `API_LEVEL` alone.

- `check_compatibility` with a `device` name is the answer to "will this run on
  the watch I ship to". With an `apiLevel` it answers the narrower question.
- `get_device` gives one device's level, OS version, screen and physical keys.
- `list_by_api_level` and `list_by_runtime` go the other way — what is available
  at a level, or in a runtime.

`check_compatibility` returns one of four verdicts per symbol, and two of them
are real answers rather than failures:

- **RUNS** — the symbol states a minimum and the target meets it.
- **TOO_NEW** — it states a minimum the target does not meet.
- **UNKNOWN** — no source states a minimum. Common, and not a licence to assume
  one. Say that the symbol is unverifiable on that target.
- **NOT_COVERED** — this base has no record of the name. It means *not covered*,
  never *does not exist*.

## What this base does not cover, by runtime

Coverage is uneven, and a single figure hides it. Do not quote numbers from
memory — `list_by_runtime` reports what each runtime actually states. What is
structural, and worth knowing before you start:

- **Only the Device App can be certified for a device.** Nearly all of its
  symbols state a minimum level; the Watchface runtime states almost none, and
  the Settings App and Side Service state none at all. Those runtimes answer
  "does this exist" and never "will it run on the hardware I ship to".
- **The Side Service states nothing but a description** on every axis — no
  level, no signature, no members, no permission.
- **No `hm*` symbol documents a permission.** An empty `permissions` array in a
  watchface manifest is a citable choice, not a verified one.
- **Nothing here compiles or runs code.** Every verdict is static.

## Before you call it done

Run **`check_app`** on the directory you produced. It returns three verdicts —
VOUCHED, UNVERIFIABLE, VIOLATION — and never a pass. Every official sample
passes it with zero violations while still carrying symbols this base cannot
speak to, so "no violations" is not approval. Read `notChecked`: it names what
the check could not reach.

Then report, per requirement, which of the three it is. A requirement delivered
on an assumption the base could not back is **not** a requirement met — say so
in those words, and name the assumption.

## Standing rules

- An absent field comes back with the reason it is absent. That reason is the
  answer; do not replace it with a plausible value.
- Cite the tool and the id you got a fact from, the way a reader of the rendered
  base would cite a page.
- Never assume a browser or Node.js API exists on any Zepp OS runtime.
- When the base is silent, say it is silent, and label every assumption you had
  to make to keep going.

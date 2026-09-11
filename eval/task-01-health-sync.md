# Eval task 01 — health data sync

A task for an agent to attempt using **only this knowledge base**, so that the
gaps it hits become a measured list instead of a guess.

The point is not the app. The point is the report at the end: every question the
agent had, and whether the base answered it.

## How to run

Give the agent everything below the line, from a checkout of this repository —
and see [`task-01-notes.md`](task-01-notes.md) for the run protocol first. Do not
give the agent that notes file: it names the gaps already known.

---

You are building a Zepp OS Mini Program. You have access to a knowledge base in
this repository and **nothing else**.

## What to build

An app called **HeartSync** that:

1. On the watch, reads the wearer's current heart rate and shows it on screen,
   updating as it changes.
2. Sends each reading to an HTTP endpoint the user configures.
3. Has a settings screen in the phone app where the user enters that endpoint
   URL and picks a sync interval from a list.
4. Persists the endpoint so it survives the app closing.
5. Targets the **Amazfit Bip 6** specifically. State whether it also runs on an
   Amazfit Bip 5, and say why or why not.

Produce the actual project: `app.json`, the Device App page, the Side Service,
the Settings App, and whatever else the app needs to run. Real code, not
pseudocode.

## The one rule that matters

**Every API you use must be justified by a citation into the knowledge base**,
written inline as a comment or noted beside the code — the file and the line or
row you read it from. For example:

```js
import { Time } from '@zos/sensor' // api/zos-sensor.md — Time, >= 2, Device App
```

You may read:

- `api/` — symbols per module, with descriptions, and `api/lookup.md`
- `compatibility/` — minimum `API_LEVEL` per symbol, and `compatibility/devices.md`
- `runtimes/` — which runtime each symbol is valid in
- `patterns/` — task-shaped guides extracted from official best practice
- `examples/` — the official sample apps indexed by symbol, with verbatim code
- `manifest/` — the `app.json` schema, and what real manifests do
- `conflicts/` — where the sources contradict each other
- `data/` — the JSON these are generated from, if a Markdown page is ambiguous
- `skills/zepp-os/SKILL.md` — how this base is meant to be used

That list is every output directory. It is given in full **on purpose**: an
earlier run reported a whole subject as uncovered when the pages existed, and a
list that omits a directory cannot tell that failure apart from a real gap.

Read `skills/zepp-os/SKILL.md` first. It states the order the base expects to be
read in and the limits it knows about itself; whether that order matches the
order your work actually wanted is one of the things to report.

You may **not** read:

- `.cache/` — the raw upstream documentation. Reading it measures Zepp's docs,
  not this base, and defeats the whole exercise.
- the web, npm, or any Zepp OS documentation outside this repository
- `src/` or `test/` — the extractor's own source
- **`eval/`, including this file's own directory.** Earlier runs' reports list
  every gap that was found and the apps they produced contain the workarounds.
  Reading them turns a measurement into a recital. If you were handed this task
  as text and cannot see an `eval/` directory, good — that is the intended setup.

**When the base does not answer a question, do not fill the gap from your own
knowledge of Zepp OS or of similar platforms.** Stop, write the gap down, and
then continue with an explicitly labelled assumption. An assumption you flagged
is a finding; an assumption you smoothed over is a corrupted result. If you
cannot proceed at all, say so and stop — a blocked task is a valid outcome and
more useful than a plausible-looking app built on invention.

If a page says a symbol's `API_LEVEL` is `not stated`, that means no source
documented one. It does **not** mean any level works. Treat absence as absence
of evidence and record it as a gap.

## What to report

After the app — or after getting blocked — write the report. This is the
deliverable.

### 0. What you were measuring

The knowledge base changes between runs, so a report without a version cannot be
compared with another. State the **`version`** from `data/manifest.json`, along
with its `lastSyncAt`, `sources` and `recordCounts`. That file is in the tree you
were given, so the version is always answerable — the repository commit usually
is not, because the isolated copy is built without a `.git` directory.

### 1. Verdict

Did you finish? If not, what stopped you? Would you ship this code?

### 2. Question log

Every question you had while building, in the order you had them. One row each:

| # | Question | Where you looked | Outcome | What you did |
|---|---|---|---|---|

`Outcome` is exactly one of:

- **ANSWERED** — the base answered it directly
- **SILENT** — the base has no record of it
- **WRONG** — the base stated something you believe is incorrect (say why)
- **BURIED** — the answer was there but took more than about three file reads,
  or you found it by luck rather than by following the structure
- **AMBIGUOUS** — the base said something that could be read two ways

Include the questions that went well. A log of only failures cannot show what
share of the work the base carried.

### 3. Gaps, ranked

For each **SILENT**, **WRONG**, **BURIED** or **AMBIGUOUS** row, one entry:

- **What was missing** — the specific fact, not the topic
- **Where it should have lived** — an existing file and field if possible, or a
  new one you would create
- **What it cost** — blocked the task / forced an assumption / wasted time
- **How you worked around it**, if you did

Rank by cost, worst first.

### 4. Structural notes

Things about the shape of the base rather than its content:

- Did you read the pages in the order `SKILL.md` describes? If not, what order
  did the work actually want?
- Which page did you return to most? Which did you never open?
- Was anything actively misleading — a page whose organisation pointed you the
  wrong way, even though its facts were right?
- What would you have wanted to search for, if search existed?

### 5. Trust check

Three specific claims you made in the code that the base supports, with
citations — and three you made that it does not. Be honest about the second
list; it is the most valuable part of this report.

# Eval task 02 — an editable watchface

A task for an agent to attempt using **only this knowledge base**, so that the
gaps it hits become a measured list instead of a guess.

The point is not the watchface. The point is the report at the end: every
question the agent had, and whether the base answered it.

**Why this task exists.** Task 01 exercises the three parts of a Mini Program,
all of them `@zos/*`. A watchface is a different runtime with a different API —
the `hm*` globals — nothing is imported, and **no page in that tree states an
`API_LEVEL`**. 102 of the base's symbols have never been read by a run.

## How to run

Give the agent everything below the line, from a checkout of this repository —
and see [`task-02-notes.md`](task-02-notes.md) for the run protocol first. Do not
give the agent that notes file: it names the gaps already known.

---

You are building a Zepp OS **watchface**. You have access to a knowledge base in
this repository and **nothing else**.

## What to build

A watchface called **PulseFace** that:

1. Shows the current time as digits, updating every minute.
2. Shows the wearer's current heart rate, updating as it changes, and shows a
   placeholder when there is no reading.
3. Shows a step count and its daily target, as text.
4. Draws a circular progress arc for steps against that target.
5. Has **one editable slot** the wearer can point at a different data type from
   the watch's own watchface editor.
6. Stops updating when the screen is off and resumes when it comes back, so it
   does not drain the battery.
7. Runs on a **round 480×480** device and a **square 390×450** one from one
   project. State what changes between them and where that is configured.

Produce the actual project: `app.json`, the watchface entry file, and whatever
else it needs to run. Real code, not pseudocode.

## The one rule that matters

**Every API you use must be justified by a citation into the knowledge base**,
written inline as a comment or noted beside the code — the file and the line or
row you read it from. For example:

```js
const time = hmSensor.createSensor(hmSensor.id.TIME) // api/hmSensor.md — createSensor
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

That list is every output directory, given in full on purpose: a list that omits
one cannot tell "the agent never found the page" apart from "the page does not
exist".

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
knowledge of Zepp OS or of similar platforms.** This matters more here than in
task 01: the `hm*` API resembles other embedded UI toolkits closely enough that
a plausible invention is easy and indistinguishable from a citation. Stop, write
the gap down, then continue with an explicitly labelled assumption. An
assumption you flagged is a finding; an assumption you smoothed over is a
corrupted result.

If a page says a symbol's `API_LEVEL` is `not stated`, that means no source
documented one. It does **not** mean any level works. You will meet this
constantly in this task — say what it costs you rather than working around it
silently.

## What to report

After the watchface — or after getting blocked — write the report. This is the
deliverable.

### 0. What you were measuring

State the repository commit you read, and the `lastSyncAt` and `recordCounts`
from `data/manifest.json`. If you cannot see the commit, say so.

### 1. Verdict, per requirement

Not "did you finish". For **each** of the seven numbered requirements, one of:

- **VOUCHED** — every API in it is cited to a record, and the citations hold.
- **DELIVERED, UNVOUCHED** — there is working-looking code and at least one part
  of it rests on a labelled assumption. Name the assumption.
- **BLOCKED** — you stopped.

Then: would you ship this?

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
- **Where it should have lived** — an existing file and field if possible
- **What it cost** — blocked a requirement / forced an assumption / wasted time
- **How you worked around it**, if you did

Rank by cost, worst first.

### 4. Structural notes

- Did you read the pages in the order `SKILL.md` describes? If not, what order
  did the work actually want?
- `api/lookup.md` indexes every name against its owner. Did you use it? Did it
  help, and did a name with several owners cost you anything?
- Which page did you return to most? Which did you never open?
- Was anything actively misleading — a page whose organisation pointed you the
  wrong way, even though its facts were right?

### 5. Runtime confusion check

This is specific to this task, and it is the thing most worth measuring.

The base holds two UI APIs whose names overlap almost completely:
`@zos/ui.createWidget` and `hmUI.createWidget`, `align` and `hmUI.align`,
`setProperty` on both. One is for a Mini Program page and one is for a
watchface.

- Did you ever cite a `@zos/*` record while writing watchface code, or the
  reverse? Find every instance and list it — including ones you caught and
  fixed, and how you noticed.
- Where did the base help you keep them apart, and where did it let them blur?

### 6. Trust check

Three specific claims you made in the code that the base supports, with
citations — and three you made that it does not. Be honest about the second
list; it is the most valuable part of this report.

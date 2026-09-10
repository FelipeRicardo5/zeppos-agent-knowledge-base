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
3. `../../manifest/index.md` for the `app.json` the design needs — the module
   keys that turn on the runtimes you picked in step 1, and the permissions the
   symbols you picked will need. Getting this wrong breaks the build before any
   API runs.
4. `../../patterns/` for the cross-cutting mechanics — persistence, screen
   adaptation, logging, i18n.
5. `../../api/` and `../../compatibility/` **last**, as a verification pass over a
   design you already drafted.

`api/` is where a question ends, not where it starts. The steps below are that
verification pass.

**If you have a bare name and nothing else** — a symbol out of code you are
reading, a method called on a value, a constant passed to a function — start at
`../../api/lookup.md`. It indexes every name in the base against what owns it,
with the runtime and the minimum level on the row. One read, not three.

A name with several owners is not a duplicate: 12 sensors document a
`getCurrent` and they return 12 different shapes; `CENTER_H` is `@zos/ui.align`
in a Device App and `hmUI.align` in a watchface. Pick the row whose runtime
matches what you are building, and say which one you picked.

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

### Making an app build for a device

Same page, section *How to target a device*. **Do not answer this with a
`targets` key.** That key is named arbitrarily and only has to match a
subdirectory of `assets/`, so there is no "the `targets` key for a Bip 6" to
look up — inventing one by analogy with `gtr-3-pro` is the failure mode here.

What selects hardware is `targets.<key>.platforms[]`, and the form depends on
the manifest's `configVersion`:

- **v3** — `st` (screen shape, `r`/`s`/`b`) and `sr` (`w` + width). Selects a
  class of device, so a new watch of a shape already supported needs no change.
- **v2** — `deviceSource`, one numeric entry per device.

The page gives all three values for every device. `st` and `sr` are **derived**
from the device's screen, not quoted from a source — say so if it matters. Its
last subsection names the devices no official sample has ever targeted; read it
off the page. That means there is no worked example to copy a `platforms` entry
from, never that the device is unsupported.

## Writing a watchface

A watchface is not a Mini Program page and does not use `@zos/*`. It is written
against the `hm*` globals, and mixing the two is the first mistake to avoid:

- `../../runtimes/watchface.md` lists everything attributed to this runtime.
- `../../api/hmUI.md`, `hmUI.widget.md`, `hmSensor.md`, `hmSensor.id.md`,
  `hmFS.md`, `hmSetting.md`, `hmBle.md` and `timer.md` are the modules.
- Nothing is imported. You write `hmUI.createWidget(hmUI.widget.TEXT, {...})`,
  `hmSensor.createSensor(hmSensor.id.HEART)`, `hmFS.open(path, hmFS.O_RDWR)`.
  Suggesting an `import` for any of these is the Device App idiom applied to
  the wrong API.
- **No page in that tree states an `API_LEVEL`.** So `compatibility/` cannot
  vouch for a watchface symbol on any device. Say that; do not read the blank
  as *available everywhere*.
- For working code, `../../examples/index.md` has the watchface samples. Their
  entry point is `WatchFace({ ... })`, which appears in code and in no
  reference page — treat it as `OBSERVED`.

## The gap that will bite you first

**A symbol with no stated `API_LEVEL` cannot be certified for any device**, and
that still includes `@zos/ui.widget`, `align`, `text_style`, `prop` and `event`
— which no Device App UI compiles without. You can now look up what each of
them *accepts*, because the reference pages document their members and the base
reads them. What no page anywhere states is when they appeared.

So when you build a UI, say plainly that the level cannot be verified for the
widget primitives, instead of reporting a device's *Symbols available* count as
if it covered them. It does not: that count is over the 353 symbols with a
stated minimum, and these are not among them.

The `OBSERVED` tier is 17 symbols, and 14 of them are name-only — no
description, no level, no signature. Read those as "this exists" and nothing
more. 11 of the 14 are `@zeppos/zml`, a helper library rather than platform API.

## How to find out how a symbol is called

Two sources, and use both — they fail in opposite directions.

**What the docs declare** is on the symbol's entry in `../../api/`, under
*Symbols in detail*: the signature verbatim, plus a table for every object shape
it refers to. `(props: Props) => RenderFunc` is unusable without its `Props`
table, so both are there. Some property tables state their **own** minimum
`API_LEVEL` — a symbol you may call can have a property you may not.

178 of 411 symbols carry a signature and 147 carry shapes; the rest state none
upstream. The `ui/widget/` tree — `TEXT`, `IMG`, `BUTTON`, `SCROLL_LIST` —
carries its full `Param` table, so the props to draw a widget are in `api/`.
`type` still holds only `function`, `constant` or `value`, so a symbol with no
signature tells you nothing about its call shape.

**The values a parameter accepts** are on the same page, under the symbol that
owns them. `align`, `widget`, `text_style`, `prop`, `event` and `inputType` are
symbols in their own right — look up `@zos/ui.align` and you get every member
with the name you write in code, `align.CENTER_H`. Two things to read carefully:

- A member can state its **own** minimum `API_LEVEL`. `inputType` is 4.0 except
  `inputType.JSKB`, which is 4.2.
- Where a table mixes `OFFICIAL` and `OBSERVED`, the base says so per member.
  `widget` is the case that matters: the reference page documents **one** widget
  id and then says the rest "are not listed", so the other 24 are there because
  sample code writes them. The page states that the list is incomplete — neither
  source is the whole set, and a widget id you cannot find here may still exist.

For a value set that has no name you can write — `ERROR_CODE`, the weather
`index` — the table sits on the symbol that returns it, so
`@zos/sensor.Weather` is where you learn that `index` 3 is Sunny.

**What to call on a value** is on the owning symbol too, under *Called on a
`X` value*. `new HeartRate()` gives you something with `getCurrent`,
`onCurrentChange` and nine more; `localStorage` has `getItem`/`setItem`;
`Player` has sixteen. These are never importable — do not write
`import { getCurrent }` — and the same name on two symbols is two different
methods returning two different shapes, so always read the one under the
symbol you actually have.

Two traps there:

- **A member states its own minimum `API_LEVEL`.** `BloodOxygen` is 2.0 and its
  `start` and `stop` are 2.1: an app targeting 2.0 can construct the sensor and
  not drive it. Check the member's row, not just the symbol.
- **A member's return shape and value sets are under the member**, not under
  the symbol. `retCode` belongs to `getCurrent`, not to the sensor.

**What working code does** is in `../../examples/index.md`. Go there when the
signature is absent, when it is too abstract to act on, or to check that your
call matches something that actually ran.

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

## `app.json`

`../../manifest/index.md` is the manifest, and it is where a build question is
answered before an API question is asked. Four things live there and nowhere
else:

- **Which key turns on which runtime.** `targets.<target>.module.app-side` ships
  the Side Service, `.setting` the Settings App, `.page` the Device App. Nothing
  upstream connects a manifest key to a runtime, so this is the answer to *"what
  do I add to give this app a settings screen"*.
- **What the documentation omits.** The documented key tree is diffed against
  every key path in the 33 working sample manifests, both ways. That is how
  `app.extType` and the `data-widget` module surface — real workout extensions
  declare them and the reference page never mentions either. **No documented
  `module` key reaches the Workout Extension runtime at all**; the observed table
  is the only route to one.
- **Which permission string to write.** Every permission code, joined to the
  symbols whose own documentation states it and to how many samples declare it.
  A permission a symbol needs and `app.json` omits fails at **runtime**, not at
  build — cross-check before calling a project complete.
- **Keys named but never described.** `app-service` (Background Service) and
  `app-event` (System Event Listening) are typed `object` upstream and given no
  shape. Where a sample declares one, its real shape is in the observed table;
  otherwise say the shape is undocumented rather than inventing it.

`../../manifest/app.md`, `runtime.md` and `targets.md` carry the full property
tables. The documented tables are `OFFICIAL`; the observed key paths are
`OBSERVED` — files that build, not a contract. Say which is which.

`../../examples/index.md` still holds the per-app view: each sample's own
`permissions`, `targets` and top-level keys, and a count of how many of the 33
use each key.

## What absence means here

This knowledge base is incomplete by construction, so a symbol you cannot find is
**not covered**, never **does not exist**. Report it that way.

- `not stated` in an `API_LEVEL` column means no source documents a minimum. It does *not* mean the symbol works at any level.
- The runtime axis is skewed: 375 of 513 symbols are Device App, 105 Watchface. Every runtime is covered, but the Settings App's 21 and the Side Service's 20 carry **no `API_LEVEL`** — no page in either tree states one — so they answer "does this exist here" but not "since when".
- The **watchface `hm*` API is covered**, but with **no `API_LEVEL` anywhere** — no page in that tree states one. So `runtimes/watchface.md` and `api/hmUI.md` answer "does this exist", and nothing answers "does it run on this watch". Say that rather than reading a blank level as *any level*.
- Members are recorded only where a page declares a `Methods` section — 46 symbols carry them. A value whose page has no such section answers nothing about what can be called on it, which is *not covered* rather than *nothing can*.
- A pattern's `Minimum API_LEVEL` is **derived**, not quoted: it is the highest minimum among the symbols the guide's code uses, and it skips symbols this KB has no record for. Treat it as a floor, and check the page's own "no record" flag before calling a pattern verified.
- The Settings App's 13 `ui.*` components now carry a signature and a full property table each (74 properties in total), so they are no longer bare names. What is still missing there is the **entry point** — `AppSettingsPage`, which registers a settings page, has no symbol record; it appears only as code, under *Global calls in the phone runtimes* in `../../examples/index.md`.
- The Side Service and Settings App **are** covered: see `../../runtimes/side-service.md` and `../../runtimes/settings.md`, plus `../../api/fetch.md` and `../../api/settings-storage.md`. What is missing there is narrower than the runtime: the Settings App's **entry point** (the function that registers a settings page) and the **props of its `ui.*` components`. Answer that one from the official docs and say so; everything else in those runtimes, answer from here.
- A watchface symbol is written as a global path, not imported: `hmUI.createWidget`, `hmUI.widget.TEXT`, `hmSensor.id.HEART`, `hmFS.open`. Never suggest `import { createWidget } from 'hmUI'` — that is the Device App idiom and it is a different API.

## Permissions

An undeclared permission fails at **runtime**, not at build — the worst error
to hand a user, because the app installs and then dies on the feature it was
written for. Check it every time you recommend a sensor or a background service.

- Each symbol's entry in `../../api/` states its own, as **Requires in
  `app.json`**. Union those over every symbol the app uses.
- Each pattern page in `../../patterns/` states the union for that whole task,
  **derived** — the upstream guide names none.
- `../../manifest/index.md` joins every code to the symbols that need it and to
  how many of the 33 sample manifests declare it.

Only 24 codes are documented anywhere, and the samples declare 34. `event:os.*`,
`device:os.ble` and `gps` appear in shipped manifests and in no symbol's record.
So a symbol with no permission listed is **not covered**, never **needs none** —
say that rather than implying the app is safe to ship without checking.

## When the sources disagree

`../../conflicts/index.md` is the list of everywhere they do, and it is short
on purpose. Check it before repeating a claim that matters:

- One symbol's description differs between two official pages. `@zos/sensor.Weather`
  is marked **deprecated** by its reference page and described as current by
  `static/llms` — say deprecated.
- One widget id is written `GRADKIENT_POLYLINE` in code and documented
  `GRADIENT_POLYLINE`. Both are official; one does not work.
- 13 method calls seen in sample code resolve to more than one thing even after
  narrowing to the sample's runtime. `examples/` marks those **ambiguous** and
  names every candidate. Do not pick one for the user without saying you did.

`API_LEVEL` and signatures never disagree anywhere, so a conflict is never a
reason to doubt those.

## Where the numbers come from

`../../data/manifest.json` records the exact upstream commit of each source repo and
the record counts for the last sync, so "last verified" is derivable rather than
claimed. Cite it when the freshness of an answer matters.

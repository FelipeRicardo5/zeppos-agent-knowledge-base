# TODO

What is left, ranked. Measured 2026-09-10, against commit `7644a62` plus the
working tree.

**The ranking criterion is not "how many pages would this add".** It is _what
development question does this unblock_ — the base is done when an agent can
look up everything it needs to build a Mini Program. Items are grouped by root
cause rather than by runtime, because that is what has made the last four wins
cheap.

Every new front follows the standing rules at the bottom.

---

## 0. Land what is already on disk

Twelve finished pieces of work sit uncommitted: the `Properties` plural column in
`src/parse/spec.ts` (shapes 121 → 147, properties 643 → 1157, per-property
levels 484 → 591 — the whole `ui/widget/` tree had a description and a level and
no property table at all), and items 1 to 7, the reverse index, the evaluation track, CI and tools/ below. Suite green at 243 tests, 17 of 17 verified answers,
typecheck clean, sync and render re-run against the same source commits.

**Still open, and it is the recurring one.** `README.md` said "168 passing" when
the number was 170; that has been corrected to 186 along with the counts this
work invalidated, but correcting a hand-typed number by hand is not a fix. Three
instances so far — the `29` that should have been `56`, the `SKILL.md` note
claiming the phone runtimes were not extracted, and this. Derive the figures
that come from the data, or name the page to read instead of quoting it.

Two known-stale claims found while editing and deliberately not touched, because
they belong to this item rather than to item 1:

- `SKILL.md` carries two adjacent bullets about the Settings App that contradict
  each other; the second says the `ui.*` component props are missing, which the
  previous commit fixed.
- `README.pt-BR.md`'s `SymbolRecord` table was two fields behind the English one
  (`signature`, `shapes`). Fixed in passing, but nothing prevents the next drift.

---

## ~~1. Enum members~~ — done 2026-09-10

27 value sets on 24 symbols, 196 members, 124 stating their own `API_LEVEL`.
146 from the documented tables, 50 from sample code, marked per member. The
stop condition holds: `api/zos-ui.md` answers what `align_h` accepts without
leaving the page.

Sized at "19 pages, 24 tables" and that part was right. What the sizing missed,
and building found:

- **The owner is in the value, not the heading.** `align`'s table lives on
  `ui/widget/TEXT.mdx` under `### ALIGN alignment`. Filing by heading would have
  buried the members on TEXT; filing by the `align.` prefix makes `align` a
  symbol with its own page entry. One table can hold two enums — `ECDSACrypto`
  mixes `alg.*` and `ecp_dp.*`.
- **This closed most of the `OBSERVED` hole from eval 01.** `widget`, `align`,
  `text_style`, `prop` and `event` were name-only sightings in sample code — the
  finding was that no Device App UI could be certified because of them. All five
  are now `OFFICIAL` with members, and typed `constant` instead of `function`.
  The tier went 24 → 17, and 11 of the remaining 14 name-only symbols are
  `@zeppos/zml`, a library rather than platform API. **The other half of that
  finding is untouched**: none of the five states an `API_LEVEL`, because no
  page anywhere states one. `SKILL.md` still has to say so.
- **A sixth parser bug of the standard class, and it survived the first
  aggregate run.** `sensor/BloodOxygen.mdx` documents a `Result` shape whose
  first _data_ row is `| value | number | ... |`. Matching a header on the cell
  alone promoted that row to a header and invented two enums. A header is the
  row a separator follows — that check is now the fixture.
- **Aliased imports were being missed.** `import { widget as idOfWidget }` then
  `idOfWidget.TEXT`: scoping the sample scan to the imported symbol rather than
  to the name the code writes lost 7 members. All 7 happened to be covered by
  other files, so nothing was visibly wrong — which is the whole problem.

Two findings worth their own work, both from the `widget` join:

- **`GRADIENT_POLYLINE` vs `GRADKIENT_POLYLINE`.** The device-app reference has
  a page spelled the first way. No sample writes it — the watchface docs and
  every sample write the second. A developer copying the
  documented spelling may get `undefined`. This is item 5's territory — the base
  can see the disagreement precisely because it merges fronts.
- **3 widget ids are written in sample code with no page at all**
  (`GRADKIENT_POLYLINE`, `IMG_LEVEL`, `STATE_BUTTON`), and 8 documented widget
  pages are never used as a `widget.*` member. The two-way diff exists in the
  data now; nothing renders it as a finding yet.

Left undone deliberately: `related-resources/language-list.mdx` carries a real
value domain — 34 rows, what `@zos/settings.getLanguage` returns — in a table
with no heading, on a page that yields no symbol. It is skipped, and it is the
only `Value` table in the tree that is.

## ~~2. `targets` name → device~~ — done 2026-09-10, and the item was wrong

**The question both eval runs asked has no answer, and that is the answer.**
`guides/best-practice/code-adaptations-for-new-devices.mdx` says a `targets` key
"can be named arbitrarily"; the reference page adds that it only has to match a
subdirectory of `assets/`. So there is no "the `targets` key for a Bip 6" to
look up, this item's own stop condition asked for the wrong column, and the
runs did not fail to find a fact — they invented one that does not exist.

What selects hardware is `targets.<key>.platforms[]`, in two generations that
the 33 sample manifests split on exactly, 14 to 19, with no manifest mixing them:

- **v2** — `deviceSource`, one numeric entry per device. Already in the base.
- **v3** — `st` (screen shape `r`/`s`/`b`) and `sr` (`w` + width). A class of
  device rather than a device, so a new watch of a known shape needs no manifest
  change. No sample narrows an `st` with `sr`.

`compatibility/devices.md` now carries all three per device, the reverse index
(`st: "r"` reaches 23 devices across 5 widths), and the two-way diff. `st`/`sr`
are derived from the device's own screen and labelled as derived; `deviceSource`
is verbatim. The Bip 6 the eval targeted resolves to `st: "s"`, `sr: "w390"`,
`deviceSource` `9765120`/`9765121`/`10158337`.

Findings from the diff:

- **One `deviceSource` a shipped sample builds for is in no device row**:
  `7864576`, where the list has only `7864577` (GTR 4). Either the list is
  behind the samples or the sample targets hardware never published. Neither
  source admits the gap.
- **18 of 34 Zepp OS devices have never been targeted by any official sample**,
  including every device newer than the Bip 5. That is why both runs found
  nothing to copy: the samples stop at 4.x-era hardware, and the naming they use
  (`gts` / `gts3` / `gts-3` / `480x480-amazfit-balance`) was never a convention
  to extrapolate from in the first place.

The parse side needed one addition: `ExampleManifest` now carries
`configVersion` and the `platforms` selectors. Before this the front read the
target _keys_ and nothing else — the arbitrary half — which is precisely why the
base could not answer.

**What this says about the eval loop.** A silence was measured correctly and
diagnosed wrongly: the report asked for a `targets` column, this list repeated
the request, and building it would have shipped a column of invented names.
Take a run's finding as evidence of where the base went quiet, never as a
specification for what to add.

## ~~3. Instance members~~ — done 2026-09-10

257 members on 46 symbols. Every one carries a signature and prose, 44 state
their own minimum `API_LEVEL`, and the schema decision this item called for went
the way it predicted: a `members` field on the owning record, not records of
their own. `new BloodOxygen()` now answers what can be called on it from `api/`.

**The item's own framing was wrong about the source.** It said "`####` methods on
returned objects", copying `README.md`, and the important case is at `###`: 42
pages write `## Methods` with members at `###`, and only the four crypto pages
nest deeper. Reading the depth off the `Methods` heading covers both; assuming
either one would have missed the other entirely.

**This was mostly a correctness fix, not only an addition.** 72 of the 84
property and value tables on these pages sit _inside_ a `Methods` section, and
the page-level passes had been claiming them: `@zos/sensor.BloodOxygen` carried
a `Result` shape and a `retCode` value set, stating that the sensor has a result
code. It does not — the value `getCurrent` returns does. 60 shapes and 10 value
sets moved to their real owner, with the totals conserved (287 shapes / 1157
properties, 27 value sets / 196 members, unchanged).

Other things building found:

- **`localStorage.getItem`/`setItem` are now documented.** Eval 02 named these
  among the calls that "came from `examples/` and appear nowhere else"; they
  were in the reference pages the whole time, under a heading no front read.
- **A member's level is not the symbol's.** 44 of 257 state their own, and
  `BloodOxygen` at 2.0 with `start`/`stop` at 2.1 is the shape of the trap: an
  app can construct a sensor it cannot drive. Third field to need per-item
  levels, after shape properties and enum members.
- **One heading under `Methods` is not a member.** `ui/widget/SYSTEM_KEYBOARD.mdx`
  lists `deleteKeyboard()` there and its own example imports it — a module
  function documented beside the widget, and already a symbol of its own.
  Detected by the import, not by a rule about names. One case in 257, and it is
  the reason the exclusion is evidence-based rather than a list.

Left for item 5: the `setProperty` conflict this item was also filed under is
untouched. It is a genuine disagreement between two fronts — a module symbol in
`api/`, an instance method in `patterns/` — and reporting it is the conflict
work, not this.

## ~~4. Watchface~~ — done 2026-09-10

102 symbols across 8 globals — `hmUI`, `hmUI.widget`, `hmFS`, `hmSensor`,
`hmSensor.id`, `hmSetting`, `hmBle`, `timer` — from all 89 API pages. The
Watchface runtime went 3 symbols to 105. `hm*` is out of the not-covered list
in `README.md` and `SKILL.md`, which was the stop condition.

**It was never expensive; it was mechanically excluded.** This item was ranked
"the most expensive on the list" on the strength of a file listing. The format
is close enough to `device-app-api` that `extractSignature`, `extractShapes`
and `extractMembers` all read it unchanged: `## Type` with a `ts` fence,
`## Parameters` with property tables, prose under the frontmatter title. What
kept it out was that both symbol fronts key on an `import` line and this API has
none — the pages document globals. That is a resolver problem, not a format one.

The four things that did have to be measured:

- **The module is in the code, not the path.** `hmUI/widget/data_type.mdx` sits
  in the widget directory and the code writes `hmUI.data_type`. Trusting the
  path repeats the collision that once mis-filed 10 `@zos/settings` symbols.
  Across 89 pages the code signal and the frontmatter title never disagree, and
  five pages have neither, where the directory is the only evidence there is.
- **A page at the tree root is a module, not a symbol.** `hmBle.mdx` has no
  parent directory and lists six functions under `## Method` — the only
  singular spelling in the corpus. They are `hmBle.send(...)` and friends: the
  watchface side of Bluetooth, and six symbols that a first pass dropped
  silently.
- **`edit_watchface.mdx` is a topic, not a symbol.** Titled "Editable
  watchface", it documents the `hmUI.data_type` members. Filing it would have
  invented `hmUI.widget.edit_watchface` — the prose-heading trap again. Its
  enum lands; the page does not.
- **No `API_LEVEL` anywhere in the tree.** Not one badge on 89 pages, so
  `compatibility/` can vouch for none of these on any device. Same shape as the
  Settings App and the Side Service, and now stated in both READMEs and the
  Skill rather than left to read as _available everywhere_.

Three format bugs fixed on the way, two of which were costing the reference
tree as well:

- **A markdown table's outer pipes are optional.** `cells()` required a leading
  `|`, so it dropped `hmSensor/createSensor.mdx`'s sensor-id table and three
  tables in `related-resources/physical-keys.mdx`. Silent, as always.
- **`Optional Properties` is a value column.** Two `hmFS` pages head the flag
  table that way, which is how `open` and `open_asset` lost `O_RDONLY`,
  `O_CREAT` and the rest — the one thing you cannot call them without.
- **A member heading can carry its argument list.** The reference tree writes
  bare names; `hmBle` writes `### send(data, size)`. Stripping only empty
  parens produced six symbols named `send(data, size)`.

A side effect worth noting: the sample excerpt count went 592 → 653, because
`enrichExamples` filters member calls against known symbol names and the
watchface samples' calls now match something.

**Next in this file is item 5, and it is where two findings are already
waiting**: `GRADIENT_POLYLINE` vs `GRADKIENT_POLYLINE`, and the `DELEGATE` page
that documents `hmUI.widget.WIDGET_DELEGATE`. Both are cross-front
disagreements the base can see and does not yet report.

## ~~5. Conflict detection in `enrich`~~ — done 2026-09-10

`SymbolRecord` carries a `conflicts` array, and `conflicts/index.md` renders
every disagreement with both sides and a source path. That was the stop
condition. What it found is not what the item expected.

**Scalar fields barely disagree.** `API_LEVEL`: never. Signatures: never.
Descriptions: 147 of 513 raw, and **one** after normalising away punctuation
and the `permission code:` note the reference pages carry and the llms dump
drops. Building the field-conflict machinery to report 147 full stops would
have made a page nobody reads.

The one that survives is worth the whole section: **`@zos/sensor.Weather` is
marked deprecated by its reference page and described as current by
`static/llms`.** Priority happens to give the reference page the win, so the
base says deprecated — but nothing said the other source disagreed, and the
next such case may resolve the other way.

**`kind` disagrees 98 times and is deliberately not reported.** `parseMarkdown`
guesses it from the page text and `parseLlmsContent` hardcodes `function`. That
is this extractor's bug, not a contradiction between sources, and dressing it
as one would be the worst thing this page could do.

**The real conflicts are structural, and one of them was a wrong answer the
base was already giving.** `examples/` resolves a method call by matching its
name against the symbol table and was printing "likely `settings-storage.getItem`"
for `.getItem()` in six Device App samples, where it is `localStorage.getItem`
— a different runtime entirely. It could not do better until item 3 gave it
instance members to match against. Now the join considers members, narrows
candidates to the sample's own runtimes, and prints **ambiguous** with every
survivor instead of asserting one. 13 calls are genuinely ambiguous; the rest
resolve cleanly, including `setProperty`, which is `@zos/ui.setProperty` in a
Device App sample and `hmUI.setProperty` in a watchface one.

Two measurement traps worth keeping:

- **Runtime scope has to be per sample, not per call.** Taking the union of
  runtimes across every sample a call appears in put both `@zos/ui` and `hmUI`
  on every shared name — 25 rows where 19 were real. A sample declares its own
  runtimes; that is what decides which API a call belongs to.
- **Edit distance needs a length floor.** At three characters `prop.SRC` and the
  `ARC` widget are one edit apart and unrelated. Six characters removes that
  and keeps `GRADKIENT_POLYLINE` / `GRADIENT_POLYLINE`, which is the finding —
  both spellings official, one of them dead.

Still resolved silently, and out of scope here: two documented tables that
describe the same enum member differently. The union merge takes the first and
says nothing. No instance exists in the corpus today.

## ~~6. Permissions as a structured field~~ — done 2026-09-10

`SymbolRecord.permissions` holds them: 35 symbols, 24 distinct codes, lifted out
of the prose at parse time rather than recovered by a regex at render time.

**It adds no coverage, and that was worth measuring before starting.** All 24
codes were already reachable through the description regex — nothing was being
lost. Two things it does buy:

- **The manifest join no longer depends on upstream wording surviving into
  rendered prose.** It was a regex over `description` in `render/manifest.ts`.
- **It removed the largest source of false disagreement in the base.** The
  reference pages carry `permission code:` in a `:::info` block and the llms
  dump omits it, so those 35 symbols read as two sources contradicting each
  other. Item 5 had to normalise the note away to find the one real conflict;
  now there is nothing to normalise.

**Two joins are what make the field earn its place**, since the extraction on
its own does not:

- `api/` states **Requires in `app.json`** under each of the 35 symbols, before
  the signature — it is the thing that breaks an app which otherwise compiles.
- Each `patterns/` page states the union over the symbols its guide's code uses,
  **derived** the way the minimum API_LEVEL already was. `multi-screen-adaption`
  needs `data:os.device.info` and the guide never mentions `app.json` at all.

Measured and deliberately not built: **a per-sample "uses X, declares X" check.**
The direction that would find bugs — a sample calling something it never
declared — is **empty across all 33**. The reverse direction is dominated by
this base's own gaps rather than by sample errors: 34 codes are declared by
manifests and only 24 documented anywhere, so `event:os.*`, `device:os.ble` and
`gps` show up as "declared, needed by nothing" when the truth is that nothing
documents what needs them. Rendering that as a finding would have been a page
of accusations against working apps. It is stated as a coverage limit instead.

One structural oddity found and left alone: `@zos/storage.localStorage-instance`
states `device:os.local_storage` and `@zos/storage.localStorage` — the symbol you
import — does not. Upstream puts the note on one page of a pair. Reporting it
needs the pair to be modelled as related, which nothing does yet.

## 7. `@zeppos/device-types` — measured, not built (2026-09-10)

**The measurement says do not build it, and the reason it was ranked here is
false.** This item's stated pull was being "the independent second opinion that
makes item 5 useful". Compared against the base, `@zeppos/device-types@4.0.0`
agrees with it completely:

| Compared                             | Result                                   |
| ------------------------------------ | ---------------------------------------- |
| symbols in common                    | 290                                      |
| `@version` vs `minApiLevel`          | 131 compared, **0 differences, 0 gains** |
| `@en` vs `description`               | **0** symbols gain a description         |
| function declarations vs `signature` | **0** functions gain one                 |
| `@permissionCode` vs `permissions`   | **1** difference                         |

Of its 383 top-level declarations, 93 match no base symbol: 80 are TypeScript
plumbing (`HmUIArcCreateWidgetOptions`, `PublicWidgetTypeToken`), 2 interfaces,
and 11 are real constants. So the whole front would buy roughly 12 records and
one permission, at the cost of a **new source kind** — npm rather than git,
which `src/fetch/index.ts` does not do, plus version pinning and manifest
recording.

By this file's own criterion that is not worth building. Reconsider only if a
later sync shows the package moving ahead of the docs; the comparison script
that produced the table above is the thing to re-run, not the front.

**But the comparison paid for itself once.** The 11 constants it has and the
base did not were `VIBRATOR_SCENE_*`, and chasing why led to a table shape both
extractors were dropping in silence: `| Constant | Description | API_LEVEL |`
under a `#### Constants` heading — **32 tables across 26 pages, 130 distinct
names**.

121 of those 130 were reachable anyway, because `static/llms` repeats them and
the llms front reads module constants. So the coverage loss was 9, all on
`sensor/Vibrator.mdx`. Reading the tables is still worth it, because it answers
a different question from the one the llms front answers: the 39 rows under
`router/launchApp.mdx` are **the values that function accepts**, a call shape,
not a list of things the module exports. Value sets went 27 → 73, members
196 → 492, and the nine vibration modes are now on `@zos/sensor.Vibrator.start`,
the method that takes them.

**The lesson, and it is the fourth time:** a gap that looks like it needs a new
source turned out to be an existing source read for a fraction of what it holds.
The new source's only real contribution was pointing at the gap.

## Product track

Items 8–11 are what separates a repo from a product. None of them adds knowledge.

**8. A serving layer.** Using the base today means cloning it. The v0 vision named
an MCP server; `concepts/` has the study notes, nothing is built.

**~~The reverse index~~ — done 2026-09-10.** The cheap half of item 8, and the
one the second eval run called the most-wanted structural change.
`api/lookup.md` indexes **733 names against their owner**: 510 symbols, 257
instance members, 397 enum values. Every other index here is keyed by module,
level or runtime — by where a thing sits rather than by what it is called — and
an agent reading someone else's code arrives with a bare name and nothing else.
"Where does `setInterval` live?" is now one grep in one file.

241 names have more than one owner, and the page says why that is not a
duplicate: `getCurrent` belongs to 12 sensors returning 12 different shapes,
`CENTER_H` to `@zos/ui.align` in a Device App and `hmUI.align` in a watchface.
The runtime column is what separates them.

Two things measured while building it:

- **Bare numeric domains are not names.** Indexing enum members wholesale put
  `0` in the index with eleven owners, from `retCode` 0..10 and the weather
  `index` 0..28. Only identifiers are indexed; the numeric sets stay on their
  owning symbol's page.
- **Eight names carried a type annotation from their heading.** `result: number`,
  `CallBack: function` — `extractShapes` stripped only `: object`, so four enum
  and four shape names went into ids that nothing could look up. Fixed
  generally, which is what made the index clean enough to be worth writing.

Left as a follow-up: `global.console.log` is one symbol whose _name_ contains a
dot, because the Side Service page titles it `### console.log()`. It is indexed
under both `console.log` and `log`, but the modelling is inconsistent with
`@zos/global.console` plus a `log` member, which is the same thing on the
Device App side.

**~~9. Freshness~~ — done 2026-09-10.** Two workflows, and the split between
them is what matters.

`ci.yml` runs on every push and PR and **touches no network**, because `data/`
and the 160 rendered pages are both committed. Beyond typecheck and the suite it
asserts two things the project had only ever checked by hand:

- **the rendered tree is reproducible from `data/`** — it re-renders and fails
  on any diff. That makes "JSON is the source of truth" enforceable instead of
  aspirational: a hand-edited generated page now fails CI. Falsified by editing
  `api/index.md` and watching the step catch it.
- **`npm run verify` still answers all 17 questions**, read off the Markdown.

`sync.yml` runs weekly and does the part that needs the network: re-run `sync`
and `render` against upstream, then open a PR when the tree moved. It
deliberately does not push to main. The PR body carries a **record-count table,
before and after**, because the failure mode this exists for is not an error —
every parser bug here has been an upstream format change that made an
extraction silently _smaller_, and a count that went down is the only signal
those have ever given. `verify` runs whether or not anything changed.

**Two findings on the way, and the second one mattered more than the item.**

- **A fresh clone on Windows would have failed the reproducibility check.** The
  repo had no `.gitattributes` and `core.autocrlf=true` is the default there, so
  the tree checks out CRLF, the renderer writes LF, and all 160 generated pages
  read as modified. The index happened to be LF everywhere, which is why nobody
  had noticed.
- **The CRLF regression test was vacuous on Linux.** `test/parse.test.ts`
  asserts the parser survives a CRLF checkout, and both of its fixtures were
  stored **LF in the index** — so on any Linux runner they arrive LF and the
  test passes without testing anything. `.gitattributes` now pins those two to
  `eol=crlf` while normalising everything else to LF, and a forced re-checkout
  confirms they come back CRLF. This is the third time the CRLF class has cost
  this project something, and the first time it was the repository's own tree
  rather than the upstream cache.

Not done, and it is a judgement call rather than an oversight: **no staleness
signal in the rendered tree.** `data/manifest.json` has `lastSyncAt`, and
putting an age anywhere in the generated Markdown would make the render
non-deterministic, which would break the check above. The weekly job is the
signal instead — a repository whose last sync PR is months old says so through
its own history.

**10. The one architecture question still open** (since 2026-09-04): does `render`
always overwrite, JSON as sole truth, or does an annotation mechanism survive
regeneration for what the parser gets wrong? Item 5 makes this pressing — a
detected conflict wants a human verdict, and a verdict that a sync erases is
worthless.

**~~11. `tools/`~~ — done 2026-09-10, and half the item was out of scope.**
Front 10 plus the `tools/` view: 8 Zeus CLI commands, the `zeus create`
prompts, the scaffold, and 7 recommended packages. The last empty output
directory, and the last question of every task — the app is written, now how
does it run?

**Twelve of the 23 files are not tooling docs at all.** They are walkthroughs of
the Watchface Maker, a no-code web editor: zero `hm*` references between them
and one code fence, which is a directory listing. An agent cannot drive a web
GUI, so they are out of scope rather than low priority, and the page says so —
left silent, a reader cannot tell "not covered" from "does not exist". The item
called them "Zeus CLI and the simulator"; they are neither.

Three joins, each against evidence already in the base, because a page listing
the CLI's commands would be a copy of the CLI page:

- **Scaffolded file → runtime.** `zeus create` writes `app-side/`, `setting/`
  and `pages/`, and those are the same directory names `runtimeForAppFile`
  reads to attribute every symbol here. The tree gets labelled by the project's
  own rule rather than a new one.
- **Scaffolded file → the `module` key that turns its runtime on.** Read off
  `ManifestSection.runtime`, which the manifest front already attributes.
  Nothing upstream connects the question the CLI asks to the key it writes, and
  getting that wrong breaks a build before any API runs. The page also names
  the two runtimes the default template does _not_ scaffold.
- **Package → the symbols this base holds for it.** ZML is the first package
  the docs recommend and the base already had 11 `@zeppos/zml` symbols whose
  only evidence was an import line in a sample.

**First derivable use of `RECOMMENDED` and `COMMUNITY`.** Those tiers were
reserved when this base was designed and described as needing a manual
curation pass. `npm/officially-recommended.mdx` splits its packages under
_Officially maintained_ and _Community works_, so the tier is read from the
heading like every other fact here.

Three things reading fixed that guessing would not have:

- **The tree art needed real paths.** Taking names without rebuilding them
  looked cheaper and was wrong: the tree lists `index.js` three times at three
  depths, and a name-only read labelled the project root a Device App
  directory. Depth comes from the prefix width.
- **`app.json` belongs to no runtime.** `runtimeForAppFile` always answers,
  defaulting to device-app — right for a code file, wrong for the manifest. It
  is excluded, and `manifest/` is where it is answered.
- **The citations were Windows paths.** Every other front normalises to posix;
  this one did not, which would also have made the render differ between a
  Windows and a Linux run — a spurious diff in the CI check added the same day.

An unexplained count change chased down rather than accepted: `docs-reference`
went 251 → 253 with no new symbols. Cause is the `Constant` column added
earlier — `ui/keyboard.mdx`'s table carries values for **two** enums
(`keyboard.*` and `inputType.*`), so that page now yields two extra qualified
enum units. Nothing lost, nothing invented.

---

## Evaluation

**~~12. The scoring criterion~~ — fixed 2026-09-10.** `eval/README.md` now says
it: count the requirements the base can **vouch for**, not the blocks. Run 2
finished with zero blocks and the agent still would not ship the result, which a
block count scored 5 of 5 and the honest reading scored 3 of 5. Each requirement
is now VOUCHED / DELIVERED-UNVOUCHED / BLOCKED, and the middle category is the
one a block count hid.

**~~The instrument had gone stale~~ — fixed 2026-09-10, and this was the
unplanned finding.** Two of the three eval files were mis-calibrating the next
run before it started:

- `task-01-notes.md` predicted `app.json` as a **hard block**. It stopped being
  one when Front 8 landed. A run judged against that would have looked better
  than it was, and a genuine finding about `manifest/` discoverability would
  have read as a predicted gap.
- `task-01-health-sync.md`'s "you may read" list omitted `manifest/`,
  `conflicts/` and `api/lookup.md`. An agent given that list cannot tell "never
  found the page" from "the page does not exist" — and an earlier run reported
  a whole subject as uncovered when the pages existed. The list is now every
  output directory, and says why it is given in full.

Both notes files now open with an instruction to re-verify predictions against
the current base before a run. The predicted list decays every time the base
improves, which is the point of improving it.

**~~13. Task 02~~ — written 2026-09-10, not yet run.** An editable watchface:
`eval/task-02-watchface.md` plus operator notes. It exercises the surface no run
has touched — 102 `hm*` symbols, a fourth runtime, globals rather than imports,
and no `API_LEVEL` anywhere in that tree — and it puts two of this session's
claims under direct test, the `st`/`sr` targeting story and the value sets
behind a `createWidget` call.

Predictions are verified against the base rather than guessed, and one that
looked obvious turned out to be false: `docs/watchface/app-json.md` is eight
lines re-importing the Mini Program page, so the watchface manifest **is**
covered. A report claiming otherwise is wrong rather than a finding.

Its report adds a section the other task does not have: **runtime confusion**.
The watchface front made `@zos/ui.createWidget` and `hmUI.createWidget` share a
name, along with `align`, `setProperty` and more. That overlap is new and
nothing has measured whether it makes the base easier or more dangerous to use.

**Cannot be run from a session that built the base.** The protocol requires an
agent that has not read this repository, which is exactly what the author of
these changes is not. Writing the task is the deliverable; running it is a
separate isolated session.

**~~14. Nothing proves the base answers correctly~~ — done 2026-09-10.**
`npm run verify` asks the **rendered** base 17 questions and exits non-zero when
one stops being answerable, naming the question and the reason it is in the set.

It reads the Markdown, not the JSON, because an agent reads Markdown: a fact
that survives into `data/` and dies in the render is still a wrong answer. It is
not part of `npm test`, which is hermetic and fixture-based — this needs a
synced `data/` and a rendered tree.

Falsified before being believed: removing `api/lookup.md` fails exactly the two
questions that depend on it and exits 1. The set is what turns the aggregate
checks done by hand throughout this session into something repeatable.

**~~15. Run task 02~~ — done 2026-09-11**, and it produced items 16-23 below.
Task 01 has not been re-run. The only thing here that a session
which built the base cannot do. Seven items shipped against source-level
verification alone; nothing has checked them against a task.

---

---

## From task 02, run 2026-09-11

The first run against the `hm*` API, and the first scored by requirement. **2 of
7 VOUCHED as reported, 4 of 7 after verification** — the gap between those two
numbers is the finding, not either number. Full report and the app it produced:
[`eval/results/task-02-2026-09-11.md`](eval/results/task-02-2026-09-11.md).

Ranked by what each costs, worst first.

**~~16. A module and its sub-module do not name each other~~ — done 2026-09-11.**
Both pages now say so, in both directions, and the symbol that *is* the
namespace links to it.

The run's top-ranked gap was wrong: it reported that nothing documents what
`hmSensor.id.STEP` returns, and `api/hmSensor.id.md` states `current` and
`target` with types. The agent's own code comment names the dead end — *"hmSensor.md's
only 'Symbols in detail' entries are addEventListener/createSensor/id"*. It read
the page a reasonable reader picks, and that page had no pointer to the 18 ids
one file away. Two requirements were downgraded over a missing link.

Measured rather than assumed: three pairs exist, not one —
`hmSensor`/`hmSensor.id`, `hmUI`/`hmUI.widget` and
`@zos/ble`/`@zos/ble/TransferFile`. Both separators occur, because a dotted name
is a global namespace and a slashed one is an importable submodule.

Two placements, because the top-of-page line alone would not have helped: a
reader who has scrolled to `### hmSensor.id` needs it there, and that is the row
the run stopped at. `npm run verify` now asks the question and fails if either
half goes — falsified by stripping the link and watching it fail.

**~~17. A diagnostic for unread table headers~~ — done 2026-09-11.** `sync` now
reports every table whose first-column heading no column map reads, writes it to
`data/diagnostics.json`, and prints the worst. A new upstream heading arrives as
a number that changed in the weekly sync PR rather than as a silence.

Eight instances of this class were found in one session and **every one by
accident** — by a diff against a types package, by an eval run, by reading a page
for something else. Adding a ninth column entry would not have changed that.

**It paid for itself the moment it ran.** What it found, none of it guessed:

- **`| Callback Name |` on `DELEGATE.mdx`** — the table the task 02 run needed
  and could not find. Requirement 6 was reported as a hard gap with "no way to
  know when a watchface is hidden"; `resume_call` and `pause_call` were on the
  page the whole time. Now extracted, rendered, and defended by a `verify`
  question.
- **`| 参数 | 说明 | 类型 |`** — Parameter, Description and Type in Chinese, on
  two English reference pages. Three callback parameters of
  `CYCLE_IMAGE_TEXT_LIST` were dropped for it.
- **`Parameters` and `Property Name`**, plural and compound variants of headings
  already read, across 23 tables.
- **Two upstream typos**: `Dscription` and `Description-`.

Reading those recovered **22 shapes and 72 properties** — 336 → 358 and
1401 → 1473.

**A design error caught while building it.** The first version kept its own copy
of the read headings, justified as "a check on the maps". There is no second
source of truth to check against, so it was only something to drift from: the
Chinese entry added the same hour was immediately reported as unread, and the
copy's stale `callbackname` entry was *hiding* the DELEGATE table the whole
exercise existed to find. It asks `readsHeader()` now, and a test pins that.

34 headings remain unreported-as-read, and most are genuinely not symbol
documentation — an allowlist names those with a reason, so anything outside it
is new. The ones worth deciding on: `callback parameter` on `hmBle.mdx`,
`anim_prop`/`anim_status` on `widgetAnimations.mdx`, `current value` on
`WEAR.mdx`, `data item key` on `SPORT_DATA.mdx`.

**24. Headless property tables.** `hmSetting/setBrightScreen.mdx` states a
return shape as `| Dscription | Type |` with no name column at all — the name is
the `### result` heading above it. 46 such tables were measured during the
watchface survey and none is read, because `extractShapes` requires a name
column. The rule to add is "a table with no name column is named by its
heading", and it is the last structural table form left unread.

**18. Two false claims in `SKILL.md`, both written from memory.** Fixed on
2026-09-11, recorded because the pattern matters more than the instances:

- it said the watchface entry point `WatchFace({ ... })` "appears in code". It
  appears nowhere in the base; the samples show `DeviceRuntimeCore.App({...})`.
  The agent spent time chasing it.
- it said a watchface "does not use `@zos/*`", contradicted by
  `runtimes/watchface.md`, which lists three. The agent saw the contradiction,
  followed the prose over the data, and shipped without logging as a result.

Both were written in the session that built the watchface front — prose stated
confidently from prior knowledge, in the file whose whole purpose is to stop an
agent doing that. **`verify` cannot catch this class**: it asks 17 questions of
the data and these are claims in hand-written prose. The systematic answer is
the one already on this list and still not done — derive the text, or name the
page to read instead of restating what is on it.

**~~19. The two "contradictions"~~ — measured 2026-09-11, and neither is one.**
The report was reasonable from where it stood and the base is right on both:

- **The 3.0 sample using `@zos/*` inside a watchface.** `getScene`, `SCENE_AOD`
  and `log` are attributed to *both* device-app and watchface, at level 2, by
  the runtime union working as designed. The only thing that contradicted them
  was `SKILL.md`'s absolute prose, which was mine and is fixed. Reporting this
  in `conflicts/` would have been manufacturing a contradiction.
- **GTR 3 Pro and GTS 3 at "1.0, no API_LEVEL" while samples target them.** The
  samples that target them are in the `1.0` trees and **import nothing** — zero
  symbols each. They use the pre-2.0 global API, so they need none of the levels
  this base documents. No contradiction.

The agent's join was `gtr-3-pro` → "Amazfit GTR 3 Pro", which is the name guess
item 2 established this base refuses. Joining on `deviceSource` instead — an
identifier — is what showed the samples were 1.0-era.

**What was built instead**, because the confusion was real even though the
conflict was not: `compatibility/devices.md` now names, for each device with no
stated level, the samples that target it by `deviceSource` and the number of
symbols those samples import. Reading "an official sample targets this device"
as "so the API runs there" is the wrong turn, and the answer is now on the page
rather than left to be re-derived.

**~~20. `patterns/index.md` runtime column~~ — done 2026-09-11.** The run called
`multi-screen-adaption` "actively misleading": the obvious page for
round-versus-square, correct in every fact, and Device App in every symbol. The
index is where the wrong turn is taken, so the runtime is on the row — derived
by unioning the runtimes of the symbols the guide's code uses, because a guide
states its own only through a file name in a code fence. Three of the eleven
guides use no symbol this base holds; those read `not stated` rather than
defaulting to Device App.

**~~21. Permissions are documented in one tree only~~ — done 2026-09-11**, and
the measurement widened the item. It is not a watchface problem: **35 of 375
Device App symbols state a permission, and Settings App, Side Service, Watchface
and Workout Extension state none between them** — no page in the watchface tree
uses the word. Each `runtimes/` page now says which of the two it is, derived,
so the statement stays true if upstream starts documenting them. A watchface's
`permissions: []` is named as the only citable choice rather than a verified
one, which is exactly how the run had to flag it.

**22. `getScreenType()` versus `screen_type`.** The samples call
`hmSetting.getScreenType()` in shape-organised code (`watchface/square/`), and
the documented `screen_type` enum is app *scene* — AOD, APP, SETTINGS,
WATCHFACE — not screen shape. Nothing links the function's return to the enum.
Reported AMBIGUOUS and worked around.

**23. `prepare-run.ps1` strips `.git`,** so an agent cannot name the commit it
measured, which section 0 of every task asks for. Either pass the commit in the
prompt as a documented step or write it into the isolated copy.

**Not a gap, and worth recording so it is not re-derived:** the editable-slot
join. Nothing connects `targets.*.module.watchface.editable` to any widget or
callback — the run's second-ranked gap — and the upstream documentation does not
connect them either. The only page that covers editable watchfaces is a
Watchface Maker walkthrough, which is a no-code web GUI. This is an upstream
silence, not an extraction one, and the base should state it rather than keep
being asked.

## Standing rules for any new front

Learned the hard way; each one has a bug behind it.

1. **Verify against real aggregate output, never fixtures alone.** Run
   `npm run sync`, then count per field, distribute per value, scan for malformed
   ids, and compare against a count taken independently from the raw source.
   Fixtures pin regressions; they do not prove coverage.
2. **Bugs of this class hide each other.** Re-measure after every fix — filtering
   the multi-word prose headings is what exposed the one-word ones behind them.
3. **Render a page for uncovered cases that states the gap**, rather than omitting
   it. A missing page reads as "does not exist"; a page saying "0 symbols covered"
   reads as the coverage gap it is.
4. **Make the view earn its place by joining against existing records.** A page
   that renders only the documented tree is a copy of the upstream page.
5. **Diff the documented surface against the observed one, in both directions.**
   Since `manifest/`, that is where every finding has come from.
6. **Prefer generated text.** Where prose is unavoidable, name the page to read
   rather than restating the fact — see item 0 for what happens otherwise.

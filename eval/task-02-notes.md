# task-02 — notes for the operator

**Do not give this file to the agent.** It names the gaps that were already
known, and an agent that reads it will find those and stop looking.

## Why this task

Task 01 measures the three parts of a Mini Program, all `@zos/*`. A watchface is
a fourth runtime with a different API — the `hm*` globals — and **102 of the
base's 513 symbols have never been read by a run**. The front that extracted
them landed without any task-level check.

It also puts two things this base recently claimed to have fixed under direct
test: the `st`/`sr` targeting story (requirement 7) and the value sets behind a
`createWidget` call (requirements 1–4).

## Predicted gaps, verified against the base on 2026-09-11

Re-verify before running. A predicted gap that has closed makes the run look
better than it is; one that has opened makes a real finding look predicted.
**Four of the five predictions below were closed by the run of 2026-09-10**, so
this list is not what it was — an agent hitting them now has found a regression,
not a known gap.

1. **No `API_LEVEL` anywhere in the `hm*` tree.** Still true: 3 of 105 watchface
   symbols state one, and those three are `@zos/*`. `compatibility/` can vouch
   for nothing here. Reporting it once as a structural fact is right; reporting
   it per symbol is padding.
2. **No widget for the editable slot.** Still true, and it is an *upstream*
   silence rather than an extraction one: the only page covering editable
   watchfaces is a Watchface Maker walkthrough, a no-code web GUI. The
   `editable` flag itself is covered in `manifest/targets.md`. Expected outcome
   is a split — flag vouched, widget assumed.
3. **`docs/watchface/specification.md` is unparsed** — 280 lines of resource and
   design rules. Anything about *assets* will be silent.
4. **No `hm*` symbol documents a permission.** `runtimes/watchface.md` now says
   so outright, so an agent shipping `permissions: []` should cite that page
   rather than flag it as unverified.

**Closed since the last run — an agent reporting these has found a regression:**

- the sensor ids and the shape each returns (`api/hmSensor.id.md`, now linked
  from `api/hmSensor.md`, which is where the last run gave up)
- the watchface lifecycle: `hmUI.widget.DELEGATE` carries `resume_call` and
  `pause_call`, which requirement 6 needs
- `SKILL.md` no longer claims a `WatchFace({ ... })` entry point, which did not
  exist, nor that a watchface never uses `@zos/*`, which three symbols do
- `patterns/index.md` carries a runtime column, so `multi-screen-adaption` no
  longer reads as applicable to a watchface

**Explicitly not a gap, though it looks like one.** `docs/watchface/app-json.md`
is eight lines that re-import the Mini Program `app-json.mdx`. The watchface
manifest *is* the Mini Program manifest, and `manifest/` covers it.

**Also not a conflict, though the last run reported both as one:** the 3.0
watchface sample using `@zos/app.getScene` is consistent — that symbol is
attributed to both runtimes — and the devices filed at "1.0, no API_LEVEL" are
targeted only by samples that import nothing at all.

## The one thing to read the report for

Section 5, the runtime confusion check. The base now holds two UI APIs with
almost identical names — `@zos/ui.createWidget` and `hmUI.createWidget`,
`align` and `hmUI.align`, `setProperty` on both. That overlap is new, and it was
introduced by the watchface front without anything measuring whether it makes
the base easier or more dangerous to use. `api/lookup.md` separates them by a
runtime column; whether that is enough is the open question.

## Run protocol

1. **New session, new agent.** Not one that has read this repository before, and
   not one that ran an earlier task — it would go straight to the gaps it
   remembers instead of discovering what is there now.
2. **Commit first**, and bump `version` in `package.json` if the base changed
   since the last tag — `sync` stamps it into `data/manifest.json`, and that is
   what the report cites. The isolated copy has no `.git`, so the version in the
   manifest is the only thing a run can name. Two reports without versions
   cannot be compared.
3. **Isolate by construction, not by instruction.** Give the agent a copy or a
   worktree with `eval/` removed, rather than trusting it to skip a directory
   that answers the exercise. `eval/prepare-run.ps1` does this. The forbidden
   list is a backstop, not the fence.
4. Hand it everything below the `---` in `task-02-watchface.md`, nothing else.
5. Save the report to `results/task-02-<date>.md` and commit it. Results belong
   in version control — the history is the measurement — they just must not be
   readable during a run.
6. **Score by requirement, not by block.** See the criterion in
   [`README.md`](README.md): a run that finishes everything and vouches for half
   of it is the useful outcome, and a block count hides it.

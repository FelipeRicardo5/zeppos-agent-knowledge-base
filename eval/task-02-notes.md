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

## Predicted gaps, verified against the base on 2026-09-10

Re-verify before running. A predicted gap that has closed makes the run look
better than it is; one that has opened makes a real finding look predicted.

1. **No `API_LEVEL` anywhere in the `hm*` tree.** Not one of its 89 reference
   pages carries a badge, so `compatibility/` can vouch for none of these 102
   symbols on any device. This will come up constantly. An agent that reports
   it once as a structural fact is right; one that reports it per symbol is
   padding.
2. **The entry point has no symbol record.** A watchface is `WatchFace({ ... })`
   and that name appears only in sample code, never in a reference page.
   `SKILL.md` signposts it. Whether the signpost works is worth watching.
3. **No widget for the editable slot — requirement 5 has nowhere to land.**
   `hmUI.widget` holds 22 ids and none of them is an edit group; the 48
   `hmUI.data_type` members say *what* a slot can show and nothing says how to
   make one. The `editable` flag itself **is** covered, in
   `manifest/targets.md` under `targets.module.watchface`. So the expected
   outcome is a split: the flag VOUCHED, the widget an assumption. If the agent
   reports requirement 5 as wholly uncovered it did not find the flag, which is
   a discoverability finding rather than a coverage one.
4. **`DELEGATE` vs `WIDGET_DELEGATE` — requirement 6.** The reference page is
   named `DELEGATE` and sample code writes `hmUI.widget.WIDGET_DELEGATE`. This
   is now reported in `conflicts/index.md`. Two different findings are possible
   and they mean opposite things: hitting the mismatch *and* citing
   `conflicts/` proves that page earns its place; hitting it and working it out
   from the sample code means nobody finds `conflicts/`.
5. **`docs/watchface/specification.md` is unparsed** — 280 lines of resource and
   design rules (image formats, naming, preview sizes). Nothing in the base
   covers it, so anything about *assets* will be silent.

**Explicitly not a gap, though it looks like one.** `docs/watchface/app-json.md`
is eight lines that re-import the Mini Program `app-json.mdx`. The watchface
manifest *is* the Mini Program manifest, and `manifest/` covers it. A report
claiming the watchface `app.json` is uncovered is wrong, and worth correcting
rather than crediting.

**Expected to go well, and these are the things being tested rather than
predicted as gaps:** requirement 7 should be VOUCHED off
`compatibility/devices.md` — `st: "r"`/`sr: "w480"` against `st: "s"`/`sr:
"w390"` — and requirements 1–4 should get their widget ids and property tables
out of `api/hmUI.widget.md`. If those fail, the failure is a regression in work
that shipped without a task-level check, which is the whole reason this task
exists.

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
2. **Commit first**, so the report can name the commit it measured. The base
   changes between runs; two reports without versions cannot be compared.
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

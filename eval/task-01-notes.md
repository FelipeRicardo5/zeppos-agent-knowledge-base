# task-01 — notes for the operator

**Do not give this file to the agent.** It names the gaps that were already
known, and an agent that reads it will find those and stop looking.

**Re-read this section against the current base before every run.** A predicted
gap that has since been closed makes the run look better than it is, and one
that has opened makes a real finding look predicted. Both have happened here.

Predicted as of 2026-09-10:

- **The Settings App and the Side Service carry no `API_LEVEL` at all**, because
  no upstream page states one. Still true, and still the weak spot.
- **`@zos/ui.widget`, `align`, `text_style`, `prop` and `event` state no level
  either.** No Device App UI compiles without them, so nothing in
  `compatibility/` can certify a UI for any device. Half of this was closed —
  they used to be name-only `OBSERVED` sightings and now carry their members —
  so an agent that reports "cannot certify the UI" is repeating a known gap,
  while one that reports "cannot find what `align_h` accepts" has found a
  regression.
- **`fetch` request shape beyond a bare GET**, and the zml page→side
  `this.request` call, attested only in the receiving direction.

**No longer a gap, and it was predicted as a hard block in both earlier runs:**
`app.json` is covered since Front 8, with `manifest/` rendering the documented
tree, a two-way diff against 33 working manifests, and the permission join. A
run that still reports it as a block is either not reading `manifest/` — which
is a structural finding about discoverability, not a coverage one — or was given
a stale copy.

The findings that matter are the ones nobody predicted.

## Run protocol

1. **New session, new agent.** Not one that has read this repository before, and
   not one that ran an earlier task — it would go straight to the gaps it
   remembers instead of discovering what is there now.
2. **Commit first**, so the report can name the commit it measured. The base
   changes between runs; two reports without versions cannot be compared.
3. **Isolate by construction, not by instruction.** Give the agent a copy or a
   worktree with `eval/` removed, rather than trusting it to skip a directory
   that answers the exercise. The forbidden list is a backstop, not the fence.
4. Hand it everything below the `---` in `task-01-health-sync.md`, nothing else.
5. Save the report to `results/task-01-<date>.md` and commit it. Results belong
   in version control — the history is the measurement — they just must not be
   readable during a run.

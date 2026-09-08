# task-01 — notes for the operator

**Do not give this file to the agent.** It names the gaps that were already
known, and an agent that reads it will find those and stop looking.

Expect the Settings App and the Side Service to be the weak spots: their
symbols carry no `API_LEVEL` at all, because no upstream page states one. Expect
`app.json` to be a hard block — the base does not cover it today, and every
project needs it. Both were already known before this task ran; a report that
finds only those two has told us nothing new, and a report that finds neither
was probably not isolated from `.cache/`.

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

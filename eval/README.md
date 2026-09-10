# eval

Tasks an agent attempts using only the rendered knowledge base, so that its gaps
become a measured list instead of an argument.

The test suite in `test/` proves the extractor does not regress. Nothing there
proves the base _answers well_. That is what these tasks are for.

**`npm run verify` is the cheap half of the same job.** A task needs a fresh
isolated agent and a human to read the report, so it runs rarely; `verify` asks
the rendered base a fixed set of real questions and can run on every change.
The two are complements, not alternatives: `verify` catches an answer that
*stopped* being right, and only a task finds a question nobody thought to ask.
Every question in that set started life as a finding in one of these reports.

## Why the isolation rule is the whole design

Each task forbids reading `.cache/`, the web, and `src/`. Without that, an agent
answers from Zepp's own docs or from its own training and the run measures
nothing. The rule that makes a result usable is the one about assumptions: an
agent that hits a gap must record it and label the assumption, never smooth it
over. A blocked task is a valid outcome; a plausible app built on invention is a
corrupted one.

## Scoring a run

**Count the requirements whose implementation the base can vouch for. Do not
count blocks.**

That is a correction, and the criterion it replaces was written here. Run 2 of
task 01 finished with **zero** requirements blocked, against three in run 1, and
the agent still wrote *"would I ship it? No"* — the Settings App file was
invention and one endpoint's request shape was a guess. Counting blocks scored
that 5 of 5. The honest score was 3 of 5.

So for each numbered requirement in the task, decide one of:

- **VOUCHED** — every API in it is cited to a record, and the citations hold.
- **DELIVERED, UNVOUCHED** — there is working-looking code, and at least one
  part of it rests on a labelled assumption. This is the category that a block
  count hides, and it is where the interesting gaps are.
- **BLOCKED** — the agent stopped.

A run that finishes everything and vouches for half of it has told you exactly
where the base is thin. A run reported as "finished" has told you nothing.

## Reading a result

Rank the gaps by what they cost, not by how many there are. A gap that forced an
assumption on a shipped requirement outranks ten that cost a minute.

**Check the gaps each task's notes predicted before crediting a finding.** A
report that finds only predicted gaps adds nothing; a report that finds *none*
of them probably leaked — it read `.cache/` or its own training. The predicted
list decays as the base improves, so re-read the notes against the current base
before a run rather than trusting them: task 01's notes named `app.json` as a
hard block, and it stopped being one when Front 8 landed.

Findings go to the gap ranking in project memory, which is ordered by what
question a fix unblocks rather than by how many pages it would add. Take a
finding as evidence of where the base went quiet, **never as a specification of
what to add** — three items on the roadmap were mis-specified by doing exactly
that.

## Tasks

| Task | Exercises | Operator notes |
| --- | --- | --- |
| [task-01-health-sync](task-01-health-sync.md) | all three parts of a Mini Program, sensor + HTTP + persistence, and a named target device | [notes](task-01-notes.md) |
| [task-02-watchface](task-02-watchface.md) | the `hm*` API, which no run has touched: a separate runtime, its own globals, and no `API_LEVEL` anywhere in it | [notes](task-02-notes.md) |

Results land in `results/`, one file per run, named `task-NN-<date>.md`.

## Two files per task, on purpose

The task file is what the agent gets. The notes file is what the operator gets,
and it names the gaps already known — hand it to an agent and the run recites
instead of measuring. Each task’s notes also carry the run protocol: new
session, commit first, and isolate by removing `eval/` from what the agent can
see rather than by asking it not to look.

Results are committed, because the history *is* the measurement. They just must
not be readable during a run: a previous report lists every gap found, and the
app beside it contains the workarounds.

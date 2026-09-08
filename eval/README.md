# eval

Tasks an agent attempts using only the rendered knowledge base, so that its gaps
become a measured list instead of an argument.

The test suite in `test/` proves the extractor does not regress. Nothing there
proves the base _answers well_. That is what these tasks are for, and it is the
one claim the project has never checked.

## Why the isolation rule is the whole design

Each task forbids reading `.cache/`, the web, and `src/`. Without that, an agent
answers from Zepp's own docs or from its own training and the run measures
nothing. The rule that makes a result usable is the one about assumptions: an
agent that hits a gap must record it and label the assumption, never smooth it
over. A blocked task is a valid outcome; a plausible app built on invention is a
corrupted one.

## Reading a result

Rank the gaps by what they cost, not by how many there are. A gap that blocked
the task outranks ten that cost a minute. Two are already known and predicted in
each task's notes — the Settings App and Side Service having no `API_LEVEL`, and
`app.json` not being covered at all. A report that finds only those adds nothing;
a report that finds neither probably leaked.

Findings go to the gap ranking in project memory, which is ordered by what
question a fix unblocks rather than by how many pages it would add.

## Tasks

| Task | Exercises | Operator notes |
| --- | --- | --- |
| [task-01-health-sync](task-01-health-sync.md) | all three parts of a Mini Program, sensor + HTTP + persistence, and a named target device | [notes](task-01-notes.md) |

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

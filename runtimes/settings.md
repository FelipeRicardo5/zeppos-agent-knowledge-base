# Settings App — runtime

**21 symbols across 3 modules.**

A symbol is attributed to a runtime by the source path it was extracted from,
not by any statement in its own text. Absence is *not covered*, not *invalid here*.

## What this base states here

| Axis | Symbols stating it |
| --- | --- |
| Minimum `API_LEVEL` | 0 of 21 |
| Call signature | 13 of 21 |
| Instance members | 0 of 21 |
| Permission | 0 of 21 |

An axis at zero is an upstream silence, not an extraction failure: no page in this runtime's tree states a minimum `API_LEVEL` or instance members. Absence is *not documented*, never *not needed*.

**No symbol here states a permission**, and no page in this runtime's upstream tree mentions one. That is absence of evidence: it does **not** mean an app using this runtime needs none in `app.json`. Only the Device App tree documents permissions at all, so an empty `permissions` array here is the only citable choice rather than a verified one.

## `global`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `console.log` | not stated | Side Service |

## `settings-storage`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `addListener` | not stated | Side Service |
| `clear` | not stated | Side Service |
| `getItem` | not stated | Side Service |
| `length` | not stated | Side Service |
| `removeItem` | not stated | Side Service |
| `setItem` | not stated | Side Service |
| `toObject` | not stated | Side Service |

## `ui`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `Auth` | not stated | — |
| `Button` | not stated | — |
| `Image` | not stated | — |
| `Link` | not stated | — |
| `Section` | not stated | — |
| `Select` | not stated | — |
| `Slider` | not stated | — |
| `Text` | not stated | — |
| `TextImageRow` | not stated | — |
| `TextInput` | not stated | — |
| `Toast` | not stated | — |
| `Toggle` | not stated | — |
| `View` | not stated | — |

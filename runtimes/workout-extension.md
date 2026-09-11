# Workout Extension — runtime

**12 symbols across 5 modules.**

A symbol is attributed to a runtime by the source path it was extracted from,
not by any statement in its own text. Absence is *not covered*, not *invalid here*.

## What this base states here

| Axis | Symbols stating it |
| --- | --- |
| Minimum `API_LEVEL` | 3 of 12 |
| Call signature | 2 of 12 |
| Instance members | 1 of 12 |
| Permission | 0 of 12 |

**No symbol here states a permission**, and no page in this runtime's upstream tree mentions one. That is absence of evidence: it does **not** mean an app using this runtime needs none in `app.json`. Only the Device App tree documents permissions at all, so an empty `permissions` array here is the only citable choice rather than a verified one.

## `@zeppos/zml/base-app`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `BaseApp` | not stated | Device App |

## `@zeppos/zml/base-page`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `BasePage` | not stated | Device App |

## `@zos/sensor`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `Time` | >= 2 | Device App |

## `@zos/ui`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `align` | not stated | Device App |
| `createWidget` | >= 2 | Device App |
| `data_type` | not stated | — |
| `edit_widget_group_type` | not stated | — |
| `prop` | not stated | Device App |
| `sport_data` | not stated | — |
| `text_style` | not stated | Device App |
| `widget` | not stated | Device App |

## `@zos/utils`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `px` | >= 2 | Device App |

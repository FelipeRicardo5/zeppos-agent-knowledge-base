# Side Service — runtime

**20 symbols across 10 modules.**

A symbol is attributed to a runtime by the source path it was extracted from,
not by any statement in its own text. Absence is *not covered*, not *invalid here*.

**No symbol here states a permission**, and no page in this runtime's upstream tree mentions one. That is absence of evidence: it does **not** mean an app using this runtime needs none in `app.json`. Only the Device App tree documents permissions at all, so an empty `permissions` array here is the only citable choice rather than a verified one.

## `@zeppos/zml/2.0/module/messaging/plugin/side`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `messagingPlugin` | not stated | — |

## `@zeppos/zml/base-side`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `BaseSideService` | not stated | — |
| `convertLib` | not stated | — |
| `settingsLib` | not stated | — |

## `@zeppos/zml/base/base-side`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `BaseSideService` | not stated | — |

## `download-file`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `downloadFile` | not stated | — |

## `fetch`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `fetch` | not stated | — |

## `global`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `console.log` | not stated | Settings App |

## `image-convert`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `convert` | not stated | — |

## `messaging`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `addListener` | not stated | — |
| `send` | not stated | — |

## `settings-storage`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `addListener` | not stated | Settings App |
| `clear` | not stated | Settings App |
| `getItem` | not stated | Settings App |
| `length` | not stated | Settings App |
| `removeItem` | not stated | Settings App |
| `setItem` | not stated | Settings App |
| `toObject` | not stated | Settings App |

## `transfer-file`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `getInbox` | not stated | — |
| `getOnbox` | not stated | — |

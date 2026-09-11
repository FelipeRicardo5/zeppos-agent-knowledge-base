# Watchface — runtime

**105 symbols across 10 modules.**

A symbol is attributed to a runtime by the source path it was extracted from,
not by any statement in its own text. Absence is *not covered*, not *invalid here*.

**No symbol here states a permission**, and no page in this runtime's upstream tree mentions one. That is absence of evidence: it does **not** mean an app using this runtime needs none in `app.json`. Only the Device App tree documents permissions at all, so an empty `permissions` array here is the only citable choice rather than a verified one.

## `@zos/app`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `getScene` | >= 2 | Device App |
| `SCENE_AOD` | >= 2 | Device App |

## `@zos/utils`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `log` | >= 2 | Device App |

## `hmBle`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `addListener` | not stated | — |
| `connectStatus` | not stated | — |
| `createConnect` | not stated | — |
| `disConnect` | not stated | — |
| `removeListener` | not stated | — |
| `send` | not stated | — |

## `hmFS`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `close` | not stated | — |
| `open` | not stated | — |
| `open_asset` | not stated | — |
| `read` | not stated | — |
| `remove` | not stated | — |
| `rename` | not stated | — |
| `seek` | not stated | — |
| `stat` | not stated | — |
| `stat_asset` | not stated | — |
| `SysProGetBool` | not stated | — |
| `SysProGetChars` | not stated | — |
| `SysProGetDouble` | not stated | — |
| `SysProGetInt` | not stated | — |
| `SysProGetInt64` | not stated | — |
| `SysProSetBool` | not stated | — |
| `SysProSetChars` | not stated | — |
| `SysProSetDouble` | not stated | — |
| `SysProSetInt` | not stated | — |
| `SysProSetInt64` | not stated | — |
| `write` | not stated | — |

## `hmSensor`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `addEventListener` | not stated | — |
| `createSensor` | not stated | — |
| `id` | not stated | — |

## `hmSensor.id`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `BATTERY` | not stated | — |
| `BODY_TEMP` | not stated | — |
| `CALORIE` | not stated | — |
| `DISTANCE` | not stated | — |
| `FAT_BURRING` | not stated | — |
| `HEART` | not stated | — |
| `MUSIC` | not stated | — |
| `PAI` | not stated | — |
| `SLEEP` | not stated | — |
| `SPO2` | not stated | — |
| `STAND` | not stated | — |
| `STEP` | not stated | — |
| `STRESS` | not stated | — |
| `TIME` | not stated | — |
| `VIBRATE` | not stated | — |
| `WEAR` | not stated | — |
| `WEATHER` | not stated | — |
| `WORLD_CLOCK` | not stated | — |

## `hmSetting`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `getBrightness` | not stated | — |
| `getDateFormat` | not stated | — |
| `getDeviceInfo` | not stated | — |
| `getDiskInfo` | not stated | — |
| `getLanguage` | not stated | — |
| `getMileageUnit` | not stated | — |
| `getScreenAutoBright` | not stated | — |
| `getScreenType` | not stated | — |
| `getSleepTarget` | not stated | — |
| `getTimeFormat` | not stated | — |
| `getUserData` | not stated | — |
| `getWeightTarget` | not stated | — |
| `getWeightUnit` | not stated | — |
| `screen_type` | not stated | — |
| `setBrightness` | not stated | — |
| `setBrightScreen` | not stated | — |
| `setBrightScreenCancel` | not stated | — |
| `setScreenAutoBright` | not stated | — |
| `setScreenOff` | not stated | — |

## `hmUI`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `align` | not stated | — |
| `anim_status` | not stated | — |
| `createWidget` | not stated | — |
| `data_type` | not stated | — |
| `date` | not stated | — |
| `deleteWidget` | not stated | — |
| `getProperty` | not stated | — |
| `prop` | not stated | — |
| `setProperty` | not stated | — |
| `system_status` | not stated | — |
| `text_style` | not stated | — |
| `widget` | not stated | — |

## `hmUI.widget`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `ARC` | not stated | — |
| `ARC_PROGRESS` | not stated | — |
| `BUTTON` | not stated | — |
| `CIRCLE` | not stated | — |
| `DATE_POINTER` | not stated | — |
| `DELEGATE` | not stated | — |
| `FILL_RECT` | not stated | — |
| `GRADKIENT_POLYLINE` | not stated | — |
| `IMG` | not stated | — |
| `IMG_ANIM` | not stated | — |
| `IMG_CLICK` | not stated | — |
| `IMG_DATE` | not stated | — |
| `IMG_LEVEL` | not stated | — |
| `IMG_POINTER` | not stated | — |
| `IMG_PROGRESS` | not stated | — |
| `IMG_STATUS` | not stated | — |
| `IMG_TIME` | not stated | — |
| `IMG_WEEK` | not stated | — |
| `STROKE_RECT` | not stated | — |
| `TEXT` | not stated | — |
| `TEXT_IMG` | not stated | — |
| `TIME_POINTER` | not stated | — |

## `timer`

| Symbol | Min API_LEVEL | Also valid in |
| --- | --- | --- |
| `createTimer` | not stated | — |
| `stopTimer` | not stated | — |

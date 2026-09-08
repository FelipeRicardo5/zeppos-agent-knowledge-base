# @zos/display

**13 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getAutoBrightness` | function | >= 2 | OFFICIAL |
| `getBrightness` | function | >= 2 | OFFICIAL |
| `getSettings` | function | >= 3 | OFFICIAL |
| `pauseDropWristScreenOff` | function | >= 2.1 | OFFICIAL |
| `pausePalmScreenOff` | function | >= 2.1 | OFFICIAL |
| `resetDropWristScreenOff` | function | >= 2.1 | OFFICIAL |
| `resetPageBrightTime` | function | >= 2 | OFFICIAL |
| `resetPalmScreenOff` | function | >= 2.1 | OFFICIAL |
| `setAutoBrightness` | function | >= 2 | OFFICIAL |
| `setBrightness` | function | >= 2 | OFFICIAL |
| `setPageBrightTime` | function | >= 2 | OFFICIAL |
| `setScreenOff` | function | >= 2 | OFFICIAL |
| `setWakeUpRelaunch` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/display.getAutoBrightness`

Get whether to turn on the screen auto brightness setting.

```ts
function getAutoBrightness(): Result
```

### `@zos/display.getBrightness`

Get the screen brightness of the current device.

```ts
function getBrightness(): Result
```

### `@zos/display.getSettings`

Get system display related information.

```ts
function getSettings(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `screen` | `ScreenObj` | not stated | — | >= 3 | Screen Status |
| `wrist` | `WristObj` | not stated | — | >= 3 | Lift wrist to view info setting |
| `standby` | `StandbyObj` | not stated | — | >= 3 | Rest screen display settings |

**ScreenObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `status` | `number` | not stated | — | >= 3 | Current screen status, 1: On, 2: Off |
| `duration` | `number` | not stated | — | >= 3 | Screen light-up time, in seconds |

**WristObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `speed` | `number` | not stated | — | >= 3 | Response speed |
| `model` | `number` | not stated | — | >= 3 | Mode, see model for value |
| `startTime` | `number` | not stated | — | >= 3 | Start time, based on the number of minutes at 0:00 of the day |
| `endTime` | `number` | not stated | — | >= 3 | End time, based on the number of minutes at 0:00 of the day |

**StandbyObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `style` | `number` | not stated | — | >= 3 | Rest screen Watchface style, 0: system default, 1: follow the current dial |
| `model` | `number` | not stated | — | >= 3 | Mode, see model for value |
| `startTime` | `number` | not stated | — | >= 3 | Start time, based on the number of minutes at 0:00 of the day |
| `endTime` | `number` | not stated | — | >= 3 | End time, based on the number of minutes at 0:00 of the day |

### `@zos/display.pauseDropWristScreenOff`

Suspension of wrist resting behavior.

```ts
function pauseDropWristScreenOff(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `duration` | `number` | not stated | `30000` | >= 2.1 | Duration (milliseconds), if 0 is passed, the wrist rest behavior will be suspended until resetPalmScreenOff is called |

### `@zos/display.pausePalmScreenOff`

Suspension of overlapping palm resting screen behavior.

```ts
function pausePalmScreenOff(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `duration` | `number` | not stated | `30000` | >= 2.1 | Duration (milliseconds), if 0 is passed, the palm rest behavior is suspended until resetPalmScreenOff is called |

### `@zos/display.resetDropWristScreenOff`

Resume wrist drop resting behavior.

```ts
function resetDropWristScreenOff(): Result
```

### `@zos/display.resetPageBrightTime`

Cancel the bright time set by `setPageBrightTime`.

```ts
function resetPageBrightTime(): Result
```

### `@zos/display.resetPalmScreenOff`

Recovery of overlapping palm resting screen behavior.

```ts
function resetPalmScreenOff(): Result
```

### `@zos/display.setAutoBrightness`

Set whether to turn on auto-brightness, if it is on, then the screen brightness will be controlled by the light sensor and the `setBrightness` will be disabled.

```ts
function setAutoBrightness(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `autoBright` | `boolean` | not stated | — | >= 2 | Whether to open the automatic brightness |

### `@zos/display.setBrightness`

Set the screen brightness of the current device. If the auto brightness setting is currently turned on, the brightness is automatically adjusted by the light sensor, calling `setBrightness` will not take effect at this time, you need to use `setAutoBrightness` to turn off the auto brightness and then set it again. Note: If you exit the current page, you need to consider whether you need to set the brightness back to the original brightness.

```ts
function setBrightness(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `brightness` | `number` | not stated | — | >= 2 | Screen brightness value, range 0 - 100 |

### `@zos/display.setPageBrightTime`

Set the current page screen lighting time, this setting will follow the page destruction to do reset.

```ts
function setPageBrightTime(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `brightTime` | `number` | not stated | `10000` | >= 2 | Screen lighting time (milliseconds), range [1000 - 2147483000] |

### `@zos/display.setScreenOff`

Set the screen to rest.

```ts
function setScreenOff(): Result
```

### `@zos/display.setWakeUpRelaunch`

By default, the system will off the screen in one page of the Mini Program, and the system will exit the Mini Program after 10s, and enter the dial page when the watch is woken up again. If `relaunch` is set to `true`, the Mini Program will reopen and enter the corresponding page when the watch is woken up again.

```ts
function setWakeUpRelaunch(option: Option): void
```

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `relaunch` | `boolean` | not stated | — | >= 2 | Whether to reopen the Mini Program after waking up the watch again after a screen break |

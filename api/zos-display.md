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

## Descriptions

### `@zos/display.getAutoBrightness`

Get whether to turn on the screen auto brightness setting.

### `@zos/display.getBrightness`

Get the screen brightness of the current device.

### `@zos/display.getSettings`

Get system display related information.

### `@zos/display.pauseDropWristScreenOff`

Suspension of wrist resting behavior.

### `@zos/display.pausePalmScreenOff`

Suspension of overlapping palm resting screen behavior.

### `@zos/display.resetDropWristScreenOff`

Resume wrist drop resting behavior.

### `@zos/display.resetPageBrightTime`

Cancel the bright time set by `setPageBrightTime`.

### `@zos/display.resetPalmScreenOff`

Recovery of overlapping palm resting screen behavior.

### `@zos/display.setAutoBrightness`

Set whether to turn on auto-brightness, if it is on, then the screen brightness will be controlled by the light sensor and the `setBrightness` will be disabled.

### `@zos/display.setBrightness`

Set the screen brightness of the current device. If the auto brightness setting is currently turned on, the brightness is automatically adjusted by the light sensor, calling `setBrightness` will not take effect at this time, you need to use `setAutoBrightness` to turn off the auto brightness and then set it again. Note: If you exit the current page, you need to consider whether you need to set the brightness back to the original brightness.

### `@zos/display.setPageBrightTime`

Set the current page screen lighting time, this setting will follow the page destruction to do reset.

### `@zos/display.setScreenOff`

Set the screen to rest.

### `@zos/display.setWakeUpRelaunch`

By default, the system will off the screen in one page of the Mini Program, and the system will exit the Mini Program after 10s, and enter the dial page when the watch is woken up again. If `relaunch` is set to `true`, the Mini Program will reopen and enter the corresponding page when the watch is woken up again.

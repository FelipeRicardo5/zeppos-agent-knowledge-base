# hmSetting

**19 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getBrightness` | function | not stated | OFFICIAL |
| `getDateFormat` | function | not stated | OFFICIAL |
| `getDeviceInfo` | function | not stated | OFFICIAL |
| `getDiskInfo` | function | not stated | OFFICIAL |
| `getLanguage` | function | not stated | OFFICIAL |
| `getMileageUnit` | function | not stated | OFFICIAL |
| `getScreenAutoBright` | function | not stated | OFFICIAL |
| `getScreenType` | function | not stated | OFFICIAL |
| `getSleepTarget` | function | not stated | OFFICIAL |
| `getTimeFormat` | function | not stated | OFFICIAL |
| `getUserData` | function | not stated | OFFICIAL |
| `getWeightTarget` | function | not stated | OFFICIAL |
| `getWeightUnit` | function | not stated | OFFICIAL |
| `screen_type` | constant | not stated | OFFICIAL |
| `setBrightness` | function | not stated | OFFICIAL |
| `setBrightScreen` | function | not stated | OFFICIAL |
| `setBrightScreenCancel` | function | not stated | OFFICIAL |
| `setScreenAutoBright` | function | not stated | OFFICIAL |
| `setScreenOff` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmSetting.getBrightness`

Returns the screen brightness of the current device.

```ts
() => result
```

### `hmSetting.getDateFormat`

Return the current year, month and day order.

```ts
() => result
```

**result: number**

| Value | Description |
| --- | --- |
| `0` | — |
| `1` | — |
| `2` | — |

### `hmSetting.getDeviceInfo`

Gets the device information.

```ts
() => deviceInfo
```

**deviceInfo**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `width` | `number` | not stated | — | width of the device screen |
| `height` | `number` | not stated | — | device screen height |
| `screenShape` | `number` | not stated | — | Screen shape, 0-square screen, 1-round screen |
| `deviceName` | `string` | not stated | — | device name |
| `keyNumber` | `number` | not stated | — | number of keys |
| `deviceSource` | `number` | not stated | — | device code |

### `hmSetting.getDiskInfo`

Get disk information.

```ts
() => diskInfo
```

**diskInfo**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `total` | `number` | not stated | — | total space |
| `free` | `number` | not stated | — | free space |
| `app` | `number` | not stated | — | js application space used |
| `watchface` | `number` | not stated | — | watchface |
| `music` | `number` | not stated | — | space used for music |
| `system` | `number` | not stated | — | system used space |

### `hmSetting.getLanguage`

Returns the current language serial number.

```ts
() => result
```

### `hmSetting.getMileageUnit`

Returns whether the current distance unit is metric or imperial. This method is to get the units set by the user and does not represent the units of the data. The units of the data refer to the interface description of the corresponding data.

```ts
() => result
```

### `hmSetting.getScreenAutoBright`

Returns whether the current device has auto-brightness enabled. If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect.

```ts
() => result
```

### `hmSetting.getScreenType`

Get the current screen Screen information.

```ts
() => screenType
```

### `hmSetting.getSleepTarget`

Get the user sleep target.

```ts
() => sleepTarget
```

### `hmSetting.getTimeFormat`

Returns the current system-set time system.

```ts
() => result
```

**result: number**

| Value | Description |
| --- | --- |
| `0` | — |
| `1` | — |

### `hmSetting.getUserData`

Gets the user data. All properties are `0` when no data is fetched.

```ts
() => userData
```

**userData**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `age` | `number` | not stated | — | The user's age, or 0 when there is no data |
| `height` | `number` | not stated | — | The user's height, a floating-point number, or 0 when there is no data |
| `weight` | `number` | not stated | — | The user's weight, in floating point numbers, or 0 when there is no data |
| `gender` | `boolean` | not stated | — | 0: MALE, 1: FEMALE, 2: UNSPECIFIED |
| `nickName` | `string` | not stated | — | user nickname |
| `region` | `string` | not stated | — | User registration area (ISO standard) |

### `hmSetting.getWeightTarget`

Get the user's weight target.

```ts
() => weightTarget
```

### `hmSetting.getWeightUnit`

Get the weight unit set by the user.

```ts
() => weightUnit
```

**weightUnit: number**

| Value | Description |
| --- | --- |
| `0` | Kilogram |
| `1` | Jin |
| `2` | Pound |
| `3` | Stone |

### `hmSetting.screen_type`

**screen_type**

| Value | Description |
| --- | --- |
| `screen_type.AOD` | In the hibernation screen |
| `screen_type.APP` | Within the js application |
| `screen_type.SETTINGS` | In the js application configuration or Watchface edit page |
| `screen_type.WATCHFACE` | In the js table main screen |

### `hmSetting.setBrightness`

Sets the screen brightness of the current device, in the range [0, 100]. If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect. You need to turn off auto-brightness first and then set the screen brightness. If you exit the page, you need to consider whether you need to set the brightness back to the original one.

```ts
(brightness: number) => result
```

### `hmSetting.setBrightScreen`

Set the bright screen time. When you need the screen to be always on, you can set a larger bright screen time.

```ts
(brightTime: number) => result
```

### `hmSetting.setBrightScreenCancel`

Cancel the bright screen time. You need to call `setBrightScreenCancel` method in the app destroy function after you have called `setBrightScreen` method to set the bright screen time.

```ts
() => result
```

### `hmSetting.setScreenAutoBright`

Set whether auto-brightness is enabled or not. If auto-brightness is currently turned on and the brightness is automatically adjusted by the light sensor, the `setBrightness` function will have no real effect.

```ts
(isAutoBright: boolean) => result
```

### `hmSetting.setScreenOff`

Call `setScreenOff` to rest the screen.

```ts
() => result
```

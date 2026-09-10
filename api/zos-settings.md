# @zos/settings

**23 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `DATE_FORMAT_DMY` | constant | >= 2 | OFFICIAL |
| `DATE_FORMAT_MDY` | constant | >= 2 | OFFICIAL |
| `DATE_FORMAT_YMD` | constant | >= 2 | OFFICIAL |
| `DISTANCE_UNIT_IMPERIAL` | constant | >= 2 | OFFICIAL |
| `DISTANCE_UNIT_METRIC` | constant | >= 2 | OFFICIAL |
| `getDateFormat` | function | >= 2 | OFFICIAL |
| `getDistanceUnit` | function | >= 2 | OFFICIAL |
| `getLanguage` | function | >= 2 | OFFICIAL |
| `getSleepTarget` | function | >= 2 | OFFICIAL |
| `getSystemInfo` | function | >= 2.1 | OFFICIAL |
| `getSystemMode` | function | >= 3 | OFFICIAL |
| `getTemperatureUnit` | function | >= 2.1 | OFFICIAL |
| `getTimeFormat` | function | >= 2.1 | OFFICIAL |
| `getWeightTarget` | function | >= 2 | OFFICIAL |
| `getWeightUnit` | function | >= 2 | OFFICIAL |
| `TEMPERATURE_UNIT_CENTIGRADE` | constant | >= 2 | OFFICIAL |
| `TEMPERATURE_UNIT_FAHRENHEIT` | constant | >= 2 | OFFICIAL |
| `TIME_FORMAT_12` | constant | >= 2.1 | OFFICIAL |
| `TIME_FORMAT_24` | constant | >= 2.1 | OFFICIAL |
| `WEIGHT_UNIT_JIN` | constant | >= 2 | OFFICIAL |
| `WEIGHT_UNIT_KILOGRAM` | constant | >= 2 | OFFICIAL |
| `WEIGHT_UNIT_POUND` | constant | >= 2 | OFFICIAL |
| `WEIGHT_UNIT_STONE` | constant | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/settings.DATE_FORMAT_DMY`

day-month-year

### `@zos/settings.DATE_FORMAT_MDY`

month-day-year

### `@zos/settings.DATE_FORMAT_YMD`

year-month-day

### `@zos/settings.DISTANCE_UNIT_IMPERIAL`

imperial system

### `@zos/settings.DISTANCE_UNIT_METRIC`

metric system

### `@zos/settings.getDateFormat`

Get the current system date format.

```ts
function getDateFormat(): Result
```

**Date format constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `DATE_FORMAT_DMY` | >= 2 | day-month-year |
| `DATE_FORMAT_MDY` | >= 2 | month-day-year |
| `DATE_FORMAT_YMD` | >= 2 | year-month-day |

### `@zos/settings.getDistanceUnit`

Returns whether the current distance unit is metric or imperial. This method is to get the units set by the user, not to represent the units of the data, the data units refer to the interface description of the corresponding data.

```ts
function getDistanceUnit(): Result
```

**Distance unit constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `DISTANCE_UNIT_IMPERIAL` | >= 2 | imperial system |
| `DISTANCE_UNIT_METRIC` | >= 2 | metric system |

### `@zos/settings.getLanguage`

Get the current system language setting.

```ts
function getLanguage(): Result
```

### `@zos/settings.getSleepTarget`

Get the sleep target set by the user.

```ts
function getSleepTarget(): Result
```

### `@zos/settings.getSystemInfo`

Get system related information.

```ts
function getSystemInfo(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `osVersion` | `string` | not stated | — | >= 2.1 | Zepp OS System Version |
| `firmwareVersion` | `string` | not stated | — | >= 2.1 | Device firmware version |
| `minAPI` | `string` | not stated | — | >= 2.1 | API_LEVEL |

### `@zos/settings.getSystemMode`

Get the system mode setting information.

```ts
function getSystemMode(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `DND` | `boolean` | not stated | — | >= 3 | State of Do Not Disturb Mode |
| `sleep` | `boolean` | not stated | — | >= 3 | State of Sleep Mode |
| `theater` | `boolean` | not stated | — | >= 3 | State of Sleep Mode |
| `systemLock` | `boolean` | not stated | — | >= 3 | State of Screen Lock Mode |
| `lowTemperature` | `boolean` | not stated | — | >= 3 | State of Low Temperature Mode |
| `powerSaving` | `boolean` | not stated | — | >= 3 | State of Power Saving Mode |
| `ultraPowerSaving` | `boolean` | not stated | — | >= 3 | State of Clock Mode |
| `button` | `boolean` | not stated | — | >= 3 | State of Button Mode |
| `accessibleSwitch` | `boolean` | not stated | — | >= 3 | State of Accessible |

### `@zos/settings.getTemperatureUnit`

Get the temperature units set by the user.

```ts
function getTemperatureUnit(): Result
```

**Temperature unit constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `TEMPERATURE_UNIT_CENTIGRADE` | >= 2 | Celsius temperature |
| `TEMPERATURE_UNIT_FAHRENHEIT` | >= 2 | Fahrenheit temperature |

### `@zos/settings.getTimeFormat`

Get the current system time format, 12-hour format or 24-hour format.

```ts
function getTimeFormat(): Result
```

**Hour format constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `TIME_FORMAT_12` | >= 2.1 | 12-hour format |
| `TIME_FORMAT_24` | >= 2.1 | 24-hour format |

### `@zos/settings.getWeightTarget`

Get the weight target set by the user.

```ts
function getWeightTarget(): Result
```

### `@zos/settings.getWeightUnit`

Gets the weight unit set by the user.

```ts
function getWeightUnit(): Result
```

**Weight unit constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `WEIGHT_UNIT_JIN` | >= 2 | Jin |
| `WEIGHT_UNIT_KILOGRAM` | >= 2 | Kilogram |
| `WEIGHT_UNIT_POUND` | >= 2 | Pound |
| `WEIGHT_UNIT_STONE` | >= 2 | Stone |

### `@zos/settings.TEMPERATURE_UNIT_CENTIGRADE`

Celsius temperature

### `@zos/settings.TEMPERATURE_UNIT_FAHRENHEIT`

Fahrenheit temperature

### `@zos/settings.TIME_FORMAT_12`

12-hour format

### `@zos/settings.TIME_FORMAT_24`

24-hour format

### `@zos/settings.WEIGHT_UNIT_JIN`

Jin

### `@zos/settings.WEIGHT_UNIT_KILOGRAM`

Kilogram

### `@zos/settings.WEIGHT_UNIT_POUND`

Pound

### `@zos/settings.WEIGHT_UNIT_STONE`

Stone

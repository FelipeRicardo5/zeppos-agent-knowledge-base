# @zos/sensor

**32 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `Accelerometer` | value | >= 3 | OFFICIAL |
| `Barometer` | value | >= 2.1 | OFFICIAL |
| `Battery` | value | >= 2 | OFFICIAL |
| `BloodOxygen` | value | >= 2 | OFFICIAL |
| `BodyTemperature` | value | >= 3 | OFFICIAL |
| `Buzzer` | value | >= 3.6 | OFFICIAL |
| `Calorie` | value | >= 2 | OFFICIAL |
| `checkSensor` | function | >= 3 | OFFICIAL |
| `Compass` | value | >= 3 | OFFICIAL |
| `Distance` | value | >= 2 | OFFICIAL |
| `FatBurning` | value | >= 2 | OFFICIAL |
| `FREQ_MODE_HIGH` | constant | >= 3 | OFFICIAL |
| `FREQ_MODE_LOW` | constant | >= 3 | OFFICIAL |
| `FREQ_MODE_NORMAL` | constant | >= 3 | OFFICIAL |
| `Geolocation` | value | >= 2.1 | OFFICIAL |
| `Gyroscope` | value | >= 3 | OFFICIAL |
| `HeartRate` | value | >= 2 | OFFICIAL |
| `Pai` | value | >= 2 | OFFICIAL |
| `Screen` | value | >= 3 | OFFICIAL |
| `Sleep` | value | >= 2 | OFFICIAL |
| `Stand` | value | >= 2 | OFFICIAL |
| `Step` | value | >= 2 | OFFICIAL |
| `Stress` | value | >= 2 | OFFICIAL |
| `SystemSounds` | value | >= 3.6 | OFFICIAL |
| `Time` | value | >= 2 | OFFICIAL |
| `TIME_HOUR_FORMAT_12` | constant | >= 2.1 | OFFICIAL |
| `TIME_HOUR_FORMAT_24` | constant | >= 2.1 | OFFICIAL |
| `Vibrator` | value | >= 2 | OFFICIAL |
| `Wear` | value | >= 2 | OFFICIAL |
| `Weather` | value | >= 2 | OFFICIAL |
| `Workout` | value | >= 3 | OFFICIAL |
| `WorldClock` | value | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/sensor.Accelerometer`

accelerometer. Measure the acceleration of the device along three orthogonal axes (x, y, z). The x and y axes are parallel to the screen, with the positive direction referring to the diagram. The z-axis is perpendicular to the device's screen, with the positive direction pointing upward.

**Requires in `app.json`**: `device:os.accelerometer` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Accelerometer` value** — 7 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`start`](#zossensoraccelerometerstart) | not stated | `start(): void` |
| [`stop`](#zossensoraccelerometerstop) | not stated | `stop(): void` |
| [`getCurrent`](#zossensoraccelerometergetcurrent) | not stated | `getCurrent(): Result` |
| [`onChange`](#zossensoraccelerometeronchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensoraccelerometeroffchange) | not stated | `offChange(callback: () => void): void` |
| [`setFreqMode`](#zossensoraccelerometersetfreqmode) | >= 3 | `setFreqMode(mode: number): void` |
| [`getFreqMode`](#zossensoraccelerometergetfreqmode) | >= 3 | `getFreqMode(): number` |

#### `@zos/sensor.Accelerometer.start`

Start listening to accelerometer data

```ts
start(): void
```

#### `@zos/sensor.Accelerometer.stop`

Stop listening to accelerometer data

```ts
stop(): void
```

#### `@zos/sensor.Accelerometer.getCurrent`

Get current accelerometer data

```ts
getCurrent(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | >= 3 | Acceleration of x-axis in cm/s^2 |
| `y` | `number` | not stated | — | >= 3 | Acceleration of y-axis in cm/s^2 |
| `z` | `number` | not stated | — | >= 3 | Acceleration of z-axis in cm/s^2 |

#### `@zos/sensor.Accelerometer.onChange`

Register the accelerometer data change event listener callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Accelerometer.offChange`

Cancel the accelerometer data change event listener callback function

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.Accelerometer.setFreqMode`

Set the mode of trigger frequency, `mode` value reference frequency mode constant

```ts
setFreqMode(mode: number): void
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

#### `@zos/sensor.Accelerometer.getFreqMode`

Get the mode of trigger frequency, result value reference frequency mode constant

```ts
getFreqMode(): number
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

### `@zos/sensor.Barometer`

Barometer Sensor.

**Requires in `app.json`**: `device:os.barometer` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Barometer` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getAirPressure`](#zossensorbarometergetairpressure) | `getAirPressure(): number` |
| [`getAltitude`](#zossensorbarometergetaltitude) | `getAltitude(): number` |
| [`onChange`](#zossensorbarometeronchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorbarometeroffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Barometer.getAirPressure`

Get air pressure value in hPa

```ts
getAirPressure(): number
```

#### `@zos/sensor.Barometer.getAltitude`

Get altitude value in meters

```ts
getAltitude(): number
```

#### `@zos/sensor.Barometer.onChange`

Register the air pressure and altitude change event callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Barometer.offChange`

Cancel the air pressure and altitude change event callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.Battery`

Battery Sensor.

**Called on a `Battery` value** — 3 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorbatterygetcurrent) | `getCurrent(): number` |
| [`onChange`](#zossensorbatteryonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorbatteryoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Battery.getCurrent`

Get the current device power percentage, range 0 - 100

```ts
getCurrent(): number
```

#### `@zos/sensor.Battery.onChange`

Register the power change event callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Battery.offChange`

Cancel the power change event callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.BloodOxygen`

Blood oxygen Sensor.

**Requires in `app.json`**: `data:user.hd.spo2` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `BloodOxygen` value** — 7 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getCurrent`](#zossensorbloodoxygengetcurrent) | not stated | `getCurrent(): Result` |
| [`getLastDay`](#zossensorbloodoxygengetlastday) | not stated | `getLastDay(): Array<number>` |
| [`start`](#zossensorbloodoxygenstart) | >= 2.1 | `start(): void` |
| [`stop`](#zossensorbloodoxygenstop) | >= 2.1 | `stop(): void` |
| [`onChange`](#zossensorbloodoxygenonchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorbloodoxygenoffchange) | not stated | `offChange(callback: () => void): void` |
| [`getLastFewHour`](#zossensorbloodoxygengetlastfewhour) | >= 3 | `getLastFewHour(hour: number): Array<Data>` |

#### `@zos/sensor.BloodOxygen.getCurrent`

Get the current measured blood oxygen result

```ts
getCurrent(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | not stated | — | >= 2 | Blood oxygen measurement values |
| `time` | `number` | not stated | — | >= 2 | Measurement time |
| `retCode` | `number` | not stated | — | >= 2 | Result code, refer to retCode description |

**retCode**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 2 | Measurement invalid |
| `1` | `number` | >= 2 | Continue measuring |
| `2` | `number` | >= 2 | Measurement success |
| `3` | `number` | >= 2 | Measurement failure |
| `4` | `number` | >= 2 | Not wearing |
| `5` | `number` | >= 2 | Measurement timeout |
| `6` | `number` | >= 2 | Invalid wearing |
| `7` | `number` | >= 2 | Invalid signal |
| `8` | `number` | >= 2 | Low blood oxygen value |
| `9` | `number` | >= 2 | High blood oxygen value |
| `10` | `number` | >= 2 | Measurement invalid |

#### `@zos/sensor.BloodOxygen.getLastDay`

Returns the average blood sample data for the past 24 hours, with an array length of 24

```ts
getLastDay(): Array<number>
```

#### `@zos/sensor.BloodOxygen.start`

Start blood oxygen measurement, it is recommended to call `stop` to stop the last measurement before calling the `start` method

```ts
start(): void
```

#### `@zos/sensor.BloodOxygen.stop`

Cancel blood oxygen measurement

```ts
stop(): void
```

#### `@zos/sensor.BloodOxygen.onChange`

Register a callback function to listen for blood oxygen measurement change events

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.BloodOxygen.offChange`

Cancel a callback function to listen for blood oxygen measurement change events

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.BloodOxygen.getLastFewHour`

Obtain blood oxygen measurements for the last `hour` and sort the results in chronological order

```ts
getLastFewHour(hour: number): Array<Data>
```

**Data**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `spo2` | `number` | not stated | — | >= 3 | Blood oxygen measurement value |
| `time` | `number` | not stated | — | >= 3 | Time of measurement of blood oxygen values, UTC time stamp in seconds |

### `@zos/sensor.BodyTemperature`

Body surface temperature sensor.

**Requires in `app.json`**: `data:user.hd.body_temp` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `BodyTemperature` value** — 2 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorbodytemperaturegetcurrent) | `getCurrent(): Result` |
| [`getToday`](#zossensorbodytemperaturegettoday) | `getToday(): Array<number>` |

#### `@zos/sensor.BodyTemperature.getCurrent`

Get the latest measurement of body surface temperature

```ts
getCurrent(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | >= 3 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |
| `time` | `number` | not stated | — | >= 3 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |

#### `@zos/sensor.BodyTemperature.getToday`

Get the body surface temperature measurement values for 24 hours a day. The array length is 24 \* 60 / 5 = 288, with an average measurement value every five minutes. The unit is Celsius, such as `35.2`. Data without measurement values is `-1000`

```ts
getToday(): Array<number>
```

### `@zos/sensor.Buzzer`

Buzzer.

**Called on a `Buzzer` value** — 5 members

| Member | Signature |
| --- | --- |
| [`isEnabled`](#zossensorbuzzerisenabled) | `isEnabled(): boolean` |
| [`getSourceType`](#zossensorbuzzergetsourcetype) | `getSourceType(): Type` |
| [`getStrength`](#zossensorbuzzergetstrength) | `getStrength(): number` |
| [`start`](#zossensorbuzzerstart) | `start(type: number, repeatCount: 0): void` |
| [`stop`](#zossensorbuzzerstop) | `stop(): void` |

#### `@zos/sensor.Buzzer.isEnabled`

Get whether other options in the system buzzer scene settings are turned on, Settings - > Sound & Vibration - > Buzzer Scene - > Other

```ts
isEnabled(): boolean
```

#### `@zos/sensor.Buzzer.getSourceType`

Get buzzer mode

```ts
getSourceType(): Type
```

**Type**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `ALARM` | `number` | >= 3.6 | Alarm clock |
| `REMIND_1` | `number` | >= 3.6 | Reminder 1 |
| `REMIND_2` | `number` | >= 3.6 | Reminder 2 |
| `OPERATE` | `number` | >= 3.6 | Operation |
| `SUCCESS` | `number` | >= 3.6 | Success |
| `FAILURE` | `number` | >= 3.6 | Failure |

#### `@zos/sensor.Buzzer.getStrength`

Get buzzer strength, '0' - weak, '1' - medium, '2' - high

```ts
getStrength(): number
```

#### `@zos/sensor.Buzzer.start`

Start beeping, you can pass in `type` to specify the built-in beeping mode of the system,`repeatCount` is the number of repetitions, default `0`, do not repeat

```ts
start(type: number, repeatCount: 0): void
```

#### `@zos/sensor.Buzzer.stop`

Stop buzzer

```ts
stop(): void
```

### `@zos/sensor.Calorie`

Calorie Sensor.

**Requires in `app.json`**: `data:user.hd.calorie` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Calorie` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorcaloriegetcurrent) | `getCurrent(): number` |
| [`getTarget`](#zossensorcaloriegettarget) | `getTarget(): number` |
| [`onChange`](#zossensorcalorieonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorcalorieoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Calorie.getCurrent`

Get the current calorie consumption in kcal

```ts
getCurrent(): number
```

#### `@zos/sensor.Calorie.getTarget`

Get the target calorie consumption in kcal

```ts
getTarget(): number
```

#### `@zos/sensor.Calorie.onChange`

Register the calories change event callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Calorie.offChange`

Cancel the calories change event callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.checkSensor`

Check the availability of sensors on the current device.

```ts
function checkSensor(sensor: Sensor): Result
```

### `@zos/sensor.Compass`

compass.

**Requires in `app.json`**: `device:os.compass` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Compass` value** — 9 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`start`](#zossensorcompassstart) | not stated | `start(): void` |
| [`stop`](#zossensorcompassstop) | not stated | `stop(): void` |
| [`getStatus`](#zossensorcompassgetstatus) | not stated | `getStatus(): boolean` |
| [`getDirection`](#zossensorcompassgetdirection) | not stated | `getDirection(): string` |
| [`getDirectionAngle`](#zossensorcompassgetdirectionangle) | not stated | `getDirectionAngle(): number | 'INVALID'` |
| [`onChange`](#zossensorcompassonchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorcompassoffchange) | not stated | `offChange(callback: () => void): void` |
| [`setFreqMode`](#zossensorcompasssetfreqmode) | >= 4 | `setFreqMode(mode: number): void` |
| [`getFreqMode`](#zossensorcompassgetfreqmode) | >= 4 | `getFreqMode(): number` |

#### `@zos/sensor.Compass.start`

Start listening to compass data

```ts
start(): void
```

#### `@zos/sensor.Compass.stop`

Stop listening to compass data

```ts
stop(): void
```

#### `@zos/sensor.Compass.getStatus`

Get the compass calibration status, `true` means calibrated

```ts
getStatus(): boolean
```

#### `@zos/sensor.Compass.getDirection`

Get the direction of the current watch's 12-point scale, divided into eight directions, refer to `direction`

```ts
getDirection(): string
```

**direction**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `N` | `string` | >= 3 | North |
| `NE` | `string` | >= 3 | Northeast |
| `E` | `string` | >= 3 | East |
| `SE` | `string` | >= 3 | Southeast |
| `S` | `string` | >= 3 | South |
| `SW` | `string` | >= 3 | Southwest |
| `W` | `string` | >= 3 | West |
| `NW` | `string` | >= 3 | Northwest |

#### `@zos/sensor.Compass.getDirectionAngle`

Get the current direction angle, the clockwise rotation angle of the watch's 12 o'clock scale direction relative to due north, takes the values 0 - 360, if the compass is not calibrated, returns the `INVALID` string

```ts
getDirectionAngle(): number | 'INVALID'
```

#### `@zos/sensor.Compass.onChange`

Register the compass direction change event listener callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Compass.offChange`

Cancel the compass direction change event listener callback function

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.Compass.setFreqMode`

Set the mode of trigger frequency, `mode` value reference frequency mode constant

```ts
setFreqMode(mode: number): void
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

#### `@zos/sensor.Compass.getFreqMode`

Get the mode of trigger frequency, result value reference frequency mode constant

```ts
getFreqMode(): number
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

### `@zos/sensor.Distance`

Distance Sensor.

**Requires in `app.json`**: `data:user.hd.distance` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Distance` value** — 3 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensordistancegetcurrent) | `getCurrent(): number` |
| [`onChange`](#zossensordistanceonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensordistanceoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Distance.getCurrent`

Get the current distance

```ts
getCurrent(): number
```

#### `@zos/sensor.Distance.onChange`

Register the distance change event callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Distance.offChange`

Cancel the distance change event callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.FatBurning`

FatBurning Sensor.

**Requires in `app.json`**: `data:user.hd.fat_burning` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `FatBurning` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorfatburninggetcurrent) | `getCurrent(): number` |
| [`getTarget`](#zossensorfatburninggettarget) | `getTarget(): number` |
| [`onChange`](#zossensorfatburningonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorfatburningoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.FatBurning.getCurrent`

Get current fat burning minutes

```ts
getCurrent(): number
```

#### `@zos/sensor.FatBurning.getTarget`

Get current fat burning target minutes

```ts
getTarget(): number
```

#### `@zos/sensor.FatBurning.onChange`

Register a callback function to listen to the fat burning minutes change event

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.FatBurning.offChange`

Cancel a callback function to listen to the fat burning minutes change event

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.FREQ_MODE_HIGH`

High power consumption mode with high trigger frequency

### `@zos/sensor.FREQ_MODE_LOW`

Low power mode with low trigger frequency

### `@zos/sensor.FREQ_MODE_NORMAL`

Normal power consumption mode, medium trigger frequency

### `@zos/sensor.Geolocation`

Geolocation Sensor.

**Requires in `app.json`**: `device:os.geolocation` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Geolocation` value** — 13 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`start`](#zossensorgeolocationstart) | not stated | `start(): void` |
| [`stop`](#zossensorgeolocationstop) | not stated | `stop(): void` |
| [`getStatus`](#zossensorgeolocationgetstatus) | not stated | `getStatus(): string` |
| [`getLatitude`](#zossensorgeolocationgetlatitude) | not stated | `getLatitude(option: Option): Result` |
| [`getLongitude`](#zossensorgeolocationgetlongitude) | not stated | `getLongitude(option: Option): Result` |
| [`getSetting`](#zossensorgeolocationgetsetting) | >= 3 | `getSetting(): Result` |
| [`onChange`](#zossensorgeolocationonchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorgeolocationoffchange) | not stated | `offChange(callback: () => void): void` |
| [`onGnssChange`](#zossensorgeolocationongnsschange) | >= 3 | `onGnssChange(callback: (info: Info) => void): void` |
| [`offGnssChange`](#zossensorgeolocationoffgnsschange) | >= 3 | `offGnssChange(callback: (info: Geolocation.onGnssChange.Info) => void): void` |
| [`getEnabled`](#zossensorgeolocationgetenabled) | >= 4 | `getEnabled(): boolean` |
| [`onEnableChange`](#zossensorgeolocationonenablechange) | >= 4 | `onEnableChange(callback: () => void): void` |
| [`offEnableChange`](#zossensorgeolocationoffenablechange) | >= 4 | `offEnableChange(callback: () => void): void` |

#### `@zos/sensor.Geolocation.start`

Start listening to location data

```ts
start(): void
```

#### `@zos/sensor.Geolocation.stop`

Stop listening to location data

```ts
stop(): void
```

#### `@zos/sensor.Geolocation.getStatus`

Get the positioning status, return `A` for positioning in progress, return `V` for invalid positioning

```ts
getStatus(): string
```

#### `@zos/sensor.Geolocation.getLatitude`

Get Latitude

```ts
getLatitude(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `format` | `string` | not stated | `DD` | >= 2.1 | Coordinate format, optionally DD for decimal or DMS in degrees, minutes and seconds |

**DMS**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `direction` | `string` | not stated | — | >= 2.1 | Direction, N for north latitude, S for south latitude |
| `degrees` | `number` | not stated | — | >= 2.1 | degree |
| `minutes` | `number` | not stated | — | >= 2.1 | minute |
| `seconds` | `number` | not stated | — | >= 2.1 | second |

#### `@zos/sensor.Geolocation.getLongitude`

Get Longitude

```ts
getLongitude(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `format` | `string` | not stated | `DD` | >= 2.1 | Coordinate format, optionally DD for decimal or DMS in degrees, minutes and seconds |

**DMS**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `direction` | `string` | not stated | — | >= 2.1 | Direction, E for east longitude, W for west longitude |
| `degrees` | `number` | not stated | — | >= 2.1 | degree |
| `minutes` | `number` | not stated | — | >= 2.1 | minute |
| `seconds` | `number` | not stated | — | >= 2.1 | second |

#### `@zos/sensor.Geolocation.getSetting`

Get the positioning settings

```ts
getSetting(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 3 | Positioning settings, see mode below for value descriptions |

**mode**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 3 | Accuracy |
| `1` | `number` | >= 3 | Automation |
| `2` | `number` | >= 3 | Balance |
| `3` | `number` | >= 3 | Power Saving |
| `4` | `number` | >= 3 | Super Power Saving |
| `5` | `number` | >= 3 | Custom |

#### `@zos/sensor.Geolocation.onChange`

Register a callback function to listen for location information change events

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Geolocation.offChange`

Cancel the callback function for listening to the location information change event

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.Geolocation.onGnssChange`

Register a callback function to listen for GNSS information change events

```ts
onGnssChange(callback: (info: Info) => void): void
```

**Info**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `agps_inject_time` | `number` | not stated | — | >= 3 | AGPS update time UTC timestamp in milliseconds |
| `top4_cn_val` | `number` | not stated | — | >= 3 | Signal strength value of the positioning satellite |
| `is_dualband` | `number` | not stated | — | >= 3 | Whether dual-band |
| `nb_valid_satellite` | `number` | not stated | — | >= 3 | Number of available satellites |
| `nb_used_satellite` | `number` | not stated | — | >= 3 | Number of satellites used |
| `elapsed_time` | `number` | not stated | — | >= 3 | Time consumed from the start of satellite search to successful positioning, in seconds |
| `satellite_data` | `Array&#60;SatelliteSystem&#62;` | not stated | — | >= 3 | Satellite data arrays |

**SatelliteSystem**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `gnss_id` | `number` | not stated | — | >= 3 | Satellite ID, see gnss_id below for value descriptions |
| `sub_top4_cn_val` | `number` | not stated | — | >= 3 | The strongest signal value of this satellite system |
| `nb_valid_satellite` | `number` | not stated | — | >= 3 | Number of available satellites that can be searched |
| `gsv_data` | `Array&#60;Satellite&#62;` | not stated | — | >= 3.6 | Single satellite data array, maximum length 32 |

**Satellite**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | not stated | — | >= 3.6 | Satellite ID |
| `elevation` | `number` | not stated | — | >= 3.6 | Pitch angle |
| `azimuth` | `number` | not stated | — | >= 3.6 | Azimuth |
| `snr` | `number` | not stated | — | >= 3.6 | Signal-to-noise ratio |

**gnss_id**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 3 | GPS |
| `1` | `number` | >= 3 | BDS |
| `2` | `number` | >= 3 | GLONASS |
| `3` | `number` | >= 3 | GALILEO |
| `4` | `number` | >= 3 | QZSS |
| `5` | `number` | >= 3 | IRNSS |

#### `@zos/sensor.Geolocation.offGnssChange`

Cancel the callback function for listening to the GNSS information change event

```ts
offGnssChange(callback: (info: Geolocation.onGnssChange.Info) => void): void
```

#### `@zos/sensor.Geolocation.getEnabled`

Get whether the user allows the Mini Program to use location features

```ts
getEnabled(): boolean
```

#### `@zos/sensor.Geolocation.onEnableChange`

Register a callback function to listen for user location permission change events

```ts
onEnableChange(callback: () => void): void
```

#### `@zos/sensor.Geolocation.offEnableChange`

Cancel the callback function for listening to user location permission change events

```ts
offEnableChange(callback: () => void): void
```

### `@zos/sensor.Gyroscope`

Gyroscope. Measuring the angular velocity of the device rotating along three orthogonal axes (x, y, z), the x and y axes are parallel to the screen, the positive direction refers to the figure, the z axis is perpendicular to the device's screen, the positive direction points upward, and the direction of the rotational angular velocity is determined using the [Right-hand rule](https://en.wikipedia.org/wiki/Right-hand_rule). The direction of the rotation arrow in the figure is the positive direction.

**Requires in `app.json`**: `device:os.gyroscope` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Gyroscope` value** — 7 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`start`](#zossensorgyroscopestart) | not stated | `start(): void` |
| [`stop`](#zossensorgyroscopestop) | not stated | `stop(): void` |
| [`getCurrent`](#zossensorgyroscopegetcurrent) | not stated | `getCurrent(): Result` |
| [`onChange`](#zossensorgyroscopeonchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorgyroscopeoffchange) | not stated | `offChange(callback: () => void): void` |
| [`setFreqMode`](#zossensorgyroscopesetfreqmode) | >= 3 | `setFreqMode(mode: number): void` |
| [`getFreqMode`](#zossensorgyroscopegetfreqmode) | >= 3 | `getFreqMode(): number` |

#### `@zos/sensor.Gyroscope.start`

Start listening to gyroscope data

```ts
start(): void
```

#### `@zos/sensor.Gyroscope.stop`

Stop listening to gyroscope data

```ts
stop(): void
```

#### `@zos/sensor.Gyroscope.getCurrent`

Get current gyroscope data

```ts
getCurrent(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | >= 3 | Angular velocity of x-axis in DPS, degrees per second |
| `y` | `number` | not stated | — | >= 3 | Angular velocity of y-axis in DPS, degrees per second |
| `z` | `number` | not stated | — | >= 3 | Angular velocity of z-axis in DPS, degrees per second |

#### `@zos/sensor.Gyroscope.onChange`

Register the gyroscope data change event listener callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Gyroscope.offChange`

Cancel the gyroscope data change event listener callback function

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.Gyroscope.setFreqMode`

Set the mode of trigger frequency, `mode` value reference frequency mode constant

```ts
setFreqMode(mode: number): void
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

#### `@zos/sensor.Gyroscope.getFreqMode`

Get the mode of trigger frequency, result value reference frequency mode constant

```ts
getFreqMode(): number
```

**Frequency Mode**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `FREQ_MODE_LOW` | >= 3 | Low power mode with low trigger frequency |
| `FREQ_MODE_NORMAL` | >= 3 | Normal power consumption mode, medium trigger frequency |
| `FREQ_MODE_HIGH` | >= 3 | High power consumption mode with high trigger frequency |

### `@zos/sensor.HeartRate`

HeartRate Sensor.

**Requires in `app.json`**: `data:user.hd.heart_rate` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `HeartRate` value** — 12 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getCurrent`](#zossensorheartrategetcurrent) | not stated | `getCurrent(): number` |
| [`getLast`](#zossensorheartrategetlast) | not stated | `getLast(): number` |
| [`getToday`](#zossensorheartrategettoday) | not stated | `getToday(): Array<number>` |
| [`onCurrentChange`](#zossensorheartrateoncurrentchange) | >= 2.1 | `onCurrentChange(callback: () => void): void` |
| [`offCurrentChange`](#zossensorheartrateoffcurrentchange) | >= 2.1 | `offCurrentChange(callback: () => void): void` |
| [`onLastChange`](#zossensorheartrateonlastchange) | >= 2.1 | `onLastChange(callback: () => void): void` |
| [`offLastChange`](#zossensorheartrateofflastchange) | >= 2.1 | `offLastChange(callback: () => void): void` |
| [`getDailySummary`](#zossensorheartrategetdailysummary) | >= 3 | `getDailySummary(): Result` |
| [`getResting`](#zossensorheartrategetresting) | >= 3 | `getResting(): number` |
| [`getAFibRecord`](#zossensorheartrategetafibrecord) | >= 3 | `getAFibRecord(): Result` |
| [`onRestingChange`](#zossensorheartrateonrestingchange) | >= 3 | `onRestingChange(callback: () => void): void` |
| [`offRestingChange`](#zossensorheartrateoffrestingchange) | >= 3 | `offRestingChange(callback: () => void): void` |

#### `@zos/sensor.HeartRate.getCurrent`

Get the current heart rate measurement, this method needs to be used in the `onCurrentChange` callback function

```ts
getCurrent(): number
```

#### `@zos/sensor.HeartRate.getLast`

Get the most recent heart rate measurement (single measurement or heart rate monitoring measurement, continuous heart rate measurement `onCurrentChange` results are not counted)

```ts
getLast(): number
```

#### `@zos/sensor.HeartRate.getToday`

Get the heart rate measurement data in minutes from 0:00 to the current moment of the day, the longest array is 60\*24

```ts
getToday(): Array<number>
```

#### `@zos/sensor.HeartRate.onCurrentChange`

Call this method and start measuring heart rate continuously, call the callback function when there is a measurement result, call the `getCurrent` method in the callback function to get the heart rate measurement value, if you want to stop the heart rate measurement, you need to call the `offCurrentChange` method

```ts
onCurrentChange(callback: () => void): void
```

#### `@zos/sensor.HeartRate.offCurrentChange`

Cancel continuous heart rate measurement and cancel callback function listeners

```ts
offCurrentChange(callback: () => void): void
```

#### `@zos/sensor.HeartRate.onLastChange`

Register the heart rate single measurement change event callback function

```ts
onLastChange(callback: () => void): void
```

#### `@zos/sensor.HeartRate.offLastChange`

Cancel the heart rate single measurement change event callback function

```ts
offLastChange(callback: () => void): void
```

#### `@zos/sensor.HeartRate.getDailySummary`

Get daily heart rate statistics

```ts
getDailySummary(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `maximum` | `Maximum` | not stated | — | >= 3 | Maximum heart rate information |

**Maximum**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `hr_value` | `number` | not stated | — | >= 3 | Maximum heart rate value |
| `time` | `number` | not stated | — | >= 3 | Measurement time of maximum heart rate |

#### `@zos/sensor.HeartRate.getResting`

Get current resting heart rate

```ts
getResting(): number
```

#### `@zos/sensor.HeartRate.getAFibRecord`

Get Atrial Fibrillation Data Array

```ts
getAFibRecord(): Result
```

**AfibInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `flag` | `number` | not stated | — | >= 3 | Atrial fibrillation test results, 0 - normal, 1 - high alert, 2 - low alert, 3 - atrial fibrillation |
| `val` | `number` | not stated | — | >= 3 | Atrial fibrillation data value, integer value 0 - 255 |
| `maxValue` | `number` | not stated | — | >= 3 | Atrial fibrillation data maximum value, integer value 0 - 255 |
| `minValue` | `number` | not stated | — | >= 3 | Atrial fibrillation data minimum value, integer value 0 - 255 |
| `time` | `number` | not stated | — | >= 3 | Time of Atrial fibrillation data acquisition, UTC seconds |
| `duration` | `number` | not stated | — | >= 3 | Duration in seconds |

#### `@zos/sensor.HeartRate.onRestingChange`

After calling this method, the device starts real-time resting heart rate measurement and registers a callback function, which is called when there is a measurement result, in which the `getResting` method can be called to get the resting heart rate measurement value, and if you need to stop the resting heart rate measurement, you need to call the `offRestingChange` method

```ts
onRestingChange(callback: () => void): void
```

#### `@zos/sensor.HeartRate.offRestingChange`

Cancel continuous resting heart rate measurement and cancel callback function listeners

```ts
offRestingChange(callback: () => void): void
```

### `@zos/sensor.Pai`

PAI Sensor.

**Requires in `app.json`**: `data:user.hd.pai` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Pai` value** — 3 members

| Member | Signature |
| --- | --- |
| [`getTotal`](#zossensorpaigettotal) | `getTotal(): number` |
| [`getToday`](#zossensorpaigettoday) | `getToday(): number` |
| [`getLastWeek`](#zossensorpaigetlastweek) | `getLastWeek(): Array<number>` |

#### `@zos/sensor.Pai.getTotal`

Get the current cumulative PAI value

```ts
getTotal(): number
```

#### `@zos/sensor.Pai.getToday`

Get the PAI values obtained today

```ts
getToday(): number
```

#### `@zos/sensor.Pai.getLastWeek`

Get the PAI data for the past 7 days, the return value is an array of length `7`, the position of index `0` is the PAI value of today, the position of index `1` is the PAI value of the previous day, and so on

```ts
getLastWeek(): Array<number>
```

### `@zos/sensor.Screen`

Screen Status Sensor.

**Called on a `Screen` value** — 5 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getStatus`](#zossensorscreengetstatus) | not stated | `getStatus(): number` |
| [`getAodMode`](#zossensorscreengetaodmode) | not stated | `getAodMode(): boolean` |
| [`getLight`](#zossensorscreengetlight) | >= 3.6 | `getLight(): number` |
| [`onChange`](#zossensorscreenonchange) | not stated | `onChange(callback: (status: number) => void): void` |
| [`offChange`](#zossensorscreenoffchange) | not stated | `offChange(callback: (status: number) => void): void` |

#### `@zos/sensor.Screen.getStatus`

Get the screen status, `1`: On, `2`: Off

```ts
getStatus(): number
```

#### `@zos/sensor.Screen.getAodMode`

Whether to turn on the AOD rest screen display function

```ts
getAodMode(): boolean
```

#### `@zos/sensor.Screen.getLight`

Light intensity, unit lux

```ts
getLight(): number
```

#### `@zos/sensor.Screen.onChange`

Register a callback function to listen to screen display change events

```ts
onChange(callback: (status: number) => void): void
```

#### `@zos/sensor.Screen.offChange`

Cancel a callback function to listen to screen display change events

```ts
offChange(callback: (status: number) => void): void
```

### `@zos/sensor.Sleep`

Sleep Sensor.

**Requires in `app.json`**: `data:user.hd.sleep` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Sleep` value** — 6 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`updateInfo`](#zossensorsleepupdateinfo) | not stated | `updateInfo(): void` |
| [`getInfo`](#zossensorsleepgetinfo) | not stated | `getInfo(): SleepInfo` |
| [`getStageConstantObj`](#zossensorsleepgetstageconstantobj) | not stated | `getStageConstantObj(): StageConstants` |
| [`getStage`](#zossensorsleepgetstage) | not stated | `getStage(): Array<StageInfo>` |
| [`getSleepingStatus`](#zossensorsleepgetsleepingstatus) | >= 3 | `getSleepingStatus(): number` |
| [`getNap`](#zossensorsleepgetnap) | >= 3 | `getNap(): Array<NapInfo>` |

#### `@zos/sensor.Sleep.updateInfo`

By default, the system updates the sleep data every `30` minutes, the `updateInfo` method is used to actively trigger the update of the sleep data

```ts
updateInfo(): void
```

#### `@zos/sensor.Sleep.getInfo`

Get sleep information

```ts
getInfo(): SleepInfo
```

**SleepInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `score` | `number` | not stated | — | >= 2 | Sleep score |
| `deepTime` | `number` | not stated | — | >= 2 | Deep sleep time (minutes) |
| `startTime` | `number` | not stated | — | >= 2 | Sleep onset time, based on the number of minutes at 0:00 of the day |
| `endTime` | `number` | not stated | — | >= 2 | Sleep end time, based on the number of minutes at 0:00 of the day |
| `totalTime` | `number` | not stated | — | >= 2 | Get total sleep time (minutes) |

#### `@zos/sensor.Sleep.getStageConstantObj`

Get the constant value of the sleep stage, used to determine the sleep stage in the `getStage` return value

```ts
getStageConstantObj(): StageConstants
```

**StageConstants**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `WAKE_STAGE` | `number` | not stated | — | >= 2 | Awake stage |
| `REM_STAGE` | `number` | not stated | — | >= 2 | Deep sleep time (minutes) |
| `LIGHT_STAGE` | `number` | not stated | — | >= 2 | Light Sleep stage |
| `DEEP_STAGE` | `number` | not stated | — | >= 2 | Deep Sleep stage |

#### `@zos/sensor.Sleep.getStage`

Get Sleep Staging Data

```ts
getStage(): Array<StageInfo>
```

**StageInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `model` | `number` | not stated | — | >= 2 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |
| `start` | `number` | not stated | — | >= 2 | Sleep stage onset time, based on the number of minutes at 0:00 of the day |
| `stop` | `number` | not stated | — | >= 2 | Sleep stage end time, based on the number of minutes at 0:00 of the day |

#### `@zos/sensor.Sleep.getSleepingStatus`

Get the current sleep state, 0 'awake, 1' sleeping

```ts
getSleepingStatus(): number
```

#### `@zos/sensor.Sleep.getNap`

Get nap data

```ts
getNap(): Array<NapInfo>
```

**NapInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `length` | `number` | not stated | — | >= 3 | Nap duration (minutes) |
| `start` | `number` | not stated | — | >= 3 | Nap start time, based on the number of minutes at 0:00 of the day |
| `stop` | `number` | not stated | — | >= 3 | Nap end time, based on the number of minutes at 0:00 of the day |

### `@zos/sensor.Stand`

Standing behavior Sensor.

**Requires in `app.json`**: `data:user.hd.stand` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Stand` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorstandgetcurrent) | `getCurrent(): number` |
| [`getTarget`](#zossensorstandgettarget) | `getTarget(): number` |
| [`onChange`](#zossensorstandonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorstandoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Stand.getCurrent`

Get the current number of hours with standing behavior

```ts
getCurrent(): number
```

#### `@zos/sensor.Stand.getTarget`

Get the number of hours with standing behavior targets

```ts
getTarget(): number
```

#### `@zos/sensor.Stand.onChange`

Register a callback function to listen for changes in the number of hours of standing behavior

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Stand.offChange`

Cancel a callback function to listen for changes in the number of hours of standing behavior

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.Step`

Step Sensor.

**Requires in `app.json`**: `data:user.hd.step` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Step` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getCurrent`](#zossensorstepgetcurrent) | `getCurrent(): number` |
| [`getTarget`](#zossensorstepgettarget) | `getTarget(): number` |
| [`onChange`](#zossensorsteponchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorstepoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Step.getCurrent`

Get the current step count

```ts
getCurrent(): number
```

#### `@zos/sensor.Step.getTarget`

Get step goal

```ts
getTarget(): number
```

#### `@zos/sensor.Step.onChange`

Register the step change event callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Step.offChange`

Cancel the step change event callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.Stress`

Stress Sensor.

**Requires in `app.json`**: `data:user.hd.stress` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Stress` value** — 7 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getCurrent`](#zossensorstressgetcurrent) | not stated | `getCurrent(): Result` |
| [`onChange`](#zossensorstressonchange) | not stated | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorstressoffchange) | not stated | `offChange(callback: () => void): void` |
| [`getToday`](#zossensorstressgettoday) | >= 3 | `getToday(): Array<number>` |
| [`getTodayByHour`](#zossensorstressgettodaybyhour) | >= 3 | `getTodayByHour(): Array<number>` |
| [`getLastWeek`](#zossensorstressgetlastweek) | >= 3 | `getLastWeek(): Array<number>` |
| [`getLastWeekByHour`](#zossensorstressgetlastweekbyhour) | >= 3 | `getLastWeekByHour(): Array<StressInfo>` |

#### `@zos/sensor.Stress.getCurrent`

Get the current pressure measurement

```ts
getCurrent(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | not stated | — | >= 2 | Stress measurement values |
| `time` | `number` | not stated | — | >= 2 | Time to obtain the measured value |

#### `@zos/sensor.Stress.onChange`

Register a callback function to listen for stress measurement change events

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Stress.offChange`

Cancel a callback function to listen for stress measurement change events

```ts
offChange(callback: () => void): void
```

#### `@zos/sensor.Stress.getToday`

Get the pressure measurements for the whole day, recorded every minute, the return value is an array of variable length, the maximum length of the array is 24 \* 60

```ts
getToday(): Array<number>
```

**StressInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `second` | `number` | not stated | — | >= 3 | Pressure value measurement time, UTC time stamp, in seconds |
| `stress` | `number` | not stated | — | >= 3 | Pressure value, 0 means invalid |

#### `@zos/sensor.Stress.getTodayByHour`

Get the average pressure value for the whole day, the return value is a fixed-length array, the average pressure for each hour, the length of the array is 24

```ts
getTodayByHour(): Array<number>
```

#### `@zos/sensor.Stress.getLastWeek`

Get the average pressure value for each day of the past 7 days, the return value is a fixed-length array, the average pressure per day, the length of the array is 7, the position of index 0 represents six days ago, the position of index 6 represents today

```ts
getLastWeek(): Array<number>
```

#### `@zos/sensor.Stress.getLastWeekByHour`

Get the hourly pressure average for the past 7 days, the return value is a fixed-length array, the length of the array is 7 \* 24

```ts
getLastWeekByHour(): Array<StressInfo>
```

**StressInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `second` | `number` | not stated | — | >= 3 | Pressure value measurement time, UTC time stamp, in seconds |
| `stress` | `number` | not stated | — | >= 3 | Pressure value, 0 means invalid |

### `@zos/sensor.SystemSounds`

System Sounds.

**Called on a `SystemSounds` value** — 4 members

| Member | Signature |
| --- | --- |
| [`getEnabled`](#zossensorsystemsoundsgetenabled) | `getEnabled(): boolean` |
| [`getSourceType`](#zossensorsystemsoundsgetsourcetype) | `getSourceType(): Type` |
| [`start`](#zossensorsystemsoundsstart) | `start(sourceType: number, repeatCount: 0): void` |
| [`stop`](#zossensorsystemsoundsstop) | `stop(): void` |

#### `@zos/sensor.SystemSounds.getEnabled`

Get whether the system ringtone function is turned on, and it can only be played after it is turned on

```ts
getEnabled(): boolean
```

#### `@zos/sensor.SystemSounds.getSourceType`

Get built-in system ringtone type

```ts
getSourceType(): Type
```

**Type**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `ALARM` | `number` | not stated | — | >= 3.6 | Alarm clock reminder |
| `MESSAGE` | `number` | not stated | — | >= 3.6 | Notification sound when receiving text messages or emails |
| `REGULAR` | `number` | not stated | — | >= 3.6 | TingTing sound |
| `ACHIEVE` | `number` | not stated | — | >= 3.6 | Goals achieved |
| `CAMERA` | `number` | not stated | — | >= 3.6 | Camera shutter |
| `ABN_HIGH` | `number` | not stated | — | >= 3.6 | Health data measurement abnormalities (high values) |
| `ABN_LOW` | `number` | not stated | — | >= 3.6 | Health data measurement abnormalities (low values) |
| `SOS` | `number` | not stated | — | >= 3.6 | SOS for help |

#### `@zos/sensor.SystemSounds.start`

Start playing the sound, you can pass in `type` to specify the ringtone type, `repeatCount` is the number of audio repetitions, default is `0`, do not repeat playback

```ts
start(sourceType: number, repeatCount: 0): void
```

#### `@zos/sensor.SystemSounds.stop`

Stop sound playback

```ts
stop(): void
```

### `@zos/sensor.Time`

Time/Date Sensor.

**Called on a `Time` value** — 24 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getTime`](#zossensortimegettime) | not stated | `getTime(): number` |
| [`getFullYear`](#zossensortimegetfullyear) | not stated | `getFullYear(): number` |
| [`getMonth`](#zossensortimegetmonth) | not stated | `getMonth(): number` |
| [`getDate`](#zossensortimegetdate) | not stated | `getDate(): number` |
| [`getHours`](#zossensortimegethours) | not stated | `getHours(): number` |
| [`getMinutes`](#zossensortimegetminutes) | not stated | `getMinutes(): number` |
| [`getSeconds`](#zossensortimegetseconds) | not stated | `getSeconds(): number` |
| [`getDay`](#zossensortimegetday) | not stated | `getDay(): number` |
| [`getHourFormat`](#zossensortimegethourformat) | >= 2.1 | `getHourFormat(): number` |
| [`getFormatHour`](#zossensortimegetformathour) | >= 2.1 | `getFormatHour(): number` |
| [`onPerMinute`](#zossensortimeonperminute) | >= 2.1 | `onPerMinute(callback: () => void): void` |
| [`onPerDay`](#zossensortimeonperday) | >= 2.1 | `onPerDay(callback: () => void): void` |
| [`onPerHourEnd`](#zossensortimeonperhourend) | >= 3.6 | `onPerHourEnd(callback: () => void): void` |
| [`getFestival`](#zossensortimegetfestival) | not stated | `getFestival(): string` |
| [`getLunarYear`](#zossensortimegetlunaryear) | not stated | `getLunarYear(): number` |
| [`getLunarMonth`](#zossensortimegetlunarmonth) | not stated | `getLunarMonth(): number` |
| [`getLunarDay`](#zossensortimegetlunarday) | not stated | `getLunarDay(): number` |
| [`getLunarFestival`](#zossensortimegetlunarfestival) | not stated | `getLunarFestival(): string` |
| [`getSolarTerm`](#zossensortimegetsolarterm) | not stated | `getSolarTerm(): string` |
| [`getShowFestival`](#zossensortimegetshowfestival) | not stated | `getShowFestival(): string` |
| [`getLunarMonthCalendar`](#zossensortimegetlunarmonthcalendar) | not stated | `getLunarMonthCalendar(): LunarMonthCalendar` |
| [`onSunrise`](#zossensortimeonsunrise) | >= 3 | `onSunrise(callback: () => void): void` |
| [`onSunset`](#zossensortimeonsunset) | >= 3 | `onSunset(callback: () => void): void` |
| [`onPhoneTimeSetting`](#zossensortimeonphonetimesetting) | >= 3 | `onPhoneTimeSetting(callback: () => void): void` |

#### `@zos/sensor.Time.getTime`

Gets the UTC timestamp in milliseconds

```ts
getTime(): number
```

#### `@zos/sensor.Time.getFullYear`

Get the year of the current date

```ts
getFullYear(): number
```

#### `@zos/sensor.Time.getMonth`

Get the month of the current date, range 1 - 12, return `1` for January

```ts
getMonth(): number
```

#### `@zos/sensor.Time.getDate`

Get the number of days of the current date, i.e. the day of the month, in the range 1 - 31

```ts
getDate(): number
```

#### `@zos/sensor.Time.getHours`

Get the number of hours of the current time

```ts
getHours(): number
```

#### `@zos/sensor.Time.getMinutes`

Get the number of minutes of the current time

```ts
getMinutes(): number
```

#### `@zos/sensor.Time.getSeconds`

Get the number of seconds of the current time

```ts
getSeconds(): number
```

#### `@zos/sensor.Time.getDay`

Get the current time corresponding to the day of the week, range 1 - 7, return `1` for Monday

```ts
getDay(): number
```

#### `@zos/sensor.Time.getHourFormat`

Get the current system time format, 12-hour format or 24-hour format，value reference hour format constants

```ts
getHourFormat(): number
```

**Hour format constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `TIME_HOUR_FORMAT_12` | >= 2.1 | 12-hour format |
| `TIME_HOUR_FORMAT_24` | >= 2.1 | 24-hour format |

#### `@zos/sensor.Time.getFormatHour`

Get the number of hours in the current time format (12-hour format or 24-hour format)

```ts
getFormatHour(): number
```

#### `@zos/sensor.Time.onPerMinute`

Register end-of-minute event listener callback function

```ts
onPerMinute(callback: () => void): void
```

#### `@zos/sensor.Time.onPerDay`

Register the end-of-day event listener callback function

```ts
onPerDay(callback: () => void): void
```

#### `@zos/sensor.Time.onPerHourEnd`

Register the end-of-hour event listener callback function

```ts
onPerHourEnd(callback: () => void): void
```

#### `@zos/sensor.Time.getFestival`

Get gregorian holidays, or return the string `'INVALID'` if there is no holiday

```ts
getFestival(): string
```

#### `@zos/sensor.Time.getLunarYear`

Get Chinese lunar year, only works when system language is set to Chinese

```ts
getLunarYear(): number
```

#### `@zos/sensor.Time.getLunarMonth`

Get Chinese lunar month, only works when system language is set to Chinese

```ts
getLunarMonth(): number
```

#### `@zos/sensor.Time.getLunarDay`

Get Chinese lunar day, only works when system language is set to Chinese

```ts
getLunarDay(): number
```

#### `@zos/sensor.Time.getLunarFestival`

Get Chinese lunar holidays, only works when system language is set to Chinese, or return the string `'INVALID'` if there is no holiday

```ts
getLunarFestival(): string
```

#### `@zos/sensor.Time.getSolarTerm`

Get Traditional Chinese Solar Terms, only works when system language is set to Chinese, or return the string `'INVALID'` if there is no Solar Term

```ts
getSolarTerm(): string
```

#### `@zos/sensor.Time.getShowFestival`

Get the holiday strings displayed on that day, the priority is Gregorian holidays, Chinese lunar holidays, Chinese lunar festivals in that order, only when the system language is set to Chinese

```ts
getShowFestival(): string
```

#### `@zos/sensor.Time.getLunarMonthCalendar`

Get the monthly calendar information of the current month of Chinese lunar calendar, only works when the system language is set to Chinese

```ts
getLunarMonthCalendar(): LunarMonthCalendar
```

**LunarMonthCalendar**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `day_count` | `number` | not stated | — | >= 2 | Number of days in the current month |
| `lunar_days_array` | `Array&#60;string&#62;` | not stated | — | >= 2 | Array of display content for each day of the current month, display content priority for holidays, Solar Term, date |

#### `@zos/sensor.Time.onSunrise`

Register the Sunrise event listener callback function to take effect only when the device weather information

```ts
onSunrise(callback: () => void): void
```

#### `@zos/sensor.Time.onSunset`

Register the Sunset event listener callback function to take effect only when the device weather information

```ts
onSunset(callback: () => void): void
```

#### `@zos/sensor.Time.onPhoneTimeSetting`

Register the phone modify time event listening callback function

```ts
onPhoneTimeSetting(callback: () => void): void
```

### `@zos/sensor.TIME_HOUR_FORMAT_12`

12-hour format

### `@zos/sensor.TIME_HOUR_FORMAT_24`

24-hour format

### `@zos/sensor.Vibrator`

Vibrator.

**Called on a `Vibrator` value** — 5 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`start`](#zossensorvibratorstart) | not stated | `start(option?: Option | Array<Action>): void` |
| [`stop`](#zossensorvibratorstop) | not stated | `stop(): void` |
| [`setMode`](#zossensorvibratorsetmode) | not stated | `setMode(option: Option): void` |
| [`getConfig`](#zossensorvibratorgetconfig) | not stated | `getConfig(): Option` |
| [`getType`](#zossensorvibratorgettype) | >= 3.6 | `getType(): Type` |

#### `@zos/sensor.Vibrator.start`

Start vibration, the'option 'parameter passed in only takes effect for this vibration, and supports passing in vibration scene arrays after API_LEVEL 3.6

```ts
start(option?: Option | Array<Action>): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | `VIBRATOR_SCENE_SHORT_MIDDLE` | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

**Action**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 3.6 | Vibration Scene Type |
| `duration` | `number` | not stated | — | >= 3.6 | Duration of vibration |

**Vibration motor mode constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `VIBRATOR_SCENE_SHORT_LIGHT` | >= 2 | Light vibration intensity and short time (20ms) |
| `VIBRATOR_SCENE_SHORT_MIDDLE` | >= 2 | Medium vibration intensity, short time (20ms) |
| `VIBRATOR_SCENE_SHORT_STRONG` | >= 2 | High vibration intensity and short time (20ms) |
| `VIBRATOR_SCENE_DURATION` | >= 2 | High vibration intensity, lasting 600ms |
| `VIBRATOR_SCENE_DURATION_LONG` | >= 2 | High vibration intensity, lasting 1000ms |
| `VIBRATOR_SCENE_STRONG_REMINDER` | >= 2 | High vibration intensity, four vibrations in 1200ms, can be used for stronger reminders |
| `VIBRATOR_SCENE_NOTIFICATION` | >= 2 | Two short, continuous vibrations, consistent with the watch message notification vibration feedback |
| `VIBRATOR_SCENE_CALL` | >= 2 | High vibration intensity, single vibration twice in 500ms, continuous vibration, need to manually stop, consistent with the watch call vibration feedback |
| `VIBRATOR_SCENE_TIMER` | >= 2 | High vibration intensity, single long vibration 500ms, continuous vibration, need to manually stop, consistent with the watch alarm clock, countdown vibration feedback |

#### `@zos/sensor.Vibrator.stop`

Stop vibration

```ts
stop(): void
```

#### `@zos/sensor.Vibrator.setMode`

Set the vibration mode, call `start()` after successful setting, it will vibrate according to the set mode

```ts
setMode(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

#### `@zos/sensor.Vibrator.getConfig`

Get Vibration Motor Configuration

```ts
getConfig(): Option
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

#### `@zos/sensor.Vibrator.getType`

Get Vibration Scene Type

```ts
getType(): Type
```

**Type**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `GENTLE_SHORT` | `number` | not stated | — | >= 3.6 | Vibration scene, light short vibration |
| `STRONG_SHORT` | `number` | not stated | — | >= 3.6 | Vibration scene, strong and short vibration |
| `STANDARD_CROWN` | `number` | not stated | — | >= 3.6 | Vibration scene, standard crown vibration |
| `STRONG_CROWN` | `number` | not stated | — | >= 3.6 | Vibration scene, strong crown vibration |
| `SPULSE_CROWN` | `number` | not stated | — | >= 3.6 | Vibration scene, single-pulse crown vibration |
| `DIPULSE_CROWN` | `number` | not stated | — | >= 3.6 | Vibration scene, dual-pulse crown vibration |
| `KEYCODE_CLICK` | `number` | not stated | — | >= 3.6 | Vibration scene, password button vibration |
| `URGENT` | `number` | not stated | — | >= 3.6 | Vibration scene, urgent vibration |
| `CONTINUOUS` | `number` | not stated | — | >= 3.6 | Vibration scene, continuous vibration |
| `PAUSE` | `number` | not stated | — | >= 3.6 | Vibration scene, stop vibration |

### `@zos/sensor.Wear`

Wearing status sensor.

**Called on a `Wear` value** — 3 members

| Member | Signature |
| --- | --- |
| [`getStatus`](#zossensorweargetstatus) | `getStatus(): number` |
| [`onChange`](#zossensorwearonchange) | `onChange(callback: () => void): void` |
| [`offChange`](#zossensorwearoffchange) | `offChange(callback: () => void): void` |

#### `@zos/sensor.Wear.getStatus`

Get the current device wearing status, `0`: not wearing, `1`: wearing, `2`: in motion, `3`: not sure

```ts
getStatus(): number
```

#### `@zos/sensor.Wear.onChange`

Register the device wear status change event listening callback function

```ts
onChange(callback: () => void): void
```

#### `@zos/sensor.Wear.offChange`

Cancel the device wear status change event listening callback function

```ts
offChange(callback: () => void): void
```

### `@zos/sensor.Weather`

This interface has been deprecated, please refer to https://github.com/orgs/zepp-health/discussions/83 Weather Forecasts sensor.

**Called on a `Weather` value** — 1 members

| Member | Signature |
| --- | --- |
| [`getForecastWeather`](#zossensorweathergetforecastweather) | `getForecastWeather(): ForecastWeather` |

#### `@zos/sensor.Weather.getForecastWeather`

Get weather forecast data

```ts
getForecastWeather(): ForecastWeather
```

**ForecastWeather**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `cityName` | `string` | not stated | — | >= 2 | City Name |
| `forecastData` | `ForecastData` | not stated | — | >= 2 | Weather Information |
| `tideData` | `TideData` | not stated | — | >= 2 | Tide Information |

**ForecastData**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `data` | `Array&#60;ForecastDataItem&#62;` | not stated | — | >= 2 | Weather Information Array, index 0 position represents the day |
| `count` | `number` | not stated | — | >= 2 | The length of Weather Information Array |

**ForecastDataItem**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `high` | `number` | not stated | — | >= 2 | Maximum temperature |
| `low` | `number` | not stated | — | >= 2 | Lowest temperature |
| `index` | `number` | not stated | — | >= 2 | The index value of the weather, see index below for a description of the value |

**TideData**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `data` | `Array&#60;TideDataItem&#62;` | not stated | — | >= 2 | Tide Information Array, index 0 position represents the day |
| `count` | `number` | not stated | — | >= 2 | The length of Tide Information Array |

**TideDataItem**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `sunrise` | `Sunrise` | not stated | — | >= 2 | Sunrise time |
| `sunset` | `Sunset` | not stated | — | >= 2 | Sunset time |

**Sunrise**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `hour` | `number` | not stated | — | >= 2 | Sunrise time - hour |
| `minute` | `number` | not stated | — | >= 2 | Sunrise time - minute |

**Sunset**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `hour` | `number` | not stated | — | >= 2 | Sunrise time - hour |
| `minute` | `number` | not stated | — | >= 2 | Sunrise time - minute |

**index**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 2 | Cloudy |
| `1` | `number` | >= 2 | Showers |
| `2` | `number` | >= 2 | Snow Showers |
| `3` | `number` | >= 2 | Sunny |
| `4` | `number` | >= 2 | Overcast |
| `5` | `number` | >= 2 | Light Rain |
| `6` | `number` | >= 2 | Light Snow |
| `7` | `number` | >= 2 | Moderate Rain |
| `8` | `number` | >= 2 | Moderate Snow |
| `9` | `number` | >= 2 | Heavy Snow |
| `10` | `number` | >= 2 | Heavy Rain |
| `11` | `number` | >= 2 | Sandstorm |
| `12` | `number` | >= 2 | Rain and Snow |
| `13` | `number` | >= 2 | Fog |
| `14` | `number` | >= 2 | Hazy |
| `15` | `number` | >= 2 | T-Storms |
| `16` | `number` | >= 2 | Snowstorm |
| `17` | `number` | >= 2 | Floating dust |
| `18` | `number` | >= 2 | Very Heavy Rainstorm |
| `19` | `number` | >= 2 | Rain and Hail |
| `20` | `number` | >= 2 | T-Storms and Hail |
| `21` | `number` | >= 2 | Heavy Rainstorm |
| `22` | `number` | >= 2 | Dust |
| `23` | `number` | >= 2 | Heavy sand storm |
| `24` | `number` | >= 2 | Rainstorm |
| `25` | `number` | >= 2 | Unknown |
| `26` | `number` | >= 2 | Cloudy Nighttime |
| `27` | `number` | >= 2 | Showers Nighttime |
| `28` | `number` | >= 2 | Sunny Nighttime |

### `@zos/sensor.Workout`

Workout Sensor.

**Requires in `app.json`**: `data:user.hd.workout` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `Workout` value** — 4 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`getStatus`](#zossensorworkoutgetstatus) | not stated | `getStatus(): Status` |
| [`getHistory`](#zossensorworkoutgethistory) | not stated | `getHistory(): Array<History>` |
| [`getUserHrZoneSettings`](#zossensorworkoutgetuserhrzonesettings) | >= 4.2 | `getUserHrZoneSettings(): HrZoneSettings` |
| [`getWorkoutTrackNavInfo`](#zossensorworkoutgetworkouttracknavinfo) | >= 4.2 | `getWorkoutTrackNavInfo(): WorkoutTrackNavInfo | undefined` |

#### `@zos/sensor.Workout.getStatus`

Get altitude value in meters

```ts
getStatus(): Status
```

**Status**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `vo2Max` | `number` | not stated | — | >= 3 | VO2 Max |
| `trainingLoad` | `number` | not stated | — | >= 3 | Training Load |
| `fullRecoveryTime` | `number` | not stated | — | >= 3 | Full Recovery Time |

#### `@zos/sensor.Workout.getHistory`

Get the duration of the workout record

```ts
getHistory(): Array<History>
```

**History**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `startTime` | `number` | not stated | — | >= 3 | Workout start time |
| `duration` | `number` | not stated | — | >= 3 | Duration of workout in seconds |

#### `@zos/sensor.Workout.getUserHrZoneSettings`

Get user heart rate zone settings

```ts
getUserHrZoneSettings(): HrZoneSettings
```

**HrZoneSettings**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 4.2 | Heart rate zone type, 0: by heart rate reserve, 1: by maximum heart rate |
| `rest` | `number` | not stated | — | >= 4.2 | Resting heart rate value |
| `range` | `number[]` | not stated | — | >= 4.2 | Heart rate zone value array with 6 values, corresponding to: Ligit, Intensive, Aerobic, Anaerobic, VO2 max and maximum heart rate |

#### `@zos/sensor.Workout.getWorkoutTrackNavInfo`

Get workout track navigation information, returns navigation info object when navigation is enabled, returns `undefined` when navigation is not enabled

```ts
getWorkoutTrackNavInfo(): WorkoutTrackNavInfo | undefined
```

**WorkoutTrackNavInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `update` | `number` | not stated | — | >= 4.2 | Data update status, true: need update, false: no need to update |
| `isYaw` | `number` | not stated | — | >= 4.2 | Whether off course, true: off course, false: on course |
| `yawAngle` | `number` | not stated | — | >= 4.2 | Yaw angle |
| `yawDistance` | `number` | not stated | — | >= 4.2 | Yaw distance in meters |
| `remainDistance` | `number` | not stated | — | >= 4.2 | Remaining distance in meters |
| `turnDistance` | `number` | not stated | — | >= 4.2 | Distance to next turn in meters |
| `turnType` | `number` | not stated | — | >= 4.2 | The direction of the next turn, refer to TURN_TYPE for value meanings |

**TURN_TYPE**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `1` | `number` | >= 4.2 | Turn right forward |
| `2` | `number` | >= 4.2 | Turn right |
| `3` | `number` | >= 4.2 | Turn right backward |
| `4` | `number` | >= 4.2 | U-turn to the right |
| `5` | `number` | >= 4.2 | U-turn |
| `6` | `number` | >= 4.2 | U-turn to the left |
| `7` | `number` | >= 4.2 | Turn left backward |
| `8` | `number` | >= 4.2 | Turn left |
| `9` | `number` | >= 4.2 | Turn left forward |

### `@zos/sensor.WorldClock`

World Clock Sensor.

**Called on a `WorldClock` value** — 2 members

| Member | Signature |
| --- | --- |
| [`getCount`](#zossensorworldclockgetcount) | `getCount(): number` |
| [`getInfo`](#zossensorworldclockgetinfo) | `getInfo(index: number): WorldClockInfo` |

#### `@zos/sensor.WorldClock.getCount`

Get the number of configured world clocks

```ts
getCount(): number
```

#### `@zos/sensor.WorldClock.getInfo`

Get the configured world clock information according to the index

```ts
getInfo(index: number): WorldClockInfo
```

**WorldClockInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `city` | `string` | not stated | — | >= 3 | City Name |
| `cityCode` | `string` | not stated | — | >= 3 | City code, e.g. San Francisco SFO |
| `hour` | `number` | not stated | — | >= 3 | Hour |
| `minute` | `number` | not stated | — | >= 3 | Minute |
| `timeZoneHour` | `number` | not stated | — | >= 3 | Time Zone hours |
| `timeZoneMinute` | `number` | not stated | — | >= 3 | Time zone minutes |

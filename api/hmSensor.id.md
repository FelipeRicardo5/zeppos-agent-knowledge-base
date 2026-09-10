# hmSensor.id

**18 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `BATTERY` | constant | not stated | OFFICIAL |
| `BODY_TEMP` | constant | not stated | OFFICIAL |
| `CALORIE` | constant | not stated | OFFICIAL |
| `DISTANCE` | constant | not stated | OFFICIAL |
| `FAT_BURRING` | constant | not stated | OFFICIAL |
| `HEART` | constant | not stated | OFFICIAL |
| `MUSIC` | constant | not stated | OFFICIAL |
| `PAI` | constant | not stated | OFFICIAL |
| `SLEEP` | constant | not stated | OFFICIAL |
| `SPO2` | constant | not stated | OFFICIAL |
| `STAND` | constant | not stated | OFFICIAL |
| `STEP` | constant | not stated | OFFICIAL |
| `STRESS` | constant | not stated | OFFICIAL |
| `TIME` | constant | not stated | OFFICIAL |
| `VIBRATE` | constant | not stated | OFFICIAL |
| `WEAR` | constant | not stated | OFFICIAL |
| `WEATHER` | constant | not stated | OFFICIAL |
| `WORLD_CLOCK` | constant | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmSensor.id.BATTERY`

**battery**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current power |

### `hmSensor.id.BODY_TEMP`

**thermometer**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current temperature |
| `timeinterval` | `number` | not stated | — | time elapsed since the value was set |

### `hmSensor.id.CALORIE`

**calorie**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | Current calorie consumption in kcal |
| `target` | `number` | not stated | — | Target calorie consumption in kcal |

### `hmSensor.id.DISTANCE`

**distance**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current mileage |

### `hmSensor.id.FAT_BURRING`

**fatburn**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | Current fat burning minutes |
| `target` | `number` | not stated | — | Fat burning target in minutes |

### `hmSensor.id.HEART`

**heart**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `last` | `number` | not stated | — | last successful heart rate measurement |
| `current` | `number` | not stated | — | current heart rate |
| `today` | `Array<number>` | not stated | — | The current day's heart rate in minutes from 0:00 to the current moment, returning an array of js up to 60\*24 |

### `hmSensor.id.MUSIC`

```ts
() => void
```

**music**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `artist` | `string` | not stated | — | artist name |
| `title` | `string` | not stated | — | music name |
| `isPlaying` | `boolean` | not stated | — | Play status true: playing, false: not playing |

### `hmSensor.id.PAI`

**pai**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `dailypai` | `number` | not stated | — | PAI values for today |
| `totalpai` | `number` | not stated | — | Current cumulative PAI values |
| `prepai0` | `number` | not stated | — | PAI values were obtained the six days before today |
| `prepai1` | `number` | not stated | — | PAI values were obtained the five days before today |
| `prepai2` | `number` | not stated | — | PAI values were obtained the four days before today |
| `prepai3` | `number` | not stated | — | PAI values were obtained the three days before today |
| `prepai4` | `number` | not stated | — | PAI values were obtained the day before yesterday |
| `prepai5` | `number` | not stated | — | PAI values were obtained yesterday |
| `prepai6` | `number` | not stated | — | PAI values obtained on the same day |

### `hmSensor.id.SLEEP`

```ts
() => void
```

**SleepInfo**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model` | `number` | not stated | — | model |
| `start` | `number` | not stated | — | start time, based on the number of minutes at 0:00 on the day |
| `stop` | `number` | not stated | — | The end event, based on the number of minutes at 0:00 on the day |

**BasicInfo**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `score` | `number` | not stated | — | sleep score |
| `deepMin` | `number` | not stated | — | Deep sleep time in minutes |
| `startTime` | `number` | not stated | — | Sleep start time, based on the number of minutes at 0:00 on the day |
| `endTime` | `number` | not stated | — | Sleep end time, the number of minutes from the same base point as the start time |

### `hmSensor.id.SPO2`

**spo2**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | Blood oxygen measurement values |
| `time` | `number` | not stated | — | time when the result was generated |
| `retcode` | `number` | not stated | — | result return code |
| `hourAvgofDay` | `Array<number>` | not stated | — | Returns the hourly average blood sample data, length 24 |

### `hmSensor.id.STAND`

**stand**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current standing hours |
| `target` | `number` | not stated | — | standing hours target |

### `hmSensor.id.STEP`

**step**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current step number |
| `target` | `number` | not stated | — | target step |

### `hmSensor.id.STRESS`

**stress**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | current pressure value |
| `time` | `number` | not stated | — | time when the pressure value was generated |

### `hmSensor.id.TIME`

**time**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `utc` | `number` | not stated | — | Timestamp, milliseconds from January 1, 1970 to present |
| `year` | `number` | not stated | — | year |
| `month` | `number` | not stated | — | month |
| `day` | `number` | not stated | — | day |
| `hour` | `number` | not stated | — | hour |
| `minute` | `number` | not stated | — | minute |
| `second` | `number` | not stated | — | second |
| `week` | `number` | not stated | — | week 1 - 7 |
| `lunar_year` | `number` | not stated | — | Traditional Chinese Calendar Year |
| `lunar_month` | `number` | not stated | — | Traditional Chinese Calendar Month |
| `lunar_day` | `number` | not stated | — | Traditional Chinese Calendar Day |
| `lunar_festival` | `string` | not stated | — | Traditional Chinese Festival |
| `lunar_solar_term` | `string` | not stated | — | Traditional Chinese Solar Terms |
| `solar_festival` | `string` | not stated | — | Gregorian Holidays |

### `hmSensor.id.VIBRATE`

**vibrate**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `scene` | `number` | not stated | — | vibration scene setting |

**scene: number**

| Value | Description |
| --- | --- |
| `0` | Two short, continuous vibrations, consistent with the watch message notification vibration feedback |
| `1` | High vibration intensity, single vibration twice in 500ms, continuous vibration, need to manually stop before it will stop, consistent with the watch call vibration feedback |
| `5` | High vibration intensity, single long vibration 500ms, continuous vibration, need to manually stop before stopping, consistent with the watch alarm clock, countdown vibration feedback |
| `9` | High vibration intensity, four vibrations in 1200ms, can be used for stronger reminders |
| `23` | Light vibration intensity and short time (20ms) |
| `24` | Medium vibration intensity, short time (20ms) |
| `25` | High vibration intensity and short time (20ms) |
| `27` | High vibration intensity, lasting 1000ms |
| `28` | High vibration intensity, lasting 600ms |

### `hmSensor.id.WEAR`

**wear**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | Current wear status, see table below |

### `hmSensor.id.WEATHER`

```ts
() => ForecastWeather
```

**ForecastWeather**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `cityName` | `string` | not stated | — | City Name |
| `forecastData` | `ForecastData` | not stated | — | Weather Data |
| `tideData` | `TideData` | not stated | — | Tide Data |

**ForecastData**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `Array<ForecastDataItem>` | not stated | — | ForecastData array |
| `count` | `number` | not stated | — | Length of the ForecastData array |

**ForecastDataItem**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `high` | `number` | not stated | — | Highest temperature |
| `low` | `number` | not stated | — | Lowest temperature |
| `index` | `number` | not stated | — | index |

**TideData**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `Array<TideDataItem>` | not stated | — | TideData array |
| `count` | `number` | not stated | — | Length of the TideData array |

**TideDataItem**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `sunrise` | `Sunrise` | not stated | — | Sunrise data |
| `sunset` | `Sunset` | not stated | — | Sunset data |

**Sunrise**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `hour` | `number` | not stated | — | Hour |
| `minute` | `number` | not stated | — | Minute |

**Sunset**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `hour` | `number` | not stated | — | Hour |
| `minute` | `number` | not stated | — | Minute |

### `hmSensor.id.WORLD_CLOCK`

```ts
() => void
```

**wordInfo**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `city` | `string` | not stated | — | city |
| `hour` | `number` | not stated | — | hour |
| `minute` | `number` | not stated | — | minute |
| `timeZoneHour` | `number` | not stated | — | Time Zone Hours |
| `timeZoneMinute` | `number` | not stated | — | Time zone minutes |

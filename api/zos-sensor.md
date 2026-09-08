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

accelerometer. Measure the acceleration of the device along three orthogonal axes (x, y, z). The x and y axes are parallel to the screen, with the positive direction referring to the diagram. The z-axis is perpendicular to the device's screen, with the positive direction pointing upward. permission code: `device:os.accelerometer`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | >= 3 | Acceleration of x-axis in cm/s^2 |
| `y` | `number` | not stated | — | >= 3 | Acceleration of y-axis in cm/s^2 |
| `z` | `number` | not stated | — | >= 3 | Acceleration of z-axis in cm/s^2 |

### `@zos/sensor.Barometer`

Barometer Sensor. permission code: `device:os.barometer`

### `@zos/sensor.Battery`

Battery Sensor.

### `@zos/sensor.BloodOxygen`

Blood oxygen Sensor. permission code: `data:user.hd.spo2`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | not stated | — | >= 2 | Blood oxygen measurement values |
| `time` | `number` | not stated | — | >= 2 | Measurement time |
| `retCode` | `number` | not stated | — | >= 2 | Result code, refer to retCode description |

**Data**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `spo2` | `number` | not stated | — | >= 3 | Blood oxygen measurement value |
| `time` | `number` | not stated | — | >= 3 | Time of measurement of blood oxygen values, UTC time stamp in seconds |

### `@zos/sensor.BodyTemperature`

Body surface temperature sensor. permission code: `data:user.hd.body_temp`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `current` | `number` | not stated | — | >= 3 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |
| `time` | `number` | not stated | — | >= 3 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |

### `@zos/sensor.Buzzer`

Buzzer.

### `@zos/sensor.Calorie`

Calorie Sensor. permission code: `data:user.hd.calorie`

### `@zos/sensor.checkSensor`

Check the availability of sensors on the current device.

```ts
function checkSensor(sensor: Sensor): Result
```

### `@zos/sensor.Compass`

compass. permission code: `device:os.compass`

### `@zos/sensor.Distance`

Distance Sensor. permission code: `data:user.hd.distance`

### `@zos/sensor.FatBurning`

FatBurning Sensor. permission code: `data:user.hd.fat_burning`

### `@zos/sensor.FREQ_MODE_HIGH`

High power consumption mode with high trigger frequency

### `@zos/sensor.FREQ_MODE_LOW`

Low power mode with low trigger frequency

### `@zos/sensor.FREQ_MODE_NORMAL`

Normal power consumption mode, medium trigger frequency

### `@zos/sensor.Geolocation`

Geolocation Sensor. permission code: `device:os.geolocation`

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

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 3 | Positioning settings, see mode below for value descriptions |

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

### `@zos/sensor.Gyroscope`

Gyroscope. Measuring the angular velocity of the device rotating along three orthogonal axes (x, y, z), the x and y axes are parallel to the screen, the positive direction refers to the figure, the z axis is perpendicular to the device's screen, the positive direction points upward, and the direction of the rotational angular velocity is determined using the [Right-hand rule](https://en.wikipedia.org/wiki/Right-hand_rule). The direction of the rotation arrow in the figure is the positive direction. permission code: `device:os.gyroscope`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | >= 3 | Angular velocity of x-axis in DPS, degrees per second |
| `y` | `number` | not stated | — | >= 3 | Angular velocity of y-axis in DPS, degrees per second |
| `z` | `number` | not stated | — | >= 3 | Angular velocity of z-axis in DPS, degrees per second |

### `@zos/sensor.HeartRate`

HeartRate Sensor. permission code: `data:user.hd.heart_rate`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `maximum` | `Maximum` | not stated | — | >= 3 | Maximum heart rate information |

**Maximum**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `hr_value` | `number` | not stated | — | >= 3 | Maximum heart rate value |
| `time` | `number` | not stated | — | >= 3 | Measurement time of maximum heart rate |

**AfibInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `flag` | `number` | not stated | — | >= 3 | Atrial fibrillation test results, 0 - normal, 1 - high alert, 2 - low alert, 3 - atrial fibrillation |
| `val` | `number` | not stated | — | >= 3 | Atrial fibrillation data value, integer value 0 - 255 |
| `maxValue` | `number` | not stated | — | >= 3 | Atrial fibrillation data maximum value, integer value 0 - 255 |
| `minValue` | `number` | not stated | — | >= 3 | Atrial fibrillation data minimum value, integer value 0 - 255 |
| `time` | `number` | not stated | — | >= 3 | Time of Atrial fibrillation data acquisition, UTC seconds |
| `duration` | `number` | not stated | — | >= 3 | Duration in seconds |

### `@zos/sensor.Pai`

PAI Sensor. permission code: `data:user.hd.pai`

### `@zos/sensor.Screen`

Screen Status Sensor.

### `@zos/sensor.Sleep`

Sleep Sensor. permission code: `data:user.hd.sleep`

**SleepInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `score` | `number` | not stated | — | >= 2 | Sleep score |
| `deepTime` | `number` | not stated | — | >= 2 | Deep sleep time (minutes) |
| `startTime` | `number` | not stated | — | >= 2 | Sleep onset time, based on the number of minutes at 0:00 of the day |
| `endTime` | `number` | not stated | — | >= 2 | Sleep end time, based on the number of minutes at 0:00 of the day |
| `totalTime` | `number` | not stated | — | >= 2 | Get total sleep time (minutes) |

**StageConstants**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `WAKE_STAGE` | `number` | not stated | — | >= 2 | Awake stage |
| `REM_STAGE` | `number` | not stated | — | >= 2 | Deep sleep time (minutes) |
| `LIGHT_STAGE` | `number` | not stated | — | >= 2 | Light Sleep stage |
| `DEEP_STAGE` | `number` | not stated | — | >= 2 | Deep Sleep stage |

**StageInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `model` | `number` | not stated | — | >= 2 | Sleep stage type, refer to the constants returned by getStageConstantObj for the meaning of the value |
| `start` | `number` | not stated | — | >= 2 | Sleep stage onset time, based on the number of minutes at 0:00 of the day |
| `stop` | `number` | not stated | — | >= 2 | Sleep stage end time, based on the number of minutes at 0:00 of the day |

**NapInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `length` | `number` | not stated | — | >= 3 | Nap duration (minutes) |
| `start` | `number` | not stated | — | >= 3 | Nap start time, based on the number of minutes at 0:00 of the day |
| `stop` | `number` | not stated | — | >= 3 | Nap end time, based on the number of minutes at 0:00 of the day |

### `@zos/sensor.Stand`

Standing behavior Sensor. permission code: `data:user.hd.stand`

### `@zos/sensor.Step`

Step Sensor. permission code: `data:user.hd.step`

### `@zos/sensor.Stress`

Stress Sensor. permission code: `data:user.hd.stress`

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | not stated | — | >= 2 | Stress measurement values |
| `time` | `number` | not stated | — | >= 2 | Time to obtain the measured value |

**StressInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `second` | `number` | not stated | — | >= 3 | Pressure value measurement time, UTC time stamp, in seconds |
| `stress` | `number` | not stated | — | >= 3 | Pressure value, 0 means invalid |

**StressInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `second` | `number` | not stated | — | >= 3 | Pressure value measurement time, UTC time stamp, in seconds |
| `stress` | `number` | not stated | — | >= 3 | Pressure value, 0 means invalid |

### `@zos/sensor.SystemSounds`

System Sounds.

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

### `@zos/sensor.Time`

Time/Date Sensor.

**LunarMonthCalendar**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `day_count` | `number` | not stated | — | >= 2 | Number of days in the current month |
| `lunar_days_array` | `Array&#60;string&#62;` | not stated | — | >= 2 | Array of display content for each day of the current month, display content priority for holidays, Solar Term, date |

### `@zos/sensor.TIME_HOUR_FORMAT_12`

12-hour format

### `@zos/sensor.TIME_HOUR_FORMAT_24`

24-hour format

### `@zos/sensor.Vibrator`

Vibrator.

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | `VIBRATOR_SCENE_SHORT_MIDDLE` | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

**Action**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 3.6 | Vibration Scene Type |
| `duration` | `number` | not stated | — | >= 3.6 | Duration of vibration |

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `number` | not stated | — | >= 2 | Vibration mode, Value refer to Vibration motor mode constants |

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

### `@zos/sensor.Weather`

This interface has been deprecated, please refer to https://github.com/orgs/zepp-health/discussions/83 Weather Forecasts sensor.

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

### `@zos/sensor.Workout`

Workout Sensor. permission code: `data:user.hd.workout`

**Status**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `vo2Max` | `number` | not stated | — | >= 3 | VO2 Max |
| `trainingLoad` | `number` | not stated | — | >= 3 | Training Load |
| `fullRecoveryTime` | `number` | not stated | — | >= 3 | Full Recovery Time |

**History**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `startTime` | `number` | not stated | — | >= 3 | Workout start time |
| `duration` | `number` | not stated | — | >= 3 | Duration of workout in seconds |

**HrZoneSettings**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 4.2 | Heart rate zone type, 0: by heart rate reserve, 1: by maximum heart rate |
| `rest` | `number` | not stated | — | >= 4.2 | Resting heart rate value |
| `range` | `number[]` | not stated | — | >= 4.2 | Heart rate zone value array with 6 values, corresponding to: Ligit, Intensive, Aerobic, Anaerobic, VO2 max and maximum heart rate |

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

### `@zos/sensor.WorldClock`

World Clock Sensor.

**WorldClockInfo**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `city` | `string` | not stated | — | >= 3 | City Name |
| `cityCode` | `string` | not stated | — | >= 3 | City code, e.g. San Francisco SFO |
| `hour` | `number` | not stated | — | >= 3 | Hour |
| `minute` | `number` | not stated | — | >= 3 | Minute |
| `timeZoneHour` | `number` | not stated | — | >= 3 | Time Zone hours |
| `timeZoneMinute` | `number` | not stated | — | >= 3 | Time zone minutes |

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

## Descriptions

### `@zos/sensor.Accelerometer`

accelerometer. Measure the acceleration of the device along three orthogonal axes (x, y, z). The x and y axes are parallel to the screen, with the positive direction referring to the diagram. The z-axis is perpendicular to the device's screen, with the positive direction pointing upward. permission code: `device:os.accelerometer`

### `@zos/sensor.Barometer`

Barometer Sensor. permission code: `device:os.barometer`

### `@zos/sensor.Battery`

Battery Sensor.

### `@zos/sensor.BloodOxygen`

Blood oxygen Sensor. permission code: `data:user.hd.spo2`

### `@zos/sensor.BodyTemperature`

Body surface temperature sensor. permission code: `data:user.hd.body_temp`

### `@zos/sensor.Buzzer`

Buzzer.

### `@zos/sensor.Calorie`

Calorie Sensor. permission code: `data:user.hd.calorie`

### `@zos/sensor.checkSensor`

Check the availability of sensors on the current device.

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

### `@zos/sensor.Gyroscope`

Gyroscope. Measuring the angular velocity of the device rotating along three orthogonal axes (x, y, z), the x and y axes are parallel to the screen, the positive direction refers to the figure, the z axis is perpendicular to the device's screen, the positive direction points upward, and the direction of the rotational angular velocity is determined using the [Right-hand rule](https://en.wikipedia.org/wiki/Right-hand_rule). The direction of the rotation arrow in the figure is the positive direction. permission code: `device:os.gyroscope`

### `@zos/sensor.HeartRate`

HeartRate Sensor. permission code: `data:user.hd.heart_rate`

### `@zos/sensor.Pai`

PAI Sensor. permission code: `data:user.hd.pai`

### `@zos/sensor.Screen`

Screen Status Sensor.

### `@zos/sensor.Sleep`

Sleep Sensor. permission code: `data:user.hd.sleep`

### `@zos/sensor.Stand`

Standing behavior Sensor. permission code: `data:user.hd.stand`

### `@zos/sensor.Step`

Step Sensor. permission code: `data:user.hd.step`

### `@zos/sensor.Stress`

Stress Sensor. permission code: `data:user.hd.stress`

### `@zos/sensor.SystemSounds`

System Sounds.

### `@zos/sensor.Time`

Time/Date Sensor.

### `@zos/sensor.TIME_HOUR_FORMAT_12`

12-hour format

### `@zos/sensor.TIME_HOUR_FORMAT_24`

24-hour format

### `@zos/sensor.Vibrator`

Vibrator.

### `@zos/sensor.Wear`

Wearing status sensor.

### `@zos/sensor.Weather`

This interface has been deprecated, please refer to https://github.com/orgs/zepp-health/discussions/83 Weather Forecasts sensor.

### `@zos/sensor.Workout`

Workout Sensor. permission code: `data:user.hd.workout`

### `@zos/sensor.WorldClock`

World Clock Sensor.

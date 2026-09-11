# hmUI

**Also in this namespace:** [`hmUI.widget`](hmUI.widget.md) (22 symbols).

**12 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `align` | constant | not stated | OFFICIAL |
| `anim_status` | constant | not stated | OFFICIAL |
| `createWidget` | function | not stated | OFFICIAL |
| `data_type` | function | not stated | OFFICIAL |
| `date` | constant | not stated | OFFICIAL |
| `deleteWidget` | function | not stated | OFFICIAL |
| `getProperty` | function | not stated | OFFICIAL |
| `prop` | constant | not stated | OFFICIAL |
| `setProperty` | function | not stated | OFFICIAL |
| `system_status` | constant | not stated | OFFICIAL |
| `text_style` | constant | not stated | OFFICIAL |
| `widget` | constant | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmUI.align`

**align**

| Value | Description |
| --- | --- |
| `align.BOTTOM` | Vertical axis-bottommost. |
| `align.CENTER_H` | Horizontal axis-centered. |
| `align.CENTER_V` | Vertical axis-centered. |
| `align.LEFT` | Horizontal axis-left aligned. |
| `align.RIGHT` | Horizontal axis-align right. |
| `align.TOP` | Vertical axis-top. |

### `hmUI.anim_status`

**anim_status**

| Value | Description |
| --- | --- |
| `anim_status.PAUSE` | Pause animation; can only be called after starting the animation and resuming it. |
| `anim_status.RESUME` | Resume animation; can only be called after pausing the animation. |
| `anim_status.START` | Start animation; only pause stop is allowed to be called after starting the animation. |
| `anim_status.STOP` | Stop animation; can only be called after starting the animation and resuming it. |

### `hmUI.createWidget`

Create UI widgets.

```ts
(widgetId: WIDGET_ID, option?: Option) => widget: WIDGET
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `widgetId` | not stated | yes | — | The ID of the component to be created. (Reference WIDGET_ID) |
| `option` | not stated | no | — | Parameters. |
| `widget` | not stated | not stated | — | The instance of component. |

### `hmUI.data_type`

| Value                              | Description                                            | Data Range                                                   | | ---------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ | | hmUI.data_type.BATTERY             | Battery level                                          | `[0, 100]`                                                   | | hmUI.data_type.STEP                | Current step count                                     | `[0, 99999]`                                                 | | hmUI.data_type.STEP_TARGET         | Target step count                                      | `[0, 99999]`                                                 | | hmUI.data_type.CAL                 | Current calories                                       | `[0, 9999]`                                                  | | hmUI.data_type.CAL_TARGET          | Target calories                                        | `[0, 9999]`                                                  | | hmUI.data_type.HEART               | Current heart rate                                     | `[min, 220-age]`, `age` represents age                       | | hmUI.data_type.PAI_DAILY           | PAI obtained today                                     | `[0, 75]`                                                    | | hmUI.data_type.PAI_WEEKLY          | Current accumulated PAI                                | `[0, 525]`                                                   | | hmUI.data_type.DISTANCE            | Distance                                               | `[0, 99]`                                                    | | hmUI.data_type.STAND               | Current standing count                                 | `[0, 12]`                                                    | | hmUI.data_type.STAND_TARGET        | Target standing count                                  | `12`                                                         | | hmUI.data_type.WEATHER_CURRENT     | Current temperature                                    | Up to `3` digits                                             | | hmUI.data_type.WEATHER_LOW         | Current low temperature                                | Up to `3` digits                                             | | hmUI.data_type.WEATHER_HIGH        | Current high temperature                               | Up to `3` digits                                             | | hmUI.data_type.UVI                 | Ultraviolet index                                      | `[1, 5]`                                                     | | hmUI.data_type.AQI                 | Air Quality (only available in Chinese mainland)                                            | `(0, 999]`                                                   | | hmUI.data_type.HUMIDITY            | Humidity                                               | `[0, 100]`                                                   | | hmUI.data_type.FAT_BURNING         | Fat burning time (minutes)                             | `[0, 999]`                                                   | | hmUI.data_type.FAT_BURNING_TARGET  | Fat burning target time (minutes)                      | `[0, 999]`                                                   | | hmUI.data_type.SUN_CURRENT         | Time until sunrise/sunset                              | `HH:MM`                                                      | | hmUI.data_type.SUN_RISE            | Sunrise time                                           | `HH:MM`                                                      | | hmUI.data_type.SUN_SET             | Sunset time                                            | `HH:MM`                                                      | | hmUI.data_type.WIND                | Wind force level                                       | `[0, 12]`                                                    | | hmUI.data_type.STRESS              | Physical stress level                                  | `[0, 100]`                                                   | | hmUI.data_type.SPO2                | Blood oxygen level                                     | `(50, 100]`                                                  | | hmUI.data_type.ALTIMETER           | Air pressure                                           | `(0, 1200]`                                                  | | hmUI.data_type.FLOOR               | Floor climbing (number of floors)                      | `[0, 999]`                                                   | | hmUI.data_type.ALARM_CLOCK         | Alarm                                                  | `HH:MM`                                                      | | hmUI.data_type.COUNT_DOWN          | Countdown, number of minutes or seconds                | `2` digits                                                   | | hmUI.data_type.STOP_WATCH          | Stopwatch, number of minutes or seconds                | `2` digits                                                   | | hmUI.data_type.SLEEP               | Sleep                                                  | `HH:MM`                                                       | | hmUI.data_type.TRAINING_LOAD       | Training load                                          | Up to `3` digits                                             | | hmUI.data_type.VO2MAX              | Maximum oxygen uptake                                  | `[15, 65]`                                                   | | hmUI.data_type.RECOVERY_TIME       | Full recovery time                                     | `[0, 97]`                                                    | | hmUI.data_type.MONTH_RUN_TIMES     | Monthly outdoor run times                              | `[0, 100]`                                                   | | hmUI.data_type.MONTH_RUN_DISTANCE  | Monthly outdoor run distance                           | Up to `4` integer digits, `2` decimal places, e.g., `150.98` | | hmUI.data_type.ALTITUDE            | Altitude                                               | Up to `5` digits                                             | | hmUI.data_type.READINESS           | Physical and mental readiness                          | `[0, 100]`                                                   | | hmUI.data_type.MOON                | Moon phase, can only be used with `IMG_CLICK`          | -                                                            | | hmUI.data_type.OUTDOOR_RUNNING     | Outdoor running, can only be used with `IMG_CLICK`     | -                                                            | | hmUI.data_type.WALKING             | Walking, can only be used with `IMG_CLICK`             | -                                                            | | hmUI.data_type.OUTDOOR_CYCLING     | Outdoor cycling, can only be used with `IMG_CLICK`     | -                                                            | | hmUI.data_type.FREE_TRAINING       | Free training, can only be used with `IMG_CLICK`       | -                                                            | | hmUI.data_type.POOL_SWIMMING       | Pool swimming, can only be used with `IMG_CLICK`       | -                                                            | | hmUI.data_type.OPEN_WATER_SWIMMING | Open water swimming, can only be used with `IMG_CLICK` | -                                                            | | hmUI.data_type.PHN                 | Sports coach, can only be used with `IMG_CLICK`        | -                                                            | | hmUI.data_type.BREATH_TRAIN        | Breath training, can only be used with `IMG_CLICK`     | -                                                            |

**data_type**

| Value | Description |
| --- | --- |
| `data_type.ALARM_CLOCK` | Alarm |
| `data_type.ALTIMETER` | Air pressure |
| `data_type.ALTITUDE` | Altitude |
| `data_type.AQI` | Air Quality (only available in Chinese mainland) |
| `data_type.BATTERY` | Battery level |
| `data_type.BODY_TEMP` | Temperature |
| `data_type.BREATH_TRAIN` | Breath training, can only be used with IMG_CLICK |
| `data_type.CAL` | Current calories |
| `data_type.CAL_TARGET` | Target calories |
| `data_type.COUNT_DOWN` | Countdown, number of minutes or seconds |
| `data_type.DISTANCE` | Distance |
| `data_type.FAT_BURNING` | Fat burning time (minutes) |
| `data_type.FAT_BURNING_TARGET` | Fat burning target time (minutes) |
| `data_type.FLOOR` | Floor climbing (number of floors) |
| `data_type.FREE_TRAINING` | Free training, can only be used with IMG_CLICK |
| `data_type.HEART` | Current heart rate |
| `data_type.HUMIDITY` | Humidity |
| `data_type.MONTH_RUN_DISTANCE` | Monthly outdoor run distance |
| `data_type.MONTH_RUN_TIMES` | Monthly outdoor run times |
| `data_type.MOON` | Moon phase, can only be used with IMG_CLICK |
| `data_type.OPEN_WATER_SWIMMING` | Open water swimming, can only be used with IMG_CLICK |
| `data_type.OUTDOOR_CYCLING` | Outdoor cycling, can only be used with IMG_CLICK |
| `data_type.OUTDOOR_RUNNING` | Outdoor running, can only be used with IMG_CLICK |
| `data_type.PAI_DAILY` | PAI obtained today |
| `data_type.PAI_WEEKLY` | Current accumulated PAI |
| `data_type.PHN` | Sports coach, can only be used with IMG_CLICK |
| `data_type.POOL_SWIMMING` | Pool swimming, can only be used with IMG_CLICK |
| `data_type.READINESS` | Physical and mental readiness |
| `data_type.RECOVERY_TIME` | Full recovery time |
| `data_type.SLEEP` | Sleep |
| `data_type.SPO2` | Blood oxygen level |
| `data_type.STAND` | Current standing count |
| `data_type.STAND_TARGET` | Target standing count |
| `data_type.STEP` | Current step count |
| `data_type.STEP_TARGET` | Target step count |
| `data_type.STOP_WATCH` | Stopwatch, number of minutes or seconds |
| `data_type.STRESS` | Physical stress level |
| `data_type.SUN_CURRENT` | Time until sunrise/sunset |
| `data_type.SUN_RISE` | Sunrise time |
| `data_type.SUN_SET` | Sunset time |
| `data_type.TRAINING_LOAD` | Training load |
| `data_type.UVI` | Ultraviolet index |
| `data_type.VO2MAX` | Maximum oxygen uptake |
| `data_type.WALKING` | Walking, can only be used with IMG_CLICK |
| `data_type.WEATHER_CURRENT` | Current temperature |
| `data_type.WEATHER_HIGH` | Current high temperature |
| `data_type.WEATHER_LOW` | Current low temperature |
| `data_type.WIND` | Wind force level |

### `hmUI.date`

**date**

| Value | Description |
| --- | --- |
| `date.DAY` | day |
| `date.MONTH` | month |
| `date.WEEK` | Day of the week |

### `hmUI.deleteWidget`

Delete the UI widget.

```ts
(widget: WIDGET) => void
```

### `hmUI.getProperty`

Get the UI widget properties, use `widget.getProperty(hmUI.prop.MORE, {})` to get all the properties of the widget.

```ts
(key: any) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `any` | not stated | — | The value of property. |

### `hmUI.prop`

**prop**

| Value | Description |
| --- | --- |
| `prop.ANIM_IS_PAUSE` | Whether the animation is paused. |
| `prop.ANIM_IS_RUNINNG` | Is the animation running. |
| `prop.ANIM_IS_STOP` | Whether the animation is stopped. |

### `hmUI.setProperty`

Set the properties of the UI widget.

```ts
(propertyId: string, val: any) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `propertyId` | `PropertyId` | not stated | — | The property of ID. |
| `val` | `any` | not stated | — | Set the value. (when property is hmUI.prop.MORE, val is used in the same way as createWidget's option, which can set multiple parameters.) |

**PropertyId**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | The x-axis coordinate of the component. |
| `y` | `number` | not stated | — | The y-axis coordinate of the component. |
| `w` | `number` | not stated | — | The width of the component. |
| `h` | `number` | not stated | — | The height of the component. |
| `VISIBLE` | `boolean` | not stated | — | Whether the widget is visible or not, true is visible, false is not, this property does not support setProperty(hmUI.prop.MORE, {}), only setProperty sets the VISIBLE property alone |

### `hmUI.system_status`

**system_status**

The documentation states this list is incomplete. Members below marked `OBSERVED` come from sample code, and neither source is the whole set.

| Value | Description |
| --- | --- |
| `system_status.CLOCK` | Alarm clock on |
| `system_status.DISTURB` | Do not disturb |
| `system_status.LOCK` | Lock screen on |

### `hmUI.text_style`

**text_style**

| Value | Description |
| --- | --- |
| `text_style.ELLIPSIS` | Single line overflow character display... |
| `text_style.NONE` | Keep scrolling. |

### `hmUI.widget`

Its 22 values, and the shape each one returns, are in [`hmUI.widget`](hmUI.widget.md).

**widget**

The documentation states this list is incomplete. Members below marked `OBSERVED` come from sample code, and neither source is the whole set.

| Value | Description |
| --- | --- |
| `widget.BUTTON` | Button widget ID. |

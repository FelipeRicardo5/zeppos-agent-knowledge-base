# @zos/alarm

**17 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `cancel` | function | >= 3 | OFFICIAL |
| `getAllAlarms` | function | >= 3 | OFFICIAL |
| `REPEAT_DAY` | constant | >= 3 | OFFICIAL |
| `REPEAT_HOUR` | constant | >= 3 | OFFICIAL |
| `REPEAT_MINUTE` | constant | >= 3 | OFFICIAL |
| `REPEAT_MONTH` | constant | >= 3 | OFFICIAL |
| `REPEAT_ONCE` | constant | >= 3 | OFFICIAL |
| `REPEAT_WEEK` | constant | >= 3 | OFFICIAL |
| `REPEAT_YEAR` | constant | >= 3 | OFFICIAL |
| `set` | function | >= 3 | OFFICIAL |
| `WEEK_FRI` | constant | >= 3 | OFFICIAL |
| `WEEK_MON` | constant | >= 3 | OFFICIAL |
| `WEEK_SAT` | constant | >= 3 | OFFICIAL |
| `WEEK_SUN` | constant | >= 3 | OFFICIAL |
| `WEEK_THU` | constant | >= 3 | OFFICIAL |
| `WEEK_TUE` | constant | >= 3 | OFFICIAL |
| `WEEK_WED` | constant | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/alarm.cancel`

Cancels the set timer, if the timer is set to persist and also cancels the persistence.

**Requires in `app.json`**: `device:os.alarm` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function cancel(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `id` | `number` | not stated | — | >= 3 | Vertical axis coordinates of the page |

### `@zos/alarm.getAllAlarms`

Get an array of all created timers alarmId for the current Mini Program, including timers that support persistence.

**Requires in `app.json`**: `device:os.alarm` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function getAllAlarms(): Array<number>
```

### `@zos/alarm.REPEAT_DAY`

Specify the repetition period as day

### `@zos/alarm.REPEAT_HOUR`

Specify the repetition period as hour

### `@zos/alarm.REPEAT_MINUTE`

Specify the repetition period as minute

### `@zos/alarm.REPEAT_MONTH`

Specify the repetition period as month

### `@zos/alarm.REPEAT_ONCE`

Repeat once

### `@zos/alarm.REPEAT_WEEK`

Specify the repetition period as week

### `@zos/alarm.REPEAT_YEAR`

Specify the repetition period as year

### `@zos/alarm.set`

Support for persistent timers to wake up pages of Mini Program.

**Requires in `app.json`**: `device:os.alarm` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function set(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appid` | `number` | not stated | — | >= 3 | App ID of the Mini Program, default current Mini Program ID |
| `url` | `string` | not stated | — | >= 3 | File path to wake up Mini Program, supporting App Service |
| `time` | `number` | not stated | — | >= 3 | Timer execution time, UTC timestamp, in seconds, this field has higher priority than delay, each call must pass one of the time and delay parameter |
| `delay` | `number` | not stated | — | >= 3 | How many seconds of delay based on the current time after the execution, in seconds. Each call must pass one of the time and delay parameter |
| `param` | `string` | not stated | — | >= 3 | The argument passed to the app.js lifecycle onCreate |
| `store` | `boolean` | not stated | `false` | >= 3 | Does the timer need persistent storage (can still be executed successfully after device reboot) |
| `repeat_type` | `number` | not stated | — | >= 3 | Timer repetition type, refer to timer periodic repetition constants |
| `repeat_period` | `number` | not stated | `REPEAT_MINUTE` | >= 3 | Effective when repeat_type is set to REPEAT_MINUTE, REPEAT_HOUR, REPEAT_DAY, used in conjunction with repeat_duration to set a repeat period, one repeat period in the current repeat_type, containing repeat_period times, and repeat_duration times before the reminder |
| `repeat_duration` | `number` | not stated | `1` | >= 3 | When repeat_type is set to REPEAT_MINUTE, REPEAT_HOUR, REPEAT_DAY, the number of reminders in a period of the timer, used with repeat_duration, a period of the current repeat_type, including repeat_period times, repeat_duration times before the reminder |
| `week_days` | `number` | not stated | — | >= 3 | Effective when repeat_type is REPEAT_WEEK, you can customize which days of the week are repeated, refer to the timer week constants |
| `start_time` | `number` | not stated | — | >= 3 | The time when the repeat reminder starts, in UTC seconds, and the repeat reminder only takes effect during the repeat time period |
| `end_time` | `number` | not stated | — | >= 3 | The time when the repeat reminder ends, in UTC seconds, and the repeat reminder only takes effect during the repeat time period |

**Timer repeats constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `REPEAT_DAY` | >= 3 | Specify the repetition period as day |
| `REPEAT_HOUR` | >= 3 | Specify the repetition period as hour |
| `REPEAT_MINUTE` | >= 3 | Specify the repetition period as minute |
| `REPEAT_MONTH` | >= 3 | Specify the repetition period as month |
| `REPEAT_ONCE` | >= 3 | Repeat once |
| `REPEAT_WEEK` | >= 3 | Specify the repetition period as week |
| `REPEAT_YEAR` | >= 3 | Specify the repetition period as year |

**Timer weekly constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `WEEK_FRI` | >= 3 | Friday |
| `WEEK_MON` | >= 3 | Monday |
| `WEEK_SAT` | >= 3 | Saturday |
| `WEEK_SUN` | >= 3 | Sunday |
| `WEEK_THU` | >= 3 | Thursday |
| `WEEK_TUE` | >= 3 | Tuesday |
| `WEEK_WED` | >= 3 | Wednesday |

### `@zos/alarm.WEEK_FRI`

Friday

### `@zos/alarm.WEEK_MON`

Monday

### `@zos/alarm.WEEK_SAT`

Saturday

### `@zos/alarm.WEEK_SUN`

Sunday

### `@zos/alarm.WEEK_THU`

Thursday

### `@zos/alarm.WEEK_TUE`

Tuesday

### `@zos/alarm.WEEK_WED`

Wednesday

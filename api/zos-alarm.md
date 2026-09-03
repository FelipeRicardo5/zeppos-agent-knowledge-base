# @zos/alarm

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `cancel` | function | >= 3 | OFFICIAL |
| `getAllAlarms` | function | >= 3 | OFFICIAL |
| `set` | function | >= 3 | OFFICIAL |

## Descriptions

### `@zos/alarm.cancel`

Cancels the set timer, if the timer is set to persist and also cancels the persistence. :::info permission code: `device:os.alarm` :::

### `@zos/alarm.getAllAlarms`

Get an array of all created timers alarmId for the current Mini Program, including timers that support persistence. :::info permission code: `device:os.alarm` :::

### `@zos/alarm.set`

Support for persistent timers to wake up pages of Mini Program. :::info permission code: `device:os.alarm` :::

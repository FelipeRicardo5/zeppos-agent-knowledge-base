# @zos/timer

**2 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `createSysTimer` | function | >= 4 | OFFICIAL |
| `stopTimer` | function | >= 4 | OFFICIAL |

## Symbols in detail

### `@zos/timer.createSysTimer`

A system-level timer that can be registered in device app services and runs regardless of watch screen state.

```ts
function createSysTimer(periodic: Periodic, period: Period, callback: Callback, arg?: Arg): Result
```

### `@zos/timer.stopTimer`

Stop the timer created by `createSysTimer` method.

```ts
function stopTimer(timerId: TimerId): void
```

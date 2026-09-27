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

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Periodic` | `boolean` | Whether to create a periodic timer |
| `Period` | `number` | Timer period (ms). For non-periodic timers, it represents delay duration, 0 means immediate execution |
| `Callback` | `(arg?: unknown) =&#62; void` | Callback function |
| `Arg` | `unknown` | Parameter passed to the callback function |
| `Result` | `number` | **returned** — The ID returned by creating a system timer, used to stop the timer later |

### `@zos/timer.stopTimer`

Stop the timer created by `createSysTimer` method.

```ts
function stopTimer(timerId: TimerId): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `TimerId` | `number` | Timer ID to be stopped, returned by createSysTimer method |

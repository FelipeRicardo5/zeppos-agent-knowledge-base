# @zos/utils

**6 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `assets` | function | >= 2 | OFFICIAL |
| `bufferToString` | function | >= 4 | OFFICIAL |
| `EventBus` | value | >= 2 | OFFICIAL |
| `log` | value | >= 2 | OFFICIAL |
| `px` | function | >= 2 | OFFICIAL |
| `stringToBuffer` | function | >= 4 | OFFICIAL |

## Symbols in detail

### `@zos/utils.assets`

Used to handle resource file paths, splice `basePath`. and can pass in parameters for rtl path conversion of images, for RTL adaptation of Mini Program.

```ts
function assets(basePath: BasePath): AssetsPathFunc
```

### `@zos/utils.bufferToString`

Convert `ArrayBuffer` type to string type.

```ts
function bufferToString(buffer: InputBuffer): Result
```

### `@zos/utils.EventBus`

EventBus is a utility class that provides event publishing/subscribing, an implementation of the publish-subscribe pattern.

**Called on a `EventBus` value** — 6 members

| Member | Signature |
| --- | --- |
| [`on`](#zosutilseventbuson) | `on(eventName: string, listener: (...args: any[]) => void): void` |
| [`off`](#zosutilseventbusoff) | `off(eventName: string, listener: (...args: any[]) => void): void` |
| [`emit`](#zosutilseventbusemit) | `emit(eventName: string, ...args: any[]): void` |
| [`once`](#zosutilseventbusonce) | `once(eventName: string, listener: (...args: any[]) => void): void` |
| [`clear`](#zosutilseventbusclear) | `clear(): void` |
| [`count`](#zosutilseventbuscount) | `count(eventName?: string): number` |

#### `@zos/utils.EventBus.on`

Adds the listener function to the end of the listeners array for the event named eventName

```ts
on(eventName: string, listener: (...args: any[]) => void): void
```

#### `@zos/utils.EventBus.off`

Removes the specified listener from the listener array for the event named eventName

```ts
off(eventName: string, listener: (...args: any[]) => void): void
```

#### `@zos/utils.EventBus.emit`

Triggers the listener functions for the event named eventName

```ts
emit(eventName: string, ...args: any[]): void
```

#### `@zos/utils.EventBus.once`

Adds a one-time listener function for the event named eventName

```ts
once(eventName: string, listener: (...args: any[]) => void): void
```

#### `@zos/utils.EventBus.clear`

Removes all listeners, or those of the specified eventName

```ts
clear(): void
```

#### `@zos/utils.EventBus.count`

Gets the number of registered event listeners corresponding to `eventName`. If `eventName` is not passed, get the number of registered `eventName` types

```ts
count(eventName?: string): number
```

### `@zos/utils.log`

The `log` instance is used for log printing and has multiple levels of logging methods for easy filtering in the console.

**Called on a `log` value** — 6 members

| Member | Signature |
| --- | --- |
| [`getLogger`](#zosutilsloggetlogger) | `getLogger(name: string): log` |
| [`log`](#zosutilsloglog) | `log(...args: string[]): void` |
| [`warn`](#zosutilslogwarn) | `warn(...args: string[]): void` |
| [`debug`](#zosutilslogdebug) | `debug(...args: string[]): void` |
| [`error`](#zosutilslogerror) | `error(...args: string[]): void` |
| [`info`](#zosutilsloginfo) | `info(...args: string[]): void` |

#### `@zos/utils.log.getLogger`

Returns a new `log` instance with the `name` tag, which is added when the print log method is executed to make it easier to distinguish

```ts
getLogger(name: string): log
```

#### `@zos/utils.log.log`

Print log level logs

```ts
log(...args: string[]): void
```

#### `@zos/utils.log.warn`

Print warn level logs

```ts
warn(...args: string[]): void
```

#### `@zos/utils.log.debug`

Print debug level logs

```ts
debug(...args: string[]): void
```

#### `@zos/utils.log.error`

Print error level logs

```ts
error(...args: string[]): void
```

#### `@zos/utils.log.info`

Print info level logs

```ts
info(...args: string[]): void
```

### `@zos/utils.px`

Pixel scaling calculation. The `designWidth` of each model in the `targets` object in the `app.json` is used as the base..

```ts
function px(value: PxValue): Result
```

### `@zos/utils.stringToBuffer`

Convert string type to `ArrayBuffer` type.

```ts
function stringToBuffer(str: InputString): Result
```

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

### `@zos/utils.log`

The `log` instance is used for log printing and has multiple levels of logging methods for easy filtering in the console.

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

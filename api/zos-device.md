# @zos/device

**5 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getDataDiskInfo` | function | >= 5 | OFFICIAL |
| `getDeviceInfo` | function | >= 2 | OFFICIAL |
| `getDiskInfo` | function | >= 2 | OFFICIAL |
| `SCREEN_SHAPE_ROUND` | constant | >= 2 | OFFICIAL |
| `SCREEN_SHAPE_SQUARE` | constant | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/device.getDataDiskInfo`

Gets the total, available, and used capacity of the data partition (`data://`) in bytes. This covers the whole data partition, not the current application's storage usage. Check `isSuccess` before reading the capacity fields.

**Requires in `app.json`**: `data:os.device.info` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function getDataDiskInfo(): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Result` | `SuccessResult&#124;FailResult` | **returned** — undefined |

**SuccessResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `isSuccess` | `true` | not stated | — | >= 5 | The query succeeded |
| `total` | `number` | not stated | — | >= 5 | Total data partition capacity in bytes |
| `free` | `number` | not stated | — | >= 5 | Available data partition capacity in bytes |
| `used` | `number` | not stated | — | >= 5 | Used data partition capacity in bytes |

**FailResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `isSuccess` | `false` | not stated | — | >= 5 | The query failed; capacity fields are not included |

### `@zos/device.getDeviceInfo`

Gets device information.

**Requires in `app.json`**: `data:os.device.info` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function getDeviceInfo(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `width` | `number` | not stated | — | >= 2 | Device screen width |
| `height` | `number` | not stated | — | >= 2 | Device screen height |
| `screenShape` | `number` | not stated | — | >= 2 | Screen shape, value refer to screen shape constants |
| `deviceName` | `number` | not stated | — | >= 2 | Device name |
| `keyNumber` | `number` | not stated | — | >= 2 | Number of keys |
| `deviceSource` | `number` | not stated | — | >= 2 | Device Plain Numeric Designators |
| `keyType` | `string` | not stated | — | >= 2 | Device physical button type |
| `deviceColor` | `number` | not stated | — | >= 2 | Device color identification |
| `uuid` | `string` | not stated | — | >= 4.2 | Device unique identifier, 32 bytes in length |

**Screen shape**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `SCREEN_SHAPE_ROUND` | >= 2 | Round Screen |
| `SCREEN_SHAPE_SQUARE` | >= 2 | Square Screen |

### `@zos/device.getDiskInfo`

Gets device storage totals, available space, and usage by Mini Programs, watchfaces, music, and the system. Returns the result synchronously when called without arguments. Starting from API_LEVEL 3.0, pass a callback to query asynchronously; asynchronous queries are recommended.

```ts
function getDiskInfo(): Result
function getDiskInfo(callback: Callback): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(diskInfo: Result) =&#62; void` | Callback receiving device storage information when the query completes; capacities are in bytes |

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `total` | `number` | not stated | — | >= 2 | Total Space in bytes |
| `free` | `number` | not stated | — | >= 2 | Available Space in bytes |
| `app` | `number` | not stated | — | >= 2 | Space occupied by Mini Programs in bytes |
| `watchface` | `number` | not stated | — | >= 2 | Space occupied by watchfaces in bytes |
| `music` | `number` | not stated | — | >= 2 | Space occupied by musics in bytes |
| `system` | `number` | not stated | — | >= 2 | Space occupied by system in bytes |

### `@zos/device.SCREEN_SHAPE_ROUND`

Round Screen

### `@zos/device.SCREEN_SHAPE_SQUARE`

Square Screen

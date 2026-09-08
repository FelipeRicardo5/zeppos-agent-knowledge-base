# @zos/device

**4 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getDeviceInfo` | function | >= 2 | OFFICIAL |
| `getDiskInfo` | function | >= 2 | OFFICIAL |
| `SCREEN_SHAPE_ROUND` | constant | >= 2 | OFFICIAL |
| `SCREEN_SHAPE_SQUARE` | constant | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/device.getDeviceInfo`

Gets device information. permission code: `data:os.device.info`

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

### `@zos/device.getDiskInfo`

Gets disk information.

```ts
function getDiskInfo(): Result
```

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

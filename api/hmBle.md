# hmBle

**6 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addListener` | function | not stated | OFFICIAL |
| `connectStatus` | function | not stated | OFFICIAL |
| `createConnect` | function | not stated | OFFICIAL |
| `disConnect` | function | not stated | OFFICIAL |
| `removeListener` | function | not stated | OFFICIAL |
| `send` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmBle.addListener`

Register a connection status listener

```ts
(callback: (status: boolean) => void) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `status` | `boolean` | not stated | — | connection status |

### `hmBle.connectStatus`

Query connection status

```ts
() => Result
```

### `hmBle.createConnect`

Create connection

```ts
(callback: (index: number, data: object, size: number) => void) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | no | — | subpackage number |
| `data` | `object` | no | — | received data |
| `size` | `number` | no | — | length of data received |

### `hmBle.disConnect`

Disconnects

```ts
() => void
```

### `hmBle.removeListener`

Cancel the connection status listener

```ts
() => void
```

### `hmBle.send`

Send a message

```ts
(data: object, size: number) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `object` | no | — | data to be sent |
| `size` | `number` | no | — | length of data to be sent |

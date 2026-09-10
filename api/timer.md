# timer

**2 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `createTimer` | function | not stated | OFFICIAL |
| `stopTimer` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `timer.createTimer`

Create Timer

```ts
(delay: number, repeat: number, callback: (option: any) => void, option: any) => timerId
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `delay` | `number` | yes | — | delay (milliseconds) |
| `repeat` | `number` | yes | — | period (milliseconds) |
| `callback` | `(option: any) => void` | yes | — | callback function |
| `option` | `any` | yes | — | callback parameters |

### `timer.stopTimer`

Delete Timer

```ts
(timerId: number) => void
```

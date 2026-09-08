# @zos/app-access

**1 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getSportData` | function | >= 3.6 | OFFICIAL |

## Symbols in detail

### `@zos/app-access.getSportData`

By default, the system will off the screen in one page of the Mini Program, and the system will exit the Mini Program after 10s, and enter the dial page when the watch is woken up again. If `relaunch` is set to `true`, the Mini Program will reopen and enter the corresponding page when the watch is woken up again. permission code: `data:user.hd.workout`

```ts
function getSportData(options: Options, callback: (callbackResult: CallbackResult) => void): Result
```

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `string` | not stated | — | >= 3.6 | Sports type, refer to the value of SportType |

**CallbackResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `code` | `number` | not stated | — | >= 3.6 | Result status code, 0 means success, non- 0 means failure |
| `data` | `string` | not stated | — | >= 3.6 | Sports data, return value type is string, needs to be parsed using JSON.parse, the parsed type is Array<object>, the specific type of object can be referred to the SportType type description below, and the return value corresponding to each type is different |

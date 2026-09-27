# @zos/i18n

**1 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getText` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/i18n.getText`

Get the corresponding string from the internationalization resource file (.po) based on the internationalization key.

```ts
function getText(key: Key): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Key` | `string` | Internationalization key |
| `Result` | `string` | **returned** — The string corresponding to the internationalized key |

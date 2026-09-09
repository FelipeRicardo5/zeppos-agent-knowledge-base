# `app.json` — `runtime`

Source: `zeppos-docs/docs/reference/app-json.mdx`. `OFFICIAL` — this is what the reference
page declares, not what a build was observed to accept.

[Back to the manifest index](index.md).

## `runtime`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `apiVersion` | `object` | yes | v2 | Runtime API Versions. |
| `type` | `number` | no | v2 | The loader type for loading Mini Programs at runtime, supporting the following values: 0 Current value YES Default value. It indicates that the Mini Program is loaded with the loader of the QuickJS-js interpreter, with the suffix .js, 1 indicates that the Mini Program is loaded with the loader of the C interpreter, with the suffix .c, 2 indicates that the Mini Program is loaded with the loader of the QuickJS-bytecode interpreter, with the suffix .bin |

```js
{
  "runtime": {
    "apiVersion": {
      "compatible": "1.0.0",
      "target": "1.0.1",
      "minVersion": "1.0.0"
    }，
  "type": "0"
  }
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 100

### `runtime.apiVersion`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `minVersion` | `string` | yes | v2 | Runtime requirements, this field YES is required to determine the current runtime requirements of the Mini Program; v <= minVersion, cannot be upgraded or installed. |
| `compatible` | `string` | no | v2 | Compatible version, optional. |
| `target` | `string` | no | v2 | This is the version of the target SDK, runtime, optionally. |

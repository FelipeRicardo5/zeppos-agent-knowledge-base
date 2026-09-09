# `app.json` — `app`

Source: `zeppos-docs/docs/reference/app-json.mdx`. `OFFICIAL` — this is what the reference
page declares, not what a build was observed to accept.

[Back to the manifest index](index.md).

## `app`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `appId` | `number` | yes | v2 | The Mini Program "id", "id" is the unique identification of the Mini Program. |
| `appName` | `string` | yes | v2 | Mini Program Name. |
| `appType` | `string` | yes | v2 | Mini Program type. The following values are supported: app Mini Program; watchface dial. |
| `version` | `object` | yes | v2 | Mini Program version information. |
| `icon` | `string` | no | v2 | The path to the Mini Program icon. Reference [Design Specifications - app icons](../designs/visual/icons.md#app-icons). If not passed, use the default icon. |
| `vender` | `string` | yes | v2 | Developer Name. |
| `venderId` | `number` | no | — | Developer id. |
| `cover` | `Array<string>` | no | — | Matching images for Mini Program display. In general, dials are used. |
| `description` | `string` | yes | v2 | Short description of the Mini Program. |

```js
{
  "app": {
    "appId": 1000089,
    "appName": "······",
    "appType": "app",
    "version": {
      "code": 5,
      "name": "0.0.5"
    },
    "icon": "logo.png",
    "vender": "······",
    "description": "······"
    }
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 60

### `app.version`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `code` | `number` | yes | — | Mini Program program version number. The default starts from 1. Note: Each version should be larger than the previous one. For example: 12, 13, 2001, etc. |
| `name` | `string` | yes | — | Semantic version of the Mini Program. It is recommended that versions be recorded in the format x.x.x. For example: 1.0.1. |

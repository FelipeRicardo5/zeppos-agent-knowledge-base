# `app.json` — `targets`

Source: `zeppos-docs/docs/reference/app-json.mdx`. `OFFICIAL` — this is what the reference
page declares, not what a build was observed to accept.

[Back to the manifest index](index.md).

## `targets`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `module` | `object` | yes | v2 | Mini Program function module configuration. |
| `platforms` | `Array<object>` | yes | v2 | Mini Program running platform device selection. |
| `designWidth` | `number` | yes | v2 | The design width of the current view, adjusted using the px runtime; this value depends on the design drafts |

**What the 33 sample manifests write here.** Observed
values with the number of apps writing each, not a permitted set — the table
above states the shape and never the vocabulary.

- `targets.*.module.app-side.path` — `app-side/index` (10), `app-side/index/index` (1)
- `targets.*.module.page.pages` — `page/index` (8), `page/home/index.page` (3), `pages/index` (3), `page/gt/food-list` (2), `page/gt/home/index.page` (2), `page/gt/index` (2), `data-widget/index` (1), `data-widget/index.page` (1), `page/gtr-3/food-list` (1), `page/gtr-3/home/index.page` (1), `page/gtr-3/index` (1), `page/gtr/home/index.page` (1), `page/gtr3-pro/home/index.page` (1), `page/gtr3/home/index.page` (1), `page/gts-3/food-list` (1), `page/gts-3/index` (1), `page/gts/food-list` (1), `page/gts/home/index.page` (1), `page/gts/index` (1), `page/gts3/home/index.page` (1), `page/interaction/create_modal` (1), `page/interaction/on_digital_crown` (1), `page/interaction/on_key` (1), `page/interaction/on_wrist_motion` (1), `page/interaction/show_toast` (1), `page/router/set_launch_app_timeout` (1), `page/sensor/blood_oxygen` (1), `page/sensor/calorie` (1), `page/sensor/distance` (1), `page/sensor/fat_burning` (1), `page/sensor/geolocation` (1), `page/sensor/heart_rate` (1), `page/sensor/pai` (1), `page/sensor/sleep` (1), `page/sensor/stand` (1), `page/sensor/step` (1), `page/sensor/stress` (1), `page/TC/TC_01/index` (1), `page/TC/TC_02/index` (1), `page/TC/TC_03/index` (1), `page/ui/widget/arc` (1), `page/ui/widget/button` (1), `page/ui/widget/checkbox_group` (1), `page/ui/widget/cycle_image_text_list` (1), `page/ui/widget/cycle_list` (1), `page/ui/widget/dialog` (1), `page/ui/widget/fill_rect` (1), `page/ui/widget/histogram` (1), `page/ui/widget/img` (1), `page/ui/widget/img_anim` (1), `page/ui/widget/pick_date` (1), `page/ui/widget/polyline` (1), `page/ui/widget/qrcode` (1), `page/ui/widget/radio_group` (1), `page/ui/widget/scroll_list` (1), `page/ui/widget/slide_switch` (1), `page/ui/widget/stroke_rect` (1), `page/ui/widget/text` (1), `page/ui/widget/view_container` (1), `pages/acc` (1), `pages/alarm` (1), `pages/bgService` (1), `pages/ble` (1), `pages/canvas` (1), `pages/compass` (1), `pages/gps` (1), `pages/guidelines` (1), `pages/gyro` (1), `pages/heart` (1), `pages/newAlarm` (1), `pages/notification` (1), `pages/screen` (1), `pages/sensor` (1), `pages/sleep` (1), `pages/spo2` (1), `pages/stress` (1), `pages/systemEvent` (1), `pages/target` (1), `pages/workout` (1)
- `targets.*.module.setting.path` — `setting/index` (5)
- `targets.*.module.watchface.path` — `watchface/gtr-3-pro/index` (2), `watchface/gtr-3/index` (1), `watchface/gts-3/index` (1)

```js
{
  "targets": {
    "gtr-3-pro": {
      "module": {
        // ...
      }
    },
    "gtr-3": {
      "module": {
        // ...
      }
    },
    "gts-3": {
      "module": {
        // ...
      }
    },
  }
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 139

### `targets.module`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `shortcut` | `object` | NO, only valid if appType is app. | v2 | The description of jumping to the Mini Program. |
| `page` | `object` | YES, required when appType is app. | v2 | The configuration of page in Device App module . |
| `app-widget` | `object` | no | v2 | The configuration of Shortcut Cards. |
| `secondary-widget` | `object` | no | v2 | The configuration of SecondaryWidget. |
| `watch-widget` | `object` | no | v2 | The configuration of watchface component module. |
| `watchface` | `object` | YES, required when appType is watchface. | v2 | The configuration of watchface module. |
| `app-side` | `object` | no | v2 | The configuration of companion module. |
| `setting` | `object` | no | v2 | The configuration of Settings App module. |
| `app-service` | `object` | no | v3 | The configuration of Background Service. |
| `app-event` | `object` | no | v3 | The configuration of System Event Listening. |

```js
{
  "module": {
    "page": {
      "pages": ["page/gtr-3-pro/loading"]
    },
    "app-side": {
      "path": "app-side/index"
    },
    "setting": {
      "path": "setting/index"
    },
    "app-widget": {
      "widgets": [
        {
          "path": "app-widget/index",
          "icon": "icon.png",
          "name": "app-widget-demo",
          "runtime": {
            "type": "js"
          }
        }
      ]
    },
    "secondary-widget": {
      "widgets": [
        {
          "path": "secondary-widget/index",
          "icon": "icon.png",
          "preview": "preview.png",
          "name": "secondary-widget-demo",
          "runtime": {
            "type": "js"
          }
        }
      ]
    }
  }
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 178

#### `targets.module.shortcut`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `scheme` | `string` | yes | v2 | Protocol type: Support type dapp. |
| `appLangType` | `number` | yes | v2 | Jump to target Mini Program type: 0: js Mini Program; 1: native app. |
| `appId` | `number` | Required if appLangType is js. | v2 | The appid of the Mini Program. |
| `path` | `string` | yes | v2 | File's path/native app's name. |
| `params` | `string` | no | v2 | The parameters for jumping. |

#### `targets.module.page`

Configures the **Device App** runtime — see [`../runtimes/device-app.md`](../runtimes/device-app.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `pages` | `Array<string>` | yes | v2 | Page path, at least one; the default is the first Mini Program entrance. |

#### `targets.module.app-widget`

Configures the **Device App** runtime — see [`../runtimes/device-app.md`](../runtimes/device-app.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `widgets` | `Array<string>` | yes | v2 | Component path, can be none. |

#### `targets.module.watch-widget`

Configures the **Watchface** runtime — see [`../runtimes/watchface.md`](../runtimes/watchface.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `widgets` | `Array<string>` | yes | v2 | Component path, can be none. |

#### `targets.module.watchface`

Configures the **Watchface** runtime — see [`../runtimes/watchface.md`](../runtimes/watchface.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `path` | `string` | yes | v2 | The path of watchface. |
| `main` | `number` | NO(If you don't add it, the default is 1.) | v2 | The watchface which displays in home page.(0:none) |
| `editable` | `number` | NO(If you don't add it, the default is 0.) | v2 | Editable watchface (0: not supported) |
| `lockscreen` | `number` | NO(If you don't add it, the default is 0.) | v2 | Lock screen(0:none) |
| `photoscreen` | `number` | NO(If you don't add it, the default is 0.) | v2 | Photo watchface (0: not supported) |

#### `targets.module.app-side`

Configures the **Side Service** runtime — see [`../runtimes/side-service.md`](../runtimes/side-service.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `path` | `string` | no | v2 | The path of Side Service. |

#### `targets.module.setting`

Configures the **Settings App** runtime — see [`../runtimes/settings.md`](../runtimes/settings.md).

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `path` | `string` | yes | v2 | The path of Settings App. |

### `targets.platforms`

| Property | Type | Required | Since configVersion | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | no | v2 | Device description, named by the developer. |
| `deviceSource` | `number` | YES, v3 NO | v2 | Number of the equipment. |
| `st` | `string` | no | v3 | Screen shape, support s, r, b, Refer to [Screen Adaptation](../guides/framework/device/screen-adaption.md) for details |
| `sr` | `string` | no | v3 | The resolution of the screen, the format is w + number, such as w480 means the screen width 480 px, for details refer to [Screen Adaptation](../guides/framework/device/screen-adaption.md) for details |

```js
{
  "platforms": [{
    "name": "gts-3",
    "deviceSource": 229
  }, {
    "name": "gts-3",
    "deviceSource": 230
  }]
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 298

### `targets.designWidth`

The page states no property table for this key — only the example below.

```js
{
  "designWidth": 390
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 314

## Keys named here but never described

Each is typed as an object in a table above and given no section of its own
anywhere on the page. The gap is upstream, not in this extraction.

- `targets.module.secondary-widget` — The configuration of SecondaryWidget.
- `targets.module.app-service` — The configuration of Background Service.
- `targets.module.app-event` — The configuration of System Event Listening.

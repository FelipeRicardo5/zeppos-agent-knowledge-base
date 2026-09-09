# `app.json` — the Mini Program manifest

Source: `zeppos-docs/docs/reference/app-json.mdx`, 20 documented keys.
`OFFICIAL`.

This file decides which runtimes an app has, which devices it installs on and
which permissions it holds. Getting it wrong breaks the build or the install,
before any API is reached — which is why it is here rather than left to the
reference page it comes from.

`docs/watchface/app-json.md` is the same page re-exported, so a watchface's
manifest is documented here too.

## Top-level keys

| Key | Type | Required | Since configVersion | Detail | Description |
| --- | --- | --- | --- | --- | --- |
| `configVersion` | `string` | yes | — | below | Configuration file version number, supports the following values: v3 currently , v1 deprecated used. All features labeled v3 in this article require the v3 version of app.json to work properly. |
| `app` | `object` | yes | — | [app.md](app.md) | Mini Program configuration information. |
| `runtime` | `object` | yes | — | [runtime.md](runtime.md) | Mini Program runtime settings. |
| `permissions` | `Array<string>` | yes | — | below | List of Mini Program permissions. |
| `targets` | `object` | yes | — | [targets.md](targets.md) | Build Mini Program installer setup. |
| `i18n` | `object` | yes | — | below | Mini Program internationalization configuration. |
| `defaultLanguage` | `string` | yes | — | below | The default language setting for the Mini Program. This value is used as the language of the program when the system cannot find a suitable language to set the program. This value is not recommended to be empty. |
| `debug` | `boolean` | no | — | — | Mini Program debugging function, supports the following values: true Enable debugging function; false Default value. Turn off the debugging function. |

## The keys with no shape of their own

A string, a list or a free-form map — the page gives each of these an example
and no property table, so there is nothing to tabulate and no page to open.

### `configVersion`

```js
{
  "configVersion": "v3"
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 27

### `permissions`

```js
{
  "permissions": []
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 117

### `i18n`

```js
{
  "i18n": {
    "en-US": {
      "appName": "······"
    },
    "en-ES": {
      "appName": "······"
    }
  }
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 328

### `defaultLanguage`

```js
{
  "defaultLanguage": "zh-cn"
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 345

## Entry points: which key turns on which runtime

The lookup this view exists for. Nothing upstream connects a manifest key to a
runtime, so *"which key do I add to ship a Side Service"* cannot be answered
from the reference page alone. Every key below sits under
`targets.<target>.module`.

| Key | Runtime | Required | Description |
| --- | --- | --- | --- |
| `shortcut` | *not stated* | NO, only valid if appType is app. | The description of jumping to the Mini Program. |
| `page` | [Device App](../runtimes/device-app.md) | YES, required when appType is app. | The configuration of page in Device App module . |
| `app-widget` | [Device App](../runtimes/device-app.md) | no | The configuration of Shortcut Cards. |
| `secondary-widget` *(shape undocumented)* | [Device App](../runtimes/device-app.md) | no | The configuration of SecondaryWidget. |
| `watch-widget` | [Watchface](../runtimes/watchface.md) | no | The configuration of watchface component module. |
| `watchface` | [Watchface](../runtimes/watchface.md) | YES, required when appType is watchface. | The configuration of watchface module. |
| `app-side` | [Side Service](../runtimes/side-service.md) | no | The configuration of companion module. |
| `setting` | [Settings App](../runtimes/settings.md) | no | The configuration of Settings App module. |
| `app-service` *(shape undocumented)* | *not stated* | no | The configuration of Background Service. |
| `app-event` *(shape undocumented)* | *not stated* | no | The configuration of System Event Listening. |

**No documented `module` key reaches Workout Extension.**
That is a hole in the reference page, not in this base — see the observed keys
below for what shipped apps actually use.

## Keys real manifests use that this page never mentions

Every key path in the 33 working sample manifests, diffed against
the documented tree above. `OBSERVED`: these come from files that build, not from
a documented contract — but a key the docs omit is exactly the one an agent
cannot invent.

Keys under a free-form section are not listed: the page states that `i18n` is a
locale map and `permissions` a list of strings, so their contents have nothing
to be documented against.

| Key path | In how many samples |
| --- | --- |
| `app.appIdType` | 1 of 33 |
| `app.extraInfo` | 1 of 33 |
| `app.extraInfo.fromZoom` | 1 of 33 |
| `app.extraInfo.madeBy` | 1 of 33 |
| `app.extType` | 4 of 33 |
| `designWidth` | 1 of 33 |
| `module` | 1 of 33 |
| `module.watchface` | 1 of 33 |
| `module.watchface.editable` | 1 of 33 |
| `module.watchface.hightCost` | 1 of 33 |
| `module.watchface.lockscreen` | 1 of 33 |
| `module.watchface.main` | 1 of 33 |
| `module.watchface.path` | 1 of 33 |
| `packageInfo` | 1 of 33 |
| `packageInfo.expiredTime` | 1 of 33 |
| `packageInfo.mode` | 1 of 33 |
| `packageInfo.timeStamp` | 1 of 33 |
| `packageInfo.zpm` | 1 of 33 |
| `platforms` | 1 of 33 |
| `platforms.deviceSource` | 1 of 33 |
| `platforms.name` | 1 of 33 |
| `targets.*.module.app-event.path` | 1 of 33 |
| `targets.*.module.app-service.services` | 2 of 33 |
| `targets.*.module.app-widget.widgets.icon` | 1 of 33 |
| `targets.*.module.app-widget.widgets.name` | 1 of 33 |
| `targets.*.module.app-widget.widgets.path` | 1 of 33 |
| `targets.*.module.app-widget.widgets.runtime` | 1 of 33 |
| `targets.*.module.app-widget.widgets.runtime.type` | 1 of 33 |
| `targets.*.module.data-widget` | 6 of 33 |
| `targets.*.module.data-widget.widgets` | 6 of 33 |
| `targets.*.module.data-widget.widgets.icon` | 6 of 33 |
| `targets.*.module.data-widget.widgets.name` | 6 of 33 |
| `targets.*.module.data-widget.widgets.path` | 6 of 33 |
| `targets.*.module.data-widget.widgets.runtime` | 6 of 33 |
| `targets.*.module.data-widget.widgets.runtime.ability` | 6 of 33 |
| `targets.*.module.data-widget.widgets.runtime.ability.name` | 2 of 33 |
| `targets.*.module.data-widget.widgets.runtime.ability.subType` | 6 of 33 |
| `targets.*.module.data-widget.widgets.runtime.ability.type` | 6 of 33 |
| `targets.*.module.data-widget.widgets.window` | 4 of 33 |
| `targets.*.module.data-widget.widgets.window.isPinned` | 4 of 33 |
| `targets.*.module.secondary-widget.widgets` | 1 of 33 |
| `targets.*.module.secondary-widget.widgets.icon` | 1 of 33 |
| `targets.*.module.secondary-widget.widgets.name` | 1 of 33 |
| `targets.*.module.secondary-widget.widgets.path` | 1 of 33 |
| `targets.*.module.secondary-widget.widgets.runtime` | 1 of 33 |
| `targets.*.module.secondary-widget.widgets.runtime.type` | 1 of 33 |
| `targets.*.module.watchface.hightCost` | 1 of 33 |
| `targets.*.platforms.dw` | 11 of 33 |

## Documented keys no sample uses

Not a claim that they do not work — the samples are 33 apps, not the whole
surface. It is a claim that this base has no working example of them, which is
what an agent should be told before it writes one.

- `app.venderId`
- `runtime.type`
- `targets.*.module.shortcut`
- `targets.*.module.shortcut.appId`
- `targets.*.module.shortcut.appLangType`
- `targets.*.module.shortcut.params`
- `targets.*.module.shortcut.path`
- `targets.*.module.shortcut.scheme`
- `targets.*.module.watch-widget`
- `targets.*.module.watch-widget.widgets`
- `targets.*.module.watchface.photoscreen`
- `targets.*.platforms.sr`

## Keys named but never described

Typed as an object in a table on the page, and given no section anywhere on
it. The gap is upstream, not in this extraction. Each names a feature an
agent cannot configure from the documentation alone; where a sample declares
one, its real shape is in the observed keys above.

| Key | Type | Description |
| --- | --- | --- |
| `targets.*.module.secondary-widget` | `object` | The configuration of SecondaryWidget. |
| `targets.*.module.app-service` | `object` | The configuration of Background Service. |
| `targets.*.module.app-event` | `object` | The configuration of System Event Listening. |

## `permissions`: what goes in the array

The page documents `permissions` as a list of strings and never says which
strings. Two sources do: a symbol's own documentation states the permission it
needs, and a working manifest declares one. Both are joined here.

A permission a symbol needs and `app.json` omits fails **at runtime**, not at
build — the worst class of error to hand an agent.

| Permission | Symbols that state it | Samples declaring it |
| --- | --- | --- |
| `data:os.device.info` | `@zos/device.getDeviceInfo` | 20 of 33 |
| `data:user.hd.body_temp` | `@zos/sensor.BodyTemperature` | 0 of 33 |
| `data:user.hd.calorie` | `@zos/sensor.Calorie` | 4 of 33 |
| `data:user.hd.distance` | `@zos/sensor.Distance` | 1 of 33 |
| `data:user.hd.fat_burning` | `@zos/sensor.FatBurning` | 1 of 33 |
| `data:user.hd.heart_rate` | `@zos/sensor.HeartRate` | 3 of 33 |
| `data:user.hd.pai` | `@zos/sensor.Pai` | 1 of 33 |
| `data:user.hd.sleep` | `@zos/sensor.Sleep` | 4 of 33 |
| `data:user.hd.spo2` | `@zos/sensor.BloodOxygen` | 3 of 33 |
| `data:user.hd.stand` | `@zos/sensor.Stand` | 1 of 33 |
| `data:user.hd.step` | `@zos/sensor.Step` | 1 of 33 |
| `data:user.hd.stress` | `@zos/sensor.Stress` | 3 of 33 |
| `data:user.hd.workout` | `@zos/app-access.getSportData`, `@zos/sensor.Workout` | 2 of 33 |
| `data:user.health` | `@zos/user.addHealthData` | 0 of 33 |
| `data:user.info` | `@zos/user.getProfile` | 0 of 33 |
| `device:os.accelerometer` | `@zos/sensor.Accelerometer` | 2 of 33 |
| `device:os.alarm` | `@zos/alarm.cancel`, `@zos/alarm.getAllAlarms`, `@zos/alarm.set` | 3 of 33 |
| `device:os.barometer` | `@zos/sensor.Barometer` | 0 of 33 |
| `device:os.bg_service` | `@zos/app-service.exit`, `@zos/app-service.getAllAppServices`, `@zos/app-service.start`, `@zos/app-service.stop`, `@zos/global.AppService` | 2 of 33 |
| `device:os.ble` | *none in this base* | 3 of 33 |
| `device:os.compass` | `@zos/sensor.Compass` | 2 of 33 |
| `device:os.geolocation` | `@zos/sensor.Geolocation` | 3 of 33 |
| `device:os.gyroscope` | `@zos/sensor.Gyroscope` | 2 of 33 |
| `device:os.input.method` | *none in this base* | 2 of 33 |
| `device:os.local_storage` | `@zos/storage.localStorage`, `@zos/storage.localStorage-instance`, `@zos/storage.ShareLocalStorage` | 12 of 33 |
| `device:os.notification` | `@zos/notification.cancel`, `@zos/notification.getAllNotifications`, `@zos/notification.notify` | 3 of 33 |
| `event:customize.test` | *none in this base* | 2 of 33 |
| `event:os.bp.expires` | *none in this base* | 2 of 33 |
| `event:os.bp.high` | *none in this base* | 2 of 33 |
| `event:os.bp.low` | *none in this base* | 2 of 33 |
| `event:os.health.heart_rate_abnl` | *none in this base* | 2 of 33 |
| `event:os.health.sleep_status` | *none in this base* | 2 of 33 |
| `event:os.system.no_disturb` | *none in this base* | 2 of 33 |
| `event:os.system.power_saving` | *none in this base* | 2 of 33 |
| `event:os.system.theater_mode` | *none in this base* | 2 of 33 |
| `event:os.weather.sun_rise` | *none in this base* | 2 of 33 |
| `event:os.weather.sun_set` | *none in this base* | 2 of 33 |
| `gps` | *none in this base* | 4 of 33 |

## `targets`: which devices to build for

`targets.<name>.platforms[].deviceSource` takes a device id. The ids, per
device and with the API_LEVEL each device reaches, are in
[`../compatibility/devices.md`](../compatibility/devices.md) — that page is the
device join and is not restated here.

## A complete `app.json`

The page's own worked example, verbatim. It configures three devices only;
the caution beside it upstream says the rest have to be added by hand.

```js
{
  "configVersion": "v2",
  "app": {
    "appId": 1000000,
    "appName": "Calories",
    "appType": "app",
    "version": {
      "code": 1,
      "name": "1.0.0"
    },
    "icon": "icon.png",
    "vender": "huami",
    "description": ""
  },
  "permissions": [],
  "runtime": {
    "apiVersion": {
      "compatible": "1.0.0",
      "target": "1.0.1",
      "minVersion": "1.0.0"
    }
  },
  "targets": {
    "gtr-3-pro": {
      "module": {
        "page": {
          "pages": [
            "page/gtr-3/index",
            "page/gtr-3/foodList"
          ]
        }
      },
      "platforms": [{
        "name": "gtr3pro",
        "deviceSource": 229
      }, {
        "name": "gtr3pro",
        "deviceSource": 230
      }],
      "designWidth": 480
    },
    "gtr-3": {
      "module": {
        "page": {
          "pages": [
            "page/gtr-3/index",
            "page/gtr-3/foodList"
          ]
        }
      },
      "platforms": [{
        "name": "gtr3",
        "deviceSource": 226
      }, {
        "name": "gtr3",
        "deviceSource": 227
      }],
      "designWidth": 480
    },
    "gts-3": {
      "module": {
        "page": {
          "pages": [
            "page/gts-3/index",
            "page/gts-3/foodList"
          ]
        }
      },
      "platforms": [{
        "name": "gts3",
        "deviceSource": 224
      }, {
        "name": "gts3",
        "deviceSource": 225
      }],
      "designWidth": 390
    }
  },
  "i18n": {
    "zh-CN": {
      "appName": "卡路里"
    },
    "ar-EG": {
      "appName": "السعرات الحرارية"
    },
    "ca-ES": {
      "appName": "Calories"
    },
    "cs": {
      "appName": "Kalorie"
    },
    "da-DK": {
      "appName": "Kalorier"
    },
    "de-DE": {
      "appName": "Kalorien"
    },
    "el": {
      "appName": "Θερμίδες"
    },
    "en-US": {
      "appName": "Calories"
    },
    "es-ES": {
      "appName": "Calorías"
    },
    "fi": {
      "appName": "Kalorit"
    },
    "fr-FR": {
      "appName": "Calories"
    },
    "he": {
      "appName": "קלוריות"
    },
    "hi": {
      "appName": "कैलोरी"
    },
    "hu-HU": {
      "appName": "Kalória"
    },
    "id-ID": {
      "appName": "Kalori"
    },
    "it-IT": {
      "appName": "Calorie"
    },
    "ja-JP": {
      "appName": "カロリー"
    },
    "ko-KR": {
      "appName": "칼로리"
    },
    "mr": {
      "appName": "कॅलरीज"
    },
    "nb-NO": {
      "appName": "Kalorier"
    },
    "nl": {
      "appName": "Calorieën"
    },
    "pl-PL": {
      "appName": "Kalorie"
    },
    "pt": {
      "appName": "Calorias"
    },
    "pt-BR": {
      "appName": "Calorias"
    },
    "ro": {
      "appName": "Calorii"
    },
    "ru-RU": {
      "appName": "Калории"
    },
    "sk": {
      "appName": "Kalórie"
    },
    "sr": {
      "appName": "Калорије"
    },
    "sv-SE": {
      "appName": "Kalorier"
    },
    "th-TH": {
      "appName": "แคลอรี"
    },
    "tr-TR": {
      "appName": "Kalori"
    },
    "uk": {
      "appName": "Калорії"
    },
    "vi": {
      "appName": "Calo"
    },
    "zh-TW": {
      "appName": "卡路里"
    }
  },
  "defaultLanguage": "en-US"
}
```
— `zeppos-docs/docs/reference/app-json.mdx`, line 361

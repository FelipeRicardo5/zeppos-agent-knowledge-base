# 4.0-feature

**4.0 Feature** — A sample application about the new features of 4.0

A Mini Program sample
for platform 4.0. Runtimes present: Device App.

Source: `zeppos-samples/application/4.0/4.0-feature`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Installs on: target `4.0`, minVersion `4.0`, compatible `4.0` — this field is the API_LEVEL, not a semver.

Permissions: `data:os.device.info`, `data:user.hd.heart_rate`, `data:user.hd.sleep`, `data:user.hd.spo2`, `data:user.hd.stress`, `data:user.hd.workout`, `device:os.accelerometer`, `device:os.alarm`, `device:os.bg_service`, `device:os.ble`, `device:os.compass`, `device:os.geolocation`, `device:os.gyroscope`, `device:os.notification`, `event:customize.test`, `event:os.bp.expires`, `event:os.bp.high`, `event:os.bp.low`, `event:os.health.heart_rate_abnl`, `event:os.health.sleep_status`, `event:os.system.no_disturb`, `event:os.system.power_saving`, `event:os.system.theater_mode`, `event:os.weather.sun_rise`, `event:os.weather.sun_set`

Targets: `default` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `page` | `page/index` | `pages` | `page/index.js` | Device App | `default` |
| `page` | `page/TC/TC_01/index` | `pages` | `page/TC/TC_01/index.js` | Device App | `default` |
| `page` | `page/TC/TC_02/index` | `pages` | `page/TC/TC_02/index.js` | Device App | `default` |
| `page` | `page/TC/TC_03/index` | `pages` | `page/TC/TC_03/index.js` | Device App | `default` |

## Files

**Device App** — `app.js`, `page/index.js`, `page/index.r.layout.js`, `page/TC/TC_01/index.js`, `page/TC/TC_01/index.r.layout.js`, `page/TC/TC_02/index.js`, `page/TC/TC_02/index.r.layout.js`, `page/TC/TC_03/index.js`, `page/TC/TC_03/index.r.layout.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
export const sysUIFocusIsEnable = ((getDeviceInfo().keyType.indexOf('sport') !== -1) || (getDeviceInfo().keyNumber === 4));
```
— `zeppos-samples/application/4.0/4.0-feature/page/index.r.layout.js`, line 74

```js
export const sysScreenIsSquare = (getDeviceInfo().screenShape == SCREEN_SHAPE_SQUARE)
```
— `zeppos-samples/application/4.0/4.0-feature/page/index.r.layout.js`, line 75

### `@zos/router.push`

```js
fill_rect_list.push(btn);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 33

```js
fill_rect_list.push(btn);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 58

### `@zos/ui.createWidget`

```js
let root_container = createWidget(widget.VIRTUAL_CONTAINER, { layout: Styles.BUTTON_ROOT_CONTAINER_STYLE });
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 20

```js
createWidget(widget.FILL_RECT, { parent: root_container, ...Styles.BACKGROUND_FILL_STYLE });
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 22

### `@zos/ui.deleteWidget`

```js
deleteWidget(btn);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 70

```js
deleteWidget(fill_rect_widget);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_02/index.js`, line 61

### `@zos/ui.dumpLayout`

```js
dumpLayout("layout.txt");
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 113

```js
dumpLayout("layout.txt");
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_02/index.js`, line 83

### `@zos/ui.updateLayout`

```js
updateLayout();
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 59

```js
updateLayout();
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 71

### `@zos/utils.EventBus`

```js
devEvent: new EventBus(),
```
— `zeppos-samples/application/4.0/4.0-feature/app.js`, line 8

### `@zos/utils.log`

```js
logger.log("app onCreate");
```
— `zeppos-samples/application/4.0/4.0-feature/app.js`, line 11

```js
logger.log("app onDestroy");
```
— `zeppos-samples/application/4.0/4.0-feature/app.js`, line 14

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.createWidget()` — `@zos/ui.createWidget`

```js
let root_container = createWidget(widget.VIRTUAL_CONTAINER, { layout: Styles.BUTTON_ROOT_CONTAINER_STYLE });
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 20

```js
createWidget(widget.FILL_RECT, { parent: root_container, ...Styles.BACKGROUND_FILL_STYLE });
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 22

### `.getLogger()` — `@zos/utils.log`

```js
const logger = log.getLogger("app");
```
— `zeppos-samples/application/4.0/4.0-feature/app.js`, line 4

### `.setProperty()` — `@zos/ui.setProperty`

```js
layout_show.setProperty(prop.TEXT, text_show);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 118

```js
layout_show.setProperty(prop.TEXT, "tags:newtrack");
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 139

### `.toPixel()` *(no record in this KB)*

```js
w: "100vw".toPixel(),
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.r.layout.js`, line 6

```js
h: "120".toPixel(),
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.r.layout.js`, line 7

### `.updateLayoutStyle()` — `@zos/ui.updateLayoutStyle`

```js
root_container.updateLayoutStyle({ x: "0", y: "9vh", width: "100vw", height: String(style_height) + "vh" });
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 84

```js
group_root.updateLayoutStyle(flex_layout);
```
— `zeppos-samples/application/4.0/4.0-feature/page/TC/TC_01/index.js`, line 111

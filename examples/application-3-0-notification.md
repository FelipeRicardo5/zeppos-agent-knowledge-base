# notification

A Mini Program sample
for platform 3.0. Runtimes present: Device App.

Source: `zeppos-samples/application/3.0/notification`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.alarm`, `device:os.notification`

Targets: `gt` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app-service/delay.js`, `app-service/index.js`, `app.js`, `page/index.js`, `page/index.r.layout.js`, `utils/constants.js`

## Imported symbols, called

### `@zos/app.getPackageInfo`

```js
const { appId } = getPackageInfo();
```
— `zeppos-samples/application/3.0/notification/app-service/delay.js`, line 12

### `@zos/device.getDeviceInfo`

```js
export const DEVICE_INFO = getDeviceInfo();
```
— `zeppos-samples/application/3.0/notification/utils/constants.js`, line 3

### `@zos/i18n.getText`

```js
title: getText("title"),
```
— `zeppos-samples/application/3.0/notification/app-service/index.js`, line 14

```js
content: getText("content"),
```
— `zeppos-samples/application/3.0/notification/app-service/index.js`, line 15

### `@zos/utils.log`

```js
logger.log("delay onInit=", params);
```
— `zeppos-samples/application/3.0/notification/app-service/delay.js`, line 8

```js
logger.log("index onInit=", params);
```
— `zeppos-samples/application/3.0/notification/app-service/index.js`, line 9

### `@zos/utils.px`

```js
x: px(56),
```
— `zeppos-samples/application/3.0/notification/page/index.r.layout.js`, line 6

```js
y: px(240),
```
— `zeppos-samples/application/3.0/notification/page/index.r.layout.js`, line 7

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.BUTTON, {
  ...Styles.BTN_STYLE,
  click_func: () => {
    notificationMgr.notify({
      title: getText("title"),
      content: getText("content"),
      actions: [
        {
          text: getText("later_min", 1),
          file: "app-service/delay",
          param: "",
        },
```
— `zeppos-samples/application/3.0/notification/page/index.js`, line 8

### `.notify()` — likely `@zos/notification.notify`

```js
notificationMgr.notify({
  title: getText("title"),
  content: getText("content"),
  actions: [],
  vibrate: 6,
});
```
— `zeppos-samples/application/3.0/notification/app-service/index.js`, line 13

```js
notificationMgr.notify({
  title: getText("title"),
  content: getText("content"),
  actions: [
    {
      text: getText("later_min", 1),
      file: "app-service/delay",
      param: "",
    },
  ],
  vibrate: 6,
});
```
— `zeppos-samples/application/3.0/notification/page/index.js`, line 11

### `.set()` — likely `@zos/alarm.set`

```js
alarmMgr.set(alarm);
```
— `zeppos-samples/application/3.0/notification/app-service/delay.js`, line 23

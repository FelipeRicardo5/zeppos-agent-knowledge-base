# fetch-api

A Mini Program sample
for platform 2.0. Runtimes present: Device App, Side Service.

Source: `zeppos-samples/application/2.0/fetch-api`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `common` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `pages/index.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/es6-promise.js`, `shared/event.js`, `shared/message-side.js`, `shared/message.js`, `utils/config/constants.js`, `utils/config/device.js`

**Side Service** — `app-side/index.js`

## Imported symbols, called

### `@zos/app.getPackageInfo`

```js
const { appId } = getPackageInfo();
```
— `zeppos-samples/application/2.0/fetch-api/app.js`, line 12

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/fetch-api/utils/config/device.js`, line 2

### `@zos/ui.createWidget`

```js
createWidget(widget.BUTTON, {
  x: (DEVICE_WIDTH - px(400)) / 2,
  y: px(260),
  w: px(400),
  h: px(100),
  text_size: px(36),
  radius: px(12),
  normal_color: DEFAULT_COLOR,
  press_color: DEFAULT_COLOR_TRANSPARENT,
  text: "Fetch Data",
  click_func: (button_widget) => {
    logger.log("click button");
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 15

```js
createWidget(widget.TEXT, {
  x: px(56),
  y: px(74),
  w: DEVICE_WIDTH - 2 * px(56),
  h: px(200),
  color: 0xffffff,
  text_size: px(36),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text
})
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 41

### `@zos/utils.log`

```js
logger.log("click button");
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 26

```js
logger.log("receive data");
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 37

### `@zos/utils.px`

```js
x: (DEVICE_WIDTH - px(400)) / 2,
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 16

```js
y: px(260),
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 17

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
messaging.peerSocket.addListener('message', (message) => {
  DEBUG && logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 287

```js
messaging.peerSocket.addListener('message', (message) => {
  DEBUG && logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/2.0/fetch-api/shared/message.js`, line 293

### `.clear()` — likely `settings-storage.clear`

```js
this.map.clear()
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 29

```js
clear() {
  this.sessions.clear()
}
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 202

### `.createConnect()` — likely `@zos/ble.createConnect`

```js
this.ble.createConnect((index, data, size) => {
  DEBUG && logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 263

```js
this.ble.createConnect((index, data, size) => {
  DEBUG && logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/2.0/fetch-api/shared/message.js`, line 269

### `.disConnect()` — likely `@zos/ble.disConnect`

```js
this.globalData.messageBuilder.disConnect();
```
— `zeppos-samples/application/2.0/fetch-api/app.js`, line 26

```js
disConnect(cb) {
  logger.debug('app ble disconnect')
  this.sendClose()
  this.off('message')
  this.ble && this.ble.disConnect()

  cb && cb(this)
}
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 272

### `.send()` — likely `@zos/ble.send` or `messaging.send`

```js
xhr.send();
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 814

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 429

### `.set()` — likely `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 175

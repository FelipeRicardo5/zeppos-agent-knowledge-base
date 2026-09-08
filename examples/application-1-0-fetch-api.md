# fetch-api

A Mini Program sample
for platform 1.0. Runtimes present: Device App, Side Service.

Source: `zeppos-samples/application/1.0/fetch-api`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `pages/index.js`, `shared/buffer.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/event.js`, `shared/fs.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/message.js`, `shared/promise.js`, `shared/setTimeout.js`, `utils/config/constants.js`, `utils/config/device.js`

**Side Service** — `app-side/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
messaging.peerSocket.addListener('message', (message) => {
  // logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, this.bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 229

### `.clear()` — likely `settings-storage.clear`

```js
this.map.clear()
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 29

```js
clear() {
  this.sessions.clear()
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 159

### `.clearTimeout()` — likely `@zos/global.clearTimeout`

```js
globalNS.clearTimeout = function clearTimeout(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 7

```js
globalNS.clearTimeout(timer1)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 16

### `.createConnect()` — likely `@zos/ble.createConnect`

```js
hmBle.createConnect((index, data, size) => {
  // logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, this.bin2hex(data))
  console.log('createConnect-------', size)
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 208

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.BUTTON, {
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
— `zeppos-samples/application/1.0/fetch-api/pages/index.js`, line 13

```js
hmUI.createWidget(hmUI.widget.TEXT, {
  x: px(56),
  y: px(74),
  w: DEVICE_WIDTH - 2 * px(56),
  h: px(200),
  color: 0xffffff,
  text_size: px(36),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
  text: text,
});
```
— `zeppos-samples/application/1.0/fetch-api/pages/index.js`, line 39

### `.disConnect()` — likely `@zos/ble.disConnect`

```js
this.globalData.messageBuilder.disConnect();
```
— `zeppos-samples/application/1.0/fetch-api/app.js`, line 25

```js
disConnect(cb) {
  // logger.debug('app ble disconnect')
  this.sendClose()
  this.off('message')
  hmBle && hmBle.disConnect()

  cb && cb(this)
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 218

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/fetch-api/utils/config/device.js`, line 2

### `.readdirSync()` — likely `@zos/fs.readdirSync`

```js
export function readdirSync(path, options) {
  logger.log('readdirSync begin -->', path)
  hmFS.readdirSync(path)
  logger.log('readdirSync success -->', path)
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 124

```js
hmFS.readdirSync(path)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 126

### `.send()` — likely `@zos/ble.send` or `messaging.send`

```js
hmBle.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 388

```js
messaging.peerSocket.send(buf.buffer)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 394

### `.set()` — likely `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 142

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 26

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSideService()` *(no record in this KB)*

```js
AppSideService({
  onInit() {
    messageBuilder.listen(() => { });

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.method === "GET_DATA") {
        return fetchData(ctx);
      }
    });
  },
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 44

### `fetch()` — recorded as `fetch.fetch`

```js
// const res = await fetch({
//   url: 'https://xxx.com/api/xxx',
//   method: 'GET'
// })
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 10

```js
// const res = await fetch({
//   url: 'https://xxx.com/api/xxx',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     text: 'Hello Zepp OS'
//   })
// })
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 15

### `fetchData()` *(no record in this KB)*

```js
async function fetchData(ctx) {
  try {
    // Requesting network data using the fetch API
    // The sample program is for simulation only and does not request real network data, so it is commented here
    // Example of a GET method request
    // const res = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'GET'
    // })
    // Example of a POST method request
    // const res = await fetch({
    //   url: 'https://xxx.com/api/xxx',
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 5

```js
return fetchData(ctx);
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 51

### `MessageBuilder()` *(no record in this KB)*

```js
const messageBuilder = new MessageBuilder();
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 3

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() { },
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 58

### `onRun()` *(no record in this KB)*

```js
onRun() { },
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 56

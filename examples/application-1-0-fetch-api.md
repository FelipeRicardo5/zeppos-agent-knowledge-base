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

Builds for: `deviceSource` `224`, `225`, `226`, `227`, `229`, `230`, `418`, `419`, `7995648`, `7995649` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `pages/index.js`, `shared/buffer.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/event.js`, `shared/fs.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/message.js`, `shared/promise.js`, `shared/setTimeout.js`, `utils/config/constants.js`, `utils/config/device.js`

**Side Service** — `app-side/index.js`

## Messages passed between runtimes

Sites that write the same string literal in more than one of this app's
runtimes. **That shared literal is the only thing grouping them** — no import,
symbol or declaration in these files connects a call to a handler, so nothing
below says one reaches the other. Both citations are here; the conclusion is
the reader's.

### `"GET_DATA"`

**side-service** — comparison

```js
if (jsonRpc.method === "GET_DATA") {
  return fetchData(ctx);
}
```
— `zeppos-samples/application/1.0/fetch-api/app-side/index.js`, line 50

**device-app** — call argument

```js
method: "GET_DATA",
```
— `zeppos-samples/application/1.0/fetch-api/pages/index.js`, line 32

### What a message carries

Verbatim lines, never a synthesised signature: a type nothing declares would
be this base inventing one.

```js
this.onMessage(message)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 204

```js
this.onMessage(message)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 231

```js
onMessage(messagePayload) {
  const payload = this.readPayload(messagePayload)
  let session = this.sessionMgr.getById(payload.traceId, payload.payloadType)

  if (!session) {
    session = this.sessionMgr.newSession(payload.traceId, payload.payloadType, this)

    session.on('data', (fullPayload) => {
      if (fullPayload.opCode === MessagePayloadOpCode.Finished) {
        if (fullPayload.payloadType === MessagePayloadType.Request) {
          this.emit('request', {
            request: fullPayload,
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 748

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `._immediateFn()` *(no record in this KB)*

```js
Promise._immediateFn(function () {
  var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
  if (cb === null) {
    ;(self._state === 1 ? resolve : reject)(deferred.promise, self._value)
    return
  }
  var ret
  try {
    ret = cb(self._value)
  } catch (e) {
    reject(deferred.promise, e)
    return
```
— `zeppos-samples/application/1.0/fetch-api/shared/promise.js`, line 125

```js
Promise._immediateFn(function () {
  if (!self._handled) {
    Promise._unhandledRejectionFn(self._value)
  }
})
```
— `zeppos-samples/application/1.0/fetch-api/shared/promise.js`, line 174

### `._unhandledRejectionFn()` *(no record in this KB)*

```js
Promise._unhandledRejectionFn(self._value)
```
— `zeppos-samples/application/1.0/fetch-api/shared/promise.js`, line 176

```js
Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.log('[jsfwk.error  ] Possible Unhandled Promise Rejection:', err) // eslint-disable-line no-console
  }
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/promise.js`, line 320

### `.addListener()` — **ambiguous**: module `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
messaging.peerSocket.addListener('message', (message) => {
  // logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, this.bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 229

### `.clearImmediate()` *(no record in this KB)*

```js
globalNS.clearImmediate = function clearImmediate(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 25

```js
globalNS.clearImmediate(timer1)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 34

### `.clearTimeout()` — `@zos/global.clearTimeout`

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

### `.close()` *(no record in this KB)*

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 55

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 79

### `.copy()` *(no record in this KB)*

```js
dataBin.copy(tailBuf, headerSize, offset, offset + tailSize)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 439

```js
dataBin.copy(_buf, headerSize, offset, offset + dataSize)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 454

### `.createConnect()` — `@zos/ble.createConnect`

```js
hmBle.createConnect((index, data, size) => {
  // logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, this.bin2hex(data))
  console.log('createConnect-------', size)
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 208

### `.createTimer()` *(no record in this KB)*

```js
const timer1 = timer.createTimer(
  ns || 1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearTimeout(timer1)
    func && func()
  },
  {},
)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 12

```js
const timer1 = timer.createTimer(
  1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearImmediate(timer1)
    func && func()
  },
  {},
)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 30

### `.createWidget()` — `@zos/ui.createWidget`

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

### `.delete()` *(no record in this KB)*

```js
this.map.delete(type)
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 26

```js
this.sessions.delete(this.key(session))
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 148

### `.get()` *(no record in this KB)*

```js
this.map.get(type).push(cb)
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 8

```js
const cbs = this.map.get(type)
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 17

### `.getDeviceInfo()` — `@zos/device.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/fetch-api/utils/config/device.js`, line 2

### `.getLogger()` — `@zos/utils.log`

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
```
— `zeppos-samples/application/1.0/fetch-api/pages/index.js`, line 7

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger('fs.js')
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 1

### `.mkdir()` *(no record in this KB)*

```js
hmFS.mkdir(path)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 115

### `.open()` *(no record in this KB)*

```js
const file = hmFS.open(filename, hmFS.O_CREAT | hmFS.O_RDWR | hmFS.O_TRUNC)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 48

```js
const file = hmFS.open(filename, hmFS.O_RDONLY)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 73

### `.packageInfo()` *(no record in this KB)*

```js
appId = hmApp.packageInfo().appId;
```
— `zeppos-samples/application/1.0/fetch-api/app.js`, line 15

### `.read()` *(no record in this KB)*

```js
hmFS.read(file, destination_buf.buffer, 0, fs_stat.size)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 77

### `.readdirSync()` — `@zos/fs.readdirSync`

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

### `.remove()` — **ambiguous**: called on `@zos/storage.ShareTypedStorage` or `@zos/storage.TypedStorage`

```js
const result = hmFS.remove(filename)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 93

### `.rename()` *(no record in this KB)*

```js
hmFS.rename(oldFilename, newFilename)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 104

### `.seek()` — `@zos/media.Player`

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 51

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 75

### `.send()` — **ambiguous**: module `@zos/ble.send` or `messaging.send`

```js
hmBle.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 388

```js
messaging.peerSocket.send(buf.buffer)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 394

### `.sendMsg()` *(no record in this KB)*

```js
this.sendMsg(shake)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 285

```js
this.sendMsg(close)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 306

### `.set()` — `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/1.0/fetch-api/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/1.0/fetch-api/shared/message.js`, line 142

### `.stat()` *(no record in this KB)*

```js
const [fs_stat, err] = hmFS.stat(filename)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 24

### `.stopTimer()` — `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/fetch-api/shared/setTimeout.js`, line 26

### `.write()` *(no record in this KB)*

```js
hmFS.write(file, source_buf.buffer, 0, source_buf.length)
```
— `zeppos-samples/application/1.0/fetch-api/shared/fs.js`, line 53

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

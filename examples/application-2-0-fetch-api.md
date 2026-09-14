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

Builds for: `deviceSource` `7930112`, `7930113`, `7995648`, `7995649` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `pages/index.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/es6-promise.js`, `shared/event.js`, `shared/message-side.js`, `shared/message.js`, `utils/config/constants.js`, `utils/config/device.js`

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
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 50

**device-app** — call argument

```js
method: "GET_DATA",
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 34

### What a message carries

Verbatim lines, never a synthesised signature: a type nothing declares would
be this base inventing one.

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 259

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 289

```js
onMessage(messagePayload) {
  const payload = this.readPayload(messagePayload)
  let session = this.sessionMgr.getById(payload.traceId, payload.payloadType)

  if (!session) {
    session = this.sessionMgr.newSession(payload.traceId, payload.payloadType, this)

    // TODO: 需要考虑缓冲，监听回调要放到启动之前，或者没有增加监听就缓存请求
    session.on('data', (fullPayload) => {
      if (fullPayload.opCode === MessagePayloadOpCode.Finished) {
        if (fullPayload.payloadType === MessagePayloadType.Request) {
          this.emit('request', {
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 858

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message.js`, line 265

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message.js`, line 295

```js
onMessage(messagePayload) {
  const payload = this.readPayload(messagePayload)
  let session = this.sessionMgr.getById(payload.traceId, payload.payloadType)

  if (!session) {
    session = this.sessionMgr.newSession(payload.traceId, payload.payloadType, this)

    // TODO: 需要考虑缓冲，监听回调要放到启动之前，或者没有增加监听就缓存请求
    session.on('data', (fullPayload) => {
      if (fullPayload.opCode === MessagePayloadOpCode.Finished) {
        if (fullPayload.payloadType === MessagePayloadType.Request) {
          this.emit('request', {
```
— `zeppos-samples/application/2.0/fetch-api/shared/message.js`, line 864

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
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `._eachEntry()` *(no record in this KB)*

```js
this._eachEntry(input[i], i);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 492

```js
Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;


  if (resolve$$1 === resolve$1) {
    var _then = void 0;
    var error = void 0;
    var didError = false;
    try {
      _then = entry.then;
    } catch (e) {
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 496

### `._enumerate()` *(no record in this KB)*

```js
this._enumerate(input);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 480

```js
Enumerator.prototype._enumerate = function _enumerate(input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 490

### `._onerror()` *(no record in this KB)*

```js
promise._onerror(promise._result);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 327

### `._setScheduler()` *(no record in this KB)*

```js
Promise._setScheduler(function (flush) {
  flush && flush()
})
```
— `zeppos-samples/application/2.0/fetch-api/shared/device-polyfill.js`, line 4

### `._settledAt()` *(no record in this KB)*

```js
this._settledAt(entry._state, i, entry._result);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 513

```js
Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
  var promise = this.promise;


  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 535

### `._willSettleAt()` *(no record in this KB)*

```js
this._willSettleAt(promise, i);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 524

```js
this._willSettleAt(new c(function (resolve$$1) {
  return resolve$$1(entry);
}), i);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 526

### `.addListener()` — **ambiguous**: module `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

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

### `.copy()` *(no record in this KB)*

```js
dataBin.copy(tailBuf, headerSize, offset, offset + tailSize)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 480

```js
dataBin.copy(_buf, headerSize, offset, offset + hmDataSize)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 502

### `.createConnect()` — `@zos/ble.createConnect`

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

### `.createTextNode()` *(no record in this KB)*

```js
var node = document.createTextNode('');
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 94

### `.delete()` *(no record in this KB)*

```js
this.map.delete(type)
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 26

```js
this.sessions.delete(this.key(session))
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 181

### `.errorIfBleDisconnect()` *(no record in this KB)*

```js
this.errorIfBleDisconnect()
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 474

```js
errorIfBleDisconnect() { }
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 856

### `.get()` *(no record in this KB)*

```js
this.map.get(type).push(cb)
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 8

```js
const cbs = this.map.get(type)
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 17

### `.getLogger()` — `@zos/utils.log`

```js
const logger = Logger.getLogger("fetch_api");
```
— `zeppos-samples/application/2.0/fetch-api/pages/index.js`, line 9

```js
logger = Logger.getLogger('side-message')
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 8

### `.isBuffer()` *(no record in this KB)*

```js
if (Buffer.isBuffer(data)) {
  this.sendBuf({
    requestId,
    buf: data,
    type: MessagePayloadType.Request,
    contentType: MessagePayloadDataTypeOp.BIN,
    dataType: getDataType(opts.dataType)
  })
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
  this.sendBuf({
    requestId,
    buf: Buffer.from(data),
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 952

```js
if (Buffer.isBuffer(data)) {
  this.sendBuf({
    requestId,
    buf: data,
    type: MessagePayloadType.Request,
    contentType: MessagePayloadDataTypeOp.BIN,
    dataType: getDataType(opts.dataType)
  })
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
  this.sendBuf({
    requestId,
    buf: Buffer.from(data),
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 1049

### `.isView()` *(no record in this KB)*

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 960

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 1057

### `.nextTick()` *(no record in this KB)*

```js
return process.nextTick(flush);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 76

### `.observe()` *(no record in this KB)*

```js
observer.observe(node, { characterData: true });
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 95

### `.open()` *(no record in this KB)*

```js
xhr.open('GET', url);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 810

### `.polyfill()` *(no record in this KB)*

```js
ES6Promise.polyfill()
```
— `zeppos-samples/application/2.0/fetch-api/shared/device-polyfill.js`, line 2

### `.postMessage()` *(no record in this KB)*

```js
return channel.port2.postMessage(0);
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 107

### `.require()` *(no record in this KB)*

```js
var vertx = Function('return this')().require('vertx');
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 137

### `.send()` — **ambiguous**: module `@zos/ble.send` or `messaging.send`

```js
xhr.send();
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 814

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 429

### `.sendMsg()` *(no record in this KB)*

```js
this.sendMsg(shake)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 347

```js
this.sendMsg(close)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 368

### `.set()` — `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/2.0/fetch-api/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/2.0/fetch-api/shared/message-side.js`, line 175

### `.setRequestHeader()` *(no record in this KB)*

```js
xhr.setRequestHeader('Accept', 'application/json');
```
— `zeppos-samples/application/2.0/fetch-api/shared/es6-promise.js`, line 813

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
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 44

### `fetch()` — recorded as `fetch.fetch`

```js
// const res = await fetch({
//   url: 'https://xxx.com/api/xxx',
//   method: 'GET'
// })
```
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 10

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
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 15

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
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 5

```js
return fetchData(ctx);
```
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 51

### `MessageBuilder()` *(no record in this KB)*

```js
const messageBuilder = new MessageBuilder();
```
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 3

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() { },
```
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 58

### `onRun()` *(no record in this KB)*

```js
onRun() { },
```
— `zeppos-samples/application/2.0/fetch-api/app-side/index.js`, line 56

# todo-list

**Todo List** — todo list application

A Mini Program sample
for platform 2.0. Runtimes present: Device App, Settings App, Side Service.

Source: `zeppos-samples/application/2.0/todo-list`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Installs on: target `2.0`, minVersion `2.0`, compatible `2.0` — this field is the API_LEVEL, not a semver.

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `gts` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `7930112`, `7930113`, `7995648`, `7995649` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `app-side` | `app-side/index` | `path` | `app-side/index.js` | Side Service | `gts` |
| `page` | `page/home/index.page` | `pages` | `page/home/index.page.js` | Device App | `gts` |
| `setting` | `setting/index` | `path` | `setting/index.js` | Settings App | `gts` |

Holds code under `secondary-widget/`, which other samples turn on with a `module` key and this manifest never names. Those files ship and nothing runs them.

## Files

**Device App** — `.prettierrc.js`, `app.js`, `page/home/index.page.js`, `page/home/index.style.js`, `secondary-widget/index.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/es6-promise.js`, `shared/event.js`, `shared/message-side.js`, `shared/message.js`, `utils/constants.js`, `utils/index.js`

**Settings App** — `setting/index.js`

**Side Service** — `app-side/index.js`

## Messages passed between runtimes

Sites that write the same string literal in more than one of this app's
runtimes. **That shared literal is the only thing grouping them** — no import,
symbol or declaration in these files connects a call to a handler, so nothing
below says one reaches the other. Both citations are here; the conclusion is
the reader's.

### `"ADD"`

**side-service** — comparison

```js
} else if (payload.method === 'ADD') {
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 22

**device-app** — call argument

```js
method: 'ADD'
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 70

**device-app** — call argument

```js
method: 'ADD'
```
— `zeppos-samples/application/2.0/todo-list/secondary-widget/index.js`, line 75

### `"DELETE"`

**side-service** — comparison

```js
} else if (payload.method === 'DELETE') {
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 31

**device-app** — call argument

```js
method: 'DELETE',
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 81

**device-app** — call argument

```js
method: 'DELETE',
```
— `zeppos-samples/application/2.0/todo-list/secondary-widget/index.js`, line 86

### `"GET_TODO_LIST"`

**side-service** — comparison

```js
if (payload.method === 'GET_TODO_LIST') {
  ctx.response({
    data: { result: getTodoList() }
  })
} else if (payload.method === 'ADD') {
  // 这里补充一个
  const todoList = getTodoList()
  const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))]
  settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))

  ctx.response({
    data: { result: newTodoList }
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 18

**device-app** — call argument

```js
method: 'GET_TODO_LIST'
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 58

**device-app** — call argument

```js
method: 'GET_TODO_LIST'
```
— `zeppos-samples/application/2.0/todo-list/secondary-widget/index.js`, line 63

### What a message carries

Verbatim lines, never a synthesised signature: a type nothing declares would
be this base inventing one.

```js
this.onMessage()
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 22

```js
onMessage() {
  messageBuilder.on('call', ({ payload: buf }) => {
    const data = messageBuilder.buf2Json(buf)
    const dataList = data.map((i) => ({ name: i }))
    logger.log('call dataList', dataList)
    this.refreshAndUpdate(dataList)
  })
},
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 47

```js
this.onMessage()
```
— `zeppos-samples/application/2.0/todo-list/secondary-widget/index.js`, line 22

```js
onMessage() {
  messageBuilder.on('call', ({ payload: buf }) => {
    const data = messageBuilder.buf2Json(buf)
    const dataList = data.map((i) => ({ name: i }))
    logger.log('call dataList', dataList)
    this.refreshAndUpdate(dataList)
  })
},
```
— `zeppos-samples/application/2.0/todo-list/secondary-widget/index.js`, line 52

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 277

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 309

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
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 897

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/todo-list/shared/message.js`, line 283

```js
this.onMessage(message)
```
— `zeppos-samples/application/2.0/todo-list/shared/message.js`, line 315

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
— `zeppos-samples/application/2.0/todo-list/shared/message.js`, line 903

## Imported symbols, called

### `@zos/app.getPackageInfo`

```js
const { appId } = getPackageInfo()
```
— `zeppos-samples/application/2.0/todo-list/app.js`, line 15

### `@zos/device.getDeviceInfo`

```js
if (getDeviceInfo().screenShape !== SCREEN_SHAPE_SQUARE) {
  this.state.title = createWidget(widget.TEXT, {
    ...TITLE_TEXT_STYLE
  })
}
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 28

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.style.js`, line 6

### `@zos/i18n.getText`

```js
text: getText('todoList'),
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.style.js`, line 9

```js
text: getText('add'),
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.style.js`, line 21

### `@zos/ui.createWidget`

```js
this.state.title = createWidget(widget.TEXT, {
  ...TITLE_TEXT_STYLE
})
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 29

```js
this.state.addButton = createWidget(widget.BUTTON, {
  ...ADD_BUTTON,
  click_func: () => {
    this.addRandomTodoItem()
  }
})
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 34

### `@zos/utils.log`

```js
logger.log('app onCreate invoked')
```
— `zeppos-samples/application/2.0/todo-list/app.js`, line 14

```js
logger.log('app onDestroy invoked')
```
— `zeppos-samples/application/2.0/todo-list/app.js`, line 22

### `@zos/utils.px`

```js
x: px(42),
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.style.js`, line 10

```js
y: px(65),
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.style.js`, line 11

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `._eachEntry()` *(no record in this KB)*

```js
this._eachEntry(input[i], i)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 514

```js
Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
  var c = this._instanceConstructor
  var resolve$$1 = c.resolve

  if (resolve$$1 === resolve$1) {
    var _then = void 0
    var error = void 0
    var didError = false
    try {
      _then = entry.then
    } catch (e) {
      didError = true
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 518

### `._enumerate()` *(no record in this KB)*

```js
this._enumerate(input)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 502

```js
Enumerator.prototype._enumerate = function _enumerate(input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i)
  }
}
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 512

### `._onerror()` *(no record in this KB)*

```js
promise._onerror(promise._result)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 347

### `._setScheduler()` *(no record in this KB)*

```js
Promise._setScheduler(function (flush) {
  flush && flush()
})
```
— `zeppos-samples/application/2.0/todo-list/shared/device-polyfill.js`, line 4

### `._settledAt()` *(no record in this KB)*

```js
this._settledAt(entry._state, i, entry._result)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 534

```js
Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
  var promise = this.promise

  if (promise._state === PENDING) {
    this._remaining--

    if (state === REJECTED) {
      reject(promise, value)
    } else {
      this._result[i] = value
    }
  }
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 559

### `._willSettleAt()` *(no record in this KB)*

```js
this._willSettleAt(promise, i)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 545

```js
this._willSettleAt(
  new c(function (resolve$$1) {
    return resolve$$1(entry)
  }),
  i
)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 547

### `.addListener()` — **ambiguous**: module `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
settings.settingsStorage.addListener('change', ({ key, newValue, oldValue }) => {
  messageBuilder.call(getTodoList())
})
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 13

```js
messaging.peerSocket.addListener('message', (message) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 306

### `.copy()` *(no record in this KB)*

```js
dataBin.copy(tailBuf, headerSize, offset, offset + tailSize)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 503

```js
dataBin.copy(_buf, headerSize, offset, offset + hmDataSize)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 525

### `.createConnect()` — `@zos/ble.createConnect`

```js
this.ble.createConnect((index, data, size) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 281

```js
this.ble.createConnect((index, data, size) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/2.0/todo-list/shared/message.js`, line 287

### `.createTextNode()` *(no record in this KB)*

```js
var node = document.createTextNode('')
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 100

### `.delete()` *(no record in this KB)*

```js
this.map.delete(type)
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 26

```js
this.sessions.delete(this.key(session))
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 199

### `.errorIfBleDisconnect()` *(no record in this KB)*

```js
this.errorIfBleDisconnect()
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 497

```js
errorIfBleDisconnect() {}
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 895

### `.get()` *(no record in this KB)*

```js
this.map.get(type).push(cb)
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 8

```js
const cbs = this.map.get(type)
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 17

### `.getItem()` — **ambiguous**: module `settings-storage.getItem`; called on `@zos/share-storage.LocalStorage` or `@zos/storage.localStorage` or `@zos/storage.localStorage-instance` or `@zos/storage.sessionStorage` or `@zos/storage.sessionStorage-instance` or `@zos/storage.ShareLocalStorage`

```js
return settings.settingsStorage.getItem('todoList')
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 6

```js
? JSON.parse(settings.settingsStorage.getItem('todoList'))
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 7

### `.getLogger()` — `@zos/utils.log`

```js
const logger = Logger.getLogger('todo-list-app')
```
— `zeppos-samples/application/2.0/todo-list/app.js`, line 7

```js
const logger = Logger.getLogger('todo-list-page')
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 9

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
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 991

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
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 1093

### `.isView()` *(no record in this KB)*

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 999

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 1101

### `.nextTick()` *(no record in this KB)*

```js
return process.nextTick(flush)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 82

### `.observe()` *(no record in this KB)*

```js
observer.observe(node, { characterData: true })
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 101

### `.open()` *(no record in this KB)*

```js
xhr.open('GET', url);
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 842

### `.polyfill()` *(no record in this KB)*

```js
ES6Promise.polyfill()
```
— `zeppos-samples/application/2.0/todo-list/shared/device-polyfill.js`, line 2

### `.postMessage()` *(no record in this KB)*

```js
return channel.port2.postMessage(0)
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 113

### `.require()` *(no record in this KB)*

```js
var vertx = Function('return this')().require('vertx')
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 143

### `.send()` — **ambiguous**: module `@zos/ble.send` or `messaging.send`

```js
xhr.send();
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 846

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 449

### `.sendDataWithSession()` *(no record in this KB)*

```js
this.sendDataWithSession(
  {
    traceId,
    spanId: spanId,
    seqId: genSeqId(),
    payload: tailBuf,
    type,
    opCode: MessagePayloadOpCode.Finished,
    totalLength: userDataLength,
    contentType,
    dataType
  },
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 505

```js
this.sendDataWithSession(
  {
    traceId,
    spanId: spanId,
    seqId: genSeqId(),
    payload: _buf,
    type,
    opCode: MessagePayloadOpCode.Continued,
    totalLength: userDataLength,
    contentType,
    dataType
  },
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 528

### `.sendHmProtocol()` *(no record in this KB)*

```js
sendHmProtocol(
  { requestId, dataBin, type, contentType, dataType },
  { messageType = MessageType.Data } = {}
) {
  const headerSize = 0
  const hmDataSize = HM_MESSAGE_PROTO_PAYLOAD
  const userDataLength = dataBin.byteLength

  let offset = 0
  const _buf = Buffer.alloc(hmDataSize)
  const traceId = requestId ? requestId : genTraceId()
  const spanId = genSpanId()
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 476

```js
this.sendHmProtocol({
  requestId: traceId,
  dataBin: packageBin,
  type,
  contentType,
  dataType
})
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 609

### `.sendMsg()` *(no record in this KB)*

```js
this.sendMsg(shake)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 367

```js
this.sendMsg(close)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 388

### `.set()` — `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 193

### `.setProperty()` — `@zos/ui.setProperty`

```js
this.state.refreshText && this.state.refreshText.setProperty(prop.VISIBLE, false)
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 103

```js
this.state.tipText && this.state.tipText.setProperty(prop.VISIBLE, isTip)
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 104

### `.setRequestHeader()` *(no record in this KB)*

```js
xhr.setRequestHeader('Accept', 'application/json');
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 845

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSettingsPage()` *(no record in this KB)*

```js
AppSettingsPage({
  state: {
    todoList: [],
    props: {}
  },
  addTodoList(val) {
    this.state.todoList = [...this.state.todoList, val]
    this.setItem()
  },
  editTodoList(val, index) {
    this.state.todoList[index] = val
    this.setItem()
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 3

### `AppSideService()` *(no record in this KB)*

```js
AppSideService({
  onInit() {
    messageBuilder.listen(() => {})
    settings.settingsStorage.addListener('change', ({ key, newValue, oldValue }) => {
      messageBuilder.call(getTodoList())
    })
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      if (payload.method === 'GET_TODO_LIST') {
        ctx.response({
          data: { result: getTodoList() }
        })
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 10

### `Button()` — recorded as `ui.Button`

```js
Button({
  label: gettext('delete'),
  style: {
    fontSize: '12px',
    borderRadius: '30px',
    background: '#D85E33',
    color: 'white'
  },
  onClick: () => {
    this.deleteTodoList(index)
  }
})
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 103

### `gettext()` *(no record in this KB)*

```js
label: gettext('addTodo'),
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 53

```js
label: gettext('delete'),
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 104

### `getTodoList()` *(no record in this KB)*

```js
function getTodoList() {
  return settings.settingsStorage.getItem('todoList')
    ? JSON.parse(settings.settingsStorage.getItem('todoList'))
    : [...DEFAULT_TODO_LIST]
}
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 5

```js
messageBuilder.call(getTodoList())
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 14

### `MessageBuilder()` *(no record in this KB)*

```js
const messageBuilder = new MessageBuilder()
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 3

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() {}
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 44

### `onRun()` *(no record in this KB)*

```js
onRun() {},
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 43

### `TextInput()` — recorded as `ui.TextInput`

```js
TextInput({
  label: gettext('addTodo'),
  onChange: (val) => {
    this.addTodoList(val)
  }
})
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 52

```js
TextInput({
  label: '',
  bold: true,
  value: item,
  subStyle: {
    color: '#333',
    fontSize: '14px'
  },
  maxLength: 200,
  onChange: (val) => {
    if (val.length > 0 && val.length <= 200) {
      this.editTodoList(val, index)
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 84

### `View()` — recorded as `ui.View`

```js
const addBTN = View(
  {
    style: {
      fontSize: '12px',
      lineHeight: '30px',
      borderRadius: '30px',
      background: '#409EFF',
      color: 'white',
      textAlign: 'center',
      padding: '0 15px',
      width: '30%'
    }
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 38

```js
View(
  {
    style: {
      borderBottom: '1px solid #eaeaea',
      padding: '6px 0',
      marginBottom: '6px',
      display: 'flex',
      flexDirection: 'row'
    }
  },
  [
    View(
```
— `zeppos-samples/application/2.0/todo-list/setting/index.js`, line 62

# todo-list

A Mini Program sample
for platform 1.0. Runtimes present: Device App, Settings App, Side Service.

Source: `zeppos-samples/application/1.0/todo-list`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `gtr-3`, `gtr-3-pro`, `gts-3` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `224`, `225`, `226`, `227`, `229`, `230`, `418`, `419` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `.prettierrc.js`, `app.js`, `page/gtr-3/home/index.page.js`, `page/gtr-3/home/index.style.js`, `shared/buffer.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/event.js`, `shared/fs.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/message.js`, `shared/promise.js`, `shared/setTimeout.js`, `utils/constants.js`, `utils/fs.js`, `utils/index.js`

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
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 22

**device-app** — call argument

```js
method: 'ADD'
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 65

### `"DELETE"`

**side-service** — comparison

```js
} else if (payload.method === 'DELETE') {
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 31

**device-app** — call argument

```js
method: 'DELETE',
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 76

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
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 18

**device-app** — call argument

```js
method: 'GET_TODO_LIST'
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 53

### What a message carries

Verbatim lines, never a synthesised signature: a type nothing declares would
be this base inventing one.

```js
this.onMessage()
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 18

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
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 42

```js
this.onMessage(message)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 341

```js
this.onMessage(message)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 369

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 957

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
— `zeppos-samples/application/1.0/todo-list/shared/promise.js`, line 125

```js
Promise._immediateFn(function () {
  if (!self._handled) {
    Promise._unhandledRejectionFn(self._value)
  }
})
```
— `zeppos-samples/application/1.0/todo-list/shared/promise.js`, line 174

### `._unhandledRejectionFn()` *(no record in this KB)*

```js
Promise._unhandledRejectionFn(self._value)
```
— `zeppos-samples/application/1.0/todo-list/shared/promise.js`, line 176

```js
Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.log('[jsfwk.error  ] Possible Unhandled Promise Rejection:', err) // eslint-disable-line no-console
  }
}
```
— `zeppos-samples/application/1.0/todo-list/shared/promise.js`, line 320

### `.addListener()` — **ambiguous**: module `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
settings.settingsStorage.addListener('change', ({ key, newValue, oldValue }) => {
  messageBuilder.call(getTodoList())
})
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 13

```js
messaging.peerSocket.addListener('message', (message) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive size=>%d bin=>%s', message.byteLength, bin2hex(message))
  this.onMessage(message)
})
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 366

### `.clearImmediate()` *(no record in this KB)*

```js
globalNS.clearImmediate = function clearImmediate(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 25

```js
globalNS.clearImmediate(timer1)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 34

### `.clearTimeout()` — `@zos/global.clearTimeout`

```js
globalNS.clearTimeout = function clearTimeout(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 7

```js
globalNS.clearTimeout(timer1)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 16

### `.close()` *(no record in this KB)*

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 50

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 71

### `.copy()` *(no record in this KB)*

```js
dataBin.copy(tailBuf, headerSize, offset, offset + tailSize)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 563

```js
dataBin.copy(_buf, headerSize, offset, offset + hmDataSize)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 585

### `.createConnect()` — `@zos/ble.createConnect`

```js
this.ble.createConnect((index, data, size) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 345

### `.createTimer()` *(no record in this KB)*

```js
const timer1 = timer.createTimer(
  ns || 1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearTimeout(timer1)
    func && func()
  },
  {}
)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 12

```js
const timer1 = timer.createTimer(
  1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearImmediate(timer1)
    func && func()
  },
  {}
)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 30

### `.createWidget()` — `@zos/ui.createWidget`

```js
this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
  ...TITLE_TEXT_STYLE
})
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 24

```js
this.state.addButton = hmUI.createWidget(hmUI.widget.BUTTON, {
  ...ADD_BUTTON,
  click_func: () => {
    this.addRandomTodoItem()
  }
})
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 29

### `.delete()` *(no record in this KB)*

```js
this.map.delete(type)
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 26

```js
this.sessions.delete(this.key(session))
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 250

### `.errorIfBleDisconnect()` *(no record in this KB)*

```js
this.errorIfBleDisconnect()
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 557

```js
errorIfBleDisconnect() {}
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 955

### `.get()` *(no record in this KB)*

```js
this.map.get(type).push(cb)
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 8

```js
const cbs = this.map.get(type)
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 17

### `.getDeviceInfo()` — `@zos/device.getDeviceInfo`

```js
if (hmSetting.getDeviceInfo().screenShape !== 0) {
  this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
    ...TITLE_TEXT_STYLE
  })
}
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 23

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.style.js`, line 3

### `.getItem()` — **ambiguous**: module `settings-storage.getItem`; called on `@zos/share-storage.LocalStorage` or `@zos/storage.localStorage` or `@zos/storage.localStorage-instance` or `@zos/storage.sessionStorage` or `@zos/storage.sessionStorage-instance` or `@zos/storage.ShareLocalStorage`

```js
return settings.settingsStorage.getItem('todoList')
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 6

```js
? JSON.parse(settings.settingsStorage.getItem('todoList'))
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 7

### `.getLogger()` — `@zos/utils.log`

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger('todo-list-app')
```
— `zeppos-samples/application/1.0/todo-list/app.js`, line 4

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger('todo-list-page')
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 5

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 1051

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 1153

### `.isView()` *(no record in this KB)*

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 1059

```js
} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 1161

### `.mkdir()` *(no record in this KB)*

```js
hmFS.mkdir(path)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 106

### `.open()` *(no record in this KB)*

```js
const file = hmFS.open(filename, hmFS.O_CREAT | hmFS.O_RDWR | hmFS.O_TRUNC)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 46

```js
const file = hmFS.open(filename, hmFS.O_RDONLY)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 67

### `.packageInfo()` *(no record in this KB)*

```js
appId = hmApp.packageInfo().appId;
```
— `zeppos-samples/application/1.0/todo-list/app.js`, line 17

### `.read()` *(no record in this KB)*

```js
hmFS.read(file, destination_buf.buffer, 0, fs_stat.size)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 70

### `.readdirSync()` — `@zos/fs.readdirSync`

```js
export function readdirSync(path, options) {
  logger.log('readdirSync begin -->', path)
  hmFS.readdirSync(path)
  logger.log('readdirSync success -->', path)
}
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 115

```js
hmFS.readdirSync(path)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 117

### `.readFileSync()` — **ambiguous**: module `@zos/fs.readFileSync`; called on `@zos/share-storage.FileSystem`

```js
export function readFileSync() {
  const resData = fs.readFileSync(TODO_FILE_NAME)
  return !resData ? [] : JSON.parse(resData)
}
```
— `zeppos-samples/application/1.0/todo-list/utils/fs.js`, line 4

```js
const resData = fs.readFileSync(TODO_FILE_NAME)
```
— `zeppos-samples/application/1.0/todo-list/utils/fs.js`, line 5

### `.remove()` — **ambiguous**: called on `@zos/storage.ShareTypedStorage` or `@zos/storage.TypedStorage`

```js
const result = hmFS.remove(filename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 84

### `.rename()` *(no record in this KB)*

```js
hmFS.rename(oldFilename, newFilename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 95

### `.seek()` — `@zos/media.Player`

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 48

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 69

### `.send()` — **ambiguous**: module `@zos/ble.send` or `messaging.send`

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 509

```js
messaging.peerSocket.send(buf.buffer)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 519

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 565

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 588

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
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 536

```js
this.sendHmProtocol({
  requestId: traceId,
  dataBin: packageBin,
  type,
  contentType,
  dataType
})
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 669

### `.sendMsg()` *(no record in this KB)*

```js
this.sendMsg(shake)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 427

```js
this.sendMsg(close)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 448

### `.set()` — `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 244

### `.setProperty()` — `@zos/ui.setProperty`

```js
this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 98

```js
this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, isTip)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 99

### `.stat()` *(no record in this KB)*

```js
const [fs_stat, err] = hmFS.stat(filename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 23

### `.stopTimer()` — `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 26

### `.write()` *(no record in this KB)*

```js
hmFS.write(file, source_buf.buffer, 0, source_buf.length)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 49

### `.writeFileSync()` — `@zos/fs.writeFileSync`

```js
export function writeFileSync(data, merge = true) {
  let params = data
  if (merge) {
    params = [...readFileSync(), ...data]
  }
  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(params))
}
```
— `zeppos-samples/application/1.0/todo-list/utils/fs.js`, line 9

```js
fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(params))
```
— `zeppos-samples/application/1.0/todo-list/utils/fs.js`, line 14

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
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 3

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
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 10

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
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 103

### `gettext()` *(no record in this KB)*

```js
label: gettext('addTodo'),
```
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 53

```js
label: gettext('delete'),
```
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 104

### `getTodoList()` *(no record in this KB)*

```js
function getTodoList() {
  return settings.settingsStorage.getItem('todoList')
    ? JSON.parse(settings.settingsStorage.getItem('todoList'))
    : [...DEFAULT_TODO_LIST]
}
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 5

```js
messageBuilder.call(getTodoList())
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 14

### `MessageBuilder()` *(no record in this KB)*

```js
const messageBuilder = new MessageBuilder()
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 3

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() {}
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 44

### `onRun()` *(no record in this KB)*

```js
onRun() {},
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 43

### `TextInput()` — recorded as `ui.TextInput`

```js
TextInput({
  label: gettext('addTodo'),
  onChange: (val) => {
    this.addTodoList(val)
  }
})
```
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 52

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
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 84

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
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 38

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
— `zeppos-samples/application/1.0/todo-list/setting/index.js`, line 62

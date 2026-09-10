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

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `hmBle.addListener` or `messaging.addListener` or `settings-storage.addListener`

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

### `.clear()` — likely `settings-storage.clear`

```js
this.map.clear()
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 29

```js
clear() {
  this.sessions.clear()
}
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 271

### `.clearTimeout()` — likely `@zos/global.clearTimeout`

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

### `.close()` — likely `hmFS.close`

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 50

```js
hmFS.close(file)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 71

### `.createConnect()` — likely `@zos/ble.createConnect` or `hmBle.createConnect`

```js
this.ble.createConnect((index, data, size) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 345

### `.createTimer()` — likely `timer.createTimer`

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

### `.createWidget()` — likely `@zos/ui.createWidget` or `hmUI.createWidget`

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

### `.disConnect()` — likely `@zos/ble.disConnect` or `hmBle.disConnect`

```js
this.globalData.messageBuilder.disConnect();
```
— `zeppos-samples/application/1.0/todo-list/app.js`, line 26

```js
disConnect(cb) {
  logger.debug('app ble disconnect')
  this.sendClose()
  this.off('message')
  this.ble && this.ble.disConnect()

  cb && cb(this)
}
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 355

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo` or `hmSetting.getDeviceInfo`

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

### `.getItem()` — likely `settings-storage.getItem`

```js
return settings.settingsStorage.getItem('todoList')
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 6

```js
? JSON.parse(settings.settingsStorage.getItem('todoList'))
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 7

### `.open()` — likely `hmFS.open`

```js
const file = hmFS.open(filename, hmFS.O_CREAT | hmFS.O_RDWR | hmFS.O_TRUNC)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 46

```js
const file = hmFS.open(filename, hmFS.O_RDONLY)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 67

### `.read()` — likely `hmFS.read`

```js
hmFS.read(file, destination_buf.buffer, 0, fs_stat.size)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 70

### `.readdirSync()` — likely `@zos/fs.readdirSync`

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

### `.readFileSync()` — likely `@zos/fs.readFileSync`

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

### `.remove()` — likely `hmFS.remove`

```js
const result = hmFS.remove(filename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 84

### `.rename()` — likely `hmFS.rename`

```js
hmFS.rename(oldFilename, newFilename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 95

### `.seek()` — likely `hmFS.seek`

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 48

```js
hmFS.seek(file, 0, hmFS.SEEK_SET)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 69

### `.send()` — likely `@zos/ble.send` or `hmBle.send` or `messaging.send`

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 509

```js
messaging.peerSocket.send(buf.buffer)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 519

### `.set()` — likely `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/1.0/todo-list/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 244

### `.setItem()` — likely `settings-storage.setItem`

```js
settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 26

```js
settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/1.0/todo-list/app-side/index.js`, line 35

### `.setProperty()` — likely `@zos/ui.setProperty` or `hmUI.setProperty`

```js
this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 98

```js
this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, isTip)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 99

### `.stat()` — likely `hmFS.stat`

```js
const [fs_stat, err] = hmFS.stat(filename)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 23

### `.stopTimer()` — likely `@zos/timer.stopTimer` or `timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 26

### `.write()` — likely `hmFS.write`

```js
hmFS.write(file, source_buf.buffer, 0, source_buf.length)
```
— `zeppos-samples/application/1.0/todo-list/shared/fs.js`, line 49

### `.writeFileSync()` — likely `@zos/fs.writeFileSync`

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

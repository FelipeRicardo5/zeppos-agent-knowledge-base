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

## Files

**Device App** — `.prettierrc.js`, `app.js`, `page/gtr-3/home/index.page.js`, `page/gtr-3/home/index.style.js`, `shared/buffer.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/event.js`, `shared/fs.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/message.js`, `shared/promise.js`, `shared/setTimeout.js`, `utils/constants.js`, `utils/fs.js`, `utils/index.js`

**Settings App** — `setting/index.js`

**Side Service** — `app-side/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

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

### `.createConnect()` — likely `@zos/ble.createConnect`

```js
this.ble.createConnect((index, data, size) => {
  DEBUG &&
    logger.warn('[RAW] [R] receive index=>%d size=>%d bin=>%s', index, size, bin2hex(data))
  this.onFragmentData(data)
})
```
— `zeppos-samples/application/1.0/todo-list/shared/message.js`, line 345

### `.createWidget()` — likely `@zos/ui.createWidget`

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

### `.disConnect()` — likely `@zos/ble.disConnect`

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

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo`

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

### `.send()` — likely `@zos/ble.send` or `messaging.send`

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

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 98

```js
this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, isTip)
```
— `zeppos-samples/application/1.0/todo-list/page/gtr-3/home/index.page.js`, line 99

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/application/1.0/todo-list/shared/setTimeout.js`, line 26

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

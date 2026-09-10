# todo-list

A Mini Program sample
for platform 2.0. Runtimes present: Device App, Settings App, Side Service.

Source: `zeppos-samples/application/2.0/todo-list`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `gts` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `7930112`, `7930113`, `7995648`, `7995649` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `.prettierrc.js`, `app.js`, `page/home/index.page.js`, `page/home/index.style.js`, `secondary-widget/index.js`, `shared/data.js`, `shared/defer.js`, `shared/device-polyfill.js`, `shared/es6-promise.js`, `shared/event.js`, `shared/message-side.js`, `shared/message.js`, `utils/constants.js`, `utils/index.js`

**Settings App** — `setting/index.js`

**Side Service** — `app-side/index.js`

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
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `hmBle.addListener` or `messaging.addListener` or `settings-storage.addListener`

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

### `.clear()` — likely `settings-storage.clear`

```js
this.map.clear()
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 29

```js
clear() {
  this.sessions.clear()
}
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 220

### `.createConnect()` — likely `@zos/ble.createConnect` or `hmBle.createConnect`

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

### `.disConnect()` — likely `@zos/ble.disConnect` or `hmBle.disConnect`

```js
this.globalData.messageBuilder && this.globalData.messageBuilder.disConnect()
```
— `zeppos-samples/application/2.0/todo-list/app.js`, line 23

```js
disConnect(cb) {
  logger.debug('app ble disconnect')
  this.sendClose()
  this.off('message')
  this.ble && this.ble.disConnect()

  cb && cb(this)
}
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 291

### `.getItem()` — likely `settings-storage.getItem`

```js
return settings.settingsStorage.getItem('todoList')
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 6

```js
? JSON.parse(settings.settingsStorage.getItem('todoList'))
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 7

### `.open()` — likely `hmFS.open`

```js
xhr.open('GET', url);
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 842

### `.send()` — likely `@zos/ble.send` or `hmBle.send` or `messaging.send`

```js
xhr.send();
```
— `zeppos-samples/application/2.0/todo-list/shared/es6-promise.js`, line 846

```js
const result = this.ble.send(buf.buffer, buf.byteLength)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 449

### `.set()` — likely `@zos/alarm.set`

```js
this.map.set(type, [cb])
```
— `zeppos-samples/application/2.0/todo-list/shared/event.js`, line 10

```js
this.sessions.set(this.key(newSession), newSession)
```
— `zeppos-samples/application/2.0/todo-list/shared/message-side.js`, line 193

### `.setItem()` — likely `settings-storage.setItem`

```js
settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 26

```js
settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/2.0/todo-list/app-side/index.js`, line 35

### `.setProperty()` — likely `@zos/ui.setProperty` or `hmUI.setProperty`

```js
this.state.refreshText && this.state.refreshText.setProperty(prop.VISIBLE, false)
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 103

```js
this.state.tipText && this.state.tipText.setProperty(prop.VISIBLE, isTip)
```
— `zeppos-samples/application/2.0/todo-list/page/home/index.page.js`, line 104

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

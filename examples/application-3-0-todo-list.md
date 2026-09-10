# todo-list

A Mini Program sample
for platform 3.0. Runtimes present: Device App, Settings App, Side Service.

Source: `zeppos-samples/application/3.0/todo-list`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `gt` — these key the `assets/` subdirectories.

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `.prettierrc.js`, `app.js`, `page/home/index.page.js`, `page/home/index.page.r.layout.js`, `page/home/index.page.s.layout.js`, `utils/constants.js`, `utils/fs.js`, `utils/index.js`

**Settings App** — `setting/index.js`

**Side Service** — `app-side/index.js`

## Imported symbols, called

### `@zeppos/zml/base-app.BaseApp`

```js
BaseApp({
  globalData: {},
  onCreate() {
    logger.log('app onCreate invoked')
  },

  onDestroy() {
    logger.log('app onDestroy invoked')
  }
})
```
— `zeppos-samples/application/3.0/todo-list/app.js`, line 7

### `@zeppos/zml/base-page.BasePage`

```js
BasePage({
  state: {
    scrollList: null,
    tipText: null,
    refreshText: null,
    addButton: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')
    this.getTodoList()
  },
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 19

### `@zeppos/zml/base-side.BaseSideService`

```js
BaseSideService({
  onInit() {},
  onRequest(req, res) {
    if (req.method === 'GET_TODO_LIST') {
      res(null, {
        result: getTodoList()
      })
    } else if (req.method === 'ADD') {
      // 这里补充一个
      const todoList = getTodoList()
      const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))]
      settingsLib.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 12

### `@zos/device.getDeviceInfo`

```js
if (getDeviceInfo().screenShape !== SCREEN_SHAPE_SQUARE) {
  this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
    ...TITLE_TEXT_STYLE
  })
}
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 34

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.r.layout.js`, line 6

### `@zos/fs.readFileSync`

```js
export function readFileSync() {
  const fStat = statSync({
    path: this.fileName
  })
  if (fStat) {
    const resData = readFile({
      path: TODO_FILE_NAME,
      options: {
        encoding: 'utf8'
      }
    })
    return !resData ? [] : JSON.parse(resData)
```
— `zeppos-samples/application/3.0/todo-list/utils/fs.js`, line 5

### `@zos/fs.statSync`

```js
const fStat = statSync({
  path: this.fileName
})
```
— `zeppos-samples/application/3.0/todo-list/utils/fs.js`, line 6

### `@zos/fs.writeFileSync`

```js
export function writeFileSync(data, merge = true) {
  let params = data
  if (merge) {
    params = [...readFile(), ...data]
  }
  writeFile({
    path: TODO_FILE_NAME,
    data: JSON.stringify(params),
    options: {
      encoding: 'utf8'
    }
  })
```
— `zeppos-samples/application/3.0/todo-list/utils/fs.js`, line 22

### `@zos/i18n.getText`

```js
text: getText('addSuccess')
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 78

```js
text: getText('addFailure')
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 83

### `@zos/utils.log`

```js
logger.log('app onCreate invoked')
```
— `zeppos-samples/application/3.0/todo-list/app.js`, line 10

```js
logger.log('app onDestroy invoked')
```
— `zeppos-samples/application/3.0/todo-list/app.js`, line 14

### `@zos/utils.px`

```js
x: px(42),
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.r.layout.js`, line 10

```js
y: px(65),
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.r.layout.js`, line 11

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
  ...TITLE_TEXT_STYLE
})
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 35

```js
this.state.addButton = hmUI.createWidget(hmUI.widget.BUTTON, {
  ...ADD_BUTTON,
  click_func: () => {
    this.addRandomTodoItem()
  }
})
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 40

### `.getItem()` — likely `settings-storage.getItem`

```js
return settingsLib.getItem('todoList')
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 7

```js
? JSON.parse(settingsLib.getItem('todoList'))
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 8

### `.setItem()` — likely `settings-storage.setItem`

```js
settingsLib.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 23

```js
settingsLib.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 32

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.state.scrollList.setProperty(hmUI.prop.DELETE_ITEM, { index: index })
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 93

```js
this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 117

### `.showToast()` — likely `@zos/interaction.showToast`

```js
hmUI.showToast({
  text: getText('addSuccess')
})
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 77

```js
hmUI.showToast({
  text: getText('addFailure')
})
```
— `zeppos-samples/application/3.0/todo-list/page/home/index.page.js`, line 82

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
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 3

### `AppSideService()` *(no record in this KB)*

```js
AppSideService(
  BaseSideService({
    onInit() {},
    onRequest(req, res) {
      if (req.method === 'GET_TODO_LIST') {
        res(null, {
          result: getTodoList()
        })
      } else if (req.method === 'ADD') {
        // 这里补充一个
        const todoList = getTodoList()
        const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))]
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 11

### `BaseSideService()` — recorded as `@zeppos/zml/base-side.BaseSideService` or `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  onInit() {},
  onRequest(req, res) {
    if (req.method === 'GET_TODO_LIST') {
      res(null, {
        result: getTodoList()
      })
    } else if (req.method === 'ADD') {
      // 这里补充一个
      const todoList = getTodoList()
      const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))]
      settingsLib.setItem('todoList', JSON.stringify(newTodoList))
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 12

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
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 103

### `gettext()` *(no record in this KB)*

```js
label: gettext('addTodo'),
```
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 53

```js
label: gettext('delete'),
```
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 104

### `getTodoList()` *(no record in this KB)*

```js
function getTodoList() {
  return settingsLib.getItem('todoList')
    ? JSON.parse(settingsLib.getItem('todoList'))
    : [...DEFAULT_TODO_LIST]
}
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 6

```js
result: getTodoList()
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 17

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() {}
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 45

### `onInit()` *(no record in this KB)*

```js
onInit() {},
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 13

### `onRun()` *(no record in this KB)*

```js
onRun() {},
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 44

### `res()` *(no record in this KB)*

```js
res(null, {
  result: getTodoList()
})
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 16

```js
res(null, {
  result: newTodoList
})
```
— `zeppos-samples/application/3.0/todo-list/app-side/index.js`, line 25

### `TextInput()` — recorded as `ui.TextInput`

```js
TextInput({
  label: gettext('addTodo'),
  onChange: (val) => {
    this.addTodoList(val)
  }
})
```
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 52

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
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 84

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
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 38

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
— `zeppos-samples/application/3.0/todo-list/setting/index.js`, line 62

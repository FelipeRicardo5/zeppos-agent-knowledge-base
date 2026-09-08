# fetch-api

A Mini Program sample
for platform 3.0. Runtimes present: Device App, Side Service.

Source: `zeppos-samples/application/3.0/fetch-api`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `common` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `page/index.js`, `page/index.r.layout.js`, `page/index.s.layout.js`, `utils/config/constants.js`, `utils/config/device.js`

**Side Service** — `app-side/index.js`

## Imported symbols, called

### `@zeppos/zml/base-app.BaseApp`

```js
BaseApp({
  globalData: {},
  onCreate(options) {
    console.log("app on create invoke");
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
  },
})
```
— `zeppos-samples/application/3.0/fetch-api/app.js`, line 4

### `@zeppos/zml/base-page.BasePage`

```js
BasePage({
  state: {},
  build() {
    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...FETCH_BUTTON,
      click_func: (button_widget) => {
        logger.log("click button");
        this.fetchData();
      },
    });
  },
  fetchData() {
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 13

### `@zeppos/zml/base-side.BaseSideService`

```js
BaseSideService({
  onInit() {},

  onRequest(req, res) {
    console.log("=====>,", req.method);
    if (req.method === "GET_DATA") {
      fetchData(res);
    }
  },

  onRun() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 42

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/3.0/fetch-api/utils/config/device.js`, line 2

### `@zos/utils.log`

```js
logger.log("click button");
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 19

```js
logger.log("receive data");
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 29

### `@zos/utils.px`

```js
x: (DEVICE_WIDTH - px(360)) / 2,
```
— `zeppos-samples/application/3.0/fetch-api/page/index.r.layout.js`, line 11

```js
y: px(300),
```
— `zeppos-samples/application/3.0/fetch-api/page/index.r.layout.js`, line 12

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.BUTTON, {
  ...FETCH_BUTTON,
  click_func: (button_widget) => {
    logger.log("click button");
    this.fetchData();
  },
});
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 16

```js
textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
  ...FETCH_RESULT_TEXT,
  text,
});
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 34

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
textWidget.setProperty(hmUI.prop.TEXT, text);
```
— `zeppos-samples/application/3.0/fetch-api/page/index.js`, line 39

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSideService()` *(no record in this KB)*

```js
AppSideService(
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
      console.log("=====>,", req.method);
      if (req.method === "GET_DATA") {
        fetchData(res);
      }
    },

    onRun() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 41

### `BaseSideService()` — recorded as `@zeppos/zml/base-side.BaseSideService` or `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  onInit() {},

  onRequest(req, res) {
    console.log("=====>,", req.method);
    if (req.method === "GET_DATA") {
      fetchData(res);
    }
  },

  onRun() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 42

### `fetch()` — recorded as `fetch.fetch`

```js
// const { body: { data = {} } = {} } = await fetch({
//   url: 'https://xxx.com/api/xxx',
//   method: 'GET'
// })
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 8

```js
// const { body: { data = {} } = {} } = await fetch({
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
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 13

### `fetchData()` *(no record in this KB)*

```js
async function fetchData(res) {
  try {
    // Requesting network data using the fetch API
    // The sample program is for simulation only and does not request real network data, so it is commented here
    // Example of a GET method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'GET'
    // })
    // Example of a POST method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://xxx.com/api/xxx',
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 3

```js
fetchData(res);
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 48

### `onDestroy()` *(no record in this KB)*

```js
onDestroy() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 54

### `onInit()` *(no record in this KB)*

```js
onInit() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 43

### `onRun()` *(no record in this KB)*

```js
onRun() {},
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 52

### `res()` *(no record in this KB)*

```js
res(null, {
  result: resBody,
});
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 31

```js
res(null, {
  result: "ERROR",
});
```
— `zeppos-samples/application/3.0/fetch-api/app-side/index.js`, line 35

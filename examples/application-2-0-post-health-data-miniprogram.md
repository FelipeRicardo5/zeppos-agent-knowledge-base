# MiniProgram

A Mini Program sample
for platform 2.0. Runtimes present: Device App, Settings App, Side Service.

Source: `zeppos-samples/application/2.0/post-health-data/MiniProgram`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `data:user.hd.sleep`

Targets: `320x380-amazfit-bip-5`, `360x360-amazfit-active-edge`, `390x450-amazfit-active`, `390x450-amazfit-cheetah-square`, `390x450-amazfit-gts-4`, `416x416-amazfit-falcon`, `416x416-amazfit-gtr-mini`, `454x454-amazfit-cheetah-round`, `454x454-amazfit-t-rex-2`, `454x454-amazfit-t-rex-ultra`, `466x466-amazfit-gtr-4`, `480x480-amazfit-balance`, `480x480-amazfit-cheetah-pro`, `480x480-amazfit-gtr-4-limited-edition`, `480x480-runner-pro` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `251`, `414`, `415`, `418`, `419`, `6553856`, `6553857`, `7864576`, `7864577`, `7930112`, `7930113`, `7995648`, `7995649`, `8126720`, `8126721`, `8192256`, `8192257`, `8257793`, `8323328`, `8323329`, `8388864`, `8388865`, `8454400`, `8454401`, `8519936`, `8519937`, `8519939` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `page/index.js`, `utils/config.js`

**Settings App** — `setting/index.js`

**Side Service** — `app-side/index.js`

## Imported symbols, called

### `@zeppos/zml/base/base-app.BaseApp`

```js
BaseApp({
  globalData: {},
  onCreate() {
    logger.log("app onCreate invoked");
  },
  onDestroy() {
    logger.log("app onDestroy invoked");
  },
})
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app.js`, line 10

### `@zeppos/zml/base/base-page.BasePage`

```js
BasePage({
  state: {
    buttonWidgetGet: null,
    buttonWidgetPost: null,
    textWidget: null,
    sleepData: null,
    sleepInstance: null,
    timeInstance: null,
  },
  build() {
    this.state.buttonWidgetGet = createWidget(widget.BUTTON, {
      x: (DEVICE_WIDTH - px(400)) / 2,
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 17

### `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  async onRequest(req, res) {
    const { type, params } = req;

    if (type === "UPLOAD") {
      console.log(params);

      settings.settingsStorage.setItem("sleepData", JSON.stringify(params));

      const result = await this.postData();

      res(null, result);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 7

### `@zos/device.getDeviceInfo`

```js
const { width: DEVICE_WIDTH } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 9

### `@zos/interaction.showToast`

```js
showToast({
  content: "No Sleep Data",
});
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 55

```js
showToast({ content: `UPLOAD ${message}` });
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 115

### `@zos/sensor.Sleep`

```js
this.state.sleepInstance = new Sleep();
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 48

### `@zos/sensor.Time`

```js
this.state.timeInstance = new Time();
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 49

### `@zos/ui.createWidget`

```js
this.state.buttonWidgetGet = createWidget(widget.BUTTON, {
  x: (DEVICE_WIDTH - px(400)) / 2,
  y: px(260),
  w: px(400),
  h: px(80),
  text_size: px(36),
  radius: px(12),
  normal_color: DEFAULT_COLOR,
  press_color: DEFAULT_COLOR_TRANSPARENT,
  text: "Get Sleep Data",
  click_func: (button_widget) => {
    this.getSleepData();
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 27

```js
this.state.textWidget = createWidget(widget.TEXT, {
  x: (DEVICE_WIDTH - px(400)) / 2,
  y: px(48),
  w: px(400),
  h: px(200),
  text_size: px(22),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text,
  color: 0xffffff,
});
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 72

### `@zos/utils.log`

```js
logger.log("app onCreate invoked");
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app.js`, line 13

```js
logger.log("app onDestroy invoked");
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app.js`, line 16

### `@zos/utils.px`

```js
x: (DEVICE_WIDTH - px(400)) / 2,
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 28

```js
y: px(260),
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 29

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addListener()` — likely `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener`

```js
settings.settingsStorage.addListener(
  "change",
  async ({ key, newValue, oldValue }) => {
    if (key === "REQUEST_ACTION") {
      this.call({ type: "SETTINGS_APP_REQUEST_DATA" });
    } else if (key === "POST_ACTION") {
      this.postData();
    }
  }
);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 30

### `.getItem()` — likely `settings-storage.getItem`

```js
body: settings.settingsStorage.getItem("sleepData"),
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 50

```js
const sleepData = JSON.parse(props.settingsStorage.getItem("sleepData"));
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 70

### `.setItem()` — likely `settings-storage.setItem`

```js
settings.settingsStorage.setItem("sleepData", JSON.stringify(params));
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 14

```js
settings.settingsStorage.setItem("sleepData", JSON.stringify(params));
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 21

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.state.textWidget.setProperty(prop.TEXT, text);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/page/index.js`, line 84

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSettingsPage()` *(no record in this KB)*

```js
AppSettingsPage({
  state: {
    sleepData: {},
    dataReady: false,
  },
  build(props) {
    console.log(gettext("example"));
    console.log(this.state.sleepData);

    this.getStorage(props);

    const ButtonList = [];
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 3

### `AppSideService()` *(no record in this KB)*

```js
AppSideService(
  BaseSideService({
    async onRequest(req, res) {
      const { type, params } = req;

      if (type === "UPLOAD") {
        console.log(params);

        settings.settingsStorage.setItem("sleepData", JSON.stringify(params));

        const result = await this.postData();
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 6

### `BaseSideService()` — recorded as `@zeppos/zml/base-side.BaseSideService` or `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  async onRequest(req, res) {
    const { type, params } = req;

    if (type === "UPLOAD") {
      console.log(params);

      settings.settingsStorage.setItem("sleepData", JSON.stringify(params));

      const result = await this.postData();

      res(null, result);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 7

### `Button()` — recorded as `ui.Button`

```js
Button({
  style: {
    display: "block",
    margin: "1em 1em 0 1em",
    width: "auto",
    fontSize: "1.5rem",
  },
  label: "Request Sleep Data From Device App",
  color: "primary",
  onClick: () => {
    this.requestData(props);
  },
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 17

```js
Button({
  style: {
    display: "block",
    margin: "1em 1em 0 1em",
    width: "auto",
    fontSize: "1.5rem",
  },
  color: "secondary",
  label: "Post Data To Web Service",
  onClick: () => {
    this.postData(props);
  },
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 34

### `fetch()` — recorded as `fetch.fetch`

```js
const res = await fetch({
  url: "http://localhost:4080/sleep",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: settings.settingsStorage.getItem("sleepData"),
});
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 44

### `gettext()` *(no record in this KB)*

```js
console.log(gettext("example"));
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 9

### `res()` *(no record in this KB)*

```js
res(null, result);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 18

```js
res(null, {
  code: 0,
  message: "SUCCESS",
});
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js`, line 23

### `View()` — recorded as `ui.View`

```js
return View(
  {
    style: {
      margin: "1em 1em 0 1em",
      fontSize: "1.5rem",
      lineHeight: "1.5rem",
    },
  },
  [`${key}: ${val}`]
);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 51

```js
return View({}, [
  ButtonList,
  DataList,
]);
```
— `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 63

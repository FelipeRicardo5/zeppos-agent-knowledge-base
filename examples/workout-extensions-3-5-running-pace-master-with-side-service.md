# running-pace-master-with-side-service

A workout-extension sample
for platform 3.5. Runtimes present: Side Service, Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Side Service** — `app-side/index/index.js`

**Workout Extension** — `app.js`, `data-widget/common/index.js`

## Imported symbols, called

### `@zeppos/zml/base-app.BaseApp`

```js
BaseApp({
  globalData: {},
  onCreate(options) {},
  onDestroy(options) {},
})
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app.js`, line 4

### `@zeppos/zml/base-page.BasePage`

```js
BasePage({
  init() {
    const bg = createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: "bg.png",
    });
    const text = createWidget(widget.TEXT, {
      x: px(240),
      y: px(82),
      w: px(150),
      h: px(85),
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 13

### `@zeppos/zml/base-side.BaseSideService`

```js
BaseSideService({
  onInit(e) {
    log.log("app-side-service onInit invoked", e);
  },

  onRun(e) {
    log.log("app-side-service onEvent invoked", e);
  },

  onDestroy() {
    log.log("app-side-service onDestroy invoked");
  },
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 5

### `@zos/ui.createWidget`

```js
const bg = createWidget(widget.IMG, {
  x: 0,
  y: 0,
  src: "bg.png",
});
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 15

```js
const text = createWidget(widget.TEXT, {
  x: px(240),
  y: px(82),
  w: px(150),
  h: px(85),
  color: 0xffffff,
  text_size: px(30),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text: "BPM",
});
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 20

### `@zos/utils.px`

```js
x: px(240),
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 21

```js
y: px(82),
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 22

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSideService()` *(no record in this KB)*

```js
AppSideService(
  BaseSideService({
    onInit(e) {
      log.log("app-side-service onInit invoked", e);
    },

    onRun(e) {
      log.log("app-side-service onEvent invoked", e);
    },

    onDestroy() {
      log.log("app-side-service onDestroy invoked");
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 4

### `BaseSideService()` — recorded as `@zeppos/zml/base-side.BaseSideService` or `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  onInit(e) {
    log.log("app-side-service onInit invoked", e);
  },

  onRun(e) {
    log.log("app-side-service onEvent invoked", e);
  },

  onDestroy() {
    log.log("app-side-service onDestroy invoked");
  },
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 5

### `res()` *(no record in this KB)*

```js
res(null, {
  code: 0,
  message: 'success',
})
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 21

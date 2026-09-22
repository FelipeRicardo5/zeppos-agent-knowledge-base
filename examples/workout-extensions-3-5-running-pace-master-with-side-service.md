# running-pace-master-with-side-service

**Running Pace Master**

A workout-extension sample
for platform 3.5. Runtimes present: Side Service, Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

`app.extType`: `workout` — what `appType` alone does not say.

Installs on: target `3.6`, minVersion `3.6`, compatible `3.6` — this field is the API_LEVEL, not a semver.

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `app-side` | `app-side/index/index` | `path` | `app-side/index/index.js` | Side Service | `common` |
| `data-widget` | `data-widget/common/index` | `widgets` | `data-widget/common/index.js` | Workout Extension | `common` |

## Files

**Side Service** — `app-side/index/index.js`

**Workout Extension** — `app.js`, `data-widget/common/index.js`

## Messages passed between runtimes

Sites that write the same string literal in more than one of this app's
runtimes. **That shared literal is the only thing grouping them** — no import,
symbol or declaration in these files connects a call to a handler, so nothing
below says one reaches the other. Both citations are here; the conclusion is
the reader's.

### `"your-method"`

**side-service** — switch case

```js
case 'your-method':
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 20

**workout-extension** — call argument

```js
method: "your-method",
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 138

### What a message carries

Verbatim lines, never a synthesised signature: a type nothing declares would
be this base inventing one.

```js
onRequest(req, res) {
  switch (req.method) {
    case 'your-method':
      res(null, {
        code: 0,
        message: 'success',
      })
  }
}
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 18

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

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.getLogger()` *(no record in this KB)*

```js
const log = Logger.getLogger("app-side-service");
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index/index.js`, line 2

### `.request()` *(no record in this KB)*

```js
this.request({
  method: "your-method",
  params: {
    name: "foo",
  },
}).then((data) => {
  this.log("result=>", data);
});
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/data-widget/common/index.js`, line 137

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

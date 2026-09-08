# download

A Mini Program sample
for platform 3.0. Runtimes present: Device App, Side Service.

Source: `zeppos-samples/application/3.0/download`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.ble`

Targets: `gt` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `components/mask/index.js`, `components/pressed-btn/index.js`, `page/index.js`, `page/index.r.layout.js`, `utils/constants.js`, `utils/index.js`

**Side Service** — `app-side/fetch-module.js`, `app-side/file-download-module.js`, `app-side/file-transfer-module.js`, `app-side/image-convert-module.js`, `app-side/index.js`

## Imported symbols, called

### `@zeppos/zml/base-app.BaseApp`

```js
BaseApp({
  globalData: {
    bus,
  },
  onCreate() {
    console.log("app on create invoke");
  },

  onDestroy() {
    console.log("app on destroy invoke");
  },
})
```
— `zeppos-samples/application/3.0/download/app.js`, line 7

### `@zeppos/zml/base-page.BasePage`

```js
BasePage({
  state: {
    isDownload: false,
    isTransfer: false,
    filePath: "",
    fileName: "",
  },
  onCall({ result }) {
    if (result && "filePath" in result) {
      this.state.filePath = result.filePath;
      this.state.isDownload = false;
      textWidget.setProperty(hmUI.prop.TEXT, getText("transTip"));
```
— `zeppos-samples/application/3.0/download/page/index.js`, line 13

### `@zeppos/zml/base-side.BaseSideService`

```js
BaseSideService({
  ...fetchModule,
  ...fileDownloadModule,
  ...imageConvertModule,
  ...fileTransferModule,
  onInit() {
    logger.log("app side service invoke onInit");
  },
  onRun() {
    logger.log("app side service invoke onRun");
  },
  onDestroy() {
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 11

### `@zos/device.getDeviceInfo`

```js
export const DEVICE_INFO = getDeviceInfo();
```
— `zeppos-samples/application/3.0/download/utils/constants.js`, line 3

### `@zos/i18n.getText`

```js
textWidget.setProperty(hmUI.prop.TEXT, getText("transTip"));
```
— `zeppos-samples/application/3.0/download/page/index.js`, line 24

```js
const path = getText(
  "imagePath",
  getResourcePath(this.state.fileName)
);
```
— `zeppos-samples/application/3.0/download/page/index.js`, line 38

### `@zos/utils.EventBus`

```js
const bus = new EventBus();
```
— `zeppos-samples/application/3.0/download/app.js`, line 4

### `@zos/utils.log`

```js
console.log("--->click");
```
— `zeppos-samples/application/3.0/download/page/index.js`, line 67

### `@zos/utils.px`

```js
x: px(56),
```
— `zeppos-samples/application/3.0/download/page/index.r.layout.js`, line 7

```js
y: px(100),
```
— `zeppos-samples/application/3.0/download/page/index.r.layout.js`, line 8

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.convert()` — likely `image-convert.convert`

```js
async convert(filePath) {
  const result = await convertLib.convert({
    filePath: filePath,
    targetFilePath: filePath,
  });

  logger.log("ConvertImage result=>%j", result);
  return result;
},
```
— `zeppos-samples/application/3.0/download/app-side/image-convert-module.js`, line 9

```js
const result = await convertLib.convert({
  filePath: filePath,
  targetFilePath: filePath,
});
```
— `zeppos-samples/application/3.0/download/app-side/image-convert-module.js`, line 10

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
const mask = parent.createWidget(hmUI.widget.FILL_RECT, {
  ...style,
  color: 0x000000,
  alpha: 0x96,
  enable: isMaskActive,
});
```
— `zeppos-samples/application/3.0/download/components/mask/index.js`, line 4

```js
const btn = parent.createWidget(hmUI.widget.BUTTON, {
  ...style,
  click_down: () => {
    mask.setProperty(hmUI.prop.VISIBLE, true);
  },
  click_func: () => {
    mask.setProperty(hmUI.prop.VISIBLE, false);
    clickCb && typeof clickCb === "function" && clickCb();
  },
  click_up: () => {
    mask.setProperty(hmUI.prop.VISIBLE, false);
  },
```
— `zeppos-samples/application/3.0/download/components/pressed-btn/index.js`, line 11

### `.downloadFile()` — likely `download-file.downloadFile`

```js
this.downloadFile(encodeURI(coverUrl));
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 34

### `.fetch()` — likely `fetch.fetch`

```js
const result = await this.fetch({
  method: "get",
  url: "http://yijuzhan.com/api/word.php",
}).catch((e) => {
  console.log("fetch=>", e);
});
```
— `zeppos-samples/application/3.0/download/app-side/fetch-module.js`, line 8

### `.setAlpha()` — likely `@zos/ui.setAlpha`

```js
mask.setAlpha(0x96);
```
— `zeppos-samples/application/3.0/download/components/mask/index.js`, line 10

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
mask.setProperty(hmUI.prop.VISIBLE, isMaskActive);
```
— `zeppos-samples/application/3.0/download/components/mask/index.js`, line 11

```js
mask.setProperty(hmUI.prop.VISIBLE, true);
```
— `zeppos-samples/application/3.0/download/components/pressed-btn/index.js`, line 14

## Global calls in the phone runtimes

The Settings App and the Side Service are all globals: their files import
nothing that names a module, so nothing else in this base can see these. Some
have no symbol record at all — `AppSettingsPage`, which registers a settings
page, is the clearest case. Here the code is the only evidence there is.

### `AppSideService()` *(no record in this KB)*

```js
AppSideService(
  BaseSideService({
    ...fetchModule,
    ...fileDownloadModule,
    ...imageConvertModule,
    ...fileTransferModule,
    onInit() {
      logger.log("app side service invoke onInit");
    },
    onRun() {
      logger.log("app side service invoke onRun");
    },
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 10

### `BaseSideService()` — recorded as `@zeppos/zml/base-side.BaseSideService` or `@zeppos/zml/base/base-side.BaseSideService`

```js
BaseSideService({
  ...fetchModule,
  ...fileDownloadModule,
  ...imageConvertModule,
  ...fileTransferModule,
  onInit() {
    logger.log("app side service invoke onInit");
  },
  onRun() {
    logger.log("app side service invoke onRun");
  },
  onDestroy() {
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 11

### `fileNameStamp()` *(no record in this KB)*

```js
function fileNameStamp() {
  const d = new Date();
  return d.getTime();
}
```
— `zeppos-samples/application/3.0/download/app-side/file-download-module.js`, line 3

```js
filePath: `${fileNameStamp()}.png`,
```
— `zeppos-samples/application/3.0/download/app-side/file-download-module.js`, line 16

### `res()` *(no record in this KB)*

```js
res(null, {
  status: "success",
  data: "",
});
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 35

```js
res(null, {
  status: "success",
  data: "",
});
```
— `zeppos-samples/application/3.0/download/app-side/index.js`, line 45

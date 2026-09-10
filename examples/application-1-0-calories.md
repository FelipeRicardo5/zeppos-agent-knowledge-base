# calories

A Mini Program sample
for platform 1.0. Runtimes present: Device App.

Source: `zeppos-samples/application/1.0/calories`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `gtr-3`, `gtr-3-pro`, `gts-3` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `224`, `225`, `226`, `227`, `229`, `230`, `418`, `419` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `page/gtr-3/food-list.js`, `page/gtr-3/index.js`, `page/gts-3/food-list.js`, `page/gts-3/index.js`, `utils/constants.js`, `utils/storage.js`, `utils/styles-gts-3.js`, `utils/styles.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener` or `hmSensor.addEventListener`

```js
text.addEventListener(hmUI.event.SELECT, () => {
  this.state.radioGroup.setProperty(
    hmUI.prop.CHECKED,
    this.state.radioButtonsArray[index]
  );
});
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/food-list.js`, line 86

```js
text.addEventListener(hmUI.event.SELECT, () => {
  this.state.radioGroup.setProperty(
    hmUI.prop.CHECKED,
    this.state.radioButtonsArray[index]
  );
});
```
— `zeppos-samples/application/1.0/calories/page/gts-3/food-list.js`, line 81

### `.close()` — likely `hmFS.close`

```js
hmFS.close(file);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 21

```js
hmFS.close(file);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 32

### `.createSensor()` — likely `hmSensor.createSensor`

```js
let calories = hmSensor.createSensor(hmSensor.id.CALORIE).current; // Math.floor(Math.random() * 1000)
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/index.js`, line 65

```js
let calories = hmSensor.createSensor(hmSensor.id.CALORIE).current; // Math.floor(Math.random() * 1000)
```
— `zeppos-samples/application/1.0/calories/page/gts-3/index.js`, line 64

### `.createWidget()` — likely `@zos/ui.createWidget` or `hmUI.createWidget`

```js
hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT);
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/food-list.js`, line 31

```js
const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
  ...FOOD_LIST_RADIOGROUP,
  check_func: (group, index, checked) => {
    if (checked) {
      this.state.isFinishInit && this.setPrograms(index);
    }
  },
});
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/food-list.js`, line 35

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo` or `hmSetting.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/calories/utils/styles-gts-3.js`, line 4

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/calories/utils/styles.js`, line 4

### `.open()` — likely `hmFS.open`

```js
const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 17

```js
const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 29

### `.read()` — likely `hmFS.read`

```js
hmFS.read(file, fileContentUnit.buffer, 0, size);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 31

### `.seek()` — likely `hmFS.seek`

```js
hmFS.seek(file, 0, hmFS.SEEK_SET);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 30

### `.set()` — likely `@zos/alarm.set`

```js
this.globalData.localStorage.set({
  foodType: getApp()._options.globalData.foodType,
});
```
— `zeppos-samples/application/1.0/calories/app.js`, line 22

### `.setProperty()` — likely `@zos/ui.setProperty` or `hmUI.setProperty`

```js
this.state.radioGroup.setProperty(
  hmUI.prop.CHECKED,
  this.state.radioButtonsArray[index]
);
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/food-list.js`, line 87

```js
this.state.radioGroup.setProperty(
  hmUI.prop.INIT,
  this.state.radioButtonsArray[0]
);
```
— `zeppos-samples/application/1.0/calories/page/gtr-3/food-list.js`, line 94

### `.stat()` — likely `hmFS.stat`

```js
const [fsStat, err] = hmFS.stat(this.fileName);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 25

### `.write()` — likely `hmFS.write`

```js
hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
```
— `zeppos-samples/application/1.0/calories/utils/storage.js`, line 20

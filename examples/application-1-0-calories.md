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

## Files

**Device App** — `app.js`, `page/gtr-3/food-list.js`, `page/gtr-3/index.js`, `page/gts-3/food-list.js`, `page/gts-3/index.js`, `utils/constants.js`, `utils/storage.js`, `utils/styles-gts-3.js`, `utils/styles.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener`

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

### `.createWidget()` — likely `@zos/ui.createWidget`

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

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/calories/utils/styles-gts-3.js`, line 4

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/calories/utils/styles.js`, line 4

### `.set()` — likely `@zos/alarm.set`

```js
this.globalData.localStorage.set({
  foodType: getApp()._options.globalData.foodType,
});
```
— `zeppos-samples/application/1.0/calories/app.js`, line 22

### `.setProperty()` — likely `@zos/ui.setProperty`

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

# calories

A Mini Program sample
for platform 4.0. Runtimes present: Device App.

Source: `zeppos-samples/application/4.0/calories`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `data:user.hd.calorie`, `device:os.local_storage`

Targets: `gt` — these key the `assets/` subdirectories.

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `page/gt/food-list.js`, `page/gt/food-list.r.layout.js`, `page/gt/food-list.s.layout.js`, `page/gt/index.js`, `page/gt/index.r.layout.js`, `page/gt/index.s.layout.js`, `utils/constants.js`, `utils/storage.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
} = getDeviceInfo();
```
— `zeppos-samples/application/4.0/calories/utils/constants.js`, line 8

### `@zos/fs.readFileSync`

```js
readFileSync({
  path: this.fileName,
  options: {
    encoding: "utf8",
  },
})
```
— `zeppos-samples/application/4.0/calories/utils/storage.js`, line 26

### `@zos/fs.statSync`

```js
const fStat = statSync({
  path: this.fileName,
});
```
— `zeppos-samples/application/4.0/calories/utils/storage.js`, line 20

### `@zos/fs.writeFileSync`

```js
writeFileSync({
  path: this.fileName,
  data: JSON.stringify(obj),
  options: {
    encoding: "utf8",
  },
});
```
— `zeppos-samples/application/4.0/calories/utils/storage.js`, line 10

### `@zos/i18n.getText`

```js
text: getText("calories"),
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.r.layout.js`, line 8

```js
const { width: w2 } = hmUI.getTextLayout(getText("unit"), {
  text_size: UNIT_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/4.0/calories/page/gt/index.js`, line 38

### `@zos/router.back`

```js
back();
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 31

### `@zos/router.push`

```js
push({
  url: "page/gt/food-list",
});
```
— `zeppos-samples/application/4.0/calories/page/gt/index.js`, line 83

### `@zos/sensor.Calorie`

```js
let calories = new Calorie().getCurrent(); // Math.floor(Math.random() * 1000)
```
— `zeppos-samples/application/4.0/calories/page/gt/index.js`, line 68

### `@zos/utils.log`

```js
logger.log("--->e:", e);
```
— `zeppos-samples/application/4.0/calories/app.js`, line 18

```js
logger.log("onInit");
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 26

### `@zos/utils.px`

```js
y: px(index * (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)),
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 65

```js
y: px(
  FOOD_LIST_Y + index * (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)
),
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 72

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
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 79

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
!isSquare && hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT);
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 34

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
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 38

### `.getTextLayout()` — likely `@zos/ui.getTextLayout`

```js
const { width: w1 } = hmUI.getTextLayout("" + calories, {
  text_size: CALORIE_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/4.0/calories/page/gt/index.js`, line 33

```js
const { width: w2 } = hmUI.getTextLayout(getText("unit"), {
  text_size: UNIT_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/4.0/calories/page/gt/index.js`, line 38

### `.set()` — likely `@zos/alarm.set`

```js
this.globalData.localStorage.set({
  foodType: getApp()._options.globalData.foodType,
});
```
— `zeppos-samples/application/4.0/calories/app.js`, line 23

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.state.radioGroup.setProperty(
  hmUI.prop.CHECKED,
  this.state.radioButtonsArray[index]
);
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 80

```js
this.state.radioGroup.setProperty(
  hmUI.prop.INIT,
  this.state.radioButtonsArray[0]
);
```
— `zeppos-samples/application/4.0/calories/page/gt/food-list.js`, line 87

# calories

A Mini Program sample
for platform 2.0. Runtimes present: Device App.

Source: `zeppos-samples/application/2.0/calories`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `data:user.hd.calorie`, `device:os.local_storage`

Targets: `gts` — these key the `assets/` subdirectories.

## Files

**Device App** — `app-widget/index.js`, `app.js`, `page/gts/food-list.js`, `page/gts/index.js`, `secondary-widget/index.js`, `utils/constants.js`, `utils/styles-gts-3.js`, `utils/styles.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/calories/utils/styles-gts-3.js`, line 6

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/calories/utils/styles.js`, line 6

### `@zos/i18n.getText`

```js
const { width: w2 } = getTextLayout(getText("unit"), {
  text_size: UNIT_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 71

```js
const { width: w2 } = getTextLayout(getText('unit'), {
  text_size: UNIT_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/2.0/calories/page/gts/index.js`, line 38

### `@zos/router.back`

```js
back();
```
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 35

### `@zos/router.push`

```js
push({
  url: "page/gts/food-list",
});
```
— `zeppos-samples/application/2.0/calories/page/gts/index.js`, line 82

```js
this.state.refreshWidgetList.push(textId, unitId);
```
— `zeppos-samples/application/2.0/calories/secondary-widget/index.js`, line 65

### `@zos/sensor.Calorie`

```js
const calories = new Calorie().getCurrent(); // Math.floor(Math.random() * 1000)
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 60

```js
let calories = new Calorie().getCurrent(); // Math.floor(Math.random() * 1000)
```
— `zeppos-samples/application/2.0/calories/page/gts/index.js`, line 68

### `@zos/ui.createWidget`

```js
createWidget(widget.TEXT, TOTAL_CONSUME_TEXT);
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 39

```js
const textId = createWidget(widget.TEXT, {
  ...CALORIE_TEXT,
  text: `${calories}`,
  x: x + CONSUME_ICON_WIDTH + IMGAE_CALORIES_MARIN,
  w: w1,
  y: CALORIE_TEXT.y + baseY,
});
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 82

### `@zos/ui.deleteWidget`

```js
deleteWidget(i);
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 46

```js
deleteWidget(i);
```
— `zeppos-samples/application/2.0/calories/secondary-widget/index.js`, line 119

### `@zos/ui.getAppWidgetSize`

```js
logger.log(getAppWidgetSize())
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 33

### `@zos/ui.getTextLayout`

```js
const { width: w1 } = getTextLayout("" + calories, {
  text_size: CALORIE_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 66

```js
const { width: w2 } = getTextLayout(getText("unit"), {
  text_size: UNIT_TEXT_SIZE,
  text_width: 0,
  wrapped: 0,
});
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 71

### `@zos/ui.setAppWidgetSize`

```js
setAppWidgetSize({
  h: px(120)
})
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 35

### `@zos/utils.log`

```js
logger.log("===onInit===");
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 27

```js
logger.log(getAppWidgetSize())
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 33

### `@zos/utils.px`

```js
h: px(120)
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 36

```js
const baseY = px(48);
```
— `zeppos-samples/application/2.0/calories/app-widget/index.js`, line 80

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
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 89

### `.createWidget()` — likely `@zos/ui.createWidget`

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
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 39

```js
hmUI.createWidget(hmUI.widget.FILL_RECT, {
  x: 0,
  y: 0,
  w: DEVICE_WIDTH,
  h: px(
    FOOD_LIST_Y +
      (FOOD_CALORIES.length + 1) *
        (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)
  ),
});
```
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 60

### `.getItem()` — likely `settings-storage.getItem`

```js
const { foodType = 'chocolate' } = localStorage.getItem('calorie', {})
```
— `zeppos-samples/application/2.0/calories/app.js`, line 12

### `.setItem()` — likely `settings-storage.setItem`

```js
localStorage.setItem("calorie", {
  foodType: globalData.foodType
});
```
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 32

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.state.radioGroup.setProperty(
  hmUI.prop.CHECKED,
  this.state.radioButtonsArray[index]
);
```
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 90

```js
this.state.radioGroup.setProperty(
  hmUI.prop.INIT,
  this.state.radioButtonsArray[0]
);
```
— `zeppos-samples/application/2.0/calories/page/gts/food-list.js`, line 97

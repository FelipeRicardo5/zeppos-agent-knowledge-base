# simple-keyboard

A Mini Program sample
for platform 4.2. Runtimes present: Device App.

Source: `zeppos-samples/application/4.2/simple-keyboard`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.input.method`

Targets: `default` — these key the `assets/` subdirectories.

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app.js`, `data-widget/index.layout.js`, `data-widget/index.page.js`, `data-widget/index.r.layout.js`, `data-widget/index.s.layout.js`, `data-widget/input-method-engine.js`, `data-widget/pinyin-dict.js`, `page/index.js`

## Imported symbols, called

### `@zos/app.getPackageInfo`

```js
const appName = getPackageInfo().name;
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 25

### `@zos/device.getDeviceInfo`

```js
const { width: device_width, height: device_height } = getDeviceInfo();
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.layout.js`, line 13

```js
const device_info = getDeviceInfo();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 24

### `@zos/interaction.showToast`

```js
showToast({
  content: "You're all set",
});
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 493

```js
showToast({
  content: i,
});
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 584

### `@zos/page.scrollTo`

```js
scrollTo({
  y: 0,
});
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 269

### `@zos/router.exit`

```js
exit();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 606

### `@zos/router.launchApp`

```js
launchApp({ url: "Settings_keyboardScreen", native: true });
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 45

### `@zos/ui.createKeyboard`

```js
createKeyboard({
  onComplete: (kb, result) => {
    console.log("complete");
    deleteKeyboard();
    showToast({
      content: "Input: " + result.data,
    });
    cb && cb();
  },
  onCancel: () => {
    console.log("cancel");
    deleteKeyboard();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 634

### `@zos/ui.createWidget`

```js
return createWidget(widget.VIRTUAL_CONTAINER, styles.container);
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 17

```js
return createWidget(type, {
  ...props,
  parent: layoutParent,
});
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 21

### `@zos/ui.deleteKeyboard`

```js
deleteKeyboard();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 637

```js
deleteKeyboard();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 645

### `@zos/ui.deleteWidget`

```js
deleteWidget(c);
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 54

```js
deleteWidget(ele);
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 213

### `@zos/ui.keyboard`

```js
this.keyboard(() => {
  this.onResume();
});
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 460

```js
this.keyboard();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 538

### `@zos/ui.setAlpha`

```js
btn.setAlpha(0);
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 171

### `@zos/ui.setStatusBarVisible`

```js
setStatusBarVisible(false);
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 224

### `@zos/ui.updateLayout`

```js
updateLayout(vc1);
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 74

```js
updateLayout(ele);
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 276

### `@zos/utils.px`

```js
row_gap: px(25),
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 301

```js
padding_top: px(40),
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 302

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.Button()` *(no record in this KB)*

```js
widgets.Button({
  text: "Go to Settings",
  normal_color: 0x383838,
  press_color: 0x383838,
  click_func() {
    keyboard_gotoSettings();
  },
  layout: {
    ...default_layout,
    width: unit.f(),
    height: px(88),
    font_size: px(36),
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 362

### `.cancel()` — **ambiguous**: module `@zos/alarm.cancel` or `@zos/notification.cancel`

```js
this.cancel();
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 209

```js
cancel() {
  keyboard.sendFnKey(keyboard.CANCEL);
},
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 258

### `.createWidget()` — `@zos/ui.createWidget`

```js
const ele = parent.createWidget(id, widget_props);
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 161

### `.getType()` — **ambiguous**: module `@zos/ui.getType`; called on `@zos/sensor.Vibrator`

```js
if (ele.getType() === idOfWidget.VIRTUAL_CONTAINER) {
  const children = ele.layoutChildren;
  deleteWidget(ele);
  children.forEach((item) => {
    removeElement(item);
  });
} else {
  deleteWidget(ele);
}
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 211

### `.keyboard()` — `@zos/ui.keyboard`

```js
this.keyboard(() => {
  this.onResume();
});
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 460

```js
this.keyboard();
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 538

### `.setAlpha()` — `@zos/ui.setAlpha`

```js
btn.setAlpha(0);
```
— `zeppos-samples/application/4.2/simple-keyboard/data-widget/index.page.js`, line 171

### `.Text()` *(no record in this KB)*

```js
widgets.Text({
  text: `Enable ${appName}`,
  ...default_text_style,
  layout: {
    ...default_layout,
    width: unit.f(),
    height: unit.wrap_content(),
    font_size: px(40),
  },
}),
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 307

```js
widgets.Text({
  ...default_text_style,
  text: appName,
  align_h: align.LEFT,
  layout: {
    ...default_layout,
    left: px(20),
    width: unit.wrap_content(),
    max_width: px(200),
    height: px(70),
    font_size: px(27),
    line_clamp: 2,
```
— `zeppos-samples/application/4.2/simple-keyboard/page/index.js`, line 337

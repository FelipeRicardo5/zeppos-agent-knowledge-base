# t9-keyboard

A Mini Program sample
for platform 4.2. Runtimes present: Device App.

Source: `zeppos-samples/application/4.2/t9-keyboard`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `device:os.input.method`

Targets: `default` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `data-widget/engine/dictionary.js`, `data-widget/engine/t9-engine.js`, `data-widget/index.js`, `data-widget/index.r.layout.js`, `data-widget/index.s.layout.js`, `data-widget/modules/font-atlas.js`, `data-widget/modules/input-field-manager.js`, `data-widget/modules/keyboard-config.js`, `data-widget/modules/keyboard-handlers.js`, `data-widget/modules/keyboard-renderer.js`, `data-widget/modules/multitap-handler.js`, `data-widget/modules/preloader.js`, `data-widget/modules/safe-keyboard.js`, `helpers/required.js`, `pages/guidelines.js`

## Imported symbols, called

### `@zos/app.getPackageInfo`

```js
const KEYBOARD_NAME = getPackageInfo().name;
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 20

### `@zos/device.getDeviceInfo`

```js
export const DeviceInfo = getDeviceInfo();
```
— `zeppos-samples/application/4.2/t9-keyboard/helpers/required.js`, line 26

```js
const DeviceInfo = getDeviceInfo();
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 19

### `@zos/interaction.showToast`

```js
showToast({
  content: "You're all set",
});
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 380

```js
showToast({ content: "Input: " + result.data });
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 471

### `@zos/page.scrollTo`

```js
scrollToTop() { scrollTo({ y: 0 }); },
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 136

### `@zos/router.exit`

```js
exit();
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 450

### `@zos/sensor.Vibrator`

```js
const vibro = new Vibrator();
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/keyboard-handlers.js`, line 9

### `@zos/ui.createKeyboard`

```js
createKeyboard({
  onComplete: (kb, result) => {
    deleteKeyboard();
    showToast({ content: "Input: " + result.data });
    cb && cb();
  },
  onCancel: () => {
    deleteKeyboard();
    cb && cb();
  },
});
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 468

### `@zos/ui.createWidget`

```js
createWidget(widget.FILL_RECT, styles.bg_fill_rect);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/index.js`, line 124

```js
createWidget(widget.STROKE_RECT, s.top_sep);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/index.js`, line 128

### `@zos/ui.deleteKeyboard`

```js
deleteKeyboard();
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 470

```js
deleteKeyboard();
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 475

### `@zos/ui.deleteWidget`

```js
deleteWidget(this.spinner_widget);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/preloader.js`, line 61

```js
deleteWidget(this.preloader_widget);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/preloader.js`, line 66

### `@zos/ui.getImageInfo`

```js
image_info_cache[src] = getImageInfo(src);
```
— `zeppos-samples/application/4.2/t9-keyboard/helpers/required.js`, line 57

### `@zos/ui.setStatusBarVisible`

```js
setStatusBarVisible(false);
```
— `zeppos-samples/application/4.2/t9-keyboard/helpers/required.js`, line 47

```js
setStatusBarVisible(false);
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 154

### `@zos/ui.updateLayout`

```js
updateLayout(this.state.vc.current);
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 140

### `@zos/utils.px`

```js
const INPUT_TEXT_SIZE = px(28);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/index.r.layout.js`, line 11

```js
x: px(70), y: px(70), w: px(350), h: px(40),
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/index.r.layout.js`, line 28

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener`

```js
this.keyboard.state.ui.input_overlay.addEventListener(event.CLICK_UP, (info) => {
  this.handleInputFieldClick(info);
});
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/input-field-manager.js`, line 120

```js
key_data.touch_overlay.addEventListener(event.CLICK_DOWN, (info) => {
  if (is_pressed) return;

  is_pressed = true;
  press_start_time = Date.now();
  is_long_press = false;

  highlightKey();

  if (this.keyboard.state.longpress_timer) {
    clearTimeout(this.keyboard.state.longpress_timer);
  }
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/keyboard-renderer.js`, line 179

### `.cancel()` — likely `@zos/alarm.cancel` or `@zos/notification.cancel`

```js
t9_engine.cancel();
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/keyboard-handlers.js`, line 134

### `.clear()` — likely `settings-storage.clear`

```js
this.seq_cache.clear();
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/engine/t9-engine.js`, line 311

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
const ele = parent.createWidget(id, rest);
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 54

### `.getType()` — likely `@zos/ui.getType`

```js
if (ele.getType() === widget.VIRTUAL_CONTAINER) {
  opts.layout_parent = ele;
} else if (
  [widget.GROUP, widget.VIEW_CONTAINER].includes(ele.getType()) &&
  ele.isAutoLayout
) {
  opts.layout_parent = ele;
}
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 63

```js
[widget.GROUP, widget.VIEW_CONTAINER].includes(ele.getType()) &&
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 66

### `.keyboard()` — likely `@zos/ui.keyboard`

```js
this.keyboard(() => {
  this.onResume();
});
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 346

```js
this.keyboard();
```
— `zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js`, line 432

### `.launchApp()` — likely `@zos/router.launchApp`

```js
r.launchApp({ url: 'Settings_keyboardScreen', params: { native: true } });
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/safe-keyboard.js`, line 198

### `.set()` — likely `@zos/alarm.set`

```js
this.seq_map.set(seq, words_arr);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/engine/t9-engine.js`, line 64

```js
this.prefix_idx.set(prefix, prefix_arr);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/engine/t9-engine.js`, line 93

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
this.keyboard.state.ui.cursor_widget.setProperty(prop.ALPHA, 255);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/input-field-manager.js`, line 135

```js
this.keyboard.state.ui.cursor_widget.setProperty(prop.ALPHA, 255);
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/input-field-manager.js`, line 144

### `.start()` — likely `@zos/app-service.start`

```js
vibro.start();
```
— `zeppos-samples/application/4.2/t9-keyboard/data-widget/modules/keyboard-handlers.js`, line 575

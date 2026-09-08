# color-world

A watchface sample
for platform 1.0. Runtimes present: Watchface.

Source: `zeppos-samples/watchface/1.0/color-world`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `watchface`

Permissions: `gps`

Targets: `gts-3` — these key the `assets/` subdirectories.

## Files

**Watchface** — `app.js`, `shared/buffer.js`, `shared/device-polyfill.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/setTimeout.js`, `watchface/gts-3/index.js`, `watchface/square/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.clearTimeout()` — likely `@zos/global.clearTimeout`

```js
globalNS.clearTimeout = function clearTimeout(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/watchface/1.0/color-world/shared/setTimeout.js`, line 7

```js
globalNS.clearTimeout(timer1)
```
— `zeppos-samples/watchface/1.0/color-world/shared/setTimeout.js`, line 16

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
config.iconPath = hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
  x: 156,
  y: 275,
  image_array: moonArray,
  image_length: moonArray.length,
  type: hmUI.data_type.MOON,
  show_level: hmUI.show_level.ONLY_NORMAL,
})
```
— `zeppos-samples/watchface/1.0/color-world/watchface/square/index.js`, line 329

```js
hmUI.createWidget(hmUI.widget.TEXT_IMG, {
  x: config.numX + 1,
  y: config.numY,
  w: config.bgw,
  type: config.dataType,
  font_array: config.numArray,
  h_space: config.h,
  align_h: hmUI.align.CENTER_H,
  show_level: hmUI.show_level.ONLY_NORMAL,
  unit_sc: config.unitSc,
  unit_en: config.unitEn,
  unit_tc: config.unitTc,
```
— `zeppos-samples/watchface/1.0/color-world/watchface/square/index.js`, line 346

### `.getProperty()` — likely `@zos/ui.getProperty`

```js
let type = editBg.getProperty(hmUI.prop.CURRENT_TYPE)
```
— `zeppos-samples/watchface/1.0/color-world/watchface/square/index.js`, line 609

```js
let item = editGroup.getProperty(hmUI.prop.CURRENT_TYPE)
```
— `zeppos-samples/watchface/1.0/color-world/watchface/square/index.js`, line 731

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/color-world/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/color-world/shared/setTimeout.js`, line 26

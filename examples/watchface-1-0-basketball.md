# basketball

A watchface sample
for platform 1.0. Runtimes present: Watchface.

Source: `zeppos-samples/watchface/1.0/basketball`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `watchface`

Permissions: `gps`

Targets: `gtr-3` — these key the `assets/` subdirectories.

## Files

**Watchface** — `app.js`, `shared/buffer.js`, `shared/device-polyfill.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/setTimeout.js`, `watchface/gtr-3/index.js`, `watchface/round/index.js`

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
— `zeppos-samples/watchface/1.0/basketball/shared/setTimeout.js`, line 7

```js
globalNS.clearTimeout(timer1)
```
— `zeppos-samples/watchface/1.0/basketball/shared/setTimeout.js`, line 16

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.IMG, {
  x: px(0),
  y: px(0),
  w: px(454),
  h: px(454),
  src: img('bg/bg.png'),
  show_level: hmUI.show_level.ONLY_NORMAL,
})
```
— `zeppos-samples/watchface/1.0/basketball/watchface/round/index.js`, line 54

```js
let animA = hmUI.createWidget(hmUI.widget.IMG_ANIM, {
  x: px(0),
  y: px(0),
  anim_path: img('bg'),
  anim_prefix: 'a',
  anim_ext: 'png',
  anim_fps: 25,
  anim_size: 23,
  repeat_count: 1,
  anim_repeat: false,
  anim_status: hmUI.anim_status.START,
  display_on_restart: false,
```
— `zeppos-samples/watchface/1.0/basketball/watchface/round/index.js`, line 63

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
animResident.setProperty(hmUI.prop.ANIM_STATUS, 1)
```
— `zeppos-samples/watchface/1.0/basketball/watchface/round/index.js`, line 36

```js
animCreate.setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/1.0/basketball/watchface/round/index.js`, line 37

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/basketball/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/basketball/shared/setTimeout.js`, line 26

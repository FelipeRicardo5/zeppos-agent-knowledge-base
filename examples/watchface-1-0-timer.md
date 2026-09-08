# timer

A watchface sample
for platform 1.0. Runtimes present: Watchface.

Source: `zeppos-samples/watchface/1.0/timer`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `watchface`

Permissions: `gps`

Targets: `gtr-3-pro` — these key the `assets/` subdirectories.

## Files

**Watchface** — `app.js`, `shared/buffer.js`, `shared/device-polyfill.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/setTimeout.js`, `watchface/gtr-3-pro/index.js`, `watchface/round/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener`

```js
secondImg.addEventListener(hmUI.event.CLICK_UP, function (info) {
  week.setProperty(hmUI.prop.VISIBLE, false)
  monthDay.setProperty(hmUI.prop.VISIBLE, false)
  secondImg.setProperty(hmUI.prop.VISIBLE, false)
  secondPointer.setProperty(hmUI.prop.VISIBLE, false)
  centerSecondPointer.setProperty(hmUI.prop.VISIBLE, true)
  for (let n = 0; n < 8; n++) {
    bigNumObject[n].setProperty(hmUI.prop.VISIBLE, true)
    smallNumObject[n].setProperty(hmUI.prop.VISIBLE, true)
    if (n == 0 || n == 1 || n == 3 || n == 4 || n == 6 || n == 7) {
      bigNumObject[n].setProperty(hmUI.prop.SRC, img('bigNum/0.png'))
      smallNumObject[n].setProperty(hmUI.prop.SRC, img('smallNum/0.png'))
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 251

```js
backBtn.addEventListener(hmUI.event.CLICK_UP, function (info) {
  timer.stopTimer(hsTimer)
  timer.stopTimer(sTimer)
  green_red_btn.setProperty(hmUI.prop.SRC, img('btn/lv.png'))
  for (let n = 0; n < 8; n++) {
    bigNumObject[n].setProperty(hmUI.prop.VISIBLE, false)
    smallNumObject[n].setProperty(hmUI.prop.VISIBLE, false)
  }
  backBtn.setProperty(hmUI.prop.VISIBLE, false)
  green_red_btn.setProperty(hmUI.prop.VISIBLE, false)

  week.setProperty(hmUI.prop.VISIBLE, true)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 275

### `.clearTimeout()` — likely `@zos/global.clearTimeout`

```js
globalNS.clearTimeout = function clearTimeout(timerRef) {
  timerRef && timer.stopTimer(timerRef)
}
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 7

```js
globalNS.clearTimeout(timer1)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 16

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
imgBg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(480),
  color: 0x000000,
})
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 91

```js
imgBg = hmUI.createWidget(hmUI.widget.IMG, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(480),
  src: img('bg/bg.png'),
  show_level: hmUI.show_level.ONAL_NORML,
})
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 99

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
bigNumObject[i].setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 152

```js
smallNumObject[j].setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 171

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 26

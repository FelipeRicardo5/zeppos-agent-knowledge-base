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

Builds for: `deviceSource` `229`, `230` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Watchface** — `app.js`, `shared/buffer.js`, `shared/device-polyfill.js`, `shared/global.js`, `shared/js-module.js`, `shared/logger.js`, `shared/setTimeout.js`, `watchface/gtr-3-pro/index.js`, `watchface/round/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.addEventListener()` — `hmSensor.addEventListener`

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

### `.clearTimeout()` *(no record in this KB)*

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

### `.createTimer()` — `timer.createTimer`

```js
const timer1 = timer.createTimer(
  ns || 1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearTimeout(timer1)
    func && func()
  },
  {},
)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 12

```js
const timer1 = timer.createTimer(
  1,
  Number.MAX_SAFE_INTEGER,
  function () {
    globalNS.clearImmediate(timer1)
    func && func()
  },
  {},
)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 30

### `.createWidget()` — `hmUI.createWidget`

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

### `.getScreenType()` — `hmSetting.getScreenType`

```js
var screenType = hmSetting.getScreenType()
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 89

### `.setProperty()` — `hmUI.setProperty`

```js
bigNumObject[i].setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 152

```js
smallNumObject[j].setProperty(hmUI.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 171

### `.stopTimer()` — `timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 8

```js
timerRef && timer.stopTimer(timerRef)
```
— `zeppos-samples/watchface/1.0/timer/shared/setTimeout.js`, line 26

### `.SysProGetInt()` — `hmFS.SysProGetInt`

```js
rootPath + 'smallNum/' + hmFS.SysProGetInt('t0') + '.png',
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 312

```js
rootPath + 'smallNum/' + hmFS.SysProGetInt('t1') + '.png',
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 316

### `.SysProSetInt()` — `hmFS.SysProSetInt`

```js
hmFS.SysProSetInt('t0', 0)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 336

```js
hmFS.SysProSetInt('t1', 0)
```
— `zeppos-samples/watchface/1.0/timer/watchface/round/index.js`, line 337

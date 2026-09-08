# timer

A watchface sample
for platform 3.0. Runtimes present: Watchface.

Source: `zeppos-samples/watchface/3.0/timer`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `watchface`

Declares no permissions.

Targets: `gtr-3-pro` — these key the `assets/` subdirectories.

## Files

**Watchface** — `app.js`, `watchface/gtr-3-pro/index.js`, `watchface/round/index.js`

## Imported symbols, called

### `@zos/app.getScene`

```js
var screenType = getScene()
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 93

### `@zos/utils.log`

```js
logger.log('app on create invoke')
```
— `zeppos-samples/watchface/3.0/timer/app.js`, line 8

```js
logger.log('app on destroy invoke')
```
— `zeppos-samples/watchface/3.0/timer/app.js`, line 11

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener`

```js
secondImg.addEventListener(ui.event.CLICK_UP, function (info) {
  week.setProperty(ui.prop.VISIBLE, false)
  monthDay.setProperty(ui.prop.VISIBLE, false)
  secondImg.setProperty(ui.prop.VISIBLE, false)
  secondPointer.setProperty(ui.prop.VISIBLE, false)
  centerSecondPointer.setProperty(ui.prop.VISIBLE, true)
  for (let n = 0; n < 8; n++) {
    bigNumObject[n].setProperty(ui.prop.VISIBLE, true)
    smallNumObject[n].setProperty(ui.prop.VISIBLE, true)
    if (n == 0 || n == 1 || n == 3 || n == 4 || n == 6 || n == 7) {
      bigNumObject[n].setProperty(ui.prop.SRC, img('bigNum/0.png'))
      smallNumObject[n].setProperty(ui.prop.SRC, img('smallNum/0.png'))
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 255

```js
backBtn.addEventListener(ui.event.CLICK_UP, function (info) {
  timer.stopTimer(hsTimer)
  timer.stopTimer(sTimer)
  green_red_btn.setProperty(ui.prop.SRC, img('btn/lv.png'))
  for (let n = 0; n < 8; n++) {
    bigNumObject[n].setProperty(ui.prop.VISIBLE, false)
    smallNumObject[n].setProperty(ui.prop.VISIBLE, false)
  }
  backBtn.setProperty(ui.prop.VISIBLE, false)
  green_red_btn.setProperty(ui.prop.VISIBLE, false)

  week.setProperty(ui.prop.VISIBLE, true)
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 279

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
imgBg = ui.createWidget(ui.widget.FILL_RECT, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(480),
  color: 0x000000,
})
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 95

```js
imgBg = ui.createWidget(ui.widget.IMG, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(480),
  src: img('bg/bg.png'),
  show_level: ui.show_level.ONAL_NORML,
})
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 103

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
bigNumObject[i].setProperty(ui.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 156

```js
smallNumObject[j].setProperty(ui.prop.VISIBLE, false)
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 175

### `.stopTimer()` — likely `@zos/timer.stopTimer`

```js
timer.stopTimer(hsTimer)
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 280

```js
timer.stopTimer(sTimer)
```
— `zeppos-samples/watchface/3.0/timer/watchface/round/index.js`, line 281

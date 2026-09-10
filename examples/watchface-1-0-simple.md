# simple

A watchface sample
for platform 1.0. Runtimes present: Watchface.

Source: `zeppos-samples/watchface/1.0/simple`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `designWidth`, `i18n`, `module`, `packageInfo`, `permissions`, `platforms`, `runtime`

`app.appType`: `watchface`

Permissions: `gps`

## Files

**Watchface** — `app.js`, `watchface/default-target/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.addEventListener()` — `hmSensor.addEventListener`

```js
timeSensor.addEventListener(timeSensor.event.MINUTEEND, function () {
    digitalTime.setProperty(hmUI.prop.MORE, {
        text: `${String(timeSensor.hour).padStart(2, "0")}:${String(
            timeSensor.minute
        ).padStart(2, "0")}`,
    });
});
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 77

```js
heartSensor.addEventListener(heartSensor.event.LAST, function () {
    heartRate.setProperty(hmUI.prop.MORE, {
        text: `HR:${heartSensor.last}`,
    });
});
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 85

### `.App()` *(no record in this KB)*

```js
__$$app$$__.app = DeviceRuntimeCore.App({
    globalData: {},
    onCreate(options) {
    },
    onDestroy(options) {
    },
    onError(error) {
    },
    onPageNotFound(obj) {
    },
    onUnhandledRejection(obj) {
    }
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 81

### `.clearTimeout()` *(no record in this KB)*

```js
globalNS.clearTimeout = function clearTimeout(timerRef) {
    timerRef && timer.stopTimer(timerRef);
};
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 51

```js
globalNS.clearTimeout(timer1);
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 56

### `.createSensor()` — `hmSensor.createSensor`

```js
timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 66

```js
heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 70

### `.createTimer()` — `timer.createTimer`

```js
const timer1 = timer.createTimer(ns || 1, Number.MAX_SAFE_INTEGER, function () {
    globalNS.clearTimeout(timer1);
    func && func();
}, {});
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 55

```js
const timer1 = timer.createTimer(1, Number.MAX_SAFE_INTEGER, function () {
    globalNS.clearImmediate(timer1);
    func && func();
}, {});
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 65

### `.createWidget()` — `hmUI.createWidget`

```js
hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: 0,
    y: 0,
    w: 480,
    h: 480,
    color: "0xFF343934",
    radius: 240,
    show_level: hmUI.show_level.ONLY_NORMAL,
});
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 13

```js
digitalTime = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 141,
    y: 190,
    w: 200,
    h: 100,
    text: "[HOUR_24_Z]:[MIN_Z]",
    color: "0xFF497d80",
    text_size: 60,
    text_style: hmUI.text_style.NONE,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    show_level: hmUI.show_level.ONLY_NORMAL,
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 23

### `.getLanguage()` — `hmSetting.getLanguage`

```js
lang: new DeviceRuntimeCore.HmUtils.Lang(DeviceRuntimeCore.HmUtils.getLanguage()),
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 11

### `.setProperty()` — `hmUI.setProperty`

```js
digitalTime.setProperty(hmUI.prop.MORE, {
    text: `${String(timeSensor.hour).padStart(2, "0")}:${String(
        timeSensor.minute
    ).padStart(2, "0")}`,
});
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 78

```js
heartRate.setProperty(hmUI.prop.MORE, {
    text: `HR:${heartSensor.last}`,
});
```
— `zeppos-samples/watchface/1.0/simple/watchface/default-target/index.js`, line 86

### `.stopTimer()` — `timer.stopTimer`

```js
timerRef && timer.stopTimer(timerRef);
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 52

```js
timerRef && timer.stopTimer(timerRef);
```
— `zeppos-samples/watchface/1.0/simple/app.js`, line 62

# running-pace-master

A workout-extension sample
for platform 3.5. Runtimes present: Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-pace-master`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Workout Extension** — `app.js`, `data-widget/common/index.js`

## Imported symbols, called

### `@zos/ui.createWidget`

```js
const bg = createWidget(widget.IMG, {
  x: 0,
  y: 0,
  src: 'bg.png'
})
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master/data-widget/common/index.js`, line 6

```js
const text = createWidget(widget.TEXT, {
  x: px(240),
  y: px(82),
  w: px(150),
  h: px(85),
  color: 0xffffff,
  text_size: px(30),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text: 'BPM'
})
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master/data-widget/common/index.js`, line 11

### `@zos/utils.px`

```js
x: px(240),
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master/data-widget/common/index.js`, line 12

```js
y: px(82),
```
— `zeppos-samples/workout-extensions/3.5/running-pace-master/data-widget/common/index.js`, line 13

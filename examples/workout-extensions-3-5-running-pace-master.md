# running-pace-master

**Running Pace Master**

A workout-extension sample
for platform 3.5. Runtimes present: Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-pace-master`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

`app.extType`: `workout` — what `appType` alone does not say.

Installs on: target `3.6`, minVersion `3.6`, compatible `3.6` — this field is the API_LEVEL, not a semver.

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `data-widget` | `data-widget/common/index` | `widgets` | `data-widget/common/index.js` | Workout Extension | `common` |

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

# running-data-assistant

**Running Data Assistant**

A workout-extension sample
for platform 3.5. Runtimes present: Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-data-assistant`

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

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `data-widget` | `data-widget/common/index` | `widgets` | `data-widget/common/index.js` | Workout Extension | `common` |

## Files

**Workout Extension** — `app.js`, `data-widget/common/index.js`, `data-widget/common/index.r.layout.js`, `data-widget/common/index.s.layout.js`

## Imported symbols, called

### `@zos/sensor.Time`

```js
const time = new Time();
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 13

### `@zos/ui.createWidget`

```js
const bg = createWidget(widget.IMG, bgStyle);
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 20

```js
const timeText = createWidget(widget.TEXT, timeStyle);
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 22

### `@zos/utils.px`

```js
y: px(40),
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.r.layout.js`, line 22

```js
w: px(480),
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.r.layout.js`, line 23

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.getHours()` — `@zos/sensor.Time`

```js
const hourVal = time.getHours();
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 25

### `.getMinutes()` — `@zos/sensor.Time`

```js
const minuteVal = time.getMinutes();
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 26

### `.getSeconds()` — `@zos/sensor.Time`

```js
const secondVal = time.getSeconds();
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 27

### `.setProperty()` *(no record in this KB)*

```js
timeText.setProperty(prop.MORE, {
  text: hour + ":" + minute + ":" + second,
});
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 33

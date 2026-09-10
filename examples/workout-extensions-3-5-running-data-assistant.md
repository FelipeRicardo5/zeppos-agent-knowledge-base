# running-data-assistant

A workout-extension sample
for platform 3.5. Runtimes present: Workout Extension.

Source: `zeppos-samples/workout-extensions/3.5/running-data-assistant`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

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

### `.setProperty()` *(no record in this KB)*

```js
timeText.setProperty(prop.MORE, {
  text: hour + ":" + minute + ":" + second,
});
```
— `zeppos-samples/workout-extensions/3.5/running-data-assistant/data-widget/common/index.js`, line 33

# hello-world

**Hello World** — hello world app

A Mini Program sample
for platform 2.0. Runtimes present: Device App.

Source: `zeppos-samples/application/2.0/hello-world`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Installs on: target `2.0`, minVersion `2.0`, compatible `2.0` — this field is the API_LEVEL, not a semver.

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `gtr`, `gts` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `7930112`, `7930113`, `7995648`, `7995649` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `page` | `page/gtr/home/index.page` | `pages` | `page/gtr/home/index.page.js` | Device App | `gtr` |
| `page` | `page/gts/home/index.page` | `pages` | `page/gts/home/index.page.js` | Device App | `gts` |

## Files

**Device App** — `app.js`, `page/gtr/home/index.page.js`, `page/gtr/home/index.style.js`, `page/gts/home/index.page.js`, `page/gts/home/index.style.js`, `utils/index.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.style.js`, line 6

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/hello-world/page/gts/home/index.style.js`, line 5

### `@zos/i18n.getText`

```js
text: getText("appName"),
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.style.js`, line 9

```js
text: getText("appName"),
```
— `zeppos-samples/application/2.0/hello-world/page/gts/home/index.style.js`, line 8

### `@zos/ui.createWidget`

```js
createWidget(widget.TEXT, {
  ...TEXT_STYLE,
});
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.page.js`, line 9

```js
createWidget(widget.TEXT, {
  ...TEXT_STYLE,
});
```
— `zeppos-samples/application/2.0/hello-world/page/gts/home/index.page.js`, line 10

### `@zos/utils.px`

```js
x: px(42),
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.style.js`, line 10

```js
y: px(200),
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.style.js`, line 11

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.getLogger()` — `@zos/utils.log`

```js
const logger = Logger.getLogger("helloworld");
```
— `zeppos-samples/application/2.0/hello-world/page/gtr/home/index.page.js`, line 5

```js
const logger = Logger.getLogger("helloworld");
```
— `zeppos-samples/application/2.0/hello-world/page/gts/home/index.page.js`, line 5

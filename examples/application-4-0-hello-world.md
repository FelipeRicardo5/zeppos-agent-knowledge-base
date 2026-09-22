# hello-world

**Hello World** — hello world app

A Mini Program sample
for platform 4.0. Runtimes present: Device App.

Source: `zeppos-samples/application/4.0/hello-world`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Installs on: target `4.0`, minVersion `4.0`, compatible `4.0` — this field is the API_LEVEL, not a semver.

Permissions: `data:os.device.info`, `device:os.local_storage`

Targets: `gt` — these key the `assets/` subdirectories.

Builds for: `st: "r"`, `st: "s"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `page` | `page/gt/home/index.page` | `pages` | `page/gt/home/index.page.js` | Device App | `gt` |

## Files

**Device App** — `app.js`, `page/gt/home/index.page.js`, `page/gt/home/index.page.r.layout.js`, `page/gt/home/index.page.s.layout.js`, `utils/index.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.r.layout.js`, line 6

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.s.layout.js`, line 6

### `@zos/i18n.getText`

```js
text: getText("appName"),
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.r.layout.js`, line 9

```js
text: getText("appName"),
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.s.layout.js`, line 9

### `@zos/utils.px`

```js
x: px(42),
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.r.layout.js`, line 10

```js
y: px(200),
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.r.layout.js`, line 11

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.createWidget()` — `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.js`, line 12

### `.getLogger()` — `@zos/utils.log`

```js
const logger = Logger.getLogger("helloworld");
```
— `zeppos-samples/application/4.0/hello-world/page/gt/home/index.page.js`, line 5

# hello-world

**Hello World** — hello world app

A Mini Program sample
for platform 1.0. Runtimes present: Device App.

Source: `zeppos-samples/application/1.0/hello-world`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Installs on: target `1.0.1`, minVersion `1.0.0`, compatible `1.0.0` — this field is the API_LEVEL, not a semver.

Declares no permissions.

Targets: `gtr3`, `gtr3-pro`, `gts3` — these key the `assets/` subdirectories.

Builds for: `deviceSource` `224`, `225`, `226`, `227`, `229`, `230`, `418`, `419` (`configVersion` `v2`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

Layout: `targets` — `module` and `platforms` sit under each target key.

## Entry points

Which file each `module` key turns on. The manifest writes the path without
an extension and the loader supplies it; the file column is that resolution
against this app's own files.

| `module` | Declared | Form | File | Runtime | Target |
| --- | --- | --- | --- | --- | --- |
| `page` | `page/gtr3-pro/home/index.page` | `pages` | `page/gtr3-pro/home/index.page.js` | Device App | `gtr3-pro` |
| `page` | `page/gtr3/home/index.page` | `pages` | `page/gtr3/home/index.page.js` | Device App | `gtr3` |
| `page` | `page/gts3/home/index.page` | `pages` | `page/gts3/home/index.page.js` | Device App | `gts3` |

## Files

**Device App** — `app.js`, `page/gtr3-pro/home/index.page.js`, `page/gtr3-pro/home/index.style.js`, `page/gtr3/home/index.page.js`, `page/gtr3/home/index.style.js`, `page/gts3/home/index.page.js`, `page/gts3/home/index.style.js`, `utils/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.createWidget()` — `@zos/ui.createWidget`

```js
hmUI.createWidget(hmUI.widget.TEXT, {
  ...TEXT_STYLE,
});
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3/home/index.page.js`, line 7

```js
hmUI.createWidget(hmUI.widget.TEXT, {
  ...TEXT_STYLE,
});
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3-pro/home/index.page.js`, line 7

### `.getDeviceInfo()` — `@zos/device.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3/home/index.style.js`, line 4

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3-pro/home/index.style.js`, line 4

### `.getLogger()` — `@zos/utils.log`

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger("helloworld");
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3/home/index.page.js`, line 3

```js
const logger = DeviceRuntimeCore.HmLogger.getLogger("helloworld");
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3-pro/home/index.page.js`, line 3

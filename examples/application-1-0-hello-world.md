# hello-world

A Mini Program sample
for platform 1.0. Runtimes present: Device App.

Source: `zeppos-samples/application/1.0/hello-world`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Declares no permissions.

Targets: `gtr3`, `gtr3-pro`, `gts3` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `page/gtr3-pro/home/index.page.js`, `page/gtr3-pro/home/index.style.js`, `page/gtr3/home/index.page.js`, `page/gtr3/home/index.style.js`, `page/gts3/home/index.page.js`, `page/gts3/home/index.style.js`, `utils/index.js`

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.createWidget()` — likely `@zos/ui.createWidget`

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

### `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo`

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3/home/index.style.js`, line 4

```js
hmSetting.getDeviceInfo();
```
— `zeppos-samples/application/1.0/hello-world/page/gtr3-pro/home/index.style.js`, line 4

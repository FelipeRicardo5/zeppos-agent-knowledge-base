# Citations and assumptions

Knowledge base read: `zeppos-knowledge` @ `b3ac255ef7912e2401a9ce9314b81fc2953f4394`,
`data/manifest.json` `lastSyncAt: 2026-09-08T15:40:25.151Z`.

## A. Cited — the base carries these

| Where | Symbol | Record | Level | Confidence |
| --- | --- | --- | --- | --- |
| `page/index.js` | `@zos/sensor.HeartRate` | `api/zos-sensor.md` | >= 2 | OFFICIAL |
| `page/index.js` | `new HeartRate()` | `examples/application-2-0-showcase.md`, `page/sensor/heart_rate.js` L12 | — | OBSERVED |
| `page/index.js` | `@zos/ui.createWidget` | `api/zos-ui.md` | >= 2 | OFFICIAL |
| `page/index.js` | `@zos/ui.setProperty` | `compatibility/zos-ui.md` (level), `examples/index.md` "Methods called on a value" (call) | >= 2 | OFFICIAL / OBSERVED |
| `page/index.js` | `@zos/global.setInterval` / `clearInterval` | `api/zos-global.md`, `runtimes/device-app.md` L216 | >= 2 | OFFICIAL |
| `page/index.js` | `@zos/interaction.showToast` | `api/zos-interaction.md` | >= 2 | OFFICIAL |
| `page/index.js` | `@zos/storage.LocalStorage` + `new LocalStorage()`, `getItem`, `setItem` | `api/zos-storage.md`, `patterns/persistence-storage.md` (verbatim code) | >= 3 | OFFICIAL |
| `page/index.style.js` | `@zos/device.getDeviceInfo` + destructuring | `api/zos-device.md`, `examples/application-4-0-fetch-api.md` `utils/config/device.js` L2 | >= 2 | OFFICIAL |
| `page/index.style.js` | `@zos/utils.px` | `api/zos-utils.md` | >= 2 | OFFICIAL |
| `page/index.style.js` | 64 px status bar on square screens | `patterns/multi-screen-adaption.md` intro | — | OFFICIAL |
| `app.js`, `page/index.js` | `log.getLogger(...)` | `patterns/debug.md` | >= 2 | OFFICIAL |
| `app.js` | `BaseApp` shape | `api/zeppos-zml-base-app.md`, `examples/application-4-0-fetch-api.md` `app.js` L4 | not stated | OBSERVED |
| `page/index.js` | `BasePage` shape | `api/zeppos-zml-base-page.md`, `examples/application-4-0-todo-list.md` `index.page.js` L19 | not stated | OBSERVED |
| `app-side/index.js` | `BaseSideService` + `onInit`/`onRequest(req,res)`/`onRun` | `examples/application-4-0-fetch-api.md` `app-side/index.js` L42 | not stated | OBSERVED |
| `app-side/index.js` | `req.method` dispatch, `res(null, value)` | `examples/application-4-0-todo-list.md` `app-side/index.js` L12 | not stated | OBSERVED |
| `app-side/index.js` | `settingsLib.getItem` / `.setItem` | `examples/application-4-0-todo-list.md` `app-side/index.js` L7,8,23,32; `api/settings-storage.md` | not stated | OBSERVED / OFFICIAL |
| `app-side/index.js` | `this.fetch({ method, url })` | `examples/application-3-0-download.md`, `app-side/fetch-module.js` L8 | not stated | OBSERVED |
| `app-side/index.js` | `fetch` is Side-Service-only | `runtimes/side-service.md` vs `runtimes/device-app.md` | — | — |
| `setting/index.js` | `props.settingsStorage.getItem(...)` | `examples/application-2-0-post-health-data-miniprogram.md`, `setting/index.js` L70 | not stated | OBSERVED |
| `setting/index.js` | `ui.View/Section/Text/TextInput/Select/Button` exist, Settings App | `api/ui.md`, `runtimes/settings.md` | not stated | OFFICIAL |
| `app.json` | required top-level keys, `appType: "app"` | `examples/index.md` "What a real `app.json` contains" | — | OBSERVED |
| `app.json` | `targets.<k>.{module,platforms:[{name,deviceSource}],designWidth}` | `patterns/code-adaptations-for-new-devices.md` | — | OFFICIAL |
| `app.json` | Bip 6 `deviceSource` `9765120`/`9765121`/`10158337`, 390x450, level 4.2 | `compatibility/devices.md` L27 | — | OFFICIAL |
| `app.json` | `data:user.hd.heart_rate` | `api/zos-sensor.md` HeartRate description | — | OFFICIAL |
| `app.json` | `data:os.device.info` | `api/zos-device.md` getDeviceInfo description | — | OFFICIAL |
| `app.json` | `device:os.local_storage` | `api/zos-storage.md` localStorage description | — | OFFICIAL |
| `i18n/en-US.po` | `.po` `msgid`/`msgstr` format | `patterns/i18n.md` | — | OFFICIAL |

## B. Assumptions — the base does NOT carry these

Ranked by how much damage a wrong guess does.

**G1 — Settings App: entry point, import path, and every component prop.**
`[ASSUMPTION #9a–#9g]`, `setting/index.js`.
The base holds one line of Settings App code total. No registration function
(`AppSettingsPage` here is invented; `SKILL.md` names `Settings.render` instead and
the two contradict), no import specifier for the 13 `ui.*` components, and 12 of the
13 have no description at all. Requirement 3 is built almost entirely on guesswork.
*Cost: forced assumption on a whole required feature.*

**G2 — `fetch` request body and headers.** `[ASSUMPTION #8]`, `app-side/index.js`.
The only attested call is a two-key GET. Nothing states how a POST body or headers
are passed, or what the resolved value looks like. Requirement 2 rests on this.
*Cost: forced assumption on a required feature.*

**G3 — zml page→side call.** `[ASSUMPTION #5]`, `page/index.js`.
`this.request({ method, params })` appears nowhere. Reconstructed from
`patterns/bluetooth-communication.md` (old MessageBuilder: `.request({method, params})`)
plus the zml `onRequest(req, res)` receiver in the 4.0 samples. Only the reverse
direction, `this.call({ type })`, is attested.
*Cost: forced assumption; the whole watch↔phone link runs through it.*

**G4 — `settingsLib.addListener` receiver.** `[ASSUMPTION #6]`, `app-side/index.js`.
The `('change', ({key,newValue,oldValue}) => …)` signature is attested only against a
receiver spelled `settings.settingsStorage`, whose import the base never shows.
Assumed identical to `settingsLib`.

**G5 — two conflicting `createWidget` prop shapes.** `page/index.js`.
`patterns/code-organization.md` shows `{ attr: {...}, styles: {...} }`; every sample
shows flat props. Resolved in favour of the sample per `SKILL.md`.

**G6 — `widget` / `prop` / `align` / `text_style` have no API_LEVEL.**
`page/index.js`, `page/index.style.js`. `OBSERVED`, name-only. No UI compiles without
them and none can be certified for any device. Flagged, not worked around.

**G7 — `app.json` field *values*.** `app.json`.
`configVersion`, `runtime.apiVersion`, `app.appId`/`version`/`vender`, and the body of
`targets.*.module` (page registration) are all invented. The base records only which
top-level *keys* appear and in how many samples; the one guide showing `module`
elides its body as `// ···`. Also: `deviceSource` is a number in the guide but a
quoted string in `compatibility/devices.md` — I used numbers.

**G8 — i18n directory name.** `i18n/en-US.po`. The `.po` format is attested; where
the toolchain reads it from is not.

**G9 — no clock.** `[ASSUMPTION #7]`, `app-side/index.js`; `page/index.js`.
`@zos/sensor.Time` is Device-App-only and only `new Time()` is attested — no accessor.
No clock at all is recorded for the Side Service. Timestamping moved off the watch and
onto `new Date()`, which the base does not vouch for.

**G10 — `setInterval` import vs. global.** `[ASSUMPTION #2]`, `page/index.js`.
Filed under module `@zos/global` but never shown being imported or called.
Written as a bare global.

**G11 — no Bip-6 `targets` key.** `app.json`. No sample manifest names any 4.x-era
device; the key `bip-6` and the platform names are mine, built from the
`deviceSource` values in `compatibility/devices.md`.

**G12 — `HeartRate` has no accessor and no change callback.** `[ASSUMPTION #1, #4]`,
`page/index.js`. `getCurrent()` is borrowed from `new Calorie().getCurrent()`.
Nothing push-style exists for any sensor, so the live display polls.

# HeartSync

Reads the wearer's heart rate on the watch, shows it live, and POSTs each reading
to an HTTP endpoint configured from the phone.

```
app.json              manifest (targets the Amazfit Bip 6)
app.js                Device App entry — BaseApp
page/index.js         Device App page — sensor, UI, sync loop
page/index.style.js   Device App styles (px / align / text_style)
app-side/index.js     Side Service — settingsStorage + the HTTP POST
setting/index.js      Settings App — endpoint URL + interval picker
i18n/en-US.po         translations
assets/bip-6/         per-target assets (icon.png goes here)
```

Every API call carries an inline citation into the knowledge base. Anything the
base could **not** justify is marked `[ASSUMPTION #n]` at the call site and
collected in `CITATIONS.md`.

## How it works

1. `setting/index.js` writes `endpointUrl` and `syncIntervalSec` into
   `settingsStorage` on the phone.
2. `app-side/index.js` reads them back with `settingsLib.getItem` and answers the
   watch's `GET_CONFIG` request.
3. `page/index.js` polls `HeartRate` on a `setInterval`, repaints the BPM text
   when the value changes, and sends each reading to the Side Service as
   `POST_READING`.
4. The Side Service performs the actual `this.fetch({ method: 'POST', url, ... })`.
   The Device App runtime has no HTTP in this knowledge base — `fetch` is recorded
   for the Side Service only (`runtimes/side-service.md` vs `runtimes/device-app.md`).
5. The endpoint survives the app closing twice over: `settingsStorage` on the phone
   is the source of truth, and `@zos/storage.LocalStorage` mirrors it on the watch so
   a cold start with no phone in range still has a URL.

## Target device: Amazfit Bip 6

`compatibility/devices.md`, line 27:

| Device | API_LEVEL | Zepp OS | Screen | Keys |
| --- | --- | --- | --- | --- |
| Amazfit Bip 6 | 4.2 | 5.0 | square, 390 x 450 | 2 |

Every symbol this app uses that states a minimum is at or below 4.2:

| Symbol | Min API_LEVEL | Source |
| --- | --- | --- |
| `@zos/sensor.HeartRate` | >= 2 | `api/zos-sensor.md` |
| `@zos/ui.createWidget` | >= 2 | `api/zos-ui.md` |
| `@zos/ui.setProperty` | >= 2 | `compatibility/zos-ui.md` |
| `@zos/global.setInterval` | >= 2 | `api/zos-global.md` |
| `@zos/global.clearInterval` | >= 2 | `api/zos-global.md` |
| `@zos/device.getDeviceInfo` | >= 2 | `api/zos-device.md` |
| `@zos/interaction.showToast` | >= 2 | `api/zos-interaction.md` |
| `@zos/utils.px`, `@zos/utils.log` | >= 2 | `api/zos-utils.md` |
| `@zos/storage.LocalStorage` | **>= 3** | `api/zos-storage.md` |

**But the app cannot be certified for the Bip 6 as a whole**, and the reason is
structural rather than about this app. `@zos/ui.widget`, `@zos/ui.prop`,
`@zos/ui.align` and `@zos/ui.text_style` all carry `API_LEVEL: not stated` and
confidence `OBSERVED` (`api/zos-ui.md`). No Device App UI compiles without them, and
`skills/zepp-os/SKILL.md` says so directly: *"A symbol with no stated `API_LEVEL`
cannot be certified for any device."* The Bip 6 row's "353 of 353" count excludes
them. So: every symbol that **can** be checked, checks out at 4.2; four that the UI
depends on cannot be checked at all.

The same applies to the whole zml layer (`BaseApp`, `BasePage`, `BaseSideService`,
`settingsLib`), to `fetch`, to `settings-storage.*`, and to all 13 Settings App
components — every one is `not stated`.

## Does it also run on an Amazfit Bip 5?

**No, not as written.** It is one symbol away from running.

`compatibility/devices.md`, line 43: Amazfit Bip 5 — API_LEVEL **2.1**, Zepp OS 2.1,
square **320 x 380**, 1 key, "205 of 353" symbols available. It *is* a Zepp OS 2.x
device, so it is not in the "Zepp OS 1.0 devices" section where nothing in the base
applies — Mini Programs do run on it.

What passes at 2.1: `HeartRate` (>= 2), `createWidget` (>= 2), `setProperty` (>= 2),
`setInterval` / `clearInterval` (>= 2), `getDeviceInfo` (>= 2), `showToast` (>= 2),
`px` and `log` (>= 2). The whole read-display-and-send path is within reach.

What fails: **`@zos/storage.LocalStorage` is `>= 3`** (`api/zos-storage.md`,
`compatibility/zos-storage.md`). `page/index.js` uses it for the on-watch endpoint
cache. 2.1 < 3, so that import is unavailable.

Two further things would have to change, neither of them a blocker:

- **A second `targets` entry.** `designWidth` is per-target
  (`patterns/multi-screen-adaption.md`), and the Bip 5 is 320 x 380 against the
  Bip 6's 390 x 450, so `px()` would scale wrong without one. The Bip 5's target key
  is the one 4.x-era key this base actually attests —
  `320x380-amazfit-bip-5`, from the `targets` list of
  `examples/application-2-0-post-health-data-miniprogram.md`.
- **One physical key instead of two**, which this app does not use.

The minimal port is to drop the `LocalStorage` mirror and let `settingsStorage` on
the phone be the only store. I have not shipped that variant, because the base offers
no clean substitute: `@zos/storage.sessionStorage` is >= 2 but is "cleared after
exiting the Mini Program" (`api/zos-storage.md`) — it is precisely not persistence.
`@zos/fs.writeFileSync` is >= 2 and the todo-list samples use it for exactly this
job, so that is the likely real answer, but swapping it in would be a second,
untested code path shipped on a guess.

There is one loose end here worth naming: `compatibility/zos-storage.md` lists
`@zos/storage.localStorage-instance` at **>= 2** while `localStorage` and
`LocalStorage` are both **>= 3** — an instance of a class that does not exist until
level 3. I could not resolve what that record means, and I did not build on it.

A caveat the base itself asks for: `compatibility/devices.md` records each device's
*latest* level, so both answers assume the watch is updated.

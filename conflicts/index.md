# Conflicts

Everywhere the official sources contradict each other, or this base cannot tell
which of several answers is meant.

None of this exists upstream. A conflict is only visible because several fronts
are merged here, and no page on the official site knows that another page, or
the sample code it ships, says something else. Every row cites both sides so the
claim can be checked rather than trusted.

Read it as a warning list, not an errata: where this base has to resolve a
conflict it does so by source priority, and the page it lands on says nothing
about the version that lost. That is what this page is for.

## A field two sources state differently

Compared after normalising punctuation, markup and the trailing `permission
code:` note. Without that, 147 symbols "disagree" and every one of them is a
full stop. `API_LEVEL` and signatures never disagree at all.

### `@zos/sensor.Weather` — `description`

- **docs-reference** — This interface has been deprecated, please refer to https://github.com/orgs/zepp-health/discussions/83 Weather Forecasts sensor.
  <br/>`zeppos-docs/docs/reference/device-app-api/newAPI/sensor/Weather.mdx`
- **llms** — Weather Forecasts sensor
  <br/>`zeppos-docs/static/llms/@zos-sensor.md`

This base resolves it to the **docs-reference** value.

## A name written one way and documented another

A value that appears in code, one edit away from a symbol the documentation
describes, where no symbol of the written name exists. Both spellings are
`OFFICIAL`; one of them does not work.

| Written in code | Documented symbol | Where |
| --- | --- | --- |
| `widget.GRADKIENT_POLYLINE` | [`@zos/ui.GRADIENT_POLYLINE`](../api/zos-ui.md) | @zos/ui |

Only names of at least six characters, one edit apart, are compared: shorter
ones collide by accident — `prop.SRC` and the `ARC` widget are one edit apart
and unrelated. So this catches typos and misses renames.

## A method call this base cannot resolve

`examples/` finds these by matching the method name against the symbol table —
the receiver's type is never resolved, because that would need flow analysis.
Where the name matches more than one thing, the match is a hint and nothing
more. The instance members are usually the right answer and the module symbol
the wrong one: `.getItem()` in a Device App is `localStorage.getItem`, not the
Settings App's `settings-storage.getItem`.

| Call | Samples | Module symbols of that name | Instance members of that name |
| --- | --- | --- | --- |
| `.addEventListener()` | 7 | `@zos/ui.addEventListener` | `@zos/media.Player`, `@zos/media.Recorder` |
| `.clear()` | 7 | `settings-storage.clear` | `@zos/storage.ShareLocalStorage`, `@zos/storage.ShareTypedStorage`, `@zos/storage.TypedStorage`, `@zos/storage.localStorage`, `@zos/storage.localStorage-instance`, `@zos/storage.sessionStorage`, `@zos/storage.sessionStorage-instance`, `@zos/utils.EventBus` |
| `.getItem()` | 6 | `settings-storage.getItem` | `@zos/share-storage.LocalStorage`, `@zos/storage.ShareLocalStorage`, `@zos/storage.localStorage`, `@zos/storage.localStorage-instance`, `@zos/storage.sessionStorage`, `@zos/storage.sessionStorage-instance` |
| `.setItem()` | 6 | `settings-storage.setItem` | `@zos/storage.ShareLocalStorage`, `@zos/storage.localStorage`, `@zos/storage.localStorage-instance`, `@zos/storage.sessionStorage`, `@zos/storage.sessionStorage-instance` |
| `.addListener()` | 5 | `@zos/ble.addListener`, `messaging.addListener`, `settings-storage.addListener` | — |
| `.send()` | 4 | `@zos/ble.send`, `messaging.send` | — |
| `.cancel()` | 3 | `@zos/alarm.cancel`, `@zos/notification.cancel` | — |
| `.start()` | 3 | `@zos/app-service.start` | `@zos/crypto.DigestCrypto`, `@zos/media.Player`, `@zos/media.Recorder`, `@zos/sensor.Accelerometer`, `@zos/sensor.BloodOxygen`, `@zos/sensor.Buzzer`, `@zos/sensor.Compass`, `@zos/sensor.Geolocation`, `@zos/sensor.Gyroscope`, `@zos/sensor.SystemSounds`, `@zos/sensor.Vibrator` |
| `.getType()` | 2 | `@zos/ui.getType` | `@zos/sensor.Vibrator` |
| `.remove()` | 2 | — | `@zos/storage.ShareTypedStorage`, `@zos/storage.TypedStorage` |
| `.stop()` | 2 | `@zos/app-service.stop` | `@zos/media.Player`, `@zos/media.Recorder`, `@zos/sensor.Accelerometer`, `@zos/sensor.BloodOxygen`, `@zos/sensor.Buzzer`, `@zos/sensor.Compass`, `@zos/sensor.Geolocation`, `@zos/sensor.Gyroscope`, `@zos/sensor.SystemSounds`, `@zos/sensor.Vibrator` |
| `.exit()` | 1 | `@zos/app-service.exit`, `@zos/router.exit` | — |
| `.readFileSync()` | 1 | `@zos/fs.readFileSync` | `@zos/share-storage.FileSystem` |

## `widget`: documented pages and written ids

In `@zos/ui`, an id passed to `createWidget` should name a widget the
reference documents. Both directions have gaps, and the reference page itself
says its list is incomplete.

- **Written in code, no page**: `GRADKIENT_POLYLINE`, `IMG_LEVEL`, `STATE_BUTTON`
- **Documented, never written as an id**: `CANVAS`, `GRADIENT_POLYLINE`, `KEYBOARD`, `PAGE_INDICATOR`, `PAGE_SCROLLBAR`, `PICKER`, `POLYLINE`, `SYSTEM_KEYBOARD`, `TIME_PICKER`

In `hmUI`, an id passed to `createWidget` should name a widget the
reference documents. Both directions have gaps, and the reference page itself
says its list is incomplete.

- Every id seen in code has a documented page.
- **Documented, never written as an id**: `ARC`, `ARC_PROGRESS`, `CIRCLE`, `DATE_POINTER`, `DELEGATE`, `FILL_RECT`, `GRADKIENT_POLYLINE`, `IMG`, `IMG_ANIM`, `IMG_CLICK`, `IMG_DATE`, `IMG_LEVEL`, `IMG_POINTER`, `IMG_PROGRESS`, `IMG_STATUS`, `IMG_TIME`, `IMG_WEEK`, `STROKE_RECT`, `TEXT`, `TEXT_IMG`, `TIME_POINTER`

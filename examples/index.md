# Examples index

**33 official sample apps**, read as code rather than as a list of
import names.

`api/` says a symbol exists; `compatibility/` says since when. Neither says what
to pass it, because no record carries a signature. These do, with excerpts cited
to file and line — `OBSERVED` evidence of a call that works, not a documented
contract.

| App | Type | Platform | Runtimes | Symbols | Page |
| --- | --- | --- | --- | --- | --- |
| calories | application | 1.0 | Device App | 0 | [application-1-0-calories.md](application-1-0-calories.md) |
| fetch-api | application | 1.0 | Device App, Side Service | 0 | [application-1-0-fetch-api.md](application-1-0-fetch-api.md) |
| hello-world | application | 1.0 | Device App | 0 | [application-1-0-hello-world.md](application-1-0-hello-world.md) |
| todo-list | application | 1.0 | Device App, Settings App, Side Service | 0 | [application-1-0-todo-list.md](application-1-0-todo-list.md) |
| calories | application | 2.0 | Device App | 16 | [application-2-0-calories.md](application-2-0-calories.md) |
| fetch-api | application | 2.0 | Device App, Side Service | 9 | [application-2-0-fetch-api.md](application-2-0-fetch-api.md) |
| hello-world | application | 2.0 | Device App | 8 | [application-2-0-hello-world.md](application-2-0-hello-world.md) |
| MiniProgram | application | 2.0 | Device App, Settings App, Side Service | 16 | [application-2-0-post-health-data-miniprogram.md](application-2-0-post-health-data-miniprogram.md) |
| showcase | application | 2.0 | Device App | 32 | [application-2-0-showcase.md](application-2-0-showcase.md) |
| todo-list | application | 2.0 | Device App, Settings App, Side Service | 13 | [application-2-0-todo-list.md](application-2-0-todo-list.md) |
| 3.0-feature | application | 3.0 | Device App | 24 | [application-3-0-3-0-feature.md](application-3-0-3-0-feature.md) |
| calories | application | 3.0 | Device App | 11 | [application-3-0-calories.md](application-3-0-calories.md) |
| download | application | 3.0 | Device App, Side Service | 9 | [application-3-0-download.md](application-3-0-download.md) |
| fetch-api | application | 3.0 | Device App, Side Service | 6 | [application-3-0-fetch-api.md](application-3-0-fetch-api.md) |
| hello-world | application | 3.0 | Device App | 4 | [application-3-0-hello-world.md](application-3-0-hello-world.md) |
| notification | application | 3.0 | Device App | 5 | [application-3-0-notification.md](application-3-0-notification.md) |
| todo-list | application | 3.0 | Device App, Settings App, Side Service | 12 | [application-3-0-todo-list.md](application-3-0-todo-list.md) |
| 4.0-feature | application | 4.0 | Device App | 16 | [application-4-0-4-0-feature.md](application-4-0-4-0-feature.md) |
| calories | application | 4.0 | Device App | 11 | [application-4-0-calories.md](application-4-0-calories.md) |
| fetch-api | application | 4.0 | Device App, Side Service | 6 | [application-4-0-fetch-api.md](application-4-0-fetch-api.md) |
| hello-world | application | 4.0 | Device App | 4 | [application-4-0-hello-world.md](application-4-0-hello-world.md) |
| todo-list | application | 4.0 | Device App, Settings App, Side Service | 12 | [application-4-0-todo-list.md](application-4-0-todo-list.md) |
| simple-keyboard | application | 4.2 | Device App | 22 | [application-4-2-simple-keyboard.md](application-4-2-simple-keyboard.md) |
| t9-keyboard | application | 4.2 | Device App | 21 | [application-4-2-t9-keyboard.md](application-4-2-t9-keyboard.md) |
| basketball | watchface | 1.0 | Watchface | 0 | [watchface-1-0-basketball.md](watchface-1-0-basketball.md) |
| color-world | watchface | 1.0 | Watchface | 0 | [watchface-1-0-color-world.md](watchface-1-0-color-world.md) |
| simple | watchface | 1.0 | Watchface | 0 | [watchface-1-0-simple.md](watchface-1-0-simple.md) |
| timer | watchface | 1.0 | Watchface | 0 | [watchface-1-0-timer.md](watchface-1-0-timer.md) |
| timer | watchface | 3.0 | Watchface | 3 | [watchface-3-0-timer.md](watchface-3-0-timer.md) |
| empty | workout-extensions | 3.5 | Workout Extension | 0 | [workout-extensions-3-5-empty.md](workout-extensions-3-5-empty.md) |
| running-data-assistant | workout-extensions | 3.5 | Workout Extension | 10 | [workout-extensions-3-5-running-data-assistant.md](workout-extensions-3-5-running-data-assistant.md) |
| running-pace-master | workout-extensions | 3.5 | Workout Extension | 7 | [workout-extensions-3-5-running-pace-master.md](workout-extensions-3-5-running-pace-master.md) |
| running-pace-master-with-side-service | workout-extensions | 3.5 | Side Service, Workout Extension | 10 | [workout-extensions-3-5-running-pace-master-with-side-service.md](workout-extensions-3-5-running-pace-master-with-side-service.md) |

## Where a symbol is used

The lookup this view exists for: arrive with a symbol from `../api/`, leave with
code that calls it.

- `@zeppos/zml/base-app.BaseApp` — [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-todo-list](application-4-0-todo-list.md), [workout-extensions-3-5-running-pace-master-with-side-service](workout-extensions-3-5-running-pace-master-with-side-service.md)
- `@zeppos/zml/base-page.BasePage` — [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-todo-list](application-4-0-todo-list.md), [workout-extensions-3-5-running-pace-master-with-side-service](workout-extensions-3-5-running-pace-master-with-side-service.md)
- `@zeppos/zml/base-side.BaseSideService` — [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-todo-list](application-4-0-todo-list.md), [workout-extensions-3-5-running-pace-master-with-side-service](workout-extensions-3-5-running-pace-master-with-side-service.md)
- `@zeppos/zml/base/base-app.BaseApp` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md)
- `@zeppos/zml/base/base-page.BasePage` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md)
- `@zeppos/zml/base/base-side.BaseSideService` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md)
- `@zos/app.emitCustomSystemEvent` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/app.getPackageInfo` — [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-notification](application-3-0-notification.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/app.getScene` — [watchface-3-0-timer](watchface-3-0-timer.md)
- `@zos/app.queryPermission` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/app.requestPermission` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/device.getDeviceInfo` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-hello-world](application-2-0-hello-world.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-hello-world](application-3-0-hello-world.md), [application-3-0-notification](application-3-0-notification.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-hello-world](application-4-0-hello-world.md), [application-4-0-todo-list](application-4-0-todo-list.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/display.setPageBrightTime` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/fs.readFileSync` — [application-3-0-calories](application-3-0-calories.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `@zos/fs.statSync` — [application-3-0-calories](application-3-0-calories.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `@zos/fs.writeFileSync` — [application-3-0-calories](application-3-0-calories.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `@zos/i18n.getText` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-hello-world](application-2-0-hello-world.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-hello-world](application-3-0-hello-world.md), [application-3-0-notification](application-3-0-notification.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-hello-world](application-4-0-hello-world.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `@zos/interaction.createModal` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/interaction.offGesture` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/interaction.onDigitalCrown` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/interaction.onGesture` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/interaction.onKey` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/interaction.onWristMotion` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/interaction.showToast` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/page.scrollTo` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/router.back` — [application-2-0-calories](application-2-0-calories.md), [application-3-0-calories](application-3-0-calories.md), [application-4-0-calories](application-4-0-calories.md)
- `@zos/router.exit` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/router.launchApp` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `@zos/router.push` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-0-calories](application-4-0-calories.md)
- `@zos/router.replace` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/router.setLaunchAppTimeout` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.Accelerometer` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.BloodOxygen` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Calorie` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-calories](application-3-0-calories.md), [application-4-0-calories](application-4-0-calories.md)
- `@zos/sensor.Compass` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Distance` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.FatBurning` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.Geolocation` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Gyroscope` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.HeartRate` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Pai` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.Screen` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Sleep` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Stand` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.Step` — [application-2-0-showcase](application-2-0-showcase.md)
- `@zos/sensor.Stress` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/sensor.Time` — [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [workout-extensions-3-5-running-data-assistant](workout-extensions-3-5-running-data-assistant.md)
- `@zos/sensor.Vibrator` — [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/sensor.Workout` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `@zos/ui.createKeyboard` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/ui.createWidget` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-hello-world](application-2-0-hello-world.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md), [workout-extensions-3-5-running-data-assistant](workout-extensions-3-5-running-data-assistant.md), [workout-extensions-3-5-running-pace-master](workout-extensions-3-5-running-pace-master.md), [workout-extensions-3-5-running-pace-master-with-side-service](workout-extensions-3-5-running-pace-master-with-side-service.md)
- `@zos/ui.deleteKeyboard` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/ui.deleteWidget` — [application-2-0-calories](application-2-0-calories.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/ui.dumpLayout` — [application-4-0-4-0-feature](application-4-0-4-0-feature.md)
- `@zos/ui.getAppWidgetSize` — [application-2-0-calories](application-2-0-calories.md)
- `@zos/ui.getImageInfo` — [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/ui.getTextLayout` — [application-2-0-calories](application-2-0-calories.md)
- `@zos/ui.keyboard` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `@zos/ui.setAlpha` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `@zos/ui.setAppWidgetSize` — [application-2-0-calories](application-2-0-calories.md)
- `@zos/ui.setStatusBarVisible` — [application-2-0-showcase](application-2-0-showcase.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/ui.updateLayout` — [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `@zos/utils.EventBus` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-download](application-3-0-download.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md)
- `@zos/utils.log` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-notification](application-3-0-notification.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-todo-list](application-4-0-todo-list.md), [watchface-3-0-timer](watchface-3-0-timer.md)
- `@zos/utils.px` — [application-2-0-calories](application-2-0-calories.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-hello-world](application-2-0-hello-world.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-hello-world](application-3-0-hello-world.md), [application-3-0-notification](application-3-0-notification.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-hello-world](application-4-0-hello-world.md), [application-4-0-todo-list](application-4-0-todo-list.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md), [workout-extensions-3-5-running-data-assistant](workout-extensions-3-5-running-data-assistant.md), [workout-extensions-3-5-running-pace-master](workout-extensions-3-5-running-pace-master.md), [workout-extensions-3-5-running-pace-master-with-side-service](workout-extensions-3-5-running-pace-master-with-side-service.md)

## Methods called on a value

Never imported, so the samples front could not see them at all — `setProperty`
is the one the eval run tripped over. Matched by name against the symbol
records, with the receiver's type unresolved.

- `.addEventListener()` — likely `@zos/ui.addEventListener` — [application-1-0-calories](application-1-0-calories.md), [application-2-0-calories](application-2-0-calories.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-4-0-calories](application-4-0-calories.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md), [watchface-1-0-simple](watchface-1-0-simple.md), [watchface-1-0-timer](watchface-1-0-timer.md), [watchface-3-0-timer](watchface-3-0-timer.md)
- `.addListener()` — likely `@zos/ble.addListener` or `messaging.addListener` or `settings-storage.addListener` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-todo-list](application-2-0-todo-list.md)
- `.App()` — likely `@zos/global.App` — [watchface-1-0-simple](watchface-1-0-simple.md)
- `.Button()` — likely `ui.Button` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `.cancel()` — likely `@zos/alarm.cancel` or `@zos/notification.cancel` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.clear()` — likely `settings-storage.clear` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-showcase](application-2-0-showcase.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.clearTimeout()` — likely `@zos/global.clearTimeout` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [watchface-1-0-basketball](watchface-1-0-basketball.md), [watchface-1-0-color-world](watchface-1-0-color-world.md), [watchface-1-0-simple](watchface-1-0-simple.md), [watchface-1-0-timer](watchface-1-0-timer.md)
- `.convert()` — likely `image-convert.convert` — [application-3-0-download](application-3-0-download.md)
- `.createConnect()` — likely `@zos/ble.createConnect` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-todo-list](application-2-0-todo-list.md)
- `.createWidget()` — likely `@zos/ui.createWidget` — [application-1-0-calories](application-1-0-calories.md), [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-hello-world](application-1-0-hello-world.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-calories](application-2-0-calories.md), [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-hello-world](application-3-0-hello-world.md), [application-3-0-notification](application-3-0-notification.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-hello-world](application-4-0-hello-world.md), [application-4-0-todo-list](application-4-0-todo-list.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md), [watchface-1-0-basketball](watchface-1-0-basketball.md), [watchface-1-0-color-world](watchface-1-0-color-world.md), [watchface-1-0-simple](watchface-1-0-simple.md), [watchface-1-0-timer](watchface-1-0-timer.md), [watchface-3-0-timer](watchface-3-0-timer.md)
- `.deleteWidget()` — likely `@zos/ui.deleteWidget` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.disConnect()` — likely `@zos/ble.disConnect` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-todo-list](application-2-0-todo-list.md)
- `.downloadFile()` — likely `download-file.downloadFile` — [application-3-0-download](application-3-0-download.md)
- `.exit()` — likely `@zos/app-service.exit` or `@zos/router.exit` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.fetch()` — likely `fetch.fetch` — [application-3-0-download](application-3-0-download.md)
- `.getAllAlarms()` — likely `@zos/alarm.getAllAlarms` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.getAllAppServices()` — likely `@zos/app-service.getAllAppServices` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.getAllNotifications()` — likely `@zos/notification.getAllNotifications` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.getDeviceInfo()` — likely `@zos/device.getDeviceInfo` — [application-1-0-calories](application-1-0-calories.md), [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-hello-world](application-1-0-hello-world.md), [application-1-0-todo-list](application-1-0-todo-list.md)
- `.getItem()` — likely `settings-storage.getItem` — [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-calories](application-2-0-calories.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `.getLanguage()` — likely `@zos/settings.getLanguage` — [watchface-1-0-simple](watchface-1-0-simple.md)
- `.getProperty()` — likely `@zos/ui.getProperty` — [application-2-0-showcase](application-2-0-showcase.md), [watchface-1-0-color-world](watchface-1-0-color-world.md)
- `.getTextLayout()` — likely `@zos/ui.getTextLayout` — [application-3-0-calories](application-3-0-calories.md), [application-4-0-calories](application-4-0-calories.md)
- `.getType()` — likely `@zos/ui.getType` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.keyboard()` — likely `@zos/ui.keyboard` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.launchApp()` — likely `@zos/router.launchApp` — [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.mstBuildProfile()` — likely `@zos/ble.mstBuildProfile` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstConnect()` — likely `@zos/ble.mstConnect` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstDisconnect()` — likely `@zos/ble.mstDisconnect` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOffAllCb()` — likely `@zos/ble.mstOffAllCb` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnCharaNotification()` — likely `@zos/ble.mstOnCharaNotification` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnCharaValueArrived()` — likely `@zos/ble.mstOnCharaValueArrived` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnCharaWriteComplete()` — likely `@zos/ble.mstOnCharaWriteComplete` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnDescValueArrived()` — likely `@zos/ble.mstOnDescValueArrived` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnDescWriteComplete()` — likely `@zos/ble.mstOnDescWriteComplete` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnPrepare()` — likely `@zos/ble.mstOnPrepare` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnServiceChangeBegin()` — likely `@zos/ble.mstOnServiceChangeBegin` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstOnServiceChangeEnd()` — likely `@zos/ble.mstOnServiceChangeEnd` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstStartScan()` — likely `@zos/ble.mstStartScan` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstStopScan()` — likely `@zos/ble.mstStopScan` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.mstWriteDescriptor()` — likely `@zos/ble.mstWriteDescriptor` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.notify()` — likely `@zos/notification.notify` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-notification](application-3-0-notification.md)
- `.readdirSync()` — likely `@zos/fs.readdirSync` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md)
- `.readFileSync()` — likely `@zos/fs.readFileSync` — [application-1-0-todo-list](application-1-0-todo-list.md)
- `.redraw()` — likely `@zos/ui.redraw` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.send()` — likely `@zos/ble.send` or `messaging.send` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-todo-list](application-2-0-todo-list.md)
- `.set()` — likely `@zos/alarm.set` — [application-1-0-calories](application-1-0-calories.md), [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-fetch-api](application-2-0-fetch-api.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-notification](application-3-0-notification.md), [application-4-0-calories](application-4-0-calories.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.setAlpha()` — likely `@zos/ui.setAlpha` — [application-3-0-download](application-3-0-download.md), [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `.setItem()` — likely `settings-storage.setItem` — [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-calories](application-2-0-calories.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `.setProperty()` — likely `@zos/ui.setProperty` — [application-1-0-calories](application-1-0-calories.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-2-0-calories](application-2-0-calories.md), [application-2-0-post-health-data-miniprogram](application-2-0-post-health-data-miniprogram.md), [application-2-0-showcase](application-2-0-showcase.md), [application-2-0-todo-list](application-2-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-calories](application-3-0-calories.md), [application-3-0-download](application-3-0-download.md), [application-3-0-fetch-api](application-3-0-fetch-api.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-4-0-feature](application-4-0-4-0-feature.md), [application-4-0-calories](application-4-0-calories.md), [application-4-0-fetch-api](application-4-0-fetch-api.md), [application-4-0-todo-list](application-4-0-todo-list.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md), [watchface-1-0-basketball](watchface-1-0-basketball.md), [watchface-1-0-simple](watchface-1-0-simple.md), [watchface-1-0-timer](watchface-1-0-timer.md), [watchface-3-0-timer](watchface-3-0-timer.md), [workout-extensions-3-5-running-data-assistant](workout-extensions-3-5-running-data-assistant.md)
- `.showToast()` — likely `@zos/interaction.showToast` — [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-3-0-todo-list](application-3-0-todo-list.md), [application-4-0-todo-list](application-4-0-todo-list.md)
- `.start()` — likely `@zos/app-service.start` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [application-4-2-t9-keyboard](application-4-2-t9-keyboard.md)
- `.stop()` — likely `@zos/app-service.stop` — [application-2-0-showcase](application-2-0-showcase.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md)
- `.stopTimer()` — likely `@zos/timer.stopTimer` — [application-1-0-fetch-api](application-1-0-fetch-api.md), [application-1-0-todo-list](application-1-0-todo-list.md), [application-3-0-3-0-feature](application-3-0-3-0-feature.md), [watchface-1-0-basketball](watchface-1-0-basketball.md), [watchface-1-0-color-world](watchface-1-0-color-world.md), [watchface-1-0-simple](watchface-1-0-simple.md), [watchface-1-0-timer](watchface-1-0-timer.md), [watchface-3-0-timer](watchface-3-0-timer.md)
- `.Text()` — likely `ui.Text` — [application-4-2-simple-keyboard](application-4-2-simple-keyboard.md)
- `.updateLayoutStyle()` — likely `@zos/ui.updateLayoutStyle` — [application-4-0-4-0-feature](application-4-0-4-0-feature.md)
- `.writeFileSync()` — likely `@zos/fs.writeFileSync` — [application-1-0-todo-list](application-1-0-todo-list.md)

## What a real `app.json` contains

Across 33 working manifests. Upstream documents the file;
these are files that build. The count is how many samples use each key, so a
key present in all of them is not optional.

| Key | In how many samples |
| --- | --- |
| `app` | 33 of 33 |
| `configVersion` | 33 of 33 |
| `defaultLanguage` | 33 of 33 |
| `permissions` | 33 of 33 |
| `runtime` | 33 of 33 |
| `targets` | 32 of 33 |
| `i18n` | 31 of 33 |
| `debug` | 15 of 33 |
| `designWidth` | 1 of 33 |
| `module` | 1 of 33 |
| `packageInfo` | 1 of 33 |
| `platforms` | 1 of 33 |

### Permissions declared

A permission a symbol needs but `app.json` omits fails at runtime, not at build.

- `data:os.device.info` — 20 samples
- `device:os.local_storage` — 12 samples
- `data:user.hd.calorie` — 4 samples
- `data:user.hd.sleep` — 4 samples
- `gps` — 4 samples
- `data:user.hd.heart_rate` — 3 samples
- `data:user.hd.spo2` — 3 samples
- `data:user.hd.stress` — 3 samples
- `device:os.geolocation` — 3 samples
- `device:os.alarm` — 3 samples
- `device:os.ble` — 3 samples
- `device:os.notification` — 3 samples
- `data:user.hd.workout` — 2 samples
- `device:os.accelerometer` — 2 samples
- `device:os.bg_service` — 2 samples
- `device:os.compass` — 2 samples
- `device:os.gyroscope` — 2 samples
- `event:customize.test` — 2 samples
- `event:os.bp.expires` — 2 samples
- `event:os.bp.high` — 2 samples
- `event:os.bp.low` — 2 samples
- `event:os.health.heart_rate_abnl` — 2 samples
- `event:os.health.sleep_status` — 2 samples
- `event:os.system.no_disturb` — 2 samples
- `event:os.system.power_saving` — 2 samples
- `event:os.system.theater_mode` — 2 samples
- `event:os.weather.sun_rise` — 2 samples
- `event:os.weather.sun_set` — 2 samples
- `device:os.input.method` — 2 samples
- `data:user.hd.distance` — 1 sample
- `data:user.hd.fat_burning` — 1 sample
- `data:user.hd.pai` — 1 sample
- `data:user.hd.stand` — 1 sample
- `data:user.hd.step` — 1 sample

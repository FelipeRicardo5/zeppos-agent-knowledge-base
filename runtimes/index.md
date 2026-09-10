# Runtime index

Which runtime each covered symbol is valid in. Identify the target runtime
before trusting anything in `../api/` — a symbol documented for the Device App
is not thereby available in the Settings App or a Watchface.

| Runtime | Symbols | Modules | Page |
| --- | --- | --- | --- |
| Device App | 375 | 31 | [device-app.md](device-app.md) |
| Side Service | 20 | 10 | [side-service.md](side-service.md) |
| Settings App | 21 | 3 | [settings.md](settings.md) |
| Watchface | 3 | 2 | [watchface.md](watchface.md) |
| Workout Extension | 12 | 5 | [workout-extension.md](workout-extension.md) |

## Valid in more than one runtime

The symbols for which a second runtime has actual evidence behind it.

- `@zeppos/zml/base-app.BaseApp` — Device App, Workout Extension
- `@zeppos/zml/base-page.BasePage` — Device App, Workout Extension
- `@zos/app.getScene` — Device App, Watchface
- `@zos/app.SCENE_AOD` — Device App, Watchface
- `@zos/sensor.Time` — Device App, Workout Extension
- `@zos/ui.align` — Device App, Workout Extension
- `@zos/ui.createWidget` — Device App, Workout Extension
- `@zos/ui.prop` — Device App, Workout Extension
- `@zos/ui.text_style` — Device App, Workout Extension
- `@zos/ui.widget` — Device App, Workout Extension
- `@zos/utils.log` — Device App, Watchface
- `@zos/utils.px` — Device App, Workout Extension
- `global.console.log` — Settings App, Side Service
- `settings-storage.addListener` — Settings App, Side Service
- `settings-storage.clear` — Settings App, Side Service
- `settings-storage.getItem` — Settings App, Side Service
- `settings-storage.length` — Settings App, Side Service
- `settings-storage.removeItem` — Settings App, Side Service
- `settings-storage.setItem` — Settings App, Side Service
- `settings-storage.toObject` — Settings App, Side Service

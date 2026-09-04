# @zos/global

**14 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `App` | function | >= 2 | OFFICIAL |
| `AppService` | function | >= 3 | OFFICIAL |
| `AppWidget` | function | >= 2 | OFFICIAL |
| `Buffer` | value | >= 2 | OFFICIAL |
| `clearInterval` | function | >= 2 | OFFICIAL |
| `clearTimeout` | function | >= 2 | OFFICIAL |
| `console` | value | >= 2 | OFFICIAL |
| `DataWidget` | function | >= 3.6 | OFFICIAL |
| `getApp` | function | >= 2 | OFFICIAL |
| `getCurrentPage` | function | >= 2 | OFFICIAL |
| `Page` | function | >= 2 | OFFICIAL |
| `SecondaryWidget` | function | >= 2 | OFFICIAL |
| `setInterval` | function | >= 2 | OFFICIAL |
| `setTimeout` | function | >= 2 | OFFICIAL |

## Descriptions

### `@zos/global.App`

Register the Mini Program, specifying the Mini Program's lifecycle callbacks, etc. `App()` must be called in `app.js`, and can only be called once.

### `@zos/global.AppService`

Register an App Service in the Mini Program, specify the lifecycle callback for the current App Service, etc. Each App Service file must call the `AppService()` constructor only once. permission code: `device:os.bg_service`

### `@zos/global.AppWidget`

Register AppWidget, specify the lifecycle callback for the current AppWidget, etc. Each AppWidget file must call the `AppWidget()` constructor only once.

### `@zos/global.Buffer`

Buffer, Reference Node.js https://nodejs.org/dist/latest-v16.x/docs/api/buffer.html.

### `@zos/global.clearInterval`

Cancel the timer registered by `setInterval`.

### `@zos/global.clearTimeout`

Cancel the timer registered by `setTimeout`.

### `@zos/global.console`

Console Print Log.

### `@zos/global.DataWidget`

Register DataWidget, specify the lifecycle callback for the current DataWidget, etc. Each DataWidget file must call the `DataWidget()` constructor only once.

### `@zos/global.getApp`

Get the app instance object.

### `@zos/global.getCurrentPage`

Get the page instance object.

### `@zos/global.Page`

Register a page in the Mini Program, specify the lifecycle callback for the current page, etc. Each page file must call the `Page()` constructor only once.

### `@zos/global.SecondaryWidget`

Register SecondaryWidget, specify the lifecycle callback for the current SecondaryWidget, etc. Each SecondaryWidget file must call the `SecondaryWidget()` constructor only once.

### `@zos/global.setInterval`

Repeatedly call a function with a fixed time interval between each call.

### `@zos/global.setTimeout`

Set a timer and execute the registered callback function after the timer expires.

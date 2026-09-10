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

## Symbols in detail

### `@zos/global.App`

Register the Mini Program, specifying the Mini Program's lifecycle callbacks, etc. `App()` must be called in `app.js`, and can only be called once.

```ts
function App(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `globalData` | `object` | not stated | — | >= 2 | Mounted data objects on App instances that can be used to store the global state of the Mini Program |
| `onCreate` | `(params?: string) =&#62; void` | not stated | — | >= 2 | Mounted data objects on App instances that can be used to store the global state of the Mini Program |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 2 | The onDestroy lifecycle function is triggered when the Mini Program is destroyed |

### `@zos/global.AppService`

Register an App Service in the Mini Program, specify the lifecycle callback for the current App Service, etc. Each App Service file must call the `AppService()` constructor only once. permission code: `device:os.bg_service`

```ts
function AppService(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 3 | A data object mounted on the appService instance that can be used to store the current state of the service |
| `onInit` | `(params?: string) =&#62; void` | not stated | — | >= 3 | This function is triggered when the service is started. If the service is started with params, the params string can be obtained in the onInit method |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 3 | The onDestroy lifecycle function is triggered when the service is destroyed |

### `@zos/global.AppWidget`

Register AppWidget, specify the lifecycle callback for the current AppWidget, etc. Each AppWidget file must call the `AppWidget()` constructor only once.

```ts
function AppWidget(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 2 | A data object mounted on a AppWidget instance that can be used to store the state of the current AppWidget |
| `onInit` | `(params?: string) =&#62; void` | not stated | — | >= 2 | It is triggered once per AppWidget and can be used to initialize the AppWidget state |
| `build` | `(params?: string) =&#62; void` | not stated | — | >= 2 | Triggered after onInit execution completes, recommended for UI drawing in the build lifecycle |
| `onResume` | `() =&#62; void` | not stated | — | >= 2 | Triggered when the screen focus is on this AppWidget |
| `onPause` | `() =&#62; void` | not stated | — | >= 2 | Triggered when the screen focus leaves this AppWidget |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 2 | The onDestroy lifecycle function is triggered when the AppWidget is destroyed |

### `@zos/global.Buffer`

Buffer, Reference Node.js https://nodejs.org/dist/latest-v16.x/docs/api/buffer.html.

### `@zos/global.clearInterval`

Cancel the timer registered by `setInterval`.

```ts
function clearInterval(intervalID: IntervalID): void
```

### `@zos/global.clearTimeout`

Cancel the timer registered by `setTimeout`.

```ts
function clearTimeout(timeoutID: TimeoutID): void
```

### `@zos/global.console`

Console Print Log.

**Called on a `console` value** — 1 members

| Member | Signature |
| --- | --- |
| [`log`](#zosglobalconsolelog) | `log(...data: any[]): void` |

#### `@zos/global.console.log`

Print log level logs with any number of parameters. Each log is limited in length and will be truncated if it is exceeded. To print the full content, the developer needs to print the content in multiple times

```ts
log(...data: any[]): void
```

### `@zos/global.DataWidget`

Register DataWidget, specify the lifecycle callback for the current DataWidget, etc. Each DataWidget file must call the `DataWidget()` constructor only once.

```ts
function DataWidget(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 3.6 | A data object mounted on a DataWidget instance that can be used to store the state of the current DataWidget |
| `onInit` | `(params?: string) =&#62; void` | not stated | — | >= 3.6 | It is triggered once per DataWidget and can be used to initialize the DataWidget state |
| `build` | `(params?: string) =&#62; void` | not stated | — | >= 3.6 | Triggered after onInit execution completes, recommended for UI drawing in the build lifecycle |
| `onResume` | `() =&#62; void` | not stated | — | >= 3.6 | Triggered when the screen focus is on this DataWidget |
| `onPause` | `() =&#62; void` | not stated | — | >= 3.6 | Triggered when the screen focus leaves this DataWidget |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 3.6 | The onDestroy lifecycle function is triggered when the DataWidget is destroyed |

### `@zos/global.getApp`

Get the app instance object.

```ts
function getApp(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `\_options` | `Options` | not stated | — | >= 2 | app instance property |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `globalData` | `object` | not stated | — | >= 2 | mounted data objects on app instances |

### `@zos/global.getCurrentPage`

Get the page instance object.

```ts
function getCurrentPage(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `\_options` | `Options` | not stated | — | >= 2 | page instance property |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 2 | mounted data objects on page instances |

### `@zos/global.Page`

Register a page in the Mini Program, specify the lifecycle callback for the current page, etc. Each page file must call the `Page()` constructor only once.

```ts
function Page(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 2 | A data object mounted on a page instance that can be used to store the state of the current page |
| `onInit` | `(params?: string) =&#62; void` | not stated | — | >= 2 | It is triggered once per page and can be used to initialize the page state. If the page is opened by the relevant method in the router module with params parameters, the params string can be retrieved in the onInit method |
| `build` | `(params?: string) =&#62; void` | not stated | — | >= 2 | Triggered after onInit execution completes, recommended for UI drawing in the build lifecycle |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 2 | The onDestroy lifecycle function is triggered when the page is destroyed |

### `@zos/global.SecondaryWidget`

Register SecondaryWidget, specify the lifecycle callback for the current SecondaryWidget, etc. Each SecondaryWidget file must call the `SecondaryWidget()` constructor only once.

```ts
function SecondaryWidget(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `state` | `object` | not stated | — | >= 2 | A data object mounted on a SecondaryWidget instance that can be used to store the state of the current SecondaryWidget |
| `onInit` | `(params?: string) =&#62; void` | not stated | — | >= 2 | It is triggered once per SecondaryWidget and can be used to initialize the SecondaryWidget state |
| `build` | `(params?: string) =&#62; void` | not stated | — | >= 2 | Triggered after onInit execution completes, recommended for UI drawing in the build lifecycle |
| `onResume` | `() =&#62; void` | not stated | — | >= 2 | Triggered when the screen focus is on this SecondaryWidget |
| `onPause` | `() =&#62; void` | not stated | — | >= 2 | Triggered when the screen focus leaves this SecondaryWidget |
| `onDestroy` | `() =&#62; void` | not stated | — | >= 2 | The onDestroy lifecycle function is triggered when the SecondaryWidget is destroyed |

### `@zos/global.setInterval`

Repeatedly call a function with a fixed time interval between each call.

```ts
function setInterval(callback: Callback, delay: Delay): IntervalID
```

### `@zos/global.setTimeout`

Set a timer and execute the registered callback function after the timer expires.

```ts
function setTimeout(callback: Callback, delay?: Delay): TimeoutID
```

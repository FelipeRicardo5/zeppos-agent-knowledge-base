# @zos/app-service

**4 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `exit` | function | >= 3 | OFFICIAL |
| `getAllAppServices` | function | >= 3 | OFFICIAL |
| `start` | function | >= 3 | OFFICIAL |
| `stop` | function | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/app-service.exit`

Called in The App Service, it will exit the service and will not affect the foreground page. permission code: `device:os.bg_service`

```ts
function exit(): void
```

### `@zos/app-service.getAllAppServices`

Get the list of running App services, used to query the service status. permission code: `device:os.bg_service`

```ts
function getAllAppServices(): Result
```

### `@zos/app-service.start`

Start the specified App service, return the result through the callback function. permission code: `device:os.bg_service`

```ts
function start(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 3 | The App Service js file must be the one configured in the module app-service in app.json |
| `param` | `string` | not stated | — | >= 3 | Parameters passed in when the js file is loaded by the backend service |
| `complete_func` | `(callbackOption: CallbackOption) =&#62; void` | not stated | — | >= 3 | Callback function for the completion of the backend service start |
| `reload` | `boolean` | not stated | `true` | >= 4 | Whether to persist and automatically restart following system running state changes. System state changes include: system restart, power saving mode entry/exit, system language changes, Mini Program updates, etc. |

**CallbackOption**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 3 | App service js file, same as start incoming parameters |
| `result` | `boolean` | not stated | — | >= 3 | App service start result, true means success, false means failure |

**ERROR_CODE**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 3 | Success |
| `1` | `number` | >= 3 | Parameter error |
| `2` | `number` | >= 3 | Service Status Error |
| `3` | `number` | >= 3 | No Permission |
| `4` | `number` | >= 3 | Out Of Memory |
| `5` | `number` | >= 3 | Not Supported |
| `6` | `number` | >= 3 | Prohibited |
| `7` | `number` | >= 3 | The number of services has reached the system limit |
| `255` | `number` | >= 3 | Unknown Error |

### `@zos/app-service.stop`

Shutdown the specified backend service, called asynchronously, with the shutdown result returned via a callback function. permission code: `device:os.bg_service`

```ts
function stop(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 3 | The App Service js file must be the one configured in the service module in app.json |
| `complete_func` | `(callbackOption: CallbackOption) =&#62; void` | not stated | — | >= 3 | Callback function for the completion of the backend service stop |

**CallbackOption**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 3 | App service js file, same as stop incoming parameters |
| `result` | `boolean` | not stated | — | >= 3 | App service stop result, true means success, false means failure |

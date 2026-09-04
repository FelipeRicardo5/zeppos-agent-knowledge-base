# @zos/app-service

**4 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `exit` | function | >= 3 | OFFICIAL |
| `getAllAppServices` | function | >= 3 | OFFICIAL |
| `start` | function | >= 3 | OFFICIAL |
| `stop` | function | >= 3 | OFFICIAL |

## Descriptions

### `@zos/app-service.exit`

Called in The App Service, it will exit the service and will not affect the foreground page. permission code: `device:os.bg_service`

### `@zos/app-service.getAllAppServices`

Get the list of running App services, used to query the service status. permission code: `device:os.bg_service`

### `@zos/app-service.start`

Start the specified App service, return the result through the callback function. permission code: `device:os.bg_service`

### `@zos/app-service.stop`

Shutdown the specified backend service, called asynchronously, with the shutdown result returned via a callback function. permission code: `device:os.bg_service`

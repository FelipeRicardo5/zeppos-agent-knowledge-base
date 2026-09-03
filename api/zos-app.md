# @zos/app

**8 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `emitCustomSystemEvent` | function | >= 3 | OFFICIAL |
| `getPackageInfo` | function | >= 2 | OFFICIAL |
| `getPackageInfoById` | function | >= 4 | OFFICIAL |
| `getPerformance` | function | >= 4 | OFFICIAL |
| `getScene` | function | >= 2 | OFFICIAL |
| `queryPermission` | function | >= 3 | OFFICIAL |
| `requestPermission` | function | >= 3 | OFFICIAL |
| `SCENE_AOD` | constant | any | OBSERVED |

## Descriptions

### `@zos/app.emitCustomSystemEvent`

The Mini Program can customize the system events and can actively dispatch the custom system events.

### `@zos/app.getPackageInfo`

Get some of the fields in the Mini Program configuration `app.json`.

### `@zos/app.getPackageInfoById`

Get some of the fields in the Mini Program configuration `app.json` by app ID.

### `@zos/app.getPerformance`

Get Mini Program performance statistics, including memory usage and loading performance metrics.

### `@zos/app.getScene`

Get the current scene where the Mini Program is running.

### `@zos/app.queryPermission`

Check the authorization status of Mini Program permissions.

### `@zos/app.requestPermission`

Dynamic permission application, when querying a dynamic permission has not been authorized, you can use this interface to apply for the relevant permission. Generally, before using the system-related functional interface (such as the interface to enable app services), do the relevant permission check and application, otherwise the functional interface will not be allowed to execute due to the permission issue.

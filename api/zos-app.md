# @zos/app

**11 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `emitCustomSystemEvent` | function | >= 3 | OFFICIAL |
| `getPackageInfo` | function | >= 2 | OFFICIAL |
| `getPackageInfoById` | function | >= 4 | OFFICIAL |
| `getPerformance` | function | >= 4 | OFFICIAL |
| `getScene` | function | >= 2 | OFFICIAL |
| `queryPermission` | function | >= 3 | OFFICIAL |
| `requestPermission` | function | >= 3 | OFFICIAL |
| `SCENE_AOD` | constant | >= 2 | OFFICIAL |
| `SCENE_APP` | constant | >= 2 | OFFICIAL |
| `SCENE_SETTINGS` | constant | >= 2 | OFFICIAL |
| `SCENE_WATCHFACE` | constant | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/app.emitCustomSystemEvent`

The Mini Program can customize the system events and can actively dispatch the custom system events.

```ts
function emitCustomSystemEvent(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `eventName` | `string` | not stated | — | >= 3 | Customize event names that meet the naming convention of event:customize.${event} |
| `eventParam` | `string` | not stated | — | >= 3 | Custom event parameters, this parameter is passed to the onInit lifecycle function of the AppService constructor |

### `@zos/app.getPackageInfo`

Get some of the fields in the Mini Program configuration `app.json`.

```ts
function getPackageInfo(): Result
```

### `@zos/app.getPackageInfoById`

Get some of the fields in the Mini Program configuration `app.json` by app ID.

```ts
function getPackageInfoById(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appId` | `number` | not stated | — | >= 4 | Mini Program ID |

### `@zos/app.getPerformance`

Get Mini Program performance statistics, including memory usage and loading performance metrics.

```ts
function getPerformance(...args: Array<'memory' | 'perf'>): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `memory` | `Memory` | not stated | — | >= 4 | Memory statistics |
| `perf` | `Perf` | not stated | — | >= 4 | Performance statistics |

**Memory**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `system` | `SystemMemory` | not stated | — | >= 4 | system memory information |
| `app` | `Array&#60;AppMemory&#62;` | not stated | — | >= 4 | Application memory information list |
| `leaking` | `Array&#60;LeakingMemory&#62;` | not stated | — | >= 4 | Unreleased memory information list |

**SystemMemory**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `used` | `number` | not stated | — | >= 4 | Used memory (bytes) |
| `total` | `number` | not stated | — | >= 4 | Total memory (bytes) |

**AppMemory**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appid` | `number` | not stated | — | >= 4 | Mini Program ID |
| `used` | `number` | not stated | — | >= 4 | Memory usage (bytes) |
| `peak` | `number` | not stated | — | >= 4 | Peak memory usage (bytes) |
| `modules` | `Array&#60;MemoryModule&#62;` | not stated | — | >= 4 | Module memory information |

**LeakingMemory**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appid` | `number` | not stated | — | >= 4 | Mini Program ID |
| `used` | `number` | not stated | — | >= 4 | Memory usage (bytes) |
| `modules` | `Array&#60;MemoryModule&#62;` | not stated | — | >= 4 | Module memory information |

**MemoryModule**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 4 | File path |
| `used` | `number` | not stated | — | >= 4 | Memory usage (bytes) |
| `peak` | `number` | not stated | — | >= 4 | Peak memory usage (bytes) |

**Perf**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appid` | `number` | not stated | — | >= 4 | Mini Program ID |
| `modules` | `Array&#60;PerfModule&#62;` | not stated | — | >= 4 | Module performance information list |

**PerfModule**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `file` | `string` | not stated | — | >= 4 | File name |
| `evalTime` | `number` | not stated | — | >= 4 | File reading and running time (excluding lifecycle execution time) |
| `createTime` | `number` | not stated | — | >= 4 | onCreate lifecycle execution time |
| `initTime` | `number` | not stated | — | >= 4 | onInit lifecycle execution time |
| `buildTime` | `number` | not stated | — | >= 4 | build lifecycle execution time |

### `@zos/app.getScene`

Get the current scene where the Mini Program is running.

```ts
function getScene(): Result
```

**Current scene running Mini Program constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `SCENE_AOD` | >= 2 | In the rest screen screen |
| `SCENE_APP` | >= 2 | In Mini Program |
| `SCENE_SETTINGS` | >= 2 | In the Mini Program configuration or dial edit page |
| `SCENE_WATCHFACE` | >= 2 | In watchface interface |

### `@zos/app.queryPermission`

Check the authorization status of Mini Program permissions.

```ts
function queryPermission(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `permissions` | `Array&#60;string&#62;` | not stated | — | >= 3 | An array of permission strings, with an array length of at least 1 |

### `@zos/app.requestPermission`

Dynamic permission application, when querying a dynamic permission has not been authorized, you can use this interface to apply for the relevant permission. Generally, before using the system-related functional interface (such as the interface to enable app services), do the relevant permission check and application, otherwise the functional interface will not be allowed to execute due to the permission issue.

```ts
function requestPermission(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `permissions` | `Array&#60;string&#62;` | not stated | — | >= 3 | An array of permission strings, with an array length of at least 1 |
| `callback` | `(result: Array&#60;number&#62;) =&#62; void` | not stated | — | >= 3 | Permission request result callback function |

**result**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `0` | `number` | >= 3 | In authorization processing, user interaction will be triggered, and the user will be informed of the authorization result in the callback function |
| `1` | `number` | >= 3 | There are no authorization requests that can be made |
| `2` | `number` | >= 3 | The requested interface is authorized and can be called immediately |

### `@zos/app.SCENE_AOD`

In the rest screen screen

### `@zos/app.SCENE_APP`

In Mini Program

### `@zos/app.SCENE_SETTINGS`

In the Mini Program configuration or dial edit page

### `@zos/app.SCENE_WATCHFACE`

In watchface interface

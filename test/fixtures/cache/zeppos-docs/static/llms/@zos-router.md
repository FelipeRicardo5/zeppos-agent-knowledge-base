# @zos/router

## Constants

| Constant | Description | API_LEVEL |
|----------|-------------|-----------|
| `SYSTEM_APP_STATUS` | Activity | 3.0 |
| `SYSTEM_APP_HR` | Heart Rate | 3.0 |

## back

### Import

```js
import { back } from '@zos/router'
```

### Typings

- Description: Closes the current page to return to the previous page
- Example:

```js
import { back } from '@zos/router'

back()
```

> Start from API_LEVEL `2.0` . Please refer to [API_LEVEL](https://docs.zepp.com/docs/guides/framework/device/compatibility).

Closes the current page to return to the previous page.

## Type

```ts
function back(): void
```

## Example

```js

back()
```

---

## checkSystemApp

### Import

```js
import { checkSystemApp, SYSTEM_APP_STATUS } from '@zos/router'
```

### Typings

- Description: Check if the system application supports jumping
- API_LEVEL: 3.0
- Constants: `system_app`
- Example:

```js
checkSystemApp(SYSTEM_APP_STATUS)
```

## Parameters

### Option

| Property | Type                | Required | DefaultValue | Description          | API_LEVEL |
| -------- | ------------------- | -------- | ------------ | -------------------- | --------- |
| appId    | <code>number</code> | Y        | -            | ID of the system App | 3.0       |

---

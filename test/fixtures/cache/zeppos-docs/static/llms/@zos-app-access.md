# @zos/app-access

## getSportData

### Import

```js
import { getSportData } from '@zos/app-access'
```

### Typings

- Description: Get workout data recorded by the system
- API_LEVEL: 3.0

> **ℹ️ Info**
>
> permission code: `data:user.hd.workout`

## Type

```ts
function getSportData(options: Options, callback: (result: CallbackResult) => void): Result
```

## Parameters

### Options

| Property | Type                | Required | DefaultValue | Description | API_LEVEL |
| -------- | ------------------- | -------- | ------------ | ----------- | --------- |
| type     | <code>string</code> | Y        | -            | data type   | 3.0       |

---

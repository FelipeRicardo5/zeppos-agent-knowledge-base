# Debug Mini Program

At this stage Zepp OS development tools do not support breakpoint debugging code, adding logging is the best debugging tool. This article will cover the following.

**Minimum API_LEVEL: >= 2.** The highest minimum among the 1 symbols this pattern's code uses — every one of them has to be available.

Source: `zeppos-docs/docs/guides/best-practice/debug.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/utils.log` | >= 2 | Device App, Watchface | yes |

## Introduction

## Add logs in the Mini Program

Symbols: `@zos/utils.log`

```js
import { log } from '@zos/utils'

const pageLogger = log.getLogger('page')

pageLogger.log('page created')
pageLogger.error('page error')
```

## View Simulator Log

## Real Machine Log

## Reference pages the guide links to

- `zeppos-docs/docs/reference/device-app-api/newAPI/utils/log.mdx`

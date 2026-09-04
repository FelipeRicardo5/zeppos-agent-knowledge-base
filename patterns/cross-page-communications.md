# Cross-Page Communications

When a Mini Program has more than one page, how should the pages communicate with each other? This article gives some solution ideas for some common scenarios.

**Minimum API_LEVEL: >= 2.** The highest minimum among the 3 symbols this pattern's code uses — every one of them has to be available.

Runtimes the guide's own file names state: Device App.

Source: `zeppos-docs/docs/guides/best-practice/cross-page-communications.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/router.back` | >= 2 | Device App | yes |
| `@zos/router.push` | >= 2 | Device App | yes |
| `@zos/storage.sessionStorage` | >= 2 | Device App | yes |

## Page Jumping

Symbols: `@zos/router.push`

`pageA.js` — Device App

```js
import { push } from '@zos/router'

push({
  url: 'path/to/pageB',
  params: {
    id: '0',
    type: 'normal'
  }
})
```

`pageB.js` — Device App

```js
Page({
  onInit(params) {
    const paramsObj = JSON.parse(params)
    const { id, type } = paramsObj
    console.log(id === '0') // true
    console.log(type === 'normal') // true
  }
})
```

## Communicating through the global `app` object

Symbols: `@zos/router.back`

`app.js` — Device App

```js
App({
  globalData: {
    type: 'normal'
  }
})
```

`pageA.js` — Device App

```js
Page({
  build() {
    console.log(getApp()._options.globalData.type)
  }
})
```

`pageB.js` — Device App

```js
import { back } from '@zos/router'

// ...
getApp()._options.globalData.type = 'classic'

back()
```

## Via sessionStorage API

Symbols: `@zos/storage.sessionStorage`

`pageA.js` — Device App

```js
import { sessionStorage } from '@zos/storage'

sessionStorage.setItem('test', 'test value')
```

`pageB.js` — Device App

```js
import { sessionStorage } from '@zos/storage'

sessionStorage.getItem('test')
```

## Reference pages the guide links to

- `zeppos-docs/docs/reference/device-app-api/newAPI/router/back.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/router/push.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/storage/sessionStorage.mdx`

# MessageBuilder Bluetooth Communication

First, let's review the Overall Architecture of the Zepp OS Mini Program. Communication between "Device App" and "Side Service" is carried out via Bluetooth. The "Device App" uses Bluetooth capabilities through the `ble` API and the "Side Service" uses Bluetooth capabilities through the `Messaging API`, both of which can currently only manipulate binary data and are cumbersome for developers to organize data structures. Refer to the example ToDoList, where `/shared/message.js` encapsulates the Bluetooth communication process, making it easier for developers to develop applications. This article shares the experience of using `MessageBuilder`, i.e. `message.js`, to complete the communication between "Device App" and "Side Service" The communication library that Device Application relies on is `/shared/message.js`. The communication library that the Side Service depends on is `/shared/message-side.js`.

**Minimum API_LEVEL: >= 2.** The highest minimum among the 2 symbols this pattern's code uses — every one of them has to be available.

Runtimes the guide's own file names state: Device App, Side Service.

Source: `zeppos-docs/docs/guides/best-practice/bluetooth-communication.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/app.getPackageInfo` | >= 2 | Device App | yes |
| `@zos/utils.log` | >= 2 | Device App, Watchface | yes |

## Modules imported wholesale

Imported as a namespace (`import * as x from '...'`), so no single symbol is named.

- `@zos/ble` — see [../api/zos-ble.md](../api/zos-ble.md)

## Usage

Symbols: `@zos/app.getPackageInfo`, `@zos/utils.log`

`app.js` — Device App

```js
import './shared/device-polyfill'
```

`app.js` — Device App

```js
import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'
import { getPackageInfo } from '@zos/app'
import * as ble from '@zos/ble'

App({
  globalData: {
    messageBuilder: null
  },
  onCreate(options) {
    console.log('app on create invoke')
    // establish connection
    const { appId } = getPackageInfo()
    const messageBuilder = new MessageBuilder({ appId, appDevicePort: 20, appSidePort: 0, ble })
    this.globalData.messageBuilder = messageBuilder
    messageBuilder.connect()
  },
  onDestroy(options) {
    console.log('app on destroy invoke')
    messageBuilder.disConnect()
  }
})
```

`app-side/index.js` — Side Service

```js
import { MessageBuilder } from '../shared/message-side'

const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    // establish connection
    messageBuilder.listen(() => {})
  },
})
```

`page.js` — Device App

```js
import { log } from '@zos/utils'

const { messageBuilder } = getApp()._options.globalData
const logger = log.getLogger('demo')

Page({
  build() {
    // receive a message from the Side Service
    messageBuilder.on('call', ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const data = messageBuilder.buf2Json(buf)
      logger.log('data', data)
    })

    // send a message to Side Service
    messageBuilder.request({
      method: 'GET',
      params: {
        index: 0
      }
    }).then(data => {
      // process Side Service responses
      const { result } = data
      logger.log(result)
    })
  }
})
```

`app-side/index.js` — Side Service

```js
import { MessageBuilder } from '../shared/message-side'

const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    // send a message to Device App
    messageBuilder.call({ text: 'Hello Zepp OS' })

    // receive a message from Device App
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      const { method, params } = payload

      if (method === 'GET') {
        ctx.response({
          data: { result : 0 }
        })
      }
    })
  },
})
```

## Reference pages the guide links to

- `zeppos-docs/docs/reference/device-app-api/newAPI/ble/send.mdx`

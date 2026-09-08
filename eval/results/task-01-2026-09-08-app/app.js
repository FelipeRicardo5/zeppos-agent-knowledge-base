/*
 * HeartSync — Device App entry point.
 *
 * Citation legend: `<kb file> — <symbol/row>, <min API_LEVEL>, <runtime>`
 * All API_LEVELs below are compared against Amazfit Bip 6 = 4.2
 * (compatibility/devices.md — "Amazfit Bip 6" row, API_LEVEL 4.2, square 390 x 450).
 */

// The MessageBuilder transport. NOT PROVIDED BY THIS KNOWLEDGE BASE — see
// shared/message.js. patterns/bluetooth-communication.md names the file
// (`/shared/message.js`, from the ToDoList sample) but the KB carries neither its
// source nor its API surface beyond the calls used in the snippet. Gap G02.
import './shared/device-polyfill' // patterns/bluetooth-communication.md — app.js snippet, line 1. File itself NOT in KB. Gap G02
import { MessageBuilder } from './shared/message' // patterns/bluetooth-communication.md — app.js snippet. Library NOT in KB. Gap G02

import { getPackageInfo } from '@zos/app' // api/zos-app.md — getPackageInfo, >= 2, OFFICIAL; runtimes/device-app.md — @zos/app
import * as ble from '@zos/ble' // patterns/bluetooth-communication.md — "Modules imported wholesale: @zos/ble"; api/zos-ble.md

// ASSUMPTION A1 (gap G05): `App` is written as a bare global here, exactly as
// patterns/bluetooth-communication.md and patterns/cross-page-communications.md
// show it. api/zos-global.md lists it as a symbol OF the module `@zos/global`
// (App, function, >= 2, OFFICIAL), which would imply `import { App } from '@zos/global'`.
// The KB shows both framings and reconciles neither. Following the pattern's code.
App({
  globalData: {
    messageBuilder: null
  },
  onCreate() {
    console.log('HeartSync app on create') // api/zos-global.md — console, >= 2, OFFICIAL
    const { appId } = getPackageInfo() // api/zos-app.md — getPackageInfo, >= 2
    // Port numbers 20 / 0 are copied verbatim from the pattern snippet; the KB
    // does not say what they mean or whether they are app-specific. Gap G02.
    const messageBuilder = new MessageBuilder({ appId, appDevicePort: 20, appSidePort: 0, ble })
    this.globalData.messageBuilder = messageBuilder
    messageBuilder.connect()
  },
  onDestroy() {
    console.log('HeartSync app on destroy')
    this.globalData.messageBuilder && this.globalData.messageBuilder.disConnect()
  }
})

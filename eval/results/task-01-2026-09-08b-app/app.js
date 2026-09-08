// HeartSync — Device App entry point.
//
// Citation key used throughout this project:
//   [KB path — symbol, min API_LEVEL, runtime]           = stated by the knowledge base
//   [KB path — verbatim sample, line N]                  = OBSERVED sample code
//   [ASSUMPTION #n]                                      = NOT in the knowledge base; see CITATIONS.md

import { BaseApp } from '@zeppos/zml/base-app'
// ^ api/zeppos-zml-base-app.md — BaseApp, function, API_LEVEL "not stated", OBSERVED
//   runtimes/device-app.md line 36 — BaseApp, Device App
//   Call shape from examples/application-4-0-fetch-api.md,
//   `zeppos-samples/application/4.0/fetch-api/app.js` line 4.

import { log } from '@zos/utils'
// ^ api/zos-utils.md — log, value, >= 2, OFFICIAL
//   runtimes/device-app.md — @zos/utils.log, Device App

const logger = log.getLogger('heartsync-app')
// ^ patterns/debug.md — "Add logs in the Mini Program": `log.getLogger('page')`

BaseApp({
  // BaseApp({ globalData, onCreate, onDestroy }) — examples/application-4-0-fetch-api.md,
  // `.../4.0/fetch-api/app.js` line 4 (verbatim: globalData / onCreate / onDestroy).
  globalData: {},

  onCreate() {
    logger.log('app onCreate invoked')
  },

  onDestroy() {
    logger.log('app onDestroy invoked')
  }
})

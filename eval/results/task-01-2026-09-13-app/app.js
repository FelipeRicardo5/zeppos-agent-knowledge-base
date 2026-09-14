import { BaseApp } from '@zeppos/zml/base-app'
// examples/application-4-0-todo-list.md, app.js line 7 — BaseApp({...}) called directly,
// no App() wrapper (OBSERVED, 4.0-era idiom). api/zeppos-zml-base-app.md — BaseApp,
// no stated API_LEVEL, OBSERVED, Device App.
import { log as logger } from '@zos/utils'
// api/zos-utils.md — log, >= 2, Device App. The `logger.log(...)` call shape itself is
// OBSERVED from examples/application-4-0-todo-list.md app.js line 10, but that excerpt
// does not include the import line, so the `log as logger` alias here is inferred,
// not quoted verbatim.

BaseApp({
  globalData: {},
  onCreate() {
    logger.log('HeartSync app onCreate invoked')
  },
  onDestroy() {
    logger.log('HeartSync app onDestroy invoked')
  },
})
// Called bare, matching examples/application-4-0-todo-list.md app.js line 7 exactly —
// BaseApp({...}) is the top-level statement there, not wrapped in a further App() call.

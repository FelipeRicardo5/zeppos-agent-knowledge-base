// HeartSync — Side Service (runs inside the Zepp phone app).
//
// Two jobs:
//   1. Serve the Device App's config requests out of settingsStorage.
//   2. Perform the actual HTTP POST. `fetch` is recorded for THIS runtime only —
//      runtimes/side-service.md lists module `fetch`; runtimes/device-app.md does not.

import { BaseSideService, settingsLib } from '@zeppos/zml/base-side'
// ^ api/zeppos-zml-base-side.md — BaseSideService, function, "not stated", OBSERVED
//   api/zeppos-zml-base-side.md — settingsLib,      function, "not stated", OBSERVED
//   runtimes/side-service.md, module `@zeppos/zml/base-side` — both listed, Side Service.
//   `settingsLib.getItem` / `.setItem` verbatim from examples/application-4-0-todo-list.md,
//   `zeppos-samples/application/4.0/todo-list/app-side/index.js` lines 7, 8, 23, 32.

// Keys shared with setting/index.js. The Settings App writes them; this service reads them.
const K_ENDPOINT = 'endpointUrl'
const K_INTERVAL = 'syncIntervalSec'

const DEFAULT_INTERVAL_SEC = 60

function readConfig() {
  // settings-storage stores strings; the samples JSON-round-trip everything they put in
  // (examples/application-4-0-todo-list.md line 8: `JSON.parse(settingsLib.getItem('todoList'))`).
  // The two values here are plain scalars, so they are read back as-is.
  const endpoint = settingsLib.getItem(K_ENDPOINT) || ''
  // ^ api/settings-storage.md — getItem, function, "not stated", OFFICIAL:
  //   "Get the stored value by key name."
  const raw = settingsLib.getItem(K_INTERVAL)
  const intervalSec = Number(raw) > 0 ? Number(raw) : DEFAULT_INTERVAL_SEC
  return { endpoint, intervalSec }
}

BaseSideService({
  // Shape verbatim from examples/application-4-0-fetch-api.md,
  // `zeppos-samples/application/4.0/fetch-api/app-side/index.js` line 42:
  //   BaseSideService({ onInit() {}, onRequest(req, res) {...}, onRun() {} })

  onInit() {
    console.log('heartsync side service onInit')
    // ^ api/global.md — console.log, function, "not stated", OFFICIAL.
    //   runtimes/side-service.md, module `global` — console.log, Side Service.

    settingsLib.addListener('change', ({ key, newValue }) => {
      console.log('settings changed', key, newValue)
    })
    // ^ api/settings-storage.md — addListener, function, "not stated", OFFICIAL:
    //   "This API only needs to be used in the Side Service."
    //   [ASSUMPTION #6] The ('change', ({key,newValue,oldValue}) => ...) signature is
    //   copied from examples/application-2-0-post-health-data-miniprogram.md,
    //   `.../app-side/index.js` line 30, where the receiver is spelled
    //   `settings.settingsStorage`, not `settingsLib`. The KB never shows an import
    //   line for that `settings` object, and never shows `settingsLib.addListener`.
    //   The two receivers are assumed to be the same storage. See gap G4.
  },

  onRequest(req, res) {
    // examples/application-4-0-todo-list.md, `.../app-side/index.js` line 12 —
    // `onRequest(req, res) { if (req.method === 'GET_TODO_LIST') { res(null, {...}) } ... }`
    // Note the 2.0 sample instead destructures `const { type, params } = req`
    // (examples/application-2-0-post-health-data-miniprogram.md line 7). `method` is
    // used here to match the 4.x target platform.
    console.log('onRequest', req.method)

    if (req.method === 'GET_CONFIG') {
      const cfg = readConfig()
      res(null, cfg)
      // ^ `res(null, value)` — node-style (err, value). Verbatim from
      //   examples/application-4-0-todo-list.md line 12 (`res(null, { result: ... })`)
      //   and examples/application-2-0-post-health-data-miniprogram.md line 7
      //   (`res(null, result)`).
      return
    }

    if (req.method === 'POST_READING') {
      this.postReading(req.params)
        .then((r) => res(null, r))
        .catch((e) => res(null, { ok: false, error: String(e) }))
      return
    }

    res(null, { ok: false, error: 'unknown method' })
  },

  postReading(params) {
    const { endpoint } = readConfig()

    if (!endpoint) {
      return Promise.resolve({ ok: false, error: 'no endpoint configured' })
    }

    const payload = {
      bpm: params && params.bpm,
      seq: params && params.seq,
      sentAt: new Date().toISOString()
      // [ASSUMPTION #7] `Date` is an ECMAScript builtin, not a Zepp OS API, and this
      // knowledge base records no clock for the Side Service runtime at all
      // (@zos/sensor.Time is Device App only — runtimes/device-app.md). Kept on this
      // side rather than the watch because the Side Service runs inside the phone app,
      // but the base does not vouch for it either way. See gap G9.
    }

    return this.fetch({
      method: 'POST',
      url: endpoint,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((result) => {
        console.log('fetch result', result)
        return { ok: true }
      })
      .catch((e) => {
        console.log('fetch=>', e)
        return { ok: false, error: String(e) }
      })
    // ^ api/fetch.md — fetch, function, API_LEVEL "not stated", OFFICIAL:
    //   "The Fetch API can be used to send HTTP requests in JS. The use of `fetch()`
    //    in the 'Side Service' can be found in [Fetch API - MDN]".
    //   runtimes/side-service.md, module `fetch` — Side Service.
    //
    //   The `this.fetch({ ... })` receiver and the `method` / `url` keys are OBSERVED:
    //   examples/application-3-0-download.md, "Methods called on a value", `.fetch()`,
    //   `zeppos-samples/application/3.0/download/app-side/fetch-module.js` line 8 —
    //     const result = await this.fetch({ method: "get", url: "http://..." })
    //       .catch((e) => { console.log("fetch=>", e); });
    //
    //   [ASSUMPTION #8] `headers` and `body`. The only attested call is a GET with
    //   exactly two keys. Nothing in this knowledge base states how a request body or
    //   headers are passed, nor what the resolved value looks like (status? .json()?).
    //   The names used here follow the MDN Fetch API that api/fetch.md points at —
    //   which is a pointer OUT of the base, not a record in it. Requirement 2 ("sends
    //   each reading to an HTTP endpoint") cannot be discharged from this base without
    //   this guess. See gap G2 — this is the highest-risk line in the project.
    //
    //   Note also: no `permissions` entry is declared for network access. That is
    //   evidence-backed, not an oversight — examples/application-4-0-fetch-api.md
    //   declares only `data:os.device.info` and `device:os.local_storage`, and that
    //   sample's entire purpose is HTTP.
  },

  onRun() {},

  onDestroy() {
    console.log('heartsync side service onDestroy')
  }
})

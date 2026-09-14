import { BaseSideService, settingsLib } from '@zeppos/zml/base-side'
// api/zeppos-zml-base-side.md — BaseSideService and settingsLib, both OBSERVED, no
// stated API_LEVEL, module @zeppos/zml/base-side. `settingsLib.getItem`/`.setItem`
// call shape OBSERVED verbatim in examples/application-4-0-todo-list.md
// app-side/index.js lines 7-8 and 23. Chosen over the 2.0-era
// `settings.settingsStorage.getItem(...)` global seen in
// examples/application-2-0-post-health-data-miniprogram.md because todo-list-4.0
// is the more current sample this base indexes for the same runtime pair.
// runtimes/side-service.md confirms `settingsLib` is attributed to Side Service and
// states plainly that no page anywhere gives it a permission or an API_LEVEL.

const DEFAULT_SYNC_INTERVAL_MS = 60000

let lastSentAt = 0

function readConfig() {
  const url = settingsLib.getItem('endpointUrl')
  const intervalRaw = settingsLib.getItem('syncIntervalMs')
  return {
    url: url || '',
    intervalMs: intervalRaw ? Number(intervalRaw) : DEFAULT_SYNC_INTERVAL_MS,
  }
}

AppSideService(
  // AppSideService() *(no record in this KB)* — examples/index.md "Global calls in
  // the phone runtimes": every Side Service sample wraps BaseSideService in this
  // bare global with no import, e.g. examples/application-4-0-todo-list.md
  // app-side/index.js line 287-291.
  BaseSideService({
    onInit() {},
    onRun() {},
    onDestroy() {},

    async onRequest(req, res) {
      // onRequest(req, res) OBSERVED in every 2.0+ Side Service sample, e.g.
      // examples/application-4-0-fetch-api.md app-side/index.js line 72 and
      // examples/application-2-0-post-health-data-miniprogram.md app-side/index.js
      // line 71. `res(null, {...})` OBSERVED in the same files.
      // req.method / req.params is this app's ASSUMPTION about the request shape —
      // see the GAP comment in page/index.js `sendReading()`: no page in this base
      // documents what the Device App side actually sends, so this is inferred to
      // mirror the `req.method` field read in
      // examples/application-4-0-fetch-api.md app-side/index.js line 74 and
      // examples/application-4-0-todo-list.md app-side/index.js line 74.
      const { method, params } = req

      if (method !== 'HR_READING') {
        res(null, { sent: false, reason: 'UNKNOWN_METHOD' })
        return
      }

      const { url, intervalMs } = readConfig()
      if (!url) {
        res(null, { sent: false, reason: 'NO_URL_CONFIGURED' })
        return
      }

      const now = Date.now()
      if (now - lastSentAt < intervalMs) {
        // The configured "sync interval" is enforced here, in the Side Service,
        // because settingsLib (settings-storage) is only readable from the Side
        // Service / Settings App runtimes (runtimes/side-service.md,
        // runtimes/settings.md) — the Device App page has no documented way to
        // read it directly, so it is not asked to do its own throttling.
        res(null, { sent: false, reason: 'THROTTLED' })
        return
      }

      try {
        await fetch({
          // fetch() — recorded as fetch.fetch. api/fetch.md — fetch, no stated
          // API_LEVEL, no stated permission anywhere in this base (see the report's
          // gap list). Call shape `fetch({ url, method, headers, body })` OBSERVED
          // verbatim in examples/application-2-0-post-health-data-miniprogram.md
          // app-side/index.js lines 329-337.
          url,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bpm: params.bpm, ts: params.ts }),
        })
        lastSentAt = now
        res(null, { sent: true })
      } catch (e) {
        res(null, { sent: false, reason: 'FETCH_ERROR' })
      }
    },
  })
)

// HeartSync — Device App page.
//
// Reads heart rate, shows it, and hands each reading to the Side Service, which
// performs the HTTP POST (the Device App has no HTTP stack in this knowledge base:
// `fetch` is recorded for the Side Service runtime only — runtimes/side-service.md).

import { BasePage } from '@zeppos/zml/base-page'
// ^ api/zeppos-zml-base-page.md — BasePage, function, API_LEVEL "not stated", OBSERVED
//   runtimes/device-app.md line 42 — BasePage, Device App
//   Call shape from examples/application-4-0-todo-list.md,
//   `.../4.0/todo-list/page/home/index.page.js` line 19 (state / onInit / build).

import { createWidget, widget, prop } from '@zos/ui'
// ^ api/zos-ui.md — createWidget, value, >= 2, OFFICIAL
//   api/zos-ui.md — widget, function, "not stated", OBSERVED   <-- level NOT certifiable
//   api/zos-ui.md — prop,   function, "not stated", OBSERVED   <-- level NOT certifiable
//   compatibility/zos-ui.md, API_LEVEL 2 — @zos/ui.TEXT and @zos/ui.BUTTON are
//   themselves recorded at >= 2, even though the `widget` namespace that carries
//   them is not. See CITATIONS.md, gap G6.
//   Import line verbatim from patterns/code-organization.md ("Example", page.js).

import { showToast } from '@zos/interaction'
// ^ api/zos-interaction.md — showToast, function, >= 2, OFFICIAL

import { HeartRate } from '@zos/sensor'
// ^ api/zos-sensor.md — HeartRate, value, >= 2, OFFICIAL.
//   "HeartRate Sensor. permission code: `data:user.hd.heart_rate`" — declared in app.json.
//   runtimes/device-app.md — @zos/sensor.HeartRate, Device App.

import { LocalStorage } from '@zos/storage'
// ^ api/zos-storage.md — LocalStorage, function, >= 3, OFFICIAL.
//   Bip 6 is API_LEVEL 4.2 (compatibility/devices.md line 27), so >= 3 is satisfied.
//   This is the symbol that keeps the app off the Bip 5 — see README.md.

import { log } from '@zos/utils'
// ^ api/zos-utils.md — log, value, >= 2, OFFICIAL

import { TITLE_TEXT, BPM_TEXT, UNIT_TEXT, STATUS_TEXT, SYNC_BUTTON } from './index.style'

const logger = log.getLogger('heartsync-page')
// ^ patterns/debug.md — `log.getLogger('page')`

const localStorage = new LocalStorage()
// ^ patterns/persistence-storage.md, "Thinking" — verbatim: `const localStorage = new LocalStorage()`
//   followed by `localStorage.getItem('state')` / `localStorage.setItem('state', ...)`.

// --- Persisted keys (requirement 4) -----------------------------------------
// The endpoint is authored on the phone (Settings App -> settingsStorage) and
// mirrored here so the watch survives a cold start with no phone in range.
const K_ENDPOINT = 'endpointUrl'
const K_INTERVAL = 'syncIntervalSec'

const DEFAULT_INTERVAL_SEC = 60

BasePage({
  state: {
    bpmWidget: null,
    statusWidget: null,
    hrSensor: null,
    timerId: null,
    endpoint: '',
    intervalSec: DEFAULT_INTERVAL_SEC,
    lastBpm: null,
    seq: 0
  },

  onInit() {
    // Restore the last known configuration before the first paint.
    // patterns/persistence-storage.md reads persisted state in build()/onInit and
    // writes it back in onDestroy().
    const savedEndpoint = localStorage.getItem(K_ENDPOINT)
    const savedInterval = localStorage.getItem(K_INTERVAL)
    if (savedEndpoint) this.state.endpoint = savedEndpoint
    if (savedInterval) this.state.intervalSec = Number(savedInterval) || DEFAULT_INTERVAL_SEC
    logger.log('restored endpoint=%s interval=%s', this.state.endpoint, this.state.intervalSec)
  },

  build() {
    this.buildUI()
    this.startSensor()
    this.pullConfigFromPhone()
    this.startSyncLoop()
  },

  // ---------------------------------------------------------------- UI ------
  buildUI() {
    createWidget(widget.TEXT, TITLE_TEXT)
    this.state.bpmWidget = createWidget(widget.TEXT, BPM_TEXT)
    createWidget(widget.TEXT, UNIT_TEXT)
    this.state.statusWidget = createWidget(widget.TEXT, STATUS_TEXT)
    // ^ createWidget(widget.TEXT, { ...flat props..., text }) is verbatim from
    //   examples/application-2-0-post-health-data-miniprogram.md, `.../page/index.js` line 72.
    //   NOTE: patterns/code-organization.md shows a DIFFERENT shape for the same call —
    //   `createWidget(widget.TEXT, { attr: { text }, styles: TEXT_STYLE })`. The two
    //   disagree. Per skills/zepp-os/SKILL.md ("Where a description and a sample
    //   disagree ... the sample is code that runs. Prefer it, and flag the conflict"),
    //   the flat form is used here. Conflict logged as gap G5 in CITATIONS.md.

    createWidget(widget.BUTTON, {
      ...SYNC_BUTTON,
      click_func: () => {
        this.readAndSync(true)
      }
      // ^ `click_func: (button_widget) => { ... }` verbatim from
      //   examples/application-2-0-post-health-data-miniprogram.md, `.../page/index.js` line 27.
    })
  },

  setBpmText(text) {
    this.state.bpmWidget && this.state.bpmWidget.setProperty(prop.TEXT, text)
    // ^ examples/index.md, "Methods called on a value": `.setProperty()` — likely
    //   `@zos/ui.setProperty` (>= 2, compatibility/zos-ui.md). Verbatim call from
    //   examples/application-2-0-post-health-data-miniprogram.md, `.../page/index.js`
    //   line 84: `this.state.textWidget.setProperty(prop.TEXT, text);`
    //   SKILL.md warns the receiver's type is unresolved — treat as a strong hint.
  },

  setStatusText(text) {
    this.state.statusWidget && this.state.statusWidget.setProperty(prop.TEXT, text)
  },

  // ------------------------------------------------------------ sensor ------
  startSensor() {
    this.state.hrSensor = new HeartRate()
    // ^ examples/application-2-0-showcase.md, `.../2.0/showcase/page/sensor/heart_rate.js`
    //   line 12 — verbatim: `const heartRate = new HeartRate();`
    //   (also examples/application-3-0-3-0-feature.md, `.../pages/heart.js` line 19).
    //   That is the ONLY HeartRate code the knowledge base holds — see below.

    this.readAndSync(false)
  },

  currentBpm() {
    // [ASSUMPTION #1 — the single most load-bearing guess in this project]
    // The knowledge base records NO method on a HeartRate instance. SKILL.md,
    // "What absence means here": "Methods reached through a returned object ...
    // are not recorded. Their parent function is."
    //
    // `getCurrent()` is used here by ANALOGY with a sibling sensor:
    //   examples/application-4-0-calories.md line 104 —
    //   `let calories = new Calorie().getCurrent();`
    // Same module (@zos/sensor), same "value" symbol type, same `new X()` shape.
    // That is an inference across symbols, not evidence about HeartRate.
    if (!this.state.hrSensor) return null
    const v = this.state.hrSensor.getCurrent()
    return typeof v === 'number' && v > 0 ? v : null
  },

  // ---------------------------------------------------------- sync loop -----
  startSyncLoop() {
    this.stopSyncLoop()
    this.state.timerId = setInterval(() => {
      this.readAndSync(false)
    }, this.state.intervalSec * 1000)
    // ^ api/zos-global.md — setInterval, function, >= 2, OFFICIAL:
    //   "Repeatedly call a function with a fixed time interval between each call."
    //   runtimes/device-app.md line 216 — setInterval, >= 2, Device App.
    //
    //   [ASSUMPTION #2] Called as a bare global. The KB files this symbol under a
    //   module path `@zos/global` but shows no import line for it anywhere, and no
    //   sample calls it. Module name vs. ambient global is genuinely ambiguous here.
    //   If this build fails to resolve `setInterval`, the alternative reading is
    //   `import { setInterval, clearInterval } from '@zos/global'`.
    //
    //   NOTE ON SCOPE: this timer only runs while the page is alive. A timer that
    //   "runs regardless of watch screen state" is @zos/timer.createSysTimer
    //   (api/zos-timer.md, >= 4) but its own description restricts it to "device app
    //   services", and no Device App service is set up here — that would need the
    //   `device:os.bg_service` permission (api/zos-global.md — AppService).
  },

  stopSyncLoop() {
    if (this.state.timerId !== null) {
      clearInterval(this.state.timerId)
      // ^ api/zos-global.md — clearInterval, function, >= 2, OFFICIAL:
      //   "Cancel the timer registered by `setInterval`."
      this.state.timerId = null
    }
  },

  readAndSync(userInitiated) {
    const bpm = this.currentBpm()

    if (bpm === null) {
      this.setBpmText('--')
      this.setStatusText('No reading yet')
      if (userInitiated) {
        showToast({ text: 'No heart rate reading' })
        // ^ api/zos-interaction.md — showToast, >= 2, OFFICIAL.
        //   [ASSUMPTION #3] The parameter key. The KB shows BOTH:
        //     `showToast({ content: "No Sleep Data" })`  — 2.0 sample
        //        (examples/application-2-0-post-health-data-miniprogram.md line 55)
        //     `hmUI.showToast({ text: getText('addSuccess') })` — 4.0 sample
        //        (examples/application-4-0-todo-list.md, `.../index.page.js` line 77)
        //   `text` is chosen because the target platform here is 4.x. The API page
        //   itself says only "Display Message Prompt Box" — no parameter list.
      }
      return
    }

    // Only repaint when the value actually changed (requirement 1: "updating as it
    // changes"). The KB records no change-callback for any sensor, so this page
    // polls — see ASSUMPTION #4 below.
    if (bpm !== this.state.lastBpm) {
      this.state.lastBpm = bpm
      this.setBpmText(String(bpm))
    }

    // [ASSUMPTION #4] Polling instead of subscribing.
    // Requirement 1 asks for a display that updates as the reading changes. A
    // push-style API (`onCurrentChange` or equivalent) is NOT recorded anywhere in
    // this knowledge base for any sensor — the grep over api/, examples/, patterns/
    // and compatibility/ returns only `getCurrent()`. Polling on a timer is the only
    // approach this base can support at all. If a change callback does exist upstream
    // it would be strictly better than this.

    if (!this.state.endpoint) {
      this.setStatusText('No endpoint set.\nOpen HeartSync settings in the Zepp app.')
      if (userInitiated) showToast({ text: 'Set an endpoint first' })
      return
    }

    this.postReading(bpm, userInitiated)
  },

  // -------------------------------------------------- talk to the phone -----
  postReading(bpm, userInitiated) {
    this.request({
      method: 'POST_READING',
      params: {
        bpm,
        seq: ++this.state.seq
        // No timestamp is taken on the watch. `@zos/sensor.Time` (>= 2, OFFICIAL) is
        // the KB's documented clock and the only attested call is `new Time()`
        // (examples/application-2-0-post-health-data-miniprogram.md, `.../page/index.js`
        // line 49) — none of its accessors are recorded. Rather than invent one, the
        // Side Service stamps the reading. See gap G9 in CITATIONS.md.
      }
    })
      .then((res) => {
        const ok = res && res.ok
        this.setStatusText(ok ? `Sent ${bpm} BPM` : `Send failed: ${(res && res.error) || 'unknown'}`)
        if (userInitiated) showToast({ text: ok ? 'Sent' : 'Send failed' })
      })
      .catch((e) => {
        logger.error('postReading failed', e)
        this.setStatusText('Phone unreachable')
        if (userInitiated) showToast({ text: 'Phone unreachable' })
      })
    // ^ [ASSUMPTION #5 — the second load-bearing guess]
    //   `this.request({ method, params })` on a zml BasePage is NOT shown anywhere
    //   in this knowledge base. A grep for `this.request` across examples/, patterns/
    //   and api/ returns nothing. It is reconstructed from the two halves the base
    //   DOES hold:
    //     (a) patterns/bluetooth-communication.md, "Usage" (page.js, Device App) —
    //         `messageBuilder.request({ method: 'GET', params: { index: 0 } })
    //            .then(data => { const { result } = data })`
    //         — i.e. a `{ method, params }` envelope returning a promise. That page
    //         is the OLD MessageBuilder library, not zml.
    //     (b) examples/application-4-0-todo-list.md, `.../app-side/index.js` line 12 —
    //         `BaseSideService({ onRequest(req, res) { if (req.method === 'GET_TODO_LIST')
    //            { res(null, { result: getTodoList() }) } ... } })`
    //         — i.e. the zml side handler reads `req.method` and answers `res(err, value)`.
    //   (a) supplies the caller shape, (b) proves the receiver shape and the key name.
    //   The bridge between them — that zml's BasePage exposes it as `this.request` —
    //   is my inference. Only `this.call({ type })` (side -> device) is attested, at
    //   examples/application-2-0-post-health-data-miniprogram.md line 188.
    //
    //   Also note the envelope key is not stable across the base itself: the 2.0
    //   sample destructures `const { type, params } = req` while 3.0 and 4.0 use
    //   `req.method`. `method` is used here because the target is 4.x.
  },

  pullConfigFromPhone() {
    this.request({ method: 'GET_CONFIG' })
      .then((res) => {
        if (!res) return
        if (typeof res.endpoint === 'string' && res.endpoint !== this.state.endpoint) {
          this.state.endpoint = res.endpoint
          localStorage.setItem(K_ENDPOINT, res.endpoint)
          // ^ patterns/persistence-storage.md — `localStorage.setItem('state', this.state.data)`
        }
        if (res.intervalSec && Number(res.intervalSec) !== this.state.intervalSec) {
          this.state.intervalSec = Number(res.intervalSec)
          localStorage.setItem(K_INTERVAL, String(res.intervalSec))
          this.startSyncLoop() // restart at the new cadence
        }
        this.setStatusText(this.state.endpoint ? 'Ready' : 'No endpoint set')
      })
      .catch((e) => {
        // Falls back to whatever LocalStorage restored in onInit() — this is the
        // path that makes requirement 4 hold with the phone out of range.
        logger.error('config fetch failed, using cached config', e)
      })
  },

  onDestroy() {
    this.stopSyncLoop()
    // Persist last known good config. patterns/persistence-storage.md writes in onDestroy().
    localStorage.setItem(K_ENDPOINT, this.state.endpoint || '')
    localStorage.setItem(K_INTERVAL, String(this.state.intervalSec))
    logger.log('page onDestroy invoked')
  }
})

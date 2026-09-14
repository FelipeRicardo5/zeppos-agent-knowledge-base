import { BasePage } from '@zeppos/zml/base-page'
// api/zeppos-zml-base-page.md — BasePage, no stated API_LEVEL, OBSERVED, Device App.
// Call shape (BasePage({state, build(){...}, onInit(){...}})) OBSERVED in
// examples/application-4-0-todo-list.md page/home/index.page.js line 19 and
// examples/application-2-0-post-health-data-miniprogram.md page/index.js line 17.
import { createWidget, widget, align, prop } from '@zos/ui'
// api/zos-ui.md — createWidget >= 2 OFFICIAL; widget, align, prop carry no stated
// API_LEVEL anywhere in this base (SKILL.md "The gap that will bite you first" —
// these are exactly the primitives it warns cannot be certified for any device).
// widget.TEXT itself is OBSERVED, not OFFICIAL (conflicts/index.md + api/zos-ui.md
// @zos/ui.widget table).
import { getDeviceInfo } from '@zos/device'
// api/zos-device.md — getDeviceInfo, >= 2, requires `data:os.device.info` in app.json.
import { HeartRate } from '@zos/sensor'
// api/zos-sensor.md — HeartRate, >= 2, requires `data:user.hd.heart_rate` in app.json.
// onCurrentChange / offCurrentChange are each their own member with a member-level
// minimum of >= 2.1 (higher than the HeartRate symbol's own >= 2) — api/zos-sensor.md
// lines 1053-1054. getCurrent "needs to be used in the onCurrentChange callback
// function" per the same page.
import { showToast } from '@zos/interaction'
// api/zos-interaction.md — showToast, >= 2. Call shape `showToast({ content })`
// OBSERVED in examples/application-2-0-post-health-data-miniprogram.md line 94-98.
import { log as logger, px } from '@zos/utils'
// api/zos-utils.md — log >= 2, px >= 2. See the note in app.js: the `logger.log(...)`
// call shape is OBSERVED, the `log as logger` import alias is inferred. `px(...)`
// OBSERVED verbatim in examples/application-2-0-post-health-data-miniprogram.md
// lines 168 and 173.

BasePage({
  state: {
    textWidget: null,
    heartRateSensor: null,
    hrChangeHandler: null,
  },

  build() {
    const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()
    // api/zos-device.md — getDeviceInfo, >= 2. Destructuring `{ width, height }`
    // OBSERVED in examples/application-2-0-post-health-data-miniprogram.md line 88
    // and examples/application-4-0-todo-list.md line 98 (there as
    // `{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }`).

    this.state.textWidget = createWidget(widget.TEXT, {
      // api/zos-ui.md — createWidget >= 2. Param shape (x, y, w, h, text_size,
      // align_h, align_v, text, color) is the @zos/ui.TEXT Param table verbatim,
      // api/zos-ui.md lines 1561-1582. No Min API_LEVEL column exists on that
      // table at all — level for this widget's own props cannot be verified here.
      x: 0,
      y: (DEVICE_HEIGHT - px(80)) / 2,
      w: DEVICE_WIDTH,
      h: px(80),
      text_size: px(48),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text: '--',
      color: 0xffffff,
    })

    this.state.heartRateSensor = new HeartRate()
    // api/zos-sensor.md — HeartRate, >= 2. `new HeartRate()` OBSERVED in
    // examples/application-2-0-showcase.md line 179 and
    // examples/application-3-0-3-0-feature.md line 178.

    this.state.hrChangeHandler = () => {
      const bpm = this.state.heartRateSensor.getCurrent()
      // api/zos-sensor.md — HeartRate.getCurrent(): number. "Get the current heart
      // rate measurement, this method needs to be used in the onCurrentChange
      // callback function." No Min API_LEVEL stated on this member specifically.
      if (bpm && bpm > 0) {
        this.state.textWidget.setProperty(prop.TEXT, String(bpm))
        // .setProperty() is never imported (SKILL.md) — matched by name only.
        // OBSERVED call shape: examples/application-2-0-post-health-data-miniprogram.md
        // line 228 `this.state.textWidget.setProperty(prop.TEXT, text)`.
        this.sendReading(bpm)
      } else {
        showToast({ content: 'No heart rate data' })
        // api/zos-interaction.md — showToast, >= 2.
      }
    }

    this.state.heartRateSensor.onCurrentChange(this.state.hrChangeHandler)
    // api/zos-sensor.md — HeartRate.onCurrentChange(callback), >= 2.1.
  },

  sendReading(bpm) {
    // GAP — flagged in the report as the single biggest one found: nothing in this
    // knowledge base documents how a Device App page calls into its Side Service.
    // api/zeppos-zml-base-page.md lists BasePage name-only (OBSERVED, no Methods
    // section, no API_LEVEL). examples/index.md's "Methods called on a value" and
    // "Global calls in the phone runtimes" indexes — the two places this base
    // systematically surfaces unimported calls — list neither `.call()`, `.request()`
    // nor `onCall()` anywhere, even though examples/application-3-0-download.md
    // page/index.js line 13-24 shows a BasePage with an `onCall({ result })` handler
    // (the receiving half of this same mechanism) and every Side Service sample
    // shows the matching `onRequest(req, res)` handler on the other end. The call
    // site that must exist on the Device App side to produce that `req` is never
    // shown in any excerpt this base extracted (it falls inside a page method body
    // this base didn't cite for any other symbol). `this.request(...)` returning a
    // Promise is this app's ASSUMPTION, chosen because app-side/index.js's
    // `onRequest(req, res)` reads `req.method` / `req.params`, mirroring the
    // `req.method` shape used in examples/application-4-0-fetch-api.md and
    // examples/application-4-0-todo-list.md.
    this.request({
      method: 'HR_READING',
      params: { bpm, ts: Date.now() },
    })
      .then((result) => {
        logger.log('HeartSync sendReading result', JSON.stringify(result))
      })
      .catch((e) => {
        logger.log('HeartSync sendReading failed', e)
      })
  },

  onDestroy() {
    if (this.state.heartRateSensor && this.state.hrChangeHandler) {
      this.state.heartRateSensor.offCurrentChange(this.state.hrChangeHandler)
      // api/zos-sensor.md — HeartRate.offCurrentChange(callback), >= 2.1.
    }
  },
})

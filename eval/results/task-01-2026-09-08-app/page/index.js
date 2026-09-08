/*
 * HeartSync — Device App page. Shows live BPM, forwards each reading to the
 * Side Service (which owns the HTTP call, since `fetch` is Side-Service-only:
 * runtimes/side-service.md — fetch.fetch, "not stated"; it is absent from
 * runtimes/device-app.md).
 */

import { createWidget, widget } from '@zos/ui' // api/zos-ui.md — createWidget, value, >= 2, OFFICIAL / widget, function, "not stated", OBSERVED (gap G04)
import { prop } from '@zos/ui' // api/zos-ui.md — prop, function, "not stated", OBSERVED, NO description (one of the 42 symbols in this KB with an empty description)
// NOTE (gap G13): api/zos-ui.md lists `setProperty` as a MODULE symbol (>= 2, OFFICIAL,
// "Set the properties of the UI widget."), which reads as `setProperty(w, ...)` after
// importing it. But the only working code in the KB — patterns/widget-group.md — calls it
// as an INSTANCE method: `img_icon_widget.setProperty(prop.VISIBLE, false)`. The two forms
// are incompatible. Following the pattern's code, which is executable evidence.
import { LocalStorage } from '@zos/storage' // api/zos-storage.md — LocalStorage, function, >= 3, OFFICIAL; used exactly as patterns/persistence-storage.md shows
import { log } from '@zos/utils' // api/zos-utils.md — log, value, >= 2, OFFICIAL; usage from patterns/debug.md
import { BPM_STYLE, LABEL_STYLE, STATUS_STYLE } from './index.style'
import { createHeartRateSource } from './heart-rate.adapter'

const logger = log.getLogger('heartsync-page') // patterns/debug.md — log.getLogger('page')
const localStorage = new LocalStorage() // patterns/persistence-storage.md — `const localStorage = new LocalStorage()`

// Requirement 4 (persistence): the endpoint survives the app closing because it
// is written to LocalStorage, which api/zos-storage.md describes as "Locally
// stored key-value pairs, data cleared after Mini Program uninstallation".
const ENDPOINT_KEY = 'endpoint'
const INTERVAL_KEY = 'syncInterval'

Page({ // ASSUMPTION A1 (gap G05): bare global, per the pattern snippets; api/zos-global.md lists Page as a symbol of @zos/global (>= 2, OFFICIAL)
  state: {
    bpmWidget: null,
    statusWidget: null,
    endpoint: null,
    intervalSec: 60,
    hr: null,
    unsubscribe: null,
    timerId: null
  },

  build() {
    // patterns/error-catch.md: "The device app framework is currently unable to
    // capture errors in the lifecycle" — so wrap build() in try/catch.
    try {
      this.restoreSettings()
      this.buildUI()
      this.startSensor()
      this.startSync()
      this.listenForSettingsPush()
    } catch (e) {
      logger.log('LifeCycle Error', e) // patterns/error-catch.md — exact recipe
      e && e.stack && e.stack.split(/\n/).forEach((i) => logger.log('error stack', i))
    }
  },

  restoreSettings() {
    // patterns/persistence-storage.md — `localStorage.getItem('state')`
    this.state.endpoint = localStorage.getItem(ENDPOINT_KEY)
    const stored = localStorage.getItem(INTERVAL_KEY)
    if (stored) this.state.intervalSec = Number(stored)
  },

  buildUI() {
    // ASSUMPTION A3 (gap G06): argument shape of createWidget. The KB shows TWO
    // incompatible forms for the same call, both marked OFFICIAL:
    //   patterns/code-organization.md   -> createWidget(widget.TEXT, { attr: {...}, styles: TEXT_STYLE })
    //   patterns/multi-screen-adaption.md -> createWidget(widget.TEXT, textStyle)   // flat, style keys at top level
    // (and multi-screen-adaption's own square branch nests x/y/w/h inside `attrs`,
    // a third spelling). Going with the flat form, which appears twice and is the
    // one whose keys line up with the style objects the same guide exports.
    createWidget(widget.TEXT, { ...LABEL_STYLE, text: 'HEART RATE' }) // api/zos-ui.md — TEXT, value, >= 2, OFFICIAL
    this.state.bpmWidget = createWidget(widget.TEXT, { ...BPM_STYLE, text: '--' })
    this.state.statusWidget = createWidget(widget.TEXT, {
      ...STATUS_STYLE,
      text: this.state.endpoint ? 'ready' : 'no endpoint set'
    })
  },

  startSensor() {
    const source = createHeartRateSource()
    // Requirement 1: show it and update as it changes.
    this.state.unsubscribe = source.subscribe((bpm) => {
      if (bpm === null || bpm === this.state.hr) return
      this.state.hr = bpm
      // ASSUMPTION A13 (gap G14): UPDATING A WIDGET'S TEXT IS NOT DOCUMENTED.
      // The KB's only `prop` members with any evidence are:
      //   prop.VISIBLE — patterns/widget-group.md, `w.setProperty(prop.VISIBLE, false)`
      //   prop.MORE    — buried inside api/zos-ui.md's *getProperty* description:
      //                  "use `widget.getProperty(prop.MORE, {})` to get all the
      //                   properties of the widget"
      // Nothing anywhere shows how to CHANGE the text of an existing TEXT widget,
      // which is the core of requirement 1 ("updating as it changes"). `prop.MORE`
      // carrying a `{ text }` payload on the way IN is my invention.
      this.state.bpmWidget.setProperty(prop.MORE, { text: String(bpm) })
    })
  },

  startSync() {
    // Requirement 2 + 3: push each reading at the user's chosen interval.
    // api/zos-global.md — setInterval, >= 2, OFFICIAL.
    this.state.timerId = setInterval(() => {
      if (!this.state.endpoint || this.state.hr === null) return
      this.push(this.state.hr)
    }, this.state.intervalSec * 1000)
  },

  push(bpm) {
    // The HTTP request cannot be made here. `fetch` is attributed to the Side
    // Service only (runtimes/side-service.md), so the Device App hands the reading
    // over the Bluetooth transport and the Side Service performs the POST.
    // patterns/bluetooth-communication.md — page.js snippet:
    //   messageBuilder.request({ method, params }).then(data => ...)
    const { messageBuilder } = getApp()._options.globalData // patterns/bluetooth-communication.md + patterns/cross-page-communications.md; api/zos-global.md — getApp, >= 2, OFFICIAL
    messageBuilder
      .request({ method: 'POST_HR', params: { bpm, at: Date.now() } })
      .then((data) => {
        const { result } = data // shape copied from the pattern snippet
        this.state.statusWidget.setProperty(prop.MORE, { text: 'sent ' + result }) // ASSUMPTION A13, gap G14
      })
      .catch((e) => logger.log('push failed', e)) // NOTE: the pattern never shows a .catch; error contract undocumented. Gap G02
  },

  listenForSettingsPush() {
    // The Device App has NO documented way to read what the Settings App wrote.
    // `settings-storage` is attributed to the Settings App and Side Service only
    // (runtimes/settings.md, runtimes/side-service.md); it does not appear in
    // runtimes/device-app.md. api/zos-settings.md is a different thing entirely —
    // system settings (units, language, date format), not app settings.
    // So the only route the KB leaves open is: Side Service listens on
    // settings-storage and pushes to the device over the transport.
    // patterns/bluetooth-communication.md — page.js snippet: messageBuilder.on('call', ...)
    const { messageBuilder } = getApp()._options.globalData
    messageBuilder.on('call', ({ payload: buf }) => {
      const data = messageBuilder.buf2Json(buf) // patterns/bluetooth-communication.md
      if (data && data.type === 'settings') {
        if (data.endpoint) {
          this.state.endpoint = data.endpoint
          localStorage.setItem(ENDPOINT_KEY, data.endpoint) // patterns/persistence-storage.md — setItem
        }
        if (data.intervalSec) {
          this.state.intervalSec = Number(data.intervalSec)
          localStorage.setItem(INTERVAL_KEY, String(data.intervalSec))
          clearInterval(this.state.timerId) // api/zos-global.md — clearInterval, >= 2
          this.startSync()
        }
        this.state.statusWidget.setProperty(prop.MORE, { text: 'ready' }) // ASSUMPTION A13, gap G14
      }
    })
  },

  onDestroy() {
    // patterns/persistence-storage.md writes state in onDestroy; done eagerly above
    // as well, because a reading can arrive at any time.
    this.state.unsubscribe && this.state.unsubscribe()
    this.state.timerId && clearInterval(this.state.timerId)
  }
})

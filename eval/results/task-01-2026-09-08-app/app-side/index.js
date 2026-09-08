/*
 * HeartSync — Side Service. Runs inside the Zepp phone app.
 *
 * Every symbol used here carries "not stated" for API_LEVEL. That is not a
 * shortcoming of this file: runtimes/side-service.md lists all 20 Side Service
 * symbols and every single one says "not stated", and
 * skills/zepp-os/SKILL.md confirms it ("the Settings App's 21 and the Side
 * Service's 20 carry no API_LEVEL — no page in either tree states one").
 * By the KB's own rule ("absence of evidence"), NOTHING in this file is
 * verifiable against the Bip 6's 4.2, or against any level. Gap G09.
 */

import { MessageBuilder } from '../shared/message-side' // patterns/bluetooth-communication.md — app-side/index.js snippet. Library NOT in KB. Gap G02

const messageBuilder = new MessageBuilder() // patterns/bluetooth-communication.md — `new MessageBuilder()`, no args on the side half

// ASSUMPTION A4 (gap G10): `settingsStorage` is reached as a bare global here.
// api/settings-storage.md documents the seven members (getItem, setItem,
// removeItem, clear, length, toObject, addListener — all "not stated") and
// api/settings-storage.md's own text for `length` writes it as
// `settings.settingsStorage.length`, implying a `settings` object that the KB
// never documents. There is no import path and no accessor recorded anywhere.
// skills/zepp-os/SKILL.md admits this: "The Side Service and Settings App use
// globals (fetch, settingsStorage, Settings.render) that are not extracted yet".

// ASSUMPTION A5 (gap G05): `AppSideService` is a bare global. It appears ONLY
// inside the patterns/bluetooth-communication.md snippet and is not a symbol in
// api/ or runtimes/ at all — grep over the whole KB finds it in that one file.
AppSideService({
  onInit() {
    messageBuilder.listen(() => {}) // patterns/bluetooth-communication.md

    // Requirement 3 -> device: forward the user's configuration on change.
    // api/settings-storage.md — addListener: "This API only needs to be used in
    // the Side Service. The Settings App is 'responsive' to data changes in
    // settingsStorage, so there is no need to manually listen for data changes."
    // ASSUMPTION A6 (gap G10): the callback signature is undocumented — no
    // arguments, key/value, or a change record? Reading the whole store instead,
    // which only needs getItem, whose description ("Get the stored value by key
    // name") does pin down its argument.
    settingsStorage.addListener(() => {
      this.pushSettings()
    })

    this.pushSettings()

    // Requirement 2: the actual HTTP send.
    messageBuilder.on('request', (ctx) => { // patterns/bluetooth-communication.md
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      const { method, params } = payload

      if (method === 'POST_HR') {
        const endpoint = settingsStorage.getItem('endpoint') // api/settings-storage.md — getItem, "not stated"
        if (!endpoint) {
          ctx.response({ data: { result: 'no-endpoint' } })
          return
        }
        // api/fetch.md — fetch, "not stated", OFFICIAL: "The Fetch API can be used
        // to send HTTP requests in JS. The use of fetch() in the 'Side Service'
        // can be found in [Fetch API - MDN]".
        // ASSUMPTION A7 (gap G11): the KB delegates the whole contract to MDN and
        // records no signature, no options object, no response shape, and no
        // statement of which parts of the web Fetch API the Zepp runtime actually
        // implements. The call below is written to the MDN shape the description
        // points at — i.e. from outside this knowledge base.
        fetch({
          url: endpoint,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bpm: params.bpm, at: params.at })
        })
          .then((res) => {
            ctx.response({ data: { result: res && res.status ? res.status : 'ok' } })
          })
          .catch((err) => {
            console.log('HeartSync fetch failed', err) // api/global.md — console.log, "not stated", Settings App + Side Service
            ctx.response({ data: { result: 'error' } })
          })
      }
    })
  },

  pushSettings() {
    const endpoint = settingsStorage.getItem('endpoint') // api/settings-storage.md — getItem
    const intervalSec = settingsStorage.getItem('syncInterval') // api/settings-storage.md — getItem
    // patterns/bluetooth-communication.md — `messageBuilder.call({ text: 'Hello Zepp OS' })`
    messageBuilder.call({ type: 'settings', endpoint, intervalSec })
  }
})

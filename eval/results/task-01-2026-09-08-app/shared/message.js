/*
 * BLOCKED FILE — the knowledge base does not contain this module.
 *
 * patterns/bluetooth-communication.md is the KB's only Device App <-> Side Service
 * guide. Its own prose says:
 *
 *   "The communication library that Device Application relies on is
 *    /shared/message.js. The communication library that the Side Service depends
 *    on is /shared/message-side.js."
 *
 * Those two files are part of the upstream ToDoList sample. The KB records
 * neither their source nor their API. The calls the pattern's snippets make on
 * the instance are therefore the *only* evidence available:
 *
 *   Device side (app.js):  new MessageBuilder({ appId, appDevicePort, appSidePort, ble })
 *                          .connect() / .disConnect()
 *   Device side (page.js): .on('call', ({ payload }) => {})
 *                          .request({ method, params }) -> Promise
 *                          .buf2Json(buffer)
 *   Side  side:            new MessageBuilder()
 *                          .listen(cb) / .call(obj) / .on('request', ctx => {})
 *                          ctx.response({ data }) / ctx.request.payload
 *
 * No constructor contract, no error behaviour, no reconnect semantics, no
 * payload size limit, and no indication of which API_LEVEL the transport needs
 * (api/messaging.md — send/addListener, "not stated"; api/zos-ble.md — send, >= 2).
 *
 * Writing an implementation here would be pure invention over a binary BLE
 * protocol, which is exactly what the task forbids. Left as a hard block.
 * See report gap G02.
 */
throw new Error(
  'shared/message.js (MessageBuilder) is not covered by the knowledge base — see eval/results/task-01-2026-09-08.md gap G02'
)

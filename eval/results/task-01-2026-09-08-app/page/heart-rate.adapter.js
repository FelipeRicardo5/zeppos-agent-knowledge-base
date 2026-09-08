/*
 * Heart-rate adapter — the invention in this project is deliberately concentrated
 * in this one file so it is visible rather than spread through the page.
 *
 * WHAT THE KB ACTUALLY SAYS about heart rate, in full:
 *
 *   api/zos-sensor.md          | `HeartRate` | value | >= 2 | OFFICIAL
 *   api/zos-sensor.md          | "HeartRate Sensor. permission code: `data:user.hd.heart_rate`"
 *   compatibility/zos-sensor.md| under "## API_LEVEL 2"
 *   runtimes/device-app.md     | @zos/sensor -> HeartRate, Device App
 *
 * That is the whole record. Four facts: it exists, it is a `value`, it needs
 * level 2, it needs one permission. There is:
 *   - no constructor signature      (is `new HeartRate()` right? args?)
 *   - no member list                (getCurrent? getLast? .current?)
 *   - no subscription mechanism     (onCurrentChange? addEventListener? callback?)
 *   - no units, no range, no "no reading yet" sentinel
 *   - no statement about whether continuous measurement must be switched on
 *
 * skills/zepp-os/SKILL.md explains the omission for one case only —
 * "Methods reached through a returned object (DownloadTask.cancel, Onbox.enqueFile)
 * are not recorded. Their parent function is." — but `HeartRate` is a class the
 * developer instantiates directly, and NO symbol in the KB carries a signature
 * (verified: all 409 records in data/symbols/*.json have exactly the keys
 * confidence, description, extractedAt, id, minApiLevel, module, originalPath,
 * runtimes, source, symbol, type — there is no params/returns/members field).
 *
 * ASSUMPTION A2 (gap G01): the shape below — `new HeartRate()`, a `getCurrent()`
 * returning bpm as a number, and an `onCurrentChange(cb)` subscription — is
 * INVENTED. It is not in the knowledge base. It is isolated here and probed
 * defensively at runtime so that a wrong guess degrades to a visible error
 * instead of silently reporting nonsense heart rates to the user's server.
 */

import { HeartRate } from '@zos/sensor' // api/zos-sensor.md — HeartRate, >= 2, OFFICIAL, Device App; permission data:user.hd.heart_rate

export function createHeartRateSource() {
  const sensor = new HeartRate() // ASSUMPTION A2 — constructor form not documented

  // ASSUMPTION A2 — probe for a reader instead of committing to one name.
  const readers = ['getCurrent', 'getLast', 'getHeartRate', 'current', 'last']
  const read = () => {
    for (const name of readers) {
      const m = sensor[name]
      if (typeof m === 'function') return m.call(sensor)
      if (typeof m === 'number') return m
    }
    return null // no documented sentinel for "unavailable" either
  }

  // ASSUMPTION A2 — subscription name not documented. Falls back to polling with
  // setInterval, which IS documented: api/zos-global.md — setInterval, >= 2, OFFICIAL.
  const subscribe = (cb) => {
    const subscribers = ['onCurrentChange', 'onLastChange', 'addEventListener']
    for (const name of subscribers) {
      if (typeof sensor[name] === 'function') {
        sensor[name](() => cb(read()))
        return () => {} // no documented unsubscribe symbol either — gap G01
      }
    }
    const id = setInterval(() => cb(read()), 1000) // api/zos-global.md — setInterval, >= 2
    return () => clearInterval(id) // api/zos-global.md — clearInterval, >= 2
  }

  return { read, subscribe, supported: read() !== null || true }
}

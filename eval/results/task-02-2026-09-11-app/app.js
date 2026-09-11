/**
 * Root app.js — shared by every target declared in app.json.
 *
 * Entry-point shape: `DeviceRuntimeCore.App({ onCreate, onDestroy, ... })`.
 * This is the ONLY watchface app.js structure this knowledge base can show
 * actually working — examples/watchface-1-0-simple.md, app.js line 81
 * (OBSERVED, platform 1.0). skills/zepp-os/SKILL.md claims the entry point is
 * `WatchFace({ ... })` and calls that "observed in code", but no page or
 * data/examples/*.json in this base contains that literal call anywhere —
 * this is flagged as a base gap in the report, not invented around here.
 *
 * onCreate/onDestroy firing here is the Mini-Program-level app lifecycle
 * (install/process), not a documented "screen on/off" signal — this base has
 * no onShow/onHide/onDisplayOn/onDisplayOff record for the watchface runtime
 * anywhere. The per-target index.js files do their own battery-conscious
 * gating (see the comments there) because there is no cross-file handle from
 * this file into their timers that any example or reference page documents.
 */
DeviceRuntimeCore.App({
  // .App() — examples/watchface-1-0-simple.md, app.js line 57 (OBSERVED; "no record in this KB" per examples/index.md's "Methods called on a value" table)
  globalData: {},
  onCreate(options) {
    // onCreate/onDestroy shape — examples/watchface-1-0-simple.md, app.js lines 59-61 (OBSERVED)
  },
  onDestroy(options) {
    // matches the pattern in examples/watchface-3-0-timer.md, app.js lines 8 & 11
    // (that sample logs here via `logger.log(...)`, attributed to `@zos/utils.log`
    // by name only, with no import line in the extracted excerpt — see report
    // section 5. Skipped here rather than resolved.)
  },
  onError(error) {},
  onPageNotFound(obj) {},
  onUnhandledRejection(obj) {},
})

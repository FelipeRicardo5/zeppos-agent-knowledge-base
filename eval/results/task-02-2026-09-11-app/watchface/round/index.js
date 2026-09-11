/**
 * PulseFace — round target (480x480).
 * Matches app.json targets.round: platforms [{ st: "r", sr: "w480" }].
 * A device this reaches: Amazfit Balance 2 — compatibility/devices.md line 26
 * (round, 480x480, API_LEVEL 4.2, st:"r"/sr:"w480" per line 78).
 * NOTE: GTR 3 Pro (the device the official 3.0 "timer" sample targets at this
 * same st:"r" selector) is filed in this KB under "Zepp OS 1.0 devices — no
 * API_LEVEL" (compatibility/devices.md line 162), not under "Devices running
 * Zepp OS" — so it cannot be used here to vouch for any API_LEVEL. See report
 * section 3 (gaps) for this conflict.
 *
 * Every hm* call below is a global — nothing in this file is imported, per
 * skills/zepp-os/SKILL.md's watchface rule ("Nothing is imported... you write
 * hmUI.createWidget(...), hmSensor.createSensor(...)").
 */

// ---- Sensors --------------------------------------------------------------

// hmSensor.createSensor — api/hmSensor.md "Symbols in detail"
// hmSensor.id.TIME — runtimes/watchface.md, hmSensor.id table
const timeSensor = hmSensor.createSensor(hmSensor.id.TIME)

// hmSensor.id.HEART — runtimes/watchface.md, hmSensor.id table (no description
// beyond the bare enum name; the shape returned by createSensor for HEART is
// OBSERVED only, from examples/watchface-1-0-simple.md, not documented anywhere)
const heartSensor = hmSensor.createSensor(hmSensor.id.HEART)

// hmSensor.id.STEP — runtimes/watchface.md, hmSensor.id table. This is as far
// as this base goes: no example in examples/index.md calls
// hmSensor.createSensor(hmSensor.id.STEP), and no reference page gives the
// returned object a property table (hmSensor.md's only "Symbols in detail"
// entries are addEventListener/createSensor/id — nothing describes what a
// created Step sensor exposes).
//
// ASSUMPTION (UNVOUCHED): the two lines below read `.current` and `.target`
// off that object, by analogy with the TIME sensor's plain numeric properties
// (`timeSensor.hour`, `timeSensor.minute`) and HEART's `.last`
// (examples/watchface-1-0-simple.md, lines 37-39 and 47-49, both OBSERVED).
// This base has no citation for `.current`/`.target` on a Step sensor
// specifically — flagged rather than smoothed over. If these property names
// are wrong, the step text and the progress arc below will silently show
// `undefined`.
const stepSensor = hmSensor.createSensor(hmSensor.id.STEP)

// ---- Layout (round 480x480) ------------------------------------------------

// hmUI.createWidget — api/hmUI.md "Symbols in detail"
// hmUI.widget.FILL_RECT + its Param table — api/hmUI.widget.md
hmUI.createWidget(hmUI.widget.FILL_RECT, {
  x: 0,
  y: 0,
  w: 480,
  h: 480,
  color: 0x000000,
})

// Dim background track + bright progress arc for steps-vs-target.
// hmUI.widget.ARC Param table — api/hmUI.widget.md (x/y/w/h/radius/start_angle/
// end_angle/line_width/color — all documented, all required)
hmUI.createWidget(hmUI.widget.ARC, {
  x: 40,
  y: 40,
  w: 400,
  h: 400,
  radius: 200,
  start_angle: -90, // 0 degrees = 3 o'clock per hmUI.widget.md; -90 starts at 12 o'clock
  end_angle: 270,
  line_width: 14,
  color: 0x333333,
})

// hmUI.widget.ARC_PROGRESS Param table — api/hmUI.widget.md. NOTE: this widget
// id is documented (OFFICIAL) but conflicts/index.md's "documented, never
// written as an id" list names ARC_PROGRESS explicitly — no sample in this
// base has ever been observed creating one. Used here on the reference page's
// Param table alone.
const stepArc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
  center_x: 240,
  center_y: 240,
  radius: 200,
  start_angle: -90,
  end_angle: 270,
  line_width: 14,
  color: 0x33cc66,
  level: 0, // [0-100] per hmUI.widget.md; recomputed in renderSteps() below
})

function pad(n) {
  return String(n).padStart(2, '0')
}

// hmUI.widget.TEXT Param table — api/hmUI.widget.md
// hmUI.align.CENTER_H / CENTER_V — api/hmUI.md "hmUI.align" table
// hmUI.text_style.NONE — api/hmUI.md "hmUI.text_style" table
const timeText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 90,
  y: 150,
  w: 300,
  h: 100,
  text: pad(timeSensor.hour) + ':' + pad(timeSensor.minute), // timeSensor.hour/.minute — examples/watchface-1-0-simple.md, lines 37-39 (OBSERVED)
  color: 0xffffff,
  text_size: 90,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

const hrText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 90,
  y: 260,
  w: 300,
  h: 50,
  // heartSensor.last — examples/watchface-1-0-simple.md, lines 47-49 (OBSERVED).
  // ASSUMPTION (UNVOUCHED): treating a falsy `.last` (0/undefined) as "no
  // reading" and showing a placeholder — this base documents no sentinel
  // value for "heart rate not available" anywhere.
  text: heartSensor.last ? 'HR ' + heartSensor.last : 'HR --',
  color: 0xff5566,
  text_size: 32,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

const stepText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 90,
  y: 320,
  w: 300,
  h: 50,
  text: stepSensor.current + ' / ' + stepSensor.target + ' steps', // see ASSUMPTION on stepSensor above
  color: 0x66ccff,
  text_size: 28,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

// ---- The one editable slot -------------------------------------------------
//
// hmUI.widget.IMG_POINTER Param table — api/hmUI.widget.md: "The data progress
// can be displayed by binding the data type hmUI.data_type.*" and its `type`
// property. hmUI.data_type.STRESS — api/hmUI.md "hmUI.data_type" table.
// app.json's `targets.round.module.watchface.editable: 1` — manifest/targets.md
// line 138 ("Editable watchface (0: not supported)"), and this exact key path
// (`targets.*.module.watchface.editable`) is present in the official 3.0
// "timer" sample's own manifest.keyPaths (data/examples/watchface-3-0-timer.json,
// line 56) — so the v3, per-target placement used in app.json is OBSERVED, not
// just documented.
//
// ASSUMPTION (UNVOUCHED): that setting `editable: 1` is what lets the watch's
// own watchface editor let the wearer repoint THIS widget's `type` at a
// different hmUI.data_type.* member. No page or sample in this base connects
// the manifest flag to a specific widget, and no code-level callback for the
// wearer's selection is documented anywhere in this knowledge base. This is
// the load-bearing gap behind requirement 5 — see the report.
hmUI.createWidget(hmUI.widget.IMG_POINTER, {
  src: 'pointer.png', // developer-supplied asset; not shipped with this KB (see report)
  x: 4,
  y: 60,
  center_x: 240,
  center_y: 400,
  angle: 0,
  start_angle: 0,
  end_angle: 360,
  type: hmUI.data_type.STRESS, // default editable metric
})

// ---- Live updates -----------------------------------------------------------

function renderSteps() {
  // hmSetting.getScreenType() / hmSetting.screen_type.AOD — api/hmSetting.md
  // "Symbols in detail" and "hmSetting.screen_type" table (OFFICIAL, no
  // API_LEVEL stated). Skipping this poll while the screen is resting in AOD
  // is this project's only citable lever for requirement 6 — see the long
  // comment near stopUpdating()/startUpdating() below for what it does not
  // cover (the TIME/HEART push listeners cannot be silenced the same way).
  if (hmSetting.getScreenType() === hmSetting.screen_type.AOD) return

  const current = stepSensor.current
  const target = stepSensor.target || 1
  // hmUI.setProperty + hmUI.prop.MORE — OBSERVED update pattern, e.g.
  // examples/watchface-1-0-simple.md lines 78 & 86 (`widget.setProperty(hmUI.prop.MORE, {...})`).
  // hmUI.md line 176 documents that MORE's value "is used in the same way as
  // createWidget's option" (OFFICIAL) — applying it to ARC_PROGRESS's own
  // `level` property is consistent with that description but has not itself
  // been observed on an ARC_PROGRESS widget anywhere in this base.
  stepText.setProperty(hmUI.prop.MORE, { text: current + ' / ' + target + ' steps' })
  const level = Math.max(0, Math.min(100, Math.round((current / target) * 100)))
  stepArc.setProperty(hmUI.prop.MORE, { level: level })
}

// hmSensor.md documents `addEventListener` as a bare function,
// `hmSensor.addEventListener(eventId, callback)`, but every observed sample
// call is an INSTANCE method on the created sensor
// (`timeSensor.addEventListener(...)`, `heartSensor.addEventListener(...)` —
// examples/watchface-1-0-simple.md lines 35 & 45). Per
// skills/zepp-os/SKILL.md ("the sample is code that runs. Prefer it, and flag
// the conflict"), the instance-method form is used here.
timeSensor.addEventListener(timeSensor.event.MINUTEEND, function () {
  // timeSensor.event.MINUTEEND — examples/watchface-1-0-simple.md line 35 (OBSERVED; undocumented elsewhere)
  timeText.setProperty(hmUI.prop.MORE, {
    text: pad(timeSensor.hour) + ':' + pad(timeSensor.minute),
  })
})

heartSensor.addEventListener(heartSensor.event.LAST, function () {
  // heartSensor.event.LAST — examples/watchface-1-0-simple.md line 46 (OBSERVED; undocumented elsewhere)
  hrText.setProperty(hmUI.prop.MORE, {
    text: heartSensor.last ? 'HR ' + heartSensor.last : 'HR --',
  })
})

// Step count has no push/event API documented or observed anywhere in this
// base (unlike TIME's MINUTEEND and HEART's LAST), so it is polled on a timer
// instead — timer.createTimer(delay, period, callback, extra) is OBSERVED in
// examples/watchface-3-0-timer.md lines 94/99 and
// examples/watchface-1-0-simple.md line 101. The 15s period below is this
// project's own choice; no page in this base recommends a polling interval
// for step data.
let stepTimer = null

function startUpdating() {
  if (stepTimer) return
  stepTimer = timer.createTimer(0, 15000, renderSteps, {})
}

function stopUpdating() {
  if (stepTimer) {
    // timer.stopTimer — examples/watchface-1-0-simple.md line 175 / examples/watchface-3-0-timer.md line 280 (OBSERVED)
    timer.stopTimer(stepTimer)
    stepTimer = null
  }
}

// ---- Battery notes (requirement 6) -----------------------------------------
//
// This base documents no onShow/onHide/onDisplayOn/onDisplayOff event for the
// watchface runtime anywhere, so there is no documented push notification for
// "the screen just went off" or "just came back". renderSteps() above is this
// project's only citable lever: it polls hmSetting.getScreenType() each tick
// and skips its work while AOD is active, so the periodic redraw stops on its
// own without needing a lifecycle callback this base cannot show. It does not
// stop the TIME/HEART sensors' own push callbacks above, because hmSensor has
// no documented or observed removeEventListener/off anywhere in this base
// (runtimes/watchface.md's hmSensor table lists only addEventListener,
// createSensor and id) — those two cannot be silenced from watchface code
// even in principle, only the polled step work can be. app.js's onDestroy
// would be the natural place to call stopUpdating(), but that lives in a
// different file with no documented or observed way to reach this timer
// handle from there — see the report.
startUpdating()

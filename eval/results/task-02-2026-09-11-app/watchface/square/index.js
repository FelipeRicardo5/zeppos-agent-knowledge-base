/**
 * PulseFace — square target (390x450).
 * Matches app.json targets.square: platforms [{ st: "s", sr: "w390" }].
 * A device this reaches: Amazfit Bip 6 — compatibility/devices.md line 27
 * (square, 390x450, API_LEVEL 4.2, st:"s"/sr:"w390" per line 84).
 * Bip 6 is also listed among the "18 devices no sample targets"
 * (compatibility/devices.md lines 129-149) — there is no official sample
 * manifest to copy a `platforms` entry from for it; the `st`/`sr` selector
 * values themselves are still directly read off that same device row, so the
 * selector is vouched even though no worked build example is.
 *
 * This file only differs from watchface/round/index.js in the numbers below
 * (screen is 390x450 instead of 480x480, so widget coordinates/radii are
 * smaller and the FILL_RECT is not square). Every API citation is identical
 * to the round file and is not repeated in full here — see that file for the
 * long-form justification of each call.
 */

// ---- Sensors --------------------------------------------------------------
// hmSensor.createSensor / hmSensor.id.TIME / HEART / STEP — see round/index.js for citations and the STEP-shape ASSUMPTION.
const timeSensor = hmSensor.createSensor(hmSensor.id.TIME)
const heartSensor = hmSensor.createSensor(hmSensor.id.HEART)
const stepSensor = hmSensor.createSensor(hmSensor.id.STEP)

// ---- Layout (square 390x450) -----------------------------------------------

// hmUI.widget.FILL_RECT — api/hmUI.widget.md
hmUI.createWidget(hmUI.widget.FILL_RECT, {
  x: 0,
  y: 0,
  w: 390,
  h: 450,
  color: 0x000000,
})

// hmUI.widget.ARC — api/hmUI.widget.md
hmUI.createWidget(hmUI.widget.ARC, {
  x: 35,
  y: 65,
  w: 320,
  h: 320,
  radius: 160,
  start_angle: -90,
  end_angle: 270,
  line_width: 12,
  color: 0x333333,
})

// hmUI.widget.ARC_PROGRESS — api/hmUI.widget.md (see round/index.js for the "never written as an id" caveat from conflicts/index.md)
const stepArc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
  center_x: 195,
  center_y: 225,
  radius: 160,
  start_angle: -90,
  end_angle: 270,
  line_width: 12,
  color: 0x33cc66,
  level: 0,
})

function pad(n) {
  return String(n).padStart(2, '0')
}

// hmUI.widget.TEXT / hmUI.align / hmUI.text_style — api/hmUI.widget.md, api/hmUI.md
const timeText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 45,
  y: 140,
  w: 300,
  h: 90,
  text: pad(timeSensor.hour) + ':' + pad(timeSensor.minute), // OBSERVED — examples/watchface-1-0-simple.md lines 37-39
  color: 0xffffff,
  text_size: 70,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

const hrText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 45,
  y: 240,
  w: 300,
  h: 50,
  text: heartSensor.last ? 'HR ' + heartSensor.last : 'HR --', // see round/index.js "no reading" ASSUMPTION
  color: 0xff5566,
  text_size: 28,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

const stepText = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 45,
  y: 300,
  w: 300,
  h: 50,
  text: stepSensor.current + ' / ' + stepSensor.target + ' steps', // see round/index.js stepSensor ASSUMPTION
  color: 0x66ccff,
  text_size: 24,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
})

// ---- The one editable slot -------------------------------------------------
// hmUI.widget.IMG_POINTER + hmUI.data_type.STRESS — see round/index.js for the
// full citation and the ASSUMPTION connecting this to app.json's
// targets.square.module.watchface.editable: 1.
hmUI.createWidget(hmUI.widget.IMG_POINTER, {
  src: 'pointer.png',
  x: 4,
  y: 50,
  center_x: 195,
  center_y: 380,
  angle: 0,
  start_angle: 0,
  end_angle: 360,
  type: hmUI.data_type.STRESS,
})

// ---- Live updates -----------------------------------------------------------
// See round/index.js for full citations on every call in this section.

function renderSteps() {
  if (hmSetting.getScreenType() === hmSetting.screen_type.AOD) return
  const current = stepSensor.current
  const target = stepSensor.target || 1
  stepText.setProperty(hmUI.prop.MORE, { text: current + ' / ' + target + ' steps' })
  const level = Math.max(0, Math.min(100, Math.round((current / target) * 100)))
  stepArc.setProperty(hmUI.prop.MORE, { level: level })
}

timeSensor.addEventListener(timeSensor.event.MINUTEEND, function () {
  timeText.setProperty(hmUI.prop.MORE, {
    text: pad(timeSensor.hour) + ':' + pad(timeSensor.minute),
  })
})

heartSensor.addEventListener(heartSensor.event.LAST, function () {
  hrText.setProperty(hmUI.prop.MORE, {
    text: heartSensor.last ? 'HR ' + heartSensor.last : 'HR --',
  })
})

let stepTimer = null

function startUpdating() {
  if (stepTimer) return
  stepTimer = timer.createTimer(0, 15000, renderSteps, {})
}

function stopUpdating() {
  if (stepTimer) {
    timer.stopTimer(stepTimer)
    stepTimer = null
  }
}

startUpdating()

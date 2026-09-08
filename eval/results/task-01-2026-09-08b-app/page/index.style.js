// HeartSync — Device App page styles.
//
// Style objects are kept out of the page file per patterns/code-organization.md
// ("Example": `page.styles.js` exports style constants built with px/align/text_style).

import { align, text_style } from '@zos/ui'
// ^ api/zos-ui.md — align, function, API_LEVEL "not stated", OBSERVED
//   api/zos-ui.md — text_style, function, API_LEVEL "not stated", OBSERVED
//   skills/zepp-os/SKILL.md, "The gap that will bite you first": these two carry no
//   level and no description. Their availability on the Bip 6 CANNOT be certified
//   from this knowledge base. Import line is verbatim from
//   patterns/code-organization.md (`page.styles.js`) and patterns/multi-screen-adaption.md.

import { px } from '@zos/utils'
// ^ api/zos-utils.md — px, function, >= 2, OFFICIAL. Scales against `designWidth`
//   of the matching entry in app.json `targets` (api/zos-utils.md description).

import { getDeviceInfo } from '@zos/device'
// ^ api/zos-device.md — getDeviceInfo, function, >= 2, OFFICIAL.
//   permission code: `data:os.device.info` (same page) — declared in app.json.
//   Destructuring shape is verbatim from
//   examples/application-4-0-fetch-api.md, `.../utils/config/device.js` line 2:
//   `export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()`

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

// patterns/multi-screen-adaption.md, "Introduction to different screens":
// "a status bar is pre-drawn on square screen devices ... The height of the status
// bar is 64 px". The Bip 6 is a square 390 x 450 screen
// (compatibility/devices.md line 27), so all content starts below y = 64.
const STATUS_BAR_H = px(64)

export const TITLE_TEXT = {
  x: 0,
  y: STATUS_BAR_H + px(16),
  w: DEVICE_WIDTH,
  h: px(40),
  color: 0x999999,
  text_size: px(24),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text: 'HeartSync'
}

export const BPM_TEXT = {
  x: 0,
  y: STATUS_BAR_H + px(70),
  w: DEVICE_WIDTH,
  h: px(120),
  color: 0xff4d4f,
  text_size: px(96),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text: '--'
}

export const UNIT_TEXT = {
  x: 0,
  y: STATUS_BAR_H + px(190),
  w: DEVICE_WIDTH,
  h: px(34),
  color: 0x888888,
  text_size: px(26),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
  text: 'BPM'
}

export const STATUS_TEXT = {
  x: px(20),
  y: STATUS_BAR_H + px(240),
  w: DEVICE_WIDTH - px(40),
  h: px(70),
  color: 0x666666,
  text_size: px(22),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.WRAP,
  // text_style.WRAP and align.CENTER_H / align.CENTER_V are the member names used
  // verbatim in patterns/code-organization.md and patterns/multi-screen-adaption.md.
  // The full member list of `align` / `text_style` is not recorded anywhere in the KB.
  text: 'Waiting for reading...'
}

export const SYNC_BUTTON = {
  x: (DEVICE_WIDTH - px(280)) / 2,
  // ^ centring idiom verbatim from examples/application-2-0-post-health-data-miniprogram.md,
  //   `.../page/index.js` line 28: `x: (DEVICE_WIDTH - px(400)) / 2,`
  y: STATUS_BAR_H + px(320),
  w: px(280),
  h: px(64),
  text_size: px(26),
  radius: px(12),
  normal_color: 0x333333,
  press_color: 0x1a1a1a,
  text: 'Sync now'
  // ^ BUTTON property names (text_size / radius / normal_color / press_color / text /
  //   click_func) are verbatim from the createWidget(widget.BUTTON, ...) excerpt in
  //   examples/application-2-0-post-health-data-miniprogram.md, `.../page/index.js` line 27.
}

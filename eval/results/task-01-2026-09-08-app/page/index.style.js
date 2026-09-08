/*
 * Styles, split out per patterns/code-organization.md ("page.styles.js — Device App").
 * Bip 6 is a SQUARE screen, 390 x 450 (compatibility/devices.md — "Amazfit Bip 6").
 * patterns/multi-screen-adaption.md: on square devices a status bar is pre-drawn and
 * "The height of the status bar is 64 px", so content starts below y = 64.
 */

import { align, text_style } from '@zos/ui' // api/zos-ui.md — align / text_style, function, "not stated", OBSERVED. Gap G04
import { px } from '@zos/utils' // api/zos-ui.md is the wrong place for px: api/zos-utils.md — px, >= 2, OFFICIAL

const W = px(390) // designWidth 390 in app.json; api/zos-utils.md — px scales against targets[].designWidth

export const BPM_STYLE = {
  x: px(0),
  y: px(150),
  w: W,
  h: px(90),
  color: 0xffffff,
  text_size: px(72),
  align_h: align.CENTER_H, // api/zos-ui.md — align, "not stated". Member CENTER_H taken from patterns/code-organization.md + patterns/multi-screen-adaption.md snippets
  align_v: align.CENTER_V,
  text_style: text_style.NONE // member NONE seen in patterns/multi-screen-adaption.md (square branch); WRAP seen in the round branch
}

export const LABEL_STYLE = {
  x: px(0),
  y: px(250),
  w: W,
  h: px(40),
  color: 0x999999,
  text_size: px(28),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE
}

export const STATUS_STYLE = {
  x: px(0),
  y: px(360),
  w: W,
  h: px(40),
  color: 0x666666,
  text_size: px(24),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.NONE
}

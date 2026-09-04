# Screen Adaptation

The screen shape and size of each device can be found in the Device Basic Information. The entire area of the round screen is available for developers to draw, while **a status bar** is pre-drawn on square screen devices for application uniformity, as shown in the following image. !square screen The height of the status bar is 64 px, the text is displayed on the left and the current time is displayed on the right. The text defaults to the `appName` field in `app.json`, and if the `appName` field is configured in `i18n`, the configuration in `i18n` is used first. There are the following APIs related to the status bar

**Minimum API_LEVEL: >= 2.** The highest minimum among the 8 symbols this pattern's code uses — every one of them has to be available.

Runtimes the guide's own file names state: Device App.

Source: `zeppos-docs/docs/guides/best-practice/multi-screen-adaption.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/device.SCREEN_SHAPE_ROUND` | >= 2 | Device App | yes |
| `@zos/device.SCREEN_SHAPE_SQUARE` | >= 2 | Device App | yes |
| `@zos/device.getDeviceInfo` | >= 2 | Device App | yes |
| `@zos/ui.align` | not stated | Device App, Workout Extension | yes |
| `@zos/ui.createWidget` | >= 2 | Device App, Workout Extension | yes |
| `@zos/ui.text_style` | not stated | Device App, Workout Extension | yes |
| `@zos/ui.widget` | not stated | Device App, Workout Extension | yes |
| `@zos/utils.px` | >= 2 | Device App, Workout Extension | yes |

## Introduction to different screens

## Adaptation scheme

## `px` global functions

Symbols: `@zos/ui.align`, `@zos/ui.createWidget`, `@zos/ui.text_style`, `@zos/ui.widget`, `@zos/utils.px`

```js
{
  ...
  "targets": {
    "gtr-3-pro": {
      "designWidth": 480
    },
    "gtr-3": {
      "designWidth": 480
    },
  }
}
```

```js
import { px } from '@zos/utils'

// in GTR 3 PRO
console.log(px(100)) // 100

// in GTR 3
console.log(px(100)) // 95
```

```js
import { createWidget, widget, text_style, align } from '@zos/ui'
import { px } from '@zos/utils'

const textStyle = {
  x: px(96),
  y: px(40),
  w: px(288),
  h: px(46),
  color: 0xffffff,
  text_size: px(36),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.WRAP
}

const text = createWidget(widget.TEXT, textStyle)
```

## Style code is organized by screen shape

Symbols: `@zos/device.SCREEN_SHAPE_ROUND`, `@zos/device.SCREEN_SHAPE_SQUARE`, `@zos/device.getDeviceInfo`, `@zos/ui.align`, `@zos/ui.text_style`, `@zos/utils.px`

`index.style.js` — Device App

```js
import { getDeviceInfo, SCREEN_SHAPE_SQUARE, SCREEN_SHAPE_ROUND } from '@zos/device'
import { align, text_style } from '@zos/ui'
import { px } from '@zos/utils'

const deviceInfo = getDeviceInfo()
const { width, height, screenShape } = deviceInfo

const processStyles = (styleObj = {}) => {
  return styleObj[screenShape]
}

const HOME_TITLE = {
  [SCREEN_SHAPE_ROUND]: {
    attrs: {
      text: 'Hello World Round'
    },
    x: px(96),
    y: px(40),
    w: px(288),
    h: px(46),
    color: 0xffffff,
    text_size: px(36),
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text_style: text_style.WRAP
  },
  [SCREEN_SHAPE_SQUARE]: {
    attrs: {
      text: 'Hello World Square',
      x: 32,
      y: 11,
      w: 232,
      h: 42,
      color: 0x666666,
      text_size: 32,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    }
  }
}

export default {
  HOME_TITLE: processStyles(HOME_TITLE)
}
```

## Reference pages the guide links to

- `zeppos-docs/docs/reference/app-json.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/device/getDeviceInfo.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/ui/setStatusBarVisible.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/ui/updateStatusBarTitle.mdx`
- `zeppos-docs/docs/reference/device-app-api/newAPI/utils/px.mdx`
- `zeppos-docs/docs/reference/related-resources/device-list.mdx`

# Code Organization

In order to improve development efficiency and project maintainability, a better way of organizing code is needed, and this article only provides an idea.

**Minimum API_LEVEL: >= 2.** The highest minimum among the 5 symbols this pattern's code uses — every one of them has to be available.

Runtimes the guide's own file names state: Device App.

Source: `zeppos-docs/docs/guides/best-practice/code-organization.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/ui.align` | not stated | Device App, Workout Extension | yes |
| `@zos/ui.createWidget` | >= 2 | Device App, Workout Extension | yes |
| `@zos/ui.text_style` | not stated | Device App, Workout Extension | yes |
| `@zos/ui.widget` | not stated | Device App, Workout Extension | yes |
| `@zos/utils.px` | >= 2 | Device App, Workout Extension | yes |

## Principles

## How to improve development efficiency

## Example

Symbols: `@zos/ui.align`, `@zos/ui.createWidget`, `@zos/ui.text_style`, `@zos/ui.widget`, `@zos/utils.px`

`page.js` — Device App

```js
import { createWidget, widget } from '@zos/ui'
import { TEXT_STYLE } from './page.styles.js'
import TextClass from './text.class.js'

Page({
  state: {
    textInstance: null
  },
  build() {
    this.state.textInstance = new TextClass()
    this.buildUI()
  },
  buildUI() {
    createWidget(widget.TEXT, {
      attr: {
        text: this.state.textInstance.getText()
      },
      styles: TEXT_STYLE
    })
  }
})
```

`class.js` — Device App

```js
export default class TextClass {
  constructor() {
    this.text = 'Hello World'
  }
  getText() {
    return this.text
  }
}
```

`page.styles.js` — Device App

```js
import { align, text_style } from '@zos/ui'
import { px } from '@zos/utils'

export const TEXT_STYLE = {
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
```

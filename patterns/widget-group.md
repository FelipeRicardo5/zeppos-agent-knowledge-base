# Widgets Management by Group

This article introduces the use of `GROUP` widget to group and manage a series of widgets in some suitable scenarios for a more elegant code implementation. Examples are given for the following scenarios, and we look forward to more scenarios from the community

**Minimum API_LEVEL: >= 2.** The highest minimum among the 4 symbols this pattern's code uses — every one of them has to be available.

Source: `zeppos-docs/docs/guides/best-practice/widget-group.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/ui.createWidget` | >= 2 | Device App, Workout Extension | yes |
| `@zos/ui.event` | not stated | Device App | yes |
| `@zos/ui.prop` | not stated | Device App, Workout Extension | yes |
| `@zos/ui.widget` | not stated | Device App, Workout Extension | yes |

## Scenario 1: Uniformly control the widgets in a rectangular area to show/hide, modify the position, etc.

Symbols: `@zos/ui.createWidget`, `@zos/ui.prop`, `@zos/ui.widget`

```js
import { createWidget, widget, prop } from '@zos/ui'

const img_icon_widget = createWidget(widget.IMG, {
  // ...
})

const img_arrow_widget = createWidget(widget.IMG, {
  // ...
})

const text_name_widget = createWidget(widget.TEXT, {
  // ...
})

img_icon_widget.setProperty(prop.VISIBLE, false)
img_arrow_widget.setProperty(prop.VISIBLE, false)
text_name_widget.setProperty(prop.VISIBLE, false)
```

```js
import { createWidget, widget, prop } from '@zos/ui'

const group_widget = createWidget(widget.GROUP , {
  // ...
})

const img_icon_widget = group_widget.createWidget(widget.IMG, {
  // ...
})

const img_arrow_widget = group_widget.createWidget(widget.IMG, {
  // ...
})

const text_name_widget = group_widget.createWidget(widget.TEXT, {
  // ...
})

group_widget.setProperty(prop.VISIBLE, false)
```

## Scenario 2: Register the same click events for controls in a rectangular area and expand the click area for user interaction

Symbols: `@zos/ui.createWidget`, `@zos/ui.event`, `@zos/ui.widget`

```js
import { createWidget, widget, event } from '@zos/ui'

const callback = () => {
  console.log('callback')
}

const img_icon_widget = createWidget(widget.IMG, {
  // ...
})

img_icon_widget.addEventListener(event.CLICK_DOWN, callback)

const img_arrow_widget = createWidget(widget.IMG, {
  // ...
})

img_arrow_widget.addEventListener(event.CLICK_DOWN, callback)

const text_name_widget = createWidget(widget.TEXT, {
  // ...
})

text_name_widget.addEventListener(event.CLICK_DOWN, callback)
```

```js
import { createWidget, widget, event } from '@zos/ui'

const callback = () => {
  console.log('callback')
}

const group_widget = createWidget(widget.GROUP , {
  // ...
})

const img_icon_widget = group_widget.createWidget(widget.IMG, {
  // ...
})

const img_arrow_widget = group_widget.createWidget(widget.IMG, {
  // ...
})

const text_name_widget = group_widget.createWidget(widget.TEXT, {
  // ...
})

group_widget.addEventListener(event.CLICK_DOWN, callback)
```

# @zos/ui

**74 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addEventListener` | value | >= 2 | OFFICIAL |
| `addLayoutChild` | value | >= 4 | OFFICIAL |
| `align` | function | not stated | OBSERVED |
| `anim_status` | function | not stated | OBSERVED |
| `ARC` | value | >= 2 | OFFICIAL |
| `BUTTON` | value | >= 2 | OFFICIAL |
| `Buzzer` | function | >= 3.6 | OFFICIAL |
| `CANVAS` | value | >= 3 | OFFICIAL |
| `CHECKBOX_GROUP` | value | >= 2 | OFFICIAL |
| `CIRCLE` | value | >= 2 | OFFICIAL |
| `createDialog` | value | >= 2 | OFFICIAL |
| `createKeyboard` | function | not stated | OBSERVED |
| `createWidget` | value | >= 2 | OFFICIAL |
| `CYCLE_IMAGE_TEXT_LIST` | value | >= 2 | OFFICIAL |
| `CYCLE_LIST` | value | >= 2 | OFFICIAL |
| `data_type` | function | not stated | OBSERVED |
| `deleteKeyboard` | function | not stated | OBSERVED |
| `deleteWidget` | value | >= 2 | OFFICIAL |
| `DIALOG` | value | >= 2 | OFFICIAL |
| `dumpLayout` | function | not stated | OBSERVED |
| `edit_widget_group_type` | function | not stated | OBSERVED |
| `event` | function | not stated | OBSERVED |
| `FILL_RECT` | value | >= 2 | OFFICIAL |
| `getAppWidgetSize` | value | >= 2 | OFFICIAL |
| `getId` | value | >= 2 | OFFICIAL |
| `getImageInfo` | value | >= 2 | OFFICIAL |
| `getProperty` | value | >= 2 | OFFICIAL |
| `getRtlLayout` | value | >= 2 | OFFICIAL |
| `gettersetter` | value | >= 4 | OFFICIAL |
| `getTextLayout` | value | >= 2 | OFFICIAL |
| `getType` | value | >= 2 | OFFICIAL |
| `GRADIENT_POLYLINE` | value | >= 2 | OFFICIAL |
| `GROUP` | value | >= 2 | OFFICIAL |
| `HISTOGRAM` | value | >= 2 | OFFICIAL |
| `IMG` | value | >= 2 | OFFICIAL |
| `IMG_ANIM` | value | >= 2 | OFFICIAL |
| `inputType` | function | not stated | OBSERVED |
| `keyboard` | value | >= 4.2 | OFFICIAL |
| `KEYBOARD` | value | >= 3 | OFFICIAL |
| `openInspector` | function | >= 4 | OFFICIAL |
| `PAGE_INDICATOR` | value | >= 2.1 | OFFICIAL |
| `PAGE_SCROLLBAR` | value | >= 3 | OFFICIAL |
| `PICK_DATE` | value | >= 2 | OFFICIAL |
| `PICKER` | value | >= 3 | OFFICIAL |
| `POLYLINE` | function | >= 2 | OFFICIAL |
| `prop` | function | not stated | OBSERVED |
| `QRCODE` | value | >= 2 | OFFICIAL |
| `RADIO_GROUP` | value | >= 2 | OFFICIAL |
| `redraw` | value | >= 2 | OFFICIAL |
| `relayoutRtl` | value | >= 2 | OFFICIAL |
| `removeEventListener` | value | >= 2 | OFFICIAL |
| `removeLayoutChild` | value | >= 4 | OFFICIAL |
| `SCROLL_LIST` | value | >= 2 | OFFICIAL |
| `setAlpha` | value | >= 2.1 | OFFICIAL |
| `setAppWidgetSize` | value | >= 2 | OFFICIAL |
| `setEnable` | value | >= 2 | OFFICIAL |
| `setLayoutParent` | value | >= 4 | OFFICIAL |
| `setProperty` | value | >= 2 | OFFICIAL |
| `setStatusBarVisible` | value | >= 2 | OFFICIAL |
| `SLIDE_SWITCH` | value | >= 2 | OFFICIAL |
| `sport_data` | function | not stated | OBSERVED |
| `SPORT_DATA` | value | >= 3.6 | OFFICIAL |
| `STROKE_RECT` | value | >= 2 | OFFICIAL |
| `SYSTEM_KEYBOARD` | value | >= 4 | OFFICIAL |
| `TEXT` | value | >= 2 | OFFICIAL |
| `text_style` | function | not stated | OBSERVED |
| `TIME_PICKER` | value | >= 3.6 | OFFICIAL |
| `updateLayout` | value | >= 4 | OFFICIAL |
| `updateLayoutStyle` | value | >= 4 | OFFICIAL |
| `updateStatusBarTitle` | value | >= 2 | OFFICIAL |
| `VIEW_CONTAINER` | value | >= 2 | OFFICIAL |
| `VIRTUAL_CONTAINER` | value | >= 4 | OFFICIAL |
| `widget` | function | not stated | OBSERVED |
| `widgetAnimations` | value | >= 2 | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Descriptions

### `@zos/ui.addEventListener`

Register a listener to the UI widget and the given callback function will be executed when the specified event is triggered.

### `@zos/ui.addLayoutChild`

Adds a child node to the current widget.

### `@zos/ui.ARC`

Arc widget to display arc progress. Support setting line width, color, start and end angle.

### `@zos/ui.BUTTON`

The button widget supports setting images and colors for normal and pressed states.

### `@zos/ui.Buzzer`

Buzzer

### `@zos/ui.CANVAS`

Canvas Current Canvas capabilities include 1. Basic drawing, line, point, rectangle, rectangle fill, ellipse, sector, polygon 1. Image drawing 1. Text drawing 1. Paint 1. The canvas is stacked vertically, up to three layers can be stacked 1. Clean up the canvas 1. Support `addEventListener` method to listen for user interaction events

### `@zos/ui.CHECKBOX_GROUP`

Used to select multiple options from a set of choices. Each option needs to be created using `STATE_BUTTON`.

### `@zos/ui.CIRCLE`

Draws a circle with support for color, transparency, and other properties.

### `@zos/ui.createDialog`

Create a Dialog.

### `@zos/ui.createWidget`

Create UI widgets.

### `@zos/ui.CYCLE_IMAGE_TEXT_LIST`

Create a list that can be scrolled in a loop, and each list item can be placed with an image and text.

### `@zos/ui.CYCLE_LIST`

Create a list that scrolls in a loop, which can be populated with images.

### `@zos/ui.deleteWidget`

Delete the UI widget.

### `@zos/ui.DIALOG`

This widget has been discontinued. It is recommended to replace it with the more powerful [@zos/interaction createModal API](../../interaction/createModal.mdx) Dialog popup consists of a piece of text and two buttons. The popup box disappears when the buttons are clicked.

### `@zos/ui.FILL_RECT`

The Fill Rectangle widget is used to draw a solid color rectangular area.

### `@zos/ui.getAppWidgetSize`

Get the system default shortcut card size for developers to layout the widget.

### `@zos/ui.getId`

Get the unique ID of the widget.

### `@zos/ui.getImageInfo`

Get information about the image resources in the `/assets` resource directory.

### `@zos/ui.getProperty`

Get the UI widget properties, use `widget.getProperty(prop.MORE, {})` to get all the properties of the widget.

### `@zos/ui.getRtlLayout`

Query whether the current system language setting is RTL language. Setting the language to Hebrew and Arabic will return `true`.

### `@zos/ui.gettersetter`

Starting from API_LEVEL 4.0, Zepp OS supports direct access and modification of widget properties through getter/setter features, making property read/write operations more concise and intuitive.

### `@zos/ui.getTextLayout`

Calculate the height and width of the target text after the layout is completed, and does not actually render it, only performs the layout calculation. Can be used to calculate the height of a multi-line text layout with a fixed width, or the width of a single-line text layout.

### `@zos/ui.getType`

Get the UI widget type.

### `@zos/ui.GRADIENT_POLYLINE`

Draws polylines that can be done on a line graph with multiple segments.

### `@zos/ui.GROUP`

GROUP group widget is used to group a series of widgets together for unified widget of show/hide, registering events, etc. The returned `group` instance has the method `createWidget`, which is used to Create UI widget belonging to the `group` group, and the sub-widgets need to use relative positions for layout. 1. The `group` instance of `createWidget` cannot create child `GROUP` components, i.e. `GROUP` components cannot be nested. 2. GROUP cannot be used in [SecondaryWidget](../../../newAPI/global/SecondaryWidget.mdx) and [Shorcut cards](../../../newAPI/global/AppWidget.mdx)

### `@zos/ui.HISTOGRAM`

Draws a histogram.

### `@zos/ui.IMG`

The image widget is used to display images and supports image rotation. 1. Recommend using 24-bit or 32-bit png format images with RGB or RGBA color scheme.

### `@zos/ui.IMG_ANIM`

Play the pre-given image at the set frame rate to create an animation effect.

### `@zos/ui.keyboard`

The keyboard API provides rich input interface capabilities, greatly simplifying the development complexity of custom keyboards.

### `@zos/ui.openInspector`

During development, especially when using Flex layout, you may need to check the actual layout position and size of each widget. Using `openInspector()` can visually display the boundaries of all widgets participating in layout in the simulator, helping developers debug layout issues. Used in the simulator to draw boundary rectangles for all widgets participating in layout, helping developers debug layout issues. This method should be called after the `build()` lifecycle.

### `@zos/ui.PAGE_INDICATOR`

When a page is set to Swiper scroll mode using the `@zos/page setScrollMode` method, an indicator control is created on the page to indicate the total number of pages and to indicate which page is currently stopped.

### `@zos/ui.PAGE_SCROLLBAR`

Page Scrollbar.

### `@zos/ui.PICK_DATE`

After API_LEVEL 3.6, please use the [`TIME_PICKER`](./TIME_PICKER.mdx) widget. Time picker widget, providing user choice

### `@zos/ui.PICKER`

An universal selector, use to text and number list selection

### `@zos/ui.QRCODE`

The QRCODE widget consists of a QR code and a background (white).

### `@zos/ui.RADIO_GROUP`

Used to select a single option among multiple options. Each individual option is a `STATE_BUTTON` widget that needs to be created separately.

### `@zos/ui.redraw`

In some boundary cases, after `deleteWidget`, the view may not be updated in time, need to call `redraw()` manually to update the view

### `@zos/ui.relayoutRtl`

Apply RTL layout to the widget based on the current system language. After calling this method, the current system language will be queried. If it is an RTL language, RTL layout adjustments will be made to all widgets on the current calling page. If there are widgets on the current page that do not need to be flipped, you need to organize the calling timing of `relayoutRtl()` and widget creation Design specification reference [Design Specifications - Internationalization - Interface layouts](../../../../designs/internationalization/interface-layouts.md)

### `@zos/ui.removeEventListener`

Remove event listeners registered by the UI widget using the `widget.addEventListener` method.

### `@zos/ui.removeLayoutChild`

Removes the specified child node from the current node.

### `@zos/ui.SCROLL_LIST`

Create a list area with sliding support, where each list item can contain images and text, and supports horizontal sliding.

### `@zos/ui.setAlpha`

Set the opacity of the widget. For widgets that do not support the `alpha` property, use `widget.setAlpha` to set opacity.

### `@zos/ui.setAppWidgetSize`

Set the size of the Shortcut cards, currently only height adjustment is supported.

### `@zos/ui.setEnable`

Set whether the widget responds to screen gesture interaction events, the default is to respond. If the widgets are stacked in the Z-axis direction, the widgets above the stack will block events and the widgets below will not receive events such as `CLICK_DOWN` and `CLICK_UP`. If you want the widgets below to receive gesture events, set `widget.setEnable(false)` for the widgets stacked above.

### `@zos/ui.setLayoutParent`

Sets the parent node of the current node.

### `@zos/ui.setProperty`

Set the properties of the UI widget.

### `@zos/ui.setStatusBarVisible`

This interface is only available on square screen devices, set the status bar visible or not. For square screen title bar, refer to [Screen Adaptation](../../../../guides/best-practice/multi-screen-adaption.mdx).

### `@zos/ui.SLIDE_SWITCH`

Used to switch between open and closed states.

### `@zos/ui.SPORT_DATA`

Displaying workout data in the workout extension can display a rich variety of workouts data types.

### `@zos/ui.STROKE_RECT`

The stroked rectangle widget adds a stroke on the basis of the filled rectangle widget.

### `@zos/ui.SYSTEM_KEYBOARD`

Create a system-level input keyboard that supports multiple input modes.

### `@zos/ui.TEXT`

Text widget for displaying text. Support setting text size, color, alignment, font.

### `@zos/ui.TIME_PICKER`

A full-screen widget that supports time and date selection.

### `@zos/ui.updateLayout`

Used to re-render the view after modifying the widget tree.

### `@zos/ui.updateLayoutStyle`

Updates the layout style of a widget node. For detailed `layout` object properties, please refer to [layout property configuration](../../../../guides/framework/device/layout.md#layout-properties).

### `@zos/ui.updateStatusBarTitle`

This interface is only available on square screen devices, set the status bar to display text content. For square screen title bar, refer to [Screen Adaptation](../../../../guides/best-practice/multi-screen-adaption.mdx).

### `@zos/ui.VIEW_CONTAINER`

The `VIEW_CONTAINER` widget container is a very powerful layout widget with the following features. - It is a rectangular layout container that can create child widgets by its instance method - The `z_index` property controls the cascading order of the widget container, allowing for vertical cascading of widgets. And you can create multiple VIEW_CONTAINER widgets in the same page. In Zepp OS v3, you can create up to 7 - The VIEW_CONTAINER widget container itself supports scrolling and can be used as a scrolling container - Used with [`setScrollMode`](../../page/setScrollMode.mdx) Swiper mode to achieve the complex layout in the second GIF (full-screen scrolling, where each screen can also be viewed as a scrollable independent container)

### `@zos/ui.VIRTUAL_CONTAINER`

VIRTUAL_CONTAINER is a special container widget used to implement Flex layout. It serves as the root node of a Flex layout container, and the widgets inside the container will be arranged and rendered according to the rules of Flex layout.

### `@zos/ui.widgetAnimations`

Widget animation can add animation effects to some of the widget's property changes. The above image shows the TEXT widget's `x` and `y` properties changing at the same time, creating a moving animation effect.

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

## Symbols in detail

### `@zos/ui.addEventListener`

Register a listener to the UI widget and the given callback function will be executed when the specified event is triggered.

```ts
(eventId: EventId, callback: (event: Event) => void) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `eventId` | `EventId` | not stated | — | Event type. (e.g., event.MOVE, event.CLICK_DOWN, etc.) |
| `event` | `object` | not stated | — | Event details, refer to different events. |

### `@zos/ui.addLayoutChild`

Adds a child node to the current widget.

```ts
(child: UIWidget, index?: number) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `child` | `UIWidget` | yes | — | Child widget instance to add |
| `index` | `number` | no | — | Insertion position index |

### `@zos/ui.ARC`

Arc widget to display arc progress. Support setting line width, color, start and end angle.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of widgets |
| `y` | `number` | yes | — | The y-coordinate of widgets |
| `w` | `number` | yes | — | The width of widgets |
| `h` | `number` | yes | — | The height of widgets |
| `radius` | `number` | yes | — | Radius |
| `start_angle` | `number` | yes | — | The angle at the beginning of the arc. (0 degrees is the positive three o'clock direction) |
| `end_angle` | `number` | yes | — | The angle at the end of the arc. (0 degrees is the positive three o'clock direction) |
| `line_width` | `number` | yes | — | Width of circular arc. |
| `color` | `number` | yes | — | Color of circular arc. |

### `@zos/ui.BUTTON`

The button widget supports setting images and colors for normal and pressed states.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | The width of the widget. Note: If set to -1, it will prioritize adapting to normal_src size, default is 100 |
| `h` | `number` | yes | — | >= 2 | The height of the widget. Note: If set to -1, it will prioritize adapting to normal_src size, default is 40 |
| `text` | `string` | no | — | >= 2 | Text displayed on the button |
| `color` | `number` | no | — | >= 2 | Text color |
| `text_size` | `number` | no | — | >= 2 | Text font size |
| `normal_color` | `number` | no | — | >= 2 | Background color in normal state, must be set together with press_color to take effect |
| `press_color` | `number` | no | — | >= 2 | Background color when pressed, must be set together with normal_color to take effect |
| `radius` | `number` | no | — | >= 2 | Corner radius when using color as button background |
| `normal_src` | `string` | no | — | >= 2 | Background image in normal state, must be set together with press_src to take effect |
| `press_src` | `string` | no | — | >= 2 | Background image when pressed, must be set together with normal_src to take effect |
| `click_func` | `ClickFunc` | no | — | >= 2 | Button click callback |
| `longpress_func` | `ClickFunc` | no | — | >= 2 | Long press (700ms) button callback |
| `font` | `string` | no | — | >= 3.6 | Font path, refer to [Directory Structure](../../../../../guides/architecture/folder-structure.mdx) |
| `text_w` | `number` | no | — | >= 3.6 | Button text width |

### `@zos/ui.Buzzer`

Buzzer

### `@zos/ui.CANVAS`

Canvas Current Canvas capabilities include 1. Basic drawing, line, point, rectangle, rectangle fill, ellipse, sector, polygon 1. Image drawing 1. Text drawing 1. Paint 1. The canvas is stacked vertically, up to three layers can be stacked 1. Clean up the canvas 1. Support `addEventListener` method to listen for user interaction events

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | Canvas x coordinates |
| `y` | `number` | yes | — | Canvas y coordinates |
| `w` | `number` | yes | — | Canvas canvas width |
| `h` | `number` | yes | — | Canvas canvas height |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `color` | `number` | yes | — | Color |
| `line_width` | `number` | yes | — | Line Width |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | x coordinates |
| `y` | `number` | yes | — | y coordinates |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x1` | `number` | yes | — | Start point x coordinates |
| `y1` | `number` | yes | — | Start point y coordinates |
| `x2` | `number` | yes | — | End point x coordinates |
| `y2` | `number` | yes | — | End point y coordinates |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x1` | `number` | yes | — | Start point x coordinates |
| `y1` | `number` | yes | — | Start point y coordinates |
| `x2` | `number` | yes | — | End point x coordinates |
| `y2` | `number` | yes | — | End point y coordinates |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Center x coordinates |
| `center_y` | `number` | yes | — | Center y coordinates |
| `radius` | `number` | yes | — | Radius |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Ellipse center x coordinates |
| `center_y` | `number` | yes | — | Ellipse center y-coordinate |
| `radius_x` | `number` | yes | — | x-directional axis radius |
| `radius_y` | `number` | yes | — | y-directional axis radius |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Ellipse center x coordinates |
| `center_y` | `number` | yes | — | Ellipse center y-coordinate |
| `radius_x` | `number` | yes | — | x-directional axis radius |
| `radius_y` | `number` | yes | — | y-directional axis radius |
| `start_angle` | `number` | yes | — | Start angle (0 degrees in the 3 o'clock direction) |
| `end_angle` | `number` | yes | — | Start angle (0 degrees in the 3 o'clock direction) |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data_array` | `Coordinate` | yes | — | An array of coordinates of at least '3' length |
| `color` | `number` | no | — | Color |

**Coordinate**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | x coordinates |
| `y` | `number` | not stated | — | y coordinates |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | Text x Coordinates |
| `y` | `number` | yes | — | Text y Coordinates |
| `text` | `string` | yes | — | Text Content |
| `text_size` | `number` | yes | — | Text Size |
| `color` | `number` | no | — | Color |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | Image x Coordinates |
| `y` | `number` | yes | — | Image y Coordinates |
| `w` | `number` | yes | — | Image width |
| `h` | `number` | yes | — | Image height |
| `image` | `string` | yes | — | Image path |
| `alpha` | `number` | no | — | Transparency [0-255], 0 for full transparency |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | Rectangle x Coordinates |
| `y` | `number` | yes | — | Rectangle y Coordinates |
| `w` | `number` | yes | — | Rectangle area width |
| `h` | `number` | yes | — | Rectangle area height |

### `@zos/ui.CHECKBOX_GROUP`

Used to select multiple options from a set of choices. Each option needs to be created using `STATE_BUTTON`.

**checkboxGroupParam**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | The width of the widget |
| `h` | `number` | yes | — | >= 2 | The height of the widget |
| `select_src` | `string` | yes | — | >= 2 | Image displayed when selected |
| `unselect_src` | `string` | yes | — | >= 2 | Image displayed when unselected |
| `check_func` | `CheckFunc` | no | — | >= 2 | Callback when button state changes |
| `use_color` | `boolean` | no | — | >= 4 | Whether to display widget using colors |

**StateButton**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate relative to radioGroup |
| `y` | `number` | yes | — | >= 2 | The y-coordinate relative to radioGroup |
| `w` | `number` | yes | — | >= 2 | The width of the widget |
| `h` | `number` | yes | — | >= 2 | The height of the widget |
| `select_color` | `number` | no | — | >= 4 | Color when selected |
| `unselect_color` | `number` | no | — | >= 4 | Color when unselected |
| `fill_width` | `number` | no | — | >= 4 | Button color display area width |
| `fill_height` | `number` | no | — | >= 4 | Button color display area height |

**Prop Properties**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prop.INIT` | `object` | not stated | — | — |
| `prop.CHECKED` | `object` | not stated | — | — |
| `prop.UNCHECKED` | `object` | not stated | — | — |

### `@zos/ui.CIRCLE`

Draws a circle with support for color, transparency, and other properties.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Center of circle x. |
| `center_y` | `number` | yes | — | Center of circle y. |
| `radius` | `number` | yes | — | Radius. |
| `color` | `number` | yes | — | Color 16-increment value. |
| `alpha` | `number` | no | — | Transparency.[0-255] 0 for full transparency |

### `@zos/ui.createDialog`

Create a Dialog.

```ts
(option: Option) => result
```

**Option**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | yes | — | The title of the widget. |
| `show` | `boolean` | no | — | Whether to display Dialog immediately after the creation is completed, default false. |
| `click_listener` | `({type: number}) => void` | yes | — | Callback function, type: 0 click to cancel, type: 1 click to confirm. |
| `auto_hide` | `boolean` | no | — | Whether the dialog disappears after clicking the "Confirm" or "Cancel" button, default true. |

### `@zos/ui.createWidget`

Create UI widgets.

```ts
(widgetId: WIDGET_ID, option?: Option) => widget: WIDGET
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `widgetId` | not stated | yes | — | The ID of the widget to be created. (Reference WIDGET_ID) |
| `option` | not stated | no | — | Parameters. |
| `widget` | not stated | not stated | — | The instance of widget. |

### `@zos/ui.CYCLE_IMAGE_TEXT_LIST`

Create a list that can be scrolled in a loop, and each list item can be placed with an image and text.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of widgets. |
| `y` | `number` | yes | — | The y-coordinate of widgets. |
| `w` | `number` | yes | — | The width of widgets. |
| `h` | `number` | yes | — | The height of widgets. |
| `item_image_x` | `number` | yes | — | The x-coordinate of Image.(Relative coordinate) |
| `item_image_y` | `number` | yes | — | The y-coordinate of Image.(Relative coordinate) |
| `item_text_x` | `number` | yes | — | The x-coordinate of text.(Relative coordinate) |
| `item_text_y` | `number` | yes | — | The y-coordinate of text.(Relative coordinate) |
| `item_text_size` | `number` | yes | — | Font Size. |
| `item_text_color` | `number` | yes | — | Font color. |
| `item_bg_color` | `number` | yes | — | Background color. |
| `item_height` | `number` | yes | — | The height of item. |
| `data_array` | `Array<Data>` | yes | — | Data arrays. |
| `data_size` | `number` | yes | — | The length of the array. |
| `item_text_align_h` | `number` | no | — | Text horizontal orientation.Unfilled default horizontal centering. |
| `item_text_align_v` | `number` | no | — | Vertical orientation of text.Unfilled defaults to vertical centering. |
| `item_text_height` | `number` | no | — | Actual display area of text.Default to item_height if not filled. |
| `item_text_width` | `number` | no | — | The actual text display area.Default to the widget display width if not filled. |
| `item_image_x` | `number` | no | — | item Image x-coordinate, relative coordinates |
| `item_image_y` | `number` | no | — | item Image y-coordinate, relative coordinates |
| `item_click_func` | `ItemClickFunc` | no | — | Callback for item click. |
| `item_focus_change_func` | `ItemFocusChangeFunc` | no | — | Item focus state callback. |

**Data**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` | no | — | The path of image. |
| `text` | `string` | yes | — | The content of text. |

**ItemClickFunc: function**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `cycleList` | `object` | not stated | — | — |
| `index` | `number` | not stated | — | — |

**Set the properties of a single item text**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | yes | — | The index of item.Starting from 0. |
| `item_text_color` | `number` | no | — | The color of the text. |
| `item_text_size` | `number` | no | — | The size of the text. |

**Set the top item index of the list**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | yes | — | The index of item.Starting from 0. |

### `@zos/ui.CYCLE_LIST`

Create a list that scrolls in a loop, which can be populated with images.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `item_bg_color` | `number` | yes | — | Background color. |
| `item_height` | `number` | yes | — | The height of item. |
| `x` | `number` | yes | — | The x-coordinate of widgets. |
| `y` | `number` | yes | — | The y-coordinate of widgets. |
| `w` | `number` | yes | — | The width of widgets. |
| `h` | `number` | yes | — | The height of widgets. |
| `data_array` | `Array<Data>` | yes | — | Data arrays. |
| `data_size` | `number` | yes | — | The length of the array. |
| `item_click_func` | `ItemClickFunc` | no | — | Callback for item click. |
| `item_focus_change_func` | `ItemFocusChangeFunc` | no | — | Item focus state callback. |

**ItemClickFunc: function**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `cycleList` | `object` | not stated | — | — |
| `index` | `number` | not stated | — | — |

### `@zos/ui.deleteWidget`

Delete the UI widget.

```ts
(widget: WIDGET) => void
```

### `@zos/ui.DIALOG`

This widget has been discontinued. It is recommended to replace it with the more powerful [@zos/interaction createModal API](../../interaction/createModal.mdx) Dialog popup consists of a piece of text and two buttons. The popup box disappears when the buttons are clicked.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | `string` | yes | — | Contents of dialog. |
| `content_text_size` | `number` | no | — | The text size of the dialog content. |
| `content_text_color` | `number` | no | — | The text color of the dialog content. |
| `content_bg_color` | `number` | no | — | The background color of the dialog content. |
| `content_text_align_h` | `string` | no | — | Alignment of dialog content text.(horizontal axis) |
| `content_text_align_v` | `string` | no | — | Alignment of dialog content text.(vertical axis) |
| `ok_text` | `string` | no | — | Text on the confirmed button. |
| `ok_text_color` | `number` | no | — | The color of the text on the confirmed button. |
| `ok_press_color` | `number` | no | — | The color when the confirmed button is pressed. |
| `ok_nomal_color` | `number` | no | — | The color when the confirmed button is normal. |
| `ok_press_src` | `string` | no | — | Background image when the confirmed button is pressed. |
| `ok_nomal_src` | `string` | no | — | Background image when the confirmed button is normal. |
| `cancel_text` | `string` | no | — | Text on the canceled button. |
| `cancel_text_color` | `number` | no | — | The color of the text on the canceled button. |
| `cancel_press_color` | `number` | no | — | The color when the canceled button is pressed. |
| `cancel_nomal_color` | `number` | no | — | The color when the canceled button is normal. |
| `cancel_press_src` | `string` | no | — | Background image when the canceled button is pressed. |
| `cancel_nomal_src` | `string` | no | — | Background image when the canceled button is normal. |
| `dialog_align_h` | `number` | no | — | The horizontal axis of the dialog. |
| `dialog_align_v` | `number` | no | — | The vertical axis of the dialog. |
| `ok_func` | `(dialog: Dialog) => void` | no | — | Click the callback of the confirmed button. |
| `cancel_func` | `(dialog: Dialog) => void` | no | — | Click the callback of the canceled button. |

**Dialog**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | `string` | not stated | — | The content of dialog. |
| `... omitted` | not stated | not stated | — | Refer to dialog related properties in the setting field |

**prop Properties**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prop.SHOW` | `boolean` | not stated | — | — |

### `@zos/ui.FILL_RECT`

The Fill Rectangle widget is used to draw a solid color rectangular area.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | The width of the widget |
| `h` | `number` | yes | — | >= 2 | The height of the widget |
| `color` | `number` | yes | — | >= 2 | The color of the widget |
| `radius` | `number` | no | — | >= 2 | The corner radius of the rectangle |
| `angle` | `number` | no | — | >= 2 | The rotation angle |
| `alpha` | `number` | no | — | >= 3 | Opacity, value range 0-255, default 255 (opaque), 0 (transparent) |
| `pos_x` | `number` | no | — | >= 4 | Drawing area x offset (only works when angle%360!=0) |
| `pos_y` | `number` | no | — | >= 4 | Drawing area y offset (only works when angle%360!=0) |
| `rect_width` | `number` | no | — | >= 4 | Width of the drawing area (only works when angle%360!=0) |
| `rect_height` | `number` | no | — | >= 4 | Height of the drawing area (only works when angle%360!=0) |

### `@zos/ui.getAppWidgetSize`

Get the system default shortcut card size for developers to layout the widget.

```ts
() => result
```

**result**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `w` | `number` | not stated | — | Shortcut card width |
| `h` | `number` | not stated | — | shortcut card height |
| `margin` | `number` | not stated | — | Margin of the shortcut card from the edge of the screen |
| `radius` | `number` | not stated | — | Quick Card Rounded Corners |

### `@zos/ui.getId`

Get the unique ID of the widget.

```ts
() => result
```

### `@zos/ui.getImageInfo`

Get information about the image resources in the `/assets` resource directory.

```ts
(img_path: string) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `img_path` | `string` | yes | — | The path to the image file, relative to the /assets resource directory |

**result**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `width` | `number` | not stated | — | Image width value |
| `height` | `number` | not stated | — | Image height value |

### `@zos/ui.getProperty`

Get the UI widget properties, use `widget.getProperty(prop.MORE, {})` to get all the properties of the widget.

```ts
(key: any) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `any` | not stated | — | The value of property. |

### `@zos/ui.getRtlLayout`

Query whether the current system language setting is RTL language. Setting the language to Hebrew and Arabic will return `true`.

```ts
() => result
```

### `@zos/ui.gettersetter`

Starting from API_LEVEL 4.0, Zepp OS supports direct access and modification of widget properties through getter/setter features, making property read/write operations more concise and intuitive.

### `@zos/ui.getTextLayout`

Calculate the height and width of the target text after the layout is completed, and does not actually render it, only performs the layout calculation. Can be used to calculate the height of a multi-line text layout with a fixed width, or the width of a single-line text layout.

```ts
(text: string, options: object) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | `string` | yes | — | Text content of the layout to be calculated |
| `options` | `Options` | yes | — | Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `text_size` | `number` | yes | — | >= 2 | Text size |
| `text_width` | `number` | yes | — | >= 2 | Width of a single line of text |
| `wrapped` | `number` | no | — | >= 2 | whether the text is line feed, 0: no line feed; 1: line feed |
| `rows_max` | `number` | no | — | >= 3 | Limit the maximum number of lines (when the given text exceeds the maximum number of lines, it will be truncated and followed by an ellipsis). The default value is 0, which means there is no limit |

**result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `width` | `number` | not stated | — | >= 2 | Width pixel value |
| `height` | `number` | not stated | — | >= 2 | Height pixel value |
| `rows` | `number` | not stated | — | >= 2 | The text displays the number of lines. When the wrapped field is false, the value of rows is 1. |
| `result` | `number` | not stated | — | >= 2 | Calculation result, -1 - error, 0 - success, 1 - success, characters truncated and ellipses added |
| `text` | `string` | not stated | — | >= 2 | When the calculation is successful, the truncated and ellipsed text content is returned, which can be used for the display of actual UI widgets |

### `@zos/ui.getType`

Get the UI widget type.

```ts
() => result
```

### `@zos/ui.GRADIENT_POLYLINE`

Draws polylines that can be done on a line graph with multiple segments.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of widget. |
| `y` | `number` | yes | — | The y-coordinate of widget. |
| `w` | `number` | yes | — | The width of widget. |
| `h` | `number` | yes | — | Widget height, the maximum height on a circular screen with a screen height of 480 and a square device with a screen height of 390 is 150, and the maximum height of other models is scaled proportionally according to the screen height. |
| `line_color` | `number` | no | — | Line color, default 0xe60039 |
| `line_width` | `number` | no | — | Line width, default 2 px |

**Option**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `Array<AxisItem>` | not stated | — | Coordinate arrays |
| `count` | `number` | not stated | — | Coordinate array length |
| `color_from` | `number` | not stated | — | Initial fill gradient color |
| `color_to` | `number` | not stated | — | End fill gradient color |
| `curve_style` | `boolean` | not stated | — | Whether to use interpolation, smoothing curve effect |

**AxisItem**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | Horizontal coordinates, relative coordinates, distance from the left side of the widget |
| `y` | `number` | not stated | — | Vertical coordinates, relative coordinates, distance from the bottom of the widget |

### `@zos/ui.GROUP`

GROUP group widget is used to group a series of widgets together for unified widget of show/hide, registering events, etc. The returned `group` instance has the method `createWidget`, which is used to Create UI widget belonging to the `group` group, and the sub-widgets need to use relative positions for layout. 1. The `group` instance of `createWidget` cannot create child `GROUP` components, i.e. `GROUP` components cannot be nested. 2. GROUP cannot be used in [SecondaryWidget](../../../newAPI/global/SecondaryWidget.mdx) and [Shorcut cards](../../../newAPI/global/AppWidget.mdx)

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of widget. |
| `y` | `number` | yes | — | The y-coordinate of widget. |
| `w` | `number` | yes | — | The width of widget. |
| `h` | `number` | yes | — | The height of the widget. |

### `@zos/ui.HISTOGRAM`

Draws a histogram.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of widget. |
| `y` | `number` | yes | — | The y-coordinate of widget. |
| `w` | `number` | yes | — | The width of widget. |
| `h` | `number` | yes | — | The height of the widget. |
| `item_width` | `number` | yes | — | Width of column. |
| `item_space` | `number` | yes | — | Space of column. |
| `item_radius` | `number` | yes | — | Radius of column. |
| `item_start_y` | `number` | no | — | The starting Y point of the column, relative coordinate, default is 0 if not filled. |
| `item_max_height` | `number` | no | — | Maximum height of column.If unfilled,default is widget height. |
| `item_color` | `number` | yes | — | Column color. In API_LEVEL 3.5, supports passing an array Array<number> to specify the color of each column |
| `item_alpha` | `number` | no | — | Column color transparency. In API_LEVEL 3.5, supports passing an array Array<number> to specify the transparency of each column |
| `data_min_value` | `number` | yes | — | Minimum value of the column.Used to calculate the actual height of the column. |
| `data_max_value` | `number` | yes | — | Maximum value of the column.Used to calculate the actual height of the column. |
| `data_array` | `Array<number>` | yes | — | Data array of columns. |
| `data_count` | `number` | yes | — | Length of data. |
| `xline` | `XLine` | yes | — | Configuration objects for the x-axis. |
| `xText` | `XText` | yes | — | Configuration object for x-axis text. |
| `yline` | `YLine` | yes | — | Configuration objects for the y-axis. |
| `yText` | `YText` | yes | — | Configuration object for y-axis text. |

**XLine**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `pading` | `number` | yes | — | Margin of dividing line based on x-axis. |
| `space` | `number` | yes | — | The interval of the dividing line. |
| `start` | `number` | yes | — | The y-axis coordinates of the start of the divider. |
| `end` | `number` | yes | — | The y-axis coordinate of the end of the divider end-start is the width of the divider. |
| `width` | `number` | yes | — | The width of the line. |
| `count` | `number` | yes | — | The number of dividers. |
| `color` | `number` | yes | — | The color of the dividing line. |

**YLine**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `pading` | `number` | yes | — | Margin of dividing line based on y-axis. |
| `space` | `number` | yes | — | The interval of the dividing line. |
| `start` | `number` | yes | — | The x-axis coordinates of the start of the divider. |
| `end` | `number` | yes | — | The x-axis coordinate of the end of the divider end-start is the width of the divider. |
| `width` | `number` | yes | — | The width of the line. |
| `count` | `number` | yes | — | The number of dividers. |
| `color` | `number` | yes | — | The color of the dividing line. |

**XText**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The initial x-coordinate of the text. |
| `y` | `number` | yes | — | The initial y-coordinate of the text. |
| `w` | `number` | yes | — | The width of the text. |
| `h` | `number` | yes | — | The height of the text. |
| `space` | `number` | yes | — | The spacing of the text.The x-coordinate of the nth text = x + (w + space)\*(n - 1). |
| `color` | `number` | yes | — | The color of the text |
| `data_array` | `Array<string>` | yes | — | The array of text. |
| `count` | `number` | yes | — | The length of the array. |

**yText**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The initial x-coordinate of the text. |
| `y` | `number` | yes | — | The initial y-coordinate of the text. |
| `w` | `number` | yes | — | The width of the text. |
| `h` | `number` | yes | — | The height of the text. |
| `space` | `number` | yes | — | The spacing of the text.The x-coordinate of the nth text = y + (h + space)\*(n - 1). |
| `color` | `number` | yes | — | The color of the text |
| `data_array` | `Array<string>` | yes | — | The array of text. |
| `count` | `number` | yes | — | The length of the array. |

### `@zos/ui.IMG`

The image widget is used to display images and supports image rotation. 1. Recommend using 24-bit or 32-bit png format images with RGB or RGBA color scheme.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` | yes | — | The path of the image. Reference [folder-structure structure](../../../../../guides/architecture/folder-structure.mdx) |
| `w` | `number` | no | — | The width of the widget.If not passed then set the width of the image itself |
| `h` | `number` | no | — | The height of the widget.If not passed then set the height of the image itself |
| `x` | `number` | yes | — | The x-axis coordinate of the widget. |
| `y` | `number` | yes | — | The y-axis coordinate of the widget. |
| `pos_x` | `number` | no | — | Relative coordinates.Horizontal offset of the image relative to the widget coordinates. |
| `pos_y` | `number` | no | — | Relative coordinates.Vertical offset of the image relative to the widget coordinates. |
| `angle` | `number` | no | — | The rotation angle of the picture (the 12-point direction is 0 degrees). |
| `center_x` | `number` | no | — | The rotation center of the picture. |
| `center_y` | `number` | no | — | The rotation center of the picture. |
| `alpha` | `number` | no | — | Transparency, 0 - 255, default value is 255 for opaque, 0 for full transparency |
| `auto_scale` | `boolean` | no | — | Whether the image scales with the widget width and height, the default image area size is the size of the resource file itself |
| `auto_scale_obj_fit` | `boolean` | no | — | This field takes effect only when auto_scale is true, indicating whether the image fills the entire widget area (without maintaining the image aspect ratio) |

### `@zos/ui.IMG_ANIM`

Play the pre-given image at the set frame rate to create an animation effect.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of animation. |
| `y` | `number` | yes | — | The y-coordinate of animation. |
| `anim_path` | `string` | yes | — | The path to the image for animation. |
| `anim_prefix` | `string` | yes | — | The name to the image for animation. |
| `anim_ext` | `string` | yes | — | Image extensions. |
| `anim_fps` | `number` | yes | — | Number of frames of animation. |
| `repeat_count` | `number` | yes | — | Number of animation repetitions, can be set 0: infinite repetition, 1: single repetition. |
| `anim_repeat` | `boolean` | no | — | Whether to repeat the playback; this value is true if repeat_count is 0. |
| `anim_size` | `number` | yes | — | The number of images. |
| `anim_status` | `number` | yes | — | The status of animation; Reference anim_status |
| `anim_complete_call` | `function` | no | — | This function is callback when the animation is executed successfully. repeat_count is invalid if 0. Parameters anim is an instance to create the animation. |
| `step` | `number` | no | — | Frame animation step size, more than '1' will jump frame |

### `@zos/ui.keyboard`

The keyboard API provides rich input interface capabilities, greatly simplifying the development complexity of custom keyboards.

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `rect` | `object` | yes | — | Object containing x, y, w, h properties |

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | `string` | yes | — | Text to be inserted |

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `count` | `number` | no | `1` | Number of characters to delete |

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `keyType` | `number` | yes | — | Key type constant |

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | `string` | yes | — | Buffer text |
| `color` | `number` | no | `0xffffff` | Text color |
| `underlineColor` | `number` | no | `0xffffff` | Underline color |

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `inputType` | `number` | yes | — | Input type constant |

### `@zos/ui.KEYBOARD`

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | no | — | X position, default value is 0 |
| `y` | `number` | no | — | Y position, default value is 0 |
| `click_func` | `ClickFunc` | yes | — | Callback function when Key clicked |
| `key_attr` | `Array<KeyAttr>` | no | — | Key attributes, if no key attribute is passed in, the default configuration of numeric keyboard is used |

**KeyAttr**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `number` | no | — | Key id |
| `x` | `number` | yes | — | X position of key |
| `y` | `number` | yes | — | Y position of key |
| `text` | `string` | no | — | Key text, Only single ASCII characters are supported |
| `image` | `string` | no | — | Key image path, recommended image size is 64 x 64 px |
| `value` | `number` | no | — | Key value |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `number` | no | — | Key id |

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | X position of text |
| `w` | `number` | yes | — | Text width |
| `align_h` | `number` | no | — | The alignment of the horizontal axis, alignment refer to TEXT |
| `alpha` | `number` | no | — | Text alpha value [0-255], 0 for full transparency |
| `color` | `number` | no | — | Text color |
| `show` | `boolean` | no | — | Text showon |

### `@zos/ui.openInspector`

During development, especially when using Flex layout, you may need to check the actual layout position and size of each widget. Using `openInspector()` can visually display the boundaries of all widgets participating in layout in the simulator, helping developers debug layout issues. Used in the simulator to draw boundary rectangles for all widgets participating in layout, helping developers debug layout issues. This method should be called after the `build()` lifecycle.

```ts
function openInspector(): Inspector
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `options` | `object` | no | — | Draw options |

**options Object Properties**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `line_color` | `number` | no | — | Border line color, hexadecimal value, e.g., 0xff0000 for red |
| `line_width` | `number` | no | — | Border line width |
| `border_mode` | `number` | no | `0` | Border draw mode, 0 for outward drawing, 1 for inward drawing |

### `@zos/ui.PAGE_INDICATOR`

When a page is set to Swiper scroll mode using the `@zos/page setScrollMode` method, an indicator control is created on the page to indicate the total number of pages and to indicate which page is currently stopped.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2.1 | The x-axis coordinate of the widget. |
| `y` | `number` | yes | — | >= 2.1 | The y-axis coordinate of the widget. |
| `w` | `number` | yes | — | >= 2.1 | The width of the widget. |
| `h` | `number` | yes | — | >= 2.1 | The height of the widget. |
| `align_h` | `ALIGN` | no | — | >= 2.1 | The alignment of the horizontal axis (see ALIGN for values). |
| `h_space` | `number` | no | — | >= 2.1 | Horizontal spacing |
| `v_space` | `number` | no | — | >= 3 | Vertical spacing |
| `select_src` | `string` | yes | — | >= 2.1 | Indicator current page highlight image path, resource storage path reference [Folder Structure](../../../../../guides/architecture/folder-structure.mdx) |
| `unselect_src` | `string` | yes | — | >= 2.1 | Indicator non-current page highlight image path, resource storage path reference [Folder Structure](../../../../../guides/architecture/folder-structure.mdx) |
| `horizontal` | `boolean` | no | — | >= 3 | Horizontal or not, default is true, set false for vertical layout |
| `use_color` | `boolean` | no | — | >= 4 | Whether to use colors to configure indicator dots |
| `select_color` | `number` | no | — | >= 4 | Selected color configuration |
| `unselect_color` | `number` | no | — | >= 4 | Unselected color configuration |
| `element_height` | `number` | no | — | >= 4 | Width of the page indicator element |
| `element_radius` | `number` | no | — | >= 4 | Height of the page indicator element |

### `@zos/ui.PAGE_SCROLLBAR`

Page Scrollbar.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `target` | `object` | no | — | The VIEW_CONTAINER widget that needs to be bound is the whole page scroll bar by default, and the VIEW_CONTAINER scroll bar is passed in |

### `@zos/ui.PICK_DATE`

After API_LEVEL 3.6, please use the [`TIME_PICKER`](./TIME_PICKER.mdx) widget. Time picker widget, providing user choice

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | x-coordinate (x \<= 0 will be centered by default) |
| `y` | `number` | yes | — | y-coordinate |
| `w` | `number` | no | — | Width of the entire widget (width less than 1/2 of the device width will be determined as an exception, set to the default value of 300px) |
| `padding_1` | `number` | no | — | padding between the first and second columns |
| `padding_2` | `number` | no | — | padding between two and three columns |
| `font_size` | `number` | no | — | The size of the text on the widget, default 36 |
| `startYear` | `number` | no | — | Start year |
| `endYear` | `number` | no | — | End year |
| `initYear` | `number` | no | — | Initial year |
| `initMonth` | `number` | no | — | Initial month |
| `initDay` | `number` | no | — | Initial day |
| `initHour` | `number` | no | — | Initial hour |
| `initMin` | `number` | no | — | Initial minute |

**getProperty supported Fields**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `year` | `number` | not stated | — | Year |
| `month` | `number` | not stated | — | Month |
| `day` | `number` | not stated | — | Day |
| `hour` | `number` | not stated | — | Hour |
| `minute` | `number` | not stated | — | Minute |

### `@zos/ui.PICKER`

An universal selector, use to text and number list selection

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `nb_of_columns` | `number` | yes | — | Maximum Picker columns (Maximum number is 5) |
| `data_config` | `Array<DataConfig>` | yes | — | Array of column configuration, refer to DataConfig |
| `title` | `string` | no | — | Title of Picker |
| `subtitle` | `string` | no | — | Subtitle of Picker |
| `done_icon` | `string` | no | — | Resource path of icon about done status |
| `picker_cb` | `CallBack` | no | — | Callback function of Picker |
| `init_col_index` | `number` | no | — | Initialize the index of the focused column |
| `normal_color` | `number` | no | — | Color value of unselected item |
| `select_color` | `number` | no | — | Color value of selected item |

**DataConfig**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data_array` | `Array\<number&#124;string\>` | yes | — | Data array of column |
| `support_loop` | `boolean` | yes | — | support circular drag and drop |
| `unit` | `string` | no | — | Unit |
| `connector` | `string` | no | — | Data separator |
| `font_name` | `string` | no | — | Path of font file, refer to TEXT |
| `font_size` | `number` | no | — | Font size |
| `select_font_size` | `number` | no | — | Font size of selected item |
| `connector_font_size` | `number` | no | — | Font size of separator |
| `unit_font_size` | `number` | no | — | Font size of unit |
| `init_val_index` | `number` | no | — | Default selected index |
| `col_width` | `number` | no | — | Column width, all columns need to be configured |

**CallBack: function**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `picker` | not stated | not stated | — | The Picker instance |
| `event_type` | not stated | not stated | — | Event type of Picker, see EVENT_TYPE |
| `column_index` | not stated | not stated | — | Column index for triggering Picker events |
| `select_index` | not stated | not stated | — | The index of selected item |

### `@zos/ui.QRCODE`

The QRCODE widget consists of a QR code and a background (white).

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `content` | not stated | not stated | — | QR code content |
| `x` | not stated | not stated | — | QR Code x Coordinate |
| `y` | not stated | not stated | — | QR Code y Coordinate |
| `w` | not stated | not stated | — | QR code width |
| `h` | not stated | not stated | — | QR code height |
| `bg_x` | not stated | not stated | — | Background x coordinates |
| `bg_y` | not stated | not stated | — | Background y coordinates |
| `bg_w` | not stated | not stated | — | Background width |
| `bg_h` | not stated | not stated | — | Background height |
| `bg_radius` | not stated | not stated | — | Background area rounding radius |

### `@zos/ui.RADIO_GROUP`

Used to select a single option among multiple options. Each individual option is a `STATE_BUTTON` widget that needs to be created separately.

**radioGroupParam**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | Width of the widget |
| `h` | `number` | yes | — | >= 2 | Height of the widget |
| `select_src` | `string` | yes | — | >= 2 | Image displayed when widget is selected |
| `unselect_src` | `string` | yes | — | >= 2 | Image displayed when widget is unselected |
| `check_func` | `CheckFunc` | no | — | >= 2 | Callback when button state changes |
| `use_color` | `boolean` | no | — | >= 4 | Whether to display widget using colors |

**StateButton**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate relative to radioGroup |
| `y` | `number` | yes | — | >= 2 | The y-coordinate relative to radioGroup |
| `w` | `number` | yes | — | >= 2 | Width of the widget |
| `h` | `number` | yes | — | >= 2 | Height of the widget |
| `select_color` | `number` | no | — | >= 4 | Color when selected |
| `unselect_color` | `number` | no | — | >= 4 | Color when unselected |
| `fill_width` | `number` | no | — | >= 4 | Button color display area width |
| `fill_height` | `number` | no | — | >= 4 | Button color display area height |

**Prop Properties**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prop.INIT` | `object` | not stated | — | — |
| `prop.CHECKED` | `object` | not stated | — | — |
| `prop.UNCHECKED` | `object` | not stated | — | — |

### `@zos/ui.redraw`

In some boundary cases, after `deleteWidget`, the view may not be updated in time, need to call `redraw()` manually to update the view

```ts
() => undefined
```

### `@zos/ui.relayoutRtl`

Apply RTL layout to the widget based on the current system language. After calling this method, the current system language will be queried. If it is an RTL language, RTL layout adjustments will be made to all widgets on the current calling page. If there are widgets on the current page that do not need to be flipped, you need to organize the calling timing of `relayoutRtl()` and widget creation Design specification reference [Design Specifications - Internationalization - Interface layouts](../../../../designs/internationalization/interface-layouts.md)

```ts
() => result
```

### `@zos/ui.removeEventListener`

Remove event listeners registered by the UI widget using the `widget.addEventListener` method.

```ts
(eventId: EventId, callback) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `eventId` | `number` | not stated | — | Event type (e.g., swipe, press, lift, etc.) |
| `callback` | `function` | not stated | — | The callback function to register. |

### `@zos/ui.removeLayoutChild`

Removes the specified child node from the current node.

```ts
(child: UIWidget) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `child` | `UIWidget` | not stated | — | Child widget instance to remove |

### `@zos/ui.SCROLL_LIST`

Create a list area with sliding support, where each list item can contain images and text, and supports horizontal sliding.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | Width of the widget |
| `h` | `number` | yes | — | >= 2 | Height of the widget |
| `item_space` | `number` | no | — | >= 2 | Space between items |
| `item_config` | `Array<ItemConfig>` | yes | — | >= 2 | Item type configuration, see [ItemConfig](#itemconfig-object) |
| `item_config_count` | `number` | yes | — | >= 2 | Length of the item_config array |
| `data_array` | `DataArray` | yes | — | >= 2 | Data array |
| `data_count` | `number` | yes | — | >= 2 | Length of the data array |
| `item_click_func` | `ItemClickFunc` | no | — | >= 2 | Item click callback function, where the item index corresponds to the data_array, see [ItemClickFunc](#itemclickfunc) |
| `data_type_config` | `Array<DataTypeConfig>` | no | — | >= 2 | Item index type configuration array, see [DataTypeConfig](#datatypeconfig-object) |
| `data_type_config_count` | `number` | no | — | >= 2 | Length of the item index type configuration array |
| `on_page` | `number` | no | — | >= 2 | Used when updating data, set to 1 to keep the list at current position after update, otherwise returns to list top |
| `snap_to_center` | `boolean` | no | — | >= 2 | Whether the list should snap to the center height of SCROLL_LIST |
| `item_focus_change_func` | `ItemFocusChangeFunc` | no | — | >= 2 | List sliding focus change callback function, see [ItemFocusChangeFunc](#itemfocuschangefunc) |
| `item_enable_horizon_drag` | `boolean` | no | — | >= 2 | Whether items can be dragged horizontally |
| `item_drag_max_distance` | `number` | no | — | >= 2 | Maximum horizontal drag distance, positive values for left drag, negative for right drag |
| `snap_type` | `number` | no | — | >= 4 | Set snap mode (see snap_type snap mode) |
| `item_common_focus` | `boolean` | no | — | >= 4 | Whether to show common focus (effective in key mode) |
| `item_key_focus_change_func` | `function` | no | — | >= 4 | Key event listener callback in key mode |
| `enable_scroll_bar` | `boolean` | no | — | >= 4 | Create page indicator (arcScrollBar) |
| `view_index` | `number` | no | — | >= 4 | Set list item to visible area (Note: Round screen: center screen, Square screen: top of screen) |

**ItemConfig**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type_id` | `number` | no | — | Current item type ID, optional when item_config_count is 0, required otherwise |
| `item_height` | `number` | yes | — | Item height |
| `item_bg_color` | `number` | yes | — | Item background color |
| `item_bg_radius` | `number` | yes | — | Item background corner radius |
| `text_view` | `Array<TextView>` | no | — | Array of textView structures, each item is a textView, see explanation below |
| `text_view_count` | `number` | no | — | Length of text_view array |
| `image_view` | `Array<ImageView>` | no | — | Array of imageView, each item is an imageView, see explanation below |
| `image_view_count` | `number` | no | — | Length of image_view array |

**TextView**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate, relative coordinate |
| `y` | `number` | yes | — | The y-coordinate, relative coordinate |
| `w` | `number` | yes | — | Widget width |
| `h` | `number` | yes | — | Widget height |
| `color` | `number` | no | — | Text color |
| `text_size` | `number` | no | — | Font size |
| `key` | `string` | yes | — | Data binding key, see examples and data_array description for details |
| `action` | `boolean` | no | — | Whether to respond to click events, after response, the corresponding data key can be captured in item_click_func, default false |

**ImageView**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate, relative coordinate |
| `y` | `number` | yes | — | The y-coordinate, relative coordinate |
| `w` | `number` | yes | — | Widget width |
| `h` | `number` | yes | — | Widget height |
| `key` | `string` | yes | — | Data binding key, see examples and data_array description for details |
| `action` | `boolean` | no | — | Whether to respond to click events, after response, the corresponding data key can be captured in item_click_func, default false |

**DataTypeConfig**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | yes | — | Starting index |
| `end` | `number` | yes | — | Ending index |
| `type_id` | `number` | yes | — | The type_id corresponding to the type configuration in item_config |

### `@zos/ui.setAlpha`

Set the opacity of the widget. For widgets that do not support the `alpha` property, use `widget.setAlpha` to set opacity.

```ts
(val: any) => void
```

### `@zos/ui.setAppWidgetSize`

Set the size of the Shortcut cards, currently only height adjustment is supported.

```ts
(option: Option) => undefined
```

**Option**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `h` | `number` | yes | — | Shortcut card height |

### `@zos/ui.setEnable`

Set whether the widget responds to screen gesture interaction events, the default is to respond. If the widgets are stacked in the Z-axis direction, the widgets above the stack will block events and the widgets below will not receive events such as `CLICK_DOWN` and `CLICK_UP`. If you want the widgets below to receive gesture events, set `widget.setEnable(false)` for the widgets stacked above.

```ts
(response: boolean) => void
```

### `@zos/ui.setLayoutParent`

Sets the parent node of the current node.

```ts
(parent: UIWidget) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `parent` | `UIWidget` | not stated | — | Widget instance object participating in layout |

### `@zos/ui.setProperty`

Set the properties of the UI widget.

```ts
(propertyId: string, val: any) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `propertyId` | `PropertyId` | not stated | — | The property of ID. |
| `val` | `any` | not stated | — | Set the value. (when property is prop.MORE, val is used in the same way as createWidget's option, which can set multiple parameters.) |

**PropertyId**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | not stated | — | The x-axis coordinate of the widget. |
| `y` | `number` | not stated | — | The y-axis coordinate of the widget. |
| `w` | `number` | not stated | — | The width of the widget. |
| `h` | `number` | not stated | — | The height of the widget. |
| `VISIBLE` | `boolean` | not stated | — | Whether the widget is visible or not, true is visible, false is not, this property does not support setProperty(prop.MORE, {}), only setProperty sets the VISIBLE property alone |
| `DATASET` | `any` | not stated | — | Developer-defined properties of the widget, obtained via widget.getProperty(prop.DATASET) |

### `@zos/ui.setStatusBarVisible`

This interface is only available on square screen devices, set the status bar visible or not. For square screen title bar, refer to [Screen Adaptation](../../../../guides/best-practice/multi-screen-adaption.mdx).

```ts
(visible: boolean) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `visible` | `boolean` | not stated | — | true: show the status bar; false: hide the status bar |

### `@zos/ui.SLIDE_SWITCH`

Used to switch between open and closed states.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-axis coordinate of the widget. |
| `y` | `number` | yes | — | The y-axis coordinate of the widget. |
| `w` | `number` | yes | — | The width of the widget. |
| `h` | `number` | yes | — | The height of the widget. |
| `select_bg` | `string` | yes | — | The selected background. |
| `un_select_bg` | `string` | yes | — | Unselected background. |
| `slide_src` | `string` | yes | — | Switch button. |
| `slide_select_x` | `number` | yes | — | Relative coordinates.The selected state of the switch button. |
| `slide_un_select_x` | `number` | yes | — | Relative coordinates.The unselected state of the switch button. |
| `slide_y` | `number` | no | — | Relative coordinates.The y-axis offset of the switch button. |
| `checked_change_func` | `CheckedChangeFunc` | no | — | Callback on state change. |
| `checked` | `boolean` | no | — | Default switch state. |

**Prop Properties**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prop.CHECKED` | not stated | not stated | — | Set switch state.Get switch state |

### `@zos/ui.SPORT_DATA`

Displaying workout data in the workout extension can display a rich variety of workouts data types.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | Widget x coordinate |
| `y` | `number` | yes | — | Widget y coordinate |
| `w` | `number` | yes | — | Widget display width |
| `h` | `number` | yes | — | Widget display height |
| `edit_id` | `number` | yes | — | Widget ID, ensuring uniqueness of each instance |
| `category` | `number` | yes | — | Data type, currently only supports edit_widget_group_type.SPORTS |
| `default_type` | `number` | yes | — | Displayed data items, see supported data items below |
| `text_size` | `number` | no | — | Text font size, default 36 px |
| `text_color` | `number` | no | — | Text color, default 0x0000FF |
| `sub_text_visible` | `boolean` | no | — | Whether to display subtext, default is false |
| `sub_text_size` | `number` | no | — | Subtext font size, default 36 px |
| `sub_text_color` | `number` | no | — | Subtext color, default 0x0000FF |
| `rect_visible` | `boolean` | no | — | Whether to display the text box, default is false |
| `line_color` | `number` | no | — | Text box color, default 0x0000FF |
| `text_x` | `number` | no | — | Relative coordinates.Text box displays location x coordinates |
| `text_y` | `number` | no | — | Relative coordinates.Text box displays position y coordinates |
| `text_w` | `number` | no | — | Text box width |
| `text_h` | `number` | no | — | Text box height |
| `sub_text_x` | `number` | no | — | Relative coordinates.Subtext box displays position x coordinates |
| `sub_text_y` | `number` | no | — | Relative coordinates.Subtext box displays position y coordinates |
| `sub_text_w` | `number` | no | — | Secondary text box width |
| `sub_text_h` | `number` | no | — | Secondary text box height |
| `mock_data` | `string` | no | — | The simulated data only takes effect in the emulator, and the data items of the widget will display the incoming string |

### `@zos/ui.STROKE_RECT`

The stroked rectangle widget adds a stroke on the basis of the filled rectangle widget.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | >= 2 | The x-axis coordinate of the widget |
| `y` | `number` | yes | — | >= 2 | The y-axis coordinate of the widget |
| `w` | `number` | yes | — | >= 2 | The width of the widget |
| `h` | `number` | yes | — | >= 2 | The height of the widget |
| `color` | `number` | yes | — | >= 2 | The widget's color |
| `radius` | `number` | no | — | >= 2 | The rectangle's rounded corners |
| `line_width` | `number` | no | — | >= 2 | The width of stroke |
| `angle` | `number` | no | — | >= 2 | Rotation angle |
| `pos_x` | `number` | no | — | >= 4 | Drawing area x offset (only effective when angle%360!=0) |
| `pos_y` | `number` | no | — | >= 4 | Drawing area y offset (only effective when angle%360!=0) |
| `rect_width` | `number` | no | — | >= 4 | Width of the drawing area (only effective when angle%360!=0) |
| `rect_height` | `number` | no | — | >= 4 | Height of the drawing area (only effective when angle%360!=0) |

### `@zos/ui.SYSTEM_KEYBOARD`

Create a system-level input keyboard that supports multiple input modes.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `inputType` | `number` | yes | — | Input type, refer to inputType enum |
| `onComplete` | `function` | yes | — | Callback when user confirms input |
| `onCancel` | `function` | yes | — | Callback when user swipes right or presses back button |
| `text` | `string` | no | — | Initial text for editing |
| `onClick` | `function` | no | — | Click event callback (Not available yet) |
| `selection` | `array` | no | — | Quick reply options (Not available yet) |

### `@zos/ui.TEXT`

Text widget for displaying text. Support setting text size, color, alignment, font.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-axis coordinate of the widget |
| `y` | `number` | yes | — | The y-axis coordinate of the widget |
| `w` | `number` | yes | — | The width of the widget |
| `h` | `number` | yes | — | The height of the widget |
| `color` | `number` | no | — | The color of the text |
| `align_h` | `ALIGN` | no | — | The alignment of the horizontal axis (see ALIGN for values) |
| `align_v` | `ALIGN` | no | — | Alignment of the vertical axis (see ALIGN for values) |
| `text` | `string` | no | — | Text |
| `text_size` | `number` | no | — | The size of the font |
| `text_style` | `TEXT_STYLE` | no | — | Text overlength handling, default is scrolling text (see TEXT_STYLE for values) |
| `line_space` | `number` | no | — | Row spacing |
| `char_space` | `number` | no | — | Character spacing |
| `font` | `string` | no | — | Font path, resource storage path reference [Folder Structure](../../../../../guides/architecture/folder-structure.mdx) |
| `text_i18n` | `object` | no | — | Multi-language text support, refer to the code example, where the 'en-US' field is required. When the current country language is not configured, the value of 'en-US' will be used. When passed in this way, the text attribute is disabled |
| `start_angle` | `number` | no | — | Arc layout starting angle |
| `end_angle` | `number` | no | — | Arc layout ending angle (start_angle < end_angle) |
| `mode` | `number` | no | — | Arc layout mode, default 0<br/>0: inner<br/>1: outer |
| `radius` | `number` | no | — | Controls the arc layout radius, defaults to half of the widget's width and height |

### `@zos/ui.TIME_PICKER`

A full-screen widget that supports time and date selection.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | `number` | yes | — | Selector type, 0 time, 1 date |
| `style` | `number` | yes | — | Value must be 1 |
| `title` | `string` | no | — | Title of selector |
| `done_icon` | `string` | no | — | Image path of done icon |
| `font_size` | `number` | yes | — | Font size setting |
| `select_font_size` | `number` | yes | — | Font size setting for selected item |
| `initHour` | `number` | no | — | Initial hour, default is 12 |
| `initMin` | `number` | no | — | Initial minute, default is 0 |
| `startYear` | `number` | no | — | Start year, default is 1970 |
| `endYear` | `number` | no | — | End year, default is 2100 |
| `initYear` | `number` | no | — | Initial year, default is 2020 |
| `initMonth` | `number` | no | — | Initial month, default is 1 |
| `initDay` | `number` | no | — | Initial day, default is 1 |
| `picker_cb` | `CallBack` | no | — | Callback function of picker |

**CallBack: function**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `picker` | not stated | not stated | — | The time/date picker widget instance |
| `event_type` | not stated | not stated | — | Event type of picker, see EVENT_TYPE |
| `column` | not stated | not stated | — | Index of current focus column (only valid under UPDATE event type) |
| `value_index` | not stated | not stated | — | Current value of the column (only valid under UPDATE event type) |

### `@zos/ui.updateLayout`

Used to re-render the view after modifying the widget tree.

```ts
() => void
```

### `@zos/ui.updateLayoutStyle`

Updates the layout style of a widget node. For detailed `layout` object properties, please refer to [layout property configuration](../../../../guides/framework/device/layout.md#layout-properties).

```ts
(style: LayoutStyle) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | `LayoutStyle` | not stated | — | Object containing layout properties, the layout object |

### `@zos/ui.updateStatusBarTitle`

This interface is only available on square screen devices, set the status bar to display text content. For square screen title bar, refer to [Screen Adaptation](../../../../guides/best-practice/multi-screen-adaption.mdx).

```ts
(title: string) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | not stated | — | Status bar display text |

### `@zos/ui.VIEW_CONTAINER`

The `VIEW_CONTAINER` widget container is a very powerful layout widget with the following features. - It is a rectangular layout container that can create child widgets by its instance method - The `z_index` property controls the cascading order of the widget container, allowing for vertical cascading of widgets. And you can create multiple VIEW_CONTAINER widgets in the same page. In Zepp OS v3, you can create up to 7 - The VIEW_CONTAINER widget container itself supports scrolling and can be used as a scrolling container - Used with [`setScrollMode`](../../page/setScrollMode.mdx) Swiper mode to achieve the complex layout in the second GIF (full-screen scrolling, where each screen can also be viewed as a scrollable independent container)

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `x` | `number` | no | — | >= 2 | Widget x-coordinate, default 0 |
| `y` | `number` | no | — | >= 2 | Widget y-coordinate, default 0 |
| `w` | `number` | no | — | >= 2 | Widget width, default screen width |
| `h` | `number` | no | — | >= 2 | Widget height, default screen height |
| `scroll_enable` | `number` | no | — | >= 2 | When the layout of widgets in VIEW_CONTAINER exceeds the width/height, it is considered a long page. 0: disable scrolling, you can set container scroll position offset by pos_x or pos_y; 1: allow scrolling (default) |
| `pos_x` | `number` | no | — | >= 2 | When VIEW_CONTAINER is a long horizontal page layout, you can read/set the horizontal offset |
| `pos_y` | `number` | no | — | >= 2 | When VIEW_CONTAINER is a long vertical page layout, you can read/set the vertical offset |
| `z_index` | `number` | no | — | >= 2 | When using multiple VIEW_CONTAINER widgets, the cascading relationship can be controlled by this field, with 0 at the bottom by default |
| `modal` | `number` | no | — | >= 2 | Modal layer switch. 0: disable; 1: enable (default). When enabled, it can be used to create a modal overlay/dialog inside a VIEW_CONTAINER and block the base layer from scrolling. |
| `bounce` | `number` | no | — | >= 3 | Rebound effect, 0: disabled, 1: enabled (default) |
| `page` | `number` | no | — | >= 3 | Used with [setScrollMode](../../page/setScrollMode.mdx) Swiper mode. The entire screen uses Swiper mode, and each independent page is implemented using VIEW_CONTAINER. Marks the page index to coordinate with Swiper mode |

**FrameParams**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 2 | 0: the user is still touching the screen and dragging, 1: the user has let go and is in an inertial scrolling effect |
| `yoffset` | `number` | not stated | — | >= 3 | y-axis offset pixels |

### `@zos/ui.VIRTUAL_CONTAINER`

VIRTUAL_CONTAINER is a special container widget used to implement Flex layout. It serves as the root node of a Flex layout container, and the widgets inside the container will be arranged and rendered according to the rules of Flex layout.

**Param**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `layout` | `object` | yes | — | >= 4 | Layout properties for Flex layout configuration |

### `@zos/ui.widgetAnimations`

Widget animation can add animation effects to some of the widget's property changes. The above image shows the TEXT widget's `x` and `y` properties changing at the same time, creating a moving animation effect.

**Individual property animation configuration**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `anim_prop` | `number` | not stated | — | To add the properties of the animation, refer to [anim_prop](#properties-that-support-animations) |
| `anim_from` | `number` | not stated | — | The value of the property at the start of the animation |
| `anim_to` | `number` | not stated | — | The value of the property at the end of the animation |
| `anim_rate` | `string` | not stated | — | Animation curve, optional values linear, easein, easeout, easeinout, bounce, refer to [https://easings.net/](https://easings.net/) |
| `anim_duration` | `number` | not stated | — | Animation duration, in milliseconds |
| `anim_offset` | `number` | not stated | — | The delay before the animation starts, in milliseconds |

**Animation Configuration**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `anim_steps` | `Array<anim_config>` | not stated | — | >= 2 | Attribute animation configuration array, refer to [anim_config](#individual-property-animation-configuration), multiple sets of animations can be performed simultaneously |
| `anim_fps` | `number` | not stated | — | >= 2 | Animation frame rate, default 25 |
| `anim_auto_start` | `number` | not stated | — | >= 2 | If or not the animation plays automatically, default 1, 0: don't play automatically; 1: play automatically |
| `anim_auto_destroy` | `number` | not stated | — | >= 2 | If or not the animation is automatically destroyed, default 1, 0: not automatically destroyed; 1: automatically destroyed |
| `anim_repeat` | `number` | not stated | — | >= 2 | Animation loop, default 0, -1: infinite loop; 0: play once; or specify the number of times to play directly |
| `anim_frame_func` | `() => void` | not stated | — | >= 2 | Callback function for each frame of animation playback |
| `anim_complete_func` | `() => void` | not stated | — | >= 2 | End of animation callback function |
| `anim_repeat_func` | `() => void` | not stated | — | >= 3.6 | The animation plays the callback function of each loop, which takes effect when anim_repeat is greater than '0' |

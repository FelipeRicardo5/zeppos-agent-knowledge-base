# hmUI.widget

Part of [`hmUI`](hmUI.md).

**22 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `ARC` | constant | not stated | OFFICIAL |
| `ARC_PROGRESS` | constant | not stated | OFFICIAL |
| `BUTTON` | constant | not stated | OFFICIAL |
| `CIRCLE` | constant | not stated | OFFICIAL |
| `DATE_POINTER` | constant | not stated | OFFICIAL |
| `DELEGATE` | constant | not stated | OFFICIAL |
| `FILL_RECT` | constant | not stated | OFFICIAL |
| `GRADKIENT_POLYLINE` | constant | not stated | OFFICIAL |
| `IMG` | constant | not stated | OFFICIAL |
| `IMG_ANIM` | constant | not stated | OFFICIAL |
| `IMG_CLICK` | constant | not stated | OFFICIAL |
| `IMG_DATE` | constant | not stated | OFFICIAL |
| `IMG_LEVEL` | constant | not stated | OFFICIAL |
| `IMG_POINTER` | constant | not stated | OFFICIAL |
| `IMG_PROGRESS` | constant | not stated | OFFICIAL |
| `IMG_STATUS` | constant | not stated | OFFICIAL |
| `IMG_TIME` | constant | not stated | OFFICIAL |
| `IMG_WEEK` | constant | not stated | OFFICIAL |
| `STROKE_RECT` | constant | not stated | OFFICIAL |
| `TEXT` | constant | not stated | OFFICIAL |
| `TEXT_IMG` | constant | not stated | OFFICIAL |
| `TIME_POINTER` | constant | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmUI.widget.ARC`

Arc widget to display arc progress. Support setting line width, color, start and end angle.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of components |
| `y` | `number` | yes | — | The y-coordinate of components |
| `w` | `number` | yes | — | The width of components |
| `h` | `number` | yes | — | The height of components |
| `radius` | `number` | yes | — | Radius |
| `start_angle` | `number` | yes | — | The angle at the beginning of the arc. (0 degrees is the positive three o'clock direction) |
| `end_angle` | `number` | yes | — | The angle at the end of the arc. (0 degrees is the positive three o'clock direction) |
| `line_width` | `number` | yes | — | Width of circular arc. |
| `color` | `number` | yes | — | Color of circular arc. |

### `hmUI.widget.ARC_PROGRESS`

Arc progress widget draws arc progress, supports start angle, line width, end angle, color, progress scale.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Center of circle x |
| `center_y` | `number` | yes | — | Center of circle y |
| `radius` | `number` | yes | — | Radius |
| `start_angle` | `number` | yes | — | The angle at the beginning of the arc. (0 degrees is the positive three o'clock direction) |
| `end_angle` | `number` | yes | — | The angle at the end of the arc. (0 degrees is the positive three o'clock direction) |
| `line_width` | `number` | yes | — | Width of circular arc. |
| `color` | `number` | yes | — | Color of circular arc. |
| `src_bg` | `string` | no | — | Background images. |
| `level` | `number` | no | — | The scale of arc progress. [0-100] |

### `hmUI.widget.BUTTON`

The button widget supports setting images and colors for normal and pressed states.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of components |
| `y` | `number` | yes | — | The y-coordinate of components |
| `w` | `number` | yes | — | The width of components;If set to -1, the size of normal_src is preferred, otherwise the default is 100. |
| `h` | `number` | yes | — | The height of components;If set to -1, the size of normal_src is preferred, otherwise the default is 40. |
| `text` | `string` | yes | — | Text displayed on the button. |
| `color` | `number` | no | — | The color of the text. |
| `text_size` | `number` | no | — | The font size of the text. |
| `press_src` | `string` | no | — | The image of background displayed when pressed. Need to be used with normal_src. |
| `normal_src` | `string` | no | — | Normal state of the background image. Need to be used with press_src. |
| `press_color` | `number` | no | — | The color of background when pressed. Need to be used with normal_color. |
| `normal_color` | `number` | no | — | The color of normal state background. Need to be used with press_color. |
| `radius` | `number` | no | — | Rounded corners when using color as button background. |
| `click_func` | `ClickFunc` | no | — | Callbacks for button clicks. |

### `hmUI.widget.CIRCLE`

Draws a circle with support for color, transparency, and other properties.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `center_x` | `number` | yes | — | Center of circle x. |
| `center_y` | `number` | yes | — | Center of circle y. |
| `radius` | `number` | yes | — | Radius. |
| `color` | `number` | yes | — | Color 16-increment value. |
| `alpha` | `number` | no | — | Transparency.[0-255] 0 for full transparency |

### `hmUI.widget.DATE_POINTER`

| Value           | Description | | --------------- | ----------- | | hmUI.date.MONTH | month       | | hmUI.date.DAY   | day         | | hmUI.date.WEEK  | Day of the week |

### `hmUI.widget.DELEGATE`

> **Note — `INFERRED`, written 2026-09-11.** Not extracted from any
> source: a human judgement about what the sources say, kept here because they
> disagree and none of them can be quoted for it.
>
> Sample code creates this widget as `hmUI.widget.WIDGET_DELEGATE`, not `DELEGATE`. The page title is the shorter name and the code in its own example is the longer one, so the page contradicts itself.

**Watchface Lifecycle**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `resume_call` | not stated | not stated | — | Triggered when Watchface first launches or returns from other screens |
| `pause_call` | not stated | not stated | — | Triggered when sliding to secondary widget, notifications, shortcut cards, entering app list, or launching other apps from Watchface |

### `hmUI.widget.FILL_RECT`

The Fill Rectangle widget is used to draw a solid color rectangular area. :::caution At this stage, if you change the properties of the widget by means of `setProperty(hmUI.prop.MORE, Params)`, you must pass `x`, `y`, `w`, `h` properties, see the sample code for details. :::

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of component. |
| `y` | `number` | yes | — | The y-coordinate of component. |
| `w` | `number` | yes | — | The width of component. |
| `h` | `number` | yes | — | The height of the component. |
| `color` | `number` | yes | — | The color of component. |
| `radius` | `number` | no | — | The radius of component. |
| `angle` | `number` | no | — | The angle of component. |

### `hmUI.widget.IMG`

The image widget is used to display images and supports image rotation. :::tip 1. Recommend using 24-bit or 32-bit png format images with RGB or RGBA color scheme. 2. The parameters of the image widget are recommended to be understood in conjunction with the image example below. :::

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` | yes | — | The path of the image. Reference [folder-structure structure](../../../../guides/architecture/folder-structure.mdx) |
| `w` | `number` | no | — | The width of the component.If not passed then set the width of the image itself |
| `h` | `number` | no | — | The height of the component.If not passed then set the height of the image itself |
| `x` | `number` | yes | — | The x-axis coordinate of the component. |
| `y` | `number` | yes | — | The y-axis coordinate of the component. |
| `pos_x` | `number` | no | — | Horizontal offset of the image relative to the widget coordinates. |
| `pos_y` | `number` | no | — | Vertical offset of the image relative to the widget coordinates. |
| `angle` | `number` | no | — | The rotation angle of the picture (the 12-point direction is 0 degrees). |
| `center_x` | `number` | no | — | The rotation center of the picture. |
| `center_y` | `number` | no | — | The rotation center of the picture. |

### `hmUI.widget.IMG_ANIM`

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
| `anim_status` | `number` | yes | — | The status of animation; Reference hmUI.anim_status |
| `anim_complete_call` | `function` | no | — | This function is callback when the animation is executed successfully. repeat_count is invalid if 0. Parameters anim is an instance to create the animation. |
| `display_on_restart` | `boolean` | no | — | Whether to restart the animation when the dial resume triggers |
| `anim_auto_resume_call` | `boolean` | no | — | When diaplay_on_restart is set to true, this callback function will be called before the animation is played automatically and then replayed |
| `step` | `number` | no | — | Frame animation step, will skip frames when greater than 1. |
| `default_frame_index` | `number` | no | — | Index of displayed sequence frames in power saving mode |

### `hmUI.widget.IMG_LEVEL`

Given an array of pictures, display the corresponding pictures according to the progress (the `level` property).

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-coordinate of component. |
| `y` | `number` | yes | — | The y-coordinate of component. |
| `image_array` | `Array<string>` | yes | — | Array of images. |
| `image_length` | `number` | yes | — | Size of array. |
| `w` | `number` | no | — | The width of the component.(optional) |
| `h` | `number` | no | — | The height of the component.(optional) |
| `level` | `number` | no | — | Picture drawn [0-image_length] |

### `hmUI.widget.IMG_POINTER`

The widget area is full screen. The widget uses a picture to achieve a pointer rotation effect by setting its rotation center and rotation angle. The data progress can be displayed by binding the data type `hmUI.data_type.*`.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` | yes | — | Image path, the name of the file in the /assets directory (relative path) |
| `x` | `number` | yes | — | Pointer to the image's own center of rotation x coordinates |
| `y` | `number` | yes | — | The y-coordinate of the center of rotation of the pointer image itself |
| `center_x` | `number` | yes | — | Widget rotation center x coordinates |
| `center_y` | `number` | yes | — | Widget rotation center y coordinates |
| `angle` | `number` | no | — | Image rotation angle, 0 degrees in 12-point direction |
| `start_angle` | `number` | no | — | Start angle of the rotation range, default 0 |
| `end_angle` | `number` | no | — | End angle of the rotation range, default 360 |
| `type` | `number` | no | — | Binding data type, see [hmUI.data_type](./data_type.mdx) |
| `invalid_visible` | `number` | no | — | When setting type, whether or not to show the pointer if it is invalid data, default true |

### `hmUI.widget.IMG_PROGRESS`

Display the images sequentially according to the given order.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `array` | yes | — | Array of x-coordinates of the images. |
| `y` | `array` | yes | — | Array of y-coordinates of the images. |
| `image_array` | `array` | yes | — | Array of images |
| `image_length` | `number` | yes | — | The length of the array. |
| `level` | `number` | no | — | Progress level [1-image_length]. |

### `hmUI.widget.IMG_STATUS`

| Value                             | Description           | | --------------------------------- | --------------------- | | hmUI.system_status.CLOCK          | Alarm clock on        | | DISCONNECT                        | Bluetooth Disconnect | | hmUI.system_status.DISTURB        | Do not disturb        | | hmUI.system_status.LOCK           | Lock screen on        |

### `hmUI.widget.STROKE_RECT`

The stroked rectangle widget adds a stroke on the basis of the filled rectangle component.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-axis coordinate of the component. |
| `y` | `number` | yes | — | The y-axis coordinate of the component. |
| `w` | `number` | yes | — | The width of the component. |
| `h` | `number` | yes | — | The height of the component. |
| `color` | `number` | yes | — | The component's color. |
| `radius` | `number` | no | — | The rectangle's rounded corners. |
| `line_width` | `number` | no | — | The width of stroke. |
| `angle` | `number` | no | — | Rotation angle. |

### `hmUI.widget.TEXT`

Text component for displaying text. Support setting text size, color and alignment.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-axis coordinate of the component. |
| `y` | `number` | yes | — | The y-axis coordinate of the component. |
| `w` | `number` | yes | — | The width of the component. |
| `h` | `number` | yes | — | The height of the component. |
| `color` | `number` | no | — | The color of the text. |
| `align_h` | `ALIGN` | no | — | The alignment of the horizontal axis (see ALIGN for values). |
| `align_v` | `ALIGN` | no | — | Alignment of the vertical axis (see ALIGN for values). |
| `text` | `string` | no | — | Text |
| `text_size` | `number` | no | — | The size of the font. |
| `text_style` | `TEXT_STYLE` | no | — | Text overlength handling, default is hmUI.text_style.NONE (see TEXT_STYLE for value). |
| `line_space` | `number` | no | — | Row spacing. |
| `char_space` | `number` | no | — | Character Spacing. |

### `hmUI.widget.TEXT_IMG`

Support displaying text as images, you need to pass in the image font array `font_array`.

**Param**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` | yes | — | The x-axis coordinate of the component. |
| `y` | `number` | yes | — | The y-axis coordinate of the component. |
| `w` | `number` | yes | — | The width of the component.It will be calculated automatically according to the type if not written. |
| `h` | `number` | yes | — | The height of the component.It will be calculated automatically according to the type if not written. |
| `font_array` | `array` | yes | — | Image font array.To sort by 0-9. |
| `type` | `number` | no | — | The type of data. See the [data_type](../../../../watchface/api/hmUI/widget/data_type.mdx). |
| `text` | `string` | no | — | It is used to specify the text content to be displayed; the type attribute will be disabled when this field is specified; the content only supports 0-9. |
| `unit_sc` | `string` | no | — | Simplified Chinese Units. |
| `unit_en` | `string` | no | — | English Units. |
| `unit_tc` | `string` | no | — | Traditional Chinese Unit. |
| `imperial_unit_sc` | `string` | no | — | Chinese Simplified (English Units). |
| `imperial_unit_en` | `string` | no | — | English imperial units. |
| `imperial_unit_tc` | `string` | no | — | Traditional Chinese (English Units). |
| `negative_image` | `string` | no | — | Negative sign picture. |
| `dot_image` | `string` | no | — | Decimal-point-pictures can be used as separators. |
| `h_space` | `number` | no | — | The font of space. |
| `align_h` | `ALIGN` | no | — | Horizontal axis alignment (see ALIGN for values). |

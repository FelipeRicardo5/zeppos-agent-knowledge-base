# @zos/page

**11 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getScrollTop` | function | >= 2 | OFFICIAL |
| `getSwiperIndex` | function | >= 2 | OFFICIAL |
| `SCROLL_ANIMATION_NONE` | constant | >= 2 | OFFICIAL |
| `SCROLL_ANIMATION_SMOOTH` | constant | >= 2 | OFFICIAL |
| `SCROLL_MODE_FREE` | constant | >= 2 | OFFICIAL |
| `SCROLL_MODE_SWIPER` | constant | >= 2 | OFFICIAL |
| `SCROLL_MODE_SWIPER_HORIZONTAL` | constant | >= 2.1 | OFFICIAL |
| `scrollTo` | function | >= 2 | OFFICIAL |
| `setScrollLock` | function | >= 2 | OFFICIAL |
| `setScrollMode` | function | >= 2 | OFFICIAL |
| `swipeToIndex` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/page.getScrollTop`

Get the vertical coordinate of the current scroll position of the page.

```ts
function getScrollTop(): Result
```

### `@zos/page.getSwiperIndex`

Get the scroll position of the current page, only if the page scroll mode is `SCROLL_MODE_SWIPER` or `SCROLL_MODE_SWIPER_HORIZONTAL` return the index of the current item (starting from `1`), otherwise return `undefined`.

```ts
function getSwiperIndex(): Result
```

### `@zos/page.SCROLL_ANIMATION_NONE`

No animation, scroll directly to the corresponding position

### `@zos/page.SCROLL_ANIMATION_SMOOTH`

Scroll smoothly to the corresponding position

### `@zos/page.SCROLL_MODE_FREE`

Free scrolling mode, system default scrolling mode

### `@zos/page.SCROLL_MODE_SWIPER`

Swiper mode, vertical rotating map, walking lights, by configuring the height and number of individual pages can achieve the whole screen scrolling effect

### `@zos/page.SCROLL_MODE_SWIPER_HORIZONTAL`

Swiper mode, horizontal rotating map, walking lights, by configuring the width and number of individual pages can achieve the whole screen scrolling effect

### `@zos/page.scrollTo`

Scroll the page to the specified position.

```ts
function scrollTo(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `y` | `number` | not stated | — | >= 2 | The vertical axis coordinates of the page, the 12 o'clock direction of the watch is positive, and scrolling down is negative |
| `animConfig` | `animConfig` | not stated | — | >= 3.6 | Scroll animation configuration |

**animConfig**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `anim_rate` | `string` | not stated | — | >= 3.6 | Animation curve, optional values linear, easein, easeout, easeinout refer to [https://easings.net/](https://easings.net/) |
| `anim_duration` | `number` | not stated | — | >= 3.6 | Animation duration, in milliseconds |
| `anim_fps` | `number` | not stated | `25` | >= 3.6 | Animation frame rate |
| `anim_complete_func` | `() =&#62; void` | not stated | — | >= 3.6 | End of animation callback function |

### `@zos/page.setScrollLock`

Set the current page scrolling position to be locked, i.e. the screen position will not change with the gesture swipe. After calling this API to perform the unlock operation, the page scrolling mode will be set to free scrolling mode.

```ts
function setScrollLock(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `lock` | `boolean` | not stated | `true` | >= 2 | Whether to lock the current page scroll position |

### `@zos/page.setScrollMode`

Set the scroll mode of the page.

```ts
function setScrollMode(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `mode` | `string` | not stated | — | >= 2 | Page scroll mode, value reference page scroll mode constants |
| `options` | `Options` | not stated | — | >= 2 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `height` | `number` | not stated | — | >= 2 | Specify the height of a single item in Swiper, effective only if the scroll mode is SCROLL_MODE_SWIPER |
| `count` | `number` | not stated | — | >= 2 | Specify the number of items in the Swiper, effective only if the scroll mode is SCROLL_MODE_SWIPER or SCROLL_MODE_SWIPER_HORIZONTAL |
| `width` | `number` | not stated | — | >= 2.1 | Specify the width of a single item in Swiper, effective only if the scroll mode is SCROLL_MODE_SWIPER_HORIZONTAL |
| `modeParams` | `FreeModeParams&#124;SwipeModeParams` | not stated | — | >= 3 | Parameters for the scroll mode |

**FreeModeParams**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `scroll_frame_func` | `(params: ScrollObj) =&#62; void` | not stated | — | >= 3 | The callback function for each frame during scrolling |
| `scroll_complete_func` | `(params: ScrollObj) =&#62; void` | not stated | — | >= 3 | The end of the scroll callback function |
| `bounce` | `boolean` | not stated | — | >= 3.6 | Control whether the page rebound effect is turned on. When the page content exceeds one screen, it is turned on by default. If the page content is less than one screen, it is turned off by default. This parameter needs to be passed in the build lifecycle to take effect. |

**ScrollObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 3 | Todo |
| `yoffset` | `number` | not stated | — | >= 3 | Pixel offset on the y axis |

**SwipeModeParams**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `on_page` | `(pageIndex: number) =&#62; void` | not stated | — | >= 3 | Callback function after page flipping, pageIndex is the page index after page flipping, and the index starts from 0 |
| `crown_enable` | `boolean` | not stated | — | >= 3 | Whether to respond to crown events, the default response, you can use the crown to control page turning |

### `@zos/page.swipeToIndex`

Scrolls the page to the Swiper's target item, only if the current page scroll mode is `SCROLL_MODE_SWIPER`.

```ts
function swipeToIndex(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `index` | `number` | not stated | — | >= 2 | Index of the target project, starting from 0 |
| `animation` | `string` | not stated | `SCROLL_ANIMATION_SMOOTH` | >= 2 | Scrolling animation, value reference page scrolling animation constants |

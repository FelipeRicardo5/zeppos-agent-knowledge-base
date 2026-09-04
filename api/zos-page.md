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

## Descriptions

### `@zos/page.getScrollTop`

Get the vertical coordinate of the current scroll position of the page.

### `@zos/page.getSwiperIndex`

Get the scroll position of the current page, only if the page scroll mode is `SCROLL_MODE_SWIPER` or `SCROLL_MODE_SWIPER_HORIZONTAL` return the index of the current item (starting from `1`), otherwise return `undefined`.

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

### `@zos/page.setScrollLock`

Set the current page scrolling position to be locked, i.e. the screen position will not change with the gesture swipe. After calling this API to perform the unlock operation, the page scrolling mode will be set to free scrolling mode.

### `@zos/page.setScrollMode`

Set the scroll mode of the page.

### `@zos/page.swipeToIndex`

Scrolls the page to the Swiper's target item, only if the current page scroll mode is `SCROLL_MODE_SWIPER`.

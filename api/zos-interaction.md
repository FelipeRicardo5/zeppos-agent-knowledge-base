# @zos/interaction

**29 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `createModal` | function | >= 2 | OFFICIAL |
| `GESTURE_DOWN` | constant | >= 2 | OFFICIAL |
| `GESTURE_LEFT` | constant | >= 2 | OFFICIAL |
| `GESTURE_RIGHT` | constant | >= 2 | OFFICIAL |
| `GESTURE_UP` | constant | >= 2 | OFFICIAL |
| `KEY_BACK` | constant | >= 2 | OFFICIAL |
| `KEY_DOWN` | constant | >= 2 | OFFICIAL |
| `KEY_EVENT_CLICK` | constant | >= 2 | OFFICIAL |
| `KEY_EVENT_DOUBLE_CLICK` | constant | >= 2 | OFFICIAL |
| `KEY_EVENT_LONG_PRESS` | constant | >= 2 | OFFICIAL |
| `KEY_EVENT_PRESS` | constant | >= 2 | OFFICIAL |
| `KEY_EVENT_RELEASE` | constant | >= 2 | OFFICIAL |
| `KEY_HOME` | constant | >= 2 | OFFICIAL |
| `KEY_SELECT` | constant | >= 2 | OFFICIAL |
| `KEY_SHORTCUT` | constant | >= 2 | OFFICIAL |
| `KEY_UP` | constant | >= 2 | OFFICIAL |
| `MODAL_CANCEL` | constant | >= 2 | OFFICIAL |
| `MODAL_CONFIRM` | constant | >= 2 | OFFICIAL |
| `offDigitalCrown` | function | >= 2 | OFFICIAL |
| `offGesture` | function | >= 2 | OFFICIAL |
| `offKey` | function | >= 2 | OFFICIAL |
| `onDigitalCrown` | function | >= 2 | OFFICIAL |
| `onGesture` | function | >= 2 | OFFICIAL |
| `onKey` | function | >= 2 | OFFICIAL |
| `onWristMotion` | function | >= 3 | OFFICIAL |
| `showToast` | function | >= 2 | OFFICIAL |
| `WRIST_MOTION_FLIP` | constant | >= 2 | OFFICIAL |
| `WRIST_MOTION_LIFT` | constant | >= 2 | OFFICIAL |
| `WRIST_MOTION_LOWER` | constant | >= 2 | OFFICIAL |

## Descriptions

### `@zos/interaction.createModal`

![createModal_image](https://img-cdn.huami.com/20220927/9a9ce61a400f089c984951ca71c6f9b0.jpg) Create Modal prompt box.

### `@zos/interaction.GESTURE_DOWN`

Gesture down slide

### `@zos/interaction.GESTURE_LEFT`

Gesture left slide

### `@zos/interaction.GESTURE_RIGHT`

Gesture right slide

### `@zos/interaction.GESTURE_UP`

Gesture up slide

### `@zos/interaction.KEY_BACK`

BACK KEY

### `@zos/interaction.KEY_DOWN`

SHORTCUT KEY

### `@zos/interaction.KEY_EVENT_CLICK`

Key click event

### `@zos/interaction.KEY_EVENT_DOUBLE_CLICK`

Key double-click event

### `@zos/interaction.KEY_EVENT_LONG_PRESS`

Key long-press event

### `@zos/interaction.KEY_EVENT_PRESS`

Key press event

### `@zos/interaction.KEY_EVENT_RELEASE`

Key release event

### `@zos/interaction.KEY_HOME`

HOME KEY

### `@zos/interaction.KEY_SELECT`

SELECT KEY

### `@zos/interaction.KEY_SHORTCUT`

SHORTCUT KEY

### `@zos/interaction.KEY_UP`

UP KEY

### `@zos/interaction.MODAL_CANCEL`

Modal Cancel button

### `@zos/interaction.MODAL_CONFIRM`

Modal Confirm button

### `@zos/interaction.offDigitalCrown`

Cancel the `onDigitalCrown` registration to listen for digital crown rotation events.

### `@zos/interaction.offGesture`

Cancel the `onGesture` registration to listen for user gesture events.

### `@zos/interaction.offKey`

Cancel the keystroke event registered by `onKey`..

### `@zos/interaction.onDigitalCrown`

Listen to the digital crown rotation event, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

### `@zos/interaction.onGesture`

Listen to user gesture events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

### `@zos/interaction.onKey`

Listen to key events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

### `@zos/interaction.onWristMotion`

Monitoring hand movement events.

### `@zos/interaction.showToast`

![showToast_image](https://img-cdn.huami.com/20220927/d53c5278ad075cdabc9bcf4e359d3d5c.jpg) Display Message Prompt Box.

### `@zos/interaction.WRIST_MOTION_FLIP`

Flip wrist movement

### `@zos/interaction.WRIST_MOTION_LIFT`

Wrist lift

### `@zos/interaction.WRIST_MOTION_LOWER`

Wrist down

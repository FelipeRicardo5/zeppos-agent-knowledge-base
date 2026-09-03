# @zos/interaction

**12 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `createModal` | function | >= 2 | OFFICIAL |
| `GESTURE_RIGHT` | constant | any | OBSERVED |
| `KEY_SHORTCUT` | constant | any | OBSERVED |
| `MODAL_CONFIRM` | constant | any | OBSERVED |
| `offDigitalCrown` | function | >= 2 | OFFICIAL |
| `offGesture` | function | >= 2 | OFFICIAL |
| `offKey` | function | >= 2 | OFFICIAL |
| `onDigitalCrown` | function | >= 2 | OFFICIAL |
| `onGesture` | function | >= 2 | OFFICIAL |
| `onKey` | function | >= 2 | OFFICIAL |
| `onWristMotion` | function | >= 3 | OFFICIAL |
| `showToast` | function | >= 2 | OFFICIAL |

## Descriptions

### `@zos/interaction.createModal`

![createModal_image](https://img-cdn.huami.com/20220927/9a9ce61a400f089c984951ca71c6f9b0.jpg) Create Modal prompt box.

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

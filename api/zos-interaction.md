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

## Symbols in detail

### `@zos/interaction.createModal`

Create Modal prompt box.

```ts
function createModal(option: Option): Modal
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `content` | `string` | not stated | — | >= 2 | title of Modal |
| `title` | `string` | not stated | — | >= 3.6 | Modal dialog box title, alias for content |
| `show` | `boolean` | not stated | `true` | >= 2 | Whether to display Modal immediately after the creation is completed |
| `onClick` | `(keyObj: KeyObj) =&#62; void` | not stated | — | >= 2 | Whether to display Modal immediately |
| `autoHide` | `boolean` | not stated | `true` | >= 2 | Whether to automatically close the Modal dialog after clicking the Confirm or Cancel button |
| `subtitle` | `string` | not stated | — | >= 3.6 | subtitle |
| `src` | `string` | not stated | — | >= 3.6 | Icon icon path |
| `text` | `string` | not stated | — | >= 3.6 | text content |
| `textColor` | `number` | not stated | `0xFFFFFF` | >= 3.6 | text color |
| `textAlpha` | `number` | not stated | `255` | >= 3.6 | Text transparency, transparency [0-255], 0 is full transparency |
| `okButton` | `string` | not stated | — | >= 3.6 | The icon path of the confirmation button |
| `cancelButton` | `string` | not stated | — | >= 3.6 | Cancel button icon icon path |
| `capsuleButton` | `Array&#60;string&#62;` | not stated | — | >= 3.6 | Capsule button configuration, as a string array, click type in the returned KeyObj starting from 10 |

**KeyObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 2 | Modal key name, value reference Modal key name constants |

**Modal**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `show` | `(isShow: boolean) =&#62; void` | not stated | — | >= 2 | Show or hide Modal |

**Modal key name constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `MODAL_CANCEL` | >= 2 | Modal Cancel button |
| `MODAL_CONFIRM` | >= 2 | Modal Confirm button |

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

```ts
function offDigitalCrown(): void
```

### `@zos/interaction.offGesture`

Cancel the `onGesture` registration to listen for user gesture events.

```ts
function offGesture(): void
```

### `@zos/interaction.offKey`

Cancel the keystroke event registered by `onKey`..

```ts
function offKey(): void
```

### `@zos/interaction.onDigitalCrown`

Listen to the digital crown rotation event, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

```ts
function onDigitalCrown(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `callback` | `(key: Key, degree: Degree) =&#62; void` | not stated | — | >= 2 | Digital crown rotation event callback function |

**Key name constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `KEY_BACK` | >= 2 | BACK KEY |
| `KEY_DOWN` | >= 2 | SHORTCUT KEY |
| `KEY_HOME` | >= 2 | HOME KEY |
| `KEY_SELECT` | >= 2 | SELECT KEY |
| `KEY_SHORTCUT` | >= 2 | SHORTCUT KEY |
| `KEY_UP` | >= 2 | UP KEY |

### `@zos/interaction.onGesture`

Listen to user gesture events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

```ts
function onGesture(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `callback` | `(event: GestureEvent) =&#62; PreventDefault` | not stated | — | >= 2 | Gesture event callback function |

**Gesture event constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `GESTURE_DOWN` | >= 2 | Gesture down slide |
| `GESTURE_LEFT` | >= 2 | Gesture left slide |
| `GESTURE_RIGHT` | >= 2 | Gesture right slide |
| `GESTURE_UP` | >= 2 | Gesture up slide |

### `@zos/interaction.onKey`

Listen to key events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail.

```ts
function onKey(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `callback` | `(key: Key, event: KeyEvent) =&#62; PreventDefault` | not stated | — | >= 2 | Key event callback function |

**Key event constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `KEY_EVENT_CLICK` | >= 2 | Key click event |
| `KEY_EVENT_DOUBLE_CLICK` | >= 2 | Key double-click event |
| `KEY_EVENT_LONG_PRESS` | >= 2 | Key long-press event |
| `KEY_EVENT_PRESS` | >= 2 | Key press event |
| `KEY_EVENT_RELEASE` | >= 2 | Key release event |

**Key name constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `KEY_BACK` | >= 2 | BACK KEY |
| `KEY_DOWN` | >= 2 | SHORTCUT KEY |
| `KEY_HOME` | >= 2 | HOME KEY |
| `KEY_SELECT` | >= 2 | SELECT KEY |
| `KEY_SHORTCUT` | >= 2 | SHORTCUT KEY |
| `KEY_UP` | >= 2 | UP KEY |

### `@zos/interaction.onWristMotion`

Monitoring hand movement events.

```ts
function onWristMotion(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `callback` | `(params: Params) =&#62; void` | not stated | — | >= 3 | Digital crown rotation event callback function |

**Params**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `number` | not stated | — | >= 3.6 | Action type, 0 - palm covering, 3 - wrist event |
| `motion` | `number` | not stated | — | >= 3 | Action code, value reference hand motion constant |

**Hand motion constant**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `WRIST_MOTION_FLIP` | >= 2 | Flip wrist movement |
| `WRIST_MOTION_LIFT` | >= 2 | Wrist lift |
| `WRIST_MOTION_LOWER` | >= 2 | Wrist down |

### `@zos/interaction.showToast`

Display Message Prompt Box.

```ts
function showToast(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `content` | `string` | not stated | — | >= 2 | Content of the prompt |

### `@zos/interaction.WRIST_MOTION_FLIP`

Flip wrist movement

### `@zos/interaction.WRIST_MOTION_LIFT`

Wrist lift

### `@zos/interaction.WRIST_MOTION_LOWER`

Wrist down

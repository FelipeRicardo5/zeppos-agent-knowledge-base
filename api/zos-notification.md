# @zos/notification

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `cancel` | function | >= 3 | OFFICIAL |
| `getAllNotifications` | function | >= 3 | OFFICIAL |
| `notify` | function | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/notification.cancel`

Delete the notification message identified by the specified ID in the notification center.

**Requires in `app.json`**: `device:os.notification` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function cancel(alarmId: number | Array<number>): void
```

### `@zos/notification.getAllNotifications`

Get the notification IDs that have been sent by the current app and are still in the notification center.

**Requires in `app.json`**: `device:os.notification` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function getAllNotifications(): Array<number>
```

### `@zos/notification.notify`

Send notifications to the Watch Notification Center.

**Requires in `app.json`**: `device:os.notification` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function notify(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | not stated | — | >= 3 | Notice title text |
| `content` | `string` | not stated | — | >= 3 | Text of the notice |
| `actions` | `Array&#60;Action&#62;` | not stated | — | >= 3 | Custom button arrays |
| `vibrate` | `number` | not stated | `0` | >= 3 | Specify the vibration effect when the notification center pops up, 0 - default, 1 - beep, 2 - birdsong, 3 - drumbeat, 4 - gentle, 5 - buzz, Only effective for linear motors |

**Action**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `text` | `string` | not stated | — | >= 3 | Button Text |
| `file` | `string` | not stated | — | >= 3 | The App Service file to be started |
| `param` | `string` | not stated | — | >= 3 | Parameters passed in during file loading |

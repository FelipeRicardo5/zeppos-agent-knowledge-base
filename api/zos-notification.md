# @zos/notification

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `cancel` | function | >= 3 | OFFICIAL |
| `getAllNotifications` | function | >= 3 | OFFICIAL |
| `notify` | function | >= 3 | OFFICIAL |

## Descriptions

### `@zos/notification.cancel`

Delete the notification message identified by the specified ID in the notification center. :::info permission code: `device:os.notification` :::

### `@zos/notification.getAllNotifications`

Get the notification IDs that have been sent by the current app and are still in the notification center. :::info permission code: `device:os.notification` :::

### `@zos/notification.notify`

Send notifications to the Watch Notification Center. :::info permission code: `device:os.notification` :::

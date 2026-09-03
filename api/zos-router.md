# @zos/router

**10 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `back` | function | >= 2 | OFFICIAL |
| `checkSystemApp` | function | >= 3 | OFFICIAL |
| `clearLaunchAppTimeout` | function | >= 2 | OFFICIAL |
| `exit` | function | >= 2 | OFFICIAL |
| `getAppIdByName` | function | >= 3.6 | OFFICIAL |
| `home` | function | >= 2 | OFFICIAL |
| `launchApp` | function | >= 2 | OFFICIAL |
| `push` | function | >= 2 | OFFICIAL |
| `replace` | function | >= 2 | OFFICIAL |
| `setLaunchAppTimeout` | function | >= 2 | OFFICIAL |

## Descriptions

### `@zos/router.back`

Closes the current page to return to the previous page.

### `@zos/router.checkSystemApp`

Check if the system application supports jumping.

### `@zos/router.clearLaunchAppTimeout`

Cancel the wakeup Mini Program timer created by `setLaunchAppTimeout`.

### `@zos/router.exit`

Exit the Mini Program and return to the applist page.

### `@zos/router.getAppIdByName`

Fuzzy match the English name of installed Mini Programs on the device by name.

### `@zos/router.home`

Exit the Mini Program and return to the watchface page.

### `@zos/router.launchApp`

Open Mini Program.

### `@zos/router.push`

Navigate to a page within the Mini Program. Use the `back` method to go back to the original page.

### `@zos/router.replace`

Close the current page and jump to a page within the app.

### `@zos/router.setLaunchAppTimeout`

Register a timer to launch the Mini Program at a given time.

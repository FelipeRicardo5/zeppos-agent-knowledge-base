# settings-storage

**7 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addListener` | function | not stated | OFFICIAL |
| `clear` | function | not stated | OFFICIAL |
| `getItem` | function | not stated | OFFICIAL |
| `length` | function | not stated | OFFICIAL |
| `removeItem` | function | not stated | OFFICIAL |
| `setItem` | function | not stated | OFFICIAL |
| `toObject` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `settings-storage.addListener`

This API only needs to be used in the Side Service. The Settings App is "responsive" to data changes in `settingsStorage`, so there is no need to manually listen for data changes.

### `settings-storage.clear`

Delete all key-value pairs.

### `settings-storage.getItem`

Get the stored value by key name.

### `settings-storage.length`

`settings.settingsStorage.length` returns the number of members in `settingsStorage`

### `settings-storage.removeItem`

Delete the value stored by the key name.

### `settings-storage.setItem`

Storing key-value pairs.

### `settings-storage.toObject`

Converts the content stored in `settingsStorage` to the form of an object.

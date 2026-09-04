# @zos/storage

**9 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `localStorage` | value | >= 3 | OFFICIAL |
| `LocalStorage` | function | >= 3 | OFFICIAL |
| `localStorage-instance` | value | >= 2 | OFFICIAL |
| `sessionStorage` | value | >= 2 | OFFICIAL |
| `SessionStorage` | function | >= 2 | OFFICIAL |
| `sessionStorage-instance` | value | >= 2 | OFFICIAL |
| `ShareLocalStorage` | value | >= 3 | OFFICIAL |
| `ShareTypedStorage` | value | >= 3 | OFFICIAL |
| `TypedStorage` | value | >= 3 | OFFICIAL |

## Descriptions

### `@zos/storage.localStorage`

Locally stored key-value pairs, data cleared after Mini Program uninstallation. An instance keeps loaded data in memory, making it suitable for repeated reads and writes by reducing repeated file reads. permission code: `device:os.local_storage`

### `@zos/storage.LocalStorage`

Locally stored key-value pairs, data cleared after Mini Program uninstallation

### `@zos/storage.localStorage-instance`

Locally stored key-value pairs, data cleared after Mini Program uninstallation. permission code: `device:os.local_storage`

### `@zos/storage.sessionStorage`

Key-value pairs are stored and data is cleared after exiting the Mini Program. Each instance has independent temporary in-memory storage, suitable for isolated session data.

### `@zos/storage.SessionStorage`

Key-value pairs are stored and data is cleared after exiting the Mini Program

### `@zos/storage.sessionStorage-instance`

Key-value pairs are stored and data is cleared after exiting the Mini Program.

### `@zos/storage.ShareLocalStorage`

Shared JSON key-value storage for cross-application scenarios. Application A publishes data with this class, and application B reads it with `LocalStorage` from `@zos/share-storage` and application A's appId. When using a custom storagePath, both applications must use the same path. permission code: `device:os.local_storage`

### `@zos/storage.ShareTypedStorage`

Shared typed key-value storage for cross-application scenarios. Application A publishes system properties with this class, and application B reads them with `TypedStorage` from `@zos/share-storage` and application A's appId. When using a custom scope, both applications must use the same scope.

### `@zos/storage.TypedStorage`

Typed key-value storage backed by system properties. Suitable for primitive values such as booleans, numbers and strings..

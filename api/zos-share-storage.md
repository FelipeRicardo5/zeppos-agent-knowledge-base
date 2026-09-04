# @zos/share-storage

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `FileSystem` | value | >= 3 | OFFICIAL |
| `LocalStorage` | value | >= 3 | OFFICIAL |
| `TypedStorage` | value | >= 3 | OFFICIAL |

## Descriptions

### `@zos/share-storage.FileSystem`

Read-only file system across applications. Application B uses application A's appId to inspect, open and read a known file path from application A; this class does not provide write operations.

### `@zos/share-storage.LocalStorage`

Read-only JSON key-value storage across applications. Application A publishes data with `ShareLocalStorage` from `@zos/storage`, and application B reads it with application A's appId. When using a custom storagePath, both applications must use the same path.

### `@zos/share-storage.TypedStorage`

Read-only typed key-value storage across applications. Application A publishes system properties with `ShareTypedStorage` from `@zos/storage`, and application B reads them with application A's appId. When using a custom scope, both applications must use the same scope.

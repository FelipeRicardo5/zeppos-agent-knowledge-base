# @zos/share-storage

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `FileSystem` | value | >= 3 | OFFICIAL |
| `LocalStorage` | value | >= 3 | OFFICIAL |
| `TypedStorage` | value | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/share-storage.FileSystem`

Read-only file system across applications. Application B uses application A's appId to inspect, open and read a known file path from application A; this class does not provide write operations.

**Called on a `FileSystem` value** — 5 members

| Member | Signature |
| --- | --- |
| [`openSync`](#zosshare-storagefilesystemopensync) | `openSync(options: { path: string }): number` |
| [`closeSync`](#zosshare-storagefilesystemclosesync) | `closeSync(fd: number): number` |
| [`statSync`](#zosshare-storagefilesystemstatsync) | `statSync(options: {
      path: string
    }): { size: number; mtimeMs: number; isDir: boolean; isFile: boolean } | undefined` |
| [`readSync`](#zosshare-storagefilesystemreadsync) | `readSync(options: {
      fd: number
      buffer: ArrayBuffer
      options?: { offset?: number; length?: number; position?: number }
    }): number` |
| [`readFileSync`](#zosshare-storagefilesystemreadfilesync) | `readFileSync(options: {
      path: string
      options?: { encoding?: string }
    }): string | ArrayBuffer` |

#### `@zos/share-storage.FileSystem.openSync`

Open a file in read-only mode

```ts
openSync(options: { path: string }): number
```

#### `@zos/share-storage.FileSystem.closeSync`

Close a file descriptor

```ts
closeSync(fd: number): number
```

#### `@zos/share-storage.FileSystem.statSync`

Get file information, or undefined when the file does not exist

```ts
statSync(options: {
      path: string
    }): { size: number; mtimeMs: number; isDir: boolean; isFile: boolean } | undefined
```

#### `@zos/share-storage.FileSystem.readSync`

Read file content into a buffer

```ts
readSync(options: {
      fd: number
      buffer: ArrayBuffer
      options?: { offset?: number; length?: number; position?: number }
    }): number
```

#### `@zos/share-storage.FileSystem.readFileSync`

Read an entire file. Returns a string when encoding is specified, otherwise an ArrayBuffer.

```ts
readFileSync(options: {
      path: string
      options?: { encoding?: string }
    }): string | ArrayBuffer
```

### `@zos/share-storage.LocalStorage`

Read-only JSON key-value storage across applications. Application A publishes data with `ShareLocalStorage` from `@zos/storage`, and application B reads it with application A's appId. When using a custom storagePath, both applications must use the same path.

**Called on a `LocalStorage` value** — 2 members

| Member | Signature |
| --- | --- |
| [`getItem`](#zosshare-storagelocalstoragegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`isExisted`](#zosshare-storagelocalstorageisexisted) | `isExisted(): boolean` |

#### `@zos/share-storage.LocalStorage.getItem`

Get a value, or return the default value when not found

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/share-storage.LocalStorage.isExisted`

Check whether the target shared storage file exists

```ts
isExisted(): boolean
```

### `@zos/share-storage.TypedStorage`

Read-only typed key-value storage across applications. Application A publishes system properties with `ShareTypedStorage` from `@zos/storage`, and application B reads them with application A's appId. When using a custom scope, both applications must use the same scope.

**Called on a `TypedStorage` value** — 5 members

| Member | Signature |
| --- | --- |
| [`getBool`](#zosshare-storagetypedstoragegetbool) | `getBool(key: string, defaultValue: boolean): boolean` |
| [`getInt`](#zosshare-storagetypedstoragegetint) | `getInt(key: string, defaultValue: number): number` |
| [`getInt64`](#zosshare-storagetypedstoragegetint64) | `getInt64(key: string, defaultValue: number): number` |
| [`getDouble`](#zosshare-storagetypedstoragegetdouble) | `getDouble(key: string, defaultValue: number): number` |
| [`getString`](#zosshare-storagetypedstoragegetstring) | `getString(key: string, defaultValue: string): string` |

#### `@zos/share-storage.TypedStorage.getBool`

Get a boolean value from the target application

```ts
getBool(key: string, defaultValue: boolean): boolean
```

#### `@zos/share-storage.TypedStorage.getInt`

Get an integer value from the target application

```ts
getInt(key: string, defaultValue: number): number
```

#### `@zos/share-storage.TypedStorage.getInt64`

Get a 64-bit integer value from the target application

```ts
getInt64(key: string, defaultValue: number): number
```

#### `@zos/share-storage.TypedStorage.getDouble`

Get a double value from the target application

```ts
getDouble(key: string, defaultValue: number): number
```

#### `@zos/share-storage.TypedStorage.getString`

Get a string value from the target application

```ts
getString(key: string, defaultValue: string): string
```

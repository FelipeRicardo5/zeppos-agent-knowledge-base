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

## Symbols in detail

### `@zos/storage.localStorage`

Locally stored key-value pairs, data cleared after Mini Program uninstallation. An instance keeps loaded data in memory, making it suitable for repeated reads and writes by reducing repeated file reads.

**Requires in `app.json`**: `device:os.local_storage` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `localStorage` value** — 4 members

| Member | Signature |
| --- | --- |
| [`setItem`](#zosstoragelocalstoragesetitem) | `setItem(key: string, value: any): void` |
| [`getItem`](#zosstoragelocalstoragegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`removeItem`](#zosstoragelocalstorageremoveitem) | `removeItem(key: string): boolean` |
| [`clear`](#zosstoragelocalstorageclear) | `clear(): void` |

#### `@zos/storage.localStorage.setItem`

Save data

```ts
setItem(key: string, value: any): void
```

#### `@zos/storage.localStorage.getItem`

Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/storage.localStorage.removeItem`

Delete the data of the specified `key`

```ts
removeItem(key: string): boolean
```

#### `@zos/storage.localStorage.clear`

Clear all data in localStorage

```ts
clear(): void
```

### `@zos/storage.LocalStorage`

Locally stored key-value pairs, data cleared after Mini Program uninstallation

### `@zos/storage.localStorage-instance`

Locally stored key-value pairs, data cleared after Mini Program uninstallation.

**Requires in `app.json`**: `device:os.local_storage` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `localStorage-instance` value** — 4 members

| Member | Signature |
| --- | --- |
| [`setItem`](#zosstoragelocalstorage-instancesetitem) | `setItem(key: string, value: any): void` |
| [`getItem`](#zosstoragelocalstorage-instancegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`removeItem`](#zosstoragelocalstorage-instanceremoveitem) | `removeItem(key: string): boolean` |
| [`clear`](#zosstoragelocalstorage-instanceclear) | `clear(): void` |

#### `@zos/storage.localStorage-instance.setItem`

Save data

```ts
setItem(key: string, value: any): void
```

#### `@zos/storage.localStorage-instance.getItem`

Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/storage.localStorage-instance.removeItem`

Delete the data of the specified `key`

```ts
removeItem(key: string): boolean
```

#### `@zos/storage.localStorage-instance.clear`

Clear all data in localStorage

```ts
clear(): void
```

### `@zos/storage.sessionStorage`

Key-value pairs are stored and data is cleared after exiting the Mini Program. Each instance has independent temporary in-memory storage, suitable for isolated session data.

**Called on a `sessionStorage` value** — 4 members

| Member | Signature |
| --- | --- |
| [`setItem`](#zosstoragesessionstoragesetitem) | `setItem(key: string, value: any): void` |
| [`getItem`](#zosstoragesessionstoragegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`removeItem`](#zosstoragesessionstorageremoveitem) | `removeItem(key: string): boolean` |
| [`clear`](#zosstoragesessionstorageclear) | `clear(): void` |

#### `@zos/storage.sessionStorage.setItem`

Save data

```ts
setItem(key: string, value: any): void
```

#### `@zos/storage.sessionStorage.getItem`

Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/storage.sessionStorage.removeItem`

Delete the data of the specified `key`

```ts
removeItem(key: string): boolean
```

#### `@zos/storage.sessionStorage.clear`

Clear all data in sessionStorage

```ts
clear(): void
```

### `@zos/storage.SessionStorage`

Key-value pairs are stored and data is cleared after exiting the Mini Program

### `@zos/storage.sessionStorage-instance`

Key-value pairs are stored and data is cleared after exiting the Mini Program.

**Called on a `sessionStorage-instance` value** — 4 members

| Member | Signature |
| --- | --- |
| [`setItem`](#zosstoragesessionstorage-instancesetitem) | `setItem(key: string, value: any): void` |
| [`getItem`](#zosstoragesessionstorage-instancegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`removeItem`](#zosstoragesessionstorage-instanceremoveitem) | `removeItem(key: string): boolean` |
| [`clear`](#zosstoragesessionstorage-instanceclear) | `clear(): void` |

#### `@zos/storage.sessionStorage-instance.setItem`

Save data

```ts
setItem(key: string, value: any): void
```

#### `@zos/storage.sessionStorage-instance.getItem`

Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/storage.sessionStorage-instance.removeItem`

Delete the data of the specified `key`

```ts
removeItem(key: string): boolean
```

#### `@zos/storage.sessionStorage-instance.clear`

Clear all data in sessionStorage

```ts
clear(): void
```

### `@zos/storage.ShareLocalStorage`

Shared JSON key-value storage for cross-application scenarios. Application A publishes data with this class, and application B reads it with `LocalStorage` from `@zos/share-storage` and application A's appId. When using a custom storagePath, both applications must use the same path.

**Requires in `app.json`**: `device:os.local_storage` — see [`../manifest/index.md`](../manifest/index.md).

**Called on a `ShareLocalStorage` value** — 4 members

| Member | Signature |
| --- | --- |
| [`setItem`](#zosstoragesharelocalstoragesetitem) | `setItem(key: string, value: any): void` |
| [`getItem`](#zosstoragesharelocalstoragegetitem) | `getItem<T = any>(key: string, defaultValue?: T): T | undefined` |
| [`removeItem`](#zosstoragesharelocalstorageremoveitem) | `removeItem(key: string): boolean` |
| [`clear`](#zosstoragesharelocalstorageclear) | `clear(): void` |

#### `@zos/storage.ShareLocalStorage.setItem`

Set a value

```ts
setItem(key: string, value: any): void
```

#### `@zos/storage.ShareLocalStorage.getItem`

Get a value, or return the default value when not found

```ts
getItem<T = any>(key: string, defaultValue?: T): T | undefined
```

#### `@zos/storage.ShareLocalStorage.removeItem`

Delete a value by key

```ts
removeItem(key: string): boolean
```

#### `@zos/storage.ShareLocalStorage.clear`

Clear all shared storage data

```ts
clear(): void
```

### `@zos/storage.ShareTypedStorage`

Shared typed key-value storage for cross-application scenarios. Application A publishes system properties with this class, and application B reads them with `TypedStorage` from `@zos/share-storage` and application A's appId. When using a custom scope, both applications must use the same scope.

**Called on a `ShareTypedStorage` value** — 13 members

| Member | Signature |
| --- | --- |
| [`getBool`](#zosstoragesharetypedstoragegetbool) | `getBool(key: string, defaultValue: boolean): boolean` |
| [`getInt`](#zosstoragesharetypedstoragegetint) | `getInt(key: string, defaultValue: number): number` |
| [`getInt64`](#zosstoragesharetypedstoragegetint64) | `getInt64(key: string, defaultValue: number): number` |
| [`getDouble`](#zosstoragesharetypedstoragegetdouble) | `getDouble(key: string, defaultValue: number): number` |
| [`getString`](#zosstoragesharetypedstoragegetstring) | `getString(key: string, defaultValue: string): string` |
| [`putBool`](#zosstoragesharetypedstorageputbool) | `putBool(key: string, value: boolean): number` |
| [`putInt`](#zosstoragesharetypedstorageputint) | `putInt(key: string, value: number): number` |
| [`putInt64`](#zosstoragesharetypedstorageputint64) | `putInt64(key: string, value: number): number` |
| [`putDouble`](#zosstoragesharetypedstorageputdouble) | `putDouble(key: string, value: number): number` |
| [`putString`](#zosstoragesharetypedstorageputstring) | `putString(key: string, value: string): number` |
| [`has`](#zosstoragesharetypedstoragehas) | `has(key: string): boolean` |
| [`clear`](#zosstoragesharetypedstorageclear) | `clear(): void` |
| [`remove`](#zosstoragesharetypedstorageremove) | `remove(key: string): boolean` |

#### `@zos/storage.ShareTypedStorage.getBool`

Get a boolean value

```ts
getBool(key: string, defaultValue: boolean): boolean
```

#### `@zos/storage.ShareTypedStorage.getInt`

Get an integer value

```ts
getInt(key: string, defaultValue: number): number
```

#### `@zos/storage.ShareTypedStorage.getInt64`

Get a 64-bit integer value

```ts
getInt64(key: string, defaultValue: number): number
```

#### `@zos/storage.ShareTypedStorage.getDouble`

Get a double value

```ts
getDouble(key: string, defaultValue: number): number
```

#### `@zos/storage.ShareTypedStorage.getString`

Get a string value

```ts
getString(key: string, defaultValue: string): string
```

#### `@zos/storage.ShareTypedStorage.putBool`

Set a boolean value

```ts
putBool(key: string, value: boolean): number
```

#### `@zos/storage.ShareTypedStorage.putInt`

Set an integer value

```ts
putInt(key: string, value: number): number
```

#### `@zos/storage.ShareTypedStorage.putInt64`

Set a 64-bit integer value

```ts
putInt64(key: string, value: number): number
```

#### `@zos/storage.ShareTypedStorage.putDouble`

Set a double value

```ts
putDouble(key: string, value: number): number
```

#### `@zos/storage.ShareTypedStorage.putString`

Set a string value

```ts
putString(key: string, value: string): number
```

#### `@zos/storage.ShareTypedStorage.has`

Check whether a key exists

```ts
has(key: string): boolean
```

#### `@zos/storage.ShareTypedStorage.clear`

Clear all shared typed storage data

```ts
clear(): void
```

#### `@zos/storage.ShareTypedStorage.remove`

Delete a value by key

```ts
remove(key: string): boolean
```

### `@zos/storage.TypedStorage`

Typed key-value storage backed by system properties. Suitable for primitive values such as booleans, numbers and strings..

**Called on a `TypedStorage` value** — 13 members

| Member | Signature |
| --- | --- |
| [`getBool`](#zosstoragetypedstoragegetbool) | `getBool(key: string, defaultValue: boolean): boolean` |
| [`getInt`](#zosstoragetypedstoragegetint) | `getInt(key: string, defaultValue: number): number` |
| [`getInt64`](#zosstoragetypedstoragegetint64) | `getInt64(key: string, defaultValue: number): number` |
| [`getDouble`](#zosstoragetypedstoragegetdouble) | `getDouble(key: string, defaultValue: number): number` |
| [`getString`](#zosstoragetypedstoragegetstring) | `getString(key: string, defaultValue: string): string` |
| [`putBool`](#zosstoragetypedstorageputbool) | `putBool(key: string, value: boolean): number` |
| [`putInt`](#zosstoragetypedstorageputint) | `putInt(key: string, value: number): number` |
| [`putInt64`](#zosstoragetypedstorageputint64) | `putInt64(key: string, value: number): number` |
| [`putDouble`](#zosstoragetypedstorageputdouble) | `putDouble(key: string, value: number): number` |
| [`putString`](#zosstoragetypedstorageputstring) | `putString(key: string, value: string): number` |
| [`has`](#zosstoragetypedstoragehas) | `has(key: string): boolean` |
| [`clear`](#zosstoragetypedstorageclear) | `clear(): void` |
| [`remove`](#zosstoragetypedstorageremove) | `remove(key: string): boolean` |

#### `@zos/storage.TypedStorage.getBool`

Get a boolean value

```ts
getBool(key: string, defaultValue: boolean): boolean
```

#### `@zos/storage.TypedStorage.getInt`

Get an integer value

```ts
getInt(key: string, defaultValue: number): number
```

#### `@zos/storage.TypedStorage.getInt64`

Get a 64-bit integer value

```ts
getInt64(key: string, defaultValue: number): number
```

#### `@zos/storage.TypedStorage.getDouble`

Get a double value

```ts
getDouble(key: string, defaultValue: number): number
```

#### `@zos/storage.TypedStorage.getString`

Get a string value

```ts
getString(key: string, defaultValue: string): string
```

#### `@zos/storage.TypedStorage.putBool`

Set a boolean value

```ts
putBool(key: string, value: boolean): number
```

#### `@zos/storage.TypedStorage.putInt`

Set an integer value

```ts
putInt(key: string, value: number): number
```

#### `@zos/storage.TypedStorage.putInt64`

Set a 64-bit integer value

```ts
putInt64(key: string, value: number): number
```

#### `@zos/storage.TypedStorage.putDouble`

Set a double value

```ts
putDouble(key: string, value: number): number
```

#### `@zos/storage.TypedStorage.putString`

Set a string value

```ts
putString(key: string, value: string): number
```

#### `@zos/storage.TypedStorage.has`

Check whether a key exists

```ts
has(key: string): boolean
```

#### `@zos/storage.TypedStorage.clear`

Clear all typed storage data

```ts
clear(): void
```

#### `@zos/storage.TypedStorage.remove`

Delete a value by key

```ts
remove(key: string): boolean
```

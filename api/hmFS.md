# hmFS

**20 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `close` | function | not stated | OFFICIAL |
| `open` | function | not stated | OFFICIAL |
| `open_asset` | function | not stated | OFFICIAL |
| `read` | function | not stated | OFFICIAL |
| `remove` | function | not stated | OFFICIAL |
| `rename` | function | not stated | OFFICIAL |
| `seek` | function | not stated | OFFICIAL |
| `stat` | function | not stated | OFFICIAL |
| `stat_asset` | function | not stated | OFFICIAL |
| `SysProGetBool` | function | not stated | OFFICIAL |
| `SysProGetChars` | function | not stated | OFFICIAL |
| `SysProGetDouble` | function | not stated | OFFICIAL |
| `SysProGetInt` | function | not stated | OFFICIAL |
| `SysProGetInt64` | function | not stated | OFFICIAL |
| `SysProSetBool` | function | not stated | OFFICIAL |
| `SysProSetChars` | function | not stated | OFFICIAL |
| `SysProSetDouble` | function | not stated | OFFICIAL |
| `SysProSetInt` | function | not stated | OFFICIAL |
| `SysProSetInt64` | function | not stated | OFFICIAL |
| `write` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmFS.close`

Close file

```ts
(fileId: number) => result
```

### `hmFS.open`

Open file

```ts
(path: string, flag: FLAG) => fileId
```

**FLAG**

| Value | Description |
| --- | --- |
| `O_APPEND` | Append mode on. |
| `O_CREAT` | If file does not exist, create and open. |
| `O_EXCL` | Used in conjunction with O_CREAT. If it does not exist, create and open it, if it does exist, return an error. |
| `O_RDONLY` | read-only |
| `O_RDWR` | read-write |
| `O_TRUNC` | If the file exists, the length is truncated to 0. |
| `O_WRONLY` | write-only |

### `hmFS.open_asset`

Open the file in the application assets directory.

```ts
(path: string, flag: FLAG) => fileId
```

**FLAG**

| Value | Description |
| --- | --- |
| `O_APPEND` | Append mode on |
| `O_CREAT` | If file does not exist, create and open |
| `O_EXCL` | Used in conjunction with O_CREAT. If it does not exist, create and open it, if it does exist, return an error. |
| `O_RDONLY` | read-only |
| `O_RDWR` | read-write |
| `O_TRUNC` | If the file exists, the length is truncated to 0 |
| `O_WRONLY` | write-only |

### `hmFS.read`

Read file

```ts
(fileId: number, buffer: ArrayBuffer, position: number, length: number) => [fileList, err]
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `fileId` | `number` | yes | — | file handle |
| `buff` | `ArrayBuffer` | yes | — | The buffer that will be filled with the read file data |
| `pos` | `number` | yes | — | Offset based on buff first address |
| `len` | `number` | yes | — | the number of bytes to read |

### `hmFS.remove`

Delete file

```ts
(path: string) => result
```

### `hmFS.rename`

Rename file

```ts
(oldPath: string, newPath: string) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `oldPath` | `string` | yes | — | old file path |
| `newPath` | `string` | yes | — | new file path |

### `hmFS.seek`

Move file pointer

```ts
(fileId: number, position: number, whence: number) => void
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `fileId` | `number` | yes | — | file handle |
| `position` | `number` | yes | — | Offset based on whence |
| `whence` | `number` | yes | — | file location |

### `hmFS.stat`

Get file information

```ts
(path: string) => [stat, err]
```

**stat**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `number` | not stated | — | Number of bytes of the file |
| `mtime` | `number` | not stated | — | File last modified time in UTC seconds |

### `hmFS.stat_asset`

Get information about the files in the application assets directory.

```ts
(path: string) => [stat, err]
```

**stat**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `number` | not stated | — | Number of bytes of the file |
| `mtime` | `number` | not stated | — | File last modified time in UTC seconds |

### `hmFS.SysProGetBool`

Get the temporarily stored boolean value, which will be cleared by system reboot.

```ts
(key: string) => result
```

### `hmFS.SysProGetChars`

Get the temporarily stored string, system reboot will clear it.

```ts
(key: string) => result
```

### `hmFS.SysProGetDouble`

Get the temporarily stored double precision character points, system reboot will clear.

```ts
(key: string) => result
```

### `hmFS.SysProGetInt`

Get the temporarily stored integer that will be cleared by system reboot.

```ts
(key: string) => result
```

### `hmFS.SysProGetInt64`

Get a 64-bit integer for temporary storage, which will be cleared by system reboot.

```ts
(key: string) => result
```

### `hmFS.SysProSetBool`

Store temporary boolean value, system reboot will clear it.

```ts
(key: string, val: boolean) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | yes | — | key string |
| `val` | `boolean` | yes | — | Stored boolean value |

### `hmFS.SysProSetChars`

Store temporary string, system reboot will clear.

```ts
(key: string, val: string) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | yes | — | key string |
| `val` | `string` | yes | — | the stored string |

### `hmFS.SysProSetDouble`

Store temporary double precision floating point numbers, system reboot will clear.

```ts
(key: string, val: number) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | yes | — | key string |
| `val` | `number` | yes | — | The double-precision floating point number to store |

### `hmFS.SysProSetInt`

Store temporary integer, system reboot will clear.

```ts
(key: string, val: number) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | yes | — | key string |
| `val` | `number` | yes | — | the stored integer |

### `hmFS.SysProSetInt64`

Stores a temporary 64-bit integer that will be cleared by system reboot.

```ts
(key: string, val: number) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | yes | — | key string |
| `val` | `number` | yes | — | Stored 64-bit integer |

### `hmFS.write`

Write to file

```ts
(fileId: number, buff: ArrayBuffer, pos: number, len: number) => result
```

**Parameters**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `fileId` | `number` | yes | — | file handle |
| `buff` | `ArrayBuffer` | yes | — | The buffer that will be filled with the read file data |
| `pos` | `number` | yes | — | Offset based on buff first address |
| `len` | `number` | yes | — | the number of bytes to write |

**result**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `result` | `number` | not stated | — | The result of the operation, 0 means success |

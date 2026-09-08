# @zos/fs

**20 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `closeSync` | function | >= 2 | OFFICIAL |
| `mkdirSync` | function | >= 2 | OFFICIAL |
| `O_APPEND` | constant | >= 2 | OFFICIAL |
| `O_CREAT` | constant | >= 2 | OFFICIAL |
| `O_EXCL` | constant | >= 2 | OFFICIAL |
| `O_RDONLY` | constant | >= 2 | OFFICIAL |
| `O_RDWR` | constant | >= 2 | OFFICIAL |
| `O_TRUNC` | constant | >= 2 | OFFICIAL |
| `O_WRONLY` | constant | >= 2 | OFFICIAL |
| `openAssetsSync` | function | >= 2 | OFFICIAL |
| `openSync` | function | >= 2 | OFFICIAL |
| `readdirSync` | function | >= 2 | OFFICIAL |
| `readFileSync` | function | >= 2 | OFFICIAL |
| `readSync` | function | >= 2 | OFFICIAL |
| `renameSync` | function | >= 2 | OFFICIAL |
| `rmSync` | function | >= 2 | OFFICIAL |
| `statAssetsSync` | function | >= 2 | OFFICIAL |
| `statSync` | function | >= 2 | OFFICIAL |
| `writeFileSync` | function | >= 2 | OFFICIAL |
| `writeSync` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/fs.closeSync`

Close the file handle synchronously.

```ts
function closeSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `fd` | `number` | not stated | — | >= 2 | File handle, returned by the openSync, openAssetsSync and other APIs |

### `@zos/fs.mkdirSync`

Synchronously create a directory in the `/data` directory of the Mini Program.

```ts
function mkdirSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | Directory path |

### `@zos/fs.O_APPEND`

Flag indicating that data will be appended to the end of the file

### `@zos/fs.O_CREAT`

Flag indicating to create the file if it does not already exist

### `@zos/fs.O_EXCL`

Flag indicating that opening a file should fail if the `O_CREAT` flag is set and the file already exists

### `@zos/fs.O_RDONLY`

Flag indicating to open a file for read-only access

### `@zos/fs.O_RDWR`

Flag indicating to open a file for read-write access

### `@zos/fs.O_TRUNC`

Flag indicating that if the file exists and the file is opened successfully for write access, its length shall be truncated to zero

### `@zos/fs.O_WRONLY`

Flag indicating to open a file for write-only access

### `@zos/fs.openAssetsSync`

Open the file in the `/assets` directory of the Mini Program synchronously and get the file handle.

```ts
function openAssetsSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |
| `flag` | `number` | not stated | `O_RDONLY` | >= 2 | Value refer to file open constants |

### `@zos/fs.openSync`

Open the file in the `/data` directory of the Mini Program synchronously and get the file handle.

```ts
function openSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |
| `flag` | `number` | not stated | `O_RDONLY` | >= 2 | Value refer to file open constants |
| `options` | `Options` | not stated | — | >= 3 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `appId` | `number` | not stated | — | >= 3 | Mini Program ID, you can open the file in the /data directory of the Mini Program with the corresponding ID |

### `@zos/fs.readdirSync`

Read the directory under the `/data` directory of the Mini Program synchronously.

```ts
function readdirSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | Directory path |

### `@zos/fs.readFileSync`

Returns the entire contents of the specified file in the `/data` directory of the Mini Program.

```ts
function readFileSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |
| `options` | `Options` | not stated | — | >= 2 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `encoding` | `string` | not stated | — | >= 2 | When the encoding method is specified, the API returns string as the result |

### `@zos/fs.readSync`

Synchronously reads the content from the file specified by the file handle into the given `ArrayBuffer`..

```ts
function readSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `fd` | `number` | not stated | — | >= 2 | File handle, returned by the openSync, openAssetsSync and other APIs |
| `buffer` | `ArrayBuffer` | not stated | — | >= 2 | The ArrayBuffer that the data will be written to |
| `options` | `Options` | not stated | — | >= 2 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `offset` | `number` | not stated | `0` | >= 2 | The position in buffer to write the data to |
| `length` | `number` | not stated | `buffer.byteLength` | >= 2 | The number of bytes to read, the default is the number of bytes passed into the buffer |
| `position` | `number&#124;null` | not stated | `null` | >= 2 | Specifies the position from which to start reading from the file. If position is null, the data will be read from the current file position and the file position will be updated |

### `@zos/fs.renameSync`

Rename the files in the `/data` directory of the Mini Program, renaming the files from `oldPath` to `newPath`.

```ts
function renameSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `oldPath` | `string` | not stated | — | >= 2 | Old path |
| `newPath` | `string` | not stated | — | >= 2 | New path |

### `@zos/fs.rmSync`

Synchronously delete files in the `/data` directory of the Mini Program.

```ts
function rmSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |

### `@zos/fs.statAssetsSync`

Synchronously gets information about the files in the Mini Program `/assets` directory.

```ts
function statAssetsSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |

**FSStat**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `size` | `number` | not stated | — | >= 2 | The size of the file in bytes |

### `@zos/fs.statSync`

Get information about the files in the `/data` directory of the Mini Program synchronously.

```ts
function statSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string` | not stated | — | >= 2 | path |

**FSStat**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `size` | `number` | not stated | — | >= 2 | The size of the file in bytes |

### `@zos/fs.writeFileSync`

Synchronously write data to a file in the `/data` directory of the Mini Program, replacing the file if it already exists, or creating a new file if it doesn't.

```ts
function writeFileSync(option: Option): void
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string&#124;number` | not stated | — | >= 2 | File path or file descriptor |
| `data` | `ArrayBuffer&#124;string&#124;DataView` | not stated | — | >= 2 | Data to be written to the target file |
| `options` | `Options` | not stated | — | >= 2 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `encoding` | `string` | not stated | `utf8` | >= 2 | If the data format is string, you need to specify the encoding method |

### `@zos/fs.writeSync`

Synchronously write ArrayBuffer to the file specified by fd.

```ts
function writeSync(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `fd` | `number` | not stated | — | >= 2 | File handle, returned by the openSync, openAssetsSync and other APIs |
| `buffer` | `ArrayBuffer` | not stated | — | >= 2 | The buffer that the data will be written to |
| `options` | `Options` | not stated | — | >= 2 | Other Options |

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `offset` | `number` | not stated | `0` | >= 2 | Based on first address offset in ArrayBuffer to write the data |
| `length` | `number` | not stated | `buffer.byteLength` | >= 2 | The number of bytes to write, the default is the length of the incoming buffer |
| `position` | `number&#124;null` | not stated | `null` | >= 2 | Position refers to the offset from the beginning of the file where this data should be written. If position is 'null', the data will be written at the and the file position will be updated |

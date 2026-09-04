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

## Descriptions

### `@zos/fs.closeSync`

Close the file handle synchronously.

### `@zos/fs.mkdirSync`

Synchronously create a directory in the `/data` directory of the Mini Program.

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

### `@zos/fs.openSync`

Open the file in the `/data` directory of the Mini Program synchronously and get the file handle.

### `@zos/fs.readdirSync`

Read the directory under the `/data` directory of the Mini Program synchronously.

### `@zos/fs.readFileSync`

Returns the entire contents of the specified file in the `/data` directory of the Mini Program.

### `@zos/fs.readSync`

Synchronously reads the content from the file specified by the file handle into the given `ArrayBuffer`..

### `@zos/fs.renameSync`

Rename the files in the `/data` directory of the Mini Program, renaming the files from `oldPath` to `newPath`.

### `@zos/fs.rmSync`

Synchronously delete files in the `/data` directory of the Mini Program.

### `@zos/fs.statAssetsSync`

Synchronously gets information about the files in the Mini Program `/assets` directory.

### `@zos/fs.statSync`

Get information about the files in the `/data` directory of the Mini Program synchronously.

### `@zos/fs.writeFileSync`

Synchronously write data to a file in the `/data` directory of the Mini Program, replacing the file if it already exists, or creating a new file if it doesn't.

### `@zos/fs.writeSync`

Synchronously write ArrayBuffer to the file specified by fd.

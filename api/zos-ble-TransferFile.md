# @zos/ble/TransferFile

Part of [`@zos/ble`](zos-ble.md).

**1 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `TransferFile` | value | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/ble/TransferFile.TransferFile`

File Transfer.

**Called on a `TransferFile` value** — 2 members

| Member | Signature |
| --- | --- |
| [`getInbox`](#zosbletransferfiletransferfilegetinbox) | `getInbox(): Inbox` |
| [`getOutbox`](#zosbletransferfiletransferfilegetoutbox) | `getOutbox(): Outbox` |

#### `@zos/ble/TransferFile.TransferFile.getInbox`

Get the receiving file object

```ts
getInbox(): Inbox
```

**Inbox**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `getNextFile` | `() =&#62; FileObject` | not stated | — | >= 3 | Return FileObject to receive the file object |
| `on` | `(eventName: InboxEventName, callback: () =&#62; void) =&#62; void` | not stated | — | >= 3 | Listening event, event name reference InboxEventName |

**FileObject**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `sessionId` | `number` | not stated | — | >= 3 | Session identifier for transferring files |
| `fileName` | `string` | not stated | — | >= 3 | File name |
| `filePath` | `string` | not stated | — | >= 3 | File path |
| `params` | `object` | not stated | — | >= 3 | User passed parameters |
| `fileSize` | `number` | not stated | — | >= 3 | File size |
| `readyState` | `ReceiveFileState` | not stated | — | >= 3 | For the status value of the received file, see 'ReceiveFileState' |
| `cancel` | `() =&#62; void` | not stated | — | >= 3 | Cancel a file transfer task |
| `on` | `(eventName: FileEventName, callback: ChangeCallback&#124;ProgressCallback) =&#62; void` | not stated | — | >= 3 | Listen to the file transfer task event, event name reference FileEventName |

**ChangeEvent**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `'readyStateChanged'` | not stated | — | >= 3 | Event type, value is  readyStateChanged string |
| `date` | `ChangeEventData` | not stated | — | >= 3 | Event data object, see ChangeEventData for type |
| `timestamp` | `number` | not stated | — | >= 3 | UTC timestamp of the event, in milliseconds |

**ChangeEventData**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `readyState` | `string` | not stated | — | >= 3 | File transfer task status |

**ProgressEvent**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `'progress'` | not stated | — | >= 3 | Event type, value is progress string |
| `date` | `ProgressEventData` | not stated | — | >= 3 | Event data object, see ProgressEventData for type |
| `timestamp` | `number` | not stated | — | >= 3 | UTC timestamp at the time of the event |

**ProgressEventData**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `fileSize` | `number` | not stated | — | >= 3 | File size in bytes |
| `loadedSize` | `number` | not stated | — | >= 3 | The size of the transferred file in bytes |

**InboxEventName**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `NEWFILE` | `string` | >= 3 | The event that just received the file |
| `FILE` | `string` | >= 3 | The event that completed receiving the file |

**ReceiveFileState**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `pending` | `string` | >= 3 | Pending |
| `transferring` | `string` | >= 3 | Transferring |
| `transferred` | `string` | >= 3 | Transferred |
| `error` | `string` | >= 3 | Error |
| `canceled` | `string` | >= 3 | Canceled |

**FileEventName**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `change` | `string` | >= 3 | The event name that occurs when readyState changes state, corresponding to the ChangeCallback callback function |
| `progress` | `string` | >= 3 | The event name when the file transfer progress changes, corresponding to the ProgressCallback callback function |

#### `@zos/ble/TransferFile.TransferFile.getOutbox`

Get the sending file object

```ts
getOutbox(): Outbox
```

**Outbox**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `enqueueFile` | `(fileName: string, params?: object) =&#62; getInbox.FileObject` | not stated | — | >= 3 | Returns FileObject, fileName is the path to the file, and params is a customized file transfer object, retrieved from FileObject on the receiving end. The getInbox.FileObject type is referenced above |

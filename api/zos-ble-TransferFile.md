# @zos/ble/TransferFile

**1 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `TransferFile` | value | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/ble/TransferFile.TransferFile`

File Transfer.

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

**Outbox**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `enqueueFile` | `(fileName: string, params?: object) =&#62; getInbox.FileObject` | not stated | — | >= 3 | Returns FileObject, fileName is the path to the file, and params is a customized file transfer object, retrieved from FileObject on the receiving end. The getInbox.FileObject type is referenced above |

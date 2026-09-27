# @zos/ble

**Also in this namespace:** [`@zos/ble/TransferFile`](zos-ble-TransferFile.md) (1 symbols).

**30 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addListener` | function | >= 2 | OFFICIAL |
| `connectStatus` | function | >= 2 | OFFICIAL |
| `createConnect` | function | >= 2 | OFFICIAL |
| `disConnect` | function | >= 2 | OFFICIAL |
| `mstBuildProfile` | function | >= 3 | OFFICIAL |
| `mstConnect` | function | >= 3 | OFFICIAL |
| `mstDestroyProfileInstance` | function | >= 3 | OFFICIAL |
| `mstDisconnect` | function | >= 3 | OFFICIAL |
| `mstGetConnIdByRemoteAddr` | function | >= 3 | OFFICIAL |
| `mstGetProfileInstance` | function | >= 3 | OFFICIAL |
| `mstOffAllCb` | function | >= 3 | OFFICIAL |
| `mstOnCharaNotification` | function | >= 3 | OFFICIAL |
| `mstOnCharaReadComplete` | function | >= 3 | OFFICIAL |
| `mstOnCharaValueArrived` | function | >= 3 | OFFICIAL |
| `mstOnCharaWriteComplete` | function | >= 3 | OFFICIAL |
| `mstOnDescValueArrived` | function | >= 3 | OFFICIAL |
| `mstOnDescWriteComplete` | function | >= 3 | OFFICIAL |
| `mstOnPrepare` | function | >= 3 | OFFICIAL |
| `mstOnServiceChangeBegin` | function | >= 3 | OFFICIAL |
| `mstOnServiceChangeEnd` | function | >= 3 | OFFICIAL |
| `mstPair` | function | >= 3 | OFFICIAL |
| `mstPrepare` | function | >= 3 | OFFICIAL |
| `mstReadCharacteristic` | function | >= 3 | OFFICIAL |
| `mstReadDescriptor` | function | >= 3 | OFFICIAL |
| `mstStartScan` | function | >= 3 | OFFICIAL |
| `mstStopScan` | function | >= 3 | OFFICIAL |
| `mstWriteCharacteristic` | function | >= 3 | OFFICIAL |
| `mstWriteDescriptor` | function | >= 3 | OFFICIAL |
| `removeListener` | function | >= 2 | OFFICIAL |
| `send` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/ble.addListener`

Registering connection status listening callback function.

```ts
function addListener(callback: Callback): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(status?: boolean) =&#62; void` | Connection callback function, status Connection status |

### `@zos/ble.connectStatus`

Query connection status, `true` means connected, `false` means not connected.

```ts
function connectStatus(): boolean
```

### `@zos/ble.createConnect`

Create connection.

```ts
function createConnect(callback: Callback): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(index?: number, data?: object, size?: number) =&#62; void` | Connection callback function, index packet number, data data, size data length |

### `@zos/ble.disConnect`

Disconnect.

```ts
function disConnect(): void
```

### `@zos/ble.mstBuildProfile`

Creating a Profile connection.

```ts
function mstBuildProfile(profile: ProfileObj): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

**ProfileObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `pair` | `boolean` | not stated | — | >= 3 | Whether to pair automatically |
| `id` | `number` | not stated | — | >= 3 | Connection ID |
| `profile` | `string` | not stated | — | >= 3 | Profile Name |
| `dev` | `ArrayBuffer` | not stated | — | >= 3 | Device MAC address, 6 bytes long, Uint8Array view recommended |
| `len` | `number` | not stated | — | >= 3 | list array length |
| `list` | `Array&#60;ServicesObj&#62;` | not stated | — | >= 3 | Services list array |

**ServicesObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `len` | `number` | not stated | — | >= 3 | list array length |
| `list` | `Array&#60;ServiceObj&#62;` | not stated | — | >= 3 | Service array |

**ServiceObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `uuid` | `string` | not stated | — | >= 3 | Service UUID |
| `permission` | `number` | not stated | `0` | >= 3 | Permission control, default 0 No control |
| `len1` | `number` | not stated | — | >= 3 | Characteristic array length |
| `list` | `Array&#60;CharacteristicObj&#62;` | not stated | — | >= 3 | Characteristic length |

**CharacteristicObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `uuid` | `string` | not stated | — | >= 3 | Characteristic UUID |
| `permission` | `number` | not stated | `0` | >= 3 | Permission control, default 0 No control |
| `len` | `number` | not stated | — | >= 3 | Descriptor array length |
| `list` | `Array&#60;DescriptorObj&#62;` | not stated | — | >= 3 | Descriptor array |

**DescriptorObj**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `uuid` | `string` | not stated | — | >= 3 | Descriptor UUID |
| `permission` | `number` | not stated | `0` | >= 3 | Permission control, default 0 No control |

### `@zos/ble.mstConnect`

Connecting Devices.

```ts
function mstConnect(deviceAddress: DeviceAddress, callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `DeviceAddress` | `ArrayBuffer` | Device MAC address, 6 bytes long, Uint8Array view recommended |
| `Callback` | `(result: ConnectResult) =&#62; void` | Connection result callback function |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

**ConnectResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `connected` | `number` | not stated | — | >= 3 | Connection status, 0 - successful connection, 1 - failed connection, 2 - disconnected |
| `connect_id` | `number` | not stated | — | >= 3 | The ID of the connection is returned when the connection is successful |
| `dev_addr` | `ArrayBuffer` | not stated | — | >= 3 | Device MAC address, 6 bytes long, Uint8Array view recommended |

### `@zos/ble.mstDestroyProfileInstance`

Destroy Profile.

```ts
function mstDestroyProfileInstance(profile: Profile): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | Profile pointer |

### `@zos/ble.mstDisconnect`

Disconnecting devices.

```ts
function mstDisconnect(connectId: ConnectId): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `ConnectId` | `number` | The connection ID returned when the connection is successful using the mstConnect API |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstGetConnIdByRemoteAddr`

Look up the connection Id based on the Peripheral MAC address.

```ts
function mstGetConnIdByRemoteAddr(deviceAddress: DeviceAddress): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `DeviceAddress` | `ArrayBuffer` | Device MAC address, 6 bytes long, Uint8Array view recommended |
| `Result` | `number&#124;undefined` | **returned** — The result of the function call returns connectId for a successful query and undefined for a failed query. |

### `@zos/ble.mstGetProfileInstance`

Query Profile pointer based on Profile name and connection ID.

```ts
function mstGetProfileInstance(profileName: ProfileName, connectId: ConnectId): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `ProfileName` | `string` | Profile name |
| `ConnectId` | `number` | The ID returned on a successful connection |
| `Result` | `number&#124;undefined` | **returned** — A successful search returns the Profile pointer, a failed search returns undefined |

### `@zos/ble.mstOffAllCb`

Unregister of all registered Bluetooth-related callback functions.

```ts
function mstOffAllCb(): void
```

### `@zos/ble.mstOnCharaNotification`

Register Characteristic Notification to reach the callback function.

```ts
function mstOnCharaNotification(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, uuid: UUID, data: Data, length: Length) =&#62; void` | Characteristic Notification arrives at the callback function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `Data` | `ArrayBuffer` | It is recommended to use the Uint8Array view to read the data |
| `Length` | `number` | Data length |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnCharaReadComplete`

Register the read Characteristic completion callback function.

```ts
function mstOnCharaReadComplete(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, uuid: UUID, status: Status) =&#62; void` | Read Characteristic Completion Callback Function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnCharaValueArrived`

Register to read Characteristic data to the callback function.

```ts
function mstOnCharaValueArrived(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, uuid: UUID, data: Data, status: Status) =&#62; void` | Read Characteristic data to the callback function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `Data` | `ArrayBuffer` | Reads the data using the Uint8Array view |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnCharaWriteComplete`

Register the Write Characteristic data completion callback function.

```ts
function mstOnCharaWriteComplete(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, uuid: UUID, status: Status) =&#62; void` | Write Characteristic Data Completion Callback Function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnDescValueArrived`

Register the Read Descriptor data arrival callback function.

```ts
function mstOnDescValueArrived(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `( profile: Profile, uuid: UUID, descUUID: DescUUID, data: Data, status: Status, ) =&#62; void` | Read Descriptor data to the callback function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `DescUUID` | `string` | Descriptor UUID string |
| `Data` | `ArrayBuffer` | Reads the data using the Uint8Array view |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnDescWriteComplete`

Register Descriptor data write completion callback function.

```ts
function mstOnDescWriteComplete(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, uuid: UUID, descUUID: DescUUID, status: Status) =&#62; void` | Descriptor Data write completion callback function |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `DescUUID` | `string` | Descriptor UUID string |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnPrepare`

Register the prepare operation callback function.

```ts
function mstOnPrepare(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile, status: Status) =&#62; void` | Listening to the prepare event callback function |
| `Profile` | `number` | Profile pointer |
| `Status` | `number` | Status, 0 indicates success |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnServiceChangeBegin`

Register the Service start change callback function.

```ts
function mstOnServiceChangeBegin(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile) =&#62; void` | Service start change callback function |
| `Profile` | `number` | Profile pointer |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstOnServiceChangeEnd`

Register the Service change end callback function.

```ts
function mstOnServiceChangeEnd(callback: Callback): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(profile: Profile) =&#62; void` | Service change end callback function |
| `Profile` | `number` | Profile pointer |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstPair`

Pairing with devices via `connectId`.

```ts
function mstPair(connectId: ConnectId): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `ConnectId` | `number` | The connection ID returned when the connection is successful using the mstConnect API |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstPrepare`

prepare interface.

```ts
function mstPrepare(profile: Profile): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | The profile pointer returned by mstBuildProfile |

### `@zos/ble.mstReadCharacteristic`

Read Characteristic information.

```ts
function mstReadCharacteristic(profile: Profile, uuid: UUID): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |

### `@zos/ble.mstReadDescriptor`

Write characteristic information.

```ts
function mstReadDescriptor(profile: Profile, uuid: UUID, descUUID: DescUUID): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `DescUUID` | `string` | Descriptor UUID string |

### `@zos/ble.mstStartScan`

Scan and discover Bluetooth peripherals, which can be filtered according to filter conditions.

```ts
function mstStartScan(callback: Callback, filter?: Filter): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Callback` | `(result: ScanResult, filter?: Filter, timeout?: Timeout) =&#62; void` | Callback function for receiving scan results |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

**ScanResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `dev_name` | `string` | not stated | — | >= 3 | Device name |
| `dev_addr` | `ArrayBuffer` | not stated | — | >= 3 | Device MAC address, 6 bytes long, Uint8Array view recommended |
| `rssi` | `number` | not stated | — | >= 3 | RSSI Signal Strength |
| `service_uuid_array` | `Array&#60;string&#62;` | not stated | — | >= 3 | Service UUID array in broadcast data |
| `service_data_array` | `Array&#60;ServiceData&#62;` | not stated | — | >= 3 | Array of Service Data Objects in Broadcast Data |

**ServiceData**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `uuid` | `string` | not stated | — | >= 3 | Service UUID |
| `service_data` | `ArrayBuffer` | not stated | — | >= 3 | Service data |

**Filter**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `device_name` | `string` | not stated | — | >= 3 | Device name |
| `fuzzy_mode` | `string` | not stated | — | >= 3 | Whether to use fuzzy mode for device name matching |
| `service_uuid` | `string` | not stated | — | >= 3 | Service UUID |
| `service_data_uuid` | `string` | not stated | — | >= 3 | Service data UUID |
| `manufacturer_id` | `number` | not stated | — | >= 3 | Manufacturer ID |

**Timeout**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `duration` | `number` | not stated | — | >= 3 | Scanning duration, in seconds. Scanning automatically stops when the given duration is reached |
| `on_timeout` | `() =&#62; void` | not stated | — | >= 3 | Callback function after scanning stops |

### `@zos/ble.mstStopScan`

Stop device scanning, used in conjunction with `mstStartScan`.

```ts
function mstStopScan(): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.mstWriteCharacteristic`

Write Characteristic information.

```ts
function mstWriteCharacteristic(profile: Profile, uuid: UUID, data: Data, length: Length): void
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `Data` | `ArrayBuffer` | Reads the data using the Uint8Array view |
| `Length` | `number` | Data length |

### `@zos/ble.mstWriteDescriptor`

Register the Characteristic notification arrival callback function.

```ts
function mstWriteDescriptor(
  profile: Profile,
  uuid: UUID,
  descUUID: DescUUID,
  data: Data,
  length: Length,
): Result
```

**Declares**

| Name | Type | Notes |
| --- | --- | --- |
| `Profile` | `number` | Profile pointer |
| `UUID` | `string` | Characteristic UUID string |
| `DescUUID` | `string` | Descriptor UUID string |
| `Data` | `ArrayBuffer` | Reads the data using the Uint8Array view |
| `Length` | `number` | Data length |
| `Result` | `boolean` | **returned** — The result of the function call, true means success, false means failure |

### `@zos/ble.removeListener`

Cancel connection status listening callback function.

```ts
function removeListener(): void
```

### `@zos/ble.send`

Send message, `data` data to be sent, `size` length of data to be sent.

```ts
function send(data: object, size: number): void
```

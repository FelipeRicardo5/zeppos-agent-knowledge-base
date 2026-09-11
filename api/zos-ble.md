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

### `@zos/ble.mstDisconnect`

Disconnecting devices.

```ts
function mstDisconnect(connectId: ConnectId): Result
```

### `@zos/ble.mstGetConnIdByRemoteAddr`

Look up the connection Id based on the Peripheral MAC address.

```ts
function mstGetConnIdByRemoteAddr(deviceAddress: DeviceAddress): Result
```

### `@zos/ble.mstGetProfileInstance`

Query Profile pointer based on Profile name and connection ID.

```ts
function mstGetProfileInstance(profileName: ProfileName, connectId: ConnectId): Result
```

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

### `@zos/ble.mstOnCharaReadComplete`

Register the read Characteristic completion callback function.

```ts
function mstOnCharaReadComplete(callback: Callback): Result
```

### `@zos/ble.mstOnCharaValueArrived`

Register to read Characteristic data to the callback function.

```ts
function mstOnCharaValueArrived(callback: Callback): Result
```

### `@zos/ble.mstOnCharaWriteComplete`

Register the Write Characteristic data completion callback function.

```ts
function mstOnCharaWriteComplete(callback: Callback): Result
```

### `@zos/ble.mstOnDescValueArrived`

Register the Read Descriptor data arrival callback function.

```ts
function mstOnDescValueArrived(callback: Callback): Result
```

### `@zos/ble.mstOnDescWriteComplete`

Register Descriptor data write completion callback function.

```ts
function mstOnDescWriteComplete(callback: Callback): Result
```

### `@zos/ble.mstOnPrepare`

Register the prepare operation callback function.

```ts
function mstOnPrepare(callback: Callback): Result
```

### `@zos/ble.mstOnServiceChangeBegin`

Register the Service start change callback function.

```ts
function mstOnServiceChangeBegin(callback: Callback): Result
```

### `@zos/ble.mstOnServiceChangeEnd`

Register the Service change end callback function.

```ts
function mstOnServiceChangeEnd(callback: Callback): Result
```

### `@zos/ble.mstPair`

Pairing with devices via `connectId`.

```ts
function mstPair(connectId: ConnectId): Result
```

### `@zos/ble.mstPrepare`

prepare interface.

```ts
function mstPrepare(profile: Profile): void
```

### `@zos/ble.mstReadCharacteristic`

Read Characteristic information.

```ts
function mstReadCharacteristic(profile: Profile, uuid: UUID): void
```

### `@zos/ble.mstReadDescriptor`

Write characteristic information.

```ts
function mstReadDescriptor(profile: Profile, uuid: UUID, descUUID: DescUUID): void
```

### `@zos/ble.mstStartScan`

Scan and discover Bluetooth peripherals, which can be filtered according to filter conditions.

```ts
function mstStartScan(callback: Callback, filter?: Filter): Result
```

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

### `@zos/ble.mstWriteCharacteristic`

Write Characteristic information.

```ts
function mstWriteCharacteristic(profile: Profile, uuid: UUID, data: Data, length: Length): void
```

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

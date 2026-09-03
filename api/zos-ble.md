# @zos/ble

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

## Descriptions

### `@zos/ble.addListener`

Registering connection status listening callback function.

### `@zos/ble.connectStatus`

Query connection status, `true` means connected, `false` means not connected.

### `@zos/ble.createConnect`

Create connection.

### `@zos/ble.disConnect`

Disconnect.

### `@zos/ble.mstBuildProfile`

Creating a Profile connection.

### `@zos/ble.mstConnect`

Connecting Devices.

### `@zos/ble.mstDestroyProfileInstance`

Destroy Profile.

### `@zos/ble.mstDisconnect`

Disconnecting devices.

### `@zos/ble.mstGetConnIdByRemoteAddr`

Look up the connection Id based on the Peripheral MAC address.

### `@zos/ble.mstGetProfileInstance`

Query Profile pointer based on Profile name and connection ID.

### `@zos/ble.mstOffAllCb`

Unregister of all registered Bluetooth-related callback functions.

### `@zos/ble.mstOnCharaNotification`

Register Characteristic Notification to reach the callback function.

### `@zos/ble.mstOnCharaReadComplete`

Register the read Characteristic completion callback function.

### `@zos/ble.mstOnCharaValueArrived`

Register to read Characteristic data to the callback function.

### `@zos/ble.mstOnCharaWriteComplete`

Register the Write Characteristic data completion callback function.

### `@zos/ble.mstOnDescValueArrived`

Register the Read Descriptor data arrival callback function.

### `@zos/ble.mstOnDescWriteComplete`

Register Descriptor data write completion callback function.

### `@zos/ble.mstOnPrepare`

Register the prepare operation callback function.

### `@zos/ble.mstOnServiceChangeBegin`

Register the Service start change callback function.

### `@zos/ble.mstOnServiceChangeEnd`

Register the Service change end callback function.

### `@zos/ble.mstPair`

Pairing with devices via `connectId`.

### `@zos/ble.mstPrepare`

prepare interface.

### `@zos/ble.mstReadCharacteristic`

Read Characteristic information.

### `@zos/ble.mstReadDescriptor`

Write characteristic information.

### `@zos/ble.mstStartScan`

Scan and discover Bluetooth peripherals, which can be filtered according to filter conditions.

### `@zos/ble.mstStopScan`

Stop device scanning, used in conjunction with `mstStartScan`.

### `@zos/ble.mstWriteCharacteristic`

Write Characteristic information.

### `@zos/ble.mstWriteDescriptor`

Register the Characteristic notification arrival callback function.

### `@zos/ble.removeListener`

Cancel connection status listening callback function.

### `@zos/ble.send`

Send message, `data` data to be sent, `size` length of data to be sent.

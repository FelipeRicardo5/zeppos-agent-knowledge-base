# hmSensor

**Also in this namespace:** [`hmSensor.id`](hmSensor.id.md) (18 symbols).

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addEventListener` | function | not stated | OFFICIAL |
| `createSensor` | function | not stated | OFFICIAL |
| `id` | constant | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `hmSensor.addEventListener`

Register sensor callback events Each sensor is used in a different way, please refer to the specific sensor usage

```ts
(eventId: EventId, callback: (event: Event) => void) => void
```

### `hmSensor.createSensor`

Create the sensor.

```ts
(sensor_id: SENSOR_ID) => result
```

### `hmSensor.id`

Its 18 values, and the shape each one returns, are in [`hmSensor.id`](hmSensor.id.md).

**id**

The documentation states this list is incomplete. Members below marked `OBSERVED` come from sample code, and neither source is the whole set.

| Value | Description |
| --- | --- |
| `id.BATTERY` | power sensor |
| `id.TIME` | time sensor |

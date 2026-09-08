# @zos/media

**3 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `create` | function | >= 3 | OFFICIAL |
| `Player` | value | >= 3 | OFFICIAL |
| `Recorder` | value | >= 3 | OFFICIAL |

## Symbols in detail

### `@zos/media.create`

Create a media player or recorder.

```ts
function create(controllerId: typeof id.PLAYER): Player
function create(controllerId: typeof id.RECORDER): Recorder
```

### `@zos/media.Player`

The media player controller sets audio sources, prepares playback resources, controls playback, and reads media information..

**source**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `FILE` | `number` | not stated | — | >= 3 | Play a specified audio file |

**event**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `PREPARE` | `number` | not stated | — | >= 3 | Asynchronous result of prepare() |
| `COMPLETE` | `number` | not stated | — | >= 3 | Audio playback completed |
| `PLAY` | `number` | not stated | — | >= 3 | Result after start() or resume() |
| `STOP` | `number` | not stated | — | >= 3 | Playback stopped |
| `PAUSE` | `number` | not stated | — | >= 3 | Playback paused |
| `PROGRESS` | `number` | not stated | — | >= 3 | Playback progress updated |

**state**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `IDLE` | `number` | not stated | — | >= 3 | Initial state |
| `INITIALIZED` | `number` | not stated | — | >= 3 | State after setSource() |
| `PREPARING` | `number` | not stated | — | >= 3 | Intermediate preparing state |
| `PREPARED` | `number` | not stated | — | >= 3 | Resources prepared |
| `STARTING` | `number` | not stated | — | >= 3 | Intermediate starting state |
| `PLAY` | `number` | not stated | — | >= 3 | Playback in progress |
| `PAUSING` | `number` | not stated | — | >= 3 | Intermediate pausing state |
| `PAUSED` | `number` | not stated | — | >= 3 | Playback paused |
| `RESUMING` | `number` | not stated | — | >= 3 | Intermediate resuming state |

### `@zos/media.Recorder`

The media recorder controller records audio to a file in the mini program `data` directory..

**event**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `START` | `number` | not stated | — | >= 3 | Result reported after recording starts |
| `STOP` | `number` | not stated | — | >= 3 | Recording stopped |

**state**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `IDLE` | `number` | not stated | — | >= 3 | Initial state |
| `PREPARING` | `number` | not stated | — | >= 3 | Requesting recording resources |
| `STARTING` | `number` | not stated | — | >= 3 | Starting recording |
| `RECORDING` | `number` | not stated | — | >= 3 | Recording in progress |

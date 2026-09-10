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

**Called on a `Player` value** — 16 members

A member states its own minimum `API_LEVEL`, and the symbol's does not imply
it. `not stated` here means the page gives that member no badge — not that it
is available wherever the symbol is.

| Member | Min API_LEVEL | Signature |
| --- | --- | --- |
| [`setSource`](#zosmediaplayersetsource) | not stated | `setSource(source: Player['source']['FILE'], options: { file: string }): void` |
| [`prepare`](#zosmediaplayerprepare) | not stated | `prepare(): void` |
| [`start`](#zosmediaplayerstart) | not stated | `start(): void` |
| [`pause`](#zosmediaplayerpause) | not stated | `pause(): void` |
| [`resume`](#zosmediaplayerresume) | not stated | `resume(): void` |
| [`stop`](#zosmediaplayerstop) | not stated | `stop(): void` |
| [`seek`](#zosmediaplayerseek) | >= 4.2 | `seek(percentage: number): boolean` |
| [`seekTo`](#zosmediaplayerseekto) | >= 4.3 | `seekTo(seconds: number): boolean` |
| [`getDuration`](#zosmediaplayergetduration) | not stated | `getDuration(): number` |
| [`getVolume`](#zosmediaplayergetvolume) | not stated | `getVolume(): number` |
| [`setVolume`](#zosmediaplayersetvolume) | not stated | `setVolume(volume: number): boolean` |
| [`getTitle`](#zosmediaplayergettitle) | not stated | `getTitle(): string | undefined` |
| [`getArtist`](#zosmediaplayergetartist) | not stated | `getArtist(): string | undefined` |
| [`getMediaInfo`](#zosmediaplayergetmediainfo) | not stated | `getMediaInfo(): {
      title: string | undefined
      artist: string | undefined
      duration: number
    }` |
| [`getStatus`](#zosmediaplayergetstatus) | not stated | `getStatus(): number` |
| [`addEventListener`](#zosmediaplayeraddeventlistener) | not stated | `addEventListener(event: number, callback: (result: boolean | number | undefined) => void): void` |

#### `@zos/media.Player.setSource`

Set playback parameters and specify the audio file path before playback starts. `player.source.FILE` supports MP3 files and OPUS files recorded with the audio API. `options.file` is relative to the mini program `assets` directory by default; use `data://` to access the `data` directory.

```ts
setSource(source: Player['source']['FILE'], options: { file: string }): void
```

#### `@zos/media.Player.prepare`

Prepare the player by checking the path, file format, and supported bitrate. On success, the player changes state and starts buffering media data; use the event listener to get the result.

```ts
prepare(): void
```

#### `@zos/media.Player.start`

Start playback

```ts
start(): void
```

#### `@zos/media.Player.pause`

Pause playback

```ts
pause(): void
```

#### `@zos/media.Player.resume`

Resume playback; has the same effect as calling `start()`

```ts
resume(): void
```

#### `@zos/media.Player.stop`

Stop playback

```ts
stop(): void
```

#### `@zos/media.Player.seek`

Set the playback position as a percentage of the total duration. `percentage` must be in [0 - 100]; the return value indicates whether the position was set successfully. - In `PREPARED`, playback starts automatically after `seek()` - In `PAUSED` or `PLAY`, the current state is preserved after `seek()`

```ts
seek(percentage: number): boolean
```

#### `@zos/media.Player.seekTo`

Set the playback position in seconds; equivalent to `seek()`

```ts
seekTo(seconds: number): boolean
```

#### `@zos/media.Player.getDuration`

Get the total duration of the current media file in seconds. A return value of `0` is invalid; the player must be in `PREPARED` to get the duration

```ts
getDuration(): number
```

#### `@zos/media.Player.getVolume`

Get the current system volume in the range [0 - 100]

```ts
getVolume(): number
```

#### `@zos/media.Player.setVolume`

Set the system volume in the range [0 - 100]. The return value indicates whether the setting succeeded; `true` means success

```ts
setVolume(volume: number): boolean
```

#### `@zos/media.Player.getTitle`

Get the title of the current media file; returns `undefined` on failure

```ts
getTitle(): string | undefined
```

#### `@zos/media.Player.getArtist`

Get the artist of the current media file; returns `undefined` on failure

```ts
getArtist(): string | undefined
```

#### `@zos/media.Player.getMediaInfo`

Get the title, artist, and duration of the current media file. `title` and `artist` are available after `setSource()`; `duration` requires the player to be in `PREPARED`

```ts
getMediaInfo(): {
      title: string | undefined
      artist: string | undefined
      duration: number
    }
```

#### `@zos/media.Player.getStatus`

Get the player state; see `player.state` for the meanings

```ts
getStatus(): number
```

#### `@zos/media.Player.addEventListener`

Listen for playback state changes; `callback` is triggered when the state changes

```ts
addEventListener(event: number, callback: (result: boolean | number | undefined) => void): void
```

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

**Called on a `Recorder` value** — 5 members

| Member | Signature |
| --- | --- |
| [`setFormat`](#zosmediarecordersetformat) | `setFormat(codecValue: typeof codec.OPUS, options: { target_file: string }): void` |
| [`start`](#zosmediarecorderstart) | `start(): void` |
| [`stop`](#zosmediarecorderstop) | `stop(): void` |
| [`getStatus`](#zosmediarecordergetstatus) | `getStatus(): number` |
| [`addEventListener`](#zosmediarecorderaddeventlistener) | `addEventListener(event: number, callback: (result: boolean | undefined) => void): void` |

#### `@zos/media.Recorder.setFormat`

Set the recording format and output file. Use a value from `codec`; `codec.OPUS` is currently supported. `options.target_file` specifies the output path in the mini program `data` directory, for example `data://record_file.opus`

```ts
setFormat(codecValue: typeof codec.OPUS, options: { target_file: string }): void
```

#### `@zos/media.Recorder.start`

Start recording

```ts
start(): void
```

#### `@zos/media.Recorder.stop`

Stop recording

```ts
stop(): void
```

#### `@zos/media.Recorder.getStatus`

Get the recorder state; see `recorder.state` for the meanings

```ts
getStatus(): number
```

#### `@zos/media.Recorder.addEventListener`

Listen for recorder state changes; `callback` is triggered when the state changes

```ts
addEventListener(event: number, callback: (result: boolean | undefined) => void): void
```

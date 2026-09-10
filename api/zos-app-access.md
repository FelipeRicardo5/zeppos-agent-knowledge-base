# @zos/app-access

**1 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `getSportData` | function | >= 3.6 | OFFICIAL |

## Symbols in detail

### `@zos/app-access.getSportData`

By default, the system will off the screen in one page of the Mini Program, and the system will exit the Mini Program after 10s, and enter the dial page when the watch is woken up again. If `relaunch` is set to `true`, the Mini Program will reopen and enter the corresponding page when the watch is woken up again. permission code: `data:user.hd.workout`

```ts
function getSportData(options: Options, callback: (callbackResult: CallbackResult) => void): Result
```

**Options**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | `string` | not stated | — | >= 3.6 | Sports type, refer to the value of SportType |

**CallbackResult**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `code` | `number` | not stated | — | >= 3.6 | Result status code, 0 means success, non- 0 means failure |
| `data` | `string` | not stated | — | >= 3.6 | Sports data, return value type is string, needs to be parsed using JSON.parse, the parsed type is Array<object>, the specific type of object can be referred to the SportType type description below, and the return value corresponding to each type is different |

**SportType**

| Value | Type | Min API_LEVEL | Description |
| --- | --- | --- | --- |
| `altitude` | `object` | >= 3.6 | Altitude, example return value {"altitude": "9.99", "name": "Elevation"} |
| `avg_cadence` | `object` | >= 3.6 | Average cadence, example return value {"avg_cadence": "9.99", "name": "Average Cadence"} |
| `avg_pace` | `object` | >= 3.6 | Average pace, example return value {"avg_pace": "1'12'", "name": "Average Pace"} |
| `avg_speed` | `object` | >= 3.6 | Average speed, example return value {"avg_speed": "9.99", "name": "Average Speed"} |
| `cadence` | `object` | >= 3.6 | Cadence/cadence, example return value {"cadence": "9.99", "name": "Cadence"} |
| `calories` | `object` | >= 3.6 | Consumption, example return value {"calories": "9.99", "name": "Calories"} |
| `distance` | `object` | >= 3.6 | Distance, example return value {"distance": "9.99", "name": "Distance"} |
| `downhill_count` | `object` | >= 3.6 | Number of downhills, example return value {"downhill_count": "9.99", "name": "Downhills"} |
| `duration` | `object` | >= 3.6 | Time duration of workout, example return value {"duration":"1:15:15", "name": "Duration"} |
| `pace` | `object` | >= 3.6 | Pace, example return value {"avg_pace": "1' 12" "," name ":" Average Pace "} |
| `speed` | `object` | >= 3.6 | Speed, example return value {"speed": "9.99", "name": "Speed"} |
| `total_count` | `object` | >= 3.6 | Total count, example return value {"total_count": "9.99", "name": "Total count"} |
| `total_downhill_distance` | `object` | >= 3.6 | Cumulative downhill distance, example return value {"total_downhill_distance": "9.99", "name": "Total Downhill Distance"} |
| `total_up_altitude` | `object` | >= 3.6 | Accumulated elevation, example return value {"total_up_altitude": "9.99", "name": "Total Ascent"} |
| `vertical_speed` | `object` | >= 3.6 | Vertical Speed, example return value {"vertical_speed": "9.99", "name": "Vertical Speed"} |

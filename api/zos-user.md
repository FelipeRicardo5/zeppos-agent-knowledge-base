# @zos/user

**5 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `addHealthData` | function | >= 3 | OFFICIAL |
| `GENDER_FEMALE` | constant | >= 2 | OFFICIAL |
| `GENDER_MALE` | constant | >= 2 | OFFICIAL |
| `GENDER_UNSPECIFIED` | constant | >= 2 | OFFICIAL |
| `getProfile` | function | >= 2 | OFFICIAL |

## Symbols in detail

### `@zos/user.addHealthData`

Set user health data information.

**Requires in `app.json`**: `data:user.health` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function addHealthData(option: Option): Result
```

**Option**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `weight` | `number` | not stated | — | >= 3 | Weight, in g |
| `bmi` | `number` | not stated | — | >= 3 | 100 times the value of BMI |

### `@zos/user.GENDER_FEMALE`

Female

### `@zos/user.GENDER_MALE`

Male

### `@zos/user.GENDER_UNSPECIFIED`

User not specified

### `@zos/user.getProfile`

Get user information.

**Requires in `app.json`**: `data:user.info` — see [`../manifest/index.md`](../manifest/index.md).

```ts
function getProfile(): Result
```

**Result**

| Property | Type | Required | Default | Min API_LEVEL | Description |
| --- | --- | --- | --- | --- | --- |
| `age` | `number` | not stated | — | >= 2 | User age, 0 if no data |
| `height` | `number` | not stated | — | >= 2 | User height, 0 if no data |
| `weight` | `number` | not stated | — | >= 2 | User weight, 0 if no data |
| `gender` | `number` | not stated | — | >= 2 | User gender, value refer to user gender constants |
| `nickName` | `string` | not stated | — | >= 2 | User's nickname |
| `region` | `string` | not stated | — | >= 2 | ISO code of the country or region where the user account is registered |

**User gender constants**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `GENDER_FEMALE` | >= 2 | Female |
| `GENDER_MALE` | >= 2 | Male |
| `GENDER_UNSPECIFIED` | >= 2 | User not specified |

# ui

**13 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `Auth` | function | not stated | OFFICIAL |
| `Button` | function | not stated | OFFICIAL |
| `Image` | function | not stated | OFFICIAL |
| `Link` | function | not stated | OFFICIAL |
| `Section` | function | not stated | OFFICIAL |
| `Select` | function | not stated | OFFICIAL |
| `Slider` | function | not stated | OFFICIAL |
| `Text` | function | not stated | OFFICIAL |
| `TextImageRow` | function | not stated | OFFICIAL |
| `TextInput` | function | not stated | OFFICIAL |
| `Toast` | function | not stated | OFFICIAL |
| `Toggle` | function | not stated | OFFICIAL |
| `View` | function | not stated | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `ui.Auth`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | no | — | The title of the OAuth component |
| `label` | `string` | no | — | The label text of the OAuth component |
| `description` | `string` | no | — | The description of the OAuth component |
| `authorizeUrl` | `string` | no | — | Url for requesting user authorization for the Token |
| `requestTokenUrl` | `string` | no | — | Url to get the unauthorized Token |
| `clientId` | `string` | no | — | The client ID specified on the authorized provider account |
| `clientSecret` | `string` | no | — | The password corresponding to the specified client ID on the authorized provider's account |
| `scope` | `string` | no | — | the scope of the request being made |
| `pkce` | `boolean` | no | — | Protect authorization code authorization. This is actually a cryptographic means of ensuring that a malicious third party canNOt exchange Access Token to the authentication server even if they intercept the Authorization Code or other key. |
| `onAccessToken` | `function` | no | — | A function that receives the accessToken and anything provided by OAuth (such as refresh tokens and expiration times) |
| `onReturn` | `function` | no | — | A function that receives an oauthCode |

### `ui.Button`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `color` | `string` | no | `default` | Set component color, support default, primary, secondary |
| `style` | `object` | no | — | Style properties, support for CSS attributes |
| `label` | `string` | no | — | content on the button |
| `onClick` | `() => void` | no | — | click button |

### `ui.Image`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | `object` | no | — | Style property, support for CSS attributes |
| `src` | `string` | yes | — | Image URL or base64 string |
| `alt` | `string` | no | — | Alternative text when the image cannot be displayed |
| `width` | `string or number` | no | — | The width of the component |
| `height` | `string or number` | no | — | The height of the component |

### `ui.Link`

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `source` | `string` | no | — | link |

### `ui.Section`

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | `object` | no | — | style property, support for CSS attributes |
| `title` | `string` | no | — | title of the Section |
| `description` | `string` | no | — | description of Section |

### `ui.Select`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | no | — | select label |
| `options` | `Array<SelectOption>` | no | — | select options |
| `multiple` | `boolean` | no | `false` | multiple options |
| `value` | `string or Array<string>` | no | — | selectedValue |
| `onChange` | `function` | no | — | (value: SelectValue) => void |
| `title` | `string` | no | — | title |

**SelectOption**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | no | — | option name |
| `value` | `string` | no | — | option value |

### `ui.Slider`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | no | — | slider label text |
| `max` | `number` | no | — | maximum |
| `min` | `number` | no | — | min |
| `step` | `number` | no | — | step |
| `value` | `number` | no | — | value |
| `onChange` | `function` | no | — | (value: SelectValue) => void |
| `settingsKey` | `string` | no | — | the key for storing values in the Settings Storage API |

### `ui.Text`

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | `object` | no | — | style property, support for CSS properties |
| `align` | `string` | no | `left` | Horizontal alignment, support left, center, right |
| `bold` | `boolean` | no | `false` | bold |
| `italic` | `boolean` | no | `false` | italic |
| `paragraph` | `boolean` | no | `false` | act as paragraph |

### `ui.TextImageRow`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | no | — | Primary text for TextImageRow |
| `sublabel` | `string` | no | — | gray text below label |
| `icon` | `string` | no | — | the source of the icon |
| `iconColor` | `string` | no | — | the color of the icon |
| `rounded` | `boolean` | no | — | If true, the icon is rounded. |
| `iconRight` | `boolean` | no | — | If true, the icon is on the right side. |

### `ui.TextInput`

```ts
(props: Props) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | no | — | text label |
| `disabled` | `boolean` | no | — | whether to disable the input box |
| `multiline` | `boolean` | no | — | whether multi-line |
| `placeholder` | `string` | no | — | placeholder text for the input box |
| `rows` | `number` | no | — | number of rows |
| `bold` | `boolean` | no | — | bold |
| `value` | `string` | no | — | the value of the text box |
| `rows` | `string` | no | — | number of rows |
| `onChange` | `(value: string) => void` | no | — | input event |
| `settingsKey` | `string` | no | — | The key to store the value in the Settings Storage API |
| `labelStyle` | `object` | no | — | The style of the text, supporting CSS properties |
| `subStyle` | `object` | no | — | Style object for the bottom text, supports CSS properties |

### `ui.Toast`

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `duration` | `number` | no | `2000` | Duration of the popup prompt |
| `horizontal` | `string` | no | `center` | Horizontal position of the Toast |
| `message` | `string` | no | — | The message to display |
| `vertical` | `string` | no | `top` | The vertical position of the Toast |
| `visible` | `boolean` | no | — | If true, the Toast is visible |
| `onClose` | `function` | no | — | Triggers a callback when the component requests to be closed |

### `ui.Toggle`

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | no | — | label |
| `settingsKey` | `string` | no | — | the key in Settings Storage |
| `value` | `boolean` | no | — | value |
| `onChange` | `(value: boolean) => void` | no | — | change event callback |

### `ui.View`

The View container is analogous to the `div` in the Web standard.

```ts
(props: Props, renderFuncArr?: RenderFunc | Array<RenderFunc>) => result: RenderFunc
```

**Props**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | `object` | no | — | Style property, support for CSS attributes |
| `onClick` | `function` | no | — | Triggers a callback when the component requests to be closed |

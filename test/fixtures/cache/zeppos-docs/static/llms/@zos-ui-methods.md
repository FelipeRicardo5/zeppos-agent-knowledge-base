# @zos/ui-methods

## openInspector

### Import

```js
import { openInspector } from '@zos/ui'
```

### Typings

- Description: Draws boundary rectangles for widgets participating in layout
- API_LEVEL: 4.0

## Type

```ts
function openInspector(): Inspector
```

---

## deleteWidget

### Import

```js
import { deleteWidget } from '@zos/ui'
```

### Typings

- Description: Deletes a widget
- Example:

```js
import { createWidget, deleteWidget } from '@zos/ui'
import { push } from '@zos/router'

deleteWidget(createWidget())
```

---

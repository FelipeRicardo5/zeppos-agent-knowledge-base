# Data Persistence

In some cases, we want to be able to store a part of the data state of an Mini Program persistently. In simple terms, persistence means saving data to a storage device that can be saved permanently. Take a look at a practical Mini Program with an example. The sample Mini Program calories reads the consumption of the day and calculates the relationship between the calorie value and different foods, providing 10 foods for the user to choose from, with chocolate as the default. If the user wants to change to a burger, he needs to go to the selection page. Assuming that the program is not persistent, when the user exits the Mini Program and enters the Mini Program again, the food selected will still be chocolate. If persistence is done, then each time the Mini Program is entered, the previously saved application state is fetched and the selected food becomes a burger.

**Minimum API_LEVEL: >= 3.** The highest minimum among the 1 symbols this pattern's code uses — every one of them has to be available.

Runtimes the guide's own file names state: Device App.

Source: `zeppos-docs/docs/guides/best-practice/persistence-storage.mdx`

## Symbols used

| Symbol | Min API_LEVEL | Runtimes | In this KB |
| --- | --- | --- | --- |
| `@zos/storage.LocalStorage` | >= 3 | Device App | yes |

## Introduction

## Thinking

Symbols: `@zos/storage.LocalStorage`

`page.js` — Device App

```js
import { LocalStorage } from '@zos/storage'

const localStorage = new LocalStorage()

Page({
  state: {
    data: null,
    storage: localStorage
  },
  build() {
    this.state.data = localStorage.getItem('state')
    // ...
  },
  onDestroy() {
    localStorage.setItem('state', this.state.data)
  }
})
```

## Reference pages the guide links to

- `zeppos-docs/docs/reference/device-app-api/newAPI/storage/localStorage.mdx`

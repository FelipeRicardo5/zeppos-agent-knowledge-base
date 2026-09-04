# Error Capture

During the development of the Mini Program process, the simulator preview or real machine will often encounter program execution errors, when the need to troubleshoot the logs, due to the length of the logs do limit, and no source-map tool, resulting in low efficiency in locating errors. The device app framework is currently unable to capture errors in the lifecycle, and this article provides some ideas for developers to follow.

**Minimum API_LEVEL: not stated.** No symbol this pattern uses documents one.

Runtimes the guide's own file names state: Device App.

Source: `zeppos-docs/docs/guides/best-practice/error-catch.mdx`

## Symbols used

None. This guide's code imports no `@zos` module, so there is nothing here to check against `../api/` — it is prose and configuration only.

## Introduction

## Thinking

`page.js` — Device App

```js
Page({
  build() {
    const a = undefined
    const b = () => {
      a()
    }
    const c = () => {
      b()
    }
    c()
  }
})
```

```js
Page({
  build() {
    try {
      const a = undefined
      const b = () => {
        a()
      }
      const c = () => {
        b()
      }
      c()
    } catch (e) {
      console.log('LifeCycle Error', e)
      e && e.stack && e.stack.split(/\n/).forEach((i) => console.log('error stack', i))
    }
  }
})
```

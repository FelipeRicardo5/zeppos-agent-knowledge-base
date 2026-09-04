# Code adaptations for more Zepp OS devices

Developers have already built an Mini Program based on one device, how can they get it to run on more Zepp OS devices? This article helps developers quickly adapt existing Mini Program code to more Zepp OS-enabled devices. Zepp OS Mini Programs are designed with compatibility in mind, so there is no need for developers to adjust the code too much.

**Minimum API_LEVEL: not stated.** No symbol this pattern uses documents one.

Source: `zeppos-docs/docs/guides/best-practice/code-adaptations-for-new-devices.mdx`

## Symbols used

None. This guide's code imports no `@zos` module, so there is nothing here to check against `../api/` — it is prose and configuration only.

## `app.json` configuration

`app.json`

```json
{
  // ...
  "targets": {
    "gtr-3-pro": {
      "module": {
        // ···
      },
      "platforms": [
        {
          "name": "gtr-3-pro",
          "deviceSource": 229
        },
        {
          "name": "gtr-3-prow",
          "deviceSource": 230
        }
      ],
      "designWidth": 480
    }
  }
}
```

```txt
.
├── app.js
├── app.json
├── assets
│   ├── gtr-3-pro
│   │   ├── icon.png
│   │   └── image
│   │       └── logo.png
...
```

`app.json`

```json
{
  // ...
  "targets": {
    "gtr-3-pro": {
      "module": {
        // ···
      },
      "platforms": [
        {
          "name": "gtr-3-pro",
          "deviceSource": 229
        },
        {
          "name": "gtr-3-prow",
          "deviceSource": 230
        }
      ],
      "designWidth": 480
    },
    "gtr-3": {
      "module": {
        // ···
      },
      "platforms": [
        {
          "name": "gtr-3",
          "deviceSource": 226
        },
        {
          "name": "gtr-3w",
          "deviceSource": 227
        }
      ],
      "designWidth": 480
    }
  }
}
```

```txt
.
├── app.js
├── app.json
├── assets
│   ├── gtr-3
│   │   ├── icon.png
│   │   └── image
│   │       └── logo.png
│   └── gtr-3-pro
│       ├── icon.png
│       └── image
│           └── logo.png
...
```

## Different screen adaptations

## Physical keys, crown logic adaptation

## Reference pages the guide links to

- `zeppos-docs/docs/reference/app-json.mdx`
- `zeppos-docs/docs/reference/related-resources/device-list.mdx`
- `zeppos-docs/docs/reference/related-resources/physical-keys.mdx`

# Patterns index

**11 patterns**, extracted from the official best-practice guides.

A pattern is a task, not a symbol. `Minimum API_LEVEL` is derived here: it is the
highest minimum among the symbols the guide's own code uses, which no single
upstream page states.

| Pattern | Approaches | Symbols | Minimum API_LEVEL | Page |
| --- | --- | --- | --- | --- |
| Construction of basic environment | 3 | 0 | not stated | [basic-environment-construction.md](basic-environment-construction.md) |
| MessageBuilder Bluetooth Communication | 1 | 2 | >= 2 | [bluetooth-communication.md](bluetooth-communication.md) |
| Code adaptations for more Zepp OS devices | 3 | 0 | not stated | [code-adaptations-for-new-devices.md](code-adaptations-for-new-devices.md) |
| Code Organization | 3 | 5 | >= 2 | [code-organization.md](code-organization.md) |
| Cross-Page Communications | 3 | 3 | >= 2 | [cross-page-communications.md](cross-page-communications.md) |
| Debug Mini Program | 4 | 1 | >= 2 | [debug.md](debug.md) |
| Error Capture | 2 | 0 | not stated | [error-catch.md](error-catch.md) |
| i18n | 5 | 1 | >= 2 | [i18n.md](i18n.md) |
| Screen Adaptation | 4 | 8 | >= 2 | [multi-screen-adaption.md](multi-screen-adaption.md) |
| Data Persistence | 2 | 1 | >= 3 | [persistence-storage.md](persistence-storage.md) |
| Widgets Management by Group | 2 | 4 | >= 2 | [widget-group.md](widget-group.md) |

## Which patterns use a symbol

The inverse of the guides' own links. Use it to find working code for a symbol
found in `../api/`.

- `@zos/app.getPackageInfo` — [bluetooth-communication](bluetooth-communication.md)
- `@zos/device.getDeviceInfo` — [multi-screen-adaption](multi-screen-adaption.md)
- `@zos/device.SCREEN_SHAPE_ROUND` — [multi-screen-adaption](multi-screen-adaption.md)
- `@zos/device.SCREEN_SHAPE_SQUARE` — [multi-screen-adaption](multi-screen-adaption.md)
- `@zos/i18n.getText` — [i18n](i18n.md)
- `@zos/router.back` — [cross-page-communications](cross-page-communications.md)
- `@zos/router.push` — [cross-page-communications](cross-page-communications.md)
- `@zos/storage.LocalStorage` — [persistence-storage](persistence-storage.md)
- `@zos/storage.sessionStorage` — [cross-page-communications](cross-page-communications.md)
- `@zos/ui.align` — [code-organization](code-organization.md), [multi-screen-adaption](multi-screen-adaption.md)
- `@zos/ui.createWidget` — [code-organization](code-organization.md), [multi-screen-adaption](multi-screen-adaption.md), [widget-group](widget-group.md)
- `@zos/ui.event` — [widget-group](widget-group.md)
- `@zos/ui.prop` — [widget-group](widget-group.md)
- `@zos/ui.text_style` — [code-organization](code-organization.md), [multi-screen-adaption](multi-screen-adaption.md)
- `@zos/ui.widget` — [code-organization](code-organization.md), [multi-screen-adaption](multi-screen-adaption.md), [widget-group](widget-group.md)
- `@zos/utils.log` — [bluetooth-communication](bluetooth-communication.md), [debug](debug.md)
- `@zos/utils.px` — [code-organization](code-organization.md), [multi-screen-adaption](multi-screen-adaption.md)

# Tools

The last question of every task, and the one the rest of this base does not
answer: the app is written, now how does it run?

Source: `zeppos-docs/docs/guides/tools/cli/index.md`, `zeppos-docs/docs/guides/tools/npm/officially-recommended.mdx`. `OFFICIAL`.

**Not covered, on purpose.** Twelve of the 23 pages under `guides/tools/` are
walkthroughs of the Watchface Maker, a no-code web editor: no `hm*` API between
them and one code fence, which is a directory listing. An agent cannot drive a
web GUI, so they are out of scope rather than pending. A watchface written as
code is `runtimes/watchface.md` and `api/hmUI.md`.

## Commands

| Command | What it does |
| --- | --- |
| `zeus create` | Create project. |
| `zeus dev` | Execute `zeus dev` in the project root for a preview of the compilation. Preview requires launching the simulator and turning on "Device Simulator:" - For simulator installation and launch, please refer to [Simulator Installation and launch](../simulator/setup.md) - For downloading and opening "Device Simulator", please refer to [Installing and opening "Device Simulator"](../simulator/index.md#install-and-open-device-simulator) Zeus CLI connects to the simulator and automatically previews the project while listening for changes to the project code, automatically compiling and previewing the latest content. |
| `zeus login` | Execute `zeus login` to automatically jump to the login screen, enter your Open Platform account/password to log in, after logging in you can use some of the features associated with your account, such as `zeus preview`. Some commands that require login are checked for login before execution, and if they are not logged in, they will be forced to log in. |
| `zeus preview` | Execute `zeus preview` in the project root for compilation preview (real machine). |
| `zeus build` | Execute `zeus build` to build the application installation package. |
| `zeus config` | - `zeus config list` - See all current configurations - `zeus config set <key>=<value>` - Add Configuration - Multiple configurations are separated by spaces - `zeus config get <key>` - View the configuration corresponding to `key` - `zeus config delete <key>` - Delete the configuration corresponding to `key` |
| `zeus bridge` | Execute `zeus bridge` in the project root directory to enter Developer Bridge mode. The Developer Bridge mode allows you to establish a connection with the runtime environment. For details, see [Developer Bridge Mode](guides/faq/developer-bridge-mode.md). |
| `zeus status` | Run `zeus status` to see the current login status and user information (nickname/userID), simulator connection status, and other information. User information can only be viewed if you are logged in |

### `zeus create`

```sh
zeus create hello-world
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 43

```sh
? Which kind of template application need to created? Empty
? What type of application should be created? APP
? Should this application contain a app-side component? Yes
? Should this application contain a settings component? Yes
? Which platforms should this application be built for? GTR3 Pro, GTR3
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 53

### `zeus dev`

```sh
# Enter the project root directory
cd hello-world

# Start compilation preview
zeus dev
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 97

### `zeus preview`

```sh
# compilation preview (real machine)
zeus preview
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 117

```sh
? Which target would like you to build?
> 480x480-gtr-3-pro
  454x454-gtr-3


? Which target would like you to build? 480x480-gtr-3-pro
begin generate qrcode
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 124

### `zeus build`

```sh
zeus build
```
— `zeppos-docs/docs/guides/tools/cli/index.md`, line 150

## What `zeus create` asks

Verbatim, because each answer writes a key into `app.json` and the CLI page
never says which. The join is below.

- `Which kind of template application need to created? Empty`
- `What type of application should be created? APP`
- `Should this application contain a app-side component? Yes`
- `Should this application contain a settings component? Yes`
- `Which platforms should this application be built for? GTR3 Pro, GTR3`
- `Which target would like you to build?`
- `Which target would like you to build? 480x480-gtr-3-pro`

## What it scaffolds, and which runtime each file is

The runtime column is **derived**, not stated: the CLI page draws the tree and
says nothing about runtimes, and these are the same directory names
[`src/parse/runtime.ts`](../src/parse/runtime.ts) reads to attribute every
symbol in this base. The `app.json` column is the `module` key that turns each
runtime on — get it wrong and the build fails before any API runs.

| Scaffolded file | Runtime | Turned on by |
| --- | --- | --- |
| `app-side/i18n/en-US.po` | [Side Service](../runtimes/side-service.md) | [`targets.module.app-side`](../manifest/targets.md) |
| `app-side/index.js` | [Side Service](../runtimes/side-service.md) | [`targets.module.app-side`](../manifest/targets.md) |
| `app.js` | [Device App](../runtimes/device-app.md) | [`targets.module.page`](../manifest/targets.md) |
| `pages/example/index.js` | [Device App](../runtimes/device-app.md) | [`targets.module.page`](../manifest/targets.md) |
| `pages/i18n/en-US.po` | [Device App](../runtimes/device-app.md) | [`targets.module.page`](../manifest/targets.md) |
| `pages/index.js` | [Device App](../runtimes/device-app.md) | [`targets.module.page`](../manifest/targets.md) |
| `setting/i18n/en-US.po` | [Settings App](../runtimes/settings.md) | [`targets.module.setting`](../manifest/targets.md) |
| `setting/index.js` | [Settings App](../runtimes/settings.md) | [`targets.module.setting`](../manifest/targets.md) |

The default template scaffolds three of the five runtimes. Watchface and Workout Extension are not in it — the prompts offer other templates, and the pages above say what each runtime needs in `app.json`.

## Packages the docs recommend

The confidence tier is read from the heading each package sits under —
*Officially maintained* against *Community works*. `RECOMMENDED` and
`COMMUNITY` were reserved when this base was designed and described as
needing a manual curation pass; this page is the first source that states
one, so they are derived like everything else.

| Package | Tier | Symbols in this base | What it is |
| --- | --- | --- | --- |
| [ZML](https://github.com/zepp-health/zml) | RECOMMENDED | 11 in 9 modules | A mini development library for Zepp OS mini programs. Currently integrates network requests, communication and other functions. |
| [ZeppOS Visual Logger](https://github.com/zepp-health/visual-logger) | RECOMMENDED | — | On-Screen Logs on Your Device. |
| [AutoGUI](https://github.com/zepp-health/autogui) | RECOMMENDED | — | Rapid GUI Prototyping for ZeppOS. |
| [eazy-ble](https://github.com/zepp-health/easy-ble) | RECOMMENDED | — | The Easy BLE library is an advanced BLE management tool for Zepp OS 3.0 watches that features an automated profile generator, a hybrid asynchronous and sequential queue for efficient handling of all operations including writing and reading, user-friendly string-based interactions, seamless auto-conversions of data and addresses, support for multiple data types, and simplified device management through MAC address-centric commands, all designed to enhance usability and streamline BLE communications. |
| [eazy-draw](https://github.com/zepp-health/easy-draw) | RECOMMENDED | — | This library was mainly created to extend the main widgets and add functionality to draw arbitrary lines on ZeppOS 2.0+, which can currently be achieved only with a polyline widget. But that widget has its limitations - high memory consumption, very limited viewport of about 150px, all lines have to be the same color. In contrast, the draw.line() can essentially draw multicolor lines in any direction of hypothetically any reasonable length. This makes for a great tool to base your GPS apps on devices that don't support Canvas. |
| [eazy-storage](https://github.com/zepp-health/easy-storage) | RECOMMENDED | — | The `EasyStorage` suite is a handy set of tools for `ZeppOS` applications. It includes `EasyStorage`, `EasyFlashStorage`, and `EasyTempStorage`. These tools give developers a wide range of options for managing data, from storing it in memory or in files, to using temporary storage. Each tool is designed to meet specific storage needs, making it easier and more efficient to handle application data. Next to these the suite has a `Storage` utility library that offers static methods for direct file operations. This includes reading and writing JSON objects, text, and binary data directly to and from the filesystem. |
| [zeppos-fx](https://github.com/XiaomaiTX/zeppos-fx) | COMMUNITY | — | This is a library for providing simple animations in Zepp OS. You can add various animation effects to existing UI widgets in a very simple way. |

**A dash in the symbols column means this base holds nothing for that
package** — not that it has no API. Only the packages a sample app imports
reach the symbol records at all, and the extractor reads no package's own
source.

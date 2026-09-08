/*
 * HeartSync — Settings App (the screen inside the Zepp phone app).
 *
 * ================== THIS FILE IS MOSTLY INVENTION. READ THIS. ==================
 *
 * What the knowledge base gives me for the Settings App, in total:
 *
 *  1. runtimes/settings.md — 21 symbols across 3 modules, every one "not stated":
 *       global:           console.log
 *       settings-storage: addListener, clear, getItem, length, removeItem,
 *                         setItem, toObject
 *       ui:               Auth, Button, Image, Link, Section, Select, Slider,
 *                         Text, TextImageRow, TextInput, Toast, Toggle, View
 *  2. api/ui.md — the same 13 component names, `function`, "not stated", OFFICIAL,
 *     with exactly ONE description among all thirteen:
 *       "ui.View — The View container is analogous to the `div` in the Web standard."
 *     `Select` and `TextInput`, the two components this screen is *specified* to
 *     use, have NO description and NO props.
 *  3. api/settings-storage.md — the seven storage members, described in one line each.
 *
 * What it does NOT give me, and what I therefore had to invent:
 *
 *  - the entry point. There is no `AppSettingsPage`, no `Settings.render`, no
 *    `registerSettingsPage` anywhere in api/, runtimes/, patterns/ or data/
 *    (grep confirms zero hits for AppSettingsPage and one hit for Settings.render,
 *    in skills/zepp-os/SKILL.md, where it is listed as *not extracted*).
 *  - the import path for the `ui` module. The module is named plain `ui`, not
 *    `@zos/ui`; whether that means `import { View } from 'ui'`, a bare global, or
 *    something else, the KB does not say.
 *  - whether components are called as functions, used as JSX, or both.
 *  - every single prop name: no `label`, no `settingsKey`, no `options`, no
 *    `onChange`. Not one prop of one component is recorded.
 *  - how a Select's option list is shaped.
 *  - how `settingsStorage` is reached from this runtime.
 *
 * skills/zepp-os/SKILL.md states the position plainly: "Questions about those are
 * outside what this KB can answer — answer from the official docs and say where
 * the answer came from." I am not permitted to consult the official docs for this
 * task, so this file is the honest result: the component NAMES and the storage
 * KEYS are cited; the structure around them is a labelled guess and would not
 * survive contact with a real build. Report gaps G03, G12.
 * ==============================================================================
 */

// ASSUMPTION A8 (gap G12): import path invented. Module is named `ui` in
// api/index.md and runtimes/settings.md; no path is recorded.
import { View, Text, Section, TextInput, Select, Toast } from 'ui' // api/ui.md — all "not stated", OFFICIAL, Settings App (runtimes/settings.md)

const ENDPOINT_KEY = 'endpoint'
const INTERVAL_KEY = 'syncInterval'

// Requirement 3: "picks a sync interval from a list" -> ui.Select
// (api/ui.md — Select, function, "not stated"; runtimes/settings.md — Settings App).
// The option-list shape below is ASSUMPTION A9 (gap G12): undocumented.
const INTERVAL_OPTIONS = [
  { name: 'Every 30 seconds', value: '30' },
  { name: 'Every minute', value: '60' },
  { name: 'Every 5 minutes', value: '300' },
  { name: 'Every 15 minutes', value: '900' }
]

// ASSUMPTION A10 (gap G03): `AppSettingsPage` and its `build(props)` contract are
// INVENTED WHOLESALE. Nothing in this knowledge base names a Settings App entry
// point. If this project were built, this is the line that would fail first.
AppSettingsPage({
  build(props) {
    // ASSUMPTION A11 (gap G10): `settingsStorage` reached as a bare global, as in
    // the Side Service. api/settings-storage.md's `length` description writes it
    // `settings.settingsStorage.length`, which suggests it may instead hang off a
    // `settings` object — the KB documents no such object.
    const endpoint = settingsStorage.getItem(ENDPOINT_KEY) || '' // api/settings-storage.md — getItem
    const interval = settingsStorage.getItem(INTERVAL_KEY) || '60'

    // ASSUMPTION A12 (gap G12): every prop below is invented. Only the component
    // names are from the KB. `View` being "analogous to the div in the Web
    // standard" (api/ui.md) is the single documented fact this layout rests on.
    return View({ style: { padding: '12px' } }, [
      Section({ title: 'Sync endpoint' }, [
        Text({}, 'HTTP endpoint that receives each heart-rate reading'),
        TextInput({ // api/ui.md — TextInput, "not stated". No description, no props.
          label: 'Endpoint URL',
          value: endpoint,
          placeholder: 'https://example.com/hr',
          onChange: (value) => {
            settingsStorage.setItem(ENDPOINT_KEY, value) // api/settings-storage.md — setItem: "Storing key-value pairs."
            Toast({ content: 'Endpoint saved' }) // api/ui.md — Toast, "not stated"
          }
        })
      ]),
      Section({ title: 'Sync interval' }, [
        Select({ // api/ui.md — Select, "not stated". No description, no props.
          value: interval,
          options: INTERVAL_OPTIONS,
          onChange: (value) => {
            settingsStorage.setItem(INTERVAL_KEY, String(value))
          }
        })
      ])
    ])
  }
})

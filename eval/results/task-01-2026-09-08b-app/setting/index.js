// HeartSync — Settings App (renders inside the Zepp phone app).
//
// ============================ READ THIS FIRST ==============================
// This is the weakest file in the project. The knowledge base contains exactly
// ONE line of Settings App code, in total, across all 33 sample apps:
//
//   const sleepData = JSON.parse(props.settingsStorage.getItem("sleepData"));
//   — examples/application-2-0-post-health-data-miniprogram.md,
//     `zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js`, line 70
//
// From that one line the base establishes: a Settings App file receives a `props`
// object, and `props.settingsStorage` is the storage handle. Everything else below
// — the module entry point, the import path for the components, the JSX-ish call
// convention, and every single component prop — is ASSUMPTION #9. Details in
// CITATIONS.md gap G1, which is the top-ranked gap in the report.
//
// What the base DOES vouch for is that these component symbols exist and are
// Settings App symbols (api/ui.md; runtimes/settings.md, module `ui`, 13 symbols,
// all "not stated" / OFFICIAL):
//   Auth, Button, Image, Link, Section, Select, Slider, Text, TextImageRow,
//   TextInput, Toast, Toggle, View
// Of those 13, exactly one carries a description: `ui.View` — "The View container
// is analogous to the `div` in the Web standard." That sentence is the only reason
// this file is laid out as nested containers rather than a flat list.
// ===========================================================================

import { View, Section, Text, TextInput, Select, Button } from 'zeppos-settings-ui'
// ^ [ASSUMPTION #9a] THE IMPORT PATH IS INVENTED.
//   api/ui.md names the module simply `ui`, and data/symbols/ui.json records the
//   originalPath as `zeppos-docs/docs/reference/app-settings-api/ui/<name>.mdx` —
//   a docs path, not a package specifier. No sample, pattern or API page in this
//   knowledge base shows an import line, a require, or a bare-global usage for
//   these components. The module a Settings App imports its widgets from is simply
//   not recorded. This line WILL need to be corrected against the real toolchain.

const K_ENDPOINT = 'endpointUrl'
const K_INTERVAL = 'syncIntervalSec'

// Requirement 3: "picks a sync interval from a list".
const INTERVAL_OPTIONS = [
  { name: 'Every 15 seconds', value: '15' },
  { name: 'Every 30 seconds', value: '30' },
  { name: 'Every minute', value: '60' },
  { name: 'Every 5 minutes', value: '300' },
  { name: 'Every 15 minutes', value: '900' }
]
// ^ [ASSUMPTION #9b] The `{ name, value }` option shape for `ui.Select` is invented.
//   api/ui.md gives `Select` a row in the symbol table and no description at all.

const DEFAULT_INTERVAL = '60'

AppSettingsPage({
  // ^ [ASSUMPTION #9c] THE ENTRY POINT IS INVENTED.
  //   A grep for `AppSettingsPage`, `Settings.render` and any other settings entry
  //   symbol across api/, patterns/, runtimes/, compatibility/ and examples/ returns
  //   nothing. runtimes/settings.md lists 21 symbols in 3 modules — `global.console.log`,
  //   the 7 `settings-storage` methods, and the 13 `ui` components — and no registration
  //   function among them. skills/zepp-os/SKILL.md itself flags this, saying the
  //   Settings App "uses globals (... `Settings.render`) that are not extracted yet".
  //   That sentence names a DIFFERENT entry point than the one written here, and the
  //   base gives no way to decide between them. See gap G1.

  build(props) {
    // `props` and `props.settingsStorage` are the one attested fact — see header.
    const { settingsStorage } = props

    const endpoint = settingsStorage.getItem(K_ENDPOINT) || ''
    // ^ api/settings-storage.md — getItem, function, "not stated", OFFICIAL:
    //   "Get the stored value by key name."
    //   Receiver `props.settingsStorage` verbatim from the sample cited in the header.

    const interval = settingsStorage.getItem(K_INTERVAL) || DEFAULT_INTERVAL

    return View({ style: { padding: '16px' } }, [
      // ^ api/ui.md — View, function, "not stated", OFFICIAL.
      //   "The View container is analogous to the `div` in the Web standard."
      //   [ASSUMPTION #9d] The (props, children) call convention and the `style` prop
      //   are inferred from that one analogy to a Web `div`. Not recorded.

      Section({ title: 'Endpoint' }, [
        // ^ api/ui.md — Section, function, "not stated", OFFICIAL. No description.
        Text({ paragraph: true }, 'HeartSync POSTs every reading to this URL.'),
        // ^ api/ui.md — Text, function, "not stated", OFFICIAL. No description.

        TextInput({
          label: 'Endpoint URL',
          value: endpoint,
          placeholder: 'https://example.com/heartrate',
          onChange: (value) => {
            settingsStorage.setItem(K_ENDPOINT, value)
            // ^ api/settings-storage.md — setItem, function, "not stated", OFFICIAL:
            //   "Storing key-value pairs."
            //   Requirement 4 (persistence) rests on this call plus the API page's
            //   own note: "The Settings App is 'responsive' to data changes in
            //   `settingsStorage`, so there is no need to manually listen for data
            //   changes." That is why no re-render is triggered by hand here.
          }
        })
        // ^ api/ui.md — TextInput, function, "not stated", OFFICIAL. No description.
        //   [ASSUMPTION #9e] Every prop above (label/value/placeholder/onChange) is invented.
      ]),

      Section({ title: 'Sync interval' }, [
        Select({
          label: 'Send a reading',
          options: INTERVAL_OPTIONS,
          value: interval,
          onChange: (value) => {
            settingsStorage.setItem(K_INTERVAL, value)
          }
        })
        // ^ api/ui.md — Select, function, "not stated", OFFICIAL. No description.
        //   [ASSUMPTION #9f] Every prop above is invented.
      ]),

      Section({ title: 'Maintenance' }, [
        Button({
          label: 'Clear endpoint',
          onClick: () => {
            settingsStorage.removeItem(K_ENDPOINT)
            // ^ api/settings-storage.md — removeItem, function, "not stated", OFFICIAL:
            //   "Delete the value stored by the key name."
          }
        })
        // ^ api/ui.md — Button, function, "not stated", OFFICIAL. No description.
        //   [ASSUMPTION #9g] Every prop above is invented.
      ])
    ])
  }
})

// The Settings App is all globals — nothing here is imported. SKILL.md and
// examples/index.md both say the same thing: "The Settings App and the Side
// Service are all globals, so their files import nothing." `AppSettingsPage`,
// `View`, `Section`, `TextInput` and `Select` are all used bare below, matching
// examples/application-4-0-todo-list.md setting/index.js and
// examples/application-2-0-post-health-data-miniprogram.md setting/index.js.

const SYNC_INTERVAL_OPTIONS = [
  { name: 'Every 15 seconds', value: '15000' },
  { name: 'Every 30 seconds', value: '30000' },
  { name: 'Every minute', value: '60000' },
  { name: 'Every 5 minutes', value: '300000' },
]

AppSettingsPage({
  // AppSettingsPage() *(no record in this KB)* — the Settings App entry point.
  // SKILL.md says plainly: "AppSettingsPage, which registers a settings page, has
  // no symbol record; it appears only as code." OBSERVED call shape from
  // examples/application-4-0-todo-list.md setting/index.js line 272 and
  // examples/application-2-0-post-health-data-miniprogram.md setting/index.js
  // line 242 — both use `AppSettingsPage({ state: {...}, build(props) {...} })`.

  state: {},

  build(props) {
    const savedUrl = props.settingsStorage.getItem('endpointUrl') || ''
    const savedInterval = props.settingsStorage.getItem('syncIntervalMs') || '60000'
    // `props.settingsStorage.getItem(key)` OBSERVED verbatim in
    // examples/application-2-0-post-health-data-miniprogram.md setting/index.js
    // line 209: `JSON.parse(props.settingsStorage.getItem("sleepData"))`.
    // api/settings-storage.md — getItem, no stated API_LEVEL, no stated permission.

    return View({}, [
      // ui.View — api/ui.md Props: style, onClick. Call shape `View({}, [...])`
      // OBSERVED in examples/application-2-0-post-health-data-miniprogram.md
      // setting/index.js line 379.
      Section(
        {
          title: 'HeartSync',
          description: 'Where and how often to send heart rate readings.',
        },
        // ui.Section — api/ui.md Props: style, title, description. No OBSERVED
        // call site for Section in this base's examples; used here purely from
        // its documented Props table (api/ui.md lines 90-102), so treat this one
        // component as OFFICIAL-by-table rather than OBSERVED-by-sample.
        [
          TextInput({
            label: 'Endpoint URL',
            placeholder: 'https://example.com/heart-rate',
            value: savedUrl,
            settingsKey: 'endpointUrl',
            // ui.TextInput — api/ui.md Props include `settingsKey`: "The key to
            // store the value in the Settings Storage API" (api/ui.md line 198).
            // Using settingsKey lets the framework persist this field itself,
            // rather than wiring an onChange + setItem by hand as the
            // post-health-data-miniprogram sample does — settingsKey is
            // documented but has no OBSERVED sample use in this base's 33 examples.
          }),
          Select({
            label: 'Sync interval',
            title: 'Sync interval',
            options: SYNC_INTERVAL_OPTIONS,
            value: savedInterval,
            // ui.Select — api/ui.md Props: label, options (SelectOption[]:
            // {name, value}), multiple, value, onChange, title (api/ui.md lines
            // 104-126). Select has no `settingsKey` prop in that table (Toggle,
            // Slider and TextInput each do) — an asymmetry this base states in
            // the table but never explains, so persistence is wired by hand
            // below via onChange instead of relying on the framework.
            onChange: (value) => {
              props.settingsStorage.setItem('syncIntervalMs', value)
              // `props.settingsStorage.setItem(key, value)` — mirrors the
              // OBSERVED `settings.settingsStorage.setItem(...)` shape from
              // examples/application-2-0-post-health-data-miniprogram.md
              // app-side/index.js line 216, applied here to `props.settingsStorage`
              // as seen for `getItem` in the same sample's setting/index.js.
            },
          }),
        ]
      ),
    ])
  },
})

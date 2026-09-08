import { gettext } from 'i18n'

// The Settings App imports nothing that names a module — View, TextInput and
// AppSettingsPage are all globals — so no import line makes them visible.
AppSettingsPage({
  state: { items: [] },
  addItem(value) {
    this.state.items = [...this.state.items, value]
  },
  build(props) {
    const saved = props.settingsStorage.getItem('items')
    return View({ style: { padding: '12px' } }, [
      TextInput({ label: gettext('endpoint'), onChange: (v) => this.addItem(v) }),
      Button({ label: gettext('save'), onClick: () => this.addItem(saved) }),
    ])
  },
})

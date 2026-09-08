# showcase

A Mini Program sample
for platform 2.0. Runtimes present: Device App.

Source: `zeppos-samples/application/2.0/showcase`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `defaultLanguage`, `i18n`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `data:user.hd.calorie`, `data:user.hd.distance`, `data:user.hd.fat_burning`, `data:user.hd.heart_rate`, `data:user.hd.pai`, `data:user.hd.sleep`, `data:user.hd.spo2`, `data:user.hd.stand`, `data:user.hd.step`, `data:user.hd.stress`, `device:os.geolocation`

Targets: `gt4` — these key the `assets/` subdirectories.

## Files

**Device App** — `app.js`, `config/constants.js`, `config/device.js`, `config/tree.js`, `page/index.js`, `page/interaction/create_modal.js`, `page/interaction/on_digital_crown.js`, `page/interaction/on_key.js`, `page/interaction/on_wrist_motion.js`, `page/interaction/show_toast.js`, `page/router/set_launch_app_timeout.js`, `page/sensor/blood_oxygen.js`, `page/sensor/calorie.js`, `page/sensor/distance.js`, `page/sensor/fat_burning.js`, `page/sensor/geolocation.js`, `page/sensor/heart_rate.js`, `page/sensor/pai.js`, `page/sensor/sleep.js`, `page/sensor/stand.js`, `page/sensor/step.js`, `page/sensor/stress.js`, `page/ui/widget/arc.js`, `page/ui/widget/button.js`, `page/ui/widget/checkbox_group.js`, `page/ui/widget/circle.js`, `page/ui/widget/cycle_image_text_list.js`, `page/ui/widget/cycle_list.js`, `page/ui/widget/dialog.js`, `page/ui/widget/fill_rect.js`, `page/ui/widget/histogram.js`, `page/ui/widget/img_anim.js`, `page/ui/widget/img.js`, `page/ui/widget/page_indicator.js`, `page/ui/widget/pick_date.js`, `page/ui/widget/polyline.js`, `page/ui/widget/qrcode.js`, `page/ui/widget/radio_group.js`, `page/ui/widget/scroll_list.js`, `page/ui/widget/slide_switch.js`, `page/ui/widget/stroke_rect.js`, `page/ui/widget/text.js`, `page/ui/widget/view_container.js`, `utils/log.js`, `utils/styles.js`, `utils/template/PageAdvanced.js`, `utils/test.js`, `utils/UI/ButtonList.js`, `utils/UI/EmptySpace.js`, `utils/UI/TextByLine.js`, `utils/UI/Title.js`, `utils/utils.js`

## Imported symbols, called

### `@zos/device.getDeviceInfo`

```js
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/2.0/showcase/config/device.js`, line 3

### `@zos/interaction.createModal`

```js
const dialog = createModal({
  content: 'hello world',
  autoHide: false,
  onClick: (keyObj) => {
    console.log('type', keyObj.type)
    if (keyName === MODAL_CONFIRM) {
      console.log('confirm')
    } else {
      console.log('close')
      dialog.show(false)
    }
  }
```
— `zeppos-samples/application/2.0/showcase/page/interaction/create_modal.js`, line 10

### `@zos/interaction.onDigitalCrown`

```js
onDigitalCrown({
  callback: (key, degree) => {
    this.state.logger.log(key, degree)
    text.setProperty(prop.MORE, {
      text: `KEY:${key};DEGREE:${degree}`
    })
  }
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/on_digital_crown.js`, line 17

### `@zos/interaction.onKey`

```js
onKey({
  callback: (key, action) => {
    text.setProperty(prop.MORE, {
      text: `key: ${key};action: ${action}`
    })

    if (key === KEY_SHORTCUT) {
      this.state.logger.log('key shortcut')
    }

    return true
  }
```
— `zeppos-samples/application/2.0/showcase/page/interaction/on_key.js`, line 17

### `@zos/interaction.onWristMotion`

```js
onWristMotion({
  callback: (data = {}) => {
    const { motion } = data
    this.state.logger.log('motion', motion)
    text.setProperty(prop.MORE, {
      text: `MOTION:${motion}`
    })
  }
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/on_wrist_motion.js`, line 17

### `@zos/interaction.showToast`

```js
showToast({
  content: 'Hello ZeppOS'
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/show_toast.js`, line 11

### `@zos/router.push`

```js
push({
  url: `page/${this.state.params.path.join("/")}/${path}`,
});
```
— `zeppos-samples/application/2.0/showcase/page/index.js`, line 57

```js
push({
  url: "page/index",
  params: {
    path: [...this.state.params.path, text],
  },
});
```
— `zeppos-samples/application/2.0/showcase/page/index.js`, line 61

### `@zos/router.setLaunchAppTimeout`

```js
setLaunchAppTimeout({
  url: 'page/index',
  appId: 25107,
  utc: time.getTime() + 1000
})
```
— `zeppos-samples/application/2.0/showcase/page/router/set_launch_app_timeout.js`, line 24

### `@zos/sensor.BloodOxygen`

```js
const bloodOxygen = new BloodOxygen();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/blood_oxygen.js`, line 13

### `@zos/sensor.Calorie`

```js
const calorie = new Calorie();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/calorie.js`, line 12

### `@zos/sensor.Distance`

```js
const distance = new Distance();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/distance.js`, line 12

### `@zos/sensor.FatBurning`

```js
const fatBurning = new FatBurning();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/fat_burning.js`, line 12

### `@zos/sensor.Geolocation`

```js
const geolocation = new Geolocation();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/geolocation.js`, line 10

### `@zos/sensor.HeartRate`

```js
const heartRate = new HeartRate();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/heart_rate.js`, line 12

### `@zos/sensor.Pai`

```js
const pai = new Pai();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/pai.js`, line 11

### `@zos/sensor.Sleep`

```js
const sleep = new Sleep();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/sleep.js`, line 10

### `@zos/sensor.Stand`

```js
const stand = new Stand();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/stand.js`, line 12

### `@zos/sensor.Step`

```js
const step = new Step();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/step.js`, line 12

### `@zos/sensor.Stress`

```js
const stress = new Stress();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/stress.js`, line 15

### `@zos/sensor.Time`

```js
const time = new Time()
```
— `zeppos-samples/application/2.0/showcase/page/router/set_launch_app_timeout.js`, line 12

### `@zos/ui.createWidget`

```js
createWidget(widget.BUTTON, {
  x: px(80),
  y: px(300),
  w: px(300),
  h: px(60),
  radius: px(12),
  normal_color: 0xfc6950,
  press_color: 0xfeb4a8,
  text: 'setLaunchAppTimeOut',
  click_func: () => {
    setLaunchAppTimeout({
      url: 'page/index',
```
— `zeppos-samples/application/2.0/showcase/page/router/set_launch_app_timeout.js`, line 14

```js
createWidget(widget.BUTTON, {
  x: px(80),
  y: px(300),
  w: px(300),
  h: px(60),
  radius: px(12),
  normal_color: 0xfc6950,
  press_color: 0xfeb4a8,
  text: "REGISTER_CHANGE",
  click_func: bloodOxygen.onChange(changeCallback),
});
```
— `zeppos-samples/application/2.0/showcase/page/sensor/blood_oxygen.js`, line 34

### `@zos/ui.setStatusBarVisible`

```js
setStatusBarVisible(false);
```
— `zeppos-samples/application/2.0/showcase/app.js`, line 7

```js
setStatusBarVisible(false);
```
— `zeppos-samples/application/2.0/showcase/utils/template/PageAdvanced.js`, line 19

### `@zos/utils.px`

```js
absolute_y: px(120),
```
— `zeppos-samples/application/2.0/showcase/page/index.js`, line 44

```js
x: px(80),
```
— `zeppos-samples/application/2.0/showcase/page/router/set_launch_app_timeout.js`, line 15

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records; the receiver's type is **not** resolved,
so treat the module as a strong hint rather than a fact.

### `.addEventListener()` — likely `@zos/ui.addEventListener`

```js
this.state.titleWidget.addEventListener(event.CLICK_DOWN, () => {
  dialog.show(true)
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/create_modal.js`, line 24

```js
this.state.titleWidget.addEventListener(event.CLICK_DOWN, () => {
  showToast({
    content: 'Hello ZeppOS'
  })
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/show_toast.js`, line 10

### `.clear()` — likely `settings-storage.clear`

```js
polyline.clear()
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/polyline.js`, line 26

```js
polyline.clear()
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/polyline.js`, line 33

### `.createWidget()` — likely `@zos/ui.createWidget`

```js
const checkbox_group = createWidget(widget.CHECKBOX_GROUP, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(64),
  select_src: 'selected.png',
  unselect_src: 'unselected.png',
  check_func: (group, index, checked) => {
    this.state.logger.log('index', index)
    this.state.logger.log('checked', checked)
  }
})
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/checkbox_group.js`, line 10

```js
const button1 = checkbox_group.createWidget(widget.STATE_BUTTON, {
  x: px(40),
  y: px(200),
  w: px(64),
  h: px(64)
})
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/checkbox_group.js`, line 23

### `.getProperty()` — likely `@zos/ui.getProperty`

```js
this.state.logger.log('property', cycle_image_text_list.getProperty(prop.MORE, {}))
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/cycle_image_text_list.js`, line 39

```js
const isRunning = imgAnimation.getProperty(prop.ANIM_IS_RUNINNG)
```
— `zeppos-samples/application/2.0/showcase/page/ui/widget/img_anim.js`, line 27

### `.setProperty()` — likely `@zos/ui.setProperty`

```js
text.setProperty(prop.MORE, {
  text: `KEY:${key};DEGREE:${degree}`
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/on_digital_crown.js`, line 20

```js
text.setProperty(prop.MORE, {
  text: `key: ${key};action: ${action}`
})
```
— `zeppos-samples/application/2.0/showcase/page/interaction/on_key.js`, line 19

### `.start()` — likely `@zos/app-service.start`

```js
bloodOxygen.start();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/blood_oxygen.js`, line 57

```js
geolocation.start();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/geolocation.js`, line 21

### `.stop()` — likely `@zos/app-service.stop`

```js
bloodOxygen.stop();
```
— `zeppos-samples/application/2.0/showcase/page/sensor/blood_oxygen.js`, line 56

```js
this.state.instance && this.state.instance.stop()
```
— `zeppos-samples/application/2.0/showcase/page/sensor/geolocation.js`, line 25

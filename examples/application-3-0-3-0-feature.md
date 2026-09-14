# 3.0-feature

A Mini Program sample
for platform 3.0. Runtimes present: Device App.

Source: `zeppos-samples/application/3.0/3.0-feature`

Every excerpt below is verbatim official sample code, cited to its file and
line. This is `OBSERVED` evidence: it shows a call that works, not a
documented contract.

## `app.json`

Top-level keys: `app`, `configVersion`, `debug`, `defaultLanguage`, `permissions`, `runtime`, `targets`

`app.appType`: `app`

Permissions: `data:os.device.info`, `data:user.hd.heart_rate`, `data:user.hd.sleep`, `data:user.hd.spo2`, `data:user.hd.stress`, `data:user.hd.workout`, `device:os.accelerometer`, `device:os.alarm`, `device:os.bg_service`, `device:os.ble`, `device:os.compass`, `device:os.geolocation`, `device:os.gyroscope`, `device:os.notification`, `event:customize.test`, `event:os.bp.expires`, `event:os.bp.high`, `event:os.bp.low`, `event:os.health.heart_rate_abnl`, `event:os.health.sleep_status`, `event:os.system.no_disturb`, `event:os.system.power_saving`, `event:os.system.theater_mode`, `event:os.weather.sun_rise`, `event:os.weather.sun_set`

Targets: `common` — these key the `assets/` subdirectories.

Builds for: `st: "r"` (`configVersion` `v3`). See [`../compatibility/devices.md`](../compatibility/devices.md) for what each selector reaches.

## Files

**Device App** — `app-service/system_event_service.js`, `app-service/time_service.js`, `app.js`, `components/empty-space/index.js`, `components/empty-space/index.r.layout.js`, `libs/ble.js`, `libs/index.js`, `libs/utils.js`, `pages/acc.js`, `pages/alarm.js`, `pages/bgService.js`, `pages/ble.js`, `pages/canvas.js`, `pages/compass.js`, `pages/gps.js`, `pages/gyro.js`, `pages/heart.js`, `pages/index.js`, `pages/newAlarm.js`, `pages/notification.js`, `pages/screen.js`, `pages/sensor.js`, `pages/sleep.js`, `pages/spo2.js`, `pages/stress.js`, `pages/style.r.layout.js`, `pages/systemEvent.js`, `pages/target.js`, `pages/workout.js`

## Imported symbols, called

### `@zos/app.emitCustomSystemEvent`

```js
emitCustomSystemEvent({
  eventName: 'event:customize.test',
  eventParam: 'eventName=event:customize.test&type=0',
})
```
— `zeppos-samples/application/3.0/3.0-feature/pages/systemEvent.js`, line 38

### `@zos/app.queryPermission`

```js
const [result2] = queryPermission({
  permissions,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 33

### `@zos/app.requestPermission`

```js
requestPermission({
  permissions,
  callback([result2]) {
    if (result2 === 2) {
      startTimeService(vm);
    }
  },
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 38

### `@zos/device.getDeviceInfo`

```js
export const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = getDeviceInfo();
```
— `zeppos-samples/application/3.0/3.0-feature/libs/utils.js`, line 3

```js
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/alarm.js`, line 7

### `@zos/display.setPageBrightTime`

```js
setPageBrightTime({
  brightTime: 60000,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/ble.js`, line 84

### `@zos/interaction.offGesture`

```js
offGesture();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 510

### `@zos/interaction.onGesture`

```js
onGesture(function (event) {
  switch (event) {
    case GESTURE_RIGHT:
      if (vc) {
        //! in dialog
        return true;
      }
    default:
      break;
  }
  return false;
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 55

### `@zos/router.push`

```js
push({
  url: "pages/newAlarm",
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/alarm.js`, line 104

```js
push({
  url: feature.url,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/index.js`, line 41

### `@zos/router.replace`

```js
replace({
  url: `${thisFile}`,
  params: `${thisFile}`,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/alarm.js`, line 68

```js
replace({ url: `${thisFile}` });
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 149

### `@zos/sensor.Accelerometer`

```js
const acc = new Accelerometer();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 7

### `@zos/sensor.BloodOxygen`

```js
let spo2Sr = new BloodOxygen();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/spo2.js`, line 19

### `@zos/sensor.Compass`

```js
const compass = new Compass();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/compass.js`, line 6

### `@zos/sensor.Geolocation`

```js
const gps = new Geolocation();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/gps.js`, line 6

### `@zos/sensor.Gyroscope`

```js
const gyro = new Gyroscope();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/gyro.js`, line 6

### `@zos/sensor.HeartRate`

```js
let hrSr = new HeartRate();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/heart.js`, line 19

### `@zos/sensor.Screen`

```js
const screen = new Screen();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/screen.js`, line 7

### `@zos/sensor.Sleep`

```js
let sleepSr = new Sleep();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/sleep.js`, line 20

### `@zos/sensor.Stress`

```js
let stressSr = new Stress();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/stress.js`, line 44

### `@zos/sensor.Time`

```js
const timeSensor = new Time();
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 8

### `@zos/sensor.Workout`

```js
const workout = new Workout();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/workout.js`, line 7

### `@zos/utils.EventBus`

```js
devEvent: new EventBus(),
```
— `zeppos-samples/application/3.0/3.0-feature/app.js`, line 8

### `@zos/utils.log`

```js
logger.log("service init");
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/system_event_service.js`, line 6

```js
logger.log(e);
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/system_event_service.js`, line 7

### `@zos/utils.px`

```js
const BUTTON_H = px(40);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 15

```js
font_size: px(32),
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 271

## Methods called on a value

These are never imported, so no import line names their module. The name is
matched against the symbol records, narrowed to this sample's runtimes; the
receiver's type is **not** resolved, so treat the match as a hint rather than
a fact. Where several candidates survive the row says **ambiguous** and names
them all — see [`../conflicts/index.md`](../conflicts/index.md).

### `.ab2Str()` *(no record in this KB)*

```js
console.log("this is mac addr ====" + Utils.ab2Str(mac).toString());
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 6

```js
console.log(Utils.ab2Str(data).toString() + "this is data num");
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 64

### `.addEventListener()` — **ambiguous**: module `@zos/ui.addEventListener`; called on `@zos/media.Player` or `@zos/media.Recorder`

```js
canvasIndex0.addEventListener(hmUI.event.CLICK_UP, btnUpCb);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 78

```js
canvasIndex0.addEventListener(hmUI.event.CLICK_DOWN, btnDnCb);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 79

### `.c1()` *(no record in this KB)*

```js
w2 = Math.round(Utils.c1(w1, 2) * 1000);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 169

```js
w2 = Math.round(Utils.c1(w1, 1) * 1000);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 171

### `.c2()` *(no record in this KB)*

```js
w2 = Math.round(Utils.c2(w1, 3) / 0.0022046);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 174

```js
w2 = Math.round(Utils.c2(w1, 2) / 0.0022046);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 176

### `.calc32Data()` *(no record in this KB)*

```js
const w1 = Utils.calc32Data(
  dataview.getUint8(10),
  dataview.getUint8(11),
  dataview.getUint8(12),
  0
);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 160

### `.cancel()` — **ambiguous**: module `@zos/alarm.cancel` or `@zos/notification.cancel`

```js
alarmMgr.cancel(b);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/alarm.js`, line 67

```js
notificationMgr.cancel(b);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/notification.js`, line 70

### `.clear()` — **ambiguous**: called on `@zos/storage.localStorage` or `@zos/storage.localStorage-instance` or `@zos/storage.sessionStorage` or `@zos/storage.sessionStorage-instance` or `@zos/storage.ShareLocalStorage` or `@zos/storage.ShareTypedStorage` or `@zos/storage.TypedStorage` or `@zos/utils.EventBus`

```js
canvasIndex2.clear(CANVAS_STYLE_2_CLEAR_1);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 166

```js
canvasIndex1.clear({
  ...CANVAS_STYLE_1_CLEAR_1,
  x: anim.posx,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 212

### `.cmpLength()` *(no record in this KB)*

```js
} else if (Utils.cmpLength(cnParam.data, 19)) {
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 158

### `.createTimer()` *(no record in this KB)*

```js
// animTimer = timer.createTimer(0, 100, timerCB, undefined);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 237

### `.createWidget()` — `@zos/ui.createWidget`

```js
vc.createWidget(hmUI.widget.FILL_RECT, {
  ...EMPTY_SPACE,
  y,
});
```
— `zeppos-samples/application/3.0/3.0-feature/components/empty-space/index.js`, line 7

```js
textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
  ...Styles.TEXT_STYLE,
  text: "ACC Info simulator sample value from positive horizontal to negative horizontal",
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 14

### `.deleteWidget()` — `@zos/ui.deleteWidget`

```js
hmUI.deleteWidget(vc), (vc = null);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 83

### `.drawCircle()` *(no record in this KB)*

```js
canvasIndex2.drawCircle({
  center_x: CANVAS_1.center_x,
  center_y: CANVAS_1.center_y,
  radius: CANVAS_1.radius,
  color: 0xfff400,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 110

```js
canvasIndex2.drawCircle({
  center_x: CANVAS_2.center_x,
  center_y: CANVAS_2.center_y,
  radius: CANVAS_2.radius,
  color: 0x1ff4ff,
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 117

### `.drawFill()` *(no record in this KB)*

```js
canvasIndex2.drawFill(CANVAS_STYLE_2_REC_1);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 125

```js
canvasIndex2.drawFill(CANVAS_STYLE_2_REC_2);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 126

### `.drawImage()` *(no record in this KB)*

```js
canvasIndex0.drawImage({
  x: 0,
  y: 0,
  w: DEVICE_WIDTH,
  h: DEVICE_HEIGHT,
  alpha: 255,
  image: "images/canvas/backg.png",
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 62

```js
canvasIndex1.drawImage({
  ...CANVAS_STYLE_1_IMG,
  image: "images/canvas/anim2/WDF_Animation_1.png",
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 93

### `.drawText()` *(no record in this KB)*

```js
canvasIndex0.drawText({
  ...CANVAS_TEXT,
  text: "all in canvas",
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 71

### `.emit()` — `@zos/utils.EventBus`

```js
devEvent.emit("scan", result.dev_addr);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 82

```js
devEvent.emit("error");
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 101

### `.exit()` — **ambiguous**: module `@zos/app-service.exit` or `@zos/router.exit`

```js
appServiceMgr.exit();
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 37

### `.getAllAlarms()` — `@zos/alarm.getAllAlarms`

```js
let alarms = alarmMgr.getAllAlarms();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/alarm.js`, line 39

### `.getAllAppServices()` — `@zos/app-service.getAllAppServices`

```js
let services = appService.getAllAppServices();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 119

### `.getAllNotifications()` — `@zos/notification.getAllNotifications`

```js
let notifications = notificationMgr.getAllNotifications();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/notification.js`, line 52

### `.getCurrent()` — **ambiguous**: called on `@zos/sensor.Accelerometer` or `@zos/sensor.Battery` or `@zos/sensor.BloodOxygen` or `@zos/sensor.BodyTemperature` or `@zos/sensor.Calorie` or `@zos/sensor.Distance` or `@zos/sensor.FatBurning` or `@zos/sensor.Gyroscope` or `@zos/sensor.HeartRate` or `@zos/sensor.Stand` or `@zos/sensor.Step` or `@zos/sensor.Stress`

```js
const result = spo2Sr.getCurrent();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/spo2.js`, line 21

### `.getDailySummary()` — `@zos/sensor.HeartRate`

```js
let maxHr = hrSr.getDailySummary();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/heart.js`, line 26

### `.getDate()` — `@zos/sensor.Time`

```js
}-${dateTime.getDate()}`
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 100

```js
init_val_index: dateTime.getDate() - 1,
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 168

### `.getDirection()` — `@zos/sensor.Compass`

```js
show_text += "\ndirection:" + compass.getDirection();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/compass.js`, line 22

### `.getDirectionAngle()` — `@zos/sensor.Compass`

```js
show_text += "\ndirection_angle:" + compass.getDirectionAngle();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/compass.js`, line 21

### `.getFullYear()` — `@zos/sensor.Time`

```js
`${dateTime.getFullYear()}-${
  dateTime.getMonth() + 1
}-${dateTime.getDate()}`
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 98

```js
init_val_index: dateTime.getFullYear() - 1970,
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 172

### `.getHistory()` — `@zos/sensor.Workout`

```js
const history = workout.getHistory();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/workout.js`, line 18

### `.getHours()` — `@zos/sensor.Time`

```js
content: `Now the time is ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`,
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 17

```js
`${moduleName} time report: ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 45

### `.getLastWeek()` — **ambiguous**: called on `@zos/sensor.Pai` or `@zos/sensor.Stress`

```js
let all7DaysHours = stressSr.getLastWeek();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/stress.js`, line 109

### `.getLastWeekByHour()` — `@zos/sensor.Stress`

```js
let allDays = stressSr.getLastWeekByHour();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/stress.js`, line 133

### `.getLogger()` — `@zos/utils.log`

```js
const logger = log.getLogger("system_event_service");
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/system_event_service.js`, line 2

```js
const logger = log.getLogger("time.service");
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 10

### `.getMinutes()` — `@zos/sensor.Time`

```js
content: `Now the time is ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`,
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 17

```js
`${moduleName} time report: ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 45

### `.getMonth()` — `@zos/sensor.Time`

```js
dateTime.getMonth() + 1
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 99

```js
init_val_index: dateTime.getMonth(),
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 164

### `.getNap()` — `@zos/sensor.Sleep`

```js
let shortSlp = sleepSr.getNap();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/sleep.js`, line 38

### `.getSeconds()` — `@zos/sensor.Time`

```js
content: `Now the time is ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`,
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 17

```js
`${moduleName} time report: ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 45

### `.getSleepingStatus()` — `@zos/sensor.Sleep`

```js
let sleeping = sleepSr.getSleepingStatus();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/sleep.js`, line 26

### `.getStatus()` — **ambiguous**: called on `@zos/media.Player` or `@zos/media.Recorder` or `@zos/sensor.Compass` or `@zos/sensor.Geolocation` or `@zos/sensor.Screen` or `@zos/sensor.Wear` or `@zos/sensor.Workout`

```js
text: "screen Info: status: " + screen.getStatus(),
```
— `zeppos-samples/application/3.0/3.0-feature/pages/screen.js`, line 16

```js
const show_text = "screen Info: status: " + screen.getStatus();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/screen.js`, line 21

### `.getTime()` — `@zos/sensor.Time`

```js
alarmObj.time = Math.floor(dateTime.getTime() / 1000);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 70

### `.getToday()` — **ambiguous**: called on `@zos/sensor.BodyTemperature` or `@zos/sensor.HeartRate` or `@zos/sensor.Pai` or `@zos/sensor.Stress`

```js
let allday = stressSr.getToday();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/stress.js`, line 57

### `.getTodayByHour()` — `@zos/sensor.Stress`

```js
let allHours = stressSr.getTodayByHour();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/stress.js`, line 81

### `.getUint16()` *(no record in this KB)*

```js
const r = dataview.getUint16(7, true);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 155

```js
const impedance = dataview.getUint16(13, true);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 179

### `.getUint8()` *(no record in this KB)*

```js
const unit = dataview.getUint8(21);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 159

```js
dataview.getUint8(10),
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 161

### `.mstBuildProfile()` — `@zos/ble.mstBuildProfile`

```js
hmBle.mstBuildProfile(profileObject);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 57

### `.mstConnect()` — `@zos/ble.mstConnect`

```js
hmBle.mstConnect(mac, function (conParam) {
  console.log("----------mstConnect");
  console.log(conParam.connected, conParam.connect_id);
  if (conParam.connected === 0) {
    console.log("**************connected");
    hmBle.mstDisconnect(() => {
      console.log("----------mstDisconnect");
      devEvent.emit("error");
    });
    hmBle.mstOnPrepare(function (preParam) {
      console.log("----------mstOnPrepare");
      if (preParam.status === 0) {
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 94

### `.mstDisconnect()` — `@zos/ble.mstDisconnect`

```js
hmBle.mstDisconnect(() => {
  console.log("----------mstDisconnect");
  devEvent.emit("error");
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 99

```js
hmBle.mstDisconnect(connectId);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 204

### `.mstOffAllCb()` — `@zos/ble.mstOffAllCb`

```js
hmBle.mstOffAllCb();
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 209

### `.mstOnCharaNotification()` — `@zos/ble.mstOnCharaNotification`

```js
hmBle.mstOnCharaNotification(function (cnParam) {
  console.log("----------mstOnCharaNotification");
  console.log("*1***", cnParam.uuid);
  console.log("*2***", cnParam.length);
  console.log("*3***", cnParam.profile);
  const arr = Utils.ab2Str(cnParam.data);

  console.log("*origin data***", JSON.stringify(arr));
  if (cnParam.data.byteLength < 6) {
    return;
  }
  const dataview = new DataView(cnParam.data);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 143

### `.mstOnCharaValueArrived()` — `@zos/ble.mstOnCharaValueArrived`

```js
hmBle.mstOnCharaValueArrived(function (ccParam) {
  console.log("----------mstOnCharaValueArrived");
  console.log(ccParam.profile, ccParam.uuid, ccParam.status);
  if (ccParam.status === 0) {
    console.log("**************CharaValueArrived");
  } else {
    console.log("===error CharaValueArrived");
    devEvent.emit("error");
  }
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 113

### `.mstOnCharaWriteComplete()` — `@zos/ble.mstOnCharaWriteComplete`

```js
hmBle.mstOnCharaWriteComplete(function (ccParam) {
  console.log("----------mstOnCharaWriteComplete");
  console.log(ccParam.profile, ccParam.uuid, ccParam.status);
  if (ccParam.status === 0) {
    console.log("**************CharaWriteComplete");
  } else {
    console.log("===error mstOnCharaWriteComplete");
    devEvent.emit("error");
  }
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 123

### `.mstOnDescValueArrived()` — `@zos/ble.mstOnDescValueArrived`

```js
hmBle.mstOnDescValueArrived(function (param) {
  console.log("----------mstOnDescValueArrived");
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 133

### `.mstOnDescWriteComplete()` — `@zos/ble.mstOnDescWriteComplete`

```js
hmBle.mstOnDescWriteComplete(function (dwcParam) {
  console.log("----------mstOnDescWriteComplete");
  console.log("*1***", dwcParam.chara);
  console.log("*2***", dwcParam.desc);
  console.log("*3***", dwcParam.status);
  console.log("*4***", dwcParam.profile);
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 136

### `.mstOnPrepare()` — `@zos/ble.mstOnPrepare`

```js
hmBle.mstOnPrepare(function (preParam) {
  console.log("----------mstOnPrepare");
  if (preParam.status === 0) {
    console.log("**************prepared");
    createListen(preParam.profile);
  } else {
    console.log("===error mstOnPrepare");
    devEvent.emit("error");
  }
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 103

### `.mstOnServiceChangeBegin()` — `@zos/ble.mstOnServiceChangeBegin`

```js
hmBle.mstOnServiceChangeBegin(function (param) {
  console.log("----------mstOnServiceChangeBegin");
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 189

### `.mstOnServiceChangeEnd()` — `@zos/ble.mstOnServiceChangeEnd`

```js
hmBle.mstOnServiceChangeEnd(function (param) {
  console.log("----------mstOnServiceChangeEnd");
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 192

### `.mstStartScan()` — `@zos/ble.mstStartScan`

```js
hmBle.mstStartScan(function (result) {
  console.log("--has been scanned---", result.dev_name);
  if (result.dev_name !== deviceName) {
    return;
  }
  console.log("--target device----", JSON.stringify(result));
  devEvent.emit("scan", result.dev_addr);
});
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 76

### `.mstStopScan()` — `@zos/ble.mstStopScan`

```js
hmBle.mstStopScan();
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 88

### `.mstWriteDescriptor()` — `@zos/ble.mstWriteDescriptor`

```js
hmBle.mstWriteDescriptor(
  profile,
  `0000${uuid}-0000-1000-8000-00805f9b34fb`,
  "2902",
  data,
  arr.length
);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 65

### `.notify()` — `@zos/notification.notify`

```js
notificationMgr.notify({
  title: "Time Service",
  content: `Now the time is ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`,
  actions: [
    {
      text: "Home Page",
      file: "pages/index",
    },
    {
      text: "Stop Service",
      file: "app-service/time_service",
      param: "action=exit", //! processed in onEvent()
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 15

```js
notificationMgr.notify({
  title: "This is title",
  content: "This is content ...",
  actions: [
    {
      text: "Home Page",
      file: "pages/index",
    },
    {
      text: "GO1",
      file: "pages/target",
      param: "GO1 button Clicked",
```
— `zeppos-samples/application/3.0/3.0-feature/pages/notification.js`, line 29

### `.offChange()` — **ambiguous**: called on `@zos/sensor.Accelerometer` or `@zos/sensor.Barometer` or `@zos/sensor.Battery` or `@zos/sensor.BloodOxygen` or `@zos/sensor.Calorie` or `@zos/sensor.Compass` or `@zos/sensor.Distance` or `@zos/sensor.FatBurning` or `@zos/sensor.Geolocation` or `@zos/sensor.Gyroscope` or `@zos/sensor.Screen` or `@zos/sensor.Stand` or `@zos/sensor.Step` or `@zos/sensor.Stress` or `@zos/sensor.Wear`

```js
screen.offChange(callback);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/screen.js`, line 39

```js
spo2Sr.offChange(callback);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/spo2.js`, line 47

### `.on()` — `@zos/utils.EventBus`

```js
devEvent.on("scan", (addr) => {
  console.log("---emit scan---");
  const devAddrArr = ab2Arr(addr).map((d) => d.toString(16).toUpperCase());
  const devAddrStr = devAddrArr.join(":");
  console.log("---device mac---", devAddrStr);
  textWidget && textWidget.setProperty(hmUI.prop.TEXT, devAddrStr);
  stopScanDevice();
  startConnect(addr);
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/ble.js`, line 59

```js
devEvent.on("data", (text) => {
  textWidget &&
    textWidget.setProperty(hmUI.prop.TEXT, `data:${text.toString()}`);
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/ble.js`, line 69

### `.onChange()` — **ambiguous**: called on `@zos/sensor.Accelerometer` or `@zos/sensor.Barometer` or `@zos/sensor.Battery` or `@zos/sensor.BloodOxygen` or `@zos/sensor.Calorie` or `@zos/sensor.Compass` or `@zos/sensor.Distance` or `@zos/sensor.FatBurning` or `@zos/sensor.Geolocation` or `@zos/sensor.Gyroscope` or `@zos/sensor.Screen` or `@zos/sensor.Stand` or `@zos/sensor.Step` or `@zos/sensor.Stress` or `@zos/sensor.Wear`

```js
acc.onChange(function (cb_info) {
  const show_text =
    "acc info\nx:" + cb_info.x + "\ny:" + cb_info.y + "\nz:" + cb_info.z;
  textWidget.setProperty(hmUI.prop.TEXT, show_text);
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 19

```js
compass.onChange(function () {
  let show_text = "compass info:";
  show_text += "\ndirection_angle:" + compass.getDirectionAngle();
  show_text += "\ndirection:" + compass.getDirection();
  text.setProperty(hmUI.prop.TEXT, show_text);
});
```
— `zeppos-samples/application/3.0/3.0-feature/pages/compass.js`, line 19

### `.onPerDay()` — `@zos/sensor.Time`

```js
timeSensor.onPerDay(() => {
  logger.log(moduleName + " === day change ===");
});
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 50

### `.onPerMinute()` — `@zos/sensor.Time`

```js
timeSensor.onPerMinute(() => {
  logger.log(
    `${moduleName} time report: ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`
  );
  sendNotification();
});
```
— `zeppos-samples/application/3.0/3.0-feature/app-service/time_service.js`, line 43

### `.redraw()` — `@zos/ui.redraw`

```js
hmUI.redraw();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 84

### `.set()` — `@zos/alarm.set`

```js
let id = alarmMgr.set(alarmObj);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 77

### `.setDate()` *(no record in this KB)*

```js
dateTime.setDate(value_index + 1); // 1~31
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 137

### `.setFullYear()` *(no record in this KB)*

```js
dateTime.setFullYear(value_index + 1970);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 140

### `.setHours()` *(no record in this KB)*

```js
dateTime.setHours(value_index);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 189

### `.setMinutes()` *(no record in this KB)*

```js
dateTime.setMinutes(dateTime.getMinutes() + 5);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 21

```js
dateTime.setMinutes(value_index);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 192

### `.setMonth()` *(no record in this KB)*

```js
dateTime.setMonth(value_index); // 0~11
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 134

### `.setProperty()` — `@zos/ui.setProperty`

```js
textWidget.setProperty(hmUI.prop.TEXT, show_text);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 22

```js
function setProperty(w, p, v) {
  w.setProperty(p, v);
}
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 11

### `.setSeconds()` *(no record in this KB)*

```js
dateTime.setSeconds(value_index);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 195

### `.showToast()` — `@zos/interaction.showToast`

```js
hmUI.showToast({ text: `start result: ${info.result}` });
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 57

```js
hmUI.showToast({ text: `stop result: ${info.result}` });
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 88

### `.start()` — **ambiguous**: module `@zos/app-service.start`; called on `@zos/crypto.DigestCrypto` or `@zos/media.Player` or `@zos/media.Recorder` or `@zos/sensor.Accelerometer` or `@zos/sensor.BloodOxygen` or `@zos/sensor.Buzzer` or `@zos/sensor.Compass` or `@zos/sensor.Geolocation` or `@zos/sensor.Gyroscope` or `@zos/sensor.SystemSounds` or `@zos/sensor.Vibrator`

```js
acc.start();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 30

```js
const result = appService.start({
  url: serviceFile,
  param: `service=${serviceFile}&action=start`,
  complete_func: (info) => {
    logger.log(`startService result: ` + JSON.stringify(info));
    hmUI.showToast({ text: `start result: ${info.result}` });
    // refresh for button status

    if (info.result) {
      vm.state.running = true;
      setProperty(
        vm.state.txtLabel,
```
— `zeppos-samples/application/3.0/3.0-feature/pages/bgService.js`, line 52

### `.stop()` — **ambiguous**: module `@zos/app-service.stop`; called on `@zos/media.Player` or `@zos/media.Recorder` or `@zos/sensor.Accelerometer` or `@zos/sensor.BloodOxygen` or `@zos/sensor.Buzzer` or `@zos/sensor.Compass` or `@zos/sensor.Geolocation` or `@zos/sensor.Gyroscope` or `@zos/sensor.SystemSounds` or `@zos/sensor.Vibrator`

```js
acc.stop();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 39

```js
acc && acc.stop();
```
— `zeppos-samples/application/3.0/3.0-feature/pages/acc.js`, line 48

### `.stopTimer()` — `@zos/timer.stopTimer`

```js
// timer.stopTimer(animTimer);
```
— `zeppos-samples/application/3.0/3.0-feature/pages/canvas.js`, line 244

### `.substr()` *(no record in this KB)*

```js
queryString[0] === "?" ? queryString.substr(1) : queryString
```
— `zeppos-samples/application/3.0/3.0-feature/libs/utils.js`, line 11

### `.toBuffer()` *(no record in this KB)*

```js
let data = Utils.toBuffer(arr);
```
— `zeppos-samples/application/3.0/3.0-feature/libs/ble.js`, line 63

### `.toLocaleString()` *(no record in this KB)*

```js
"time: " + d.toLocaleString() + ", value:" + result.value + "\n";
```
— `zeppos-samples/application/3.0/3.0-feature/pages/spo2.js`, line 25

### `.UTC()` *(no record in this KB)*

```js
//time: dateTime.UTC()/1000,
```
— `zeppos-samples/application/3.0/3.0-feature/pages/newAlarm.js`, line 40

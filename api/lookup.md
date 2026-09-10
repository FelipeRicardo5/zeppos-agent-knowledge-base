# Lookup — every name, and what owns it

Start here when you have a bare name and nothing else: a symbol out of
someone else's code, a method called on a value, a constant passed to a
function. Every other index in this base is keyed by module, `API_LEVEL` or
runtime — by where a thing sits rather than by what it is called.

**733 names**, 1168 entries: 397 enum values, 257 members, 514 symbols. 241 names have more than one owner.

**A name with several owners is not a duplicate.** 12 sensors document a
`getCurrent` and they return 12 different shapes; `CENTER_H` belongs to
`@zos/ui.align` in a Device App and `hmUI.align` in a watchface. Read the
row whose runtime matches what you are building.

Bare numeric domains are excluded — `retCode` 0..10, the weather `index`
0..28. Those are values, not names, and indexing them put `0` here with
eleven owners. Look those up on the owning symbol's page instead.

| Name | Kind | Written as | Runtimes | Min API_LEVEL | Page |
| --- | --- | --- | --- | --- | --- |
| `Accelerometer` | symbol | `@zos/sensor.Accelerometer` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `addEventListener` | member | `@zos/media.Player.addEventListener()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `addEventListener` | member | `@zos/media.Recorder.addEventListener()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `addEventListener` | symbol | `@zos/ui.addEventListener` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiaddeventlistener) |
| `addEventListener` | symbol | `hmSensor.addEventListener` | watchface | not stated | [hmSensor](hmSensor.md#hmsensoraddeventlistener) |
| `addHealthData` | symbol | `@zos/user.addHealthData` | device-app | >= 3 | [zos-user](zos-user.md#zosuseraddhealthdata) |
| `addLayoutChild` | symbol | `@zos/ui.addLayoutChild` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiaddlayoutchild) |
| `addListener` | symbol | `@zos/ble.addListener` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbleaddlistener) |
| `addListener` | symbol | `hmBle.addListener` | watchface | not stated | [hmBle](hmBle.md#hmbleaddlistener) |
| `addListener` | symbol | `messaging.addListener` | side-service | not stated | [messaging](messaging.md#messagingaddlistener) |
| `addListener` | symbol | `settings-storage.addListener` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storageaddlistener) |
| `AESCrypto` | symbol | `@zos/crypto.AESCrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `ALARM` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `ALARM_CLOCK` | enum value | `data_type.ALARM_CLOCK` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `alg` | symbol | `@zos/crypto.alg` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoalg) |
| `align` | symbol | `@zos/ui.align` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `align` | symbol | `hmUI.align` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `ALPHA` | enum value | `prop.ALPHA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ALTIMETER` | enum value | `data_type.ALTIMETER` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `altitude` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `ALTITUDE` | enum value | `data_type.ALTITUDE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `ANGLE` | enum value | `prop.ANGLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_PAUSE` | enum value | `prop.ANIM_IS_PAUSE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_PAUSE` | enum value | `prop.ANIM_IS_PAUSE` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `ANIM_IS_RUNINNG` | enum value | `prop.ANIM_IS_RUNINNG` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_RUNINNG` | enum value | `prop.ANIM_IS_RUNINNG` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `ANIM_IS_STOP` | enum value | `prop.ANIM_IS_STOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_STOP` | enum value | `prop.ANIM_IS_STOP` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `anim_status` | symbol | `@zos/ui.anim_status` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `anim_status` | symbol | `hmUI.anim_status` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `ANIM_STATUS` | enum value | `prop.ANIM_STATUS` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `AOD` | enum value | `screen_type.AOD` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `App` | symbol | `@zos/global.App` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalapp) |
| `APP` | enum value | `screen_type.APP` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `appPlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/app.appPlugin` | device-app | not stated | [zeppos-zml-2.0-module-messaging-plugin-app](zeppos-zml-2.0-module-messaging-plugin-app.md#zepposzml20modulemessagingpluginappappplugin) |
| `AppService` | symbol | `@zos/global.AppService` | device-app | >= 3 | [zos-global](zos-global.md#zosglobalappservice) |
| `AppWidget` | symbol | `@zos/global.AppWidget` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `AQI` | enum value | `data_type.AQI` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `ARC` | symbol | `@zos/ui.ARC` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `ARC` | enum value | `widget.ARC` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `ARC` | symbol | `hmUI.widget.ARC` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `ARC_PROGRESS` | symbol | `hmUI.widget.ARC_PROGRESS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `assets` | symbol | `@zos/utils.assets` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilsassets) |
| `Auth` | symbol | `ui.Auth` | settings | not stated | [ui](ui.md#uiauth) |
| `avg_cadence` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `avg_pace` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `avg_speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `back` | symbol | `@zos/router.back` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterback) |
| `BACKSPACE` | enum value | `keyboard.BACKSPACE` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `Barometer` | symbol | `@zos/sensor.Barometer` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorbarometer) |
| `BaseApp` | symbol | `@zeppos/zml/base-app.BaseApp` | device-app, workout-extension | not stated | [zeppos-zml-base-app](zeppos-zml-base-app.md#zepposzmlbase-appbaseapp) |
| `BaseApp` | symbol | `@zeppos/zml/base/base-app.BaseApp` | device-app | not stated | [zeppos-zml-base-base-app](zeppos-zml-base-base-app.md#zepposzmlbasebase-appbaseapp) |
| `BasePage` | symbol | `@zeppos/zml/base-page.BasePage` | device-app, workout-extension | not stated | [zeppos-zml-base-page](zeppos-zml-base-page.md#zepposzmlbase-pagebasepage) |
| `BasePage` | symbol | `@zeppos/zml/base/base-page.BasePage` | device-app | not stated | [zeppos-zml-base-base-page](zeppos-zml-base-base-page.md#zepposzmlbasebase-pagebasepage) |
| `BaseSideService` | symbol | `@zeppos/zml/base-side.BaseSideService` | side-service | not stated | [zeppos-zml-base-side](zeppos-zml-base-side.md#zepposzmlbase-sidebasesideservice) |
| `BaseSideService` | symbol | `@zeppos/zml/base/base-side.BaseSideService` | side-service | not stated | [zeppos-zml-base-base-side](zeppos-zml-base-base-side.md#zepposzmlbasebase-sidebasesideservice) |
| `Battery` | symbol | `@zos/sensor.Battery` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbattery) |
| `BATTERY` | enum value | `data_type.BATTERY` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuidata_type) |
| `BATTERY` | enum value | `id.BATTERY` | watchface | not stated | [hmSensor](hmSensor.md#hmsensorid) |
| `BATTERY` | symbol | `hmSensor.id.BATTERY` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbattery) |
| `BATTERY` | enum value | `data_type.BATTERY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `BloodOxygen` | symbol | `@zos/sensor.BloodOxygen` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `BODY_TEMP` | symbol | `hmSensor.id.BODY_TEMP` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbody_temp) |
| `BODY_TEMP` | enum value | `data_type.BODY_TEMP` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `BodyTemperature` | symbol | `@zos/sensor.BodyTemperature` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `BOTTOM` | enum value | `align.BOTTOM` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `BOTTOM` | enum value | `align.BOTTOM` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `BREATH_TRAIN` | enum value | `data_type.BREATH_TRAIN` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `Buffer` | symbol | `@zos/global.Buffer` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalbuffer) |
| `bufferToString` | symbol | `@zos/utils.bufferToString` | device-app | >= 4 | [zos-utils](zos-utils.md#zosutilsbuffertostring) |
| `Button` | symbol | `ui.Button` | settings | not stated | [ui](ui.md#uibutton) |
| `BUTTON` | symbol | `@zos/ui.BUTTON` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `BUTTON` | enum value | `widget.BUTTON` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `BUTTON` | enum value | `widget.BUTTON` | watchface | not stated | [hmUI](hmUI.md#hmuiwidget) |
| `BUTTON` | symbol | `hmUI.widget.BUTTON` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `Buzzer` | symbol | `@zos/sensor.Buzzer` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `Buzzer` | symbol | `@zos/ui.Buzzer` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuibuzzer) |
| `cadence` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `CAL` | enum value | `data_type.CAL` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `CAL_TARGET` | enum value | `data_type.CAL_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `Calorie` | symbol | `@zos/sensor.Calorie` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `CALORIE` | symbol | `hmSensor.id.CALORIE` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridcalorie) |
| `calories` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `cancel` | symbol | `@zos/alarm.cancel` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmcancel) |
| `cancel` | symbol | `@zos/notification.cancel` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationcancel) |
| `CANCEL` | enum value | `keyboard.CANCEL` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `canceled` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `CANVAS` | symbol | `@zos/ui.CANVAS` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `CENTER_H` | enum value | `align.CENTER_H` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `CENTER_H` | enum value | `align.CENTER_H` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `CENTER_V` | enum value | `align.CENTER_V` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `CENTER_V` | enum value | `align.CENTER_V` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `change` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> FileEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `CHAR` | enum value | `inputType.CHAR` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `CHAR_WRAP` | enum value | `text_style.CHAR_WRAP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `CHECKBOX_GROUP` | symbol | `@zos/ui.CHECKBOX_GROUP` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `CHECKBOX_GROUP` | enum value | `widget.CHECKBOX_GROUP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `CHECKED` | enum value | `prop.CHECKED` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `checkSensor` | symbol | `@zos/sensor.checkSensor` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorchecksensor) |
| `checkSystemApp` | symbol | `@zos/router.checkSystemApp` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `CIRCLE` | symbol | `@zos/ui.CIRCLE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `CIRCLE` | enum value | `widget.CIRCLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `CIRCLE` | symbol | `hmUI.widget.CIRCLE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `clear` | member | `@zos/storage.localStorage.clear()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `clear` | member | `@zos/storage.localStorage-instance.clear()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `clear` | member | `@zos/storage.sessionStorage.clear()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `clear` | member | `@zos/storage.sessionStorage-instance.clear()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage-instance) |
| `clear` | member | `@zos/storage.ShareLocalStorage.clear()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `clear` | member | `@zos/storage.ShareTypedStorage.clear()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `clear` | member | `@zos/storage.TypedStorage.clear()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `clear` | member | `@zos/utils.EventBus.clear()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `clear` | symbol | `settings-storage.clear` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storageclear) |
| `clearInterval` | symbol | `@zos/global.clearInterval` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalclearinterval) |
| `clearLaunchAppTimeout` | symbol | `@zos/router.clearLaunchAppTimeout` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterclearlaunchapptimeout) |
| `clearTimeout` | symbol | `@zos/global.clearTimeout` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalcleartimeout) |
| `CLICK_DOWN` | enum value | `event.CLICK_DOWN` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `CLICK_UP` | enum value | `event.CLICK_UP` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `CLOCK` | enum value | `system_status.CLOCK` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `close` | symbol | `hmFS.close` | watchface | not stated | [hmFS](hmFS.md#hmfsclose) |
| `closeSync` | symbol | `@zos/fs.closeSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsclosesync) |
| `closeSync` | member | `@zos/share-storage.FileSystem.closeSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `Compass` | symbol | `@zos/sensor.Compass` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `connectStatus` | symbol | `@zos/ble.connectStatus` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbleconnectstatus) |
| `connectStatus` | symbol | `hmBle.connectStatus` | watchface | not stated | [hmBle](hmBle.md#hmbleconnectstatus) |
| `console` | symbol | `@zos/global.console` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalconsole) |
| `console.log` | symbol | `global.console.log` | settings, side-service | not stated | [global](global.md#globalconsolelog) |
| `CONSUME` | enum value | `sport_data.CONSUME` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `convert` | symbol | `image-convert.convert` | side-service | not stated | [image-convert](image-convert.md#image-convertconvert) |
| `convertLib` | symbol | `@zeppos/zml/base-side.convertLib` | side-service | not stated | [zeppos-zml-base-side](zeppos-zml-base-side.md#zepposzmlbase-sideconvertlib) |
| `count` | member | `@zos/utils.EventBus.count()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `COUNT_DOWN` | enum value | `data_type.COUNT_DOWN` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `CRCCrypto` | symbol | `@zos/crypto.CRCCrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptocrccrypto) |
| `create` | symbol | `@zos/media.create` | device-app | >= 3 | [zos-media](zos-media.md#zosmediacreate) |
| `createChiper` | member | `@zos/crypto.AESCrypto.createChiper()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `createChiper` | member | `@zos/crypto.ECDSACrypto.createChiper()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `createConnect` | symbol | `@zos/ble.createConnect` | device-app | >= 2 | [zos-ble](zos-ble.md#zosblecreateconnect) |
| `createConnect` | symbol | `hmBle.createConnect` | watchface | not stated | [hmBle](hmBle.md#hmblecreateconnect) |
| `createDialog` | symbol | `@zos/ui.createDialog` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicreatedialog) |
| `createKeyboard` | symbol | `@zos/ui.createKeyboard` | device-app | not stated | [zos-ui](zos-ui.md#zosuicreatekeyboard) |
| `createModal` | symbol | `@zos/interaction.createModal` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `createSensor` | symbol | `hmSensor.createSensor` | watchface | not stated | [hmSensor](hmSensor.md#hmsensorcreatesensor) |
| `createSysTimer` | symbol | `@zos/timer.createSysTimer` | device-app | >= 4 | [zos-timer](zos-timer.md#zostimercreatesystimer) |
| `createTimer` | symbol | `timer.createTimer` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `createWidget` | symbol | `@zos/ui.createWidget` | device-app, workout-extension | >= 2 | [zos-ui](zos-ui.md#zosuicreatewidget) |
| `createWidget` | symbol | `hmUI.createWidget` | watchface | not stated | [hmUI](hmUI.md#hmuicreatewidget) |
| `CYCLE_IMAGE_TEXT_LIST` | symbol | `@zos/ui.CYCLE_IMAGE_TEXT_LIST` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `CYCLE_IMAGE_TEXT_LIST` | enum value | `widget.CYCLE_IMAGE_TEXT_LIST` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `CYCLE_LIST` | symbol | `@zos/ui.CYCLE_LIST` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `CYCLE_LIST` | enum value | `widget.CYCLE_LIST` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `data_type` | symbol | `@zos/ui.data_type` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuidata_type) |
| `data_type` | symbol | `hmUI.data_type` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `DataWidget` | symbol | `@zos/global.DataWidget` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `date` | symbol | `hmUI.date` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `DATE_FORMAT_DMY` | symbol | `@zos/settings.DATE_FORMAT_DMY` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_dmy) |
| `DATE_FORMAT_DMY` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_FORMAT_MDY` | symbol | `@zos/settings.DATE_FORMAT_MDY` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_mdy) |
| `DATE_FORMAT_MDY` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_FORMAT_YMD` | symbol | `@zos/settings.DATE_FORMAT_YMD` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_ymd) |
| `DATE_FORMAT_YMD` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_POINTER` | symbol | `hmUI.widget.DATE_POINTER` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdate_pointer) |
| `DAY` | enum value | `date.DAY` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `debug` | member | `@zos/utils.log.debug()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `decrypt` | member | `@zos/crypto.AESCrypto.decrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `decrypt` | member | `@zos/crypto.ECDSACrypto.decrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `DELEGATE` | symbol | `hmUI.widget.DELEGATE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdelegate) |
| `deleteKeyboard` | symbol | `@zos/ui.deleteKeyboard` | device-app | not stated | [zos-ui](zos-ui.md#zosuideletekeyboard) |
| `deleteWidget` | symbol | `@zos/ui.deleteWidget` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuideletewidget) |
| `deleteWidget` | symbol | `hmUI.deleteWidget` | watchface | not stated | [hmUI](hmUI.md#hmuideletewidget) |
| `DIALOG` | symbol | `@zos/ui.DIALOG` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `DIALOG` | enum value | `widget.DIALOG` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `DigestCrypto` | symbol | `@zos/crypto.DigestCrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `disConnect` | symbol | `@zos/ble.disConnect` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbledisconnect) |
| `disConnect` | symbol | `hmBle.disConnect` | watchface | not stated | [hmBle](hmBle.md#hmbledisconnect) |
| `distance` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `Distance` | symbol | `@zos/sensor.Distance` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensordistance) |
| `DISTANCE` | symbol | `hmSensor.id.DISTANCE` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoriddistance) |
| `DISTANCE` | enum value | `data_type.DISTANCE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `DISTANCE_TOTAL` | enum value | `sport_data.DISTANCE_TOTAL` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `DISTANCE_UNIT_IMPERIAL` | symbol | `@zos/settings.DISTANCE_UNIT_IMPERIAL` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdistance_unit_imperial) |
| `DISTANCE_UNIT_IMPERIAL` | enum value | `@zos/settings.getDistanceUnit -> Distance unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdistanceunit) |
| `DISTANCE_UNIT_METRIC` | symbol | `@zos/settings.DISTANCE_UNIT_METRIC` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdistance_unit_metric) |
| `DISTANCE_UNIT_METRIC` | enum value | `@zos/settings.getDistanceUnit -> Distance unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdistanceunit) |
| `DISTURB` | enum value | `system_status.DISTURB` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `downhill_count` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `downloadFile` | symbol | `download-file.downloadFile` | side-service | not stated | [download-file](download-file.md#download-filedownloadfile) |
| `dumpLayout` | symbol | `@zos/ui.dumpLayout` | device-app | not stated | [zos-ui](zos-ui.md#zosuidumplayout) |
| `duration` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `DURATION_NET` | enum value | `sport_data.DURATION_NET` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `E` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `ECDSA` | enum value | `alg.ECDSA` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoalg) |
| `ECDSACrypto` | symbol | `@zos/crypto.ECDSACrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `ecp_dp` | symbol | `@zos/crypto.ecp_dp` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `edit_widget_group_type` | symbol | `@zos/ui.edit_widget_group_type` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuiedit_widget_group_type) |
| `ELLIPSIS` | enum value | `text_style.ELLIPSIS` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `ELLIPSIS` | enum value | `text_style.ELLIPSIS` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `emit` | member | `@zos/utils.EventBus.emit()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `emitCustomSystemEvent` | symbol | `@zos/app.emitCustomSystemEvent` | device-app | >= 3 | [zos-app](zos-app.md#zosappemitcustomsystemevent) |
| `EMOJI` | enum value | `inputType.EMOJI` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `encrypt` | member | `@zos/crypto.AESCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `encrypt` | member | `@zos/crypto.CRCCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptocrccrypto) |
| `encrypt` | member | `@zos/crypto.DigestCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `encrypt` | member | `@zos/crypto.ECDSACrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `encryptKey` | symbol | `@zos/crypto.encryptKey` | device-app | >= 3 | [zos-crypto](zos-crypto.md#zoscryptoencryptkey) |
| `ENTER` | enum value | `keyboard.ENTER` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `error` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `error` | member | `@zos/utils.log.error()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `event` | symbol | `@zos/ui.event` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `EventBus` | symbol | `@zos/utils.EventBus` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `exit` | symbol | `@zos/app-service.exit` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-serviceexit) |
| `exit` | symbol | `@zos/router.exit` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterexit) |
| `FAILURE` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `FAT_BURNING` | enum value | `data_type.FAT_BURNING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FAT_BURNING_TARGET` | enum value | `data_type.FAT_BURNING_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FAT_BURRING` | symbol | `hmSensor.id.FAT_BURRING` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridfat_burring) |
| `FatBurning` | symbol | `@zos/sensor.FatBurning` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `fetch` | symbol | `fetch.fetch` | side-service | not stated | [fetch](fetch.md#fetchfetch) |
| `FILE` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> InboxEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `FileSystem` | symbol | `@zos/share-storage.FileSystem` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `FILL_RECT` | symbol | `@zos/ui.FILL_RECT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `FILL_RECT` | enum value | `widget.FILL_RECT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `FILL_RECT` | symbol | `hmUI.widget.FILL_RECT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `finish` | member | `@zos/crypto.DigestCrypto.finish()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `FLOOR` | enum value | `data_type.FLOOR` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FREE_TRAINING` | enum value | `data_type.FREE_TRAINING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Accelerometer.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Accelerometer.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Compass.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Compass.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_HIGH` | symbol | `@zos/sensor.FREQ_MODE_HIGH` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorfreq_mode_high) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Gyroscope.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `FREQ_MODE_HIGH` | enum value | `@zos/sensor.Gyroscope.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Accelerometer.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Accelerometer.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Compass.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Compass.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_LOW` | symbol | `@zos/sensor.FREQ_MODE_LOW` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorfreq_mode_low) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Gyroscope.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `FREQ_MODE_LOW` | enum value | `@zos/sensor.Gyroscope.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Accelerometer.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Accelerometer.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Compass.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Compass.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `FREQ_MODE_NORMAL` | symbol | `@zos/sensor.FREQ_MODE_NORMAL` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorfreq_mode_normal) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Gyroscope.setFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `FREQ_MODE_NORMAL` | enum value | `@zos/sensor.Gyroscope.getFreqMode -> Frequency Mode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `GENDER_FEMALE` | symbol | `@zos/user.GENDER_FEMALE` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_female) |
| `GENDER_FEMALE` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `GENDER_MALE` | symbol | `@zos/user.GENDER_MALE` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_male) |
| `GENDER_MALE` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `GENDER_UNSPECIFIED` | symbol | `@zos/user.GENDER_UNSPECIFIED` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_unspecified) |
| `GENDER_UNSPECIFIED` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `Geolocation` | symbol | `@zos/sensor.Geolocation` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `GESTURE_DOWN` | symbol | `@zos/interaction.GESTURE_DOWN` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiongesture_down) |
| `GESTURE_DOWN` | enum value | `@zos/interaction.onGesture -> Gesture event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `GESTURE_LEFT` | symbol | `@zos/interaction.GESTURE_LEFT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiongesture_left) |
| `GESTURE_LEFT` | enum value | `@zos/interaction.onGesture -> Gesture event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `GESTURE_RIGHT` | symbol | `@zos/interaction.GESTURE_RIGHT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiongesture_right) |
| `GESTURE_RIGHT` | enum value | `@zos/interaction.onGesture -> Gesture event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `GESTURE_UP` | symbol | `@zos/interaction.GESTURE_UP` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiongesture_up) |
| `GESTURE_UP` | enum value | `@zos/interaction.onGesture -> Gesture event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `getAFibRecord` | member | `@zos/sensor.HeartRate.getAFibRecord()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getAirPressure` | member | `@zos/sensor.Barometer.getAirPressure()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorbarometer) |
| `getAllAlarms` | symbol | `@zos/alarm.getAllAlarms` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmgetallalarms) |
| `getAllAppServices` | symbol | `@zos/app-service.getAllAppServices` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicegetallappservices) |
| `getAllNotifications` | symbol | `@zos/notification.getAllNotifications` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationgetallnotifications) |
| `getAltitude` | member | `@zos/sensor.Barometer.getAltitude()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorbarometer) |
| `getAodMode` | member | `@zos/sensor.Screen.getAodMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `getApp` | symbol | `@zos/global.getApp` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalgetapp) |
| `getAppIdByName` | symbol | `@zos/router.getAppIdByName` | device-app | >= 3.6 | [zos-router](zos-router.md#zosroutergetappidbyname) |
| `getAppWidgetSize` | symbol | `@zos/ui.getAppWidgetSize` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetappwidgetsize) |
| `getArtist` | member | `@zos/media.Player.getArtist()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getAutoBrightness` | symbol | `@zos/display.getAutoBrightness` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaygetautobrightness) |
| `getBool` | member | `@zos/share-storage.TypedStorage.getBool()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `getBool` | member | `@zos/storage.ShareTypedStorage.getBool()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `getBool` | member | `@zos/storage.TypedStorage.getBool()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `getBrightness` | symbol | `@zos/display.getBrightness` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaygetbrightness) |
| `getBrightness` | symbol | `hmSetting.getBrightness` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetbrightness) |
| `getConfig` | member | `@zos/sensor.Vibrator.getConfig()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `getCount` | member | `@zos/sensor.WorldClock.getCount()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `getCurrent` | member | `@zos/sensor.Accelerometer.getCurrent()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `getCurrent` | member | `@zos/sensor.Battery.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbattery) |
| `getCurrent` | member | `@zos/sensor.BloodOxygen.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `getCurrent` | member | `@zos/sensor.BodyTemperature.getCurrent()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `getCurrent` | member | `@zos/sensor.Calorie.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `getCurrent` | member | `@zos/sensor.Distance.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensordistance) |
| `getCurrent` | member | `@zos/sensor.FatBurning.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `getCurrent` | member | `@zos/sensor.Gyroscope.getCurrent()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `getCurrent` | member | `@zos/sensor.HeartRate.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getCurrent` | member | `@zos/sensor.Stand.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `getCurrent` | member | `@zos/sensor.Step.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstep) |
| `getCurrent` | member | `@zos/sensor.Stress.getCurrent()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `getCurrentPage` | symbol | `@zos/global.getCurrentPage` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalgetcurrentpage) |
| `getDailySummary` | member | `@zos/sensor.HeartRate.getDailySummary()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getDate` | member | `@zos/sensor.Time.getDate()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getDateFormat` | symbol | `@zos/settings.getDateFormat` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `getDateFormat` | symbol | `hmSetting.getDateFormat` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdateformat) |
| `getDay` | member | `@zos/sensor.Time.getDay()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getDeviceInfo` | symbol | `@zos/device.getDeviceInfo` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `getDeviceInfo` | symbol | `hmSetting.getDeviceInfo` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `getDirection` | member | `@zos/sensor.Compass.getDirection()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `getDirectionAngle` | member | `@zos/sensor.Compass.getDirectionAngle()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `getDiskInfo` | symbol | `@zos/device.getDiskInfo` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `getDiskInfo` | symbol | `hmSetting.getDiskInfo` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
| `getDistanceUnit` | symbol | `@zos/settings.getDistanceUnit` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdistanceunit) |
| `getDouble` | member | `@zos/share-storage.TypedStorage.getDouble()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `getDouble` | member | `@zos/storage.ShareTypedStorage.getDouble()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `getDouble` | member | `@zos/storage.TypedStorage.getDouble()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `getDuration` | member | `@zos/media.Player.getDuration()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getEnabled` | member | `@zos/sensor.Geolocation.getEnabled()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `getEnabled` | member | `@zos/sensor.SystemSounds.getEnabled()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `getFestival` | member | `@zos/sensor.Time.getFestival()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getForecastWeather` | member | `@zos/sensor.Weather.getForecastWeather()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `getFormatHour` | member | `@zos/sensor.Time.getFormatHour()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getFreqMode` | member | `@zos/sensor.Accelerometer.getFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `getFreqMode` | member | `@zos/sensor.Compass.getFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `getFreqMode` | member | `@zos/sensor.Gyroscope.getFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `getFullYear` | member | `@zos/sensor.Time.getFullYear()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getHistory` | member | `@zos/sensor.Workout.getHistory()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `getHourFormat` | member | `@zos/sensor.Time.getHourFormat()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getHours` | member | `@zos/sensor.Time.getHours()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getId` | symbol | `@zos/ui.getId` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetid) |
| `getImageInfo` | symbol | `@zos/ui.getImageInfo` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetimageinfo) |
| `getInbox` | member | `@zos/ble/TransferFile.TransferFile.getInbox()` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `getInbox` | symbol | `transfer-file.getInbox` | side-service | not stated | [transfer-file](transfer-file.md#transfer-filegetinbox) |
| `getInfo` | member | `@zos/sensor.Sleep.getInfo()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `getInfo` | member | `@zos/sensor.WorldClock.getInfo()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `getInt` | member | `@zos/share-storage.TypedStorage.getInt()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `getInt` | member | `@zos/storage.ShareTypedStorage.getInt()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `getInt` | member | `@zos/storage.TypedStorage.getInt()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `getInt64` | member | `@zos/share-storage.TypedStorage.getInt64()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `getInt64` | member | `@zos/storage.ShareTypedStorage.getInt64()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `getInt64` | member | `@zos/storage.TypedStorage.getInt64()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `getItem` | member | `@zos/share-storage.LocalStorage.getItem()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagelocalstorage) |
| `getItem` | member | `@zos/storage.localStorage.getItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `getItem` | member | `@zos/storage.localStorage-instance.getItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `getItem` | member | `@zos/storage.sessionStorage.getItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `getItem` | member | `@zos/storage.sessionStorage-instance.getItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage-instance) |
| `getItem` | member | `@zos/storage.ShareLocalStorage.getItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `getItem` | symbol | `settings-storage.getItem` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagegetitem) |
| `getLanguage` | symbol | `@zos/settings.getLanguage` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetlanguage) |
| `getLanguage` | symbol | `hmSetting.getLanguage` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetlanguage) |
| `getLast` | member | `@zos/sensor.HeartRate.getLast()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getLastDay` | member | `@zos/sensor.BloodOxygen.getLastDay()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `getLastFewHour` | member | `@zos/sensor.BloodOxygen.getLastFewHour()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `getLastWeek` | member | `@zos/sensor.Pai.getLastWeek()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorpai) |
| `getLastWeek` | member | `@zos/sensor.Stress.getLastWeek()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `getLastWeekByHour` | member | `@zos/sensor.Stress.getLastWeekByHour()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `getLatitude` | member | `@zos/sensor.Geolocation.getLatitude()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `getLight` | member | `@zos/sensor.Screen.getLight()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `getLogger` | member | `@zos/utils.log.getLogger()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `getLongitude` | member | `@zos/sensor.Geolocation.getLongitude()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `getLunarDay` | member | `@zos/sensor.Time.getLunarDay()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getLunarFestival` | member | `@zos/sensor.Time.getLunarFestival()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getLunarMonth` | member | `@zos/sensor.Time.getLunarMonth()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getLunarMonthCalendar` | member | `@zos/sensor.Time.getLunarMonthCalendar()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getLunarYear` | member | `@zos/sensor.Time.getLunarYear()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getMediaInfo` | member | `@zos/media.Player.getMediaInfo()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getMileageUnit` | symbol | `hmSetting.getMileageUnit` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetmileageunit) |
| `getMinutes` | member | `@zos/sensor.Time.getMinutes()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getMonth` | member | `@zos/sensor.Time.getMonth()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getNap` | member | `@zos/sensor.Sleep.getNap()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `getOnbox` | symbol | `transfer-file.getOnbox` | side-service | not stated | [transfer-file](transfer-file.md#transfer-filegetonbox) |
| `getOutbox` | member | `@zos/ble/TransferFile.TransferFile.getOutbox()` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `getPackageInfo` | symbol | `@zos/app.getPackageInfo` | device-app | >= 2 | [zos-app](zos-app.md#zosappgetpackageinfo) |
| `getPackageInfoById` | symbol | `@zos/app.getPackageInfoById` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetpackageinfobyid) |
| `getPerformance` | symbol | `@zos/app.getPerformance` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `getProfile` | symbol | `@zos/user.getProfile` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `getProperty` | symbol | `@zos/ui.getProperty` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetproperty) |
| `getProperty` | symbol | `hmUI.getProperty` | watchface | not stated | [hmUI](hmUI.md#hmuigetproperty) |
| `getResting` | member | `@zos/sensor.HeartRate.getResting()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getRtlLayout` | symbol | `@zos/ui.getRtlLayout` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetrtllayout) |
| `getScene` | symbol | `@zos/app.getScene` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `getScreenAutoBright` | symbol | `hmSetting.getScreenAutoBright` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetscreenautobright) |
| `getScreenType` | symbol | `hmSetting.getScreenType` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetscreentype) |
| `getScrollTop` | symbol | `@zos/page.getScrollTop` | device-app | >= 2 | [zos-page](zos-page.md#zospagegetscrolltop) |
| `getSeconds` | member | `@zos/sensor.Time.getSeconds()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getSetting` | member | `@zos/sensor.Geolocation.getSetting()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `getSettings` | symbol | `@zos/display.getSettings` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `getShowFestival` | member | `@zos/sensor.Time.getShowFestival()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getSleepingStatus` | member | `@zos/sensor.Sleep.getSleepingStatus()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `getSleepTarget` | symbol | `@zos/settings.getSleepTarget` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetsleeptarget) |
| `getSleepTarget` | symbol | `hmSetting.getSleepTarget` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetsleeptarget) |
| `getSolarTerm` | member | `@zos/sensor.Time.getSolarTerm()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getSourceType` | member | `@zos/sensor.Buzzer.getSourceType()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `getSourceType` | member | `@zos/sensor.SystemSounds.getSourceType()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `getSportData` | symbol | `@zos/app-access.getSportData` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `getStage` | member | `@zos/sensor.Sleep.getStage()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `getStageConstantObj` | member | `@zos/sensor.Sleep.getStageConstantObj()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `getStatus` | member | `@zos/media.Player.getStatus()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getStatus` | member | `@zos/media.Recorder.getStatus()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `getStatus` | member | `@zos/sensor.Compass.getStatus()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `getStatus` | member | `@zos/sensor.Geolocation.getStatus()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `getStatus` | member | `@zos/sensor.Screen.getStatus()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `getStatus` | member | `@zos/sensor.Wear.getStatus()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorwear) |
| `getStatus` | member | `@zos/sensor.Workout.getStatus()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `getStrength` | member | `@zos/sensor.Buzzer.getStrength()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `getString` | member | `@zos/share-storage.TypedStorage.getString()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `getString` | member | `@zos/storage.ShareTypedStorage.getString()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `getString` | member | `@zos/storage.TypedStorage.getString()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `getSwiperIndex` | symbol | `@zos/page.getSwiperIndex` | device-app | >= 2 | [zos-page](zos-page.md#zospagegetswiperindex) |
| `getSystemInfo` | symbol | `@zos/settings.getSystemInfo` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgetsysteminfo) |
| `getSystemMode` | symbol | `@zos/settings.getSystemMode` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `getTarget` | member | `@zos/sensor.Calorie.getTarget()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `getTarget` | member | `@zos/sensor.FatBurning.getTarget()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `getTarget` | member | `@zos/sensor.Stand.getTarget()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `getTarget` | member | `@zos/sensor.Step.getTarget()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstep) |
| `getTemperatureUnit` | symbol | `@zos/settings.getTemperatureUnit` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettemperatureunit) |
| `gettersetter` | symbol | `@zos/ui.gettersetter` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuigettersetter) |
| `getText` | symbol | `@zos/i18n.getText` | device-app | >= 2 | [zos-i18n](zos-i18n.md#zosi18ngettext) |
| `getTextLayout` | symbol | `@zos/ui.getTextLayout` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `getTime` | member | `@zos/sensor.Time.getTime()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `getTimeFormat` | symbol | `@zos/settings.getTimeFormat` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettimeformat) |
| `getTimeFormat` | symbol | `hmSetting.getTimeFormat` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggettimeformat) |
| `getTitle` | member | `@zos/media.Player.getTitle()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getToday` | member | `@zos/sensor.BodyTemperature.getToday()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `getToday` | member | `@zos/sensor.HeartRate.getToday()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `getToday` | member | `@zos/sensor.Pai.getToday()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorpai) |
| `getToday` | member | `@zos/sensor.Stress.getToday()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `getTodayByHour` | member | `@zos/sensor.Stress.getTodayByHour()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `getTotal` | member | `@zos/sensor.Pai.getTotal()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorpai) |
| `getType` | member | `@zos/sensor.Vibrator.getType()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `getType` | symbol | `@zos/ui.getType` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettype) |
| `getUserData` | symbol | `hmSetting.getUserData` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `getUserHrZoneSettings` | member | `@zos/sensor.Workout.getUserHrZoneSettings()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `getVolume` | member | `@zos/media.Player.getVolume()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `getWeightTarget` | symbol | `@zos/settings.getWeightTarget` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweighttarget) |
| `getWeightTarget` | symbol | `hmSetting.getWeightTarget` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetweighttarget) |
| `getWeightUnit` | symbol | `@zos/settings.getWeightUnit` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `getWeightUnit` | symbol | `hmSetting.getWeightUnit` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetweightunit) |
| `getWorkoutTrackNavInfo` | member | `@zos/sensor.Workout.getWorkoutTrackNavInfo()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `GRADIENT_POLYLINE` | symbol | `@zos/ui.GRADIENT_POLYLINE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `GRADKIENT_POLYLINE` | enum value | `widget.GRADKIENT_POLYLINE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `GRADKIENT_POLYLINE` | symbol | `hmUI.widget.GRADKIENT_POLYLINE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetgradkient_polyline) |
| `GROUP` | symbol | `@zos/ui.GROUP` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `GROUP` | enum value | `widget.GROUP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `Gyroscope` | symbol | `@zos/sensor.Gyroscope` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `has` | member | `@zos/storage.ShareTypedStorage.has()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `has` | member | `@zos/storage.TypedStorage.has()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `HEART` | symbol | `hmSensor.id.HEART` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridheart) |
| `HEART` | enum value | `data_type.HEART` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `HeartRate` | symbol | `@zos/sensor.HeartRate` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `HISTOGRAM` | symbol | `@zos/ui.HISTOGRAM` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `HISTOGRAM` | enum value | `widget.HISTOGRAM` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `home` | symbol | `@zos/router.home` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterhome) |
| `HR` | enum value | `sport_data.HR` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `HUMIDITY` | enum value | `data_type.HUMIDITY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `id` | symbol | `hmSensor.id` | watchface | not stated | [hmSensor](hmSensor.md#hmsensorid) |
| `Image` | symbol | `ui.Image` | settings | not stated | [ui](ui.md#uiimage) |
| `IMG` | symbol | `@zos/ui.IMG` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `IMG` | enum value | `widget.IMG` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `IMG` | symbol | `hmUI.widget.IMG` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `IMG_ANIM` | symbol | `@zos/ui.IMG_ANIM` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `IMG_ANIM` | enum value | `widget.IMG_ANIM` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `IMG_ANIM` | symbol | `hmUI.widget.IMG_ANIM` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `IMG_CLICK` | symbol | `hmUI.widget.IMG_CLICK` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_click) |
| `IMG_DATE` | symbol | `hmUI.widget.IMG_DATE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_date) |
| `IMG_LEVEL` | enum value | `widget.IMG_LEVEL` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `IMG_LEVEL` | symbol | `hmUI.widget.IMG_LEVEL` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `IMG_POINTER` | symbol | `hmUI.widget.IMG_POINTER` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `IMG_PROGRESS` | symbol | `hmUI.widget.IMG_PROGRESS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `IMG_STATUS` | symbol | `hmUI.widget.IMG_STATUS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_status) |
| `IMG_TIME` | symbol | `hmUI.widget.IMG_TIME` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_time) |
| `IMG_WEEK` | symbol | `hmUI.widget.IMG_WEEK` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_week) |
| `info` | member | `@zos/utils.log.info()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `INIT` | enum value | `prop.INIT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `inputType` | symbol | `@zos/ui.inputType` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `isEnabled` | member | `@zos/sensor.Buzzer.isEnabled()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `isExisted` | member | `@zos/share-storage.LocalStorage.isExisted()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagelocalstorage) |
| `JSKB` | enum value | `inputType.JSKB` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `KEY_BACK` | symbol | `@zos/interaction.KEY_BACK` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_back) |
| `KEY_BACK` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_BACK` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_DOWN` | symbol | `@zos/interaction.KEY_DOWN` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_down) |
| `KEY_DOWN` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_DOWN` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_EVENT_CLICK` | symbol | `@zos/interaction.KEY_EVENT_CLICK` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_event_click) |
| `KEY_EVENT_CLICK` | enum value | `@zos/interaction.onKey -> Key event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_EVENT_DOUBLE_CLICK` | symbol | `@zos/interaction.KEY_EVENT_DOUBLE_CLICK` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_event_double_click) |
| `KEY_EVENT_DOUBLE_CLICK` | enum value | `@zos/interaction.onKey -> Key event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_EVENT_LONG_PRESS` | symbol | `@zos/interaction.KEY_EVENT_LONG_PRESS` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_event_long_press) |
| `KEY_EVENT_LONG_PRESS` | enum value | `@zos/interaction.onKey -> Key event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_EVENT_PRESS` | symbol | `@zos/interaction.KEY_EVENT_PRESS` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_event_press) |
| `KEY_EVENT_PRESS` | enum value | `@zos/interaction.onKey -> Key event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_EVENT_RELEASE` | symbol | `@zos/interaction.KEY_EVENT_RELEASE` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_event_release) |
| `KEY_EVENT_RELEASE` | enum value | `@zos/interaction.onKey -> Key event constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_HOME` | symbol | `@zos/interaction.KEY_HOME` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_home) |
| `KEY_HOME` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_HOME` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_SELECT` | symbol | `@zos/interaction.KEY_SELECT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_select) |
| `KEY_SELECT` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_SELECT` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_SHORTCUT` | symbol | `@zos/interaction.KEY_SHORTCUT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_shortcut) |
| `KEY_SHORTCUT` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_SHORTCUT` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `KEY_UP` | symbol | `@zos/interaction.KEY_UP` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_up) |
| `KEY_UP` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_UP` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `keyboard` | symbol | `@zos/ui.keyboard` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `KEYBOARD` | symbol | `@zos/ui.KEYBOARD` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `launchApp` | symbol | `@zos/router.launchApp` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `LEFT` | enum value | `align.LEFT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `LEFT` | enum value | `align.LEFT` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `length` | symbol | `settings-storage.length` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagelength) |
| `Link` | symbol | `ui.Link` | settings | not stated | [ui](ui.md#uilink) |
| `LIST_TOP` | enum value | `prop.LIST_TOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `localStorage` | symbol | `@zos/storage.localStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `LocalStorage` | symbol | `@zos/share-storage.LocalStorage` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagelocalstorage) |
| `LocalStorage` | symbol | `@zos/storage.LocalStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `localStorage-instance` | symbol | `@zos/storage.localStorage-instance` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `LOCK` | enum value | `system_status.LOCK` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `log` | member | `@zos/global.console.log()` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalconsole) |
| `log` | symbol | `@zos/utils.log` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `log` | member | `@zos/utils.log.log()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `log` | symbol | `global.console.log` | settings, side-service | not stated | [global](global.md#globalconsolelog) |
| `messagingPlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/side.messagingPlugin` | side-service | not stated | [zeppos-zml-2.0-module-messaging-plugin-side](zeppos-zml-2.0-module-messaging-plugin-side.md#zepposzml20modulemessagingpluginsidemessagingplugin) |
| `mkdirSync` | symbol | `@zos/fs.mkdirSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsmkdirsync) |
| `MODAL_CANCEL` | enum value | `@zos/interaction.createModal -> Modal key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `MODAL_CANCEL` | symbol | `@zos/interaction.MODAL_CANCEL` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionmodal_cancel) |
| `MODAL_CONFIRM` | enum value | `@zos/interaction.createModal -> Modal key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `MODAL_CONFIRM` | symbol | `@zos/interaction.MODAL_CONFIRM` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionmodal_confirm) |
| `MONTH` | enum value | `date.MONTH` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `MONTH_RUN_DISTANCE` | enum value | `data_type.MONTH_RUN_DISTANCE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MONTH_RUN_TIMES` | enum value | `data_type.MONTH_RUN_TIMES` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MOON` | enum value | `data_type.MOON` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MORE` | enum value | `prop.MORE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `MOVE` | enum value | `event.MOVE` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `MOVE_IN` | enum value | `event.MOVE_IN` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `MOVE_OUT` | enum value | `event.MOVE_OUT` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `mstBuildProfile` | symbol | `@zos/ble.mstBuildProfile` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `mstConnect` | symbol | `@zos/ble.mstConnect` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstconnect) |
| `mstDestroyProfileInstance` | symbol | `@zos/ble.mstDestroyProfileInstance` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstdestroyprofileinstance) |
| `mstDisconnect` | symbol | `@zos/ble.mstDisconnect` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstdisconnect) |
| `mstGetConnIdByRemoteAddr` | symbol | `@zos/ble.mstGetConnIdByRemoteAddr` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstgetconnidbyremoteaddr) |
| `mstGetProfileInstance` | symbol | `@zos/ble.mstGetProfileInstance` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstgetprofileinstance) |
| `mstOffAllCb` | symbol | `@zos/ble.mstOffAllCb` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstoffallcb) |
| `mstOnCharaNotification` | symbol | `@zos/ble.mstOnCharaNotification` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstoncharanotification) |
| `mstOnCharaReadComplete` | symbol | `@zos/ble.mstOnCharaReadComplete` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstoncharareadcomplete) |
| `mstOnCharaValueArrived` | symbol | `@zos/ble.mstOnCharaValueArrived` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstoncharavaluearrived) |
| `mstOnCharaWriteComplete` | symbol | `@zos/ble.mstOnCharaWriteComplete` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstoncharawritecomplete) |
| `mstOnDescValueArrived` | symbol | `@zos/ble.mstOnDescValueArrived` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstondescvaluearrived) |
| `mstOnDescWriteComplete` | symbol | `@zos/ble.mstOnDescWriteComplete` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstondescwritecomplete) |
| `mstOnPrepare` | symbol | `@zos/ble.mstOnPrepare` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstonprepare) |
| `mstOnServiceChangeBegin` | symbol | `@zos/ble.mstOnServiceChangeBegin` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstonservicechangebegin) |
| `mstOnServiceChangeEnd` | symbol | `@zos/ble.mstOnServiceChangeEnd` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstonservicechangeend) |
| `mstPair` | symbol | `@zos/ble.mstPair` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstpair) |
| `mstPrepare` | symbol | `@zos/ble.mstPrepare` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstprepare) |
| `mstReadCharacteristic` | symbol | `@zos/ble.mstReadCharacteristic` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstreadcharacteristic) |
| `mstReadDescriptor` | symbol | `@zos/ble.mstReadDescriptor` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstreaddescriptor) |
| `mstStartScan` | symbol | `@zos/ble.mstStartScan` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `mstStopScan` | symbol | `@zos/ble.mstStopScan` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststopscan) |
| `mstWriteCharacteristic` | symbol | `@zos/ble.mstWriteCharacteristic` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstwritecharacteristic) |
| `mstWriteDescriptor` | symbol | `@zos/ble.mstWriteDescriptor` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstwritedescriptor) |
| `MUSIC` | symbol | `hmSensor.id.MUSIC` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridmusic) |
| `N` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `NE` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `NEWFILE` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> InboxEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `NONE` | enum value | `text_style.NONE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `NONE` | enum value | `text_style.NONE` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `notify` | symbol | `@zos/notification.notify` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `NUM` | enum value | `inputType.NUM` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `NW` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `O_APPEND` | symbol | `@zos/fs.O_APPEND` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_append) |
| `O_APPEND` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_APPEND` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_APPEND` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_APPEND` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_CREAT` | symbol | `@zos/fs.O_CREAT` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_creat) |
| `O_CREAT` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_CREAT` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_CREAT` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_CREAT` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_EXCL` | symbol | `@zos/fs.O_EXCL` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_excl) |
| `O_EXCL` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_EXCL` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_EXCL` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_EXCL` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_RDONLY` | symbol | `@zos/fs.O_RDONLY` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_rdonly) |
| `O_RDONLY` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_RDONLY` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_RDONLY` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_RDONLY` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_RDWR` | symbol | `@zos/fs.O_RDWR` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_rdwr) |
| `O_RDWR` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_RDWR` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_RDWR` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_RDWR` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_TRUNC` | symbol | `@zos/fs.O_TRUNC` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_trunc) |
| `O_TRUNC` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_TRUNC` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_TRUNC` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_TRUNC` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `O_WRONLY` | symbol | `@zos/fs.O_WRONLY` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfso_wronly) |
| `O_WRONLY` | enum value | `@zos/fs.openAssetsSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `O_WRONLY` | enum value | `@zos/fs.openSync -> file open constants` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `O_WRONLY` | enum value | `hmFS.open -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `O_WRONLY` | enum value | `hmFS.open_asset -> FLAG` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `off` | member | `@zos/utils.EventBus.off()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `offChange` | member | `@zos/sensor.Accelerometer.offChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `offChange` | member | `@zos/sensor.Barometer.offChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorbarometer) |
| `offChange` | member | `@zos/sensor.Battery.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbattery) |
| `offChange` | member | `@zos/sensor.BloodOxygen.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `offChange` | member | `@zos/sensor.Calorie.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `offChange` | member | `@zos/sensor.Compass.offChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `offChange` | member | `@zos/sensor.Distance.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensordistance) |
| `offChange` | member | `@zos/sensor.FatBurning.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `offChange` | member | `@zos/sensor.Geolocation.offChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `offChange` | member | `@zos/sensor.Gyroscope.offChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `offChange` | member | `@zos/sensor.Screen.offChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `offChange` | member | `@zos/sensor.Stand.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `offChange` | member | `@zos/sensor.Step.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstep) |
| `offChange` | member | `@zos/sensor.Stress.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `offChange` | member | `@zos/sensor.Wear.offChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorwear) |
| `offCurrentChange` | member | `@zos/sensor.HeartRate.offCurrentChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `offDigitalCrown` | symbol | `@zos/interaction.offDigitalCrown` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionoffdigitalcrown) |
| `offEnableChange` | member | `@zos/sensor.Geolocation.offEnableChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `offGesture` | symbol | `@zos/interaction.offGesture` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionoffgesture) |
| `offGnssChange` | member | `@zos/sensor.Geolocation.offGnssChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `offKey` | symbol | `@zos/interaction.offKey` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionoffkey) |
| `offLastChange` | member | `@zos/sensor.HeartRate.offLastChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `offRestingChange` | member | `@zos/sensor.HeartRate.offRestingChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `on` | member | `@zos/utils.EventBus.on()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `once` | member | `@zos/utils.EventBus.once()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `onChange` | member | `@zos/sensor.Accelerometer.onChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `onChange` | member | `@zos/sensor.Barometer.onChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorbarometer) |
| `onChange` | member | `@zos/sensor.Battery.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbattery) |
| `onChange` | member | `@zos/sensor.BloodOxygen.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `onChange` | member | `@zos/sensor.Calorie.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `onChange` | member | `@zos/sensor.Compass.onChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `onChange` | member | `@zos/sensor.Distance.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensordistance) |
| `onChange` | member | `@zos/sensor.FatBurning.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `onChange` | member | `@zos/sensor.Geolocation.onChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `onChange` | member | `@zos/sensor.Gyroscope.onChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `onChange` | member | `@zos/sensor.Screen.onChange()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `onChange` | member | `@zos/sensor.Stand.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `onChange` | member | `@zos/sensor.Step.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstep) |
| `onChange` | member | `@zos/sensor.Stress.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `onChange` | member | `@zos/sensor.Wear.onChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorwear) |
| `onCurrentChange` | member | `@zos/sensor.HeartRate.onCurrentChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onDigitalCrown` | symbol | `@zos/interaction.onDigitalCrown` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `onEnableChange` | member | `@zos/sensor.Geolocation.onEnableChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `onGesture` | symbol | `@zos/interaction.onGesture` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `onGnssChange` | member | `@zos/sensor.Geolocation.onGnssChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `onKey` | symbol | `@zos/interaction.onKey` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `onLastChange` | member | `@zos/sensor.HeartRate.onLastChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onPerDay` | member | `@zos/sensor.Time.onPerDay()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPerHourEnd` | member | `@zos/sensor.Time.onPerHourEnd()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPerMinute` | member | `@zos/sensor.Time.onPerMinute()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPhoneTimeSetting` | member | `@zos/sensor.Time.onPhoneTimeSetting()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onRestingChange` | member | `@zos/sensor.HeartRate.onRestingChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onSunrise` | member | `@zos/sensor.Time.onSunrise()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onSunset` | member | `@zos/sensor.Time.onSunset()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onWristMotion` | symbol | `@zos/interaction.onWristMotion` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `open` | symbol | `hmFS.open` | watchface | not stated | [hmFS](hmFS.md#hmfsopen) |
| `open_asset` | symbol | `hmFS.open_asset` | watchface | not stated | [hmFS](hmFS.md#hmfsopen_asset) |
| `OPEN_WATER_SWIMMING` | enum value | `data_type.OPEN_WATER_SWIMMING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `openAssetsSync` | symbol | `@zos/fs.openAssetsSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `openInspector` | symbol | `@zos/ui.openInspector` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiopeninspector) |
| `openSync` | symbol | `@zos/fs.openSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `openSync` | member | `@zos/share-storage.FileSystem.openSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `OPERATE` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `OUTDOOR_CYCLING` | enum value | `data_type.OUTDOOR_CYCLING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `OUTDOOR_RUNNING` | enum value | `data_type.OUTDOOR_RUNNING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `pace` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `PACE` | enum value | `sport_data.PACE` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `Page` | symbol | `@zos/global.Page` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `PAGE_INDICATOR` | symbol | `@zos/ui.PAGE_INDICATOR` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `PAGE_SCROLLBAR` | symbol | `@zos/ui.PAGE_SCROLLBAR` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipage_scrollbar) |
| `pagePlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/page.pagePlugin` | device-app | not stated | [zeppos-zml-2.0-module-messaging-plugin-page](zeppos-zml-2.0-module-messaging-plugin-page.md#zepposzml20modulemessagingpluginpagepageplugin) |
| `Pai` | symbol | `@zos/sensor.Pai` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorpai) |
| `PAI` | symbol | `hmSensor.id.PAI` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `PAI_DAILY` | enum value | `data_type.PAI_DAILY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `PAI_WEEKLY` | enum value | `data_type.PAI_WEEKLY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `pause` | member | `@zos/media.Player.pause()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PAUSE` | enum value | `anim_status.PAUSE` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `PAUSE` | enum value | `anim_status.PAUSE` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `pauseDropWristScreenOff` | symbol | `@zos/display.pauseDropWristScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausedropwristscreenoff) |
| `pausePalmScreenOff` | symbol | `@zos/display.pausePalmScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausepalmscreenoff) |
| `pending` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `PHN` | enum value | `data_type.PHN` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `PICK_DATE` | symbol | `@zos/ui.PICK_DATE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `PICK_DATE` | enum value | `widget.PICK_DATE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `PICKER` | symbol | `@zos/ui.PICKER` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `Player` | symbol | `@zos/media.Player` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `POLYLINE` | symbol | `@zos/ui.POLYLINE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipolyline) |
| `POOL_SWIMMING` | enum value | `data_type.POOL_SWIMMING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `prepare` | member | `@zos/media.Player.prepare()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `progress` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> FileEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `prop` | symbol | `@zos/ui.prop` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `prop` | symbol | `hmUI.prop` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `push` | symbol | `@zos/router.push` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterpush) |
| `putBool` | member | `@zos/storage.ShareTypedStorage.putBool()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `putBool` | member | `@zos/storage.TypedStorage.putBool()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `putDouble` | member | `@zos/storage.ShareTypedStorage.putDouble()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `putDouble` | member | `@zos/storage.TypedStorage.putDouble()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `putInt` | member | `@zos/storage.ShareTypedStorage.putInt()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `putInt` | member | `@zos/storage.TypedStorage.putInt()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `putInt64` | member | `@zos/storage.ShareTypedStorage.putInt64()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `putInt64` | member | `@zos/storage.TypedStorage.putInt64()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `putString` | member | `@zos/storage.ShareTypedStorage.putString()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `putString` | member | `@zos/storage.TypedStorage.putString()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `px` | symbol | `@zos/utils.px` | device-app, workout-extension | >= 2 | [zos-utils](zos-utils.md#zosutilspx) |
| `QRCODE` | symbol | `@zos/ui.QRCODE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `QRCODE` | enum value | `widget.QRCODE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `queryPermission` | symbol | `@zos/app.queryPermission` | device-app | >= 3 | [zos-app](zos-app.md#zosappquerypermission) |
| `RADIO_GROUP` | symbol | `@zos/ui.RADIO_GROUP` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `RADIO_GROUP` | enum value | `widget.RADIO_GROUP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `read` | symbol | `hmFS.read` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `readdirSync` | symbol | `@zos/fs.readdirSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreaddirsync) |
| `readFileSync` | symbol | `@zos/fs.readFileSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadfilesync) |
| `readFileSync` | member | `@zos/share-storage.FileSystem.readFileSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `READINESS` | enum value | `data_type.READINESS` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `readSync` | symbol | `@zos/fs.readSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `readSync` | member | `@zos/share-storage.FileSystem.readSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `Recorder` | symbol | `@zos/media.Recorder` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `RECOVERY_TIME` | enum value | `data_type.RECOVERY_TIME` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `redraw` | symbol | `@zos/ui.redraw` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiredraw) |
| `relayoutRtl` | symbol | `@zos/ui.relayoutRtl` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuirelayoutrtl) |
| `REMIND_1` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `REMIND_2` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `remove` | member | `@zos/storage.ShareTypedStorage.remove()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `remove` | member | `@zos/storage.TypedStorage.remove()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `remove` | symbol | `hmFS.remove` | watchface | not stated | [hmFS](hmFS.md#hmfsremove) |
| `removeEventListener` | symbol | `@zos/ui.removeEventListener` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiremoveeventlistener) |
| `removeItem` | member | `@zos/storage.localStorage.removeItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `removeItem` | member | `@zos/storage.localStorage-instance.removeItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `removeItem` | member | `@zos/storage.sessionStorage.removeItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `removeItem` | member | `@zos/storage.sessionStorage-instance.removeItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage-instance) |
| `removeItem` | member | `@zos/storage.ShareLocalStorage.removeItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `removeItem` | symbol | `settings-storage.removeItem` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storageremoveitem) |
| `removeLayoutChild` | symbol | `@zos/ui.removeLayoutChild` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiremovelayoutchild) |
| `removeListener` | symbol | `@zos/ble.removeListener` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbleremovelistener) |
| `removeListener` | symbol | `hmBle.removeListener` | watchface | not stated | [hmBle](hmBle.md#hmbleremovelistener) |
| `rename` | symbol | `hmFS.rename` | watchface | not stated | [hmFS](hmFS.md#hmfsrename) |
| `renameSync` | symbol | `@zos/fs.renameSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrenamesync) |
| `REPEAT_DAY` | symbol | `@zos/alarm.REPEAT_DAY` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_day) |
| `REPEAT_DAY` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_HOUR` | symbol | `@zos/alarm.REPEAT_HOUR` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_hour) |
| `REPEAT_HOUR` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_MINUTE` | symbol | `@zos/alarm.REPEAT_MINUTE` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_minute) |
| `REPEAT_MINUTE` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_MONTH` | symbol | `@zos/alarm.REPEAT_MONTH` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_month) |
| `REPEAT_MONTH` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_ONCE` | symbol | `@zos/alarm.REPEAT_ONCE` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_once) |
| `REPEAT_ONCE` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_WEEK` | symbol | `@zos/alarm.REPEAT_WEEK` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_week) |
| `REPEAT_WEEK` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_YEAR` | symbol | `@zos/alarm.REPEAT_YEAR` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_year) |
| `REPEAT_YEAR` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `replace` | symbol | `@zos/router.replace` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterreplace) |
| `requestPermission` | symbol | `@zos/app.requestPermission` | device-app | >= 3 | [zos-app](zos-app.md#zosapprequestpermission) |
| `resetDropWristScreenOff` | symbol | `@zos/display.resetDropWristScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplayresetdropwristscreenoff) |
| `resetPageBrightTime` | symbol | `@zos/display.resetPageBrightTime` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplayresetpagebrighttime) |
| `resetPalmScreenOff` | symbol | `@zos/display.resetPalmScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplayresetpalmscreenoff) |
| `resume` | member | `@zos/media.Player.resume()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `RESUME` | enum value | `anim_status.RESUME` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `RESUME` | enum value | `anim_status.RESUME` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `RIGHT` | enum value | `align.RIGHT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `RIGHT` | enum value | `align.RIGHT` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `rmSync` | symbol | `@zos/fs.rmSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrmsync) |
| `S` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `SCENE_AOD` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_AOD` | symbol | `@zos/app.SCENE_AOD` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappscene_aod) |
| `SCENE_APP` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_APP` | symbol | `@zos/app.SCENE_APP` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_app) |
| `SCENE_SETTINGS` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_SETTINGS` | symbol | `@zos/app.SCENE_SETTINGS` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_settings) |
| `SCENE_WATCHFACE` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_WATCHFACE` | symbol | `@zos/app.SCENE_WATCHFACE` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_watchface) |
| `Screen` | symbol | `@zos/sensor.Screen` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `SCREEN_SHAPE_ROUND` | enum value | `@zos/device.getDeviceInfo -> Screen shape` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `SCREEN_SHAPE_ROUND` | symbol | `@zos/device.SCREEN_SHAPE_ROUND` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicescreen_shape_round) |
| `SCREEN_SHAPE_SQUARE` | enum value | `@zos/device.getDeviceInfo -> Screen shape` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `SCREEN_SHAPE_SQUARE` | symbol | `@zos/device.SCREEN_SHAPE_SQUARE` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicescreen_shape_square) |
| `screen_type` | symbol | `hmSetting.screen_type` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `SCROLL_ANIMATION_NONE` | symbol | `@zos/page.SCROLL_ANIMATION_NONE` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_animation_none) |
| `SCROLL_ANIMATION_NONE` | enum value | `@zos/page.swipeToIndex -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `SCROLL_ANIMATION_SMOOTH` | symbol | `@zos/page.SCROLL_ANIMATION_SMOOTH` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_animation_smooth) |
| `SCROLL_ANIMATION_SMOOTH` | enum value | `@zos/page.swipeToIndex -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `SCROLL_LIST` | symbol | `@zos/ui.SCROLL_LIST` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `SCROLL_LIST` | enum value | `widget.SCROLL_LIST` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `SCROLL_MODE_FREE` | symbol | `@zos/page.SCROLL_MODE_FREE` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_mode_free) |
| `SCROLL_MODE_FREE` | enum value | `@zos/page.setScrollMode -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `SCROLL_MODE_SWIPER` | symbol | `@zos/page.SCROLL_MODE_SWIPER` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_mode_swiper) |
| `SCROLL_MODE_SWIPER` | enum value | `@zos/page.setScrollMode -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `SCROLL_MODE_SWIPER_HORIZONTAL` | symbol | `@zos/page.SCROLL_MODE_SWIPER_HORIZONTAL` | device-app | >= 2.1 | [zos-page](zos-page.md#zospagescroll_mode_swiper_horizontal) |
| `SCROLL_MODE_SWIPER_HORIZONTAL` | enum value | `@zos/page.setScrollMode -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `scrollTo` | symbol | `@zos/page.scrollTo` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `SE` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `SecondaryWidget` | symbol | `@zos/global.SecondaryWidget` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `SECP192K1` | enum value | `ecp_dp.SECP192K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `SECP224K1` | enum value | `ecp_dp.SECP224K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `SECP256K1` | enum value | `ecp_dp.SECP256K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `Section` | symbol | `ui.Section` | settings | not stated | [ui](ui.md#uisection) |
| `seek` | member | `@zos/media.Player.seek()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `seek` | symbol | `hmFS.seek` | watchface | not stated | [hmFS](hmFS.md#hmfsseek) |
| `seekTo` | member | `@zos/media.Player.seekTo()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `Select` | symbol | `ui.Select` | settings | not stated | [ui](ui.md#uiselect) |
| `SELECT` | enum value | `keyboard.SELECT` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `send` | symbol | `@zos/ble.send` | device-app | >= 2 | [zos-ble](zos-ble.md#zosblesend) |
| `send` | symbol | `hmBle.send` | watchface | not stated | [hmBle](hmBle.md#hmblesend) |
| `send` | symbol | `messaging.send` | side-service | not stated | [messaging](messaging.md#messagingsend) |
| `sessionStorage` | symbol | `@zos/storage.sessionStorage` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `SessionStorage` | symbol | `@zos/storage.SessionStorage` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `sessionStorage-instance` | symbol | `@zos/storage.sessionStorage-instance` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage-instance) |
| `set` | symbol | `@zos/alarm.set` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `setAlpha` | symbol | `@zos/ui.setAlpha` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuisetalpha) |
| `setAppWidgetSize` | symbol | `@zos/ui.setAppWidgetSize` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetappwidgetsize) |
| `setAutoBrightness` | symbol | `@zos/display.setAutoBrightness` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetautobrightness) |
| `setBrightness` | symbol | `@zos/display.setBrightness` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetbrightness) |
| `setBrightness` | symbol | `hmSetting.setBrightness` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingsetbrightness) |
| `setBrightScreen` | symbol | `hmSetting.setBrightScreen` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingsetbrightscreen) |
| `setBrightScreenCancel` | symbol | `hmSetting.setBrightScreenCancel` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingsetbrightscreencancel) |
| `setEnable` | symbol | `@zos/ui.setEnable` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetenable) |
| `setFormat` | member | `@zos/media.Recorder.setFormat()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `setFreqMode` | member | `@zos/sensor.Accelerometer.setFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `setFreqMode` | member | `@zos/sensor.Compass.setFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `setFreqMode` | member | `@zos/sensor.Gyroscope.setFreqMode()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `setInterval` | symbol | `@zos/global.setInterval` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsetinterval) |
| `setItem` | member | `@zos/storage.localStorage.setItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `setItem` | member | `@zos/storage.localStorage-instance.setItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `setItem` | member | `@zos/storage.sessionStorage.setItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage) |
| `setItem` | member | `@zos/storage.sessionStorage-instance.setItem()` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragesessionstorage-instance) |
| `setItem` | member | `@zos/storage.ShareLocalStorage.setItem()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `setItem` | symbol | `settings-storage.setItem` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagesetitem) |
| `setLaunchAppTimeout` | symbol | `@zos/router.setLaunchAppTimeout` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `setLayoutParent` | symbol | `@zos/ui.setLayoutParent` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisetlayoutparent) |
| `setMode` | member | `@zos/sensor.Vibrator.setMode()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `setPageBrightTime` | symbol | `@zos/display.setPageBrightTime` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetpagebrighttime) |
| `setProperty` | symbol | `@zos/ui.setProperty` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `setProperty` | symbol | `hmUI.setProperty` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `setScreenAutoBright` | symbol | `hmSetting.setScreenAutoBright` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingsetscreenautobright) |
| `setScreenOff` | symbol | `@zos/display.setScreenOff` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetscreenoff) |
| `setScreenOff` | symbol | `hmSetting.setScreenOff` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingsetscreenoff) |
| `setScrollLock` | symbol | `@zos/page.setScrollLock` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrolllock) |
| `setScrollMode` | symbol | `@zos/page.setScrollMode` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `setSource` | member | `@zos/media.Player.setSource()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `setStatusBarVisible` | symbol | `@zos/ui.setStatusBarVisible` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetstatusbarvisible) |
| `setTimeout` | symbol | `@zos/global.setTimeout` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsettimeout) |
| `SETTINGS` | enum value | `screen_type.SETTINGS` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `settingsLib` | symbol | `@zeppos/zml/base-side.settingsLib` | side-service | not stated | [zeppos-zml-base-side](zeppos-zml-base-side.md#zepposzmlbase-sidesettingslib) |
| `setVolume` | member | `@zos/media.Player.setVolume()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `setWakeUpRelaunch` | symbol | `@zos/display.setWakeUpRelaunch` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetwakeuprelaunch) |
| `ShareLocalStorage` | symbol | `@zos/storage.ShareLocalStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `ShareTypedStorage` | symbol | `@zos/storage.ShareTypedStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `SHOW` | enum value | `prop.SHOW` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `showToast` | symbol | `@zos/interaction.showToast` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionshowtoast) |
| `Sleep` | symbol | `@zos/sensor.Sleep` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `SLEEP` | symbol | `hmSensor.id.SLEEP` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `SLEEP` | enum value | `data_type.SLEEP` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SLIDE_SWITCH` | symbol | `@zos/ui.SLIDE_SWITCH` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `SLIDE_SWITCH` | enum value | `widget.SLIDE_SWITCH` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `Slider` | symbol | `ui.Slider` | settings | not stated | [ui](ui.md#uislider) |
| `speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `SPO2` | symbol | `hmSensor.id.SPO2` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `SPO2` | enum value | `data_type.SPO2` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `sport_data` | symbol | `@zos/ui.sport_data` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `SPORT_DATA` | symbol | `@zos/ui.SPORT_DATA` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `SPORT_DATA` | enum value | `widget.SPORT_DATA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `SPORTS` | enum value | `edit_widget_group_type.SPORTS` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuiedit_widget_group_type) |
| `SRC` | enum value | `prop.SRC` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `Stand` | symbol | `@zos/sensor.Stand` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `STAND` | symbol | `hmSensor.id.STAND` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstand) |
| `STAND` | enum value | `data_type.STAND` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `STAND_TARGET` | enum value | `data_type.STAND_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `start` | symbol | `@zos/app-service.start` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `start` | member | `@zos/crypto.DigestCrypto.start()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `start` | member | `@zos/media.Player.start()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `start` | member | `@zos/media.Recorder.start()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `start` | member | `@zos/sensor.Accelerometer.start()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `start` | member | `@zos/sensor.BloodOxygen.start()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `start` | member | `@zos/sensor.Buzzer.start()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `start` | member | `@zos/sensor.Compass.start()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `start` | member | `@zos/sensor.Geolocation.start()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `start` | member | `@zos/sensor.Gyroscope.start()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `start` | member | `@zos/sensor.SystemSounds.start()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `start` | member | `@zos/sensor.Vibrator.start()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `START` | enum value | `anim_status.START` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `START` | enum value | `anim_status.START` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `stat` | symbol | `hmFS.stat` | watchface | not stated | [hmFS](hmFS.md#hmfsstat) |
| `stat_asset` | symbol | `hmFS.stat_asset` | watchface | not stated | [hmFS](hmFS.md#hmfsstat_asset) |
| `statAssetsSync` | symbol | `@zos/fs.statAssetsSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatassetssync) |
| `STATE_BUTTON` | enum value | `widget.STATE_BUTTON` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `statSync` | symbol | `@zos/fs.statSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatsync) |
| `statSync` | member | `@zos/share-storage.FileSystem.statSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `Step` | symbol | `@zos/sensor.Step` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstep) |
| `STEP` | symbol | `hmSensor.id.STEP` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstep) |
| `STEP` | enum value | `data_type.STEP` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `STEP_TARGET` | enum value | `data_type.STEP_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `stop` | symbol | `@zos/app-service.stop` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestop) |
| `stop` | member | `@zos/media.Player.stop()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `stop` | member | `@zos/media.Recorder.stop()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `stop` | member | `@zos/sensor.Accelerometer.stop()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `stop` | member | `@zos/sensor.BloodOxygen.stop()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `stop` | member | `@zos/sensor.Buzzer.stop()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `stop` | member | `@zos/sensor.Compass.stop()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `stop` | member | `@zos/sensor.Geolocation.stop()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `stop` | member | `@zos/sensor.Gyroscope.stop()` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `stop` | member | `@zos/sensor.SystemSounds.stop()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `stop` | member | `@zos/sensor.Vibrator.stop()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `STOP` | enum value | `anim_status.STOP` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `STOP` | enum value | `anim_status.STOP` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `STOP_WATCH` | enum value | `data_type.STOP_WATCH` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `stopTimer` | symbol | `@zos/timer.stopTimer` | device-app | >= 4 | [zos-timer](zos-timer.md#zostimerstoptimer) |
| `stopTimer` | symbol | `timer.stopTimer` | watchface | not stated | [timer](timer.md#timerstoptimer) |
| `Stress` | symbol | `@zos/sensor.Stress` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `STRESS` | symbol | `hmSensor.id.STRESS` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstress) |
| `STRESS` | enum value | `data_type.STRESS` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `stringToBuffer` | symbol | `@zos/utils.stringToBuffer` | device-app | >= 4 | [zos-utils](zos-utils.md#zosutilsstringtobuffer) |
| `STROKE_RECT` | symbol | `@zos/ui.STROKE_RECT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `STROKE_RECT` | enum value | `widget.STROKE_RECT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `STROKE_RECT` | symbol | `hmUI.widget.STROKE_RECT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `SUCCESS` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `SUN_CURRENT` | enum value | `data_type.SUN_CURRENT` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SUN_RISE` | enum value | `data_type.SUN_RISE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SUN_SET` | enum value | `data_type.SUN_SET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SW` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `swipeToIndex` | symbol | `@zos/page.swipeToIndex` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `SWITCH` | enum value | `keyboard.SWITCH` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `SysProGetBool` | symbol | `hmFS.SysProGetBool` | watchface | not stated | [hmFS](hmFS.md#hmfssysprogetbool) |
| `SysProGetChars` | symbol | `hmFS.SysProGetChars` | watchface | not stated | [hmFS](hmFS.md#hmfssysprogetchars) |
| `SysProGetDouble` | symbol | `hmFS.SysProGetDouble` | watchface | not stated | [hmFS](hmFS.md#hmfssysprogetdouble) |
| `SysProGetInt` | symbol | `hmFS.SysProGetInt` | watchface | not stated | [hmFS](hmFS.md#hmfssysprogetint) |
| `SysProGetInt64` | symbol | `hmFS.SysProGetInt64` | watchface | not stated | [hmFS](hmFS.md#hmfssysprogetint64) |
| `SysProSetBool` | symbol | `hmFS.SysProSetBool` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetbool) |
| `SysProSetChars` | symbol | `hmFS.SysProSetChars` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetchars) |
| `SysProSetDouble` | symbol | `hmFS.SysProSetDouble` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetdouble) |
| `SysProSetInt` | symbol | `hmFS.SysProSetInt` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint) |
| `SysProSetInt64` | symbol | `hmFS.SysProSetInt64` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint64) |
| `SYSTEM_APP_ALARM` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_ALARM` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_ALARM` | symbol | `@zos/router.SYSTEM_APP_ALARM` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_alarm) |
| `SYSTEM_APP_ALEAX` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_ALEAX` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_ALEAX` | symbol | `@zos/router.SYSTEM_APP_ALEAX` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_aleax) |
| `SYSTEM_APP_ALIPAY` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_ALIPAY` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_ALIPAY` | symbol | `@zos/router.SYSTEM_APP_ALIPAY` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_alipay) |
| `SYSTEM_APP_ALTIMETER` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_ALTIMETER` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_ALTIMETER` | symbol | `@zos/router.SYSTEM_APP_ALTIMETER` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_altimeter) |
| `SYSTEM_APP_BODY_COMPOSITION` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_BODY_COMPOSITION` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_BODY_COMPOSITION` | symbol | `@zos/router.SYSTEM_APP_BODY_COMPOSITION` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_body_composition) |
| `SYSTEM_APP_BREATH` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_BREATH` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_BREATH` | symbol | `@zos/router.SYSTEM_APP_BREATH` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_breath) |
| `SYSTEM_APP_CALENDAR` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_CALENDAR` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_CALENDAR` | symbol | `@zos/router.SYSTEM_APP_CALENDAR` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_calendar) |
| `SYSTEM_APP_CAMERA` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_CAMERA` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_CAMERA` | symbol | `@zos/router.SYSTEM_APP_CAMERA` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_camera) |
| `SYSTEM_APP_CARD` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_CARD` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_CARD` | symbol | `@zos/router.SYSTEM_APP_CARD` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_card) |
| `SYSTEM_APP_CLUB_CARD` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_CLUB_CARD` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_CLUB_CARD` | symbol | `@zos/router.SYSTEM_APP_CLUB_CARD` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_club_card) |
| `SYSTEM_APP_COMPASS` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_COMPASS` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_COMPASS` | symbol | `@zos/router.SYSTEM_APP_COMPASS` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_compass) |
| `SYSTEM_APP_COUNTDOWN` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_COUNTDOWN` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_COUNTDOWN` | symbol | `@zos/router.SYSTEM_APP_COUNTDOWN` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_countdown) |
| `SYSTEM_APP_FINE_PHONE` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_FINE_PHONE` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_FINE_PHONE` | symbol | `@zos/router.SYSTEM_APP_FINE_PHONE` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_fine_phone) |
| `SYSTEM_APP_HR` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_HR` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_HR` | symbol | `@zos/router.SYSTEM_APP_HR` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_hr) |
| `SYSTEM_APP_MEASUREMENT` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_MEASUREMENT` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_MEASUREMENT` | symbol | `@zos/router.SYSTEM_APP_MEASUREMENT` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_measurement) |
| `SYSTEM_APP_MENSTRUAL` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_MENSTRUAL` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_MENSTRUAL` | symbol | `@zos/router.SYSTEM_APP_MENSTRUAL` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_menstrual) |
| `SYSTEM_APP_MUSIC` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_MUSIC` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_MUSIC` | symbol | `@zos/router.SYSTEM_APP_MUSIC` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_music) |
| `SYSTEM_APP_NETEASE_MUSIC` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_NETEASE_MUSIC` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_NETEASE_MUSIC` | symbol | `@zos/router.SYSTEM_APP_NETEASE_MUSIC` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_netease_music) |
| `SYSTEM_APP_PAI` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_PAI` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_PAI` | symbol | `@zos/router.SYSTEM_APP_PAI` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_pai) |
| `SYSTEM_APP_PHONE` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_PHONE` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_PHONE` | symbol | `@zos/router.SYSTEM_APP_PHONE` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_phone) |
| `SYSTEM_APP_POMODORO` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_POMODORO` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_POMODORO` | symbol | `@zos/router.SYSTEM_APP_POMODORO` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_pomodoro) |
| `SYSTEM_APP_PRESSURE` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_PRESSURE` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_PRESSURE` | symbol | `@zos/router.SYSTEM_APP_PRESSURE` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_pressure) |
| `SYSTEM_APP_READINESS` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_READINESS` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_READINESS` | symbol | `@zos/router.SYSTEM_APP_READINESS` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_readiness) |
| `SYSTEM_APP_SETTING` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SETTING` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SETTING` | symbol | `@zos/router.SYSTEM_APP_SETTING` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_setting) |
| `SYSTEM_APP_SLEEP` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SLEEP` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SLEEP` | symbol | `@zos/router.SYSTEM_APP_SLEEP` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_sleep) |
| `SYSTEM_APP_SPO2` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SPO2` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SPO2` | symbol | `@zos/router.SYSTEM_APP_SPO2` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_spo2) |
| `SYSTEM_APP_SPORT` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SPORT` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SPORT` | symbol | `@zos/router.SYSTEM_APP_SPORT` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_sport) |
| `SYSTEM_APP_SPORT_HISTORY` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SPORT_HISTORY` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SPORT_HISTORY` | symbol | `@zos/router.SYSTEM_APP_SPORT_HISTORY` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_sport_history) |
| `SYSTEM_APP_SPORT_STATUS` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SPORT_STATUS` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SPORT_STATUS` | symbol | `@zos/router.SYSTEM_APP_SPORT_STATUS` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_sport_status) |
| `SYSTEM_APP_STATUS` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_STATUS` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_STATUS` | symbol | `@zos/router.SYSTEM_APP_STATUS` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_status) |
| `SYSTEM_APP_STOPWATCH` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_STOPWATCH` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_STOPWATCH` | symbol | `@zos/router.SYSTEM_APP_STOPWATCH` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_stopwatch) |
| `SYSTEM_APP_SUN_AND_MOON` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_SUN_AND_MOON` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_SUN_AND_MOON` | symbol | `@zos/router.SYSTEM_APP_SUN_AND_MOON` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_sun_and_moon) |
| `SYSTEM_APP_THERMOMETER` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_THERMOMETER` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_THERMOMETER` | symbol | `@zos/router.SYSTEM_APP_THERMOMETER` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_thermometer) |
| `SYSTEM_APP_TODO_LIST` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_TODO_LIST` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_TODO_LIST` | symbol | `@zos/router.SYSTEM_APP_TODO_LIST` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_todo_list) |
| `SYSTEM_APP_VOICE_MEMO` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_VOICE_MEMO` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_VOICE_MEMO` | symbol | `@zos/router.SYSTEM_APP_VOICE_MEMO` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_voice_memo) |
| `SYSTEM_APP_WEATHER` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_WEATHER` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_WEATHER` | symbol | `@zos/router.SYSTEM_APP_WEATHER` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_weather) |
| `SYSTEM_APP_WEPAY` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_WEPAY` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_WEPAY` | symbol | `@zos/router.SYSTEM_APP_WEPAY` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_wepay) |
| `SYSTEM_APP_WORLD_CLOCK` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_WORLD_CLOCK` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_WORLD_CLOCK` | symbol | `@zos/router.SYSTEM_APP_WORLD_CLOCK` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_world_clock) |
| `SYSTEM_APP_ZEPP_COACH` | enum value | `@zos/router.checkSystemApp -> System App ID constants` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `SYSTEM_APP_ZEPP_COACH` | enum value | `@zos/router.launchApp -> System App ID constants` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `SYSTEM_APP_ZEPP_COACH` | symbol | `@zos/router.SYSTEM_APP_ZEPP_COACH` | device-app | >= 3 | [zos-router](zos-router.md#zosroutersystem_app_zepp_coach) |
| `SYSTEM_KEYBOARD` | symbol | `@zos/ui.SYSTEM_KEYBOARD` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `system_status` | symbol | `hmUI.system_status` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `SystemSounds` | symbol | `@zos/sensor.SystemSounds` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `TEMPERATURE_UNIT_CENTIGRADE` | enum value | `@zos/settings.getTemperatureUnit -> Temperature unit constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettemperatureunit) |
| `TEMPERATURE_UNIT_CENTIGRADE` | symbol | `@zos/settings.TEMPERATURE_UNIT_CENTIGRADE` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingstemperature_unit_centigrade) |
| `TEMPERATURE_UNIT_FAHRENHEIT` | enum value | `@zos/settings.getTemperatureUnit -> Temperature unit constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettemperatureunit) |
| `TEMPERATURE_UNIT_FAHRENHEIT` | symbol | `@zos/settings.TEMPERATURE_UNIT_FAHRENHEIT` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingstemperature_unit_fahrenheit) |
| `Text` | symbol | `ui.Text` | settings | not stated | [ui](ui.md#uitext) |
| `TEXT` | enum value | `prop.TEXT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `TEXT` | symbol | `@zos/ui.TEXT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `TEXT` | enum value | `widget.TEXT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `TEXT` | symbol | `hmUI.widget.TEXT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `TEXT_IMG` | symbol | `hmUI.widget.TEXT_IMG` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `text_style` | symbol | `@zos/ui.text_style` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `text_style` | symbol | `hmUI.text_style` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `TextImageRow` | symbol | `ui.TextImageRow` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `TextInput` | symbol | `ui.TextInput` | settings | not stated | [ui](ui.md#uitextinput) |
| `Time` | symbol | `@zos/sensor.Time` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `TIME` | enum value | `id.TIME` | watchface | not stated | [hmSensor](hmSensor.md#hmsensorid) |
| `TIME` | symbol | `hmSensor.id.TIME` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `TIME_FORMAT_12` | enum value | `@zos/settings.getTimeFormat -> Hour format constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettimeformat) |
| `TIME_FORMAT_12` | symbol | `@zos/settings.TIME_FORMAT_12` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingstime_format_12) |
| `TIME_FORMAT_24` | enum value | `@zos/settings.getTimeFormat -> Hour format constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettimeformat) |
| `TIME_FORMAT_24` | symbol | `@zos/settings.TIME_FORMAT_24` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingstime_format_24) |
| `TIME_HOUR_FORMAT_12` | enum value | `@zos/sensor.Time.getHourFormat -> Hour format constants` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `TIME_HOUR_FORMAT_12` | symbol | `@zos/sensor.TIME_HOUR_FORMAT_12` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensortime_hour_format_12) |
| `TIME_HOUR_FORMAT_24` | enum value | `@zos/sensor.Time.getHourFormat -> Hour format constants` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `TIME_HOUR_FORMAT_24` | symbol | `@zos/sensor.TIME_HOUR_FORMAT_24` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensortime_hour_format_24) |
| `TIME_PICKER` | symbol | `@zos/ui.TIME_PICKER` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `TIME_POINTER` | symbol | `hmUI.widget.TIME_POINTER` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettime_pointer) |
| `Toast` | symbol | `ui.Toast` | settings | not stated | [ui](ui.md#uitoast) |
| `Toggle` | symbol | `ui.Toggle` | settings | not stated | [ui](ui.md#uitoggle) |
| `toObject` | symbol | `settings-storage.toObject` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagetoobject) |
| `TOP` | enum value | `align.TOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `TOP` | enum value | `align.TOP` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `total_count` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `total_downhill_distance` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `total_up_altitude` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `TRAINING_LOAD` | enum value | `data_type.TRAINING_LOAD` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `TransferFile` | symbol | `@zos/ble/TransferFile.TransferFile` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `transferred` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `transferring` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `TypedStorage` | symbol | `@zos/share-storage.TypedStorage` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `TypedStorage` | symbol | `@zos/storage.TypedStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `update` | member | `@zos/crypto.DigestCrypto.update()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `UPDATE_DATA` | enum value | `prop.UPDATE_DATA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `updateInfo` | member | `@zos/sensor.Sleep.updateInfo()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `updateLayout` | symbol | `@zos/ui.updateLayout` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiupdatelayout) |
| `updateLayoutStyle` | symbol | `@zos/ui.updateLayoutStyle` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiupdatelayoutstyle) |
| `updateStatusBarTitle` | symbol | `@zos/ui.updateStatusBarTitle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiupdatestatusbartitle) |
| `UVI` | enum value | `data_type.UVI` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `vertical_speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `VIBRATE` | symbol | `hmSensor.id.VIBRATE` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridvibrate) |
| `Vibrator` | symbol | `@zos/sensor.Vibrator` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_CALL` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_DURATION` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_DURATION_LONG` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_NOTIFICATION` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_SHORT_LIGHT` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_SHORT_MIDDLE` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_SHORT_STRONG` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_STRONG_REMINDER` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `VIBRATOR_SCENE_TIMER` | enum value | `@zos/sensor.Vibrator.start -> Vibration motor mode constants` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `View` | symbol | `ui.View` | settings | not stated | [ui](ui.md#uiview) |
| `VIEW_CONTAINER` | symbol | `@zos/ui.VIEW_CONTAINER` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `VIEW_CONTAINER` | enum value | `widget.VIEW_CONTAINER` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `VIRTUAL_CONTAINER` | symbol | `@zos/ui.VIRTUAL_CONTAINER` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuivirtual_container) |
| `VIRTUAL_CONTAINER` | enum value | `widget.VIRTUAL_CONTAINER` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `VISIBLE` | enum value | `prop.VISIBLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `VO2MAX` | enum value | `data_type.VO2MAX` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `VOICE` | enum value | `inputType.VOICE` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `W` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `WALKING` | enum value | `data_type.WALKING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `warn` | member | `@zos/utils.log.warn()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `WATCHFACE` | enum value | `screen_type.WATCHFACE` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `Wear` | symbol | `@zos/sensor.Wear` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorwear) |
| `WEAR` | symbol | `hmSensor.id.WEAR` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridwear) |
| `Weather` | symbol | `@zos/sensor.Weather` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `WEATHER` | symbol | `hmSensor.id.WEATHER` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `WEATHER_CURRENT` | enum value | `data_type.WEATHER_CURRENT` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `WEATHER_HIGH` | enum value | `data_type.WEATHER_HIGH` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `WEATHER_LOW` | enum value | `data_type.WEATHER_LOW` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `WEEK` | enum value | `date.WEEK` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `WEEK_FRI` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_FRI` | symbol | `@zos/alarm.WEEK_FRI` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_fri) |
| `WEEK_MON` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_MON` | symbol | `@zos/alarm.WEEK_MON` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_mon) |
| `WEEK_SAT` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_SAT` | symbol | `@zos/alarm.WEEK_SAT` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_sat) |
| `WEEK_SUN` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_SUN` | symbol | `@zos/alarm.WEEK_SUN` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_sun) |
| `WEEK_THU` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_THU` | symbol | `@zos/alarm.WEEK_THU` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_thu) |
| `WEEK_TUE` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_TUE` | symbol | `@zos/alarm.WEEK_TUE` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_tue) |
| `WEEK_WED` | enum value | `@zos/alarm.set -> Timer weekly constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `WEEK_WED` | symbol | `@zos/alarm.WEEK_WED` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmweek_wed) |
| `WEIGHT_UNIT_JIN` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_JIN` | symbol | `@zos/settings.WEIGHT_UNIT_JIN` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_jin) |
| `WEIGHT_UNIT_KILOGRAM` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_KILOGRAM` | symbol | `@zos/settings.WEIGHT_UNIT_KILOGRAM` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_kilogram) |
| `WEIGHT_UNIT_POUND` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_POUND` | symbol | `@zos/settings.WEIGHT_UNIT_POUND` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_pound) |
| `WEIGHT_UNIT_STONE` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_STONE` | symbol | `@zos/settings.WEIGHT_UNIT_STONE` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_stone) |
| `widget` | symbol | `@zos/ui.widget` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `widget` | symbol | `hmUI.widget` | watchface | not stated | [hmUI](hmUI.md#hmuiwidget) |
| `widgetAnimations` | symbol | `@zos/ui.widgetAnimations` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `WIND` | enum value | `data_type.WIND` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `Workout` | symbol | `@zos/sensor.Workout` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `WORLD_CLOCK` | symbol | `hmSensor.id.WORLD_CLOCK` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `WorldClock` | symbol | `@zos/sensor.WorldClock` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `WRAP` | enum value | `text_style.WRAP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `WRIST_MOTION_FLIP` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_FLIP` | symbol | `@zos/interaction.WRIST_MOTION_FLIP` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_flip) |
| `WRIST_MOTION_LIFT` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_LIFT` | symbol | `@zos/interaction.WRIST_MOTION_LIFT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_lift) |
| `WRIST_MOTION_LOWER` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_LOWER` | symbol | `@zos/interaction.WRIST_MOTION_LOWER` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_lower) |
| `write` | symbol | `hmFS.write` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `writeFileSync` | symbol | `@zos/fs.writeFileSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `writeSync` | symbol | `@zos/fs.writeSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `X` | enum value | `prop.X` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |

## Names with more than one owner

Listed on their own because this is where a bare name stops being an answer.

- `addEventListener` — `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/ui.addEventListener` (symbol), `hmSensor.addEventListener` (symbol)
- `addListener` — `@zos/ble.addListener` (symbol), `hmBle.addListener` (symbol), `messaging.addListener` (symbol), `settings-storage.addListener` (symbol)
- `align` — `@zos/ui.align` (symbol), `hmUI.align` (symbol)
- `ANIM_IS_PAUSE` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `ANIM_IS_RUNINNG` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `ANIM_IS_STOP` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `anim_status` — `@zos/ui.anim_status` (symbol), `hmUI.anim_status` (symbol)
- `ARC` — `@zos/ui.ARC` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.ARC` (symbol)
- `BaseApp` — `@zeppos/zml/base-app.BaseApp` (symbol), `@zeppos/zml/base/base-app.BaseApp` (symbol)
- `BasePage` — `@zeppos/zml/base-page.BasePage` (symbol), `@zeppos/zml/base/base-page.BasePage` (symbol)
- `BaseSideService` — `@zeppos/zml/base-side.BaseSideService` (symbol), `@zeppos/zml/base/base-side.BaseSideService` (symbol)
- `BATTERY` — `@zos/ui.data_type` (enum value), `hmSensor.id` (enum value), `hmSensor.id.BATTERY` (symbol), `hmUI.data_type` (enum value)
- `BODY_TEMP` — `hmSensor.id.BODY_TEMP` (symbol), `hmUI.data_type` (enum value)
- `BOTTOM` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `BUTTON` — `@zos/ui.BUTTON` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget` (enum value), `hmUI.widget.BUTTON` (symbol)
- `Buzzer` — `@zos/sensor.Buzzer` (symbol), `@zos/ui.Buzzer` (symbol)
- `cancel` — `@zos/alarm.cancel` (symbol), `@zos/notification.cancel` (symbol)
- `CENTER_H` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `CENTER_V` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `CHECKBOX_GROUP` — `@zos/ui.CHECKBOX_GROUP` (symbol), `@zos/ui.widget` (enum value)
- `CIRCLE` — `@zos/ui.CIRCLE` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.CIRCLE` (symbol)
- `clear` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member), `@zos/utils.EventBus` (member), `settings-storage.clear` (symbol)
- `closeSync` — `@zos/fs.closeSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `connectStatus` — `@zos/ble.connectStatus` (symbol), `hmBle.connectStatus` (symbol)
- `createChiper` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `createConnect` — `@zos/ble.createConnect` (symbol), `hmBle.createConnect` (symbol)
- `createWidget` — `@zos/ui.createWidget` (symbol), `hmUI.createWidget` (symbol)
- `CYCLE_IMAGE_TEXT_LIST` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (symbol), `@zos/ui.widget` (enum value)
- `CYCLE_LIST` — `@zos/ui.CYCLE_LIST` (symbol), `@zos/ui.widget` (enum value)
- `data_type` — `@zos/ui.data_type` (symbol), `hmUI.data_type` (symbol)
- `DATE_FORMAT_DMY` — `@zos/settings.DATE_FORMAT_DMY` (symbol), `@zos/settings.getDateFormat` (enum value)
- `DATE_FORMAT_MDY` — `@zos/settings.DATE_FORMAT_MDY` (symbol), `@zos/settings.getDateFormat` (enum value)
- `DATE_FORMAT_YMD` — `@zos/settings.DATE_FORMAT_YMD` (symbol), `@zos/settings.getDateFormat` (enum value)
- `decrypt` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `deleteWidget` — `@zos/ui.deleteWidget` (symbol), `hmUI.deleteWidget` (symbol)
- `DIALOG` — `@zos/ui.DIALOG` (symbol), `@zos/ui.widget` (enum value)
- `disConnect` — `@zos/ble.disConnect` (symbol), `hmBle.disConnect` (symbol)
- `DISTANCE` — `hmSensor.id.DISTANCE` (symbol), `hmUI.data_type` (enum value)
- `DISTANCE_UNIT_IMPERIAL` — `@zos/settings.DISTANCE_UNIT_IMPERIAL` (symbol), `@zos/settings.getDistanceUnit` (enum value)
- `DISTANCE_UNIT_METRIC` — `@zos/settings.DISTANCE_UNIT_METRIC` (symbol), `@zos/settings.getDistanceUnit` (enum value)
- `ELLIPSIS` — `@zos/ui.text_style` (enum value), `hmUI.text_style` (enum value)
- `encrypt` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.CRCCrypto` (member), `@zos/crypto.DigestCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `error` — `@zos/ble/TransferFile.TransferFile` (enum value), `@zos/utils.log` (member)
- `exit` — `@zos/app-service.exit` (symbol), `@zos/router.exit` (symbol)
- `FILL_RECT` — `@zos/ui.FILL_RECT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.FILL_RECT` (symbol)
- `FREQ_MODE_HIGH` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_HIGH` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `FREQ_MODE_LOW` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_LOW` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `FREQ_MODE_NORMAL` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_NORMAL` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `GENDER_FEMALE` — `@zos/user.GENDER_FEMALE` (symbol), `@zos/user.getProfile` (enum value)
- `GENDER_MALE` — `@zos/user.GENDER_MALE` (symbol), `@zos/user.getProfile` (enum value)
- `GENDER_UNSPECIFIED` — `@zos/user.GENDER_UNSPECIFIED` (symbol), `@zos/user.getProfile` (enum value)
- `GESTURE_DOWN` — `@zos/interaction.GESTURE_DOWN` (symbol), `@zos/interaction.onGesture` (enum value)
- `GESTURE_LEFT` — `@zos/interaction.GESTURE_LEFT` (symbol), `@zos/interaction.onGesture` (enum value)
- `GESTURE_RIGHT` — `@zos/interaction.GESTURE_RIGHT` (symbol), `@zos/interaction.onGesture` (enum value)
- `GESTURE_UP` — `@zos/interaction.GESTURE_UP` (symbol), `@zos/interaction.onGesture` (enum value)
- `getBool` — `@zos/share-storage.TypedStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `getBrightness` — `@zos/display.getBrightness` (symbol), `hmSetting.getBrightness` (symbol)
- `getCurrent` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Battery` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.BodyTemperature` (member), `@zos/sensor.Calorie` (member), `@zos/sensor.Distance` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.HeartRate` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member), `@zos/sensor.Stress` (member)
- `getDateFormat` — `@zos/settings.getDateFormat` (symbol), `hmSetting.getDateFormat` (symbol)
- `getDeviceInfo` — `@zos/device.getDeviceInfo` (symbol), `hmSetting.getDeviceInfo` (symbol)
- `getDiskInfo` — `@zos/device.getDiskInfo` (symbol), `hmSetting.getDiskInfo` (symbol)
- `getDouble` — `@zos/share-storage.TypedStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `getEnabled` — `@zos/sensor.Geolocation` (member), `@zos/sensor.SystemSounds` (member)
- `getFreqMode` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Gyroscope` (member)
- `getInbox` — `@zos/ble/TransferFile.TransferFile` (member), `transfer-file.getInbox` (symbol)
- `getInfo` — `@zos/sensor.Sleep` (member), `@zos/sensor.WorldClock` (member)
- `getInt` — `@zos/share-storage.TypedStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `getInt64` — `@zos/share-storage.TypedStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `getItem` — `@zos/share-storage.LocalStorage` (member), `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `settings-storage.getItem` (symbol)
- `getLanguage` — `@zos/settings.getLanguage` (symbol), `hmSetting.getLanguage` (symbol)
- `getLastWeek` — `@zos/sensor.Pai` (member), `@zos/sensor.Stress` (member)
- `getProperty` — `@zos/ui.getProperty` (symbol), `hmUI.getProperty` (symbol)
- `getSleepTarget` — `@zos/settings.getSleepTarget` (symbol), `hmSetting.getSleepTarget` (symbol)
- `getSourceType` — `@zos/sensor.Buzzer` (member), `@zos/sensor.SystemSounds` (member)
- `getStatus` — `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Screen` (member), `@zos/sensor.Wear` (member), `@zos/sensor.Workout` (member)
- `getString` — `@zos/share-storage.TypedStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `getTarget` — `@zos/sensor.Calorie` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member)
- `getTimeFormat` — `@zos/settings.getTimeFormat` (symbol), `hmSetting.getTimeFormat` (symbol)
- `getToday` — `@zos/sensor.BodyTemperature` (member), `@zos/sensor.HeartRate` (member), `@zos/sensor.Pai` (member), `@zos/sensor.Stress` (member)
- `getType` — `@zos/sensor.Vibrator` (member), `@zos/ui.getType` (symbol)
- `getWeightTarget` — `@zos/settings.getWeightTarget` (symbol), `hmSetting.getWeightTarget` (symbol)
- `getWeightUnit` — `@zos/settings.getWeightUnit` (symbol), `hmSetting.getWeightUnit` (symbol)
- `GRADKIENT_POLYLINE` — `@zos/ui.widget` (enum value), `hmUI.widget.GRADKIENT_POLYLINE` (symbol)
- `GROUP` — `@zos/ui.GROUP` (symbol), `@zos/ui.widget` (enum value)
- `has` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `HEART` — `hmSensor.id.HEART` (symbol), `hmUI.data_type` (enum value)
- `HISTOGRAM` — `@zos/ui.HISTOGRAM` (symbol), `@zos/ui.widget` (enum value)
- `IMG` — `@zos/ui.IMG` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.IMG` (symbol)
- `IMG_ANIM` — `@zos/ui.IMG_ANIM` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.IMG_ANIM` (symbol)
- `IMG_LEVEL` — `@zos/ui.widget` (enum value), `hmUI.widget.IMG_LEVEL` (symbol)
- `KEY_BACK` — `@zos/interaction.KEY_BACK` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_DOWN` — `@zos/interaction.KEY_DOWN` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_CLICK` — `@zos/interaction.KEY_EVENT_CLICK` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_DOUBLE_CLICK` — `@zos/interaction.KEY_EVENT_DOUBLE_CLICK` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_LONG_PRESS` — `@zos/interaction.KEY_EVENT_LONG_PRESS` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_PRESS` — `@zos/interaction.KEY_EVENT_PRESS` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_RELEASE` — `@zos/interaction.KEY_EVENT_RELEASE` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_HOME` — `@zos/interaction.KEY_HOME` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_SELECT` — `@zos/interaction.KEY_SELECT` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_SHORTCUT` — `@zos/interaction.KEY_SHORTCUT` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_UP` — `@zos/interaction.KEY_UP` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `LEFT` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `LocalStorage` — `@zos/share-storage.LocalStorage` (symbol), `@zos/storage.LocalStorage` (symbol)
- `log` — `@zos/global.console` (member), `@zos/utils.log` (symbol), `@zos/utils.log` (member), `global.console.log` (symbol)
- `MODAL_CANCEL` — `@zos/interaction.createModal` (enum value), `@zos/interaction.MODAL_CANCEL` (symbol)
- `MODAL_CONFIRM` — `@zos/interaction.createModal` (enum value), `@zos/interaction.MODAL_CONFIRM` (symbol)
- `NONE` — `@zos/ui.text_style` (enum value), `hmUI.text_style` (enum value)
- `O_APPEND` — `@zos/fs.O_APPEND` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_CREAT` — `@zos/fs.O_CREAT` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_EXCL` — `@zos/fs.O_EXCL` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_RDONLY` — `@zos/fs.O_RDONLY` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_RDWR` — `@zos/fs.O_RDWR` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_TRUNC` — `@zos/fs.O_TRUNC` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_WRONLY` — `@zos/fs.O_WRONLY` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `offChange` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Barometer` (member), `@zos/sensor.Battery` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Calorie` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Distance` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Screen` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member), `@zos/sensor.Stress` (member), `@zos/sensor.Wear` (member)
- `onChange` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Barometer` (member), `@zos/sensor.Battery` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Calorie` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Distance` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Screen` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member), `@zos/sensor.Stress` (member), `@zos/sensor.Wear` (member)
- `openSync` — `@zos/fs.openSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `PAUSE` — `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `PICK_DATE` — `@zos/ui.PICK_DATE` (symbol), `@zos/ui.widget` (enum value)
- `prop` — `@zos/ui.prop` (symbol), `hmUI.prop` (symbol)
- `putBool` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putDouble` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putInt` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putInt64` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putString` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `QRCODE` — `@zos/ui.QRCODE` (symbol), `@zos/ui.widget` (enum value)
- `RADIO_GROUP` — `@zos/ui.RADIO_GROUP` (symbol), `@zos/ui.widget` (enum value)
- `readFileSync` — `@zos/fs.readFileSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `readSync` — `@zos/fs.readSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `remove` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member), `hmFS.remove` (symbol)
- `removeItem` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `settings-storage.removeItem` (symbol)
- `removeListener` — `@zos/ble.removeListener` (symbol), `hmBle.removeListener` (symbol)
- `REPEAT_DAY` — `@zos/alarm.REPEAT_DAY` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_HOUR` — `@zos/alarm.REPEAT_HOUR` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_MINUTE` — `@zos/alarm.REPEAT_MINUTE` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_MONTH` — `@zos/alarm.REPEAT_MONTH` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_ONCE` — `@zos/alarm.REPEAT_ONCE` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_WEEK` — `@zos/alarm.REPEAT_WEEK` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_YEAR` — `@zos/alarm.REPEAT_YEAR` (symbol), `@zos/alarm.set` (enum value)
- `RESUME` — `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `RIGHT` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `SCENE_AOD` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_AOD` (symbol)
- `SCENE_APP` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_APP` (symbol)
- `SCENE_SETTINGS` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_SETTINGS` (symbol)
- `SCENE_WATCHFACE` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_WATCHFACE` (symbol)
- `SCREEN_SHAPE_ROUND` — `@zos/device.getDeviceInfo` (enum value), `@zos/device.SCREEN_SHAPE_ROUND` (symbol)
- `SCREEN_SHAPE_SQUARE` — `@zos/device.getDeviceInfo` (enum value), `@zos/device.SCREEN_SHAPE_SQUARE` (symbol)
- `SCROLL_ANIMATION_NONE` — `@zos/page.SCROLL_ANIMATION_NONE` (symbol), `@zos/page.swipeToIndex` (enum value)
- `SCROLL_ANIMATION_SMOOTH` — `@zos/page.SCROLL_ANIMATION_SMOOTH` (symbol), `@zos/page.swipeToIndex` (enum value)
- `SCROLL_LIST` — `@zos/ui.SCROLL_LIST` (symbol), `@zos/ui.widget` (enum value)
- `SCROLL_MODE_FREE` — `@zos/page.SCROLL_MODE_FREE` (symbol), `@zos/page.setScrollMode` (enum value)
- `SCROLL_MODE_SWIPER` — `@zos/page.SCROLL_MODE_SWIPER` (symbol), `@zos/page.setScrollMode` (enum value)
- `SCROLL_MODE_SWIPER_HORIZONTAL` — `@zos/page.SCROLL_MODE_SWIPER_HORIZONTAL` (symbol), `@zos/page.setScrollMode` (enum value)
- `seek` — `@zos/media.Player` (member), `hmFS.seek` (symbol)
- `send` — `@zos/ble.send` (symbol), `hmBle.send` (symbol), `messaging.send` (symbol)
- `setBrightness` — `@zos/display.setBrightness` (symbol), `hmSetting.setBrightness` (symbol)
- `setFreqMode` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Gyroscope` (member)
- `setItem` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `settings-storage.setItem` (symbol)
- `setProperty` — `@zos/ui.setProperty` (symbol), `hmUI.setProperty` (symbol)
- `setScreenOff` — `@zos/display.setScreenOff` (symbol), `hmSetting.setScreenOff` (symbol)
- `SLEEP` — `hmSensor.id.SLEEP` (symbol), `hmUI.data_type` (enum value)
- `SLIDE_SWITCH` — `@zos/ui.SLIDE_SWITCH` (symbol), `@zos/ui.widget` (enum value)
- `SPO2` — `hmSensor.id.SPO2` (symbol), `hmUI.data_type` (enum value)
- `SPORT_DATA` — `@zos/ui.SPORT_DATA` (symbol), `@zos/ui.widget` (enum value)
- `STAND` — `hmSensor.id.STAND` (symbol), `hmUI.data_type` (enum value)
- `start` — `@zos/app-service.start` (symbol), `@zos/crypto.DigestCrypto` (member), `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/sensor.Accelerometer` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Buzzer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.SystemSounds` (member), `@zos/sensor.Vibrator` (member)
- `START` — `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `statSync` — `@zos/fs.statSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `STEP` — `hmSensor.id.STEP` (symbol), `hmUI.data_type` (enum value)
- `stop` — `@zos/app-service.stop` (symbol), `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/sensor.Accelerometer` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Buzzer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.SystemSounds` (member), `@zos/sensor.Vibrator` (member)
- `STOP` — `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `stopTimer` — `@zos/timer.stopTimer` (symbol), `timer.stopTimer` (symbol)
- `STRESS` — `hmSensor.id.STRESS` (symbol), `hmUI.data_type` (enum value)
- `STROKE_RECT` — `@zos/ui.STROKE_RECT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.STROKE_RECT` (symbol)
- `SYSTEM_APP_ALARM` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_ALARM` (symbol)
- `SYSTEM_APP_ALEAX` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_ALEAX` (symbol)
- `SYSTEM_APP_ALIPAY` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_ALIPAY` (symbol)
- `SYSTEM_APP_ALTIMETER` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_ALTIMETER` (symbol)
- `SYSTEM_APP_BODY_COMPOSITION` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_BODY_COMPOSITION` (symbol)
- `SYSTEM_APP_BREATH` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_BREATH` (symbol)
- `SYSTEM_APP_CALENDAR` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_CALENDAR` (symbol)
- `SYSTEM_APP_CAMERA` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_CAMERA` (symbol)
- `SYSTEM_APP_CARD` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_CARD` (symbol)
- `SYSTEM_APP_CLUB_CARD` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_CLUB_CARD` (symbol)
- `SYSTEM_APP_COMPASS` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_COMPASS` (symbol)
- `SYSTEM_APP_COUNTDOWN` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_COUNTDOWN` (symbol)
- `SYSTEM_APP_FINE_PHONE` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_FINE_PHONE` (symbol)
- `SYSTEM_APP_HR` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_HR` (symbol)
- `SYSTEM_APP_MEASUREMENT` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_MEASUREMENT` (symbol)
- `SYSTEM_APP_MENSTRUAL` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_MENSTRUAL` (symbol)
- `SYSTEM_APP_MUSIC` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_MUSIC` (symbol)
- `SYSTEM_APP_NETEASE_MUSIC` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_NETEASE_MUSIC` (symbol)
- `SYSTEM_APP_PAI` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_PAI` (symbol)
- `SYSTEM_APP_PHONE` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_PHONE` (symbol)
- `SYSTEM_APP_POMODORO` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_POMODORO` (symbol)
- `SYSTEM_APP_PRESSURE` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_PRESSURE` (symbol)
- `SYSTEM_APP_READINESS` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_READINESS` (symbol)
- `SYSTEM_APP_SETTING` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SETTING` (symbol)
- `SYSTEM_APP_SLEEP` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SLEEP` (symbol)
- `SYSTEM_APP_SPO2` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SPO2` (symbol)
- `SYSTEM_APP_SPORT` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SPORT` (symbol)
- `SYSTEM_APP_SPORT_HISTORY` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SPORT_HISTORY` (symbol)
- `SYSTEM_APP_SPORT_STATUS` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SPORT_STATUS` (symbol)
- `SYSTEM_APP_STATUS` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_STATUS` (symbol)
- `SYSTEM_APP_STOPWATCH` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_STOPWATCH` (symbol)
- `SYSTEM_APP_SUN_AND_MOON` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_SUN_AND_MOON` (symbol)
- `SYSTEM_APP_THERMOMETER` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_THERMOMETER` (symbol)
- `SYSTEM_APP_TODO_LIST` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_TODO_LIST` (symbol)
- `SYSTEM_APP_VOICE_MEMO` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_VOICE_MEMO` (symbol)
- `SYSTEM_APP_WEATHER` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_WEATHER` (symbol)
- `SYSTEM_APP_WEPAY` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_WEPAY` (symbol)
- `SYSTEM_APP_WORLD_CLOCK` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_WORLD_CLOCK` (symbol)
- `SYSTEM_APP_ZEPP_COACH` — `@zos/router.checkSystemApp` (enum value), `@zos/router.launchApp` (enum value), `@zos/router.SYSTEM_APP_ZEPP_COACH` (symbol)
- `TEMPERATURE_UNIT_CENTIGRADE` — `@zos/settings.getTemperatureUnit` (enum value), `@zos/settings.TEMPERATURE_UNIT_CENTIGRADE` (symbol)
- `TEMPERATURE_UNIT_FAHRENHEIT` — `@zos/settings.getTemperatureUnit` (enum value), `@zos/settings.TEMPERATURE_UNIT_FAHRENHEIT` (symbol)
- `TEXT` — `@zos/ui.prop` (enum value), `@zos/ui.TEXT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.TEXT` (symbol)
- `text_style` — `@zos/ui.text_style` (symbol), `hmUI.text_style` (symbol)
- `TIME` — `hmSensor.id` (enum value), `hmSensor.id.TIME` (symbol)
- `TIME_FORMAT_12` — `@zos/settings.getTimeFormat` (enum value), `@zos/settings.TIME_FORMAT_12` (symbol)
- `TIME_FORMAT_24` — `@zos/settings.getTimeFormat` (enum value), `@zos/settings.TIME_FORMAT_24` (symbol)
- `TIME_HOUR_FORMAT_12` — `@zos/sensor.Time` (enum value), `@zos/sensor.TIME_HOUR_FORMAT_12` (symbol)
- `TIME_HOUR_FORMAT_24` — `@zos/sensor.Time` (enum value), `@zos/sensor.TIME_HOUR_FORMAT_24` (symbol)
- `TOP` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `TypedStorage` — `@zos/share-storage.TypedStorage` (symbol), `@zos/storage.TypedStorage` (symbol)
- `VIEW_CONTAINER` — `@zos/ui.VIEW_CONTAINER` (symbol), `@zos/ui.widget` (enum value)
- `VIRTUAL_CONTAINER` — `@zos/ui.VIRTUAL_CONTAINER` (symbol), `@zos/ui.widget` (enum value)
- `WEEK_FRI` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_FRI` (symbol)
- `WEEK_MON` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_MON` (symbol)
- `WEEK_SAT` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_SAT` (symbol)
- `WEEK_SUN` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_SUN` (symbol)
- `WEEK_THU` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_THU` (symbol)
- `WEEK_TUE` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_TUE` (symbol)
- `WEEK_WED` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_WED` (symbol)
- `WEIGHT_UNIT_JIN` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_JIN` (symbol)
- `WEIGHT_UNIT_KILOGRAM` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_KILOGRAM` (symbol)
- `WEIGHT_UNIT_POUND` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_POUND` (symbol)
- `WEIGHT_UNIT_STONE` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_STONE` (symbol)
- `widget` — `@zos/ui.widget` (symbol), `hmUI.widget` (symbol)
- `WRIST_MOTION_FLIP` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_FLIP` (symbol)
- `WRIST_MOTION_LIFT` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_LIFT` (symbol)
- `WRIST_MOTION_LOWER` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_LOWER` (symbol)

# Lookup — every name, and what owns it

Start here when you have a bare name and nothing else: a symbol out of
someone else's code, a method called on a value, a constant passed to a
function, a property set on a widget. Every other index in this base is
keyed by module, `API_LEVEL` or runtime — by where a thing sits rather than
by what it is called.

**1362 names**, 2669 entries: 397 enum values, 257 members, 1501 properties, 514 symbols. 492 names have more than one owner.

**A name with several owners is not a duplicate.** 12 sensors document a
`getCurrent` and they return 12 different shapes; `CENTER_H` belongs to
`@zos/ui.align` in a Device App and `hmUI.align` in a watchface; `align_h`
is a property of five widgets across two runtimes. Read the row whose
runtime matches what you are building.

Bare numeric domains are excluded — `retCode` 0..10, the weather `index`
0..28. Those are values, not names, and indexing them put `0` here with
eleven owners. Look those up on the owning symbol's page instead. A widely
shared property is not that: `x` has 52 owners and the breadth is the
answer, since it is a position prop on every widget.

| Name | Kind | Written as | Runtimes | Min API_LEVEL | Page |
| --- | --- | --- | --- | --- | --- |
| `ABN_HIGH` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.ABN_HIGH` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `ABN_LOW` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.ABN_LOW` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `Accelerometer` | symbol | `@zos/sensor.Accelerometer` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `accessibleSwitch` | property | `@zos/settings.getSystemMode -> Result.accessibleSwitch` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `ACHIEVE` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.ACHIEVE` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `action` | property | `@zos/ui.SCROLL_LIST -> TextView.action` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `action` | property | `@zos/ui.SCROLL_LIST -> ImageView.action` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `actions` | property | `@zos/notification.notify -> Option.actions` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
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
| `age` | property | `@zos/user.getProfile -> Result.age` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `age` | property | `hmSetting.getUserData -> userData.age` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `agps_inject_time` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.agps_inject_time` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `ALARM` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `ALARM` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.ALARM` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `ALARM_CLOCK` | enum value | `data_type.ALARM_CLOCK` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `alg` | symbol | `@zos/crypto.alg` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoalg) |
| `align` | symbol | `@zos/ui.align` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `align` | symbol | `hmUI.align` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `align` | property | `ui.Text -> Props.align` | settings | not stated | [ui](ui.md#uitext) |
| `align_h` | property | `@zos/ui.KEYBOARD -> Param.align_h` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `align_h` | property | `@zos/ui.PAGE_INDICATOR -> Param.align_h` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `align_h` | property | `@zos/ui.TEXT -> Param.align_h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `align_h` | property | `hmUI.widget.TEXT -> Param.align_h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `align_h` | property | `hmUI.widget.TEXT_IMG -> Param.align_h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `align_v` | property | `@zos/ui.TEXT -> Param.align_v` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `align_v` | property | `hmUI.widget.TEXT -> Param.align_v` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `alpha` | property | `@zos/ui.CANVAS -> Param.alpha` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `alpha` | property | `@zos/ui.CIRCLE -> Param.alpha` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `alpha` | property | `@zos/ui.FILL_RECT -> Param.alpha` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `alpha` | property | `@zos/ui.IMG -> Param.alpha` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `alpha` | property | `@zos/ui.KEYBOARD -> Param.alpha` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `alpha` | property | `hmUI.widget.CIRCLE -> Param.alpha` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `ALPHA` | enum value | `prop.ALPHA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `alt` | property | `ui.Image -> Props.alt` | settings | not stated | [ui](ui.md#uiimage) |
| `ALTIMETER` | enum value | `data_type.ALTIMETER` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `altitude` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `ALTITUDE` | enum value | `data_type.ALTITUDE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `angle` | property | `@zos/ui.FILL_RECT -> Param.angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `angle` | property | `@zos/ui.IMG -> Param.angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `angle` | property | `@zos/ui.STROKE_RECT -> Param.angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `angle` | property | `hmUI.widget.FILL_RECT -> Param.angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `angle` | property | `hmUI.widget.IMG -> Param.angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `angle` | property | `hmUI.widget.IMG_POINTER -> Param.angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `angle` | property | `hmUI.widget.STROKE_RECT -> Param.angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `ANGLE` | enum value | `prop.ANGLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `anim_auto_destroy` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_auto_destroy` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_auto_resume_call` | property | `hmUI.widget.IMG_ANIM -> Param.anim_auto_resume_call` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_auto_start` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_auto_start` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_complete_call` | property | `@zos/ui.IMG_ANIM -> Param.anim_complete_call` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_complete_call` | property | `hmUI.widget.IMG_ANIM -> Param.anim_complete_call` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_complete_func` | property | `@zos/page.scrollTo -> animConfig.anim_complete_func` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `anim_complete_func` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_complete_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_duration` | property | `@zos/page.scrollTo -> animConfig.anim_duration` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `anim_duration` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_duration` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_ext` | property | `@zos/ui.IMG_ANIM -> Param.anim_ext` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_ext` | property | `hmUI.widget.IMG_ANIM -> Param.anim_ext` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_fps` | property | `@zos/page.scrollTo -> animConfig.anim_fps` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `anim_fps` | property | `@zos/ui.IMG_ANIM -> Param.anim_fps` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_fps` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_fps` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_fps` | property | `hmUI.widget.IMG_ANIM -> Param.anim_fps` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_frame_func` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_frame_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_from` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_from` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `ANIM_IS_PAUSE` | enum value | `prop.ANIM_IS_PAUSE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_PAUSE` | enum value | `prop.ANIM_IS_PAUSE` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `ANIM_IS_RUNINNG` | enum value | `prop.ANIM_IS_RUNINNG` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_RUNINNG` | enum value | `prop.ANIM_IS_RUNINNG` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `ANIM_IS_STOP` | enum value | `prop.ANIM_IS_STOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `ANIM_IS_STOP` | enum value | `prop.ANIM_IS_STOP` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `anim_offset` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_offset` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_path` | property | `@zos/ui.IMG_ANIM -> Param.anim_path` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_path` | property | `hmUI.widget.IMG_ANIM -> Param.anim_path` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_prefix` | property | `@zos/ui.IMG_ANIM -> Param.anim_prefix` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_prefix` | property | `hmUI.widget.IMG_ANIM -> Param.anim_prefix` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_prop` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_prop` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_rate` | property | `@zos/page.scrollTo -> animConfig.anim_rate` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `anim_rate` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_rate` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_repeat` | property | `@zos/ui.IMG_ANIM -> Param.anim_repeat` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_repeat` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_repeat` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_repeat` | property | `hmUI.widget.IMG_ANIM -> Param.anim_repeat` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_repeat_func` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_repeat_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_size` | property | `@zos/ui.IMG_ANIM -> Param.anim_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_size` | property | `hmUI.widget.IMG_ANIM -> Param.anim_size` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `anim_status` | symbol | `@zos/ui.anim_status` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `anim_status` | property | `@zos/ui.IMG_ANIM -> Param.anim_status` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `anim_status` | symbol | `hmUI.anim_status` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `anim_status` | property | `hmUI.widget.IMG_ANIM -> Param.anim_status` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `ANIM_STATUS` | enum value | `prop.ANIM_STATUS` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `anim_steps` | property | `@zos/ui.widgetAnimations -> Animation Configuration.anim_steps` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `anim_to` | property | `@zos/ui.widgetAnimations -> Individual property animation configuration.anim_to` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `animation` | property | `@zos/page.swipeToIndex -> Option.animation` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `animConfig` | property | `@zos/page.scrollTo -> Option.animConfig` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `AOD` | enum value | `screen_type.AOD` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `app` | property | `@zos/app.getPerformance -> Memory.app` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `app` | property | `@zos/device.getDiskInfo -> Result.app` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `app` | property | `hmSetting.getDiskInfo -> diskInfo.app` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
| `App` | symbol | `@zos/global.App` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalapp) |
| `APP` | enum value | `screen_type.APP` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `appid` | property | `@zos/alarm.set -> Option.appid` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `appid` | property | `@zos/app.getPerformance -> AppMemory.appid` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `appid` | property | `@zos/app.getPerformance -> LeakingMemory.appid` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `appid` | property | `@zos/app.getPerformance -> Perf.appid` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `appId` | property | `@zos/app.getPackageInfoById -> Option.appId` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetpackageinfobyid) |
| `appId` | property | `@zos/fs.openSync -> Options.appId` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `appId` | property | `@zos/router.checkSystemApp -> Option.appId` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `appId` | property | `@zos/router.launchApp -> Option.appId` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `appId` | property | `@zos/router.setLaunchAppTimeout -> Option.appId` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `appPlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/app.appPlugin` | device-app | not stated | [zeppos-zml-2.0-module-messaging-plugin-app](zeppos-zml-2.0-module-messaging-plugin-app.md#zepposzml20modulemessagingpluginappappplugin) |
| `AppService` | symbol | `@zos/global.AppService` | device-app | >= 3 | [zos-global](zos-global.md#zosglobalappservice) |
| `AppWidget` | symbol | `@zos/global.AppWidget` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `AQI` | enum value | `data_type.AQI` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `ARC` | symbol | `@zos/ui.ARC` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `ARC` | enum value | `widget.ARC` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `ARC` | symbol | `hmUI.widget.ARC` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `ARC_PROGRESS` | symbol | `hmUI.widget.ARC_PROGRESS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `artist` | property | `hmSensor.id.MUSIC -> music.artist` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridmusic) |
| `assets` | symbol | `@zos/utils.assets` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilsassets) |
| `Auth` | symbol | `ui.Auth` | settings | not stated | [ui](ui.md#uiauth) |
| `authorizeUrl` | property | `ui.Auth -> Props.authorizeUrl` | settings | not stated | [ui](ui.md#uiauth) |
| `auto_hide` | property | `@zos/ui.createDialog -> Option.auto_hide` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicreatedialog) |
| `auto_scale` | property | `@zos/ui.IMG -> Param.auto_scale` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `auto_scale_obj_fit` | property | `@zos/ui.IMG -> Param.auto_scale_obj_fit` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `autoBright` | property | `@zos/display.setAutoBrightness -> Option.autoBright` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetautobrightness) |
| `autoHide` | property | `@zos/interaction.createModal -> Option.autoHide` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `avg_cadence` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `avg_pace` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `avg_speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `azimuth` | property | `@zos/sensor.Geolocation.onGnssChange -> Satellite.azimuth` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
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
| `bg_h` | property | `@zos/ui.QRCODE -> Param.bg_h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `bg_radius` | property | `@zos/ui.QRCODE -> Param.bg_radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `bg_w` | property | `@zos/ui.QRCODE -> Param.bg_w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `bg_x` | property | `@zos/ui.QRCODE -> Param.bg_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `bg_y` | property | `@zos/ui.QRCODE -> Param.bg_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `BloodOxygen` | symbol | `@zos/sensor.BloodOxygen` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `bmi` | property | `@zos/user.addHealthData -> Option.bmi` | device-app | >= 3 | [zos-user](zos-user.md#zosuseraddhealthdata) |
| `BODY_TEMP` | symbol | `hmSensor.id.BODY_TEMP` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbody_temp) |
| `BODY_TEMP` | enum value | `data_type.BODY_TEMP` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `BodyTemperature` | symbol | `@zos/sensor.BodyTemperature` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `bold` | property | `ui.Text -> Props.bold` | settings | not stated | [ui](ui.md#uitext) |
| `bold` | property | `ui.TextInput -> Props.bold` | settings | not stated | [ui](ui.md#uitextinput) |
| `border_mode` | property | `@zos/ui.openInspector -> options Object Properties.border_mode` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiopeninspector) |
| `BOTTOM` | enum value | `align.BOTTOM` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `BOTTOM` | enum value | `align.BOTTOM` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `bounce` | property | `@zos/page.setScrollMode -> FreeModeParams.bounce` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `bounce` | property | `@zos/ui.VIEW_CONTAINER -> Param.bounce` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `BREATH_TRAIN` | enum value | `data_type.BREATH_TRAIN` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `brightness` | property | `@zos/display.setBrightness -> Option.brightness` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetbrightness) |
| `brightTime` | property | `@zos/display.setPageBrightTime -> Option.brightTime` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetpagebrighttime) |
| `buff` | property | `hmFS.read -> Parameters.buff` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `buff` | property | `hmFS.write -> Parameters.buff` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `buffer` | property | `@zos/fs.readSync -> Option.buffer` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `buffer` | property | `@zos/fs.writeSync -> Option.buffer` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `Buffer` | symbol | `@zos/global.Buffer` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalbuffer) |
| `bufferToString` | symbol | `@zos/utils.bufferToString` | device-app | >= 4 | [zos-utils](zos-utils.md#zosutilsbuffertostring) |
| `build` | property | `@zos/global.AppWidget -> Option.build` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `build` | property | `@zos/global.DataWidget -> Option.build` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `build` | property | `@zos/global.Page -> Option.build` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `build` | property | `@zos/global.SecondaryWidget -> Option.build` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `buildTime` | property | `@zos/app.getPerformance -> PerfModule.buildTime` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `button` | property | `@zos/settings.getSystemMode -> Result.button` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
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
| `callback` | property | `@zos/app.requestPermission -> Option.callback` | device-app | >= 3 | [zos-app](zos-app.md#zosapprequestpermission) |
| `callback` | property | `@zos/interaction.onDigitalCrown -> Option.callback` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `callback` | property | `@zos/interaction.onGesture -> Option.callback` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `callback` | property | `@zos/interaction.onKey -> Option.callback` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `callback` | property | `@zos/interaction.onWristMotion -> Option.callback` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `callback` | property | `@zos/ui.removeEventListener -> Parameters.callback` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiremoveeventlistener) |
| `callback` | property | `timer.createTimer -> Parameters.callback` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `Calorie` | symbol | `@zos/sensor.Calorie` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorcalorie) |
| `CALORIE` | symbol | `hmSensor.id.CALORIE` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridcalorie) |
| `calories` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `CAMERA` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.CAMERA` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `cancel` | symbol | `@zos/alarm.cancel` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmcancel) |
| `cancel` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.cancel` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `cancel` | symbol | `@zos/notification.cancel` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationcancel) |
| `CANCEL` | enum value | `keyboard.CANCEL` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `cancel_func` | property | `@zos/ui.DIALOG -> Param.cancel_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_nomal_color` | property | `@zos/ui.DIALOG -> Param.cancel_nomal_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_nomal_src` | property | `@zos/ui.DIALOG -> Param.cancel_nomal_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_press_color` | property | `@zos/ui.DIALOG -> Param.cancel_press_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_press_src` | property | `@zos/ui.DIALOG -> Param.cancel_press_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_text` | property | `@zos/ui.DIALOG -> Param.cancel_text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancel_text_color` | property | `@zos/ui.DIALOG -> Param.cancel_text_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `cancelButton` | property | `@zos/interaction.createModal -> Option.cancelButton` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `canceled` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `CANVAS` | symbol | `@zos/ui.CANVAS` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `capsuleButton` | property | `@zos/interaction.createModal -> Option.capsuleButton` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `category` | property | `@zos/ui.SPORT_DATA -> Param.category` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `CENTER_H` | enum value | `align.CENTER_H` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `CENTER_H` | enum value | `align.CENTER_H` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `CENTER_V` | enum value | `align.CENTER_V` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `CENTER_V` | enum value | `align.CENTER_V` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `center_x` | property | `@zos/ui.CANVAS -> Param.center_x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_x` | property | `@zos/ui.CANVAS -> Param.center_x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_x` | property | `@zos/ui.CANVAS -> Param.center_x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_x` | property | `@zos/ui.CIRCLE -> Param.center_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `center_x` | property | `@zos/ui.IMG -> Param.center_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `center_x` | property | `hmUI.widget.ARC_PROGRESS -> Param.center_x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `center_x` | property | `hmUI.widget.CIRCLE -> Param.center_x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `center_x` | property | `hmUI.widget.IMG -> Param.center_x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `center_x` | property | `hmUI.widget.IMG_POINTER -> Param.center_x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `center_y` | property | `@zos/ui.CANVAS -> Param.center_y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_y` | property | `@zos/ui.CANVAS -> Param.center_y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_y` | property | `@zos/ui.CANVAS -> Param.center_y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `center_y` | property | `@zos/ui.CIRCLE -> Param.center_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `center_y` | property | `@zos/ui.IMG -> Param.center_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `center_y` | property | `hmUI.widget.ARC_PROGRESS -> Param.center_y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `center_y` | property | `hmUI.widget.CIRCLE -> Param.center_y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `center_y` | property | `hmUI.widget.IMG -> Param.center_y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `center_y` | property | `hmUI.widget.IMG_POINTER -> Param.center_y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `change` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> FileEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `CHAR` | enum value | `inputType.CHAR` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `char_space` | property | `@zos/ui.TEXT -> Param.char_space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `char_space` | property | `hmUI.widget.TEXT -> Param.char_space` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `CHAR_WRAP` | enum value | `text_style.CHAR_WRAP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `check_func` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.check_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `check_func` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.check_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `CHECKBOX_GROUP` | symbol | `@zos/ui.CHECKBOX_GROUP` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `CHECKBOX_GROUP` | enum value | `widget.CHECKBOX_GROUP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `checkboxGroup` | property | `@zos/ui.CHECKBOX_GROUP -> CheckFunc.checkboxGroup` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `checked` | property | `@zos/ui.CHECKBOX_GROUP -> CheckFunc.checked` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `checked` | property | `@zos/ui.RADIO_GROUP -> CheckFunc.checked` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `checked` | property | `@zos/ui.SLIDE_SWITCH -> Param.checked` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `checked` | property | `@zos/ui.SLIDE_SWITCH -> CheckedChangeFunc.checked` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `CHECKED` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `CHECKED` | enum value | `prop.CHECKED` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `CHECKED` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `CHECKED` | property | `@zos/ui.SLIDE_SWITCH -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `checked_change_func` | property | `@zos/ui.SLIDE_SWITCH -> Param.checked_change_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `checkSensor` | symbol | `@zos/sensor.checkSensor` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorchecksensor) |
| `checkSystemApp` | symbol | `@zos/router.checkSystemApp` | device-app | >= 3 | [zos-router](zos-router.md#zosrouterchecksystemapp) |
| `child` | property | `@zos/ui.addLayoutChild -> Parameters.child` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiaddlayoutchild) |
| `child` | property | `@zos/ui.removeLayoutChild -> Parameters.child` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiremovelayoutchild) |
| `CIRCLE` | symbol | `@zos/ui.CIRCLE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `CIRCLE` | enum value | `widget.CIRCLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `CIRCLE` | symbol | `hmUI.widget.CIRCLE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `city` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.city` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `city` | property | `hmSensor.id.WORLD_CLOCK -> wordInfo.city` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `cityCode` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.cityCode` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `cityName` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastWeather.cityName` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `cityName` | property | `hmSensor.id.WEATHER -> ForecastWeather.cityName` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
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
| `click_func` | property | `@zos/ui.BUTTON -> Param.click_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `click_func` | property | `@zos/ui.KEYBOARD -> Param.click_func` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `click_func` | property | `hmUI.widget.BUTTON -> Param.click_func` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `click_listener` | property | `@zos/ui.createDialog -> Option.click_listener` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicreatedialog) |
| `CLICK_UP` | enum value | `event.CLICK_UP` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `clientId` | property | `ui.Auth -> Props.clientId` | settings | not stated | [ui](ui.md#uiauth) |
| `clientSecret` | property | `ui.Auth -> Props.clientSecret` | settings | not stated | [ui](ui.md#uiauth) |
| `CLOCK` | enum value | `system_status.CLOCK` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `close` | symbol | `hmFS.close` | watchface | not stated | [hmFS](hmFS.md#hmfsclose) |
| `closeSync` | symbol | `@zos/fs.closeSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsclosesync) |
| `closeSync` | member | `@zos/share-storage.FileSystem.closeSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `code` | property | `@zos/app-access.getSportData -> CallbackResult.code` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `col_width` | property | `@zos/ui.PICKER -> DataConfig.col_width` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `color` | property | `@zos/ui.ARC -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `color` | property | `@zos/ui.BUTTON -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CANVAS -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `color` | property | `@zos/ui.CIRCLE -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `color` | property | `@zos/ui.FILL_RECT -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `color` | property | `@zos/ui.HISTOGRAM -> XLine.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `color` | property | `@zos/ui.HISTOGRAM -> YLine.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `color` | property | `@zos/ui.HISTOGRAM -> XText.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `color` | property | `@zos/ui.HISTOGRAM -> yText.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `color` | property | `@zos/ui.keyboard -> Parameters.color` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `color` | property | `@zos/ui.KEYBOARD -> Param.color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `color` | property | `@zos/ui.SCROLL_LIST -> TextView.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `color` | property | `@zos/ui.STROKE_RECT -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `color` | property | `@zos/ui.TEXT -> Param.color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `color` | property | `hmUI.widget.ARC -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `color` | property | `hmUI.widget.ARC_PROGRESS -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `color` | property | `hmUI.widget.BUTTON -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `color` | property | `hmUI.widget.CIRCLE -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `color` | property | `hmUI.widget.FILL_RECT -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `color` | property | `hmUI.widget.STROKE_RECT -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `color` | property | `hmUI.widget.TEXT -> Param.color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `color` | property | `ui.Button -> Props.color` | settings | not stated | [ui](ui.md#uibutton) |
| `color_from` | property | `@zos/ui.GRADIENT_POLYLINE -> Option.color_from` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `color_to` | property | `@zos/ui.GRADIENT_POLYLINE -> Option.color_to` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `column` | property | `@zos/ui.TIME_PICKER -> CallBack.column` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `column_index` | property | `@zos/ui.PICKER -> CallBack.column_index` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `Compass` | symbol | `@zos/sensor.Compass` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `COMPLETE` | property | `@zos/media.Player -> event.COMPLETE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `complete_func` | property | `@zos/app-service.start -> Option.complete_func` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `complete_func` | property | `@zos/app-service.stop -> Option.complete_func` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestop) |
| `connect_id` | property | `@zos/ble.mstConnect -> ConnectResult.connect_id` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstconnect) |
| `connected` | property | `@zos/ble.mstConnect -> ConnectResult.connected` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstconnect) |
| `connector` | property | `@zos/ui.PICKER -> DataConfig.connector` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `connector_font_size` | property | `@zos/ui.PICKER -> DataConfig.connector_font_size` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `connectStatus` | symbol | `@zos/ble.connectStatus` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbleconnectstatus) |
| `connectStatus` | symbol | `hmBle.connectStatus` | watchface | not stated | [hmBle](hmBle.md#hmbleconnectstatus) |
| `console` | symbol | `@zos/global.console` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalconsole) |
| `console.log` | symbol | `global.console.log` | settings, side-service | not stated | [global](global.md#globalconsolelog) |
| `CONSUME` | enum value | `sport_data.CONSUME` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `content` | property | `@zos/interaction.createModal -> Option.content` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `content` | property | `@zos/interaction.showToast -> Option.content` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionshowtoast) |
| `content` | property | `@zos/notification.notify -> Option.content` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `content` | property | `@zos/ui.QRCODE -> Param.content` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `content_bg_color` | property | `@zos/ui.DIALOG -> Param.content_bg_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `content_text_align_h` | property | `@zos/ui.DIALOG -> Param.content_text_align_h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `content_text_align_v` | property | `@zos/ui.DIALOG -> Param.content_text_align_v` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `content_text_color` | property | `@zos/ui.DIALOG -> Param.content_text_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `content_text_size` | property | `@zos/ui.DIALOG -> Param.content_text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `CONTINUOUS` | property | `@zos/sensor.Vibrator.getType -> Type.CONTINUOUS` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `convert` | symbol | `image-convert.convert` | side-service | not stated | [image-convert](image-convert.md#image-convertconvert) |
| `convertLib` | symbol | `@zeppos/zml/base-side.convertLib` | side-service | not stated | [zeppos-zml-base-side](zeppos-zml-base-side.md#zepposzmlbase-sideconvertlib) |
| `count` | property | `@zos/page.setScrollMode -> Options.count` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `count` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastData.count` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `count` | property | `@zos/sensor.Weather.getForecastWeather -> TideData.count` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `count` | property | `@zos/ui.GRADIENT_POLYLINE -> Option.count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `count` | property | `@zos/ui.HISTOGRAM -> XLine.count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `count` | property | `@zos/ui.HISTOGRAM -> YLine.count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `count` | property | `@zos/ui.HISTOGRAM -> XText.count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `count` | property | `@zos/ui.HISTOGRAM -> yText.count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `count` | property | `@zos/ui.keyboard -> Parameters.count` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `count` | member | `@zos/utils.EventBus.count()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `count` | property | `hmSensor.id.WEATHER -> ForecastData.count` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `count` | property | `hmSensor.id.WEATHER -> TideData.count` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
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
| `createTime` | property | `@zos/app.getPerformance -> PerfModule.createTime` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `createTimer` | symbol | `timer.createTimer` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `createWidget` | symbol | `@zos/ui.createWidget` | device-app, workout-extension | >= 2 | [zos-ui](zos-ui.md#zosuicreatewidget) |
| `createWidget` | symbol | `hmUI.createWidget` | watchface | not stated | [hmUI](hmUI.md#hmuicreatewidget) |
| `crown_enable` | property | `@zos/page.setScrollMode -> SwipeModeParams.crown_enable` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `CUR_COLUMN` | property | `@zos/ui.PICKER -> Property Operations.prop.CUR_COLUMN` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `current` | property | `@zos/sensor.BodyTemperature.getCurrent -> Result.current` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `current` | property | `hmSensor.id.BATTERY -> battery.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbattery) |
| `current` | property | `hmSensor.id.BODY_TEMP -> thermometer.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbody_temp) |
| `current` | property | `hmSensor.id.CALORIE -> calorie.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridcalorie) |
| `current` | property | `hmSensor.id.DISTANCE -> distance.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoriddistance) |
| `current` | property | `hmSensor.id.FAT_BURRING -> fatburn.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridfat_burring) |
| `current` | property | `hmSensor.id.HEART -> heart.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridheart) |
| `current` | property | `hmSensor.id.SPO2 -> spo2.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `current` | property | `hmSensor.id.STAND -> stand.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstand) |
| `current` | property | `hmSensor.id.STEP -> step.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstep) |
| `current` | property | `hmSensor.id.STRESS -> stress.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstress) |
| `current` | property | `hmSensor.id.WEAR -> wear.current` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridwear) |
| `curve_style` | property | `@zos/ui.GRADIENT_POLYLINE -> Option.curve_style` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `CYCLE_IMAGE_TEXT_LIST` | symbol | `@zos/ui.CYCLE_IMAGE_TEXT_LIST` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `CYCLE_IMAGE_TEXT_LIST` | enum value | `widget.CYCLE_IMAGE_TEXT_LIST` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `CYCLE_LIST` | symbol | `@zos/ui.CYCLE_LIST` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `CYCLE_LIST` | enum value | `widget.CYCLE_LIST` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `cycleList` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> ItemClickFunc.cycleList` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `cycleList` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> ItemFocusChangeFunc.cycleList` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `cycleList` | property | `@zos/ui.CYCLE_LIST -> ItemClickFunc.cycleList` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `cycleList` | property | `@zos/ui.CYCLE_LIST -> ItemFocusChangeFunc.cycleList` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `dailypai` | property | `hmSensor.id.PAI -> pai.dailypai` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `data` | property | `@zos/app-access.getSportData -> CallbackResult.data` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `data` | property | `@zos/crypto.AESCrypto.encrypt -> AESCipherResult.data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `data` | property | `@zos/crypto.AESCrypto.decrypt -> AESCipherResult.data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `data` | property | `@zos/crypto.CRCCrypto.encrypt -> CRCResult.data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptocrccrypto) |
| `data` | property | `@zos/crypto.ECDSACrypto.encrypt -> ECDSACipherResult.data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `data` | property | `@zos/crypto.ECDSACrypto.decrypt -> ECDSACipherResult.data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `data` | property | `@zos/fs.writeFileSync -> Option.data` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `data` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastData.data` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `data` | property | `@zos/sensor.Weather.getForecastWeather -> TideData.data` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `data` | property | `@zos/ui.GRADIENT_POLYLINE -> Option.data` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `data` | property | `hmBle.createConnect -> Parameters.data` | watchface | not stated | [hmBle](hmBle.md#hmblecreateconnect) |
| `data` | property | `hmBle.send -> Parameters.data` | watchface | not stated | [hmBle](hmBle.md#hmblesend) |
| `data` | property | `hmSensor.id.WEATHER -> ForecastData.data` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `data` | property | `hmSensor.id.WEATHER -> TideData.data` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `data_array` | property | `@zos/ui.CANVAS -> Param.data_array` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `data_array` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `data_array` | property | `@zos/ui.CYCLE_LIST -> Param.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `data_array` | property | `@zos/ui.HISTOGRAM -> Param.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_array` | property | `@zos/ui.HISTOGRAM -> XText.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_array` | property | `@zos/ui.HISTOGRAM -> yText.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_array` | property | `@zos/ui.PICKER -> DataConfig.data_array` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `data_array` | property | `@zos/ui.SCROLL_LIST -> Param.data_array` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `data_config` | property | `@zos/ui.PICKER -> Param.data_config` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `data_count` | property | `@zos/ui.HISTOGRAM -> Param.data_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_count` | property | `@zos/ui.SCROLL_LIST -> Param.data_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `data_key` | property | `@zos/ui.SCROLL_LIST -> ItemClickFunc.data_key` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `data_max_value` | property | `@zos/ui.HISTOGRAM -> Param.data_max_value` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_min_value` | property | `@zos/ui.HISTOGRAM -> Param.data_min_value` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `data_size` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.data_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `data_size` | property | `@zos/ui.CYCLE_LIST -> Param.data_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `data_type` | symbol | `@zos/ui.data_type` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuidata_type) |
| `data_type` | symbol | `hmUI.data_type` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `data_type_config` | property | `@zos/ui.SCROLL_LIST -> Param.data_type_config` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `data_type_config_count` | property | `@zos/ui.SCROLL_LIST -> Param.data_type_config_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `DATASET` | property | `@zos/ui.setProperty -> PropertyId.DATASET` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `DataWidget` | symbol | `@zos/global.DataWidget` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `date` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ChangeEvent.date` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `date` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ProgressEvent.date` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `date` | symbol | `hmUI.date` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `DATE_FORMAT_DMY` | symbol | `@zos/settings.DATE_FORMAT_DMY` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_dmy) |
| `DATE_FORMAT_DMY` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_FORMAT_MDY` | symbol | `@zos/settings.DATE_FORMAT_MDY` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_mdy) |
| `DATE_FORMAT_MDY` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_FORMAT_YMD` | symbol | `@zos/settings.DATE_FORMAT_YMD` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsdate_format_ymd) |
| `DATE_FORMAT_YMD` | enum value | `@zos/settings.getDateFormat -> Date format constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetdateformat) |
| `DATE_POINTER` | symbol | `hmUI.widget.DATE_POINTER` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdate_pointer) |
| `day` | property | `@zos/ui.PICK_DATE -> getProperty supported Fields.day` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `day` | property | `hmSensor.id.TIME -> time.day` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `DAY` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.DAY` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `DAY` | enum value | `date.DAY` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `day_count` | property | `@zos/sensor.Time.getLunarMonthCalendar -> LunarMonthCalendar.day_count` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `debug` | member | `@zos/utils.log.debug()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `decrypt` | member | `@zos/crypto.AESCrypto.decrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `decrypt` | member | `@zos/crypto.ECDSACrypto.decrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `DEEP_STAGE` | property | `@zos/sensor.Sleep.getStageConstantObj -> StageConstants.DEEP_STAGE` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `deepMin` | property | `hmSensor.id.SLEEP -> BasicInfo.deepMin` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `deepTime` | property | `@zos/sensor.Sleep.getInfo -> SleepInfo.deepTime` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `default_frame_index` | property | `hmUI.widget.IMG_ANIM -> Param.default_frame_index` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `default_type` | property | `@zos/ui.SPORT_DATA -> Param.default_type` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `degrees` | property | `@zos/sensor.Geolocation.getLatitude -> DMS.degrees` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `degrees` | property | `@zos/sensor.Geolocation.getLongitude -> DMS.degrees` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `delay` | property | `@zos/alarm.set -> Option.delay` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `delay` | property | `@zos/router.setLaunchAppTimeout -> Option.delay` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `delay` | property | `timer.createTimer -> Parameters.delay` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `DELEGATE` | symbol | `hmUI.widget.DELEGATE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdelegate) |
| `deleteKeyboard` | symbol | `@zos/ui.deleteKeyboard` | device-app | not stated | [zos-ui](zos-ui.md#zosuideletekeyboard) |
| `deleteWidget` | symbol | `@zos/ui.deleteWidget` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuideletewidget) |
| `deleteWidget` | symbol | `hmUI.deleteWidget` | watchface | not stated | [hmUI](hmUI.md#hmuideletewidget) |
| `description` | property | `ui.Auth -> Props.description` | settings | not stated | [ui](ui.md#uiauth) |
| `description` | property | `ui.Section -> Props.description` | settings | not stated | [ui](ui.md#uisection) |
| `dev` | property | `@zos/ble.mstBuildProfile -> ProfileObj.dev` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `dev_addr` | property | `@zos/ble.mstConnect -> ConnectResult.dev_addr` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstconnect) |
| `dev_addr` | property | `@zos/ble.mstStartScan -> ScanResult.dev_addr` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `dev_name` | property | `@zos/ble.mstStartScan -> ScanResult.dev_name` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `device_name` | property | `@zos/ble.mstStartScan -> Filter.device_name` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `deviceColor` | property | `@zos/device.getDeviceInfo -> Result.deviceColor` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `deviceName` | property | `@zos/device.getDeviceInfo -> Result.deviceName` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `deviceName` | property | `hmSetting.getDeviceInfo -> deviceInfo.deviceName` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `deviceSource` | property | `@zos/device.getDeviceInfo -> Result.deviceSource` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `deviceSource` | property | `hmSetting.getDeviceInfo -> deviceInfo.deviceSource` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `DIALOG` | symbol | `@zos/ui.DIALOG` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `DIALOG` | enum value | `widget.DIALOG` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `dialog_align_h` | property | `@zos/ui.DIALOG -> Param.dialog_align_h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `dialog_align_v` | property | `@zos/ui.DIALOG -> Param.dialog_align_v` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `digest_type` | property | `@zos/crypto.ECDSACrypto.encrypt -> Options.digest_type` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `DigestCrypto` | symbol | `@zos/crypto.DigestCrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `DIPULSE_CROWN` | property | `@zos/sensor.Vibrator.getType -> Type.DIPULSE_CROWN` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `direction` | property | `@zos/sensor.Geolocation.getLatitude -> DMS.direction` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `direction` | property | `@zos/sensor.Geolocation.getLongitude -> DMS.direction` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `disabled` | property | `ui.TextInput -> Props.disabled` | settings | not stated | [ui](ui.md#uitextinput) |
| `disConnect` | symbol | `@zos/ble.disConnect` | device-app | >= 2 | [zos-ble](zos-ble.md#zosbledisconnect) |
| `disConnect` | symbol | `hmBle.disConnect` | watchface | not stated | [hmBle](hmBle.md#hmbledisconnect) |
| `display_on_restart` | property | `hmUI.widget.IMG_ANIM -> Param.display_on_restart` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
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
| `DND` | property | `@zos/settings.getSystemMode -> Result.DND` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `done_icon` | property | `@zos/ui.PICKER -> Param.done_icon` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `done_icon` | property | `@zos/ui.TIME_PICKER -> Param.done_icon` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `done_icon` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.done_icon` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `dot_image` | property | `hmUI.widget.TEXT_IMG -> Param.dot_image` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `downhill_count` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `downloadFile` | symbol | `download-file.downloadFile` | side-service | not stated | [download-file](download-file.md#download-filedownloadfile) |
| `dumpLayout` | symbol | `@zos/ui.dumpLayout` | device-app | not stated | [zos-ui](zos-ui.md#zosuidumplayout) |
| `duration` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `duration` | property | `@zos/ble.mstStartScan -> Timeout.duration` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `duration` | property | `@zos/display.getSettings -> ScreenObj.duration` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `duration` | property | `@zos/display.pauseDropWristScreenOff -> Option.duration` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausedropwristscreenoff) |
| `duration` | property | `@zos/display.pausePalmScreenOff -> Option.duration` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausepalmscreenoff) |
| `duration` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.duration` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `duration` | property | `@zos/sensor.Vibrator.start -> Action.duration` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `duration` | property | `@zos/sensor.Workout.getHistory -> History.duration` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `duration` | property | `ui.Toast -> Props.duration` | settings | not stated | [ui](ui.md#uitoast) |
| `DURATION_NET` | enum value | `sport_data.DURATION_NET` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `E` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `ECDSA` | enum value | `alg.ECDSA` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoalg) |
| `ECDSACrypto` | symbol | `@zos/crypto.ECDSACrypto` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `ecp_dp` | symbol | `@zos/crypto.ecp_dp` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `ecp_dp_mode` | property | `@zos/crypto.ECDSACrypto -> ECDSAOptions.ecp_dp_mode` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `edit_id` | property | `@zos/ui.SPORT_DATA -> Param.edit_id` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `edit_widget_group_type` | symbol | `@zos/ui.edit_widget_group_type` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuiedit_widget_group_type) |
| `elapsed_time` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.elapsed_time` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `element_height` | property | `@zos/ui.PAGE_INDICATOR -> Param.element_height` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `element_radius` | property | `@zos/ui.PAGE_INDICATOR -> Param.element_radius` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `elevation` | property | `@zos/sensor.Geolocation.onGnssChange -> Satellite.elevation` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `ELLIPSIS` | enum value | `text_style.ELLIPSIS` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `ELLIPSIS` | enum value | `text_style.ELLIPSIS` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `emit` | member | `@zos/utils.EventBus.emit()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `emitCustomSystemEvent` | symbol | `@zos/app.emitCustomSystemEvent` | device-app | >= 3 | [zos-app](zos-app.md#zosappemitcustomsystemevent) |
| `EMOJI` | enum value | `inputType.EMOJI` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `enable_scroll_bar` | property | `@zos/ui.SCROLL_LIST -> Param.enable_scroll_bar` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `encoding` | property | `@zos/fs.readFileSync -> Options.encoding` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadfilesync) |
| `encoding` | property | `@zos/fs.writeFileSync -> Options.encoding` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `encrypt` | member | `@zos/crypto.AESCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `encrypt` | member | `@zos/crypto.CRCCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptocrccrypto) |
| `encrypt` | member | `@zos/crypto.DigestCrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `encrypt` | member | `@zos/crypto.ECDSACrypto.encrypt()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `encryptKey` | symbol | `@zos/crypto.encryptKey` | device-app | >= 3 | [zos-crypto](zos-crypto.md#zoscryptoencryptkey) |
| `end` | property | `@zos/ui.HISTOGRAM -> XLine.end` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `end` | property | `@zos/ui.HISTOGRAM -> YLine.end` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `end` | property | `@zos/ui.SCROLL_LIST -> DataTypeConfig.end` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `end_angle` | property | `@zos/ui.ARC -> Param.end_angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `end_angle` | property | `@zos/ui.CANVAS -> Param.end_angle` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `end_angle` | property | `@zos/ui.TEXT -> Param.end_angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `end_angle` | property | `hmUI.widget.ARC -> Param.end_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `end_angle` | property | `hmUI.widget.ARC_PROGRESS -> Param.end_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `end_angle` | property | `hmUI.widget.IMG_POINTER -> Param.end_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `end_time` | property | `@zos/alarm.set -> Option.end_time` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `endTime` | property | `@zos/display.getSettings -> WristObj.endTime` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `endTime` | property | `@zos/display.getSettings -> StandbyObj.endTime` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `endTime` | property | `@zos/sensor.Sleep.getInfo -> SleepInfo.endTime` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `endTime` | property | `hmSensor.id.SLEEP -> BasicInfo.endTime` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `endYear` | property | `@zos/ui.PICK_DATE -> Param.endYear` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `endYear` | property | `@zos/ui.TIME_PICKER -> Param.endYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `endYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.endYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `enqueueFile` | property | `@zos/ble/TransferFile.TransferFile.getOutbox -> Outbox.enqueueFile` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `ENTER` | enum value | `keyboard.ENTER` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `error` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `error` | member | `@zos/utils.log.error()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `evalTime` | property | `@zos/app.getPerformance -> PerfModule.evalTime` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `event` | property | `@zos/ui.addEventListener -> Parameters.event` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiaddeventlistener) |
| `event` | symbol | `@zos/ui.event` | device-app | not stated | [zos-ui](zos-ui.md#zosuievent) |
| `event_type` | property | `@zos/ui.PICKER -> CallBack.event_type` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `event_type` | property | `@zos/ui.TIME_PICKER -> CallBack.event_type` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `EventBus` | symbol | `@zos/utils.EventBus` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `eventId` | property | `@zos/ui.addEventListener -> Parameters.eventId` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiaddeventlistener) |
| `eventId` | property | `@zos/ui.removeEventListener -> Parameters.eventId` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiremoveeventlistener) |
| `eventName` | property | `@zos/app.emitCustomSystemEvent -> Option.eventName` | device-app | >= 3 | [zos-app](zos-app.md#zosappemitcustomsystemevent) |
| `eventParam` | property | `@zos/app.emitCustomSystemEvent -> Option.eventParam` | device-app | >= 3 | [zos-app](zos-app.md#zosappemitcustomsystemevent) |
| `exit` | symbol | `@zos/app-service.exit` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-serviceexit) |
| `exit` | symbol | `@zos/router.exit` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterexit) |
| `FAILURE` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `FAT_BURNING` | enum value | `data_type.FAT_BURNING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FAT_BURNING_TARGET` | enum value | `data_type.FAT_BURNING_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `FAT_BURRING` | symbol | `hmSensor.id.FAT_BURRING` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridfat_burring) |
| `FatBurning` | symbol | `@zos/sensor.FatBurning` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorfatburning) |
| `fd` | property | `@zos/fs.closeSync -> Option.fd` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsclosesync) |
| `fd` | property | `@zos/fs.readSync -> Option.fd` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `fd` | property | `@zos/fs.writeSync -> Option.fd` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `fetch` | symbol | `fetch.fetch` | side-service | not stated | [fetch](fetch.md#fetchfetch) |
| `file` | property | `@zos/app.getPerformance -> MemoryModule.file` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `file` | property | `@zos/app.getPerformance -> PerfModule.file` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `file` | property | `@zos/app-service.start -> Option.file` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `file` | property | `@zos/app-service.start -> CallbackOption.file` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `file` | property | `@zos/app-service.stop -> Option.file` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestop) |
| `file` | property | `@zos/app-service.stop -> CallbackOption.file` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestop) |
| `file` | property | `@zos/notification.notify -> Action.file` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `FILE` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> InboxEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `FILE` | property | `@zos/media.Player -> source.FILE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `fileId` | property | `hmFS.read -> Parameters.fileId` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `fileId` | property | `hmFS.seek -> Parameters.fileId` | watchface | not stated | [hmFS](hmFS.md#hmfsseek) |
| `fileId` | property | `hmFS.write -> Parameters.fileId` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `fileName` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.fileName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `filePath` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.filePath` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `fileSize` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.fileSize` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `fileSize` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ProgressEventData.fileSize` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `FileSystem` | symbol | `@zos/share-storage.FileSystem` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `fill_height` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.fill_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `fill_height` | property | `@zos/ui.RADIO_GROUP -> StateButton.fill_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `FILL_RECT` | symbol | `@zos/ui.FILL_RECT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `FILL_RECT` | enum value | `widget.FILL_RECT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `FILL_RECT` | symbol | `hmUI.widget.FILL_RECT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `fill_width` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.fill_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `fill_width` | property | `@zos/ui.RADIO_GROUP -> StateButton.fill_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `finish` | member | `@zos/crypto.DigestCrypto.finish()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `firmwareVersion` | property | `@zos/settings.getSystemInfo -> Result.firmwareVersion` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgetsysteminfo) |
| `flag` | property | `@zos/fs.openAssetsSync -> Option.flag` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `flag` | property | `@zos/fs.openSync -> Option.flag` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `flag` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.flag` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `FLOOR` | enum value | `data_type.FLOOR` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `focus` | property | `@zos/ui.SCROLL_LIST -> ItemFocusChangeFunc.focus` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `font` | property | `@zos/ui.BUTTON -> Param.font` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `font` | property | `@zos/ui.TEXT -> Param.font` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `font_array` | property | `hmUI.widget.TEXT_IMG -> Param.font_array` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `font_name` | property | `@zos/ui.PICKER -> DataConfig.font_name` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `font_size` | property | `@zos/ui.PICK_DATE -> Param.font_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `font_size` | property | `@zos/ui.PICKER -> DataConfig.font_size` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `font_size` | property | `@zos/ui.TIME_PICKER -> Param.font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `font_size` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `forecastData` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastWeather.forecastData` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `forecastData` | property | `hmSensor.id.WEATHER -> ForecastWeather.forecastData` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `format` | property | `@zos/sensor.Geolocation.getLatitude -> Option.format` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `format` | property | `@zos/sensor.Geolocation.getLongitude -> Option.format` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `free` | property | `@zos/device.getDiskInfo -> Result.free` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `free` | property | `hmSetting.getDiskInfo -> diskInfo.free` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
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
| `fullRecoveryTime` | property | `@zos/sensor.Workout.getStatus -> Status.fullRecoveryTime` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `fuzzy_mode` | property | `@zos/ble.mstStartScan -> Filter.fuzzy_mode` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `gender` | property | `@zos/user.getProfile -> Result.gender` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `gender` | property | `hmSetting.getUserData -> userData.gender` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `GENDER_FEMALE` | symbol | `@zos/user.GENDER_FEMALE` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_female) |
| `GENDER_FEMALE` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `GENDER_MALE` | symbol | `@zos/user.GENDER_MALE` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_male) |
| `GENDER_MALE` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `GENDER_UNSPECIFIED` | symbol | `@zos/user.GENDER_UNSPECIFIED` | device-app | >= 2 | [zos-user](zos-user.md#zosusergender_unspecified) |
| `GENDER_UNSPECIFIED` | enum value | `@zos/user.getProfile -> User gender constants` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `GENTLE_SHORT` | property | `@zos/sensor.Vibrator.getType -> Type.GENTLE_SHORT` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
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
| `getNextFile` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> Inbox.getNextFile` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
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
| `globalData` | property | `@zos/global.App -> Option.globalData` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalapp) |
| `globalData` | property | `@zos/global.getApp -> Options.globalData` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalgetapp) |
| `gnss_id` | property | `@zos/sensor.Geolocation.onGnssChange -> SatelliteSystem.gnss_id` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `GRADIENT_POLYLINE` | symbol | `@zos/ui.GRADIENT_POLYLINE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `GRADKIENT_POLYLINE` | enum value | `widget.GRADKIENT_POLYLINE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `GRADKIENT_POLYLINE` | symbol | `hmUI.widget.GRADKIENT_POLYLINE` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetgradkient_polyline) |
| `GROUP` | symbol | `@zos/ui.GROUP` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `GROUP` | enum value | `widget.GROUP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `gsv_data` | property | `@zos/sensor.Geolocation.onGnssChange -> SatelliteSystem.gsv_data` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `Gyroscope` | symbol | `@zos/sensor.Gyroscope` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `h` | property | `@zos/ui.ARC -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `h` | property | `@zos/ui.BUTTON -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `h` | property | `@zos/ui.CANVAS -> Param.h` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `h` | property | `@zos/ui.CANVAS -> Param.h` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `h` | property | `@zos/ui.CANVAS -> Param.h` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `h` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `h` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `h` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `h` | property | `@zos/ui.CYCLE_LIST -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `h` | property | `@zos/ui.FILL_RECT -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `h` | property | `@zos/ui.getAppWidgetSize -> result.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetappwidgetsize) |
| `h` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `h` | property | `@zos/ui.GROUP -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `h` | property | `@zos/ui.HISTOGRAM -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `h` | property | `@zos/ui.HISTOGRAM -> XText.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `h` | property | `@zos/ui.HISTOGRAM -> yText.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `h` | property | `@zos/ui.IMG -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `h` | property | `@zos/ui.PAGE_INDICATOR -> Param.h` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `h` | property | `@zos/ui.QRCODE -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `h` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `h` | property | `@zos/ui.RADIO_GROUP -> StateButton.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `h` | property | `@zos/ui.SCROLL_LIST -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `h` | property | `@zos/ui.SCROLL_LIST -> TextView.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `h` | property | `@zos/ui.SCROLL_LIST -> ImageView.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `h` | property | `@zos/ui.setAppWidgetSize -> Option.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetappwidgetsize) |
| `h` | property | `@zos/ui.setProperty -> PropertyId.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `h` | property | `@zos/ui.SLIDE_SWITCH -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `h` | property | `@zos/ui.SPORT_DATA -> Param.h` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `h` | property | `@zos/ui.STROKE_RECT -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `h` | property | `@zos/ui.TEXT -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `h` | property | `@zos/ui.VIEW_CONTAINER -> Param.h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `h` | property | `hmUI.setProperty -> PropertyId.h` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `h` | property | `hmUI.widget.ARC -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `h` | property | `hmUI.widget.BUTTON -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `h` | property | `hmUI.widget.FILL_RECT -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `h` | property | `hmUI.widget.IMG -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `h` | property | `hmUI.widget.IMG_LEVEL -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `h` | property | `hmUI.widget.STROKE_RECT -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `h` | property | `hmUI.widget.TEXT -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `h` | property | `hmUI.widget.TEXT_IMG -> Param.h` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `h_space` | property | `@zos/ui.PAGE_INDICATOR -> Param.h_space` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `h_space` | property | `hmUI.widget.TEXT_IMG -> Param.h_space` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `has` | member | `@zos/storage.ShareTypedStorage.has()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `has` | member | `@zos/storage.TypedStorage.has()` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `HEART` | symbol | `hmSensor.id.HEART` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridheart) |
| `HEART` | enum value | `data_type.HEART` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `HeartRate` | symbol | `@zos/sensor.HeartRate` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `height` | property | `@zos/device.getDeviceInfo -> Result.height` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `height` | property | `@zos/page.setScrollMode -> Options.height` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `height` | property | `@zos/ui.getImageInfo -> result.height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetimageinfo) |
| `height` | property | `@zos/ui.getTextLayout -> result.height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `height` | property | `@zos/user.getProfile -> Result.height` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `height` | property | `hmSetting.getDeviceInfo -> deviceInfo.height` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `height` | property | `hmSetting.getUserData -> userData.height` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `height` | property | `ui.Image -> Props.height` | settings | not stated | [ui](ui.md#uiimage) |
| `high` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastDataItem.high` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `high` | property | `hmSensor.id.WEATHER -> ForecastDataItem.high` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `HISTOGRAM` | symbol | `@zos/ui.HISTOGRAM` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `HISTOGRAM` | enum value | `widget.HISTOGRAM` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `home` | symbol | `@zos/router.home` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterhome) |
| `horizontal` | property | `@zos/ui.PAGE_INDICATOR -> Param.horizontal` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `horizontal` | property | `ui.Toast -> Props.horizontal` | settings | not stated | [ui](ui.md#uitoast) |
| `hour` | property | `@zos/sensor.Weather.getForecastWeather -> Sunrise.hour` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `hour` | property | `@zos/sensor.Weather.getForecastWeather -> Sunset.hour` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `hour` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.hour` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `hour` | property | `@zos/ui.PICK_DATE -> getProperty supported Fields.hour` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `hour` | property | `hmSensor.id.TIME -> time.hour` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `hour` | property | `hmSensor.id.WEATHER -> Sunrise.hour` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `hour` | property | `hmSensor.id.WEATHER -> Sunset.hour` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `hour` | property | `hmSensor.id.WORLD_CLOCK -> wordInfo.hour` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `HOUR` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.HOUR` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `hourAvgofDay` | property | `hmSensor.id.SPO2 -> spo2.hourAvgofDay` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `HR` | enum value | `sport_data.HR` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `hr_value` | property | `@zos/sensor.HeartRate.getDailySummary -> Maximum.hr_value` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `HUMIDITY` | enum value | `data_type.HUMIDITY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `icon` | property | `ui.TextImageRow -> Props.icon` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `iconColor` | property | `ui.TextImageRow -> Props.iconColor` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `iconRight` | property | `ui.TextImageRow -> Props.iconRight` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `id` | property | `@zos/alarm.cancel -> Option.id` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmcancel) |
| `id` | property | `@zos/ble.mstBuildProfile -> ProfileObj.id` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `id` | property | `@zos/sensor.Geolocation.onGnssChange -> Satellite.id` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `id` | property | `@zos/ui.KEYBOARD -> KeyAttr.id` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `id` | property | `@zos/ui.KEYBOARD -> Param.id` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `id` | symbol | `hmSensor.id` | watchface | not stated | [hmSensor](hmSensor.md#hmsensorid) |
| `IDLE` | property | `@zos/media.Player -> state.IDLE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `IDLE` | property | `@zos/media.Recorder -> state.IDLE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `image` | property | `@zos/ui.CANVAS -> Param.image` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `image` | property | `@zos/ui.KEYBOARD -> KeyAttr.image` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `Image` | symbol | `ui.Image` | settings | not stated | [ui](ui.md#uiimage) |
| `image_array` | property | `hmUI.widget.IMG_LEVEL -> Param.image_array` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `image_array` | property | `hmUI.widget.IMG_PROGRESS -> Param.image_array` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `image_length` | property | `hmUI.widget.IMG_LEVEL -> Param.image_length` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `image_length` | property | `hmUI.widget.IMG_PROGRESS -> Param.image_length` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `image_view` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.image_view` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `image_view_count` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.image_view_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
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
| `img_path` | property | `@zos/ui.getImageInfo -> Parameters.img_path` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetimageinfo) |
| `IMG_POINTER` | symbol | `hmUI.widget.IMG_POINTER` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `IMG_PROGRESS` | symbol | `hmUI.widget.IMG_PROGRESS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `IMG_STATUS` | symbol | `hmUI.widget.IMG_STATUS` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_status) |
| `IMG_TIME` | symbol | `hmUI.widget.IMG_TIME` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_time) |
| `IMG_WEEK` | symbol | `hmUI.widget.IMG_WEEK` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_week) |
| `imperial_unit_en` | property | `hmUI.widget.TEXT_IMG -> Param.imperial_unit_en` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `imperial_unit_sc` | property | `hmUI.widget.TEXT_IMG -> Param.imperial_unit_sc` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `imperial_unit_tc` | property | `hmUI.widget.TEXT_IMG -> Param.imperial_unit_tc` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `index` | property | `@zos/page.swipeToIndex -> Option.index` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `index` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastDataItem.index` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `index` | property | `@zos/ui.addLayoutChild -> Parameters.index` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiaddlayoutchild) |
| `index` | property | `@zos/ui.CHECKBOX_GROUP -> CheckFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `index` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> ItemClickFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `index` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> ItemFocusChangeFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `index` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Set the properties of a single item text.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `index` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Set the top item index of the list.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `index` | property | `@zos/ui.CYCLE_LIST -> ItemClickFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `index` | property | `@zos/ui.CYCLE_LIST -> ItemFocusChangeFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `index` | property | `@zos/ui.RADIO_GROUP -> CheckFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `index` | property | `@zos/ui.SCROLL_LIST -> ItemClickFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `index` | property | `@zos/ui.SCROLL_LIST -> ItemFocusChangeFunc.index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `index` | property | `hmBle.createConnect -> Parameters.index` | watchface | not stated | [hmBle](hmBle.md#hmblecreateconnect) |
| `index` | property | `hmSensor.id.WEATHER -> ForecastDataItem.index` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `info` | member | `@zos/utils.log.info()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `INIT` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.INIT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `INIT` | enum value | `prop.INIT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `INIT` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.INIT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `init_col_index` | property | `@zos/ui.PICKER -> Param.init_col_index` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `init_val_index` | property | `@zos/ui.PICKER -> DataConfig.init_val_index` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `initDay` | property | `@zos/ui.PICK_DATE -> Param.initDay` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `initDay` | property | `@zos/ui.TIME_PICKER -> Param.initDay` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initDay` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initDay` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initHour` | property | `@zos/ui.PICK_DATE -> Param.initHour` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `initHour` | property | `@zos/ui.TIME_PICKER -> Param.initHour` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initHour` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initHour` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `INITIALIZED` | property | `@zos/media.Player -> state.INITIALIZED` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `initMin` | property | `@zos/ui.PICK_DATE -> Param.initMin` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `initMin` | property | `@zos/ui.TIME_PICKER -> Param.initMin` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initMin` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initMin` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initMonth` | property | `@zos/ui.PICK_DATE -> Param.initMonth` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `initMonth` | property | `@zos/ui.TIME_PICKER -> Param.initMonth` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initMonth` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initMonth` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initTime` | property | `@zos/app.getPerformance -> PerfModule.initTime` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `initYear` | property | `@zos/ui.PICK_DATE -> Param.initYear` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `initYear` | property | `@zos/ui.TIME_PICKER -> Param.initYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `initYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `inputType` | symbol | `@zos/ui.inputType` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `inputType` | property | `@zos/ui.keyboard -> Parameters.inputType` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `inputType` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.inputType` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `invalid_visible` | property | `hmUI.widget.IMG_POINTER -> Param.invalid_visible` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `is_dualband` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.is_dualband` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `isEnabled` | member | `@zos/sensor.Buzzer.isEnabled()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `isExisted` | member | `@zos/share-storage.LocalStorage.isExisted()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagelocalstorage) |
| `isFocus` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> ItemFocusChangeFunc.isFocus` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `isFocus` | property | `@zos/ui.CYCLE_LIST -> ItemFocusChangeFunc.isFocus` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `isPlaying` | property | `hmSensor.id.MUSIC -> music.isPlaying` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridmusic) |
| `isYaw` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.isYaw` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `italic` | property | `ui.Text -> Props.italic` | settings | not stated | [ui](ui.md#uitext) |
| `item_alpha` | property | `@zos/ui.HISTOGRAM -> Param.item_alpha` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_bg_color` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_bg_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_bg_color` | property | `@zos/ui.CYCLE_LIST -> Param.item_bg_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `item_bg_color` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.item_bg_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_bg_radius` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.item_bg_radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_click_func` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_click_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_click_func` | property | `@zos/ui.CYCLE_LIST -> Param.item_click_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `item_click_func` | property | `@zos/ui.SCROLL_LIST -> Param.item_click_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_color` | property | `@zos/ui.HISTOGRAM -> Param.item_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_common_focus` | property | `@zos/ui.SCROLL_LIST -> Param.item_common_focus` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_config` | property | `@zos/ui.SCROLL_LIST -> Param.item_config` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_config_count` | property | `@zos/ui.SCROLL_LIST -> Param.item_config_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_drag_max_distance` | property | `@zos/ui.SCROLL_LIST -> Param.item_drag_max_distance` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_enable_horizon_drag` | property | `@zos/ui.SCROLL_LIST -> Param.item_enable_horizon_drag` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_focus_change_func` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_focus_change_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_focus_change_func` | property | `@zos/ui.CYCLE_LIST -> Param.item_focus_change_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `item_focus_change_func` | property | `@zos/ui.SCROLL_LIST -> Param.item_focus_change_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_height` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_height` | property | `@zos/ui.CYCLE_LIST -> Param.item_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `item_height` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.item_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_image_x` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_image_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_image_x` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_image_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_image_y` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_image_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_image_y` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_image_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_key_focus_change_func` | property | `@zos/ui.SCROLL_LIST -> Param.item_key_focus_change_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_max_height` | property | `@zos/ui.HISTOGRAM -> Param.item_max_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_radius` | property | `@zos/ui.HISTOGRAM -> Param.item_radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_space` | property | `@zos/ui.HISTOGRAM -> Param.item_space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_space` | property | `@zos/ui.SCROLL_LIST -> Param.item_space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `item_start_y` | property | `@zos/ui.HISTOGRAM -> Param.item_start_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `item_text_align_h` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_align_h` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_align_v` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_align_v` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_color` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_color` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Set the properties of a single item text.item_text_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_height` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_size` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_size` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Set the properties of a single item text.item_text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_width` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_x` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_text_y` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.item_text_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `item_width` | property | `@zos/ui.HISTOGRAM -> Param.item_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `JSKB` | enum value | `inputType.JSKB` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `key` | property | `@zos/ui.getProperty -> Parameters.key` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetproperty) |
| `key` | property | `@zos/ui.SCROLL_LIST -> TextView.key` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `key` | property | `@zos/ui.SCROLL_LIST -> ImageView.key` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `key` | property | `hmFS.SysProSetBool -> Parameters.key` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetbool) |
| `key` | property | `hmFS.SysProSetChars -> Parameters.key` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetchars) |
| `key` | property | `hmFS.SysProSetDouble -> Parameters.key` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetdouble) |
| `key` | property | `hmFS.SysProSetInt -> Parameters.key` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint) |
| `key` | property | `hmFS.SysProSetInt64 -> Parameters.key` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint64) |
| `key` | property | `hmUI.getProperty -> Parameters.key` | watchface | not stated | [hmUI](hmUI.md#hmuigetproperty) |
| `key_attr` | property | `@zos/ui.KEYBOARD -> Param.key_attr` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `KEY_BACK` | symbol | `@zos/interaction.KEY_BACK` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_back) |
| `KEY_BACK` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_BACK` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `key_bit_length` | property | `@zos/crypto.AESCrypto -> AESOptions.key_bit_length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `KEY_DOWN` | symbol | `@zos/interaction.KEY_DOWN` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionkey_down) |
| `KEY_DOWN` | enum value | `@zos/interaction.onDigitalCrown -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `KEY_DOWN` | enum value | `@zos/interaction.onKey -> Key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `key_encrypt` | property | `@zos/crypto.AESCrypto -> AESOptions.key_encrypt` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `key_encrypt` | property | `@zos/crypto.DigestCrypto -> DigestOptions.key_encrypt` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `key_encrypt` | property | `@zos/crypto.DigestCrypto -> HMACOptions.key_encrypt` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `key_encrypt` | property | `@zos/crypto.ECDSACrypto -> ECDSAOptions.key_encrypt` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
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
| `KEYCODE_CLICK` | property | `@zos/sensor.Vibrator.getType -> Type.KEYCODE_CLICK` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `keyNumber` | property | `@zos/device.getDeviceInfo -> Result.keyNumber` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `keyNumber` | property | `hmSetting.getDeviceInfo -> deviceInfo.keyNumber` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `keyType` | property | `@zos/device.getDeviceInfo -> Result.keyType` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `keyType` | property | `@zos/ui.keyboard -> Parameters.keyType` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `label` | property | `ui.Auth -> Props.label` | settings | not stated | [ui](ui.md#uiauth) |
| `label` | property | `ui.Button -> Props.label` | settings | not stated | [ui](ui.md#uibutton) |
| `label` | property | `ui.Select -> Props.label` | settings | not stated | [ui](ui.md#uiselect) |
| `label` | property | `ui.Slider -> Props.label` | settings | not stated | [ui](ui.md#uislider) |
| `label` | property | `ui.TextImageRow -> Props.label` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `label` | property | `ui.TextInput -> Props.label` | settings | not stated | [ui](ui.md#uitextinput) |
| `label` | property | `ui.Toggle -> Props.label` | settings | not stated | [ui](ui.md#uitoggle) |
| `labelStyle` | property | `ui.TextInput -> Props.labelStyle` | settings | not stated | [ui](ui.md#uitextinput) |
| `last` | property | `hmSensor.id.HEART -> heart.last` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridheart) |
| `launchApp` | symbol | `@zos/router.launchApp` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `layout` | property | `@zos/ui.VIRTUAL_CONTAINER -> Param.layout` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuivirtual_container) |
| `leaking` | property | `@zos/app.getPerformance -> Memory.leaking` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `LEFT` | enum value | `align.LEFT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `LEFT` | enum value | `align.LEFT` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `len` | property | `@zos/ble.mstBuildProfile -> ProfileObj.len` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `len` | property | `@zos/ble.mstBuildProfile -> ServicesObj.len` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `len` | property | `@zos/ble.mstBuildProfile -> CharacteristicObj.len` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `len` | property | `hmFS.read -> Parameters.len` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `len` | property | `hmFS.write -> Parameters.len` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `len1` | property | `@zos/ble.mstBuildProfile -> ServiceObj.len1` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `length` | property | `@zos/crypto.AESCrypto.encrypt -> AESCipherResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `length` | property | `@zos/crypto.AESCrypto.decrypt -> AESCipherResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `length` | property | `@zos/crypto.CRCCrypto.encrypt -> CRCResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptocrccrypto) |
| `length` | property | `@zos/crypto.DigestCrypto.encrypt -> DigestResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `length` | property | `@zos/crypto.DigestCrypto.finish -> DigestResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `length` | property | `@zos/crypto.ECDSACrypto.encrypt -> ECDSACipherResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `length` | property | `@zos/crypto.ECDSACrypto.decrypt -> ECDSACipherResult.length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `length` | property | `@zos/fs.readSync -> Options.length` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `length` | property | `@zos/fs.writeSync -> Options.length` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `length` | property | `@zos/sensor.Sleep.getNap -> NapInfo.length` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `length` | symbol | `settings-storage.length` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagelength) |
| `level` | property | `hmUI.widget.ARC_PROGRESS -> Param.level` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `level` | property | `hmUI.widget.IMG_LEVEL -> Param.level` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `level` | property | `hmUI.widget.IMG_PROGRESS -> Param.level` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `LIGHT_STAGE` | property | `@zos/sensor.Sleep.getStageConstantObj -> StageConstants.LIGHT_STAGE` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `line_color` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.line_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `line_color` | property | `@zos/ui.openInspector -> options Object Properties.line_color` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiopeninspector) |
| `line_color` | property | `@zos/ui.SPORT_DATA -> Param.line_color` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `line_space` | property | `@zos/ui.TEXT -> Param.line_space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `line_space` | property | `hmUI.widget.TEXT -> Param.line_space` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `line_width` | property | `@zos/ui.ARC -> Param.line_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `line_width` | property | `@zos/ui.CANVAS -> Param.line_width` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `line_width` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.line_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `line_width` | property | `@zos/ui.openInspector -> options Object Properties.line_width` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiopeninspector) |
| `line_width` | property | `@zos/ui.STROKE_RECT -> Param.line_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `line_width` | property | `hmUI.widget.ARC -> Param.line_width` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `line_width` | property | `hmUI.widget.ARC_PROGRESS -> Param.line_width` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `line_width` | property | `hmUI.widget.STROKE_RECT -> Param.line_width` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `Link` | symbol | `ui.Link` | settings | not stated | [ui](ui.md#uilink) |
| `list` | property | `@zos/ble.mstBuildProfile -> ProfileObj.list` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `list` | property | `@zos/ble.mstBuildProfile -> ServicesObj.list` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `list` | property | `@zos/ble.mstBuildProfile -> ServiceObj.list` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `list` | property | `@zos/ble.mstBuildProfile -> CharacteristicObj.list` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `list` | property | `@zos/ui.SCROLL_LIST -> ItemClickFunc.list` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `list` | property | `@zos/ui.SCROLL_LIST -> ItemFocusChangeFunc.list` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `LIST_TOP` | enum value | `prop.LIST_TOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `loadedSize` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ProgressEventData.loadedSize` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `localStorage` | symbol | `@zos/storage.localStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `LocalStorage` | symbol | `@zos/share-storage.LocalStorage` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagelocalstorage) |
| `LocalStorage` | symbol | `@zos/storage.LocalStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragelocalstorage) |
| `localStorage-instance` | symbol | `@zos/storage.localStorage-instance` | device-app | >= 2 | [zos-storage](zos-storage.md#zosstoragelocalstorage-instance) |
| `lock` | property | `@zos/page.setScrollLock -> Option.lock` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrolllock) |
| `LOCK` | enum value | `system_status.LOCK` | watchface | not stated | [hmUI](hmUI.md#hmuisystem_status) |
| `log` | member | `@zos/global.console.log()` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalconsole) |
| `log` | symbol | `@zos/utils.log` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `log` | member | `@zos/utils.log.log()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `log` | symbol | `global.console.log` | settings, side-service | not stated | [global](global.md#globalconsolelog) |
| `longpress_func` | property | `@zos/ui.BUTTON -> Param.longpress_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `low` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastDataItem.low` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `low` | property | `hmSensor.id.WEATHER -> ForecastDataItem.low` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `lowTemperature` | property | `@zos/settings.getSystemMode -> Result.lowTemperature` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `lunar_day` | property | `hmSensor.id.TIME -> time.lunar_day` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `lunar_days_array` | property | `@zos/sensor.Time.getLunarMonthCalendar -> LunarMonthCalendar.lunar_days_array` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `lunar_festival` | property | `hmSensor.id.TIME -> time.lunar_festival` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `lunar_month` | property | `hmSensor.id.TIME -> time.lunar_month` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `lunar_solar_term` | property | `hmSensor.id.TIME -> time.lunar_solar_term` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `lunar_year` | property | `hmSensor.id.TIME -> time.lunar_year` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `manufacturer_id` | property | `@zos/ble.mstStartScan -> Filter.manufacturer_id` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `margin` | property | `@zos/ui.getAppWidgetSize -> result.margin` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetappwidgetsize) |
| `max` | property | `ui.Slider -> Props.max` | settings | not stated | [ui](ui.md#uislider) |
| `maximum` | property | `@zos/sensor.HeartRate.getDailySummary -> Result.maximum` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `maxValue` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.maxValue` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `md_content` | property | `@zos/crypto.DigestCrypto.encrypt -> DigestResult.md_content` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `md_content` | property | `@zos/crypto.DigestCrypto.finish -> DigestResult.md_content` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `memory` | property | `@zos/app.getPerformance -> Result.memory` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `message` | property | `ui.Toast -> Props.message` | settings | not stated | [ui](ui.md#uitoast) |
| `MESSAGE` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.MESSAGE` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `messagingPlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/side.messagingPlugin` | side-service | not stated | [zeppos-zml-2.0-module-messaging-plugin-side](zeppos-zml-2.0-module-messaging-plugin-side.md#zepposzml20modulemessagingpluginsidemessagingplugin) |
| `min` | property | `ui.Slider -> Props.min` | settings | not stated | [ui](ui.md#uislider) |
| `minAPI` | property | `@zos/settings.getSystemInfo -> Result.minAPI` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgetsysteminfo) |
| `minute` | property | `@zos/sensor.Weather.getForecastWeather -> Sunrise.minute` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `minute` | property | `@zos/sensor.Weather.getForecastWeather -> Sunset.minute` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `minute` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.minute` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `minute` | property | `@zos/ui.PICK_DATE -> getProperty supported Fields.minute` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `minute` | property | `hmSensor.id.TIME -> time.minute` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `minute` | property | `hmSensor.id.WEATHER -> Sunrise.minute` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `minute` | property | `hmSensor.id.WEATHER -> Sunset.minute` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `minute` | property | `hmSensor.id.WORLD_CLOCK -> wordInfo.minute` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `MINUTE` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.MINUTE` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `minutes` | property | `@zos/sensor.Geolocation.getLatitude -> DMS.minutes` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `minutes` | property | `@zos/sensor.Geolocation.getLongitude -> DMS.minutes` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `minValue` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.minValue` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `mkdirSync` | symbol | `@zos/fs.mkdirSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsmkdirsync) |
| `mock_data` | property | `@zos/ui.SPORT_DATA -> Param.mock_data` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `modal` | property | `@zos/ui.VIEW_CONTAINER -> Param.modal` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `MODAL_CANCEL` | enum value | `@zos/interaction.createModal -> Modal key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `MODAL_CANCEL` | symbol | `@zos/interaction.MODAL_CANCEL` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionmodal_cancel) |
| `MODAL_CONFIRM` | enum value | `@zos/interaction.createModal -> Modal key name constants` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `MODAL_CONFIRM` | symbol | `@zos/interaction.MODAL_CONFIRM` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionmodal_confirm) |
| `mode` | property | `@zos/page.setScrollMode -> Option.mode` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `mode` | property | `@zos/sensor.Geolocation.getSetting -> Result.mode` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `mode` | property | `@zos/sensor.Vibrator.start -> Option.mode` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `mode` | property | `@zos/sensor.Vibrator.setMode -> Option.mode` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `mode` | property | `@zos/sensor.Vibrator.getConfig -> Option.mode` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `mode` | property | `@zos/ui.TEXT -> Param.mode` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `model` | property | `@zos/display.getSettings -> WristObj.model` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `model` | property | `@zos/display.getSettings -> StandbyObj.model` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `model` | property | `@zos/sensor.Sleep.getStage -> StageInfo.model` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `model` | property | `hmSensor.id.SLEEP -> SleepInfo.model` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `modeParams` | property | `@zos/page.setScrollMode -> Options.modeParams` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `modules` | property | `@zos/app.getPerformance -> AppMemory.modules` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `modules` | property | `@zos/app.getPerformance -> LeakingMemory.modules` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `modules` | property | `@zos/app.getPerformance -> Perf.modules` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `month` | property | `@zos/ui.PICK_DATE -> getProperty supported Fields.month` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `month` | property | `hmSensor.id.TIME -> time.month` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `MONTH` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.MONTH` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `MONTH` | enum value | `date.MONTH` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `MONTH_RUN_DISTANCE` | enum value | `data_type.MONTH_RUN_DISTANCE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MONTH_RUN_TIMES` | enum value | `data_type.MONTH_RUN_TIMES` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MOON` | enum value | `data_type.MOON` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `MORE` | enum value | `prop.MORE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `motion` | property | `@zos/interaction.onWristMotion -> Params.motion` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
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
| `mtime` | property | `hmFS.stat -> stat.mtime` | watchface | not stated | [hmFS](hmFS.md#hmfsstat) |
| `mtime` | property | `hmFS.stat_asset -> stat.mtime` | watchface | not stated | [hmFS](hmFS.md#hmfsstat_asset) |
| `multiline` | property | `ui.TextInput -> Props.multiline` | settings | not stated | [ui](ui.md#uitextinput) |
| `multiple` | property | `ui.Select -> Props.multiple` | settings | not stated | [ui](ui.md#uiselect) |
| `music` | property | `@zos/device.getDiskInfo -> Result.music` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `music` | property | `hmSetting.getDiskInfo -> diskInfo.music` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
| `MUSIC` | symbol | `hmSensor.id.MUSIC` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridmusic) |
| `N` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `name` | property | `ui.Select -> SelectOption.name` | settings | not stated | [ui](ui.md#uiselect) |
| `native` | property | `@zos/router.launchApp -> Option.native` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `nb_of_columns` | property | `@zos/ui.PICKER -> Param.nb_of_columns` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `nb_used_satellite` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.nb_used_satellite` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `nb_valid_satellite` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.nb_valid_satellite` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `nb_valid_satellite` | property | `@zos/sensor.Geolocation.onGnssChange -> SatelliteSystem.nb_valid_satellite` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `NE` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `negative_image` | property | `hmUI.widget.TEXT_IMG -> Param.negative_image` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `NEWFILE` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> InboxEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `newPath` | property | `@zos/fs.renameSync -> Option.newPath` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrenamesync) |
| `newPath` | property | `hmFS.rename -> Parameters.newPath` | watchface | not stated | [hmFS](hmFS.md#hmfsrename) |
| `nickName` | property | `@zos/user.getProfile -> Result.nickName` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `nickName` | property | `hmSetting.getUserData -> userData.nickName` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `NONE` | enum value | `text_style.NONE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `NONE` | enum value | `text_style.NONE` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `normal_color` | property | `@zos/ui.BUTTON -> Param.normal_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `normal_color` | property | `@zos/ui.PICKER -> Param.normal_color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `normal_color` | property | `hmUI.widget.BUTTON -> Param.normal_color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `normal_src` | property | `@zos/ui.BUTTON -> Param.normal_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `normal_src` | property | `hmUI.widget.BUTTON -> Param.normal_src` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
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
| `offset` | property | `@zos/fs.readSync -> Options.offset` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `offset` | property | `@zos/fs.writeSync -> Options.offset` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `ok_func` | property | `@zos/ui.DIALOG -> Param.ok_func` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_nomal_color` | property | `@zos/ui.DIALOG -> Param.ok_nomal_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_nomal_src` | property | `@zos/ui.DIALOG -> Param.ok_nomal_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_press_color` | property | `@zos/ui.DIALOG -> Param.ok_press_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_press_src` | property | `@zos/ui.DIALOG -> Param.ok_press_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_text` | property | `@zos/ui.DIALOG -> Param.ok_text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `ok_text_color` | property | `@zos/ui.DIALOG -> Param.ok_text_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `okButton` | property | `@zos/interaction.createModal -> Option.okButton` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `oldPath` | property | `@zos/fs.renameSync -> Option.oldPath` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrenamesync) |
| `oldPath` | property | `hmFS.rename -> Parameters.oldPath` | watchface | not stated | [hmFS](hmFS.md#hmfsrename) |
| `on` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> Inbox.on` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `on` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.on` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `on` | member | `@zos/utils.EventBus.on()` | device-app | >= 2 | [zos-utils](zos-utils.md#zosutilseventbus) |
| `on_page` | property | `@zos/page.setScrollMode -> SwipeModeParams.on_page` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `on_page` | property | `@zos/ui.SCROLL_LIST -> Param.on_page` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `on_timeout` | property | `@zos/ble.mstStartScan -> Timeout.on_timeout` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `onAccessToken` | property | `ui.Auth -> Props.onAccessToken` | settings | not stated | [ui](ui.md#uiauth) |
| `onCancel` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.onCancel` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
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
| `onChange` | property | `ui.Select -> Props.onChange` | settings | not stated | [ui](ui.md#uiselect) |
| `onChange` | property | `ui.Slider -> Props.onChange` | settings | not stated | [ui](ui.md#uislider) |
| `onChange` | property | `ui.TextInput -> Props.onChange` | settings | not stated | [ui](ui.md#uitextinput) |
| `onChange` | property | `ui.Toggle -> Props.onChange` | settings | not stated | [ui](ui.md#uitoggle) |
| `onClick` | property | `@zos/interaction.createModal -> Option.onClick` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `onClick` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.onClick` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `onClick` | property | `ui.Button -> Props.onClick` | settings | not stated | [ui](ui.md#uibutton) |
| `onClick` | property | `ui.View -> Props.onClick` | settings | not stated | [ui](ui.md#uiview) |
| `onClose` | property | `ui.Toast -> Props.onClose` | settings | not stated | [ui](ui.md#uitoast) |
| `onComplete` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.onComplete` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `onCreate` | property | `@zos/global.App -> Option.onCreate` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalapp) |
| `onCurrentChange` | member | `@zos/sensor.HeartRate.onCurrentChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onDestroy` | property | `@zos/global.App -> Option.onDestroy` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalapp) |
| `onDestroy` | property | `@zos/global.AppService -> Option.onDestroy` | device-app | >= 3 | [zos-global](zos-global.md#zosglobalappservice) |
| `onDestroy` | property | `@zos/global.AppWidget -> Option.onDestroy` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `onDestroy` | property | `@zos/global.DataWidget -> Option.onDestroy` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `onDestroy` | property | `@zos/global.Page -> Option.onDestroy` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `onDestroy` | property | `@zos/global.SecondaryWidget -> Option.onDestroy` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `onDigitalCrown` | symbol | `@zos/interaction.onDigitalCrown` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionondigitalcrown) |
| `onEnableChange` | member | `@zos/sensor.Geolocation.onEnableChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `onGesture` | symbol | `@zos/interaction.onGesture` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionongesture) |
| `onGnssChange` | member | `@zos/sensor.Geolocation.onGnssChange()` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `onInit` | property | `@zos/global.AppService -> Option.onInit` | device-app | >= 3 | [zos-global](zos-global.md#zosglobalappservice) |
| `onInit` | property | `@zos/global.AppWidget -> Option.onInit` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `onInit` | property | `@zos/global.DataWidget -> Option.onInit` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `onInit` | property | `@zos/global.Page -> Option.onInit` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `onInit` | property | `@zos/global.SecondaryWidget -> Option.onInit` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `onKey` | symbol | `@zos/interaction.onKey` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractiononkey) |
| `onLastChange` | member | `@zos/sensor.HeartRate.onLastChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onPause` | property | `@zos/global.AppWidget -> Option.onPause` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `onPause` | property | `@zos/global.DataWidget -> Option.onPause` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `onPause` | property | `@zos/global.SecondaryWidget -> Option.onPause` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `onPerDay` | member | `@zos/sensor.Time.onPerDay()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPerHourEnd` | member | `@zos/sensor.Time.onPerHourEnd()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPerMinute` | member | `@zos/sensor.Time.onPerMinute()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onPhoneTimeSetting` | member | `@zos/sensor.Time.onPhoneTimeSetting()` | device-app, workout-extension | >= 2 | [zos-sensor](zos-sensor.md#zossensortime) |
| `onRestingChange` | member | `@zos/sensor.HeartRate.onRestingChange()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `onResume` | property | `@zos/global.AppWidget -> Option.onResume` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `onResume` | property | `@zos/global.DataWidget -> Option.onResume` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `onResume` | property | `@zos/global.SecondaryWidget -> Option.onResume` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `onReturn` | property | `ui.Auth -> Props.onReturn` | settings | not stated | [ui](ui.md#uiauth) |
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
| `option` | property | `@zos/ui.createWidget -> Parameters.option` | device-app, workout-extension | >= 2 | [zos-ui](zos-ui.md#zosuicreatewidget) |
| `option` | property | `hmUI.createWidget -> Parameters.option` | watchface | not stated | [hmUI](hmUI.md#hmuicreatewidget) |
| `option` | property | `timer.createTimer -> Parameters.option` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `options` | property | `@zos/fs.openSync -> Option.options` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `options` | property | `@zos/fs.readFileSync -> Option.options` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadfilesync) |
| `options` | property | `@zos/fs.readSync -> Option.options` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `options` | property | `@zos/fs.writeFileSync -> Option.options` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `options` | property | `@zos/fs.writeSync -> Option.options` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `options` | property | `@zos/page.setScrollMode -> Option.options` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `options` | property | `@zos/ui.getTextLayout -> Parameters.options` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `options` | property | `@zos/ui.openInspector -> Parameters.options` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiopeninspector) |
| `options` | property | `ui.Select -> Props.options` | settings | not stated | [ui](ui.md#uiselect) |
| `osVersion` | property | `@zos/settings.getSystemInfo -> Result.osVersion` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgetsysteminfo) |
| `OUTDOOR_CYCLING` | enum value | `data_type.OUTDOOR_CYCLING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `OUTDOOR_RUNNING` | enum value | `data_type.OUTDOOR_RUNNING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `pace` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `PACE` | enum value | `sport_data.PACE` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `padding_1` | property | `@zos/ui.PICK_DATE -> Param.padding_1` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `padding_2` | property | `@zos/ui.PICK_DATE -> Param.padding_2` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `pading` | property | `@zos/ui.HISTOGRAM -> XLine.pading` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `pading` | property | `@zos/ui.HISTOGRAM -> YLine.pading` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `page` | property | `@zos/ui.VIEW_CONTAINER -> Param.page` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `Page` | symbol | `@zos/global.Page` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `PAGE_INDICATOR` | symbol | `@zos/ui.PAGE_INDICATOR` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `PAGE_SCROLLBAR` | symbol | `@zos/ui.PAGE_SCROLLBAR` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipage_scrollbar) |
| `pagePlugin` | symbol | `@zeppos/zml/2.0/module/messaging/plugin/page.pagePlugin` | device-app | not stated | [zeppos-zml-2.0-module-messaging-plugin-page](zeppos-zml-2.0-module-messaging-plugin-page.md#zepposzml20modulemessagingpluginpagepageplugin) |
| `Pai` | symbol | `@zos/sensor.Pai` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorpai) |
| `PAI` | symbol | `hmSensor.id.PAI` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `PAI_DAILY` | enum value | `data_type.PAI_DAILY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `PAI_WEEKLY` | enum value | `data_type.PAI_WEEKLY` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `pair` | property | `@zos/ble.mstBuildProfile -> ProfileObj.pair` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `paragraph` | property | `ui.Text -> Props.paragraph` | settings | not stated | [ui](ui.md#uitext) |
| `param` | property | `@zos/alarm.set -> Option.param` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `param` | property | `@zos/app-service.start -> Option.param` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `param` | property | `@zos/notification.notify -> Action.param` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `params` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.params` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `params` | property | `@zos/router.launchApp -> Option.params` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `params` | property | `@zos/router.push -> Option.params` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterpush) |
| `params` | property | `@zos/router.replace -> Option.params` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterreplace) |
| `params` | property | `@zos/router.setLaunchAppTimeout -> Option.params` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `parent` | property | `@zos/ui.setLayoutParent -> Parameters.parent` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisetlayoutparent) |
| `path` | property | `@zos/fs.mkdirSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsmkdirsync) |
| `path` | property | `@zos/fs.openAssetsSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopenassetssync) |
| `path` | property | `@zos/fs.openSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsopensync) |
| `path` | property | `@zos/fs.readdirSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreaddirsync) |
| `path` | property | `@zos/fs.readFileSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadfilesync) |
| `path` | property | `@zos/fs.rmSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrmsync) |
| `path` | property | `@zos/fs.statAssetsSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatassetssync) |
| `path` | property | `@zos/fs.statSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatsync) |
| `path` | property | `@zos/fs.writeFileSync -> Option.path` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `pause` | member | `@zos/media.Player.pause()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PAUSE` | property | `@zos/media.Player -> event.PAUSE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PAUSE` | property | `@zos/sensor.Vibrator.getType -> Type.PAUSE` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `PAUSE` | enum value | `anim_status.PAUSE` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `PAUSE` | enum value | `anim_status.PAUSE` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `pause_call` | property | `hmUI.widget.DELEGATE -> Watchface Lifecycle.pause_call` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdelegate) |
| `PAUSED` | property | `@zos/media.Player -> state.PAUSED` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `pauseDropWristScreenOff` | symbol | `@zos/display.pauseDropWristScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausedropwristscreenoff) |
| `pausePalmScreenOff` | symbol | `@zos/display.pausePalmScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplaypausepalmscreenoff) |
| `PAUSING` | property | `@zos/media.Player -> state.PAUSING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `peak` | property | `@zos/app.getPerformance -> AppMemory.peak` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `peak` | property | `@zos/app.getPerformance -> MemoryModule.peak` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `pending` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `perf` | property | `@zos/app.getPerformance -> Result.perf` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `permission` | property | `@zos/ble.mstBuildProfile -> ServiceObj.permission` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `permission` | property | `@zos/ble.mstBuildProfile -> CharacteristicObj.permission` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `permission` | property | `@zos/ble.mstBuildProfile -> DescriptorObj.permission` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `permissions` | property | `@zos/app.queryPermission -> Option.permissions` | device-app | >= 3 | [zos-app](zos-app.md#zosappquerypermission) |
| `permissions` | property | `@zos/app.requestPermission -> Option.permissions` | device-app | >= 3 | [zos-app](zos-app.md#zosapprequestpermission) |
| `PHN` | enum value | `data_type.PHN` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `PICK_DATE` | symbol | `@zos/ui.PICK_DATE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `PICK_DATE` | enum value | `widget.PICK_DATE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `picker` | property | `@zos/ui.PICKER -> CallBack.picker` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `picker` | property | `@zos/ui.TIME_PICKER -> CallBack.picker` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `PICKER` | symbol | `@zos/ui.PICKER` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `picker_cb` | property | `@zos/ui.PICKER -> Param.picker_cb` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `picker_cb` | property | `@zos/ui.TIME_PICKER -> Param.picker_cb` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `picker_cb` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.picker_cb` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `pkce` | property | `ui.Auth -> Props.pkce` | settings | not stated | [ui](ui.md#uiauth) |
| `placeholder` | property | `ui.TextInput -> Props.placeholder` | settings | not stated | [ui](ui.md#uitextinput) |
| `PLAY` | property | `@zos/media.Player -> event.PLAY` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PLAY` | property | `@zos/media.Player -> state.PLAY` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `Player` | symbol | `@zos/media.Player` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `POLYLINE` | symbol | `@zos/ui.POLYLINE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipolyline) |
| `POOL_SWIMMING` | enum value | `data_type.POOL_SWIMMING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `pos` | property | `hmFS.read -> Parameters.pos` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `pos` | property | `hmFS.write -> Parameters.pos` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `pos_x` | property | `@zos/ui.FILL_RECT -> Param.pos_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `pos_x` | property | `@zos/ui.IMG -> Param.pos_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `pos_x` | property | `@zos/ui.STROKE_RECT -> Param.pos_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `pos_x` | property | `@zos/ui.VIEW_CONTAINER -> Param.pos_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `pos_x` | property | `hmUI.widget.IMG -> Param.pos_x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `pos_y` | property | `@zos/ui.FILL_RECT -> Param.pos_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `pos_y` | property | `@zos/ui.IMG -> Param.pos_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `pos_y` | property | `@zos/ui.STROKE_RECT -> Param.pos_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `pos_y` | property | `@zos/ui.VIEW_CONTAINER -> Param.pos_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `pos_y` | property | `hmUI.widget.IMG -> Param.pos_y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `position` | property | `@zos/fs.readSync -> Options.position` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `position` | property | `@zos/fs.writeSync -> Options.position` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `position` | property | `hmFS.seek -> Parameters.position` | watchface | not stated | [hmFS](hmFS.md#hmfsseek) |
| `powerSaving` | property | `@zos/settings.getSystemMode -> Result.powerSaving` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `prepai0` | property | `hmSensor.id.PAI -> pai.prepai0` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai1` | property | `hmSensor.id.PAI -> pai.prepai1` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai2` | property | `hmSensor.id.PAI -> pai.prepai2` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai3` | property | `hmSensor.id.PAI -> pai.prepai3` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai4` | property | `hmSensor.id.PAI -> pai.prepai4` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai5` | property | `hmSensor.id.PAI -> pai.prepai5` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepai6` | property | `hmSensor.id.PAI -> pai.prepai6` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `prepare` | member | `@zos/media.Player.prepare()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PREPARE` | property | `@zos/media.Player -> event.PREPARE` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PREPARED` | property | `@zos/media.Player -> state.PREPARED` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PREPARING` | property | `@zos/media.Player -> state.PREPARING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `PREPARING` | property | `@zos/media.Recorder -> state.PREPARING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `press_color` | property | `@zos/ui.BUTTON -> Param.press_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `press_color` | property | `hmUI.widget.BUTTON -> Param.press_color` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `press_src` | property | `@zos/ui.BUTTON -> Param.press_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `press_src` | property | `hmUI.widget.BUTTON -> Param.press_src` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `private_key` | property | `@zos/crypto.AESCrypto -> AESOptions.private_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `private_key` | property | `@zos/crypto.AESCrypto.createChiper -> AESKeyResult.private_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `private_key` | property | `@zos/crypto.DigestCrypto -> HMACOptions.private_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `private_key` | property | `@zos/crypto.ECDSACrypto -> ECDSAOptions.private_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `private_key` | property | `@zos/crypto.ECDSACrypto.createChiper -> ECDSAKeyResult.private_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `private_key_length` | property | `@zos/crypto.AESCrypto.createChiper -> AESKeyResult.private_key_length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoaescrypto) |
| `private_key_length` | property | `@zos/crypto.ECDSACrypto.createChiper -> ECDSAKeyResult.private_key_length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `profile` | property | `@zos/ble.mstBuildProfile -> ProfileObj.profile` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `progress` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> FileEventName` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `PROGRESS` | property | `@zos/media.Player -> event.PROGRESS` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `prop` | symbol | `@zos/ui.prop` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `prop` | symbol | `hmUI.prop` | watchface | not stated | [hmUI](hmUI.md#hmuiprop) |
| `prop.CHECKED` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `prop.CHECKED` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `prop.CHECKED` | property | `@zos/ui.SLIDE_SWITCH -> Prop Properties.prop.CHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `prop.CUR_COLUMN` | property | `@zos/ui.PICKER -> Property Operations.prop.CUR_COLUMN` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `prop.DAY` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.DAY` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.done_icon` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.done_icon` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.endYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.endYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.font_size` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.HOUR` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.HOUR` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.INIT` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.INIT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `prop.INIT` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.INIT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `prop.initDay` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initDay` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.initHour` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initHour` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.initMin` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initMin` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.initMonth` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initMonth` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.initYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.initYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.MINUTE` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.MINUTE` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.MONTH` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.MONTH` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.picker_cb` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.picker_cb` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.select_font_size` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.select_font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.SHOW` | property | `@zos/ui.DIALOG -> prop Properties.prop.SHOW` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `prop.startYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.startYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.style` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.style` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.SUBTITLE` | property | `@zos/ui.PICKER -> Property Operations.prop.SUBTITLE` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `prop.title` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.title` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.TITLE` | property | `@zos/ui.PICKER -> Property Operations.prop.TITLE` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `prop.type` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.type` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `prop.UNCHECKED` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.UNCHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `prop.UNCHECKED` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.UNCHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `prop.UPDATE_DATA` | property | `@zos/ui.PICKER -> Property Operations.prop.UPDATE_DATA` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `prop.YEAR` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.YEAR` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `propertyId` | property | `@zos/ui.setProperty -> Parameters.propertyId` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `propertyId` | property | `hmUI.setProperty -> Parameters.propertyId` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `pub_key` | property | `@zos/crypto.ECDSACrypto -> ECDSAOptions.pub_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `pub_key` | property | `@zos/crypto.ECDSACrypto.createChiper -> ECDSAKeyResult.pub_key` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `pub_key_length` | property | `@zos/crypto.ECDSACrypto.createChiper -> ECDSAKeyResult.pub_key_length` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
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
| `radioGroup` | property | `@zos/ui.RADIO_GROUP -> CheckFunc.radioGroup` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `radius` | property | `@zos/ui.ARC -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `radius` | property | `@zos/ui.BUTTON -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `radius` | property | `@zos/ui.CANVAS -> Param.radius` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `radius` | property | `@zos/ui.CIRCLE -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicircle) |
| `radius` | property | `@zos/ui.FILL_RECT -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `radius` | property | `@zos/ui.getAppWidgetSize -> result.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetappwidgetsize) |
| `radius` | property | `@zos/ui.STROKE_RECT -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `radius` | property | `@zos/ui.TEXT -> Param.radius` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `radius` | property | `hmUI.widget.ARC -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `radius` | property | `hmUI.widget.ARC_PROGRESS -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `radius` | property | `hmUI.widget.BUTTON -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `radius` | property | `hmUI.widget.CIRCLE -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetcircle) |
| `radius` | property | `hmUI.widget.FILL_RECT -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `radius` | property | `hmUI.widget.STROKE_RECT -> Param.radius` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `radius_x` | property | `@zos/ui.CANVAS -> Param.radius_x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `radius_x` | property | `@zos/ui.CANVAS -> Param.radius_x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `radius_y` | property | `@zos/ui.CANVAS -> Param.radius_y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `radius_y` | property | `@zos/ui.CANVAS -> Param.radius_y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `range` | property | `@zos/sensor.Workout.getUserHrZoneSettings -> HrZoneSettings.range` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `read` | symbol | `hmFS.read` | watchface | not stated | [hmFS](hmFS.md#hmfsread) |
| `readdirSync` | symbol | `@zos/fs.readdirSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreaddirsync) |
| `readFileSync` | symbol | `@zos/fs.readFileSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadfilesync) |
| `readFileSync` | member | `@zos/share-storage.FileSystem.readFileSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `READINESS` | enum value | `data_type.READINESS` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `readSync` | symbol | `@zos/fs.readSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsreadsync) |
| `readSync` | member | `@zos/share-storage.FileSystem.readSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `readyState` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.readyState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `readyState` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ChangeEventData.readyState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `Recorder` | symbol | `@zos/media.Recorder` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `RECORDING` | property | `@zos/media.Recorder -> state.RECORDING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `RECOVERY_TIME` | enum value | `data_type.RECOVERY_TIME` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `rect` | property | `@zos/ui.keyboard -> Parameters.rect` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `rect_height` | property | `@zos/ui.FILL_RECT -> Param.rect_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `rect_height` | property | `@zos/ui.STROKE_RECT -> Param.rect_height` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `rect_visible` | property | `@zos/ui.SPORT_DATA -> Param.rect_visible` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `rect_width` | property | `@zos/ui.FILL_RECT -> Param.rect_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `rect_width` | property | `@zos/ui.STROKE_RECT -> Param.rect_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `redraw` | symbol | `@zos/ui.redraw` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiredraw) |
| `region` | property | `@zos/user.getProfile -> Result.region` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `region` | property | `hmSetting.getUserData -> userData.region` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `REGULAR` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.REGULAR` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `relaunch` | property | `@zos/display.setWakeUpRelaunch -> Options.relaunch` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetwakeuprelaunch) |
| `relayoutRtl` | symbol | `@zos/ui.relayoutRtl` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuirelayoutrtl) |
| `reload` | property | `@zos/app-service.start -> Option.reload` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `REM_STAGE` | property | `@zos/sensor.Sleep.getStageConstantObj -> StageConstants.REM_STAGE` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `remainDistance` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.remainDistance` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
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
| `repeat` | property | `timer.createTimer -> Parameters.repeat` | watchface | not stated | [timer](timer.md#timercreatetimer) |
| `repeat_count` | property | `@zos/ui.IMG_ANIM -> Param.repeat_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `repeat_count` | property | `hmUI.widget.IMG_ANIM -> Param.repeat_count` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `REPEAT_DAY` | symbol | `@zos/alarm.REPEAT_DAY` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_day) |
| `REPEAT_DAY` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `repeat_duration` | property | `@zos/alarm.set -> Option.repeat_duration` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_HOUR` | symbol | `@zos/alarm.REPEAT_HOUR` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_hour) |
| `REPEAT_HOUR` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_MINUTE` | symbol | `@zos/alarm.REPEAT_MINUTE` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_minute) |
| `REPEAT_MINUTE` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_MONTH` | symbol | `@zos/alarm.REPEAT_MONTH` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_month) |
| `REPEAT_MONTH` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_ONCE` | symbol | `@zos/alarm.REPEAT_ONCE` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_once) |
| `REPEAT_ONCE` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `repeat_period` | property | `@zos/alarm.set -> Option.repeat_period` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `repeat_type` | property | `@zos/alarm.set -> Option.repeat_type` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_WEEK` | symbol | `@zos/alarm.REPEAT_WEEK` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_week) |
| `REPEAT_WEEK` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `REPEAT_YEAR` | symbol | `@zos/alarm.REPEAT_YEAR` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmrepeat_year) |
| `REPEAT_YEAR` | enum value | `@zos/alarm.set -> Timer repeats constants` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `replace` | symbol | `@zos/router.replace` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterreplace) |
| `requestPermission` | symbol | `@zos/app.requestPermission` | device-app | >= 3 | [zos-app](zos-app.md#zosapprequestpermission) |
| `requestTokenUrl` | property | `ui.Auth -> Props.requestTokenUrl` | settings | not stated | [ui](ui.md#uiauth) |
| `resetDropWristScreenOff` | symbol | `@zos/display.resetDropWristScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplayresetdropwristscreenoff) |
| `resetPageBrightTime` | symbol | `@zos/display.resetPageBrightTime` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplayresetpagebrighttime) |
| `resetPalmScreenOff` | symbol | `@zos/display.resetPalmScreenOff` | device-app | >= 2.1 | [zos-display](zos-display.md#zosdisplayresetpalmscreenoff) |
| `rest` | property | `@zos/sensor.Workout.getUserHrZoneSettings -> HrZoneSettings.rest` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `result` | property | `@zos/app-service.start -> CallbackOption.result` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestart) |
| `result` | property | `@zos/app-service.stop -> CallbackOption.result` | device-app | >= 3 | [zos-app-service](zos-app-service.md#zosapp-servicestop) |
| `result` | property | `@zos/ui.getTextLayout -> result.result` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `result` | property | `hmFS.write -> result.result` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `resume` | member | `@zos/media.Player.resume()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `RESUME` | enum value | `anim_status.RESUME` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `RESUME` | enum value | `anim_status.RESUME` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `resume_call` | property | `hmUI.widget.DELEGATE -> Watchface Lifecycle.resume_call` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetdelegate) |
| `RESUMING` | property | `@zos/media.Player -> state.RESUMING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `retcode` | property | `hmSensor.id.SPO2 -> spo2.retcode` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `retCode` | property | `@zos/sensor.BloodOxygen.getCurrent -> Result.retCode` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `RIGHT` | enum value | `align.RIGHT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `RIGHT` | enum value | `align.RIGHT` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `rmSync` | symbol | `@zos/fs.rmSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsrmsync) |
| `rounded` | property | `ui.TextImageRow -> Props.rounded` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `rows` | property | `@zos/ui.getTextLayout -> result.rows` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `rows` | property | `ui.TextInput -> Props.rows` | settings | not stated | [ui](ui.md#uitextinput) |
| `rows` | property | `ui.TextInput -> Props.rows` | settings | not stated | [ui](ui.md#uitextinput) |
| `rows_max` | property | `@zos/ui.getTextLayout -> Options.rows_max` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `rssi` | property | `@zos/ble.mstStartScan -> ScanResult.rssi` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `S` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `satellite_data` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.satellite_data` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `scene` | property | `hmSensor.id.VIBRATE -> vibrate.scene` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridvibrate) |
| `SCENE_AOD` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_AOD` | symbol | `@zos/app.SCENE_AOD` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappscene_aod) |
| `SCENE_APP` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_APP` | symbol | `@zos/app.SCENE_APP` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_app) |
| `SCENE_SETTINGS` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_SETTINGS` | symbol | `@zos/app.SCENE_SETTINGS` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_settings) |
| `SCENE_WATCHFACE` | enum value | `@zos/app.getScene -> Current scene running Mini Program constants` | device-app, watchface | >= 2 | [zos-app](zos-app.md#zosappgetscene) |
| `SCENE_WATCHFACE` | symbol | `@zos/app.SCENE_WATCHFACE` | device-app | >= 2 | [zos-app](zos-app.md#zosappscene_watchface) |
| `scope` | property | `ui.Auth -> Props.scope` | settings | not stated | [ui](ui.md#uiauth) |
| `score` | property | `@zos/sensor.Sleep.getInfo -> SleepInfo.score` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `score` | property | `hmSensor.id.SLEEP -> BasicInfo.score` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `screen` | property | `@zos/display.getSettings -> Result.screen` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `Screen` | symbol | `@zos/sensor.Screen` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorscreen) |
| `SCREEN_SHAPE_ROUND` | enum value | `@zos/device.getDeviceInfo -> Screen shape` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `SCREEN_SHAPE_ROUND` | symbol | `@zos/device.SCREEN_SHAPE_ROUND` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicescreen_shape_round) |
| `SCREEN_SHAPE_SQUARE` | enum value | `@zos/device.getDeviceInfo -> Screen shape` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `SCREEN_SHAPE_SQUARE` | symbol | `@zos/device.SCREEN_SHAPE_SQUARE` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicescreen_shape_square) |
| `screen_type` | symbol | `hmSetting.screen_type` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `screenShape` | property | `@zos/device.getDeviceInfo -> Result.screenShape` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `screenShape` | property | `hmSetting.getDeviceInfo -> deviceInfo.screenShape` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `SCROLL_ANIMATION_NONE` | symbol | `@zos/page.SCROLL_ANIMATION_NONE` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_animation_none) |
| `SCROLL_ANIMATION_NONE` | enum value | `@zos/page.swipeToIndex -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `SCROLL_ANIMATION_SMOOTH` | symbol | `@zos/page.SCROLL_ANIMATION_SMOOTH` | device-app | >= 2 | [zos-page](zos-page.md#zospagescroll_animation_smooth) |
| `SCROLL_ANIMATION_SMOOTH` | enum value | `@zos/page.swipeToIndex -> Page scroll mode constants` | device-app | >= 2 | [zos-page](zos-page.md#zospageswipetoindex) |
| `scroll_complete_func` | property | `@zos/page.setScrollMode -> FreeModeParams.scroll_complete_func` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `scroll_enable` | property | `@zos/ui.VIEW_CONTAINER -> Param.scroll_enable` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `scroll_frame_func` | property | `@zos/page.setScrollMode -> FreeModeParams.scroll_frame_func` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
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
| `second` | property | `@zos/sensor.Stress.getToday -> StressInfo.second` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `second` | property | `@zos/sensor.Stress.getLastWeekByHour -> StressInfo.second` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `second` | property | `hmSensor.id.TIME -> time.second` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `SecondaryWidget` | symbol | `@zos/global.SecondaryWidget` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `seconds` | property | `@zos/sensor.Geolocation.getLatitude -> DMS.seconds` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `seconds` | property | `@zos/sensor.Geolocation.getLongitude -> DMS.seconds` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `SECP192K1` | enum value | `ecp_dp.SECP192K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `SECP224K1` | enum value | `ecp_dp.SECP224K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `SECP256K1` | enum value | `ecp_dp.SECP256K1` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecp_dp) |
| `Section` | symbol | `ui.Section` | settings | not stated | [ui](ui.md#uisection) |
| `seek` | member | `@zos/media.Player.seek()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `seek` | symbol | `hmFS.seek` | watchface | not stated | [hmFS](hmFS.md#hmfsseek) |
| `seekTo` | member | `@zos/media.Player.seekTo()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `Select` | symbol | `ui.Select` | settings | not stated | [ui](ui.md#uiselect) |
| `SELECT` | enum value | `keyboard.SELECT` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `select_bg` | property | `@zos/ui.SLIDE_SWITCH -> Param.select_bg` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `select_color` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.select_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `select_color` | property | `@zos/ui.PAGE_INDICATOR -> Param.select_color` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `select_color` | property | `@zos/ui.PICKER -> Param.select_color` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `select_color` | property | `@zos/ui.RADIO_GROUP -> StateButton.select_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `select_font_size` | property | `@zos/ui.PICKER -> DataConfig.select_font_size` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `select_font_size` | property | `@zos/ui.TIME_PICKER -> Param.select_font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `select_font_size` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.select_font_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `select_index` | property | `@zos/ui.PICKER -> CallBack.select_index` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `select_src` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.select_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `select_src` | property | `@zos/ui.PAGE_INDICATOR -> Param.select_src` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `select_src` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.select_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `selection` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.selection` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `send` | symbol | `@zos/ble.send` | device-app | >= 2 | [zos-ble](zos-ble.md#zosblesend) |
| `send` | symbol | `hmBle.send` | watchface | not stated | [hmBle](hmBle.md#hmblesend) |
| `send` | symbol | `messaging.send` | side-service | not stated | [messaging](messaging.md#messagingsend) |
| `service_data` | property | `@zos/ble.mstStartScan -> ServiceData.service_data` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `service_data_array` | property | `@zos/ble.mstStartScan -> ScanResult.service_data_array` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `service_data_uuid` | property | `@zos/ble.mstStartScan -> Filter.service_data_uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `service_uuid` | property | `@zos/ble.mstStartScan -> Filter.service_uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `service_uuid_array` | property | `@zos/ble.mstStartScan -> ScanResult.service_uuid_array` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `sessionId` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> FileObject.sessionId` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
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
| `settingsKey` | property | `ui.Slider -> Props.settingsKey` | settings | not stated | [ui](ui.md#uislider) |
| `settingsKey` | property | `ui.TextInput -> Props.settingsKey` | settings | not stated | [ui](ui.md#uitextinput) |
| `settingsKey` | property | `ui.Toggle -> Props.settingsKey` | settings | not stated | [ui](ui.md#uitoggle) |
| `settingsLib` | symbol | `@zeppos/zml/base-side.settingsLib` | side-service | not stated | [zeppos-zml-base-side](zeppos-zml-base-side.md#zepposzmlbase-sidesettingslib) |
| `setVolume` | member | `@zos/media.Player.setVolume()` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `setWakeUpRelaunch` | symbol | `@zos/display.setWakeUpRelaunch` | device-app | >= 2 | [zos-display](zos-display.md#zosdisplaysetwakeuprelaunch) |
| `ShareLocalStorage` | symbol | `@zos/storage.ShareLocalStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharelocalstorage) |
| `ShareTypedStorage` | symbol | `@zos/storage.ShareTypedStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragesharetypedstorage) |
| `show` | property | `@zos/interaction.createModal -> Option.show` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `show` | property | `@zos/interaction.createModal -> Modal.show` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `show` | property | `@zos/ui.createDialog -> Option.show` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicreatedialog) |
| `show` | property | `@zos/ui.KEYBOARD -> Param.show` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `SHOW` | property | `@zos/ui.DIALOG -> prop Properties.prop.SHOW` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `SHOW` | enum value | `prop.SHOW` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `showToast` | symbol | `@zos/interaction.showToast` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionshowtoast) |
| `sig_data` | property | `@zos/crypto.ECDSACrypto.decrypt -> Options.sig_data` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptoecdsacrypto) |
| `size` | property | `@zos/fs.statAssetsSync -> FSStat.size` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatassetssync) |
| `size` | property | `@zos/fs.statSync -> FSStat.size` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatsync) |
| `size` | property | `hmBle.createConnect -> Parameters.size` | watchface | not stated | [hmBle](hmBle.md#hmblecreateconnect) |
| `size` | property | `hmBle.send -> Parameters.size` | watchface | not stated | [hmBle](hmBle.md#hmblesend) |
| `size` | property | `hmFS.stat -> stat.size` | watchface | not stated | [hmFS](hmFS.md#hmfsstat) |
| `size` | property | `hmFS.stat_asset -> stat.size` | watchface | not stated | [hmFS](hmFS.md#hmfsstat_asset) |
| `sleep` | property | `@zos/settings.getSystemMode -> Result.sleep` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `Sleep` | symbol | `@zos/sensor.Sleep` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `SLEEP` | symbol | `hmSensor.id.SLEEP` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `SLEEP` | enum value | `data_type.SLEEP` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `slide_select_x` | property | `@zos/ui.SLIDE_SWITCH -> Param.slide_select_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `slide_src` | property | `@zos/ui.SLIDE_SWITCH -> Param.slide_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `SLIDE_SWITCH` | symbol | `@zos/ui.SLIDE_SWITCH` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `SLIDE_SWITCH` | enum value | `widget.SLIDE_SWITCH` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `slide_un_select_x` | property | `@zos/ui.SLIDE_SWITCH -> Param.slide_un_select_x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `slide_y` | property | `@zos/ui.SLIDE_SWITCH -> Param.slide_y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `Slider` | symbol | `ui.Slider` | settings | not stated | [ui](ui.md#uislider) |
| `slideSwitch` | property | `@zos/ui.SLIDE_SWITCH -> CheckedChangeFunc.slideSwitch` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `snap_to_center` | property | `@zos/ui.SCROLL_LIST -> Param.snap_to_center` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `snap_type` | property | `@zos/ui.SCROLL_LIST -> Param.snap_type` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `snr` | property | `@zos/sensor.Geolocation.onGnssChange -> Satellite.snr` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `solar_festival` | property | `hmSensor.id.TIME -> time.solar_festival` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `SOS` | property | `@zos/sensor.SystemSounds.getSourceType -> Type.SOS` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `source` | property | `ui.Link -> Props.source` | settings | not stated | [ui](ui.md#uilink) |
| `space` | property | `@zos/ui.HISTOGRAM -> XLine.space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `space` | property | `@zos/ui.HISTOGRAM -> YLine.space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `space` | property | `@zos/ui.HISTOGRAM -> XText.space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `space` | property | `@zos/ui.HISTOGRAM -> yText.space` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `speed` | property | `@zos/display.getSettings -> WristObj.speed` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `spo2` | property | `@zos/sensor.BloodOxygen.getLastFewHour -> Data.spo2` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `SPO2` | symbol | `hmSensor.id.SPO2` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `SPO2` | enum value | `data_type.SPO2` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `sport_data` | symbol | `@zos/ui.sport_data` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuisport_data) |
| `SPORT_DATA` | symbol | `@zos/ui.SPORT_DATA` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `SPORT_DATA` | enum value | `widget.SPORT_DATA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `SPORTS` | enum value | `edit_widget_group_type.SPORTS` | workout-extension | not stated | [zos-ui](zos-ui.md#zosuiedit_widget_group_type) |
| `SPULSE_CROWN` | property | `@zos/sensor.Vibrator.getType -> Type.SPULSE_CROWN` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `src` | property | `@zos/interaction.createModal -> Option.src` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `src` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Data.src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `src` | property | `@zos/ui.IMG -> Param.src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `src` | property | `hmUI.widget.IMG -> Param.src` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `src` | property | `hmUI.widget.IMG_POINTER -> Param.src` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `src` | property | `ui.Image -> Props.src` | settings | not stated | [ui](ui.md#uiimage) |
| `SRC` | enum value | `prop.SRC` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `src_bg` | property | `hmUI.widget.ARC_PROGRESS -> Param.src_bg` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `Stand` | symbol | `@zos/sensor.Stand` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstand) |
| `STAND` | symbol | `hmSensor.id.STAND` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstand) |
| `STAND` | enum value | `data_type.STAND` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `STAND_TARGET` | enum value | `data_type.STAND_TARGET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `STANDARD_CROWN` | property | `@zos/sensor.Vibrator.getType -> Type.STANDARD_CROWN` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `standby` | property | `@zos/display.getSettings -> Result.standby` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
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
| `start` | property | `@zos/sensor.Sleep.getStage -> StageInfo.start` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `start` | property | `@zos/sensor.Sleep.getNap -> NapInfo.start` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `start` | member | `@zos/sensor.SystemSounds.start()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `start` | member | `@zos/sensor.Vibrator.start()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `start` | property | `@zos/ui.HISTOGRAM -> XLine.start` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `start` | property | `@zos/ui.HISTOGRAM -> YLine.start` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `start` | property | `@zos/ui.SCROLL_LIST -> DataTypeConfig.start` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `start` | property | `hmSensor.id.SLEEP -> SleepInfo.start` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `START` | property | `@zos/media.Recorder -> event.START` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `START` | enum value | `anim_status.START` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `START` | enum value | `anim_status.START` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `start_angle` | property | `@zos/ui.ARC -> Param.start_angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `start_angle` | property | `@zos/ui.CANVAS -> Param.start_angle` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `start_angle` | property | `@zos/ui.TEXT -> Param.start_angle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `start_angle` | property | `hmUI.widget.ARC -> Param.start_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `start_angle` | property | `hmUI.widget.ARC_PROGRESS -> Param.start_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc_progress) |
| `start_angle` | property | `hmUI.widget.IMG_POINTER -> Param.start_angle` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `start_time` | property | `@zos/alarm.set -> Option.start_time` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `STARTING` | property | `@zos/media.Player -> state.STARTING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `STARTING` | property | `@zos/media.Recorder -> state.STARTING` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `startTime` | property | `@zos/display.getSettings -> WristObj.startTime` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `startTime` | property | `@zos/display.getSettings -> StandbyObj.startTime` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `startTime` | property | `@zos/sensor.Sleep.getInfo -> SleepInfo.startTime` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `startTime` | property | `@zos/sensor.Workout.getHistory -> History.startTime` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `startTime` | property | `hmSensor.id.SLEEP -> BasicInfo.startTime` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `startYear` | property | `@zos/ui.PICK_DATE -> Param.startYear` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `startYear` | property | `@zos/ui.TIME_PICKER -> Param.startYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `startYear` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.startYear` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `stat` | symbol | `hmFS.stat` | watchface | not stated | [hmFS](hmFS.md#hmfsstat) |
| `stat_asset` | symbol | `hmFS.stat_asset` | watchface | not stated | [hmFS](hmFS.md#hmfsstat_asset) |
| `statAssetsSync` | symbol | `@zos/fs.statAssetsSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatassetssync) |
| `state` | property | `@zos/global.AppService -> Option.state` | device-app | >= 3 | [zos-global](zos-global.md#zosglobalappservice) |
| `state` | property | `@zos/global.AppWidget -> Option.state` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalappwidget) |
| `state` | property | `@zos/global.DataWidget -> Option.state` | device-app | >= 3.6 | [zos-global](zos-global.md#zosglobaldatawidget) |
| `state` | property | `@zos/global.getCurrentPage -> Options.state` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalgetcurrentpage) |
| `state` | property | `@zos/global.Page -> Option.state` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalpage) |
| `state` | property | `@zos/global.SecondaryWidget -> Option.state` | device-app | >= 2 | [zos-global](zos-global.md#zosglobalsecondarywidget) |
| `STATE_BUTTON` | enum value | `widget.STATE_BUTTON` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `statSync` | symbol | `@zos/fs.statSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfsstatsync) |
| `statSync` | member | `@zos/share-storage.FileSystem.statSync()` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagefilesystem) |
| `status` | property | `@zos/display.getSettings -> ScreenObj.status` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `status` | property | `hmBle.addListener -> Parameters.status` | watchface | not stated | [hmBle](hmBle.md#hmbleaddlistener) |
| `step` | property | `@zos/ui.IMG_ANIM -> Param.step` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `step` | property | `hmUI.widget.IMG_ANIM -> Param.step` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `step` | property | `ui.Slider -> Props.step` | settings | not stated | [ui](ui.md#uislider) |
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
| `stop` | property | `@zos/sensor.Sleep.getStage -> StageInfo.stop` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `stop` | property | `@zos/sensor.Sleep.getNap -> NapInfo.stop` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `stop` | member | `@zos/sensor.SystemSounds.stop()` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `stop` | member | `@zos/sensor.Vibrator.stop()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `stop` | property | `hmSensor.id.SLEEP -> SleepInfo.stop` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridsleep) |
| `STOP` | property | `@zos/media.Player -> event.STOP` | device-app | >= 3 | [zos-media](zos-media.md#zosmediaplayer) |
| `STOP` | property | `@zos/media.Recorder -> event.STOP` | device-app | >= 3 | [zos-media](zos-media.md#zosmediarecorder) |
| `STOP` | enum value | `anim_status.STOP` | device-app | not stated | [zos-ui](zos-ui.md#zosuianim_status) |
| `STOP` | enum value | `anim_status.STOP` | watchface | not stated | [hmUI](hmUI.md#hmuianim_status) |
| `STOP_WATCH` | enum value | `data_type.STOP_WATCH` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `stopTimer` | symbol | `@zos/timer.stopTimer` | device-app | >= 4 | [zos-timer](zos-timer.md#zostimerstoptimer) |
| `stopTimer` | symbol | `timer.stopTimer` | watchface | not stated | [timer](timer.md#timerstoptimer) |
| `store` | property | `@zos/alarm.set -> Option.store` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `stress` | property | `@zos/sensor.Stress.getToday -> StressInfo.stress` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `stress` | property | `@zos/sensor.Stress.getLastWeekByHour -> StressInfo.stress` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `Stress` | symbol | `@zos/sensor.Stress` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `STRESS` | symbol | `hmSensor.id.STRESS` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstress) |
| `STRESS` | enum value | `data_type.STRESS` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `stringToBuffer` | symbol | `@zos/utils.stringToBuffer` | device-app | >= 4 | [zos-utils](zos-utils.md#zosutilsstringtobuffer) |
| `STROKE_RECT` | symbol | `@zos/ui.STROKE_RECT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `STROKE_RECT` | enum value | `widget.STROKE_RECT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `STROKE_RECT` | symbol | `hmUI.widget.STROKE_RECT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `STRONG_CROWN` | property | `@zos/sensor.Vibrator.getType -> Type.STRONG_CROWN` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `STRONG_SHORT` | property | `@zos/sensor.Vibrator.getType -> Type.STRONG_SHORT` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `style` | property | `@zos/display.getSettings -> StandbyObj.style` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `style` | property | `@zos/ui.TIME_PICKER -> Param.style` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `style` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.style` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `style` | property | `@zos/ui.updateLayoutStyle -> Parameters.style` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiupdatelayoutstyle) |
| `style` | property | `ui.Button -> Props.style` | settings | not stated | [ui](ui.md#uibutton) |
| `style` | property | `ui.Image -> Props.style` | settings | not stated | [ui](ui.md#uiimage) |
| `style` | property | `ui.Section -> Props.style` | settings | not stated | [ui](ui.md#uisection) |
| `style` | property | `ui.Text -> Props.style` | settings | not stated | [ui](ui.md#uitext) |
| `style` | property | `ui.View -> Props.style` | settings | not stated | [ui](ui.md#uiview) |
| `sub_text_color` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_color` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_h` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_h` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_size` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_visible` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_visible` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_w` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_w` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_x` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_x` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_text_y` | property | `@zos/ui.SPORT_DATA -> Param.sub_text_y` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `sub_top4_cn_val` | property | `@zos/sensor.Geolocation.onGnssChange -> SatelliteSystem.sub_top4_cn_val` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `sublabel` | property | `ui.TextImageRow -> Props.sublabel` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `subStyle` | property | `ui.TextInput -> Props.subStyle` | settings | not stated | [ui](ui.md#uitextinput) |
| `subtitle` | property | `@zos/interaction.createModal -> Option.subtitle` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `subtitle` | property | `@zos/ui.PICKER -> Param.subtitle` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `SUBTITLE` | property | `@zos/ui.PICKER -> Property Operations.prop.SUBTITLE` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `SUCCESS` | enum value | `@zos/sensor.Buzzer.getSourceType -> Type` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorbuzzer) |
| `SUN_CURRENT` | enum value | `data_type.SUN_CURRENT` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SUN_RISE` | enum value | `data_type.SUN_RISE` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `SUN_SET` | enum value | `data_type.SUN_SET` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `sunrise` | property | `@zos/sensor.Weather.getForecastWeather -> TideDataItem.sunrise` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `sunrise` | property | `hmSensor.id.WEATHER -> TideDataItem.sunrise` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `sunset` | property | `@zos/sensor.Weather.getForecastWeather -> TideDataItem.sunset` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `sunset` | property | `hmSensor.id.WEATHER -> TideDataItem.sunset` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `support_loop` | property | `@zos/ui.PICKER -> DataConfig.support_loop` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
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
| `system` | property | `@zos/app.getPerformance -> Memory.system` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `system` | property | `@zos/device.getDiskInfo -> Result.system` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `system` | property | `hmSetting.getDiskInfo -> diskInfo.system` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
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
| `systemLock` | property | `@zos/settings.getSystemMode -> Result.systemLock` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `SystemSounds` | symbol | `@zos/sensor.SystemSounds` | device-app | >= 3.6 | [zos-sensor](zos-sensor.md#zossensorsystemsounds) |
| `target` | property | `@zos/ui.PAGE_SCROLLBAR -> Param.target` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipage_scrollbar) |
| `target` | property | `hmSensor.id.CALORIE -> calorie.target` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridcalorie) |
| `target` | property | `hmSensor.id.FAT_BURRING -> fatburn.target` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridfat_burring) |
| `target` | property | `hmSensor.id.STAND -> stand.target` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstand) |
| `target` | property | `hmSensor.id.STEP -> step.target` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstep) |
| `TEMPERATURE_UNIT_CENTIGRADE` | enum value | `@zos/settings.getTemperatureUnit -> Temperature unit constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettemperatureunit) |
| `TEMPERATURE_UNIT_CENTIGRADE` | symbol | `@zos/settings.TEMPERATURE_UNIT_CENTIGRADE` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingstemperature_unit_centigrade) |
| `TEMPERATURE_UNIT_FAHRENHEIT` | enum value | `@zos/settings.getTemperatureUnit -> Temperature unit constants` | device-app | >= 2.1 | [zos-settings](zos-settings.md#zossettingsgettemperatureunit) |
| `TEMPERATURE_UNIT_FAHRENHEIT` | symbol | `@zos/settings.TEMPERATURE_UNIT_FAHRENHEIT` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingstemperature_unit_fahrenheit) |
| `text` | property | `@zos/interaction.createModal -> Option.text` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `text` | property | `@zos/notification.notify -> Action.text` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `text` | property | `@zos/ui.BUTTON -> Param.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `text` | property | `@zos/ui.CANVAS -> Param.text` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `text` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Data.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `text` | property | `@zos/ui.DIALOG -> Param.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `text` | property | `@zos/ui.DIALOG -> Dialog.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuidialog) |
| `text` | property | `@zos/ui.getTextLayout -> Parameters.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `text` | property | `@zos/ui.getTextLayout -> result.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `text` | property | `@zos/ui.keyboard -> Parameters.text` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `text` | property | `@zos/ui.keyboard -> Parameters.text` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `text` | property | `@zos/ui.KEYBOARD -> KeyAttr.text` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `text` | property | `@zos/ui.SYSTEM_KEYBOARD -> Param.text` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuisystem_keyboard) |
| `text` | property | `@zos/ui.TEXT -> Param.text` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `text` | property | `hmUI.widget.BUTTON -> Param.text` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `text` | property | `hmUI.widget.TEXT -> Param.text` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `text` | property | `hmUI.widget.TEXT_IMG -> Param.text` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `Text` | symbol | `ui.Text` | settings | not stated | [ui](ui.md#uitext) |
| `TEXT` | enum value | `prop.TEXT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `TEXT` | symbol | `@zos/ui.TEXT` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `TEXT` | enum value | `widget.TEXT` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `TEXT` | symbol | `hmUI.widget.TEXT` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `text_color` | property | `@zos/ui.SPORT_DATA -> Param.text_color` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `text_h` | property | `@zos/ui.SPORT_DATA -> Param.text_h` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `text_i18n` | property | `@zos/ui.TEXT -> Param.text_i18n` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `TEXT_IMG` | symbol | `hmUI.widget.TEXT_IMG` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `text_size` | property | `@zos/ui.BUTTON -> Param.text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `text_size` | property | `@zos/ui.CANVAS -> Param.text_size` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `text_size` | property | `@zos/ui.getTextLayout -> Options.text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `text_size` | property | `@zos/ui.SCROLL_LIST -> TextView.text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `text_size` | property | `@zos/ui.SPORT_DATA -> Param.text_size` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `text_size` | property | `@zos/ui.TEXT -> Param.text_size` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `text_size` | property | `hmUI.widget.BUTTON -> Param.text_size` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `text_size` | property | `hmUI.widget.TEXT -> Param.text_size` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `text_style` | property | `@zos/ui.TEXT -> Param.text_style` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `text_style` | symbol | `@zos/ui.text_style` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `text_style` | symbol | `hmUI.text_style` | watchface | not stated | [hmUI](hmUI.md#hmuitext_style) |
| `text_style` | property | `hmUI.widget.TEXT -> Param.text_style` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `text_view` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.text_view` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `text_view_count` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.text_view_count` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `text_w` | property | `@zos/ui.BUTTON -> Param.text_w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `text_w` | property | `@zos/ui.SPORT_DATA -> Param.text_w` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `text_width` | property | `@zos/ui.getTextLayout -> Options.text_width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `text_x` | property | `@zos/ui.SPORT_DATA -> Param.text_x` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `text_y` | property | `@zos/ui.SPORT_DATA -> Param.text_y` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `textAlpha` | property | `@zos/interaction.createModal -> Option.textAlpha` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `textColor` | property | `@zos/interaction.createModal -> Option.textColor` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `TextImageRow` | symbol | `ui.TextImageRow` | settings | not stated | [ui](ui.md#uitextimagerow) |
| `TextInput` | symbol | `ui.TextInput` | settings | not stated | [ui](ui.md#uitextinput) |
| `theater` | property | `@zos/settings.getSystemMode -> Result.theater` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `tideData` | property | `@zos/sensor.Weather.getForecastWeather -> ForecastWeather.tideData` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `tideData` | property | `hmSensor.id.WEATHER -> ForecastWeather.tideData` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `time` | property | `@zos/alarm.set -> Option.time` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `time` | property | `@zos/sensor.BloodOxygen.getCurrent -> Result.time` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `time` | property | `@zos/sensor.BloodOxygen.getLastFewHour -> Data.time` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `time` | property | `@zos/sensor.BodyTemperature.getCurrent -> Result.time` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorbodytemperature) |
| `time` | property | `@zos/sensor.HeartRate.getDailySummary -> Maximum.time` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `time` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.time` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `time` | property | `@zos/sensor.Stress.getCurrent -> Result.time` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `time` | property | `hmSensor.id.SPO2 -> spo2.time` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridspo2) |
| `time` | property | `hmSensor.id.STRESS -> stress.time` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridstress) |
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
| `timeinterval` | property | `hmSensor.id.BODY_TEMP -> thermometer.timeinterval` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridbody_temp) |
| `timeoutId` | property | `@zos/router.clearLaunchAppTimeout -> Option.timeoutId` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterclearlaunchapptimeout) |
| `timestamp` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ChangeEvent.timestamp` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `timestamp` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ProgressEvent.timestamp` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `timeZoneHour` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.timeZoneHour` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `timeZoneHour` | property | `hmSensor.id.WORLD_CLOCK -> wordInfo.timeZoneHour` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `timeZoneMinute` | property | `@zos/sensor.WorldClock.getInfo -> WorldClockInfo.timeZoneMinute` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `timeZoneMinute` | property | `hmSensor.id.WORLD_CLOCK -> wordInfo.timeZoneMinute` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `title` | property | `@zos/interaction.createModal -> Option.title` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `title` | property | `@zos/notification.notify -> Option.title` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
| `title` | property | `@zos/ui.createDialog -> Option.title` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicreatedialog) |
| `title` | property | `@zos/ui.PICKER -> Param.title` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `title` | property | `@zos/ui.TIME_PICKER -> Param.title` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `title` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.title` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `title` | property | `@zos/ui.updateStatusBarTitle -> Parameters.title` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiupdatestatusbartitle) |
| `title` | property | `hmSensor.id.MUSIC -> music.title` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridmusic) |
| `title` | property | `ui.Auth -> Props.title` | settings | not stated | [ui](ui.md#uiauth) |
| `title` | property | `ui.Section -> Props.title` | settings | not stated | [ui](ui.md#uisection) |
| `title` | property | `ui.Select -> Props.title` | settings | not stated | [ui](ui.md#uiselect) |
| `TITLE` | property | `@zos/ui.PICKER -> Property Operations.prop.TITLE` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `Toast` | symbol | `ui.Toast` | settings | not stated | [ui](ui.md#uitoast) |
| `today` | property | `hmSensor.id.HEART -> heart.today` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridheart) |
| `Toggle` | symbol | `ui.Toggle` | settings | not stated | [ui](ui.md#uitoggle) |
| `toObject` | symbol | `settings-storage.toObject` | settings, side-service | not stated | [settings-storage](settings-storage.md#settings-storagetoobject) |
| `TOP` | enum value | `align.TOP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuialign) |
| `TOP` | enum value | `align.TOP` | watchface | not stated | [hmUI](hmUI.md#hmuialign) |
| `top4_cn_val` | property | `@zos/sensor.Geolocation.onGnssChange -> Info.top4_cn_val` | device-app | >= 2.1 | [zos-sensor](zos-sensor.md#zossensorgeolocation) |
| `total` | property | `@zos/app.getPerformance -> SystemMemory.total` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `total` | property | `@zos/device.getDiskInfo -> Result.total` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `total` | property | `hmSetting.getDiskInfo -> diskInfo.total` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
| `total_count` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `total_downhill_distance` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `total_up_altitude` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `totalpai` | property | `hmSensor.id.PAI -> pai.totalpai` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridpai) |
| `totalTime` | property | `@zos/sensor.Sleep.getInfo -> SleepInfo.totalTime` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `TRAINING_LOAD` | enum value | `data_type.TRAINING_LOAD` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `trainingLoad` | property | `@zos/sensor.Workout.getStatus -> Status.trainingLoad` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `TransferFile` | symbol | `@zos/ble/TransferFile.TransferFile` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `transferred` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `transferring` | enum value | `@zos/ble/TransferFile.TransferFile.getInbox -> ReceiveFileState` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `turnDistance` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.turnDistance` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `turnType` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.turnType` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `type` | property | `@zos/app-access.getSportData -> Options.type` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `type` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ChangeEvent.type` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `type` | property | `@zos/ble/TransferFile.TransferFile.getInbox -> ProgressEvent.type` | device-app | >= 3 | [zos-ble-TransferFile](zos-ble-TransferFile.md#zosbletransferfiletransferfile) |
| `type` | property | `@zos/interaction.createModal -> KeyObj.type` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractioncreatemodal) |
| `type` | property | `@zos/interaction.onWristMotion -> Params.type` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `type` | property | `@zos/page.setScrollMode -> ScrollObj.type` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `type` | property | `@zos/sensor.Vibrator.start -> Action.type` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `type` | property | `@zos/sensor.Workout.getUserHrZoneSettings -> HrZoneSettings.type` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `type` | property | `@zos/ui.TIME_PICKER -> Param.type` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `type` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.type` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `type` | property | `@zos/ui.VIEW_CONTAINER -> FrameParams.type` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `type` | property | `hmUI.widget.IMG_POINTER -> Param.type` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `type` | property | `hmUI.widget.TEXT_IMG -> Param.type` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `type_id` | property | `@zos/ui.SCROLL_LIST -> ItemConfig.type_id` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `type_id` | property | `@zos/ui.SCROLL_LIST -> DataTypeConfig.type_id` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `TypedStorage` | symbol | `@zos/share-storage.TypedStorage` | device-app | >= 3 | [zos-share-storage](zos-share-storage.md#zosshare-storagetypedstorage) |
| `TypedStorage` | symbol | `@zos/storage.TypedStorage` | device-app | >= 3 | [zos-storage](zos-storage.md#zosstoragetypedstorage) |
| `ultraPowerSaving` | property | `@zos/settings.getSystemMode -> Result.ultraPowerSaving` | device-app | >= 3 | [zos-settings](zos-settings.md#zossettingsgetsystemmode) |
| `un_select_bg` | property | `@zos/ui.SLIDE_SWITCH -> Param.un_select_bg` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `UNCHECKED` | property | `@zos/ui.CHECKBOX_GROUP -> Prop Properties.prop.UNCHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `UNCHECKED` | property | `@zos/ui.RADIO_GROUP -> Prop Properties.prop.UNCHECKED` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `underlineColor` | property | `@zos/ui.keyboard -> Parameters.underlineColor` | device-app | >= 4.2 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `unit` | property | `@zos/ui.PICKER -> DataConfig.unit` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `unit_en` | property | `hmUI.widget.TEXT_IMG -> Param.unit_en` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `unit_font_size` | property | `@zos/ui.PICKER -> DataConfig.unit_font_size` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `unit_sc` | property | `hmUI.widget.TEXT_IMG -> Param.unit_sc` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `unit_tc` | property | `hmUI.widget.TEXT_IMG -> Param.unit_tc` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `unselect_color` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.unselect_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `unselect_color` | property | `@zos/ui.PAGE_INDICATOR -> Param.unselect_color` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `unselect_color` | property | `@zos/ui.RADIO_GROUP -> StateButton.unselect_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `unselect_src` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.unselect_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `unselect_src` | property | `@zos/ui.PAGE_INDICATOR -> Param.unselect_src` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `unselect_src` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.unselect_src` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `update` | member | `@zos/crypto.DigestCrypto.update()` | device-app | not stated | [zos-crypto](zos-crypto.md#zoscryptodigestcrypto) |
| `update` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.update` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `UPDATE_DATA` | property | `@zos/ui.PICKER -> Property Operations.prop.UPDATE_DATA` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuipicker) |
| `UPDATE_DATA` | enum value | `prop.UPDATE_DATA` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `updateInfo` | member | `@zos/sensor.Sleep.updateInfo()` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `updateLayout` | symbol | `@zos/ui.updateLayout` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiupdatelayout) |
| `updateLayoutStyle` | symbol | `@zos/ui.updateLayoutStyle` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuiupdatelayoutstyle) |
| `updateStatusBarTitle` | symbol | `@zos/ui.updateStatusBarTitle` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiupdatestatusbartitle) |
| `URGENT` | property | `@zos/sensor.Vibrator.getType -> Type.URGENT` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorvibrator) |
| `url` | property | `@zos/alarm.set -> Option.url` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
| `url` | property | `@zos/router.launchApp -> Option.url` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterlaunchapp) |
| `url` | property | `@zos/router.push -> Option.url` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterpush) |
| `url` | property | `@zos/router.replace -> Option.url` | device-app | >= 2 | [zos-router](zos-router.md#zosrouterreplace) |
| `url` | property | `@zos/router.setLaunchAppTimeout -> Option.url` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `use_color` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.use_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `use_color` | property | `@zos/ui.PAGE_INDICATOR -> Param.use_color` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `use_color` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.use_color` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `used` | property | `@zos/app.getPerformance -> SystemMemory.used` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `used` | property | `@zos/app.getPerformance -> AppMemory.used` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `used` | property | `@zos/app.getPerformance -> LeakingMemory.used` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `used` | property | `@zos/app.getPerformance -> MemoryModule.used` | device-app | >= 4 | [zos-app](zos-app.md#zosappgetperformance) |
| `utc` | property | `@zos/router.setLaunchAppTimeout -> Option.utc` | device-app | >= 2 | [zos-router](zos-router.md#zosroutersetlaunchapptimeout) |
| `utc` | property | `hmSensor.id.TIME -> time.utc` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `uuid` | property | `@zos/ble.mstBuildProfile -> ServiceObj.uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `uuid` | property | `@zos/ble.mstBuildProfile -> CharacteristicObj.uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `uuid` | property | `@zos/ble.mstBuildProfile -> DescriptorObj.uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemstbuildprofile) |
| `uuid` | property | `@zos/ble.mstStartScan -> ServiceData.uuid` | device-app | >= 3 | [zos-ble](zos-ble.md#zosblemststartscan) |
| `uuid` | property | `@zos/device.getDeviceInfo -> Result.uuid` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `UVI` | enum value | `data_type.UVI` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `v_space` | property | `@zos/ui.PAGE_INDICATOR -> Param.v_space` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `val` | property | `@zos/sensor.HeartRate.getAFibRecord -> AfibInfo.val` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorheartrate) |
| `val` | property | `@zos/ui.setProperty -> Parameters.val` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `val` | property | `hmFS.SysProSetBool -> Parameters.val` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetbool) |
| `val` | property | `hmFS.SysProSetChars -> Parameters.val` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetchars) |
| `val` | property | `hmFS.SysProSetDouble -> Parameters.val` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetdouble) |
| `val` | property | `hmFS.SysProSetInt -> Parameters.val` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint) |
| `val` | property | `hmFS.SysProSetInt64 -> Parameters.val` | watchface | not stated | [hmFS](hmFS.md#hmfssysprosetint64) |
| `val` | property | `hmUI.setProperty -> Parameters.val` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `value` | property | `@zos/sensor.BloodOxygen.getCurrent -> Result.value` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorbloodoxygen) |
| `value` | property | `@zos/sensor.Stress.getCurrent -> Result.value` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorstress) |
| `value` | property | `@zos/ui.KEYBOARD -> KeyAttr.value` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `value` | property | `ui.Select -> Props.value` | settings | not stated | [ui](ui.md#uiselect) |
| `value` | property | `ui.Select -> SelectOption.value` | settings | not stated | [ui](ui.md#uiselect) |
| `value` | property | `ui.Slider -> Props.value` | settings | not stated | [ui](ui.md#uislider) |
| `value` | property | `ui.TextInput -> Props.value` | settings | not stated | [ui](ui.md#uitextinput) |
| `value` | property | `ui.Toggle -> Props.value` | settings | not stated | [ui](ui.md#uitoggle) |
| `value_index` | property | `@zos/ui.TIME_PICKER -> CallBack.value_index` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `vertical` | property | `ui.Toast -> Props.vertical` | settings | not stated | [ui](ui.md#uitoast) |
| `vertical_speed` | enum value | `@zos/app-access.getSportData -> SportType` | device-app | >= 3.6 | [zos-app-access](zos-app-access.md#zosapp-accessgetsportdata) |
| `vibrate` | property | `@zos/notification.notify -> Option.vibrate` | device-app | >= 3 | [zos-notification](zos-notification.md#zosnotificationnotify) |
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
| `view_index` | property | `@zos/ui.SCROLL_LIST -> Param.view_index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `VIRTUAL_CONTAINER` | symbol | `@zos/ui.VIRTUAL_CONTAINER` | device-app | >= 4 | [zos-ui](zos-ui.md#zosuivirtual_container) |
| `VIRTUAL_CONTAINER` | enum value | `widget.VIRTUAL_CONTAINER` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `visible` | property | `@zos/ui.setStatusBarVisible -> Parameters.visible` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetstatusbarvisible) |
| `visible` | property | `ui.Toast -> Props.visible` | settings | not stated | [ui](ui.md#uitoast) |
| `VISIBLE` | enum value | `prop.VISIBLE` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `VISIBLE` | property | `@zos/ui.setProperty -> PropertyId.VISIBLE` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `VISIBLE` | property | `hmUI.setProperty -> PropertyId.VISIBLE` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `vo2Max` | property | `@zos/sensor.Workout.getStatus -> Status.vo2Max` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `VO2MAX` | enum value | `data_type.VO2MAX` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `VOICE` | enum value | `inputType.VOICE` | device-app | not stated | [zos-ui](zos-ui.md#zosuiinputtype) |
| `w` | property | `@zos/ui.ARC -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `w` | property | `@zos/ui.BUTTON -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `w` | property | `@zos/ui.CANVAS -> Param.w` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `w` | property | `@zos/ui.CANVAS -> Param.w` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `w` | property | `@zos/ui.CANVAS -> Param.w` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `w` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `w` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `w` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `w` | property | `@zos/ui.CYCLE_LIST -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `w` | property | `@zos/ui.FILL_RECT -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `w` | property | `@zos/ui.getAppWidgetSize -> result.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetappwidgetsize) |
| `w` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `w` | property | `@zos/ui.GROUP -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `w` | property | `@zos/ui.HISTOGRAM -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `w` | property | `@zos/ui.HISTOGRAM -> XText.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `w` | property | `@zos/ui.HISTOGRAM -> yText.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `w` | property | `@zos/ui.IMG -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `w` | property | `@zos/ui.KEYBOARD -> Param.w` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `w` | property | `@zos/ui.PAGE_INDICATOR -> Param.w` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `w` | property | `@zos/ui.PICK_DATE -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `w` | property | `@zos/ui.QRCODE -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `w` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `w` | property | `@zos/ui.RADIO_GROUP -> StateButton.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `w` | property | `@zos/ui.SCROLL_LIST -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `w` | property | `@zos/ui.SCROLL_LIST -> TextView.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `w` | property | `@zos/ui.SCROLL_LIST -> ImageView.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `w` | property | `@zos/ui.setProperty -> PropertyId.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `w` | property | `@zos/ui.SLIDE_SWITCH -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `w` | property | `@zos/ui.SPORT_DATA -> Param.w` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `w` | property | `@zos/ui.STROKE_RECT -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `w` | property | `@zos/ui.TEXT -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `w` | property | `@zos/ui.VIEW_CONTAINER -> Param.w` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `w` | property | `hmUI.setProperty -> PropertyId.w` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `w` | property | `hmUI.widget.ARC -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `w` | property | `hmUI.widget.BUTTON -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `w` | property | `hmUI.widget.FILL_RECT -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `w` | property | `hmUI.widget.IMG -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `w` | property | `hmUI.widget.IMG_LEVEL -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `w` | property | `hmUI.widget.STROKE_RECT -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `w` | property | `hmUI.widget.TEXT -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `w` | property | `hmUI.widget.TEXT_IMG -> Param.w` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `W` | enum value | `@zos/sensor.Compass.getDirection -> direction` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorcompass) |
| `WAKE_STAGE` | property | `@zos/sensor.Sleep.getStageConstantObj -> StageConstants.WAKE_STAGE` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorsleep) |
| `WALKING` | enum value | `data_type.WALKING` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `warn` | member | `@zos/utils.log.warn()` | device-app, watchface | >= 2 | [zos-utils](zos-utils.md#zosutilslog) |
| `watchface` | property | `@zos/device.getDiskInfo -> Result.watchface` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdiskinfo) |
| `watchface` | property | `hmSetting.getDiskInfo -> diskInfo.watchface` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdiskinfo) |
| `WATCHFACE` | enum value | `screen_type.WATCHFACE` | watchface | not stated | [hmSetting](hmSetting.md#hmsettingscreen_type) |
| `Wear` | symbol | `@zos/sensor.Wear` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorwear) |
| `WEAR` | symbol | `hmSensor.id.WEAR` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridwear) |
| `Weather` | symbol | `@zos/sensor.Weather` | device-app | >= 2 | [zos-sensor](zos-sensor.md#zossensorweather) |
| `WEATHER` | symbol | `hmSensor.id.WEATHER` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridweather) |
| `WEATHER_CURRENT` | enum value | `data_type.WEATHER_CURRENT` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `WEATHER_HIGH` | enum value | `data_type.WEATHER_HIGH` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `WEATHER_LOW` | enum value | `data_type.WEATHER_LOW` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `week` | property | `hmSensor.id.TIME -> time.week` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `WEEK` | enum value | `date.WEEK` | watchface | not stated | [hmUI](hmUI.md#hmuidate) |
| `week_days` | property | `@zos/alarm.set -> Option.week_days` | device-app | >= 3 | [zos-alarm](zos-alarm.md#zosalarmset) |
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
| `weight` | property | `@zos/user.addHealthData -> Option.weight` | device-app | >= 3 | [zos-user](zos-user.md#zosuseraddhealthdata) |
| `weight` | property | `@zos/user.getProfile -> Result.weight` | device-app | >= 2 | [zos-user](zos-user.md#zosusergetprofile) |
| `weight` | property | `hmSetting.getUserData -> userData.weight` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetuserdata) |
| `WEIGHT_UNIT_JIN` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_JIN` | symbol | `@zos/settings.WEIGHT_UNIT_JIN` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_jin) |
| `WEIGHT_UNIT_KILOGRAM` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_KILOGRAM` | symbol | `@zos/settings.WEIGHT_UNIT_KILOGRAM` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_kilogram) |
| `WEIGHT_UNIT_POUND` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_POUND` | symbol | `@zos/settings.WEIGHT_UNIT_POUND` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_pound) |
| `WEIGHT_UNIT_STONE` | enum value | `@zos/settings.getWeightUnit -> Weight unit constants` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsgetweightunit) |
| `WEIGHT_UNIT_STONE` | symbol | `@zos/settings.WEIGHT_UNIT_STONE` | device-app | >= 2 | [zos-settings](zos-settings.md#zossettingsweight_unit_stone) |
| `whence` | property | `hmFS.seek -> Parameters.whence` | watchface | not stated | [hmFS](hmFS.md#hmfsseek) |
| `widget` | property | `@zos/ui.createWidget -> Parameters.widget` | device-app, workout-extension | >= 2 | [zos-ui](zos-ui.md#zosuicreatewidget) |
| `widget` | symbol | `@zos/ui.widget` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiwidget) |
| `widget` | property | `hmUI.createWidget -> Parameters.widget` | watchface | not stated | [hmUI](hmUI.md#hmuicreatewidget) |
| `widget` | symbol | `hmUI.widget` | watchface | not stated | [hmUI](hmUI.md#hmuiwidget) |
| `widgetAnimations` | symbol | `@zos/ui.widgetAnimations` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiwidgetanimations) |
| `widgetId` | property | `@zos/ui.createWidget -> Parameters.widgetId` | device-app, workout-extension | >= 2 | [zos-ui](zos-ui.md#zosuicreatewidget) |
| `widgetId` | property | `hmUI.createWidget -> Parameters.widgetId` | watchface | not stated | [hmUI](hmUI.md#hmuicreatewidget) |
| `width` | property | `@zos/device.getDeviceInfo -> Result.width` | device-app | >= 2 | [zos-device](zos-device.md#zosdevicegetdeviceinfo) |
| `width` | property | `@zos/page.setScrollMode -> Options.width` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `width` | property | `@zos/ui.getImageInfo -> result.width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigetimageinfo) |
| `width` | property | `@zos/ui.getTextLayout -> result.width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `width` | property | `@zos/ui.HISTOGRAM -> XLine.width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `width` | property | `@zos/ui.HISTOGRAM -> YLine.width` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `width` | property | `hmSetting.getDeviceInfo -> deviceInfo.width` | watchface | not stated | [hmSetting](hmSetting.md#hmsettinggetdeviceinfo) |
| `width` | property | `ui.Image -> Props.width` | settings | not stated | [ui](ui.md#uiimage) |
| `WIND` | enum value | `data_type.WIND` | watchface | not stated | [hmUI](hmUI.md#hmuidata_type) |
| `Workout` | symbol | `@zos/sensor.Workout` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `WORLD_CLOCK` | symbol | `hmSensor.id.WORLD_CLOCK` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridworld_clock) |
| `WorldClock` | symbol | `@zos/sensor.WorldClock` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworldclock) |
| `WRAP` | enum value | `text_style.WRAP` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuitext_style) |
| `wrapped` | property | `@zos/ui.getTextLayout -> Options.wrapped` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigettextlayout) |
| `wrist` | property | `@zos/display.getSettings -> Result.wrist` | device-app | >= 3 | [zos-display](zos-display.md#zosdisplaygetsettings) |
| `WRIST_MOTION_FLIP` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_FLIP` | symbol | `@zos/interaction.WRIST_MOTION_FLIP` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_flip) |
| `WRIST_MOTION_LIFT` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_LIFT` | symbol | `@zos/interaction.WRIST_MOTION_LIFT` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_lift) |
| `WRIST_MOTION_LOWER` | enum value | `@zos/interaction.onWristMotion -> Hand motion constant` | device-app | >= 3 | [zos-interaction](zos-interaction.md#zosinteractiononwristmotion) |
| `WRIST_MOTION_LOWER` | symbol | `@zos/interaction.WRIST_MOTION_LOWER` | device-app | >= 2 | [zos-interaction](zos-interaction.md#zosinteractionwrist_motion_lower) |
| `write` | symbol | `hmFS.write` | watchface | not stated | [hmFS](hmFS.md#hmfswrite) |
| `writeFileSync` | symbol | `@zos/fs.writeFileSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritefilesync) |
| `writeSync` | symbol | `@zos/fs.writeSync` | device-app | >= 2 | [zos-fs](zos-fs.md#zosfswritesync) |
| `x` | property | `@zos/sensor.Accelerometer.getCurrent -> Result.x` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `x` | property | `@zos/sensor.Gyroscope.getCurrent -> Result.x` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `x` | property | `@zos/ui.ARC -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `x` | property | `@zos/ui.BUTTON -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `x` | property | `@zos/ui.CANVAS -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CANVAS -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CANVAS -> Coordinate.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CANVAS -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CANVAS -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CANVAS -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `x` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `x` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `x` | property | `@zos/ui.CYCLE_LIST -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `x` | property | `@zos/ui.FILL_RECT -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `x` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `x` | property | `@zos/ui.GRADIENT_POLYLINE -> AxisItem.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `x` | property | `@zos/ui.GROUP -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `x` | property | `@zos/ui.HISTOGRAM -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `x` | property | `@zos/ui.HISTOGRAM -> XText.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `x` | property | `@zos/ui.HISTOGRAM -> yText.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `x` | property | `@zos/ui.IMG -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `x` | property | `@zos/ui.IMG_ANIM -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `x` | property | `@zos/ui.KEYBOARD -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `x` | property | `@zos/ui.KEYBOARD -> KeyAttr.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `x` | property | `@zos/ui.KEYBOARD -> Param.x` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `x` | property | `@zos/ui.PAGE_INDICATOR -> Param.x` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `x` | property | `@zos/ui.PICK_DATE -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `x` | property | `@zos/ui.QRCODE -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `x` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `x` | property | `@zos/ui.RADIO_GROUP -> StateButton.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `x` | property | `@zos/ui.SCROLL_LIST -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `x` | property | `@zos/ui.SCROLL_LIST -> TextView.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `x` | property | `@zos/ui.SCROLL_LIST -> ImageView.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `x` | property | `@zos/ui.setProperty -> PropertyId.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `x` | property | `@zos/ui.SLIDE_SWITCH -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `x` | property | `@zos/ui.SPORT_DATA -> Param.x` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `x` | property | `@zos/ui.STROKE_RECT -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `x` | property | `@zos/ui.TEXT -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `x` | property | `@zos/ui.VIEW_CONTAINER -> Param.x` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `x` | property | `hmUI.setProperty -> PropertyId.x` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `x` | property | `hmUI.widget.ARC -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `x` | property | `hmUI.widget.BUTTON -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `x` | property | `hmUI.widget.FILL_RECT -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `x` | property | `hmUI.widget.IMG -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `x` | property | `hmUI.widget.IMG_ANIM -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `x` | property | `hmUI.widget.IMG_LEVEL -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `x` | property | `hmUI.widget.IMG_POINTER -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `x` | property | `hmUI.widget.IMG_PROGRESS -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `x` | property | `hmUI.widget.STROKE_RECT -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `x` | property | `hmUI.widget.TEXT -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `x` | property | `hmUI.widget.TEXT_IMG -> Param.x` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `X` | enum value | `prop.X` | device-app, workout-extension | not stated | [zos-ui](zos-ui.md#zosuiprop) |
| `x1` | property | `@zos/ui.CANVAS -> Param.x1` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x1` | property | `@zos/ui.CANVAS -> Param.x1` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x2` | property | `@zos/ui.CANVAS -> Param.x2` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `x2` | property | `@zos/ui.CANVAS -> Param.x2` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `xline` | property | `@zos/ui.HISTOGRAM -> Param.xline` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `xText` | property | `@zos/ui.HISTOGRAM -> Param.xText` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `y` | property | `@zos/page.scrollTo -> Option.y` | device-app | >= 2 | [zos-page](zos-page.md#zospagescrollto) |
| `y` | property | `@zos/sensor.Accelerometer.getCurrent -> Result.y` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `y` | property | `@zos/sensor.Gyroscope.getCurrent -> Result.y` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `y` | property | `@zos/ui.ARC -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiarc) |
| `y` | property | `@zos/ui.BUTTON -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuibutton) |
| `y` | property | `@zos/ui.CANVAS -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CANVAS -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CANVAS -> Coordinate.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CANVAS -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CANVAS -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CANVAS -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y` | property | `@zos/ui.CHECKBOX_GROUP -> checkboxGroupParam.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `y` | property | `@zos/ui.CHECKBOX_GROUP -> StateButton.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicheckbox_group) |
| `y` | property | `@zos/ui.CYCLE_IMAGE_TEXT_LIST -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_image_text_list) |
| `y` | property | `@zos/ui.CYCLE_LIST -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuicycle_list) |
| `y` | property | `@zos/ui.FILL_RECT -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuifill_rect) |
| `y` | property | `@zos/ui.GRADIENT_POLYLINE -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `y` | property | `@zos/ui.GRADIENT_POLYLINE -> AxisItem.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigradient_polyline) |
| `y` | property | `@zos/ui.GROUP -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuigroup) |
| `y` | property | `@zos/ui.HISTOGRAM -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `y` | property | `@zos/ui.HISTOGRAM -> XText.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `y` | property | `@zos/ui.HISTOGRAM -> yText.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `y` | property | `@zos/ui.IMG -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg) |
| `y` | property | `@zos/ui.IMG_ANIM -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiimg_anim) |
| `y` | property | `@zos/ui.KEYBOARD -> Param.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `y` | property | `@zos/ui.KEYBOARD -> KeyAttr.y` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuikeyboard) |
| `y` | property | `@zos/ui.PAGE_INDICATOR -> Param.y` | device-app | >= 2.1 | [zos-ui](zos-ui.md#zosuipage_indicator) |
| `y` | property | `@zos/ui.PICK_DATE -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `y` | property | `@zos/ui.QRCODE -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiqrcode) |
| `y` | property | `@zos/ui.RADIO_GROUP -> radioGroupParam.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `y` | property | `@zos/ui.RADIO_GROUP -> StateButton.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiradio_group) |
| `y` | property | `@zos/ui.SCROLL_LIST -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `y` | property | `@zos/ui.SCROLL_LIST -> TextView.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `y` | property | `@zos/ui.SCROLL_LIST -> ImageView.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiscroll_list) |
| `y` | property | `@zos/ui.setProperty -> PropertyId.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuisetproperty) |
| `y` | property | `@zos/ui.SLIDE_SWITCH -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuislide_switch) |
| `y` | property | `@zos/ui.SPORT_DATA -> Param.y` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuisport_data) |
| `y` | property | `@zos/ui.STROKE_RECT -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuistroke_rect) |
| `y` | property | `@zos/ui.TEXT -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuitext) |
| `y` | property | `@zos/ui.VIEW_CONTAINER -> Param.y` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `y` | property | `hmUI.setProperty -> PropertyId.y` | watchface | not stated | [hmUI](hmUI.md#hmuisetproperty) |
| `y` | property | `hmUI.widget.ARC -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetarc) |
| `y` | property | `hmUI.widget.BUTTON -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetbutton) |
| `y` | property | `hmUI.widget.FILL_RECT -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetfill_rect) |
| `y` | property | `hmUI.widget.IMG -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg) |
| `y` | property | `hmUI.widget.IMG_ANIM -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_anim) |
| `y` | property | `hmUI.widget.IMG_LEVEL -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_level) |
| `y` | property | `hmUI.widget.IMG_POINTER -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_pointer) |
| `y` | property | `hmUI.widget.IMG_PROGRESS -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetimg_progress) |
| `y` | property | `hmUI.widget.STROKE_RECT -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgetstroke_rect) |
| `y` | property | `hmUI.widget.TEXT -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext) |
| `y` | property | `hmUI.widget.TEXT_IMG -> Param.y` | watchface | not stated | [hmUI.widget](hmUI.widget.md#hmuiwidgettext_img) |
| `y1` | property | `@zos/ui.CANVAS -> Param.y1` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y1` | property | `@zos/ui.CANVAS -> Param.y1` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y2` | property | `@zos/ui.CANVAS -> Param.y2` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `y2` | property | `@zos/ui.CANVAS -> Param.y2` | device-app | >= 3 | [zos-ui](zos-ui.md#zosuicanvas) |
| `yawAngle` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.yawAngle` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `yawDistance` | property | `@zos/sensor.Workout.getWorkoutTrackNavInfo -> WorkoutTrackNavInfo.yawDistance` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorworkout) |
| `year` | property | `@zos/ui.PICK_DATE -> getProperty supported Fields.year` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuipick_date) |
| `year` | property | `hmSensor.id.TIME -> time.year` | watchface | not stated | [hmSensor.id](hmSensor.id.md#hmsensoridtime) |
| `YEAR` | property | `@zos/ui.TIME_PICKER -> Property Operations.prop.YEAR` | device-app | >= 3.6 | [zos-ui](zos-ui.md#zosuitime_picker) |
| `yline` | property | `@zos/ui.HISTOGRAM -> Param.yline` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `yoffset` | property | `@zos/page.setScrollMode -> ScrollObj.yoffset` | device-app | >= 2 | [zos-page](zos-page.md#zospagesetscrollmode) |
| `yoffset` | property | `@zos/ui.VIEW_CONTAINER -> FrameParams.yoffset` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |
| `yText` | property | `@zos/ui.HISTOGRAM -> Param.yText` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuihistogram) |
| `z` | property | `@zos/sensor.Accelerometer.getCurrent -> Result.z` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensoraccelerometer) |
| `z` | property | `@zos/sensor.Gyroscope.getCurrent -> Result.z` | device-app | >= 3 | [zos-sensor](zos-sensor.md#zossensorgyroscope) |
| `z_index` | property | `@zos/ui.VIEW_CONTAINER -> Param.z_index` | device-app | >= 2 | [zos-ui](zos-ui.md#zosuiview_container) |

## Names with more than one owner

Listed on their own because this is where a bare name stops being an answer.

- `action` — `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `addEventListener` — `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/ui.addEventListener` (symbol), `hmSensor.addEventListener` (symbol)
- `addListener` — `@zos/ble.addListener` (symbol), `hmBle.addListener` (symbol), `messaging.addListener` (symbol), `settings-storage.addListener` (symbol)
- `age` — `@zos/user.getProfile` (property), `hmSetting.getUserData` (property)
- `ALARM` — `@zos/sensor.Buzzer` (enum value), `@zos/sensor.SystemSounds` (property)
- `align` — `@zos/ui.align` (symbol), `hmUI.align` (symbol), `ui.Text` (property)
- `align_h` — `@zos/ui.KEYBOARD` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.TEXT` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `align_v` — `@zos/ui.TEXT` (property), `hmUI.widget.TEXT` (property)
- `alpha` — `@zos/ui.CANVAS` (property), `@zos/ui.CIRCLE` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.IMG` (property), `@zos/ui.KEYBOARD` (property), `hmUI.widget.CIRCLE` (property)
- `angle` — `@zos/ui.FILL_RECT` (property), `@zos/ui.IMG` (property), `@zos/ui.STROKE_RECT` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_POINTER` (property), `hmUI.widget.STROKE_RECT` (property)
- `anim_complete_call` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_complete_func` — `@zos/page.scrollTo` (property), `@zos/ui.widgetAnimations` (property)
- `anim_duration` — `@zos/page.scrollTo` (property), `@zos/ui.widgetAnimations` (property)
- `anim_ext` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_fps` — `@zos/page.scrollTo` (property), `@zos/ui.IMG_ANIM` (property), `@zos/ui.widgetAnimations` (property), `hmUI.widget.IMG_ANIM` (property)
- `ANIM_IS_PAUSE` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `ANIM_IS_RUNINNG` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `ANIM_IS_STOP` — `@zos/ui.prop` (enum value), `hmUI.prop` (enum value)
- `anim_path` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_prefix` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_rate` — `@zos/page.scrollTo` (property), `@zos/ui.widgetAnimations` (property)
- `anim_repeat` — `@zos/ui.IMG_ANIM` (property), `@zos/ui.widgetAnimations` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_size` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `anim_status` — `@zos/ui.anim_status` (symbol), `@zos/ui.IMG_ANIM` (property), `hmUI.anim_status` (symbol), `hmUI.widget.IMG_ANIM` (property)
- `app` — `@zos/app.getPerformance` (property), `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
- `appid` — `@zos/alarm.set` (property), `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property)
- `appId` — `@zos/app.getPackageInfoById` (property), `@zos/fs.openSync` (property), `@zos/router.checkSystemApp` (property), `@zos/router.launchApp` (property), `@zos/router.setLaunchAppTimeout` (property)
- `ARC` — `@zos/ui.ARC` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.ARC` (symbol)
- `BaseApp` — `@zeppos/zml/base-app.BaseApp` (symbol), `@zeppos/zml/base/base-app.BaseApp` (symbol)
- `BasePage` — `@zeppos/zml/base-page.BasePage` (symbol), `@zeppos/zml/base/base-page.BasePage` (symbol)
- `BaseSideService` — `@zeppos/zml/base-side.BaseSideService` (symbol), `@zeppos/zml/base/base-side.BaseSideService` (symbol)
- `BATTERY` — `@zos/ui.data_type` (enum value), `hmSensor.id` (enum value), `hmSensor.id.BATTERY` (symbol), `hmUI.data_type` (enum value)
- `BODY_TEMP` — `hmSensor.id.BODY_TEMP` (symbol), `hmUI.data_type` (enum value)
- `bold` — `ui.Text` (property), `ui.TextInput` (property)
- `BOTTOM` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `bounce` — `@zos/page.setScrollMode` (property), `@zos/ui.VIEW_CONTAINER` (property)
- `buff` — `hmFS.read` (property), `hmFS.write` (property)
- `buffer` — `@zos/fs.readSync` (property), `@zos/fs.writeSync` (property)
- `build` — `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.Page` (property), `@zos/global.SecondaryWidget` (property)
- `BUTTON` — `@zos/ui.BUTTON` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget` (enum value), `hmUI.widget.BUTTON` (symbol)
- `Buzzer` — `@zos/sensor.Buzzer` (symbol), `@zos/ui.Buzzer` (symbol)
- `callback` — `@zos/app.requestPermission` (property), `@zos/interaction.onDigitalCrown` (property), `@zos/interaction.onGesture` (property), `@zos/interaction.onKey` (property), `@zos/interaction.onWristMotion` (property), `@zos/ui.removeEventListener` (property), `timer.createTimer` (property)
- `cancel` — `@zos/alarm.cancel` (symbol), `@zos/ble/TransferFile.TransferFile` (property), `@zos/notification.cancel` (symbol)
- `CENTER_H` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `CENTER_V` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `center_x` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CIRCLE` (property), `@zos/ui.IMG` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.CIRCLE` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_POINTER` (property)
- `center_y` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CIRCLE` (property), `@zos/ui.IMG` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.CIRCLE` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_POINTER` (property)
- `char_space` — `@zos/ui.TEXT` (property), `hmUI.widget.TEXT` (property)
- `check_func` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `CHECKBOX_GROUP` — `@zos/ui.CHECKBOX_GROUP` (symbol), `@zos/ui.widget` (enum value)
- `checked` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SLIDE_SWITCH` (property), `@zos/ui.SLIDE_SWITCH` (property)
- `CHECKED` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.prop` (enum value), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SLIDE_SWITCH` (property)
- `child` — `@zos/ui.addLayoutChild` (property), `@zos/ui.removeLayoutChild` (property)
- `CIRCLE` — `@zos/ui.CIRCLE` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.CIRCLE` (symbol)
- `city` — `@zos/sensor.WorldClock` (property), `hmSensor.id.WORLD_CLOCK` (property)
- `cityName` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `clear` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member), `@zos/utils.EventBus` (member), `settings-storage.clear` (symbol)
- `click_func` — `@zos/ui.BUTTON` (property), `@zos/ui.KEYBOARD` (property), `hmUI.widget.BUTTON` (property)
- `closeSync` — `@zos/fs.closeSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `color` — `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CIRCLE` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.keyboard` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `hmUI.widget.ARC` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.CIRCLE` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.STROKE_RECT` (property), `hmUI.widget.TEXT` (property), `ui.Button` (property)
- `complete_func` — `@zos/app-service.start` (property), `@zos/app-service.stop` (property)
- `connectStatus` — `@zos/ble.connectStatus` (symbol), `hmBle.connectStatus` (symbol)
- `content` — `@zos/interaction.createModal` (property), `@zos/interaction.showToast` (property), `@zos/notification.notify` (property), `@zos/ui.QRCODE` (property)
- `count` — `@zos/page.setScrollMode` (property), `@zos/sensor.Weather` (property), `@zos/sensor.Weather` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.keyboard` (property), `@zos/utils.EventBus` (member), `hmSensor.id.WEATHER` (property), `hmSensor.id.WEATHER` (property)
- `createChiper` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `createConnect` — `@zos/ble.createConnect` (symbol), `hmBle.createConnect` (symbol)
- `createWidget` — `@zos/ui.createWidget` (symbol), `hmUI.createWidget` (symbol)
- `current` — `@zos/sensor.BodyTemperature` (property), `hmSensor.id.BATTERY` (property), `hmSensor.id.BODY_TEMP` (property), `hmSensor.id.CALORIE` (property), `hmSensor.id.DISTANCE` (property), `hmSensor.id.FAT_BURRING` (property), `hmSensor.id.HEART` (property), `hmSensor.id.SPO2` (property), `hmSensor.id.STAND` (property), `hmSensor.id.STEP` (property), `hmSensor.id.STRESS` (property), `hmSensor.id.WEAR` (property)
- `CYCLE_IMAGE_TEXT_LIST` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (symbol), `@zos/ui.widget` (enum value)
- `CYCLE_LIST` — `@zos/ui.CYCLE_LIST` (symbol), `@zos/ui.widget` (enum value)
- `cycleList` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.CYCLE_LIST` (property)
- `data` — `@zos/app-access.getSportData` (property), `@zos/crypto.AESCrypto` (property), `@zos/crypto.AESCrypto` (property), `@zos/crypto.CRCCrypto` (property), `@zos/crypto.ECDSACrypto` (property), `@zos/crypto.ECDSACrypto` (property), `@zos/fs.writeFileSync` (property), `@zos/sensor.Weather` (property), `@zos/sensor.Weather` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `hmBle.createConnect` (property), `hmBle.send` (property), `hmSensor.id.WEATHER` (property), `hmSensor.id.WEATHER` (property)
- `data_array` — `@zos/ui.CANVAS` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.PICKER` (property), `@zos/ui.SCROLL_LIST` (property)
- `data_count` — `@zos/ui.HISTOGRAM` (property), `@zos/ui.SCROLL_LIST` (property)
- `data_size` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property)
- `data_type` — `@zos/ui.data_type` (symbol), `hmUI.data_type` (symbol)
- `date` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property), `hmUI.date` (symbol)
- `DATE_FORMAT_DMY` — `@zos/settings.DATE_FORMAT_DMY` (symbol), `@zos/settings.getDateFormat` (enum value)
- `DATE_FORMAT_MDY` — `@zos/settings.DATE_FORMAT_MDY` (symbol), `@zos/settings.getDateFormat` (enum value)
- `DATE_FORMAT_YMD` — `@zos/settings.DATE_FORMAT_YMD` (symbol), `@zos/settings.getDateFormat` (enum value)
- `day` — `@zos/ui.PICK_DATE` (property), `hmSensor.id.TIME` (property)
- `DAY` — `@zos/ui.TIME_PICKER` (property), `hmUI.date` (enum value)
- `decrypt` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `degrees` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `delay` — `@zos/alarm.set` (property), `@zos/router.setLaunchAppTimeout` (property), `timer.createTimer` (property)
- `deleteWidget` — `@zos/ui.deleteWidget` (symbol), `hmUI.deleteWidget` (symbol)
- `description` — `ui.Auth` (property), `ui.Section` (property)
- `dev_addr` — `@zos/ble.mstConnect` (property), `@zos/ble.mstStartScan` (property)
- `deviceName` — `@zos/device.getDeviceInfo` (property), `hmSetting.getDeviceInfo` (property)
- `deviceSource` — `@zos/device.getDeviceInfo` (property), `hmSetting.getDeviceInfo` (property)
- `DIALOG` — `@zos/ui.DIALOG` (symbol), `@zos/ui.widget` (enum value)
- `direction` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `disConnect` — `@zos/ble.disConnect` (symbol), `hmBle.disConnect` (symbol)
- `DISTANCE` — `hmSensor.id.DISTANCE` (symbol), `hmUI.data_type` (enum value)
- `DISTANCE_UNIT_IMPERIAL` — `@zos/settings.DISTANCE_UNIT_IMPERIAL` (symbol), `@zos/settings.getDistanceUnit` (enum value)
- `DISTANCE_UNIT_METRIC` — `@zos/settings.DISTANCE_UNIT_METRIC` (symbol), `@zos/settings.getDistanceUnit` (enum value)
- `done_icon` — `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `duration` — `@zos/app-access.getSportData` (enum value), `@zos/ble.mstStartScan` (property), `@zos/display.getSettings` (property), `@zos/display.pauseDropWristScreenOff` (property), `@zos/display.pausePalmScreenOff` (property), `@zos/sensor.HeartRate` (property), `@zos/sensor.Vibrator` (property), `@zos/sensor.Workout` (property), `ui.Toast` (property)
- `ELLIPSIS` — `@zos/ui.text_style` (enum value), `hmUI.text_style` (enum value)
- `encoding` — `@zos/fs.readFileSync` (property), `@zos/fs.writeFileSync` (property)
- `encrypt` — `@zos/crypto.AESCrypto` (member), `@zos/crypto.CRCCrypto` (member), `@zos/crypto.DigestCrypto` (member), `@zos/crypto.ECDSACrypto` (member)
- `end` — `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.SCROLL_LIST` (property)
- `end_angle` — `@zos/ui.ARC` (property), `@zos/ui.CANVAS` (property), `@zos/ui.TEXT` (property), `hmUI.widget.ARC` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.IMG_POINTER` (property)
- `endTime` — `@zos/display.getSettings` (property), `@zos/display.getSettings` (property), `@zos/sensor.Sleep` (property), `hmSensor.id.SLEEP` (property)
- `endYear` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `error` — `@zos/ble/TransferFile.TransferFile` (enum value), `@zos/utils.log` (member)
- `event` — `@zos/ui.addEventListener` (property), `@zos/ui.event` (symbol)
- `event_type` — `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `eventId` — `@zos/ui.addEventListener` (property), `@zos/ui.removeEventListener` (property)
- `exit` — `@zos/app-service.exit` (symbol), `@zos/router.exit` (symbol)
- `fd` — `@zos/fs.closeSync` (property), `@zos/fs.readSync` (property), `@zos/fs.writeSync` (property)
- `file` — `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property), `@zos/app-service.start` (property), `@zos/app-service.start` (property), `@zos/app-service.stop` (property), `@zos/app-service.stop` (property), `@zos/notification.notify` (property)
- `FILE` — `@zos/ble/TransferFile.TransferFile` (enum value), `@zos/media.Player` (property)
- `fileId` — `hmFS.read` (property), `hmFS.seek` (property), `hmFS.write` (property)
- `fileSize` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property)
- `fill_height` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `FILL_RECT` — `@zos/ui.FILL_RECT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.FILL_RECT` (symbol)
- `fill_width` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `flag` — `@zos/fs.openAssetsSync` (property), `@zos/fs.openSync` (property), `@zos/sensor.HeartRate` (property)
- `font` — `@zos/ui.BUTTON` (property), `@zos/ui.TEXT` (property)
- `font_size` — `@zos/ui.PICK_DATE` (property), `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `forecastData` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `format` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `free` — `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
- `FREQ_MODE_HIGH` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_HIGH` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `FREQ_MODE_LOW` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_LOW` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `FREQ_MODE_NORMAL` — `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Accelerometer` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.Compass` (enum value), `@zos/sensor.FREQ_MODE_NORMAL` (symbol), `@zos/sensor.Gyroscope` (enum value), `@zos/sensor.Gyroscope` (enum value)
- `gender` — `@zos/user.getProfile` (property), `hmSetting.getUserData` (property)
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
- `globalData` — `@zos/global.App` (property), `@zos/global.getApp` (property)
- `GRADKIENT_POLYLINE` — `@zos/ui.widget` (enum value), `hmUI.widget.GRADKIENT_POLYLINE` (symbol)
- `GROUP` — `@zos/ui.GROUP` (symbol), `@zos/ui.widget` (enum value)
- `h` — `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.getAppWidgetSize` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GROUP` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.IMG` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.QRCODE` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.setAppWidgetSize` (property), `@zos/ui.setProperty` (property), `@zos/ui.SLIDE_SWITCH` (property), `@zos/ui.SPORT_DATA` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.setProperty` (property), `hmUI.widget.ARC` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.STROKE_RECT` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `h_space` — `@zos/ui.PAGE_INDICATOR` (property), `hmUI.widget.TEXT_IMG` (property)
- `has` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `HEART` — `hmSensor.id.HEART` (symbol), `hmUI.data_type` (enum value)
- `height` — `@zos/device.getDeviceInfo` (property), `@zos/page.setScrollMode` (property), `@zos/ui.getImageInfo` (property), `@zos/ui.getTextLayout` (property), `@zos/user.getProfile` (property), `hmSetting.getDeviceInfo` (property), `hmSetting.getUserData` (property), `ui.Image` (property)
- `high` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `HISTOGRAM` — `@zos/ui.HISTOGRAM` (symbol), `@zos/ui.widget` (enum value)
- `horizontal` — `@zos/ui.PAGE_INDICATOR` (property), `ui.Toast` (property)
- `hour` — `@zos/sensor.Weather` (property), `@zos/sensor.Weather` (property), `@zos/sensor.WorldClock` (property), `@zos/ui.PICK_DATE` (property), `hmSensor.id.TIME` (property), `hmSensor.id.WEATHER` (property), `hmSensor.id.WEATHER` (property), `hmSensor.id.WORLD_CLOCK` (property)
- `id` — `@zos/alarm.cancel` (property), `@zos/ble.mstBuildProfile` (property), `@zos/sensor.Geolocation` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.KEYBOARD` (property), `hmSensor.id` (symbol)
- `IDLE` — `@zos/media.Player` (property), `@zos/media.Recorder` (property)
- `image` — `@zos/ui.CANVAS` (property), `@zos/ui.KEYBOARD` (property)
- `image_array` — `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.IMG_PROGRESS` (property)
- `image_length` — `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.IMG_PROGRESS` (property)
- `IMG` — `@zos/ui.IMG` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.IMG` (symbol)
- `IMG_ANIM` — `@zos/ui.IMG_ANIM` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.IMG_ANIM` (symbol)
- `IMG_LEVEL` — `@zos/ui.widget` (enum value), `hmUI.widget.IMG_LEVEL` (symbol)
- `index` — `@zos/page.swipeToIndex` (property), `@zos/sensor.Weather` (property), `@zos/ui.addLayoutChild` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `hmBle.createConnect` (property), `hmSensor.id.WEATHER` (property)
- `INIT` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.prop` (enum value), `@zos/ui.RADIO_GROUP` (property)
- `initDay` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `initHour` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `initMin` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `initMonth` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `initYear` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `inputType` — `@zos/ui.inputType` (symbol), `@zos/ui.keyboard` (property), `@zos/ui.SYSTEM_KEYBOARD` (property)
- `isFocus` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property)
- `item_bg_color` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `item_click_func` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `item_focus_change_func` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `item_height` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `item_image_x` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property)
- `item_image_y` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property)
- `item_space` — `@zos/ui.HISTOGRAM` (property), `@zos/ui.SCROLL_LIST` (property)
- `item_text_color` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property)
- `item_text_size` — `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property)
- `key` — `@zos/ui.getProperty` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `hmFS.SysProSetBool` (property), `hmFS.SysProSetChars` (property), `hmFS.SysProSetDouble` (property), `hmFS.SysProSetInt` (property), `hmFS.SysProSetInt64` (property), `hmUI.getProperty` (property)
- `KEY_BACK` — `@zos/interaction.KEY_BACK` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_DOWN` — `@zos/interaction.KEY_DOWN` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `key_encrypt` — `@zos/crypto.AESCrypto` (property), `@zos/crypto.DigestCrypto` (property), `@zos/crypto.DigestCrypto` (property), `@zos/crypto.ECDSACrypto` (property)
- `KEY_EVENT_CLICK` — `@zos/interaction.KEY_EVENT_CLICK` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_DOUBLE_CLICK` — `@zos/interaction.KEY_EVENT_DOUBLE_CLICK` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_LONG_PRESS` — `@zos/interaction.KEY_EVENT_LONG_PRESS` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_PRESS` — `@zos/interaction.KEY_EVENT_PRESS` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_EVENT_RELEASE` — `@zos/interaction.KEY_EVENT_RELEASE` (symbol), `@zos/interaction.onKey` (enum value)
- `KEY_HOME` — `@zos/interaction.KEY_HOME` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_SELECT` — `@zos/interaction.KEY_SELECT` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_SHORTCUT` — `@zos/interaction.KEY_SHORTCUT` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `KEY_UP` — `@zos/interaction.KEY_UP` (symbol), `@zos/interaction.onDigitalCrown` (enum value), `@zos/interaction.onKey` (enum value)
- `keyNumber` — `@zos/device.getDeviceInfo` (property), `hmSetting.getDeviceInfo` (property)
- `keyType` — `@zos/device.getDeviceInfo` (property), `@zos/ui.keyboard` (property)
- `label` — `ui.Auth` (property), `ui.Button` (property), `ui.Select` (property), `ui.Slider` (property), `ui.TextImageRow` (property), `ui.TextInput` (property), `ui.Toggle` (property)
- `LEFT` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `len` — `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `hmFS.read` (property), `hmFS.write` (property)
- `length` — `@zos/crypto.AESCrypto` (property), `@zos/crypto.AESCrypto` (property), `@zos/crypto.CRCCrypto` (property), `@zos/crypto.DigestCrypto` (property), `@zos/crypto.DigestCrypto` (property), `@zos/crypto.ECDSACrypto` (property), `@zos/crypto.ECDSACrypto` (property), `@zos/fs.readSync` (property), `@zos/fs.writeSync` (property), `@zos/sensor.Sleep` (property), `settings-storage.length` (symbol)
- `level` — `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.IMG_PROGRESS` (property)
- `line_color` — `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.openInspector` (property), `@zos/ui.SPORT_DATA` (property)
- `line_space` — `@zos/ui.TEXT` (property), `hmUI.widget.TEXT` (property)
- `line_width` — `@zos/ui.ARC` (property), `@zos/ui.CANVAS` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.openInspector` (property), `@zos/ui.STROKE_RECT` (property), `hmUI.widget.ARC` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.STROKE_RECT` (property)
- `list` — `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `LocalStorage` — `@zos/share-storage.LocalStorage` (symbol), `@zos/storage.LocalStorage` (symbol)
- `log` — `@zos/global.console` (member), `@zos/utils.log` (symbol), `@zos/utils.log` (member), `global.console.log` (symbol)
- `low` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `md_content` — `@zos/crypto.DigestCrypto` (property), `@zos/crypto.DigestCrypto` (property)
- `minute` — `@zos/sensor.Weather` (property), `@zos/sensor.Weather` (property), `@zos/sensor.WorldClock` (property), `@zos/ui.PICK_DATE` (property), `hmSensor.id.TIME` (property), `hmSensor.id.WEATHER` (property), `hmSensor.id.WEATHER` (property), `hmSensor.id.WORLD_CLOCK` (property)
- `minutes` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `MODAL_CANCEL` — `@zos/interaction.createModal` (enum value), `@zos/interaction.MODAL_CANCEL` (symbol)
- `MODAL_CONFIRM` — `@zos/interaction.createModal` (enum value), `@zos/interaction.MODAL_CONFIRM` (symbol)
- `mode` — `@zos/page.setScrollMode` (property), `@zos/sensor.Geolocation` (property), `@zos/sensor.Vibrator` (property), `@zos/sensor.Vibrator` (property), `@zos/sensor.Vibrator` (property), `@zos/ui.TEXT` (property)
- `model` — `@zos/display.getSettings` (property), `@zos/display.getSettings` (property), `@zos/sensor.Sleep` (property), `hmSensor.id.SLEEP` (property)
- `modules` — `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property)
- `month` — `@zos/ui.PICK_DATE` (property), `hmSensor.id.TIME` (property)
- `MONTH` — `@zos/ui.TIME_PICKER` (property), `hmUI.date` (enum value)
- `mtime` — `hmFS.stat` (property), `hmFS.stat_asset` (property)
- `music` — `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
- `nb_valid_satellite` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `newPath` — `@zos/fs.renameSync` (property), `hmFS.rename` (property)
- `nickName` — `@zos/user.getProfile` (property), `hmSetting.getUserData` (property)
- `NONE` — `@zos/ui.text_style` (enum value), `hmUI.text_style` (enum value)
- `normal_color` — `@zos/ui.BUTTON` (property), `@zos/ui.PICKER` (property), `hmUI.widget.BUTTON` (property)
- `normal_src` — `@zos/ui.BUTTON` (property), `hmUI.widget.BUTTON` (property)
- `O_APPEND` — `@zos/fs.O_APPEND` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_CREAT` — `@zos/fs.O_CREAT` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_EXCL` — `@zos/fs.O_EXCL` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_RDONLY` — `@zos/fs.O_RDONLY` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_RDWR` — `@zos/fs.O_RDWR` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_TRUNC` — `@zos/fs.O_TRUNC` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `O_WRONLY` — `@zos/fs.O_WRONLY` (symbol), `@zos/fs.openAssetsSync` (enum value), `@zos/fs.openSync` (enum value), `hmFS.open` (enum value), `hmFS.open_asset` (enum value)
- `offChange` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Barometer` (member), `@zos/sensor.Battery` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Calorie` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Distance` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Screen` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member), `@zos/sensor.Stress` (member), `@zos/sensor.Wear` (member)
- `offset` — `@zos/fs.readSync` (property), `@zos/fs.writeSync` (property)
- `oldPath` — `@zos/fs.renameSync` (property), `hmFS.rename` (property)
- `on` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property), `@zos/utils.EventBus` (member)
- `on_page` — `@zos/page.setScrollMode` (property), `@zos/ui.SCROLL_LIST` (property)
- `onChange` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Barometer` (member), `@zos/sensor.Battery` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Calorie` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Distance` (member), `@zos/sensor.FatBurning` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Screen` (member), `@zos/sensor.Stand` (member), `@zos/sensor.Step` (member), `@zos/sensor.Stress` (member), `@zos/sensor.Wear` (member), `ui.Select` (property), `ui.Slider` (property), `ui.TextInput` (property), `ui.Toggle` (property)
- `onClick` — `@zos/interaction.createModal` (property), `@zos/ui.SYSTEM_KEYBOARD` (property), `ui.Button` (property), `ui.View` (property)
- `onDestroy` — `@zos/global.App` (property), `@zos/global.AppService` (property), `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.Page` (property), `@zos/global.SecondaryWidget` (property)
- `onInit` — `@zos/global.AppService` (property), `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.Page` (property), `@zos/global.SecondaryWidget` (property)
- `onPause` — `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.SecondaryWidget` (property)
- `onResume` — `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.SecondaryWidget` (property)
- `openSync` — `@zos/fs.openSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `option` — `@zos/ui.createWidget` (property), `hmUI.createWidget` (property), `timer.createTimer` (property)
- `options` — `@zos/fs.openSync` (property), `@zos/fs.readFileSync` (property), `@zos/fs.readSync` (property), `@zos/fs.writeFileSync` (property), `@zos/fs.writeSync` (property), `@zos/page.setScrollMode` (property), `@zos/ui.getTextLayout` (property), `@zos/ui.openInspector` (property), `ui.Select` (property)
- `pading` — `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property)
- `param` — `@zos/alarm.set` (property), `@zos/app-service.start` (property), `@zos/notification.notify` (property)
- `params` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/router.launchApp` (property), `@zos/router.push` (property), `@zos/router.replace` (property), `@zos/router.setLaunchAppTimeout` (property)
- `path` — `@zos/fs.mkdirSync` (property), `@zos/fs.openAssetsSync` (property), `@zos/fs.openSync` (property), `@zos/fs.readdirSync` (property), `@zos/fs.readFileSync` (property), `@zos/fs.rmSync` (property), `@zos/fs.statAssetsSync` (property), `@zos/fs.statSync` (property), `@zos/fs.writeFileSync` (property)
- `PAUSE` — `@zos/media.Player` (property), `@zos/sensor.Vibrator` (property), `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `peak` — `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property)
- `permission` — `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property)
- `permissions` — `@zos/app.queryPermission` (property), `@zos/app.requestPermission` (property)
- `PICK_DATE` — `@zos/ui.PICK_DATE` (symbol), `@zos/ui.widget` (enum value)
- `picker` — `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `picker_cb` — `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `PLAY` — `@zos/media.Player` (property), `@zos/media.Player` (property)
- `pos` — `hmFS.read` (property), `hmFS.write` (property)
- `pos_x` — `@zos/ui.FILL_RECT` (property), `@zos/ui.IMG` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.widget.IMG` (property)
- `pos_y` — `@zos/ui.FILL_RECT` (property), `@zos/ui.IMG` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.widget.IMG` (property)
- `position` — `@zos/fs.readSync` (property), `@zos/fs.writeSync` (property), `hmFS.seek` (property)
- `PREPARING` — `@zos/media.Player` (property), `@zos/media.Recorder` (property)
- `press_color` — `@zos/ui.BUTTON` (property), `hmUI.widget.BUTTON` (property)
- `press_src` — `@zos/ui.BUTTON` (property), `hmUI.widget.BUTTON` (property)
- `private_key` — `@zos/crypto.AESCrypto` (property), `@zos/crypto.AESCrypto` (property), `@zos/crypto.DigestCrypto` (property), `@zos/crypto.ECDSACrypto` (property), `@zos/crypto.ECDSACrypto` (property)
- `private_key_length` — `@zos/crypto.AESCrypto` (property), `@zos/crypto.ECDSACrypto` (property)
- `prop` — `@zos/ui.prop` (symbol), `hmUI.prop` (symbol)
- `prop.CHECKED` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SLIDE_SWITCH` (property)
- `prop.INIT` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `prop.UNCHECKED` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `propertyId` — `@zos/ui.setProperty` (property), `hmUI.setProperty` (property)
- `pub_key` — `@zos/crypto.ECDSACrypto` (property), `@zos/crypto.ECDSACrypto` (property)
- `putBool` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putDouble` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putInt` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putInt64` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `putString` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member)
- `QRCODE` — `@zos/ui.QRCODE` (symbol), `@zos/ui.widget` (enum value)
- `RADIO_GROUP` — `@zos/ui.RADIO_GROUP` (symbol), `@zos/ui.widget` (enum value)
- `radius` — `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CIRCLE` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.getAppWidgetSize` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `hmUI.widget.ARC` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.CIRCLE` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.STROKE_RECT` (property)
- `radius_x` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `radius_y` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `readFileSync` — `@zos/fs.readFileSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `readSync` — `@zos/fs.readSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `readyState` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property)
- `rect_height` — `@zos/ui.FILL_RECT` (property), `@zos/ui.STROKE_RECT` (property)
- `rect_width` — `@zos/ui.FILL_RECT` (property), `@zos/ui.STROKE_RECT` (property)
- `region` — `@zos/user.getProfile` (property), `hmSetting.getUserData` (property)
- `remove` — `@zos/storage.ShareTypedStorage` (member), `@zos/storage.TypedStorage` (member), `hmFS.remove` (symbol)
- `removeItem` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `settings-storage.removeItem` (symbol)
- `removeListener` — `@zos/ble.removeListener` (symbol), `hmBle.removeListener` (symbol)
- `repeat_count` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property)
- `REPEAT_DAY` — `@zos/alarm.REPEAT_DAY` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_HOUR` — `@zos/alarm.REPEAT_HOUR` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_MINUTE` — `@zos/alarm.REPEAT_MINUTE` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_MONTH` — `@zos/alarm.REPEAT_MONTH` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_ONCE` — `@zos/alarm.REPEAT_ONCE` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_WEEK` — `@zos/alarm.REPEAT_WEEK` (symbol), `@zos/alarm.set` (enum value)
- `REPEAT_YEAR` — `@zos/alarm.REPEAT_YEAR` (symbol), `@zos/alarm.set` (enum value)
- `result` — `@zos/app-service.start` (property), `@zos/app-service.stop` (property), `@zos/ui.getTextLayout` (property), `hmFS.write` (property)
- `RESUME` — `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `RIGHT` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `rows` — `@zos/ui.getTextLayout` (property), `ui.TextInput` (property), `ui.TextInput` (property)
- `SCENE_AOD` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_AOD` (symbol)
- `SCENE_APP` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_APP` (symbol)
- `SCENE_SETTINGS` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_SETTINGS` (symbol)
- `SCENE_WATCHFACE` — `@zos/app.getScene` (enum value), `@zos/app.SCENE_WATCHFACE` (symbol)
- `score` — `@zos/sensor.Sleep` (property), `hmSensor.id.SLEEP` (property)
- `SCREEN_SHAPE_ROUND` — `@zos/device.getDeviceInfo` (enum value), `@zos/device.SCREEN_SHAPE_ROUND` (symbol)
- `SCREEN_SHAPE_SQUARE` — `@zos/device.getDeviceInfo` (enum value), `@zos/device.SCREEN_SHAPE_SQUARE` (symbol)
- `screenShape` — `@zos/device.getDeviceInfo` (property), `hmSetting.getDeviceInfo` (property)
- `SCROLL_ANIMATION_NONE` — `@zos/page.SCROLL_ANIMATION_NONE` (symbol), `@zos/page.swipeToIndex` (enum value)
- `SCROLL_ANIMATION_SMOOTH` — `@zos/page.SCROLL_ANIMATION_SMOOTH` (symbol), `@zos/page.swipeToIndex` (enum value)
- `SCROLL_LIST` — `@zos/ui.SCROLL_LIST` (symbol), `@zos/ui.widget` (enum value)
- `SCROLL_MODE_FREE` — `@zos/page.SCROLL_MODE_FREE` (symbol), `@zos/page.setScrollMode` (enum value)
- `SCROLL_MODE_SWIPER` — `@zos/page.SCROLL_MODE_SWIPER` (symbol), `@zos/page.setScrollMode` (enum value)
- `SCROLL_MODE_SWIPER_HORIZONTAL` — `@zos/page.SCROLL_MODE_SWIPER_HORIZONTAL` (symbol), `@zos/page.setScrollMode` (enum value)
- `second` — `@zos/sensor.Stress` (property), `@zos/sensor.Stress` (property), `hmSensor.id.TIME` (property)
- `seconds` — `@zos/sensor.Geolocation` (property), `@zos/sensor.Geolocation` (property)
- `seek` — `@zos/media.Player` (member), `hmFS.seek` (symbol)
- `select_color` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.PICKER` (property), `@zos/ui.RADIO_GROUP` (property)
- `select_font_size` — `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `select_src` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.RADIO_GROUP` (property)
- `send` — `@zos/ble.send` (symbol), `hmBle.send` (symbol), `messaging.send` (symbol)
- `setBrightness` — `@zos/display.setBrightness` (symbol), `hmSetting.setBrightness` (symbol)
- `setFreqMode` — `@zos/sensor.Accelerometer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Gyroscope` (member)
- `setItem` — `@zos/storage.localStorage` (member), `@zos/storage.localStorage-instance` (member), `@zos/storage.sessionStorage` (member), `@zos/storage.sessionStorage-instance` (member), `@zos/storage.ShareLocalStorage` (member), `settings-storage.setItem` (symbol)
- `setProperty` — `@zos/ui.setProperty` (symbol), `hmUI.setProperty` (symbol)
- `setScreenOff` — `@zos/display.setScreenOff` (symbol), `hmSetting.setScreenOff` (symbol)
- `settingsKey` — `ui.Slider` (property), `ui.TextInput` (property), `ui.Toggle` (property)
- `show` — `@zos/interaction.createModal` (property), `@zos/interaction.createModal` (property), `@zos/ui.createDialog` (property), `@zos/ui.KEYBOARD` (property)
- `SHOW` — `@zos/ui.DIALOG` (property), `@zos/ui.prop` (enum value)
- `size` — `@zos/fs.statAssetsSync` (property), `@zos/fs.statSync` (property), `hmBle.createConnect` (property), `hmBle.send` (property), `hmFS.stat` (property), `hmFS.stat_asset` (property)
- `SLEEP` — `hmSensor.id.SLEEP` (symbol), `hmUI.data_type` (enum value)
- `SLIDE_SWITCH` — `@zos/ui.SLIDE_SWITCH` (symbol), `@zos/ui.widget` (enum value)
- `space` — `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property)
- `speed` — `@zos/app-access.getSportData` (enum value), `@zos/display.getSettings` (property)
- `SPO2` — `hmSensor.id.SPO2` (symbol), `hmUI.data_type` (enum value)
- `SPORT_DATA` — `@zos/ui.SPORT_DATA` (symbol), `@zos/ui.widget` (enum value)
- `src` — `@zos/interaction.createModal` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.IMG` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_POINTER` (property), `ui.Image` (property)
- `STAND` — `hmSensor.id.STAND` (symbol), `hmUI.data_type` (enum value)
- `start` — `@zos/app-service.start` (symbol), `@zos/crypto.DigestCrypto` (member), `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/sensor.Accelerometer` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Buzzer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Sleep` (property), `@zos/sensor.Sleep` (property), `@zos/sensor.SystemSounds` (member), `@zos/sensor.Vibrator` (member), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.SCROLL_LIST` (property), `hmSensor.id.SLEEP` (property)
- `START` — `@zos/media.Recorder` (property), `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `start_angle` — `@zos/ui.ARC` (property), `@zos/ui.CANVAS` (property), `@zos/ui.TEXT` (property), `hmUI.widget.ARC` (property), `hmUI.widget.ARC_PROGRESS` (property), `hmUI.widget.IMG_POINTER` (property)
- `STARTING` — `@zos/media.Player` (property), `@zos/media.Recorder` (property)
- `startTime` — `@zos/display.getSettings` (property), `@zos/display.getSettings` (property), `@zos/sensor.Sleep` (property), `@zos/sensor.Workout` (property), `hmSensor.id.SLEEP` (property)
- `startYear` — `@zos/ui.PICK_DATE` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property)
- `state` — `@zos/global.AppService` (property), `@zos/global.AppWidget` (property), `@zos/global.DataWidget` (property), `@zos/global.getCurrentPage` (property), `@zos/global.Page` (property), `@zos/global.SecondaryWidget` (property)
- `statSync` — `@zos/fs.statSync` (symbol), `@zos/share-storage.FileSystem` (member)
- `status` — `@zos/display.getSettings` (property), `hmBle.addListener` (property)
- `step` — `@zos/ui.IMG_ANIM` (property), `hmUI.widget.IMG_ANIM` (property), `ui.Slider` (property)
- `STEP` — `hmSensor.id.STEP` (symbol), `hmUI.data_type` (enum value)
- `stop` — `@zos/app-service.stop` (symbol), `@zos/media.Player` (member), `@zos/media.Recorder` (member), `@zos/sensor.Accelerometer` (member), `@zos/sensor.BloodOxygen` (member), `@zos/sensor.Buzzer` (member), `@zos/sensor.Compass` (member), `@zos/sensor.Geolocation` (member), `@zos/sensor.Gyroscope` (member), `@zos/sensor.Sleep` (property), `@zos/sensor.Sleep` (property), `@zos/sensor.SystemSounds` (member), `@zos/sensor.Vibrator` (member), `hmSensor.id.SLEEP` (property)
- `STOP` — `@zos/media.Player` (property), `@zos/media.Recorder` (property), `@zos/ui.anim_status` (enum value), `hmUI.anim_status` (enum value)
- `stopTimer` — `@zos/timer.stopTimer` (symbol), `timer.stopTimer` (symbol)
- `stress` — `@zos/sensor.Stress` (property), `@zos/sensor.Stress` (property)
- `STRESS` — `hmSensor.id.STRESS` (symbol), `hmUI.data_type` (enum value)
- `STROKE_RECT` — `@zos/ui.STROKE_RECT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.STROKE_RECT` (symbol)
- `style` — `@zos/display.getSettings` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.updateLayoutStyle` (property), `ui.Button` (property), `ui.Image` (property), `ui.Section` (property), `ui.Text` (property), `ui.View` (property)
- `subtitle` — `@zos/interaction.createModal` (property), `@zos/ui.PICKER` (property)
- `sunrise` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `sunset` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `system` — `@zos/app.getPerformance` (property), `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
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
- `target` — `@zos/ui.PAGE_SCROLLBAR` (property), `hmSensor.id.CALORIE` (property), `hmSensor.id.FAT_BURRING` (property), `hmSensor.id.STAND` (property), `hmSensor.id.STEP` (property)
- `TEMPERATURE_UNIT_CENTIGRADE` — `@zos/settings.getTemperatureUnit` (enum value), `@zos/settings.TEMPERATURE_UNIT_CENTIGRADE` (symbol)
- `TEMPERATURE_UNIT_FAHRENHEIT` — `@zos/settings.getTemperatureUnit` (enum value), `@zos/settings.TEMPERATURE_UNIT_FAHRENHEIT` (symbol)
- `text` — `@zos/interaction.createModal` (property), `@zos/notification.notify` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.DIALOG` (property), `@zos/ui.DIALOG` (property), `@zos/ui.getTextLayout` (property), `@zos/ui.getTextLayout` (property), `@zos/ui.keyboard` (property), `@zos/ui.keyboard` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.SYSTEM_KEYBOARD` (property), `@zos/ui.TEXT` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `TEXT` — `@zos/ui.prop` (enum value), `@zos/ui.TEXT` (symbol), `@zos/ui.widget` (enum value), `hmUI.widget.TEXT` (symbol)
- `text_size` — `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.getTextLayout` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SPORT_DATA` (property), `@zos/ui.TEXT` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.TEXT` (property)
- `text_style` — `@zos/ui.TEXT` (property), `@zos/ui.text_style` (symbol), `hmUI.text_style` (symbol), `hmUI.widget.TEXT` (property)
- `text_w` — `@zos/ui.BUTTON` (property), `@zos/ui.SPORT_DATA` (property)
- `tideData` — `@zos/sensor.Weather` (property), `hmSensor.id.WEATHER` (property)
- `time` — `@zos/alarm.set` (property), `@zos/sensor.BloodOxygen` (property), `@zos/sensor.BloodOxygen` (property), `@zos/sensor.BodyTemperature` (property), `@zos/sensor.HeartRate` (property), `@zos/sensor.HeartRate` (property), `@zos/sensor.Stress` (property), `hmSensor.id.SPO2` (property), `hmSensor.id.STRESS` (property)
- `TIME` — `hmSensor.id` (enum value), `hmSensor.id.TIME` (symbol)
- `TIME_FORMAT_12` — `@zos/settings.getTimeFormat` (enum value), `@zos/settings.TIME_FORMAT_12` (symbol)
- `TIME_FORMAT_24` — `@zos/settings.getTimeFormat` (enum value), `@zos/settings.TIME_FORMAT_24` (symbol)
- `TIME_HOUR_FORMAT_12` — `@zos/sensor.Time` (enum value), `@zos/sensor.TIME_HOUR_FORMAT_12` (symbol)
- `TIME_HOUR_FORMAT_24` — `@zos/sensor.Time` (enum value), `@zos/sensor.TIME_HOUR_FORMAT_24` (symbol)
- `timestamp` — `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property)
- `timeZoneHour` — `@zos/sensor.WorldClock` (property), `hmSensor.id.WORLD_CLOCK` (property)
- `timeZoneMinute` — `@zos/sensor.WorldClock` (property), `hmSensor.id.WORLD_CLOCK` (property)
- `title` — `@zos/interaction.createModal` (property), `@zos/notification.notify` (property), `@zos/ui.createDialog` (property), `@zos/ui.PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.updateStatusBarTitle` (property), `hmSensor.id.MUSIC` (property), `ui.Auth` (property), `ui.Section` (property), `ui.Select` (property)
- `TOP` — `@zos/ui.align` (enum value), `hmUI.align` (enum value)
- `total` — `@zos/app.getPerformance` (property), `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
- `type` — `@zos/app-access.getSportData` (property), `@zos/ble/TransferFile.TransferFile` (property), `@zos/ble/TransferFile.TransferFile` (property), `@zos/interaction.createModal` (property), `@zos/interaction.onWristMotion` (property), `@zos/page.setScrollMode` (property), `@zos/sensor.Vibrator` (property), `@zos/sensor.Workout` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.TIME_PICKER` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.widget.IMG_POINTER` (property), `hmUI.widget.TEXT_IMG` (property)
- `type_id` — `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property)
- `TypedStorage` — `@zos/share-storage.TypedStorage` (symbol), `@zos/storage.TypedStorage` (symbol)
- `UNCHECKED` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.RADIO_GROUP` (property)
- `unselect_color` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.RADIO_GROUP` (property)
- `unselect_src` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.RADIO_GROUP` (property)
- `update` — `@zos/crypto.DigestCrypto` (member), `@zos/sensor.Workout` (property)
- `UPDATE_DATA` — `@zos/ui.PICKER` (property), `@zos/ui.prop` (enum value)
- `url` — `@zos/alarm.set` (property), `@zos/router.launchApp` (property), `@zos/router.push` (property), `@zos/router.replace` (property), `@zos/router.setLaunchAppTimeout` (property)
- `use_color` — `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.RADIO_GROUP` (property)
- `used` — `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property), `@zos/app.getPerformance` (property)
- `utc` — `@zos/router.setLaunchAppTimeout` (property), `hmSensor.id.TIME` (property)
- `uuid` — `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstBuildProfile` (property), `@zos/ble.mstStartScan` (property), `@zos/device.getDeviceInfo` (property)
- `val` — `@zos/sensor.HeartRate` (property), `@zos/ui.setProperty` (property), `hmFS.SysProSetBool` (property), `hmFS.SysProSetChars` (property), `hmFS.SysProSetDouble` (property), `hmFS.SysProSetInt` (property), `hmFS.SysProSetInt64` (property), `hmUI.setProperty` (property)
- `value` — `@zos/sensor.BloodOxygen` (property), `@zos/sensor.Stress` (property), `@zos/ui.KEYBOARD` (property), `ui.Select` (property), `ui.Select` (property), `ui.Slider` (property), `ui.TextInput` (property), `ui.Toggle` (property)
- `VIEW_CONTAINER` — `@zos/ui.VIEW_CONTAINER` (symbol), `@zos/ui.widget` (enum value)
- `VIRTUAL_CONTAINER` — `@zos/ui.VIRTUAL_CONTAINER` (symbol), `@zos/ui.widget` (enum value)
- `visible` — `@zos/ui.setStatusBarVisible` (property), `ui.Toast` (property)
- `VISIBLE` — `@zos/ui.prop` (enum value), `@zos/ui.setProperty` (property), `hmUI.setProperty` (property)
- `w` — `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.getAppWidgetSize` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GROUP` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.IMG` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.PICK_DATE` (property), `@zos/ui.QRCODE` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.setProperty` (property), `@zos/ui.SLIDE_SWITCH` (property), `@zos/ui.SPORT_DATA` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.setProperty` (property), `hmUI.widget.ARC` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.STROKE_RECT` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `watchface` — `@zos/device.getDiskInfo` (property), `hmSetting.getDiskInfo` (property)
- `WEEK_FRI` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_FRI` (symbol)
- `WEEK_MON` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_MON` (symbol)
- `WEEK_SAT` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_SAT` (symbol)
- `WEEK_SUN` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_SUN` (symbol)
- `WEEK_THU` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_THU` (symbol)
- `WEEK_TUE` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_TUE` (symbol)
- `WEEK_WED` — `@zos/alarm.set` (enum value), `@zos/alarm.WEEK_WED` (symbol)
- `weight` — `@zos/user.addHealthData` (property), `@zos/user.getProfile` (property), `hmSetting.getUserData` (property)
- `WEIGHT_UNIT_JIN` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_JIN` (symbol)
- `WEIGHT_UNIT_KILOGRAM` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_KILOGRAM` (symbol)
- `WEIGHT_UNIT_POUND` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_POUND` (symbol)
- `WEIGHT_UNIT_STONE` — `@zos/settings.getWeightUnit` (enum value), `@zos/settings.WEIGHT_UNIT_STONE` (symbol)
- `widget` — `@zos/ui.createWidget` (property), `@zos/ui.widget` (symbol), `hmUI.createWidget` (property), `hmUI.widget` (symbol)
- `widgetId` — `@zos/ui.createWidget` (property), `hmUI.createWidget` (property)
- `width` — `@zos/device.getDeviceInfo` (property), `@zos/page.setScrollMode` (property), `@zos/ui.getImageInfo` (property), `@zos/ui.getTextLayout` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `hmSetting.getDeviceInfo` (property), `ui.Image` (property)
- `WRIST_MOTION_FLIP` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_FLIP` (symbol)
- `WRIST_MOTION_LIFT` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_LIFT` (symbol)
- `WRIST_MOTION_LOWER` — `@zos/interaction.onWristMotion` (enum value), `@zos/interaction.WRIST_MOTION_LOWER` (symbol)
- `x` — `@zos/sensor.Accelerometer` (property), `@zos/sensor.Gyroscope` (property), `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GROUP` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.IMG` (property), `@zos/ui.IMG_ANIM` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.PICK_DATE` (property), `@zos/ui.QRCODE` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.setProperty` (property), `@zos/ui.SLIDE_SWITCH` (property), `@zos/ui.SPORT_DATA` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.setProperty` (property), `hmUI.widget.ARC` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_ANIM` (property), `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.IMG_POINTER` (property), `hmUI.widget.IMG_PROGRESS` (property), `hmUI.widget.STROKE_RECT` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `x1` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `x2` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `y` — `@zos/page.scrollTo` (property), `@zos/sensor.Accelerometer` (property), `@zos/sensor.Gyroscope` (property), `@zos/ui.ARC` (property), `@zos/ui.BUTTON` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CHECKBOX_GROUP` (property), `@zos/ui.CYCLE_IMAGE_TEXT_LIST` (property), `@zos/ui.CYCLE_LIST` (property), `@zos/ui.FILL_RECT` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GRADIENT_POLYLINE` (property), `@zos/ui.GROUP` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.HISTOGRAM` (property), `@zos/ui.IMG` (property), `@zos/ui.IMG_ANIM` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.KEYBOARD` (property), `@zos/ui.PAGE_INDICATOR` (property), `@zos/ui.PICK_DATE` (property), `@zos/ui.QRCODE` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.RADIO_GROUP` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.SCROLL_LIST` (property), `@zos/ui.setProperty` (property), `@zos/ui.SLIDE_SWITCH` (property), `@zos/ui.SPORT_DATA` (property), `@zos/ui.STROKE_RECT` (property), `@zos/ui.TEXT` (property), `@zos/ui.VIEW_CONTAINER` (property), `hmUI.setProperty` (property), `hmUI.widget.ARC` (property), `hmUI.widget.BUTTON` (property), `hmUI.widget.FILL_RECT` (property), `hmUI.widget.IMG` (property), `hmUI.widget.IMG_ANIM` (property), `hmUI.widget.IMG_LEVEL` (property), `hmUI.widget.IMG_POINTER` (property), `hmUI.widget.IMG_PROGRESS` (property), `hmUI.widget.STROKE_RECT` (property), `hmUI.widget.TEXT` (property), `hmUI.widget.TEXT_IMG` (property)
- `y1` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `y2` — `@zos/ui.CANVAS` (property), `@zos/ui.CANVAS` (property)
- `year` — `@zos/ui.PICK_DATE` (property), `hmSensor.id.TIME` (property)
- `yoffset` — `@zos/page.setScrollMode` (property), `@zos/ui.VIEW_CONTAINER` (property)
- `z` — `@zos/sensor.Accelerometer` (property), `@zos/sensor.Gyroscope` (property)

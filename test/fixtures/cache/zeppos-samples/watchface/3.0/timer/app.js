import { getScene, SCENE_AOD } from '@zos/app'

App({
  globalData: {},
  onCreate() {
    if (getScene() === SCENE_AOD) {
      // always-on display branch
    }
  },
})

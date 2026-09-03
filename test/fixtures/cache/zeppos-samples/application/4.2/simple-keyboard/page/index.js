import {
  keyboard,
  createWidget,
  widget as idOfWidget,
  deleteWidget,
} from "@zos/ui";

import { px } from "@zos/utils";
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from "@zos/device";

Page({
  build() {
    const info = getDeviceInfo();
    createWidget(idOfWidget.TEXT, { text: px(info.width) });
    deleteWidget(keyboard);
  },
});

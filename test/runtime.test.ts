import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { runtimeForPath } from "../src/parse/runtime.js";

// The runtime axis is read from the path, so these cases *are* the axis. Each one
// is anchored to a directory that exists in the upstream repos — see the doc
// references in src/parse/runtime.ts.

describe("runtimeForPath (docs)", () => {
  it("maps each reference API tree to its own runtime", () => {
    assert.equal(
      runtimeForPath("zeppos-docs/docs/reference/device-app-api/newAPI/router/back.mdx"),
      "device-app",
    );
    assert.equal(runtimeForPath("zeppos-docs/docs/reference/side-service-api/fetch.mdx"), "side-service");
    assert.equal(runtimeForPath("zeppos-docs/docs/reference/app-settings-api/ui/button.mdx"), "settings");
    assert.equal(runtimeForPath("zeppos-docs/docs/watchface/api/hmSensor/createSensor.mdx"), "watchface");
  });

  it("treats static/llms as the Device App API it restructures", () => {
    assert.equal(runtimeForPath("zeppos-docs/static/llms/@zos-router.md"), "device-app");
  });

  it("never reads a module directory as a runtime", () => {
    // Under docs/ a directory is a module name, not an app part. `@zos/settings`
    // is the device-side system-settings reader and `@zos/app-service` runs on the
    // watch; both were being filed under the phone-side dir names they share.
    assert.equal(
      runtimeForPath("zeppos-docs/docs/reference/device-app-api/newAPI/settings/getLanguage.mdx"),
      "device-app",
    );
    assert.equal(
      runtimeForPath("zeppos-docs/docs/reference/device-app-api/newAPI/app-service/start.mdx"),
      "device-app",
    );
  });

  it("attributes no runtime to pages that describe config or devices", () => {
    // app.json and the device list belong to every runtime and to none.
    assert.equal(runtimeForPath("zeppos-docs/docs/reference/app-json.mdx"), undefined);
    assert.equal(
      runtimeForPath("zeppos-docs/docs/reference/related-resources/device-list.mdx"),
      undefined,
    );
    assert.equal(runtimeForPath("zeppos-docs/docs/guides/architecture/arc.mdx"), undefined);
  });
});

describe("runtimeForPath (samples)", () => {
  it("maps each app-type tree to its runtime", () => {
    assert.equal(runtimeForPath("zeppos-samples/application/2.0/calories/page/index.js"), "device-app");
    assert.equal(runtimeForPath("zeppos-samples/watchface/3.0/timer/app.js"), "watchface");
    assert.equal(
      runtimeForPath("zeppos-samples/workout-extensions/3.5/running-pace-master/data-widget/common/index.js"),
      "workout-extension",
    );
  });

  it("treats everything else inside a Mini Program as device-side", () => {
    // folder-structure.mdx lists page/, app.js, app-widget/ and secondary-widget/
    // as running on the watch, so the app tree's default is the device.
    for (const file of [
      "zeppos-samples/application/2.0/calories/app.js",
      "zeppos-samples/application/3.0/notification/app-service/index.js",
      "zeppos-samples/application/3.0/download/components/mask/index.js",
      "zeppos-samples/application/4.2/t9-keyboard/pages/guidelines.js",
      "zeppos-samples/application/2.0/showcase/secondary-widget/index.js",
    ]) {
      assert.equal(runtimeForPath(file), "device-app", file);
    }
  });

  it("sends the two phone-side directories to the phone, whatever the app type", () => {
    // app-side/ is the Side Service dir and setting/ the Settings App dir; both run
    // in the Zepp App. A workout extension can ship a Side Service of its own, so
    // this has to beat the app-type tree rather than lose to it.
    assert.equal(
      runtimeForPath("zeppos-samples/application/2.0/post-health-data/MiniProgram/app-side/index.js"),
      "side-service",
    );
    assert.equal(
      runtimeForPath("zeppos-samples/application/2.0/post-health-data/MiniProgram/setting/index.js"),
      "settings",
    );
    assert.equal(
      runtimeForPath(
        "zeppos-samples/workout-extensions/3.5/running-pace-master-with-side-service/app-side/index.js",
      ),
      "side-service",
    );
  });

  it("matches the singular setting/ only, the name folder-structure.mdx uses", () => {
    // A plural `settings/` helper dir inside a device app is not the Settings App.
    assert.equal(
      runtimeForPath("zeppos-samples/application/3.0/showcase/settings/theme.js"),
      "device-app",
    );
  });

  it("attributes no runtime to a tree it does not recognize", () => {
    // post-health-data ships a Node.js backend under Server/ — not a Zepp OS runtime.
    assert.equal(runtimeForPath("zeppos-samples/README.md"), undefined);
    assert.equal(runtimeForPath("some-other-repo/application/page/index.js"), undefined);
  });
});

describe("runtimeForPath (portability)", () => {
  it("reads a path built with the host separator", () => {
    // parse hands over `path.relative(...)` output, which is backslashed on Windows.
    const hostPath = path.join("zeppos-samples", "watchface", "3.0", "timer", "app.js");

    assert.equal(runtimeForPath(hostPath), "watchface");
  });
});

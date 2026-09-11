import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { render } from "../src/render/index.js";

// Renders against a temp symbols dir so the test never touches real data/.
async function writeFixture(modules: Record<string, unknown>): Promise<{ symbols: string; out: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "render-"));
  const symbols = path.join(root, "symbols");
  const out = path.join(root, "out");
  await mkdir(symbols, { recursive: true });
  for (const [slug, value] of Object.entries(modules)) {
    await writeFile(path.join(symbols, `${slug}.json`), JSON.stringify(value));
  }
  return { symbols, out };
}

const routerRecord = {
  id: "@zos/router.back",
  module: "@zos/router",
  symbol: "back",
  type: "function",
  description: "Closes the current page.",
  minApiLevel: 2,
  runtimes: [],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/device-app-api/newAPI/router/back.mdx",
  extractedAt: "2026-09-03",
};

// routerRecord ships `runtimes: []` (the axis before this stage populated it);
// deviceRecord is the same record once a source path attributed a runtime to it.
const deviceRecord = { ...routerRecord, runtimes: ["device-app"] };

describe("render", () => {
  it("writes one api page and one compatibility page per module", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [routerRecord] },
    });

    const counts = await render(symbols, out);

    // `devices: 0` because no device file is passed; test/devices.test.ts covers that.
    assert.deepEqual(counts, { modules: 1, runtimes: 5, devices: 0, names: 1, annotations: 0 });

    const apiFiles = await readdir(path.join(out, "api"));
    const compatFiles = await readdir(path.join(out, "compatibility"));
    assert.deepEqual(apiFiles.sort(), ["index.md", "lookup.md", "zos-router.md"]);
    assert.deepEqual(compatFiles.sort(), ["index.md", "zos-router.md"]);
  });

  it("api page lists symbol metadata in a deterministic table", async () => {
    const { symbols, out } = await writeFixture({
      "zos-idle": {
        module: "@zos/idle",
        symbols: [
          {
            ...routerRecord,
            id: "@zos/idle.setIdleTimerSecond",
            module: "@zos/idle",
            symbol: "setIdleTimerSecond",
            minApiLevel: 3,
          },
          {
            ...routerRecord,
            id: "@zos/idle.wakeUp",
            module: "@zos/idle",
            symbol: "wakeUp",
            minApiLevel: undefined,
            description: undefined,
          },
        ],
      },
    });

    await render(symbols, out);
    const content = await readFile(path.join(out, "api", "zos-idle.md"), "utf-8");

    assert.match(content, /^# @zos\/idle$/m);
    assert.match(content, /`setIdleTimerSecond` \| function \| >= 3 \| OFFICIAL/);
    assert.match(content, /`wakeUp` \| function \| not stated \| OFFICIAL/);
    assert.doesNotMatch(content, /\| any \|/);
    assert.match(content, /### `@zos\/idle.setIdleTimerSecond`/);
    assert.match(content, /Closes the current page\./);
  });

  it("renders the signature and its property tables", async () => {
    // The gap both eval runs called root: the base said a symbol exists and
    // never how to call it. `(props: Props)` is unusable without `Props`.
    const { symbols, out } = await writeFixture({
      ui: {
        module: "ui",
        symbols: [
          {
            ...routerRecord,
            id: "ui.Select",
            module: "ui",
            symbol: "Select",
            minApiLevel: undefined,
            description: undefined,
            signature: "(props: Props) => result: RenderFunc",
            shapes: [
              {
                name: "Props",
                props: [
                  { name: "options", type: "Array<SelectOption>", required: false, description: "select options" },
                  { name: "multiple", type: "boolean", required: true, default: "false" },
                ],
              },
              { name: "SelectOption", props: [{ name: "value", type: "string" }] },
            ],
          },
        ],
      },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "ui.md"), "utf-8");

    assert.match(page, /```ts\n\(props: Props\) => result: RenderFunc\n```/);
    assert.match(page, /\*\*Props\*\*/);
    assert.match(page, /`options` \| `Array<SelectOption>` \| no \| — \| select options/);
    assert.match(page, /`multiple` \| `boolean` \| yes \| `false`/);
    assert.match(page, /\*\*SelectOption\*\*/, "the shape the signature refers to");
  });

  it("adds a per-property API_LEVEL column only where a table states one", async () => {
    // A symbol available at one level can have a property that is not, and most
    // tables have no such column at all.
    const { symbols, out } = await writeFixture({
      "zos-alarm": {
        module: "@zos/alarm",
        symbols: [
          {
            ...routerRecord,
            id: "@zos/alarm.cancel",
            module: "@zos/alarm",
            symbol: "cancel",
            shapes: [{ name: "Option", props: [{ name: "id", type: "number", apiLevel: 3 }] }],
          },
          {
            ...routerRecord,
            id: "@zos/alarm.set",
            module: "@zos/alarm",
            symbol: "set",
            shapes: [{ name: "Option", props: [{ name: "time", type: "number" }] }],
          },
        ],
      },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "zos-alarm.md"), "utf-8");

    assert.match(page, /\| Property \| Type \| Required \| Default \| Min API_LEVEL \| Description \|/);
    assert.match(page, /`id` \| `number` \| not stated \| — \| >= 3 \|/);
    assert.match(page, /\| Property \| Type \| Required \| Default \| Description \|/);
  });

  it("compatibility page groups symbols by stated API_LEVEL and flags uncovered ones", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": {
        module: "@zos/router",
        symbols: [
          routerRecord, // minApiLevel 2
          {
            ...routerRecord,
            id: "@zos/router.home",
            module: "@zos/router",
            symbol: "home",
            minApiLevel: 3,
          },
          {
            ...routerRecord,
            id: "@zos/router.exit",
            module: "@zos/router",
            symbol: "exit",
            minApiLevel: undefined,
            description: undefined,
          },
        ],
      },
    });

    await render(symbols, out);
    const content = await readFile(path.join(out, "compatibility", "zos-router.md"), "utf-8");

    assert.match(content, /## API_LEVEL 2/);
    assert.match(content, /`@zos\/router.back`/);
    assert.match(content, /## API_LEVEL 3/);
    assert.match(content, /`@zos\/router.home`/);
    assert.match(content, /## No stated API_LEVEL/);
    assert.match(content, /`@zos\/router.exit`/);
    assert.match(content, /Absence means \*not stated\*, not \*any\* level\./);
  });

  it("a rerun produces identical output (idempotent)", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [routerRecord] },
    });

    await render(symbols, out);
    const apiFirst = await readFile(path.join(out, "api", "zos-router.md"), "utf-8");

    await render(symbols, out);
    const apiSecond = await readFile(path.join(out, "api", "zos-router.md"), "utf-8");

    assert.equal(apiFirst, apiSecond);
  });

  it("indexes every module and inverts the API_LEVEL axis", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [routerRecord] },
      "zos-idle": {
        module: "@zos/idle",
        symbols: [
          { ...routerRecord, id: "@zos/idle.wakeUp", module: "@zos/idle", symbol: "wakeUp", minApiLevel: undefined },
        ],
      },
    });

    await render(symbols, out);

    const apiIndex = await readFile(path.join(out, "api", "index.md"), "utf-8");
    assert.match(apiIndex, /\*\*2 modules, 2 symbols\*\*/);
    assert.match(apiIndex, /`@zos\/idle` \| 1 \| 0 \| \[zos-idle\.md\]\(zos-idle\.md\)/);
    assert.match(apiIndex, /`@zos\/router` \| 1 \| 1 \| \[zos-router\.md\]\(zos-router\.md\)/);

    const compatIndex = await readFile(path.join(out, "compatibility", "index.md"), "utf-8");
    assert.match(compatIndex, /## API_LEVEL 2\n\n- `@zos\/router` — 1 symbols/);
    assert.match(compatIndex, /## No stated API_LEVEL\n/);
    assert.match(compatIndex, /- `@zos\/idle` — 1 symbols/);
  });

  it("keeps a curated README but drops a page whose module disappeared", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [routerRecord] },
    });

    await render(symbols, out);
    await writeFile(path.join(out, "api", "README.md"), "curated by hand\n", "utf-8");
    await writeFile(path.join(out, "api", "zos-gone.md"), "stale\n", "utf-8");

    await render(symbols, out);

    const apiFiles = (await readdir(path.join(out, "api"))).sort();
    assert.deepEqual(apiFiles, ["README.md", "index.md", "lookup.md", "zos-router.md"]);
    assert.equal(await readFile(path.join(out, "api", "README.md"), "utf-8"), "curated by hand\n");
  });

  it("writes a page for every runtime, not only the covered ones", async () => {
    // A missing page reads like "this runtime does not exist". The KB's whole
    // stance is that absence is coverage, so every runtime gets a page.
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [deviceRecord] },
    });

    await render(symbols, out);

    assert.deepEqual((await readdir(path.join(out, "runtimes"))).sort(), [
      "device-app.md",
      "index.md",
      "settings.md",
      "side-service.md",
      "watchface.md",
      "workout-extension.md",
    ]);
  });

  it("states the gap on an uncovered runtime page instead of staying silent", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [deviceRecord] },
    });

    await render(symbols, out);
    const content = await readFile(path.join(out, "runtimes", "settings.md"), "utf-8");

    assert.match(content, /^# Settings App — runtime$/m);
    assert.match(content, /\*\*No symbols are attributed to this runtime\.\*\*/);
    assert.match(content, /\*not covered\*, never \*does not exist\*/);
  });

  it("runtime page groups symbols by module and names the other runtimes", async () => {
    const { symbols, out } = await writeFixture({
      "zos-ui": {
        module: "@zos/ui",
        symbols: [
          { ...deviceRecord, id: "@zos/ui.createWidget", module: "@zos/ui", symbol: "createWidget", runtimes: ["device-app", "watchface"] },
          { ...deviceRecord, id: "@zos/ui.deleteWidget", module: "@zos/ui", symbol: "deleteWidget", minApiLevel: undefined },
        ],
      },
    });

    await render(symbols, out);
    const content = await readFile(path.join(out, "runtimes", "device-app.md"), "utf-8");

    assert.match(content, /\*\*2 symbols across 1 modules\.\*\*/);
    assert.match(content, /## `@zos\/ui`/);
    assert.match(content, /`createWidget` \| >= 2 \| Watchface/);
    assert.match(content, /`deleteWidget` \| not stated \| —/);

    // The same symbol appears on the watchface page, pointing back the other way.
    const watchface = await readFile(path.join(out, "runtimes", "watchface.md"), "utf-8");
    assert.match(watchface, /`createWidget` \| >= 2 \| Device App/);
    assert.doesNotMatch(watchface, /deleteWidget/);
  });

  it("runtime index flags the uncovered runtimes and the unattributed symbols", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": {
        module: "@zos/router",
        symbols: [
          deviceRecord,
          { ...deviceRecord, id: "@zos/router.home", symbol: "home", runtimes: [] },
        ],
      },
    });

    await render(symbols, out);
    const index = await readFile(path.join(out, "runtimes", "index.md"), "utf-8");

    assert.match(index, /\| Device App \| 1 \| 1 \| \[device-app\.md\]\(device-app\.md\) \|/);
    assert.match(index, /\| Side Service \| 0 \| 0 \| \[side-service\.md\]\(side-service\.md\) — \*\*not covered\*\* \|/);
    assert.match(index, /## No runtime attributed/);
    assert.match(index, /1 of 2 symbols came from a path no runtime rule covers\./);
    assert.match(index, /- `@zos\/router.home`/);
  });

  it("lists a multi-runtime symbol once on the index", async () => {
    const { symbols, out } = await writeFixture({
      "zos-ui": {
        module: "@zos/ui",
        symbols: [
          { ...deviceRecord, id: "@zos/ui.createWidget", module: "@zos/ui", symbol: "createWidget", runtimes: ["device-app", "watchface"] },
        ],
      },
    });

    await render(symbols, out);
    const index = await readFile(path.join(out, "runtimes", "index.md"), "utf-8");

    assert.match(index, /## Valid in more than one runtime/);
    assert.match(index, /- `@zos\/ui.createWidget` — Device App, Watchface/);
    assert.doesNotMatch(index, /## No runtime attributed/);
  });

  it("names the offending file when a symbols file is not a module file", async () => {
    const { symbols, out } = await writeFixture({});
    await writeFile(path.join(symbols, "manifest.json"), JSON.stringify({ lastSyncAt: "2026-09-03" }), "utf-8");

    await assert.rejects(render(symbols, out), /manifest\.json: not a module file/);
  });

  it("refuses to write when two modules map to the same slug", async () => {
    const { symbols, out } = await writeFixture({
      "a": { module: "@zos/ble", symbols: [routerRecord] },
      "b": { module: "@zos-ble", symbols: [routerRecord] },
    });

    await assert.rejects(render(symbols, out), /slug collision/);
  });
});

describe("render lookup", () => {
  it("answers a bare name with its owner, which is what the eval asked for", async () => {
    // "Where does `setInterval` live?" cost three file reads: every other index
    // here is keyed by module, level or runtime — by where a thing sits rather
    // than by what it is called. An agent reading someone else's code arrives
    // with a bare name and nothing else.
    const { symbols, out } = await writeFixture({
      "zos-global": { module: "@zos/global", symbols: [{ ...deviceRecord, id: "@zos/global.setInterval", module: "@zos/global", symbol: "setInterval" }] },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "lookup.md"), "utf-8");

    assert.match(page, /\| `setInterval` \| symbol \| `@zos\/global\.setInterval` \|/);
  });

  it("indexes an instance member and an enum value, not only symbols", async () => {
    // The two kinds of name that were indexed nowhere. `getCurrent` is not
    // importable and `CENTER_H` is not a symbol, and both are what a reader
    // actually has in hand.
    const { symbols, out } = await writeFixture({
      "zos-ui": {
        module: "@zos/ui",
        symbols: [
          {
            ...deviceRecord,
            id: "@zos/ui.align",
            module: "@zos/ui",
            symbol: "align",
            enums: [
              { name: "align", qualified: true, members: [{ value: "CENTER_H", confidence: "OFFICIAL" }] },
            ],
          },
          {
            ...deviceRecord,
            id: "@zos/ui.Sensor",
            module: "@zos/ui",
            symbol: "Sensor",
            members: [{ name: "getCurrent" }],
          },
        ],
      },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "lookup.md"), "utf-8");

    assert.match(page, /\| `CENTER_H` \| enum value \| `align\.CENTER_H` \|/);
    assert.match(page, /\| `getCurrent` \| member \| `@zos\/ui\.Sensor\.getCurrent\(\)` \|/);
  });

  it("leaves a bare numeric domain out of the name index", async () => {
    // `retCode` runs 0..10 and the weather `index` 0..28. Nobody looks up
    // "where does `4` live", and indexing them put `0` in here with eleven
    // owners.
    const { symbols, out } = await writeFixture({
      "zos-sensor": {
        module: "@zos/sensor",
        symbols: [
          {
            ...deviceRecord,
            id: "@zos/sensor.BloodOxygen",
            module: "@zos/sensor",
            symbol: "BloodOxygen",
            enums: [
              {
                name: "retCode",
                qualified: false,
                members: [{ value: "0", confidence: "OFFICIAL" }, { value: "1", confidence: "OFFICIAL" }],
              },
            ],
          },
        ],
      },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "lookup.md"), "utf-8");

    assert.doesNotMatch(page, /^\| `0` \|/m);
    assert.match(page, /\| `BloodOxygen` \| symbol \|/);
  });

  it("indexes a dotted name under its last segment too", async () => {
    // `console.log` is titled that way on the Side Service page because that is
    // how it is written. Someone searching `log` has to find it.
    const { symbols, out } = await writeFixture({
      global: { module: "global", symbols: [{ ...deviceRecord, id: "global.console.log", module: "global", symbol: "console.log" }] },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "lookup.md"), "utf-8");

    assert.match(page, /\| `console\.log` \| symbol \|/);
    assert.match(page, /\| `log` \| symbol \|/);
  });
});

describe("render module relatives", () => {
  it("points a module at the namespace that continues it, and back", async () => {
    // What an eval run cost: it opened `api/hmSensor.md`, saw `id` as a bare
    // constant, and reported "nothing documents what a Step sensor returns" as
    // the base's worst gap — while `api/hmSensor.id.md` stated `current` and
    // `target` one file away, with no link between them. Two requirements were
    // downgraded over a missing cross-reference.
    const { symbols, out } = await writeFixture({
      hmSensor: {
        module: "hmSensor",
        symbols: [{ ...deviceRecord, id: "hmSensor.id", module: "hmSensor", symbol: "id" }],
      },
      "hmSensor.id": {
        module: "hmSensor.id",
        symbols: [
          { ...deviceRecord, id: "hmSensor.id.STEP", module: "hmSensor.id", symbol: "STEP" },
          { ...deviceRecord, id: "hmSensor.id.HEART", module: "hmSensor.id", symbol: "HEART" },
        ],
      },
    });

    await render(symbols, out);
    const parent = await readFile(path.join(out, "api", "hmSensor.md"), "utf-8");
    const child = await readFile(path.join(out, "api", "hmSensor.id.md"), "utf-8");

    assert.match(parent, /\*\*Also in this namespace:\*\* \[`hmSensor\.id`\]\(hmSensor\.id\.md\) \(2 symbols\)/);
    assert.match(child, /Part of \[`hmSensor`\]\(hmSensor\.md\)/);
  });

  it("links the symbol that is itself the namespace", async () => {
    // The precise row the run stopped at. The module-level line at the top is
    // not enough: a reader who has scrolled to the symbol needs it there.
    const { symbols, out } = await writeFixture({
      hmSensor: {
        module: "hmSensor",
        symbols: [
          {
            ...deviceRecord,
            id: "hmSensor.id",
            module: "hmSensor",
            symbol: "id",
            description: "Sensor ids.",
          },
        ],
      },
      "hmSensor.id": {
        module: "hmSensor.id",
        symbols: [{ ...deviceRecord, id: "hmSensor.id.STEP", module: "hmSensor.id", symbol: "STEP" }],
      },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "hmSensor.md"), "utf-8");

    assert.match(page, /Its 1 values, and the shape each one returns, are in \[`hmSensor\.id`\]/);
  });

  it("recognises a slash as a namespace separator too", async () => {
    // `@zos/ble/TransferFile` is an importable submodule, where `hmSensor.id`
    // is a global namespace. Both continue a module's name.
    const { symbols, out } = await writeFixture({
      "zos-ble": {
        module: "@zos/ble",
        symbols: [{ ...deviceRecord, id: "@zos/ble.send", module: "@zos/ble", symbol: "send" }],
      },
      "zos-ble-TransferFile": {
        module: "@zos/ble/TransferFile",
        symbols: [
          {
            ...deviceRecord,
            id: "@zos/ble/TransferFile.getInbox",
            module: "@zos/ble/TransferFile",
            symbol: "getInbox",
          },
        ],
      },
    });

    await render(symbols, out);
    const parent = await readFile(path.join(out, "api", "zos-ble.md"), "utf-8");

    assert.match(parent, /Also in this namespace:.*zos-ble-TransferFile\.md/);
  });

  it("says nothing on a module with no relatives", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [deviceRecord] },
    });

    await render(symbols, out);
    const page = await readFile(path.join(out, "api", "zos-router.md"), "utf-8");

    assert.doesNotMatch(page, /Also in this namespace|Part of/);
  });
});

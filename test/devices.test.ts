import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { enrichDevices } from "../src/enrich/index.js";
import { deviceSlug, parseDevices } from "../src/parse/devices.js";
import { render } from "../src/render/index.js";
import type { DeviceRecord, RawDevice } from "../src/types.js";

const CACHE = path.join(import.meta.dirname, "fixtures", "cache");

const byName = async () => new Map((await parseDevices(CACHE)).map((d) => [d.name, d]));

describe("parseDevices", () => {
  it("reads both tables and flags which one runs Zepp OS", async () => {
    // The second table is headed "Non-Zepp OS Devices" and has different columns.
    const devices = await parseDevices(CACHE);

    assert.equal(devices.length, 7);
    assert.equal(devices.filter((d) => d.runsZeppOs).length, 5);
    assert.equal(devices.filter((d) => !d.runsZeppOs).length, 2);
  });

  it("parses a CRLF file, like the one a Windows checkout produces", async () => {
    const device = (await byName()).get("Amazfit Balance 3");

    assert.equal(device?.latestApiLevel, 4.4);
    assert.equal(device?.latestOsVersion, "5.0");
  });

  it("leaves the API_LEVEL absent when the table says `-`", async () => {
    // Every Zepp OS 1.0 device. `-` is *not stated*; reading it as 0 would claim
    // the device runs every symbol whose minimum is 0 or more, i.e. all of them.
    const device = (await byName()).get("Amazfit GTS 4 mini");

    assert.equal(device?.latestApiLevel, undefined);
    assert.equal(device?.latestOsVersion, "1.0", "the OS version is stated even so");
    assert.equal(device?.runsZeppOs, true, "it is in the Zepp OS table, just on 1.0");
  });

  it("splits deviceSource ids and marks the Mainland China ones", async () => {
    const device = (await byName()).get("Amazfit Bip 6");

    assert.deepEqual(device?.deviceSources, [
      { id: "9765120", mainlandChina: true },
      { id: "9765121", mainlandChina: false },
    ]);
  });

  it("reads all three screen shapes, band included", async () => {
    const devices = await byName();

    assert.equal(devices.get("Amazfit Balance 3")?.screen.shape, "round");
    assert.equal(devices.get("Amazfit Bip 6")?.screen.shape, "square");
    assert.equal(devices.get("Amazfit Band 7")?.screen.shape, "band");
  });

  it("reads resolution and the radius only where stated", async () => {
    const devices = await byName();

    assert.deepEqual(devices.get("Amazfit Bip 6")?.screen, {
      shape: "square",
      radius: 86,
      width: 390,
      height: 450,
    });
    // Round screens have no corner radius, so the cell is `-`.
    assert.equal(devices.get("Amazfit Balance 3")?.screen.radius, undefined);
    assert.deepEqual(devices.get("Amazfit Bip 6")?.watchfacePreview, { width: 266, height: 307 });
  });

  it("tells YES, NO and `-` apart for SecondaryWidget", async () => {
    const devices = await byName();

    assert.equal(devices.get("Amazfit Bip 6")?.secondaryWidget, true);
    assert.equal(devices.get("Amazfit Balance 3")?.secondaryWidget, false);
    assert.equal(
      devices.get("Amazfit Band 7")?.secondaryWidget,
      undefined,
      "`-` states nothing, which is not the same as NO",
    );
  });

  it("leaves physicalKeys absent when the cell is `-`", async () => {
    assert.equal((await byName()).get("Amazfit Band 7")?.physicalKeys, undefined);
  });

  it("resolves columns by header name, so the narrower table still parses", async () => {
    // The Non-Zepp OS table has no API_LEVEL column and calls the radius column
    // "Screen radius" rather than "Screen radius size". Matching by position
    // would have filed a resolution as an API_LEVEL.
    const device = (await byName()).get("Zepp E (Square)");

    assert.equal(device?.runsZeppOs, false);
    assert.equal(device?.latestApiLevel, undefined);
    assert.equal(device?.latestOsVersion, undefined);
    assert.deepEqual(device?.screen, { shape: "square", radius: 60, width: 348, height: 442 });
    assert.deepEqual(device?.deviceSources, [
      { id: "61", mainlandChina: false },
      { id: "82", mainlandChina: false },
    ]);
  });

  it("keeps the device name verbatim", () => {
    // Upstream is inconsistent about the "Amazfit" prefix, so normalizing would
    // invent names that match no official document.
    assert.equal(deviceSlug("Amazfit T-Rex 3 Pro (44mm)"), "amazfit-t-rex-3-pro-44mm");
    assert.equal(deviceSlug("Zepp E (Round)"), "zepp-e-round");
  });
});

describe("enrichDevices", () => {
  const raw = (overrides: Partial<RawDevice> = {}): RawDevice => ({
    name: "Amazfit Bip 6",
    latestApiLevel: 4.2,
    latestOsVersion: "5.0",
    deviceSources: [{ id: "9765120", mainlandChina: true }],
    screen: { shape: "square", radius: 86, width: 390, height: 450 },
    physicalKeys: 2,
    watchfacePreview: { width: 266, height: 307 },
    secondaryWidget: true,
    runsZeppOs: true,
    sourceFile: path.join("zeppos-docs", "docs", "reference", "related-resources", "device-list.mdx"),
    ...overrides,
  });

  it("adds the slug and normalizes the path to posix", () => {
    const [record] = enrichDevices([raw()]);

    assert.equal(record.slug, "amazfit-bip-6");
    assert.equal(record.originalPath, "zeppos-docs/docs/reference/related-resources/device-list.mdx");
    assert.equal(record.source, "docs-device-list");
    assert.equal(record.confidence, "OFFICIAL");
  });

  it("sorts by name, not by API_LEVEL, so an update cannot reorder the JSON", () => {
    const records = enrichDevices([
      raw({ name: "Zepp E", latestApiLevel: undefined }),
      raw({ name: "Amazfit Bip 6", latestApiLevel: 4.2 }),
      raw({ name: "Amazfit Balance 3", latestApiLevel: 4.4 }),
    ]);

    assert.deepEqual(
      records.map((r) => r.name),
      ["Amazfit Balance 3", "Amazfit Bip 6", "Zepp E"],
    );
  });
});

const device = (overrides: Partial<DeviceRecord> = {}): DeviceRecord => ({
  name: "Amazfit Bip 6",
  slug: "amazfit-bip-6",
  latestApiLevel: 4.2,
  latestOsVersion: "5.0",
  deviceSources: [{ id: "9765120", mainlandChina: true }],
  screen: { shape: "square", radius: 86, width: 390, height: 450 },
  physicalKeys: 2,
  watchfacePreview: { width: 266, height: 307 },
  secondaryWidget: true,
  runsZeppOs: true,
  source: "docs-device-list",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/related-resources/device-list.mdx",
  extractedAt: "2026-09-04",
  ...overrides,
});

const symbol = (id: string, minApiLevel: number | undefined) => ({
  id,
  module: id.slice(0, id.lastIndexOf(".")),
  symbol: id.slice(id.lastIndexOf(".") + 1),
  type: "function",
  minApiLevel,
  runtimes: ["device-app"],
  source: "docs-reference",
  confidence: "OFFICIAL",
  originalPath: "zeppos-docs/docs/reference/x.mdx",
  extractedAt: "2026-09-04",
});

async function fixture(devices: DeviceRecord[], symbols: Record<string, unknown>) {
  const root = await mkdtemp(path.join(os.tmpdir(), "render-devices-"));
  const symbolsDir = path.join(root, "symbols");
  await mkdir(symbolsDir, { recursive: true });
  for (const [slug, value] of Object.entries(symbols)) {
    await writeFile(path.join(symbolsDir, `${slug}.json`), JSON.stringify(value));
  }
  const devicesFile = path.join(root, "devices.json");
  await writeFile(devicesFile, JSON.stringify(devices));
  return { symbolsDir, devicesFile, out: path.join(root, "out") };
}

const twoSymbols = {
  "zos-router": {
    module: "@zos/router",
    symbols: [symbol("@zos/router.back", 2), symbol("@zos/router.push", 4)],
  },
};

describe("render devices", () => {
  it("counts the symbols a device's API_LEVEL actually reaches", async () => {
    // The join that makes the device list worth extracting: a level on its own
    // does not tell a developer whether their app ships.
    const { symbolsDir, devicesFile, out } = await fixture(
      [device({ name: "Old", slug: "old", latestApiLevel: 2 }), device()],
      twoSymbols,
    );

    const counts = await render(symbolsDir, out, devicesFile);
    assert.deepEqual(counts, { modules: 1, runtimes: 5, devices: 2 });

    const page = await readFile(path.join(out, "compatibility", "devices.md"), "utf-8");
    assert.match(page, /\| Amazfit Bip 6 \| 4\.2 \| 5\.0 \| 2 of 2 \|/);
    assert.match(page, /\| Old \| 2 \| 5\.0 \| 1 of 2 \|/);
  });

  it("puts a device with no stated level in its own section, not at zero", async () => {
    const { symbolsDir, devicesFile, out } = await fixture(
      [device({ name: "GTS 4 mini", slug: "gts-4-mini", latestApiLevel: undefined, latestOsVersion: "1.0" })],
      twoSymbols,
    );

    await render(symbolsDir, out, devicesFile);
    const page = await readFile(path.join(out, "compatibility", "devices.md"), "utf-8");

    assert.match(page, /## Zepp OS 1\.0 devices — no API_LEVEL/);
    assert.match(page, /\*\*no symbol\s+here is available\*\*/);
    assert.doesNotMatch(page, /GTS 4 mini \| 0 \|/, "a missing level must never render as 0");
  });

  it("keeps non-Zepp OS hardware, stating that nothing applies to it", async () => {
    const { symbolsDir, devicesFile, out } = await fixture(
      [device({ name: "Amazfit GTR 2", slug: "amazfit-gtr-2", runsZeppOs: false, latestApiLevel: undefined })],
      twoSymbols,
    );

    await render(symbolsDir, out, devicesFile);
    const page = await readFile(path.join(out, "compatibility", "devices.md"), "utf-8");

    assert.match(page, /## Devices that do not run Zepp OS/);
    assert.match(page, /Amazfit GTR 2/);
  });

  it("marks the Mainland China deviceSource without breaking the table", async () => {
    const { symbolsDir, devicesFile, out } = await fixture([device()], twoSymbols);

    await render(symbolsDir, out, devicesFile);
    const page = await readFile(path.join(out, "compatibility", "devices.md"), "utf-8");

    assert.match(page, /`9765120`\\\*/, "the asterisk is escaped so it is not read as emphasis");
  });

  it("names the hardware that reaches each level on the compatibility index", async () => {
    const { symbolsDir, devicesFile, out } = await fixture(
      [device({ name: "Old", slug: "old", latestApiLevel: 2 }), device()],
      twoSymbols,
    );

    await render(symbolsDir, out, devicesFile);
    const index = await readFile(path.join(out, "compatibility", "index.md"), "utf-8");

    assert.match(index, /## API_LEVEL 2\n\nReached by 2 of 2 devices/);
    assert.match(index, /## API_LEVEL 4\n\nReached by 1 of 2 devices/);
  });

  it("says so when no device reaches a level", async () => {
    const { symbolsDir, devicesFile, out } = await fixture([device({ latestApiLevel: 2 })], {
      "zos-router": { module: "@zos/router", symbols: [symbol("@zos/router.future", 9)] },
    });

    await render(symbolsDir, out, devicesFile);
    const index = await readFile(path.join(out, "compatibility", "index.md"), "utf-8");

    assert.match(index, /\*\*No device in the device list reaches this level\.\*\*/);
  });

  it("renders compatibility/ unchanged when no device file is given", async () => {
    const { symbolsDir, out } = await fixture([device()], twoSymbols);

    const counts = await render(symbolsDir, out);

    assert.deepEqual(counts, { modules: 1, runtimes: 5, devices: 0 });
    const index = await readFile(path.join(out, "compatibility", "index.md"), "utf-8");
    assert.doesNotMatch(index, /Reached by/);
    assert.doesNotMatch(index, /devices\.md/);
  });

  it("refuses to write when a module would claim the devices page slug", async () => {
    // No `@zos/*` id slugs to "devices" today — `@zos/devices` would be
    // `zos-devices` — so this guards the unscoped case, the same way the
    // `index.md` guard does. Cheap, and it fails loudly instead of overwriting
    // the generated device page with a module page.
    const { symbolsDir, devicesFile, out } = await fixture([device()], {
      devices: { module: "devices", symbols: [symbol("devices.x", 2)] },
    });

    await assert.rejects(render(symbolsDir, out, devicesFile), /slug collision/);
  });

  it("names the file when the device JSON is not a device list", async () => {
    const { symbolsDir, devicesFile, out } = await fixture([device()], twoSymbols);
    await writeFile(devicesFile, JSON.stringify({ nope: true }), "utf-8");

    await assert.rejects(render(symbolsDir, out, devicesFile), /not a device list/);
  });
});

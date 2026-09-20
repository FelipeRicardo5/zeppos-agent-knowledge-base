import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { before, describe, it } from "node:test";
import { check } from "../src/check/index.js";
import { loadBase } from "../src/mcp/base.js";
import type { Base } from "../src/mcp/base.js";

// `check`, which is the eval's scoring criterion applied by machine.
//
// The contract under test is the three-way verdict. A boolean would have to
// call a working app either approved — certifying what this base cannot — or
// broken, which is a lie about code that runs. Every official sample passes
// with zero violations and still carries symbols nothing here can speak to, so
// the middle outcome is not an edge case, it is the normal one.

let base: Base;

before(async () => {
  base = await loadBase(".");
});

/** A minimal app on disk, so the checker reads files rather than fixtures. */
async function app(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "check-"));
  for (const [file, content] of Object.entries(files)) {
    const full = path.join(root, file);
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, content);
  }
  return root;
}

const MANIFEST = (extra: Record<string, unknown> = {}) =>
  JSON.stringify({
    app: { appType: "app" },
    configVersion: "v2",
    permissions: [],
    runtime: { apiVersion: { minVersion: "3.0", target: "3.0", compatible: "3.0" } },
    targets: { gt: { module: { page: { pages: ["page/index"] } }, platforms: [] } },
    ...extra,
  });

describe("check", () => {
  it("reports a symbol used in a runtime it is not attributed to", async () => {
    // A Settings App file importing a Device App sensor. Runtime attribution
    // comes from the source path of the record, never from page prose.
    const root = await app({
      "app.json": MANIFEST(),
      "setting/index.js": `import { HeartRate } from '@zos/sensor'\nnew HeartRate()\n`,
    });

    const report = await check(root, base);
    const violation = report.findings.find(
      (f) => f.status === "VIOLATION" && f.rule === "runtime",
    );

    assert.ok(violation, "a Device App sensor in a settings file is a contradiction");
    assert.equal(violation.subject, "@zos/sensor.HeartRate");
    assert.equal(violation.file, "setting/index.js");
    assert.equal(violation.line, 1);
  });

  it("reports a permission a symbol demands and the manifest omits", async () => {
    const root = await app({
      "app.json": MANIFEST(),
      "page/index.js": `import { set } from '@zos/alarm'\nset({})\n`,
    });

    const report = await check(root, base);
    const violation = report.findings.find(
      (f) => f.status === "VIOLATION" && f.rule === "permission",
    );

    assert.ok(violation, "@zos/alarm.set states a permission code");
    assert.match(violation.detail, /fails at runtime on the device, not at build/);
  });

  it("says nothing about a permission once it is declared", async () => {
    const root = await app({
      "app.json": MANIFEST({ permissions: ["device:os.alarm"] }),
      "page/index.js": `import { set } from '@zos/alarm'\nset({})\n`,
    });

    const report = await check(root, base);

    assert.equal(
      report.findings.filter((f) => f.status === "VIOLATION" && f.rule === "permission").length,
      0,
    );
  });

  it("calls an uncovered symbol unverifiable, never a violation", async () => {
    // The distinction the whole base rests on. A missing record means not
    // covered; treating it as an error would make the checker accuse working
    // code of using an API that exists.
    const root = await app({
      "app.json": MANIFEST(),
      "page/index.js": `import { somethingNobodyDocumented } from '@zos/ui'\n`,
    });

    const report = await check(root, base);
    const finding = report.findings.find((f) => f.subject.endsWith("somethingNobodyDocumented"));

    assert.ok(finding);
    assert.equal(finding.status, "UNVERIFIABLE");
    assert.match(finding.detail, /Not covered, never non-existent/);
  });

  it("cannot establish a ceiling from targets alone, and says so", async () => {
    // Real manifests name hardware two ways and only `deviceSource` joins: the
    // 27 distinct target keys across the samples match zero devices.
    const root = await app({
      "app.json": MANIFEST(),
      "page/index.js": `import { createWidget } from '@zos/ui'\n`,
    });

    const report = await check(root, base);
    const finding = report.findings.find(
      (f) => f.rule === "api-level" && f.subject === "targets",
    );

    assert.ok(finding);
    assert.equal(finding.status, "UNVERIFIABLE");
    assert.match(finding.detail, /deviceSource/);
  });

  it("checks against the weakest device a manifest actually resolves to", async () => {
    const device = base.devices.find(
      (d) => d.latestApiLevel !== undefined && d.deviceSources.length > 0,
    );
    assert.ok(device?.latestApiLevel !== undefined);

    const root = await app({
      "app.json": MANIFEST({
        targets: {
          gt: {
            module: { page: { pages: ["page/index"] } },
            platforms: [{ deviceSource: Number(device.deviceSources[0].id) }],
          },
        },
      }),
      "page/index.js": `import { createWidget } from '@zos/ui'\n`,
    });

    const report = await check(root, base);
    const levelled = report.findings.filter((f) => f.rule === "api-level" && f.file);

    assert.ok(levelled.length > 0, "a resolved device gives every import a verdict");
    assert.ok(levelled.every((f) => f.detail.includes(device.name) || f.status === "UNVERIFIABLE"));
  });

  it("reports the official samples with no violation and something unverifiable", async () => {
    // The measurement the three-way verdict exists for: these apps ship and
    // work, and this base still cannot vouch for all of them.
    const report = await check(".cache/zeppos-samples/application/2.0/calories", base);

    assert.equal(report.counts.VIOLATION, 0);
    assert.ok(report.counts.VOUCHED > 0);
    assert.ok(report.counts.UNVERIFIABLE > 0, "no violation is not approval");
  });

  it("states what it did not look at, in every report", async () => {
    const root = await app({ "app.json": MANIFEST() });
    const report = await check(root, base);

    const said = report.notChecked.join(" ");
    assert.match(said, /Whether the code compiles or runs/);
    assert.match(said, /receiver's type is never resolved/);
    assert.ok(report.notChecked.length >= 4);
  });

  it("reports a missing manifest rather than throwing", async () => {
    const root = await app({ "page/index.js": "// nothing\n" });
    const report = await check(root, base);

    const finding = report.findings.find((f) => f.rule === "manifest");
    assert.equal(finding?.status, "VIOLATION");
    assert.match(finding.detail, /No readable app\.json/);
  });
});

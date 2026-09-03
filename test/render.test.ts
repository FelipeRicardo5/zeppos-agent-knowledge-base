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

describe("render", () => {
  it("writes one api page and one compatibility page per module", async () => {
    const { symbols, out } = await writeFixture({
      "zos-router": { module: "@zos/router", symbols: [routerRecord] },
    });

    const counts = await render(symbols, out);

    assert.deepEqual(counts, { api: 1, compat: 1 });

    const apiFiles = await readdir(path.join(out, "api"));
    const compatFiles = await readdir(path.join(out, "compatibility"));
    assert.deepEqual(apiFiles, ["zos-router.md"]);
    assert.deepEqual(compatFiles, ["zos-router.md"]);
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
    assert.match(content, /`wakeUp` \| function \| any \| OFFICIAL/);
    assert.match(content, /### `@zos\/idle.setIdleTimerSecond`/);
    assert.match(content, /Closes the current page\./);
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
});

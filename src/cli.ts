import {
  enrich,
  enrichAppJson,
  enrichDevices,
  enrichExamples,
  enrichPatterns,
} from "./enrich/index.js";
import { fetchSources } from "./fetch/index.js";
import { parseDevices } from "./parse/devices.js";
import { parseExamples } from "./parse/examples.js";
import { parseAppJson } from "./parse/manifest.js";
import { parseLlmsContent, parseMarkdown, parseSamples } from "./parse/index.js";
import { parsePatterns } from "./parse/patterns.js";
import { parsePhoneApis } from "./parse/phone.js";
import { render } from "./render/index.js";
import { renderExamples } from "./render/examples.js";
import { renderManifest } from "./render/manifest.js";
import { renderPatterns } from "./render/patterns.js";
import {
  writeAppJson,
  writeDevices,
  writeExamples,
  writeManifest,
  writePatterns,
  writeSymbols,
} from "./store/index.js";
import path from "node:path";

const CACHE_DIR = ".cache";
const DATA_DIR = "data";
const OUT_DIR = ".";

const command = process.argv[2];

switch (command) {
  case "sync": {
    const results = await fetchSources(CACHE_DIR);
    for (const [name, { commit }] of Object.entries(results)) {
      console.log(`${name}: ${commit}`);
    }

    const [docs, phone, llms, samples, guides, hardware, apps, appJson] = await Promise.all([
      parseMarkdown(CACHE_DIR),
      parsePhoneApis(CACHE_DIR),
      parseLlmsContent(CACHE_DIR),
      parseSamples(CACHE_DIR),
      parsePatterns(CACHE_DIR),
      parseDevices(CACHE_DIR),
      parseExamples(CACHE_DIR),
      parseAppJson(CACHE_DIR),
    ]);
    console.log(
      `parsed: ${docs.length} docs-reference, ${phone.length} phone-api, ${llms.length} llms, ${samples.length} sample usages, ${guides.length} guides, ${hardware.length} devices, ${apps.length} sample apps, ${appJson[0]?.sections.length ?? 0} app.json keys`,
    );

    const records = enrich([...docs, ...phone, ...llms, ...samples]);
    const official = records.filter((r) => r.confidence === "OFFICIAL").length;
    const observed = records.filter((r) => r.confidence === "OBSERVED").length;
    console.log(`enriched: ${records.length} symbols (${official} OFFICIAL, ${observed} OBSERVED)`);

    const patterns = enrichPatterns(guides);
    const patternSymbols = new Set(patterns.flatMap((p) => p.symbols));
    console.log(`enriched: ${patterns.length} patterns (${patternSymbols.size} distinct symbols used)`);

    const devices = enrichDevices(hardware);
    const onZeppOs = devices.filter((d) => d.runsZeppOs && d.latestApiLevel !== undefined).length;
    console.log(
      `enriched: ${devices.length} devices (${onZeppOs} running Zepp OS with a stated API_LEVEL)`,
    );

    const moduleCount = await writeSymbols(records, DATA_DIR);
    const patternCount = await writePatterns(patterns, DATA_DIR);
    const examples = enrichExamples(apps, records);
    const snippets = examples.reduce(
      (n, e) =>
        n +
        e.usages.reduce((m, u) => m + u.snippets.length, 0) +
        e.memberCalls.reduce((m, c) => m + c.snippets.length, 0),
      0,
    );
    console.log(`enriched: ${examples.length} sample apps (${snippets} cited code excerpts)`);

    const manifestSchema = enrichAppJson(appJson);
    const gapCount = manifestSchema[0]?.gaps.length ?? 0;
    console.log(
      `enriched: ${manifestSchema.length} app.json schema (${gapCount} keys named but never described)`,
    );

    const deviceCount = await writeDevices(devices, DATA_DIR);
    const manifestKeyCount = await writeAppJson(manifestSchema, DATA_DIR);
    const exampleCount = await writeExamples(examples, DATA_DIR);
    await writeManifest(
      {
        lastSyncAt: new Date().toISOString(),
        sources: results,
        recordCounts: {
          "docs-reference": docs.length,
          "docs-phone-api": phone.length,
          llms: llms.length,
          sample: samples.length,
          guide: guides.length,
          symbols: records.length,
          modules: moduleCount,
          patterns: patternCount,
          devices: deviceCount,
          examples: exampleCount,
          "app-json": manifestKeyCount,
        },
      },
      DATA_DIR,
    );
    console.log(
      `wrote: ${moduleCount} module files, ${patternCount} patterns, ${exampleCount} examples, ${deviceCount} devices under ${DATA_DIR}/`,
    );
    break;
  }
  case "render": {
    const symbolsDir = path.join(DATA_DIR, "symbols");
    const { modules, runtimes, devices } = await render(
      symbolsDir,
      OUT_DIR,
      path.join(DATA_DIR, "devices.json"),
    );
    const { patterns } = await renderPatterns(path.join(DATA_DIR, "patterns"), symbolsDir, OUT_DIR);
    const { examples } = await renderExamples(path.join(DATA_DIR, "examples"), symbolsDir, OUT_DIR);
    const { manifestKeys } = await renderManifest(
      path.join(DATA_DIR, "app-json.json"),
      path.join(DATA_DIR, "examples"),
      symbolsDir,
      OUT_DIR,
    );
    console.log(
      `rendered: ${modules} modules, ${devices} devices, ${runtimes} runtimes, ${patterns} patterns, ${examples} examples, ${manifestKeys} app.json keys (plus an index in each)`,
    );
    break;
  }
  default:
    console.error(`Unknown command: ${command}. Use "sync" or "render".`);
    process.exit(1);
}

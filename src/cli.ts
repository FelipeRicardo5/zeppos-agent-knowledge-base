import { enrich, enrichDevices, enrichPatterns } from "./enrich/index.js";
import { fetchSources } from "./fetch/index.js";
import { parseDevices } from "./parse/devices.js";
import { parseLlmsContent, parseMarkdown, parseSamples } from "./parse/index.js";
import { parsePatterns } from "./parse/patterns.js";
import { render } from "./render/index.js";
import { renderPatterns } from "./render/patterns.js";
import { writeDevices, writeManifest, writePatterns, writeSymbols } from "./store/index.js";
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

    const [docs, llms, samples, guides, hardware] = await Promise.all([
      parseMarkdown(CACHE_DIR),
      parseLlmsContent(CACHE_DIR),
      parseSamples(CACHE_DIR),
      parsePatterns(CACHE_DIR),
      parseDevices(CACHE_DIR),
    ]);
    console.log(
      `parsed: ${docs.length} docs-reference, ${llms.length} llms, ${samples.length} sample usages, ${guides.length} guides, ${hardware.length} devices`,
    );

    const records = enrich([...docs, ...llms, ...samples]);
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
    const deviceCount = await writeDevices(devices, DATA_DIR);
    await writeManifest(
      {
        lastSyncAt: new Date().toISOString(),
        sources: results,
        recordCounts: {
          "docs-reference": docs.length,
          llms: llms.length,
          sample: samples.length,
          guide: guides.length,
          symbols: records.length,
          modules: moduleCount,
          patterns: patternCount,
          devices: deviceCount,
        },
      },
      DATA_DIR,
    );
    console.log(
      `wrote: ${moduleCount} module files to ${DATA_DIR}/symbols, ${patternCount} pattern files to ${DATA_DIR}/patterns, ${deviceCount} devices to ${DATA_DIR}/devices.json`,
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
    console.log(
      `rendered: ${modules} modules to api/ and compatibility/, ${devices} devices to compatibility/devices.md, ${runtimes} runtimes to runtimes/, ${patterns} patterns to patterns/ (plus an index in each)`,
    );
    break;
  }
  default:
    console.error(`Unknown command: ${command}. Use "sync" or "render".`);
    process.exit(1);
}

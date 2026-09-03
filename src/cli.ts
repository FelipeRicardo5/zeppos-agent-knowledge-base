import { enrich } from "./enrich/index.js";
import { fetchSources } from "./fetch/index.js";
import { parseLlmsContent, parseMarkdown, parseSamples } from "./parse/index.js";
import { writeManifest, writeSymbols } from "./store/index.js";

const CACHE_DIR = ".cache";
const DATA_DIR = "data";

const command = process.argv[2];

switch (command) {
  case "sync": {
    const results = await fetchSources(CACHE_DIR);
    for (const [name, { commit }] of Object.entries(results)) {
      console.log(`${name}: ${commit}`);
    }

    const [docs, llms, samples] = await Promise.all([
      parseMarkdown(CACHE_DIR),
      parseLlmsContent(CACHE_DIR),
      parseSamples(CACHE_DIR),
    ]);
    console.log(`parsed: ${docs.length} docs-reference, ${llms.length} llms, ${samples.length} sample usages`);

    const records = enrich([...docs, ...llms, ...samples]);
    const official = records.filter((r) => r.confidence === "OFFICIAL").length;
    const observed = records.filter((r) => r.confidence === "OBSERVED").length;
    console.log(`enriched: ${records.length} symbols (${official} OFFICIAL, ${observed} OBSERVED)`);

    const moduleCount = await writeSymbols(records, DATA_DIR);
    await writeManifest(
      {
        lastSyncAt: new Date().toISOString(),
        sources: results,
        recordCounts: {
          "docs-reference": docs.length,
          llms: llms.length,
          sample: samples.length,
          symbols: records.length,
          modules: moduleCount,
        },
      },
      DATA_DIR,
    );
    console.log(`wrote: ${moduleCount} module files to ${DATA_DIR}/symbols`);
    break;
  }
  case "render":
    // read data/symbols/*.json -> render markdown
    console.log("render: not implemented");
    break;
  default:
    console.error(`Unknown command: ${command}. Use "sync" or "render".`);
    process.exit(1);
}

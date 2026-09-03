import { fetchSources } from "./fetch/index.js";
import { parseLlmsContent, parseMarkdown, parseSamples } from "./parse/index.js";

const CACHE_DIR = ".cache";

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
    // TODO: enrich -> write data/symbols/*.json + data/manifest.json
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

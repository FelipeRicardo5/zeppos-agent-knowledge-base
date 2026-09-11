import {
  enrich,
  enrichAppJson,
  enrichDevices,
  enrichExamples,
  enrichPatterns,
  enrichTools,
} from "./enrich/index.js";
import { fetchSources } from "./fetch/index.js";
import { unreadHeaders } from "./parse/diagnostics.js";
import { parseDevices } from "./parse/devices.js";
import { parseExamples } from "./parse/examples.js";
import { parseAppJson } from "./parse/manifest.js";
import { parseLlmsContent, parseMarkdown, parseSamples } from "./parse/index.js";
import { parsePatterns } from "./parse/patterns.js";
import { parsePhoneApis } from "./parse/phone.js";
import { parseTools } from "./parse/tools.js";
import { parseWatchface } from "./parse/watchface.js";
import { render } from "./render/index.js";
import { verify } from "./verify/index.js";
import { renderExamples } from "./render/examples.js";
import { renderConflicts } from "./render/conflicts.js";
import { renderManifest } from "./render/manifest.js";
import { renderPatterns } from "./render/patterns.js";
import { renderTools } from "./render/tools.js";
import {
  writeAppJson,
  writeDevices,
  writeDiagnostics,
  writeExamples,
  writeManifest,
  writePatterns,
  writeTools,
  writeSymbols,
} from "./store/index.js";
import path from "node:path";

const CACHE_DIR = ".cache";
const DATA_DIR = "data";
const OUT_DIR = ".";
const ANNOTATIONS_DIR = "annotations";

const command = process.argv[2];

switch (command) {
  case "sync": {
    const results = await fetchSources(CACHE_DIR);
    for (const [name, { commit }] of Object.entries(results)) {
      console.log(`${name}: ${commit}`);
    }

    const [docs, phone, watch, llms, samples, guides, hardware, apps, appJson, toolPages] =
      await Promise.all([
      parseMarkdown(CACHE_DIR),
      parsePhoneApis(CACHE_DIR),
      parseWatchface(CACHE_DIR),
      parseLlmsContent(CACHE_DIR),
      parseSamples(CACHE_DIR),
      parsePatterns(CACHE_DIR),
      parseDevices(CACHE_DIR),
      parseExamples(CACHE_DIR),
      parseAppJson(CACHE_DIR),
      parseTools(CACHE_DIR),
    ]);
    console.log(
      `parsed: ${docs.length} docs-reference, ${phone.length} phone-api, ${watch.length} watchface, ${llms.length} llms, ${samples.length} sample usages, ${guides.length} guides, ${hardware.length} devices, ${apps.length} sample apps, ${appJson[0]?.sections.length ?? 0} app.json keys, ${toolPages[0]?.commands.length ?? 0} CLI commands`,
    );

    const records = enrich([...docs, ...phone, ...watch, ...llms, ...samples]);
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

    const tools = enrichTools(toolPages);
    const toolCount = await writeTools(tools, DATA_DIR);
    console.log(
      `enriched: ${toolCount} CLI commands (${tools[0]?.packages.length ?? 0} recommended packages)`,
    );

    const manifestSchema = enrichAppJson(appJson);
    const gapCount = manifestSchema[0]?.gaps.length ?? 0;
    console.log(
      `enriched: ${manifestSchema.length} app.json schema (${gapCount} keys named but never described)`,
    );

    // What the extractors walked past. Every parser bug here has been a table
    // heading no map recognised, dropped without an error, and every one was
    // found by accident. Reported on every sync so the next arrives as a
    // number that changed rather than as a silence.
    const unread = await unreadHeaders(CACHE_DIR);
    await writeDiagnostics(unread, DATA_DIR);
    if (unread.length > 0) {
      const tables = unread.reduce((n, h) => n + h.tables, 0);
      console.log(
        `unread: ${tables} tables under ${unread.length} headings no column map reads` +
          ` (worst: ${unread.slice(0, 3).map((h) => `\`${h.header}\` x${h.tables}`).join(", ")})`,
      );
    }

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
          "docs-watchface": watch.length,
          llms: llms.length,
          sample: samples.length,
          guide: guides.length,
          symbols: records.length,
          modules: moduleCount,
          patterns: patternCount,
          devices: deviceCount,
          examples: exampleCount,
          "app-json": manifestKeyCount,
          tools: toolCount,
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
    const { modules, runtimes, devices, names, annotations } = await render(
      symbolsDir,
      OUT_DIR,
      path.join(DATA_DIR, "devices.json"),
      path.join(DATA_DIR, "examples"),
      ANNOTATIONS_DIR,
    );
    const { patterns } = await renderPatterns(path.join(DATA_DIR, "patterns"), symbolsDir, OUT_DIR);
    const { examples } = await renderExamples(path.join(DATA_DIR, "examples"), symbolsDir, OUT_DIR);
    const { conflicts } = await renderConflicts(symbolsDir, path.join(DATA_DIR, "examples"), OUT_DIR);
    const { commands } = await renderTools(
      path.join(DATA_DIR, "tools.json"),
      path.join(DATA_DIR, "app-json.json"),
      symbolsDir,
      OUT_DIR,
    );
    const { manifestKeys } = await renderManifest(
      path.join(DATA_DIR, "app-json.json"),
      path.join(DATA_DIR, "examples"),
      symbolsDir,
      OUT_DIR,
    );
    console.log(
      `rendered: ${modules} modules, ${names} indexed names, ${devices} devices, ${runtimes} runtimes, ${patterns} patterns, ${examples} examples, ${manifestKeys} app.json keys, ${conflicts} conflicts, ${commands} CLI commands, ${annotations} annotations (plus an index in each)`,
    );
    break;
  }
  case "verify": {
    const { total, failures } = await verify(path.join(DATA_DIR, "symbols"), OUT_DIR, ANNOTATIONS_DIR);

    for (const { question, why, detail } of failures) {
      console.error(`FAIL  ${question}`);
      console.error(`      ${detail}`);
      console.error(`      why this question is asked: ${why}`);
    }

    console.log(`verified: ${total - failures.length} of ${total} questions answered`);
    if (failures.length > 0) process.exit(1);
    break;
  }
  default:
    console.error(`Unknown command: ${command}. Use "sync", "render" or "verify".`);
    process.exit(1);
}

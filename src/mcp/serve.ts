import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { Runtime } from "../types.js";
import { type Base, loadBase } from "./base.js";
import {
  checkCompatibility,
  getDevice,
  getFreshness,
  getPattern,
  getSymbol,
  listByApiLevel,
  listByRuntime,
  listModule,
  listPatterns,
  lookup,
  resolveCall,
} from "./tools.js";

// The MCP wiring, and nothing else.
//
// Every answer is computed in `tools.ts`, which knows nothing about MCP. That
// is what lets `test/mcp.test.ts` call the whole surface directly and measure
// the answers rather than the transport — this file has no branch worth
// testing, and if it grew one the logic would be in the wrong place.
//
// stdio, local-first. The base is a checkout on the same machine; there is no
// service to run, nothing to authenticate, and no request that leaves the host.
//
// The base loads once, at startup. A stdio server that re-read `data/` per call
// would answer the same question two ways if `sync` ran mid-session, and an
// agent comparing two answers has no way to tell that apart from a real
// contradiction — which this base exists to report.

const RUNTIMES = [
  "device-app",
  "side-service",
  "settings",
  "watchface",
  "workout-extension",
] as const satisfies readonly Runtime[];

/** Tool results travel as text; JSON is what an agent can act on. */
function json(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}

export function createServer(base: Base): McpServer {
  const server = new McpServer({
    name: "zeppos-knowledge",
    version: base.manifest.version,
  });

  server.registerTool(
    "get_freshness",
    {
      description:
        "What this knowledge base is and when it was built: version, upstream " +
        "commits and record counts. Call this first — a report that cannot name " +
        "the version it read cannot be compared with another.",
      inputSchema: {},
    },
    async () => json(getFreshness(base)),
  );

  server.registerTool(
    "get_symbol",
    {
      description:
        "One symbol by its full id, with its signature, shapes, value sets and " +
        "members. Absent fields come back with the reason they are absent and " +
        "how much of that runtime states them — absence is never a licence to " +
        "assume a value.",
      inputSchema: { id: z.string().describe("Full id, e.g. `@zos/sensor.BloodOxygen`") },
    },
    async ({ id }) => json(getSymbol(base, id)),
  );

  server.registerTool(
    "lookup",
    {
      description:
        "A bare name, and everything that owns it: symbols, instance members, " +
        "enum values and shape properties. Use this when you have a name out of " +
        "someone else's code and nothing else. A name with several owners is not " +
        "a duplicate — read the one whose runtime matches what you are building.",
      inputSchema: { name: z.string().describe("A bare name, e.g. `align_h`, `setInterval`") },
    },
    async ({ name }) => json(lookup(base, name)),
  );

  server.registerTool(
    "list_module",
    {
      description:
        "Every symbol in a module, plus its submodules. The submodules matter: " +
        "`hmSensor` holds three symbols and the 18 sensor ids live in " +
        "`hmSensor.id`, a module of its own.",
      inputSchema: { module: z.string().describe("Module name, e.g. `@zos/ui`, `hmSensor`") },
    },
    async ({ module }) => json(listModule(base, module)),
  );

  server.registerTool(
    "check_compatibility",
    {
      description:
        "Whether symbols run at a target API_LEVEL or on a named device. " +
        "Returns RUNS, TOO_NEW, UNKNOWN or NOT_COVERED per symbol. UNKNOWN is a " +
        "real answer: many symbols state no minimum, and this base will not " +
        "guess one.",
      inputSchema: {
        ids: z.array(z.string()).describe("Full symbol ids"),
        apiLevel: z.number().optional().describe("Target API_LEVEL"),
        device: z.string().optional().describe("Device name, e.g. `Amazfit Bip 6`"),
      },
    },
    async ({ ids, apiLevel, device }) => {
      if (apiLevel === undefined && device === undefined) {
        return json({ error: "give an apiLevel or a device to check against" });
      }
      return json(checkCompatibility(base, ids, { apiLevel, device }));
    },
  );

  server.registerTool(
    "list_by_runtime",
    {
      description:
        "Every symbol valid in a runtime, led by how much of that runtime this " +
        "base actually states. Read the coverage before the list: certification " +
        "works for the Device App and for almost nothing else.",
      inputSchema: { runtime: z.enum(RUNTIMES) },
    },
    async ({ runtime }) => json(listByRuntime(base, runtime)),
  );

  server.registerTool(
    "list_by_api_level",
    {
      description:
        "Symbols available at an API_LEVEL, with the ones that state no minimum " +
        "returned separately. Those are neither available nor unavailable.",
      inputSchema: { apiLevel: z.number() },
    },
    async ({ apiLevel }) => json(listByApiLevel(base, apiLevel)),
  );

  server.registerTool(
    "resolve_call",
    {
      description:
        "What a bare `.method()` in existing code could be, optionally narrowed " +
        "to a runtime. Matched by name only — the receiver's type is not " +
        "resolved, so more than one candidate means this base cannot tell them " +
        "apart, not that the call is wrong.",
      inputSchema: {
        name: z.string().describe("The method name, without the dot"),
        runtime: z.enum(RUNTIMES).optional(),
      },
    },
    async ({ name, runtime }) => json(resolveCall(base, name, runtime)),
  );

  server.registerTool(
    "get_device",
    {
      description:
        "One device: its latest API_LEVEL and OS version, screen, physical keys " +
        "and the deviceSource ids a manifest needs to target it.",
      inputSchema: { name: z.string().describe("Device name or slug, e.g. `Amazfit Bip 6`") },
    },
    async ({ name }) => json(getDevice(base, name)),
  );

  server.registerTool(
    "list_patterns",
    {
      description:
        "The task-shaped guides extracted from official best practice, with the " +
        "runtime each applies to.",
      inputSchema: {},
    },
    async () => json(listPatterns(base)),
  );

  server.registerTool(
    "get_pattern",
    {
      description: "One guide in full, with its approaches, snippets and the symbols it uses.",
      inputSchema: { id: z.string() },
    },
    async ({ id }) => json(getPattern(base, id)),
  );

  return server;
}

export async function main(root = process.env.ZEPPOS_KB_ROOT ?? "."): Promise<void> {
  const base = await loadBase(root);
  const server = createServer(base);
  await server.connect(new StdioServerTransport());
}

// `import.meta.url` rather than a CLI subcommand: the server is launched by an
// MCP client as a process, never by a human typing at a prompt.
if (process.argv[1] !== undefined && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  await main();
}

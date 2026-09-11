import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { loadBase } from "../src/mcp/base.js";
import { createServer } from "../src/mcp/serve.js";

// That the surface is actually reachable over MCP.
//
// `mcp.test.ts` measures the answers by calling the tools directly, which is
// the right place for them — this file only proves the wiring: that every tool
// is registered, that each is described, and that a call round-trips. A linked
// pair of in-memory transports, so nothing is spawned and no port is opened.

let client: Client;

before(async () => {
  const base = await loadBase(".");
  const server = createServer(base);
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();

  client = new Client({ name: "test", version: "0" });
  await Promise.all([server.connect(serverSide), client.connect(clientSide)]);
});

describe("the MCP surface", () => {
  it("registers every tool, each with a description", async () => {
    const { tools } = await client.listTools();

    assert.deepEqual(
      tools.map((t) => t.name).sort(),
      [
        "check_compatibility",
        "get_device",
        "get_freshness",
        "get_pattern",
        "get_symbol",
        "list_by_api_level",
        "list_by_runtime",
        "list_module",
        "list_patterns",
        "lookup",
        "resolve_call",
      ],
    );
    assert.ok(tools.every((t) => (t.description?.length ?? 0) > 40));
  });

  it("round-trips a call and returns JSON an agent can act on", async () => {
    const result = await client.callTool({ name: "lookup", arguments: { name: "align_h" } });
    const content = result.content as { type: string; text: string }[];
    const hits = JSON.parse(content[0].text) as { owner: string; kind: string }[];

    assert.equal(hits.length, 5);
    assert.ok(hits.every((h) => h.kind === "property"));
  });

  it("refuses a compatibility check with no target rather than inventing one", async () => {
    const result = await client.callTool({
      name: "check_compatibility",
      arguments: { ids: ["@zos/sensor.BloodOxygen"] },
    });
    const content = result.content as { type: string; text: string }[];

    assert.match(JSON.parse(content[0].text).error, /apiLevel or a device/);
  });
});

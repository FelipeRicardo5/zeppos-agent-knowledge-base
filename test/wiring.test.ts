import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { loadBase } from "../src/mcp/base.js";
import type { Base } from "../src/mcp/base.js";
import { describeWiring, listWiring } from "../src/mcp/wiring.js";

// The wiring view, which exists because an eval run guessed
// `this.request({method, params})` where the samples write `{type, params}`.
//
// What is under test is not that the answer is complete. It is that assembling
// the observations never turns one into a claim: the grouping states its own
// criterion, the syntactic position survives under any label, and every
// response says what it is not asserting.

let base: Base;

before(async () => {
  base = await loadBase(".");
});

const SAMPLE = "application-2-0-post-health-data-miniprogram";

describe("describeWiring", () => {
  it("groups sites by the literal they share, and says that is the grouping", () => {
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    const upload = answer.channels.find((c) => c.literal === "UPLOAD");
    assert.ok(upload, "the sample passes an UPLOAD tag between two runtimes");
    assert.deepEqual(upload.runtimes, ["device-app", "side-service"]);
    assert.match(upload.groupedBy, /same string literal/);
    assert.match(upload.groupedBy, /only thing relating them/);
  });

  it("keeps the syntactic position, not only a reading of it", () => {
    // "sends" and "handles" are readings. What is observable is that the
    // literal is a property value in one place and a comparison operand in
    // another, and the label has to stay derivable from that.
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    const upload = answer.channels.find((c) => c.literal === "UPLOAD");
    assert.deepEqual(
      upload?.sites.map((s) => s.position).sort(),
      ["call argument", "comparison"],
    );
  });

  it("cites a file and a line for every site", () => {
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    const sites = answer.channels.flatMap((c) => c.sites);
    assert.ok(sites.length > 0);
    assert.ok(sites.every((s) => s.file.startsWith("zeppos-samples/") && s.line > 0));
  });

  it("shows what a message carries, verbatim, without synthesising a signature", () => {
    // The fact the run got wrong. `request(options: {type: string})` would be a
    // type no source declares; the destructuring is a line somebody wrote.
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    const written = answer.shapesObserved.map((s) => s.written).join("\n");
    assert.match(written, /const \{ type, params \} = req;/);
    assert.match(written, /onRequest\(req, res\)/);
  });

  it("states what it does not assert, in the payload", () => {
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    const said = answer.notAsserted.join(" ");
    assert.match(said, /received by a handler at another/);
    assert.match(said, /No source in this base names it/);
    assert.match(said, /all the channels/);
  });

  it("counts other apps with the same shape without prescribing it", () => {
    const answer = describeWiring(base, SAMPLE);

    assert.ok(answer.found);
    assert.ok(answer.alsoOccursIn.apps > 0);
    assert.equal(answer.alsoOccursIn.of, base.examples.length);
  });

  it("refuses an app it has no record of, rather than answering emptily", () => {
    const answer = describeWiring(base, "no-such-app");

    assert.equal(answer.found, false);
    assert.match(answer.meaning, /not covered, never that the symbol does not exist/);
  });
});

describe("listWiring", () => {
  it("lists only apps that pass a tag between runtimes", () => {
    const apps = listWiring(base);

    assert.ok(apps.length > 0);
    assert.ok(apps.every((a) => a.literals > 0));
    assert.ok(apps.some((a) => a.app === SAMPLE));
  });
});

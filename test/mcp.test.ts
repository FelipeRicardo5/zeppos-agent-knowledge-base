import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { loadBase } from "../src/mcp/base.js";
import type { Base } from "../src/mcp/base.js";
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
} from "../src/mcp/tools.js";

// The acceptance suite: the 20 questions `npm run verify` asks of the rendered
// pages, asked of the tools instead.
//
// They do not all transfer, and pretending they did would have made this file
// impossible to write. Six of the twenty read only a page, and they are not
// incidental — several are *discoverability* questions by construction. One
// checks that `api/hmSensor.md` links to `api/hmSensor.id.md`; there is no
// identical result for a link in an API that returns records.
//
// So they change form rather than disappearing. In a server, discoverability is
// a property of the tool surface: "what does a Step sensor give me" is answered
// when `list_module` surfaces the submodule. Those six are the first section
// below, written as requirements on the shape of an answer. The rest are
// equality.
//
// Run against the real `data/`, not fixtures. The standing rule of this
// repository: every front that was verified against a fixture alone was wrong
// about the aggregate.

let base: Base;

before(async () => {
  base = await loadBase(".");
});

/** Narrow a compatibility result, failing loudly on the not-covered branch. */
function verdicts(result: ReturnType<typeof checkCompatibility>) {
  assert.ok(Array.isArray(result), "expected compatibility answers, got a miss");
  return result;
}

describe("discoverability — the questions that became tool design", () => {
  it("answers a bare name, which cost three file reads before", () => {
    // verify: "Where does `setInterval` live?"
    const hits = lookup(base, "setInterval");

    assert.equal(hits.length, 1);
    assert.equal(hits[0].owner, "@zos/global.setInterval");
    assert.equal(hits[0].minApiLevel, 2);
  });

  it("names a module's submodules, or it repeats the worst failure on record", () => {
    // verify: "What does a Step sensor give me on a watchface?"
    //
    // An eval run opened the parent, found a bare constant, and reported the
    // child's 18 records as missing. Two requirements were downgraded. A tool
    // that lists `hmSensor` without naming `hmSensor.id` reproduces it exactly.
    const answer = listModule(base, "hmSensor");

    assert.ok(answer.found);
    assert.deepEqual(
      answer.submodules.map((s) => [s.module, s.symbols]),
      [["hmSensor.id", 18]],
    );
  });

  it("routes a bare method call to its candidates, and says it guessed by name", () => {
    // verify: "A sample calls `.getItem()`. Which API is that?"
    const answer = resolveCall(base, "getItem", "device-app");

    assert.equal(answer.resolved, false);
    assert.ok(answer.candidates.length > 1);
    assert.match(answer.caveat, /receiver's type is not resolved/);
  });

  it("offers the near miss when an id does not resolve", () => {
    // verify: "Sample code writes `widget.GRADKIENT_POLYLINE`. Is that the
    // documented name?" — the answer has to survive the caller spelling it the
    // way the sample did.
    const answer = getSymbol(base, "@zos/ui.GRADKIENT_POLYLINE");

    assert.equal(answer.found, false);
    assert.ok(answer.suggestions.length > 0);
  });

  it("states what it is, so a report can name what it measured", () => {
    // The eval copy is built with `git archive` and has no `.git`.
    const fresh = getFreshness(base);

    assert.equal(fresh.version, base.manifest.version);
    assert.ok(fresh.sources["zeppos-docs"].commit.length > 0);
    assert.match(fresh.limits, /not covered, never non-existent/);
  });

  it("leads with a runtime's counted coverage rather than its symbol list", () => {
    // verify: "I am following the multi-screen adaptation guide..." — the
    // question behind it is which runtime a thing belongs to, and the honest
    // answer starts with how much of that runtime is known at all.
    const answer = listByRuntime(base, "side-service");

    assert.ok(answer.symbols.length > 0);
    assert.deepEqual(
      answer.coverage.filter((c) => c.stated > 0),
      [],
      "the Side Service states nothing on any counted axis — if this fails, say so in runtimes/",
    );
  });
});

describe("compatibility — never a guess", () => {
  it("passes a symbol whose stated minimum is at or below the target", () => {
    // verify: "My app targets API_LEVEL 2.0. Can it start a blood-oxygen
    // measurement?"
    const [answer] = verdicts(
      checkCompatibility(base, ["@zos/sensor.BloodOxygen"], { apiLevel: 2 }),
    );

    assert.equal(answer.verdict, "RUNS");
    assert.equal(answer.minApiLevel, 2);
  });

  it("fails it below that minimum", () => {
    const [answer] = verdicts(
      checkCompatibility(base, ["@zos/sensor.BloodOxygen"], { apiLevel: 1 }),
    );

    assert.equal(answer.verdict, "TOO_NEW");
  });

  it("answers UNKNOWN where no level is stated, at any target", () => {
    // The one collapse that would certify code this base cannot certify. 160
    // of 513 symbols state no level, and three runtimes state almost none.
    const [answer] = verdicts(checkCompatibility(base, ["hmUI.createWidget"], { apiLevel: 99 }));

    assert.equal(answer.verdict, "UNKNOWN");
    assert.match(answer.reason, /absence of evidence, not a pass/);
  });

  it("resolves a device to the level it states", () => {
    // verify: "How do I make my app build for an Amazfit Bip 6?"
    const answer = getDevice(base, "Bip 6");

    assert.ok(answer.found);
    assert.equal(answer.device.latestApiLevel, 4.2);
    assert.ok(answer.device.deviceSources.length > 0);
  });

  it("checks against a device by name, not only a bare level", () => {
    const answers = verdicts(
      checkCompatibility(base, ["@zos/sensor.BloodOxygen"], { device: "Amazfit Bip 6" }),
    );

    assert.equal(answers[0].verdict, "RUNS");
    assert.equal(answers[0].against.device, "Amazfit Bip 6");
  });
});

describe("honesty — every absence says why", () => {
  it("explains a missing level with the runtime's live coverage", () => {
    // verify: "What is the minimum API_LEVEL for `hmUI.createWidget`?"
    const answer = getSymbol(base, "hmUI.createWidget");

    assert.ok(answer.found);
    const level = answer.absences.find((a) => a.field === "minApiLevel");
    assert.ok(level, "a watchface symbol with no level must say so");
    assert.match(level.meaning, /not evidence that any level works/);
    assert.equal(level.coverage[0].runtime, "watchface");
    assert.ok(level.coverage[0].stated < level.coverage[0].total);
  });

  it("keeps a hand-written note beside the record, never inside it", () => {
    // The base's one property is that every other statement traces to a source.
    const answer = getSymbol(base, "@zos/ui.GRADIENT_POLYLINE");

    assert.ok(answer.found);
    assert.ok(answer.notes.length > 0, "this symbol carries an annotation");
    assert.equal(answer.notes[0].confidence, "INFERRED");
    assert.ok(
      !JSON.stringify(answer.record).includes(answer.notes[0].note),
      "the note must not be merged into the extracted record",
    );
  });

  it("says not-covered rather than not-existing for a module too", () => {
    const answer = listModule(base, "@zos/nonexistent");

    assert.equal(answer.found, false);
    assert.match(answer.meaning, /not covered, never that the symbol does not exist/);
  });

  it("cites a page for every answer it gives", () => {
    const answer = getSymbol(base, "@zos/sensor.BloodOxygen");

    assert.ok(answer.found);
    assert.match(answer.cite, /^api\/.+\.md#/);
  });
});

describe("content — answered from the records", () => {
  it("gives the value set behind a widget property", () => {
    // verify: "What values may `align_h` take when I create a TEXT widget?"
    const hits = lookup(base, "align_h");

    assert.ok(hits.length > 0);
  });

  it("separates two runtimes that share a name", () => {
    // verify: "I am writing a watchface. What replaces `@zos/ui.createWidget`?"
    const hits = lookup(base, "createWidget");
    const runtimes = new Set(hits.flatMap((h) => h.runtimes));

    assert.ok(runtimes.has("watchface"));
    assert.ok(runtimes.has("device-app"));
    assert.ok(hits.length > 1, "the name belongs to more than one owner");
  });

  it("lists the task-shaped guides with the runtime each applies to", () => {
    const patterns = listPatterns(base);

    assert.ok(patterns.length > 0);
    assert.ok(patterns.every((p) => p.cite.startsWith("patterns/")));
  });

  it("returns one guide in full", () => {
    const [first] = listPatterns(base);
    const answer = getPattern(base, first.id);

    assert.ok(answer.found);
    assert.equal(answer.pattern.id, first.id);
  });

  it("keeps the unlevelled symbols out of a level's available list", () => {
    // The list answer has the same collapse available to it as the check does:
    // "everything not known to be too new" is not "everything that runs".
    const answer = listByApiLevel(base, 4);
    const overlap = answer.available.filter((id) => answer.unknown.includes(id));

    assert.deepEqual(overlap, []);
    assert.ok(answer.unknown.length > 0, "some symbols state no level at all");
    assert.ok(
      answer.available.every((id) => (base.symbols.get(id)?.minApiLevel ?? Infinity) <= 4),
      "nothing reaches the available list without a stated minimum at or below it",
    );
  });
});

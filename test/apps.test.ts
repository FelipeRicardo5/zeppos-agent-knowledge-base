import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { loadBase } from "../src/mcp/base.js";
import type { Base } from "../src/mcp/base.js";
import { describeApp, findApps } from "../src/mcp/apps.js";

// The application view. Every other tool here is keyed by symbol; this one is
// keyed by the unit a task is actually shaped like.
//
// What is under test is not that the answer is complete. It is that assembling
// an application never turns a manifest declaration into a claim about what
// runs: the entry points are the manifest's own paths resolved against the
// files beside them, an absence says which source is silent, and the search
// says its matching is a substring rather than a judgement.

let base: Base;

before(async () => {
  base = await loadBase(".");
});

const SAMPLE = "application-2-0-todo-list";

describe("describeApp", () => {
  it("resolves each `module` key to a file and the runtime that file belongs to", () => {
    // The join nothing upstream states. Three eval runs wrote a Settings App
    // file and none could cite where the manifest points.
    const answer = describeApp(base, SAMPLE);

    assert.ok(answer.found);
    const side = answer.entryPoints.find((entry) => entry.module === "app-side");
    const setting = answer.entryPoints.find((entry) => entry.module === "setting");

    assert.equal(side?.declared, "app-side/index");
    assert.equal(side?.file, "app-side/index.js");
    assert.equal(side?.runtime, "side-service");
    assert.equal(setting?.file, "setting/index.js");
    assert.equal(setting?.runtime, "settings");
  });

  it("carries the field that decides whether an app installs", () => {
    // An eval run invented `4.2.0` for `runtime.apiVersion`. Every sample
    // writes the API_LEVEL itself.
    const answer = describeApp(base, SAMPLE);

    assert.ok(answer.found);
    assert.deepEqual(answer.apiVersion.target, ["2.0"]);
  });

  it("names its siblings across platform versions", () => {
    // The samples README is the only source that says these are one app four
    // times. No directory name does.
    const answer = describeApp(base, SAMPLE);

    assert.ok(answer.found);
    assert.equal(answer.family, "TodoList");
    assert.deepEqual(
      answer.siblings.map((sibling) => sibling.platformVersion).sort(),
      ["1.0", "3.0", "4.0"],
    );
  });

  it("says which source is silent, rather than leaving a field empty", () => {
    // A sample the README does not link has no family. Read as a property of
    // the sample that is wrong, so the response says whose silence it is.
    const answer = describeApp(base, "watchface-3-0-timer");

    assert.ok(answer.found);
    assert.equal(answer.family, undefined);
    assert.ok(
      answer.notStated.some((reason) => /README does not link this directory/.test(reason)),
      "the absence names the README, not the sample",
    );
  });

  it("states that nothing here ran the app", () => {
    const answer = describeApp(base, SAMPLE);

    assert.ok(answer.found);
    assert.match(answer.notAsserted, /Nothing here compiles or runs this app/);
  });

  it("refuses an app it has no record of, rather than answering emptily", () => {
    const answer = describeApp(base, "not-a-sample");

    assert.equal(answer.found, false);
    assert.ok(!answer.found);
    assert.match(answer.reason, /a missing id means not covered/);
    assert.ok(answer.known.length > 0, "and offers the ids that do exist");
  });
});

describe("findApps", () => {
  it("filters by the `module` key an app declares, which is its architecture", () => {
    const answer = findApps(base, { module: "setting" });

    assert.ok(answer.matched > 0);
    assert.ok(answer.matched < answer.of, "a filter that matches everything is not a filter");
    assert.ok(
      answer.apps.every((app) => app.modules.includes("setting")),
      "every row declares the key that was asked for",
    );
  });

  it("matches what an app says it is, not only its directory name", () => {
    const answer = findApps(base, { text: "downloading" });

    assert.deepEqual(
      answer.apps.map((app) => app.app),
      ["application-3-0-download"],
    );
  });

  it("ranks by platform version and says the match is not a judgement", () => {
    const answer = findApps(base, { text: "todo" });

    assert.deepEqual(
      answer.apps.map((app) => app.platformVersion),
      ["4.0", "3.0", "2.0", "1.0"],
    );
    assert.match(answer.notAsserted, /not a judgement/);
  });

  it("returns every app when nothing is asked, with the corpus size beside it", () => {
    const answer = findApps(base);

    assert.equal(answer.matched, answer.of);
    assert.equal(answer.matched, base.examples.length);
  });
});

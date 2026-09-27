import type { Base } from "./index.js";

// The question set: things a developer asks, with the answer the base must give.
//
// The suite in `test/` proves the extractor does not regress. The eval in
// `eval/` proves an agent can get through a task. Neither proves the base
// *answers correctly*, which is what this is for — and it is the one claim the
// project had never checked, item 14 on the roadmap.
//
// Three rules the set follows, because without them it decays into a second
// unit-test suite:
//
//   a question, not an assertion
//                  every entry is phrased as something someone would actually
//                  ask. If it cannot be, it belongs in `test/`.
//   checked against the rendered pages
//                  an agent reads Markdown, not JSON. A fact that survives into
//                  `data/` and dies in the render is still a wrong answer.
//   every entry says why it is here
//                  most of these were SILENT in an eval run or were a bug that
//                  shipped. `why` is what stops the set being pruned by someone
//                  who cannot see what it is defending.

export interface Answer {
  /** What someone would ask. */
  question: string;
  /** Why the question is in the set — an eval finding, or a bug that shipped. */
  why: string;
  /** Returns a description of the failure, or undefined when the base answers. */
  check: (base: Base) => string | undefined;
}

const has = (text: string, needle: string, label: string): string | undefined =>
  text.includes(needle) ? undefined : `${label} does not contain ${JSON.stringify(needle)}`;

export const ANSWERS: Answer[] = [
  {
    question: "Where does `setInterval` live?",
    why: "Eval 02 called this the most-wanted structural change: it cost three file reads.",
    check: (base) =>
      has(base.page("api/lookup.md"), "`setInterval` | symbol | `@zos/global.setInterval`", "api/lookup.md"),
  },
  {
    question: "What values may `align_h` take when I create a TEXT widget?",
    why: "Eval 01's root gap. No `createWidget` call can be written without them, and they were reachable only through sample code.",
    check: (base) => {
      const align = base.symbol("@zos/ui.align");
      if (!align) return "@zos/ui.align has no record";
      const members = (align.enums ?? []).flatMap((e) => e.members.map((m) => m.value));
      if (!members.includes("CENTER_H")) return `@zos/ui.align members are ${members.join(", ")}`;
      return has(base.page("api/zos-ui.md"), "`align.CENTER_H`", "api/zos-ui.md");
    },
  },
  {
    question: "Which id do I pass to `createWidget` to draw text, and what props does it take?",
    why: "The widget-id enum is documented with one member upstream; the rest come from sample code, and the props were lost to a plural column header.",
    check: (base) => {
      const page = base.page("api/zos-ui.md");
      const widget = base.symbol("@zos/ui.widget");
      const members = (widget?.enums ?? []).flatMap((e) => e.members.map((m) => m.value));
      if (!members.includes("TEXT")) return "widget.TEXT is not a member of @zos/ui.widget";
      const text = base.symbol("@zos/ui.TEXT");
      if (!(text?.shapes ?? []).some((s) => s.props.some((p) => p.name === "text_size"))) {
        return "@zos/ui.TEXT has no property table naming text_size";
      }
      return has(page, "The documentation states this list is incomplete", "api/zos-ui.md");
    },
  },
  {
    question: "What can I call on the value `new BloodOxygen()` gives me?",
    why: "Eval 02 listed a sensor instance's accessors as an open gap; `examples/` could only reach them by matching a bare method name.",
    check: (base) => {
      const sensor = base.symbol("@zos/sensor.BloodOxygen");
      const names = (sensor?.members ?? []).map((m) => m.name);
      if (!names.includes("getCurrent")) return `BloodOxygen members are ${names.join(", ") || "none"}`;
      return has(base.page("api/zos-sensor.md"), "getCurrent(): Result", "api/zos-sensor.md");
    },
  },
  {
    question: "My app targets API_LEVEL 2.0. Can it start a blood-oxygen measurement?",
    why: "No — the sensor is 2.0 and `start` is 2.1. A member's level is not the symbol's, and reading only the symbol's says yes.",
    check: (base) => {
      const sensor = base.symbol("@zos/sensor.BloodOxygen");
      if (sensor?.minApiLevel !== 2) return `BloodOxygen states level ${sensor?.minApiLevel}`;
      const start = (sensor.members ?? []).find((m) => m.name === "start");
      if (start?.apiLevel !== 2.1) return `BloodOxygen.start states level ${start?.apiLevel}`;
      return undefined;
    },
  },
  {
    question: "What does `retCode` 4 mean on a blood-oxygen reading?",
    why: "A returned value's domain. It belongs to `getCurrent`, not to the sensor, and reading it as the sensor's said the sensor has a result code.",
    check: (base) => {
      const sensor = base.symbol("@zos/sensor.BloodOxygen");
      const getCurrent = (sensor?.members ?? []).find((m) => m.name === "getCurrent");
      const retCode = (getCurrent?.enums ?? []).find((e) => e.name === "retCode");
      const four = retCode?.members.find((m) => m.value === "4");
      if (!four) return "getCurrent has no retCode member 4";
      return /not wearing/i.test(four.description ?? "")
        ? undefined
        : `retCode 4 reads ${JSON.stringify(four.description)}`;
    },
  },
  {
    question: "How do I make my app build for an Amazfit Bip 6?",
    why: "Both eval runs asked for the `targets` key and invented one. The key is arbitrary; `platforms[]` is what selects hardware.",
    check: (base) => {
      const page = base.page("compatibility/devices.md");
      for (const needle of ["| Amazfit Bip 6 | `s` | `w390` |", "9765120", "named arbitrarily"]) {
        const failure = has(page, needle, "compatibility/devices.md");
        if (failure) return failure;
      }
      return undefined;
    },
  },
  {
    question: "What must `app.json` declare for `@zos/alarm.set` to work?",
    why: "An undeclared permission fails at runtime, not at build. The code used to be a phrase inside a description.",
    check: (base) => {
      const alarm = base.symbol("@zos/alarm.set");
      if (!(alarm?.permissions ?? []).includes("device:os.alarm")) {
        return `@zos/alarm.set states permissions ${JSON.stringify(alarm?.permissions ?? [])}`;
      }
      return has(base.page("api/zos-alarm.md"), "**Requires in `app.json`**", "api/zos-alarm.md");
    },
  },
  {
    question: "I am following the multi-screen adaptation guide. What permissions does it need?",
    why: "Derived, because the guide states none — the analogue of the derived minimum API_LEVEL.",
    check: (base) =>
      has(base.page("patterns/multi-screen-adaption.md"), "data:os.device.info", "patterns/multi-screen-adaption.md"),
  },
  {
    question: "Is `@zos/sensor.Weather` still the right API to use?",
    why: "No — its reference page marks it deprecated and `static/llms` describes it as current. The only field conflict in the corpus.",
    check: (base) => {
      const weather = base.symbol("@zos/sensor.Weather");
      if (!/deprecated/i.test(weather?.description ?? "")) {
        return "the @zos/sensor.Weather description does not mention deprecation";
      }
      return has(base.page("conflicts/index.md"), "@zos/sensor.Weather", "conflicts/index.md");
    },
  },
  {
    question: "I am writing a watchface. What replaces `@zos/ui.createWidget`?",
    why: "A different runtime with a different API. 102 symbols that no eval run has touched.",
    check: (base) => {
      const hm = base.symbol("hmUI.createWidget");
      if (!hm) return "hmUI.createWidget has no record";
      if (!hm.runtimes.includes("watchface")) return `hmUI.createWidget runtimes are ${hm.runtimes.join(", ")}`;
      return has(base.page("api/lookup.md"), "`hmUI.createWidget`", "api/lookup.md");
    },
  },
  {
    question: "What is the minimum API_LEVEL for `hmUI.createWidget`?",
    why: "An honesty check, not a lookup. No page in the watchface tree states one, so the base must say so rather than imply availability.",
    check: (base) => {
      const stated = base
        .symbols()
        .filter((r) => r.source === "docs-watchface" && r.minApiLevel !== undefined);
      if (stated.length > 0) {
        return `${stated.length} watchface symbols claim a level, e.g. ${stated[0].id}`;
      }
      return has(base.page("runtimes/watchface.md"), "not stated", "runtimes/watchface.md");
    },
  },
  {
    question: "Which flags can I pass to `hmFS.open`?",
    why: "The table heads its column `Optional Properties`, so neither column map read it and the flags were lost.",
    check: (base) => {
      const open = base.symbol("hmFS.open");
      const flags = (open?.enums ?? []).flatMap((e) => e.members.map((m) => m.value));
      return flags.includes("O_RDWR") && flags.includes("O_CREAT")
        ? undefined
        : `hmFS.open exposes flags ${flags.join(", ") || "none"}`;
    },
  },
  {
    question: "Sample code writes `widget.GRADKIENT_POLYLINE`. Is that the documented name?",
    why: "No. The page is `GRADIENT_POLYLINE`; both spellings are OFFICIAL and one of them does not work.",
    check: (base) =>
      has(base.page("conflicts/index.md"), "GRADKIENT_POLYLINE", "conflicts/index.md"),
  },
  {
    question: "A sample calls `.getItem()`. Which API is that?",
    why: "The base used to answer `settings-storage.getItem` — a Settings App function — in six Device App samples where it is `localStorage.getItem`.",
    check: (base) => {
      const page = base.page("examples/index.md");
      if (!page.includes("`.getItem()` — **ambiguous**")) {
        return "examples/index.md does not mark .getItem() ambiguous";
      }
      return has(page, "@zos/storage.localStorage", "examples/index.md");
    },
  },
  {
    question: "Which vibration modes can I pass to a Vibrator's `start`?",
    why: "A `| Constant |` table that neither column map read. These nine were reachable nowhere, and `@zeppos/device-types` is what revealed it.",
    check: (base) => {
      const vibrator = base.symbol("@zos/sensor.Vibrator");
      const start = (vibrator?.members ?? []).find((m) => m.name === "start");
      const modes = (start?.enums ?? []).flatMap((e) => e.members.map((m) => m.value));
      return modes.includes("VIBRATOR_SCENE_CALL")
        ? undefined
        : `Vibrator.start exposes ${modes.length} modes`;
    },
  },
  {
    question: "What does a Step sensor give me on a watchface?",
    why: "Task 02 reported this as the base's worst gap and the base had it — in `api/hmSensor.id.md`, which `api/hmSensor.md` did not link to.",
    check: (base) => {
      const step = base.symbol("hmSensor.id.STEP");
      const props = (step?.shapes ?? []).flatMap((s) => s.props.map((p) => p.name));
      if (!props.includes("current") || !props.includes("target")) {
        return `hmSensor.id.STEP exposes ${props.join(", ") || "nothing"}`;
      }
      // The fact existing is not enough: it was unreachable from the page a
      // reader opens. The link is the half that failed.
      return has(base.page("api/hmSensor.md"), "hmSensor.id.md", "api/hmSensor.md");
    },
  },
  {
    question: "How do I stop a watchface updating when the screen is off?",
    why: "Task 02 called this a hard gap. The answer was on the DELEGATE page in a table headed `Callback Name`, which no column map read.",
    check: (base) => {
      const delegate = base.symbol("hmUI.widget.DELEGATE");
      const props = (delegate?.shapes ?? []).flatMap((s) => s.props.map((p) => p.name));
      return props.includes("resume_call") && props.includes("pause_call")
        ? undefined
        : `hmUI.widget.DELEGATE exposes ${props.join(", ") || "nothing"}`;
    },
  },
  {
    question: "Does any hand-written note still hold?",
    why: "An annotation is the one thing here a human writes, and a hand-written claim ages the moment the data under it changes — it has done so three times in this repository already.",
    check: (base) => {
      const stale = base.stale();
      return stale.length === 0
        ? undefined
        : stale.map(({ id, reason }) => `${id}: ${reason}`).join("; ");
    },
  },
  {
    question: "Does any symbol claim an API_LEVEL no source stated?",
    why: "The invariant the whole base rests on. Absence of a level must render as `not stated`, never as a level and never as `any`.",
    check: (base) => {
      const page = base.page("api/index.md");
      if (/\bany level\b/i.test(page)) return "api/index.md offers `any level` as a reading";
      const withLevel = base.symbols().filter((r) => r.minApiLevel !== undefined).length;
      const total = base.symbols().length;
      return withLevel < total
        ? has(base.page("compatibility/index.md"), "not stated", "compatibility/index.md")
        : `all ${total} symbols state a level, which no sync has ever produced`;
    },
  },
  {
    question: "Which file is this app's Side Service, and which file is its Settings App?",
    why: "The manifest writes an extensionless path and the loader supplies the extension, so the layout of what a run produced could only ever be guessed. Three runs wrote a Settings App file and none could cite where the app.json points.",
    check: (base) => {
      const page = base.page("examples/application-2-0-todo-list.md");
      if (!/## Entry points/.test(page)) return "the sample page no longer resolves its `module` keys";
      for (const needle of ["`app-side/index.js`", "`setting/index.js`", "Side Service", "Settings App"]) {
        const missing = has(page, needle, "examples/application-2-0-todo-list.md");
        if (missing) return missing;
      }
      return undefined;
    },
  },
  {
    question: "What does an app declare in `runtime.apiVersion`?",
    why: "The field that decides whether an app installs on its target range. An eval run invented `4.2.0`; every sample writes the API_LEVEL itself.",
    check: (base) =>
      has(base.page("examples/application-2-0-todo-list.md"), "Installs on:", "the sample page") ??
      (/not a semver/.test(base.page("examples/application-2-0-todo-list.md"))
        ? undefined
        : "the page states the value without saying it is an API_LEVEL rather than a semver"),
  },
  {
    question: "Which sample apps does the samples README not list?",
    why: "Four sample directories are linked from nowhere in that README, including the only 3.0-era watchface and the only sample that downloads a file. A reader working from the list never learns they exist, and the base reads the tree instead.",
    check: (base) => {
      const page = base.page("examples/index.md");
      if (!/## Samples the README does not list/.test(page)) {
        return "examples/index.md no longer diffs the README against the tree";
      }
      return has(page, "watchface-3-0-timer.md", "examples/index.md");
    },
  },
  {
    question: "What does `@zos/alarm.cancel` return, and what is `Result`?",
    why: "88 pages write `### Result` over a table with no name column, and the name is the heading. Every row was dropped without an error, so 123 of 211 signatures ended in a type nothing in the base defined. Reading them left 8.",
    check: (base) => {
      const page = base.page("api/zos-alarm.md");
      if (!/\*\*Declares\*\*/.test(page)) return "the module page no longer renders what its pages declare";
      return /\| `Result` \| `number` \| \*\*returned\*\*/.test(page)
        ? undefined
        : "the declared type is there but nothing marks it as the one the signature returns";
    },
  },
  {
    question: "What does `hmSetting.getScreenType` return?",
    why: "One of the eight signatures still naming a type no page defines. The run that hit it reported AMBIGUOUS and worked around it; the page must say the type is undocumented rather than leave a reader to assume the `screen_type` enum, which is the app scene and a different thing.",
    check: (base) =>
      /The signature returns `screenType` and no source on this page says what `screenType` is/.test(
        base.page("api/hmSetting.md"),
      )
        ? undefined
        : "api/hmSetting.md no longer states that its return type is undocumented",
  },
  {
    question: "How does a Device App page hand data to its Side Service?",
    why: "The gap that cost the third eval run its worst finding. The agent wrote `this.request({method, params})`; twelve sample call sites write `{type, params}`, and the receiving half destructures exactly that. Nothing was missing from the samples - the pieces were never put beside each other. This asks that they still are, and that putting them there never became an assertion that one reaches the other.",
    check: (base) => {
      const page = base.page("examples/application-2-0-post-health-data-miniprogram.md");
      if (!/## Messages passed between runtimes/.test(page)) {
        return "the sample page no longer shows how its runtimes pass messages";
      }
      if (!/const \{ type, params \} = req;/.test(page)) {
        return "the page no longer shows what a message carries, which is the fact a run guessed wrong";
      }
      return /only thing grouping them/.test(page)
        ? undefined
        : "the page groups the sites without stating that a shared literal is all that groups them";
    },
  },
];

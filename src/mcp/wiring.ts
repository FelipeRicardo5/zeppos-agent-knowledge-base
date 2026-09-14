import type { ExampleRecord, MessageSite, Runtime } from "../types.js";
import { type NotCovered, notCovered } from "./answer.js";
import type { Base } from "./base.js";

// "How does the Device App talk to the Side Service in this sample?"
//
// The question an eval run had to guess the answer to. It wrote
// `this.request({method, params})` where twelve sample call sites write
// `{type, params}` — not because the samples are silent, but because nothing
// assembled what they show.
//
// Assembling it is the whole difficulty. Isolated facts make the agent rebuild
// the architecture from scratch, which is how the guess happened; a rendered
// architecture turns an inference into a fact, which is worse. The resolution
// runs through this file:
//
//   **The view is a layout, not a claim.** Sites are grouped, and the grouping
//   states its own criterion — these share a string literal, and that equality
//   is the only thing relating them. The reader does the last step, holding
//   both citations.
//
// Three rules keep it honest, and each is a field rather than a footnote:
//
//   groupedBy    what makes these one group, said out loud
//   position     the syntactic fact under any label
//   notAsserted  what this response does *not* claim, in every response
//
// And the scope is one application. "How does cross-runtime communication work
// in Zepp OS" is not answerable from ten samples without inventing a rule, so
// this tool does not accept that question.

export interface WiringSite {
  runtime?: Runtime;
  /** The syntactic position. A label like "sends" is a reading; this is not. */
  position: MessageSite["position"];
  /** The statement, verbatim. */
  written: string;
  file: string;
  line: number;
}

export interface Channel {
  literal: string;
  /** Why these sites are one group. Never "these communicate". */
  groupedBy: string;
  runtimes: Runtime[];
  sites: WiringSite[];
}

export interface WiringAnswer {
  found: true;
  app: string;
  runtimesPresent: Runtime[];
  /** Literals written in more than one runtime of this app. */
  channels: Channel[];
  /** Literals this app writes in one runtime only — so silence is not completeness. */
  unpaired: Channel[];
  /**
   * Statements that show the shape a message travels in, verbatim.
   *
   * Never a synthesized signature. `request(options: {type: string})` would be
   * a type no source declares; `const { type, params } = req` is a line someone
   * wrote.
   */
  shapesObserved: WiringSite[];
  /** How many other apps write a literal in more than one runtime. A count. */
  alsoOccursIn: { apps: number; of: number; platforms: string[] };
  notAsserted: string[];
}

const NOT_ASSERTED = [
  "That a call at one site is received by a handler at another. No import, " +
    "symbol or declaration in these files links them — the shared literal is the " +
    "only observed connection.",
  "That this mechanism has a name. No source in this base names it.",
  "That these are all the channels. Only literals written in more than one of " +
    "the app's files were recorded; a tag built at runtime is invisible here.",
  "That the shape shown holds for any other app. It is what these files write.",
];

const GROUPED_BY =
  "every site below writes the same string literal. That equality is the only " +
  "thing relating them, and it is what this grouping is.";

function siteOf(site: MessageSite): WiringSite {
  return {
    runtime: site.runtime,
    position: site.position,
    written: site.code,
    file: site.file,
    line: site.line,
  };
}

function channelsOf(example: ExampleRecord): { channels: Channel[]; unpaired: Channel[] } {
  const channels: Channel[] = [];
  const unpaired: Channel[] = [];

  for (const message of example.messages ?? []) {
    const runtimes = [
      ...new Set(message.sites.map((s) => s.runtime).filter((r): r is Runtime => r !== undefined)),
    ].sort();

    const channel: Channel = {
      literal: message.value,
      groupedBy: GROUPED_BY,
      runtimes,
      sites: message.sites.map(siteOf),
    };

    if (runtimes.length > 1) channels.push(channel);
    else unpaired.push(channel);
  }

  return { channels, unpaired };
}

/**
 * The wiring of one sample app.
 *
 * Scoped to an app on purpose. Within one, co-location is observable; across
 * the corpus it would be a rule, and no source states one.
 */
export function describeWiring(base: Base, app: string): WiringAnswer | NotCovered {
  const example = base.examples.find((e) => e.id === app || e.name === app);
  if (!example) {
    return notCovered(
      app,
      base.examples
        .map((e) => e.id)
        .filter((id) => id.includes(app) || app.includes(id))
        .slice(0, 8),
    );
  }

  const { channels, unpaired } = channelsOf(example);

  const shapesObserved = (example.messageShapes ?? []).map(siteOf);

  const others = base.examples.filter(
    (e) =>
      e.id !== example.id &&
      (e.messages ?? []).some(
        (m) => new Set(m.sites.map((s) => s.runtime).filter(Boolean)).size > 1,
      ),
  );

  return {
    found: true,
    app: example.id,
    runtimesPresent: example.runtimes,
    channels,
    unpaired,
    shapesObserved,
    alsoOccursIn: {
      apps: others.length,
      of: base.examples.length,
      platforms: [...new Set(others.map((e) => e.platformVersion))].sort(),
    },
    notAsserted: NOT_ASSERTED,
  };
}

/** Which sample apps have wiring to describe, so a caller can pick one. */
export function listWiring(base: Base): { app: string; literals: number; runtimes: Runtime[] }[] {
  return base.examples
    .map((e) => ({
      app: e.id,
      literals: (e.messages ?? []).filter(
        (m) => new Set(m.sites.map((s) => s.runtime).filter(Boolean)).size > 1,
      ).length,
      runtimes: e.runtimes,
    }))
    .filter((e) => e.literals > 0)
    .sort((a, b) => b.literals - a.literals || a.app.localeCompare(b.app));
}

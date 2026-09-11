import type { ModuleFile } from "../store/index.js";

// Namespace relationships between modules.
//
// `hmSensor` holds three symbols and one of them is `id`; the 18 sensor ids and
// the shape each returns live in `hmSensor.id`, a module of its own. An eval run
// opened `api/hmSensor.md`, found a bare constant, and reported "nothing
// documents what a Step sensor returns" as the base's worst gap — while
// `api/hmSensor.id.md` stated `current` and `target` with types one file away.
// Two requirements were downgraded over a missing link.
//
// That is why this is here rather than inside the renderer that first needed
// it. The failure was never about Markdown: **a consumer that lists a module
// without naming its submodules reproduces it exactly**, and a tool server is
// now a second such consumer.
//
// Three pairs exist: `hmSensor`/`hmSensor.id`, `hmUI`/`hmUI.widget` and
// `@zos/ble`/`@zos/ble/TransferFile`. Both separators occur, because a dotted
// name is a global namespace and a slashed one is an importable submodule.

export interface Relatives {
  /** The module this one extends, if any. */
  parent?: string;
  /** Modules that extend this one. */
  children: string[];
}

export function relatives(module: string, all: ModuleFile[]): Relatives {
  const names = all.map((m) => m.module);
  return {
    parent: names.find((name) => module.startsWith(`${name}.`) || module.startsWith(`${name}/`)),
    children: names
      .filter((name) => name.startsWith(`${module}.`) || name.startsWith(`${module}/`))
      .sort(),
  };
}

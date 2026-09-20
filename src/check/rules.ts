import { coverageOf } from "../index/census.js";
import { moduleSlug } from "../store/index.js";
import type { Base } from "../mcp/base.js";
import type { ScannedApp } from "./scan.js";

// The rules, and the shape of a verdict.
//
// **Never pass/fail.** Measured against the 33 official samples, every app that
// passes still carries three to nine symbols with no stated level — the apps
// are correct and this base cannot say so. A boolean would have to call that
// either a pass, which certifies what nothing here certifies, or a failure,
// which is a lie about working code. So three outcomes, and the middle one is
// the honest majority:
//
//   VOUCHED       a record backs this, and it holds
//   UNVERIFIABLE  nothing here can say either way, and why
//   VIOLATION     a record backs this, and it is contradicted
//
// That is the eval's own scoring criterion, applied by machine instead of by
// hand.
//
// What each rule can actually do was measured before it was written. Runtime
// and permission work with real coverage; the level rule works only through
// `platforms[].deviceSource`, because the `targets` keys real manifests use
// join to zero devices out of 27 distinct names.

export type Status = "VOUCHED" | "UNVERIFIABLE" | "VIOLATION";

export interface Finding {
  status: Status;
  rule: "runtime" | "permission" | "api-level" | "manifest";
  /** What the finding is about: a symbol id, a permission code, a key. */
  subject: string;
  detail: string;
  file?: string;
  line?: number;
  /** Where to read the evidence in this base. */
  cite?: string;
}

function citeSymbol(base: Base, id: string): string | undefined {
  const record = base.symbols.get(id);
  if (!record) return undefined;
  return `api/${moduleSlug(record.module)}.md`;
}

/**
 * Does a file use a symbol its runtime is not attributed to?
 *
 * The strongest rule here: runtime attribution comes from the source path of
 * every record, never from page prose, and it fired on none of the 185
 * checkable file-by-symbol pairs in the sample corpus — the samples are clean
 * and the rule runs.
 */
export function checkRuntime(app: ScannedApp, base: Base): Finding[] {
  const findings: Finding[] = [];

  for (const file of app.files) {
    for (const used of file.imports) {
      const record = base.symbols.get(used.id);
      if (!record) {
        findings.push({
          status: "UNVERIFIABLE",
          rule: "runtime",
          subject: used.id,
          detail:
            "No record in this base carries that id, so which runtimes it is " +
            "valid in is unknown. Not covered, never non-existent.",
          file: file.path,
          line: used.line,
          cite: "api/lookup.md",
        });
        continue;
      }
      if (record.runtimes.length === 0) {
        findings.push({
          status: "UNVERIFIABLE",
          rule: "runtime",
          subject: used.id,
          detail: "The record states no runtime, so this use cannot be checked.",
          file: file.path,
          line: used.line,
          cite: citeSymbol(base, used.id),
        });
        continue;
      }
      findings.push(
        record.runtimes.includes(file.runtime)
          ? {
              status: "VOUCHED",
              rule: "runtime",
              subject: used.id,
              detail: `Attributed to ${record.runtimes.join(", ")}; this file is ${file.runtime}.`,
              file: file.path,
              line: used.line,
              cite: citeSymbol(base, used.id),
            }
          : {
              status: "VIOLATION",
              rule: "runtime",
              subject: used.id,
              detail:
                `Attributed to ${record.runtimes.join(", ")}, and this file is ` +
                `${file.runtime}. Attribution comes from the source path the record ` +
                "was extracted from, not from any statement in its own text.",
              file: file.path,
              line: used.line,
              cite: citeSymbol(base, used.id),
            },
      );
    }
  }

  return findings;
}

/**
 * Does the manifest declare the permissions the symbols used demand?
 *
 * Applicable to 20 of the 33 samples, which between them demand 46 permissions,
 * and it fires on none of them. The rule works; what it cannot do is notice a
 * permission nobody documented — and only the Device App tree documents any.
 */
export function checkPermissions(app: ScannedApp, base: Base): Finding[] {
  if (!app.manifest) return [];

  const declared = new Set(app.manifest.permissions);
  const findings: Finding[] = [];
  const demanded = new Map<string, string>();
  const runtimesUsed = new Set(app.files.map((f) => f.runtime));

  for (const file of app.files) {
    for (const used of file.imports) {
      for (const code of base.symbols.get(used.id)?.permissions ?? []) {
        demanded.set(code, used.id);
      }
    }
  }

  for (const [code, by] of demanded) {
    findings.push(
      declared.has(code)
        ? {
            status: "VOUCHED",
            rule: "permission",
            subject: code,
            detail: `Demanded by \`${by}\` and declared in app.json.`,
            cite: citeSymbol(base, by),
          }
        : {
            status: "VIOLATION",
            rule: "permission",
            subject: code,
            detail:
              `\`${by}\` states this permission and app.json does not declare it. ` +
              "An undeclared permission fails at runtime on the device, not at build.",
            cite: "manifest/index.md",
          },
    );
  }

  // Runtimes where nothing documents a permission at all. Silence there is not
  // a clean bill: an empty array is the citable choice, never a verified one.
  for (const runtime of [...runtimesUsed].sort()) {
    const coverage = coverageOf(base.census, runtime).find((c) => c.field === "permissions");
    if (!coverage || coverage.stated > 0) continue;
    findings.push({
      status: "UNVERIFIABLE",
      rule: "permission",
      subject: runtime,
      detail:
        `No symbol attributed to ${runtime} states a permission in this base ` +
        `(0 of ${coverage.total}), and no upstream page in that tree mentions one. ` +
        "Whether this app needs one there is unknown, not settled.",
      cite: `runtimes/${runtime}.md`,
    });
  }

  return findings;
}

/**
 * Will every symbol used run on the weakest device the manifest targets?
 *
 * Reached through `platforms[].deviceSource` and nothing else. Real manifests
 * name hardware two ways and only one of them joins: across the samples, the 27
 * distinct `targets` keys match zero devices while the `deviceSource` ids match
 * 32 of 33. A rule reading `targets` would have silently checked nothing.
 */
export function checkApiLevel(app: ScannedApp, base: Base): Finding[] {
  const findings: Finding[] = [];
  if (!app.manifest) return findings;

  const devices = app.manifest.deviceSources
    .map((id) => base.devices.find((d) => d.deviceSources.some((s) => String(s.id) === id)))
    .filter((d): d is NonNullable<typeof d> & { latestApiLevel: number } =>
      d !== undefined && d.latestApiLevel !== undefined,
    );

  if (devices.length === 0) {
    findings.push({
      status: "UNVERIFIABLE",
      rule: "api-level",
      subject: "targets",
      detail:
        app.manifest.deviceSources.length === 0
          ? "The manifest names no `platforms[].deviceSource`, which is the only key " +
            "that resolves to a device here. The `targets` keys are chosen per " +
            "project and join to nothing."
          : "None of the declared deviceSource ids matches a device in this base, " +
            "so no API_LEVEL ceiling can be established.",
      cite: "compatibility/devices.md",
    });
    return findings;
  }

  const floor = Math.min(...devices.map((d) => d.latestApiLevel));
  const weakest = devices.find((d) => d.latestApiLevel === floor)!;
  const seen = new Set<string>();

  for (const file of app.files) {
    for (const used of file.imports) {
      if (seen.has(used.id)) continue;
      seen.add(used.id);

      const record = base.symbols.get(used.id);
      if (!record || record.minApiLevel === undefined) {
        findings.push({
          status: "UNVERIFIABLE",
          rule: "api-level",
          subject: used.id,
          detail: record
            ? "No source states a minimum API_LEVEL for this symbol, so whether it " +
              `runs on ${weakest.name} is unknown. Absence of evidence, not a pass.`
            : "No record in this base carries that id.",
          file: file.path,
          line: used.line,
          cite: record ? citeSymbol(base, used.id) : "api/lookup.md",
        });
        continue;
      }

      findings.push(
        record.minApiLevel <= floor
          ? {
              status: "VOUCHED",
              rule: "api-level",
              subject: used.id,
              detail: `States a minimum of ${record.minApiLevel}; ${weakest.name} reaches ${floor}.`,
              file: file.path,
              line: used.line,
              cite: citeSymbol(base, used.id),
            }
          : {
              status: "VIOLATION",
              rule: "api-level",
              subject: used.id,
              detail:
                `States a minimum of ${record.minApiLevel}, above the ${floor} that ` +
                `${weakest.name} reaches — the weakest device this manifest targets.`,
              file: file.path,
              line: used.line,
              cite: citeSymbol(base, used.id),
            },
      );
    }
  }

  return findings;
}

/** Is there a manifest at all, and does it name hardware a device list can resolve? */
export function checkManifest(app: ScannedApp): Finding[] {
  if (!app.manifest) {
    return [
      {
        status: "VIOLATION",
        rule: "manifest",
        subject: "app.json",
        detail: "No readable app.json at the app root. Nothing about targeting can be checked.",
        cite: "manifest/index.md",
      },
    ];
  }

  const findings: Finding[] = [];
  if (app.manifest.targets.length > 0 && app.manifest.deviceSources.length === 0) {
    findings.push({
      status: "UNVERIFIABLE",
      rule: "manifest",
      subject: "targets",
      detail:
        `The manifest names ${app.manifest.targets.length} target(s) and no ` +
        "`platforms[].deviceSource`. Target keys are chosen per project and name " +
        "asset directories, not hardware — nothing here can turn them into devices.",
      cite: "manifest/targets.md",
    });
  }
  return findings;
}

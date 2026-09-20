import type { Base } from "../mcp/base.js";
import { type Finding, type Status, checkApiLevel, checkManifest, checkPermissions, checkRuntime } from "./rules.js";
import { type ScannedApp, scanApp } from "./scan.js";

// `check <app>`: the eval's scoring criterion, applied by machine.
//
// Three evaluation runs all finished and all failed the same way — they
// delivered working-looking code the base could not vouch for. Scoring that by
// hand is what the eval does; this does it to any app, in a second.
//
// It reports what this base can say, which is less than a linter would claim
// and more than nothing. `notChecked` ships in every report for the rest: a
// checker that lists only what it found teaches a reader that silence is
// approval, and that is the exact reading this project exists to prevent.

export type { Finding, Status } from "./rules.js";

export interface CheckReport {
  app: string;
  /** From `data/manifest.json`, so a report can be compared with another. */
  baseVersion: string;
  counts: Record<Status, number>;
  findings: Finding[];
  /** What this check does not look at. Never omitted. */
  notChecked: string[];
}

const NOT_CHECKED = [
  "Whether the code compiles or runs. Nothing here executes anything — a build " +
    "would catch what this cannot, and vice versa.",
  "Methods called on a value (`text.setProperty(...)`). The receiver's type is " +
    "never resolved, so a name match would accuse the wrong symbol.",
  "Cross-runtime message tags. Nothing in a sample links a call to a handler, " +
    "so a missing handler is not something this base can assert.",
  "Any symbol this base does not cover. A missing record means not covered, " +
    "never that the symbol does not exist — those appear as UNVERIFIABLE, not as " +
    "violations.",
  "Permissions in runtimes where nothing documents any. Only the Device App " +
    "tree states permissions upstream.",
];

/** Most severe first, then by rule and subject, so two runs read the same way. */
const ORDER: Record<Status, number> = { VIOLATION: 0, UNVERIFIABLE: 1, VOUCHED: 2 };

export function checkScanned(app: ScannedApp, base: Base, name: string): CheckReport {
  const findings = [
    ...checkManifest(app),
    ...checkRuntime(app, base),
    ...checkPermissions(app, base),
    ...checkApiLevel(app, base),
  ].sort(
    (a, b) =>
      ORDER[a.status] - ORDER[b.status] ||
      a.rule.localeCompare(b.rule) ||
      a.subject.localeCompare(b.subject),
  );

  const counts: Record<Status, number> = { VOUCHED: 0, UNVERIFIABLE: 0, VIOLATION: 0 };
  for (const finding of findings) counts[finding.status]++;

  return { app: name, baseVersion: base.manifest.version, counts, findings, notChecked: NOT_CHECKED };
}

/** Read an app from disk and check it. */
export async function check(root: string, base: Base): Promise<CheckReport> {
  return checkScanned(await scanApp(root), base, root);
}

/**
 * The report as text.
 *
 * Leads with the counts, because the shape of the answer is the answer: a run
 * with no violations and forty unverifiable claims has not been approved.
 */
export function formatReport(report: CheckReport): string {
  const lines = [
    `${report.app} — checked against base ${report.baseVersion}`,
    "",
    `  ${report.counts.VIOLATION} violation(s), ${report.counts.UNVERIFIABLE} unverifiable, ` +
      `${report.counts.VOUCHED} vouched`,
    "",
  ];

  if (report.counts.VIOLATION === 0 && report.counts.UNVERIFIABLE > 0) {
    lines.push(
      "  No violation is not approval. Every unverifiable line below is something",
      "  this base cannot speak to, and the code may still be wrong there.",
      "",
    );
  }

  for (const finding of report.findings) {
    const where = finding.file ? ` ${finding.file}:${finding.line}` : "";
    lines.push(`  [${finding.status}] ${finding.rule} — ${finding.subject}${where}`);
    lines.push(`      ${finding.detail}`);
    if (finding.cite) lines.push(`      see ${finding.cite}`);
  }

  lines.push("", "  Not checked:");
  for (const item of report.notChecked) lines.push(`    - ${item}`);

  return lines.join("\n");
}

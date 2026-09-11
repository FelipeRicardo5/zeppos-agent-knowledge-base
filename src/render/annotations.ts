import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Annotation, SymbolRecord } from "../types.js";

// Reading the one hand-written input, and checking it has not rotted.
//
// The mechanism is deliberately small. Measured against a full session of work,
// almost everything worth annotating turned out to be extractable after all —
// a sensor's return shape, a widget's lifecycle, two "conflicts" that were not
// conflicts. What is left is narrow: upstream contradicting itself, where no
// source can be quoted because the sources disagree.
//
// So this is not an override layer. It cannot change an extracted value, and
// `render` shows what it says beside the fact rather than instead of it.

const ANNOTATIONS_FILE = "symbols.json";

export interface StaleAnnotation {
  annotation: Annotation;
  /** Why it no longer holds, in a sentence a reader can act on. */
  reason: string;
}

function isAnnotation(value: unknown): value is Annotation {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<Annotation>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.note === "string" &&
    typeof candidate.date === "string" &&
    typeof candidate.confidence === "string"
  );
}

/**
 * Every annotation, or none when the directory is absent.
 *
 * A missing file is the normal state of a repository that has nothing to say by
 * hand, so it is not an error. A malformed one *is*: silently dropping a human
 * judgement is worse than failing the run that would have hidden it.
 */
export async function readAnnotations(annotationsDir: string): Promise<Annotation[]> {
  let raw: string;
  try {
    raw = await readFile(path.join(annotationsDir, ANNOTATIONS_FILE), "utf-8");
  } catch {
    return [];
  }

  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every(isAnnotation)) {
    throw new Error(
      `${ANNOTATIONS_FILE}: expected an array of { id, confidence, note, date }`,
    );
  }

  return parsed as Annotation[];
}

/**
 * Annotations whose ground has moved.
 *
 * Two ways that happens, and both have to be caught, because the value of a
 * hand-written note decays exactly as fast as the data under it changes:
 *
 *   the symbol is gone     upstream deleted or renamed it, so the note is about
 *                          nothing.
 *   a pinned value changed the note was written against a description, a name or
 *                          a level that is no longer what it was.
 */
export function staleAnnotations(
  annotations: Annotation[],
  symbols: Map<string, SymbolRecord>,
): StaleAnnotation[] {
  const stale: StaleAnnotation[] = [];

  for (const annotation of annotations) {
    const record = symbols.get(annotation.id);
    if (record === undefined) {
      stale.push({ annotation, reason: "no symbol has this id any more" });
      continue;
    }

    for (const [field, expected] of Object.entries(annotation.writtenAgainst ?? {})) {
      const actual = (record as unknown as Record<string, unknown>)[field];
      if (String(actual) !== expected) {
        stale.push({
          annotation,
          reason: `\`${field}\` was ${JSON.stringify(expected)} when this was written and is now ${JSON.stringify(String(actual))}`,
        });
      }
    }
  }

  return stale;
}

/** Annotations for one symbol, in the order they were written. */
export function annotationsFor(annotations: Annotation[], id: string): Annotation[] {
  return annotations.filter((annotation) => annotation.id === id);
}

/**
 * One annotation as it appears under a symbol.
 *
 * Visibly not extraction: its own heading, its tier and its date. A reader has
 * to be able to tell, at a glance, that a person wrote this and when — the
 * whole base rests on every other statement tracing to a source.
 */
export function annotationLines(annotation: Annotation): string[] {
  return [
    `> **Note — \`${annotation.confidence}\`, written ${annotation.date}.** Not extracted from any`,
    "> source: a human judgement about what the sources say, kept here because they",
    "> disagree and none of them can be quoted for it.",
    ">",
    `> ${annotation.note}`,
    "",
  ];
}

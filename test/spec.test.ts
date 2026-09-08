import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { extractShapes, extractSignature } from "../src/parse/spec.js";

// Both eval runs found the same root gap: the base recorded that a symbol exists
// and never how to call it. The documentation did state it — 182 of 269 reference
// pages carry a signature, and each of the 13 Settings App components carries a
// full property table — and the extractor was walking past all of it.

const SETTINGS_COMPONENT = `---
title: Select
---

## Type

\`\`\`ts
(props: Props) => result: RenderFunc
\`\`\`

### Props: object

| Name     | Description    | Required | Type                        | Default |
| -------- | -------------- | -------- | --------------------------- | ------- |
| label    | select label   | NO       | \`string\`                    | -       |
| multiple | multiple       | YES      | \`boolean\`                   | \`false\` |
| options  | select options | NO       | \`Array<SelectOption>\`       | -       |

### SelectOption: object

| Name  | Description  | Required | Type     | Default |
| ----- | ------------ | -------- | -------- | ------- |
| name  | option name  | NO       | \`string\` | -       |
`;

// device-app tables disagree on column order *and* wording, and carry a level
// per property that the settings tables do not have.
const DEVICE_PAGE = `# cancel

> Start from API_LEVEL \`3.0\`.

Cancels the timer.

## Type

\`\`\`ts
function cancel(option: Option): void
\`\`\`

## Parameters

### Option

| Property | Type     | Required | DefaultValue | Description  | API_LEVEL |
| -------- | -------- | -------- | ------------ | ------------ | --------- |
| id       | \`number\` | YES      | -            | the alarm id | 3.0       |
`;

describe("extractSignature", () => {
  it("reads the ts block under a Type heading, verbatim", () => {
    // `(props: Props) => result: RenderFunc` is not valid TypeScript. Parsing it
    // into parts would either lose information or invent a shape.
    assert.equal(extractSignature(SETTINGS_COMPONENT), "(props: Props) => result: RenderFunc");
    assert.equal(extractSignature(DEVICE_PAGE), "function cancel(option: Option): void");
  });

  it("returns nothing when the page states no signature", () => {
    assert.equal(extractSignature("# x\n\nSome prose.\n"), undefined);
  });

  it("ignores a code block that is not under a Type heading", () => {
    const page = "# x\n\n## Example\n\n```ts\nconst a = 1\n```\n";

    assert.equal(extractSignature(page), undefined);
  });
});

describe("extractShapes", () => {
  it("names each shape after the heading above its table", () => {
    // The signature refers to these by name: `(props: Props)` is unusable
    // without `Props`, and `options` is unusable without `SelectOption`.
    const shapes = extractShapes(SETTINGS_COMPONENT);

    assert.deepEqual(
      shapes.map((s) => s.name),
      ["Props", "SelectOption"],
      "the `: object` annotation is noise, not part of the name",
    );
  });

  it("resolves columns by header name, not by position", () => {
    // Settings tables are Name/Description/Required/Type/Default; device-app
    // tables are Property/Type/Required/DefaultValue/Description/API_LEVEL. A
    // positional read files a type as a description on one of them.
    const settings = extractShapes(SETTINGS_COMPONENT)[0].props;
    const device = extractShapes(DEVICE_PAGE)[0].props;

    assert.deepEqual(settings[0], {
      name: "label",
      description: "select label",
      required: false,
      type: "string",
    });
    assert.deepEqual(device[0], {
      name: "id",
      description: "the alarm id",
      required: true,
      type: "number",
      apiLevel: 3,
    });
  });

  it("reads YES and NO into a boolean and keeps a stated default", () => {
    const props = extractShapes(SETTINGS_COMPONENT)[0].props;
    const multiple = props.find((p) => p.name === "multiple");

    assert.equal(multiple?.required, true);
    assert.equal(multiple?.default, "false");
  });

  it("treats `-` as absent rather than as a value", () => {
    const label = extractShapes(SETTINGS_COMPONENT)[0].props.find((p) => p.name === "label");

    assert.equal(label?.default, undefined, "`-` is the table's empty cell");
  });

  it("keeps a per-property API_LEVEL, which the symbol's own does not imply", () => {
    // A symbol available at one level can have a property that is not.
    const props = extractShapes(DEVICE_PAGE)[0].props;

    assert.equal(props[0].apiLevel, 3);
  });

  it("finds no shape on a page with no property table", () => {
    assert.deepEqual(extractShapes("# x\n\n## Type\n\n```ts\nvoid\n```\n"), []);
  });

  it("ignores a table that is not a property table", () => {
    // The device list and revision history are tables too.
    const page = "# x\n\n## Devices\n\n| Equipment | Screen |\n| --- | --- |\n| Bip 6 | square |\n";

    assert.deepEqual(extractShapes(page), []);
  });

  it("strips code markup from a cell without losing the value", () => {
    const page =
      "# x\n\n## Parameters\n\n| Property | Type | Description |\n| --- | --- | --- |\n" +
      "| opt | <code>object</code> | an option |\n";

    assert.deepEqual(extractShapes(page)[0].props[0], {
      name: "opt",
      type: "object",
      description: "an option",
    });
  });
});

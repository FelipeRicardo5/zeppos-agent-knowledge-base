import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  extractEnums,
  extractMembers,
  extractShapes,
  extractSignature,
  withoutMembers,
} from "../src/parse/spec.js";

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

  it("reads the name column whether it is headed `Property` or `Properties`", () => {
    // The plural was missing from the column map, and the failure was silent:
    // the header still passed on Description/Required/Type, then every row came
    // back without a name and was dropped one at a time. 32 reference pages head
    // the column that way — the whole `ui/widget/` tree — so `TEXT`, `IMG` and
    // `BUTTON` carried a description and a level and no property table, which is
    // the one thing needed to draw them.
    const plural = `## Param: object

| Properties | Description                    | Required | Type     |
| ---------- | ------------------------------ | -------- | -------- |
| x          | The x-axis coordinate          | YES      | \`number\` |
| align_h    | Alignment of the horizontal    | NO       | \`ALIGN\`  |
`;

    const [shape] = extractShapes(plural);

    assert.equal(shape.name, "Param");
    assert.deepEqual(shape.props, [
      { name: "x", description: "The x-axis coordinate", required: true, type: "number" },
      { name: "align_h", description: "Alignment of the horizontal", required: false, type: "ALIGN" },
    ]);
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

// --- Enums ------------------------------------------------------------------
//
// Every fixture below is a real page, trimmed. The last three are the ones that
// mattered: a table with two enums in it, a table upstream broke, and a property
// table that is not an enum at all but read as one until the header check got
// stricter.

/** `ui/widget/TEXT.mdx` — two qualified tables under headings that do not name them. */
const TEXT_WIDGET = `# TEXT

### ALIGN alignment

| Value          | Description                   |
| -------------- | ----------------------------- |
| align.LEFT     | Horizontal axis-left aligned  |
| align.CENTER_H | Horizontal axis-centered      |

### TEXT_STYLE Text layout

| Value               | Description   |
| ------------------- | ------------- |
| text_style.NONE     | Scrolling text |
| text_style.WRAP     | Line wrap     |
`;

describe("extractEnums", () => {
  it("names a qualified enum after the value prefix, not the heading above it", () => {
    // `### ALIGN alignment` and `### TEXT_STYLE Text layout` name neither enum
    // in a form you could write in code. The values do: `align.LEFT` says the
    // enum is `align`, which is a symbol of its own that this page merely hosts.
    const [align, textStyle] = extractEnums(TEXT_WIDGET);

    assert.equal(align.name, "align");
    assert.equal(align.qualified, true);
    assert.deepEqual(
      align.members.map((m) => m.value),
      ["LEFT", "CENTER_H"],
    );
    assert.equal(align.members[0].description, "Horizontal axis-left aligned");
    assert.equal(textStyle.name, "text_style");
    assert.equal(textStyle.partial, undefined);
  });

  it("splits one table into one enum per prefix", () => {
    // `crypto/ECDSACrypto.mdx` puts two enums in a single table, so a table maps
    // to a list of enums rather than to one. Reading the heading as the name
    // would have filed both under `createCrypto`.
    const ecdsa = `## createCrypto

| Value              | Description              | API_LEVEL |
| ------------------ | ------------------------ | --------- |
| \`alg.ECDSA\`        | ECDSA digital signature  | \`3.0\`     |
| \`ecp_dp.SECP192K1\` | SECP192K1 elliptic curve | \`3.0\`     |
| \`ecp_dp.SECP224K1\` | SECP224K1 elliptic curve | \`3.0\`     |
`;

    const specs = extractEnums(ecdsa);

    assert.deepEqual(
      specs.map((s) => [s.name, s.members.map((m) => m.value)]),
      [
        ["alg", ["ECDSA"]],
        ["ecp_dp", ["SECP192K1", "SECP224K1"]],
      ],
    );
    assert.equal(specs[0].members[0].apiLevel, 3);
  });

  it("flags a qualified table as partial instead of inventing members from its damage", () => {
    // `ui/createWidget.mdx` verbatim: one readable value, one whose markup
    // upstream broke, and a row saying the rest are not listed. Reading three
    // members would state that the most used enum in Zepp OS has three values.
    const createWidget = `### WIDGET_ID

| Value           | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| \`widget.BUTTON\` | Button widget ID.                                                       |
| IMG\`            | Image widget ID.                                                        |
| ...             | The rest of the values are not listed, refer to the \`widget\` directory. |
`;

    const [widget] = extractEnums(createWidget);

    assert.equal(widget.name, "widget");
    assert.deepEqual(
      widget.members.map((m) => m.value),
      ["BUTTON"],
    );
    assert.equal(widget.partial, true);
  });

  it("reads a bare table as a value domain named by its heading", () => {
    // `sensor/BloodOxygen.mdx`. `retCode` is not a name you can write in code —
    // it is the domain of a value the page's symbol returns — so it stays on
    // that symbol rather than becoming one.
    const retCode = `#### retCode

| Value | Type                | Description         | API_LEVEL |
| ----- | ------------------- | ------------------- | --------- |
| 0     | <code>number</code> | Measurement invalid | 2.0       |
| 1     | <code>number</code> | Continue measuring  | 2.0       |
`;

    const [spec] = extractEnums(retCode);

    assert.equal(spec.name, "retCode");
    assert.equal(spec.qualified, false);
    assert.deepEqual(spec.members, [
      { value: "0", type: "number", description: "Measurement invalid", apiLevel: 2, confidence: "OFFICIAL" },
      { value: "1", type: "number", description: "Continue measuring", apiLevel: 2, confidence: "OFFICIAL" },
    ]);
  });

  it("keeps a per-member API_LEVEL, which the owning symbol's does not imply", () => {
    // `ui/widget/SYSTEM_KEYBOARD.mdx`: the widget is 4.0 and so are four of the
    // five input types, but `JSKB` is 4.2.
    const keyboard = `### \`inputType\` Enum

| Value           | Description        | API_LEVEL |
| --------------- | ------------------ | --------- |
| inputType.NUM   | Number keyboard    | 4.0       |
| inputType.JSKB  | Custom Keyboard    | 4.2       |
`;

    const [spec] = extractEnums(keyboard);

    assert.equal(spec.name, "inputType");
    assert.deepEqual(
      spec.members.map((m) => [m.value, m.apiLevel]),
      [
        ["NUM", 4],
        ["JSKB", 4.2],
      ],
    );
  });

  it("does not read a property table whose first data row is named `value`", () => {
    // The bug this check exists for, and it survived the first aggregate run.
    // `sensor/BloodOxygen.mdx` documents a `Result` shape headed `| Property |`,
    // whose first data row is `| value | number | ... |`. Matching a header on
    // the cell alone promoted that data row to a header and invented an enum
    // named `Result` with members `time` and `retCode`. A header is the row a
    // separator follows; a data row is not.
    const result = `#### Result

| Property | Type                | Description                     | API_LEVEL |
| -------- | ------------------- | ------------------------------- | --------- |
| value    | <code>number</code> | Blood oxygen measurement values | 2.0       |
| time     | <code>number</code> | Measurement time                | 2.0       |
| retCode  | <code>number</code> | Result code                     | 2.0       |
`;

    assert.deepEqual(extractEnums(result), []);
    // The same table is still a shape, which is what it always was.
    assert.deepEqual(extractShapes(result)[0].props.map((p) => p.name), ["value", "time", "retCode"]);
  });

  it("skips a value table with no heading to name it", () => {
    // `related-resources/language-list.mdx` opens with one: a real value domain
    // (what `getLanguage` returns) belonging to a symbol on another page, which
    // this front has no way to resolve. Naming it after the file would attach 34
    // members to a symbol that does not exist.
    const orphan = `---
title: Multilingual Mapping
---

| Value | Code Abbreviation | Language / Country |
| ----- | ----------------- | ------------------ |
| 0     | zh-CN             | Simplified Chinese |
`;

    assert.deepEqual(extractEnums(orphan), []);
  });

  it("finds no enum on a page with no value table", () => {
    assert.deepEqual(extractEnums(SETTINGS_COMPONENT), []);
  });
});

// --- Members ----------------------------------------------------------------
//
// What you call on a value rather than on a module. The base had none of these:
// eval 02 listed "a sensor instance's accessors" as an open gap, and `examples/`
// could only reach them by matching a bare method name against the symbol table.

/** `sensor/BloodOxygen.mdx`, trimmed. Two methods, one with its own level. */
const SENSOR_PAGE = `---
title: BloodOxygen
---

> Start from API_LEVEL \`2.0\`.

Blood oxygen Sensor.

## Methods

### getCurrent

Get the current measured blood oxygen result

\`\`\`ts
getCurrent(): Result
\`\`\`

#### Result

| Property | Type                | Description       | API_LEVEL |
| -------- | ------------------- | ----------------- | --------- |
| value    | <code>number</code> | Measurement value | 2.0       |

#### retCode

| Value | Type                | Description         | API_LEVEL |
| ----- | ------------------- | ------------------- | --------- |
| 0     | <code>number</code> | Measurement invalid | 2.0       |

### start

> Start from API_LEVEL \`2.1\`

Start blood oxygen measurement

\`\`\`ts
start(): void
\`\`\`

## Example

\`\`\`js
import { BloodOxygen } from '@zos/sensor'
\`\`\`
`;

describe("extractMembers", () => {
  it("reads each method under `## Methods` with its signature and prose", () => {
    const members = extractMembers(SENSOR_PAGE);

    assert.deepEqual(
      members.map((m) => [m.name, m.signature]),
      [
        ["getCurrent", "getCurrent(): Result"],
        ["start", "start(): void"],
      ],
    );
    assert.equal(members[0].description, "Get the current measured blood oxygen result");
  });

  it("keeps a member's own API_LEVEL, which the symbol's does not imply", () => {
    // `BloodOxygen` is 2.0 and its `start` is 2.1, so an app targeting 2.0 can
    // construct the sensor and not drive it. Taking the page badge for both
    // would state that it can.
    const [getCurrent, start] = extractMembers(SENSOR_PAGE);

    assert.equal(getCurrent.apiLevel, undefined);
    assert.equal(start.apiLevel, 2.1);
    // The badge is a claim about the level, never part of the prose.
    assert.equal(start.description, "Start blood oxygen measurement");
  });

  it("files a member's tables on the member, not on the page", () => {
    // 72 of the 84 property and value tables on these pages sit inside a
    // `Methods` section. `retCode` is what `getCurrent` returns; filing it on
    // the page said the sensor itself had a result code.
    const [getCurrent] = extractMembers(SENSOR_PAGE);

    assert.deepEqual(getCurrent.shapes?.map((s) => s.name), ["Result"]);
    assert.deepEqual(getCurrent.enums?.map((e) => e.name), ["retCode"]);
    assert.deepEqual(extractShapes(withoutMembers(SENSOR_PAGE)), []);
    assert.deepEqual(extractEnums(withoutMembers(SENSOR_PAGE)), []);
  });

  it("reads the deeper nesting the crypto pages use", () => {
    // `crypto/AESCrypto.mdx`: `## AESCrypto` then `### Methods` then `####`.
    // The depth is read off the heading rather than assumed, because assuming
    // `###` would have found nothing on all four crypto pages.
    const crypto = `## AESCrypto

AES-CBC symmetric encryption instance.

### Methods

#### encrypt

Encrypt data whose length is a multiple of 16 bytes

\`\`\`ts
encrypt(data: createCrypto.AESData): AESCipherResult | undefined
\`\`\`

##### AESCipherResult

| Property | Type                     | Description    |
| -------- | ------------------------ | -------------- |
| data     | <code>ArrayBuffer</code> | Encrypted data |
`;

    const [encrypt] = extractMembers(crypto);

    assert.equal(encrypt.name, "encrypt");
    assert.equal(encrypt.signature, "encrypt(data: createCrypto.AESData): AESCipherResult | undefined");
    assert.deepEqual(encrypt.shapes?.map((s) => s.name), ["AESCipherResult"]);
  });

  it("leaves out a heading whose own example imports it", () => {
    // `ui/widget/SYSTEM_KEYBOARD.mdx` lists `deleteKeyboard()` under `## Methods`
    // and imports it — a module function documented beside the widget, not a
    // member of it. One case in 257, and filing it here would both invent a
    // member and shadow a symbol that already has a record.
    const keyboard = `## Methods

### deleteKeyboard()

Exit and destroy the current keyboard input interface

\`\`\`js
import { deleteKeyboard } from '@zos/ui'
\`\`\`
`;

    assert.deepEqual(extractMembers(keyboard), []);
  });

  it("strips the empty parentheses a heading writes after a member name", () => {
    // The parentheses are the page's, not the name's. They also have to go
    // before the import check runs, or `deleteKeyboard()` never matches
    // `import { deleteKeyboard }` and gets filed as a member of the widget.
    const page = `## Methods

### clear()

Empty the store

\`\`\`ts
clear(): void
\`\`\`
`;

    assert.equal(extractMembers(page)[0].name, "clear");
  });

  it("finds no members on a page with no Methods section", () => {
    assert.deepEqual(extractMembers(SETTINGS_COMPONENT), []);
    assert.equal(withoutMembers(SETTINGS_COMPONENT), SETTINGS_COMPONENT);
  });
});

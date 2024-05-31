# asu-regex-js

![jsr](https://jsr.io/badges/@fs-frost/asu)
![main](https://github.com/FS-Frost/asu-regex-js/actions/workflows/main.yml/badge.svg)

Parser to work with SubStation Alpha Subtitles (SSA/ASS) in TypeScript and JavaScript.

[Read the documentation](https://fs-frost.github.io/asu-regex-js/docs)

[Try the interactive playground](https://fs-frost.github.io/asu-regex-js)

## Installation

### JSR (JavaScript Registry)

```sh
bunx jsr add @fs-frost/asu
```

For npm, yarn, etc., check out https://jsr.io/@fs-frost/asu.

### Manually

Bundled files for bun, node and browser are available on [\build](https://github.com/FS-Frost/asu-regex-js/tree/main/build).

## Examples

Check out the [tests](https://github.com/FS-Frost/asu-regex-js/blob/main/src/asu.test.ts) or the [playground](https://fs-frost.github.io/asu-regex-js) for more examples.

### Parse a dialogue

```ts
import * as asu from "@fs-frost/asu";

// Update font size from 32 to 16
const text = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\pos(182,421)}LINE 1";

const line = asu.parseLine(text);
if (line == null) {
    console.error("invalid line");
    return;
}

line.style = "Oreki";
line.content = "Some {\\i1}other{\\i0} text";

console.log(asu.lineToString(line));
// Dialogue: 0,1:23:45.67,2:34:56.78,Oreki,actor,12,23,34,fx,Some {\i1}other{\i0} text
```

### Set tag

```ts
import * as asu from "@fs-frost/asu";

// Update font size from 32 to 16
const text = "{\\be2\\fs32}Kirino-san";
const items = asu.parseContent(text);
asu.setFs(items, 16);

console.log(asu.contentsToString(items));
// {\be2\fs16}Kirino-san
```
### Find tag

```ts
import * as asu from "@fs-frost/asu";

// find blur
const text = "{\\blur2\\fs32}Kirino-san";
const items = asu.parseContent(text);
const tagBlur = asu.findBlur(items);
if (tagBlur == null) {
    console.error("blur not found");
    return;
}

tagBlur.value = 4;
console.log(asu.contentsToString(items));
// {\blur4\fs32}Kirino-san
```

### Create tag

```ts
import * as asu from "@fs-frost/asu";

// Create pos
const text = "{\\be2\\fs32}Kirino-san";
const items = asu.parseContent(text);
asu.setPos(items, -20, 67.9);

console.log(asu.contentsToString(items));
// {\be2\fs32\pos(-20,67.9)}Kirino-san
```

## Dev requeriments

- [Bun (JavaScript runtime)](https://bun.sh/)

To install JS dependencies:
```sh
bun install
```

## Run tests

```sh
bun test --coverage
```

## Bundle

```sh
bun bundle
```

## Publish to JSR

```sh
bun run publish
```

# Applications using Asu

- [Asu for SyncRajo Fansub](https://github.com/FS-Frost/asu-web)
- [Asu Playground](https://fs-frost.github.io/asu-regex-js)

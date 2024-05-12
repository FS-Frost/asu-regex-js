# asu-regex-js

Library to work with SubStation Alpha Subtitles (SSA/ASS).

## How to use

### Set tag

```ts
import * as asu from "asu";

// Update font size from 32 to 16
const dialogue = "{\\be2\\fs32}Kirino-san";
const items = asu.parseContent(text);
asu.setFs(items, 16);

console.log(asu.contentsToString(items));
// {\be2\fs16}Kirino-san
```
### Find tag

```ts
import * as asu from "asu";

// find blur
const dialogue = "{\\blur2\\fs32}Kirino-san";
const items = asu.parseContent(text);
const tagBlur = asu.findBlur(items);
if (tagBlur != null) {
    console.log("blur found", tagBlur);
}
```

### Create tag

```ts
import * as asu from "asu";

// Create pos
const dialogue = "{\\be2\\fs32}Kirino-san";
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
bun test
```

## Bundle

```sh
bun bundle
```

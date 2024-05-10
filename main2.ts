import * as re from "magic-regexp";

export enum TagName {
    fs = "fs",
    be = "be",
    i = "i",
    pos = "pos",
    move = "move",
    t = "t",
}

export type Tag = {
    name: TagName;
    value: string;
};

export type TagBe = {
    name: TagName.be;
    value: number;
};

export type TagI = {
    name: TagName.i;
    value: number;
};

export type TagFs = {
    name: TagName.fs;
    value: number;
};

export type TagPos = {
    name: TagName.pos;
    x: number;
    y: number;
};

export type TagMove = {
    name: TagName.move;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type TagT = {
    name: TagName.t;
    t1: number;
    t2: number;
    accel: number;
    tags: Tags[];
};

export type Tags = TagBe | TagI | TagFs | TagT | TagPos | TagMove;

export function parseTags(text: string, tags: Tags[]): Tags[] {
    console.log("");
    console.log(text);

    let result = text.match(regexTags);
    if (!result || !result[0]) {
        return tags;
    }

    console.log("MATCH:", result[0]);
    const tagNameSource = text.substring(1);

    if (tagNameSource.startsWith(TagName.be)) {
        const value = result[0].substring(1 + TagName.be.length);
        console.log(value);

        const tag: TagBe = {
            name: TagName.be,
            value: Number(value),
        };
        tags.push(tag);
    }

    if (tagNameSource.startsWith(TagName.i)) {
        const value = result[0].substring(1 + TagName.i.length);
        console.log(value);

        const tag: TagI = {
            name: TagName.i,
            value: Number(value),
        };
        tags.push(tag);
    }

    if (tagNameSource.startsWith(TagName.fs)) {
        const value = result[0].substring(1 + TagName.fs.length);
        console.log(value);

        const tag: TagFs = {
            name: TagName.fs,
            value: Number(value),
        };
        tags.push(tag);
    }

    if (tagNameSource.startsWith(TagName.pos)) {
        const value = result[0].substring(1 + TagName.pos.length);
        console.log(value);
        const r = re.createRegExp(rePos);
        const a = result[0].match(r)?.groups;
        const x = Number(a?.x ?? "0");
        const y = Number(a?.y ?? "0");

        const tag: TagPos = {
            name: TagName.pos,
            x: x,
            y: y,
        };
        tags.push(tag);
    }

    if (tagNameSource.startsWith(TagName.move)) {
        const value = result[0].substring(1 + TagName.move.length);
        console.log(value);
        const r = re.createRegExp(reMove);
        const a = result[0].match(r)?.groups;
        const x1 = Number(a?.x1 ?? "0");
        const y1 = Number(a?.y1 ?? "0");
        const x2 = Number(a?.x2 ?? "0");
        const y2 = Number(a?.y2 ?? "0");

        const tag: TagMove = {
            name: TagName.move,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
        };
        tags.push(tag);
    }

    if (tagNameSource.startsWith(TagName.t)) {
        const value = result[0].substring(1 + TagName.t.length);
        console.log(value);
        const r = re.createRegExp(reT);
        const a = result[0].match(r)?.groups;
        const rawTags = a?.tags ?? "";
        const subtags: Tags[] = [];
        parseTags(rawTags, subtags);

        const tag: TagT = {
            name: TagName.t,
            accel: Number(a?.accel),
            t1: Number(a?.t1),
            t2: Number(a?.t2),
            tags: subtags,
        };
        tags.push(tag);
    }

    text = text.substring(result[0].length);
    if (text.length > 0) {
        parseTags(text, tags);
    }

    return tags;
}

export type ContentEffect = {
    name: "effect",
    tags: Tags[],
};

export type ContentText = {
    name: "text",
    value: string;
};

export type ContentItem = ContentEffect | ContentText;

export function parseContent(text: string): ContentItem[] {
    const items: ContentItem[] = [];
    const result = text.matchAll(regexContent);

    for (const match of result) {
        if (match.groups?.fx) {
            console.log("FX :", match.groups.fx);

            // remove curly braces {}
            const rawTags = match.groups.fx.substring(1, match.groups.fx.length - 1);
            const tags: Tags[] = [];
            parseTags(rawTags, tags);
            console.log("tags:", tags.length);

            items.push({
                name: "effect",
                tags: tags,
            } satisfies ContentEffect);
            continue;
        }

        if (match.groups?.txt) {
            console.log("TXT:", match.groups.txt);

            items.push({
                name: "text",
                value: match.groups?.txt,
            } satisfies ContentText);
            continue;
        }
    }

    return items;
}

export function contentEffectToString(item: ContentEffect): string {
    let s = "";
    for (const tag of item.tags) {
        switch (tag.name) {
            case TagName.t:
                const subeffect: ContentEffect = {
                    name: "effect",
                    tags: tag.tags,
                };

                const subcontent = contentEffectToString(subeffect);
                s += `\\t(${tag.t1},${tag.t2},${tag.accel},${subcontent})`;
                break;

            case TagName.pos:
                s += `\\pos(${tag.x},${tag.y})`;
                break;

            case TagName.move:
                s += `\\move(${tag.x1},${tag.y1},${tag.x2},${tag.y2})`;
                break;

            default:
                s += `\\${tag.name}${tag.value}`;
                break;
        }
    }

    return s;
}

export function contentsToString(items: ContentItem[]): string {
    let s = "";

    for (const item of items) {
        if (item.name == "text") {
            s += item.value;
            continue;
        }

        s += "{" + contentEffectToString(item) + "}";
    }

    return s;
}

const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

const reBe = re.exactly("\\").and("be").and(re.oneOrMore(re.digit));

const reI = re.exactly("\\").and("i").and(re.exactly("1").or("0"));

const reFs = re.exactly("\\").and("fs").and(re.oneOrMore(re.digit));

const reInt = re.exactly("-").optionally().and(re.oneOrMore(re.digit));

const reFloat = reInt.and(re.exactly(".").and(re.oneOrMore(re.digit)).optionally());

const rePos = re.exactly("\\").and("pos").and(re.exactly("(")).and(reFloat.groupedAs("x")).and(re.exactly(",")).and(reFloat.groupedAs("y")).and(re.exactly(")"));

const reMove = re.exactly("\\").and("move").and(re.exactly("(")).and(reFloat.groupedAs("x1")).and(re.exactly(",")).and(reFloat.groupedAs("y1")).and(re.exactly(",")).and(reFloat.groupedAs("x2")).and(re.exactly(",")).and(reFloat.groupedAs("y2")).and(re.exactly(")"));

const unitTags = reBe.or(reFs).or(reI).or(rePos).or(reMove);

const reT = re.exactly("\\").and("t").and(re.exactly("(")).and(re.oneOrMore(re.digit).groupedAs("t1")).and(re.exactly(",")).and(re.oneOrMore(re.digit).groupedAs("t2")).and(re.exactly(",")).and(re.oneOrMore(re.digit).groupedAs("accel")).and(re.exactly(",")).and(re.oneOrMore(unitTags).groupedAs("tags")).and(re.exactly(")"));

const regexTags = re.createRegExp(unitTags.or(reT));
console.log(regexTags);

function main() {
    testContentParser();
    // testTagParser();
}

function testContentParser() {
    const text = "{\\be5}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const items = parseContent(text);
    console.log("=================");
    console.log(contentsToString(items));
    console.log("=================");

    console.log("Items:", items.length);
    for (const item of items) {
        switch (item.name) {
            case "effect":
                console.log("FX :", item.tags);
                break;

            default:
                console.log("TXT:", item.value);
                break;
        }
    }

    // TODO: set/update tag
    const targetIndex = items.findIndex(item => {
        if (item.name != "effect") {
            return;
        }

        if (item.tags.some(t => t.name == TagName.i)) {
            return item;
        }
    });

    if (targetIndex < 0) {
        console.error("tag \\i not found");
        return;
    }

    const item = items[targetIndex];
    if (item.name != "effect") {
        return;
    }

    console.log(item.tags);
}

function testTagParser() {
    let text = `\\be5\\fs32\\t(2,10,6,\\fs63\\be1)`;
    const tags: Tags[] = [];
    parseTags(text, tags);

    console.log("\nTags:", tags.length);
    for (const tag of tags) {
        console.log(tag);
    }
}

export function findPos(items: ContentItem[]): TagPos | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const pos = fx.tags.find(tag => tag.name == TagName.pos);
    if (pos?.name != TagName.pos) {
        return null;
    }

    return pos;
}

export function findMove(items: ContentItem[]): TagMove | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const move = fx.tags.find(tag => tag.name == TagName.move);
    if (move?.name != TagName.move) {
        return null;
    }

    return move;
}

export function findT(items: ContentItem[]): TagT | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const t = fx.tags.find(tag => tag.name == TagName.t);
    if (t?.name != TagName.t) {
        return null;
    }

    return t;
}

main();

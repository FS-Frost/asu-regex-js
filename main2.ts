import * as re from "magic-regexp";

export enum TagName {
    fs = "fs",
    be = "be",
    i = "i",
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

export type TagT = {
    name: TagName.t;
    t1: number;
    t2: number;
    accel: number;
    tags: Tags[];
};

export type Tags = TagBe | TagI | TagFs | TagT;

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
            accel: Number(a?.t1),
            t1: Number(a?.t2),
            t2: Number(a?.accel),
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

// function contentsToString(items: ContentItem[]): string {
//     let s = "";

//     for (const item of items) {
//         if (item.name == "text") {
//             s += item.value;
//             continue;
//         }

//         for (const tag of item.tags) {
//             switch (tag.name) {
//                 case :

//                     break;

//                 default:
//                     break;
//             }
//         }
//     }
// }

const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

const reBe = re.exactly("\\").and("be").and(re.oneOrMore(re.digit));

const reI = re.exactly("\\").and("i").and(re.exactly("1").or("0"));

const reFs = re.exactly("\\").and("fs").and(re.oneOrMore(re.digit));

const unitTags = reBe.or(reFs).or(reI);

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

main();

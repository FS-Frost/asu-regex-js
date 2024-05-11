import { createRegExp } from "magic-regexp";
import { reMove, rePos, reT, regexContent, regexTags } from "./regex";

export enum TagName {
    a = "a",
    alpha = "alpha",
    alpha1 = "1a",
    alpha2 = "2a",
    alpha3 = "3a",
    alpha4 = "4a",
    an = "an",
    b = "b",
    be = "be",
    blur = "blur",
    bord = "bord",
    clip = "clip",
    color = "c",
    color1 = "1c",
    color2 = "2c",
    color3 = "3c",
    color4 = "4c",
    fad = "fad",
    fade = "fade",
    fax = "fax",
    fay = "fay",
    fe = "fe",
    fn = "fn",
    fr = "fr",
    frx = "frx",
    fry = "fry",
    frz = "frz",
    fs = "fs",
    fscx = "fscx",
    fscy = "fscy",
    fsp = "fsp",
    i = "i",
    iclip = "iclip",
    kLowerCase = "k",
    kUpperCase = "K",
    kf = "kf",
    ko = "ko",
    move = "move",
    org = "org",
    p = "p",
    pbo = "pbo",
    pos = "pos",
    q = "q",
    r = "r",
    s = "s",
    shad = "shad",
    t = "t",
    u = "u",
    xbord = "xbord",
    xshad = "xshad",
    ybord = "ybord",
    yshad = "yshad",
}

export type Tag = {
    name: TagName;
    value: string;
};

export type TagA = {
    name: TagName.a;
    value: number;
};

export type TagAn = {
    name: TagName.an;
    value: number;
};

export type TagB = {
    name: TagName.b;
    value: number;
};

export type TagBlur = {
    name: TagName.blur;
    value: number;
};

export type TagBord = {
    name: TagName.bord;
    value: number;
};

export type TagXbord = {
    name: TagName.xbord;
    value: number;
};

export type TagYbord = {
    name: TagName.ybord;
    value: number;
};

export type TagC = {
    name: TagName.color;
    value: string;
};

export type Tag1c = {
    name: TagName.color1;
    value: string;
};

export type Tag2c = {
    name: TagName.color2;
    value: string;
};

export type Tag3c = {
    name: TagName.color3;
    value: string;
};

export type Tag4c = {
    name: TagName.color4;
    value: string;
};

export type TagAlpha = {
    name: TagName.alpha;
    value: number;
};

export type Tag1a = {
    name: TagName.alpha1;
    value: string;
};

export type Tag2a = {
    name: TagName.alpha2;
    value: string;
};

export type Tag3a = {
    name: TagName.alpha3;
    value: string;
};

export type Tag4a = {
    name: TagName.alpha4;
    value: string;
};

export type TagClip = {
    name: TagName.clip;
    drawCommands: string;
};

export type TagIclip = {
    name: TagName.iclip;
    drawCommands: string;
};

export type TagFad = {
    name: TagName.fad;
    in: number;
    out: number;
};

export type TagFade = {
    name: TagName.fade;
    alpha1: number;
    alpha2: number;
    alpha3: number;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
};

export type TagFax = {
    name: TagName.fax;
    value: number;
};

export type TagFay = {
    name: TagName.fay;
    value: number;
};

export type TagFe = {
    name: TagName.fe;
    encoding: string;
};

export type TagFn = {
    name: TagName.fn;
    font: number;
};

export type TagFscx = {
    name: TagName.fscx;
    value: number;
};

export type TagFscy = {
    name: TagName.fscy;
    value: number;
};

export type TagFsp = {
    name: TagName.fsp;
    value: number;
};

export type TagKLowerCase = {
    name: TagName.kLowerCase;
    value: number;
};

export type TagKUpperCase = {
    name: TagName.kUpperCase;
    value: number;
};

export type TagKf = {
    name: TagName.kf;
    value: number;
};

export type TagKo = {
    name: TagName.ko;
    value: number;
};

export type TagOrg = {
    name: TagName.org;
    x: number;
    y: number;
};

export type TagP = {
    name: TagName.p;
    value: number;
};

export type TagPbo = {
    name: TagName.pbo;
    value: number;
};

export type TagQ = {
    name: TagName.q;
    value: number;
};

export type TagR = {
    name: TagName.r;
    style: string;
};

export type TagS = {
    name: TagName.s;
    value: number;
};

export type TagShad = {
    name: TagName.shad;
    value: number;
};

export type TagXshad = {
    name: TagName.xshad;
    value: number;
};

export type TagYshad = {
    name: TagName.yshad;
    value: number;
};

export type TagU = {
    name: TagName.u;
    value: number;
};

export type TagBe = {
    name: TagName.be;
    value: number;
};

export type TagFr = {
    name: TagName.fr;
    value: number;
};

export type TagFrx = {
    name: TagName.frx;
    value: number;
};

export type TagFry = {
    name: TagName.fry;
    value: number;
};

export type TagFrz = {
    name: TagName.frz;
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
    t1: number | null;
    t2: number | null;
};

export type TagT = {
    name: TagName.t;
    t1: number | null;
    t2: number | null;
    accel: number | null;
    tags: Tags[];
};

export type Tags = TagA | TagAn | TagB | TagBlur | TagBord | TagXbord | TagYbord | TagC | Tag1c | Tag2c | Tag3c | Tag4c | TagAlpha | Tag1a | Tag2a | Tag3a | Tag4a | TagClip | TagIclip | TagFad | TagFade | TagFax | TagFay | TagFe | TagFn | TagFscx | TagFscy | TagFsp | TagKLowerCase | TagKUpperCase | TagKf | TagKo | TagOrg | TagP | TagPbo | TagQ | TagR | TagS | TagShad | TagXshad | TagYshad | TagU | TagBe | TagFr | TagFrx | TagFry | TagFrz | TagI | TagFs | TagT | TagPos | TagMove;

export function parseTags(text: string, tags: Tags[]): Tags[] {
    // console.log("");
    // console.log(text);

    let result = text.match(regexTags);
    if (!result || !result[0]) {
        return tags;
    }

    // console.log("MATCH:", result[0]);
    const tagNameSource = text.substring(1);

    if (tagNameSource.startsWith(TagName.move)) {
        const value = result[0].substring(1 + TagName.move.length);
        // console.log(value);
        const r = createRegExp(reMove);
        const a = result[0].match(r)?.groups;
        const x1 = Number(a?.x1 ?? "0");
        const y1 = Number(a?.y1 ?? "0");
        const x2 = Number(a?.x2 ?? "0");
        const y2 = Number(a?.y2 ?? "0");
        const t1 = a?.move_t1 ? Number(a.move_t1) : null;
        const t2 = a?.move_t2 ? Number(a.move_t2) : null;

        const tag: TagMove = {
            name: TagName.move,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            t1: t1,
            t2: t2,
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.xbord)) {
        const value = result[0].substring(1 + TagName.xbord.length);
        // console.log(value);

        const tag: TagXbord = {
            name: TagName.xbord,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.ybord)) {
        const value = result[0].substring(1 + TagName.ybord.length);
        // console.log(value);

        const tag: TagYbord = {
            name: TagName.ybord,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.xshad)) {
        const value = result[0].substring(1 + TagName.xshad.length);
        // console.log(value);

        const tag: TagXshad = {
            name: TagName.xshad,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.yshad)) {
        const value = result[0].substring(1 + TagName.yshad.length);
        // console.log(value);

        const tag: TagYshad = {
            name: TagName.yshad,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.blur)) {
        const value = result[0].substring(1 + TagName.blur.length);
        // console.log(value);

        const tag: TagBlur = {
            name: TagName.blur,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.bord)) {
        const value = result[0].substring(1 + TagName.bord.length);
        // console.log(value);

        const tag: TagBord = {
            name: TagName.bord,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.shad)) {
        const value = result[0].substring(1 + TagName.shad.length);
        // console.log(value);

        const tag: TagShad = {
            name: TagName.shad,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fscx)) {
        const value = result[0].substring(1 + TagName.fscx.length);
        // console.log(value);

        const tag: TagFscx = {
            name: TagName.fscx,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fscy)) {
        const value = result[0].substring(1 + TagName.fscy.length);
        // console.log(value);

        const tag: TagFscy = {
            name: TagName.fscy,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fsp)) {
        const value = result[0].substring(1 + TagName.fsp.length);
        // console.log(value);

        const tag: TagFsp = {
            name: TagName.fsp,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.pos)) {
        const value = result[0].substring(1 + TagName.pos.length);
        // console.log(value);
        const r = createRegExp(rePos);
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

    else if (tagNameSource.startsWith(TagName.frx)) {
        const value = result[0].substring(1 + TagName.frx.length);
        // console.log(value);

        const tag: TagFrx = {
            name: TagName.frx,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fry)) {
        const value = result[0].substring(1 + TagName.fry.length);
        // console.log(value);

        const tag: TagFry = {
            name: TagName.fry,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.frz)) {
        const value = result[0].substring(1 + TagName.frz.length);
        // console.log(value);

        const tag: TagFrz = {
            name: TagName.frz,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fax)) {
        const value = result[0].substring(1 + TagName.fax.length);
        // console.log(value);

        const tag: TagFax = {
            name: TagName.fax,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fay)) {
        const value = result[0].substring(1 + TagName.fay.length);
        // console.log(value);

        const tag: TagFay = {
            name: TagName.fay,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.pbo)) {
        const value = result[0].substring(1 + TagName.pbo.length);
        // console.log(value);

        const tag: TagPbo = {
            name: TagName.pbo,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.an)) {
        const value = result[0].substring(1 + TagName.be.length);
        // console.log(value);

        const tag: TagAn = {
            name: TagName.an,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.be)) {
        const value = result[0].substring(1 + TagName.be.length);
        // console.log(value);

        const tag: TagBe = {
            name: TagName.be,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fr)) {
        const value = result[0].substring(1 + TagName.fr.length);
        // console.log(value);

        const tag: TagFr = {
            name: TagName.fr,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fs)) {
        const value = result[0].substring(1 + TagName.fs.length);
        // console.log(value);

        const tag: TagFs = {
            name: TagName.fs,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.ko)) {
        const value = result[0].substring(1 + TagName.ko.length);
        // console.log(value);

        const tag: TagKo = {
            name: TagName.ko,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kf)) {
        const value = result[0].substring(1 + TagName.kf.length);
        // console.log(value);

        const tag: TagKf = {
            name: TagName.kf,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kLowerCase)) {
        const value = result[0].substring(1 + TagName.kLowerCase.length);
        // console.log(value);

        const tag: TagKLowerCase = {
            name: TagName.kLowerCase,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kUpperCase)) {
        const value = result[0].substring(1 + TagName.kUpperCase.length);
        // console.log(value);

        const tag: TagKUpperCase = {
            name: TagName.kUpperCase,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.q)) {
        const value = result[0].substring(1 + TagName.q.length);
        // console.log(value);

        const tag: TagQ = {
            name: TagName.q,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.s)) {
        const value = result[0].substring(1 + TagName.s.length);
        // console.log(value);

        const tag: TagS = {
            name: TagName.s,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.u)) {
        const value = result[0].substring(1 + TagName.u.length);
        // console.log(value);

        const tag: TagU = {
            name: TagName.u,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.r)) {
        const value = result[0].substring(1 + TagName.r.length);
        // console.log(value);

        const tag: TagR = {
            name: TagName.r,
            style: value,
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.p)) {
        const value = result[0].substring(1 + TagName.p.length);
        // console.log(value);

        const tag: TagP = {
            name: TagName.p,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.i)) {
        const value = result[0].substring(1 + TagName.i.length);
        // console.log(value);

        const tag: TagI = {
            name: TagName.i,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.t)) {
        const value = result[0].substring(1 + TagName.t.length);
        // console.log(value);
        const r = createRegExp(reT);
        const a = result[0].match(r)?.groups;
        const rawTags = a?.tags ?? "";
        const subtags: Tags[] = [];
        parseTags(rawTags, subtags);

        const tag: TagT = {
            name: TagName.t,
            accel: a?.accel ? Number(a.accel) : null,
            t1: a?.t1 ? Number(a.t1) : null,
            t2: a?.t2 ? Number(a.t2) : null,
            tags: subtags,
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.b)) {
        const value = result[0].substring(1 + TagName.b.length);
        // console.log(value);

        const tag: TagB = {
            name: TagName.b,
            value: Number(value),
        };
        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.a)) {
        const value = result[0].substring(1 + TagName.a.length);
        // console.log(value);

        const tag: TagA = {
            name: TagName.a,
            value: Number(value),
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
            // console.log("FX :", match.groups.fx);

            // remove curly braces {}
            const rawTags = match.groups.fx.substring(1, match.groups.fx.length - 1);
            const tags: Tags[] = [];
            parseTags(rawTags, tags);
            // console.log("tags:", tags.length);

            items.push({
                name: "effect",
                tags: tags,
            } satisfies ContentEffect);
            continue;
        }

        if (match.groups?.txt) {
            // console.log("TXT:", match.groups.txt);

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
                if (tag.t1 != null && tag.t2 != null && tag.accel != null) {
                    s += `\\t(${tag.t1},${tag.t2},${tag.accel},${subcontent})`;
                }
                else if (tag.accel != null) {
                    s += `\\t(${tag.accel},${subcontent})`;
                } else {
                    s += `\\t(${subcontent})`;
                }
                break;

            case TagName.pos:
            case TagName.org:
                s += `\\pos(${tag.x},${tag.y})`;
                break;

            case TagName.move:
                s += `\\move(${tag.x1},${tag.y1},${tag.x2},${tag.y2}`;
                if (tag.t1 != null && tag.t2 != null) {
                    s += `,${tag.t1},${tag.t2}`;
                }
                s += ")";
                break;

            case TagName.clip:
            case TagName.iclip:
                s += `\\clip(${tag.drawCommands})`;
                break;

            case TagName.fad:
                s += `\\fad(${tag.in},${tag.out})`;
                break;

            case TagName.fade:
                s += `\\fade(${tag.alpha1},${tag.alpha2},${tag.alpha3},${tag.t1},${tag.t2},${tag.t3},${tag.t4})`;
                break;

            case TagName.fe:
                s += `\\fe${tag.encoding}`;
                break;

            case TagName.fn:
                s += `\\fn${tag.font}`;
                break;

            case TagName.r:
                s += `\\r${tag.style}`;
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

export function findA(items: ContentItem[]): TagA | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.a;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findB(items: ContentItem[]): TagB | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.b;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAn(items: ContentItem[]): TagAn | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.an;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBe(items: ContentItem[]): TagBe | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.be;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBlur(items: ContentItem[]): TagBlur | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.blur;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBord(items: ContentItem[]): TagBord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.bord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findXbord(items: ContentItem[]): TagXbord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.xbord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findYbord(items: ContentItem[]): TagYbord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.ybord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findShad(items: ContentItem[]): TagShad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.shad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findXshad(items: ContentItem[]): TagXshad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.xshad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findYshad(items: ContentItem[]): TagYshad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.yshad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFr(items: ContentItem[]): TagFr | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fr;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFrx(items: ContentItem[]): TagFrx | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.frx;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFry(items: ContentItem[]): TagFry | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fry;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFrz(items: ContentItem[]): TagFrz | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.frz;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFax(items: ContentItem[]): TagFax | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fax;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFay(items: ContentItem[]): TagFay | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fay;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findP(items: ContentItem[]): TagP | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.p;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findPbo(items: ContentItem[]): TagPbo | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.pbo;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findQ(items: ContentItem[]): TagQ | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.q;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findS(items: ContentItem[]): TagS | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.s;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findU(items: ContentItem[]): TagU | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.u;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findR(items: ContentItem[]): TagR | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.r;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFscx(items: ContentItem[]): TagFscx | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fscx;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFscy(items: ContentItem[]): TagFscy | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fscy;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFsp(items: ContentItem[]): TagFsp | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fsp;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKLowerCase(items: ContentItem[]): TagKLowerCase | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kLowerCase;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKUpperCase(items: ContentItem[]): TagKUpperCase | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kUpperCase;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKo(items: ContentItem[]): TagKo | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.ko;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKf(items: ContentItem[]): TagKf | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kf;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findI(items: ContentItem[]): TagI | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.i;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFs(items: ContentItem[]): TagFs | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fs;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findPos(items: ContentItem[]): TagPos | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.pos;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findMove(items: ContentItem[]): TagMove | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.move;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findT(items: ContentItem[]): TagT | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.t;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function setA(items: ContentItem[], newValue: number): TagA {
    const defaultTag: TagA = {
        name: TagName.a,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAn(items: ContentItem[], newValue: number): TagAn {
    const defaultTag: TagAn = {
        name: TagName.an,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setB(items: ContentItem[], newValue: number): TagB {
    const defaultTag: TagB = {
        name: TagName.b,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBlur(items: ContentItem[], newValue: number): TagBlur {
    const defaultTag: TagBlur = {
        name: TagName.blur,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBord(items: ContentItem[], newValue: number): TagBord {
    const defaultTag: TagBord = {
        name: TagName.bord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setXbord(items: ContentItem[], newValue: number): TagXbord {
    const defaultTag: TagXbord = {
        name: TagName.xbord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setYbord(items: ContentItem[], newValue: number): TagYbord {
    const defaultTag: TagYbord = {
        name: TagName.ybord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFax(items: ContentItem[], newValue: number): TagFax {
    const defaultTag: TagFax = {
        name: TagName.fax,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFay(items: ContentItem[], newValue: number): TagFay {
    const defaultTag: TagFay = {
        name: TagName.fay,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFscx(items: ContentItem[], newValue: number): TagFscx {
    const defaultTag: TagFscx = {
        name: TagName.fscx,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFscy(items: ContentItem[], newValue: number): TagFscy {
    const defaultTag: TagFscy = {
        name: TagName.fscy,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFsp(items: ContentItem[], newValue: number): TagFsp {
    const defaultTag: TagFsp = {
        name: TagName.fsp,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKLowerCase(items: ContentItem[], newValue: number): TagKLowerCase {
    const defaultTag: TagKLowerCase = {
        name: TagName.kLowerCase,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKUpperCase(items: ContentItem[], newValue: number): TagKUpperCase {
    const defaultTag: TagKUpperCase = {
        name: TagName.kUpperCase,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKf(items: ContentItem[], newValue: number): TagKf {
    const defaultTag: TagKf = {
        name: TagName.kf,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKo(items: ContentItem[], newValue: number): TagKo {
    const defaultTag: TagKo = {
        name: TagName.ko,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setP(items: ContentItem[], newValue: number): TagP {
    const defaultTag: TagP = {
        name: TagName.p,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setPbo(items: ContentItem[], newValue: number): TagPbo {
    const defaultTag: TagPbo = {
        name: TagName.pbo,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setQ(items: ContentItem[], newValue: number): TagQ {
    const defaultTag: TagQ = {
        name: TagName.q,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setS(items: ContentItem[], newValue: number): TagS {
    const defaultTag: TagS = {
        name: TagName.s,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setShad(items: ContentItem[], newValue: number): TagShad {
    const defaultTag: TagShad = {
        name: TagName.shad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setXshad(items: ContentItem[], newValue: number): TagXshad {
    const defaultTag: TagXshad = {
        name: TagName.xshad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setYshad(items: ContentItem[], newValue: number): TagYshad {
    const defaultTag: TagYshad = {
        name: TagName.yshad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setU(items: ContentItem[], newValue: number): TagU {
    const defaultTag: TagU = {
        name: TagName.u,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBe(items: ContentItem[], newValue: number): TagBe {
    const defaultTag: TagBe = {
        name: TagName.be,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFs(items: ContentItem[], newValue: number): TagFs {
    const defaultTag: TagFs = {
        name: TagName.fs,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFr(items: ContentItem[], newValue: number): TagFr {
    const defaultTag: TagFr = {
        name: TagName.fr,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFrx(items: ContentItem[], newValue: number): TagFrx {
    const defaultTag: TagFrx = {
        name: TagName.frx,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFry(items: ContentItem[], newValue: number): TagFry {
    const defaultTag: TagFry = {
        name: TagName.fry,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFrz(items: ContentItem[], newValue: number): TagFrz {
    const defaultTag: TagFrz = {
        name: TagName.frz,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setI(items: ContentItem[], newValue: number): TagI {
    const defaultTag: TagI = {
        name: TagName.i,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setR(items: ContentItem[], style: string): TagR {
    const defaultTag: TagR = {
        name: TagName.r,
        style: style,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.style = style;
    }

    return tag;
}

export function setPos(items: ContentItem[], x: number, y: number): TagPos {
    const defaultTag: TagPos = {
        name: TagName.pos,
        x: x,
        y: y,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x = x;
        tag.y = y;
    }

    return tag;
}

export function setMove(
    items: ContentItem[],
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    t1: number | null = null,
    t2: number | null = null,
): TagMove {
    const defaultTag: TagMove = {
        name: TagName.move,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        t1: t1,
        t2: t2,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x1 = x1;
        tag.y1 = y1;
        tag.x2 = x2;
        tag.y2 = y2;
        tag.t1 = t1;
        tag.t2 = t2;
    }

    return tag;
}

export function setT(
    items: ContentItem[],
    tags: Tags[],
    accel: number | null = null,
    t1: number | null = null,
    t2: number | null = null,
): TagT {
    const defaultTag: TagT = {
        name: TagName.t,
        t1: t1,
        t2: t2,
        accel: accel,
        tags: tags,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.t1 = t1;
        tag.t2 = t2;
        tag.accel = accel;
        tag.tags = tags;
    }

    return tag;
}

export function tagsToItems(tags: Tags[]): ContentItem[] {
    const items: ContentItem[] = [
        {
            name: "effect",
            tags: tags,
        },
    ];

    return items;
}

export function itemsToTags(items: ContentItem[]): Tags[] {
    const fx = items.find(x => x.name === "effect");
    if (fx == null || fx.name != "effect") {
        return [];
    }

    return fx.tags;
}

function setTag<T extends Tags>(items: ContentItem[], tagName: TagName, defaultTag: T): [boolean, T] {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        items.unshift({
            name: "effect",
            tags: [defaultTag],
        });
        return [true, defaultTag];
    }

    const tag = fx.tags.find(tag => tag.name == tagName) as T | null;
    if (tag?.name != tagName) {
        fx.tags.push(defaultTag);
        return [true, defaultTag];
    }

    return [false, tag];
}

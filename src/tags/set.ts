import {
    ColorBGR,
    Tag1a,
    Tag1c,
    Tag2a,
    Tag2c,
    Tag3a,
    Tag3c,
    Tag4a,
    Tag4c,
    TagA,
    TagAlpha,
    TagAn,
    TagB,
    TagBe,
    TagBlur,
    TagBord,
    TagC,
    TagClip,
    TagClipRect,
    TagClipVector,
    TagFad,
    TagFade,
    TagFax,
    TagFay,
    TagFe,
    TagFn,
    TagFr,
    TagFrx,
    TagFry,
    TagFrz,
    TagFs,
    TagFscx,
    TagFscy,
    TagFsp,
    TagI,
    TagIclip,
    TagIclipRect,
    TagIclipVector,
    TagKf,
    TagKLowerCase,
    TagKo,
    TagKUpperCase,
    TagMove,
    TagName,
    TagOrg,
    TagP,
    TagPbo,
    TagPos,
    TagQ,
    TagR,
    TagS,
    Tags,
    TagShad,
    TagT,
    TagU,
    TagXbord,
    TagXshad,
    TagYbord,
    TagYshad,
} from "./types";
import { ContentItem, ContentEffect } from "../content/types";

function setSingleValueTag<T extends Tags & { value: string | number; }>(
    items: ContentItem[],
    tagName: TagName,
    newValue: T["value"],
): T {
    const defaultTag = { name: tagName, value: newValue } as T;
    const [updated, tag] = setTag<T>(items, tagName, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }
    return tag;
}

function setColorTag<T extends Tags & ColorBGR>(
    items: ContentItem[],
    tagName: TagName,
    blue: number,
    green: number,
    red: number,
): T {
    const defaultTag = { name: tagName, blue, green, red } as T;
    const [updated, tag] = setTag<T>(items, tagName, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }
    return tag;
}

export const setA = (items: ContentItem[], newValue: number): TagA => setSingleValueTag(items, TagName.a, newValue);

export const setAn = (items: ContentItem[], newValue: number): TagAn => setSingleValueTag(items, TagName.an, newValue);

export const setB = (items: ContentItem[], newValue: number): TagB => setSingleValueTag(items, TagName.b, newValue);

export const setColor = (items: ContentItem[], blue: number, green: number, red: number): TagC =>
    setColorTag(items, TagName.color, blue, green, red);

export const setColor1 = (items: ContentItem[], blue: number, green: number, red: number): Tag1c =>
    setColorTag(items, TagName.color1, blue, green, red);

export const setColor2 = (items: ContentItem[], blue: number, green: number, red: number): Tag2c =>
    setColorTag(items, TagName.color2, blue, green, red);

export const setColor3 = (items: ContentItem[], blue: number, green: number, red: number): Tag3c =>
    setColorTag(items, TagName.color3, blue, green, red);

export const setColor4 = (items: ContentItem[], blue: number, green: number, red: number): Tag4c =>
    setColorTag(items, TagName.color4, blue, green, red);

export const setAlpha = (items: ContentItem[], newValue: string): TagAlpha => setSingleValueTag(items, TagName.alpha, newValue);

export const setAlpha1 = (items: ContentItem[], newValue: string): Tag1a => setSingleValueTag(items, TagName.alpha1, newValue);

export const setAlpha2 = (items: ContentItem[], newValue: string): Tag2a => setSingleValueTag(items, TagName.alpha2, newValue);

export const setAlpha3 = (items: ContentItem[], newValue: string): Tag3a => setSingleValueTag(items, TagName.alpha3, newValue);

export const setAlpha4 = (items: ContentItem[], newValue: string): Tag4a => setSingleValueTag(items, TagName.alpha4, newValue);

export const setBlur = (items: ContentItem[], newValue: number): TagBlur => setSingleValueTag(items, TagName.blur, newValue);

export const setBord = (items: ContentItem[], newValue: number): TagBord => setSingleValueTag(items, TagName.bord, newValue);

export const setXbord = (items: ContentItem[], newValue: number): TagXbord => setSingleValueTag(items, TagName.xbord, newValue);

export const setYbord = (items: ContentItem[], newValue: number): TagYbord => setSingleValueTag(items, TagName.ybord, newValue);

export const setFax = (items: ContentItem[], newValue: number): TagFax => setSingleValueTag(items, TagName.fax, newValue);

export const setFay = (items: ContentItem[], newValue: number): TagFay => setSingleValueTag(items, TagName.fay, newValue);

export const setFscx = (items: ContentItem[], newValue: number): TagFscx => setSingleValueTag(items, TagName.fscx, newValue);

export const setFscy = (items: ContentItem[], newValue: number): TagFscy => setSingleValueTag(items, TagName.fscy, newValue);
export const setFsp = (items: ContentItem[], newValue: number): TagFsp => setSingleValueTag(items, TagName.fsp, newValue);

export function setFe(items: ContentItem[], encodingId: number): TagFe {
    const defaultTag: TagFe = { name: TagName.fe, encodingId: encodingId };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) tag.encodingId = encodingId;
    return tag;
}

export function setFn(items: ContentItem[], font: string): TagFn {
    const defaultTag: TagFn = { name: TagName.fn, font: font };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) tag.font = font;
    return tag;
}

export const setKLowerCase = (items: ContentItem[], newValue: number): TagKLowerCase =>
    setSingleValueTag(items, TagName.kLowerCase, newValue);

export const setKUpperCase = (items: ContentItem[], newValue: number): TagKUpperCase =>
    setSingleValueTag(items, TagName.kUpperCase, newValue);

export const setKf = (items: ContentItem[], newValue: number): TagKf => setSingleValueTag(items, TagName.kf, newValue);

export const setKo = (items: ContentItem[], newValue: number): TagKo => setSingleValueTag(items, TagName.ko, newValue);

export const setP = (items: ContentItem[], newValue: number): TagP => setSingleValueTag(items, TagName.p, newValue);

export const setPbo = (items: ContentItem[], newValue: number): TagPbo => setSingleValueTag(items, TagName.pbo, newValue);

export const setQ = (items: ContentItem[], newValue: number): TagQ => setSingleValueTag(items, TagName.q, newValue);

export const setS = (items: ContentItem[], newValue: number): TagS => setSingleValueTag(items, TagName.s, newValue);

export const setShad = (items: ContentItem[], newValue: number): TagShad => setSingleValueTag(items, TagName.shad, newValue);

export const setXshad = (items: ContentItem[], newValue: number): TagXshad => setSingleValueTag(items, TagName.xshad, newValue);

export const setYshad = (items: ContentItem[], newValue: number): TagYshad => setSingleValueTag(items, TagName.yshad, newValue);

export const setU = (items: ContentItem[], newValue: number): TagU => setSingleValueTag(items, TagName.u, newValue);

export const setBe = (items: ContentItem[], newValue: number): TagBe => setSingleValueTag(items, TagName.be, newValue);

export const setFs = (items: ContentItem[], newValue: number): TagFs => setSingleValueTag(items, TagName.fs, newValue);

export const setFr = (items: ContentItem[], newValue: number): TagFr => setSingleValueTag(items, TagName.fr, newValue);

export const setFrx = (items: ContentItem[], newValue: number): TagFrx => setSingleValueTag(items, TagName.frx, newValue);

export const setFry = (items: ContentItem[], newValue: number): TagFry => setSingleValueTag(items, TagName.fry, newValue);

export const setFrz = (items: ContentItem[], newValue: number): TagFrz => setSingleValueTag(items, TagName.frz, newValue);

export const setI = (items: ContentItem[], newValue: number): TagI => setSingleValueTag(items, TagName.i, newValue);

export function setR(items: ContentItem[], style: string): TagR {
    const defaultTag: TagR = { name: TagName.r, style: style };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) tag.style = style;
    return tag;
}

export function setPos(items: ContentItem[], x: number, y: number): TagPos {
    const defaultTag: TagPos = { name: TagName.pos, x, y };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x = x;
        tag.y = y;
    }
    return tag;
}

export function setOrg(items: ContentItem[], x: number, y: number): TagOrg {
    const defaultTag: TagOrg = { name: TagName.org, x, y };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x = x;
        tag.y = y;
    }
    return tag;
}

export function setFad(items: ContentItem[], fadeIn: number, fadeOut: number): TagFad {
    const defaultTag: TagFad = { name: TagName.fad, in: fadeIn, out: fadeOut };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.in = fadeIn;
        tag.out = fadeOut;
    }
    return tag;
}

export function setFade(
    items: ContentItem[],
    alpha1: number,
    alpha2: number,
    alpha3: number,
    t1: number,
    t2: number,
    t3: number,
    t4: number,
): TagFade {
    const defaultTag: TagFade = { name: TagName.fade, alpha1, alpha2, alpha3, t1, t2, t3, t4 };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.alpha1 = alpha1;
        tag.alpha2 = alpha2;
        tag.alpha3 = alpha3;
        tag.t1 = t1;
        tag.t2 = t2;
        tag.t3 = t3;
        tag.t4 = t4;
    }
    return tag;
}

export function setClipRect(items: ContentItem[], x1: number, y1: number, x2: number, y2: number): TagClipRect {
    const newTag: TagClipRect = { name: TagName.clip, type: "rect", x1, y1, x2, y2 };
    const fx = getOrAddEffect(items);
    updateOrAddTag(fx.tags, newTag);
    return newTag;
}

export function setClipVector(items: ContentItem[], commands: string, scale: number | null = null): TagClipVector {
    const newTag: TagClipVector = { name: TagName.clip, type: "vector", commands, scale };
    const fx = getOrAddEffect(items);
    updateOrAddTag(fx.tags, newTag);
    return newTag;
}

export function setClip(items: ContentItem[], drawCommands: string): TagClip {
    return setClipVector(items, drawCommands);
}

export function setIclipRect(items: ContentItem[], x1: number, y1: number, x2: number, y2: number): TagIclipRect {
    const newTag: TagIclipRect = { name: TagName.iclip, type: "rect", x1, y1, x2, y2 };
    const fx = getOrAddEffect(items);
    updateOrAddTag(fx.tags, newTag);
    return newTag;
}

export function setIclipVector(items: ContentItem[], commands: string, scale: number | null = null): TagIclipVector {
    const newTag: TagIclipVector = { name: TagName.iclip, type: "vector", commands, scale };
    const fx = getOrAddEffect(items);
    updateOrAddTag(fx.tags, newTag);
    return newTag;
}

export function setIclip(items: ContentItem[], drawCommands: string): TagIclip {
    return setIclipVector(items, drawCommands);
}

function getOrAddEffect(items: ContentItem[]): ContentEffect {
    let fx = items.find((item) => item.name === "effect") as ContentEffect | undefined;
    if (fx == null) {
        fx = { name: "effect", tags: [] };
        items.unshift(fx);
    }
    return fx;
}

function updateOrAddTag(tags: Tags[], newTag: Tags): void {
    const index = tags.findIndex((tag) => tag.name === newTag.name);
    if (index === -1) {
        tags.push(newTag);
    } else {
        tags[index] = newTag;
    }
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
    const defaultTag: TagMove = { name: TagName.move, x1, y1, x2, y2, t1, t2 };
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
    const defaultTag: TagT = { name: TagName.t, t1, t2, accel, tags };
    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.t1 = t1;
        tag.t2 = t2;
        tag.accel = accel;
        tag.tags = tags;
    }
    return tag;
}

export function setTag<T extends Tags>(items: ContentItem[], tagName: TagName, defaultTag: T): [boolean, T] {
    const fx = items.find((item) => item.name == "effect");
    if (fx?.name != "effect") {
        items.unshift({
            name: "effect",
            tags: [defaultTag],
        });
        return [true, defaultTag];
    }

    const tag = fx.tags.find((tag) => tag.name == tagName) as T | null;
    if (tag?.name != tagName) {
        fx.tags.push(defaultTag);
        return [true, defaultTag];
    }

    return [false, tag];
}

export function removeTag(items: ContentItem[], tagName: TagName): void {
    const fx = items.find((item) => item.name == "effect");
    if (fx?.name != "effect") {
        return;
    }

    const index = fx.tags.findIndex((tag) => tag.name === tagName);
    if (index < 0) {
        return;
    }

    fx.tags.splice(index, 1);
}

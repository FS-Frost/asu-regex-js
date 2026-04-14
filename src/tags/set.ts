import {
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
import { ContentItem } from "../content/types";

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

export function setColor(
    items: ContentItem[],
    blue: number,
    green: number,
    red: number,
): TagC {
    const defaultTag: TagC = {
        name: TagName.color,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor1(
    items: ContentItem[],
    blue: number,
    green: number,
    red: number,
): Tag1c {
    const defaultTag: Tag1c = {
        name: TagName.color1,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor2(
    items: ContentItem[],
    blue: number,
    green: number,
    red: number,
): Tag2c {
    const defaultTag: Tag2c = {
        name: TagName.color2,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor3(
    items: ContentItem[],
    blue: number,
    green: number,
    red: number,
): Tag3c {
    const defaultTag: Tag3c = {
        name: TagName.color3,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor4(
    items: ContentItem[],
    blue: number,
    green: number,
    red: number,
): Tag4c {
    const defaultTag: Tag4c = {
        name: TagName.color4,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setAlpha(items: ContentItem[], newValue: string): TagAlpha {
    const defaultTag: TagAlpha = {
        name: TagName.alpha,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha1(items: ContentItem[], newValue: string): Tag1a {
    const defaultTag: Tag1a = {
        name: TagName.alpha1,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha2(items: ContentItem[], newValue: string): Tag2a {
    const defaultTag: Tag2a = {
        name: TagName.alpha2,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha3(items: ContentItem[], newValue: string): Tag3a {
    const defaultTag: Tag3a = {
        name: TagName.alpha3,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha4(items: ContentItem[], newValue: string): Tag4a {
    const defaultTag: Tag4a = {
        name: TagName.alpha4,
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

export function setFe(items: ContentItem[], encodingId: number): TagFe {
    const defaultTag: TagFe = {
        name: TagName.fe,
        encodingId: encodingId,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.encodingId = encodingId;
    }

    return tag;
}

export function setFn(items: ContentItem[], font: string): TagFn {
    const defaultTag: TagFn = {
        name: TagName.fn,
        font: font,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.font = font;
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

export function setOrg(items: ContentItem[], x: number, y: number): TagOrg {
    const defaultTag: TagOrg = {
        name: TagName.org,
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

export function setFad(items: ContentItem[], fadeIn: number, fadeOut: number): TagFad {
    const defaultTag: TagFad = {
        name: TagName.fad,
        in: fadeIn,
        out: fadeOut,
    };

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
    const defaultTag: TagFade = {
        name: TagName.fade,
        alpha1: alpha1,
        alpha2: alpha2,
        alpha3: alpha3,
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4,
    };

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

export function setClip(items: ContentItem[], drawCommands: string): TagClip {
    const defaultTag: TagClip = {
        name: TagName.clip,
        drawCommands: drawCommands,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.drawCommands = drawCommands;
    }

    return tag;
}

export function setIclip(items: ContentItem[], drawCommands: string): TagIclip {
    const defaultTag: TagIclip = {
        name: TagName.iclip,
        drawCommands: drawCommands,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.drawCommands = drawCommands;
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

export function setTag<T extends Tags>(
    items: ContentItem[],
    tagName: TagName,
    defaultTag: T,
): [boolean, T] {
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

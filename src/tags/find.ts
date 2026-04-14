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
    TagShad,
    TagT,
    TagU,
    TagXbord,
    TagXshad,
    TagYbord,
    TagYshad,
    Tags,
} from "./types";
import { ContentItem } from "../content/types";

function findTag<T extends Tags>(items: ContentItem[], tagName: TagName): T | null {
    const fx = items.find((item) => item.name === "effect");
    if (fx?.name !== "effect") {
        return null;
    }

    const tag = fx.tags.find((tag) => tag.name === tagName);
    if (tag?.name !== tagName) {
        return null;
    }

    return tag as T;
}

export function findA(items: ContentItem[]): TagA | null {
    return findTag<TagA>(items, TagName.a);
}

export function findB(items: ContentItem[]): TagB | null {
    return findTag<TagB>(items, TagName.b);
}

export function findColor(items: ContentItem[]): TagC | null {
    return findTag<TagC>(items, TagName.color);
}

export function findColor1(items: ContentItem[]): Tag1c | null {
    return findTag<Tag1c>(items, TagName.color1);
}

export function findColor2(items: ContentItem[]): Tag2c | null {
    return findTag<Tag2c>(items, TagName.color2);
}

export function findColor3(items: ContentItem[]): Tag3c | null {
    return findTag<Tag3c>(items, TagName.color3);
}

export function findColor4(items: ContentItem[]): Tag4c | null {
    return findTag<Tag4c>(items, TagName.color4);
}

export function findAlpha(items: ContentItem[]): TagAlpha | null {
    return findTag<TagAlpha>(items, TagName.alpha);
}

export function findAlpha1(items: ContentItem[]): Tag1a | null {
    return findTag<Tag1a>(items, TagName.alpha1);
}

export function findAlpha2(items: ContentItem[]): Tag2a | null {
    return findTag<Tag2a>(items, TagName.alpha2);
}

export function findAlpha3(items: ContentItem[]): Tag3a | null {
    return findTag<Tag3a>(items, TagName.alpha3);
}

export function findAlpha4(items: ContentItem[]): Tag4a | null {
    return findTag<Tag4a>(items, TagName.alpha4);
}

export function findAn(items: ContentItem[]): TagAn | null {
    return findTag<TagAn>(items, TagName.an);
}

export function findBe(items: ContentItem[]): TagBe | null {
    return findTag<TagBe>(items, TagName.be);
}

export function findBlur(items: ContentItem[]): TagBlur | null {
    return findTag<TagBlur>(items, TagName.blur);
}

export function findBord(items: ContentItem[]): TagBord | null {
    return findTag<TagBord>(items, TagName.bord);
}

export function findXbord(items: ContentItem[]): TagXbord | null {
    return findTag<TagXbord>(items, TagName.xbord);
}

export function findYbord(items: ContentItem[]): TagYbord | null {
    return findTag<TagYbord>(items, TagName.ybord);
}

export function findShad(items: ContentItem[]): TagShad | null {
    return findTag<TagShad>(items, TagName.shad);
}

export function findXshad(items: ContentItem[]): TagXshad | null {
    return findTag<TagXshad>(items, TagName.xshad);
}

export function findYshad(items: ContentItem[]): TagYshad | null {
    return findTag<TagYshad>(items, TagName.yshad);
}

export function findFr(items: ContentItem[]): TagFr | null {
    return findTag<TagFr>(items, TagName.fr);
}

export function findFrx(items: ContentItem[]): TagFrx | null {
    return findTag<TagFrx>(items, TagName.frx);
}

export function findFry(items: ContentItem[]): TagFry | null {
    return findTag<TagFry>(items, TagName.fry);
}

export function findFrz(items: ContentItem[]): TagFrz | null {
    return findTag<TagFrz>(items, TagName.frz);
}

export function findFax(items: ContentItem[]): TagFax | null {
    return findTag<TagFax>(items, TagName.fax);
}

export function findFay(items: ContentItem[]): TagFay | null {
    return findTag<TagFay>(items, TagName.fay);
}

export function findP(items: ContentItem[]): TagP | null {
    return findTag<TagP>(items, TagName.p);
}

export function findPbo(items: ContentItem[]): TagPbo | null {
    return findTag<TagPbo>(items, TagName.pbo);
}

export function findQ(items: ContentItem[]): TagQ | null {
    return findTag<TagQ>(items, TagName.q);
}

export function findS(items: ContentItem[]): TagS | null {
    return findTag<TagS>(items, TagName.s);
}

export function findU(items: ContentItem[]): TagU | null {
    return findTag<TagU>(items, TagName.u);
}

export function findR(items: ContentItem[]): TagR | null {
    return findTag<TagR>(items, TagName.r);
}

export function findFe(items: ContentItem[]): TagFe | null {
    return findTag<TagFe>(items, TagName.fe);
}

export function findFn(items: ContentItem[]): TagFn | null {
    return findTag<TagFn>(items, TagName.fn);
}

export function findFscx(items: ContentItem[]): TagFscx | null {
    return findTag<TagFscx>(items, TagName.fscx);
}

export function findFscy(items: ContentItem[]): TagFscy | null {
    return findTag<TagFscy>(items, TagName.fscy);
}

export function findFsp(items: ContentItem[]): TagFsp | null {
    return findTag<TagFsp>(items, TagName.fsp);
}

export function findKLowerCase(items: ContentItem[]): TagKLowerCase | null {
    return findTag<TagKLowerCase>(items, TagName.kLowerCase);
}

export function findKUpperCase(items: ContentItem[]): TagKUpperCase | null {
    return findTag<TagKUpperCase>(items, TagName.kUpperCase);
}

export function findKo(items: ContentItem[]): TagKo | null {
    return findTag<TagKo>(items, TagName.ko);
}

export function findKf(items: ContentItem[]): TagKf | null {
    return findTag<TagKf>(items, TagName.kf);
}

export function findI(items: ContentItem[]): TagI | null {
    return findTag<TagI>(items, TagName.i);
}

export function findFs(items: ContentItem[]): TagFs | null {
    return findTag<TagFs>(items, TagName.fs);
}

export function findPos(items: ContentItem[]): TagPos | null {
    return findTag<TagPos>(items, TagName.pos);
}

export function findOrg(items: ContentItem[]): TagOrg | null {
    return findTag<TagOrg>(items, TagName.org);
}

export function findFad(items: ContentItem[]): TagFad | null {
    return findTag<TagFad>(items, TagName.fad);
}

export function findFade(items: ContentItem[]): TagFade | null {
    return findTag<TagFade>(items, TagName.fade);
}

export function findClip(items: ContentItem[]): TagClip | null {
    return findTag<TagClip>(items, TagName.clip);
}

export function findIclip(items: ContentItem[]): TagIclip | null {
    return findTag<TagIclip>(items, TagName.iclip);
}

export function findMove(items: ContentItem[]): TagMove | null {
    return findTag<TagMove>(items, TagName.move);
}

export function findT(items: ContentItem[]): TagT | null {
    return findTag<TagT>(items, TagName.t);
}

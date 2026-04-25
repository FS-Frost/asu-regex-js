import { expect, test } from "bun:test";
import * as asu from "../asu";

// a
test("find a", () => {
    const text = "{\\a7}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findA(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// an
test("find an", () => {
    const text = "{\\an7}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAn(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// be
test("find be", () => {
    const text = "{\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBe(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// b
test("find b", () => {
    const text = "{\\b1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findB(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// blur
test("find blur", () => {
    const text = "{\\blur3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBlur(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// bord
test("find bord", () => {
    const text = "{\\bord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// xbord
test("find xbord", () => {
    const text = "{\\xbord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findXbord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// ybord
test("find ybord", () => {
    const text = "{\\ybord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findYbord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// shad
test("find shad", () => {
    const text = "{\\shad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findShad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// xshad
test("find xshad", () => {
    const text = "{\\xshad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findXshad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// yshad
test("find yshad", () => {
    const text = "{\\yshad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findYshad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fr
test("find fr", () => {
    const text = "{\\fr45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFr(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// frx
test("find frx", () => {
    const text = "{\\frx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fry
test("find fry", () => {
    const text = "{\\fry45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFry(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// frz
test("find frz", () => {
    const text = "{\\frz45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrz(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fax
test("find fax", () => {
    const text = "{\\fax45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFax(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fay
test("find fay", () => {
    const text = "{\\fay45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFay(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fscx
test("find fscx", () => {
    const text = "{\\fscx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFscx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fscy
test("find fscy", () => {
    const text = "{\\fscy45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFscy(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fsp
test("find fsp", () => {
    const text = "{\\fsp45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFsp(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// k lower case
test("find k lower case", () => {
    const text = "{\\k36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKLowerCase(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// k upper case
test("find K upper case", () => {
    const text = "{\\K36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKUpperCase(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// kf
test("find kf", () => {
    const text = "{\\kf36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKf(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// ko
test("find ko", () => {
    const text = "{\\ko36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKo(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// p
test("find p", () => {
    const text = "{\\p1}m 0 0";
    const result = asu.parseContent(text);
    const tag = asu.findP(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// pbo
test("find pbo", () => {
    const text = "{\\pbo1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findPbo(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// q
test("find q", () => {
    const text = "{\\q1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findQ(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// s
test("find s", () => {
    const text = "{\\s1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findS(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// u
test("find u", () => {
    const text = "{\\u1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findU(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// r
test("find r", () => {
    const text = "{\\rDefault - Alt}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findR(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fe
test("find fe", () => {
    const text = "{\\fe1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFe(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fn
test("find fn", () => {
    const text = "{\\fnArial Mincho}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFn(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// i
test("find i", () => {
    const text = "{\\i1}Kirino-san{\\i0}";
    const result = asu.parseContent(text);
    const tag = asu.findI(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fs
test("find fs", () => {
    const text = "{\\fs32}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFs(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// pos
test("find pos", () => {
    const text = "{\\fax-0.1\\fs56\\an4\\1c&H1E2357&\\3c&HF4F4F4&\\bord0\\blur0.4\\frz354.6\\pos(635.6,49.8)\\frx4\\fry354}Tama:";
    const result = asu.parseContent(text);
    const pos = asu.findPos(result);
    expect(pos).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// org
test("find org", () => {
    const text = "{\\org(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const org = asu.findOrg(result);
    expect(org).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fad
test("find fad", () => {
    const text = "{\\fad(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const fad = asu.findFad(result);
    expect(fad).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// fade
test("find fade", () => {
    const text = "{\\fade(10,20,30,1,2,3,4)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findFade(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// clip
test("find clip", () => {
    const text = "{\\clip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findClip(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// iclip
test("find iclip", () => {
    const text = "{\\iclip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findIclip(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// color
test("find color", () => {
    const text = "{\\c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// color1
test("find color1", () => {
    const text = "{\\1c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor1(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// color2
test("find color2", () => {
    const text = "{\\2c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor2(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// color3
test("find color3", () => {
    const text = "{\\3c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor3(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// color4
test("find color4", () => {
    const text = "{\\4c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor4(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// alpha
test("find alpha", () => {
    const text = "{\\alpha&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// alpha1
test("find alpha1", () => {
    const text = "{\\1a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha1(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// alpha2
test("find alpha2", () => {
    const text = "{\\2a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha2(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// alpha3
test("find alpha3", () => {
    const text = "{\\3a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha3(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// alpha4
test("find alpha4", () => {
    const text = "{\\4a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha4(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// move(x1,y1,x2,y2)
test("find move(x1,y1,x2,y2)", () => {
    const text = "{\\move(10,20,30,40)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// move(x1,y1,x2,y2,t1,t2)
test("find move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "{\\move(10,20,30,40,50,60)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// t(fx)
test("find t(fx)", () => {
    const text = "{\\t(\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// t(accel,fx)
test("find t(accel,fx)", () => {
    const text = "{\\t(10,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// t(t1,t2,fx)
test("find t(t1,t2,fx)", () => {
    const text = "{\\org(83,0.56)\\t(10,20,\\fs32\\be2\\pos(12,-12.14))\\fs32}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// t(t1,t2,accel,fx)
test("find t(t1,t2,accel,fx)", () => {
    const text = "{\\org(83,0.56)\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))\\fs32}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("can't find fx group", () => {
    const text = "Kirino-san";
    const result = asu.parseContent(text);
    let tag: asu.Tags | null;

    tag = asu.findA(result);
    expect(tag).toBeNull();

    tag = asu.findB(result);
    expect(tag).toBeNull();

    tag = asu.findColor(result);
    expect(tag).toBeNull();

    tag = asu.findColor1(result);
    expect(tag).toBeNull();

    tag = asu.findColor2(result);
    expect(tag).toBeNull();

    tag = asu.findColor3(result);
    expect(tag).toBeNull();

    tag = asu.findColor4(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha1(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha2(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha3(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha4(result);
    expect(tag).toBeNull();

    tag = asu.findAn(result);
    expect(tag).toBeNull();

    tag = asu.findBe(result);
    expect(tag).toBeNull();

    tag = asu.findBlur(result);
    expect(tag).toBeNull();

    tag = asu.findBord(result);
    expect(tag).toBeNull();

    tag = asu.findXbord(result);
    expect(tag).toBeNull();

    tag = asu.findYbord(result);
    expect(tag).toBeNull();

    tag = asu.findShad(result);
    expect(tag).toBeNull();

    tag = asu.findXshad(result);
    expect(tag).toBeNull();

    tag = asu.findYshad(result);
    expect(tag).toBeNull();

    tag = asu.findFr(result);
    expect(tag).toBeNull();

    tag = asu.findFrx(result);
    expect(tag).toBeNull();

    tag = asu.findFry(result);
    expect(tag).toBeNull();

    tag = asu.findFrz(result);
    expect(tag).toBeNull();

    tag = asu.findFax(result);
    expect(tag).toBeNull();

    tag = asu.findFay(result);
    expect(tag).toBeNull();

    tag = asu.findP(result);
    expect(tag).toBeNull();

    tag = asu.findPbo(result);
    expect(tag).toBeNull();

    tag = asu.findQ(result);
    expect(tag).toBeNull();

    tag = asu.findS(result);
    expect(tag).toBeNull();

    tag = asu.findU(result);
    expect(tag).toBeNull();

    tag = asu.findR(result);
    expect(tag).toBeNull();

    tag = asu.findFe(result);
    expect(tag).toBeNull();

    tag = asu.findFn(result);
    expect(tag).toBeNull();

    tag = asu.findFscx(result);
    expect(tag).toBeNull();

    tag = asu.findFscy(result);
    expect(tag).toBeNull();

    tag = asu.findFsp(result);
    expect(tag).toBeNull();

    tag = asu.findKLowerCase(result);
    expect(tag).toBeNull();

    tag = asu.findKUpperCase(result);
    expect(tag).toBeNull();

    tag = asu.findKo(result);
    expect(tag).toBeNull();

    tag = asu.findKf(result);
    expect(tag).toBeNull();

    tag = asu.findI(result);
    expect(tag).toBeNull();

    tag = asu.findFs(result);
    expect(tag).toBeNull();

    tag = asu.findPos(result);
    expect(tag).toBeNull();

    tag = asu.findOrg(result);
    expect(tag).toBeNull();

    tag = asu.findFad(result);
    expect(tag).toBeNull();

    tag = asu.findFade(result);
    expect(tag).toBeNull();

    tag = asu.findClip(result);
    expect(tag).toBeNull();

    tag = asu.findIclip(result);
    expect(tag).toBeNull();

    tag = asu.findMove(result);
    expect(tag).toBeNull();

    tag = asu.findT(result);
    expect(tag).toBeNull();

    expect(asu.contentsToString(result)).toEqual(text);
});

test("can't find tag", () => {
    const text = "{}Kirino-san";
    const result = asu.parseContent(text);
    let tag: asu.Tags | null;

    tag = asu.findA(result);
    expect(tag).toBeNull();

    tag = asu.findB(result);
    expect(tag).toBeNull();

    tag = asu.findColor(result);
    expect(tag).toBeNull();

    tag = asu.findColor1(result);
    expect(tag).toBeNull();

    tag = asu.findColor2(result);
    expect(tag).toBeNull();

    tag = asu.findColor3(result);
    expect(tag).toBeNull();

    tag = asu.findColor4(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha1(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha2(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha3(result);
    expect(tag).toBeNull();

    tag = asu.findAlpha4(result);
    expect(tag).toBeNull();

    tag = asu.findAn(result);
    expect(tag).toBeNull();

    tag = asu.findBe(result);
    expect(tag).toBeNull();

    tag = asu.findBlur(result);
    expect(tag).toBeNull();

    tag = asu.findBord(result);
    expect(tag).toBeNull();

    tag = asu.findXbord(result);
    expect(tag).toBeNull();

    tag = asu.findYbord(result);
    expect(tag).toBeNull();

    tag = asu.findShad(result);
    expect(tag).toBeNull();

    tag = asu.findXshad(result);
    expect(tag).toBeNull();

    tag = asu.findYshad(result);
    expect(tag).toBeNull();

    tag = asu.findFr(result);
    expect(tag).toBeNull();

    tag = asu.findFrx(result);
    expect(tag).toBeNull();

    tag = asu.findFry(result);
    expect(tag).toBeNull();

    tag = asu.findFrz(result);
    expect(tag).toBeNull();

    tag = asu.findFax(result);
    expect(tag).toBeNull();

    tag = asu.findFay(result);
    expect(tag).toBeNull();

    tag = asu.findP(result);
    expect(tag).toBeNull();

    tag = asu.findPbo(result);
    expect(tag).toBeNull();

    tag = asu.findQ(result);
    expect(tag).toBeNull();

    tag = asu.findS(result);
    expect(tag).toBeNull();

    tag = asu.findU(result);
    expect(tag).toBeNull();

    tag = asu.findR(result);
    expect(tag).toBeNull();

    tag = asu.findFe(result);
    expect(tag).toBeNull();

    tag = asu.findFn(result);
    expect(tag).toBeNull();

    tag = asu.findFscx(result);
    expect(tag).toBeNull();

    tag = asu.findFscy(result);
    expect(tag).toBeNull();

    tag = asu.findFsp(result);
    expect(tag).toBeNull();

    tag = asu.findKLowerCase(result);
    expect(tag).toBeNull();

    tag = asu.findKUpperCase(result);
    expect(tag).toBeNull();

    tag = asu.findKo(result);
    expect(tag).toBeNull();

    tag = asu.findKf(result);
    expect(tag).toBeNull();

    tag = asu.findI(result);
    expect(tag).toBeNull();

    tag = asu.findFs(result);
    expect(tag).toBeNull();

    tag = asu.findPos(result);
    expect(tag).toBeNull();

    tag = asu.findOrg(result);
    expect(tag).toBeNull();

    tag = asu.findFad(result);
    expect(tag).toBeNull();

    tag = asu.findFade(result);
    expect(tag).toBeNull();

    tag = asu.findClip(result);
    expect(tag).toBeNull();

    tag = asu.findIclip(result);
    expect(tag).toBeNull();

    tag = asu.findMove(result);
    expect(tag).toBeNull();

    tag = asu.findT(result);
    expect(tag).toBeNull();

    expect(asu.contentsToString(result)).toEqual(text);
});
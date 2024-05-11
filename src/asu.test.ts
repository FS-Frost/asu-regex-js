import { expect, test } from "bun:test";
import * as asu from "./asu";

// a
test("find a", () => {
    const text = "{\\a7}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findA(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update a", () => {
    const text = "{\\fs16\\a1}Kirino-san";
    const expectedText = "{\\fs16\\a9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setA(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.a,
        value: 9,
    } satisfies asu.TagA);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add a", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\a9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setA(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.a,
        value: 9,
    } satisfies asu.TagA);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and a", () => {
    const text = "Kirino-san";
    const expectedText = "{\\a9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setA(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.a,
        value: 9,
    } satisfies asu.TagA);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// an
test("find an", () => {
    const text = "{\\an7}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAn(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update an", () => {
    const text = "{\\fs16\\an1}Kirino-san";
    const expectedText = "{\\fs16\\an9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAn(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.an,
        value: 9,
    } satisfies asu.TagAn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add an", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\an9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAn(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.an,
        value: 9,
    } satisfies asu.TagAn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and an", () => {
    const text = "Kirino-san";
    const expectedText = "{\\an9}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAn(result, 9);
    expect(tag).toEqual({
        name: asu.TagName.an,
        value: 9,
    } satisfies asu.TagAn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// be
test("find be", () => {
    const text = "{\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBe(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update be", () => {
    const text = "{\\fs16\\be1}Kirino-san";
    const expectedText = "{\\fs16\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBe(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.be,
        value: 2,
    } satisfies asu.TagBe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add be", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBe(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.be,
        value: 2,
    } satisfies asu.TagBe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and be", () => {
    const text = "Kirino-san";
    const expectedText = "{\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBe(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.be,
        value: 2,
    } satisfies asu.TagBe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// b
test("find b", () => {
    const text = "{\\b1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findB(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update b", () => {
    const text = "{\\fs16\\b1}Kirino-san";
    const expectedText = "{\\fs16\\b0}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setB(result, 0);
    expect(tag).toEqual({
        name: asu.TagName.b,
        value: 0,
    } satisfies asu.TagB);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add b", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\b1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setB(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.b,
        value: 1,
    } satisfies asu.TagB);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and b", () => {
    const text = "Kirino-san";
    const expectedText = "{\\b1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setB(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.b,
        value: 1,
    } satisfies asu.TagB);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// blur
test("find blur", () => {
    const text = "{\\blur3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBlur(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update blur", () => {
    const text = "{\\fs16\\blur1}Kirino-san";
    const expectedText = "{\\fs16\\blur2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBlur(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.blur,
        value: 2,
    } satisfies asu.TagBlur);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add blur", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\blur2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBlur(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.blur,
        value: 2,
    } satisfies asu.TagBlur);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and blur", () => {
    const text = "Kirino-san";
    const expectedText = "{\\blur2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBlur(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.blur,
        value: 2,
    } satisfies asu.TagBlur);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// bord
test("find bord", () => {
    const text = "{\\bord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update bord", () => {
    const text = "{\\fs16\\bord1}Kirino-san";
    const expectedText = "{\\fs16\\bord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.bord,
        value: 2,
    } satisfies asu.TagBord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add bord", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\bord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.bord,
        value: 2,
    } satisfies asu.TagBord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and bord", () => {
    const text = "Kirino-san";
    const expectedText = "{\\bord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setBord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.bord,
        value: 2,
    } satisfies asu.TagBord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// xbord
test("find xbord", () => {
    const text = "{\\xbord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findXbord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update xbord", () => {
    const text = "{\\fs16\\xbord1}Kirino-san";
    const expectedText = "{\\fs16\\xbord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xbord,
        value: 2,
    } satisfies asu.TagXbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add xbord", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\xbord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xbord,
        value: 2,
    } satisfies asu.TagXbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and xbord", () => {
    const text = "Kirino-san";
    const expectedText = "{\\xbord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xbord,
        value: 2,
    } satisfies asu.TagXbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// ybord
test("find ybord", () => {
    const text = "{\\ybord3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findYbord(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update ybord", () => {
    const text = "{\\fs16\\ybord1}Kirino-san";
    const expectedText = "{\\fs16\\ybord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.ybord,
        value: 2,
    } satisfies asu.TagYbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add ybord", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\ybord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.ybord,
        value: 2,
    } satisfies asu.TagYbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and ybord", () => {
    const text = "Kirino-san";
    const expectedText = "{\\ybord2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYbord(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.ybord,
        value: 2,
    } satisfies asu.TagYbord);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// shad
test("find shad", () => {
    const text = "{\\shad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findShad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update shad", () => {
    const text = "{\\fs16\\shad1}Kirino-san";
    const expectedText = "{\\fs16\\shad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setShad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.shad,
        value: 2,
    } satisfies asu.TagShad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add shad", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\shad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setShad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.shad,
        value: 2,
    } satisfies asu.TagShad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and shad", () => {
    const text = "Kirino-san";
    const expectedText = "{\\shad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setShad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.shad,
        value: 2,
    } satisfies asu.TagShad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// xshad
test("find xshad", () => {
    const text = "{\\xshad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findXshad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update xshad", () => {
    const text = "{\\fs16\\xshad1}Kirino-san";
    const expectedText = "{\\fs16\\xshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xshad,
        value: 2,
    } satisfies asu.TagXshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add xshad", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\xshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xshad,
        value: 2,
    } satisfies asu.TagXshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and xshad", () => {
    const text = "Kirino-san";
    const expectedText = "{\\xshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setXshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.xshad,
        value: 2,
    } satisfies asu.TagXshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// yshad
test("find yshad", () => {
    const text = "{\\yshad3}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findYshad(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update yshad", () => {
    const text = "{\\fs16\\yshad1}Kirino-san";
    const expectedText = "{\\fs16\\yshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.yshad,
        value: 2,
    } satisfies asu.TagYshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add yshad", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\yshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.yshad,
        value: 2,
    } satisfies asu.TagYshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and yshad", () => {
    const text = "Kirino-san";
    const expectedText = "{\\yshad2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setYshad(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.yshad,
        value: 2,
    } satisfies asu.TagYshad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fr
test("find fr", () => {
    const text = "{\\fr45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFr(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fr", () => {
    const text = "{\\fs16\\fr90}Kirino-san";
    const expectedText = "{\\fs16\\fr270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFr(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fr,
        value: 270,
    } satisfies asu.TagFr);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fr", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fr90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFr(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fr,
        value: 90,
    } satisfies asu.TagFr);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fr", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fr90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFr(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fr,
        value: 90,
    } satisfies asu.TagFr);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// frx
test("find frx", () => {
    const text = "{\\frx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update frx", () => {
    const text = "{\\fs16\\frx90}Kirino-san";
    const expectedText = "{\\fs16\\frx270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrx(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.frx,
        value: 270,
    } satisfies asu.TagFrx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add frx", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\frx90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrx(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.frx,
        value: 90,
    } satisfies asu.TagFrx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and frx", () => {
    const text = "Kirino-san";
    const expectedText = "{\\frx90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrx(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.frx,
        value: 90,
    } satisfies asu.TagFrx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fry
test("find fry", () => {
    const text = "{\\fry45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFry(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fry", () => {
    const text = "{\\fs16\\fry90}Kirino-san";
    const expectedText = "{\\fs16\\fry270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFry(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fry,
        value: 270,
    } satisfies asu.TagFry);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fry", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fry90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFry(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fry,
        value: 90,
    } satisfies asu.TagFry);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fry", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fry90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFry(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fry,
        value: 90,
    } satisfies asu.TagFry);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// frz
test("find frz", () => {
    const text = "{\\frz45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrz(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update frz", () => {
    const text = "{\\fs16\\frz90}Kirino-san";
    const expectedText = "{\\fs16\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrz(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.frz,
        value: 270,
    } satisfies asu.TagFrz);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add frz", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\frz90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrz(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.frz,
        value: 90,
    } satisfies asu.TagFrz);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and frz", () => {
    const text = "Kirino-san";
    const expectedText = "{\\frz90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFrz(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.frz,
        value: 90,
    } satisfies asu.TagFrz);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fax
test("find fax", () => {
    const text = "{\\fax45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFax(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fax", () => {
    const text = "{\\fs16\\fax90}Kirino-san";
    const expectedText = "{\\fs16\\fax270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFax(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fax,
        value: 270,
    } satisfies asu.TagFax);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fax", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fax90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFax(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fax,
        value: 90,
    } satisfies asu.TagFax);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fax", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fax90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFax(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fax,
        value: 90,
    } satisfies asu.TagFax);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fay
test("find fay", () => {
    const text = "{\\fay45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFay(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fay", () => {
    const text = "{\\fs16\\fay90}Kirino-san";
    const expectedText = "{\\fs16\\fay270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFay(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fay,
        value: 270,
    } satisfies asu.TagFay);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fay", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fay90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFay(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fay,
        value: 90,
    } satisfies asu.TagFay);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fay", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fay90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFay(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fay,
        value: 90,
    } satisfies asu.TagFay);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fscx
test("find fscx", () => {
    const text = "{\\fscx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFscx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fscx", () => {
    const text = "{\\fs16\\fscx90}Kirino-san";
    const expectedText = "{\\fs16\\fscx270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscx(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fscx,
        value: 270,
    } satisfies asu.TagFscx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fscx", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fscx90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscx(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fscx,
        value: 90,
    } satisfies asu.TagFscx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fscx", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fscx90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscx(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fscx,
        value: 90,
    } satisfies asu.TagFscx);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fscy
test("find fscy", () => {
    const text = "{\\fscy45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFscy(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fscy", () => {
    const text = "{\\fs16\\fscy90}Kirino-san";
    const expectedText = "{\\fs16\\fscy270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscy(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fscy,
        value: 270,
    } satisfies asu.TagFscy);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fscy", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fscy90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscy(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fscy,
        value: 90,
    } satisfies asu.TagFscy);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fscy", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fscy90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFscy(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fscy,
        value: 90,
    } satisfies asu.TagFscy);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fsp
test("find fsp", () => {
    const text = "{\\fsp45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFsp(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fsp", () => {
    const text = "{\\fs16\\fsp90}Kirino-san";
    const expectedText = "{\\fs16\\fsp270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFsp(result, 270);
    expect(tag).toEqual({
        name: asu.TagName.fsp,
        value: 270,
    } satisfies asu.TagFsp);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fsp", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fsp90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFsp(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fsp,
        value: 90,
    } satisfies asu.TagFsp);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fsp", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fsp90}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFsp(result, 90);
    expect(tag).toEqual({
        name: asu.TagName.fsp,
        value: 90,
    } satisfies asu.TagFsp);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// k lower case
test("find k lower case", () => {
    const text = "{\\k36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKLowerCase(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update k lower case", () => {
    const text = "{\\k0\\frz270}Kirino-san";
    const expectedText = "{\\k36\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKLowerCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kLowerCase,
        value: 36,
    } satisfies asu.TagKLowerCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add k lower case", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\k36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKLowerCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kLowerCase,
        value: 36,
    } satisfies asu.TagKLowerCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and k lower case", () => {
    const text = "Kirino-san";
    const expectedText = "{\\k36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKLowerCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kLowerCase,
        value: 36,
    } satisfies asu.TagKLowerCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// k upper case
test("find K upper case", () => {
    const text = "{\\K36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKUpperCase(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update K upper case", () => {
    const text = "{\\K0\\frz270}Kirino-san";
    const expectedText = "{\\K36\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKUpperCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kUpperCase,
        value: 36,
    } satisfies asu.TagKUpperCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add K upper case", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\K36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKUpperCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kUpperCase,
        value: 36,
    } satisfies asu.TagKUpperCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and K upper case", () => {
    const text = "Kirino-san";
    const expectedText = "{\\K36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKUpperCase(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kUpperCase,
        value: 36,
    } satisfies asu.TagKUpperCase);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// kf
test("find kf", () => {
    const text = "{\\kf36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKf(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update kf", () => {
    const text = "{\\kf0\\frz270}Kirino-san";
    const expectedText = "{\\kf36\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKf(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kf,
        value: 36,
    } satisfies asu.TagKf);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add kf", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\kf36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKf(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kf,
        value: 36,
    } satisfies asu.TagKf);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and kf", () => {
    const text = "Kirino-san";
    const expectedText = "{\\kf36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKf(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.kf,
        value: 36,
    } satisfies asu.TagKf);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// ko
test("find ko", () => {
    const text = "{\\ko36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findKo(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update ko", () => {
    const text = "{\\ko0\\frz270}Kirino-san";
    const expectedText = "{\\ko36\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKo(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.ko,
        value: 36,
    } satisfies asu.TagKo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add ko", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\ko36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKo(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.ko,
        value: 36,
    } satisfies asu.TagKo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and ko", () => {
    const text = "Kirino-san";
    const expectedText = "{\\ko36}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setKo(result, 36);
    expect(tag).toEqual({
        name: asu.TagName.ko,
        value: 36,
    } satisfies asu.TagKo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// p
test("find p", () => {
    const text = "{\\p1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findP(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update p", () => {
    const text = "{\\p1\\frz270}Kirino-san";
    const expectedText = "{\\p2\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setP(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.p,
        value: 2,
    } satisfies asu.TagP);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add p", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\p2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setP(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.p,
        value: 2,
    } satisfies asu.TagP);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and p", () => {
    const text = "Kirino-san";
    const expectedText = "{\\p2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setP(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.p,
        value: 2,
    } satisfies asu.TagP);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// pbo
test("find pbo", () => {
    const text = "{\\pbo1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findPbo(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update pbo", () => {
    const text = "{\\pbo1\\frz270}Kirino-san";
    const expectedText = "{\\pbo2\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPbo(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.pbo,
        value: 2,
    } satisfies asu.TagPbo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add pbo", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\pbo2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPbo(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.pbo,
        value: 2,
    } satisfies asu.TagPbo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and pbo", () => {
    const text = "Kirino-san";
    const expectedText = "{\\pbo2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPbo(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.pbo,
        value: 2,
    } satisfies asu.TagPbo);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// q
test("find q", () => {
    const text = "{\\q1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findQ(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update q", () => {
    const text = "{\\q1\\frz270}Kirino-san";
    const expectedText = "{\\q2\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setQ(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.q,
        value: 2,
    } satisfies asu.TagQ);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add q", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\q2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setQ(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.q,
        value: 2,
    } satisfies asu.TagQ);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and q", () => {
    const text = "Kirino-san";
    const expectedText = "{\\q2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setQ(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.q,
        value: 2,
    } satisfies asu.TagQ);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// s
test("find s", () => {
    const text = "{\\s1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findS(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update s", () => {
    const text = "{\\s1\\frz270}Kirino-san";
    const expectedText = "{\\s2\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setS(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.s,
        value: 2,
    } satisfies asu.TagS);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add s", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\s2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setS(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.s,
        value: 2,
    } satisfies asu.TagS);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and s", () => {
    const text = "Kirino-san";
    const expectedText = "{\\s2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setS(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.s,
        value: 2,
    } satisfies asu.TagS);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// u
test("find u", () => {
    const text = "{\\u1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findU(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update u", () => {
    const text = "{\\u1\\frz270}Kirino-san";
    const expectedText = "{\\u2\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setU(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.u,
        value: 2,
    } satisfies asu.TagU);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add u", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\u2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setU(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.u,
        value: 2,
    } satisfies asu.TagU);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and u", () => {
    const text = "Kirino-san";
    const expectedText = "{\\u2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setU(result, 2);
    expect(tag).toEqual({
        name: asu.TagName.u,
        value: 2,
    } satisfies asu.TagU);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// r
test("find r", () => {
    const text = "{\\rDefault - Alt}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findR(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update r", () => {
    const text = "{\\rDefault - Alt\\frz270}Kirino-san";
    const expectedText = "{\\rDefault\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setR(result, "Default");
    expect(tag).toEqual({
        name: asu.TagName.r,
        style: "Default",
    } satisfies asu.TagR);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add r", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\rDefault - Alt}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setR(result, "Default - Alt");
    expect(tag).toEqual({
        name: asu.TagName.r,
        style: "Default - Alt",
    } satisfies asu.TagR);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and r", () => {
    const text = "Kirino-san";
    const expectedText = "{\\rDefault - Alt}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setR(result, "Default - Alt");
    expect(tag).toEqual({
        name: asu.TagName.r,
        style: "Default - Alt",
    } satisfies asu.TagR);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fe
test("find fe", () => {
    const text = "{\\fe1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFe(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fe", () => {
    const text = "{\\fe0\\frz270}Kirino-san";
    const expectedText = "{\\fe1\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFe(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.fe,
        encodingId: 1,
    } satisfies asu.TagFe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fe", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fe1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFe(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.fe,
        encodingId: 1,
    } satisfies asu.TagFe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fe", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fe1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFe(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.fe,
        encodingId: 1,
    } satisfies asu.TagFe);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fn
test("find fn", () => {
    const text = "{\\fnArial Mincho}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFn(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fn", () => {
    const text = "{\\fnArial Mincho\\frz270}Kirino-san";
    const expectedText = "{\\fnArial\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFn(result, "Arial");
    expect(tag).toEqual({
        name: asu.TagName.fn,
        font: "Arial",
    } satisfies asu.TagFn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fn", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\fnArial Mincho}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFn(result, "Arial Mincho");
    expect(tag).toEqual({
        name: asu.TagName.fn,
        font: "Arial Mincho",
    } satisfies asu.TagFn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fn", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fnArial Mincho}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFn(result, "Arial Mincho");
    expect(tag).toEqual({
        name: asu.TagName.fn,
        font: "Arial Mincho",
    } satisfies asu.TagFn);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// i
test("find i", () => {
    const text = "{\\i1}Kirino-san{\\i0}";
    const result = asu.parseContent(text);
    const tag = asu.findI(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update i", () => {
    const text = "{\\i0\\frz270}Kirino-san";
    const expectedText = "{\\i1\\frz270}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setI(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.i,
        value: 1,
    } satisfies asu.TagI);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add i", () => {
    const text = "{\\fs16}Kirino-san";
    const expectedText = "{\\fs16\\i1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setI(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.i,
        value: 1,
    } satisfies asu.TagI);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and i", () => {
    const text = "Kirino-san";
    const expectedText = "{\\i1}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setI(result, 1);
    expect(tag).toEqual({
        name: asu.TagName.i,
        value: 1,
    } satisfies asu.TagI);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fs
test("find fs", () => {
    const text = "{\\fs32}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFs(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fs", () => {
    const text = "{\\be2\\fs32}Kirino-san";
    const expectedText = "{\\be2\\fs16}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFs(result, 16);
    expect(tag).toEqual({
        name: asu.TagName.fs,
        value: 16,
    } satisfies asu.TagFs);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fs", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\fs16}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFs(result, 16);
    expect(tag).toEqual({
        name: asu.TagName.fs,
        value: 16,
    } satisfies asu.TagFs);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fs", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fs16}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFs(result, 16);
    expect(tag).toEqual({
        name: asu.TagName.fs,
        value: 16,
    } satisfies asu.TagFs);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// pos
test("find pos", () => {
    const text = "{\\pos(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const pos = asu.findPos(result);
    expect(pos).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update pos", () => {
    const text = "{\\be2\\pos(-10,20.12)}Kirino-san";
    const expectedText = "{\\be2\\pos(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPos(result, 10, 20);
    expect(tag).toEqual({
        name: asu.TagName.pos,
        x: 10,
        y: 20,
    } satisfies asu.TagPos);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add pos", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\pos(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPos(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.pos,
        x: -130.51,
        y: 40.12,
    } satisfies asu.TagPos);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and pos", () => {
    const text = "Kirino-san";
    const expectedText = "{\\pos(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setPos(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.pos,
        x: -130.51,
        y: 40.12,
    } satisfies asu.TagPos);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// org
test("find org", () => {
    const text = "{\\org(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const org = asu.findOrg(result);
    expect(org).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update org", () => {
    const text = "{\\be2\\org(-10,20.12)}Kirino-san";
    const expectedText = "{\\be2\\org(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setOrg(result, 10, 20);
    expect(tag).toEqual({
        name: asu.TagName.org,
        x: 10,
        y: 20,
    } satisfies asu.TagOrg);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add org", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\org(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setOrg(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.org,
        x: -130.51,
        y: 40.12,
    } satisfies asu.TagOrg);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and org", () => {
    const text = "Kirino-san";
    const expectedText = "{\\org(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setOrg(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.org,
        x: -130.51,
        y: 40.12,
    } satisfies asu.TagOrg);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fad
test("find fad", () => {
    const text = "{\\fad(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const fad = asu.findFad(result);
    expect(fad).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fad", () => {
    const text = "{\\be2\\fad(-10,20.12)}Kirino-san";
    const expectedText = "{\\be2\\fad(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFad(result, 10, 20);
    expect(tag).toEqual({
        name: asu.TagName.fad,
        in: 10,
        out: 20,
    } satisfies asu.TagFad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fad", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\fad(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFad(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.fad,
        in: -130.51,
        out: 40.12,
    } satisfies asu.TagFad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fad", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fad(-130.51,40.12)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFad(result, -130.51, 40.12);
    expect(tag).toEqual({
        name: asu.TagName.fad,
        in: -130.51,
        out: 40.12,
    } satisfies asu.TagFad);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// fade
test("find fade", () => {
    const text = "{\\fade(10,20,30,1,2,3,4)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findFade(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update fade", () => {
    const text = "{\\be2\\fade(-10,-20,-30,-1,-2,-3,-4)}Kirino-san";
    const expectedText = "{\\be2\\fade(10,20,30,1,2,3,4)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFade(result, 10, 20, 30, 1, 2, 3, 4);
    expect(tag).toEqual({
        name: asu.TagName.fade,
        alpha1: 10,
        alpha2: 20,
        alpha3: 30,
        t1: 1,
        t2: 2,
        t3: 3,
        t4: 4,
    } satisfies asu.TagFade);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add fade", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\fade(10,20,30,1,2,3,4)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFade(result, 10, 20, 30, 1, 2, 3, 4);
    expect(tag).toEqual({
        name: asu.TagName.fade,
        alpha1: 10,
        alpha2: 20,
        alpha3: 30,
        t1: 1,
        t2: 2,
        t3: 3,
        t4: 4,
    } satisfies asu.TagFade);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and fade", () => {
    const text = "Kirino-san";
    const expectedText = "{\\fade(10,20,30,1,2,3,4)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setFade(result, 10, 20, 30, 1, 2, 3, 4);
    expect(tag).toEqual({
        name: asu.TagName.fade,
        alpha1: 10,
        alpha2: 20,
        alpha3: 30,
        t1: 1,
        t2: 2,
        t3: 3,
        t4: 4,
    } satisfies asu.TagFade);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// clip
test("find clip", () => {
    const text = "{\\clip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findClip(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update clip", () => {
    const text = "{\\be2\\clip(0,0,320,240)}Kirino-san";
    const expectedText = "{\\be2\\clip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setClip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.clip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagClip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add clip", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\clip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setClip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.clip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagClip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and clip", () => {
    const text = "Kirino-san";
    const expectedText = "{\\clip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setClip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.clip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagClip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// iclip
test("find iclip", () => {
    const text = "{\\iclip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const fade = asu.findIclip(result);
    expect(fade).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update iclip", () => {
    const text = "{\\be2\\iclip(0,0,320,240)}Kirino-san";
    const expectedText = "{\\be2\\iclip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setIclip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.iclip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagIclip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add iclip", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\iclip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setIclip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.iclip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagIclip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and iclip", () => {
    const text = "Kirino-san";
    const expectedText = "{\\iclip(1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setIclip(result, "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0");
    expect(tag).toEqual({
        name: asu.TagName.iclip,
        drawCommands: "1,m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0",
    } satisfies asu.TagIclip);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// color
test("find color", () => {
    const text = "{\\c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update color", () => {
    const text = "{\\be2\\c&H28AB72&}Kirino-san";
    const expectedText = "{\\be2\\c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor(result, "&HC14200&");
    expect(tag).toEqual({
        name: asu.TagName.color,
        value: "&HC14200&",
    } satisfies asu.TagC);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add color", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color,
        value: "&H28AB72&",
    } satisfies asu.TagC);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and color", () => {
    const text = "Kirino-san";
    const expectedText = "{\\c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color,
        value: "&H28AB72&",
    } satisfies asu.TagC);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// color1
test("find color1", () => {
    const text = "{\\1c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor1(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update color1", () => {
    const text = "{\\be2\\1c&H28AB72&}Kirino-san";
    const expectedText = "{\\be2\\1c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor1(result, "&HC14200&");
    expect(tag).toEqual({
        name: asu.TagName.color1,
        value: "&HC14200&",
    } satisfies asu.Tag1c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add color1", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\1c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor1(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color1,
        value: "&H28AB72&",
    } satisfies asu.Tag1c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and color1", () => {
    const text = "Kirino-san";
    const expectedText = "{\\1c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor1(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color1,
        value: "&H28AB72&",
    } satisfies asu.Tag1c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// color2
test("find color2", () => {
    const text = "{\\2c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor2(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update color2", () => {
    const text = "{\\be2\\2c&H28AB72&}Kirino-san";
    const expectedText = "{\\be2\\2c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor2(result, "&HC14200&");
    expect(tag).toEqual({
        name: asu.TagName.color2,
        value: "&HC14200&",
    } satisfies asu.Tag2c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add color2", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\2c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor2(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color2,
        value: "&H28AB72&",
    } satisfies asu.Tag2c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and color2", () => {
    const text = "Kirino-san";
    const expectedText = "{\\2c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor2(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color2,
        value: "&H28AB72&",
    } satisfies asu.Tag2c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// color3
test("find color3", () => {
    const text = "{\\3c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor3(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update color3", () => {
    const text = "{\\be2\\3c&H28AB72&}Kirino-san";
    const expectedText = "{\\be2\\3c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor3(result, "&HC14200&");
    expect(tag).toEqual({
        name: asu.TagName.color3,
        value: "&HC14200&",
    } satisfies asu.Tag3c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add color3", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\3c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor3(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color3,
        value: "&H28AB72&",
    } satisfies asu.Tag3c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and color3", () => {
    const text = "Kirino-san";
    const expectedText = "{\\3c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor3(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color3,
        value: "&H28AB72&",
    } satisfies asu.Tag3c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// color4
test("find color4", () => {
    const text = "{\\4c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findColor4(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update color4", () => {
    const text = "{\\be2\\4c&H28AB72&}Kirino-san";
    const expectedText = "{\\be2\\4c&HC14200&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor4(result, "&HC14200&");
    expect(tag).toEqual({
        name: asu.TagName.color4,
        value: "&HC14200&",
    } satisfies asu.Tag4c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add color4", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\4c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor4(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color4,
        value: "&H28AB72&",
    } satisfies asu.Tag4c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and color4", () => {
    const text = "Kirino-san";
    const expectedText = "{\\4c&H28AB72&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setColor4(result, "&H28AB72&");
    expect(tag).toEqual({
        name: asu.TagName.color4,
        value: "&H28AB72&",
    } satisfies asu.Tag4c);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// alpha
test("find alpha", () => {
    const text = "{\\alpha&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update alpha", () => {
    const text = "{\\be2\\alpha&H20&}Kirino-san";
    const expectedText = "{\\be2\\alpha&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha,
        value: "&H80&",
    } satisfies asu.TagAlpha);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add alpha", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\alpha&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha,
        value: "&H80&",
    } satisfies asu.TagAlpha);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and alpha", () => {
    const text = "Kirino-san";
    const expectedText = "{\\alpha&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha,
        value: "&H80&",
    } satisfies asu.TagAlpha);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// alpha1
test("find alpha1", () => {
    const text = "{\\1a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha1(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update alpha1", () => {
    const text = "{\\be2\\1a&H20&}Kirino-san";
    const expectedText = "{\\be2\\1a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha1(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha1,
        value: "&H80&",
    } satisfies asu.Tag1a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add alpha1", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\1a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha1(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha1,
        value: "&H80&",
    } satisfies asu.Tag1a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and alpha1", () => {
    const text = "Kirino-san";
    const expectedText = "{\\1a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha1(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha1,
        value: "&H80&",
    } satisfies asu.Tag1a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// alpha2
test("find alpha2", () => {
    const text = "{\\2a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha2(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update alpha2", () => {
    const text = "{\\be2\\2a&H20&}Kirino-san";
    const expectedText = "{\\be2\\2a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha2(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha2,
        value: "&H80&",
    } satisfies asu.Tag2a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add alpha2", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\2a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha2(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha2,
        value: "&H80&",
    } satisfies asu.Tag2a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and alpha2", () => {
    const text = "Kirino-san";
    const expectedText = "{\\2a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha2(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha2,
        value: "&H80&",
    } satisfies asu.Tag2a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// alpha3
test("find alpha3", () => {
    const text = "{\\3a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha3(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update alpha3", () => {
    const text = "{\\be2\\3a&H20&}Kirino-san";
    const expectedText = "{\\be2\\3a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha3(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha3,
        value: "&H80&",
    } satisfies asu.Tag3a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add alpha3", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\3a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha3(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha3,
        value: "&H80&",
    } satisfies asu.Tag3a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and alpha3", () => {
    const text = "Kirino-san";
    const expectedText = "{\\3a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha3(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha3,
        value: "&H80&",
    } satisfies asu.Tag3a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// alpha4
test("find alpha4", () => {
    const text = "{\\4a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findAlpha4(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update alpha4", () => {
    const text = "{\\be2\\4a&H20&}Kirino-san";
    const expectedText = "{\\be2\\4a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha4(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha4,
        value: "&H80&",
    } satisfies asu.Tag4a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add alpha4", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\4a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha4(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha4,
        value: "&H80&",
    } satisfies asu.Tag4a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and alpha4", () => {
    const text = "Kirino-san";
    const expectedText = "{\\4a&H80&}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setAlpha4(result, "&H80&");
    expect(tag).toEqual({
        name: asu.TagName.alpha4,
        value: "&H80&",
    } satisfies asu.Tag4a);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// move(x1,y1,x2,y2)
test("find move(x1,y1,x2,y2)", () => {
    const text = "{\\move(10,20,30,40)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update move(x1,y1,x2,y2)", () => {
    const text = "{\\be2\\move(-10,20.12,0.52,30983)}Kirino-san";
    const expectedText = "{\\be2\\move(10,20,30,40)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, 10, 20, 30, 40);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: 10,
        y1: 20,
        x2: 30,
        y2: 40,
        t1: null,
        t2: null,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add move(x1,y1,x2,y2)", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\move(-10,20.12,0.52,30983)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, -10, 20.12, 0.52, 30983);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: -10,
        y1: 20.12,
        x2: 0.52,
        y2: 30983,
        t1: null,
        t2: null,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and move(x1,y1,x2,y2)", () => {
    const text = "Kirino-san";
    const expectedText = "{\\move(-10,20.12,0.52,30983)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, -10, 20.12, 0.52, 30983);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: -10,
        y1: 20.12,
        x2: 0.52,
        y2: 30983,
        t1: null,
        t2: null,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// move(x1,y1,x2,y2,t1,t2)
test("find move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "{\\move(10,20,30,40,50,60)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "{\\be2\\move(-10,20.12,0.52,30983)}Kirino-san";
    const expectedText = "{\\be2\\move(10,20,30,40,90,280)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, 10, 20, 30, 40, 90, 280);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: 10,
        y1: 20,
        x2: 30,
        y2: 40,
        t1: 90,
        t2: 280,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("add move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\move(-10,20.12,0.52,30983,90,280)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, -10, 20.12, 0.52, 30983, 90, 280);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: -10,
        y1: 20.12,
        x2: 0.52,
        y2: 30983,
        t1: 90,
        t2: 280,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "Kirino-san";
    const expectedText = "{\\move(-10,20.12,0.52,30983,90,280)}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setMove(result, -10, 20.12, 0.52, 30983, 90, 280);
    expect(tag).toEqual({
        name: asu.TagName.move,
        x1: -10,
        y1: 20.12,
        x2: 0.52,
        y2: 30983,
        t1: 90,
        t2: 280,
    } satisfies asu.TagMove);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// t(fx)
test("find t(fx)", () => {
    const text = "{\\t(\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update t(fx)", () => {
    const text = "{\\t(\\fs16)}Kirino-san";
    const expectedText = "{\\t(\\fs16\\pos(12,-12.14))}Kirino-san";
    const items = asu.parseContent(text);
    let tagT = asu.findT(items);
    expect(tagT).not.toBeNull();
    if (tagT == null) {
        throw "null tag t";
    }

    const tItems = asu.tagsToItems(tagT.tags);
    asu.setPos(tItems, 12, -12.14);
    const updatedItems = asu.itemsToTags(tItems);

    asu.setT(items, updatedItems);
    expect(tagT).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: null,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(items)).toEqual(expectedText);
});

test("add t(fx)", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\t(\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ]);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: null,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and t(fx)", () => {
    const text = "Kirino-san";
    const expectedText = "{\\t(\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ]);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: null,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// t(accel,fx)
test("find t(accel,fx)", () => {
    const text = "{\\t(10,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update t(accel,fx)", () => {
    const text = "{\\t(\\fs16)}Kirino-san";
    const expectedText = "{\\t(120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const items = asu.parseContent(text);
    let tagT = asu.findT(items);
    expect(tagT).not.toBeNull();
    if (tagT == null) {
        throw "null tag t";
    }

    const tItems = asu.tagsToItems(tagT.tags);
    asu.setPos(tItems, 12, -12.14);
    const updatedItems = asu.itemsToTags(tItems);

    asu.setT(items, updatedItems, 120);
    expect(tagT).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(items)).toEqual(expectedText);
});

test("add t(accel,fx)", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\t(120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ], 120);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and t(accel,fx)", () => {
    const text = "Kirino-san";
    const expectedText = "{\\t(120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ], 120);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: null,
        t2: null,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// t(t1,t2,accel,fx)
test("find t(t1,t2,accel,fx)", () => {
    const text = "{\\be2\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("update t(t1,t2,accel,fx)", () => {
    const text = "{\\t(\\fs16)}Kirino-san";
    const expectedText = "{\\t(20,420,120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const items = asu.parseContent(text);
    let tagT = asu.findT(items);
    expect(tagT).not.toBeNull();
    if (tagT == null) {
        throw "null tag t";
    }

    const tItems = asu.tagsToItems(tagT.tags);
    asu.setPos(tItems, 12, -12.14);
    const updatedItems = asu.itemsToTags(tItems);

    asu.setT(items, updatedItems, 120, 20, 420);
    expect(tagT).toEqual({
        name: asu.TagName.t,
        t1: 20,
        t2: 420,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(items)).toEqual(expectedText);
});

test("add t(t1,t2,accel,fx)", () => {
    const text = "{\\be2}Kirino-san";
    const expectedText = "{\\be2\\t(20,420,120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ], 120, 20, 420);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: 20,
        t2: 420,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

test("create fx and t(t1,t2,accel,fx)", () => {
    const text = "Kirino-san";
    const expectedText = "{\\t(20,420,120,\\fs16\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.setT(result, [
        {
            name: asu.TagName.fs,
            value: 16,
        } satisfies asu.TagFs,
        {
            name: asu.TagName.pos,
            x: 12,
            y: -12.14,
        } satisfies asu.TagPos,
    ], 120, 20, 420);

    expect(tag).toEqual({
        name: asu.TagName.t,
        t1: 20,
        t2: 420,
        accel: 120,
        tags: [
            {
                name: asu.TagName.fs,
                value: 16,
            } satisfies asu.TagFs,
            {
                name: asu.TagName.pos,
                x: 12,
                y: -12.14,
            } satisfies asu.TagPos,
        ],
    } satisfies asu.TagT);
    expect(asu.contentsToString(result)).toEqual(expectedText);
});

// line
test("parse line", () => {
    const text = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\pos(182,421)}LINE 1";
    const line = asu.parseLine(text);
    expect(line).not.toBeNull();
    if (line == null) {
        throw "null line";
    }

    expect(asu.lineToString(line)).toEqual(text);
});

// others
test("parse result equals toString()", () => {
    const text = "{\\be5\\pos(0.5,-28)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const result = asu.parseContent(text);
    expect(asu.contentsToString(result)).toEqual(text);
});

test("parse tag be", () => {
    const text = "\\be2";
    const tags: asu.Tags[] = [];
    const result = asu.parseTags(text, tags);
    expect(result).toEqual([
        {
            name: asu.TagName.be,
            value: 2,
        } satisfies asu.TagBe,
    ]);
});

test("parse multiple groups", () => {
    const text = "{\\be5\\pos(0.5,-28)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const result = asu.parseContent(text);
    const expected: asu.ContentItem[] = [
        {
            name: "effect",
            tags: [
                {
                    name: asu.TagName.be,
                    value: 5,
                } satisfies asu.TagBe,
                {
                    name: asu.TagName.pos,
                    x: 0.5,
                    y: -28,
                } satisfies asu.TagPos,
            ],
        } satisfies asu.ContentEffect,
        {
            name: "text",
            value: "{¡Buenos días, "
        } satisfies asu.ContentText,
        {
            name: "effect",
            tags: [
                {
                    name: asu.TagName.i,
                    value: 1,
                } satisfies asu.TagI,
            ],
        } satisfies asu.ContentEffect,
        {
            name: "text",
            value: "Chitanda-san"
        } satisfies asu.ContentText,
        {
            name: "effect",
            tags: [
                {
                    name: asu.TagName.i,
                    value: 0,
                } satisfies asu.TagI,
            ],
        } satisfies asu.ContentEffect,
        {
            name: "text",
            value: "!"
        } satisfies asu.ContentText,
    ];
    expect(result).toEqual(expected);
});

test("remove tag", () => {
    const text = "{\\be5\\fs16\\pos(10,20)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const expectedText = "{\\be5\\pos(10,20)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const items = asu.parseContent(text);
    asu.removeTag(items, asu.TagName.fs);
    expect(asu.contentsToString(items)).toEqual(expectedText);
});

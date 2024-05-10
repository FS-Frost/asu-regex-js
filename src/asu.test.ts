import { expect, test } from "bun:test";
import * as asu from "./asu";

// be
test("expected api: find be", () => {
    const text = "{\\be2}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findBe(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update be", () => {
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

test("expected api: add be", () => {
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

test("expected api: create fx and be", () => {
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

// fr
test("expected api: find fr", () => {
    const text = "{\\fr45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFr(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update fr", () => {
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

test("expected api: add fr", () => {
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

test("expected api: create fx and fr", () => {
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
test("expected api: find frx", () => {
    const text = "{\\frx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update frx", () => {
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

test("expected api: add frx", () => {
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

test("expected api: create fx and frx", () => {
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
test("expected api: find fry", () => {
    const text = "{\\fry45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFry(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update fry", () => {
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

test("expected api: add fry", () => {
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

test("expected api: create fx and fry", () => {
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
test("expected api: find frz", () => {
    const text = "{\\frz45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrz(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update frz", () => {
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

test("expected api: add frz", () => {
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

test("expected api: create fx and frz", () => {
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

// i
test("expected api: find i", () => {
    const text = "{\\i1}Kirino-san{\\i0}";
    const result = asu.parseContent(text);
    const tag = asu.findI(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update i", () => {
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

test("expected api: add i", () => {
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

test("expected api: create fx and i", () => {
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
test("expected api: find fs", () => {
    const text = "{\\fs32}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFs(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: update fs", () => {
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

test("expected api: add fs", () => {
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

test("expected api: create fx and fs", () => {
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
test("expected api: find pos", () => {
    const text = "{\\pos(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const pos = asu.findPos(result);
    expect(pos).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// move
test("expected api: find move(x1,y1,x2,y2)", () => {
    const text = "{\\move(10,20,30,40)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find move(x1,y1,x2,y2,t1,t2)", () => {
    const text = "{\\move(10,20,30,40,50,60)}Kirino-san";
    const result = asu.parseContent(text);
    const move = asu.findMove(result);
    expect(move).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

// t
test("expected api: find t(fx)", () => {
    const text = "{\\t(\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find t(accel,fx)", () => {
    const text = "{\\t(10,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find t(t1,t2,accel,fx)", () => {
    const text = "{\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
    const result = asu.parseContent(text);
    const t = asu.findT(result);
    expect(t).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
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

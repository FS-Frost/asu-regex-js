import { expect, test } from "bun:test";
import * as asu from "./asu";

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

test("expected api: find fr", () => {
    const text = "{\\fr45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFr(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find frx", () => {
    const text = "{\\frx45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrx(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find fry", () => {
    const text = "{\\fry45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFry(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find frz", () => {
    const text = "{\\frz45}Kirino-san";
    const result = asu.parseContent(text);
    const tag = asu.findFrz(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

test("expected api: find i", () => {
    const text = "{\\i1}Kirino-san{\\i0}";
    const result = asu.parseContent(text);
    const tag = asu.findI(result);
    expect(tag).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

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

test("expected api: find pos", () => {
    const text = "{\\pos(10,20)}Kirino-san";
    const result = asu.parseContent(text);
    const pos = asu.findPos(result);
    expect(pos).not.toBeNull();
    expect(asu.contentsToString(result)).toEqual(text);
});

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

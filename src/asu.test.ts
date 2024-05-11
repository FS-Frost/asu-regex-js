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
    const text = "{\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))}Kirino-san";
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

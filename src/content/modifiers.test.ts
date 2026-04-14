import { expect, test } from "bun:test";
import * as asu from "../asu";

test("merge neighboring effects", () => {
    const text = "{\\kf32}ko{\\kf34}no {\\kf32}de{\\kf32}a{\\kf18}i {\\kf49}ga{\\kf31}{\\k0} {\\kf37}mi{\\kf31}n{\\kf34}na {\\kf19}wo {\\kf31}ka{\\kf34}e{\\kf63}ru {\\kf52}ka{\\kf33}na";

    const expectedText = "{\\kf32}ko{\\kf34}no {\\kf32}de{\\kf32}a{\\kf18}i {\\kf49}ga{\\kf31\\k0} {\\kf37}mi{\\kf31}n{\\kf34}na {\\kf19}wo {\\kf31}ka{\\kf34}e{\\kf63}ru {\\kf52}ka{\\kf33}na";

    const items = asu.parseContent(text);
    asu.mergeNeighboringEffects(items);
    expect(items).not.toBeNull();
    if (items == null) {
        throw "null items";
    }

    expect(asu.contentsToString(items)).toEqual(expectedText);
});

test("remove tag", () => {
    const text = "{\\be5\\fs16\\pos(10,20)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const expectedText = "{\\be5\\pos(10,20)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const items = asu.parseContent(text);
    asu.removeTag(items, asu.TagName.fs);
    expect(asu.contentsToString(items)).toEqual(expectedText);
});

test("remove not found tag", () => {
    const text = "{\\be5\\pos(10,20)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const items = asu.parseContent(text);
    asu.removeTag(items, asu.TagName.fs);
    expect(asu.contentsToString(items)).toEqual(text);
});

test("remove tag on content without fx", () => {
    const text = "Buenos días";
    const items = asu.parseContent(text);
    asu.removeTag(items, asu.TagName.fs);
    expect(asu.contentsToString(items)).toEqual(text);
});
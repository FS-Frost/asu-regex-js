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

test("truncate number tags", () => {
    const items = asu.parseContent(
        "{\\t(1.123,2.456,3.789,\\bord1.234)\\pos(1.11,2.22)\\move(1.1,2.2,3.3,4.4,5.5,6.6)\\fad(1.1,2.2)\\fade(1.1,2.2,3.3,4.4,5.5,6.6,7.7)\\fe1.5\\1c&H000000&\\bord1.123\\clip(1,2,3,4)\\iclip(m 1 2 3)\\fnArial\\rDefault\\unknown_tag}Text"
    );

    asu.truncateNumberTags(items, 2);

    expect(asu.contentsToString(items)).toEqual(
        "{\\t(1.12,2.45,3.78,\\bord1.234)\\pos(1.11,2.22)\\move(1.1,2.2,3.3,4.4,5.5,6.6)\\fad(1.1,2.2)\\fade(1.1,2.2,3.3,4.4,5.5,6.6,7.7)\\fe1\\1c&H000000&\\bord1.12\\clip(1,2,3,4)\\iclip(m 1 2 3)\\fnArial\\rDefault\\unknown_tag}Text"
    );
});

test("itemsToTags and tagsToItems", () => {
    const items = asu.parseContent("{\\bord1}");
    const tags = asu.itemsToTags(items);
    expect(tags.length).toBe(1);
    const newItems = asu.tagsToItems(tags);
    expect(newItems.length).toBe(1);
    expect(newItems[0].name).toBe("effect");

    expect(asu.itemsToTags([])).toEqual([]);
    expect(asu.itemsToTags([{ name: "text", value: "hello" }])).toEqual([]);
});

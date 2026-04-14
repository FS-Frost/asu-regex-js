import { expect, test } from "bun:test";
import * as asu from "../asu";

// color BGR
test("parse color BGR", () => {
    const text = "\\1c&HC14200&";
    const color = asu.parseColorBGR(text);
    expect(color).not.toBeNull();
    if (color == null) {
        throw "null color BGR";
    }

    const expectedColor: asu.ColorBGR = {
        blue: 193,
        green: 66,
        red: 0,
    };

    expect(color).toEqual(expectedColor);
});

test("parse content prefixed with {=text}", () => {
    const text = "{=6\\fs32}{\\pos(182,421)}LINE 1";
    const items = asu.parseContent(text);
    expect(items).not.toBeNull();
    if (items == null) {
        throw "null items";
    }

    expect(asu.contentsToString(items)).toEqual(text);
});

test("parse empty content", () => {
    const text = "{}LINE 1";
    const items = asu.parseContent(text);
    expect(items).not.toBeNull();
    if (items == null) {
        throw "null items";
    }

    expect(asu.contentsToString(items)).toEqual(text);
});

test("parse unknown tag", () => {
    const text = "{\\t(0,32,41,\\frx90)\\haru22\\fs32}LINE 1";
    const items = asu.parseContent(text);
    expect(items).not.toBeNull();
    if (items == null) {
        throw "null items";
    }

    expect(asu.contentsToString(items)).toEqual(text);
});

test("parse karaoke fx tag", () => {
    const text = "Comment: 0,0:02:24.88,0:02:29.58,Romaji,,0,0,0,karaoke,{\\-hidamari\\kf17}i{\\-hidamari\\kf22}tsu{\\-hidamari\\kf23}ma{\\-hidamari\\kf24}de{\\-hidamari\\kf19}mo {\\-hidamari\\kf19}i{\\-hidamari\\kf26}tsu{\\-hidamari\\kf21}ma{\\-hidamari\\kf21}de{\\-hidamari\\kf21}mo {\\-hidamari\\kf23}ma{\\-hidamari\\kf19}mo{\\-hidamari\\kf25}t{\\-hidamari\\kf18}te{\\-hidamari\\kf24}yu{\\-hidamari\\kf148}ku";
    const items = asu.parseContent(text);
    expect(items).not.toBeNull();
    if (items == null) {
        throw "null items";
    }

    expect(asu.contentsToString(items)).toEqual(text);
});

test("parse tags with bad args", () => {
    const texts: string[] = [
        "{\\fsCuarentaYDos}",
        "{\\move(!$scenter!,0,0,0,0,0)}",
        "{\\move(0,!$smiddle!,0,0,0,0)}",
        "{\\move(0,0,!$scenter!,0,0,0)}",
        "{\\move(0,0,0,!$smiddle!,0,0)}",
        "{\\move(0,0,0,0,!$t1!,)}",
        "{\\move(0,0,0,0,0,!$t2!)}",
        "{\\move(!$scenter!,!$smiddle!,!$scenter!,!$smiddle!,!$t1!,!$t2!)}",
        "{\\move(!$scenter!,0,0,0)}",
        "{\\move(0,!$smiddle!,0,0)}",
        "{\\move(0,0,!$scenter!,0)}",
        "{\\move(0,0,0,!$smiddle!)}",
        "{\\move(!$scenter!,!$smiddle!,!$scenter!,!$smiddle!)}",
    ];

    for (const text of texts) {
        const items = asu.parseContent(text);
        expect(items).not.toBeNull();
        if (items == null) {
            throw `null items for:\n${text}`;
        }

        expect(asu.contentsToString(items)).toEqual(text);

        const fx = items.find(x => x.name == "effect");
        if (fx?.name != "effect") {
            throw `null fx for:\n${text}`;
        }

        expect(fx.tags[0].name).toEqual(asu.TagName.unknown);
    }
});

// others
test("parse result equals toString()", () => {
    const text = "{\\be5\\pos(0.5,-28)}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const result = asu.parseContent(text);
    expect(asu.contentsToString(result)).toEqual(text);
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

test("itemsToTags equals tagsToItems", () => {
    const text = "TEXTO";
    const originalItems = asu.parseContent(text);
    const tags = asu.itemsToTags(originalItems);
    expect(tags).toEqual([]);

    const newItems = asu.tagsToItems(tags);
    expect(newItems).toEqual([
        {
            name: "effect",
            tags: [],
        },
    ]);
});
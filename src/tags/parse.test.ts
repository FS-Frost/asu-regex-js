import { expect, test } from "bun:test";
import * as asu from "../asu";

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

test("tag to string", () => {
    type Case = {
        tag: asu.Tags,
        extectedText: string,
    };

    const cases: Case[] = [
        {
            tag: {
                name: asu.TagName.fs,
                value: 12,
            } satisfies asu.TagFs,
            extectedText: "\\fs12",
        },
        {
            tag: {
                name: asu.TagName.move,
                x1: 1,
                y1: 2,
                x2: 3,
                y2: 4,
                t1: 10,
                t2: 20
            } satisfies asu.TagMove,
            extectedText: "\\move(1,2,3,4,10,20)",
        },
    ];

    for (const testCase of cases) {
        const actualText = asu.tagToString(testCase.tag);
        expect(actualText).toEqual(testCase.extectedText);
    }
});
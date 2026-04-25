import { expect, test, describe } from "bun:test";
import { optimizeTags } from "./optimize";
import { TagName, Tags } from "./types";

describe("optimizeTags", () => {
    test("should return empty array for empty input", () => {
        expect(optimizeTags([])).toEqual([]);
    });

    test("should remove redundant overridable tags", () => {
        const tags: Tags[] = [
            { name: TagName.b, value: 1 },
            { name: TagName.fs, value: 20 },
            { name: TagName.b, value: 0 },
        ];
        const expected: Tags[] = [
            { name: TagName.fs, value: 20 },
            { name: TagName.b, value: 0 },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });

    test("should handle multiple redundant tags", () => {
        const tags: Tags[] = [
            { name: TagName.color, blue: 0, green: 0, red: 255 },
            { name: TagName.color, blue: 255, green: 0, red: 0 },
            { name: TagName.fs, value: 30 },
            { name: TagName.fs, value: 40 },
        ];
        const expected: Tags[] = [
            { name: TagName.color, blue: 255, green: 0, red: 0 },
            { name: TagName.fs, value: 40 },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });

    test("should handle \\r by ignoring previous tags", () => {
        const tags: Tags[] = [
            { name: TagName.b, value: 1 },
            { name: TagName.r, style: "Default" },
            { name: TagName.i, value: 1 },
        ];
        const expected: Tags[] = [
            { name: TagName.r, style: "Default" },
            { name: TagName.i, value: 1 },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });

    test("should keep the last \\r if multiple exist", () => {
        const tags: Tags[] = [
            { name: TagName.r, style: "Style1" },
            { name: TagName.b, value: 1 },
            { name: TagName.r, style: "Style2" },
        ];
        const expected: Tags[] = [
            { name: TagName.r, style: "Style2" },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });

    test("should optimize tags inside \\t recursively", () => {
        const tags: Tags[] = [
            {
                name: TagName.t,
                t1: null,
                t2: null,
                accel: null,
                tags: [
                    { name: TagName.fs, value: 20 },
                    { name: TagName.fs, value: 40 },
                ],
            },
        ];
        const expected: Tags[] = [
            {
                name: TagName.t,
                t1: null,
                t2: null,
                accel: null,
                tags: [{ name: TagName.fs, value: 40 }],
            },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });

    test("should keep non-overridable tags like karaoke", () => {
        const tags: Tags[] = [
            { name: TagName.kLowerCase, value: 10 },
            { name: TagName.kLowerCase, value: 20 },
        ];

        expect(optimizeTags(tags)).toEqual(tags);
    });

    test("should maintain order of last occurrences", () => {
        const tags: Tags[] = [
            { name: TagName.b, value: 1 },
            { name: TagName.i, value: 1 },
            { name: TagName.fs, value: 20 },
            { name: TagName.b, value: 0 },
        ];
        const expected: Tags[] = [
            { name: TagName.i, value: 1 },
            { name: TagName.fs, value: 20 },
            { name: TagName.b, value: 0 },
        ];
        expect(optimizeTags(tags)).toEqual(expected);
    });
});

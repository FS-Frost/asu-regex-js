import { expect, test, describe } from "bun:test";
import { parseTags } from "./parse";
import { TagName, TagClipRect, TagClipVector, TagIclipRect, TagIclipVector } from "./types";
import { tagToString } from "../content/stringify";

describe("clip and iclip tags", () => {
    describe("parsing", () => {
        test("should parse rectangular clip", () => {
            const tags = parseTags("\\clip(10,20,30,40)", []);
            expect(tags[0]).toEqual({
                name: TagName.clip,
                type: "rect",
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
            } as TagClipRect);
        });

        test("should parse vectorial clip without scale", () => {
            const tags = parseTags("\\clip(m 0 0 l 10 10)", []);
            expect(tags[0]).toEqual({
                name: TagName.clip,
                type: "vector",
                scale: null,
                commands: "m 0 0 l 10 10",
            } as TagClipVector);
        });

        test("should parse vectorial clip with scale", () => {
            const tags = parseTags("\\clip(1,m 0 0 l 10 10)", []);
            expect(tags[0]).toEqual({
                name: TagName.clip,
                type: "vector",
                scale: 1,
                commands: "m 0 0 l 10 10",
            } as TagClipVector);
        });

        test("should parse rectangular iclip", () => {
            const tags = parseTags("\\iclip(10,20,30,40)", []);
            expect(tags[0]).toEqual({
                name: TagName.iclip,
                type: "rect",
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
            } as TagIclipRect);
        });

        test("should parse vectorial iclip without scale", () => {
            const tags = parseTags("\\iclip(m 0 0 l 10 10)", []);
            expect(tags[0]).toEqual({
                name: TagName.iclip,
                type: "vector",
                scale: null,
                commands: "m 0 0 l 10 10",
            } as TagIclipVector);
        });

        test("should parse vectorial iclip with scale", () => {
            const tags = parseTags("\\iclip(2,m 0 0 l 10 10)", []);
            expect(tags[0]).toEqual({
                name: TagName.iclip,
                type: "vector",
                scale: 2,
                commands: "m 0 0 l 10 10",
            } as TagIclipVector);
        });
    });

    describe("stringification", () => {
        test("should stringify rectangular clip", () => {
            const tag: TagClipRect = {
                name: TagName.clip,
                type: "rect",
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
            };
            expect(tagToString(tag)).toBe("\\clip(10,20,30,40)");
        });

        test("should stringify vectorial clip without scale", () => {
            const tag: TagClipVector = {
                name: TagName.clip,
                type: "vector",
                scale: null,
                commands: "m 0 0 l 10 10",
            };
            expect(tagToString(tag)).toBe("\\clip(m 0 0 l 10 10)");
        });

        test("should stringify vectorial clip with scale", () => {
            const tag: TagClipVector = {
                name: TagName.clip,
                type: "vector",
                scale: 1,
                commands: "m 0 0 l 10 10",
            };
            expect(tagToString(tag)).toBe("\\clip(1,m 0 0 l 10 10)");
        });
    });
});

import { expect, test, describe } from "bun:test";
import { contentEffectToString, contentsToString, tagToString } from "./stringify";
import { TagName } from "../tags/types";
import { ContentEffect, ContentItem } from "./types";

describe("stringify content", () => {
    describe("contentEffectToString", () => {
        test("should format \\t with t1, t2, accel", () => {
            const effect: ContentEffect = {
                name: "effect",
                tags: [{
                    name: TagName.t,
                    t1: 100,
                    t2: 500,
                    accel: 1.5,
                    tags: [{ name: TagName.fad, in: 10, out: 20 }]
                }]
            };
            expect(contentEffectToString(effect)).toBe("\\t(100,500,1.5,\\fad(10,20))");
        });

        test("should format \\t with t1, t2", () => {
            const effect: ContentEffect = {
                name: "effect",
                tags: [{
                    name: TagName.t,
                    t1: 100,
                    t2: 500,
                    accel: null,
                    tags: [{ name: TagName.fad, in: 10, out: 20 }]
                }]
            };
            expect(contentEffectToString(effect)).toBe("\\t(100,500,\\fad(10,20))");
        });

        test("should format \\t with accel", () => {
            const effect: ContentEffect = {
                name: "effect",
                tags: [{
                    name: TagName.t,
                    t1: null,
                    t2: null,
                    accel: 1.5,
                    tags: [{ name: TagName.fad, in: 10, out: 20 }]
                }]
            };
            expect(contentEffectToString(effect)).toBe("\\t(1.5,\\fad(10,20))");
        });

        test("should format \\t with no params", () => {
            const effect: ContentEffect = {
                name: "effect",
                tags: [{
                    name: TagName.t,
                    t1: null,
                    t2: null,
                    accel: null,
                    tags: [{ name: TagName.fad, in: 10, out: 20 }]
                }]
            };
            expect(contentEffectToString(effect)).toBe("\\t(\\fad(10,20))");
        });

        test("should format \\pos and \\org", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.pos, x: 10, y: 20 }] })).toBe("\\pos(10,20)");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.org, x: 30, y: 40 }] })).toBe("\\org(30,40)");
        });

        test("should format \\move", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.move, x1: 10, y1: 20, x2: 30, y2: 40, t1: null, t2: null }] })).toBe("\\move(10,20,30,40)");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.move, x1: 10, y1: 20, x2: 30, y2: 40, t1: 100, t2: 200 }] })).toBe("\\move(10,20,30,40,100,200)");
        });

        test("should format \\clip and \\iclip", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.clip, type: "vector", commands: "m 0 0 l 10 10", scale: null }] })).toBe("\\clip(m 0 0 l 10 10)");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.iclip, type: "vector", commands: "m 0 0 l 10 10", scale: null }] })).toBe("\\iclip(m 0 0 l 10 10)");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.clip, type: "rect", x1: 10, y1: 20, x2: 30, y2: 40 }] })).toBe("\\clip(10,20,30,40)");
        });

        test("should format \\fad", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.fad, in: 100, out: 200 }] })).toBe("\\fad(100,200)");
        });

        test("should format \\fade", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.fade, alpha1: 255, alpha2: 128, alpha3: 0, t1: 10, t2: 20, t3: 30, t4: 40 }] })).toBe("\\fade(255,128,0,10,20,30,40)");
        });

        test("should format \\fe", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.fe, encodingId: 1 }] })).toBe("\\fe1");
        });

        test("should format \\fn", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.fn, font: "Arial" }] })).toBe("\\fnArial");
        });

        test("should format \\r", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.r, style: "Default" }] })).toBe("\\rDefault");
        });

        test("should format colors", () => {
            // Blue = 255, Green = 128, Red = 64
            // numberToHex: 255 -> FF, 128 -> 80, 64 -> 40
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.color, blue: 255, green: 128, red: 64 }] })).toBe("\\c&HFF8040&");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.color1, blue: 0, green: 0, red: 0 }] })).toBe("\\1c&H000000&");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.color2, blue: 255, green: 255, red: 255 }] })).toBe("\\2c&HFFFFFF&");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.color3, blue: 0, green: 255, red: 0 }] })).toBe("\\3c&H00FF00&");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.color4, blue: 0, green: 0, red: 255 }] })).toBe("\\4c&H0000FF&");
        });

        test("should format text and unknown tags", () => {
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.text, value: "hello" }] })).toBe("hello");
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.unknown, value: "world" }] })).toBe("world");
        });

        test("should format default tags", () => {
            // Used for simpler tags like \b1, \i1, \blur2
            // Since default casts to specific value formats
            expect(contentEffectToString({ name: "effect", tags: [{ name: TagName.b, value: 1 }] })).toBe("\\b1");
        });
    });

    describe("tagToString", () => {
        test("should wrap single tag correctly", () => {
            expect(tagToString({ name: TagName.fad, in: 10, out: 20 })).toBe("\\fad(10,20)");
        });
    });

    describe("contentsToString", () => {
        test("should output text and formatted effects", () => {
            const items: ContentItem[] = [
                {
                    name: "effect",
                    tags: [{ name: TagName.fad, in: 100, out: 200 }]
                },
                {
                    name: "text",
                    value: "Hello, World!"
                },
                {
                    name: "effect",
                    tags: [{ name: TagName.pos, x: 10, y: 20 }]
                }
            ];

            expect(contentsToString(items)).toBe("{\\fad(100,200)}Hello, World!{\\pos(10,20)}");
        });
    });
});

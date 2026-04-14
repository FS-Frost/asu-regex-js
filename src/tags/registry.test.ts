import { describe, expect, test } from "bun:test";
import { tagParsers } from "./registry";
import { TagName } from "./types";

describe("tagParsers", () => {
    test("should have a parser for move that parses correctly", () => {
        const parser = tagParsers.find((p) => p.regex.source.includes("move"));
        expect(parser).toBeDefined();

        const match = parser?.regex.exec("\\move(10,20,30,40)");
        expect(match).not.toBeNull();
        if (match && match.groups) {
            const result = parser?.parse(match.groups);
            expect(result).toEqual({
                name: TagName.move,
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
                t1: null,
                t2: null,
            });
        }
    });

    test("should have a parser for move with time that parses correctly", () => {
        const parser = tagParsers.find((p) => p.regex.source.includes("move"));
        const match = parser?.regex.exec("\\move(10,20,30,40,100,500)");
        expect(match).not.toBeNull();
        if (match && match.groups) {
            const result = parser?.parse(match.groups);
            expect(result).toEqual({
                name: TagName.move,
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
                t1: 100,
                t2: 500,
            });
        }
    });

    test("should have a parser for pos", () => {
        const parser = tagParsers.find((p) => p.regex.source.includes("pos"));
        expect(parser).toBeDefined();

        const match = parser?.regex.exec("\\pos(150,250)");
        expect(match).not.toBeNull();
        if (match && match.groups) {
            const result = parser?.parse(match.groups);
            expect(result).toEqual({
                name: TagName.pos,
                x: 150,
                y: 250,
            });
        }
    });

    test("should have a parser for color tags", () => {
        // test \c parser
        // We know that `\\c` doesn't have a number, while `\\1c` does
        const parser = tagParsers.find((p) => p.parse({}).name === TagName.color);
        expect(parser).toBeDefined();

        // Blue = 255, Green = 0, Red = 0
        const match = parser?.regex.exec("\\c&HFF0000&");
        expect(match).not.toBeNull();

        if (match && match.groups) {
            const result = parser?.parse(match.groups);
            expect(result).toEqual({
                name: TagName.color,
                blue: 255,
                green: 0,
                red: 0,
            });
        }
    });
});

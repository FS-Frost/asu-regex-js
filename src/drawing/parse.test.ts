import { expect, test, describe } from "bun:test";
import { parseDrawingCommands } from "./parse";
import { drawingCommandsToString } from "./stringify";
import { DrawingCommandName, DrawingCommandMove, DrawingCommandLine, DrawingCommandBezier, DrawingCommandSpline, DrawingCommandCloseSpline } from "./types";

describe("Drawing commands", () => {
    describe("parsing", () => {
        test("should parse move command", () => {
            const result = parseDrawingCommands("m 10 20");
            expect(result).toEqual([{
                name: DrawingCommandName.move,
                x: 10,
                y: 20
            } satisfies DrawingCommandMove]);
        });

        test("should parse line command", () => {
            const result = parseDrawingCommands("l 10 20");
            expect(result).toEqual([{
                name: DrawingCommandName.line,
                x: 10,
                y: 20
            } satisfies DrawingCommandLine]);
        });

        test("should parse implicit line command", () => {
            const result = parseDrawingCommands("10 20");
            expect(result).toEqual([{
                name: DrawingCommandName.line,
                x: 10,
                y: 20
            } satisfies DrawingCommandLine]);
        });

        test("should parse bezier command", () => {
            const result = parseDrawingCommands("b 10 20 30 40 50 60");
            expect(result).toEqual([{
                name: DrawingCommandName.bezier,
                x1: 10,
                y1: 20,
                x2: 30,
                y2: 40,
                x3: 50,
                y3: 60
            } satisfies DrawingCommandBezier]);
        });

        test("should parse spline command with variable points", () => {
            const result = parseDrawingCommands("s 10 20 30 40 50 60");
            expect(result).toEqual([{
                name: DrawingCommandName.spline,
                points: [
                    { x: 10, y: 20 },
                    { x: 30, y: 40 },
                    { x: 50, y: 60 }
                ]
            } satisfies DrawingCommandSpline]);
        });

        test("should parse multiple commands", () => {
            const result = parseDrawingCommands("m 0 0 l 10 10 b 10 20 30 40 50 60 c");
            expect(result).toHaveLength(4);
            expect(result[0].name).toBe(DrawingCommandName.move);
            expect(result[1].name).toBe(DrawingCommandName.line);
            expect(result[2].name).toBe(DrawingCommandName.bezier);
            expect(result[3].name).toBe(DrawingCommandName.closeSpline);
        });

        test("should handle extra whitespaces", () => {
            const result = parseDrawingCommands("  m   0   0   l 10  10  ");
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe(DrawingCommandName.move);
            expect(result[1].name).toBe(DrawingCommandName.line);
        });
    });

    describe("stringification", () => {
        test("should convert commands back to string", () => {
            const commands = [
                { name: DrawingCommandName.move, x: 0, y: 0 } satisfies DrawingCommandMove,
                { name: DrawingCommandName.line, x: 10, y: 10 } satisfies DrawingCommandLine,
                { name: DrawingCommandName.bezier, x1: 10, y1: 20, x2: 30, y2: 40, x3: 50, y3: 60 } satisfies DrawingCommandBezier,
                { name: DrawingCommandName.spline, points: [{ x: 10, y: 20 }, { x: 30, y: 40 }] } satisfies DrawingCommandSpline,
                { name: DrawingCommandName.closeSpline } satisfies DrawingCommandCloseSpline
            ];

            const result = drawingCommandsToString(commands);
            expect(result).toBe("m 0 0 l 10 10 b 10 20 30 40 50 60 s 10 20 30 40 c");
        });
    });
});

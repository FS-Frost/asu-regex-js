import { describe, expect, test } from "bun:test";
import { parseASSFile, generateDefaultASSFile } from "./asu";

describe("asu", () => {
    test("generateDefaultASSFile creates a valid default object", () => {
        const file = generateDefaultASSFile();
        expect(file).toBeDefined();
        expect(file.scriptInfo).toBeDefined();
        expect(file.events.lines.length).toBe(1);
    });

    test("parseASSFile parses basic ASS file", () => {
        const input = `[Script Info]
Title: Default Aegisub file
ScriptType: v4.00+

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,Hello World`;

        const file = parseASSFile(input);
        expect(file).toBeDefined();
        expect(file?.scriptInfo.properties.get("Title")).toBe("Default Aegisub file");
        expect(file?.styles.styles.length).toBe(1);
        expect(file?.styles.styles[0].name).toBe("Default");
        expect(file?.events.lines.length).toBe(1);
        expect(file?.events.lines[0].content).toBe("Hello World");
    });
});

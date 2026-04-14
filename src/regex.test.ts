import { describe, expect, test } from "bun:test";
import { regexLine, regexColorBGR, regexColor, regexPos, regexFad } from "./regex";

describe("regex", () => {
    test("regexLine parses Dialogue line correctly", () => {
        const input = "Dialogue: 0,0:00:00.00,0:00:05.00,Default,actor,1,2,3,fx,TEXT";
        const match = regexLine.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.type).toBe("Dialogue");
        expect(groups?.layer).toBe("0");
        expect(groups?.start).toBe("0:00:00.00");
        expect(groups?.end).toBe("0:00:05.00");
        expect(groups?.style).toBe("Default");
        expect(groups?.actor).toBe("actor");
        expect(groups?.marginLeft).toBe("1");
        expect(groups?.marginRight).toBe("2");
        expect(groups?.marginVertical).toBe("3");
        expect(groups?.effect).toBe("fx");
        expect(groups?.content).toBe("TEXT");
    });

    test("regexLine parses Comment line correctly", () => {
        const input = "Comment: 1,0:01:00.00,0:02:05.00,Alt,,0,0,0,,{\\pos(182,421)}LINEA 1";
        const match = regexLine.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.type).toBe("Comment");
        expect(groups?.layer).toBe("1");
        expect(groups?.start).toBe("0:01:00.00");
        expect(groups?.end).toBe("0:02:05.00");
        expect(groups?.style).toBe("Alt");
        expect(groups?.actor).toBe("");
        expect(groups?.marginLeft).toBe("0");
        expect(groups?.marginRight).toBe("0");
        expect(groups?.marginVertical).toBe("0");
        expect(groups?.effect).toBe("");
        expect(groups?.content).toBe("{\\pos(182,421)}LINEA 1");
    });

    test("regexColorBGR parses valid hex colors", () => {
        const input = "&HFF00A2&";
        const match = regexColorBGR.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.color_bgr_blue).toBe("FF");
        expect(groups?.color_bgr_green).toBe("00");
        expect(groups?.color_bgr_red).toBe("A2");
    });

    test("regexColor parses valid color tag", () => {
        const input = "\\c&HFF00A2&";
        const match = regexColor.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.color_bgr_blue).toBe("FF");
        expect(groups?.color_bgr_green).toBe("00");
        expect(groups?.color_bgr_red).toBe("A2");
    });

    test("regexPos parses pos tag", () => {
        const input = "\\pos(150.5,200)";
        const match = regexPos.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.pos_x).toBe("150.5");
        expect(groups?.pos_y).toBe("200");
    });

    test("regexFad parses fad tag", () => {
        const input = "\\fad(100,500)";
        const match = regexFad.exec(input);
        expect(match).not.toBeNull();
        const groups = match?.groups;
        expect(groups?.in).toBe("100");
        expect(groups?.out).toBe("500");
    });
});

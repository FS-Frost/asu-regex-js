import { describe, expect, test } from "bun:test";
import { generateDefaultSectionScriptInfo, sectionScriptInfoToString } from "./sectionScriptInfo";

describe("sectionScriptInfo", () => {
    test("generateDefaultSectionScriptInfo generates default info", () => {
        const info = generateDefaultSectionScriptInfo();
        expect(info.comments.length).toBe(0);
        expect(info.properties.get("Title")).toBe("Default Aegisub file");
        expect(info.properties.get("ScriptType")).toBe("v4.00+");
        expect(info.properties.get("WrapStyle")).toBe("0");
        expect(info.properties.get("ScaledBorderAndShadow")).toBe("yes");
        expect(info.properties.get("YCbCr Matrix")).toBe("None");
    });

    test("sectionScriptInfoToString serializes to string", () => {
        const info = generateDefaultSectionScriptInfo();
        const str = sectionScriptInfoToString(info);
        expect(str).toContain("[Script Info]");
        expect(str).toContain("Title: Default Aegisub file");
        expect(str).toContain("ScriptType: v4.00+");
        expect(str).toContain("WrapStyle: 0");
    });
});

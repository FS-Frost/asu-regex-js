import { expect, test } from "bun:test";
import { parseASSFile } from "./assFile";
import { Alignments } from "./alignment";
import { Encodings } from "./encoding";

test("assFile: parse ass file", async () => {
    const text = await Bun.file("test/parseFile.ass").text();
    const assFile = parseASSFile(text);
    expect(assFile).not.toBeNull();
    if (assFile == null) {
        throw "null ass file";
    }

    // await Bun.write("temp/file.json", JSON.stringify(assFile));
    // await Bun.write("temp/file.ass", ASSFileToString(assFile));

    expect(assFile.scriptInfo.comments.length).toEqual(2);
    expect(assFile.scriptInfo.properties.size).toEqual(14);

    expect(assFile.aegisubProjectGarbage.comments.length).toEqual(0);
    expect(assFile.aegisubProjectGarbage.properties.size).toEqual(6);

    expect(assFile.styles.styles.length).toEqual(1);

    expect(assFile.styles.styles[0]).toEqual({
        name: "Default",
        fontName: "Arial",
        fontSize: 20,
        primaryAlpha: "00",
        primaryColor: "FFFFFF",
        secondaryAlpha: "00",
        secondaryColor: "0000FF",
        outlineAlpha: "00",
        outlineColor: "000000",
        backAlpha: "00",
        backColor: "000000",
        bold: 0,
        italic: 0,
        underline: 0,
        strikeOut: 0,
        scaleX: 100,
        scaleY: 100,
        spacing: 0,
        angle: 0,
        borderStyle: 1,
        outline: 2,
        shadow: 2,
        alignment: Alignments.DOWN_CENTER,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
        encoding: Encodings.DEFAULT,
    });

    expect(assFile.fonts.files.length).toEqual(3);
    expect(assFile.graphics.files.length).toEqual(2);
    expect(assFile.events.lines.length).toEqual(5);
    expect(assFile.extraData.data.length).toEqual(1);
});

test("assFile: parse karaoke file", async () => {
    const text = await Bun.file("test/karaoke.ass").text();
    const assFile = parseASSFile(text);
    expect(assFile).not.toBeNull();
    if (assFile == null) {
        throw "null ass file";
    }

    expect(assFile.scriptInfo.comments.length).toEqual(3);
    expect(assFile.scriptInfo.properties.size).toEqual(11);

    expect(assFile.aegisubProjectGarbage.comments.length).toEqual(0);
    expect(assFile.aegisubProjectGarbage.properties.size).toEqual(0);

    expect(assFile.styles.styles.length).toEqual(4);
    expect(assFile.fonts.files.length).toEqual(0);
    expect(assFile.graphics.files.length).toEqual(0);
    expect(assFile.events.lines.length).toEqual(62);
    expect(assFile.extraData.data.length).toEqual(0);
});

test("assFile: parse mix file", async () => {
    const text = await Bun.file("test/mix.ass").text();
    const assFile = parseASSFile(text);
    expect(assFile).not.toBeNull();
    if (assFile == null) {
        throw "null ass file";
    }

    expect(assFile.scriptInfo.comments.length).toEqual(3);
    expect(assFile.scriptInfo.properties.size).toEqual(15);

    expect(assFile.aegisubProjectGarbage.comments.length).toEqual(0);
    expect(assFile.aegisubProjectGarbage.properties.size).toEqual(0);

    expect(assFile.styles.styles.length).toEqual(7);
    expect(assFile.fonts.files.length).toEqual(0);
    expect(assFile.graphics.files.length).toEqual(0);
    expect(assFile.events.lines.length).toEqual(88);
    expect(assFile.extraData.data.length).toEqual(0);
});

import * as asu from "../asu";
test("assFile: ASSFileToString and full parse", () => {
    const defaultAss = asu.generateDefaultASSFile();
    defaultAss.aegisubProjectGarbage.comments.push("Project garbage comment");
    defaultAss.aegisubProjectGarbage.properties.set("Automation Scripts", "1");
    defaultAss.scriptInfo.comments.push("Script info comment");
    defaultAss.fonts.files.push({ name: "font.ttf", data: ["fontdata1", "fontdata2"] });
    defaultAss.fonts.files.push({ name: "font2.ttf", data: ["fontdata3"] });
    defaultAss.graphics.files.push({ name: "graphic.png", data: ["graphicdata1"] });
    defaultAss.graphics.files.push({ name: "graphic2.png", data: ["graphicdata2"] });
    defaultAss.extraData.data.push("extradata1");

    const text = asu.ASSFileToString(defaultAss);
    expect(text).toContain("Script info comment");
    expect(text).toContain("Project garbage comment");
    expect(text).toContain("font.ttf");

    const parsed = asu.parseASSFile(text);
    expect(parsed).not.toBeNull();
    expect(parsed?.aegisubProjectGarbage.comments).toContain("Project garbage comment");
    expect(parsed?.scriptInfo.comments).toContain("Script info comment");
    expect(parsed?.fonts.files[0].name).toBe("font.ttf");
    expect(parsed?.fonts.files[0].data).toContain("fontdata1");
    expect(parsed?.graphics.files[0].name).toBe("graphic.png");
    expect(parsed?.extraData.data).toContain("extradata1");
});

test("assFile: parsing errors", () => {
    const invalidStyle = "[V4+ Styles]\nStyle: InvalidStyle";
    expect(asu.parseASSFile(invalidStyle)).toBeNull();

    const invalidEvent = "[Events]\nInvalidEvent";
    expect(asu.parseASSFile(invalidEvent)).toBeNull();

    const invalidScriptInfo = "[Script Info]\nInvalidScriptInfo";
    expect(asu.parseASSFile(invalidScriptInfo)).toBeNull();

    const invalidGarbage = "[Aegisub Project Garbage]\nInvalidGarbage";
    expect(asu.parseASSFile(invalidGarbage)).toBeNull();

    expect(asu.parseASSFile("[Unknown Section]\nLine")).not.toBeNull();

    const parsedStyles = asu.parseStyle("Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,0,22,10,10,10,1");
    expect(parsedStyles[1].length).toBeGreaterThan(0);

    const parsedStylesInvalidEncoding = asu.parseStyle("Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,999");
    expect(parsedStylesInvalidEncoding[1].length).toBeGreaterThan(0);

    const invalidFonts = "[Fonts]\nSome garbage\nfontname: A\nsome data";
    const fontParse = asu.parseASSFile(invalidFonts);
    expect(fontParse).not.toBeNull();

    const invalidGraphics = "[Graphics]\nSome garbage\nfilename: A\nsome data";
    const graphicsParse = asu.parseASSFile(invalidGraphics);
    expect(graphicsParse).not.toBeNull();

    const invalidExtraData = "[Aegisub Extradata]\nSome garbage\nData: A";
    const extraDataParse = asu.parseASSFile(invalidExtraData);
    expect(extraDataParse).not.toBeNull();
    expect(extraDataParse?.extraData.data.length).toBe(1);
});

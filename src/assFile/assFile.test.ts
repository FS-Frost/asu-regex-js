import { expect, test } from "bun:test";
import fs from "fs/promises";
import { parseASSFile } from "./assFile";

test("assFile: parse ass file", async () => {
    const text = await fs.readFile("test/parseFile.ass", {
        encoding: "utf-8",
    });

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
    expect(assFile.fonts.files.length).toEqual(3);
    expect(assFile.graphics.files.length).toEqual(2);
    expect(assFile.events.lines.length).toEqual(5);
    expect(assFile.extraData.data.length).toEqual(1);
});

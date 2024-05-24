import { expect, test } from "bun:test";
import { isRomajiWord, splitSyllabes } from "./karaoke";
import { generateDefaultLine, lineToString } from "./asu";

test("karaoke: word is romaji", () => {
    const text = "tairyoku";
    const result = isRomajiWord(text);
    expect(result).toBeTrue();
});

test("karaoke: word is not romaji", () => {
    const text = "ueh";
    const result = isRomajiWord(text);
    expect(result).toBeFalse();
});

test("karaoke: split syllabes evenly", () => {
    const expectedText = "Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,{\\kf100}ko{\\kf100}re {\\kf100}ka{\\kf100}ra {\\kf100}da!";
    const line = generateDefaultLine();
    line.content = "kore kara da!";
    splitSyllabes(line);
    expect(lineToString(line)).toEqual(expectedText);
});

test("karaoke: split syllabes unevenly", () => {
    const expectedText = "Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,{\\kf71}ko{\\kf71}re {\\kf71}ka{\\kf71}ra {\\kf71}da! {\\kf71}t{\\kf74}te";
    const line = generateDefaultLine();
    line.content = "kore kara da! tte";
    splitSyllabes(line);
    expect(lineToString(line)).toEqual(expectedText);
});

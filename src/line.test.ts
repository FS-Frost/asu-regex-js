import { expect, test } from "bun:test";
import * as asu from "./asu";

// line
test("parse line", () => {
    const text = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\pos(182,421)}LINE 1";
    const line = asu.parseLine(text);
    expect(line).not.toBeNull();
    if (line == null) {
        throw "null line";
    }

    expect(asu.lineToString(line)).toEqual(text);
});

test("parse invalid line", () => {
    const text = "not a line";
    const line = asu.parseLine(text);
    expect(line).toBeNull();
});

test("parse invalid line (bad start time)", () => {
    const text = "Dialogue: 0,,0:00:05.00,Default,,0,0,0,,text";
    const line = asu.parseLine(text);
    expect(line).toBeNull();
});

test("parse invalid line (bad end time)", () => {
    const text = "Dialogue: 0,0:00:05.00,,Default,,0,0,0,,text";
    const line = asu.parseLine(text);
    expect(line).toBeNull();
});

test("line to string", () => {
    const text = "Dialogue: 0,0:00:00.00,0:00:00.00,Default,a,0,0,0,b,{\\pos(182.123489123918322193,421.847593450834985)\\be2.1234}LINE 1";
    const expectedText = "Dialogue: 0,0:00:00.00,0:00:00.00,Default,a,0,0,0,b,{\\pos(182.123,421.847)\\be2.123}LINE 1";
    const line = asu.parseLine(text);
    expect(line).not.toBeNull();
    if (line == null) {
        throw "null line";
    }

    const items = asu.parseContent(line.content);
    asu.truncateNumberTags(items, 3);
    line.content = asu.contentsToString(items);
    expect(asu.lineToString(line)).toEqual(expectedText);
});

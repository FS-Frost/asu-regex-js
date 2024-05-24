import { expect, test } from "bun:test";
import { Time, parseTime, subtractTimes, sumTimes, timeToSeconds, timeToString } from "./time";

test("time: parse time", () => {
    const text = "1:23:45.67";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(text);
});

test("time: adjust hours overplus", () => {
    const text = "10:23:45.67";
    const expectedText = "9:59:59.99";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(expectedText);
});

test("time: adjust minutes overplus", () => {
    const text = "1:62:45.67";
    const expectedText = "2:02:45.67";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(expectedText);
});

test("time: adjust seconds overplus", () => {
    const text = "1:52:65.67";
    const expectedText = "1:53:05.67";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(expectedText);
});

test("time: adjust overplus chain", () => {
    const text = "1:59:65.67";
    const expectedText = "2:00:05.67";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(expectedText);
});

test("time: adjust overplus chain overflow", () => {
    const text = "9:59:65.67";
    const expectedText = "9:59:59.99";
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToString(time)).toEqual(expectedText);
});

test("time: time to seconds", () => {
    const text = "1:01:12.02";
    const hoursInSeconds = 3600;
    const minutesInSeconds = 60;
    const expectedSeconds = hoursInSeconds + minutesInSeconds + 12.02;
    const time = parseTime(text);
    expect(time).not.toBeNull();
    if (time == null) {
        throw "null time";
    }

    expect(timeToSeconds(time)).toEqual(expectedSeconds);
});

test("time: sum times", () => {
    const t1: Time = {
        hours: 1,
        minutes: 24,
        seconds: 36,
    };

    const t2: Time = {
        hours: 4,
        minutes: 57,
        seconds: 67.89,
    };

    const t3 = sumTimes(t1, t2);
    const actualText = timeToString(t3);
    const expectedText = "6:22:43.89";

    expect(actualText).toEqual(expectedText);
});

test("time: subtract times", () => {
    const t1: Time = {
        hours: 1,
        minutes: 24,
        seconds: 36,
    };

    const t2: Time = {
        hours: 4,
        minutes: 57,
        seconds: 67.89,
    };

    const t3 = subtractTimes(t2, t1);
    const actualText = timeToString(t3);
    const expectedText = "3:33:31.89";

    expect(actualText).toEqual(expectedText);
});

import { expect, test } from "bun:test";
import { parseColorBGR } from "./color";

test("color: parse valid BGR color with trailing ampersand", () => {
    const color = parseColorBGR("&HFF0000&");
    expect(color).not.toBeNull();
    expect(color?.blue).toEqual(255);
    expect(color?.green).toEqual(0);
    expect(color?.red).toEqual(0);
});

test("color: parse valid BGR color without trailing ampersand", () => {
    const color = parseColorBGR("&H00FF00");
    expect(color).not.toBeNull();
    expect(color?.blue).toEqual(0);
    expect(color?.green).toEqual(255);
    expect(color?.red).toEqual(0);
});

test("color: parse valid BGR color with lower case letters", () => {
    const color = parseColorBGR("&H0000ff&");
    expect(color).not.toBeNull();
    expect(color?.blue).toEqual(0);
    expect(color?.green).toEqual(0);
    expect(color?.red).toEqual(255);
});

test("color: return null for invalid color formats", () => {
    expect(parseColorBGR("FF0000")).toBeNull();
    expect(parseColorBGR("&HFF00")).toBeNull();
    expect(parseColorBGR("invalid")).toBeNull();
});

import { expect, test } from "bun:test";
import { parseStyle, styleToString } from "../asu";

test("style: convert to string", async () => {
    const expectedText = "Style: Asu,Arial,20,&H00000000,&H00000000,&H80FF0015,&H00000000,-1,0,-1,0,100,100,0,0,1,2,2,2,10,10,10,1";
    const [style, error] = parseStyle(expectedText);
    expect(error).toEqual("");
    expect(style).not.toBeUndefined();

    if (style == null) {
        throw "null style";
    }

    const actualText = styleToString(style);
    expect(actualText).toEqual(expectedText);
});

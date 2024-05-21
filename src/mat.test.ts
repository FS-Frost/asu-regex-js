import { expect, test } from "bun:test";
import { hexToNumber, numberToHex } from "./mat";

test.only("math: number to hex from 0 to 255", () => {
    for (let n = 0; n <= 255; n++) {
        const hex = numberToHex(n);
        const n2 = hexToNumber(hex);
        expect(n2).toEqual(n);
    }
});

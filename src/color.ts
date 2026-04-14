import { hexToNumber } from "./math";
import * as regex from "./regex";
import { ColorBGR } from "./tags/types";

export function parseColorBGR(text: string): ColorBGR | null {
    const match = text.match(regex.regexColorBGR);
    if (match == null) {
        return null;
    }

    const groups = match.groups;
    const color: ColorBGR = {
        blue: hexToNumber(groups?.color_bgr_blue ?? ""),
        green: hexToNumber(groups?.color_bgr_green ?? ""),
        red: hexToNumber(groups?.color_bgr_red ?? ""),
    };

    return color;
}

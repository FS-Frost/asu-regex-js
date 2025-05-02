import { hexToNumber, numberToHex, parseColorBGR } from "../asu";
import { Alignment } from "./alignment";
import { Encoding } from "./encoding";

export type Style = {
    name: string;
    fontName: string;
    fontSize: number;
    primaryAlpha: string;
    primaryColor: string;
    secondaryAlpha: string;
    secondaryColor: string;
    outlineAlpha: string;
    outlineColor: string;
    backAlpha: string;
    backColor: string;
    bold: number;
    italic: number;
    underline: number;
    strikeOut: number;
    scaleX: number;
    scaleY: number;
    spacing: number;
    angle: number;
    borderStyle: number;
    outline: number;
    shadow: number;
    alignment: Alignment;
    marginLeft: number;
    marginRight: number;
    marginVertical: number;
    encoding: Encoding;
};

export function mergeColorWithAlpha(threeHexValuesBGR: string, oneHexValueAlpha: string): string {
    let hexAlpha = "00";
    const decimalAlpha = hexToNumber(oneHexValueAlpha);
    if (!Number.isNaN(decimalAlpha)) {
        hexAlpha = oneHexValueAlpha;
    }

    let hexBlue = "00";
    let hexGreen = "00";
    let hexRed = "00";

    const colorPrefix = "&H";
    const color = parseColorBGR(colorPrefix + threeHexValuesBGR);
    if (color != null) {
        hexBlue = numberToHex(color.blue);
        hexGreen = numberToHex(color.green);
        hexRed = numberToHex(color.red);
    }

    const merged = `${colorPrefix}${hexAlpha}${hexBlue}${hexGreen}${hexRed}`;
    return merged;
}

export function styleToString(style: Style): string {
    const mergedPrimaryColor = mergeColorWithAlpha(style.primaryColor, style.primaryAlpha);
    const mergedSecondaryColor = mergeColorWithAlpha(style.secondaryColor, style.secondaryAlpha);
    const mergedOutlineColor = mergeColorWithAlpha(style.outlineColor, style.outlineAlpha);
    const mergedBackColor = mergeColorWithAlpha(style.backColor, style.backAlpha);

    let s = `Style: ${style.name}`;
    s += `,${style.fontName}`;
    s += `,${style.fontSize}`;
    s += `,${mergedPrimaryColor}`;
    s += `,${mergedSecondaryColor}`;
    s += `,${mergedOutlineColor}`;
    s += `,${mergedBackColor}`;
    s += `,${style.bold}`;
    s += `,${style.italic}`;
    s += `,${style.underline}`;
    s += `,${style.strikeOut}`;
    s += `,${style.scaleX}`;
    s += `,${style.scaleY}`;
    s += `,${style.spacing}`;
    s += `,${style.angle}`;
    s += `,${style.borderStyle}`;
    s += `,${style.outline}`;
    s += `,${style.shadow}`;
    s += `,${style.alignment}`;
    s += `,${style.marginLeft}`;
    s += `,${style.marginRight}`;
    s += `,${style.marginVertical}`;
    s += `,${style.encoding}`;
    return s;
}

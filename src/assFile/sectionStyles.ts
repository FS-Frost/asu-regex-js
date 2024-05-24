import { Alignments } from "./alignment";
import { Encodings } from "./encoding";
import { Style, styleToString } from "./style";

export type SectionStyles = {
    format: string;
    styles: Style[];
};

export function newSectionStyles(): SectionStyles {
    return {
        format: "Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        styles: [],
    };
}

export function generateDefaultSectionStyles(): SectionStyles {
    return {
        format: "Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        styles: [
            {
                name: "Default",
                fontName: "Arial",
                fontSize: 20,
                primaryAlpha: "&H00FFFFFF",
                primaryColor: "&H000000FF",
                secondaryAlpha: "&H00000000",
                secondaryColor: "&H00000000",
                outlineAlpha: "",
                outlineColor: "",
                backAlpha: "",
                backColor: "",
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
            },
        ],
    };
}

export function sectionStylesToString(info: SectionStyles): string {
    let s = "[V4+ Styles]";
    s += `\nFormat: ${info.format}`;
    for (const style of info.styles) {
        s += `\n${styleToString(style)}`;
    }

    return s;
}

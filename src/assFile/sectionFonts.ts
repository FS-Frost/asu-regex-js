import { AttachedFont, AttachedFontToString } from "./attachedFont";

export type SectionFonts = {
    files: AttachedFont[];
};

export function newSectionFonts(): SectionFonts {
    return {
        files: [],
    };
}

export function sectionFontsToString(info: SectionFonts): string {
    let s = "[Fonts]\n";
    let i = 0;
    for (const font of info.files) {
        if (i > 0) {
            s += "\n\n";
        }

        s += AttachedFontToString(font);

        i++;
    }

    s += "\n";
    return s;
}

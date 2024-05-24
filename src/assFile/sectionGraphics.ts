import { AttachedGraphic, AttachedGraphicToString } from "./attachedGraphic";

export type SectionGraphics = {
    files: AttachedGraphic[];
};

export function newSectionGraphics(): SectionGraphics {
    return {
        files: [],
    };
}

export function sectionGraphicsToString(info: SectionGraphics): string {
    let s = "[Graphics]\n";
    let i = 0;
    for (const graphic of info.files) {
        if (i > 0) {
            s += "\n\n";
        }

        s += AttachedGraphicToString(graphic);
        i++;
    }

    return s;
}

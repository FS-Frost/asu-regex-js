import { generateDefaultLine, Line, lineToString } from "../asu";

export type SectionEvents = {
    format: string;
    lines: Line[];
};

export function newSectionEvents(): SectionEvents {
    return {
        format: "Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
        lines: [],
    };
}

export function generateDefaultSectionEvents(): SectionEvents {
    return {
        format: "Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
        lines: [
            generateDefaultLine(),
        ],
    };
}

export function sectionEventsToString(info: SectionEvents): string {
    let s = "[Events]";
    s += `\nFormat: ${info.format}`;
    for (const line of info.lines) {
        s += `\n${lineToString(line)}`;
    }

    return s;
}

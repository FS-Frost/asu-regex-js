export const ProjectGarbagePropertyAutomationScripts: string = "Automation Scripts";
export const ProjectGarbagePropertyExportFilters: string = "Export Filters";
export const ProjectGarbagePropertyExportEncoding: string = "Export Encoding";
export const ProjectGarbagePropertyLastStyleStorage: string = "Last Style Storage";
export const ProjectGarbagePropertyAudioFile: string = "Audio File";
export const ProjectGarbagePropertyVideoFile: string = "Video File";
export const ProjectGarbagePropertyTimecodesFile: string = "Timecodes File";
export const ProjectGarbagePropertyKeyframesFile: string = "Keyframes File";
export const ProjectGarbagePropertyVideoARMode: string = "Video AR Mode";
export const ProjectGarbagePropertyVideoARValue: string = "Video AR Value";
export const ProjectGarbagePropertyVideoZoomPercent: string = "Video Zoom Percent";
export const ProjectGarbagePropertyScrollPosition: string = "Scroll Position";
export const ProjectGarbagePropertyActiveLine: string = "Active Line";
export const ProjectGarbagePropertyVideoPosition: string = "Video Position";

export type SectionProjectGarbage = {
    comments: string[];
    properties: Map<string, string>;
};

export function newProjectGarbage(): SectionProjectGarbage {
    return {
        comments: [],
        properties: new Map(),
    };
}

export function sectionProjectGarbageToString(info: SectionProjectGarbage): string {
    let s = "[Aegisub Project Garbage]";

    for (const comment of info.comments) {
        s += `\n; ${comment}`;
    }

    for (const [key, value] of info.properties) {
        s += `\n${key}: ${value}`;
    }

    return s;
}

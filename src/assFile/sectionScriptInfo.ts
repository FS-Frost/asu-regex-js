export const ScriptInfoPropertyTitle: string = "Title";
export const ScriptInfoPropertyScriptType: string = "ScriptType";
export const ScriptInfoPropertyWrapStyle: string = "WrapStyle";
export const ScriptInfoPropertyPlayResX: string = "PlayResX";
export const ScriptInfoPropertyPlayResY: string = "PlayResY";
export const ScriptInfoPropertyScaledBorderAndShadow: string = "ScaledBorderAndShadow";
export const ScriptInfoPropertyYCbCrMatrix: string = "YCbCr Matrix";
export const ScriptInfoPropertyOriginalScript: string = "Original Script";
export const ScriptInfoPropertyOriginalTranslation: string = "Original Translation";
export const ScriptInfoPropertyOriginalEditing: string = "Original Editing";
export const ScriptInfoPropertyOriginalTiming: string = "Original Timing";
export const ScriptInfoPropertySynchPoint: string = "Synch Point";
export const ScriptInfoPropertyScriptUpdatedBy: string = "Script Updated By";
export const ScriptInfoPropertyUpdateDetails: string = "Update Details";

export type SectionScriptInfo = {
    comments: string[];
    properties: Map<string, string>;
};

export function newScriptInfo(): SectionScriptInfo {
    return {
        comments: [],
        properties: new Map(),
    };
}

export function generateDefaultSectionScriptInfo(): SectionScriptInfo {
    return {
        comments: [],
        properties: new Map([
            ["Title", "Default Aegisub file"],
            ["ScriptType", "v4.00+"],
            ["WrapStyle", "0"],
            ["ScaledBorderAndShadow", "yes"],
            ["YCbCr Matrix", "None"],
        ]),
    };
}

export function sectionScriptInfoToString(info: SectionScriptInfo): string {
    let s = "[Script Info]";

    for (const comment of info.comments) {
        s += `\n; ${comment}`;
    }

    for (const [key, value] of info.properties) {
        s += `\n${key}: ${value}`;
    }

    return s;
}

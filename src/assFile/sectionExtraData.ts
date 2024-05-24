export type SectionExtraData = {
    data: string[];
};

export function newSectionExtraData(): SectionExtraData {
    return {
        data: [],
    };
}

export function sectionExtraDataToString(info: SectionExtraData): string {
    let s = "[Aegisub Extradata]";

    for (const datum of info.data) {
        s += `\nData: ${datum}`;
    }

    return s;
}

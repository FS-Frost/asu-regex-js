export type AttachedFont = {
    name: string;
    data: string[];
};

export function AttachedFontToString(file: AttachedFont): string {
    let s = `fontname: ${file.name}`;
    for (const datum of file.data) {
        s += `\n${datum}`;
    }

    return s;
}

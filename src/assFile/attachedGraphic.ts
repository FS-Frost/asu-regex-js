export type AttachedGraphic = {
    name: string;
    data: string[];
};

export function AttachedGraphicToString(file: AttachedGraphic): string {
    let s = `filename: ${file.name}`;
    for (const datum of file.data) {
        s += `\n${datum}`;
    }

    return s;
}

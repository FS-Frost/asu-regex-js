import { parseLine } from "../asu";
import { Alignment } from "./alignment";
import { AttachedFont } from "./attachedFont";
import { AttachedGraphic } from "./attachedGraphic";
import { Encoding } from "./encoding";
import { SectionEvents, newSectionEvents, sectionEventsToString } from "./sectionEvents";
import { SectionExtraData, newSectionExtraData, sectionExtraDataToString } from "./sectionExtraData";
import { SectionFonts, newSectionFonts, sectionFontsToString } from "./sectionFonts";
import { SectionGraphics, newSectionGraphics, sectionGraphicsToString } from "./sectionGraphics";
import { SectionProjectGarbage, newProjectGarbage, sectionProjectGarbageToString } from "./sectionProjectGarbage";
import { SectionScriptInfo, newScriptInfo, sectionScriptInfoToString } from "./sectionScriptInfo";
import { SectionStyles, newSectionStyles, sectionStylesToString } from "./sectionStyles";
import { Style } from "./style";

const _scriptInfo: string = "[Script Info]";
const _projectGarbage: string = "[Aegisub Project Garbage]";
const _styles: string = "[V4+ Styles]";
const _graphics: string = "[Graphics]";
const _fonts: string = "[Fonts]";
const _events: string = "[Events]";
const _extraData: string = "[Aegisub Extradata]";
const _CommentStart: string = "; ";
const _DataStart: string = "Data: ";

export type ASSFile = {
    scriptInfo: SectionScriptInfo;
    aegisubProjectGarbage: SectionProjectGarbage;
    styles: SectionStyles;
    fonts: SectionFonts,
    graphics: SectionGraphics,
    events: SectionEvents,
    extraData: SectionExtraData,
};

export function ASSFileToString(file: ASSFile): string {
    let s = "";
    s += sectionScriptInfoToString(file.scriptInfo);
    s += "\n\n" + sectionProjectGarbageToString(file.aegisubProjectGarbage);
    s += "\n\n" + sectionStylesToString(file.styles);
    s += "\n\n" + sectionFontsToString(file.fonts);
    s += "\n\n" + sectionGraphicsToString(file.graphics);
    s += "\n\n" + sectionEventsToString(file.events);
    s += "\n\n" + sectionExtraDataToString(file.extraData);
    s += "\n";
    return s;
}

export function parseASSFile(text: string): ASSFile | null {
    const assFile: ASSFile = {
        scriptInfo: newScriptInfo(),
        aegisubProjectGarbage: newProjectGarbage(),
        styles: newSectionStyles(),
        fonts: newSectionFonts(),
        graphics: newSectionGraphics(),
        events: newSectionEvents(),
        extraData: newSectionExtraData(),
    };

    const modeScriptInfo = "scriptInfo";
    const modeProjectGarbage = "projectGarbage";
    const modeStyles = "styles";
    const modeFonts = "fonts";
    const modeGraphics = "graphics";
    const modeEvents = "events";
    const modeExtraData = "extraData";
    let mode = "";
    let lastAttachedFile = "";

    const linesToParse: string[] = text.split("\n");
    for (let i = 0; i < linesToParse.length; i++) {
        const lineNumber = i + 1;
        const line = removeUtf8Boom(linesToParse[i]);
        if (line.length === 0) {
            continue;
        }

        switch (line) {
            case _scriptInfo:
                mode = modeScriptInfo;
                continue;
            case _projectGarbage:
                mode = modeProjectGarbage;
                continue;
            case _styles:
                mode = modeStyles;
                continue;
            case _fonts:
                mode = modeFonts;
                continue;
            case _graphics:
                mode = modeGraphics;
                continue;
            case _events:
                mode = modeEvents;
                continue;
            case _extraData:
                mode = modeExtraData;
                continue;
        }

        let err = "";
        switch (mode) {
            case modeScriptInfo:
                err = processScriptInfoLine(assFile, line);
                break;
            case modeProjectGarbage:
                err = processProjectGarbageLine(assFile, line);
                break;
            case modeStyles:
                err = processStylesLine(assFile, line);
                break;
            case modeFonts:
                lastAttachedFile = processFontsLine(assFile, line, lastAttachedFile);
                break;
            case modeGraphics:
                lastAttachedFile = processGraphicsLine(assFile, line, lastAttachedFile);
                break;
            case modeEvents:
                err = processEventsLine(assFile, line);
                break;
            case modeExtraData:
                processExtraDataLine(assFile, line);
                break;
            default:
                console.error(`failed to parse line ${lineNumber}`);
                break;
        }

        if (err.length > 0) {
            console.error(`failed to parse ass file at line ${lineNumber}: ${err}\nLine:\n${line}`);
            return null;
        }
    }

    return assFile;
}

export function parseStyle(text: string): [Style | undefined, string] {
    const regexStyle = /Style: (?<name>.*)\s*,\s*(?<fontName>.*)\s*,\s*(?<fontSize>\d+(?:\.\d+)?)\s*,\s*&H(?<alpha1>[A-Fa-f0-9]{2})(?<color1>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha2>[A-Fa-f0-9]{2})(?<color2>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha3>[A-Fa-f0-9]{2})(?<color3>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha4>[A-Fa-f0-9]{2})(?<color4>[A-Fa-f0-9]{6})\s*,\s*(?<bold>0|-1)\s*,\s*(?<italic>0|-1)\s*,\s*(?<underline>0|-1)\s*,\s*(?<strikeout>0|-1)\s*,\s*(?<scaleX>\d+(?:\.\d+)?)\s*,\s*(?<scaleY>\d+(?:\.\d+)?)\s*,\s*(?<spacing>\d+(?:\.\d+)?)\s*,\s*(?<angle>-?\d+(?:\.\d+)?)\s*,\s*(?<borderStyle>\d+)\s*,\s*(?<outline>\d+(?:\.\d+)?)\s*,\s*(?<shadow>\d+(?:\.\d+)?)\s*,\s*(?<alignment>[1-9])\s*,\s*(?<marginLeft>\d+)\s*,\s*(?<marginRight>\d+)\s*,\s*(?<marginVertical>\d+)\s*,\s*(?<encoding>\d+)/;

    if (!text.startsWith("Style: ")) {
        return [undefined, ""];
    }

    const match = text.match(regexStyle);
    if (!match || match.length === 0 || !match.groups) {
        return [undefined, `failed to parse style: not a style: ${text}`];
    }

    const alignmentParseResult = Alignment.safeParse(Number(match.groups.alignment));
    if (!alignmentParseResult.success) {
        return [undefined, `failed to parse style: invalid alignment: ${text}`];
    }

    const alignment: Alignment = alignmentParseResult.data;

    const encodingParseResult = Encoding.safeParse(Number(match.groups.encoding));
    if (!encodingParseResult.success) {
        return [undefined, `failed to parse style: invalid encoding: ${match.groups.encoding}`];
    }

    const encoding: Encoding = encodingParseResult.data;

    const style: Style = {
        name: match.groups.name ?? "",
        fontName: match.groups.fontName ?? "",
        fontSize: Number(match.groups.fontSize ?? "0"),
        primaryAlpha: match.groups.alpha1,
        primaryColor: match.groups.color1,
        secondaryAlpha: match.groups.alpha2,
        secondaryColor: match.groups.color2,
        outlineAlpha: match.groups.alpha3,
        outlineColor: match.groups.color3,
        backAlpha: match.groups.alpha4,
        backColor: match.groups.color4,
        bold: Number(match.groups.bold),
        italic: Number(match.groups.italic),
        underline: Number(match.groups.underline),
        strikeOut: Number(match.groups.strikeout),
        scaleX: Number(match.groups.scaleX),
        scaleY: Number(match.groups.scaleY),
        spacing: Number(match.groups.spacing),
        angle: Number(match.groups.angle),
        borderStyle: Number(match.groups.borderStyle),
        outline: Number(match.groups.outline),
        shadow: Number(match.groups.shadow),
        alignment: alignment,
        marginLeft: Number(match.groups.marginLeft),
        marginRight: Number(match.groups.marginRight),
        marginVertical: Number(match.groups.marginVertical),
        encoding: encoding,
    };

    return [style, ""];
}

function removeUtf8Boom(s: string): string {
    // remove boom
    s = s.replaceAll("\\uFEFF", "");

    // remove windows end of line
    s = s.replaceAll("\r", "");

    return s;
}

type KeyValue = {
    key: string;
    value: string;
};

function parseKeyValue(text: string): [KeyValue, string] {
    const regexLine = /(?<key>.+):\s+(?<value>.*)\s*/;
    const kv: KeyValue = {
        key: "",
        value: "",
    };

    const match = text.match(regexLine);
    if (!match || match.length === 0) {
        return [kv, `not a key-value pair: ${text}`];
    }

    kv.key = match.groups?.key ?? "";
    kv.value = match.groups?.value ?? "";
    return [kv, ""];
}

function processScriptInfoLine(assFile: ASSFile, line: string): string {
    if (line.startsWith(_CommentStart)) {
        const comment = line.substring(_CommentStart.length);
        assFile.scriptInfo.comments.push(comment);
        return "";
    }

    const [kv, errorParseKeyValue] = parseKeyValue(line);
    if (errorParseKeyValue.length > 0) {
        return `failed to parse script info line: ${errorParseKeyValue}`;
    }

    assFile.scriptInfo.properties.set(kv.key, kv.value);
    return "";
}

function processProjectGarbageLine(assFile: ASSFile, line: string): string {
    if (line.startsWith(_CommentStart)) {
        const comment = line.substring(_CommentStart.length);
        assFile.aegisubProjectGarbage.comments.push(comment);
        return "";
    }

    const [kv, errorParseKeyValue] = parseKeyValue(line);
    if (errorParseKeyValue.length > 0) {
        return `failed to parse script info line: ${errorParseKeyValue}`;
    }

    assFile.aegisubProjectGarbage.properties.set(kv.key, kv.value);
    return "";
}

function processStylesLine(assFile: ASSFile, line: string): string {
    const [style, error] = parseStyle(line);
    if (error === "" && style != null) {
        assFile.styles.styles.push(style);
    }

    return error;
}

function processFontsLine(assFile: ASSFile, line: string, currentAttachedFile: string): string {
    const [kv, errorParseKeyValue] = parseKeyValue(line);
    if (errorParseKeyValue.length === 0 && kv.key == "fontname") {
        const fileName = kv.value;
        let attachedFile: AttachedFont = {
            name: "",
            data: [],
        };

        let index = assFile.fonts.files.findIndex(x => x.name === fileName);
        assFile.fonts.files.push(attachedFile);
        index = assFile.fonts.files.length - 1;
        attachedFile = assFile.fonts.files[index];
        attachedFile.name = fileName;
        currentAttachedFile = fileName;
        return fileName;
    }

    const index = assFile.fonts.files.findLastIndex(x => x.name == currentAttachedFile);
    if (index < 0) {
        return "";
    }

    const attachedFile = assFile.fonts.files[index];
    attachedFile.data.push(line);
    return currentAttachedFile;
}

function processGraphicsLine(assFile: ASSFile, line: string, currentAttachedFile: string): string {
    const [kv, errorParseKeyValue] = parseKeyValue(line);
    if (errorParseKeyValue.length === 0 && kv.key == "filename") {
        const fileName = kv.value;
        let attachedFile: AttachedGraphic = {
            name: "",
            data: [],
        };

        let index = assFile.graphics.files.findIndex(x => x.name === fileName);
        assFile.graphics.files.push(attachedFile);
        index = assFile.graphics.files.length - 1;
        attachedFile = assFile.graphics.files[index];
        attachedFile.name = fileName;
        currentAttachedFile = fileName;
        return fileName;
    }

    const index = assFile.graphics.files.findLastIndex(x => x.name == currentAttachedFile);
    if (index < 0) {
        return "";
    }

    const attachedFile = assFile.graphics.files[index];
    attachedFile.data.push(line);
    return currentAttachedFile;
}

function processEventsLine(assFile: ASSFile, text: string): string {
    if (text.startsWith("Format:")) {
        assFile.events.format = text;
        return "";
    }

    const line = parseLine(text);
    if (line == null) {
        return `not a event (dialogue / comment): ${line}`;
    }

    assFile.events.lines.push(line);
    return "";
}

function processExtraDataLine(assFile: ASSFile, line: string) {
    if (!line.startsWith(_DataStart)) {
        return;
    }

    const datum = line.substring(_DataStart.length);
    assFile.extraData.data.push(datum);
}

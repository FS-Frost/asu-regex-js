import * as regex from "./regex";
import { parseTime, Time, timeToSeconds, timeToString } from "./time";

export const LINE_TYPE_DIALOGUE = "Dialogue";
export const LINE_TYPE_COMMENT = "Comment";

export type LineType = typeof LINE_TYPE_DIALOGUE | typeof LINE_TYPE_COMMENT;

export type Line = {
    type: LineType;
    layer: number;
    start: Time;
    end: Time;
    style: string;
    actor: string;
    marginLeft: number;
    marginRight: number;
    marginVertical: number;
    effect: string;
    content: string;
};

export function parseLine(text: string): Line | null {
    const match = text.match(regex.regexLine);
    if (match == null) {
        return null;
    }

    const groups = match.groups;
    const start = parseTime(groups?.start ?? "");
    if (start == null) {
        return null;
    }

    const end = parseTime(groups?.end ?? "");
    if (end == null) {
        return null;
    }

    const line: Line = {
        type:
            groups?.type === LINE_TYPE_COMMENT ? LINE_TYPE_COMMENT : LINE_TYPE_DIALOGUE,
        layer: Number(groups?.layer ?? "0"),
        start: start,
        end: end,
        style: groups?.style ?? "",
        actor: groups?.actor ?? "",
        marginLeft: Number(groups?.marginLeft ?? "0"),
        marginRight: Number(groups?.marginRight ?? "0"),
        marginVertical: Number(groups?.marginVertical ?? "0"),
        effect: groups?.effect ?? "",
        content: groups?.content ?? "",
    };

    return line;
}

export function lineToString(line: Line): string {
    let s = line.type;
    s += ": ";
    s += Math.floor(line.layer);
    s += ",";
    s += timeToString(line.start);
    s += ",";
    s += timeToString(line.end);
    s += ",";
    s += line.style;
    s += ",";
    s += line.actor;
    s += ",";
    s += Math.floor(line.marginLeft);
    s += ",";
    s += Math.floor(line.marginRight);
    s += ",";
    s += Math.floor(line.marginVertical);
    s += ",";
    s += line.effect;
    s += ",";
    s += line.content;
    return s;
}

export function calculateLineDurationInSeconds(line: Line): number {
    const duration = timeToSeconds(line.end) - timeToSeconds(line.start);
    return duration;
}

export function generateDefaultLine(): Line {
    return {
        type: "Dialogue",
        layer: 0,
        start: {
            hours: 0,
            minutes: 0,
            seconds: 0,
        },
        end: {
            hours: 0,
            minutes: 0,
            seconds: 5,
        },
        style: "Default",
        actor: "",
        marginLeft: 0,
        marginRight: 0,
        marginVertical: 0,
        effect: "",
        content: "",
    };
}

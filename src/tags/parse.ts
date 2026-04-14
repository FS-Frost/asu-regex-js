import * as regex from "../regex";
import { tagParsers } from "./registry";
import {
    TagName,
    Tags,
    TagT,
    TagText,
    TagUnknown,
} from "./types";

export function parseTags(text: string, tags: Tags[]): Tags[] {
    const tagNameSource = text.substring(1);
    const matchTagT = text.match(regex.regexTagT);
    if (matchTagT && matchTagT.length > 0) {
        return parseTagT(text, tags, tagNameSource, matchTagT);
    }

    const matchText = text.match(regex.regexText);
    if (matchText && matchText.length > 0) {
        const value = matchText[0];

        tags.push({
            name: TagName.text,
            value: value,
        } satisfies TagText);

        text = text.substring(value.length);
        if (text.length > 0) {
            parseTags(text, tags);
        }

        return tags;
    }

    const matchUnitTags = text.match(regex.regexTags);
    if (!matchUnitTags || matchUnitTags.length === 0) {
        return tags;
    }

    function parseNextTag(tags: Tags[], parsedTag: Tags, parsedTextLength: number): Tags[] {
        tags.push(parsedTag);

        text = text.substring(parsedTextLength);
        if (text.length > 0) {
            parseTags(text, tags);
        }

        return tags;
    }

    const currentTagText = matchUnitTags[0];

    for (const parser of tagParsers) {
        const match = currentTagText.match(parser.regex)?.groups;
        if (match != null) {
            const tag = parser.parse(match);
            return parseNextTag(tags, tag, currentTagText.length);
        }
    }

    const tag: TagUnknown = {
        name: TagName.unknown,
        value: currentTagText,
    };

    return parseNextTag(tags, tag, currentTagText.length);
}

export function parseTagT(
    text: string,
    tags: Tags[],
    tagNameSource: string,
    matchTagT: RegExpMatchArray,
): Tags[] {
    if (tagNameSource.startsWith(TagName.t)) {
        const match = matchTagT[0].match(regex.regexTagT)?.groups;
        const rawTags = match?.tags ?? "";
        const subtags: Tags[] = [];
        parseTags(rawTags, subtags);

        const arg1 = match?.arg1 ? Number(match.arg1) : null;
        const arg2 = match?.arg2 ? Number(match.arg2) : null;
        const arg3 = match?.arg3 ? Number(match.arg3) : null;

        const tag: TagT = {
            name: TagName.t,
            accel: null,
            t1: null,
            t2: null,
            tags: subtags,
        };

        if (arg1 !== null && arg2 !== null && arg3 !== null) {
            tag.t1 = arg1;
            tag.t2 = arg2;
            tag.accel = arg3;
        } else if (arg1 !== null && arg2 !== null && arg3 === null) {
            tag.t1 = arg1;
            tag.t2 = arg2;
            tag.accel = null;
        } else if (arg1 !== null) {
            tag.accel = arg1;
        }

        tags.push(tag);
    }

    text = text.substring(matchTagT[0].length);
    if (text.length > 0) {
        parseTags(text, tags);
    }

    return tags;
}

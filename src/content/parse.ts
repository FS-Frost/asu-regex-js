import * as regex from "../regex";
import { parseTags } from "../tags/parse";
import { TagName, Tags, TagP } from "../tags/types";
import { parseDrawingCommands } from "../drawing/parse";
import { ContentEffect, ContentItem, ContentText, ContentDrawing } from "./types";

export function parseContent(text: string): ContentItem[] {
    const items: ContentItem[] = [];
    const result = text.matchAll(regex.regexContent);
    let currentDrawingLevel = 0;

    for (const match of result) {
        if (match.groups?.fx) {
            // remove curly braces {}
            const rawTags = match.groups.fx.substring(1, match.groups.fx.length - 1);
            const tags: Tags[] = [];
            parseTags(rawTags, tags);

            for (const tag of tags) {
                if (tag.name === TagName.p) {
                    currentDrawingLevel = (tag satisfies TagP).value;
                }
            }

            items.push({
                name: "effect",
                tags: tags,
            } satisfies ContentEffect);
            continue;
        }

        if (match.groups?.txt) {
            if (currentDrawingLevel > 0) {
                items.push({
                    name: "drawing",
                    commands: parseDrawingCommands(match.groups?.txt),
                } satisfies ContentDrawing);
            } else {
                items.push({
                    name: "text",
                    value: match.groups?.txt,
                } satisfies ContentText);
            }
            continue;
        }
    }

    return items;
}

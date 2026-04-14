import * as regex from "../regex";
import { parseTags } from "../tags/parse";
import { Tags } from "../tags/types";
import { ContentEffect, ContentItem, ContentText } from "./types";

export function parseContent(text: string): ContentItem[] {
    const items: ContentItem[] = [];
    const result = text.matchAll(regex.regexContent);

    for (const match of result) {
        if (match.groups?.fx) {
            // remove curly braces {}
            const rawTags = match.groups.fx.substring(1, match.groups.fx.length - 1);
            const tags: Tags[] = [];
            parseTags(rawTags, tags);

            items.push({
                name: "effect",
                tags: tags,
            } satisfies ContentEffect);
            continue;
        }

        if (match.groups?.txt) {
            items.push({
                name: "text",
                value: match.groups?.txt,
            } satisfies ContentText);
            continue;
        }
    }

    return items;
}

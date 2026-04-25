import { truncate } from "../math";
import { TagName, Tags } from "../tags/types";
import { optimizeTags } from "../tags/optimize";
import { ContentItem } from "./types";

export function mergeNeighboringEffects(items: ContentItem[]): void {
    const indexToRemove: number[] = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.name != "effect") {
            continue;
        }

        const nextItem = items[i + 1];
        if (nextItem == null || nextItem.name != "effect") {
            i++;
            continue;
        }

        item.tags.push(...nextItem.tags);
        indexToRemove.push(i + 1);
    }

    for (const index of indexToRemove.reverse()) {
        items.splice(index, 1);
    }
}

export function optimizeContent(items: ContentItem[]): void {
    for (const item of items) {
        if (item.name === "effect") {
            item.tags = optimizeTags(item.tags);
        }
    }
}

export function truncateNumberTags(items: ContentItem[], decimals: number): void {
    forEachTag(items, (tag) => {
        switch (tag.name) {
            case TagName.t: {
                if (tag.accel != null) {
                    tag.accel = truncate(tag.accel, decimals);
                }

                if (tag.t1 != null) {
                    tag.t1 = truncate(tag.t1, decimals);
                }

                if (tag.t2 != null) {
                    tag.t2 = truncate(tag.t2, decimals);
                }
                break;
            }

            case TagName.pos:
            case TagName.org:
                tag.x = truncate(tag.x, decimals);
                tag.y = truncate(tag.y, decimals);
                break;

            case TagName.move:
                tag.x1 = truncate(tag.x1, decimals);
                tag.y1 = truncate(tag.y1, decimals);
                tag.x2 = truncate(tag.x2, decimals);
                tag.y2 = truncate(tag.y2, decimals);

                if (tag.t1 != null) {
                    tag.t1 = truncate(tag.t1, decimals);
                }

                if (tag.t2 != null) {
                    tag.t2 = truncate(tag.t2, decimals);
                }
                break;

            case TagName.fad:
                tag.in = truncate(tag.in, decimals);
                tag.out = truncate(tag.out, decimals);
                break;

            case TagName.fade:
                tag.t1 = truncate(tag.t1, decimals);
                tag.t2 = truncate(tag.t2, decimals);
                tag.t3 = truncate(tag.t3, decimals);
                tag.t4 = truncate(tag.t4, decimals);
                tag.alpha1 = truncate(tag.alpha1, decimals);
                tag.alpha2 = truncate(tag.alpha2, decimals);
                tag.alpha3 = truncate(tag.alpha3, decimals);
                break;

            case TagName.fe:
                tag.encodingId = Math.floor(tag.encodingId);
                break;

            case TagName.color:
            case TagName.color1:
            case TagName.color2:
            case TagName.color3:
            case TagName.color4:
                tag.blue = Math.floor(tag.blue);
                tag.green = Math.floor(tag.green);
                tag.red = Math.floor(tag.red);
                break;

            case TagName.clip:
            case TagName.iclip:
                if (tag.type === "rect") {
                    tag.x1 = truncate(tag.x1, decimals);
                    tag.y1 = truncate(tag.y1, decimals);
                    tag.x2 = truncate(tag.x2, decimals);
                    tag.y2 = truncate(tag.y2, decimals);
                } else if (tag.scale !== null) {
                    tag.scale = truncate(tag.scale, decimals);
                }
                break;

            case TagName.fn:
            case TagName.r:
            case TagName.text:
            case TagName.unknown:
                break;

            default:
                if (typeof tag.value === "number") {
                    tag.value = truncate(tag.value, decimals);
                }
                break;
        }
    });
}

export function forEachTag(
    items: ContentItem[],
    predicate: (tag: Tags) => void,
): void {
    for (const item of items) {
        if (item.name != "effect") {
            continue;
        }

        for (const tag of item.tags) {
            predicate(tag);
        }
    }
}

export function tagsToItems(tags: Tags[]): ContentItem[] {
    const items: ContentItem[] = [
        {
            name: "effect",
            tags: tags,
        },
    ];

    return items;
}

export function itemsToTags(items: ContentItem[]): Tags[] {
    const fx = items.find((x) => x.name === "effect");
    if (fx == null || fx.name != "effect") {
        return [];
    }

    return fx.tags;
}

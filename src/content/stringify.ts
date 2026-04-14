import { numberToHex } from "../math";
import { TagName, Tags } from "../tags/types";
import { ContentEffect, ContentItem } from "./types";

export function contentEffectToString(item: ContentEffect): string {
    let s = "";
    for (const tag of item.tags) {
        switch (tag.name) {
            case TagName.t: {
                const subeffect: ContentEffect = {
                    name: "effect",
                    tags: tag.tags,
                };

                const subcontent = contentEffectToString(subeffect);
                if (tag.t1 !== null && tag.t2 !== null && tag.accel !== null) {
                    s += `\\t(${tag.t1},${tag.t2},${tag.accel},${subcontent})`;
                } else if (tag.t1 !== null && tag.t2 !== null && tag.accel === null) {
                    s += `\\t(${tag.t1},${tag.t2},${subcontent})`;
                } else if (tag.accel !== null) {
                    s += `\\t(${tag.accel},${subcontent})`;
                } else {
                    s += `\\t(${subcontent})`;
                }
                break;
            }

            case TagName.pos:
            case TagName.org:
                s += `\\${tag.name}(${tag.x},${tag.y})`;
                break;

            case TagName.move:
                s += `\\move(${tag.x1},${tag.y1},${tag.x2},${tag.y2}`;
                if (tag.t1 != null && tag.t2 != null) {
                    s += `,${tag.t1},${tag.t2}`;
                }
                s += ")";
                break;

            case TagName.clip:
            case TagName.iclip:
                s += `\\${tag.name}(${tag.drawCommands})`;
                break;

            case TagName.fad:
                s += `\\fad(${tag.in},${tag.out})`;
                break;

            case TagName.fade:
                s += `\\fade(${tag.alpha1},${tag.alpha2},${tag.alpha3},${tag.t1},${tag.t2},${tag.t3},${tag.t4})`;
                break;

            case TagName.fe:
                s += `\\fe${tag.encodingId}`;
                break;

            case TagName.fn:
                s += `\\fn${tag.font}`;
                break;

            case TagName.r:
                s += `\\r${tag.style}`;
                break;

            case TagName.color:
            case TagName.color1:
            case TagName.color2:
            case TagName.color3:
            case TagName.color4: {
                const hexBlue = numberToHex(tag.blue);
                const hexGreen = numberToHex(tag.green);
                const hexRed = numberToHex(tag.red);
                s += `\\${tag.name}&H${hexBlue}${hexGreen}${hexRed}&`;
                break;
            }

            case TagName.text:
            case TagName.unknown:
                s += tag.value;
                break;

            default:
                s += `\\${tag.name}${tag.value}`;
                break;
        }
    }

    return s;
}

export function tagToString(tag: Tags): string {
    return contentEffectToString({
        name: "effect",
        tags: [tag],
    });
}

export function contentsToString(items: ContentItem[]): string {
    let s = "";

    for (const item of items) {
        if (item.name == "text") {
            s += item.value;
            continue;
        }

        s += "{" + contentEffectToString(item) + "}";
    }

    return s;
}

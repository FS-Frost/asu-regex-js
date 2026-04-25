import { Tags, TagName, TagT } from "./types";

const overridableTags = new Set([
    TagName.a,
    TagName.alpha,
    TagName.alpha1,
    TagName.alpha2,
    TagName.alpha3,
    TagName.alpha4,
    TagName.an,
    TagName.b,
    TagName.be,
    TagName.blur,
    TagName.bord,
    TagName.color,
    TagName.color1,
    TagName.color2,
    TagName.color3,
    TagName.color4,
    TagName.fax,
    TagName.fay,
    TagName.fe,
    TagName.fn,
    TagName.fr,
    TagName.frx,
    TagName.fry,
    TagName.frz,
    TagName.fs,
    TagName.fscx,
    TagName.fscy,
    TagName.fsp,
    TagName.i,
    TagName.p,
    TagName.pbo,
    TagName.q,
    TagName.r,
    TagName.s,
    TagName.shad,
    TagName.u,
    TagName.xbord,
    TagName.xshad,
    TagName.ybord,
    TagName.yshad,
    TagName.pos,
    TagName.move,
    TagName.org,
    TagName.fad,
    TagName.fade,
    TagName.clip,
    TagName.iclip,
]);

export function optimizeTags(tags: Tags[]): Tags[] {
    if (tags.length === 0) {
        return [];
    }

    const workingTags = getWorkingTagsAfterReset(tags);
    const lastIndices = getLastTagIndices(workingTags);

    return filterRedundantTags(workingTags, lastIndices);
}

function getWorkingTagsAfterReset(tags: Tags[]): Tags[] {
    const lastRIndex = tags.findLastIndex((tag) => tag.name === TagName.r);
    return lastRIndex !== -1 ? tags.slice(lastRIndex) : tags;
}

function getLastTagIndices(tags: Tags[]): Map<TagName, number> {
    const lastIndices = new Map<TagName, number>();
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (overridableTags.has(tag.name)) {
            lastIndices.set(tag.name, i);
        }
    }
    return lastIndices;
}

function filterRedundantTags(tags: Tags[], lastIndices: Map<TagName, number>): Tags[] {
    const result: Tags[] = [];
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (tag.name === TagName.t) {
            const tTag: TagT = {
                ...tag,
                tags: optimizeTags(tag.tags),
            };
            result.push(tTag);
            continue;
        }

        if (!overridableTags.has(tag.name) || lastIndices.get(tag.name) === i) {
            result.push(tag);
        }
    }
    return result;
}

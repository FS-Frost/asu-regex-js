import { hexToNumber } from "../math";
import * as regex from "../regex";
import {
    Tag1a,
    Tag1c,
    Tag2a,
    Tag2c,
    Tag3a,
    Tag3c,
    Tag4a,
    Tag4c,
    TagA,
    TagAlpha,
    TagAn,
    TagB,
    TagBe,
    TagBlur,
    TagBord,
    TagC,
    TagClip,
    TagFad,
    TagFade,
    TagFax,
    TagFay,
    TagFe,
    TagFn,
    TagFr,
    TagFrx,
    TagFry,
    TagFrz,
    TagFs,
    TagFscx,
    TagFscy,
    TagFsp,
    TagI,
    TagIclip,
    TagKf,
    TagKLowerCase,
    TagKo,
    TagKUpperCase,
    TagMove,
    TagName,
    TagOrg,
    TagP,
    TagPbo,
    TagPos,
    TagQ,
    TagR,
    TagS,
    Tags,
    TagShad,
    TagT,
    TagText,
    TagUnknown,
    TagU,
    TagXbord,
    TagXshad,
    TagYbord,
    TagYshad,
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
    if (!matchUnitTags || matchUnitTags.length == 0) {
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

    let match = matchUnitTags[0].match(regex.regexMove)?.groups;
    if (match != null) {
        const x1 = Number(match?.move_x1 ?? "0");
        const y1 = Number(match?.move_y1 ?? "0");
        const x2 = Number(match?.move_x2 ?? "0");
        const y2 = Number(match?.move_y2 ?? "0");
        const t1 = match?.move_t1 ? Number(match.move_t1) : null;
        const t2 = match?.move_t2 ? Number(match.move_t2) : null;

        const tag: TagMove = {
            name: TagName.move,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            t1: t1,
            t2: t2,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAlpha)?.groups;
    if (match != null) {
        const value = match?.alpha_value ?? "";

        const tag: TagAlpha = {
            name: TagName.alpha,
            value: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexXbord)?.groups;
    if (match != null) {
        const value = Number(match?.xbord_value ?? "0");

        const tag: TagXbord = {
            name: TagName.xbord,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexYbord)?.groups;
    if (match != null) {
        const value = Number(match?.ybord_value ?? "0");

        const tag: TagYbord = {
            name: TagName.ybord,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexXshad)?.groups;
    if (match != null) {
        const value = Number(match?.xshad_value ?? "0");

        const tag: TagXshad = {
            name: TagName.xshad,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexYshad)?.groups;
    if (match != null) {
        const value = Number(match?.yshad_value ?? "0");

        const tag: TagYshad = {
            name: TagName.yshad,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexIclip)?.groups;
    if (match != null) {
        const args = match?.iclip_args ?? "";

        const tag: TagIclip = {
            name: TagName.iclip,
            drawCommands: args,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexBlur)?.groups;
    if (match != null) {
        const value = Number(match?.blur_value ?? "0");

        const tag: TagBlur = {
            name: TagName.blur,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexBord)?.groups;
    if (match != null) {
        const value = Number(match?.bord_value ?? "0");

        const tag: TagBord = {
            name: TagName.bord,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexShad)?.groups;
    if (match != null) {
        const value = Number(match?.shad_value ?? "0");

        const tag: TagShad = {
            name: TagName.shad,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFscx)?.groups;
    if (match != null) {
        const value = Number(match?.fscx_value ?? "0");

        const tag: TagFscx = {
            name: TagName.fscx,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFscy)?.groups;
    if (match != null) {
        const value = Number(match?.fscy_value ?? "0");

        const tag: TagFscy = {
            name: TagName.fscy,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFade)?.groups;
    if (match != null) {
        const alpha1 = Number(match?.fade_alpha1 ?? "0");
        const alpha2 = Number(match?.fade_alpha2 ?? "0");
        const alpha3 = Number(match?.fade_alpha3 ?? "0");
        const t1 = Number(match?.fade_t1 ?? "0");
        const t2 = Number(match?.fade_t2 ?? "0");
        const t3 = Number(match?.fade_t3 ?? "0");
        const t4 = Number(match?.fade_t4 ?? "0");

        const tag: TagFade = {
            name: TagName.fade,
            alpha1: alpha1,
            alpha2: alpha2,
            alpha3: alpha3,
            t1: t1,
            t2: t2,
            t3: t3,
            t4: t4,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexClip)?.groups;
    if (match != null) {
        const args = match?.clip_args ?? "";

        const tag: TagClip = {
            name: TagName.clip,
            drawCommands: args,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFsp)?.groups;
    if (match != null) {
        const value = Number(match?.fsp_value ?? "0");

        const tag: TagFsp = {
            name: TagName.fsp,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexPos)?.groups;
    if (match != null) {
        const x = Number(match?.pos_x ?? "0");
        const y = Number(match?.pos_y ?? "0");

        const tag: TagPos = {
            name: TagName.pos,
            x: x,
            y: y,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexOrg)?.groups;
    if (match != null) {
        const x = Number(match?.org_x ?? "0");
        const y = Number(match?.org_y ?? "0");

        const tag: TagOrg = {
            name: TagName.org,
            x: x,
            y: y,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFad)?.groups;
    if (match != null) {
        const fadeIn = Number(match?.in ?? "0");
        const fadeOut = Number(match?.out ?? "0");

        const tag: TagFad = {
            name: TagName.fad,
            in: fadeIn,
            out: fadeOut,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFrx)?.groups;
    if (match != null) {
        const value = Number(match?.frx_value ?? "0");

        const tag: TagFrx = {
            name: TagName.frx,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFry)?.groups;
    if (match != null) {
        const value = Number(match?.fry_value ?? "0");

        const tag: TagFry = {
            name: TagName.fry,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFrz)?.groups;
    if (match != null) {
        const value = Number(match?.frz_value ?? "0");

        const tag: TagFrz = {
            name: TagName.frz,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFax)?.groups;
    if (match != null) {
        const value = Number(match?.fax_value ?? "0");

        const tag: TagFax = {
            name: TagName.fax,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFay)?.groups;
    if (match != null) {
        const value = Number(match?.fay_value ?? "0");

        const tag: TagFay = {
            name: TagName.fay,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexPbo)?.groups;
    if (match != null) {
        const value = Number(match?.pbo_value ?? "0");

        const tag: TagPbo = {
            name: TagName.pbo,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFe)?.groups;
    if (match != null) {
        const value = Number(match?.fe_value ?? "0");

        const tag: TagFe = {
            name: TagName.fe,
            encodingId: Number(value),
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFn)?.groups;
    if (match != null) {
        const value = match?.fn_value ?? "";

        const tag: TagFn = {
            name: TagName.fn,
            font: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAn)?.groups;
    if (match != null) {
        const value = Number(match?.an_value ?? "0");

        const tag: TagAn = {
            name: TagName.an,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexBe)?.groups;
    if (match != null) {
        const value = Number(match?.be_value ?? "0");

        const tag: TagBe = {
            name: TagName.be,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFr)?.groups;
    if (match != null) {
        const value = Number(match?.fr_value ?? "0");

        const tag: TagFr = {
            name: TagName.fr,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexFs)?.groups;
    if (match != null) {
        const value = Number(match?.fs_value ?? "0");

        const tag: TagFs = {
            name: TagName.fs,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexKo)?.groups;
    if (match != null) {
        const value = Number(match?.ko_value ?? "0");

        const tag: TagKo = {
            name: TagName.ko,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexKf)?.groups;
    if (match != null) {
        const value = Number(match?.kf_value ?? "0");

        const tag: TagKf = {
            name: TagName.kf,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexColor1)?.groups;
    if (match != null) {
        const blue = Number(hexToNumber(match?.color1_bgr_blue ?? "0"));
        const green = Number(hexToNumber(match?.color1_bgr_green ?? "0"));
        const red = Number(hexToNumber(match?.color1_bgr_red ?? "0"));

        const tag: Tag1c = {
            name: TagName.color1,
            blue: blue,
            green: green,
            red: red,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexColor2)?.groups;
    if (match != null) {
        const blue = Number(hexToNumber(match?.color2_bgr_blue ?? "0"));
        const green = Number(hexToNumber(match?.color2_bgr_green ?? "0"));
        const red = Number(hexToNumber(match?.color2_bgr_red ?? "0"));

        const tag: Tag2c = {
            name: TagName.color2,
            blue: blue,
            green: green,
            red: red,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexColor3)?.groups;
    if (match != null) {
        const blue = Number(hexToNumber(match?.color3_bgr_blue ?? "0"));
        const green = Number(hexToNumber(match?.color3_bgr_green ?? "0"));
        const red = Number(hexToNumber(match?.color3_bgr_red ?? "0"));

        const tag: Tag3c = {
            name: TagName.color3,
            blue: blue, green: green, red: red,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexColor4)?.groups;
    if (match != null) {
        const blue = Number(hexToNumber(match?.color4_bgr_blue ?? "0"));
        const green = Number(hexToNumber(match?.color4_bgr_green ?? "0"));
        const red = Number(hexToNumber(match?.color4_bgr_red ?? "0"));

        const tag: Tag4c = {
            name: TagName.color4,
            blue: blue, green: green, red: red,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAlpha1)?.groups;
    if (match != null) {
        const value = match.alpha1_value ?? "";

        const tag: Tag1a = {
            name: TagName.alpha1,
            value: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAlpha2)?.groups;
    if (match != null) {
        const value = match.alpha2_value ?? "";

        const tag: Tag2a = {
            name: TagName.alpha2,
            value: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAlpha3)?.groups;
    if (match != null) {
        const value = match.alpha3_value ?? "";

        const tag: Tag3a = {
            name: TagName.alpha3,
            value: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexAlpha4)?.groups;
    if (match != null) {
        const value = match.alpha4_value ?? "";

        const tag: Tag4a = {
            name: TagName.alpha4,
            value: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexKLowerCase)?.groups;
    if (match != null) {
        const value = Number(match?.k_lower_case_value ?? "0");

        const tag: TagKLowerCase = {
            name: TagName.kLowerCase,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexKUpperCase)?.groups;
    if (match != null) {
        const value = Number(match?.k_upper_case_value ?? "0");

        const tag: TagKUpperCase = {
            name: TagName.kUpperCase,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexQ)?.groups;
    if (match != null) {
        const value = Number(match?.q_value ?? "0");

        const tag: TagQ = {
            name: TagName.q,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexS)?.groups;
    if (match != null) {
        const value = Number(match?.s_value ?? "0");

        const tag: TagS = {
            name: TagName.s,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexU)?.groups;
    if (match != null) {
        const value = Number(match?.u_value ?? "0");

        const tag: TagU = {
            name: TagName.u,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexR)?.groups;
    if (match != null) {
        const value = match?.r_value ?? "";

        const tag: TagR = {
            name: TagName.r,
            style: value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexP)?.groups;
    if (match != null) {
        const value = Number(match?.p_value ?? "0");

        const tag: TagP = {
            name: TagName.p,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexI)?.groups;
    if (match != null) {
        const value = Number(match?.i_value ?? "0");

        const tag: TagI = {
            name: TagName.i,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexColor)?.groups;
    if (match != null) {
        const blue = Number(hexToNumber(match?.color_bgr_blue ?? "0"));
        const green = Number(hexToNumber(match?.color_bgr_green ?? "0"));
        const red = Number(hexToNumber(match?.color_bgr_red ?? "0"));

        const tag: TagC = {
            name: TagName.color,
            blue: blue, green: green, red: red,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexB)?.groups;
    if (match != null) {
        const value = Number(match?.b_value ?? "0");

        const tag: TagB = {
            name: TagName.b,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    match = matchUnitTags[0].match(regex.regexA)?.groups;
    if (match != null) {
        const value = Number(match?.a_value ?? "0");

        const tag: TagA = {
            name: TagName.a,
            value: Number.isNaN(value) ? 0 : value,
        };

        return parseNextTag(tags, tag, matchUnitTags[0].length);
    }

    const value = matchUnitTags[0];
    const tag: TagUnknown = {
        name: TagName.unknown,
        value: value,
    };

    return parseNextTag(tags, tag, matchUnitTags[0].length);
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

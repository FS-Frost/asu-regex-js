import { hexToNumber, numberToHex } from "./mat";
import { regexClip, regexColor, regexColor1, regexColor2, regexColor3, regexColor4, regexColorBGR, regexContent, regexFad, regexFade, regexIclip, regexLine, regexMove, regexOrg, regexPos, regexTagT, regexTags, regexText } from "./regex";

export * from "./mat";

export enum TagName {
    a = "a",
    alpha = "alpha",
    alpha1 = "1a",
    alpha2 = "2a",
    alpha3 = "3a",
    alpha4 = "4a",
    an = "an",
    b = "b",
    be = "be",
    blur = "blur",
    bord = "bord",
    clip = "clip",
    color = "c",
    color1 = "1c",
    color2 = "2c",
    color3 = "3c",
    color4 = "4c",
    fad = "fad",
    fade = "fade",
    fax = "fax",
    fay = "fay",
    fe = "fe",
    fn = "fn",
    fr = "fr",
    frx = "frx",
    fry = "fry",
    frz = "frz",
    fs = "fs",
    fscx = "fscx",
    fscy = "fscy",
    fsp = "fsp",
    i = "i",
    iclip = "iclip",
    kLowerCase = "k",
    kUpperCase = "K",
    kf = "kf",
    ko = "ko",
    move = "move",
    org = "org",
    p = "p",
    pbo = "pbo",
    pos = "pos",
    q = "q",
    r = "r",
    s = "s",
    shad = "shad",
    t = "t",
    text = "text",
    u = "u",
    unknown = "unknown",
    xbord = "xbord",
    xshad = "xshad",
    ybord = "ybord",
    yshad = "yshad",
}

export type Tag = {
    name: TagName;
    value: string;
};

export type TagA = {
    name: TagName.a;
    value: number;
};

export type TagAn = {
    name: TagName.an;
    value: number;
};

export type TagB = {
    name: TagName.b;
    value: number;
};

export type TagBlur = {
    name: TagName.blur;
    value: number;
};

export type TagBord = {
    name: TagName.bord;
    value: number;
};

export type TagXbord = {
    name: TagName.xbord;
    value: number;
};

export type TagYbord = {
    name: TagName.ybord;
    value: number;
};

export type ColorBGR = {
    blue: number;
    green: number;
    red: number;
};

export type TagC = ColorBGR & {
    name: TagName.color;
};

export type Tag1c = ColorBGR & {
    name: TagName.color1;
};

export type Tag2c = ColorBGR & {
    name: TagName.color2;
};

export type Tag3c = ColorBGR & {
    name: TagName.color3;
};

export type Tag4c = ColorBGR & {
    name: TagName.color4;
};

export type TagAlpha = {
    name: TagName.alpha;
    value: string;
};

export type Tag1a = {
    name: TagName.alpha1;
    value: string;
};

export type Tag2a = {
    name: TagName.alpha2;
    value: string;
};

export type Tag3a = {
    name: TagName.alpha3;
    value: string;
};

export type Tag4a = {
    name: TagName.alpha4;
    value: string;
};

export type TagClip = {
    name: TagName.clip;
    drawCommands: string;
};

export type TagIclip = {
    name: TagName.iclip;
    drawCommands: string;
};

export type TagFad = {
    name: TagName.fad;
    in: number;
    out: number;
};

export type TagFade = {
    name: TagName.fade;
    alpha1: number;
    alpha2: number;
    alpha3: number;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
};

export type TagFax = {
    name: TagName.fax;
    value: number;
};

export type TagFay = {
    name: TagName.fay;
    value: number;
};

export type TagFe = {
    name: TagName.fe;
    encodingId: number;
};

export type TagFn = {
    name: TagName.fn;
    font: string;
};

export type TagFscx = {
    name: TagName.fscx;
    value: number;
};

export type TagFscy = {
    name: TagName.fscy;
    value: number;
};

export type TagFsp = {
    name: TagName.fsp;
    value: number;
};

export type TagKLowerCase = {
    name: TagName.kLowerCase;
    value: number;
};

export type TagKUpperCase = {
    name: TagName.kUpperCase;
    value: number;
};

export type TagKf = {
    name: TagName.kf;
    value: number;
};

export type TagKo = {
    name: TagName.ko;
    value: number;
};

export type TagOrg = {
    name: TagName.org;
    x: number;
    y: number;
};

export type TagP = {
    name: TagName.p;
    value: number;
};

export type TagPbo = {
    name: TagName.pbo;
    value: number;
};

export type TagQ = {
    name: TagName.q;
    value: number;
};

export type TagR = {
    name: TagName.r;
    style: string;
};

export type TagS = {
    name: TagName.s;
    value: number;
};

export type TagShad = {
    name: TagName.shad;
    value: number;
};

export type TagXshad = {
    name: TagName.xshad;
    value: number;
};

export type TagYshad = {
    name: TagName.yshad;
    value: number;
};

export type TagU = {
    name: TagName.u;
    value: number;
};

export type TagUnknown = {
    name: TagName.unknown;
    value: string;
};

export type TagBe = {
    name: TagName.be;
    value: number;
};

export type TagFr = {
    name: TagName.fr;
    value: number;
};

export type TagFrx = {
    name: TagName.frx;
    value: number;
};

export type TagFry = {
    name: TagName.fry;
    value: number;
};

export type TagFrz = {
    name: TagName.frz;
    value: number;
};

export type TagI = {
    name: TagName.i;
    value: number;
};

export type TagFs = {
    name: TagName.fs;
    value: number;
};

export type TagPos = {
    name: TagName.pos;
    x: number;
    y: number;
};

export type TagMove = {
    name: TagName.move;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    t1: number | null;
    t2: number | null;
};

export type TagT = {
    name: TagName.t;
    t1: number | null;
    t2: number | null;
    accel: number | null;
    tags: Tags[];
};

export type TagText = {
    name: TagName.text;
    value: string;
};

export type Tags = TagA | TagAn | TagB | TagBlur | TagBord | TagXbord | TagYbord | TagC | Tag1c | Tag2c | Tag3c | Tag4c | TagAlpha | Tag1a | Tag2a | Tag3a | Tag4a | TagClip | TagIclip | TagFad | TagFade | TagFax | TagFay | TagFe | TagFn | TagFscx | TagFscy | TagFsp | TagKLowerCase | TagKUpperCase | TagKf | TagKo | TagOrg | TagP | TagPbo | TagQ | TagR | TagS | TagShad | TagXshad | TagYshad | TagU | TagUnknown | TagBe | TagFr | TagFrx | TagFry | TagFrz | TagI | TagFs | TagT | TagText | TagPos | TagMove;

export function parseTags(text: string, tags: Tags[]): Tags[] {
    const tagNameSource = text.substring(1);
    const matchTagT = text.match(regexTagT);
    if (matchTagT && matchTagT.length > 0) {
        return parseTagT(text, tags, tagNameSource, matchTagT);
    }

    const matchText = text.match(regexText);
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

    const matchUnitTags = text.match(regexTags);
    if (!matchUnitTags || matchUnitTags.length == 0) {
        return tags;
    }

    if (tagNameSource.startsWith(TagName.move)) {
        const match = matchUnitTags[0].match(regexMove)?.groups;
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

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.alpha)) {
        const value = matchUnitTags[0].substring(1 + TagName.alpha.length);
        const tag: TagAlpha = {
            name: TagName.alpha,
            value: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.xbord)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.xbord.length));
        const tag: TagXbord = {
            name: TagName.xbord,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.ybord)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.ybord.length));
        const tag: TagYbord = {
            name: TagName.ybord,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.xshad)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.xshad.length));
        const tag: TagXshad = {
            name: TagName.xshad,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.yshad)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.yshad.length));
        const tag: TagYshad = {
            name: TagName.yshad,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.iclip)) {
        const match = matchUnitTags[0].match(regexIclip)?.groups;
        const args = match?.iclip_args ?? "";

        const tag: TagIclip = {
            name: TagName.iclip,
            drawCommands: args,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.blur)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.blur.length));
        const tag: TagBlur = {
            name: TagName.blur,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.bord)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.bord.length));
        const tag: TagBord = {
            name: TagName.bord,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.shad)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.shad.length));
        const tag: TagShad = {
            name: TagName.shad,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fscx)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fscx.length));
        const tag: TagFscx = {
            name: TagName.fscx,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fscy)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fscy.length));
        const tag: TagFscy = {
            name: TagName.fscy,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fade)) {
        const match = matchUnitTags[0].match(regexFade)?.groups;
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

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.clip)) {
        const match = matchUnitTags[0].match(regexClip)?.groups;
        const args = match?.clip_args ?? "";

        const tag: TagClip = {
            name: TagName.clip,
            drawCommands: args,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fsp)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fsp.length));
        const tag: TagFsp = {
            name: TagName.fsp,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.pos)) {
        const match = matchUnitTags[0].match(regexPos)?.groups;
        const x = Number(match?.pos_x ?? "0");
        const y = Number(match?.pos_y ?? "0");

        const tag: TagPos = {
            name: TagName.pos,
            x: x,
            y: y,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.org)) {
        const match = matchUnitTags[0].match(regexOrg)?.groups;
        const x = Number(match?.org_x ?? "0");
        const y = Number(match?.org_y ?? "0");

        const tag: TagOrg = {
            name: TagName.org,
            x: x,
            y: y,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fad)) {
        const match = matchUnitTags[0].match(regexFad)?.groups;
        const fadeIn = Number(match?.in ?? "0");
        const fadeOut = Number(match?.out ?? "0");

        const tag: TagFad = {
            name: TagName.fad,
            in: fadeIn,
            out: fadeOut,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.frx)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.frx.length));
        const tag: TagFrx = {
            name: TagName.frx,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fry)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fry.length));
        const tag: TagFry = {
            name: TagName.fry,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.frz)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.frz.length));
        const tag: TagFrz = {
            name: TagName.frz,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fax)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fax.length));
        const tag: TagFax = {
            name: TagName.fax,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fay)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fay.length));
        const tag: TagFay = {
            name: TagName.fay,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.pbo)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.pbo.length));
        const tag: TagPbo = {
            name: TagName.pbo,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fe)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fe.length));
        const tag: TagFe = {
            name: TagName.fe,
            encodingId: Number(value),
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fn)) {
        const value = matchUnitTags[0].substring(1 + TagName.fn.length);
        const tag: TagFn = {
            name: TagName.fn,
            font: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.an)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.be.length));
        const tag: TagAn = {
            name: TagName.an,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.be)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.be.length));
        const tag: TagBe = {
            name: TagName.be,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fr)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fr.length));
        const tag: TagFr = {
            name: TagName.fr,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.fs)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.fs.length));
        const tag: TagFs = {
            name: TagName.fs,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.ko)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.ko.length));
        const tag: TagKo = {
            name: TagName.ko,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kf)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.kf.length));
        const tag: TagKf = {
            name: TagName.kf,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.color1)) {
        const groups = matchUnitTags[0].match(regexColor1)?.groups;
        const blue = Number(hexToNumber(groups?.color1_bgr_blue ?? "0"));
        const green = Number(hexToNumber(groups?.color1_bgr_green ?? "0"));
        const red = Number(hexToNumber(groups?.color1_bgr_red ?? "0"));

        const tag: Tag1c = {
            name: TagName.color1,
            blue: blue,
            green: green,
            red: red,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.color2)) {
        const groups = matchUnitTags[0].match(regexColor2)?.groups;
        const blue = Number(hexToNumber(groups?.color2_bgr_blue ?? "0"));
        const green = Number(hexToNumber(groups?.color2_bgr_green ?? "0"));
        const red = Number(hexToNumber(groups?.color2_bgr_red ?? "0"));

        const tag: Tag2c = {
            name: TagName.color2,
            blue: blue,
            green: green,
            red: red,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.color3)) {
        const groups = matchUnitTags[0].match(regexColor3)?.groups;
        const blue = Number(hexToNumber(groups?.color3_bgr_blue ?? "0"));
        const green = Number(hexToNumber(groups?.color3_bgr_green ?? "0"));
        const red = Number(hexToNumber(groups?.color3_bgr_red ?? "0"));

        const tag: Tag3c = {
            name: TagName.color3,
            blue: blue,
            green: green,
            red: red,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.color4)) {
        const groups = matchUnitTags[0].match(regexColor4)?.groups;
        const blue = Number(hexToNumber(groups?.color4_bgr_blue ?? "0"));
        const green = Number(hexToNumber(groups?.color4_bgr_green ?? "0"));
        const red = Number(hexToNumber(groups?.color4_bgr_red ?? "0"));

        const tag: Tag4c = {
            name: TagName.color4,
            blue: blue,
            green: green,
            red: red,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.alpha1)) {
        const value = matchUnitTags[0].substring(1 + TagName.alpha1.length);
        const tag: Tag1a = {
            name: TagName.alpha1,
            value: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.alpha2)) {
        const value = matchUnitTags[0].substring(1 + TagName.alpha2.length);
        const tag: Tag2a = {
            name: TagName.alpha2,
            value: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.alpha3)) {
        const value = matchUnitTags[0].substring(1 + TagName.alpha3.length);
        const tag: Tag3a = {
            name: TagName.alpha3,
            value: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.alpha4)) {
        const value = matchUnitTags[0].substring(1 + TagName.alpha4.length);
        const tag: Tag4a = {
            name: TagName.alpha4,
            value: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kLowerCase)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.kLowerCase.length));
        const tag: TagKLowerCase = {
            name: TagName.kLowerCase,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.kUpperCase)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.kUpperCase.length));
        const tag: TagKUpperCase = {
            name: TagName.kUpperCase,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.q)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.q.length));
        const tag: TagQ = {
            name: TagName.q,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.s)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.s.length));
        const tag: TagS = {
            name: TagName.s,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.u)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.u.length));
        const tag: TagU = {
            name: TagName.u,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.r)) {
        const value = matchUnitTags[0].substring(1 + TagName.r.length);
        const tag: TagR = {
            name: TagName.r,
            style: value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.p)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.p.length));
        const tag: TagP = {
            name: TagName.p,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.i)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.i.length));
        const tag: TagI = {
            name: TagName.i,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.color)) {
        const groups = matchUnitTags[0].match(regexColor)?.groups;
        const blue = Number(hexToNumber(groups?.color_bgr_blue ?? "0"));
        const green = Number(hexToNumber(groups?.color_bgr_green ?? "0"));
        const red = Number(hexToNumber(groups?.color_bgr_red ?? "0"));

        const tag: TagC = {
            name: TagName.color,
            blue: blue,
            green: green,
            red: red,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.b)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.b.length));
        const tag: TagB = {
            name: TagName.b,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else if (tagNameSource.startsWith(TagName.a)) {
        const value = Number(matchUnitTags[0].substring(1 + TagName.a.length));
        const tag: TagA = {
            name: TagName.a,
            value: Number.isNaN(value) ? 0 : value,
        };

        tags.push(tag);
    }

    else {
        const value = matchUnitTags[0];
        const tag: TagUnknown = {
            name: TagName.unknown,
            value: value,
        };

        tags.push(tag);
    }

    text = text.substring(matchUnitTags[0].length);
    if (text.length > 0) {
        parseTags(text, tags);
    }

    return tags;
}

function parseTagT(text: string, tags: Tags[], tagNameSource: string, matchTagT: RegExpMatchArray): Tags[] {
    if (tagNameSource.startsWith(TagName.t)) {
        const match = matchTagT[0].match(regexTagT)?.groups;
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

export type ContentEffect = {
    name: "effect",
    tags: Tags[],
};

export type ContentText = {
    name: "text",
    value: string;
};

export type ContentItem = ContentEffect | ContentText;

export function parseContent(text: string): ContentItem[] {
    const items: ContentItem[] = [];
    const result = text.matchAll(regexContent);

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

export function contentEffectToString(item: ContentEffect): string {
    let s = "";
    for (const tag of item.tags) {
        switch (tag.name) {
            case TagName.t:
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
            case TagName.color4:
                const hexBlue = numberToHex(tag.blue);
                const hexGreen = numberToHex(tag.green);
                const hexRed = numberToHex(tag.red);
                s += `\\${tag.name}&H${hexBlue}${hexGreen}${hexRed}&`;
                break;

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

export function findA(items: ContentItem[]): TagA | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.a;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findB(items: ContentItem[]): TagB | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.b;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findColor(items: ContentItem[]): TagC | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.color;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findColor1(items: ContentItem[]): Tag1c | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.color1;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findColor2(items: ContentItem[]): Tag2c | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.color2;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findColor3(items: ContentItem[]): Tag3c | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.color3;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findColor4(items: ContentItem[]): Tag4c | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.color4;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAlpha(items: ContentItem[]): TagAlpha | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.alpha;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAlpha1(items: ContentItem[]): Tag1a | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.alpha1;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAlpha2(items: ContentItem[]): Tag2a | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.alpha2;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAlpha3(items: ContentItem[]): Tag3a | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.alpha3;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAlpha4(items: ContentItem[]): Tag4a | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.alpha4;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findAn(items: ContentItem[]): TagAn | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.an;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBe(items: ContentItem[]): TagBe | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.be;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBlur(items: ContentItem[]): TagBlur | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.blur;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findBord(items: ContentItem[]): TagBord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.bord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findXbord(items: ContentItem[]): TagXbord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.xbord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findYbord(items: ContentItem[]): TagYbord | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.ybord;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findShad(items: ContentItem[]): TagShad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.shad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findXshad(items: ContentItem[]): TagXshad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.xshad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findYshad(items: ContentItem[]): TagYshad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.yshad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFr(items: ContentItem[]): TagFr | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fr;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFrx(items: ContentItem[]): TagFrx | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.frx;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFry(items: ContentItem[]): TagFry | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fry;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFrz(items: ContentItem[]): TagFrz | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.frz;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFax(items: ContentItem[]): TagFax | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fax;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFay(items: ContentItem[]): TagFay | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fay;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findP(items: ContentItem[]): TagP | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.p;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findPbo(items: ContentItem[]): TagPbo | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.pbo;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findQ(items: ContentItem[]): TagQ | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.q;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findS(items: ContentItem[]): TagS | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.s;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findU(items: ContentItem[]): TagU | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.u;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findR(items: ContentItem[]): TagR | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.r;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFe(items: ContentItem[]): TagFe | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fe;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFn(items: ContentItem[]): TagFn | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fn;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFscx(items: ContentItem[]): TagFscx | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fscx;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFscy(items: ContentItem[]): TagFscy | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fscy;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFsp(items: ContentItem[]): TagFsp | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fsp;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKLowerCase(items: ContentItem[]): TagKLowerCase | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kLowerCase;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKUpperCase(items: ContentItem[]): TagKUpperCase | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kUpperCase;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKo(items: ContentItem[]): TagKo | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.ko;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findKf(items: ContentItem[]): TagKf | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.kf;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findI(items: ContentItem[]): TagI | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.i;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFs(items: ContentItem[]): TagFs | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fs;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findPos(items: ContentItem[]): TagPos | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.pos;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findOrg(items: ContentItem[]): TagOrg | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.org;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFad(items: ContentItem[]): TagFad | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fad;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findFade(items: ContentItem[]): TagFade | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.fade;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findClip(items: ContentItem[]): TagClip | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.clip;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findIclip(items: ContentItem[]): TagIclip | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.iclip;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findMove(items: ContentItem[]): TagMove | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.move;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function findT(items: ContentItem[]): TagT | null {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return null;
    }

    const tagName = TagName.t;
    const tag = fx.tags.find(tag => tag.name == tagName);
    if (tag?.name != tagName) {
        return null;
    }

    return tag;
}

export function setA(items: ContentItem[], newValue: number): TagA {
    const defaultTag: TagA = {
        name: TagName.a,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAn(items: ContentItem[], newValue: number): TagAn {
    const defaultTag: TagAn = {
        name: TagName.an,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setB(items: ContentItem[], newValue: number): TagB {
    const defaultTag: TagB = {
        name: TagName.b,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setColor(items: ContentItem[], blue: number, green: number, red: number): TagC {
    const defaultTag: TagC = {
        name: TagName.color,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor1(items: ContentItem[], blue: number, green: number, red: number): Tag1c {
    const defaultTag: Tag1c = {
        name: TagName.color1,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor2(items: ContentItem[], blue: number, green: number, red: number): Tag2c {
    const defaultTag: Tag2c = {
        name: TagName.color2,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor3(items: ContentItem[], blue: number, green: number, red: number): Tag3c {
    const defaultTag: Tag3c = {
        name: TagName.color3,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setColor4(items: ContentItem[], blue: number, green: number, red: number): Tag4c {
    const defaultTag: Tag4c = {
        name: TagName.color4,
        blue: blue,
        green: green,
        red: red,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.blue = blue;
        tag.green = green;
        tag.red = red;
    }

    return tag;
}

export function setAlpha(items: ContentItem[], newValue: string): TagAlpha {
    const defaultTag: TagAlpha = {
        name: TagName.alpha,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha1(items: ContentItem[], newValue: string): Tag1a {
    const defaultTag: Tag1a = {
        name: TagName.alpha1,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha2(items: ContentItem[], newValue: string): Tag2a {
    const defaultTag: Tag2a = {
        name: TagName.alpha2,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha3(items: ContentItem[], newValue: string): Tag3a {
    const defaultTag: Tag3a = {
        name: TagName.alpha3,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setAlpha4(items: ContentItem[], newValue: string): Tag4a {
    const defaultTag: Tag4a = {
        name: TagName.alpha4,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBlur(items: ContentItem[], newValue: number): TagBlur {
    const defaultTag: TagBlur = {
        name: TagName.blur,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBord(items: ContentItem[], newValue: number): TagBord {
    const defaultTag: TagBord = {
        name: TagName.bord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setXbord(items: ContentItem[], newValue: number): TagXbord {
    const defaultTag: TagXbord = {
        name: TagName.xbord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setYbord(items: ContentItem[], newValue: number): TagYbord {
    const defaultTag: TagYbord = {
        name: TagName.ybord,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFax(items: ContentItem[], newValue: number): TagFax {
    const defaultTag: TagFax = {
        name: TagName.fax,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFay(items: ContentItem[], newValue: number): TagFay {
    const defaultTag: TagFay = {
        name: TagName.fay,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFscx(items: ContentItem[], newValue: number): TagFscx {
    const defaultTag: TagFscx = {
        name: TagName.fscx,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFscy(items: ContentItem[], newValue: number): TagFscy {
    const defaultTag: TagFscy = {
        name: TagName.fscy,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFsp(items: ContentItem[], newValue: number): TagFsp {
    const defaultTag: TagFsp = {
        name: TagName.fsp,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFe(items: ContentItem[], encodingId: number): TagFe {
    const defaultTag: TagFe = {
        name: TagName.fe,
        encodingId: encodingId,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.encodingId = encodingId;
    }

    return tag;
}

export function setFn(items: ContentItem[], font: string): TagFn {
    const defaultTag: TagFn = {
        name: TagName.fn,
        font: font,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.font = font;
    }

    return tag;
}

export function setKLowerCase(items: ContentItem[], newValue: number): TagKLowerCase {
    const defaultTag: TagKLowerCase = {
        name: TagName.kLowerCase,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKUpperCase(items: ContentItem[], newValue: number): TagKUpperCase {
    const defaultTag: TagKUpperCase = {
        name: TagName.kUpperCase,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKf(items: ContentItem[], newValue: number): TagKf {
    const defaultTag: TagKf = {
        name: TagName.kf,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setKo(items: ContentItem[], newValue: number): TagKo {
    const defaultTag: TagKo = {
        name: TagName.ko,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setP(items: ContentItem[], newValue: number): TagP {
    const defaultTag: TagP = {
        name: TagName.p,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setPbo(items: ContentItem[], newValue: number): TagPbo {
    const defaultTag: TagPbo = {
        name: TagName.pbo,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setQ(items: ContentItem[], newValue: number): TagQ {
    const defaultTag: TagQ = {
        name: TagName.q,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setS(items: ContentItem[], newValue: number): TagS {
    const defaultTag: TagS = {
        name: TagName.s,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setShad(items: ContentItem[], newValue: number): TagShad {
    const defaultTag: TagShad = {
        name: TagName.shad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setXshad(items: ContentItem[], newValue: number): TagXshad {
    const defaultTag: TagXshad = {
        name: TagName.xshad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setYshad(items: ContentItem[], newValue: number): TagYshad {
    const defaultTag: TagYshad = {
        name: TagName.yshad,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setU(items: ContentItem[], newValue: number): TagU {
    const defaultTag: TagU = {
        name: TagName.u,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setBe(items: ContentItem[], newValue: number): TagBe {
    const defaultTag: TagBe = {
        name: TagName.be,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFs(items: ContentItem[], newValue: number): TagFs {
    const defaultTag: TagFs = {
        name: TagName.fs,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFr(items: ContentItem[], newValue: number): TagFr {
    const defaultTag: TagFr = {
        name: TagName.fr,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFrx(items: ContentItem[], newValue: number): TagFrx {
    const defaultTag: TagFrx = {
        name: TagName.frx,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFry(items: ContentItem[], newValue: number): TagFry {
    const defaultTag: TagFry = {
        name: TagName.fry,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setFrz(items: ContentItem[], newValue: number): TagFrz {
    const defaultTag: TagFrz = {
        name: TagName.frz,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setI(items: ContentItem[], newValue: number): TagI {
    const defaultTag: TagI = {
        name: TagName.i,
        value: newValue,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.value = newValue;
    }

    return tag;
}

export function setR(items: ContentItem[], style: string): TagR {
    const defaultTag: TagR = {
        name: TagName.r,
        style: style,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.style = style;
    }

    return tag;
}

export function setPos(items: ContentItem[], x: number, y: number): TagPos {
    const defaultTag: TagPos = {
        name: TagName.pos,
        x: x,
        y: y,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x = x;
        tag.y = y;
    }

    return tag;
}

export function setOrg(items: ContentItem[], x: number, y: number): TagOrg {
    const defaultTag: TagOrg = {
        name: TagName.org,
        x: x,
        y: y,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x = x;
        tag.y = y;
    }

    return tag;
}

export function setFad(items: ContentItem[], fadeIn: number, fadeOut: number): TagFad {
    const defaultTag: TagFad = {
        name: TagName.fad,
        in: fadeIn,
        out: fadeOut,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.in = fadeIn;
        tag.out = fadeOut;
    }

    return tag;
}

export function setFade(
    items: ContentItem[],
    alpha1: number,
    alpha2: number,
    alpha3: number,
    t1: number,
    t2: number,
    t3: number,
    t4: number,
): TagFade {
    const defaultTag: TagFade = {
        name: TagName.fade,
        alpha1: alpha1,
        alpha2: alpha2,
        alpha3: alpha3,
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.alpha1 = alpha1;
        tag.alpha2 = alpha2;
        tag.alpha3 = alpha3;
        tag.t1 = t1;
        tag.t2 = t2;
        tag.t3 = t3;
        tag.t4 = t4;
    }

    return tag;
}

export function setClip(items: ContentItem[], drawCommands: string): TagClip {
    const defaultTag: TagClip = {
        name: TagName.clip,
        drawCommands: drawCommands,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.drawCommands = drawCommands;
    }

    return tag;
}

export function setIclip(items: ContentItem[], drawCommands: string): TagIclip {
    const defaultTag: TagIclip = {
        name: TagName.iclip,
        drawCommands: drawCommands,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.drawCommands = drawCommands;
    }

    return tag;
}

export function setMove(
    items: ContentItem[],
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    t1: number | null = null,
    t2: number | null = null,
): TagMove {
    const defaultTag: TagMove = {
        name: TagName.move,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        t1: t1,
        t2: t2,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.x1 = x1;
        tag.y1 = y1;
        tag.x2 = x2;
        tag.y2 = y2;
        tag.t1 = t1;
        tag.t2 = t2;
    }

    return tag;
}

export function setT(
    items: ContentItem[],
    tags: Tags[],
    accel: number | null = null,
    t1: number | null = null,
    t2: number | null = null,
): TagT {
    const defaultTag: TagT = {
        name: TagName.t,
        t1: t1,
        t2: t2,
        accel: accel,
        tags: tags,
    };

    const [updated, tag] = setTag<typeof defaultTag>(items, defaultTag.name, defaultTag);
    if (!updated) {
        tag.t1 = t1;
        tag.t2 = t2;
        tag.accel = accel;
        tag.tags = tags;
    }

    return tag;
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
    const fx = items.find(x => x.name === "effect");
    if (fx == null || fx.name != "effect") {
        return [];
    }

    return fx.tags;
}

function setTag<T extends Tags>(items: ContentItem[], tagName: TagName, defaultTag: T): [boolean, T] {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        items.unshift({
            name: "effect",
            tags: [defaultTag],
        });
        return [true, defaultTag];
    }

    const tag = fx.tags.find(tag => tag.name == tagName) as T | null;
    if (tag?.name != tagName) {
        fx.tags.push(defaultTag);
        return [true, defaultTag];
    }

    return [false, tag];
}

export function removeTag(items: ContentItem[], tagName: TagName): void {
    const fx = items.find(item => item.name == "effect");
    if (fx?.name != "effect") {
        return;
    }

    const index = fx.tags.findIndex(tag => tag.name === tagName);
    if (index < 0) {
        return;
    }

    fx.tags.splice(index, 1);
}

export type Line = {
    type: string;
    layer: number;
    start: string;
    end: string;
    style: string;
    actor: string;
    marginLeft: number;
    marginRight: number;
    marginVertical: number;
    effect: string;
    content: string;
};

export function parseLine(text: string): Line | null {
    const match = text.match(regexLine);
    if (match == null) {
        return null;
    }

    const groups = match.groups;
    const line: Line = {
        type: groups?.type ?? "",
        layer: Number(groups?.layer ?? "0"),
        start: groups?.start ?? "",
        end: groups?.end ?? "",
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
    s += line.layer;
    s += ",";
    s += line.start;
    s += ",";
    s += line.end;
    s += ",";
    s += line.style;
    s += ",";
    s += line.actor;
    s += ",";
    s += line.marginLeft;
    s += ",";
    s += line.marginRight;
    s += ",";
    s += line.marginVertical;
    s += ",";
    s += line.effect;
    s += ",";
    s += line.content;
    return s;
}

export function parseColorBGR(text: string): ColorBGR | null {
    const match = text.match(regexColorBGR);
    if (match == null) {
        return null;
    }

    const groups = match.groups;
    const color: ColorBGR = {
        blue: hexToNumber(groups?.color_bgr_blue ?? ""),
        green: hexToNumber(groups?.color_bgr_green ?? ""),
        red: hexToNumber(groups?.color_bgr_red ?? ""),
    };

    return color;
}

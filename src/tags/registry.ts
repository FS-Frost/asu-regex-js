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
    TagU,
    TagXbord,
    TagXshad,
    TagYbord,
    TagYshad,
} from "./types";

export interface TagParser {
    regex: RegExp;
    parse: (groups: Record<string, string>) => Tags;
}

export const tagParsers: TagParser[] = [
    {
        regex: regex.regexMove,
        parse: (groups): TagMove => ({
            name: TagName.move,
            x1: Number(groups.move_x1 ?? "0"),
            y1: Number(groups.move_y1 ?? "0"),
            x2: Number(groups.move_x2 ?? "0"),
            y2: Number(groups.move_y2 ?? "0"),
            t1: groups.move_t1 ? Number(groups.move_t1) : null,
            t2: groups.move_t2 ? Number(groups.move_t2) : null,
        }),
    },
    {
        regex: regex.regexAlpha,
        parse: (groups): TagAlpha => ({
            name: TagName.alpha,
            value: groups.alpha_value ?? "",
        }),
    },
    {
        regex: regex.regexXbord,
        parse: (groups): TagXbord => {
            const value = Number(groups.xbord_value ?? "0");
            return {
                name: TagName.xbord,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexYbord,
        parse: (groups): TagYbord => {
            const value = Number(groups.ybord_value ?? "0");
            return {
                name: TagName.ybord,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexXshad,
        parse: (groups): TagXshad => {
            const value = Number(groups.xshad_value ?? "0");
            return {
                name: TagName.xshad,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexYshad,
        parse: (groups): TagYshad => {
            const value = Number(groups.yshad_value ?? "0");
            return {
                name: TagName.yshad,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexIclip,
        parse: (groups): TagIclip => ({
            name: TagName.iclip,
            drawCommands: groups.iclip_args ?? "",
        }),
    },
    {
        regex: regex.regexBlur,
        parse: (groups): TagBlur => {
            const value = Number(groups.blur_value ?? "0");
            return {
                name: TagName.blur,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexBord,
        parse: (groups): TagBord => {
            const value = Number(groups.bord_value ?? "0");
            return {
                name: TagName.bord,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexShad,
        parse: (groups): TagShad => {
            const value = Number(groups.shad_value ?? "0");
            return {
                name: TagName.shad,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFscx,
        parse: (groups): TagFscx => {
            const value = Number(groups.fscx_value ?? "0");
            return {
                name: TagName.fscx,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFscy,
        parse: (groups): TagFscy => {
            const value = Number(groups.fscy_value ?? "0");
            return {
                name: TagName.fscy,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFade,
        parse: (groups): TagFade => ({
            name: TagName.fade,
            alpha1: Number(groups.fade_alpha1 ?? "0"),
            alpha2: Number(groups.fade_alpha2 ?? "0"),
            alpha3: Number(groups.fade_alpha3 ?? "0"),
            t1: Number(groups.fade_t1 ?? "0"),
            t2: Number(groups.fade_t2 ?? "0"),
            t3: Number(groups.fade_t3 ?? "0"),
            t4: Number(groups.fade_t4 ?? "0"),
        }),
    },
    {
        regex: regex.regexClip,
        parse: (groups): TagClip => ({
            name: TagName.clip,
            drawCommands: groups.clip_args ?? "",
        }),
    },
    {
        regex: regex.regexFsp,
        parse: (groups): TagFsp => {
            const value = Number(groups.fsp_value ?? "0");
            return {
                name: TagName.fsp,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexPos,
        parse: (groups): TagPos => ({
            name: TagName.pos,
            x: Number(groups.pos_x ?? "0"),
            y: Number(groups.pos_y ?? "0"),
        }),
    },
    {
        regex: regex.regexOrg,
        parse: (groups): TagOrg => ({
            name: TagName.org,
            x: Number(groups.org_x ?? "0"),
            y: Number(groups.org_y ?? "0"),
        }),
    },
    {
        regex: regex.regexFad,
        parse: (groups): TagFad => ({
            name: TagName.fad,
            in: Number(groups.in ?? "0"),
            out: Number(groups.out ?? "0"),
        }),
    },
    {
        regex: regex.regexFrx,
        parse: (groups): TagFrx => {
            const value = Number(groups.frx_value ?? "0");
            return {
                name: TagName.frx,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFry,
        parse: (groups): TagFry => {
            const value = Number(groups.fry_value ?? "0");
            return {
                name: TagName.fry,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFrz,
        parse: (groups): TagFrz => {
            const value = Number(groups.frz_value ?? "0");
            return {
                name: TagName.frz,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFax,
        parse: (groups): TagFax => {
            const value = Number(groups.fax_value ?? "0");
            return {
                name: TagName.fax,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFay,
        parse: (groups): TagFay => {
            const value = Number(groups.fay_value ?? "0");
            return {
                name: TagName.fay,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexPbo,
        parse: (groups): TagPbo => {
            const value = Number(groups.pbo_value ?? "0");
            return {
                name: TagName.pbo,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFe,
        parse: (groups): TagFe => ({
            name: TagName.fe,
            encodingId: Number(groups.fe_value ?? "0"),
        }),
    },
    {
        regex: regex.regexFn,
        parse: (groups): TagFn => ({
            name: TagName.fn,
            font: groups.fn_value ?? "",
        }),
    },
    {
        regex: regex.regexAn,
        parse: (groups): TagAn => {
            const value = Number(groups.an_value ?? "0");
            return {
                name: TagName.an,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexBe,
        parse: (groups): TagBe => {
            const value = Number(groups.be_value ?? "0");
            return {
                name: TagName.be,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFr,
        parse: (groups): TagFr => {
            const value = Number(groups.fr_value ?? "0");
            return {
                name: TagName.fr,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexFs,
        parse: (groups): TagFs => {
            const value = Number(groups.fs_value ?? "0");
            return {
                name: TagName.fs,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexKo,
        parse: (groups): TagKo => {
            const value = Number(groups.ko_value ?? "0");
            return {
                name: TagName.ko,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexKf,
        parse: (groups): TagKf => {
            const value = Number(groups.kf_value ?? "0");
            return {
                name: TagName.kf,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexColor1,
        parse: (groups): Tag1c => ({
            name: TagName.color1,
            blue: Number(hexToNumber(groups.color1_bgr_blue ?? "0")),
            green: Number(hexToNumber(groups.color1_bgr_green ?? "0")),
            red: Number(hexToNumber(groups.color1_bgr_red ?? "0")),
        }),
    },
    {
        regex: regex.regexColor2,
        parse: (groups): Tag2c => ({
            name: TagName.color2,
            blue: Number(hexToNumber(groups.color2_bgr_blue ?? "0")),
            green: Number(hexToNumber(groups.color2_bgr_green ?? "0")),
            red: Number(hexToNumber(groups.color2_bgr_red ?? "0")),
        }),
    },
    {
        regex: regex.regexColor3,
        parse: (groups): Tag3c => ({
            name: TagName.color3,
            blue: Number(hexToNumber(groups.color3_bgr_blue ?? "0")),
            green: Number(hexToNumber(groups.color3_bgr_green ?? "0")),
            red: Number(hexToNumber(groups.color3_bgr_red ?? "0")),
        }),
    },
    {
        regex: regex.regexColor4,
        parse: (groups): Tag4c => ({
            name: TagName.color4,
            blue: Number(hexToNumber(groups.color4_bgr_blue ?? "0")),
            green: Number(hexToNumber(groups.color4_bgr_green ?? "0")),
            red: Number(hexToNumber(groups.color4_bgr_red ?? "0")),
        }),
    },
    {
        regex: regex.regexAlpha1,
        parse: (groups): Tag1a => ({
            name: TagName.alpha1,
            value: groups.alpha1_value ?? "",
        }),
    },
    {
        regex: regex.regexAlpha2,
        parse: (groups): Tag2a => ({
            name: TagName.alpha2,
            value: groups.alpha2_value ?? "",
        }),
    },
    {
        regex: regex.regexAlpha3,
        parse: (groups): Tag3a => ({
            name: TagName.alpha3,
            value: groups.alpha3_value ?? "",
        }),
    },
    {
        regex: regex.regexAlpha4,
        parse: (groups): Tag4a => ({
            name: TagName.alpha4,
            value: groups.alpha4_value ?? "",
        }),
    },
    {
        regex: regex.regexKLowerCase,
        parse: (groups): TagKLowerCase => {
            const value = Number(groups.k_lower_case_value ?? "0");
            return {
                name: TagName.kLowerCase,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexKUpperCase,
        parse: (groups): TagKUpperCase => {
            const value = Number(groups.k_upper_case_value ?? "0");
            return {
                name: TagName.kUpperCase,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexQ,
        parse: (groups): TagQ => {
            const value = Number(groups.q_value ?? "0");
            return {
                name: TagName.q,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexS,
        parse: (groups): TagS => {
            const value = Number(groups.s_value ?? "0");
            return {
                name: TagName.s,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexU,
        parse: (groups): TagU => {
            const value = Number(groups.u_value ?? "0");
            return {
                name: TagName.u,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexR,
        parse: (groups): TagR => ({
            name: TagName.r,
            style: groups.r_value ?? "",
        }),
    },
    {
        regex: regex.regexP,
        parse: (groups): TagP => {
            const value = Number(groups.p_value ?? "0");
            return {
                name: TagName.p,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexI,
        parse: (groups): TagI => {
            const value = Number(groups.i_value ?? "0");
            return {
                name: TagName.i,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexColor,
        parse: (groups): TagC => ({
            name: TagName.color,
            blue: Number(hexToNumber(groups.color_bgr_blue ?? "0")),
            green: Number(hexToNumber(groups.color_bgr_green ?? "0")),
            red: Number(hexToNumber(groups.color_bgr_red ?? "0")),
        }),
    },
    {
        regex: regex.regexB,
        parse: (groups): TagB => {
            const value = Number(groups.b_value ?? "0");
            return {
                name: TagName.b,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
    {
        regex: regex.regexA,
        parse: (groups): TagA => {
            const value = Number(groups.a_value ?? "0");
            return {
                name: TagName.a,
                value: Number.isNaN(value) ? 0 : value,
            };
        },
    },
];

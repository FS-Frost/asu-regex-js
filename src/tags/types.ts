export type ColorBGR = {
    blue: number;
    green: number;
    red: number;
};

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

export type TagClipRect = {
    name: TagName.clip;
    type: "rect";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type TagClipVector = {
    name: TagName.clip;
    type: "vector";
    scale: number | null;
    commands: string;
};

export type TagClip = TagClipRect | TagClipVector;

export type TagIclipRect = {
    name: TagName.iclip;
    type: "rect";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type TagIclipVector = {
    name: TagName.iclip;
    type: "vector";
    scale: number | null;
    commands: string;
};

export type TagIclip = TagIclipRect | TagIclipVector;

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

export type Tags =
    | TagA
    | TagAn
    | TagB
    | TagBlur
    | TagBord
    | TagXbord
    | TagYbord
    | TagC
    | Tag1c
    | Tag2c
    | Tag3c
    | Tag4c
    | TagAlpha
    | Tag1a
    | Tag2a
    | Tag3a
    | Tag4a
    | TagClip
    | TagIclip
    | TagFad
    | TagFade
    | TagFax
    | TagFay
    | TagFe
    | TagFn
    | TagFscx
    | TagFscy
    | TagFsp
    | TagKLowerCase
    | TagKUpperCase
    | TagKf
    | TagKo
    | TagOrg
    | TagP
    | TagPbo
    | TagQ
    | TagR
    | TagS
    | TagShad
    | TagXshad
    | TagYshad
    | TagU
    | TagUnknown
    | TagBe
    | TagFr
    | TagFrx
    | TagFry
    | TagFrz
    | TagI
    | TagFs
    | TagT
    | TagText
    | TagPos
    | TagMove;

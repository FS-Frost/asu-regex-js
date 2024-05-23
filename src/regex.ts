import { anyOf, char, charNotIn, createRegExp, digit, exactly, letter, oneOrMore } from "magic-regexp";

export const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

export const regexText = /^[^\\]+/g;

// Dialogue: 0,0:00:00.00,0:00:05.00,Default,actor,1,2,3,fx,TEXT
// Comment: 0,0:00:00.00,0:00:05.00,Default,actor,1,2,3,fx,{\pos(182,421)}LINEA 1

const reTime =
    // 0:
    oneOrMore(digit).and(exactly(":"))
        // 00:00
        .and(digit.times(2)).and(exactly(":"))
        // 00.00
        .and(digit.times(2)).and(exactly(".")).and(digit.times(2));

const reLine =
    anyOf("Dialogue", "Comment").groupedAs("type")
        .and(exactly(": "))
        .and(oneOrMore(digit).optionally().groupedAs("layer"))
        .and(exactly(","))
        .and(reTime.optionally().groupedAs("start"))
        .and(exactly(","))
        .and(reTime.optionally().groupedAs("end"))
        .and(exactly(","))
        .and(oneOrMore(charNotIn(",").optionally()).groupedAs("style"))
        .and(exactly(","))
        .and(oneOrMore(charNotIn(",")).optionally().groupedAs("actor"))
        .and(exactly(","))
        .and(oneOrMore(digit).optionally().groupedAs("marginLeft"))
        .and(exactly(","))
        .and(oneOrMore(digit).optionally().groupedAs("marginRight"))
        .and(exactly(","))
        .and(oneOrMore(digit).optionally().groupedAs("marginVertical"))
        .and(exactly(","))
        .and(oneOrMore(charNotIn(",")).optionally().groupedAs("effect"))
        .and(exactly(","))
        .and(oneOrMore(char).optionally().groupedAs("content"))
    ;

export const regexLine = createRegExp(reLine) as RegExp;

const reInt = exactly("-").optionally().and(oneOrMore(digit));

const reFloat = reInt.and(exactly(".").and(oneOrMore(digit)).optionally());

const reA = exactly("\\").and("a").and(reFloat);

const reHex = letter.or(digit).times(2);

const reColorBGR = exactly("&H")
    .and(reHex.groupedAs("color_bgr_blue"))
    .and(reHex.groupedAs("color_bgr_green"))
    .and(reHex.groupedAs("color_bgr_red"))
    .and(exactly("&"));

const reColor = exactly("\\c").and(reColorBGR);

const reColor1 = exactly("\\1c").and(exactly("&H"))
    .and(reHex.groupedAs("color1_bgr_blue"))
    .and(reHex.groupedAs("color1_bgr_green"))
    .and(reHex.groupedAs("color1_bgr_red"))
    .and(exactly("&"));

const reColor2 = exactly("\\2c").and(exactly("&H"))
    .and(reHex.groupedAs("color2_bgr_blue"))
    .and(reHex.groupedAs("color2_bgr_green"))
    .and(reHex.groupedAs("color2_bgr_red"))
    .and(exactly("&"));

const reColor3 = exactly("\\3c").and(exactly("&H"))
    .and(reHex.groupedAs("color3_bgr_blue"))
    .and(reHex.groupedAs("color3_bgr_green"))
    .and(reHex.groupedAs("color3_bgr_red"))
    .and(exactly("&"));

const reColor4 = exactly("\\4c").and(exactly("&H"))
    .and(reHex.groupedAs("color4_bgr_blue"))
    .and(reHex.groupedAs("color4_bgr_green"))
    .and(reHex.groupedAs("color4_bgr_red"))
    .and(exactly("&"));

export const regexColorBGR = createRegExp(reColorBGR) as RegExp;

export const regexColor = createRegExp(reColor) as RegExp;

export const regexColor1 = createRegExp(reColor1) as RegExp;

export const regexColor2 = createRegExp(reColor2) as RegExp;

export const regexColor3 = createRegExp(reColor3) as RegExp;

export const regexColor4 = createRegExp(reColor4) as RegExp;

const reAlpha = exactly("\\").and("alpha").and(oneOrMore(charNotIn("\\")));

const reAlpha1 = exactly("\\").and("1a").and(oneOrMore(charNotIn("\\")));

const reAlpha2 = exactly("\\").and("2a").and(oneOrMore(charNotIn("\\")));

const reAlpha3 = exactly("\\").and("3a").and(oneOrMore(charNotIn("\\")));

const reAlpha4 = exactly("\\").and("4a").and(oneOrMore(charNotIn("\\")));

const reKLowerCase = exactly("\\").and("k").and(reFloat);

const reKUpperCase = exactly("\\").and("K").and(reFloat);

const reKf = exactly("\\").and("kf").and(reFloat);

const reKo = exactly("\\").and("ko").and(reFloat);

const reQ = exactly("\\").and("q").and(reFloat);

const reS = exactly("\\").and("s").and(reFloat);

const reU = exactly("\\").and("u").and(reFloat);

const reR = exactly("\\").and("r").and(oneOrMore(charNotIn("\\")));

const reFe = exactly("\\").and("fe").and(reFloat);

const reFn = exactly("\\").and("fn").and(oneOrMore(charNotIn("\\")));

const reP = exactly("\\").and("p").and(reFloat);

const rePbo = exactly("\\").and("pbo").and(reFloat);

const reAn = exactly("\\").and("an").and(reFloat);

const reB = exactly("\\").and("b").and(reFloat);

const reBe = exactly("\\").and("be").and(reFloat);

const reBlur = exactly("\\").and("blur").and(reFloat);

const reBord = exactly("\\").and("bord").and(reFloat);

const reXbord = exactly("\\").and("xbord").and(reFloat);

const reYbord = exactly("\\").and("ybord").and(reFloat);

const reShad = exactly("\\").and("shad").and(reFloat);

const reXshad = exactly("\\").and("xshad").and(reFloat);

const reYshad = exactly("\\").and("yshad").and(reFloat);

const reFax = exactly("\\").and("fax").and(reFloat);

const reFay = exactly("\\").and("fay").and(reFloat);

const reFscx = exactly("\\").and("fscx").and(reFloat);

const reFscy = exactly("\\").and("fscy").and(reFloat);

const reFsp = exactly("\\").and("fsp").and(reFloat);

const reFr = exactly("\\").and("fr").and(reFloat);

const reFrx = exactly("\\").and("frx").and(reFloat);

const reFry = exactly("\\").and("fry").and(reFloat);

const reFrz = exactly("\\").and("frz").and(reFloat);

const reI = exactly("\\").and("i").and(exactly("1").or("0"));

const reFs = exactly("\\").and("fs").and(reFloat);

const rePos = exactly("\\").and("pos").and(exactly("(")).and(reFloat.groupedAs("pos_x")).and(exactly(",")).and(reFloat.groupedAs("pos_y")).and(exactly(")"));

export const regexPos = createRegExp(rePos) as RegExp;

const reOrg = exactly("\\").and("org").and(exactly("(")).and(reFloat.groupedAs("org_x")).and(exactly(",")).and(reFloat.groupedAs("org_y")).and(exactly(")"));

export const regexOrg = createRegExp(reOrg) as RegExp;

const reFad = exactly("\\").and("fad").and(exactly("(")).and(reFloat.groupedAs("in")).and(exactly(",")).and(reFloat.groupedAs("out")).and(exactly(")"));

export const regexFad = createRegExp(reFad) as RegExp;

const reFade = exactly("\\").and("fade").and(exactly("(")).and(reFloat.groupedAs("fade_alpha1")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha2")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha3")).and(exactly(",")).and(reFloat.groupedAs("fade_t1")).and(exactly(",")).and(reFloat.groupedAs("fade_t2")).and(exactly(",")).and(reFloat.groupedAs("fade_t3")).and(exactly(",")).and(reFloat.groupedAs("fade_t4")).and(exactly(")"));

export const regexFade = createRegExp(reFade) as RegExp;

const reMoveTimeArgs = exactly(",").and(reFloat.groupedAs("move_t1")).and(exactly(",")).and(reFloat.groupedAs("move_t2")).optionally();

const reMove = exactly("\\").and("move").and(exactly("(")).and(reFloat.groupedAs("move_x1")).and(exactly(",")).and(reFloat.groupedAs("move_y1")).and(exactly(",")).and(reFloat.groupedAs("move_x2")).and(exactly(",")).and(reFloat.groupedAs("move_y2")).and(reMoveTimeArgs).and(exactly(")"));

export const regexMove = createRegExp(reMove) as RegExp;

const reClip = exactly("\\").and("clip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("clip_args")).and(exactly(")"));

export const regexClip = createRegExp(reClip) as RegExp;

const reIclip = exactly("\\").and("iclip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("iclip_args")).and(exactly(")"));

export const regexIclip = createRegExp(reIclip) as RegExp;

const reUnknown = exactly("\\").and(oneOrMore(charNotIn("\\")));

const unitTags = reBe
    .or(reAlpha)
    .or(reXbord)
    .or(reYbord)
    .or(reXshad)
    .or(reYshad)
    .or(reIclip)
    .or(reMove)
    .or(reBlur)
    .or(reBord)
    .or(reShad)
    .or(reFscx)
    .or(reFscy)
    .or(reFade)
    .or(reClip)
    .or(reFsp)
    .or(rePos)
    .or(reOrg)
    .or(reFad)
    .or(rePbo)
    .or(reFrx)
    .or(reFry)
    .or(reFrz)
    .or(reFax)
    .or(reFay)
    .or(reKo)
    .or(reKf)
    .or(reFr)
    .or(reFs)
    .or(reFe)
    .or(reFn)
    .or(reAn)
    .or(reColor1)
    .or(reColor2)
    .or(reColor3)
    .or(reColor4)
    .or(reAlpha1)
    .or(reAlpha2)
    .or(reAlpha3)
    .or(reAlpha4)
    .or(reColor)
    .or(reQ)
    .or(reU)
    .or(reS)
    .or(reP)
    .or(reR)
    .or(reI)
    .or(reB)
    .or(reA)
    .or(reKLowerCase)
    .or(reKUpperCase)
    .or(reUnknown);

const reTGeneral = exactly("\\").at.lineStart()
    .and("t")
    .and(exactly("("))
    .and(reFloat.groupedAs("arg1").and(exactly(",")).optionally())
    .and(reFloat.groupedAs("arg2").and(exactly(",")).optionally())
    .and(reFloat.groupedAs("arg3").and(exactly(",")).optionally())
    .and(oneOrMore(unitTags).groupedAs("tags"))
    .and(exactly(")"));

export const regexTags = createRegExp(unitTags) as RegExp;

export const regexTagT = createRegExp(reTGeneral) as RegExp;

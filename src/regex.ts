import { anyOf, char, charNotIn, createRegExp, digit, exactly, letter, oneOrMore } from "magic-regexp";

export const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

export const regexText = /^[^\\]+/g;

export const regexRomaji = /(?<sil>(?:sha|shi|shu|she|sho|cha|chi|chu|che|cho|tsu|kya|kyi|kyu|kye|kyo|gya|gyi|gyu|gye|gyo|sya|syu|syi|sye|syo|zya|zyu|zyi|zye|zyo|jya|jyu|jyi|jye|jyo|tya|tyi|tyu|tye|tyo|dya|dyi|dyu|dye|dyo|nya|nyi|nyu|nye|nyo|hya|hyi|hyu|hye|hyo|fya|fyi|fyu|fye|fyo|bya|byi|byu|bye|byo|pya|pyi|pyu|pye|pyo|mya|myi|myu|mye|myo|rya|ryi|ryu|rye|ryo|vya|vyi|vyu|vye|vyo|ka|ki|ku|ke|ko|ga|gi|gu|ge|go|sa|su|si|se|so|za|zu|zi|ze|zo|ja|ju|ji|je|jo|ta|ti|tu|te|to|da|di|du|de|do|na|ni|nu|ne|no|ha|hi|hu|he|ho|fa|fi|fu|fe|fo|ba|bi|bu|be|bo|pa|pi|pu|pe|po|ma|mi|mu|me|mo|ya|yi|yu|ye|yo|ra|ri|ru|re|ro|wa|wo|va|vi|vu|ve|vo|a|i|u|e|o|n|t)[^a-zA-Z\d\s:]*\s?)/g;

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

const reA = exactly("\\").and("a").and(reFloat.groupedAs("a_value"));

export const regexA = createRegExp(reA) as RegExp;

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

const reAlpha = exactly("\\").and("alpha").and(oneOrMore(charNotIn("\\")).groupedAs("alpha_value"));

export const regexAlpha = createRegExp(reAlpha) as RegExp;

const reAlpha1 = exactly("\\").and("1a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha1_value"));

export const regexAlpha1 = createRegExp(reAlpha1) as RegExp;

const reAlpha2 = exactly("\\").and("2a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha2_value"));

export const regexAlpha2 = createRegExp(reAlpha2) as RegExp;

const reAlpha3 = exactly("\\").and("3a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha3_value"));

export const regexAlpha3 = createRegExp(reAlpha3) as RegExp;

const reAlpha4 = exactly("\\").and("4a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha4_value"));

export const regexAlpha4 = createRegExp(reAlpha4) as RegExp;

const reKLowerCase = exactly("\\").and("k").and(reFloat.groupedAs("k_lower_case_value"));

export const regexKLowerCase = createRegExp(reKLowerCase) as RegExp;

const reKUpperCase = exactly("\\").and("K").and(reFloat.groupedAs("k_upper_case_value"));

export const regexKUpperCase = createRegExp(reKUpperCase) as RegExp;

const reKf = exactly("\\").and("kf").and(reFloat.groupedAs("kf_value"));

export const regexKf = createRegExp(reKf) as RegExp;

const reKo = exactly("\\").and("ko").and(reFloat.groupedAs("ko_value"));

export const regexKo = createRegExp(reKo) as RegExp;

const reQ = exactly("\\").and("q").and(reFloat.groupedAs("q_value"));

export const regexQ = createRegExp(reQ) as RegExp;

const reS = exactly("\\").and("s").and(reFloat.groupedAs("s_value"));

export const regexS = createRegExp(reS) as RegExp;

const reU = exactly("\\").and("u").and(reFloat.groupedAs("u_value"));

export const regexU = createRegExp(reU) as RegExp;

const reR = exactly("\\").and("r").and(oneOrMore(charNotIn("\\")).groupedAs("r_value"));

export const regexR = createRegExp(reR) as RegExp;

const reFe = exactly("\\").and("fe").and(reFloat.groupedAs("fe_value"));

export const regexFe = createRegExp(reFe) as RegExp;

const reFn = exactly("\\").and("fn").and(oneOrMore(charNotIn("\\")).groupedAs("fn_value"));

export const regexFn = createRegExp(reFn) as RegExp;

const reP = exactly("\\").and("p").and(reFloat.groupedAs("p_value"));

export const regexP = createRegExp(reP) as RegExp;

const rePbo = exactly("\\").and("pbo").and(reFloat.groupedAs("pbo_value"));

export const regexPbo = createRegExp(rePbo) as RegExp;

const reAn = exactly("\\").and("an").and(reFloat.groupedAs("an_value"));

export const regexAn = createRegExp(reAn) as RegExp;

const reB = exactly("\\").and("b").and(reFloat.groupedAs("b_value"));

export const regexB = createRegExp(reB) as RegExp;

const reBe = exactly("\\").and("be").and(reFloat.groupedAs("be_value"));

export const regexBe = createRegExp(reBe) as RegExp;

const reBlur = exactly("\\").and("blur").and(reFloat.groupedAs("blur_value"));

export const regexBlur = createRegExp(reBlur) as RegExp;

const reBord = exactly("\\").and("bord").and(reFloat.groupedAs("bord_value"));

export const regexBord = createRegExp(reBord) as RegExp;

const reXbord = exactly("\\").and("xbord").and(reFloat.groupedAs("xbord_value"));

export const regexXbord = createRegExp(reXbord) as RegExp;

const reYbord = exactly("\\").and("ybord").and(reFloat.groupedAs("ybord_value"));

export const regexYbord = createRegExp(reYbord) as RegExp;

const reShad = exactly("\\").and("shad").and(reFloat.groupedAs("shad_value"));

export const regexShad = createRegExp(reShad) as RegExp;

const reXshad = exactly("\\").and("xshad").and(reFloat.groupedAs("xshad_value"));

export const regexXshad = createRegExp(reXshad) as RegExp;

const reYshad = exactly("\\").and("yshad").and(reFloat.groupedAs("yshad_value"));

export const regexYshad = createRegExp(reYshad) as RegExp;

const reFax = exactly("\\").and("fax").and(reFloat.groupedAs("fax_value"));

export const regexFax = createRegExp(reFax) as RegExp;

const reFay = exactly("\\").and("fay").and(reFloat.groupedAs("fay_value"));

export const regexFay = createRegExp(reFay) as RegExp;

const reFscx = exactly("\\").and("fscx").and(reFloat.groupedAs("fscx_value"));

export const regexFscx = createRegExp(reFscx) as RegExp;

const reFscy = exactly("\\").and("fscy").and(reFloat.groupedAs("fscy_value"));

export const regexFscy = createRegExp(reFscy) as RegExp;

const reFsp = exactly("\\").and("fsp").and(reFloat.groupedAs("fsp_value"));

export const regexFsp = createRegExp(reFsp) as RegExp;

const reFr = exactly("\\").and("fr").and(reFloat.groupedAs("fr_value"));

export const regexFr = createRegExp(reFr) as RegExp;

const reFrx = exactly("\\").and("frx").and(reFloat.groupedAs("frx_value"));

export const regexFrx = createRegExp(reFrx) as RegExp;

const reFry = exactly("\\").and("fry").and(reFloat.groupedAs("fry_value"));

export const regexFry = createRegExp(reFry) as RegExp;

const reFrz = exactly("\\").and("frz").and(reFloat.groupedAs("frz_value"));

export const regexFrz = createRegExp(reFrz) as RegExp;

const reI = exactly("\\").and("i").and(exactly("1").or("0").groupedAs("i_value"));

export const regexI = createRegExp(reI) as RegExp;

const reFs = exactly("\\").and("fs").and(reFloat.groupedAs("fs_value"));

export const regexFs = createRegExp(reFs) as RegExp;

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

const reUnknown = exactly("\\").and(oneOrMore(charNotIn("\\")).groupedAs("unknown_value"));

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

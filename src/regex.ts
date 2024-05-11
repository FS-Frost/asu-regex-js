import { charNotIn, createRegExp, digit, exactly, oneOrMore } from "magic-regexp";

export const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

export const reInt = exactly("-").optionally().and(oneOrMore(digit));

export const reFloat = reInt.and(exactly(".").and(oneOrMore(digit)).optionally());

export const reA = exactly("\\").and("a").and(oneOrMore(digit));

export const reColor = exactly("\\").and("c").and(oneOrMore(charNotIn("\\")));

export const reColor1 = exactly("\\").and("1c").and(oneOrMore(charNotIn("\\")));

export const reColor2 = exactly("\\").and("2c").and(oneOrMore(charNotIn("\\")));

export const reColor3 = exactly("\\").and("3c").and(oneOrMore(charNotIn("\\")));

export const reColor4 = exactly("\\").and("4c").and(oneOrMore(charNotIn("\\")));

export const reAlpha = exactly("\\").and("alpha").and(oneOrMore(charNotIn("\\")));

export const reAlpha1 = exactly("\\").and("1a").and(oneOrMore(charNotIn("\\")));

export const reAlpha2 = exactly("\\").and("2a").and(oneOrMore(charNotIn("\\")));

export const reAlpha3 = exactly("\\").and("3a").and(oneOrMore(charNotIn("\\")));

export const reAlpha4 = exactly("\\").and("4a").and(oneOrMore(charNotIn("\\")));

export const reKLowerCase = exactly("\\").and("k").and(oneOrMore(digit));

export const reKUpperCase = exactly("\\").and("K").and(oneOrMore(digit));

export const reKf = exactly("\\").and("kf").and(oneOrMore(digit));

export const reKo = exactly("\\").and("ko").and(oneOrMore(digit));

export const reQ = exactly("\\").and("q").and(oneOrMore(digit));

export const reS = exactly("\\").and("s").and(oneOrMore(digit));

export const reU = exactly("\\").and("u").and(oneOrMore(digit));

export const reR = exactly("\\").and("r").and(oneOrMore(charNotIn("\\")));

export const reFe = exactly("\\").and("fe").and(oneOrMore(digit));

export const reFn = exactly("\\").and("fn").and(oneOrMore(charNotIn("\\")));

export const reP = exactly("\\").and("p").and(oneOrMore(digit));

export const rePbo = exactly("\\").and("pbo").and(oneOrMore(digit));

export const reAn = exactly("\\").and("an").and(oneOrMore(digit));

export const reB = exactly("\\").and("b").and(oneOrMore(digit));

export const reBe = exactly("\\").and("be").and(oneOrMore(digit));

export const reBlur = exactly("\\").and("blur").and(oneOrMore(digit));

export const reBord = exactly("\\").and("bord").and(oneOrMore(digit));

export const reXbord = exactly("\\").and("xbord").and(oneOrMore(digit));

export const reYbord = exactly("\\").and("ybord").and(oneOrMore(digit));

export const reShad = exactly("\\").and("shad").and(oneOrMore(digit));

export const reXshad = exactly("\\").and("xshad").and(oneOrMore(digit));

export const reYshad = exactly("\\").and("yshad").and(oneOrMore(digit));

export const reFax = exactly("\\").and("fax").and(oneOrMore(digit));

export const reFay = exactly("\\").and("fay").and(oneOrMore(digit));

export const reFscx = exactly("\\").and("fscx").and(oneOrMore(digit));

export const reFscy = exactly("\\").and("fscy").and(oneOrMore(digit));

export const reFsp = exactly("\\").and("fsp").and(oneOrMore(digit));

export const reFr = exactly("\\").and("fr").and(reFloat);

export const reFrx = exactly("\\").and("frx").and(reFloat);

export const reFry = exactly("\\").and("fry").and(reFloat);

export const reFrz = exactly("\\").and("frz").and(reFloat);

export const reI = exactly("\\").and("i").and(exactly("1").or("0"));

export const reFs = exactly("\\").and("fs").and(oneOrMore(digit));

export const rePos = exactly("\\").and("pos").and(exactly("(")).and(reFloat.groupedAs("x")).and(exactly(",")).and(reFloat.groupedAs("y")).and(exactly(")"));

export const reOrg = exactly("\\").and("org").and(exactly("(")).and(reFloat.groupedAs("x")).and(exactly(",")).and(reFloat.groupedAs("y")).and(exactly(")"));

export const reFad = exactly("\\").and("fad").and(exactly("(")).and(reFloat.groupedAs("in")).and(exactly(",")).and(reFloat.groupedAs("out")).and(exactly(")"));

export const reFade = exactly("\\").and("fade").and(exactly("(")).and(reFloat.groupedAs("fade_alpha1")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha2")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha3")).and(exactly(",")).and(reFloat.groupedAs("fade_t1")).and(exactly(",")).and(reFloat.groupedAs("fade_t2")).and(exactly(",")).and(reFloat.groupedAs("fade_t3")).and(exactly(",")).and(reFloat.groupedAs("fade_t4")).and(exactly(")"));

export const reMoveTimeArgs = exactly(",").and(reFloat.groupedAs("move_t1")).and(exactly(",")).and(reFloat.groupedAs("move_t2")).optionally();

export const reMove = exactly("\\").and("move").and(exactly("(")).and(reFloat.groupedAs("x1")).and(exactly(",")).and(reFloat.groupedAs("y1")).and(exactly(",")).and(reFloat.groupedAs("x2")).and(exactly(",")).and(reFloat.groupedAs("y2")).and(reMoveTimeArgs).and(exactly(")"));

export const reClip = exactly("\\").and("clip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("args")).and(exactly(")"));

export const reIclip = exactly("\\").and("iclip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("args")).and(exactly(")"));

export const unitTags = reBe
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
    .or(reKUpperCase);

export const reTFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reTAccelFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(digit).groupedAs("accel")).and(exactly(",")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reTTimeAccelFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(digit).groupedAs("t1")).and(exactly(",")).and(oneOrMore(digit).groupedAs("t2")).and(exactly(",")).and(oneOrMore(digit).groupedAs("accel")).and(exactly(",")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reT = reTFx
    .or(reTAccelFx).or(reTTimeAccelFx);

export const regexTags = createRegExp(unitTags.or(reT));

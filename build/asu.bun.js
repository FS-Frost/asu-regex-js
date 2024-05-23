// @bun
// src/mat.ts
function hexToNumber(s) {
  return parseInt(s, 16);
}
function numberToHex(n) {
  const int = Math.floor(n);
  return int.toString(16).padStart(2, "0").toUpperCase();
}
function interpolate(min, max, intervals) {
  const reverse = min > max;
  let actualMax = max;
  let actualMin = min;
  if (reverse) {
    actualMax = min;
    actualMin = max;
  }
  const range = actualMax - actualMin;
  const step = range / intervals;
  let sum = actualMin;
  const interpolations = [actualMin];
  for (let i = 1;i < intervals; i++) {
    sum += step;
    if (sum > actualMax) {
      sum = actualMax;
    }
    interpolations.push(sum);
  }
  interpolations[intervals - 1] = actualMax;
  if (reverse) {
    interpolations.reverse();
  }
  return interpolations;
}

// node_modules/magic-regexp/dist/shared/magic-regexp.b7c910ac.mjs
var NO_WRAP_RE = /^(\(.*\)|\\?.)$/;
var wrap = (s) => {
  const v = s.toString();
  return NO_WRAP_RE.test(v) ? v : `(?:${v})`;
};
var GROUPED_AS_REPLACE_RE = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/;
var GROUPED_REPLACE_RE = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
var createInput = (s) => {
  const groupedAsFn = (key) => createInput(`(?<${key}>${`${s}`.replace(GROUPED_AS_REPLACE_RE, "$1$2")})`);
  return {
    toString: () => s.toString(),
    and: Object.assign((...inputs) => createInput(`${s}${exactly(...inputs)}`), {
      referenceTo: (groupName) => createInput(`${s}\\k<${groupName}>`)
    }),
    or: (...inputs) => createInput(`(?:${s}|${exactly(...inputs)})`),
    after: (...input) => createInput(`(?<=${exactly(...input)})${s}`),
    before: (...input) => createInput(`${s}(?=${exactly(...input)})`),
    notAfter: (...input) => createInput(`(?<!${exactly(...input)})${s}`),
    notBefore: (...input) => createInput(`${s}(?!${exactly(...input)})`),
    times: Object.assign((number) => createInput(`${wrap(s)}{${number}}`), {
      any: () => createInput(`${wrap(s)}*`),
      atLeast: (min) => createInput(`${wrap(s)}{${min},}`),
      atMost: (max) => createInput(`${wrap(s)}{0,${max}}`),
      between: (min, max) => createInput(`${wrap(s)}{${min},${max}}`)
    }),
    optionally: () => createInput(`${wrap(s)}?`),
    as: groupedAsFn,
    groupedAs: groupedAsFn,
    grouped: () => createInput(`${s}`.replace(GROUPED_REPLACE_RE, "($1$3)$2")),
    at: {
      lineStart: () => createInput(`^${s}`),
      lineEnd: () => createInput(`${s}\$`)
    }
  };
};
var ESCAPE_REPLACE_RE = /[.*+?^${}()|[\]\\/]/g;
var charNotIn = (chars) => createInput(`[^${chars.replace(/[-\\^\]]/g, "\\$&")}]`);
var anyOf = (...inputs) => createInput(`(?:${inputs.map((a) => exactly(a)).join("|")})`);
var char = createInput(".");
var word = createInput("\\b\\w+\\b");
var wordChar = createInput("\\w");
var wordBoundary = createInput("\\b");
var digit = createInput("\\d");
var whitespace = createInput("\\s");
var letter = Object.assign(createInput("[a-zA-Z]"), {
  lowercase: createInput("[a-z]"),
  uppercase: createInput("[A-Z]")
});
var tab = createInput("\\t");
var linefeed = createInput("\\n");
var carriageReturn = createInput("\\r");
var not = {
  word: createInput("\\W+"),
  wordChar: createInput("\\W"),
  wordBoundary: createInput("\\B"),
  digit: createInput("\\D"),
  whitespace: createInput("\\S"),
  letter: Object.assign(createInput("[^a-zA-Z]"), {
    lowercase: createInput("[^a-z]"),
    uppercase: createInput("[^A-Z]")
  }),
  tab: createInput("[^\\t]"),
  linefeed: createInput("[^\\n]"),
  carriageReturn: createInput("[^\\r]")
};
var exactly = (...inputs) => createInput(inputs.map((input) => typeof input === "string" ? input.replace(ESCAPE_REPLACE_RE, "\\$&") : input).join(""));
var oneOrMore = (...inputs) => createInput(`${wrap(exactly(...inputs))}+`);

// node_modules/magic-regexp/dist/index.mjs
var createRegExp = (...inputs) => {
  const flags = inputs.length > 1 && (Array.isArray(inputs[inputs.length - 1]) || inputs[inputs.length - 1] instanceof Set) ? inputs.pop() : undefined;
  return new RegExp(exactly(...inputs).toString(), [...flags || ""].join(""));
};

// src/regex.ts
var regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;
var regexText = /^[^\\]+/g;
var reTime = oneOrMore(digit).and(exactly(":")).and(digit.times(2)).and(exactly(":")).and(digit.times(2)).and(exactly(".")).and(digit.times(2));
var reLine = anyOf("Dialogue", "Comment").groupedAs("type").and(exactly(": ")).and(oneOrMore(digit).optionally().groupedAs("layer")).and(exactly(",")).and(reTime.optionally().groupedAs("start")).and(exactly(",")).and(reTime.optionally().groupedAs("end")).and(exactly(",")).and(oneOrMore(charNotIn(",").optionally()).groupedAs("style")).and(exactly(",")).and(oneOrMore(charNotIn(",")).optionally().groupedAs("actor")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginLeft")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginRight")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginVertical")).and(exactly(",")).and(oneOrMore(charNotIn(",")).optionally().groupedAs("effect")).and(exactly(",")).and(oneOrMore(char).optionally().groupedAs("content"));
var regexLine = createRegExp(reLine);
var reInt = exactly("-").optionally().and(oneOrMore(digit));
var reFloat = reInt.and(exactly(".").and(oneOrMore(digit)).optionally());
var reA = exactly("\\").and("a").and(reFloat);
var reHex = letter.or(digit).times(2);
var reColorBGR = exactly("&H").and(reHex.groupedAs("color_bgr_blue")).and(reHex.groupedAs("color_bgr_green")).and(reHex.groupedAs("color_bgr_red")).and(exactly("&"));
var reColor = exactly("\\c").and(reColorBGR);
var reColor1 = exactly("\\1c").and(exactly("&H")).and(reHex.groupedAs("color1_bgr_blue")).and(reHex.groupedAs("color1_bgr_green")).and(reHex.groupedAs("color1_bgr_red")).and(exactly("&"));
var reColor2 = exactly("\\2c").and(exactly("&H")).and(reHex.groupedAs("color2_bgr_blue")).and(reHex.groupedAs("color2_bgr_green")).and(reHex.groupedAs("color2_bgr_red")).and(exactly("&"));
var reColor3 = exactly("\\3c").and(exactly("&H")).and(reHex.groupedAs("color3_bgr_blue")).and(reHex.groupedAs("color3_bgr_green")).and(reHex.groupedAs("color3_bgr_red")).and(exactly("&"));
var reColor4 = exactly("\\4c").and(exactly("&H")).and(reHex.groupedAs("color4_bgr_blue")).and(reHex.groupedAs("color4_bgr_green")).and(reHex.groupedAs("color4_bgr_red")).and(exactly("&"));
var regexColorBGR = createRegExp(reColorBGR);
var regexColor = createRegExp(reColor);
var regexColor1 = createRegExp(reColor1);
var regexColor2 = createRegExp(reColor2);
var regexColor3 = createRegExp(reColor3);
var regexColor4 = createRegExp(reColor4);
var reAlpha = exactly("\\").and("alpha").and(oneOrMore(charNotIn("\\")));
var reAlpha1 = exactly("\\").and("1a").and(oneOrMore(charNotIn("\\")));
var reAlpha2 = exactly("\\").and("2a").and(oneOrMore(charNotIn("\\")));
var reAlpha3 = exactly("\\").and("3a").and(oneOrMore(charNotIn("\\")));
var reAlpha4 = exactly("\\").and("4a").and(oneOrMore(charNotIn("\\")));
var reKLowerCase = exactly("\\").and("k").and(reFloat);
var reKUpperCase = exactly("\\").and("K").and(reFloat);
var reKf = exactly("\\").and("kf").and(reFloat);
var reKo = exactly("\\").and("ko").and(reFloat);
var reQ = exactly("\\").and("q").and(reFloat);
var reS = exactly("\\").and("s").and(reFloat);
var reU = exactly("\\").and("u").and(reFloat);
var reR = exactly("\\").and("r").and(oneOrMore(charNotIn("\\")));
var reFe = exactly("\\").and("fe").and(reFloat);
var reFn = exactly("\\").and("fn").and(oneOrMore(charNotIn("\\")));
var reP = exactly("\\").and("p").and(reFloat);
var rePbo = exactly("\\").and("pbo").and(reFloat);
var reAn = exactly("\\").and("an").and(reFloat);
var reB = exactly("\\").and("b").and(reFloat);
var reBe = exactly("\\").and("be").and(reFloat);
var reBlur = exactly("\\").and("blur").and(reFloat);
var reBord = exactly("\\").and("bord").and(reFloat);
var reXbord = exactly("\\").and("xbord").and(reFloat);
var reYbord = exactly("\\").and("ybord").and(reFloat);
var reShad = exactly("\\").and("shad").and(reFloat);
var reXshad = exactly("\\").and("xshad").and(reFloat);
var reYshad = exactly("\\").and("yshad").and(reFloat);
var reFax = exactly("\\").and("fax").and(reFloat);
var reFay = exactly("\\").and("fay").and(reFloat);
var reFscx = exactly("\\").and("fscx").and(reFloat);
var reFscy = exactly("\\").and("fscy").and(reFloat);
var reFsp = exactly("\\").and("fsp").and(reFloat);
var reFr = exactly("\\").and("fr").and(reFloat);
var reFrx = exactly("\\").and("frx").and(reFloat);
var reFry = exactly("\\").and("fry").and(reFloat);
var reFrz = exactly("\\").and("frz").and(reFloat);
var reI = exactly("\\").and("i").and(exactly("1").or("0"));
var reFs = exactly("\\").and("fs").and(reFloat);
var rePos = exactly("\\").and("pos").and(exactly("(")).and(reFloat.groupedAs("pos_x")).and(exactly(",")).and(reFloat.groupedAs("pos_y")).and(exactly(")"));
var regexPos = createRegExp(rePos);
var reOrg = exactly("\\").and("org").and(exactly("(")).and(reFloat.groupedAs("org_x")).and(exactly(",")).and(reFloat.groupedAs("org_y")).and(exactly(")"));
var regexOrg = createRegExp(reOrg);
var reFad = exactly("\\").and("fad").and(exactly("(")).and(reFloat.groupedAs("in")).and(exactly(",")).and(reFloat.groupedAs("out")).and(exactly(")"));
var regexFad = createRegExp(reFad);
var reFade = exactly("\\").and("fade").and(exactly("(")).and(reFloat.groupedAs("fade_alpha1")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha2")).and(exactly(",")).and(reFloat.groupedAs("fade_alpha3")).and(exactly(",")).and(reFloat.groupedAs("fade_t1")).and(exactly(",")).and(reFloat.groupedAs("fade_t2")).and(exactly(",")).and(reFloat.groupedAs("fade_t3")).and(exactly(",")).and(reFloat.groupedAs("fade_t4")).and(exactly(")"));
var regexFade = createRegExp(reFade);
var reMoveTimeArgs = exactly(",").and(reFloat.groupedAs("move_t1")).and(exactly(",")).and(reFloat.groupedAs("move_t2")).optionally();
var reMove = exactly("\\").and("move").and(exactly("(")).and(reFloat.groupedAs("move_x1")).and(exactly(",")).and(reFloat.groupedAs("move_y1")).and(exactly(",")).and(reFloat.groupedAs("move_x2")).and(exactly(",")).and(reFloat.groupedAs("move_y2")).and(reMoveTimeArgs).and(exactly(")"));
var regexMove = createRegExp(reMove);
var reClip = exactly("\\").and("clip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("clip_args")).and(exactly(")"));
var regexClip = createRegExp(reClip);
var reIclip = exactly("\\").and("iclip").and(exactly("(")).and(oneOrMore(charNotIn(")")).groupedAs("iclip_args")).and(exactly(")"));
var regexIclip = createRegExp(reIclip);
var reUnknown = exactly("\\").and(oneOrMore(charNotIn("\\")));
var unitTags = reBe.or(reAlpha).or(reXbord).or(reYbord).or(reXshad).or(reYshad).or(reIclip).or(reMove).or(reBlur).or(reBord).or(reShad).or(reFscx).or(reFscy).or(reFade).or(reClip).or(reFsp).or(rePos).or(reOrg).or(reFad).or(rePbo).or(reFrx).or(reFry).or(reFrz).or(reFax).or(reFay).or(reKo).or(reKf).or(reFr).or(reFs).or(reFe).or(reFn).or(reAn).or(reColor1).or(reColor2).or(reColor3).or(reColor4).or(reAlpha1).or(reAlpha2).or(reAlpha3).or(reAlpha4).or(reColor).or(reQ).or(reU).or(reS).or(reP).or(reR).or(reI).or(reB).or(reA).or(reKLowerCase).or(reKUpperCase).or(reUnknown);
var reTGeneral = exactly("\\").at.lineStart().and("t").and(exactly("(")).and(reFloat.groupedAs("arg1").and(exactly(",")).optionally()).and(reFloat.groupedAs("arg2").and(exactly(",")).optionally()).and(reFloat.groupedAs("arg3").and(exactly(",")).optionally()).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));
var regexTags = createRegExp(unitTags);
var regexTagT = createRegExp(reTGeneral);

// src/asu.ts
function parseTags(text, tags) {
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
      value
    });
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
    const tag = {
      name: TagName.move,
      x1,
      y1,
      x2,
      y2,
      t1,
      t2
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.alpha)) {
    const value = matchUnitTags[0].substring(1 + TagName.alpha.length);
    const tag = {
      name: TagName.alpha,
      value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.xbord)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.xbord.length));
    const tag = {
      name: TagName.xbord,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.ybord)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.ybord.length));
    const tag = {
      name: TagName.ybord,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.xshad)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.xshad.length));
    const tag = {
      name: TagName.xshad,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.yshad)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.yshad.length));
    const tag = {
      name: TagName.yshad,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.iclip)) {
    const match = matchUnitTags[0].match(regexIclip)?.groups;
    const args = match?.iclip_args ?? "";
    const tag = {
      name: TagName.iclip,
      drawCommands: args
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.blur)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.blur.length));
    const tag = {
      name: TagName.blur,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.bord)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.bord.length));
    const tag = {
      name: TagName.bord,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.shad)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.shad.length));
    const tag = {
      name: TagName.shad,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fscx)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fscx.length));
    const tag = {
      name: TagName.fscx,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fscy)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fscy.length));
    const tag = {
      name: TagName.fscy,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fade)) {
    const match = matchUnitTags[0].match(regexFade)?.groups;
    const alpha1 = Number(match?.fade_alpha1 ?? "0");
    const alpha2 = Number(match?.fade_alpha2 ?? "0");
    const alpha3 = Number(match?.fade_alpha3 ?? "0");
    const t1 = Number(match?.fade_t1 ?? "0");
    const t2 = Number(match?.fade_t2 ?? "0");
    const t3 = Number(match?.fade_t3 ?? "0");
    const t4 = Number(match?.fade_t4 ?? "0");
    const tag = {
      name: TagName.fade,
      alpha1,
      alpha2,
      alpha3,
      t1,
      t2,
      t3,
      t4
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.clip)) {
    const match = matchUnitTags[0].match(regexClip)?.groups;
    const args = match?.clip_args ?? "";
    const tag = {
      name: TagName.clip,
      drawCommands: args
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fsp)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fsp.length));
    const tag = {
      name: TagName.fsp,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.pos)) {
    const match = matchUnitTags[0].match(regexPos)?.groups;
    const x = Number(match?.pos_x ?? "0");
    const y = Number(match?.pos_y ?? "0");
    const tag = {
      name: TagName.pos,
      x,
      y
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.org)) {
    const match = matchUnitTags[0].match(regexOrg)?.groups;
    const x = Number(match?.org_x ?? "0");
    const y = Number(match?.org_y ?? "0");
    const tag = {
      name: TagName.org,
      x,
      y
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fad)) {
    const match = matchUnitTags[0].match(regexFad)?.groups;
    const fadeIn = Number(match?.in ?? "0");
    const fadeOut = Number(match?.out ?? "0");
    const tag = {
      name: TagName.fad,
      in: fadeIn,
      out: fadeOut
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.frx)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.frx.length));
    const tag = {
      name: TagName.frx,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fry)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fry.length));
    const tag = {
      name: TagName.fry,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.frz)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.frz.length));
    const tag = {
      name: TagName.frz,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fax)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fax.length));
    const tag = {
      name: TagName.fax,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fay)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fay.length));
    const tag = {
      name: TagName.fay,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.pbo)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.pbo.length));
    const tag = {
      name: TagName.pbo,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fe)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fe.length));
    const tag = {
      name: TagName.fe,
      encodingId: Number(value)
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fn)) {
    const value = matchUnitTags[0].substring(1 + TagName.fn.length);
    const tag = {
      name: TagName.fn,
      font: value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.an)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.be.length));
    const tag = {
      name: TagName.an,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.be)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.be.length));
    const tag = {
      name: TagName.be,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fr)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fr.length));
    const tag = {
      name: TagName.fr,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.fs)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.fs.length));
    const tag = {
      name: TagName.fs,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.ko)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.ko.length));
    const tag = {
      name: TagName.ko,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.kf)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.kf.length));
    const tag = {
      name: TagName.kf,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.color1)) {
    const groups = matchUnitTags[0].match(regexColor1)?.groups;
    const blue = Number(hexToNumber(groups?.color1_bgr_blue ?? "0"));
    const green = Number(hexToNumber(groups?.color1_bgr_green ?? "0"));
    const red = Number(hexToNumber(groups?.color1_bgr_red ?? "0"));
    const tag = {
      name: TagName.color1,
      blue,
      green,
      red
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.color2)) {
    const groups = matchUnitTags[0].match(regexColor2)?.groups;
    const blue = Number(hexToNumber(groups?.color2_bgr_blue ?? "0"));
    const green = Number(hexToNumber(groups?.color2_bgr_green ?? "0"));
    const red = Number(hexToNumber(groups?.color2_bgr_red ?? "0"));
    const tag = {
      name: TagName.color2,
      blue,
      green,
      red
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.color3)) {
    const groups = matchUnitTags[0].match(regexColor3)?.groups;
    const blue = Number(hexToNumber(groups?.color3_bgr_blue ?? "0"));
    const green = Number(hexToNumber(groups?.color3_bgr_green ?? "0"));
    const red = Number(hexToNumber(groups?.color3_bgr_red ?? "0"));
    const tag = {
      name: TagName.color3,
      blue,
      green,
      red
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.color4)) {
    const groups = matchUnitTags[0].match(regexColor4)?.groups;
    const blue = Number(hexToNumber(groups?.color4_bgr_blue ?? "0"));
    const green = Number(hexToNumber(groups?.color4_bgr_green ?? "0"));
    const red = Number(hexToNumber(groups?.color4_bgr_red ?? "0"));
    const tag = {
      name: TagName.color4,
      blue,
      green,
      red
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.alpha1)) {
    const value = matchUnitTags[0].substring(1 + TagName.alpha1.length);
    const tag = {
      name: TagName.alpha1,
      value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.alpha2)) {
    const value = matchUnitTags[0].substring(1 + TagName.alpha2.length);
    const tag = {
      name: TagName.alpha2,
      value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.alpha3)) {
    const value = matchUnitTags[0].substring(1 + TagName.alpha3.length);
    const tag = {
      name: TagName.alpha3,
      value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.alpha4)) {
    const value = matchUnitTags[0].substring(1 + TagName.alpha4.length);
    const tag = {
      name: TagName.alpha4,
      value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.kLowerCase)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.kLowerCase.length));
    const tag = {
      name: TagName.kLowerCase,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.kUpperCase)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.kUpperCase.length));
    const tag = {
      name: TagName.kUpperCase,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.q)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.q.length));
    const tag = {
      name: TagName.q,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.s)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.s.length));
    const tag = {
      name: TagName.s,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.u)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.u.length));
    const tag = {
      name: TagName.u,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.r)) {
    const value = matchUnitTags[0].substring(1 + TagName.r.length);
    const tag = {
      name: TagName.r,
      style: value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.p)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.p.length));
    const tag = {
      name: TagName.p,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.i)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.i.length));
    const tag = {
      name: TagName.i,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.color)) {
    const groups = matchUnitTags[0].match(regexColor)?.groups;
    const blue = Number(hexToNumber(groups?.color_bgr_blue ?? "0"));
    const green = Number(hexToNumber(groups?.color_bgr_green ?? "0"));
    const red = Number(hexToNumber(groups?.color_bgr_red ?? "0"));
    const tag = {
      name: TagName.color,
      blue,
      green,
      red
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.b)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.b.length));
    const tag = {
      name: TagName.b,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else if (tagNameSource.startsWith(TagName.a)) {
    const value = Number(matchUnitTags[0].substring(1 + TagName.a.length));
    const tag = {
      name: TagName.a,
      value: Number.isNaN(value) ? 0 : value
    };
    tags.push(tag);
  } else {
    const value = matchUnitTags[0];
    const tag = {
      name: TagName.unknown,
      value
    };
    tags.push(tag);
  }
  text = text.substring(matchUnitTags[0].length);
  if (text.length > 0) {
    parseTags(text, tags);
  }
  return tags;
}
var parseTagT = function(text, tags, tagNameSource, matchTagT) {
  if (tagNameSource.startsWith(TagName.t)) {
    const match = matchTagT[0].match(regexTagT)?.groups;
    const rawTags = match?.tags ?? "";
    const subtags = [];
    parseTags(rawTags, subtags);
    const arg1 = match?.arg1 ? Number(match.arg1) : null;
    const arg2 = match?.arg2 ? Number(match.arg2) : null;
    const arg3 = match?.arg3 ? Number(match.arg3) : null;
    const tag = {
      name: TagName.t,
      accel: null,
      t1: null,
      t2: null,
      tags: subtags
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
};
function parseContent(text) {
  const items = [];
  const result = text.matchAll(regexContent);
  for (const match of result) {
    if (match.groups?.fx) {
      const rawTags = match.groups.fx.substring(1, match.groups.fx.length - 1);
      const tags = [];
      parseTags(rawTags, tags);
      items.push({
        name: "effect",
        tags
      });
      continue;
    }
    if (match.groups?.txt) {
      items.push({
        name: "text",
        value: match.groups?.txt
      });
      continue;
    }
  }
  return items;
}
function contentEffectToString(item) {
  let s = "";
  for (const tag of item.tags) {
    switch (tag.name) {
      case TagName.t:
        const subeffect = {
          name: "effect",
          tags: tag.tags
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
function contentsToString(items) {
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
function findA(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.a;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findB(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.b;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findColor(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.color;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findColor1(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.color1;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findColor2(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.color2;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findColor3(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.color3;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findColor4(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.color4;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAlpha(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.alpha;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAlpha1(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.alpha1;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAlpha2(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.alpha2;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAlpha3(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.alpha3;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAlpha4(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.alpha4;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findAn(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.an;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findBe(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.be;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findBlur(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.blur;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findBord(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.bord;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findXbord(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.xbord;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findYbord(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.ybord;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findShad(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.shad;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findXshad(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.xshad;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findYshad(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.yshad;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFr(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fr;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFrx(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.frx;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFry(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fry;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFrz(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.frz;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFax(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fax;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFay(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fay;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findP(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.p;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findPbo(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.pbo;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findQ(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.q;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findS(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.s;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findU(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.u;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findR(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.r;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFe(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fe;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFn(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fn;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFscx(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fscx;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFscy(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fscy;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFsp(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fsp;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findKLowerCase(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.kLowerCase;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findKUpperCase(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.kUpperCase;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findKo(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.ko;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findKf(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.kf;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findI(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.i;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFs(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fs;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findPos(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.pos;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findOrg(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.org;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFad(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fad;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findFade(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.fade;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findClip(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.clip;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findIclip(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.iclip;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findMove(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.move;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function findT(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = TagName.t;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function setA(items, newValue) {
  const defaultTag = {
    name: TagName.a,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setAn(items, newValue) {
  const defaultTag = {
    name: TagName.an,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setB(items, newValue) {
  const defaultTag = {
    name: TagName.b,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setColor(items, blue, green, red) {
  const defaultTag = {
    name: TagName.color,
    blue,
    green,
    red
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.blue = blue;
    tag.green = green;
    tag.red = red;
  }
  return tag;
}
function setColor1(items, blue, green, red) {
  const defaultTag = {
    name: TagName.color1,
    blue,
    green,
    red
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.blue = blue;
    tag.green = green;
    tag.red = red;
  }
  return tag;
}
function setColor2(items, blue, green, red) {
  const defaultTag = {
    name: TagName.color2,
    blue,
    green,
    red
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.blue = blue;
    tag.green = green;
    tag.red = red;
  }
  return tag;
}
function setColor3(items, blue, green, red) {
  const defaultTag = {
    name: TagName.color3,
    blue,
    green,
    red
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.blue = blue;
    tag.green = green;
    tag.red = red;
  }
  return tag;
}
function setColor4(items, blue, green, red) {
  const defaultTag = {
    name: TagName.color4,
    blue,
    green,
    red
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.blue = blue;
    tag.green = green;
    tag.red = red;
  }
  return tag;
}
function setAlpha(items, newValue) {
  const defaultTag = {
    name: TagName.alpha,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setAlpha1(items, newValue) {
  const defaultTag = {
    name: TagName.alpha1,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setAlpha2(items, newValue) {
  const defaultTag = {
    name: TagName.alpha2,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setAlpha3(items, newValue) {
  const defaultTag = {
    name: TagName.alpha3,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setAlpha4(items, newValue) {
  const defaultTag = {
    name: TagName.alpha4,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setBlur(items, newValue) {
  const defaultTag = {
    name: TagName.blur,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setBord(items, newValue) {
  const defaultTag = {
    name: TagName.bord,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setXbord(items, newValue) {
  const defaultTag = {
    name: TagName.xbord,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setYbord(items, newValue) {
  const defaultTag = {
    name: TagName.ybord,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFax(items, newValue) {
  const defaultTag = {
    name: TagName.fax,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFay(items, newValue) {
  const defaultTag = {
    name: TagName.fay,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFscx(items, newValue) {
  const defaultTag = {
    name: TagName.fscx,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFscy(items, newValue) {
  const defaultTag = {
    name: TagName.fscy,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFsp(items, newValue) {
  const defaultTag = {
    name: TagName.fsp,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFe(items, encodingId) {
  const defaultTag = {
    name: TagName.fe,
    encodingId
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.encodingId = encodingId;
  }
  return tag;
}
function setFn(items, font) {
  const defaultTag = {
    name: TagName.fn,
    font
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.font = font;
  }
  return tag;
}
function setKLowerCase(items, newValue) {
  const defaultTag = {
    name: TagName.kLowerCase,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setKUpperCase(items, newValue) {
  const defaultTag = {
    name: TagName.kUpperCase,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setKf(items, newValue) {
  const defaultTag = {
    name: TagName.kf,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setKo(items, newValue) {
  const defaultTag = {
    name: TagName.ko,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setP(items, newValue) {
  const defaultTag = {
    name: TagName.p,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setPbo(items, newValue) {
  const defaultTag = {
    name: TagName.pbo,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setQ(items, newValue) {
  const defaultTag = {
    name: TagName.q,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setS(items, newValue) {
  const defaultTag = {
    name: TagName.s,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setShad(items, newValue) {
  const defaultTag = {
    name: TagName.shad,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setXshad(items, newValue) {
  const defaultTag = {
    name: TagName.xshad,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setYshad(items, newValue) {
  const defaultTag = {
    name: TagName.yshad,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setU(items, newValue) {
  const defaultTag = {
    name: TagName.u,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setBe(items, newValue) {
  const defaultTag = {
    name: TagName.be,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFs(items, newValue) {
  const defaultTag = {
    name: TagName.fs,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFr(items, newValue) {
  const defaultTag = {
    name: TagName.fr,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFrx(items, newValue) {
  const defaultTag = {
    name: TagName.frx,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFry(items, newValue) {
  const defaultTag = {
    name: TagName.fry,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setFrz(items, newValue) {
  const defaultTag = {
    name: TagName.frz,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setI(items, newValue) {
  const defaultTag = {
    name: TagName.i,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setR(items, style) {
  const defaultTag = {
    name: TagName.r,
    style
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.style = style;
  }
  return tag;
}
function setPos(items, x, y) {
  const defaultTag = {
    name: TagName.pos,
    x,
    y
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.x = x;
    tag.y = y;
  }
  return tag;
}
function setOrg(items, x, y) {
  const defaultTag = {
    name: TagName.org,
    x,
    y
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.x = x;
    tag.y = y;
  }
  return tag;
}
function setFad(items, fadeIn, fadeOut) {
  const defaultTag = {
    name: TagName.fad,
    in: fadeIn,
    out: fadeOut
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.in = fadeIn;
    tag.out = fadeOut;
  }
  return tag;
}
function setFade(items, alpha1, alpha2, alpha3, t1, t2, t3, t4) {
  const defaultTag = {
    name: TagName.fade,
    alpha1,
    alpha2,
    alpha3,
    t1,
    t2,
    t3,
    t4
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
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
function setClip(items, drawCommands) {
  const defaultTag = {
    name: TagName.clip,
    drawCommands
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.drawCommands = drawCommands;
  }
  return tag;
}
function setIclip(items, drawCommands) {
  const defaultTag = {
    name: TagName.iclip,
    drawCommands
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.drawCommands = drawCommands;
  }
  return tag;
}
function setMove(items, x1, y1, x2, y2, t1 = null, t2 = null) {
  const defaultTag = {
    name: TagName.move,
    x1,
    y1,
    x2,
    y2,
    t1,
    t2
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
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
function setT(items, tags, accel = null, t1 = null, t2 = null) {
  const defaultTag = {
    name: TagName.t,
    t1,
    t2,
    accel,
    tags
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.t1 = t1;
    tag.t2 = t2;
    tag.accel = accel;
    tag.tags = tags;
  }
  return tag;
}
function tagsToItems(tags) {
  const items = [
    {
      name: "effect",
      tags
    }
  ];
  return items;
}
function itemsToTags(items) {
  const fx = items.find((x) => x.name === "effect");
  if (fx == null || fx.name != "effect") {
    return [];
  }
  return fx.tags;
}
var setTag = function(items, tagName, defaultTag) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    items.unshift({
      name: "effect",
      tags: [defaultTag]
    });
    return [true, defaultTag];
  }
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    fx.tags.push(defaultTag);
    return [true, defaultTag];
  }
  return [false, tag];
};
function removeTag(items, tagName) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return;
  }
  const index = fx.tags.findIndex((tag) => tag.name === tagName);
  if (index < 0) {
    return;
  }
  fx.tags.splice(index, 1);
}
function parseLine(text) {
  const match = text.match(regexLine);
  if (match == null) {
    return null;
  }
  const groups = match.groups;
  const line = {
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
    content: groups?.content ?? ""
  };
  return line;
}
function lineToString(line) {
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
function parseColorBGR(text) {
  const match = text.match(regexColorBGR);
  if (match == null) {
    return null;
  }
  const groups = match.groups;
  const color = {
    blue: hexToNumber(groups?.color_bgr_blue ?? ""),
    green: hexToNumber(groups?.color_bgr_green ?? ""),
    red: hexToNumber(groups?.color_bgr_red ?? "")
  };
  return color;
}
var TagName;
(function(TagName2) {
  TagName2["a"] = "a";
  TagName2["alpha"] = "alpha";
  TagName2["alpha1"] = "1a";
  TagName2["alpha2"] = "2a";
  TagName2["alpha3"] = "3a";
  TagName2["alpha4"] = "4a";
  TagName2["an"] = "an";
  TagName2["b"] = "b";
  TagName2["be"] = "be";
  TagName2["blur"] = "blur";
  TagName2["bord"] = "bord";
  TagName2["clip"] = "clip";
  TagName2["color"] = "c";
  TagName2["color1"] = "1c";
  TagName2["color2"] = "2c";
  TagName2["color3"] = "3c";
  TagName2["color4"] = "4c";
  TagName2["fad"] = "fad";
  TagName2["fade"] = "fade";
  TagName2["fax"] = "fax";
  TagName2["fay"] = "fay";
  TagName2["fe"] = "fe";
  TagName2["fn"] = "fn";
  TagName2["fr"] = "fr";
  TagName2["frx"] = "frx";
  TagName2["fry"] = "fry";
  TagName2["frz"] = "frz";
  TagName2["fs"] = "fs";
  TagName2["fscx"] = "fscx";
  TagName2["fscy"] = "fscy";
  TagName2["fsp"] = "fsp";
  TagName2["i"] = "i";
  TagName2["iclip"] = "iclip";
  TagName2["kLowerCase"] = "k";
  TagName2["kUpperCase"] = "K";
  TagName2["kf"] = "kf";
  TagName2["ko"] = "ko";
  TagName2["move"] = "move";
  TagName2["org"] = "org";
  TagName2["p"] = "p";
  TagName2["pbo"] = "pbo";
  TagName2["pos"] = "pos";
  TagName2["q"] = "q";
  TagName2["r"] = "r";
  TagName2["s"] = "s";
  TagName2["shad"] = "shad";
  TagName2["t"] = "t";
  TagName2["text"] = "text";
  TagName2["u"] = "u";
  TagName2["unknown"] = "unknown";
  TagName2["xbord"] = "xbord";
  TagName2["xshad"] = "xshad";
  TagName2["ybord"] = "ybord";
  TagName2["yshad"] = "yshad";
})(TagName || (TagName = {}));
export {
  tagsToItems,
  setYshad,
  setYbord,
  setXshad,
  setXbord,
  setU,
  setT,
  setShad,
  setS,
  setR,
  setQ,
  setPos,
  setPbo,
  setP,
  setOrg,
  setMove,
  setKo,
  setKf,
  setKUpperCase,
  setKLowerCase,
  setIclip,
  setI,
  setFsp,
  setFscy,
  setFscx,
  setFs,
  setFrz,
  setFry,
  setFrx,
  setFr,
  setFn,
  setFe,
  setFay,
  setFax,
  setFade,
  setFad,
  setColor4,
  setColor3,
  setColor2,
  setColor1,
  setColor,
  setClip,
  setBord,
  setBlur,
  setBe,
  setB,
  setAn,
  setAlpha4,
  setAlpha3,
  setAlpha2,
  setAlpha1,
  setAlpha,
  setA,
  removeTag,
  parseTags,
  parseLine,
  parseContent,
  parseColorBGR,
  numberToHex,
  lineToString,
  itemsToTags,
  interpolate,
  hexToNumber,
  findYshad,
  findYbord,
  findXshad,
  findXbord,
  findU,
  findT,
  findShad,
  findS,
  findR,
  findQ,
  findPos,
  findPbo,
  findP,
  findOrg,
  findMove,
  findKo,
  findKf,
  findKUpperCase,
  findKLowerCase,
  findIclip,
  findI,
  findFsp,
  findFscy,
  findFscx,
  findFs,
  findFrz,
  findFry,
  findFrx,
  findFr,
  findFn,
  findFe,
  findFay,
  findFax,
  findFade,
  findFad,
  findColor4,
  findColor3,
  findColor2,
  findColor1,
  findColor,
  findClip,
  findBord,
  findBlur,
  findBe,
  findB,
  findAn,
  findAlpha4,
  findAlpha3,
  findAlpha2,
  findAlpha1,
  findAlpha,
  findA,
  contentsToString,
  contentEffectToString,
  TagName
};

//# debugId=CFD84E71F5E3932064756e2164756e21

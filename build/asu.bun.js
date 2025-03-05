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
    interpolations.push(sum);
  }
  interpolations[intervals - 1] = actualMax;
  if (reverse) {
    interpolations.reverse();
  }
  return interpolations;
}
function truncate(n, decimals) {
  decimals = Math.floor(decimals);
  const regexPattern = `(-?\\d+.?\\d{1,${decimals}})`;
  const regexNumber = new RegExp(regexPattern);
  const match = n.toString().match(regexNumber);
  if (!match || match.length === 0) {
    return n;
  }
  const truncatedNumber = Number(match[0]);
  return truncatedNumber;
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
      lineEnd: () => createInput(`${s}$`)
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
var regexRomaji = /(?<sil>(?:sha|shi|shu|she|sho|cha|chi|chu|che|cho|tsu|kya|kyi|kyu|kye|kyo|gya|gyi|gyu|gye|gyo|sya|syu|syi|sye|syo|zya|zyu|zyi|zye|zyo|jya|jyu|jyi|jye|jyo|tya|tyi|tyu|tye|tyo|dya|dyi|dyu|dye|dyo|nya|nyi|nyu|nye|nyo|hya|hyi|hyu|hye|hyo|fya|fyi|fyu|fye|fyo|dzu|bya|byi|byu|bye|byo|pya|pyi|pyu|pye|pyo|mya|myi|myu|mye|myo|rya|ryi|ryu|rye|ryo|vya|vyi|vyu|vye|vyo|ka|ki|ku|ke|ko|ga|gi|gu|ge|go|sa|su|si|se|so|za|zu|zi|ze|zo|ja|ju|ji|je|jo|ta|ti|tu|te|to|da|di|du|de|do|na|ni|nu|ne|no|ha|hi|hu|he|ho|fa|fi|fu|fe|fo|ba|bi|bu|be|bo|pa|pi|pu|pe|po|ma|mi|mu|me|mo|ya|yi|yu|ye|yo|ra|ri|ru|re|ro|wa|wo|va|vi|vu|ve|vo|a|i|u|e|o|n|t)[^a-zA-Z\d\s:]*\s?)/g;
var reTime = oneOrMore(digit).and(exactly(":")).and(digit.times(2)).and(exactly(":")).and(digit.times(2)).and(exactly(".")).and(digit.times(2));
var reLine = anyOf("Dialogue", "Comment").groupedAs("type").and(exactly(": ")).and(oneOrMore(digit).optionally().groupedAs("layer")).and(exactly(",")).and(reTime.optionally().groupedAs("start")).and(exactly(",")).and(reTime.optionally().groupedAs("end")).and(exactly(",")).and(oneOrMore(charNotIn(",").optionally()).groupedAs("style")).and(exactly(",")).and(oneOrMore(charNotIn(",")).optionally().groupedAs("actor")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginLeft")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginRight")).and(exactly(",")).and(oneOrMore(digit).optionally().groupedAs("marginVertical")).and(exactly(",")).and(oneOrMore(charNotIn(",")).optionally().groupedAs("effect")).and(exactly(",")).and(oneOrMore(char).optionally().groupedAs("content"));
var regexLine = createRegExp(reLine);
var reInt = exactly("-").optionally().and(oneOrMore(digit));
var reFloat = reInt.and(exactly(".").and(oneOrMore(digit)).optionally());
var reA = exactly("\\").and("a").and(reFloat.groupedAs("a_value"));
var regexA = createRegExp(reA);
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
var reAlpha = exactly("\\").and("alpha").and(oneOrMore(charNotIn("\\")).groupedAs("alpha_value"));
var regexAlpha = createRegExp(reAlpha);
var reAlpha1 = exactly("\\").and("1a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha1_value"));
var regexAlpha1 = createRegExp(reAlpha1);
var reAlpha2 = exactly("\\").and("2a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha2_value"));
var regexAlpha2 = createRegExp(reAlpha2);
var reAlpha3 = exactly("\\").and("3a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha3_value"));
var regexAlpha3 = createRegExp(reAlpha3);
var reAlpha4 = exactly("\\").and("4a").and(oneOrMore(charNotIn("\\")).groupedAs("alpha4_value"));
var regexAlpha4 = createRegExp(reAlpha4);
var reKLowerCase = exactly("\\").and("k").and(reFloat.groupedAs("k_lower_case_value"));
var regexKLowerCase = createRegExp(reKLowerCase);
var reKUpperCase = exactly("\\").and("K").and(reFloat.groupedAs("k_upper_case_value"));
var regexKUpperCase = createRegExp(reKUpperCase);
var reKf = exactly("\\").and("kf").and(reFloat.groupedAs("kf_value"));
var regexKf = createRegExp(reKf);
var reKo = exactly("\\").and("ko").and(reFloat.groupedAs("ko_value"));
var regexKo = createRegExp(reKo);
var reQ = exactly("\\").and("q").and(reFloat.groupedAs("q_value"));
var regexQ = createRegExp(reQ);
var reS = exactly("\\").and("s").and(reFloat.groupedAs("s_value"));
var regexS = createRegExp(reS);
var reU = exactly("\\").and("u").and(reFloat.groupedAs("u_value"));
var regexU = createRegExp(reU);
var reR = exactly("\\").and("r").and(oneOrMore(charNotIn("\\")).groupedAs("r_value"));
var regexR = createRegExp(reR);
var reFe = exactly("\\").and("fe").and(reFloat.groupedAs("fe_value"));
var regexFe = createRegExp(reFe);
var reFn = exactly("\\").and("fn").and(oneOrMore(charNotIn("\\")).groupedAs("fn_value"));
var regexFn = createRegExp(reFn);
var reP = exactly("\\").and("p").and(reFloat.groupedAs("p_value"));
var regexP = createRegExp(reP);
var rePbo = exactly("\\").and("pbo").and(reFloat.groupedAs("pbo_value"));
var regexPbo = createRegExp(rePbo);
var reAn = exactly("\\").and("an").and(reFloat.groupedAs("an_value"));
var regexAn = createRegExp(reAn);
var reB = exactly("\\").and("b").and(reFloat.groupedAs("b_value"));
var regexB = createRegExp(reB);
var reBe = exactly("\\").and("be").and(reFloat.groupedAs("be_value"));
var regexBe = createRegExp(reBe);
var reBlur = exactly("\\").and("blur").and(reFloat.groupedAs("blur_value"));
var regexBlur = createRegExp(reBlur);
var reBord = exactly("\\").and("bord").and(reFloat.groupedAs("bord_value"));
var regexBord = createRegExp(reBord);
var reXbord = exactly("\\").and("xbord").and(reFloat.groupedAs("xbord_value"));
var regexXbord = createRegExp(reXbord);
var reYbord = exactly("\\").and("ybord").and(reFloat.groupedAs("ybord_value"));
var regexYbord = createRegExp(reYbord);
var reShad = exactly("\\").and("shad").and(reFloat.groupedAs("shad_value"));
var regexShad = createRegExp(reShad);
var reXshad = exactly("\\").and("xshad").and(reFloat.groupedAs("xshad_value"));
var regexXshad = createRegExp(reXshad);
var reYshad = exactly("\\").and("yshad").and(reFloat.groupedAs("yshad_value"));
var regexYshad = createRegExp(reYshad);
var reFax = exactly("\\").and("fax").and(reFloat.groupedAs("fax_value"));
var regexFax = createRegExp(reFax);
var reFay = exactly("\\").and("fay").and(reFloat.groupedAs("fay_value"));
var regexFay = createRegExp(reFay);
var reFscx = exactly("\\").and("fscx").and(reFloat.groupedAs("fscx_value"));
var regexFscx = createRegExp(reFscx);
var reFscy = exactly("\\").and("fscy").and(reFloat.groupedAs("fscy_value"));
var regexFscy = createRegExp(reFscy);
var reFsp = exactly("\\").and("fsp").and(reFloat.groupedAs("fsp_value"));
var regexFsp = createRegExp(reFsp);
var reFr = exactly("\\").and("fr").and(reFloat.groupedAs("fr_value"));
var regexFr = createRegExp(reFr);
var reFrx = exactly("\\").and("frx").and(reFloat.groupedAs("frx_value"));
var regexFrx = createRegExp(reFrx);
var reFry = exactly("\\").and("fry").and(reFloat.groupedAs("fry_value"));
var regexFry = createRegExp(reFry);
var reFrz = exactly("\\").and("frz").and(reFloat.groupedAs("frz_value"));
var regexFrz = createRegExp(reFrz);
var reI = exactly("\\").and("i").and(exactly("1").or("0").groupedAs("i_value"));
var regexI = createRegExp(reI);
var reFs = exactly("\\").and("fs").and(reFloat.groupedAs("fs_value"));
var regexFs = createRegExp(reFs);
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
var reUnknown = exactly("\\").and(oneOrMore(charNotIn("\\")).groupedAs("unknown_value"));
var unitTags = reBe.or(reAlpha).or(reXbord).or(reYbord).or(reXshad).or(reYshad).or(reIclip).or(reMove).or(reBlur).or(reBord).or(reShad).or(reFscx).or(reFscy).or(reFade).or(reClip).or(reFsp).or(rePos).or(reOrg).or(reFad).or(rePbo).or(reFrx).or(reFry).or(reFrz).or(reFax).or(reFay).or(reKo).or(reKf).or(reFr).or(reFs).or(reFe).or(reFn).or(reAn).or(reColor1).or(reColor2).or(reColor3).or(reColor4).or(reAlpha1).or(reAlpha2).or(reAlpha3).or(reAlpha4).or(reColor).or(reQ).or(reU).or(reS).or(reP).or(reR).or(reI).or(reB).or(reA).or(reKLowerCase).or(reKUpperCase).or(reUnknown);
var reTGeneral = exactly("\\").at.lineStart().and("t").and(exactly("(")).and(reFloat.groupedAs("arg1").and(exactly(",")).optionally()).and(reFloat.groupedAs("arg2").and(exactly(",")).optionally()).and(reFloat.groupedAs("arg3").and(exactly(",")).optionally()).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));
var regexTags = createRegExp(unitTags);
var regexTagT = createRegExp(reTGeneral);

// src/time.ts
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 3600 - hours) * 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return {
    hours,
    minutes,
    seconds
  };
}
function parseTime(text) {
  const regexTime = /(?<h>\d+):(?<m>[0-9]{1,2}?):(?<s>[0-9]{1,2}(?:\.[0-9]{1,2})?)/;
  const match = text.match(regexTime);
  if (!match || match.length === 0) {
    return null;
  }
  const hours = Math.floor(Number(match.groups?.h ?? "0"));
  const minutes = Math.floor(Number(match.groups?.m ?? "0"));
  const seconds = Number(match.groups?.s ?? "0");
  const time = {
    hours,
    minutes,
    seconds
  };
  adjustTimeOverplus(time);
  return time;
}
function adjustTimeOverplus(time) {
  if (time.seconds >= 60) {
    time.seconds -= 60;
    time.minutes++;
  }
  if (time.minutes >= 60) {
    time.minutes -= 60;
    time.hours++;
  }
  if (time.hours >= 9) {
    time.hours = 9;
    time.minutes = 59;
    time.seconds = 59.99;
  }
}
function timeToString(time) {
  adjustTimeOverplus(time);
  const hours = time.hours.toFixed(0);
  const minutes = time.minutes.toFixed(0).padStart("00".length, "0");
  const seconds = time.seconds.toFixed(2).padStart("00.00".length, "0");
  return `${hours}:${minutes}:${seconds}`;
}
function timeToSeconds(time) {
  adjustTimeOverplus(time);
  const seconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
  return seconds;
}
function sumTimes(t1, t2) {
  const seconds1 = timeToSeconds(t1);
  const seconds2 = timeToSeconds(t2);
  const totalSeconds = seconds1 + seconds2;
  return secondsToTime(totalSeconds);
}
function subtractTimes(minuend, subtracting) {
  const minuendSeconds = timeToSeconds(minuend);
  const subtractingSeconds = timeToSeconds(subtracting);
  const deltaSeconds = minuendSeconds - subtractingSeconds;
  return secondsToTime(deltaSeconds);
}

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? undefined : errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === undefined ? undefined : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;

class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== undefined ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== undefined ? message : required_error) !== null && _a !== undefined ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== undefined ? message : invalid_type_error) !== null && _b !== undefined ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === undefined ? undefined : params.async) !== null && _a !== undefined ? _a : false,
        contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap
      },
      path: (params === null || params === undefined ? undefined : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if ((_b = (_a = err === null || err === undefined ? undefined : err.message) === null || _a === undefined ? undefined : _a.toLowerCase()) === null || _b === undefined ? undefined : _b.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap,
        async: true
      },
      path: (params === null || params === undefined ? undefined : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if (!decoded.typ || !decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch (_a) {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
      offset: (_a = options === null || options === undefined ? undefined : options.offset) !== null && _a !== undefined ? _a : false,
      local: (_b = options === null || options === undefined ? undefined : options.local) !== null && _b !== undefined ? _b : false,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === undefined ? undefined : options.position,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch (_a) {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === undefined ? undefined : _b.call(_a, issue, ctx).message) !== null && _c !== undefined ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== undefined ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, undefined);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
_ZodEnum_cache = new WeakMap;
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, undefined);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
_ZodNativeEnum_cache = new WeakMap;
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};

class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          var _a2, _b2;
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = (_b2 = (_a2 = params.fatal) !== null && _a2 !== undefined ? _a2 : fatal) !== null && _b2 !== undefined ? _b2 : true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = (_b = (_a = params.fatal) !== null && _a !== undefined ? _a : fatal) !== null && _b !== undefined ? _b : true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  enum: enumType,
  function: functionType,
  instanceof: instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  null: nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  undefined: undefinedType,
  union: unionType,
  unknown: unknownType,
  void: voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// src/assFile/alignment.ts
var Alignments;
((Alignments2) => {
  Alignments2[Alignments2["DOWN_LEFT"] = 1] = "DOWN_LEFT";
  Alignments2[Alignments2["DOWN_CENTER"] = 2] = "DOWN_CENTER";
  Alignments2[Alignments2["DOWN_RIGHT"] = 3] = "DOWN_RIGHT";
  Alignments2[Alignments2["CENTER_LEFT"] = 4] = "CENTER_LEFT";
  Alignments2[Alignments2["CENTER_CENTER"] = 5] = "CENTER_CENTER";
  Alignments2[Alignments2["CENTER_RIGHT"] = 6] = "CENTER_RIGHT";
  Alignments2[Alignments2["UP_LEFT"] = 7] = "UP_LEFT";
  Alignments2[Alignments2["UP_CENTER"] = 8] = "UP_CENTER";
  Alignments2[Alignments2["UP_RIGHT"] = 9] = "UP_RIGHT";
})(Alignments ||= {});
var Alignment = z.nativeEnum(Alignments);

// src/assFile/encoding.ts
var Encodings;
((Encodings2) => {
  Encodings2[Encodings2["ANSI"] = 0] = "ANSI";
  Encodings2[Encodings2["DEFAULT"] = 1] = "DEFAULT";
  Encodings2[Encodings2["SYMBOL"] = 2] = "SYMBOL";
  Encodings2[Encodings2["MAC"] = 77] = "MAC";
  Encodings2[Encodings2["SHIFT_JIS"] = 128] = "SHIFT_JIS";
  Encodings2[Encodings2["HANGEUL"] = 129] = "HANGEUL";
  Encodings2[Encodings2["JOHAB"] = 130] = "JOHAB";
  Encodings2[Encodings2["GB2312"] = 134] = "GB2312";
  Encodings2[Encodings2["CHINESE_BIG5"] = 136] = "CHINESE_BIG5";
  Encodings2[Encodings2["GREEK"] = 161] = "GREEK";
  Encodings2[Encodings2["TURKISH"] = 162] = "TURKISH";
  Encodings2[Encodings2["VIETNAMESE"] = 163] = "VIETNAMESE";
  Encodings2[Encodings2["HEBREW"] = 177] = "HEBREW";
  Encodings2[Encodings2["ARAB"] = 178] = "ARAB";
  Encodings2[Encodings2["BALTIC"] = 186] = "BALTIC";
  Encodings2[Encodings2["RUSSIAN"] = 204] = "RUSSIAN";
  Encodings2[Encodings2["THAI"] = 222] = "THAI";
  Encodings2[Encodings2["EASTERN_EUROPE"] = 238] = "EASTERN_EUROPE";
  Encodings2[Encodings2["OEM"] = 255] = "OEM";
})(Encodings ||= {});
var Encoding = z.nativeEnum(Encodings);

// src/assFile/sectionEvents.ts
function newSectionEvents() {
  return {
    format: "Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    lines: []
  };
}
function generateDefaultSectionEvents() {
  return {
    format: "Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    lines: [
      generateDefaultLine()
    ]
  };
}
function sectionEventsToString(info) {
  let s = "[Events]";
  s += `
Format: ${info.format}`;
  for (const line of info.lines) {
    s += `
${lineToString(line)}`;
  }
  return s;
}

// src/assFile/sectionExtraData.ts
function newSectionExtraData() {
  return {
    data: []
  };
}
function sectionExtraDataToString(info) {
  let s = "[Aegisub Extradata]";
  for (const datum of info.data) {
    s += `
Data: ${datum}`;
  }
  return s;
}

// src/assFile/attachedFont.ts
function AttachedFontToString(file) {
  let s = `fontname: ${file.name}`;
  for (const datum of file.data) {
    s += `
${datum}`;
  }
  return s;
}

// src/assFile/sectionFonts.ts
function newSectionFonts() {
  return {
    files: []
  };
}
function sectionFontsToString(info) {
  let s = `[Fonts]
`;
  let i = 0;
  for (const font of info.files) {
    if (i > 0) {
      s += `

`;
    }
    s += AttachedFontToString(font);
    i++;
  }
  s += `
`;
  return s;
}

// src/assFile/attachedGraphic.ts
function AttachedGraphicToString(file) {
  let s = `filename: ${file.name}`;
  for (const datum of file.data) {
    s += `
${datum}`;
  }
  return s;
}

// src/assFile/sectionGraphics.ts
function newSectionGraphics() {
  return {
    files: []
  };
}
function sectionGraphicsToString(info) {
  let s = `[Graphics]
`;
  let i = 0;
  for (const graphic of info.files) {
    if (i > 0) {
      s += `

`;
    }
    s += AttachedGraphicToString(graphic);
    i++;
  }
  return s;
}

// src/assFile/sectionProjectGarbage.ts
var ProjectGarbagePropertyAutomationScripts = "Automation Scripts";
var ProjectGarbagePropertyExportFilters = "Export Filters";
var ProjectGarbagePropertyExportEncoding = "Export Encoding";
var ProjectGarbagePropertyLastStyleStorage = "Last Style Storage";
var ProjectGarbagePropertyAudioFile = "Audio File";
var ProjectGarbagePropertyVideoFile = "Video File";
var ProjectGarbagePropertyTimecodesFile = "Timecodes File";
var ProjectGarbagePropertyKeyframesFile = "Keyframes File";
var ProjectGarbagePropertyVideoARMode = "Video AR Mode";
var ProjectGarbagePropertyVideoARValue = "Video AR Value";
var ProjectGarbagePropertyVideoZoomPercent = "Video Zoom Percent";
var ProjectGarbagePropertyScrollPosition = "Scroll Position";
var ProjectGarbagePropertyActiveLine = "Active Line";
var ProjectGarbagePropertyVideoPosition = "Video Position";
function newProjectGarbage() {
  return {
    comments: [],
    properties: new Map
  };
}
function sectionProjectGarbageToString(info) {
  let s = "[Aegisub Project Garbage]";
  for (const comment of info.comments) {
    s += `
; ${comment}`;
  }
  for (const [key, value] of info.properties) {
    s += `
${key}: ${value}`;
  }
  return s;
}

// src/assFile/sectionScriptInfo.ts
var ScriptInfoPropertyTitle = "Title";
var ScriptInfoPropertyScriptType = "ScriptType";
var ScriptInfoPropertyWrapStyle = "WrapStyle";
var ScriptInfoPropertyPlayResX = "PlayResX";
var ScriptInfoPropertyPlayResY = "PlayResY";
var ScriptInfoPropertyScaledBorderAndShadow = "ScaledBorderAndShadow";
var ScriptInfoPropertyYCbCrMatrix = "YCbCr Matrix";
var ScriptInfoPropertyOriginalScript = "Original Script";
var ScriptInfoPropertyOriginalTranslation = "Original Translation";
var ScriptInfoPropertyOriginalEditing = "Original Editing";
var ScriptInfoPropertyOriginalTiming = "Original Timing";
var ScriptInfoPropertySynchPoint = "Synch Point";
var ScriptInfoPropertyScriptUpdatedBy = "Script Updated By";
var ScriptInfoPropertyUpdateDetails = "Update Details";
function newScriptInfo() {
  return {
    comments: [],
    properties: new Map
  };
}
function generateDefaultSectionScriptInfo() {
  return {
    comments: [],
    properties: new Map([
      ["Title", "Default Aegisub file"],
      ["ScriptType", "v4.00+"],
      ["WrapStyle", "0"],
      ["ScaledBorderAndShadow", "yes"],
      ["YCbCr Matrix", "None"]
    ])
  };
}
function sectionScriptInfoToString(info) {
  let s = "[Script Info]";
  for (const comment of info.comments) {
    s += `
; ${comment}`;
  }
  for (const [key, value] of info.properties) {
    s += `
${key}: ${value}`;
  }
  return s;
}

// src/assFile/style.ts
function styleToString(style) {
  let s = `Style: ${style.name}`;
  s += `,${style.fontName}`;
  s += `,${style.fontSize}`;
  s += `,${style.primaryAlpha}`;
  s += `,${style.primaryColor}`;
  s += `,${style.secondaryAlpha}`;
  s += `,${style.secondaryColor}`;
  s += `,${style.outlineAlpha}`;
  s += `,${style.outlineColor}`;
  s += `,${style.backAlpha}`;
  s += `,${style.backColor}`;
  s += `,${style.bold}`;
  s += `,${style.italic}`;
  s += `,${style.underline}`;
  s += `,${style.strikeOut}`;
  s += `,${style.scaleX}`;
  s += `,${style.scaleY}`;
  s += `,${style.spacing}`;
  s += `,${style.angle}`;
  s += `,${style.borderStyle}`;
  s += `,${style.outline}`;
  s += `,${style.shadow}`;
  s += `,${style.alignment}`;
  s += `,${style.marginLeft}`;
  s += `,${style.marginRight}`;
  s += `,${style.marginVertical}`;
  s += `,${style.encoding}`;
  return s;
}

// src/assFile/sectionStyles.ts
function newSectionStyles() {
  return {
    format: "Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    styles: []
  };
}
function generateDefaultSectionStyles() {
  return {
    format: "Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    styles: [
      generateDefaultStyle()
    ]
  };
}
function sectionStylesToString(info) {
  let s = "[V4+ Styles]";
  s += `
Format: ${info.format}`;
  for (const style of info.styles) {
    s += `
${styleToString(style)}`;
  }
  return s;
}
function generateDefaultStyle() {
  return {
    name: "Default",
    fontName: "Arial",
    fontSize: 20,
    primaryAlpha: "&H00FFFFFF",
    primaryColor: "&H000000FF",
    secondaryAlpha: "&H00000000",
    secondaryColor: "&H00000000",
    outlineAlpha: "",
    outlineColor: "",
    backAlpha: "",
    backColor: "",
    bold: 0,
    italic: 0,
    underline: 0,
    strikeOut: 0,
    scaleX: 100,
    scaleY: 100,
    spacing: 0,
    angle: 0,
    borderStyle: 1,
    outline: 2,
    shadow: 2,
    alignment: 2 /* DOWN_CENTER */,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    encoding: 1 /* DEFAULT */
  };
}

// src/assFile/assFile.ts
var _scriptInfo = "[Script Info]";
var _projectGarbage = "[Aegisub Project Garbage]";
var _styles = "[V4+ Styles]";
var _graphics = "[Graphics]";
var _fonts = "[Fonts]";
var _events = "[Events]";
var _extraData = "[Aegisub Extradata]";
var _CommentStart = "; ";
var _DataStart = "Data: ";
function ASSFileToString(file) {
  let s = "";
  s += sectionScriptInfoToString(file.scriptInfo);
  s += `

` + sectionProjectGarbageToString(file.aegisubProjectGarbage);
  s += `

` + sectionStylesToString(file.styles);
  s += `

` + sectionFontsToString(file.fonts);
  s += `

` + sectionGraphicsToString(file.graphics);
  s += `

` + sectionEventsToString(file.events);
  s += `

` + sectionExtraDataToString(file.extraData);
  s += `
`;
  return s;
}
function parseASSFile(text) {
  const assFile = {
    scriptInfo: newScriptInfo(),
    aegisubProjectGarbage: newProjectGarbage(),
    styles: newSectionStyles(),
    fonts: newSectionFonts(),
    graphics: newSectionGraphics(),
    events: newSectionEvents(),
    extraData: newSectionExtraData()
  };
  const modeScriptInfo = "scriptInfo";
  const modeProjectGarbage = "projectGarbage";
  const modeStyles = "styles";
  const modeFonts = "fonts";
  const modeGraphics = "graphics";
  const modeEvents = "events";
  const modeExtraData = "extraData";
  let mode = "";
  let lastAttachedFile = "";
  const linesToParse = text.split(`
`);
  for (let i = 0;i < linesToParse.length; i++) {
    const lineNumber = i + 1;
    const line = removeUtf8Boom(linesToParse[i]);
    if (line.length === 0) {
      continue;
    }
    switch (line) {
      case _scriptInfo:
        mode = modeScriptInfo;
        continue;
      case _projectGarbage:
        mode = modeProjectGarbage;
        continue;
      case _styles:
        mode = modeStyles;
        continue;
      case _fonts:
        mode = modeFonts;
        continue;
      case _graphics:
        mode = modeGraphics;
        continue;
      case _events:
        mode = modeEvents;
        continue;
      case _extraData:
        mode = modeExtraData;
        continue;
    }
    let err = "";
    switch (mode) {
      case modeScriptInfo:
        err = processScriptInfoLine(assFile, line);
        break;
      case modeProjectGarbage:
        err = processProjectGarbageLine(assFile, line);
        break;
      case modeStyles:
        err = processStylesLine(assFile, line);
        break;
      case modeFonts:
        lastAttachedFile = processFontsLine(assFile, line, lastAttachedFile);
        break;
      case modeGraphics:
        lastAttachedFile = processGraphicsLine(assFile, line, lastAttachedFile);
        break;
      case modeEvents:
        err = processEventsLine(assFile, line);
        break;
      case modeExtraData:
        processExtraDataLine(assFile, line);
        break;
      default:
        console.error(`failed to parse line ${lineNumber}`);
        break;
    }
    if (err.length > 0) {
      console.error(`failed to parse ass file at line ${lineNumber}: ${err}
Line:
${line}`);
      return null;
    }
  }
  return assFile;
}
function parseStyle(text) {
  const regexStyle = /Style: (?<name>.*)\s*,\s*(?<fontName>.*)\s*,\s*(?<fontSize>\d+(?:\.\d+)?)\s*,\s*&H(?<alpha1>[A-Fa-f0-9]{2})(?<color1>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha2>[A-Fa-f0-9]{2})(?<color2>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha3>[A-Fa-f0-9]{2})(?<color3>[A-Fa-f0-9]{6})\s*,\s*&H(?<alpha4>[A-Fa-f0-9]{2})(?<color4>[A-Fa-f0-9]{6})\s*,\s*(?<bold>0|-1)\s*,\s*(?<italic>0|-1)\s*,\s*(?<underline>0|-1)\s*,\s*(?<strikeout>0|-1)\s*,\s*(?<scaleX>\d+(?:\.\d+)?)\s*,\s*(?<scaleY>\d+(?:\.\d+)?)\s*,\s*(?<spacing>\d+(?:\.\d+)?)\s*,\s*(?<angle>-?\d+(?:\.\d+)?)\s*,\s*(?<borderStyle>\d+)\s*,\s*(?<outline>\d+(?:\.\d+)?)\s*,\s*(?<shadow>\d+(?:\.\d+)?)\s*,\s*(?<alignment>[1-9])\s*,\s*(?<marginLeft>\d+)\s*,\s*(?<marginRight>\d+)\s*,\s*(?<marginVertical>\d+)\s*,\s*(?<encoding>\d+)/;
  if (!text.startsWith("Style: ")) {
    return [undefined, ""];
  }
  const match = text.match(regexStyle);
  if (!match || match.length === 0 || !match.groups) {
    return [undefined, `failed to parse style: not a style: ${text}`];
  }
  const alignmentParseResult = Alignment.safeParse(Number(match.groups.alignment));
  if (!alignmentParseResult.success) {
    return [undefined, `failed to parse style: invalid alignment: ${text}`];
  }
  const alignment = alignmentParseResult.data;
  const encodingParseResult = Encoding.safeParse(Number(match.groups.encoding));
  if (!encodingParseResult.success) {
    return [undefined, `failed to parse style: invalid encoding: ${match.groups.encoding}`];
  }
  const encoding = encodingParseResult.data;
  const style = {
    name: match.groups.name ?? "",
    fontName: match.groups.fontName ?? "",
    fontSize: Number(match.groups.fontSize ?? "0"),
    primaryAlpha: match.groups.alpha1,
    primaryColor: match.groups.color1,
    secondaryAlpha: match.groups.alpha2,
    secondaryColor: match.groups.color2,
    outlineAlpha: match.groups.alpha3,
    outlineColor: match.groups.color3,
    backAlpha: match.groups.alpha4,
    backColor: match.groups.color4,
    bold: Number(match.groups.bold),
    italic: Number(match.groups.italic),
    underline: Number(match.groups.underline),
    strikeOut: Number(match.groups.strikeout),
    scaleX: Number(match.groups.scaleX),
    scaleY: Number(match.groups.scaleY),
    spacing: Number(match.groups.spacing),
    angle: Number(match.groups.angle),
    borderStyle: Number(match.groups.borderStyle),
    outline: Number(match.groups.outline),
    shadow: Number(match.groups.shadow),
    alignment,
    marginLeft: Number(match.groups.marginLeft),
    marginRight: Number(match.groups.marginRight),
    marginVertical: Number(match.groups.marginVertical),
    encoding
  };
  return [style, ""];
}
function generateDefaultASSFile() {
  return {
    scriptInfo: generateDefaultSectionScriptInfo(),
    aegisubProjectGarbage: newProjectGarbage(),
    styles: generateDefaultSectionStyles(),
    fonts: newSectionFonts(),
    graphics: newSectionGraphics(),
    events: generateDefaultSectionEvents(),
    extraData: newSectionExtraData()
  };
}
function removeUtf8Boom(s) {
  s = s.replaceAll("\\uFEFF", "");
  s = s.replaceAll("\r", "");
  return s;
}
function parseKeyValue(text) {
  const regexLine2 = /(?<key>.+):\s+(?<value>.*)\s*/;
  const kv = {
    key: "",
    value: ""
  };
  const match = text.match(regexLine2);
  if (!match || match.length === 0) {
    return [kv, `not a key-value pair: ${text}`];
  }
  kv.key = match.groups?.key ?? "";
  kv.value = match.groups?.value ?? "";
  return [kv, ""];
}
function processScriptInfoLine(assFile, line) {
  if (line.startsWith(_CommentStart)) {
    const comment = line.substring(_CommentStart.length);
    assFile.scriptInfo.comments.push(comment);
    return "";
  }
  const [kv, errorParseKeyValue] = parseKeyValue(line);
  if (errorParseKeyValue.length > 0) {
    return `failed to parse script info line: ${errorParseKeyValue}`;
  }
  assFile.scriptInfo.properties.set(kv.key, kv.value);
  return "";
}
function processProjectGarbageLine(assFile, line) {
  if (line.startsWith(_CommentStart)) {
    const comment = line.substring(_CommentStart.length);
    assFile.aegisubProjectGarbage.comments.push(comment);
    return "";
  }
  const [kv, errorParseKeyValue] = parseKeyValue(line);
  if (errorParseKeyValue.length > 0) {
    return `failed to parse script info line: ${errorParseKeyValue}`;
  }
  assFile.aegisubProjectGarbage.properties.set(kv.key, kv.value);
  return "";
}
function processStylesLine(assFile, line) {
  const [style, error] = parseStyle(line);
  if (error === "" && style != null) {
    assFile.styles.styles.push(style);
  }
  return error;
}
function processFontsLine(assFile, line, currentAttachedFile) {
  const [kv, errorParseKeyValue] = parseKeyValue(line);
  if (errorParseKeyValue.length === 0 && kv.key == "fontname") {
    const fileName = kv.value;
    let attachedFile2 = {
      name: "",
      data: []
    };
    let index2 = assFile.fonts.files.findIndex((x) => x.name === fileName);
    assFile.fonts.files.push(attachedFile2);
    index2 = assFile.fonts.files.length - 1;
    attachedFile2 = assFile.fonts.files[index2];
    attachedFile2.name = fileName;
    currentAttachedFile = fileName;
    return fileName;
  }
  const index = assFile.fonts.files.findLastIndex((x) => x.name == currentAttachedFile);
  if (index < 0) {
    return "";
  }
  const attachedFile = assFile.fonts.files[index];
  attachedFile.data.push(line);
  return currentAttachedFile;
}
function processGraphicsLine(assFile, line, currentAttachedFile) {
  const [kv, errorParseKeyValue] = parseKeyValue(line);
  if (errorParseKeyValue.length === 0 && kv.key == "filename") {
    const fileName = kv.value;
    let attachedFile2 = {
      name: "",
      data: []
    };
    let index2 = assFile.graphics.files.findIndex((x) => x.name === fileName);
    assFile.graphics.files.push(attachedFile2);
    index2 = assFile.graphics.files.length - 1;
    attachedFile2 = assFile.graphics.files[index2];
    attachedFile2.name = fileName;
    currentAttachedFile = fileName;
    return fileName;
  }
  const index = assFile.graphics.files.findLastIndex((x) => x.name == currentAttachedFile);
  if (index < 0) {
    return "";
  }
  const attachedFile = assFile.graphics.files[index];
  attachedFile.data.push(line);
  return currentAttachedFile;
}
function processEventsLine(assFile, text) {
  if (text.startsWith("Format:")) {
    assFile.events.format = text;
    return "";
  }
  const line = parseLine(text);
  if (line == null) {
    return `not a event (dialogue / comment): ${line}`;
  }
  assFile.events.lines.push(line);
  return "";
}
function processExtraDataLine(assFile, line) {
  if (!line.startsWith(_DataStart)) {
    return;
  }
  const datum = line.substring(_DataStart.length);
  assFile.extraData.data.push(datum);
}
// src/karaoke.ts
function splitSyllabes(line) {
  const syls = [];
  const words = line.content.split(" ");
  for (let i = 0;i < words.length; i++) {
    const word2 = words[i];
    if (isRomajiWord(word2)) {
      const matches = word2.matchAll(regexRomaji);
      for (const match of matches) {
        syls.push({
          text: match[1],
          durationInMs: 0
        });
      }
    } else {
      syls.push({
        text: word2,
        durationInMs: 0
      });
    }
    if (i != words.length - 1) {
      syls[syls.length - 1].text += " ";
    }
  }
  const lineDurationInSeconds = calculateLineDurationInSeconds(line);
  const sylDurationInMs = Math.floor(Math.round(lineDurationInSeconds * 100 / syls.length));
  const karaokeDurationInMs = syls.length * sylDurationInMs;
  for (const syl of syls) {
    syl.durationInMs = sylDurationInMs;
  }
  const karaokeDurationMatchesLineDuration = karaokeDurationInMs === lineDurationInSeconds * 100;
  if (!karaokeDurationMatchesLineDuration) {
    const lineDurationInMs = lineDurationInSeconds * 100;
    const deltaInMs = lineDurationInMs - karaokeDurationInMs;
    syls[syls.length - 1].durationInMs += deltaInMs;
  }
  const items = [];
  for (const syl of syls) {
    items.push({
      name: "effect",
      tags: [
        {
          name: "kf" /* kf */,
          value: syl.durationInMs
        }
      ]
    }, {
      name: "text",
      value: syl.text
    });
  }
  line.content = contentsToString(items);
}
function isRomajiWord(word2) {
  while (word2.length > 0) {
    const match = word2.match(regexRomaji);
    if (!match || match.length === 0) {
      return false;
    }
    word2 = word2.substring(match[0].length);
  }
  return true;
}

// src/asu.ts
var TagName;
((TagName2) => {
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
})(TagName ||= {});
function parseTags(text, tags) {
  const tagNameSource = text.substring(1);
  const matchTagT = text.match(regexTagT);
  if (matchTagT && matchTagT.length > 0) {
    return parseTagT(text, tags, tagNameSource, matchTagT);
  }
  const matchText = text.match(regexText);
  if (matchText && matchText.length > 0) {
    const value2 = matchText[0];
    tags.push({
      name: "text" /* text */,
      value: value2
    });
    text = text.substring(value2.length);
    if (text.length > 0) {
      parseTags(text, tags);
    }
    return tags;
  }
  const matchUnitTags = text.match(regexTags);
  if (!matchUnitTags || matchUnitTags.length == 0) {
    return tags;
  }
  function parseNextTag(tags2, parsedTag, parsedTextLength) {
    tags2.push(parsedTag);
    text = text.substring(parsedTextLength);
    if (text.length > 0) {
      parseTags(text, tags2);
    }
    return tags2;
  }
  let match = matchUnitTags[0].match(regexMove)?.groups;
  if (match != null) {
    const x1 = Number(match?.move_x1 ?? "0");
    const y1 = Number(match?.move_y1 ?? "0");
    const x2 = Number(match?.move_x2 ?? "0");
    const y2 = Number(match?.move_y2 ?? "0");
    const t1 = match?.move_t1 ? Number(match.move_t1) : null;
    const t2 = match?.move_t2 ? Number(match.move_t2) : null;
    const tag2 = {
      name: "move" /* move */,
      x1,
      y1,
      x2,
      y2,
      t1,
      t2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAlpha)?.groups;
  if (match != null) {
    const value2 = match?.alpha_value ?? "";
    const tag2 = {
      name: "alpha" /* alpha */,
      value: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexXbord)?.groups;
  if (match != null) {
    const value2 = Number(match?.xbord_value ?? "0");
    const tag2 = {
      name: "xbord" /* xbord */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexYbord)?.groups;
  if (match != null) {
    const value2 = Number(match?.ybord_value ?? "0");
    const tag2 = {
      name: "ybord" /* ybord */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexXshad)?.groups;
  if (match != null) {
    const value2 = Number(match?.xshad_value ?? "0");
    const tag2 = {
      name: "xshad" /* xshad */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexYshad)?.groups;
  if (match != null) {
    const value2 = Number(match?.yshad_value ?? "0");
    const tag2 = {
      name: "yshad" /* yshad */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexIclip)?.groups;
  if (match != null) {
    const args = match?.iclip_args ?? "";
    const tag2 = {
      name: "iclip" /* iclip */,
      drawCommands: args
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexBlur)?.groups;
  if (match != null) {
    const value2 = Number(match?.blur_value ?? "0");
    const tag2 = {
      name: "blur" /* blur */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexBord)?.groups;
  if (match != null) {
    const value2 = Number(match?.bord_value ?? "0");
    const tag2 = {
      name: "bord" /* bord */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexShad)?.groups;
  if (match != null) {
    const value2 = Number(match?.shad_value ?? "0");
    const tag2 = {
      name: "shad" /* shad */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFscx)?.groups;
  if (match != null) {
    const value2 = Number(match?.fscx_value ?? "0");
    const tag2 = {
      name: "fscx" /* fscx */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFscy)?.groups;
  if (match != null) {
    const value2 = Number(match?.fscy_value ?? "0");
    const tag2 = {
      name: "fscy" /* fscy */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFade)?.groups;
  if (match != null) {
    const alpha1 = Number(match?.fade_alpha1 ?? "0");
    const alpha2 = Number(match?.fade_alpha2 ?? "0");
    const alpha3 = Number(match?.fade_alpha3 ?? "0");
    const t1 = Number(match?.fade_t1 ?? "0");
    const t2 = Number(match?.fade_t2 ?? "0");
    const t3 = Number(match?.fade_t3 ?? "0");
    const t4 = Number(match?.fade_t4 ?? "0");
    const tag2 = {
      name: "fade" /* fade */,
      alpha1,
      alpha2,
      alpha3,
      t1,
      t2,
      t3,
      t4
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexClip)?.groups;
  if (match != null) {
    const args = match?.clip_args ?? "";
    const tag2 = {
      name: "clip" /* clip */,
      drawCommands: args
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFsp)?.groups;
  if (match != null) {
    const value2 = Number(match?.fsp_value ?? "0");
    const tag2 = {
      name: "fsp" /* fsp */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexPos)?.groups;
  if (match != null) {
    const x = Number(match?.pos_x ?? "0");
    const y = Number(match?.pos_y ?? "0");
    const tag2 = {
      name: "pos" /* pos */,
      x,
      y
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexOrg)?.groups;
  if (match != null) {
    const x = Number(match?.org_x ?? "0");
    const y = Number(match?.org_y ?? "0");
    const tag2 = {
      name: "org" /* org */,
      x,
      y
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFad)?.groups;
  if (match != null) {
    const fadeIn = Number(match?.in ?? "0");
    const fadeOut = Number(match?.out ?? "0");
    const tag2 = {
      name: "fad" /* fad */,
      in: fadeIn,
      out: fadeOut
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFrx)?.groups;
  if (match != null) {
    const value2 = Number(match?.frx_value ?? "0");
    const tag2 = {
      name: "frx" /* frx */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFry)?.groups;
  if (match != null) {
    const value2 = Number(match?.fry_value ?? "0");
    const tag2 = {
      name: "fry" /* fry */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFrz)?.groups;
  if (match != null) {
    const value2 = Number(match?.frz_value ?? "0");
    const tag2 = {
      name: "frz" /* frz */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFax)?.groups;
  if (match != null) {
    const value2 = Number(match?.fax_value ?? "0");
    const tag2 = {
      name: "fax" /* fax */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFay)?.groups;
  if (match != null) {
    const value2 = Number(match?.fay_value ?? "0");
    const tag2 = {
      name: "fay" /* fay */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexPbo)?.groups;
  if (match != null) {
    const value2 = Number(match?.pbo_value ?? "0");
    const tag2 = {
      name: "pbo" /* pbo */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFe)?.groups;
  if (match != null) {
    const value2 = Number(match?.fe_value ?? "0");
    const tag2 = {
      name: "fe" /* fe */,
      encodingId: Number(value2)
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFn)?.groups;
  if (match != null) {
    const value2 = match?.fn_value ?? "";
    const tag2 = {
      name: "fn" /* fn */,
      font: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAn)?.groups;
  if (match != null) {
    const value2 = Number(match?.an_value ?? "0");
    const tag2 = {
      name: "an" /* an */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexBe)?.groups;
  if (match != null) {
    const value2 = Number(match?.be_value ?? "0");
    const tag2 = {
      name: "be" /* be */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFr)?.groups;
  if (match != null) {
    const value2 = Number(match?.fr_value ?? "0");
    const tag2 = {
      name: "fr" /* fr */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexFs)?.groups;
  if (match != null) {
    const value2 = Number(match?.fs_value ?? "0");
    const tag2 = {
      name: "fs" /* fs */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexKo)?.groups;
  if (match != null) {
    const value2 = Number(match?.ko_value ?? "0");
    const tag2 = {
      name: "ko" /* ko */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexKf)?.groups;
  if (match != null) {
    const value2 = Number(match?.kf_value ?? "0");
    const tag2 = {
      name: "kf" /* kf */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexColor1)?.groups;
  if (match != null) {
    const blue = Number(hexToNumber(match?.color1_bgr_blue ?? "0"));
    const green = Number(hexToNumber(match?.color1_bgr_green ?? "0"));
    const red = Number(hexToNumber(match?.color1_bgr_red ?? "0"));
    const tag2 = {
      name: "1c" /* color1 */,
      blue,
      green,
      red
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexColor2)?.groups;
  if (match != null) {
    const blue = Number(hexToNumber(match?.color2_bgr_blue ?? "0"));
    const green = Number(hexToNumber(match?.color2_bgr_green ?? "0"));
    const red = Number(hexToNumber(match?.color2_bgr_red ?? "0"));
    const tag2 = {
      name: "2c" /* color2 */,
      blue,
      green,
      red
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexColor3)?.groups;
  if (match != null) {
    const blue = Number(hexToNumber(match?.color3_bgr_blue ?? "0"));
    const green = Number(hexToNumber(match?.color3_bgr_green ?? "0"));
    const red = Number(hexToNumber(match?.color3_bgr_red ?? "0"));
    const tag2 = {
      name: "3c" /* color3 */,
      blue,
      green,
      red
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexColor4)?.groups;
  if (match != null) {
    const blue = Number(hexToNumber(match?.color4_bgr_blue ?? "0"));
    const green = Number(hexToNumber(match?.color4_bgr_green ?? "0"));
    const red = Number(hexToNumber(match?.color4_bgr_red ?? "0"));
    const tag2 = {
      name: "4c" /* color4 */,
      blue,
      green,
      red
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAlpha1)?.groups;
  if (match != null) {
    const value2 = match.alpha1_value ?? "";
    const tag2 = {
      name: "1a" /* alpha1 */,
      value: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAlpha2)?.groups;
  if (match != null) {
    const value2 = match.alpha2_value ?? "";
    const tag2 = {
      name: "2a" /* alpha2 */,
      value: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAlpha3)?.groups;
  if (match != null) {
    const value2 = match.alpha3_value ?? "";
    const tag2 = {
      name: "3a" /* alpha3 */,
      value: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexAlpha4)?.groups;
  if (match != null) {
    const value2 = match.alpha4_value ?? "";
    const tag2 = {
      name: "4a" /* alpha4 */,
      value: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexKLowerCase)?.groups;
  if (match != null) {
    const value2 = Number(match?.k_lower_case_value ?? "0");
    const tag2 = {
      name: "k" /* kLowerCase */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexKUpperCase)?.groups;
  if (match != null) {
    const value2 = Number(match?.k_upper_case_value ?? "0");
    const tag2 = {
      name: "K" /* kUpperCase */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexQ)?.groups;
  if (match != null) {
    const value2 = Number(match?.q_value ?? "0");
    const tag2 = {
      name: "q" /* q */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexS)?.groups;
  if (match != null) {
    const value2 = Number(match?.s_value ?? "0");
    const tag2 = {
      name: "s" /* s */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexU)?.groups;
  if (match != null) {
    const value2 = Number(match?.u_value ?? "0");
    const tag2 = {
      name: "u" /* u */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexR)?.groups;
  if (match != null) {
    const value2 = match?.r_value ?? "";
    const tag2 = {
      name: "r" /* r */,
      style: value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexP)?.groups;
  if (match != null) {
    const value2 = Number(match?.p_value ?? "0");
    const tag2 = {
      name: "p" /* p */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexI)?.groups;
  if (match != null) {
    const value2 = Number(match?.i_value ?? "0");
    const tag2 = {
      name: "i" /* i */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexColor)?.groups;
  if (match != null) {
    const blue = Number(hexToNumber(match?.color_bgr_blue ?? "0"));
    const green = Number(hexToNumber(match?.color_bgr_green ?? "0"));
    const red = Number(hexToNumber(match?.color_bgr_red ?? "0"));
    const tag2 = {
      name: "c" /* color */,
      blue,
      green,
      red
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexB)?.groups;
  if (match != null) {
    const value2 = Number(match?.b_value ?? "0");
    const tag2 = {
      name: "b" /* b */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  match = matchUnitTags[0].match(regexA)?.groups;
  if (match != null) {
    const value2 = Number(match?.a_value ?? "0");
    const tag2 = {
      name: "a" /* a */,
      value: Number.isNaN(value2) ? 0 : value2
    };
    return parseNextTag(tags, tag2, matchUnitTags[0].length);
  }
  const value = matchUnitTags[0];
  const tag = {
    name: "unknown" /* unknown */,
    value
  };
  return parseNextTag(tags, tag, matchUnitTags[0].length);
}
function parseTagT(text, tags, tagNameSource, matchTagT) {
  if (tagNameSource.startsWith("t" /* t */)) {
    const match = matchTagT[0].match(regexTagT)?.groups;
    const rawTags = match?.tags ?? "";
    const subtags = [];
    parseTags(rawTags, subtags);
    const arg1 = match?.arg1 ? Number(match.arg1) : null;
    const arg2 = match?.arg2 ? Number(match.arg2) : null;
    const arg3 = match?.arg3 ? Number(match.arg3) : null;
    const tag = {
      name: "t" /* t */,
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
}
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
      case "t" /* t */: {
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
      }
      case "pos" /* pos */:
      case "org" /* org */:
        s += `\\${tag.name}(${tag.x},${tag.y})`;
        break;
      case "move" /* move */:
        s += `\\move(${tag.x1},${tag.y1},${tag.x2},${tag.y2}`;
        if (tag.t1 != null && tag.t2 != null) {
          s += `,${tag.t1},${tag.t2}`;
        }
        s += ")";
        break;
      case "clip" /* clip */:
      case "iclip" /* iclip */:
        s += `\\${tag.name}(${tag.drawCommands})`;
        break;
      case "fad" /* fad */:
        s += `\\fad(${tag.in},${tag.out})`;
        break;
      case "fade" /* fade */:
        s += `\\fade(${tag.alpha1},${tag.alpha2},${tag.alpha3},${tag.t1},${tag.t2},${tag.t3},${tag.t4})`;
        break;
      case "fe" /* fe */:
        s += `\\fe${tag.encodingId}`;
        break;
      case "fn" /* fn */:
        s += `\\fn${tag.font}`;
        break;
      case "r" /* r */:
        s += `\\r${tag.style}`;
        break;
      case "c" /* color */:
      case "1c" /* color1 */:
      case "2c" /* color2 */:
      case "3c" /* color3 */:
      case "4c" /* color4 */: {
        const hexBlue = numberToHex(tag.blue);
        const hexGreen = numberToHex(tag.green);
        const hexRed = numberToHex(tag.red);
        s += `\\${tag.name}&H${hexBlue}${hexGreen}${hexRed}&`;
        break;
      }
      case "text" /* text */:
      case "unknown" /* unknown */:
        s += tag.value;
        break;
      default:
        s += `\\${tag.name}${tag.value}`;
        break;
    }
  }
  return s;
}
function tagToString(tag) {
  return contentEffectToString({
    name: "effect",
    tags: [tag]
  });
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
function mergeNeighboringEffects(items) {
  const indexToRemove = [];
  for (let i = 0;i < items.length; i++) {
    const item = items[i];
    if (item.name != "effect") {
      continue;
    }
    const nextItem = items[i + 1];
    if (nextItem.name != "effect") {
      i++;
      continue;
    }
    if (nextItem == null) {
      break;
    }
    item.tags.push(...nextItem.tags);
    indexToRemove.push(i + 1);
  }
  for (const index of indexToRemove) {
    items.splice(index, 1);
  }
}
function truncateNumberTags(items, decimals) {
  forEachTag(items, (tag) => {
    switch (tag.name) {
      case "t" /* t */: {
        if (tag.accel != null) {
          tag.accel = truncate(tag.accel, decimals);
        }
        if (tag.t1 != null) {
          tag.t1 = truncate(tag.t1, decimals);
        }
        if (tag.t2 != null) {
          tag.t2 = truncate(tag.t2, decimals);
        }
        break;
      }
      case "pos" /* pos */:
      case "org" /* org */:
        tag.x = truncate(tag.x, decimals);
        tag.y = truncate(tag.y, decimals);
        break;
      case "move" /* move */:
        tag.x1 = truncate(tag.x1, decimals);
        tag.y1 = truncate(tag.y1, decimals);
        tag.x2 = truncate(tag.x2, decimals);
        tag.y2 = truncate(tag.y2, decimals);
        if (tag.t1 != null) {
          tag.t1 = truncate(tag.t1, decimals);
        }
        if (tag.t2 != null) {
          tag.t2 = truncate(tag.t2, decimals);
        }
        break;
      case "fad" /* fad */:
        tag.in = truncate(tag.in, decimals);
        tag.out = truncate(tag.out, decimals);
        break;
      case "fade" /* fade */:
        tag.t1 = truncate(tag.t1, decimals);
        tag.t2 = truncate(tag.t2, decimals);
        tag.t3 = truncate(tag.t3, decimals);
        tag.t4 = truncate(tag.t4, decimals);
        tag.alpha1 = truncate(tag.alpha1, decimals);
        tag.alpha2 = truncate(tag.alpha2, decimals);
        tag.alpha3 = truncate(tag.alpha3, decimals);
        break;
      case "fe" /* fe */:
        tag.encodingId = Math.floor(tag.encodingId);
        break;
      case "c" /* color */:
      case "1c" /* color1 */:
      case "2c" /* color2 */:
      case "3c" /* color3 */:
      case "4c" /* color4 */:
        tag.blue = Math.floor(tag.blue);
        tag.green = Math.floor(tag.green);
        tag.red = Math.floor(tag.red);
        break;
      case "clip" /* clip */:
      case "iclip" /* iclip */:
      case "fn" /* fn */:
      case "r" /* r */:
      case "text" /* text */:
      case "unknown" /* unknown */:
        break;
      default:
        if (typeof tag.value === "number") {
          tag.value = truncate(tag.value, decimals);
        }
        break;
    }
  });
}
function forEachTag(items, predicate) {
  for (const item of items) {
    if (item.name != "effect") {
      continue;
    }
    for (const tag of item.tags) {
      predicate(tag);
    }
  }
}
function findA(items) {
  const fx = items.find((item) => item.name == "effect");
  if (fx?.name != "effect") {
    return null;
  }
  const tagName = "a" /* a */;
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
  const tagName = "b" /* b */;
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
  const tagName = "c" /* color */;
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
  const tagName = "1c" /* color1 */;
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
  const tagName = "2c" /* color2 */;
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
  const tagName = "3c" /* color3 */;
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
  const tagName = "4c" /* color4 */;
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
  const tagName = "alpha" /* alpha */;
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
  const tagName = "1a" /* alpha1 */;
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
  const tagName = "2a" /* alpha2 */;
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
  const tagName = "3a" /* alpha3 */;
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
  const tagName = "4a" /* alpha4 */;
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
  const tagName = "an" /* an */;
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
  const tagName = "be" /* be */;
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
  const tagName = "blur" /* blur */;
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
  const tagName = "bord" /* bord */;
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
  const tagName = "xbord" /* xbord */;
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
  const tagName = "ybord" /* ybord */;
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
  const tagName = "shad" /* shad */;
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
  const tagName = "xshad" /* xshad */;
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
  const tagName = "yshad" /* yshad */;
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
  const tagName = "fr" /* fr */;
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
  const tagName = "frx" /* frx */;
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
  const tagName = "fry" /* fry */;
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
  const tagName = "frz" /* frz */;
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
  const tagName = "fax" /* fax */;
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
  const tagName = "fay" /* fay */;
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
  const tagName = "p" /* p */;
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
  const tagName = "pbo" /* pbo */;
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
  const tagName = "q" /* q */;
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
  const tagName = "s" /* s */;
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
  const tagName = "u" /* u */;
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
  const tagName = "r" /* r */;
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
  const tagName = "fe" /* fe */;
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
  const tagName = "fn" /* fn */;
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
  const tagName = "fscx" /* fscx */;
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
  const tagName = "fscy" /* fscy */;
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
  const tagName = "fsp" /* fsp */;
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
  const tagName = "k" /* kLowerCase */;
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
  const tagName = "K" /* kUpperCase */;
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
  const tagName = "ko" /* ko */;
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
  const tagName = "kf" /* kf */;
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
  const tagName = "i" /* i */;
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
  const tagName = "fs" /* fs */;
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
  const tagName = "pos" /* pos */;
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
  const tagName = "org" /* org */;
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
  const tagName = "fad" /* fad */;
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
  const tagName = "fade" /* fade */;
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
  const tagName = "clip" /* clip */;
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
  const tagName = "iclip" /* iclip */;
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
  const tagName = "move" /* move */;
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
  const tagName = "t" /* t */;
  const tag = fx.tags.find((tag2) => tag2.name == tagName);
  if (tag?.name != tagName) {
    return null;
  }
  return tag;
}
function setA(items, newValue) {
  const defaultTag = {
    name: "a" /* a */,
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
    name: "an" /* an */,
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
    name: "b" /* b */,
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
    name: "c" /* color */,
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
    name: "1c" /* color1 */,
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
    name: "2c" /* color2 */,
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
    name: "3c" /* color3 */,
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
    name: "4c" /* color4 */,
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
    name: "alpha" /* alpha */,
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
    name: "1a" /* alpha1 */,
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
    name: "2a" /* alpha2 */,
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
    name: "3a" /* alpha3 */,
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
    name: "4a" /* alpha4 */,
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
    name: "blur" /* blur */,
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
    name: "bord" /* bord */,
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
    name: "xbord" /* xbord */,
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
    name: "ybord" /* ybord */,
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
    name: "fax" /* fax */,
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
    name: "fay" /* fay */,
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
    name: "fscx" /* fscx */,
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
    name: "fscy" /* fscy */,
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
    name: "fsp" /* fsp */,
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
    name: "fe" /* fe */,
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
    name: "fn" /* fn */,
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
    name: "k" /* kLowerCase */,
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
    name: "K" /* kUpperCase */,
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
    name: "kf" /* kf */,
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
    name: "ko" /* ko */,
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
    name: "p" /* p */,
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
    name: "pbo" /* pbo */,
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
    name: "q" /* q */,
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
    name: "s" /* s */,
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
    name: "shad" /* shad */,
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
    name: "xshad" /* xshad */,
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
    name: "yshad" /* yshad */,
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
    name: "u" /* u */,
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
    name: "be" /* be */,
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
    name: "fs" /* fs */,
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
    name: "fr" /* fr */,
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
    name: "frx" /* frx */,
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
    name: "fry" /* fry */,
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
    name: "frz" /* frz */,
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
    name: "i" /* i */,
    value: newValue
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.value = newValue;
  }
  return tag;
}
function setR(items, style2) {
  const defaultTag = {
    name: "r" /* r */,
    style: style2
  };
  const [updated, tag] = setTag(items, defaultTag.name, defaultTag);
  if (!updated) {
    tag.style = style2;
  }
  return tag;
}
function setPos(items, x, y) {
  const defaultTag = {
    name: "pos" /* pos */,
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
    name: "org" /* org */,
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
    name: "fad" /* fad */,
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
    name: "fade" /* fade */,
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
    name: "clip" /* clip */,
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
    name: "iclip" /* iclip */,
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
    name: "move" /* move */,
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
    name: "t" /* t */,
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
function setTag(items, tagName, defaultTag) {
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
}
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
var LINE_TYPE_DIALOGUE = "Dialogue";
var LINE_TYPE_COMMENT = "Comment";
function parseLine(text) {
  const match = text.match(regexLine);
  if (match == null) {
    return null;
  }
  const groups = match.groups;
  const start = parseTime(groups?.start ?? "");
  if (start == null) {
    return null;
  }
  const end = parseTime(groups?.end ?? "");
  if (end == null) {
    return null;
  }
  const line = {
    type: groups?.type === LINE_TYPE_COMMENT ? LINE_TYPE_COMMENT : LINE_TYPE_DIALOGUE,
    layer: Number(groups?.layer ?? "0"),
    start,
    end,
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
  s += Math.floor(line.layer);
  s += ",";
  s += timeToString(line.start);
  s += ",";
  s += timeToString(line.end);
  s += ",";
  s += line.style;
  s += ",";
  s += line.actor;
  s += ",";
  s += Math.floor(line.marginLeft);
  s += ",";
  s += Math.floor(line.marginRight);
  s += ",";
  s += Math.floor(line.marginVertical);
  s += ",";
  s += line.effect;
  s += ",";
  s += line.content;
  return s;
}
function calculateLineDurationInSeconds(line) {
  const duration = timeToSeconds(line.end) - timeToSeconds(line.start);
  return duration;
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
function generateDefaultLine() {
  return {
    type: "Dialogue",
    layer: 0,
    start: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    end: {
      hours: 0,
      minutes: 0,
      seconds: 5
    },
    style: "Default",
    actor: "",
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0,
    effect: "",
    content: ""
  };
}
export {
  truncateNumberTags,
  truncate,
  timeToString,
  timeToSeconds,
  tagsToItems,
  tagToString,
  sumTimes,
  subtractTimes,
  styleToString,
  splitSyllabes,
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
  sectionStylesToString,
  sectionScriptInfoToString,
  sectionProjectGarbageToString,
  sectionGraphicsToString,
  sectionFontsToString,
  sectionExtraDataToString,
  sectionEventsToString,
  secondsToTime,
  removeTag,
  parseTime,
  parseTags,
  parseStyle,
  parseLine,
  parseContent,
  parseColorBGR,
  parseASSFile,
  numberToHex,
  newSectionStyles,
  newSectionGraphics,
  newSectionFonts,
  newSectionExtraData,
  newSectionEvents,
  newScriptInfo,
  newProjectGarbage,
  mergeNeighboringEffects,
  lineToString,
  itemsToTags,
  isRomajiWord,
  interpolate,
  hexToNumber,
  generateDefaultStyle,
  generateDefaultSectionStyles,
  generateDefaultSectionScriptInfo,
  generateDefaultSectionEvents,
  generateDefaultLine,
  generateDefaultASSFile,
  forEachTag,
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
  calculateLineDurationInSeconds,
  adjustTimeOverplus,
  TagName,
  ScriptInfoPropertyYCbCrMatrix,
  ScriptInfoPropertyWrapStyle,
  ScriptInfoPropertyUpdateDetails,
  ScriptInfoPropertyTitle,
  ScriptInfoPropertySynchPoint,
  ScriptInfoPropertyScriptUpdatedBy,
  ScriptInfoPropertyScriptType,
  ScriptInfoPropertyScaledBorderAndShadow,
  ScriptInfoPropertyPlayResY,
  ScriptInfoPropertyPlayResX,
  ScriptInfoPropertyOriginalTranslation,
  ScriptInfoPropertyOriginalTiming,
  ScriptInfoPropertyOriginalScript,
  ScriptInfoPropertyOriginalEditing,
  ProjectGarbagePropertyVideoZoomPercent,
  ProjectGarbagePropertyVideoPosition,
  ProjectGarbagePropertyVideoFile,
  ProjectGarbagePropertyVideoARValue,
  ProjectGarbagePropertyVideoARMode,
  ProjectGarbagePropertyTimecodesFile,
  ProjectGarbagePropertyScrollPosition,
  ProjectGarbagePropertyLastStyleStorage,
  ProjectGarbagePropertyKeyframesFile,
  ProjectGarbagePropertyExportFilters,
  ProjectGarbagePropertyExportEncoding,
  ProjectGarbagePropertyAutomationScripts,
  ProjectGarbagePropertyAudioFile,
  ProjectGarbagePropertyActiveLine,
  LINE_TYPE_DIALOGUE,
  LINE_TYPE_COMMENT,
  Encodings,
  Encoding,
  AttachedGraphicToString,
  AttachedFontToString,
  Alignments,
  Alignment,
  ASSFileToString
};

//# debugId=8F1A5673F353C4A164756E2164756E21

import { createRegExp, digit, exactly, oneOrMore } from "magic-regexp";

export const regexContent = /(?<fx>{[^{]*})|(?<txt>{*[^{]*)/g;

export const reInt = exactly("-").optionally().and(oneOrMore(digit));

export const reFloat = reInt.and(exactly(".").and(oneOrMore(digit)).optionally());

export const reA = exactly("\\").and("a").and(oneOrMore(digit));

export const reAn = exactly("\\").and("an").and(oneOrMore(digit));

export const reBe = exactly("\\").and("be").and(oneOrMore(digit));

export const reFr = exactly("\\").and("fr").and(reFloat);

export const reFrx = exactly("\\").and("frx").and(reFloat);

export const reFry = exactly("\\").and("fry").and(reFloat);

export const reFrz = exactly("\\").and("frz").and(reFloat);

export const reI = exactly("\\").and("i").and(exactly("1").or("0"));

export const reFs = exactly("\\").and("fs").and(oneOrMore(digit));

export const rePos = exactly("\\").and("pos").and(exactly("(")).and(reFloat.groupedAs("x")).and(exactly(",")).and(reFloat.groupedAs("y")).and(exactly(")"));

export const reMoveTimeArgs = exactly(",").and(reFloat.groupedAs("move_t1")).and(exactly(",")).and(reFloat.groupedAs("move_t2")).optionally();

export const reMove = exactly("\\").and("move").and(exactly("(")).and(reFloat.groupedAs("x1")).and(exactly(",")).and(reFloat.groupedAs("y1")).and(exactly(",")).and(reFloat.groupedAs("x2")).and(exactly(",")).and(reFloat.groupedAs("y2")).and(reMoveTimeArgs).and(exactly(")"));

export const unitTags = reBe.or(reFs).or(reI).or(rePos).or(reMove).or(reFr).or(reFrx).or(reFry).or(reFrz).or(reAn).or(reA);

export const reTFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reTAccelFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(digit).groupedAs("accel")).and(exactly(",")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reTTimeAccelFx = exactly("\\").and("t").and(exactly("(")).and(oneOrMore(digit).groupedAs("t1")).and(exactly(",")).and(oneOrMore(digit).groupedAs("t2")).and(exactly(",")).and(oneOrMore(digit).groupedAs("accel")).and(exactly(",")).and(oneOrMore(unitTags).groupedAs("tags")).and(exactly(")"));

export const reT = reTFx.or(reTAccelFx).or(reTTimeAccelFx);

export const regexTags = createRegExp(unitTags.or(reT));

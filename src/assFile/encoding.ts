import { z } from "zod";

export enum Encodings {
    ANSI = 0,
    DEFAULT = 1,
    SYMBOL = 2,
    MAC = 77,
    SHIFT_JIS = 128,
    HANGEUL = 129,
    JOHAB = 130,
    GB2312 = 134,
    CHINESE_BIG5 = 136,
    GREEK = 161,
    TURKISH = 162,
    VIETNAMESE = 163,
    HEBREW = 177,
    ARAB = 178,
    BALTIC = 186,
    RUSSIAN = 204,
    THAI = 222,
    EASTERN_EUROPE = 238,
    OEM = 255,
};

export const Encoding = z.nativeEnum(Encodings);

export type Encoding = z.infer<typeof Encoding>;

import { z } from "zod";

export enum Alignments {
    DOWN_LEFT = 1,
    DOWN_CENTER = 2,
    DOWN_RIGHT = 3,
    CENTER_LEFT = 4,
    CENTER_CENTER = 5,
    CENTER_RIGHT = 6,
    UP_LEFT = 7,
    UP_CENTER = 8,
    UP_RIGHT = 9,
};

export const Alignment = z.nativeEnum(Alignments);

export type Alignment = z.infer<typeof Alignment>;

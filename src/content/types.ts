import { Tags } from "../tags/types";

export type ContentEffect = {
    name: "effect";
    tags: Tags[];
};

export type ContentText = {
    name: "text";
    value: string;
};

export type ContentItem = ContentEffect | ContentText;

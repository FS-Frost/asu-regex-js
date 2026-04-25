import { z } from "zod";

export enum DrawingCommandNames {
    move = "m",
    moveNoClose = "n",
    line = "l",
    bezier = "b",
    spline = "s",
    extendSpline = "p",
    closeSpline = "c",
}

export const DrawingCommandName: z.ZodEnum<typeof DrawingCommandNames> = z.enum(DrawingCommandNames);

export type DrawingCommandName = z.infer<typeof DrawingCommandName>;

export type DrawingCommandMove = {
    name: DrawingCommandNames.move;
    x: number;
    y: number;
};

export type DrawingCommandMoveNoClose = {
    name: DrawingCommandNames.moveNoClose;
    x: number;
    y: number;
};

export type DrawingCommandLine = {
    name: DrawingCommandNames.line;
    x: number;
    y: number;
};

export type DrawingCommandBezier = {
    name: DrawingCommandNames.bezier;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
};

export type DrawingPoint = {
    x: number;
    y: number;
};

export type DrawingCommandSpline = {
    name: DrawingCommandNames.spline;
    points: DrawingPoint[];
};

export type DrawingCommandExtendSpline = {
    name: DrawingCommandNames.extendSpline;
    x: number;
    y: number;
};

export type DrawingCommandCloseSpline = {
    name: DrawingCommandNames.closeSpline;
};

export type DrawingCommand =
    | DrawingCommandMove
    | DrawingCommandMoveNoClose
    | DrawingCommandLine
    | DrawingCommandBezier
    | DrawingCommandSpline
    | DrawingCommandExtendSpline
    | DrawingCommandCloseSpline;

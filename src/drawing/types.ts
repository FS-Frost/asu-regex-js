export enum DrawingCommandName {
    move = "m",
    moveNoClose = "n",
    line = "l",
    bezier = "b",
    spline = "s",
    extendSpline = "p",
    closeSpline = "c",
}

export type DrawingCommandMove = {
    name: DrawingCommandName.move;
    x: number;
    y: number;
};

export type DrawingCommandMoveNoClose = {
    name: DrawingCommandName.moveNoClose;
    x: number;
    y: number;
};

export type DrawingCommandLine = {
    name: DrawingCommandName.line;
    x: number;
    y: number;
};

export type DrawingCommandBezier = {
    name: DrawingCommandName.bezier;
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
    name: DrawingCommandName.spline;
    points: DrawingPoint[];
};

export type DrawingCommandExtendSpline = {
    name: DrawingCommandName.extendSpline;
    x: number;
    y: number;
};

export type DrawingCommandCloseSpline = {
    name: DrawingCommandName.closeSpline;
};

export type DrawingCommand =
    | DrawingCommandMove
    | DrawingCommandMoveNoClose
    | DrawingCommandLine
    | DrawingCommandBezier
    | DrawingCommandSpline
    | DrawingCommandExtendSpline
    | DrawingCommandCloseSpline;

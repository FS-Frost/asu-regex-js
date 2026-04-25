import {
    DrawingCommand,
    DrawingCommandBezier,
    DrawingCommandCloseSpline,
    DrawingCommandExtendSpline,
    DrawingCommandLine,
    DrawingCommandMove,
    DrawingCommandMoveNoClose,
    DrawingCommandName,
    DrawingCommandSpline,
    DrawingPoint,
} from "./types";

export function parseDrawingCommands(text: string): DrawingCommand[] {
    const commands: DrawingCommand[] = [];
    const tokens = text.trim().split(/\s+/);
    if (tokens.length === 0 || tokens[0] === "") {
        return commands;
    }

    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i].toLowerCase();

        switch (token) {
            case DrawingCommandName.move: {
                if (i + 2 < tokens.length) {
                    commands.push({
                        name: DrawingCommandName.move,
                        x: Number(tokens[i + 1]),
                        y: Number(tokens[i + 2]),
                    } satisfies DrawingCommandMove);
                    i += 3;
                } else {
                    i++;
                }
                break;
            }
            case DrawingCommandName.moveNoClose: {
                if (i + 2 < tokens.length) {
                    commands.push({
                        name: DrawingCommandName.moveNoClose,
                        x: Number(tokens[i + 1]),
                        y: Number(tokens[i + 2]),
                    } satisfies DrawingCommandMoveNoClose);
                    i += 3;
                } else {
                    i++;
                }
                break;
            }
            case DrawingCommandName.line: {
                if (i + 2 < tokens.length) {
                    commands.push({
                        name: DrawingCommandName.line,
                        x: Number(tokens[i + 1]),
                        y: Number(tokens[i + 2]),
                    } satisfies DrawingCommandLine);
                    i += 3;
                } else {
                    i++;
                }
                break;
            }
            case DrawingCommandName.bezier: {
                if (i + 6 < tokens.length) {
                    commands.push({
                        name: DrawingCommandName.bezier,
                        x1: Number(tokens[i + 1]),
                        y1: Number(tokens[i + 2]),
                        x2: Number(tokens[i + 3]),
                        y2: Number(tokens[i + 4]),
                        x3: Number(tokens[i + 5]),
                        y3: Number(tokens[i + 6]),
                    } satisfies DrawingCommandBezier);
                    i += 7;
                } else {
                    i++;
                }
                break;
            }
            case DrawingCommandName.extendSpline: {
                if (i + 2 < tokens.length) {
                    commands.push({
                        name: DrawingCommandName.extendSpline,
                        x: Number(tokens[i + 1]),
                        y: Number(tokens[i + 2]),
                    } satisfies DrawingCommandExtendSpline);
                    i += 3;
                } else {
                    i++;
                }
                break;
            }
            case DrawingCommandName.closeSpline: {
                commands.push({
                    name: DrawingCommandName.closeSpline,
                } satisfies DrawingCommandCloseSpline);
                i += 1;
                break;
            }
            case DrawingCommandName.spline: {
                const points: DrawingPoint[] = [];
                i++;
                while (i + 1 < tokens.length) {
                    const xStr = tokens[i];
                    const yStr = tokens[i + 1];

                    // If the next token is a command letter, break out
                    if (Object.values(DrawingCommandName).includes(xStr as DrawingCommandName)) {
                        break;
                    }

                    points.push({ x: Number(xStr), y: Number(yStr) });
                    i += 2;
                }

                commands.push({
                    name: DrawingCommandName.spline,
                    points,
                } satisfies DrawingCommandSpline);
                break;
            }
            default:
                // Implicit line command if there are two numbers and no command letter
                if (!Number.isNaN(Number(token)) && i + 1 < tokens.length && !Number.isNaN(Number(tokens[i + 1]))) {
                    commands.push({
                        name: DrawingCommandName.line,
                        x: Number(token),
                        y: Number(tokens[i + 1]),
                    } satisfies DrawingCommandLine);
                    i += 2;
                } else {
                    i++;
                }
                break;
        }
    }

    return commands;
}

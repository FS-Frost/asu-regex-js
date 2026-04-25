import { DrawingCommand, DrawingCommandNames } from "./types";

export function drawingCommandsToString(commands: DrawingCommand[]): string {
    if (!commands || commands.length === 0) return "";

    const parts: string[] = [];
    let lastCommandName: DrawingCommandNames | null = null;

    for (const cmd of commands) {
        // ASS allows omitting the command letter if it's the same as the previous one
        // (usually seen with consecutive 'l' lines)
        const showName = cmd.name !== lastCommandName || cmd.name !== DrawingCommandNames.line;

        switch (cmd.name) {
            case DrawingCommandNames.move:
            case DrawingCommandNames.moveNoClose:
            case DrawingCommandNames.line:
            case DrawingCommandNames.extendSpline:
                parts.push(`${showName ? cmd.name + " " : ""}${cmd.x} ${cmd.y}`);
                break;
            case DrawingCommandNames.bezier:
                parts.push(`${showName ? cmd.name + " " : ""}${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x3} ${cmd.y3}`);
                break;
            case DrawingCommandNames.closeSpline:
                parts.push(`${cmd.name}`);
                break;
            case DrawingCommandNames.spline: {
                const pointsStr = cmd.points.map(p => `${p.x} ${p.y}`).join(" ");
                parts.push(`${showName ? cmd.name + " " : ""}${pointsStr}`);
                break;
            }
        }

        lastCommandName = cmd.name;
    }

    return parts.join(" ");
}

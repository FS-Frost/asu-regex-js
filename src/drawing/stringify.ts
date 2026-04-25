import { DrawingCommand, DrawingCommandName } from "./types";

export function drawingCommandsToString(commands: DrawingCommand[]): string {
    if (!commands || commands.length === 0) return "";
    
    const parts: string[] = [];
    let lastCommandName: DrawingCommandName | null = null;

    for (const cmd of commands) {
        // ASS allows omitting the command letter if it's the same as the previous one
        // (usually seen with consecutive 'l' lines)
        const showName = cmd.name !== lastCommandName || cmd.name !== DrawingCommandName.line;

        switch (cmd.name) {
            case DrawingCommandName.move:
            case DrawingCommandName.moveNoClose:
            case DrawingCommandName.line:
            case DrawingCommandName.extendSpline:
                parts.push(`${showName ? cmd.name + " " : ""}${cmd.x} ${cmd.y}`);
                break;
            case DrawingCommandName.bezier:
                parts.push(`${showName ? cmd.name + " " : ""}${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x3} ${cmd.y3}`);
                break;
            case DrawingCommandName.closeSpline:
                parts.push(`${cmd.name}`);
                break;
            case DrawingCommandName.spline: {
                const pointsStr = cmd.points.map(p => `${p.x} ${p.y}`).join(" ");
                parts.push(`${showName ? cmd.name + " " : ""}${pointsStr}`);
                break;
            }
        }
        
        lastCommandName = cmd.name;
    }

    return parts.join(" ");
}

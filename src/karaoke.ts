import { ContentItem, TagKf, TagName, calculateLineDurationInSeconds, contentsToString, type Line } from "./asu";
import { regexRomaji } from "./regex";

export function splitSyllabes(line: Line): void {
    type Syllabe = {
        text: string;
        durationInMs: number;
    };

    const syls: Syllabe[] = [];
    const words = line.content.split(" ");
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (isRomajiWord(word)) {
            const matches = word.matchAll(regexRomaji);
            for (const match of matches) {
                syls.push({
                    text: match[1],
                    durationInMs: 0,
                });
            }
        } else {
            syls.push({
                text: word,
                durationInMs: 0,
            });
        }

        if (i != words.length - 1) {
            syls[syls.length - 1].text += " ";
        }
    }

    const lineDurationInSeconds = calculateLineDurationInSeconds(line);
    const sylDurationInMs = Math.floor(Math.round((lineDurationInSeconds * 100 / syls.length)));
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

    const items: ContentItem[] = [];
    for (const syl of syls) {
        items.push(
            {
                name: "effect",
                tags: [
                    {
                        name: TagName.kf,
                        value: syl.durationInMs,
                    } satisfies TagKf
                ],
            },
            {
                name: "text",
                value: syl.text,
            },
        );
    }

    line.content = contentsToString(items);
}

export function isRomajiWord(word: string): boolean {
    while (word.length > 0) {
        const match = word.match(regexRomaji);
        if (!match || match.length === 0) {
            return false;
        }

        word = word.substring(match[0].length);
    }

    return true;
}

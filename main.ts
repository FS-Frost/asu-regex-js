enum TagName {
    fs = "fs",
    be = "be",
    t = "t",
}

type Tag = {
    name: TagName;
    value: string;
};

type TagFs = {
    name: TagName.fs;
    value: number;
};

type TagT = {
    name: TagName.t;
    t1: number;
    t2: number;
    accel: number;
    tags: Tag[];
};

function parseTagFs(tag: Tag): TagFs {
    const target: TagFs = {
        name: TagName.fs,
        value: Number(tag.value.substring(("\\" + tag.name).length)),
    };

    return target;
}

function parseTagT(tag: Tag): TagT {
    const match = [...tag.value.matchAll(regexpTagT)][0];
    console.log(match);

    const target: TagT = {
        name: TagName.t,
        accel: Number(match[1]),
        t1: Number(match[2]),
        t2: Number(match[3]),
        tags: [],
    };

    return target;
}

function composeRegex(...regexes: RegExp[]): RegExp {
    return new RegExp(regexes.map(regex => regex.source).join("|"), "g");
}


const regexTagBe = /\\be\d+/g;
const regexTagFs = /\\fs\d+/g;
const regexpTags0 = composeRegex(regexTagBe, regexTagFs);
const regexpTagT = /\\t\((\d+),(\d+),(\d+),(\\be\d+|\\fs\d+)*\)/g;
const regexpTags = composeRegex(regexTagBe, regexTagFs, regexpTagT);

function parseEffect(text: string) {
    console.log(text);
    const matches = text.matchAll(regexpTags);
    const tags: Tag[] = [];

    for (const match of matches) {
        console.log("\nmatch", match);
        const submatch: string = match[0];
        console.log("submatch:", submatch);

        if (submatch.startsWith("\\" + TagName.fs)) {
            const tag: Tag = {
                name: TagName.fs,
                value: submatch,
            };
            tags.push(tag);
            continue;
        }

        if (submatch.startsWith("\\" + TagName.be)) {
            const tag: Tag = {
                name: TagName.be,
                value: submatch,
            };
            tags.push(tag);
            continue;
        }

        if (submatch.startsWith("\\" + TagName.t)) {
            const tag: Tag = {
                name: TagName.t,
                value: submatch,
            };
            tags.push(tag);
            continue;
        }
    }

    console.log("\nTags:", tags.length);
    console.log(tags);

    const tagFs: TagFs = parseTagFs(
        tags.find(x => x.name == TagName.fs)
        ?? { name: TagName.fs, value: "" }
    );
    console.log("\nFont size:", tagFs);

    const tagT: TagT = parseTagT(
        tags.find(x => x.name == TagName.t)
        ?? { name: TagName.fs, value: "" }
    );
    console.log("\nTransform:", tagT);
}

function main0() {
    const lines: string[] = [
        `\\be5\\fs32\\t(2,10,6,\\fs63\\be1)`,
    ];

    for (const line of lines) {
        parseEffect(line);
    }
}

class Regex {
    exp: string = "";

    constructor(baseExpression: string = "") {
        this.exp = baseExpression;
    }

    digit(n: number) {
        this.exp += `\\d${n}`;
        return this;
    }

    anyDigit() {
        this.exp += "\\d";
        return this;
    }

    digits() {
        this.exp += "\\d+";
        return this;
    }

    compose(re: Regex) {
        this.exp += re.toString();
        return this;
    }

    toString(): string {
        return this.exp;
    }

    compile(): RegExp {
        return new RegExp(this.toString());
    }
}

function main() {
    const lines: string[] = [
        `\\be5\\fs32\\t(2,10,6,\\fs63\\be1)`,
    ];

    const r1 = new Regex().anyDigit().digit(2);
    const r2 = new Regex().anyDigit().digit(2);
    console.log(`'${r1.toString()}'`);
}

main();

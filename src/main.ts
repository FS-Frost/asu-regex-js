import * as asu from "./asu";

function main() {
    // testContentParser();
    // testTagParser();
    copyMove();
}

function copyMove() {
    const baseLine = "{\\move(320,470,320,168,0,4963)}COSAS";

    const targetLines: string[] = [
        "{\\pos(182,421)}LINEA 1",
        "{\\pos(470,361)}LINEA 2"
    ];

    let baseItems = asu.parseContent(baseLine);
    const baseMove = asu.findMove(baseItems);
    if (baseMove == null) {
        console.error("base move not found");
        return;
    }

    const deltaX = baseMove.x2 - baseMove.x1;
    const deltaY = baseMove.y2 - baseMove.y1;

    for (let i = 0; i < targetLines.length; i++) {
        const line = targetLines[i];
        const items = asu.parseContent(line);
        const pos = asu.findPos(items);
        if (pos == null) {
            console.error(`line ${i + 1}: pos not found`);
            continue;
        }

        asu.removeTag(items, asu.TagName.pos);
        const x1 = pos.x;
        const y1 = pos.y;
        const x2 = pos.x + deltaX;
        const y2 = pos.y + deltaY;
        asu.setMove(items, x1, y1, x2, y2, baseMove.t1, baseMove.t2);
        const newLine = asu.contentsToString(items);
        console.log(newLine);
        targetLines[i] = newLine;
    }
}

function testContentParser() {
    const text = "{\\be5}{¡Buenos días, {\\i1}Chitanda-san{\\i0}!";
    const items = asu.parseContent(text);
    console.log("=================");
    console.log(asu.contentsToString(items));
    console.log("=================");

    console.log("Items:", items.length);
    for (const item of items) {
        switch (item.name) {
            case "effect":
                console.log("FX :", item.tags);
                break;

            default:
                console.log("TXT:", item.value);
                break;
        }
    }

    // TODO: set/update tag
    const targetIndex = items.findIndex(item => {
        if (item.name != "effect") {
            return;
        }

        if (item.tags.some(t => t.name == asu.TagName.i)) {
            return item;
        }
    });

    if (targetIndex < 0) {
        console.error("tag \\i not found");
        return;
    }

    const item = items[targetIndex];
    if (item.name != "effect") {
        return;
    }

    console.log(item.tags);
}

function testTagParser() {
    let text = `\\be5\\fs32\\t(2,10,6,\\fs63\\be1)`;
    const tags: asu.Tags[] = [];
    asu.parseTags(text, tags);

    console.log("\nTags:", tags.length);
    for (const tag of tags) {
        console.log(tag);
    }
}

main();

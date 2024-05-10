import * as asu from "./asu";

function main() {
    testContentParser();
    // testTagParser();
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

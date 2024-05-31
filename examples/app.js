function showExample() {
    const inputText = document.querySelector("textarea.text");
    if (inputText == null) {
        console.error("failed to show example, inputTextElement not found");
        return;
    }

    inputText.value = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\org(83,0.56)\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))\\fs32}Kirino-san";

    processText(inputText.value);
}

function processText(raw) {
    var line = asu.parseLine(raw)
    if (line == null) {
        console.error("failed to process text, invalid line format");
        showError(`Invalid line format.`);
        return;
    }

    hideError();
    updateText(".line-type", line.type);
    updateText(".line-layer", line.layer);
    updateText(".line-start", asu.timeToString(line.start));
    updateText(".line-end", asu.timeToString(line.end));
    updateText(".line-style", line.style);
    updateText(".line-actor", line.actor);
    updateText(".line-margin-left", line.marginLeft);
    updateText(".line-margin-right", line.marginRight);
    updateText(".line-margin-vertical", line.marginVertical);
    updateText(".line-effect", line.effect);
    updateText(".line-content", line.content);

    const inputItems = document.querySelector("textarea.items");
    if (inputItems == null) {
        console.error("failed to process text, inputItems not found");
        return;
    }

    const items = asu.parseContent(line.content);
    inputItems.value = JSON.stringify(items, null, 2);

    let tagsCount = 0;
    for (const item of items) {
        if (item.name == "effect") {
            tagsCount += item.tags.length;
        }
    }

    updateItemsCount(items.length, tagsCount);
}

function updateText(selector, text) {
    const input = document.querySelector(selector);
    console.log(selector, input);
    if (input == null) {
        return;
    }

    input.textContent = text;
}

function updateItemsCount(itemsCount, tagsCount) {
    const labelItemsCount = document.querySelector("label.items-count");
    if (labelItemsCount == null) {
        console.error("failed to show error, labelItemsCount not found");
        return;
    }


    labelItemsCount.textContent = `Content items: ${itemsCount}, tags: ${tagsCount}`;
}

function showError(msg) {
    updateText(".line-type", "");
    updateText(".line-layer", "");
    updateText(".line-start", "");
    updateText(".line-end", "");
    updateText(".line-style", "");
    updateText(".line-actor", "");
    updateText(".line-margin-left", "");
    updateText(".line-margin-right", "");
    updateText(".line-margin-vertical", "");
    updateText(".line-effect", "");
    updateText(".line-content", "");

    const inputItems = document.querySelector("textarea.items");
    if (inputItems == null) {
        console.error("failed to show error, inputItems not found");
        return;
    }

    updateItemsCount(0, 0);
    inputItems.value = "";

    const container = document.querySelector("p.error");
    if (container == null) {
        console.error("failed to show error, error container not found", { msg });
        return;
    }

    container.style.display = "block";
    container.textContent = msg;
}

function hideError() {
    const container = document.querySelector("p.error");
    if (container == null) {
        console.error("failed to hide error, error container not found", { msg });
        return;
    }

    container.style.display = "none";
}

function main() {
    const inputText = document.querySelector("textarea.text");
    if (inputText == null) {
        console.error("main error, inputText not found");
        return;
    }

    const buttonShowExample = document.querySelector("button.show-example");
    if (inputText == null) {
        console.error("main error, show example button not found");
        return;
    }

    inputText.addEventListener("keyup", (e) => processText(e.target.value));
    buttonShowExample.addEventListener("click", showExample);

    showExample();
}

main();

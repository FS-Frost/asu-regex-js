// TAB NAVIGATION
function setupTabs() {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('is-active'));
            // Add active class to clicked tab
            tab.classList.add('is-active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('is-hidden'));
            // Show corresponding tab content
            const targetId = tab.getAttribute('data-tab');
            document.getElementById(targetId).classList.remove('is-hidden');
        });
    });
}

// ----------------------------------------------------
// LINE PARSER
// ----------------------------------------------------
function showExampleLine() {
    const inputText = document.querySelector("textarea.text");
    if (inputText == null) return;
    inputText.value = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\org(83,0.56)\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))\\fs32}Kirino-san";
    processText(inputText.value);
}

function processText(raw) {
    if (!raw) return showError("Empty line.", ".error");
    var line = asu.parseLine(raw);
    if (line == null) {
        showError(`Invalid line format.`, ".error");
        return;
    }

    hideError(".error");
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

    const items = asu.parseContent(line.content);
    document.getElementById("line-items-json").textContent = JSON.stringify(items, renderColorValues, 2);

    renderVisualItems(items);

    let tagsCount = 0;
    for (const item of items) {
        if (item.name == "effect") tagsCount += item.tags.length;
    }
    updateItemsCount(items.length, tagsCount);
}

function renderVisualItems(items) {
    const container = document.getElementById("line-items-visual");
    container.innerHTML = "";

    for (const item of items) {
        if (item.name === "text") {
            const el = document.createElement("div");
            el.className = "visual-item-text";
            el.textContent = item.value;
            container.appendChild(el);
        } else if (item.name === "effect") {
            const el = document.createElement("div");
            el.className = "visual-item-effect";

            const title = document.createElement("strong");
            title.textContent = "Effect Block";
            el.appendChild(title);

            const tagsList = document.createElement("div");
            tagsList.className = "visual-tags-list";

            renderTagsList(item.tags, tagsList);

            el.appendChild(tagsList);
            container.appendChild(el);
        }
    }
}

function renderTagsList(tagsArray, containerEl) {
    for (const tag of tagsArray) {
        const tagEl = document.createElement("div");
        tagEl.className = "visual-tag";

        const nameEl = document.createElement("div");
        nameEl.className = "visual-tag-name";
        nameEl.textContent = tag.name || "?";
        tagEl.appendChild(nameEl);

        const valEl = document.createElement("div");
        valEl.className = "visual-tag-value";

        // Collect values, skip 'name', 'type', and 'tags' (for \t)
        const values = [];
        for (const key of Object.keys(tag)) {
            if (key !== "name" && key !== "type" && key !== "tags") {
                let displayVal = tag[key];
                if (typeof displayVal === "object" && displayVal !== null) {
                    displayVal = JSON.stringify(displayVal);
                }
                values.push(`${key}: ${displayVal}`);
            }
        }
        valEl.textContent = values.join(", ") || "(no args)";
        tagEl.appendChild(valEl);

        // Render children tags for \t
        if (tag.name === "t" && tag.tags && tag.tags.length > 0) {
            const childrenContainer = document.createElement("div");
            childrenContainer.className = "visual-tags-list";
            childrenContainer.style.borderTop = "1px dashed #ccc";
            childrenContainer.style.padding = "5px";
            childrenContainer.style.backgroundColor = "#fff";
            childrenContainer.style.width = "100%";

            const childrenTitle = document.createElement("div");
            childrenTitle.style.fontSize = "0.75rem";
            childrenTitle.style.fontWeight = "bold";
            childrenTitle.style.color = "#888";
            childrenTitle.style.marginBottom = "3px";
            childrenTitle.textContent = "Animated Tags:";
            childrenContainer.appendChild(childrenTitle);

            renderTagsList(tag.tags, childrenContainer);
            tagEl.appendChild(childrenContainer);
            tagEl.style.flexDirection = "column";
        }

        containerEl.appendChild(tagEl);
    }
}

function updateItemsCount(itemsCount, tagsCount) {
    const labelItemsCount = document.querySelector("label.items-count");
    if (labelItemsCount) {
        labelItemsCount.textContent = `Content items: ${itemsCount}, tags: ${tagsCount}`;
    }
}

// ----------------------------------------------------
// FILE PARSER
// ----------------------------------------------------
function showExampleFile() {
    const fileText = document.querySelector("textarea.file-text");
    if (!fileText) return;
    fileText.value = `[Script Info]
Title: Default Aegisub file
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,{\\pos(400,300)}Hello World!`;
    processFile(fileText.value);
}

function processFile(raw) {
    if (!raw) return showError("Empty file content.", ".file-error");
    const parsedFile = asu.parseASSFile(raw);
    if (!parsedFile) {
        showError("Failed to parse file.", ".file-error");
        return;
    }
    hideError(".file-error");

    // Script Info
    const scriptInfoTbody = document.querySelector(".script-info-table tbody");
    scriptInfoTbody.innerHTML = "";
    if (parsedFile.scriptInfo) {
        for (const [key, value] of parsedFile.scriptInfo.properties) {
            scriptInfoTbody.innerHTML += `<tr><th>${key}</th><td>${value}</td></tr>`;
        }
    }

    // Styles
    const stylesThead = document.querySelector(".styles-table thead");
    const stylesTbody = document.querySelector(".styles-table tbody");
    stylesThead.innerHTML = "";
    stylesTbody.innerHTML = "";
    if (parsedFile.styles && parsedFile.styles.styles.length > 0) {
        const firstStyle = parsedFile.styles.styles[0];
        const keys = Object.keys(firstStyle).filter(k => typeof firstStyle[k] !== 'function');
        stylesThead.innerHTML = `<tr>${keys.map(k => `<th>${k}</th>`).join("")}</tr>`;

        for (const style of parsedFile.styles.styles) {
            stylesTbody.innerHTML += `<tr>${keys.map(k => `<td>${typeof style[k] === 'object' ? JSON.stringify(style[k]) : style[k]}</td>`).join("")}</tr>`;
        }
    }

    // Events
    const eventsThead = document.querySelector(".events-table thead");
    const eventsTbody = document.querySelector(".events-table tbody");
    eventsThead.innerHTML = "";
    eventsTbody.innerHTML = "";
    if (parsedFile.events && parsedFile.events.lines.length > 0) {
        const firstEvent = parsedFile.events.lines[0];
        const keys = Object.keys(firstEvent).filter(k => typeof firstEvent[k] !== 'function');
        eventsThead.innerHTML = `<tr>${keys.map(k => `<th>${k}</th>`).join("")}</tr>`;

        for (const event of parsedFile.events.lines) {
            eventsTbody.innerHTML += `<tr>${keys.map(k => {
                let val = event[k];
                if (k === 'start' || k === 'end') val = asu.timeToString(val);
                return `<td>${val}</td>`;
            }).join("")}</tr>`;
        }
    }
}

// ----------------------------------------------------
// UTILITIES (TIME & COLOR)
// ----------------------------------------------------
function updateColorFromAss() {
    const raw = document.querySelector(".color-input-ass").value.trim();
    const inputR = document.querySelector(".color-input-r");
    const inputG = document.querySelector(".color-input-g");
    const inputB = document.querySelector(".color-input-b");
    const inputA = document.querySelector(".color-input-a");
    const preview = document.querySelector(".color-preview");
    const error = document.querySelector(".color-error");

    if (!raw) {
        error.style.display = "none";
        preview.style.backgroundColor = "transparent";
        return;
    }

    let hex = raw.replace(/&H|&/g, "").toUpperCase();
    let a = 0, b = 0, g = 0, r = 0;
    let valid = false;

    if (hex.length === 6) { // Tag format: BBGGRR
        b = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        r = parseInt(hex.substring(4, 6), 16);
        valid = !isNaN(b) && !isNaN(g) && !isNaN(r);
    } else if (hex.length === 8) { // Style format: AABBGGRR
        a = parseInt(hex.substring(0, 2), 16);
        b = parseInt(hex.substring(2, 4), 16);
        g = parseInt(hex.substring(4, 6), 16);
        r = parseInt(hex.substring(6, 8), 16);
        valid = !isNaN(a) && !isNaN(b) && !isNaN(g) && !isNaN(r);
    }

    if (valid) {
        error.style.display = "none";
        inputR.value = r;
        inputG.value = g;
        inputB.value = b;
        inputA.value = a;

        const alphaFloat = 1 - (a / 255);
        preview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alphaFloat})`;
    } else {
        error.style.display = "block";
        preview.style.backgroundColor = "transparent";
    }
}

function updateAssFromColor() {
    const inputAss = document.querySelector(".color-input-ass");
    const r = parseInt(document.querySelector(".color-input-r").value) || 0;
    const g = parseInt(document.querySelector(".color-input-g").value) || 0;
    const b = parseInt(document.querySelector(".color-input-b").value) || 0;
    const a = parseInt(document.querySelector(".color-input-a").value) || 0;
    const preview = document.querySelector(".color-preview");
    const error = document.querySelector(".color-error");

    error.style.display = "none";

    const toHex = (n) => {
        let h = Math.max(0, Math.min(255, n)).toString(16).toUpperCase();
        return h.length === 1 ? "0" + h : h;
    };

    if (a > 0) {
        inputAss.value = `&H${toHex(a)}${toHex(b)}${toHex(g)}${toHex(r)}`;
    } else {
        inputAss.value = `&H${toHex(b)}${toHex(g)}${toHex(r)}&`;
    }

    const alphaFloat = 1 - (a / 255);
    preview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alphaFloat})`;
}

function processTime(raw) {
    const output = document.querySelector(".time-output");
    if (!raw) {
        output.innerHTML = "";
        return;
    }
    const timeParsed = asu.parseTime(raw);
    if (timeParsed) {
        const totalSecs = asu.timeToSeconds(timeParsed);
        const ms = totalSecs * 1000;
        const mins = totalSecs / 60;
        const hrs = totalSecs / 3600;

        output.innerHTML = `<div><strong>Total ms:</strong> ${ms}</div>
                            <div><strong>Total seconds:</strong> ${totalSecs}</div>
                            <div><strong>Total minutes:</strong> ${mins}</div>
                            <div><strong>Total hours:</strong> ${hrs}</div>`;
    } else {
        output.textContent = "Invalid time format.";
    }
}

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
function updateText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text || "";
}

function showError(msg, selector) {
    const container = document.querySelector(selector);
    if (container) {
        container.style.display = "block";
        container.textContent = msg;
    }
}

function hideError(selector) {
    const container = document.querySelector(selector);
    if (container) container.style.display = "none";
}

function renderColorValues(key, value) {
    // Custom replacer for JSON.stringify to handle color objects minimally
    return value;
}

// ----------------------------------------------------
// MAIN
// ----------------------------------------------------
function main() {
    setupTabs();

    // Toggle JSON vs Visual
    const btnJson = document.getElementById("btn-view-json");
    const btnVisual = document.getElementById("btn-view-visual");
    const viewJson = document.getElementById("view-json");
    const viewVisual = document.getElementById("view-visual");

    if (btnJson && btnVisual) {
        btnJson.addEventListener("click", () => {
            btnJson.classList.add("is-selected", "is-link");
            btnVisual.classList.remove("is-selected", "is-link");
            viewJson.classList.remove("is-hidden");
            viewVisual.classList.add("is-hidden");
        });
        btnVisual.addEventListener("click", () => {
            btnVisual.classList.add("is-selected", "is-link");
            btnJson.classList.remove("is-selected", "is-link");
            viewVisual.classList.remove("is-hidden");
            viewJson.classList.add("is-hidden");
        });
    }

    // Line Parser
    const inputText = document.querySelector("textarea.text");
    if (inputText) inputText.addEventListener("input", (e) => processText(e.target.value));
    const btnShowExampleLine = document.querySelector(".show-example-line");
    if (btnShowExampleLine) btnShowExampleLine.addEventListener("click", showExampleLine);
    showExampleLine();

    // File Parser
    const fileText = document.querySelector("textarea.file-text");
    if (fileText) fileText.addEventListener("input", (e) => processFile(e.target.value));
    const btnShowExampleFile = document.querySelector(".show-example-file");
    if (btnShowExampleFile) btnShowExampleFile.addEventListener("click", showExampleFile);
    showExampleFile();

    // Utils
    const colorAss = document.querySelector(".color-input-ass");
    if (colorAss) colorAss.addEventListener("input", updateColorFromAss);
    const colorR = document.querySelector(".color-input-r");
    if (colorR) colorR.addEventListener("input", updateAssFromColor);
    const colorG = document.querySelector(".color-input-g");
    if (colorG) colorG.addEventListener("input", updateAssFromColor);
    const colorB = document.querySelector(".color-input-b");
    if (colorB) colorB.addEventListener("input", updateAssFromColor);
    const colorA = document.querySelector(".color-input-a");
    if (colorA) colorA.addEventListener("input", updateAssFromColor);

    if (colorAss) {
        colorAss.value = "&H0000FF&";
        updateColorFromAss();
    }

    const timeInput = document.querySelector(".time-input");
    if (timeInput) timeInput.addEventListener("input", (e) => processTime(e.target.value));
    processTime("1:23:45.67");

}

main();

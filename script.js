"use strict";

function countWords(s) {
    // remove punctuation
    s = s.replace(/\p{P}/gu, "");

    let m = s.match(/\S+/g);
    return m ? m.length : 0;
}

function update(statusBar, textArea) {
    let text = textArea.value;
    let qualifier = "";

    if (textArea.selectionStart < textArea.selectionEnd) {
        text = text.slice(textArea.selectionStart, textArea.selectionEnd);
        qualifier = "in selection";
    }

    let charCount = [...text.trim()].length;
    let wordCount = countWords(text);
    statusBar.innerText = `${charCount} characters　${wordCount} words　${qualifier}`;

    localStorage.setItem("text", text);
}

window.addEventListener("load", (event) => {
    let textArea = document.getElementById("input");
    let statusBar = document.getElementById("status");

    let savedText = localStorage.getItem("text");
    if (savedText) {
        textArea.value = savedText;
    }

    textArea.addEventListener("input", (event) => {
        update(statusBar, textArea);
    });
    document.addEventListener("selectionchange", (event) => {
        update(statusBar, textArea);
    });

    update(statusBar, textArea);
});

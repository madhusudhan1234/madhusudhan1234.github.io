
import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const editorTheme = EditorView.theme({
    "&": {
        color: "var(--slate)",
        backgroundColor: "var(--light-navy)",
        borderRadius: "0.5rem",
        border: "1px solid var(--lightest-navy)",
        padding: "0.5rem 0",
    },
    ".cm-content": {
        padding: "0 1rem",
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#fff"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#222"
    },
    ".cm-gutters": {
        backgroundColor: "var(--light-navy)",
        color: "var(--slate)",
        border: "none",
        padding: "0 0.5rem"
    },
    ".cm-scroller": {
        fontFamily: "var(--font-mono)"
    },
    ".cm-line": {
        padding: "0"
    }
});

const highlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "var(--green)" },
]);

export const customTheme = [
    editorTheme,
    syntaxHighlighting(highlightStyle)
];

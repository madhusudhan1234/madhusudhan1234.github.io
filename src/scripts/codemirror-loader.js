
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { customTheme } from './codemirror-theme.js';

async function main() {
    const codeblocks = document.querySelectorAll('pre');

    for (const preElement of codeblocks) {
        const codeElement = preElement.querySelector('code');
        if (!codeElement) continue;

        const code = codeElement.textContent?.replace(/\n$/, '') || '';

        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                EditorView.editable.of(false),
                customTheme
            ]
        });

        const parent = preElement.parentNode;
        if (parent) {
            const wrapper = document.createElement('div');
            parent.insertBefore(wrapper, preElement);
            preElement.style.display = 'none';

            new EditorView({
                state,
                parent: wrapper,
            });
        }
    }
}

main();

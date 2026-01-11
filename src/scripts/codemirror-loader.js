
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

async function main() {
    const codeblocks = document.querySelectorAll('pre');

    for (const preElement of codeblocks) {
        const codeElement = preElement.querySelector('code');
        if (!codeElement) continue;

        const code = codeElement.textContent?.replace(/\n$/, '') || '';
        const langMatch = codeElement.className.match(/language-(\S+)/);
        let lang = langMatch ? langMatch[1] : 'plaintext';

        // Normalize language names
        const langMap = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'yml': 'yaml',
            'md': 'markdown'
        };
        lang = langMap[lang] || lang;

        const extensions = [basicSetup];
        let languageSupport;

        try {
            switch (lang) {
                case 'javascript':
                case 'typescript':
                case 'jsx':
                case 'tsx':
                    languageSupport = (await import('@codemirror/lang-javascript')).javascript();
                    break;
                case 'python':
                    languageSupport = (await import('@codemirror/lang-python')).python();
                    break;
                case 'html':
                    languageSupport = (await import('@codemirror/lang-html')).html();
                    break;
                case 'css':
                    languageSupport = (await import('@codemirror/lang-css')).css();
                    break;
                case 'json':
                    languageSupport = (await import('@codemirror/lang-json')).json();
                    break;
                case 'markdown':
                    languageSupport = (await import('@codemirror/lang-markdown')).markdown();
                    break;
                case 'yaml':
                    languageSupport = (await import('@codemirror/lang-yaml')).yaml();
                    break;
            }
        } catch(e) {
            console.error(`Failed to load language support for ${lang}`, e);
        }

        if (languageSupport) {
            extensions.push(languageSupport);
        }

        const state = EditorState.create({
            doc: code,
            extensions: [
                ...extensions,
                EditorView.editable.of(false),
                vscodeDark
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


import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';

async function main() {
    const codeblocks = document.querySelectorAll('pre');
    const editors = [];
    if (!document.getElementById('cm-copy-style')) {
        const style = document.createElement('style');
        style.id = 'cm-copy-style';
        style.textContent = `
        .cm-wrapper{position:relative;margin:1rem 0}
        .cm-toolbar{position:absolute;top:8px;right:8px;display:flex;gap:8px}
        .cm-copy{background:var(--light-navy);color:var(--lightest-slate);border:1px solid var(--lightest-navy);border-radius:4px;padding:4px 8px;font-family:var(--font-mono);font-size:12px;cursor:pointer;transition:var(--transition)}
        .cm-copy:hover{color:var(--green)}
        `;
        document.head.appendChild(style);
    }

    for (const preElement of codeblocks) {
        const codeElement = preElement.querySelector('code');
        if (!codeElement) continue;

        const code = codeElement.textContent?.replace(/\n$/, '') || '';
        const langMatch = codeElement.className.match(/language-(\S+)/);
        let lang = langMatch ? langMatch[1] : 'plaintext';

        // Normalize language names and common aliases
        const langMap = {
            'js': 'javascript',
            'javascript': 'javascript',
            'ts': 'typescript',
            'tsx': 'tsx',
            'jsx': 'jsx',
            'py': 'python',
            'yml': 'yaml',
            'md': 'markdown',
            'jsonc': 'json',
            'shell': 'bash',
            'sh': 'bash',
            'bash': 'bash'
        };
        lang = langMap[lang] || lang;

        const extensions = [basicSetup];
        let languageSupport;

        try {
            switch (lang) {
                case 'javascript':
                case 'jsx':
                    languageSupport = (await import('@codemirror/lang-javascript')).javascript({ jsx: true });
                    break;
                case 'typescript':
                case 'tsx':
                    languageSupport = (await import('@codemirror/lang-javascript')).javascript({ typescript: true, jsx: lang === 'tsx' });
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
                default:
                    // Fallback to JavaScript highlighting to mimic VSCode JS look
                    languageSupport = (await import('@codemirror/lang-javascript')).javascript({ jsx: true });
                    break;
            }
        } catch(e) {
            console.error(`Failed to load language support for ${lang}`, e);
        }

        if (languageSupport) {
            extensions.push(languageSupport);
        }

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const theme = isDark ? vscodeDark : vscodeLight;
        const themeCompartment = new Compartment();

        const state = EditorState.create({
            doc: code,
            extensions: [
                ...extensions,
                EditorView.editable.of(false),
                EditorView.theme({
                    "&": {
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        borderRadius: "8px",
                        border: "1px solid var(--lightest-navy)",
                    },
                    ".cm-scroller": { overflow: "auto" },
                    ".cm-gutters": { display: "none" },
                }),
                themeCompartment.of(theme)
            ]
        });

        const parent = preElement.parentNode;
        if (parent) {
            const wrapper = document.createElement('div');
            wrapper.className = 'cm-wrapper';
            parent.insertBefore(wrapper, preElement);
            preElement.style.display = 'none';

            const view = new EditorView({
                state,
                parent: wrapper,
            });
            const toolbar = document.createElement('div');
            toolbar.className = 'cm-toolbar';
            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'cm-copy';
            copyBtn.textContent = 'Copy';
            copyBtn.setAttribute('aria-label', 'Copy code');
            copyBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                const text = view.state.doc.toString();
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(text);
                    } else {
                        const ta = document.createElement('textarea');
                        ta.value = text;
                        ta.style.position = 'fixed';
                        ta.style.opacity = '0';
                        document.body.appendChild(ta);
                        ta.select();
                        document.execCommand('copy');
                        document.body.removeChild(ta);
                    }
                    const prev = copyBtn.textContent;
                    copyBtn.textContent = 'Copied';
                    setTimeout(() => (copyBtn.textContent = prev), 1500);
                } catch (_) {}
            });
            toolbar.appendChild(copyBtn);
            wrapper.appendChild(toolbar);
            editors.push({ view, themeCompartment });
        }
    }

    const observer = new MutationObserver(() => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const theme = isDark ? vscodeDark : vscodeLight;
        editors.forEach(({ view, themeCompartment }) => {
            view.dispatch({ effects: themeCompartment.reconfigure(theme) });
        });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

main();

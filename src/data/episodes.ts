export interface Episode {
    id: number;
    title: string;
    description: string;
    audioFile: string;
    publishDate: string;
    duration?: string;
    imageUrl?: string;
}

export const episodes: Episode[] = [
    {
        id: 1,
        title: "Astro 5.5, Tailwind UI, Typescript 7, and More",
        description: `
Astro is a JavaScript web framework optimized for building fast, content-driven websites which is updated to version 5.5, Astro 5.5 dives deep with better support for diagramming tools, improved Markdown compatibility, and type-safe sessions!

Addition to these another experimental feature is:

[preserve order of style and script tags](https://astro.build/blog/astro-550/?ref=dailydev#experimental-preserve-order-of-style-and-script-tags)

[Link](https://astro.build/blog/astro-550/?ref=dailydev)

Tailwind UI is now Tailwind Plus which is just shipped a huge rebrand project, turning what was previously known as Tailwind UI into [Tailwind Plus](https://tailwindcss.com/plus).

[Link](https://tailwindcss.com/blog/tailwind-plus?ref=dailydev)


TypeScript 7 introduces a native compiler promising performance improvements up to 10 times faster than the current compiler. This new implementation, written in Go, aims to enhance editor responsiveness, build times, and memory usage.

[Link](https://app.daily.dev/posts/typescript-just-dropped-a-native-port-of-the-compiler-written-with-go--iwx21ukx3)

Elon Musk’s AI company, xAI, has acquired Hotshot, a startup working on AI-powered video generation tools along the lines of OpenAI’s [Sora](https://techcrunch.com/2025/02/28/openai-plans-to-bring-soras-video-generator-to-chatgpt/).

Aakash Sastry, Hotshot’s CEO and co-founder, [announced the news](https://x.com/aakashsastry/status/1901668601364689338) in a post on X on Monday.

[Link](https://techcrunch.com/2025/03/17/elon-musks-ai-company-xai-acquires-a-generative-ai-video-startup/?utm_source=tldrnewsletter)

This week, I learned about Vibe coding. It’s an approach that involves AI agents like Cursor and Windsurf to write entire applications with minimal human intervention. 

[Link](https://app.daily.dev/posts/vibe-coding-tutorial-and-best-practices-cursor-windsurf--ogsgvfvzq)

Google Cloud is acquiring Wiz for $32 billion to enhance cloud security for businesses and governments. Wiz provides tools to prevent, detect, and respond to cyber threats.

[Link](https://cloud.google.com/blog/products/identity-security/google-announces-agreement-acquire-wiz)

WebStorm 2025.1 Beta Is Here With AI Enhancements, Framework Improvements, and a Better User Experience.

[Link](https://blog.jetbrains.com/webstorm/2025/03/webstorm-2025-1-beta/?ref=dailydev)

The court rejects Elon’s latest attempt to slow OpenAI down. Last week, the court rejected Elon’s request for a preliminary injunction, finding that he hadn’t “demonstrated likelihood of success on the merits” of his claims. In fact, the court went further, dismissing several of his claims from the case entirely.

[Link](https://openai.com/index/court-rejects-elon/?utm_source=tldrai) 


Chrome replaced FreeType with Skrifa, a Rust-based font processing library, to improve memory safety and reduce security vulnerabilities related to web fonts. FreeType is written in unsafe code and has a history of security issues that cost Google significant resources to address. Skrifa uses Rust's memory safety features and has rigorous testing to provide a more secure and reliable solution.

[Link](https://developer.chrome.com/blog/memory-safety-fonts?utm_source=tldrwebdev)


Docs is a new open-source collaborative text editor, intended as an alternative to Notion, Google Docs, Outline, and other similar web-based services. Interestingly, the project is being led by the governments of France and Germany.

[Link](https://www.howtogeek.com/docs-alternative-google-docs-notion-france-germany/?ref=dailydev)`,
        audioFile: "first-episode.m4a",
        publishDate: "2025-03-21",
        duration: "03:21"
    }
];
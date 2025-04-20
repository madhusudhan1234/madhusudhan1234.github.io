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
        id: 5,
        title: "Firebase Studio's AI Power, NativePHP's Desktop Dream & Deployment Tactics",
        description: 'TODO: add description later',
        audioFile: "fifth-episode.MP3",
        publishDate: "2025-04-17",
        duration: "05:43"
    },
    {
        id: 4,
        title: "An early look at PHP 9.0's, Javascript debug ids, A2A and more",
        description: `PHP 9.0 is bringing major changes focused on making the language more predictable and developer-friendly. Key updates include stricter increment/decrement behavior, improved error handling with UnserializationFailedException, clearer function signatures, and simplified string interpolation.
            [Link](https://benjamincrozat.com/php-90?ref=dailydev)

            Debug IDs, introduced by Sentry, are revolutionizing JavaScript debugging by connecting transformed code back to original source maps. They're pushing to make this a standard feature in JavaScript, with tools and plugins already available.
            [Link](https://blog.sentry.io/javascript-needs-debug-ids/)

            AI agents are emerging as sophisticated cyber attackers, capable of executing complex operations at unprecedented scales. Projects like LLM Agent Honeypot are studying these threats, highlighting the need for enhanced cybersecurity measures.
            [Link](https://www.technologyreview.com/2025/04/04/1114228/cyberattacks-by-ai-agents-are-coming?utm_source=tldrai)

            Laravel 12.8 introduces Automatic Eager Loading (beta), eliminating the need for manual relationship loading. The automaticallyEagerLoadRelationships() method automatically handles eager loading "just in time." Additional updates include fromJson() for Collections and improved soft delete functionality.
            [Link](https://x.com/taylorotwell/sta)`,
        audioFile: "fourth-episode.m4a",
        publishDate: "2025-04-14",
        duration: "09:06"
    },
    {
        id: 3,
        title: "Next.js Middleware Bypass, TikTok's Final Proposal, OpenAI, Software Engineers & More",
        description: `Vercel has published a postmortem on CVE-2025-29927, a critical vulnerability in Next.js related to Middleware bypass. The timeline outlines the vulnerability's disclosure, investigation, patching, and public announcement.
            [Link](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass?utm_source=tldrwebdev)
            The state of the front-end and full-stack job market shows React and Next.js are highly sought after, along with Javascript and Typescript. AWS is the dominant cloud provider and PostgreSQL remains a popular database.
            [Link](https://tsev.dev/posts/2025-03-26-the-state-of-the-frontend-and-fullstack-job-market/?utm_source=tldrwebdev)
            A manager whose harsh feedback initially frustrated this dev, Stephane, ultimately transformed his approach to software engineering. This manager prioritized clean, maintainable, and efficient code.
            [Link](https://www.blog4ems.com/p/the-manager-i-hated?utm_source=tldrwebdev)
            A final proposal for TikTok will be issued wednesday. Trump's administration is finalizing plans for potential investors. ByteDance has until Saturday to sell its stake in TikTok or potentially face a ban in the US market.
            [Link](https://www.cbsnews.com/news/trump-consider-final-tiktok-proposal/?utm_source=tldrnewsletter)
            OpenAI Academy offers free AI education globally, including workshops, courses, and interactive learning with AI models like GPT-5 to personalize feedback and learning experiences.
            [Link](https://techstartups.com/2025/04/01/openai-launches-openai-academy-a-free-ai-learning-platform-for-everyone/?utm_source=tldrai)
            Software engineers are not in immediate danger of being replaced by AI despite the hype. The real issue lies in the lack of understanding between engineers and their non-technical colleagues.
            [Link](https://toddle.dev/blog/why-is-everyone-trying-to-replace-software-engineers?ref=dailydev)`,
        audioFile: "third-episode.m4a",
        publishDate: "2025-04-06",
        duration: "03:55"
    },
    {
        id: 2,
        title: "AI, React, PHPxTKY meetup and More",
        description: `"Tokenize Image as a Set" is a new framework for image generation that uses set-based tokenization and a novel discrete diffusion method. The approach represents images as unordered token sets, enabling a unique and invertible generative modeling process.

[Link](https://github.com/Gengzigang/TokenSet?utm_source=tldrai)

Perplexity AI envisions a TikTok that prioritizes deep content discovery and truth-seeking powered by an advanced answer engine. It plans to enhance the platform's utility while maintaining its core function as a hub for creative expression.

[Link](https://www.perplexity.ai/hub/blog/rebuilding-tiktok-in-america?utm_source=tldrai)

A major trend in 2025 is the increasing adoption of React Server Components (RSC) as a standard and React Server Functions (RSF), which simplify data fetching and mutations in both Server and Client components. React is going through UI standardization through libraries like Shadcn UI and tooling streamlining with tools like Biome.

[Link](https://www.robinwieruch.de/react-trends/?utm_source=tldrwebdev)

The rise of AI coding assistants is causing an identity crisis for software engineers, who are shifting from hands-on builders to orchestrators of AI-generated code. This transition challenges the core satisfaction engineers get from creating solutions and mastering technical skills. For devs to adapt to this change, they should balance deep technical work with strategic AI orchestration.

[Link](https://annievella.com/posts/the-software-engineering-identity-crisis/?utm_source=tldrwebdev)

Elon Musk's AI chatbot, Grok, is now available on Telegram, offering its sarcastic assistant to over 1 billion users. Bundled with Telegram Premium, Grok expands beyond X, enhancing the platform with real-time reasoning and coding capabilities. While it raises privacy concerns, this move positions Telegram in the competitive AI landscape alongside giants like ChatGPT and Google's Gemini.

[Link](https://techstartups.com/2025/03/26/elon-musks-grok-ai-joins-telegram-gaining-access-to-over-1-billion-users-a-new-era-for-search-and-chat/?utm_source=tldrai)

A PHP/Laravel meetup in the Tokyo area for web artisans looking to learn and connect. This Saturday, we hosted a meetup featuring four speakers who delivered amazing talks. With over 38 participants from around the world, it was a fantastic networking experience!

[Link](https://www.meetup.com/phpxtky/)

It's okay to not know everything as a dev - instead, focus on problem-solving, use your network, and always keep learning.

[Link](https://spin.atomicobject.com/you-dont-know-everything-its-ok/?utm_source=tldrwebdev)`,
        audioFile: "second-episode.m4a",
        publishDate: "2025-03-30",
        duration: "03:15"
    },
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
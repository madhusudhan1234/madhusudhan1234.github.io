# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:4321
npm run build     # build static site to dist/
npm run preview   # preview the built dist/
```

No test suite. Verify changes with `npm run build` and manual review in the dev server.

## Stack

- **Astro 5** (static output, MDX, sitemap, RSS integrations)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin — no config file, imported directly in `src/styles/global.css`
- **CodeMirror 6** — replaces native `<pre>` blocks on page load with read-only syntax-highlighted editors
- **TypeScript** (tsconfig at root, strict: false)

## Architecture

### Content Collections

Defined in `src/content.config.ts`. Two collections:

| Collection | Source directory | Key fields |
|---|---|---|
| `blog` | `src/content/blog/` (subfolders allowed) | `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `category` (`ai-engineering` \| `fundamentals` \| `backend` \| `devops`), `tags?` (comma-separated string), `series?`, `seriesOrder?`, `featured?`, `draft?` |
| `episodes` | `src/content/episodes/` | `id` (number), `title`, `description`, `published`, `audioLink`, `publishDate`, `duration`, `tags` (comma-separated) |

The former `notes` collection was merged into the blog as the **Fundamentals** series (`src/content/blog/fundamentals/`). Old `/notes/...` URLs redirect there (`notesRedirects()` in `src/utils/lastmod.mjs`, wired in `astro.config.mjs`). Use `getPosts()` (`src/utils/posts.ts`) rather than `getCollection('blog')` so drafts are excluded and order is consistent.

### Pages and Routing

- `src/pages/index.astro` — home (hero, AI-era principles, latest writing, podcast, experience, skills, contact)
- `src/pages/about.astro`, `src/pages/ai.astro` — about page and "Software engineering in the AI era" pillar page (both include FAQ + schema)
- `src/pages/blog/index.astro` — blog index; `src/pages/blog/topic/[topic].astro` — topic hubs (one per `category`, `noindex` under 3 posts)
- `src/pages/blog/[...slug].astro` — post (uses `BlogPost.astro` layout: reading time, series nav, related posts)
- `src/pages/weekly/index.astro`, `weekly/page/[page].astro` — episode list (shared `WeeklyList.astro`), `weekly/[id].astro` — single episode (keyed by `id`)

### Shared Layout

`BlogPost.astro` is the single layout used by blog posts. It injects CodeMirror via `<script>import "../scripts/codemirror-loader.js"</script>` in its `<body>` tail. The loader (`src/scripts/codemirror-loader.js`) runs at page load, finds all `<pre>` elements, and replaces them with read-only CodeMirror editors with VSCode light/dark themes.

### Theming

All colors use CSS custom properties defined in `src/styles/global.css`. Light mode is default; dark mode is toggled by setting `data-theme="dark"` on `<html>`. The `Header.astro` component manages the toggle with localStorage persistence. The CSS variables (`--navy`, `--light-navy`, `--slate`, `--green`, etc.) are used throughout both component inline styles and Tailwind arbitrary values like `text-[var(--green)]`.

### Global Constants

`src/consts.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION` used across pages for `<BaseHead>` titles.

### Content conventions

- Don't state specific personal AI tools, workflows or experience as fact unless the author has confirmed them. Opinions, general guidance and topics the site covers are fine. If an unconfirmed first-person claim is unavoidable, mark it `TODO(confirm)` (HTML comment in markdown/Astro, `//` in frontmatter code) and grep for it before finalising.
- AI-assisted articles carry a `> Note:` disclosure line at the top.

### SEO / AIO

- `BaseHead.astro` is the single head component (canonical, OG/Twitter, robots, optional `jsonLd` prop). Emit JSON-LD only through `JsonLd.astro` / the `jsonLd` prop: expressions inside a plain `<script>` are NOT evaluated by Astro.
- Shared identity and URLs live in `src/consts.ts`; schema helpers (`personNode`, `websiteNode`, `breadcrumbList`, `toIsoDuration`) in `src/utils/seo.ts`.
- Always use `getPublishedEpisodes()` (`src/utils/episodes.ts`) instead of `getCollection('episodes')` so the `published` flag is honoured everywhere.
- `/llms.txt` and `/llms-full.txt` are generated from the collections; the sitemap is `@astrojs/sitemap` only (lastmod from `src/utils/lastmod.mjs`). `robots.txt` explicitly allows AI crawlers.
- `public/CNAME` must stay `madhusudhansubedi.com.np`. After changing JSON-LD, validate the built `dist/` output (parse every `application/ld+json` block).

## Deployment

Static output goes to `dist/`. Deployed to GitHub Pages at `madhusudhansubedi.com.np` (see `CNAME`). The `astro.config.mjs` sets `site: 'https://madhusudhansubedi.com.np'` which affects sitemap and canonical URLs.

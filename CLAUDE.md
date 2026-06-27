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

Defined in `src/content.config.ts`. Three collections:

| Collection | Source directory | Key fields |
|---|---|---|
| `blog` | `src/content/blog/` | `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?` |
| `notes` | `src/content/notes/` | same as blog + `tags?` (comma-separated string) |
| `episodes` | `src/content/episodes/` | `id` (number), `title`, `description`, `published`, `audioLink`, `publishDate`, `duration`, `tags` (comma-separated) |

Notes are organized into subfolders (e.g. `src/content/notes/data-structure/`). The notes index page groups them by folder name (title-cased), with `misc` as the fallback for root-level files.

### Pages and Routing

- `src/pages/index.astro` — home
- `src/pages/blog/[...slug].astro` — blog post (uses `BlogPost.astro` layout)
- `src/pages/notes/[...slug].astro` — note detail (uses `BlogPost.astro` layout)
- `src/pages/notes/tag/[tag].astro` — notes filtered by tag
- `src/pages/weekly/index.astro` — episode list (first page, 10 per page)
- `src/pages/weekly/page/[page].astro` — paginated episodes
- `src/pages/weekly/[id].astro` — single episode (keyed by `id` number, not slug)

### Shared Layout

`BlogPost.astro` is the single layout used by both blog posts and notes. It injects CodeMirror via `<script>import "../scripts/codemirror-loader.js"</script>` in its `<body>` tail. The loader (`src/scripts/codemirror-loader.js`) runs at page load, finds all `<pre>` elements, and replaces them with read-only CodeMirror editors with VSCode light/dark themes.

### Theming

All colors use CSS custom properties defined in `src/styles/global.css`. Light mode is default; dark mode is toggled by setting `data-theme="dark"` on `<html>`. The `Header.astro` component manages the toggle with localStorage persistence. The CSS variables (`--navy`, `--light-navy`, `--slate`, `--green`, etc.) are used throughout both component inline styles and Tailwind arbitrary values like `text-[var(--green)]`.

### Global Constants

`src/consts.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION` used across pages for `<BaseHead>` titles.

## Deployment

Static output goes to `dist/`. Deployed to GitHub Pages at `madhusudhansubedi.com.np` (see `CNAME`). The `astro.config.mjs` sets `site: 'https://madhusudhansubedi.com.np'` which affects sitemap and canonical URLs.

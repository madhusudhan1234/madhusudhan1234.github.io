# Madhu Sudhan Subedi — Personal Website

A fast, content‑driven personal site built with Astro. It includes:
- Blog posts (MD/MDX) with RSS and sitemap
- Notes with tag filtering (e.g., `js-data-structure`)
- Weekly podcast episodes with per‑episode pages and audio embeds

## Tech Stack
- Astro 5
- MD/MDX content collections
- Vanilla CSS (global theme)
- RSS + Sitemap integrations

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:4321
```

## Build
```bash
npm run build
npm run preview
```
Static output is written to `dist/`.

## Project Structure
```
src/
  components/        # shared UI (Header, Footer, etc.)
  content/
    blog/            # blog posts (MD/MDX)
    notes/           # notes (MD/MDX)
    episodes/        # weekly episode metadata (MD)
  layouts/           # page/post layouts
  pages/
    index.astro
    blog/            # blog index and routes
    notes/           # notes index and routes
      tag/[tag].astro  # filter notes by tag
    weekly/          # weekly index and episode pages
styles/
  global.css         # site theme and layout styles
content.config.ts    # content collections and schemas
```

## Content Authoring

### Blog frontmatter
```yaml
title: string
description: string
pubDate: string (coerced to Date)
updatedDate?: string
heroImage?: string
```

### Notes frontmatter
```yaml
title: string
description: string
pubDate: string (coerced to Date)
updatedDate?: string
heroImage?: string
tags?: string        # comma-separated or single tag
```

Tag filter page is available at `/notes/tag/{tag}`.

### Weekly episodes frontmatter
```yaml
id: number
title: string
description: string
published: boolean
audioLink: string
publishDate: string (coerced to Date)
duration: string
tags: string
```

## Routes
- `/` — Home
- `/blog` — Blog index
- `/blog/{slug}` — Blog post
- `/notes` — Notes index
- `/notes/{slug}` — Note detail
- `/notes/tag/{tag}` — Notes filtered by tag
- `/weekly` — Weekly index (paginated)
- `/weekly/{id}` — Episode detail
- `/rss.xml` — RSS feed

## Scripts
- `npm run dev` — Start local dev server
- `npm run build` — Build static site
- `npm run preview` — Preview built site

## Deployment
This project builds to static HTML/CSS/JS. You can deploy `dist/` to any static host (e.g., GitHub Pages, Cloudflare Pages, Netlify, Vercel static sites).

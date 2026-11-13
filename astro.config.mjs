// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { buildLastmodMap, notesRedirects, thinTopicUrls } from './src/utils/lastmod.mjs';

const site = 'https://madhusudhansubedi.com.np';
const lastmod = buildLastmodMap(site);
const thinTopics = thinTopicUrls(site);

export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      // Paginated archives, the 404 page, redirect stubs and thin (noindex) topic hubs stay out.
      filter: (page) =>
        !page.includes('/weekly/page/') &&
        !page.includes('/notes/') &&
        !page.endsWith('/404/') &&
        !thinTopics.has(page),
      serialize(item) {
        const date = lastmod.get(item.url);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  output: 'static',
  redirects: {
    // Page 1 of the episode archive is /weekly/
    '/weekly/page/1': '/weekly/',
    // The Notes section was merged into the blog as the Fundamentals series
    ...notesRedirects(),
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true
    },

    plugins: [tailwindcss()]
  }
});

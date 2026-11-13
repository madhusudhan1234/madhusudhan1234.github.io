// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { buildLastmodMap } from './src/utils/lastmod.mjs';

const site = 'https://madhusudhansubedi.com.np';
const lastmod = buildLastmodMap(site);

export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      // Paginated archives, tag listings and the 404 page are not search landing pages.
      filter: (page) =>
        !page.includes('/weekly/page/') &&
        !page.includes('/notes/tag/') &&
        !page.endsWith('/404/'),
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
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true
    },

    plugins: [tailwindcss()]
  }
});

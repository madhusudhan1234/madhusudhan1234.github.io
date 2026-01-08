// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://madhusudhansubedi.com.np',
  integrations: [mdx(), sitemap()],
  output: 'static',
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true
    }
  }
});

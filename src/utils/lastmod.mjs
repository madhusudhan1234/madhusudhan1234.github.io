// Build-time helpers that read content frontmatter with plain fs, so they can be used from
// astro.config.mjs (content collections aren't available there).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../content/', import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : /\.(md|mdx)$/.test(name) ? [full] : [];
  });
}

function frontmatter(file) {
  const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
      if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return data;
}

function ymd(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function blogPosts() {
  const base = join(ROOT, 'blog');
  return walk(base)
    .map((file) => ({ fm: frontmatter(file), slug: relative(base, file).replace(/\.(md|mdx)$/, '') }))
    .filter((p) => p.fm.draft !== 'true');
}

/** Map of absolute URL -> YYYY-MM-DD for the sitemap. */
export function buildLastmodMap(siteUrl) {
  const map = new Map();
  const latest = { blog: '', episodes: '' };
  const topicLatest = {};

  for (const { fm, slug } of blogPosts()) {
    const date = ymd(fm.updatedDate || fm.pubDate);
    if (!date) continue;
    map.set(`${siteUrl}/blog/${slug}/`, date);
    if (date > latest.blog) latest.blog = date;
    const cat = fm.category || 'backend';
    if (date > (topicLatest[cat] ?? '')) topicLatest[cat] = date;
  }
  for (const file of walk(join(ROOT, 'episodes'))) {
    const fm = frontmatter(file);
    const date = ymd(fm.publishDate);
    if (!date || fm.published === 'false') continue;
    map.set(`${siteUrl}/weekly/${fm.id}/`, date);
    if (date > latest.episodes) latest.episodes = date;
  }

  for (const [cat, date] of Object.entries(topicLatest)) map.set(`${siteUrl}/blog/topic/${cat}/`, date);
  const overall = [latest.blog, latest.episodes].sort().at(-1);
  if (overall) map.set(`${siteUrl}/`, overall);
  if (latest.blog) {
    map.set(`${siteUrl}/blog/`, latest.blog);
  }
  if (latest.episodes) map.set(`${siteUrl}/weekly/`, latest.episodes);
  return map;
}

/** Topic hub URLs with fewer than `min` posts. They are noindex, so keep them out of the sitemap. */
export function thinTopicUrls(siteUrl, min = 3) {
  const counts = {};
  for (const { fm } of blogPosts()) counts[fm.category || 'backend'] = (counts[fm.category || 'backend'] ?? 0) + 1;
  return new Set(
    ['ai-engineering', 'fundamentals', 'backend', 'devops']
      .filter((c) => (counts[c] ?? 0) < min)
      .map((c) => `${siteUrl}/blog/topic/${c}/`),
  );
}

/** Redirects from the retired /notes/ section to their new home in the blog's Fundamentals series. */
export function notesRedirects() {
  const base = join(ROOT, 'blog', 'fundamentals');
  const redirects = { '/notes': '/blog/', '/notes/tag/js-data-structure': '/blog/topic/fundamentals/' };
  for (const file of walk(base)) {
    const slug = relative(base, file).replace(/\.(md|mdx)$/, '');
    redirects[`/notes/data-structure/${slug}`] = `/blog/fundamentals/${slug}/`;
  }
  return redirects;
}

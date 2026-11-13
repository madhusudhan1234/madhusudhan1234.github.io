// Build-time map of site URL -> last modified date (YYYY-MM-DD), read from content frontmatter.
// Plain .mjs + fs so it can be used from astro.config.mjs (content collections aren't available there).
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

export function buildLastmodMap(siteUrl) {
  const map = new Map();
  const latest = { blog: '', notes: '', episodes: '' };

  const add = (section, url, date) => {
    if (!date) return;
    map.set(`${siteUrl}${url}`, date);
    if (date > latest[section]) latest[section] = date;
  };

  for (const file of walk(join(ROOT, 'blog'))) {
    const fm = frontmatter(file);
    const slug = relative(join(ROOT, 'blog'), file).replace(/\.(md|mdx)$/, '');
    add('blog', `/blog/${slug}/`, ymd(fm.updatedDate || fm.pubDate));
  }
  for (const file of walk(join(ROOT, 'notes'))) {
    const fm = frontmatter(file);
    const slug = relative(join(ROOT, 'notes'), file).replace(/\.(md|mdx)$/, '');
    add('notes', `/notes/${slug}/`, ymd(fm.updatedDate || fm.pubDate));
  }
  for (const file of walk(join(ROOT, 'episodes'))) {
    const fm = frontmatter(file);
    add('episodes', `/weekly/${fm.id}/`, ymd(fm.publishDate));
  }

  const overall = [latest.blog, latest.notes, latest.episodes].sort().at(-1);
  if (overall) map.set(`${siteUrl}/`, overall);
  if (latest.blog) map.set(`${siteUrl}/blog/`, latest.blog);
  if (latest.notes) map.set(`${siteUrl}/notes/`, latest.notes);
  if (latest.episodes) map.set(`${siteUrl}/weekly/`, latest.episodes);
  return map;
}

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR_NAME, SITE_URL, SITE_DESCRIPTION, SOCIALS, WEEKLY_DESCRIPTION } from '../consts';
import { getPublishedEpisodes } from '../utils/episodes';
import { truncate } from '../utils/seo';

const oneLine = (s: string) => truncate(s, 200);

export const GET: APIRoute = async () => {
  const [blog, notes, episodes] = await Promise.all([
    getCollection('blog'),
    getCollection('notes'),
    getPublishedEpisodes(),
  ]);
  const byDate = <T extends { data: { pubDate: Date } }>(a: T, b: T) =>
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

  const lines = [
    `# ${AUTHOR_NAME}`,
    '',
    `> ${SITE_DESCRIPTION} Writes about backend engineering, web development, DevOps and data structures, and hosts the Tech Weekly podcast.`,
    '',
    `${AUTHOR_NAME} is a software engineer from Nepal based in Japan with 9+ years of experience (Laravel, PHP, Node.js, AWS, REST APIs). Content on this site is written by ${AUTHOR_NAME}. For full text of everything below, see [llms-full.txt](${SITE_URL}/llms-full.txt).`,
    '',
    '## About',
    '',
    `- [Home](${SITE_URL}/): Bio, work experience and projects`,
    `- [About](${SITE_URL}/about/): Background, skills and how to get in touch`,
    '',
    '## Blog',
    '',
    ...blog.sort(byDate).map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}/): ${oneLine(p.data.description)}`),
    '',
    '## Notes',
    '',
    ...notes.sort(byDate).map((p) => `- [${p.data.title}](${SITE_URL}/notes/${p.id}/): ${oneLine(p.data.description)}`),
    '',
    '## Tech Weekly podcast',
    '',
    WEEKLY_DESCRIPTION,
    '',
    ...episodes.map(
      (e) => `- [Episode ${e.data.id}: ${e.data.title}](${SITE_URL}/weekly/${e.data.id}/): ${oneLine(e.data.description)}`,
    ),
    '',
    '## Optional',
    '',
    `- [RSS feed](${SITE_URL}/rss.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap-index.xml)`,
    `- [GitHub](${SOCIALS.github})`,
    `- [LinkedIn](${SOCIALS.linkedin})`,
    `- [X / Twitter](${SOCIALS.x})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

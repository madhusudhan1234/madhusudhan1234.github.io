import type { APIRoute } from 'astro';
import { AUTHOR_NAME, SITE_URL, SITE_DESCRIPTION } from '../consts';
import { getPublishedEpisodes } from '../utils/episodes';
import { getPosts } from '../utils/posts';

export const GET: APIRoute = async () => {
  const [blog, episodes] = await Promise.all([getPosts(), getPublishedEpisodes()]);

  const day = (d: Date) => d.toISOString().split('T')[0];
  const sections: string[] = [
    `# ${AUTHOR_NAME}: full content`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Source: ${SITE_URL}. All content is written by ${AUTHOR_NAME}. Short index: ${SITE_URL}/llms.txt`,
    '',
  ];

  for (const p of blog) {
    sections.push(
      '---',
      '',
      `# ${p.data.title}`,
      '',
      `URL: ${SITE_URL}/blog/${p.id}/`,
      `Published: ${day(p.data.pubDate)}${p.data.updatedDate ? ` (updated ${day(p.data.updatedDate)})` : ''}`,
      '',
      p.body ?? '',
      '',
    );
  }
  for (const e of episodes) {
    sections.push(
      '---',
      '',
      `# Tech Weekly Episode ${e.data.id}: ${e.data.title}`,
      '',
      `URL: ${SITE_URL}/weekly/${e.data.id}/`,
      `Published: ${day(e.data.publishDate)}`,
      '',
      e.data.description,
      '',
      e.body ?? '',
      '',
    );
  }

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

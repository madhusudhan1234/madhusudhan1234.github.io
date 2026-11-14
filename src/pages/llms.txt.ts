import type { APIRoute } from 'astro';
import { AUTHOR_NAME, SITE_URL, SITE_DESCRIPTION, SOCIALS, WEEKLY_DESCRIPTION } from '../consts';
import { getPublishedEpisodes } from '../utils/episodes';
import { getPosts, TOPICS, TOPIC_SLUGS } from '../utils/posts';
import { truncate } from '../utils/seo';

const oneLine = (s: string) => truncate(s, 200);

export const GET: APIRoute = async () => {
  const [posts, episodes] = await Promise.all([getPosts(), getPublishedEpisodes()]);

  const lines = [
    `# ${AUTHOR_NAME}`,
    '',
    `> ${SITE_DESCRIPTION} Writes about software engineering in the era of AI coding agents, backend engineering, DevOps and computer science fundamentals, and hosts the Tech Weekly podcast.`,
    '',
    `${AUTHOR_NAME} is a software engineer from Nepal based in Japan with 9+ years of experience (Laravel, PHP, Node.js, AWS, REST APIs) who writes about working with AI coding agents. Content on this site is written by ${AUTHOR_NAME}. For full text of everything below, see [llms-full.txt](${SITE_URL}/llms-full.txt).`,
    '',
    '## About',
    '',
    `- [Home](${SITE_URL}/): Bio, work experience and latest writing`,
    `- [About](${SITE_URL}/about/): Background, working principles and how to get in touch`,
    '',
    ...TOPIC_SLUGS.flatMap((slug) => {
      const topicPosts = posts.filter((p) => p.data.category === slug);
      if (!topicPosts.length) return [];
      return [
        `## ${TOPICS[slug].title}`,
        '',
        ...topicPosts.map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}/): ${oneLine(p.data.description)}`),
        '',
      ];
    }),
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
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

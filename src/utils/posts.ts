import { getCollection, type CollectionEntry } from 'astro:content';
import { splitTags } from './seo';

export type Post = CollectionEntry<'blog'>;
export type Category = Post['data']['category'];

export const TOPICS: Record<
  Category,
  { title: string; short: string; description: string; intro: string }
> = {
  'ai-engineering': {
    title: 'AI Engineering',
    short: 'AI Engineering',
    description:
      'Practical articles on software engineering in the era of AI coding agents: reviewing AI-generated code, specs and tests, LLM features in backend systems, and what stays human.',
    intro:
      'How software engineering changes (and what does not) when AI coding agents write a growing share of the code. Practical, opinionated and grounded in backend work.',
  },
  fundamentals: {
    title: 'Fundamentals',
    short: 'Fundamentals',
    description:
      'Core computer science and engineering fundamentals explained with JavaScript: arrays, objects, maps, sets, stacks, queues and linked lists, and why they still matter when AI writes the code.',
    intro:
      'The data structures and ideas that outlast every framework. They matter more, not less, when AI generates the code and you have to judge it.',
  },
  backend: {
    title: 'Backend Engineering',
    short: 'Backend',
    description:
      'Backend engineering articles on databases, job queues, Redis, APIs and system design from a developer working with Laravel, PHP and Node.js.',
    intro: 'Databases, queues, APIs and the plumbing behind real production systems.',
  },
  devops: {
    title: 'DevOps',
    short: 'DevOps',
    description:
      'DevOps articles on automation with Ansible, deployment workflows and infrastructure practices for application developers.',
    intro: 'Automation, deployment and infrastructure practices for application developers.',
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS) as Category[];

/** Non-draft posts, newest first. The single source of truth for lists, RSS, sitemap and llms.txt. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

/** Rough reading time in minutes from the raw markdown body. */
export function readingTime(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function wordCount(body = ''): number {
  return body.split(/\s+/).filter(Boolean).length;
}

/** Posts sharing a category or tags with `post`, best match first. */
export function getRelatedPosts(post: Post, all: Post[], limit = 3): Post[] {
  const tags = new Set(splitTags(post.data.tags));
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      const shared = splitTags(p.data.tags).filter((t) => tags.has(t)).length;
      const score =
        shared * 2 +
        (p.data.category === post.data.category ? 3 : 0) +
        (post.data.series && p.data.series === post.data.series ? 2 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, limit)
    .map((x) => x.p);
}

/** All posts of a series in reading order. */
export function getSeriesPosts(post: Post, all: Post[]): Post[] {
  if (!post.data.series) return [];
  return all
    .filter((p) => p.data.series === post.data.series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

export function categoryLabel(category: Category): string {
  return TOPICS[category].short;
}

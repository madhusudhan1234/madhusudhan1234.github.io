import { getCollection, type CollectionEntry } from 'astro:content';
import { splitTags } from './seo';

export type Episode = CollectionEntry<'episodes'>;

/** Published episodes, newest first. The single source of truth for list pages, RSS, sitemap and llms.txt. */
export async function getPublishedEpisodes(): Promise<Episode[]> {
  const episodes = await getCollection('episodes', (e) => e.data.published);
  return episodes.sort((a, b) => b.data.id - a.data.id);
}

export const EPISODES_PAGE_SIZE = 10;

/** Stable, locale-independent date string (publishDate is parsed as UTC midnight). */
export function formatEpisodeDate(value: Date | string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export const SERIES_ID = 'https://madhusudhansubedi.com.np/weekly/#series';

/** True for tags about AI / LLMs / coding agents (e.g. ai, aiagents, llmcoding, claudecode). */
export function isAiTag(tag: string): boolean {
  const t = tag.toLowerCase();
  return (t.includes('ai') && t !== 'tailwindcss') || /llm|claude|chatgpt|gpt-|cursor|vibecoding/.test(t);
}

export function isAiEpisode(episode: Episode): boolean {
  return splitTags(episode.data.tags).some(isAiTag);
}

/** Episodes sharing the most tags with `episode`, then newest first. */
export function getRelatedEpisodes(episode: Episode, all: Episode[], limit = 3): Episode[] {
  const tags = new Set(splitTags(episode.data.tags));
  return all
    .filter((e) => e.data.id !== episode.data.id)
    .map((e) => ({ e, score: splitTags(e.data.tags).filter((t) => tags.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.e.data.id - a.e.data.id)
    .slice(0, limit)
    .map((x) => x.e);
}

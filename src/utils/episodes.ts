import { getCollection, type CollectionEntry } from 'astro:content';

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

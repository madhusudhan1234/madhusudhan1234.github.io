import {
  SITE_URL,
  AUTHOR_NAME,
  PERSON_ID,
  WEBSITE_ID,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SAME_AS,
  DEFAULT_OG_IMAGE,
} from '../consts';

/** Make a site-relative path absolute. Leaves absolute URLs untouched. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Truncate to a meta-description friendly length at a word boundary. */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s-]+$/, '')}…`;
}

/** "7:56" | "03:21" | "1:02:03" -> ISO 8601 duration ("PT7M56S"). */
export function toIsoDuration(value?: string): string | undefined {
  if (!value) return undefined;
  const parts = value.trim().split(':').map((p) => Number(p));
  if (parts.length < 2 || parts.length > 3 || parts.some((n) => Number.isNaN(n))) return undefined;
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || undefined;
}

/** Split a comma-separated tag string into trimmed, non-empty tags. */
export function splitTags(tags?: string | string[]): string[] {
  if (!tags) return [];
  const list = Array.isArray(tags) ? tags : tags.split(',');
  return list.map((t) => t.trim()).filter(Boolean);
}

/** Build a schema.org BreadcrumbList from [name, path] pairs. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const authorRef = { '@type': 'Person', '@id': PERSON_ID, name: AUTHOR_NAME, url: `${SITE_URL}/about/` };

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR_NAME,
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  jobTitle: 'Software Engineer',
  description:
    'Software engineer from Nepal based in Japan with 9+ years of experience in backend development, APIs and web applications (Laravel, PHP, Node.js, AWS). Writes about software engineering in the era of AI coding agents and hosts the Tech Weekly podcast.',
  nationality: { '@type': 'Country', name: 'Nepal' },
  homeLocation: { '@type': 'Country', name: 'Japan' },
  worksFor: { '@type': 'Organization', name: 'Hivelocity Inc.' },
  knowsAbout: ['Software engineering', 'AI-assisted software engineering', 'AI coding agents', 'LLM application development', 'Backend development', 'Laravel', 'PHP', 'Node.js', 'TypeScript', 'REST APIs', 'AWS', 'Docker', 'Data structures'],
  sameAs: SAME_AS,
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

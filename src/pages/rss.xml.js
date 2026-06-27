import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const [posts, notes, episodes] = await Promise.all([
		getCollection('blog'),
		getCollection('notes'),
		getCollection('episodes'),
	]);

	const blogItems = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: `/blog/${post.id}/`,
	}));

	const noteItems = notes.map((note) => ({
		title: note.data.title,
		description: note.data.description,
		pubDate: note.data.pubDate,
		link: `/notes/${note.id}/`,
	}));

	const episodeItems = episodes
		.filter((e) => e.data.published)
		.map((e) => ({
			title: `Episode #${e.data.id}: ${e.data.title}`,
			description: e.data.description,
			pubDate: new Date(e.data.publishDate),
			link: `/weekly/${e.data.id}/`,
		}));

	const allItems = [...blogItems, ...noteItems, ...episodeItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allItems,
	});
}

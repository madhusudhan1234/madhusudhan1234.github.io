import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getPublishedEpisodes } from '../utils/episodes';
import { getPosts, TOPICS } from '../utils/posts';
import { splitTags } from '../utils/seo';

export async function GET(context) {
	const [posts, episodes] = await Promise.all([getPosts(), getPublishedEpisodes()]);

	const blogItems = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: `/blog/${post.id}/`,
		categories: [TOPICS[post.data.category].short, ...splitTags(post.data.tags)],
	}));

	const episodeItems = episodes.map((e) => ({
		title: `Episode #${e.data.id}: ${e.data.title}`,
		description: e.data.description,
		pubDate: new Date(e.data.publishDate),
		link: `/weekly/${e.data.id}/`,
		categories: ['podcast', ...splitTags(e.data.tags)],
	}));

	const allItems = [...blogItems, ...episodeItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allItems,
		customData: '<language>en-us</language>',
	});
}

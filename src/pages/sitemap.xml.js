import { getCollection } from 'astro:content'

export async function GET() {
  const base = new URL('/', import.meta.env.SITE || 'https://madhusudhansubedi.com.np').origin
  const notes = await getCollection('notes')
  const blog = await getCollection('blog')
  const episodes = await getCollection('episodes')

  const now = new Date().toISOString().split('T')[0]

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog/', priority: '0.8', changefreq: 'weekly' },
    { path: '/notes/', priority: '0.8', changefreq: 'weekly' },
    { path: '/weekly/', priority: '0.8', changefreq: 'weekly' },
  ]

  const allTags = Array.from(
    new Set(
      notes
        .map((n) => n.data.tags)
        .filter((t) => typeof t === 'string' && t.length > 0)
    )
  )

  const entries = [
    ...staticPages.map(({ path, priority, changefreq }) =>
      `<url><loc>${base}${path}</loc><lastmod>${now}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    ),
    ...blog.map((b) => {
      const lastmod = (b.data.updatedDate ?? b.data.pubDate).toISOString().split('T')[0]
      return `<url><loc>${base}/blog/${b.id}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    }),
    ...notes.map((n) => {
      const lastmod = (n.data.updatedDate ?? n.data.pubDate).toISOString().split('T')[0]
      return `<url><loc>${base}/notes/${n.id}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    }),
    ...allTags.map((tag) =>
      `<url><loc>${base}/notes/tag/${tag}/</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>`
    ),
    ...episodes.map((e) => {
      const lastmod = new Date(e.data.publishDate).toISOString().split('T')[0]
      return `<url><loc>${base}/weekly/${e.data.id}/</loc><lastmod>${lastmod}</lastmod><changefreq>never</changefreq><priority>0.6</priority></url>`
    }),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}

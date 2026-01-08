import { getCollection } from 'astro:content'

export async function GET() {
  const base = new URL('/', import.meta.env.SITE || 'https://madhusudhansubedi.com.np').origin
  const notes = await getCollection('notes')
  const blog = await getCollection('blog')
  const episodes = await getCollection('episodes')

  const staticPaths = [
    '/',
    '/blog/',
    '/notes/',
    '/weekly/',
  ]

  const urls = [
    ...staticPaths.map((p) => `${base}${p}`),
    ...notes.map((n) => `${base}/notes/${n.id}/`),
    ...blog.map((b) => `${base}/blog/${b.id}/`),
    ...episodes.map((e) => `${base}/weekly/${e.data.id}/`)
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${u}</loc></url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}

import { divisions } from '~/data/divisions'
import { services } from '~/data/services'
import seed from '~/data/seed.json'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl).replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const staticPaths = ['/', '/divisions', '/services', '/about', '/careers', '/insights', '/foundation', '/contact', '/quote', '/systems', '/uptime-care', '/assessment', '/privacy', '/terms']
  const dynamicPaths = [
    ...divisions.map(d => `/divisions/${d.slug}`),
    ...services.map(s => `/services/${s.slug}`),
    ...(seed.articles as { slug: string }[]).map(a => `/insights/${a.slug}`),
    ...(seed.jobs as { slug: string }[]).map(j => `/careers/${j.slug}`),
  ]

  const urls = [...staticPaths, ...dynamicPaths]
    .map(path => `  <url><loc>${base}${path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
})

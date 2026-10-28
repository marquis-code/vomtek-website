export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /studio',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ].join('\n')
})

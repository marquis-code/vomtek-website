export function useSeo(options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const url = `${config.public.siteUrl}${route.path}`
  const image = options.image || `${config.public.siteUrl}/og.png`

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: `${options.title} — Vomtek`,
    ogDescription: options.description,
    ogType: options.type || 'website',
    ogUrl: url,
    ogImage: image,
    ogSiteName: 'Vomtek',
    twitterCard: 'summary_large_image',
    twitterTitle: `${options.title} — Vomtek`,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}

export function useJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      },
    ],
  })
}

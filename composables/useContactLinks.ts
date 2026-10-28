export function useContactLinks() {
  const site = useSiteConfig()

  const whatsappHref = computed(() => {
    const number = (site.value.company.whatsapp || site.value.company.phoneHref || '').replace(/\D/g, '')
    const message = site.value.company.whatsappMessage || 'Hi Vomtek — I would like to talk about a project.'
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  })

  const whatsappLabel = computed(() => site.value.company.whatsapp ? 'Chat on WhatsApp' : 'Call the shop')
  const consultHref = '/assessment'

  function trackWhatsApp(location: string) {
    track('whatsapp_click', { location })
  }
  function trackConsult(location: string) {
    track('consult_click', { location })
  }

  return { site, whatsappHref, whatsappLabel, consultHref, trackWhatsApp, trackConsult }
}

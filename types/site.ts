export interface CarouselItem {
  image: string
  alt: string
  title: string
  caption: string
  label: string
  credit?: string
}

export interface HeroSlide {
  image: string
  alt: string
  label: string
  kicker: string
  title: string
  description: string
  emphasis: string
}

export interface UptimePlan {
  slug: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  featured: boolean
  ctaLabel: string
}

export interface PublicSiteConfig {
  company: {
    name: string
    legalName: string
    tagline: string
    description: string
    phone: string
    phoneHref: string
    email: string
    address: {
      street: string
      city: string
      state: string
      postalCode: string
      country: string
      full: string
      maps: string
    }
    hours: string
    coordinates: string
    serviceArea: string
    whatsapp: string
    whatsappMessage: string
  }
  socials: { linkedin: string, facebook: string, instagram: string, youtube: string, x: string }
  announcement: { enabled: boolean, text: string, linkLabel: string, linkUrl: string }
  hero: {
    eyebrow: string
    location: string
    titleLine1: string
    titleLine2: string
    emphasis: string
    rotating: string[]
    slides: HeroSlide[]
    subtitle: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
    badges: string[]
  }
  stats: { value: string, label: string, note: string }[]
  carousel: { enabled: boolean, eyebrow: string, title: string, subtitle: string, items: CarouselItem[] }
  sections: Record<string, boolean>
  features: Record<string, boolean>
  plans: UptimePlan[]
  seo: { titleSuffix: string, defaultTitle: string, defaultDescription: string, ogImage: string, twitterHandle: string }
  divisions: Record<string, { enabled: boolean, headline: string, lead: string }>
  services: Record<string, { enabled: boolean, lead: string }>
}

export interface CatalogSystem {
  slug: string
  name: string
  category: string
  summary: string
  description?: string
  priceFrom: number
  priceUnit: string
  leadTime: string
  image: string
  specs: { label: string, value: string }[]
  includes: string[]
  featured: boolean
}

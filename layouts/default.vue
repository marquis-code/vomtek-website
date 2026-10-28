<script setup lang="ts">
import { site } from '~/data/company'

const siteConfig = useSiteConfig()

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://vomtek.com/#organization',
      name: 'Vomtek',
      url: 'https://vomtek.com',
      description: 'Vomtek designs, builds, tests, and commissions custom control panels, PCB assemblies, wire harnesses, and electrical systems from Houston, Texas.',
      telephone: '+1-713-347-1466',
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2401 Fountain View Dr, Ste 312',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        postalCode: '77057',
        addressCountry: 'US',
      },
      areaServed: ['Houston', 'Gulf Coast', 'United States'],
      knowsAbout: ['Control panels', 'UL 508A', 'PCB design', 'Wire harness', 'Motor rewinding', 'Field service'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://vomtek.com/#website',
      url: 'https://vomtek.com',
      name: 'Vomtek',
      publisher: { '@id': 'https://vomtek.com/#organization' },
    },
  ],
}

useJsonLd(orgSchema)
</script>

<template>
  <div>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.14em] focus:text-bone"
    >
      Skip to content
    </a>
    <AnnouncementBar />
    <SiteHeader />
    <main id="main" class="min-h-[60vh]">
      <slot />
    </main>
    <SiteFooter />
    <MobileCtaBar v-if="siteConfig.features.mobileCta !== false" />
    <ContactDock />
  </div>
</template>

<script setup lang="ts">
import { ArrowUp, MapPin, Phone, Mail, Clock } from 'lucide-vue-next'
import { services } from '~/data/services'
import { divisions } from '~/data/divisions'

const year = new Date().getFullYear()
const { whatsappHref, trackWhatsApp } = useContactLinks()
const siteConfig = useSiteConfig()
const company = computed(() => siteConfig.value.company)
const socials = computed(() => Object.entries(siteConfig.value.socials).filter(([, url]) => !!url))
const socialLabels: Record<string, string> = { linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', x: 'X / Twitter' }
const visibleServices = computed(() => services.filter(service => siteConfig.value.services[service.slug]?.enabled !== false))
const visibleDivisions = computed(() => divisions.filter(division => siteConfig.value.divisions[division.slug]?.enabled !== false))

const companyLinks = [
  { label: 'About Vomtek', to: '/about' },
  { label: 'Standard systems', to: '/systems' },
  { label: 'Uptime Care', to: '/uptime-care' },
  { label: 'Book a consultation', to: '/assessment' },
  { label: 'Careers', to: '/careers' },
  { label: 'Field notes', to: '/insights' },
  { label: 'Des Foundation', to: '/foundation' },
  { label: 'Contact', to: '/contact' },
  { label: 'Track a project', to: '/track' },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden bg-ink pb-16 text-bone lg:pb-0">
    <div class="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />

    <div class="wrap relative border-b border-bone/10 py-14 md:py-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <LogoMark tone="bone" size="md" descriptor />
          <p class="mt-5 max-w-xs text-[14.5px] leading-relaxed text-bone/70">
            Control systems, electrical manufacturing, and field service for the plants, fleets, and facilities that cannot afford to stop.
          </p>

          <div class="mt-7 space-y-2.5 font-mono text-[12px] leading-relaxed tracking-[0.02em] text-bone/65">
            <p class="flex gap-2.5">
              <MapPin :size="13" class="mt-px shrink-0 text-signal" />
              <span>{{ company.address.street }}<br>{{ company.address.city }}, {{ company.address.state }} {{ company.address.postalCode }}</span>
            </p>
            <p class="flex gap-2.5">
              <Phone :size="13" class="mt-px shrink-0 text-signal" />
              <a :href="`tel:${company.phoneHref}`" class="transition-colors hover:text-bone">{{ company.phone }}</a>
            </p>
            <p v-if="siteConfig.features.whatsapp !== false" class="flex gap-2.5">
              <WhatsAppIcon class="mt-px size-3.5 shrink-0 text-[#25D366]" />
              <a :href="whatsappHref" target="_blank" rel="noopener" class="transition-colors hover:text-bone" @click="trackWhatsApp('footer')">WhatsApp the shop</a>
            </p>
            <p class="flex gap-2.5">
              <Mail :size="13" class="mt-px shrink-0 text-signal" />
              <a :href="`mailto:${company.email}`" class="transition-colors hover:text-bone">{{ company.email }}</a>
            </p>
            <p class="flex gap-2.5">
              <Clock :size="13" class="mt-px shrink-0 text-signal" />
              <span>{{ company.hours }}</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 class="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Capabilities</h3>
            <ul class="mt-4 space-y-2.5">
              <li v-for="service in visibleServices.slice(0, 5)" :key="service.slug">
                <NuxtLink :to="`/services/${service.slug}`" class="text-[13.5px] text-bone/65 transition-colors hover:text-signal">{{ service.navLabel }}</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/services" class="font-mono text-[11px] uppercase tracking-[0.12em] text-bone/55 transition-colors hover:text-bone">All capabilities →</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Divisions</h3>
            <ul class="mt-4 space-y-2.5">
              <li v-for="division in visibleDivisions" :key="division.slug">
                <NuxtLink :to="`/divisions/${division.slug}`" class="group flex items-baseline gap-2 text-[13.5px] text-bone/65 transition-colors hover:text-signal">
                  <span class="font-mono text-[10.5px] text-bone/40">{{ division.index }}</span>
                  {{ division.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Company</h3>
            <ul class="mt-4 space-y-2.5">
              <li v-for="link in companyLinks" :key="link.to">
                <NuxtLink v-if="!(link.to === '/foundation' && siteConfig.features.foundation === false) && !(link.to === '/careers' && siteConfig.features.careers === false) && !(link.to === '/assessment' && siteConfig.features.consult === false)" :to="link.to" class="text-[13.5px] text-bone/65 transition-colors hover:text-signal">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-14 grid gap-8 border-t border-bone/10 pt-8 md:grid-cols-2 md:items-end">
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Certified · Documented · Tested</p>
          <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-bone/70">
            <span class="border border-bone/15 px-2.5 py-1">UL 508A panel shop</span>
            <span class="border border-bone/15 px-2.5 py-1">NFPA 70</span>
            <span class="border border-bone/15 px-2.5 py-1">Houston, TX</span>
          </div>
          <div v-if="socials.length" class="mt-3 flex flex-wrap gap-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-bone/55">
            <a v-for="[key, url] in socials" :key="key" :href="url" target="_blank" rel="noopener" class="hover:text-signal">{{ socialLabels[key] || key }} ↗</a>
          </div>
        </div>
        <div class="md:justify-self-end md:w-80">
          <NewsletterForm v-if="siteConfig.features.newsletter !== false" tone="bone" />
        </div>
      </div>
    </div>

    <div class="wrap relative flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/50">
        <span>© {{ year }} {{ company.legalName }}</span>
        <NuxtLink to="/privacy" class="transition-colors hover:text-bone/70">Privacy</NuxtLink>
        <NuxtLink to="/terms" class="transition-colors hover:text-bone/70">Terms</NuxtLink>
        <a href="/sitemap.xml" class="transition-colors hover:text-bone/70">Sitemap</a>
      </div>
      <div class="flex items-center gap-5">
        <span class="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-bone/40 sm:inline">Built in Houston. Running everywhere.</span>
        <button
          type="button"
          class="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/65 transition-colors hover:text-bone"
          @click="scrollTop"
        >
          Back to top
          <span class="flex size-8 items-center justify-center rounded-full border border-bone/15 transition-colors group-hover:border-signal group-hover:text-signal">
            <ArrowUp :size="13" />
          </span>
        </button>
      </div>
    </div>

    <div class="pointer-events-none relative -mb-[1.5vw] overflow-hidden px-4" aria-hidden="true">
      <p class="select-none text-center font-semibold uppercase leading-[0.72] tracking-[-0.05em] text-transparent text-[19.5vw] opacity-70 [-webkit-text-stroke:1px_rgba(242,239,230,0.1)]">
        Vomtek
      </p>
    </div>
  </footer>
</template>

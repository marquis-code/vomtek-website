<script setup lang="ts">
import { ArrowUpRight, Check, Phone } from 'lucide-vue-next'
import { services, serviceBySlug } from '~/data/services'

const route = useRoute()
const siteConfig = useSiteConfig()
const baseService = serviceBySlug(String(route.params.slug))

if (!baseService || siteConfig.value.services[baseService.slug]?.enabled === false) {
  throw createError({ statusCode: 404, statusMessage: 'Capability not found' })
}

const service = {
  ...baseService,
  lead: siteConfig.value.services[baseService.slug]?.lead || baseService.lead,
}

const related = computed(() => services.filter(s => service.related.includes(s.slug)))

useSeo({
  title: service.name,
  description: service.lead,
})

useJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: service.name,
      description: service.lead,
      serviceType: service.name,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Vomtek',
        telephone: '+1-713-347-1466',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2401 Fountain View Dr, Ste 312',
          addressLocality: 'Houston',
          addressRegion: 'TX',
          postalCode: '77057',
          addressCountry: 'US',
        },
      },
      areaServed: 'Houston, TX',
    },
    {
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
})
</script>

<template>
  <div v-if="service">
    <PageHero
      :eyebrow="`Capability ${service.index}`"
      :title="service.headline"
      :lead="service.lead"
      :index="`${service.index} / 07`"
      :crumbs="[{ label: 'Capabilities', to: '/services' }, { label: service.navLabel }]"
    >
      <template #aside>
        <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-5">
          <div v-for="spec in service.specs.slice(0, 4)" :key="spec.label">
            <dt class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">{{ spec.label }}</dt>
            <dd class="mt-1 text-[13.5px] font-medium text-ink/75">{{ spec.value }}</dd>
          </div>
        </dl>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <div class="prose-tech" data-reveal>
              <p v-for="(paragraph, i) in service.description" :key="i">{{ paragraph }}</p>
            </div>

            <div class="mt-14" data-reveal>
              <SectionLabel index="—" label="What's included" />
              <ul class="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <li v-for="item in service.included" :key="item" class="flex items-start gap-2.5 border-b border-ink/8 pb-3 text-[14px] leading-relaxed text-ink/65">
                  <Check :size="12" :stroke-width="2" class="mt-1 shrink-0 text-signal-deep" />
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="mt-14" data-reveal>
              <SectionLabel index="—" label="Questions we get" />
              <FaqList :items="service.faqs" class="mt-4" open-first />
            </div>
          </div>

          <aside class="lg:col-span-5">
            <div class="lg:sticky lg:top-28">
              <div class="border border-ink/15 bg-bone-2/70 p-6">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">At a glance</p>
                <dl class="mt-4">
                  <div v-for="spec in service.specs" :key="spec.label" class="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2.5 last:border-b-0">
                    <dt class="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/55">{{ spec.label }}</dt>
                    <dd class="text-right text-[13.5px] font-medium text-ink/80">{{ spec.value }}</dd>
                  </div>
                </dl>
              </div>

              <div class="mt-4 border border-ink/15 bg-ink p-6 text-bone">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">Next step</p>
                <p class="mt-2 text-[19px] font-medium leading-tight tracking-[-0.02em]">Tell us what the equipment has to do.</p>
                <p class="mt-2 text-[13.5px] leading-relaxed text-bone/65">A scope conversation costs nothing. We will tell you what we need to quote it and when we can start.</p>
                <div class="mt-5 flex flex-col gap-2">
                  <AppButton to="/quote" variant="signal" size="md" arrow block track="service-quote">Request a quote</AppButton>
                  <a :href="`tel:${siteConfig.company.phoneHref}`" class="flex h-11 items-center justify-center gap-2 rounded-full border border-bone/20 font-mono text-[11.5px] uppercase tracking-[0.14em] text-bone/70 transition-colors hover:border-brand-soft hover:text-brand-soft">
                    <Phone :size="13" /> {{ siteConfig.company.phone }}
                  </a>
                </div>
              </div>

              <div class="mt-4 flex items-center gap-3 border border-ink/12 px-4 py-3">
                <span class="size-1.5 animate-pulse-led bg-signal" aria-hidden="true" />
                <p class="font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/60">Houston, TX · response within one business day</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="border-t border-ink/10 bg-bone section-y">
      <div class="wrap">
        <SectionLabel index="—" label="Related capabilities" />
        <div class="mt-8 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <NuxtLink
            v-for="rel in related"
            :key="rel.slug"
            :to="`/services/${rel.slug}`"
            class="group flex flex-col bg-bone p-6 transition-colors hover:bg-bone-2"
          >
            <div class="flex items-start justify-between">
              <div class="size-9 text-ink/70 transition-colors group-hover:text-signal-deep">
                <ServiceGlyph :variant="rel.glyph" />
              </div>
              <ArrowUpRight :size="15" class="text-ink/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-deep" />
            </div>
            <h3 class="mt-5 text-[18px] font-medium leading-tight tracking-[-0.025em]">{{ rel.name }}</h3>
            <p class="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-ink/65">{{ rel.lead }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Ready when you are"
      :title="`Ask us the hard question about ${service.navLabel.toLowerCase()}.`"
      text="Send the constraints, the deadline, and the failure history. We will come back with a scope you can hold us to."
      primary-label="Start a project"
      primary-to="/quote"
    />
  </div>
</template>

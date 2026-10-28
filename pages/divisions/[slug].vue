<script setup lang="ts">
import { Check, ArrowUpRight } from 'lucide-vue-next'
import { divisions, divisionBySlug } from '~/data/divisions'

const route = useRoute()
const siteConfig = useSiteConfig()
const baseDivision = divisionBySlug(String(route.params.slug))

if (!baseDivision || siteConfig.value.divisions[baseDivision.slug]?.enabled === false) {
  throw createError({ statusCode: 404, statusMessage: 'Division not found' })
}

const override = siteConfig.value.divisions[baseDivision.slug]
const division = {
  ...baseDivision,
  headline: override?.headline || baseDivision.headline,
  lead: override?.lead || baseDivision.lead,
}

const variantMap: Record<string, 'electrical' | 'instrumentation' | 'automotive' | 'mechanical' | 'fabrication' | 'facilities'> = {
  electrical: 'electrical',
  instrumentation: 'instrumentation',
  automotive: 'automotive',
  mechanical: 'mechanical',
  fabrication: 'fabrication',
  'real-estate': 'facilities',
}

const others = computed(() => divisions.filter(d => d.slug !== division.slug).slice(0, 3))

useSeo({
  title: `${division.name} — ${division.headline}`,
  description: division.lead,
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `${division.name} — Vomtek`,
  description: division.lead,
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
})
</script>

<template>
  <div v-if="division">
    <PageHero
      :eyebrow="`Division ${division.index}`"
      :title="division.headline"
      :lead="division.lead"
      :index="`${division.index} / 06`"
      :crumbs="[{ label: 'Divisions', to: '/divisions' }, { label: division.name }]"
    >
      <template #aside>
        <dl class="mt-6 border-t border-ink/15 pt-5">
          <div v-for="meta in division.meta" :key="meta.label" class="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2 last:border-b-0">
            <dt class="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/50">{{ meta.label }}</dt>
            <dd class="text-[13px] font-medium text-ink/75">{{ meta.value }}</dd>
          </div>
        </dl>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <div class="prose-tech" data-reveal>
              <p v-for="(paragraph, i) in division.intro" :key="i">{{ paragraph }}</p>
            </div>

            <div class="mt-14" data-reveal>
              <SectionLabel index="—" label="Core capabilities" />
              <div class="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <div v-for="(cap, i) in division.capabilities" :key="cap.title" class="group">
                  <div class="flex items-center gap-2.5">
                    <span class="font-mono text-[10.5px] text-signal-deep">0{{ i + 1 }}</span>
                    <h3 class="text-[15px] font-medium tracking-[-0.015em]">{{ cap.title }}</h3>
                  </div>
                  <p class="mt-2 text-[13.5px] leading-relaxed text-ink/70">{{ cap.text }}</p>
                </div>
              </div>
            </div>

            <div class="mt-14" data-reveal>
              <SectionLabel index="—" label="What we hand over" />
              <ul class="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                <li v-for="item in division.deliverables" :key="item" class="flex items-start gap-2.5 border-b border-ink/8 pb-2.5 text-[14px] text-ink/65">
                  <Check :size="12" :stroke-width="2" class="mt-1 shrink-0 text-signal-deep" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <aside class="lg:col-span-5">
            <div class="lg:sticky lg:top-28" data-reveal="scale">
              <DivisionSchematic :variant="variantMap[division.slug]!" :code="`VT-${division.index}`" />

              <div class="mt-5 border border-ink/15 p-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Scope</p>
                <ul class="mt-3 flex flex-wrap gap-1.5">
                  <li v-for="item in division.scope" :key="item" class="border border-ink/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/65">
                    {{ item }}
                  </li>
                </ul>
                <div class="mt-5 border-t border-ink/10 pt-4">
                  <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Industries</p>
                  <p class="mt-2 text-[13px] leading-relaxed text-ink/70">{{ division.industries.join(' · ') }}</p>
                </div>
              </div>

              <div class="mt-4 border border-ink/15 bg-ink p-5 text-bone">
                <p class="text-[17px] font-medium leading-tight tracking-[-0.02em]">Talk to the {{ division.name.toLowerCase() }} team.</p>
                <p class="mt-2 text-[13px] leading-relaxed text-bone/65">Tell us the equipment, the constraint, and the deadline. We will tell you what it takes.</p>
                <AppButton to="/quote" variant="signal" size="md" arrow block class="mt-4" track="division-quote">Start a project</AppButton>
                <a :href="`tel:${siteConfig.company.phoneHref}`" class="mt-3 flex h-10 items-center justify-center rounded-full border border-bone/15 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/65 transition-colors hover:border-brand-soft hover:text-brand-soft">{{ siteConfig.company.phone }}</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="—" label="Related capabilities" />
        <div class="mt-8 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <NuxtLink
            v-for="link in division.related"
            :key="link.to"
            :to="link.to"
            class="group flex items-center justify-between gap-4 bg-bone-2 p-5 transition-colors hover:bg-bone"
          >
            <span class="text-[15px] font-medium tracking-[-0.02em]">{{ link.label }}</span>
            <ArrowUpRight :size="15" class="shrink-0 text-ink/45 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-deep" />
          </NuxtLink>
        </div>

        <div class="mt-12 border-t border-ink/15 pt-8">
          <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Other divisions</p>
          <div class="mt-4 flex flex-col gap-0 divide-y divide-ink/10">
            <NuxtLink v-for="other in others" :key="other.slug" :to="`/divisions/${other.slug}`" class="group flex items-center justify-between gap-4 py-4">
              <span class="flex items-baseline gap-4">
                <span class="font-mono text-[11px] text-ink/45">{{ other.index }}</span>
                <span class="text-[18px] font-medium tracking-[-0.025em]">{{ other.name }}</span>
                <span class="hidden text-[13.5px] text-ink/60 sm:block">{{ other.lead }}</span>
              </span>
              <ArrowUpRight :size="15" class="shrink-0 text-ink/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-deep" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="One accountable team"
      :title="`The ${division.name.toLowerCase()} scope is the start, not the limit.`"
      text="If the work crosses into another discipline, it stays in the same building and under the same project manager."
      primary-label="Scope the work"
      primary-to="/quote"
      secondary-label="See all divisions"
      secondary-to="/divisions"
    />
  </div>
</template>

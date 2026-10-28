<script setup lang="ts">
import { Clock, Phone, ShieldCheck, FileCheck2 } from 'lucide-vue-next'
import { fetchCatalog } from '~/composables/useCatalog'
import type { CatalogSystem } from '~/types/site'

useSeo({
  title: 'Request a quote — scope a control panel, harness, PCB, or motor job',
  description: 'Use Vomtek’s project configurator to scope a control panel, retrofit, PCB, wire harness, motor service, or field project. Immediate reference and indicative lead time.',
})

const route = useRoute()
const siteConfig = useSiteConfig()
const { data: catalogData } = await useAsyncData<CatalogSystem[]>('quote-catalog', fetchCatalog)
const systemSlug = computed(() => typeof route.query.system === 'string' ? route.query.system : '')
const system = computed(() => (catalogData.value ?? []).find(item => item.slug === systemSlug.value) ?? null)
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

const steps = [
  { title: 'A person reviews it', text: 'Within one business day, an engineer reads the scope and either asks the missing questions or calls you.' },
  { title: 'We agree the scope', text: 'A written scope and estimate with assumptions, exclusions, and delivery dates — not a number on a napkin.' },
  { title: 'You get a reference', text: 'Once submitted, your request gets a reference you can track. No black hole.' },
]

const faqs = [
  { q: 'How long does a quote take?', a: 'Small panels, repairs, and harness work: often the same week. Complex or multi-panel scopes: three to five business days after we have the drawings or a clear sequence of operation.' },
  { q: 'Do you sign NDAs?', a: 'Yes. Send yours with the request or ask for ours. We treat drawings and process details as confidential by default.' },
  { q: 'Can you work from incomplete drawings?', a: 'Yes. Many retrofits arrive with no drawings at all. We document what exists, price the discovery honestly, and build the drawing set as part of the work.' },
  { q: 'Do you charge for scoping?', a: 'No. A scope conversation and an indicative estimate are free. Detailed engineering and site surveys on larger projects may be quoted as a separate phase — always agreed before we start.' },
]

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Request a quote"
      title="Scope it in four steps."
      lead="Two minutes now saves a week of email. Tell us what you are building and we will come back with the right questions, a scope, and a date."
      index="08 / 08"
      :crumbs="[{ label: 'Request a quote' }]"
    >
      <template #aside>
        <div class="mt-6 flex items-center gap-3 border-t border-ink/15 pt-5">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">About 2 minutes · no obligation</p>
        </div>
      </template>
    </PageHero>

    <section class="bg-bone py-12 md:py-16">
      <div class="wrap">
        <div class="grid gap-8 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <div v-if="system" class="mb-4 flex flex-col gap-3 border border-ink/15 bg-bone-2/60 p-3 sm:flex-row sm:items-center">
              <div class="aspect-[16/10] w-full overflow-hidden border border-ink/10 bg-ink sm:w-32">
                <ResponsivePicture :asset="system.image" :alt="system.name" :widths="[480, 800]" sizes="200px" :width="800" :height="500" img-class="h-full w-full object-cover" />
              </div>
              <div class="flex-1">
                <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">Standard system selected</p>
                <p class="mt-0.5 text-[14px] font-medium">{{ system.name }} · from {{ money(system.priceFrom) }} {{ system.priceUnit }}</p>
                <p class="mt-1 text-[12.5px] text-ink/65">{{ system.leadTime }} · {{ system.category }} · the configurator will confirm the site variables.</p>
              </div>
              <NuxtLink to="/systems" class="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/55 hover:text-ink">Change</NuxtLink>
            </div>
            <QuoteBuilder />
          </div>

          <aside class="lg:col-span-4">
            <div class="space-y-4 lg:sticky lg:top-28">
              <div class="border border-ink/15 p-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">What happens next</p>
                <ol class="mt-4">
                  <li v-for="(item, i) in steps" :key="item.title" class="flex gap-3 border-b border-ink/10 py-3 first:pt-0 last:border-b-0">
                    <span class="mt-0.5 font-mono text-[10.5px] text-signal-deep">0{{ i + 1 }}</span>
                    <div>
                      <p class="text-[13.5px] font-medium">{{ item.title }}</p>
                      <p class="mt-0.5 text-[12.5px] leading-relaxed text-ink/65">{{ item.text }}</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div class="border border-ink/15 bg-ink p-5 text-bone">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">Prefer a conversation?</p>
                <p class="mt-2 text-[15px] font-medium">Call the shop.</p>
                <a :href="`tel:${siteConfig.company.phoneHref}`" class="mt-3 flex items-center gap-2 text-[22px] font-medium tracking-[-0.02em] text-bone transition-colors hover:text-signal">
                  <Phone :size="17" class="text-signal" /> {{ siteConfig.company.phone }}
                </a>
                <p class="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone/50">{{ siteConfig.company.hours }}</p>
                <a :href="`mailto:${siteConfig.company.email}`" class="mt-4 block border-t border-bone/15 pt-3 font-mono text-[11px] text-bone/70 transition-colors hover:text-bone">{{ siteConfig.company.email }}</a>
              </div>

              <div class="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-1">
                <div class="flex items-start gap-3 bg-bone p-4">
                  <ShieldCheck :size="16" class="mt-0.5 shrink-0 text-signal-deep" />
                  <div>
                    <p class="text-[13px] font-medium">Confidential by default</p>
                    <p class="mt-0.5 text-[12px] leading-relaxed text-ink/60">NDA available. Drawings are not shared outside the project team.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-bone p-4">
                  <FileCheck2 :size="16" class="mt-0.5 shrink-0 text-signal-deep" />
                  <div>
                    <p class="text-[13px] font-medium">Trackable from day one</p>
                    <p class="mt-0.5 text-[12px] leading-relaxed text-ink/60">Every request gets a reference and a status you can check.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-bone p-4">
                  <Clock :size="16" class="mt-0.5 shrink-0 text-signal-deep" />
                  <div>
                    <p class="text-[13px] font-medium">Reply in one business day</p>
                    <p class="mt-0.5 text-[12px] leading-relaxed text-ink/60">Emergency breakdowns jump the queue — call, do not wait.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <SectionLabel index="—" label="Quoting questions" />
            <h2 class="type-md mt-6">Before you<br>hit send.</h2>
            <p class="mt-3 max-w-xs text-[14px] leading-relaxed text-ink/70">Still unsure? Call and ask for engineering. You will get a person who works on this equipment.</p>
          </div>
          <div class="lg:col-span-8">
            <FaqList :items="faqs" open-first />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

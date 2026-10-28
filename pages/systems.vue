<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { fetchCatalog } from '~/composables/useCatalog'
import type { CatalogSystem } from '~/types/site'

useSeo({
  title: 'Standard systems — pre-engineered panels with fixed scope',
  description: 'Vomtek standard systems: MCC retrofit lines, VFD pump panels, and PLC control skids. Pre-engineered, fixed-scope, documented, and built with shorter lead times.',
})

const { data } = await useAsyncData<CatalogSystem[]>('systems-catalog', fetchCatalog)
const systems = computed(() => data.value ?? [])
const categories = computed(() => ['All', ...Array.from(new Set(systems.value.map(s => s.category)))])
const active = ref('All')
const filtered = computed(() => active.value === 'All' ? systems.value : systems.value.filter(s => s.category === active.value))

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

const steps = [
  { index: '01', title: 'Pick the closest system', text: 'Start from a pre-engineered family. If your process does not fit, we will engineer from scratch — you lose nothing by starting here.' },
  { index: '02', title: 'Configure the site variables', text: 'Voltage, enclosure, drives, I/O, and schedule. We confirm the scope against your load list and issue a fixed quote.' },
  { index: '03', title: 'Build, FAT, and start up', text: 'Standard drawings and test procedures shorten the build. You still get a documented FAT, as-builts, and field support.' },
]

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Vomtek standard systems',
  itemListElement: systems.value.map((system, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: system.name,
    url: `${useRuntimeConfig().public.siteUrl}/systems#${system.slug}`,
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Standard systems"
      title="Pre-engineered. Site-ready."
      lead="The work we do repeatedly, packaged with a fixed scope, published pricing, and shorter lead times. Engineered to your site, documented like everything else we build."
      index="09"
      :crumbs="[{ label: 'Standard systems' }]"
    >
      <template #aside>
        <div class="mt-6 grid grid-cols-3 gap-3 border-t border-ink/15 pt-5">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Lead times</p>
            <p class="mt-1 text-[14px] font-medium">From 4 weeks</p>
          </div>
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Scope</p>
            <p class="mt-1 text-[14px] font-medium">Fixed</p>
          </div>
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Certification</p>
            <p class="mt-1 text-[14px] font-medium">UL 508A</p>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="flex flex-wrap items-center gap-2 border-b border-ink/12 pb-5">
          <button v-for="category in categories" :key="category" type="button" class="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors" :class="active === category ? 'border-brand-deep bg-brand-deep text-white' : 'border-ink/15 text-ink/70 hover:border-brand hover:text-brand'" @click="active = category">
            {{ category }}
          </button>
          <span class="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">{{ filtered.length }} systems</span>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(system, i) in filtered" :id="system.slug" :key="system.slug" class="scroll-mt-28" data-reveal :style="`--reveal-delay: ${i * 70}ms`">
            <SystemCard :system="system" :index="i" />
          </div>
        </div>

        <div class="mt-12 border border-ink/15 bg-bone-2/50 p-6">
          <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div class="lg:col-span-7">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-deep">Not a catalog box</p>
              <h2 class="mt-3 max-w-xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.035em]">The system is standard. The engineering is still yours.</h2>
              <p class="mt-3 max-w-lg text-[14px] leading-relaxed text-ink/70">A standard family fixes the layout, BOM, and test procedure — not the voltage, enclosure, drive, or sequence. Every project still gets a load review, a drawing set, and a FAT.</p>
            </div>
            <div class="flex flex-col gap-2 lg:col-span-5 lg:items-end">
              <AppButton to="/quote" size="lg" arrow track="systems-quote">Scope a standard system</AppButton>
              <AppButton to="/contact" variant="outline" size="lg" arrow track="systems-contact">Ask an engineer</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="—" label="How it runs" />
        <div class="mt-8 grid gap-8 lg:grid-cols-12">
          <h2 class="type-lg max-w-xl lg:col-span-6" data-reveal>From a known starting point<br><em class="serif-accent">to a documented build.</em></h2>
          <div class="lg:col-span-6">
            <div class="grid gap-px border border-ink/12 bg-ink/12">
              <div v-for="step in steps" :key="step.index" class="bg-bone-2 p-5">
                <div class="flex items-start gap-4">
                  <span class="font-mono text-[11px] text-signal-deep">{{ step.index }}</span>
                  <div>
                    <h3 class="text-[15px] font-medium">{{ step.title }}</h3>
                    <p class="mt-1 text-[13px] leading-relaxed text-ink/65">{{ step.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bone section-y">
      <div class="wrap">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in [
            { value: money(systems[0]?.priceFrom || 8500) + '+', label: 'Starting price' },
            { value: '4–9 wk', label: 'Typical lead time' },
            { value: 'UL 508A', label: 'Panel certification' },
            { value: '100%', label: 'FAT before freight' },
          ]" :key="item.label" class="border-t border-ink/15 pt-4">
            <p class="text-[26px] font-semibold leading-none tracking-[-0.04em]">{{ item.value }}</p>
            <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">{{ item.label }}</p>
          </div>
        </div>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <AppButton to="/quote" size="md" arrow track="systems-bottom-quote">Request a fixed-scope quote</AppButton>
          <NuxtLink to="/uptime-care" class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/65 hover:text-ink">Keep it running with Uptime Care <ArrowRight :size="12" /></NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Start from standard"
      title="The fastest quote is the one we already know how to build."
      text="Send the site conditions and a load list. We will confirm whether a standard system fits, and where it needs to be engineered."
      primary-label="Scope a system"
      primary-to="/quote"
      secondary-label="See capabilities"
      secondary-to="/services"
    />
  </div>
</template>

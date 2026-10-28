<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { divisions } from '~/data/divisions'

const site = useSiteConfig()
const visible = computed(() => divisions
  .filter(division => site.value.divisions[division.slug]?.enabled !== false)
  .map(division => ({
    ...division,
    headline: site.value.divisions[division.slug]?.headline || division.headline,
    lead: site.value.divisions[division.slug]?.lead || division.lead,
  })))

useSeo({
  title: 'Divisions — electrical, instrumentation, automotive, mechanical, fabrication, facilities',
  description: 'Six divisions, one accountable team: electrical power and motor control, UL 508A instrumentation panels, automotive service, precision machining, fabrication, and facilities infrastructure.',
})

const variants: Record<string, 'electrical' | 'instrumentation' | 'automotive' | 'mechanical' | 'fabrication' | 'facilities'> = {
  electrical: 'electrical',
  instrumentation: 'instrumentation',
  automotive: 'automotive',
  mechanical: 'mechanical',
  fabrication: 'fabrication',
  'real-estate': 'facilities',
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Divisions"
      title="Six disciplines. One standard."
      lead="Vomtek is organized around the work, not around job titles. Each division has its own specialists — and shares the same drawings, documentation, and accountability."
      index="02 / 08"
      :crumbs="[{ label: 'Divisions' }]"
    />

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-8 border-b border-ink/12 pb-10 lg:grid-cols-12 lg:items-end">
          <p class="max-w-2xl text-[15px] leading-relaxed text-ink/60 lg:col-span-7" data-reveal>
            Most industrial problems cross disciplines. A motor fails because the drive was misapplied. A panel overheats because the enclosure was undersized. A retrofit stalls because the mechanical and electrical scopes were bid separately. Our structure removes those seams.
          </p>
          <div class="grid grid-cols-3 gap-4 lg:col-span-5">
            <div>
              <p class="text-[27px] font-semibold leading-none tracking-[-0.04em]">06</p>
              <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">Divisions</p>
            </div>
            <div>
              <p class="text-[27px] font-semibold leading-none tracking-[-0.04em]">01</p>
              <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">Team</p>
            </div>
            <div>
              <p class="text-[27px] font-semibold leading-none tracking-[-0.04em]">24/7</p>
              <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">Response</p>
            </div>
          </div>
        </div>

        <div class="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:gap-8">
          <NuxtLink
            v-for="(division, i) in visible"
            :key="division.slug"
            :to="`/divisions/${division.slug}`"
            class="group flex flex-col border border-ink/15 bg-bone transition-colors duration-500 hover:border-ink/40"
            data-reveal
            :style="`--reveal-delay: ${(i % 2) * 80}ms`"
          >
            <DivisionSchematic :variant="variants[division.slug]!" :code="`VT-${division.index}`" />

            <div class="flex flex-1 flex-col p-6 md:p-7">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-baseline gap-3">
                  <span class="font-mono text-[11px] tracking-[0.1em] text-signal-deep">{{ division.index }}</span>
                  <h2 class="text-[25px] font-medium leading-none tracking-[-0.035em]">{{ division.name }}</h2>
                </div>
                <span class="flex size-8 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
                  <ArrowUpRight :size="14" :stroke-width="1.5" />
                </span>
              </div>

              <p class="mt-5 max-w-md text-[13.5px] leading-relaxed text-ink/70">{{ division.lead }}</p>

              <ul class="mt-5 flex flex-wrap gap-1.5">
                <li v-for="item in division.scope.slice(0, 4)" :key="item" class="border border-ink/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">
                  {{ item }}
                </li>
              </ul>

              <div class="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 text-[12px]">
                <span class="text-ink/60">{{ division.capabilities.length }} core capabilities</span>
                <span class="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/50">{{ division.meta[0]?.value }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="—" label="Where the seams disappear" />
        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <h2 class="type-lg max-w-xl lg:col-span-6">One problem.<br><em class="serif-accent">Three disciplines.</em></h2>
          <div class="lg:col-span-6">
            <ul class="border-t border-ink/15">
              <li class="border-b border-ink/15 py-5">
                <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Electrical + Fabrication</p>
                <p class="mt-2 text-[15px] font-medium">A control house that arrives complete.</p>
                <p class="mt-1 text-[13.5px] leading-relaxed text-ink/70">Structure, enclosure, backplate, panel, HVAC, and commissioning under one purchase order.</p>
              </li>
              <li class="border-b border-ink/15 py-5">
                <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Mechanical + Instrumentation</p>
                <p class="mt-2 text-[15px] font-medium">A drive train and its controls, matched.</p>
                <p class="mt-1 text-[13.5px] leading-relaxed text-ink/70">Adapter plates, couplings, motor testing, VFD sizing, and startup treated as one problem.</p>
              </li>
              <li class="py-5">
                <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Facilities + Electrical</p>
                <p class="mt-2 text-[15px] font-medium">A building ready for the equipment.</p>
                <p class="mt-1 text-[13.5px] leading-relaxed text-ink/70">Service capacity, backup power, lighting, and the panel feeding the new line — one schedule.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Cross-discipline work"
      title="The job is rarely in one box. Neither are we."
      text="Send the full scope — mechanical, electrical, controls, and schedule. We will tell you which divisions need to be in the room."
      primary-label="Scope the work"
      primary-to="/quote"
      secondary-label="See capabilities"
      secondary-to="/services"
    />
  </div>
</template>

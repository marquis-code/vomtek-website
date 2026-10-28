<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const industries = [
  {
    image: 'water-treatment',
    alt: 'Aerial view of a water treatment facility',
    label: 'Water & wastewater',
    text: 'MCCs, SCADA, pump controls, and retrofits for plants that cannot spill.',
    to: '/divisions/electrical',
    span: 'lg:col-span-7 lg:row-span-2',
    ratio: 'aspect-[4/3] lg:aspect-auto lg:h-full',
  },
  {
    image: 'power-grid',
    alt: 'Pole-mounted distribution transformers',
    label: 'Power & utilities',
    text: 'Distribution, protection, and field service for critical power.',
    to: '/divisions/electrical',
    span: 'lg:col-span-5',
    ratio: 'aspect-[16/9]',
  },
  {
    image: 'machine-team',
    alt: 'Technicians operating a CNC machine',
    label: 'Manufacturing',
    text: 'Panel builds, drives, and line-side controls for production teams.',
    to: '/divisions/instrumentation',
    span: 'lg:col-span-5',
    ratio: 'aspect-[16/9]',
  },
]
</script>

<template>
  <div class="grid gap-3 lg:grid-cols-12 lg:grid-rows-2">
    <NuxtLink v-for="industry in industries" :key="industry.label" :to="industry.to" class="group relative overflow-hidden rounded-xl border border-ink/15 bg-ink" :class="[industry.span, industry.ratio]">
      <ResponsivePicture
        :asset="industry.image"
        :alt="industry.alt"
        :widths="[480, 800, 1200]"
        sizes="(max-width: 1024px) 100vw, 50vw"
        :width="1200"
        :height="800"
        img-class="h-full w-full object-cover opacity-70 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-85"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden="true" />
      <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">{{ industry.label }}</p>
          <p class="mt-1.5 max-w-xs text-[14px] leading-relaxed text-bone/60">{{ industry.text }}</p>
        </div>
        <span class="flex size-8 shrink-0 items-center justify-center border border-bone/25 text-bone/60 transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
          <ArrowUpRight :size="13" />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { CatalogSystem } from '~/types/site'

defineProps<{ system: CatalogSystem, index?: number }>()
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
</script>

<template>
  <article class="group flex flex-col overflow-hidden rounded-xl border border-ink/15 bg-bone transition-colors duration-500 hover:border-ink/40">
    <div class="relative aspect-[16/10] overflow-hidden bg-ink">
      <ResponsivePicture
        :asset="system.image"
        :alt="system.name"
        :widths="[480, 800]"
        sizes="(max-width: 768px) 100vw, 33vw"
        :width="800"
        :height="500"
        img-class="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-70" aria-hidden="true" />
      <span class="absolute left-3 top-3 border border-bone/25 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/70 backdrop-blur">{{ system.category }}</span>
      <span v-if="system.featured" class="absolute right-3 top-3 bg-signal px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">Standard</span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="text-[21px] font-medium leading-tight tracking-[-0.03em]">{{ system.name }}</h3>
      <p class="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink/70">{{ system.summary }}</p>

      <div class="mt-3 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10">
        <div v-for="spec in system.specs.slice(0, 2)" :key="spec.label" class="bg-bone p-2">
          <p class="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/50">{{ spec.label }}</p>
          <p class="mt-0.5 text-[12px] text-ink/70">{{ spec.value }}</p>
        </div>
      </div>

      <div class="mt-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p class="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/50">From</p>
          <p class="text-[18px] font-medium leading-none">{{ money(system.priceFrom) }}</p>
          <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">{{ system.priceUnit }}</p>
        </div>
        <div class="text-right">
          <p class="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/50">Lead time</p>
          <p class="text-[13px]">{{ system.leadTime }}</p>
        </div>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-ink/10 pt-3">
        <span class="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/50">Fixed scope</span>
        <NuxtLink :to="`/quote?system=${system.slug}`" class="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-signal-deep">
          Request this <ArrowUpRight :size="11" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

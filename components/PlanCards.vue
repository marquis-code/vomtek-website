<script setup lang="ts">
import { ArrowUpRight, Check } from 'lucide-vue-next'
import type { UptimePlan } from '~/types/site'

withDefaults(defineProps<{ plans: UptimePlan[], tone?: 'light' | 'dark' }>(), { tone: 'light' })
</script>

<template>
  <div class="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3" :class="tone === 'dark' ? 'border-bone/15 bg-bone/15' : 'border-ink/12 bg-ink/12'">
    <div
      v-for="plan in plans"
      :key="plan.slug"
      class="relative flex flex-col p-6"
      :class="[
        tone === 'dark' ? 'bg-ink text-bone' : 'bg-bone',
        plan.featured ? 'lg:-mt-3 lg:mb-[-12px] lg:shadow-[0_24px_60px_-40px_rgba(10,12,11,.5)]' : '',
      ]"
    >
      <span v-if="plan.featured" class="absolute inset-x-0 top-0 h-[2px] bg-signal" aria-hidden="true" />
      <div class="flex items-center justify-between">
        <p class="font-mono text-[10px] uppercase tracking-[0.16em]" :class="tone === 'dark' ? 'text-bone/55' : 'text-ink/50'">{{ plan.name }}</p>
        <span v-if="plan.featured" class="font-mono text-[9.5px] uppercase tracking-[0.12em] text-signal">Most chosen</span>
      </div>
      <p class="mt-4 font-display text-[32px] font-semibold leading-none tracking-[-0.05em]">{{ plan.price }}</p>
      <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.1em]" :class="tone === 'dark' ? 'text-bone/50' : 'text-ink/50'">{{ plan.period }}</p>
      <p class="mt-4 text-[13px] leading-relaxed" :class="tone === 'dark' ? 'text-bone/65' : 'text-ink/70'">{{ plan.description }}</p>

      <ul class="mt-5 flex-1 space-y-2">
        <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-[12.5px]" :class="tone === 'dark' ? 'text-bone/60' : 'text-ink/60'">
          <Check :size="11" class="mt-1 shrink-0 text-signal" />
          {{ feature }}
        </li>
      </ul>

      <NuxtLink
        :to="`/uptime-care?plan=${plan.slug}#assess`"
        class="mt-6 flex h-11 items-center justify-center gap-2 rounded-full font-sans text-[12px] font-semibold uppercase tracking-[0.07em] transition-colors"
        :class="plan.featured ? 'bg-brand-deep text-white hover:bg-brand' : (tone === 'dark' ? 'border border-bone/25 text-bone/70 hover:border-brand-soft hover:text-brand-soft' : 'border border-ink/20 text-ink/65 hover:border-brand hover:bg-brand hover:text-white')"
      >
        {{ plan.ctaLabel }} <ArrowUpRight :size="12" />
      </NuxtLink>
    </div>
  </div>
</template>

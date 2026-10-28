<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Article } from '~/types/content'

const props = defineProps<{
  article: Article
  index?: number
  size?: 'default' | 'large'
}>()

const date = computed(() => formatContentDate(props.article.publishedAt))

const coverClass = computed(() => {
  switch (props.article.tone) {
    case 'signal': return 'bg-signal text-ink'
    case 'bone': return 'bg-bone-2 text-ink'
    default: return 'bg-ink text-bone'
  }
})
</script>

<template>
  <NuxtLink
    :to="`/insights/${article.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/15 bg-bone transition-colors duration-500 hover:border-ink/40"
  >
    <div class="relative overflow-hidden" :class="[coverClass, size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/3]']">
      <div class="absolute inset-0 opacity-40" :class="article.tone === 'signal' || article.tone === 'bone' ? 'grid-bg' : 'grid-bg-dark'" aria-hidden="true" />

      <span class="pointer-events-none absolute right-4 top-2.5 select-none font-mono text-[2.4rem] leading-none tracking-[-0.06em] opacity-[0.18]" aria-hidden="true">
        {{ String((index ?? 0) + 1).padStart(2, '0') }}
      </span>

      <div class="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em]" :class="article.tone === 'ink' ? 'text-bone/70' : 'text-ink/70'">
        <span class="size-1 bg-current" />
        {{ article.category }}
      </div>

      <!-- generated technical motif -->
      <svg class="absolute -bottom-8 -right-8 size-48 opacity-30 transition-transform duration-700 group-hover:rotate-12" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g :stroke="article.tone === 'ink' ? '#f2efe6' : '#0a0c0b'" stroke-opacity=".5">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="72" stroke-dasharray="3 6" />
          <circle cx="100" cy="100" r="44" />
          <line x1="4" y1="100" x2="196" y2="100" stroke-dasharray="2 8" />
          <line x1="100" y1="4" x2="100" y2="196" stroke-dasharray="2 8" />
          <rect x="76" y="76" width="48" height="48" />
        </g>
        <circle cx="100" cy="100" r="5" :fill="article.tone === 'ink' ? '#007d48' : '#0a0c0b'" />
      </svg>

      <span class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em]" :class="article.tone === 'ink' ? 'text-bone/55' : 'text-ink/55'">
        {{ String((index ?? 0) + 1).padStart(2, '0') }} / Field note
      </span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55">
        <span>{{ date }}</span>
        <span>{{ article.readingTime }} min read</span>
      </div>
      <h3 class="mt-3 text-[19px] font-medium leading-[1.15] tracking-[-0.025em]" :class="size === 'large' ? 'md:text-[26px]' : ''">
        {{ article.title }}
      </h3>
      <p class="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink/70">{{ article.excerpt }}</p>
      <div class="mt-auto flex items-center justify-between pt-5">
        <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Read note</span>
        <span class="flex size-8 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
          <ArrowUpRight :size="13" :stroke-width="1.5" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

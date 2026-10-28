<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

withDefaults(defineProps<{
  items: { q: string; a: string }[]
  tone?: 'ink' | 'bone'
  openFirst?: boolean
}>(), {
  tone: 'ink',
  openFirst: false,
})
</script>

<template>
  <div class="border-t" :class="tone === 'ink' ? 'border-ink/15' : 'border-bone/15'">
    <details
      v-for="(item, i) in items"
      :key="item.q"
      class="group border-b py-5"
      :class="tone === 'ink' ? 'border-ink/15' : 'border-bone/15'"
      :open="openFirst && i === 0"
    >
      <summary
        class="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden"
      >
        <span class="text-[15.5px] font-medium leading-snug tracking-[-0.015em]" :class="tone === 'ink' ? 'text-ink' : 'text-bone/90'">
          {{ item.q }}
        </span>
        <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center border transition-colors" :class="tone === 'ink' ? 'border-ink/20 text-ink/60 group-open:border-ink group-open:bg-ink group-open:text-bone' : 'border-bone/20 text-bone/60 group-open:border-signal group-open:bg-signal group-open:text-ink'">
          <Plus :size="12" class="transition-transform duration-300 group-open:rotate-45" />
        </span>
      </summary>
      <p class="mt-3 max-w-2xl pr-10 text-[13.5px] leading-relaxed" :class="tone === 'ink' ? 'text-ink/60' : 'text-bone/65'">
        {{ item.a }}
      </p>
    </details>
  </div>
</template>

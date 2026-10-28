<script setup lang="ts">
withDefaults(defineProps<{
  index?: string
  label: string
  tone?: 'ink' | 'bone'
  line?: boolean
}>(), {
  index: '',
  tone: 'ink',
  line: true,
})
</script>

<template>
  <div class="flex items-center gap-4" :class="tone === 'bone' ? 'text-bone/60' : 'text-ink/65'">
    <span v-if="index" class="font-mono text-[11.5px] tracking-[0.1em]" :class="tone === 'bone' ? 'text-brand-soft' : 'text-signal-deep'">
      {{ index }}
    </span>
    <span class="font-mono text-[11.5px] uppercase tracking-[0.18em] whitespace-nowrap">{{ label }}</span>
    <span v-if="line" class="h-px flex-1" :class="tone === 'bone' ? 'bg-bone/15' : 'bg-ink/15'" aria-hidden="true" />
    <slot />
  </div>
</template>

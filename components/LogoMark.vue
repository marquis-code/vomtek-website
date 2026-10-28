<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'full' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'ink' | 'bone'
  descriptor?: boolean
}>(), {
  variant: 'full',
  size: 'md',
  tone: 'ink',
  descriptor: false,
})

const markSize = computed(() => ({ sm: 22, md: 28, lg: 36 }))
</script>

<template>
  <span class="inline-flex items-end gap-2.5 select-none" :class="tone === 'bone' ? 'text-bone' : 'text-ink'">
    <svg
      :width="markSize[size]"
      :height="markSize[size]"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      class="shrink-0"
    >
      <rect x="1" y="1" width="30" height="30" rx="7" stroke="currentColor" stroke-opacity=".38" />
      <path d="M8 9.5 16 24l8-14.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="miter" />
      <path d="M11.4 9.5 16 17.9l4.6-8.4" stroke="var(--color-signal)" stroke-width="1.7" stroke-linejoin="miter" />
      <circle cx="8" cy="6.6" r="1.1" fill="var(--color-signal)" />
      <circle cx="24" cy="6.6" r="1.1" fill="currentColor" fill-opacity=".55" />
    </svg>
    <span v-if="variant === 'full'" class="flex flex-col leading-none">
      <span
        class="font-display font-semibold uppercase leading-none tracking-[-0.045em]"
        :class="{
          'text-[17px]': size === 'sm',
          'text-[21px]': size === 'md',
          'text-[27px]': size === 'lg',
        }"
      >Vomtek</span>
      <span v-if="descriptor" class="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] opacity-55">
        Control Systems
      </span>
    </span>
  </span>
</template>

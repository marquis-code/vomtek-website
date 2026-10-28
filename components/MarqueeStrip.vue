<script setup lang="ts">
const props = withDefaults(defineProps<{
  items: string[]
  tone?: 'ink' | 'bone'
  reverse?: boolean
  slow?: boolean
}>(), {
  tone: 'ink',
  reverse: false,
  slow: false,
})

const repeated = computed(() => [...props.items, ...props.items])
</script>

<template>
  <div
    class="group relative flex overflow-hidden border-y py-3.5"
    :class="tone === 'ink' ? 'border-ink/12 bg-bone text-ink/70' : 'border-bone/12 bg-ink text-bone/70'"
  >
    <div
      class="flex w-max shrink-0 items-center"
      :class="[reverse ? 'animate-marquee-rev' : 'animate-marquee', slow ? '[animation-duration:90s]' : '']"
      aria-hidden="true"
    >
      <div v-for="(item, i) in repeated" :key="i" class="flex items-center">
        <span class="px-5 font-mono text-[11.5px] uppercase tracking-[0.2em] whitespace-nowrap">{{ item }}</span>
        <span class="size-1 shrink-0" :class="tone === 'ink' ? 'bg-signal' : 'bg-signal'" />
      </div>
    </div>
  </div>
</template>

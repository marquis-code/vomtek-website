<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  lead?: string
  index?: string
  crumbs?: { label: string; to?: string }[]
  tone?: 'ink' | 'bone'
}>(), {
  crumbs: () => [],
  tone: 'ink',
})
</script>

<template>
  <section class="relative overflow-hidden border-b" :class="tone === 'ink' ? 'border-ink/10 bg-bone' : 'border-bone/10 bg-ink text-bone'">
    <div class="pointer-events-none absolute inset-0 opacity-60" :class="tone === 'ink' ? 'grid-bg' : 'grid-bg-dark'" aria-hidden="true" />
    <div
      class="pointer-events-none absolute inset-0"
      :class="tone === 'ink' ? 'bg-gradient-to-b from-bone/40 via-transparent to-bone' : 'bg-gradient-to-b from-ink/30 via-transparent to-ink'"
      aria-hidden="true"
    />

    <div class="wrap relative pb-12 pt-8 md:pb-16 md:pt-10">
      <nav v-if="crumbs.length" aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        <NuxtLink to="/" class="transition-colors" :class="tone === 'ink' ? 'text-ink/55 hover:text-ink' : 'text-bone/55 hover:text-bone'">Home</NuxtLink>
        <template v-for="crumb in crumbs" :key="crumb.label">
          <span :class="tone === 'ink' ? 'text-ink/20' : 'text-bone/20'" aria-hidden="true">/</span>
          <NuxtLink v-if="crumb.to" :to="crumb.to" class="transition-colors" :class="tone === 'ink' ? 'text-ink/55 hover:text-ink' : 'text-bone/55 hover:text-bone'">{{ crumb.label }}</NuxtLink>
          <span v-else :class="tone === 'ink' ? 'text-ink/60' : 'text-bone/60'">{{ crumb.label }}</span>
        </template>
      </nav>

      <div class="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-8">
          <div class="flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.18em]" :class="tone === 'ink' ? 'text-signal-deep' : 'text-signal'">
            <span class="size-1.5 bg-current" aria-hidden="true" />
            {{ eyebrow }}
          </div>
          <h1 class="type-xl mt-5 max-w-[14ch]">
            <slot name="title">{{ title }}</slot>
          </h1>
        </div>
        <div v-if="lead || $slots.aside" class="lg:col-span-4 lg:pb-2">
          <p v-if="lead" class="max-w-md text-[15px] leading-relaxed" :class="tone === 'ink' ? 'text-ink/60' : 'text-bone/70'">{{ lead }}</p>
          <slot name="aside" />
        </div>
      </div>
    </div>

    <div v-if="index" class="pointer-events-none absolute right-6 top-6 hidden font-mono text-[12px] tracking-[0.2em] md:block" :class="tone === 'ink' ? 'text-ink/45' : 'text-bone/45'">
      {{ index }}
    </div>
  </section>
</template>

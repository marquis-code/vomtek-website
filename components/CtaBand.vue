<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  text?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  compact?: boolean
}>(), {
  eyebrow: 'Start here',
  primaryLabel: 'Start a project',
  primaryTo: '/quote',
  secondaryLabel: 'Talk to an engineer',
  secondaryTo: '/contact',
})
</script>

<template>
  <section class="relative overflow-hidden bg-brand-deep text-bone grain">
    <div class="absolute inset-0 grid-bg-dark opacity-70" aria-hidden="true" />
    <div class="absolute -right-20 -top-32 size-[520px] rounded-full border border-bone/8" aria-hidden="true" />
    <div class="absolute -right-8 top-10 size-[340px] rounded-full border border-bone/10" aria-hidden="true" />
    <div class="absolute right-16 top-24 size-[180px] rounded-full border border-brand-soft/25" aria-hidden="true" />

    <div class="wrap relative" :class="compact ? 'py-14 md:py-20' : 'py-20 md:py-28'">
      <div class="grid items-end gap-10 lg:grid-cols-[1.5fr_0.7fr]">
        <div>
          <div class="flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.18em] text-bone/60">
            <span class="size-1.5 bg-brand-soft" aria-hidden="true" />
            {{ eyebrow }}
          </div>
          <h2 class="type-xl mt-6 max-w-3xl">
            <slot name="title">{{ title }}</slot>
          </h2>
          <p v-if="text" class="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone/60">{{ text }}</p>
        </div>

        <div class="flex flex-col items-start gap-3 lg:items-end">
          <AppButton :to="primaryTo" variant="signal" size="lg" arrow track="cta-band-primary">{{ primaryLabel }}</AppButton>
          <AppButton :to="secondaryTo" variant="outline-dark" size="lg" arrow track="cta-band-secondary">{{ secondaryLabel }}</AppButton>
          <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/50">
            Houston, TX · Response within one business day
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

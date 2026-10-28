<script setup lang="ts">
import { ArrowLeft, Phone } from 'lucide-vue-next'

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string; message?: string }
}>()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => is404.value ? 'Signal lost.' : 'Something tripped.')
const text = computed(() => is404.value
  ? 'The page you are looking for has moved, been removed, or never existed. The drawing is still good — start from the index.'
  : 'An unexpected fault occurred on our side. Try the home page, or call the shop if you need a person right now.')

useSeoMeta({ title: `${props.error.statusCode} — ${title.value}`, robots: 'noindex' })
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-ink text-bone">
    <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
    <div class="absolute -right-32 top-1/4 size-[560px] rounded-full border border-bone/8" aria-hidden="true" />
    <div class="absolute -right-10 top-1/4 size-[360px] rounded-full border border-signal/25" aria-hidden="true" />

    <header class="relative z-10 border-b border-bone/10">
      <div class="wrap flex h-[74px] items-center justify-between">
        <NuxtLink to="/" aria-label="Vomtek — home">
          <LogoMark tone="bone" descriptor />
        </NuxtLink>
        <span class="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">Fault report</span>
      </div>
    </header>

    <main class="wrap relative z-10 flex flex-1 items-center py-20">
      <div class="max-w-3xl">
        <div class="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          Error {{ error.statusCode }}
        </div>
        <p class="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/30">VT-ERR-{{ error.statusCode }} / NO SIGNAL</p>
        <h1 class="type-mega mt-4">{{ title }}</h1>
        <p class="mt-7 max-w-xl text-[16px] leading-relaxed text-bone/55">{{ text }}</p>

        <div class="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex h-12 items-center gap-2.5 rounded-[2px] bg-signal px-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-bone"
            @click="() => { clearError({ redirect: '/' }); }"
          >
            <ArrowLeft :size="14" /> Return home
          </button>
          <a
            href="tel:+17133471466"
            class="inline-flex h-12 items-center gap-2.5 rounded-[2px] border border-bone/25 px-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <Phone :size="14" /> 713-347-1466
          </a>
        </div>

        <div class="mt-14 grid max-w-xl grid-cols-2 gap-px border border-bone/15 bg-bone/15 sm:grid-cols-3">
          <NuxtLink to="/services" class="bg-ink px-4 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone/60 transition-colors hover:text-signal">Capabilities</NuxtLink>
          <NuxtLink to="/divisions" class="bg-ink px-4 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone/60 transition-colors hover:text-signal">Divisions</NuxtLink>
          <NuxtLink to="/contact" class="bg-ink px-4 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone/60 transition-colors hover:text-signal">Contact</NuxtLink>
        </div>
      </div>
    </main>

    <footer class="relative z-10 border-t border-bone/10 py-6">
      <div class="wrap flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-bone/30">
        <span>Vomtek · Houston, TX</span>
        <span>UL 508A · NFPA 70</span>
      </div>
    </footer>
  </div>
</template>

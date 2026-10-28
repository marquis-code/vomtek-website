<script setup lang="ts">
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-vue-next'
import type { CarouselItem } from '~/types/site'

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
  interval?: number
}>(), {
  eyebrow: 'Inside the work',
  title: 'A shop floor you can read.',
  subtitle: '',
  interval: 5800,
})

const index = ref(0)
const paused = ref(false)
const reduced = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const current = computed(() => props.items[index.value])

function start() {
  stop()
  if (paused.value || reduced.value || props.items.length < 2) return
  timer = setInterval(() => {
    index.value = (index.value + 1) % props.items.length
  }, props.interval)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}
function go(delta: number) {
  index.value = (index.value + delta + props.items.length) % props.items.length
  start()
}
function select(i: number) {
  index.value = i
  start()
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  start()
})
onUnmounted(stop)
</script>

<template>
  <section v-if="current" class="relative overflow-hidden border-y border-ink/10 bg-ink text-bone">
    <div class="absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />

    <div class="wrap relative grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div class="lg:col-span-7">
        <div class="group relative aspect-[4/3] overflow-hidden rounded-xl border border-bone/15 bg-ink md:aspect-[16/10]">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-700 ease-[var(--ease-out-expo)]"
            enter-from-class="opacity-0 scale-[1.03]"
            leave-active-class="transition duration-300 ease-in"
            leave-to-class="opacity-0"
          >
            <ResponsivePicture
              :key="current.image"
              :asset="current.image"
              :alt="current.alt"
              :widths="[800, 1200]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              :width="1200"
              :height="800"
              img-class="h-full w-full object-cover"
              class="absolute inset-0 block h-full w-full"
              :priority="index === 0"
            />
          </Transition>
          <div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />

          <div class="absolute left-4 top-4 flex items-center gap-2 border border-bone/25 bg-ink/55 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/70 backdrop-blur">
            <span class="size-1 animate-pulse-led bg-brand-soft" />
            {{ current.label }}
          </div>

          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-soft">{{ current.title }}</p>
              <p class="mt-1 max-w-md text-[14px] leading-relaxed text-bone/75 md:text-[15px]">{{ current.caption }}</p>
            </div>
            <span class="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-bone/45 md:block">{{ current.credit }}</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-soft">
          <span class="size-1.5 bg-brand-soft" /> {{ eyebrow }}
        </div>
        <h2 class="mt-4 max-w-md text-[clamp(1.9rem,3.2vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.04em]">{{ title }}</h2>
        <p class="mt-3 max-w-sm text-[13.5px] leading-relaxed text-bone/60">{{ subtitle }}</p>

        <ol class="mt-7 border-t border-bone/15">
          <li v-for="(item, i) in items" :key="item.image">
            <button type="button" class="group flex w-full items-center gap-4 border-b border-bone/10 py-3 text-left" @click="select(i)">
              <span class="font-mono text-[10px]" :class="i === index ? 'text-brand-soft' : 'text-bone/60'">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-[13.5px]" :class="i === index ? 'text-bone' : 'text-bone/75 group-hover:text-bone'">{{ item.title }}</span>
              </span>
              <span class="h-px w-8 shrink-0 overflow-hidden bg-bone/15">
                <span class="block h-px bg-brand-soft transition-all duration-500" :class="i === index ? 'w-full' : 'w-0'" />
              </span>
            </button>
          </li>
        </ol>

        <div class="mt-5 flex items-center justify-between">
          <div class="flex items-center gap-1">
            <button type="button" class="flex size-9 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-brand-soft hover:text-brand-soft" aria-label="Previous image" @click="go(-1)"><ArrowLeft :size="13" /></button>
            <button type="button" class="flex size-9 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-brand-soft hover:text-brand-soft" aria-label="Next image" @click="go(1)"><ArrowRight :size="13" /></button>
            <button type="button" class="ml-1 flex size-9 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-brand-soft hover:text-brand-soft" :aria-label="paused ? 'Play slideshow' : 'Pause slideshow'" @click="paused = !paused; start()">
              <component :is="paused ? Play : Pause" :size="12" />
            </button>
          </div>
          <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-bone/45">{{ String(index + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

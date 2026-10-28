<script setup lang="ts">
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-vue-next'
import type { HeroSlide, PublicSiteConfig } from '~/types/site'

const props = defineProps<{
  hero: PublicSiteConfig['hero']
  company: PublicSiteConfig['company']
}>()

const fallbackSlides: HeroSlide[] = [
  {
    image: 'panel-line',
    alt: 'Control enclosures being assembled on the shop floor',
    label: '01 / Build',
    kicker: 'Panel build',
    title: 'Built to hold the line.',
    description: 'You get a drawing set, a tested panel, and a build your team can maintain.',
    emphasis: 'hold the line.',
  },
  {
    image: 'electrician-meter',
    alt: 'Technician testing a control enclosure with a multimeter',
    label: '02 / Verify',
    kicker: 'Test & verify',
    title: 'Proven before it ships.',
    description: 'Point-to-point checks, insulation tests, and a signed FAT report before freight.',
    emphasis: 'prove it works.',
  },
  {
    image: 'control-room',
    alt: 'Control room operator monitoring a process',
    label: '03 / Support',
    kicker: 'Startup & support',
    title: 'There after the startup.',
    description: 'Commissioning, spare-parts lists, and field help when production calls.',
    emphasis: 'stay running.',
  },
]

const slides = computed<HeroSlide[]>(() => {
  const configured = (props.hero.slides || []).filter(s => s?.image && s?.title)
  return configured.length ? configured : fallbackSlides
})

const index = ref(0)
const paused = ref(false)
const reduced = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const current = computed(() => slides.value[index.value % slides.value.length] || fallbackSlides[0]!)

function start() {
  stop()
  if (paused.value || reduced.value || slides.value.length < 2) return
  timer = setInterval(() => {
    index.value = (index.value + 1) % slides.value.length
  }, 7000)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}
function go(delta: number) {
  index.value = (index.value + delta + slides.value.length) % slides.value.length
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
  <section
    class="relative overflow-hidden bg-bone lg:flex lg:min-h-[calc(100svh-112px)] lg:flex-col lg:justify-center"
    aria-roledescription="carousel"
    aria-label="Vomtek capabilities"
    @mouseenter="paused = true; stop()"
    @mouseleave="paused = false; start()"
    @focusin="paused = true; stop()"
    @focusout="paused = false; start()"
  >
    <div class="pointer-events-none absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_0%,rgba(242,239,230,0.1)_0%,rgba(242,239,230,0.9)_72%,#f2efe6_100%)]" aria-hidden="true" />
    <div class="pointer-events-none absolute -left-40 top-1/3 size-[420px] rounded-full border border-ink/6" aria-hidden="true" />

    <div class="wrap relative py-8 md:py-10">
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/60" data-reveal>
            <span class="size-1.5 animate-pulse-led bg-signal" aria-hidden="true" />
            <span>{{ hero.eyebrow }}</span>
            <span class="text-ink/25" aria-hidden="true">/</span>
            <span>{{ hero.location }}</span>
          </div>

          <h1 class="type-mega mt-6 max-w-[15ch]" data-reveal style="font-size: clamp(3.5rem, min(7.4vw, 12vh), 7.6rem); line-height: 0.9; letter-spacing: -0.048em; --reveal-delay: 60ms">
            {{ hero.titleLine1 }}<br>
            {{ hero.titleLine2 }}<br>
            <span class="relative block h-[1.12em] overflow-hidden">
              <Transition
                mode="out-in"
                enter-active-class="transition duration-500 ease-[var(--ease-out-expo)]"
                enter-from-class="translate-y-full opacity-0"
                leave-active-class="transition duration-300 ease-in"
                leave-to-class="-translate-y-full opacity-0"
              >
                <em :key="current.emphasis" class="serif-accent block text-signal-deep">{{ current.emphasis }}</em>
              </Transition>
            </span>
          </h1>

          <div class="mt-6 flex flex-wrap items-center gap-3" data-reveal style="--reveal-delay: 180ms">
            <AppButton :to="hero.primaryHref" size="lg" arrow track="hero-quote">{{ hero.primaryLabel }}</AppButton>
            <AppButton :to="hero.secondaryHref" variant="outline" size="lg" arrow track="hero-capabilities">{{ hero.secondaryLabel }}</AppButton>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink/55" data-reveal style="--reveal-delay: 240ms">
            <span v-for="badge in hero.badges" :key="badge" class="flex items-center gap-2"><span class="size-1 bg-signal" /> {{ badge }}</span>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <button type="button" class="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink/65 transition-colors hover:border-brand hover:bg-brand hover:text-white" aria-label="Previous capability" @click="go(-1)"><ArrowLeft :size="14" /></button>
            <button type="button" class="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink/65 transition-colors hover:border-brand hover:bg-brand hover:text-white" aria-label="Next capability" @click="go(1)"><ArrowRight :size="14" /></button>
            <button type="button" class="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink/65 transition-colors hover:border-brand hover:bg-brand hover:text-white" :aria-label="paused ? 'Play carousel' : 'Pause carousel'" @click="paused = !paused; start()">
              <component :is="paused ? Play : Pause" :size="13" />
            </button>
            <div class="ml-2 flex items-center gap-1.5" aria-hidden="true">
              <button
                v-for="(slide, i) in slides"
                :key="slide.image"
                type="button"
                class="h-[2px] transition-all duration-500"
                :class="i === index ? 'w-7 bg-brand' : 'w-3 bg-ink/15 hover:bg-ink/35'"
                :aria-label="`Show ${slide.kicker}`"
                @click="select(i)"
              />
            </div>
            <span class="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">{{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[430px] lg:col-span-5 lg:mr-0 lg:ml-auto lg:max-w-[520px]">
          <div class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/15 bg-ink shadow-[0_35px_80px_-45px_rgba(10,12,11,.55)] md:aspect-[5/6] lg:aspect-auto lg:h-[min(622px,calc(100svh-250px))]">
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
                :widths="[480, 800, 1200]"
                sizes="(max-width: 1024px) 100vw, 38vw"
                :width="1200"
                :height="1400"
                img-class="h-full w-full object-cover"
                class="absolute inset-0 block h-full w-full"
                :priority="index === 0"
              />
            </Transition>
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/5" aria-hidden="true" />

            <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
              <span class="rounded-full border border-bone/25 bg-ink/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/80 backdrop-blur">{{ current.label }}</span>
              <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-bone/55">Houston shop</span>
            </div>

            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-soft">{{ current.kicker }}</p>
              <h2 class="mt-2 text-[clamp(1.45rem,2.2vw,1.9rem)] font-medium leading-tight tracking-[-0.03em] text-bone">{{ current.title }}</h2>
              <p class="mt-2 max-w-sm text-[15px] leading-relaxed text-bone/80">{{ current.description }}</p>
              <div class="mt-4 flex items-center justify-between border-t border-bone/15 pt-3">
                <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-bone/45">Inside the work</span>
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span v-for="(slide, i) in slides" :key="slide.image" class="h-[2px] transition-all duration-500" :class="i === index ? 'w-6 bg-brand-soft' : 'w-3 bg-bone/25'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-9 flex items-center justify-between border-t border-ink/12 pt-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/40">
        <span class="flex items-center gap-3"><span class="h-4 w-px bg-ink/25" /> Scroll to inspect</span>
        <span class="hidden sm:block">{{ company.coordinates }} · CST / UTC−6</span>
        <span>Rev 2026.10</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import { divisions } from '~/data/divisions'

const site = useSiteConfig()
const visible = computed(() => divisions
  .filter(division => site.value.divisions[division.slug]?.enabled !== false)
  .map((division) => ({
    ...division,
    headline: site.value.divisions[division.slug]?.headline || division.headline,
    lead: site.value.divisions[division.slug]?.lead || division.lead,
  })))

const active = ref(0)
const activeDivision = computed(() => visible.value[active.value]!)

const variantMap: Record<string, 'electrical' | 'instrumentation' | 'automotive' | 'mechanical' | 'fabrication' | 'facilities'> = {
  electrical: 'electrical',
  instrumentation: 'instrumentation',
  automotive: 'automotive',
  mechanical: 'mechanical',
  fabrication: 'fabrication',
  'real-estate': 'facilities',
}

function setActive(index: number) {
  active.value = index
}
</script>

<template>
  <div>
    <!-- desktop -->
    <div class="hidden gap-12 lg:grid lg:grid-cols-12">
      <div class="lg:col-span-7">
        <ul class="border-t border-ink/12">
          <li v-for="(division, i) in visible" :key="division.slug" class="border-b border-ink/12">
            <button
              type="button"
              class="group relative flex w-full items-start gap-5 py-6 text-left transition-colors md:gap-8 md:py-7"
              :aria-pressed="active === i"
              @mouseenter="setActive(i)"
              @focus="setActive(i)"
              @click="setActive(i)"
            >
              <span
                class="absolute left-0 top-0 h-full w-[2px] origin-top bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)]"
                :class="active === i ? 'scale-y-100' : 'scale-y-0'"
                aria-hidden="true"
              />
              <span class="mt-1.5 font-mono text-[11.5px] tracking-[0.1em] transition-colors" :class="active === i ? 'text-signal-deep' : 'text-ink/45'">
                {{ division.index }}
              </span>
              <span class="flex-1">
                <span class="flex flex-wrap items-baseline justify-between gap-2">
                  <span class="type-md transition-transform duration-500" :class="active === i ? 'translate-x-1 text-ink' : 'text-ink/70'">
                    {{ division.name }}
                  </span>
                  <span class="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45 md:block">
                    {{ division.meta[0]?.value }}
                  </span>
                </span>
                <span class="mt-2 block max-w-lg text-[13.5px] leading-relaxed" :class="active === i ? 'text-ink/65' : 'text-ink/65'">
                  {{ division.lead }}
                </span>
              </span>
              <ArrowUpRight
                :size="18"
                :stroke-width="1.4"
                class="mt-2 shrink-0 transition-all duration-500"
                :class="active === i ? 'translate-x-0 text-signal-deep opacity-100' : '-translate-x-1 text-ink/20 opacity-0'"
              />
            </button>
          </li>
        </ul>

        <NuxtLink to="/divisions" class="group mt-8 inline-flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink">
          All divisions
          <span class="flex size-7 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
            <ArrowRight :size="12" />
          </span>
        </NuxtLink>
      </div>

      <div class="lg:col-span-5">
        <div class="sticky top-28">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            leave-active-class="transition duration-150 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div :key="activeDivision.slug">
              <DivisionSchematic :variant="variantMap[activeDivision.slug]!" :code="`VT-${activeDivision.index}`" />
              <div class="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Division {{ activeDivision.index }}</p>
                  <p class="mt-1.5 text-[15px] font-medium">{{ activeDivision.headline }}</p>
                </div>
                <NuxtLink
                  :to="`/divisions/${activeDivision.slug}`"
                  class="group flex size-11 shrink-0 items-center justify-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                  :aria-label="`Explore ${activeDivision.name}`"
                >
                  <ArrowUpRight :size="16" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="lg:hidden">
      <ul class="border-t border-ink/12">
        <li v-for="(division, i) in visible" :key="division.slug" class="border-b border-ink/12">
          <button type="button" class="flex w-full items-center justify-between gap-4 py-5 text-left" @click="setActive(i)">
            <span class="flex items-baseline gap-3">
              <span class="font-mono text-[11px] text-ink/45">{{ division.index }}</span>
              <span class="text-[19px] font-medium" :class="active === i ? 'text-ink' : 'text-ink/70'">{{ division.name }}</span>
            </span>
            <span class="size-1.5 transition-colors" :class="active === i ? 'bg-signal' : 'bg-ink/15'" aria-hidden="true" />
          </button>

          <div v-if="active === i" class="pb-6">
            <p class="text-[13.5px] leading-relaxed text-ink/60">{{ division.lead }}</p>
            <div class="mt-4">
              <DivisionSchematic :variant="variantMap[division.slug]!" :code="`VT-${division.index}`" />
            </div>
            <NuxtLink :to="`/divisions/${division.slug}`" class="mt-4 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal-deep">
              Explore {{ division.name }} <ArrowUpRight :size="13" />
            </NuxtLink>
          </div>
        </li>
      </ul>
      <NuxtLink to="/divisions" class="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/60">
        All divisions <ArrowRight :size="13" />
      </NuxtLink>
    </div>
  </div>
</template>

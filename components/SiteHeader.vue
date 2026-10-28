<script setup lang="ts">
import { ChevronDown, Menu, X, Phone, ArrowUpRight, Mail, MapPin } from 'lucide-vue-next'
import { nav as baseNav } from '~/data/company'

const route = useRoute()
const siteConfig = useSiteConfig()
const nav = computed(() => baseNav
  .filter(item => item.label !== 'Systems' || siteConfig.value.features.catalog !== false)
  .map((item) => {
    if (!item.children) return item
    const children = item.children.filter((child) => {
      if (child.to.startsWith('/services/')) {
        const slug = child.to.split('/').pop() || ''
        return siteConfig.value.services[slug]?.enabled !== false
      }
      if (child.to.startsWith('/divisions/')) {
        const slug = child.to.split('/').pop() || ''
        return siteConfig.value.divisions[slug]?.enabled !== false
      }
      if (child.to === '/foundation') return siteConfig.value.features.foundation !== false
      if (child.to === '/careers') return siteConfig.value.features.careers !== false
      return true
    })
    return { ...item, children }
  }))
const scrolled = ref(false)
const progress = ref(0)
const openIndex = ref<number | null>(null)
const mobileOpen = ref(false)
const mobileSection = ref<string | null>(null)
const headerEl = ref<HTMLElement | null>(null)
let closeTimer: ReturnType<typeof setTimeout> | null = null
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    scrolled.value = y > 24
    const height = document.documentElement.scrollHeight - window.innerHeight
    progress.value = height > 0 ? Math.min(1, y / height) : 0
    ticking = false
  })
}

function openMenu(index: number) {
  if (closeTimer) clearTimeout(closeTimer)
  openIndex.value = index
}

function closeMenu(delay = 120) {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { openIndex.value = null }, delay)
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  mobileSection.value = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    openIndex.value = null
    mobileOpen.value = false
  }
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  openIndex.value = null
})

watch(mobileOpen, (open) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header ref="headerEl" class="sticky top-0 z-50">
    <!-- Utility strip -->
    <div
      class="hidden overflow-hidden bg-ink text-bone transition-all duration-500 ease-[var(--ease-out-expo)] lg:block"
      :class="scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100'"
    >
      <div class="wrap flex h-8 items-center justify-between">
        <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/60">
          <span class="flex items-center gap-2">
            <span class="size-1 animate-pulse-led rounded-full bg-signal" aria-hidden="true" />
            UL 508A certified panel shop
          </span>
          <span class="text-bone/20" aria-hidden="true">/</span>
          <span>Houston, Texas</span>
        </div>
        <div class="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/60">
          <a :href="`mailto:${siteConfig.company.email}`" class="transition-colors hover:text-bone">{{ siteConfig.company.email }}</a>
          <span class="text-bone/20" aria-hidden="true">/</span>
          <a :href="`tel:${siteConfig.company.phoneHref}`" class="transition-colors hover:text-bone">{{ siteConfig.company.phone }}</a>
          <span class="text-bone/20" aria-hidden="true">/</span>
          <span class="text-signal">24/7 field response</span>
        </div>
      </div>
    </div>

    <!-- Main bar -->
    <div class="relative border-b border-ink/10 bg-bone/92 backdrop-blur-md">
      <div class="wrap flex h-[70px] items-center justify-between gap-4 lg:h-[74px]">
        <NuxtLink to="/" class="relative z-10 shrink-0" aria-label="Vomtek — home">
          <LogoMark descriptor size="md" />
        </NuxtLink>

        <nav class="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <div
            v-for="(item, i) in nav"
            :key="item.label"
            class="relative"
            @mouseenter="item.children && openMenu(i)"
            @mouseleave="item.children && closeMenu()"
            @focusin="item.children && openMenu(i)"
            @focusout="(e) => { if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) closeMenu(0) }"
          >
            <NuxtLink
              :to="item.to"
              class="group flex items-center gap-1.5 px-3.5 py-2 font-display text-[13.5px] font-medium tracking-[0.005em] transition-colors"
              :class="route.path.startsWith(item.to) && item.to !== '/' ? 'text-brand' : 'text-ink/75 hover:text-ink'"
            >
              {{ item.label }}
              <ChevronDown
                v-if="item.children"
                :size="11"
                :stroke-width="1.8"
                class="mt-px opacity-40 transition-transform duration-300"
                :class="openIndex === i ? 'rotate-180' : ''"
              />
            </NuxtLink>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="item.children && openIndex === i"
                class="absolute top-full z-40 pt-3"
                :class="i === nav.length - 2 ? 'right-0' : 'left-0'"
              >
                <div class="w-[330px] rounded-2xl border border-ink/12 bg-bone p-2 shadow-[0_24px_60px_-24px_rgba(10,12,11,0.35)]">
                  <div class="mb-1 flex items-center justify-between border-b border-ink/8 px-3 py-2.5">
                    <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">{{ item.label }}</span>
                    <NuxtLink :to="item.to" class="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">View all</NuxtLink>
                  </div>
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to"
                    class="group flex items-center justify-between gap-3 px-3 py-2.5 transition-colors hover:bg-ink/[0.04]"
                  >
                    <span class="flex flex-1 flex-col">
                      <span class="font-display text-[14px] font-medium text-ink/85 group-hover:text-ink">{{ child.label }}</span>
                      <span class="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/50">{{ child.note }}</span>
                    </span>
                    <ArrowUpRight :size="13" class="text-ink/40 transition-all group-hover:translate-x-0.5 group-hover:text-signal-deep" />
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>
        </nav>

        <div class="flex items-center gap-2">
          <a
            :href="`tel:${siteConfig.company.phoneHref}`"
            class="hidden size-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-brand hover:bg-brand hover:text-white xl:flex"
            aria-label="Call Vomtek"
          >
            <Phone :size="15" :stroke-width="1.5" />
          </a>
          <div class="hidden sm:block">
            <AppButton to="/quote" size="sm" arrow track="header-quote">
              Start a project
            </AppButton>
          </div>
          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-[2px] border border-ink/15 lg:hidden"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-menu"
            aria-label="Open menu"
            @click="toggleMobile"
          >
            <Menu v-if="!mobileOpen" :size="18" :stroke-width="1.6" />
            <X v-else :size="18" :stroke-width="1.6" />
          </button>
        </div>
      </div>

      <!-- scroll progress -->
      <div class="absolute inset-x-0 bottom-0 h-px bg-transparent" aria-hidden="true">
        <div class="h-px bg-signal transition-[width] duration-150 ease-linear" :style="{ width: `${progress * 100}%` }" />
      </div>
    </div>
  </header>

  <!-- Mobile menu -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-[var(--ease-out-expo)]"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileOpen" id="mobile-menu" class="fixed inset-0 z-[70] flex flex-col bg-brand-deep text-bone lg:hidden">
        <div class="flex h-[70px] shrink-0 items-center justify-between border-b border-bone/10 px-5">
          <LogoMark tone="bone" size="sm" descriptor />
          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-brand-soft hover:text-brand-soft"
            aria-label="Close menu"
            @click="toggleMobile"
          >
            <X :size="18" :stroke-width="1.5" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-4">
          <nav aria-label="Mobile">
            <div v-for="(item, i) in nav" :key="item.label" class="border-b border-bone/10">
              <div class="flex items-center justify-between">
                <NuxtLink :to="item.to" class="block flex-1 py-4 font-display text-[28px] font-medium tracking-[-0.02em]">
                  {{ item.label }}
                </NuxtLink>
                <button
                  v-if="item.children"
                  type="button"
                  class="flex size-9 items-center justify-center text-bone/65"
                  :aria-expanded="mobileSection === item.label"
                  :aria-label="`Toggle ${item.label}`"
                  @click="mobileSection = mobileSection === item.label ? null : item.label"
                >
                  <ChevronDown :size="16" :class="mobileSection === item.label ? 'rotate-180' : ''" class="transition-transform" />
                </button>
              </div>
              <div v-if="item.children" class="overflow-hidden transition-all duration-300" :class="mobileSection === item.label ? 'max-h-[420px] pb-4' : 'max-h-0'">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="flex items-baseline gap-3 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-bone/70"
                >
                  <span class="text-[11px] text-bone/40">{{ child.note }}</span>{{ child.label }}
                </NuxtLink>
              </div>
            </div>
          </nav>

          <div class="mt-8 grid gap-2">
            <AppButton to="/quote" variant="signal" size="lg" arrow block track="mobile-quote">Start a project</AppButton>
            <a :href="`tel:${siteConfig.company.phoneHref}`" class="flex h-12 items-center justify-center gap-2 rounded-full border border-bone/25 font-sans text-[12.5px] font-medium tracking-[0.02em] text-bone/80 transition-colors hover:border-brand-soft hover:text-brand-soft">
              <Phone :size="14" /> {{ siteConfig.company.phone }}
            </a>
          </div>

          <div class="mt-8 space-y-2 font-mono text-[12px] leading-relaxed text-bone/60">
            <p class="flex items-center gap-2"><MapPin :size="12" /> {{ siteConfig.company.address.full }}</p>
            <p class="flex items-center gap-2"><Mail :size="12" /> {{ siteConfig.company.email }}</p>
            <p class="flex items-center gap-2"><span class="size-1 rounded-full bg-signal" /> {{ siteConfig.company.hours }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ArrowUpRight, Phone } from 'lucide-vue-next'
const siteConfig = useSiteConfig()

const route = useRoute()
const visible = ref(false)
const excluded = computed(() => ['/quote', '/studio', '/track', '/assessment', '/uptime-care'].some(path => route.path.startsWith(path)))

function onScroll() {
  visible.value = window.scrollY > 420
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[var(--ease-out-expo)]"
    enter-from-class="translate-y-full"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="visible && !excluded"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-bone/15 bg-brand-deep/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden"
    >
      <div class="flex items-center gap-2">
        <NuxtLink
          to="/quote"
          class="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand-soft font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-deep"
          data-track="mobile-sticky-quote"
        >
          Start a project <ArrowUpRight :size="13" />
        </NuxtLink>
        <a
          :href="`tel:${siteConfig.company.phoneHref}`"
          class="flex size-11 shrink-0 items-center justify-center rounded-full border border-bone/25 text-bone/80"
          :aria-label="`Call Vomtek at ${siteConfig.company.phone}`"
          data-track="mobile-sticky-call"
        >
          <Phone :size="16" :stroke-width="1.5" />
        </a>
      </div>
    </div>
  </Transition>
</template>

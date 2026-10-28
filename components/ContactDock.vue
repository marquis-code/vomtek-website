<script setup lang="ts">
import { ArrowUpRight, CalendarCheck2, ClipboardList, Phone, X } from 'lucide-vue-next'

const { site, whatsappHref, trackWhatsApp, trackConsult } = useContactLinks()
const route = useRoute()
const open = ref(false)
const visible = ref(false)
const panel = ref<HTMLElement | null>(null)

function close() {
  open.value = false
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}
function consult(location: string) {
  trackConsult(location)
  open.value = true
  nextTick(() => panel.value?.focus())
}
function onScroll() {
  visible.value = window.scrollY > 420
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
  if (import.meta.client) document.body.style.overflow = ''
})
watch(open, (value) => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('lenis-stopped', value)
  document.body.style.overflow = value ? 'hidden' : ''
})
watch(() => route.fullPath, close)
onUnmounted(() => { if (import.meta.client) document.body.style.overflow = '' })
</script>

<template>
  <div v-if="site.features.whatsapp !== false || site.features.consult !== false" class="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+5.4rem)] z-50 flex items-end justify-between px-4 transition-opacity duration-300 lg:bottom-6 lg:px-6"
      :class="visible ? 'opacity-100' : 'invisible opacity-0 lg:visible lg:opacity-100'">
    <a
      v-if="site.features.whatsapp !== false"
      :href="whatsappHref"
      target="_blank"
      rel="noopener"
      class="pointer-events-auto group flex h-11 items-center gap-2.5 rounded-full bg-[#25D366] px-3 text-[#04351d] shadow-[0_14px_35px_-16px_rgba(4,53,29,.8)] transition-transform hover:-translate-y-0.5 lg:px-4"
      aria-label="Chat with Vomtek on WhatsApp"
      @click="trackWhatsApp('floating-dock')"
    >
      <WhatsAppIcon class="size-5 shrink-0" />
      <span class="hidden font-sans text-[11.5px] font-semibold tracking-[0.02em] sm:block">WhatsApp the shop</span>
    </a>

    <button
      v-if="site.features.consult !== false"
      type="button"
      class="pointer-events-auto group ml-auto flex h-11 items-center gap-2.5 rounded-full bg-brand-deep px-3 text-bone shadow-[0_14px_35px_-16px_rgba(0,75,43,.8)] transition-transform hover:-translate-y-0.5 lg:px-4"
      aria-label="Consult with Vomtek"
      :aria-expanded="open"
      @click="consult('floating-dock')"
    >
      <CalendarCheck2 :size="17" :stroke-width="1.8" />
      <span class="hidden font-sans text-[11.5px] font-semibold tracking-[0.02em] sm:block">Consult an engineer</span>
    </button>
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-[var(--ease-out-expo)]"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[80] flex justify-end bg-ink/45 backdrop-blur-[2px]" @click.self="close">
        <Transition
          appear
          enter-active-class="transition duration-300 ease-[var(--ease-out-expo)]"
          enter-from-class="translate-x-full"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="translate-x-full"
        >
          <aside ref="panel" tabindex="-1" class="flex h-full w-full max-w-md flex-col overflow-y-auto rounded-l-2xl bg-bone shadow-[-30px_0_80px_-30px_rgba(10,12,11,.5)]" aria-label="Consult with Vomtek">
            <div class="flex items-start justify-between border-b border-ink/12 p-5">
              <div>
                <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">Talk to a person</p>
                <h2 class="mt-1 text-[27px] font-medium leading-tight tracking-[-0.03em]">What do you need to solve?</h2>
                <p class="mt-2 text-[13px] leading-relaxed text-ink/60">A short conversation is usually faster than a form. Choose the route that suits you.</p>
              </div>
              <button type="button" class="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/55 hover:border-brand hover:text-brand" aria-label="Close consultation panel" @click="close"><X :size="16" /></button>
            </div>

            <div class="flex-1 p-5">
              <a :href="whatsappHref" target="_blank" rel="noopener" class="group flex items-center gap-4 rounded-xl bg-[#25D366] p-4 text-[#04351d]" @click="trackWhatsApp('consult-panel')">
                <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#04351d]/10"><WhatsAppIcon class="size-5" /></span>
                <span class="flex-1">
                  <span class="block text-[14px] font-semibold">WhatsApp the shop</span>
                  <span class="mt-0.5 block text-[12px] opacity-75">Fastest for photos, nameplates and quick questions.</span>
                </span>
                <ArrowUpRight :size="16" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div class="mt-3 grid gap-2">
                <NuxtLink to="/assessment" class="group flex items-center gap-4 rounded-xl border border-ink/15 bg-bone p-4 transition-colors hover:border-brand" @click="trackConsult('consult-panel-assessment'); close()">
                  <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep"><ClipboardList :size="18" /></span>
                  <span class="flex-1"><span class="block text-[14px] font-medium">Book a free assessment</span><span class="mt-0.5 block text-[12px] text-ink/55">A walkthrough, findings, and a written report.</span></span>
                  <ArrowUpRight :size="15" class="text-ink/35 group-hover:text-brand" />
                </NuxtLink>
                <NuxtLink to="/quote" class="group flex items-center gap-4 rounded-xl border border-ink/15 bg-bone p-4 transition-colors hover:border-brand" @click="trackConsult('consult-panel-quote'); close()">
                  <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep"><ClipboardList :size="18" /></span>
                  <span class="flex-1"><span class="block text-[14px] font-medium">Scope a project</span><span class="mt-0.5 block text-[12px] text-ink/55">A real reference, lead time, and an engineer review.</span></span>
                  <ArrowUpRight :size="15" class="text-ink/35 group-hover:text-brand" />
                </NuxtLink>
                <a :href="`tel:${site.company.phoneHref}`" class="group flex items-center gap-4 rounded-xl border border-ink/15 bg-bone p-4 transition-colors hover:border-brand" @click="trackConsult('consult-panel-call')">
                  <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep"><Phone :size="18" /></span>
                  <span class="flex-1"><span class="block text-[14px] font-medium">Call {{ site.company.phone }}</span><span class="mt-0.5 block text-[12px] text-ink/55">{{ site.company.hours }}</span></span>
                  <ArrowUpRight :size="15" class="text-ink/35 group-hover:text-brand" />
                </a>
              </div>

              <p class="mt-5 border-t border-ink/12 pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">Houston, TX · A person replies within one business day · Emergency breakdowns jump the queue.</p>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

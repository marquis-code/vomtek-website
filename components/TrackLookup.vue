<script setup lang="ts">
import { Search, ArrowRight, CircleCheck, Clock, TriangleAlert } from 'lucide-vue-next'

interface TimelineEvent {
  status: string
  note: string
  at: string
}

interface QuoteResult {
  ref: string
  status: string
  projectType: string
  projectTypeLabel?: string
  industry?: string
  quantity?: number
  createdAt: string
  updatedAt: string
  estimate?: { leadTime?: string; reviewBy?: string }
  timeline: TimelineEvent[]
}

const route = useRoute()
const siteConfig = useSiteConfig()
const input = ref(typeof route.query.ref === 'string' ? route.query.ref : '')
const result = ref<QuoteResult | null>(null)
const status = ref<'idle' | 'loading' | 'error'>('idle')
const message = ref('')

const labels: Record<string, string> = {
  received: 'Received',
  engineering_review: 'Engineering review',
  quoted: 'Quote issued',
  approved: 'Approved for build',
  in_build: 'In build',
  shipped: 'Shipped',
  closed: 'Closed',
  cancelled: 'Cancelled',
}

async function lookup() {
  const ref = input.value.trim().toUpperCase()
  if (!ref) {
    status.value = 'error'
    message.value = 'Enter the reference from your acknowledgement email (for example VT-2026-0042).'
    return
  }
  status.value = 'loading'
  message.value = ''
  result.value = null
  try {
    const data = await $fetch<QuoteResult>(`${useRuntimeConfig().public.apiBase}/quotes/${encodeURIComponent(ref)}`, { timeout: 8000 })
    result.value = data
    status.value = 'idle'
    track('quote_track_lookup', { ref })
  }
  catch {
    status.value = 'error'
    message.value = `No project found with that reference. Check the reference or call ${siteConfig.value.company.phone} and we will look it up.`
  }
}

onMounted(() => {
  if (input.value) lookup()
})

const fmt = (iso: string) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}
</script>

<template>
  <div class="border border-ink/15 bg-bone">
    <div class="flex items-center justify-between border-b border-ink/12 px-5 py-3.5">
      <div class="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
        <span class="size-1.5 animate-pulse-led bg-signal" />
        Project status
      </div>
      <span class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Read-only lookup</span>
    </div>

    <div class="p-5 md:p-7">
      <form class="flex flex-col gap-3 sm:flex-row" novalidate @submit.prevent="lookup">
        <div class="flex-1">
          <label for="track-ref" class="sr-only">Project reference</label>
          <input
            id="track-ref"
            v-model="input"
            type="text"
            class="field font-mono uppercase tracking-[0.06em]"
            placeholder="VT-2026-0042"
            autocomplete="off"
            spellcheck="false"
          >
        </div>
        <button
          type="submit"
          class="inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand-deep px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand disabled:opacity-50"
          :disabled="status === 'loading'"
        >
          <Search :size="13" />
          {{ status === 'loading' ? 'Looking…' : 'Look up' }}
        </button>
      </form>

      <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/45">
        Demo reference: VT-2026-0042 · references are issued when a request is submitted
      </p>

      <div v-if="status === 'error'" class="mt-6 flex items-start gap-3 border border-danger/30 bg-danger-soft p-4">
        <TriangleAlert :size="15" class="mt-0.5 shrink-0 text-danger" />
        <p class="text-[13.5px] leading-relaxed text-ink/65">{{ message }}</p>
      </div>

      <div v-if="result" class="mt-8">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-ink/12 pb-4">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 bg-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bone">
              <span class="size-1.5 animate-pulse-led bg-signal" />
              {{ labels[result.status] || result.status }}
            </span>
            <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">{{ result.projectTypeLabel || result.projectType.replace(/-/g, ' ') }}</span>
          </div>
          <span class="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink/45">Ref {{ result.ref }}</span>
        </div>

        <div class="mt-5 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-3">
          <div class="bg-bone-2/50 p-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Scope</p>
            <p class="mt-1 text-[14px] font-medium capitalize">{{ result.projectType.replace(/-/g, ' ') }}</p>
          </div>
          <div class="bg-bone-2/50 p-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Indicative lead time</p>
            <p class="mt-1 text-[14px] font-medium">{{ result.estimate?.leadTime || 'Under review' }}</p>
          </div>
          <div class="bg-bone-2/50 p-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Last update</p>
            <p class="mt-1 text-[14px] font-medium">{{ fmt(result.timeline[result.timeline.length - 1]?.at || result.updatedAt) }}</p>
          </div>
        </div>

        <div class="mt-7">
          <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Timeline</p>
          <ol class="mt-4">
            <li v-for="(event, i) in [...result.timeline].reverse()" :key="i" class="relative flex gap-4 pb-6 last:pb-0">
              <div class="flex flex-col items-center">
                <span class="flex size-6 shrink-0 items-center justify-center rounded-full border" :class="i === 0 ? 'border-signal bg-signal text-ink' : 'border-ink/25 bg-bone text-ink/45'">
                  <CircleCheck v-if="i !== 0" :size="11" />
                  <span v-else class="size-1.5 bg-ink" />
                </span>
                <span v-if="i !== result.timeline.length - 1" class="mt-1 w-px flex-1 bg-ink/15" />
              </div>
              <div class="pb-1">
                <p class="text-[13.5px] font-medium">{{ labels[event.status] || event.status }}</p>
                <p class="mt-0.5 text-[13px] leading-relaxed text-ink/70">{{ event.note }}</p>
                <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/45">{{ fmt(event.at) }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
          <p class="max-w-sm text-[13px] leading-relaxed text-ink/60">
            Need something changed or added? Reply to your acknowledgement email or call the shop with this reference.
          </p>
          <a href="tel:+17133471466" class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-danger">
            Call the shop <ArrowRight :size="12" />
          </a>
        </div>
      </div>

      <div v-if="!result && status !== 'error'" class="mt-8 border-t border-ink/12 pt-5">
        <div class="flex items-start gap-3">
          <Clock :size="15" class="mt-0.5 shrink-0 text-ink/45" />
          <p class="max-w-md text-[13px] leading-relaxed text-ink/60">
            Your reference appears on the acknowledgement we send after you submit a request. Status updates are posted by the project engineer — usually the same day a milestone is reached.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

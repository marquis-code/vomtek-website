<script setup lang="ts">
import { ArrowUpRight, Check } from 'lucide-vue-next'

const props = withDefaults(defineProps<{ defaultPlan?: string }>(), { defaultPlan: 'priority' })

const site = useSiteConfig()
const runtime = useRuntimeConfig()
const planOptions = [
  { value: 'essential', label: 'Essential — annual health check' },
  { value: 'priority', label: 'Priority — quarterly + 4-hr response' },
  { value: 'critical', label: 'Critical — 24/7 + spares held' },
  { value: 'unsure', label: 'Not sure yet' },
]

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  sites: '1',
  assets: '',
  plan: props.defaultPlan,
  message: '',
  website: '',
})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const error = ref('')

async function submit() {
  error.value = ''
  if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.value = 'A name and valid email are required.'
    return
  }
  status.value = 'loading'
  try {
    await $fetch(`${runtime.public.apiBase}/contact`, {
      method: 'POST',
      timeout: 8000,
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: 'Uptime Care assessment',
        source: 'contact',
        message: [
          `Plan interest: ${form.plan}`,
          `Sites: ${form.sites}`,
          `Critical assets: ${form.assets || '—'}`,
          '',
          form.message || 'Requesting a free panel health assessment.',
        ].join('\n'),
        website: form.website,
      },
    })
    status.value = 'success'
    track('assessment_request', { plan: form.plan })
  }
  catch {
    status.value = 'error'
    error.value = `We could not send that. Call ${site.value.company.phone} and we will take the details directly.`
  }
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="border border-bone/20 p-6" role="status">
      <div class="flex size-10 items-center justify-center rounded-full bg-signal text-ink"><Check :size="16" /></div>
      <h3 class="mt-5 text-[22px] font-medium tracking-[-0.03em] text-bone">Assessment requested.</h3>
      <p class="mt-2 text-[14px] leading-relaxed text-bone/70">A person will reply within one business day to schedule the walkthrough. No obligation, no charge for the first assessment.</p>
    </div>

    <form v-else class="grid gap-x-4 gap-y-3 sm:grid-cols-2" @submit.prevent="submit">
      <div><label class="field-label !text-bone/60">Name *</label><input v-model="form.name" class="field field-dark" placeholder="Your name"></div>
      <div><label class="field-label !text-bone/60">Company</label><input v-model="form.company" class="field field-dark" placeholder="Company / site"></div>
      <div><label class="field-label !text-bone/60">Email *</label><input v-model="form.email" type="email" class="field field-dark" placeholder="you@company.com"></div>
      <div><label class="field-label !text-bone/60">Phone</label><input v-model="form.phone" type="tel" class="field field-dark" placeholder="713-…"></div>
      <div><label class="field-label !text-bone/60">Sites</label><input v-model="form.sites" type="number" min="1" class="field field-dark"></div>
      <div><label class="field-label !text-bone/60">Plan interest</label>
        <AppSelect v-model="form.plan" :options="planOptions" dark placeholder="Choose a plan" />
      </div>
      <div class="sm:col-span-2"><label class="field-label !text-bone/60">Critical assets</label><input v-model="form.assets" class="field field-dark" placeholder="MCC lineup, pump drives, HMI…"></div>
      <div class="sm:col-span-2"><label class="field-label !text-bone/60">Anything else?</label><textarea v-model="form.message" rows="3" class="field field-dark resize-none" placeholder="What keeps failing, or what is the next outage window?" /></div>
      <div class="absolute -left-[9999px]" aria-hidden="true"><label>Website</label><input v-model="form.website" tabindex="-1" autocomplete="off"></div>

      <div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
        <p class="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-bone/45">No charge for the first assessment. We use this only to reply.</p>
        <button type="submit" class="inline-flex h-11 items-center gap-2 rounded-full bg-brand-soft px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-deep transition-colors hover:bg-bone disabled:opacity-50" :disabled="status === 'loading'">
          {{ status === 'loading' ? 'Sending…' : 'Request assessment' }} <ArrowUpRight :size="13" />
        </button>
      </div>
      <p v-if="error" class="sm:col-span-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-signal">{{ error }}</p>
    </form>
  </div>
</template>

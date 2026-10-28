<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-vue-next'
import { industries, panelTypes } from '~/data/company'
import { services } from '~/data/services'

onMounted(() => { track('quote_view', { source: 'configurator' }) })

const steps = [
  { n: 1, label: 'Project' },
  { n: 2, label: 'Specification' },
  { n: 3, label: 'Brief' },
  { n: 4, label: 'Contact' },
]

const projectTypes = [
  { value: 'control-panel', label: 'Control panel', note: 'Design, build, FAT', glyph: 'panel' as const },
  { value: 'retrofit', label: 'Retrofit / repair', note: 'Replace, rebuild, document', glyph: 'repair' as const },
  { value: 'pcb', label: 'PCB design', note: 'Schematic to Gerbers', glyph: 'pcb' as const },
  { value: 'harness', label: 'Wire harness', note: 'Build to print or sample', glyph: 'harness' as const },
  { value: 'motor', label: 'Motor service', note: 'Rewind, test, diagnose', glyph: 'motor' as const },
  { value: 'field', label: 'Field service', note: 'Install, start, maintain', glyph: 'field' as const },
  { value: 'multiple', label: 'Multiple scopes', note: 'A project that crosses trades', glyph: 'test' as const },
  { value: 'other', label: 'Something else', note: 'Tell us what it is', glyph: 'panel' as const },
]

const route = useRoute()
const siteConfig = useSiteConfig()
const catalogSlug = typeof route.query.system === 'string' ? route.query.system : ''

const toOptions = (values: string[]) => values.map(value => ({ value, label: value }))
const timelineOptions = toOptions([
  'Breakdown — as soon as possible', 'Within 4 weeks', '1–2 months', '3–6 months', 'Budgeting / planning',
])
const voltageOptions = toOptions(['120V / 1Φ', '240V / 1Φ', '480V / 3Φ', '4,160V', '24VDC control', 'Mixed / not sure'])
const environmentOptions = toOptions(['Indoor, clean', 'Indoor, washdown', 'Outdoor', 'Corrosive / chemical', 'Hazardous area', 'Not sure'])
const certificationOptions = toOptions(['UL 508A', 'UL 508A + cUL', 'CE / IEC', 'None / not sure'])
const drawingOptions = toOptions(['Yes — current and accurate', 'Yes — but out of date', 'Partial / hand sketches', 'No drawings at all'])
const industryOptions = computed(() => toOptions(industries))

const step = ref(1)
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const result = ref<{ ref: string; estimate?: { leadTime: string; reviewBy: string }; status?: string } | null>(null)
const errorMessage = ref('')
const stepError = ref('')

const form = reactive({
  projectType: catalogSlug ? 'control-panel' : '',
  industry: '',
  panelTypes: [] as string[],
  quantity: 1,
  voltage: '',
  environment: '',
  certification: '',
  timeline: '',
  services: [] as string[],
  existingDrawings: '',
  notes: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  consent: false,
  website: '',
  catalogSlug,
})

const selectedType = computed(() => projectTypes.find(t => t.value === form.projectType))
const additionalServices = computed(() => {
  const map: Record<string, string> = {
    'control-panel': 'control-panels',
    'pcb': 'pcb-design',
    'harness': 'wire-harness',
    'motor': 'motor-rewinding',
    'field': 'field-service',
    'retrofit': 'panel-repair',
  }
  return services.filter(service => service.slug !== map[form.projectType])
})
const showPanelTypes = computed(() => ['control-panel', 'retrofit', 'multiple'].includes(form.projectType))

function toggleList(list: string[], value: string) {
  const index = list.indexOf(value)
  if (index >= 0) list.splice(index, 1)
  else list.push(value)
}

function next() {
  stepError.value = ''
  if (step.value === 1 && !form.projectType) {
    stepError.value = 'Choose the closest project type to continue.'
    return
  }
  if (step.value === 4) {
    submit()
    return
  }
  step.value = Math.min(4, step.value + 1)
  scrollToCard()
}

function back() {
  stepError.value = ''
  step.value = Math.max(1, step.value - 1)
  scrollToCard()
}

function scrollToCard() {
  if (!import.meta.client) return
  document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function submit() {
  if (!form.name.trim()) {
    stepError.value = 'Please add your name.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    stepError.value = 'Please add a valid email so we can reply.'
    return
  }
  if (!form.consent) {
    stepError.value = 'Please confirm we can contact you about this request.'
    return
  }

  status.value = 'loading'
  errorMessage.value = ''
  try {
    const data = await $fetch<{ ref: string; estimate: { leadTime: string; reviewBy: string }; status: string }>(
      `${useRuntimeConfig().public.apiBase}/quotes`,
      {
        method: 'POST',
        timeout: 10000,
        body: {
          ...form,
          certifications: form.certification ? [form.certification] : [],
          projectTypeLabel: selectedType.value?.label,
          source: 'configurator',
        },
      },
    )
    result.value = data
    status.value = 'success'
    track('quote_submit', {
      type: form.projectType,
      industry: form.industry,
      timeline: form.timeline,
      ref: data.ref,
    })
  }
  catch (err: unknown) {
    status.value = 'error'
    const e = err as { data?: { message?: string | string[] } }
    const msg = e?.data?.message
    errorMessage.value = Array.isArray(msg) ? msg.join(' ') : (msg || `The request did not send. Call ${siteConfig.value.company.phone} and we will take the details directly.`)
  }
}

</script>

<template>
  <div id="configurator" class="scroll-mt-24">
    <div class="overflow-hidden rounded-2xl border border-ink/15 bg-bone">
      <!-- header -->
      <div class="flex items-center justify-between border-b border-ink/12 px-5 py-3.5 md:px-6">
        <div class="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          Project configurator
        </div>
        <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50">{{ status === 'success' ? 'Complete' : `Step ${step} / 4` }}</span>
      </div>

      <div v-if="status === 'success' && result" class="p-6 md:p-10" role="status" aria-live="polite">
        <div class="flex size-11 items-center justify-center rounded-full bg-ink text-signal">
          <Check :size="18" />
        </div>
        <p class="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">Request received</p>
        <h3 class="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight tracking-[-0.035em]">
          Reference <span class="text-signal-deep">{{ result.ref }}</span>
        </h3>
        <p class="mt-3 max-w-lg text-[14px] leading-relaxed text-ink/70">
          You will receive an acknowledgement by email. An engineer reviews the scope and replies within one business day with the next questions — or a call if the job is urgent.
        </p>

        <div class="mt-8 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
          <div class="bg-bone-2/60 p-5">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/50">Indicative lead time</p>
            <p class="mt-2 text-[22px] font-medium tracking-[-0.03em]">{{ result.estimate?.leadTime || 'To be confirmed' }}</p>
            <p class="mt-1 text-[12px] text-ink/60">Confirmed after engineering review</p>
          </div>
          <div class="bg-bone-2/60 p-5">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/50">Review by</p>
            <p class="mt-2 text-[22px] font-medium tracking-[-0.03em]">{{ result.estimate?.reviewBy || 'Next business day' }}</p>
            <p class="mt-1 text-[12px] text-ink/60">A person, not an autoresponder</p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton :to="`/track?ref=${result.ref}`" size="md" arrow track="quote-success-track">Track this request</AppButton>
          <AppButton to="/" variant="outline" size="md" track="quote-success-home">Back to home</AppButton>
        </div>

        <div class="mt-8 border-t border-ink/12 pt-5">
          <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/50">If the line is down now</p>
          <p class="mt-1.5 text-[14px] text-ink/60">Call <a href="tel:+17133471466" class="font-medium underline decoration-signal underline-offset-4">713-347-1466</a> and reference {{ result.ref }}.</p>
        </div>
      </div>

      <div v-else class="grid lg:grid-cols-[220px_1fr]">
        <!-- step rail -->
        <aside class="hidden border-r border-ink/12 p-6 lg:block">
          <ol class="space-y-1">
            <li v-for="s in steps" :key="s.n">
              <button
                type="button"
                class="group flex w-full items-center gap-3 py-2 text-left"
                :disabled="s.n > step"
                @click="s.n < step ? (step = s.n) : null"
              >
                <span
                  class="flex size-6 items-center justify-center rounded-full border font-mono text-[10.5px] transition-colors"
                  :class="step === s.n ? 'border-brand bg-brand text-white' : s.n < step ? 'border-brand-deep bg-brand-deep text-white' : 'border-ink/20 text-ink/45'"
                >
                  <Check v-if="s.n < step" :size="11" />
                  <template v-else>0{{ s.n }}</template>
                </span>
                <span class="font-mono text-[11px] uppercase tracking-[0.12em]" :class="step === s.n ? 'text-ink' : 'text-ink/50'">{{ s.label }}</span>
              </button>
            </li>
          </ol>

          <div class="mt-8 border-t border-ink/12 pt-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Why we ask</p>
            <p class="mt-2 text-[12px] leading-relaxed text-ink/60">
              Four questions let an engineer estimate the scope before we call. Anything you skip, we will ask later.
            </p>
          </div>

          <div class="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
            <span class="size-1 animate-pulse-led bg-signal" />
            About 2 minutes
          </div>
        </aside>

        <div class="p-5 md:p-8">
          <!-- progress bar -->
          <div class="mb-7 flex gap-1 lg:hidden">
            <span v-for="s in steps" :key="s.n" class="h-0.5 flex-1" :class="s.n <= step ? 'bg-signal' : 'bg-ink/12'" />
          </div>

          <form @submit.prevent="next">
            <!-- STEP 1 -->
            <div v-if="step === 1">
              <h3 class="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">What are you building?</h3>
              <p class="mt-1.5 text-[14px] text-ink/65">Pick the closest match. Multi-scope work is normal — we will sort the details later.</p>

              <div class="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  v-for="type in projectTypes"
                  :key="type.value"
                  type="button"
                  class="group relative flex items-center gap-3.5 rounded-xl border p-3.5 text-left transition-colors"
                  :class="form.projectType === type.value ? 'border-brand bg-brand text-white' : 'border-ink/15 hover:border-brand/40'"
                  :aria-pressed="form.projectType === type.value"
                  @click="form.projectType = type.value; stepError = ''"
                >
                  <span class="size-8 shrink-0" :class="form.projectType === type.value ? 'text-signal' : 'text-ink/60'">
                    <ServiceGlyph :variant="type.glyph" />
                  </span>
                  <span class="min-w-0">
                    <span class="block text-[13.5px] font-medium leading-tight">{{ type.label }}</span>
                    <span class="mt-0.5 block text-[12px]" :class="form.projectType === type.value ? 'text-bone/60' : 'text-ink/55'">{{ type.note }}</span>
                  </span>
                  <span v-if="form.projectType === type.value" class="absolute right-3 top-3 size-1.5 bg-signal" />
                </button>
              </div>
            </div>

            <!-- STEP 2 -->
            <div v-else-if="step === 2">
              <h3 class="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">Give us the envelope.</h3>
              <p class="mt-1.5 text-[14px] text-ink/65">Enough to estimate. Exact details live in the drawings — we will get there.</p>

              <div class="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <div>
                  <label for="qb-industry" class="field-label">Industry</label>
                  <AppSelect id="qb-industry" v-model="form.industry" :options="industryOptions" placeholder="Select industry" />
                </div>
                <div>
                  <label for="qb-timeline" class="field-label">When do you need it?</label>
                  <AppSelect id="qb-timeline" v-model="form.timeline" :options="timelineOptions" placeholder="Select timeline" />
                </div>
                <div>
                  <label for="qb-voltage" class="field-label">Voltage</label>
                  <AppSelect id="qb-voltage" v-model="form.voltage" :options="voltageOptions" placeholder="Select voltage" />
                </div>
                <div>
                  <label for="qb-environment" class="field-label">Environment</label>
                  <AppSelect id="qb-environment" v-model="form.environment" :options="environmentOptions" placeholder="Select environment" />
                </div>
                <div v-if="!['pcb', 'motor', 'field'].includes(form.projectType)">
                  <label for="qb-qty" class="field-label">Quantity</label>
                  <input id="qb-qty" v-model.number="form.quantity" type="number" min="1" max="999" class="field">
                </div>
                <div>
                  <label for="qb-cert" class="field-label">Certification required</label>
                  <AppSelect id="qb-cert" v-model="form.certification" :options="certificationOptions" placeholder="Select certification" />
                </div>
              </div>

              <div v-if="showPanelTypes" class="mt-6">
                <p class="field-label">Panel type <span class="normal-case tracking-normal opacity-50">(select any)</span></p>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="panel in panelTypes"
                    :key="panel.code"
                    type="button"
                    class="rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors"
                    :class="form.panelTypes.includes(panel.name) ? 'border-brand bg-brand text-white' : 'border-ink/15 text-ink/65 hover:border-brand/40'"
                    @click="toggleList(form.panelTypes, panel.name)"
                  >
                    {{ panel.name }}
                  </button>
                </div>
              </div>

              <div class="mt-6">
                <p class="field-label">Also in scope <span class="normal-case tracking-normal opacity-50">(optional)</span></p>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="service in additionalServices"
                    :key="service.slug"
                    type="button"
                    class="rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors"
                    :class="form.services.includes(service.slug) ? 'border-signal bg-signal/10 text-ink' : 'border-ink/15 text-ink/60 hover:border-ink/40'"
                    @click="toggleList(form.services, service.slug)"
                  >
                    {{ service.navLabel }}
                  </button>
                </div>
              </div>
            </div>

            <!-- STEP 3 -->
            <div v-else-if="step === 3">
              <h3 class="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">Tell us the story.</h3>
              <p class="mt-1.5 text-[14px] text-ink/65">What has to happen, what failed, and what cannot change. Plain language is fine.</p>

              <div class="mt-6">
                <label for="qb-notes" class="field-label">Project brief</label>
                <textarea
                  id="qb-notes"
                  v-model="form.notes"
                  rows="7"
                  class="field resize-none"
                  placeholder="Example: We are replacing a 20-year-old MCC feeding a municipal plant. Need 14 buckets, 480V, NEMA 12, UL 508A. Existing drawings are incomplete. The outage window is in March."
                />
                <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/45">The more specific, the more useful the first call.</p>
              </div>

              <div class="mt-6 max-w-sm">
                <label for="qb-drawings" class="field-label">Do drawings exist?</label>
                <AppSelect id="qb-drawings" v-model="form.existingDrawings" :options="drawingOptions" placeholder="Select one" />
              </div>
            </div>

            <!-- STEP 4 -->
            <div v-else>
              <h3 class="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">Where do we send it?</h3>
              <p class="mt-1.5 text-[14px] text-ink/65">We reply within one business day. Your details are used for this request only.</p>

              <div class="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <div>
                  <label for="qb-name" class="field-label">Name *</label>
                  <input id="qb-name" v-model="form.name" type="text" autocomplete="name" class="field">
                </div>
                <div>
                  <label for="qb-company" class="field-label">Company</label>
                  <input id="qb-company" v-model="form.company" type="text" autocomplete="organization" class="field">
                </div>
                <div>
                  <label for="qb-email" class="field-label">Email *</label>
                  <input id="qb-email" v-model="form.email" type="email" autocomplete="email" class="field">
                </div>
                <div>
                  <label for="qb-phone" class="field-label">Phone</label>
                  <input id="qb-phone" v-model="form.phone" type="tel" autocomplete="tel" class="field">
                </div>
              </div>

              <div class="mt-6 border border-ink/12 bg-bone-2/50 p-4">
                <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55">Summary</p>
                <div class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink/60">
                  <span>{{ selectedType?.label }}</span>
                  <span v-if="form.catalogSlug">· Standard system: {{ form.catalogSlug }}</span>
                  <span v-if="form.industry">· {{ form.industry }}</span>
                  <span v-if="form.timeline">· {{ form.timeline }}</span>
                  <span v-if="form.panelTypes.length">· {{ form.panelTypes.length }} panel types</span>
                </div>
              </div>

              <label class="mt-5 flex cursor-pointer items-start gap-3">
                <input v-model="form.consent" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#007d48]">
                <span class="text-[13px] leading-relaxed text-ink/70">
                  I agree that Vomtek may contact me about this request. No marketing list, no resale.
                </span>
              </label>

              <div class="absolute -left-[9999px]" aria-hidden="true">
                <label for="qb-website">Website</label>
                <input id="qb-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
              </div>
            </div>

            <p v-if="stepError" class="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-danger" role="alert">{{ stepError }}</p>
            <p v-if="status === 'error'" class="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-danger" role="alert">{{ errorMessage }}</p>

            <div class="mt-7 flex items-center justify-between gap-4 border-t border-ink/12 pt-5">
              <button
                v-if="step > 1"
                type="button"
                class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 transition-colors hover:text-ink"
                @click="back"
              >
                <ArrowLeft :size="12" /> Back
              </button>
              <span v-else class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">No obligation · no charge for scoping</span>

              <button
                type="submit"
                class="group inline-flex h-11 items-center gap-2.5 rounded-full bg-brand-deep px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand disabled:opacity-50"
                :disabled="status === 'loading'"
              >
                {{ step === 4 ? (status === 'loading' ? 'Sending…' : 'Submit request') : 'Continue' }}
                <ArrowRight v-if="step < 4" :size="13" class="transition-transform group-hover:translate-x-0.5" />
                <ArrowUpRight v-else :size="13" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

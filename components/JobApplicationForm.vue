<script setup lang="ts">
const siteConfig = useSiteConfig()
import { ArrowUpRight, Check } from 'lucide-vue-next'

const props = defineProps<{ jobSlug: string; jobTitle: string }>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  resumeUrl: '',
  coverLetter: '',
  website: '',
})

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const serverMessage = ref('')

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.firstName.trim()) errors.firstName = 'Required'
  if (!form.lastName.trim()) errors.lastName = 'Required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Valid email required'
  if (!form.resumeUrl.trim()) errors.resumeUrl = 'A resume link is required'
  else if (!/^https?:\/\//.test(form.resumeUrl)) errors.resumeUrl = 'Include https://'
  if (!form.coverLetter.trim()) errors.coverLetter = 'Tell us why this role'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (!validate()) return
  status.value = 'loading'
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/careers/${props.jobSlug}/apply`, {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        linkedin: form.linkedin,
        resumeUrl: form.resumeUrl,
        coverLetter: form.coverLetter,
        website: form.website,
      },
      timeout: 8000,
    })
    status.value = 'success'
    track('job_application', { role: props.jobSlug })
  }
  catch (err: unknown) {
    status.value = 'error'
    const e = err as { data?: { message?: string } }
    serverMessage.value = e?.data?.message || `The application did not send. Email ${siteConfig.value.company.email} with the role in the subject line.`
  }
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="border border-ink/15 bg-bone p-6 md:p-8">
      <div class="flex size-10 items-center justify-center rounded-full bg-ink text-signal">
        <Check :size="16" />
      </div>
      <h3 class="mt-5 text-[24px] font-medium tracking-[-0.03em]">Application received.</h3>
      <p class="mt-2 max-w-md text-[14px] leading-relaxed text-ink/70">
        Thank you for applying for <strong>{{ jobTitle }}</strong>. A person will review it — we read every application — and reply if there is a fit.
      </p>
    </div>

    <form v-else novalidate class="grid gap-x-6 gap-y-5 sm:grid-cols-2" @submit.prevent="submit">
      <div>
        <label for="ap-first" class="field-label">First name *</label>
        <input id="ap-first" v-model="form.firstName" type="text" autocomplete="given-name" class="field" :aria-invalid="!!errors.firstName">
        <p v-if="errors.firstName" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.firstName }}</p>
      </div>
      <div>
        <label for="ap-last" class="field-label">Last name *</label>
        <input id="ap-last" v-model="form.lastName" type="text" autocomplete="family-name" class="field" :aria-invalid="!!errors.lastName">
        <p v-if="errors.lastName" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.lastName }}</p>
      </div>
      <div>
        <label for="ap-email" class="field-label">Email *</label>
        <input id="ap-email" v-model="form.email" type="email" autocomplete="email" class="field" :aria-invalid="!!errors.email">
        <p v-if="errors.email" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.email }}</p>
      </div>
      <div>
        <label for="ap-phone" class="field-label">Phone</label>
        <input id="ap-phone" v-model="form.phone" type="tel" autocomplete="tel" class="field">
      </div>
      <div>
        <label for="ap-location" class="field-label">Location</label>
        <input id="ap-location" v-model="form.location" type="text" autocomplete="address-level2" class="field" placeholder="Houston, TX">
      </div>
      <div>
        <label for="ap-linkedin" class="field-label">LinkedIn</label>
        <input id="ap-linkedin" v-model="form.linkedin" type="url" class="field" placeholder="https://">
      </div>
      <div class="sm:col-span-2">
        <label for="ap-resume" class="field-label">Resume link *</label>
        <input id="ap-resume" v-model="form.resumeUrl" type="url" class="field" placeholder="https://drive.google.com/…" :aria-invalid="!!errors.resumeUrl">
        <p class="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/50">Paste a link to your resume — Drive, Dropbox, or a personal site.</p>
        <p v-if="errors.resumeUrl" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.resumeUrl }}</p>
      </div>
      <div class="sm:col-span-2">
        <label for="ap-cover" class="field-label">Why this role? *</label>
        <textarea id="ap-cover" v-model="form.coverLetter" rows="4" class="field resize-none" :aria-invalid="!!errors.coverLetter" placeholder="A short note is enough. Tell us what you have built and what you want to build next." />
        <p v-if="errors.coverLetter" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.coverLetter }}</p>
      </div>

      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label for="ap-website">Website</label>
        <input id="ap-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
      </div>

      <div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
        <p class="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink/50">
          We keep applications confidential and do not share them with third parties.
        </p>
        <button
          type="submit"
          class="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-deep px-6 font-sans text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand disabled:opacity-50"
          :disabled="status === 'loading'"
        >
          {{ status === 'loading' ? 'Submitting…' : 'Submit application' }}
          <ArrowUpRight :size="14" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>

      <p v-if="status === 'error'" class="sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.08em] text-danger" role="alert">{{ serverMessage }}</p>
    </form>
  </div>
</template>

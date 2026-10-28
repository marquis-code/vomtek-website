<script setup lang="ts">
import { ArrowUpRight, Check } from 'lucide-vue-next'
import { contactReasons } from '~/data/company'
const siteConfig = useSiteConfig()
const reasonOptions = contactReasons.map(reason => ({ value: reason, label: reason }))

const props = withDefaults(defineProps<{
  source?: string
  dark?: boolean
  defaultReason?: string
  compact?: boolean
}>(), {
  source: 'contact',
  dark: false,
  defaultReason: '',
  compact: false,
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  reason: contactReasons.includes(props.defaultReason) ? props.defaultReason : contactReasons[0],
  message: '',
  website: '',
})

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const serverMessage = ref('')

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = 'Tell us your name.'
  if (!form.email.trim()) errors.email = 'We need an email to reply.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'That email does not look right.'
  if (!form.message.trim()) errors.message = 'A sentence about the project is enough to start.'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (!validate()) return
  status.value = 'loading'
  serverMessage.value = ''
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/contact`, {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.reason,
        message: form.message,
        source: props.source,
        website: form.website,
      },
      timeout: 8000,
    })
    status.value = 'success'
    track('contact_submit', { source: props.source, reason: form.reason })
  }
  catch (err: unknown) {
    status.value = 'error'
    const e = err as { data?: { message?: string } }
    serverMessage.value = e?.data?.message || `We could not send that. Call ${siteConfig.value.company.phone} and we will take the details directly.`
  }
}
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition duration-500 ease-[var(--ease-out-expo)]"
      enter-from-class="opacity-0 translate-y-3"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div v-if="status === 'success'" key="success" class="border p-6 md:p-8" :class="dark ? 'border-bone/20' : 'border-ink/15 bg-bone-2/50'">
        <div class="flex size-10 items-center justify-center rounded-full border" :class="dark ? 'border-signal text-signal' : 'border-ink bg-ink text-signal'">
          <Check :size="16" />
        </div>
        <h3 class="mt-5 text-[24px] font-medium tracking-[-0.03em]">Message received.</h3>
        <p class="mt-2 max-w-md text-[14px] leading-relaxed" :class="dark ? 'text-bone/70' : 'text-ink/70'">
          A person — not an autoresponder — will read this and reply within one business day. If it is urgent, call
          <a href="tel:+17133471466" class="underline decoration-signal underline-offset-4">713-347-1466</a>.
        </p>
        <button
          type="button"
          class="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] underline underline-offset-4"
          :class="dark ? 'text-bone/65' : 'text-ink/65'"
          @click="status = 'idle'; form.message = ''"
        >
          Send another message
        </button>
      </div>

      <form v-else key="form" novalidate class="grid gap-x-6 gap-y-5 sm:grid-cols-2" @submit.prevent="submit">
        <div>
          <label for="cf-name" class="field-label" :class="dark ? '!text-bone/60' : ''">Name *</label>
          <input id="cf-name" v-model="form.name" type="text" autocomplete="name" class="field" :class="dark ? 'field-dark' : ''" :aria-invalid="!!errors.name" aria-describedby="cf-name-error">
          <p v-if="errors.name" id="cf-name-error" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.name }}</p>
        </div>

        <div>
          <label for="cf-email" class="field-label" :class="dark ? '!text-bone/60' : ''">Email *</label>
          <input id="cf-email" v-model="form.email" type="email" autocomplete="email" class="field" :class="dark ? 'field-dark' : ''" :aria-invalid="!!errors.email" aria-describedby="cf-email-error">
          <p v-if="errors.email" id="cf-email-error" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.email }}</p>
        </div>

        <div>
          <label for="cf-company" class="field-label" :class="dark ? '!text-bone/60' : ''">Company</label>
          <input id="cf-company" v-model="form.company" type="text" autocomplete="organization" class="field" :class="dark ? 'field-dark' : ''">
        </div>

        <div>
          <label for="cf-phone" class="field-label" :class="dark ? '!text-bone/60' : ''">Phone</label>
          <input id="cf-phone" v-model="form.phone" type="tel" autocomplete="tel" class="field" :class="dark ? 'field-dark' : ''">
        </div>

        <div class="sm:col-span-2">
          <label for="cf-reason" class="field-label" :class="dark ? '!text-bone/60' : ''">What is this about?</label>
          <AppSelect id="cf-reason" v-model="form.reason" :options="reasonOptions" :dark="dark" placeholder="Choose a topic" />
        </div>

        <div class="sm:col-span-2">
          <label for="cf-message" class="field-label" :class="dark ? '!text-bone/60' : ''">Message *</label>
          <textarea
            id="cf-message"
            v-model="form.message"
            rows="4"
            class="field resize-none"
            :class="dark ? 'field-dark' : ''"
            placeholder="What are you building, what is failing, or what does the deadline look like?"
            :aria-invalid="!!errors.message"
            aria-describedby="cf-message-error"
          />
          <p v-if="errors.message" id="cf-message-error" class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-danger">{{ errors.message }}</p>
        </div>

        <!-- honeypot -->
        <div class="absolute -left-[9999px]" aria-hidden="true">
          <label for="cf-website">Website</label>
          <input id="cf-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
        </div>

        <div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
          <p class="max-w-xs font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em]" :class="dark ? 'text-bone/45' : 'text-ink/50'">
            We use this only to reply. No list, no resale.
          </p>
          <button
            type="submit"
            class="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-deep px-6 font-sans text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand disabled:opacity-50"
            :class="dark ? 'bg-brand-soft text-brand-deep hover:bg-bone' : 'bg-brand-deep text-white hover:bg-brand'"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? 'Sending…' : 'Send message' }}
            <ArrowUpRight :size="14" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <p v-if="status === 'error'" class="sm:col-span-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-danger" role="alert">
          {{ serverMessage }}
        </p>
      </form>
    </Transition>
  </div>
</template>

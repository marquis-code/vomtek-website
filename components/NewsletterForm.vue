<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  tone?: 'ink' | 'bone'
  compact?: boolean
}>(), {
  tone: 'ink',
  compact: false,
})

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')

async function submit() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    status.value = 'error'
    message.value = 'Enter a valid email address.'
    return
  }
  status.value = 'loading'
  message.value = ''
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/newsletter`, {
      method: 'POST',
      body: { email: email.value, source: 'footer' },
      timeout: 6000,
    })
    status.value = 'success'
    message.value = 'You are on the list. Field notes, once a month.'
    email.value = ''
    track('newsletter_signup', { source: 'footer' })
  }
  catch {
    status.value = 'error'
    message.value = 'Something went wrong. Email us and we will add you manually.'
  }
}
</script>

<template>
  <div>
    <p
      class="font-mono text-[11.5px] uppercase tracking-[0.16em]"
      :class="tone === 'ink' ? 'text-ink/65' : 'text-bone/60'"
    >
      Field notes — one email a month
    </p>

    <form class="mt-3" novalidate @submit.prevent="submit">
      <div
        class="flex items-center gap-3 border-b pb-2 transition-colors"
        :class="tone === 'ink' ? 'border-ink/25 focus-within:border-signal-deep' : 'border-bone/25 focus-within:border-signal'"
      >
        <label for="newsletter-email" class="sr-only">Email address</label>
        <input
          id="newsletter-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@company.com"
          class="w-full bg-transparent py-1.5 text-[15px] outline-none"
          :class="tone === 'ink' ? 'text-ink placeholder:text-ink/50' : 'text-bone placeholder:text-bone/50'"
          :aria-invalid="status === 'error'"
          :aria-describedby="message ? 'newsletter-message' : undefined"
          :disabled="status === 'loading' || status === 'success'"
        >
        <button
          type="submit"
          class="group flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-50"
          :class="tone === 'ink' ? 'bg-brand-deep text-bone hover:bg-brand hover:text-white' : 'bg-bone text-brand-deep hover:bg-brand hover:text-white'"
          :aria-label="status === 'success' ? 'Subscribed' : 'Subscribe'"
          :disabled="status === 'loading' || status === 'success'"
        >
          <Check v-if="status === 'success'" :size="14" />
          <span v-else-if="status === 'loading'" class="size-3 animate-spin rounded-full border border-current border-t-transparent" />
          <ArrowRight v-else :size="14" class="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <p
        v-if="message"
        id="newsletter-message"
        class="mt-2 font-mono text-[11.5px] uppercase tracking-[0.1em]"
        :class="status === 'error' ? 'text-signal' : (tone === 'ink' ? 'text-ink/70' : 'text-bone/70')"
        role="status"
      >
        {{ message }}
      </p>
      <p v-else class="mt-2 font-mono text-[11px] uppercase tracking-[0.1em]" :class="tone === 'ink' ? 'text-ink/50' : 'text-bone/45'">
        No spam. Unsubscribe any time.
      </p>
    </form>
  </div>
</template>

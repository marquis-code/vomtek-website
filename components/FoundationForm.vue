<script setup lang="ts">
const siteConfig = useSiteConfig()
import { Check, ArrowUpRight } from 'lucide-vue-next'

const amounts = [25, 50, 100, 250]
const amount = ref<number | null>(100)
const custom = ref('')
const frequency = ref<'monthly' | 'once'>('monthly')
const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const effectiveAmount = computed(() => amount.value ?? (Number(custom.value) || 0))

async function submit() {
  errorMessage.value = ''
  if (!name.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || effectiveAmount.value <= 0) {
    errorMessage.value = 'Name, a valid email, and a gift amount are required.'
    status.value = 'error'
    return
  }

  status.value = 'loading'
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/contact`, {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        subject: 'Des Foundation',
        message: `Pledge intent: ${frequency.value === 'monthly' ? 'monthly' : 'one-time'} gift of $${effectiveAmount.value}. ${message.value}`.trim(),
        source: 'foundation',
      },
      timeout: 8000,
    })
    status.value = 'success'
    track('foundation_pledge', { amount: effectiveAmount.value, frequency: frequency.value })
  }
  catch {
    status.value = 'error'
    errorMessage.value = `We could not record that pledge. Email ${siteConfig.value.company.email} and we will follow up directly.`
  }
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="border border-bone/20 p-6">
      <div class="flex size-10 items-center justify-center rounded-full bg-signal text-ink">
        <Check :size="16" />
      </div>
      <h3 class="mt-5 text-[22px] font-medium tracking-[-0.03em] text-bone">Pledge recorded.</h3>
      <p class="mt-2 text-[13.5px] leading-relaxed text-bone/70">
        Thank you. The foundation team will contact you within two business days with the giving details and a receipt process. No payment has been taken on this site.
      </p>
    </div>

    <form v-else class="space-y-5" novalidate @submit.prevent="submit">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">I would like to give</p>
        <div class="mt-2 inline-flex border border-bone/20 p-0.5">
          <button
            v-for="freq in (['monthly', 'once'] as const)"
            :key="freq"
            type="button"
            class="px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
            :class="frequency === freq ? 'bg-signal text-ink' : 'text-bone/65 hover:text-bone'"
            @click="frequency = freq"
          >
            {{ freq === 'monthly' ? 'Monthly' : 'One-time' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          v-for="value in amounts"
          :key="value"
          type="button"
          class="border px-3 py-3 font-mono text-[14px] transition-colors"
          :class="amount === value ? 'border-signal bg-signal/10 text-bone' : 'border-bone/20 text-bone/70 hover:border-bone/50 hover:text-bone'"
          @click="amount = value; custom = ''"
        >
          ${{ value }}
        </button>
      </div>

      <div class="flex items-center gap-3 border-b border-bone/20 pb-2">
        <span class="font-mono text-[14px] text-bone/55">$</span>
        <input
          v-model="custom"
          type="number"
          min="5"
          step="5"
          placeholder="Other amount"
          class="w-full bg-transparent py-1.5 text-[15px] text-bone outline-none placeholder:text-bone/45"
          @input="amount = null"
        >
        <span class="font-mono text-[11px] uppercase tracking-[0.1em] text-bone/50">{{ frequency === 'monthly' ? '/ month' : 'one-time' }}</span>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="fd-name" class="field-label !text-bone/60">Name *</label>
          <input id="fd-name" v-model="name" type="text" autocomplete="name" class="field field-dark">
        </div>
        <div>
          <label for="fd-email" class="field-label !text-bone/60">Email *</label>
          <input id="fd-email" v-model="email" type="email" autocomplete="email" class="field field-dark">
        </div>
      </div>

      <div>
        <label for="fd-message" class="field-label !text-bone/60">Message (optional)</label>
        <textarea id="fd-message" v-model="message" rows="3" class="field field-dark resize-none" placeholder="Anything we should know about your gift?" />
      </div>

      <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-bone/45">
          This records a pledge. No card is charged on this site.
        </p>
        <button
          type="submit"
          class="group inline-flex h-12 items-center justify-center gap-2 bg-signal px-6 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-bone disabled:opacity-50"
          :disabled="status === 'loading'"
        >
          {{ status === 'loading' ? 'Recording…' : 'Pledge support' }}
          <ArrowUpRight :size="14" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>

      <p v-if="status === 'error'" class="font-mono text-[11px] uppercase tracking-[0.08em] text-danger" role="alert">{{ errorMessage }}</p>
    </form>
  </div>
</template>

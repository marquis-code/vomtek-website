<script setup lang="ts">
import { Phone, Mail, MapPin, Clock, ArrowUpRight, TriangleAlert } from 'lucide-vue-next'
import { contactFaqs, contactReasons } from '~/data/company'
import type { PublicSiteConfig } from '~/types/site'

const route = useRoute()
const siteConfig = useSiteConfig()
const { whatsappHref, trackWhatsApp, trackConsult } = useContactLinks()
const company = computed(() => siteConfig.value.company)
const requested = typeof route.query.reason === 'string' ? route.query.reason : ''
const defaultReason = contactReasons.includes(requested) ? requested : ''

useSeo({
  title: 'Contact — talk to an engineer, not a call center',
  description: 'Contact Vomtek in Houston, Texas. Request a quote, ask about a control panel or retrofit, or call 713-347-1466 for emergency field service.',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Vomtek',
  mainEntity: {
    '@type': 'Organization',
    name: 'Vomtek',
    telephone: '+1-713-347-1466',
    email: company.value.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2401 Fountain View Dr, Ste 312',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
  },
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Tell us what you’re building."
      lead="A person reads every message. For quote requests, the configurator gets you to a real number faster — but this form works too."
      index="06 / 08"
      :crumbs="[{ label: 'Contact' }]"
    >
      <template #aside>
        <div class="mt-6 flex items-center gap-3 border-t border-ink/15 pt-5">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Replies within one business day</p>
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <SectionLabel index="—" label="Send a message" />
            <h2 class="mt-6 text-[28px] font-medium tracking-[-0.035em]">We’re ready, let’s talk.</h2>
            <p class="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink/70">
              Include the equipment, the constraint, and the deadline if you have them. If you do not, that is what the conversation is for.
            </p>
            <div class="mt-8">
              <ContactForm :default-reason="defaultReason" />
            </div>
          </div>

          <aside class="lg:col-span-5">
            <div class="space-y-4 lg:sticky lg:top-28">
              <div class="border border-ink/15">
                <div class="border-b border-ink/15 bg-bone-2/60 px-5 py-3">
                  <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Contact info</p>
                </div>
                <div class="divide-y divide-ink/10 px-5">
                  <a :href="`tel:${company.phoneHref}`" class="group flex items-start gap-3.5 py-4">
                    <Phone :size="15" class="mt-0.5 text-signal-deep" />
                    <span>
                      <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">Call us</span>
                      <span class="mt-0.5 block text-[15px] font-medium">{{ company.phone }}</span>
                    </span>
                  </a>
                  <a :href="`mailto:${company.email}`" class="group flex items-start gap-3.5 py-4">
                    <Mail :size="15" class="mt-0.5 text-signal-deep" />
                    <span>
                      <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">Email us</span>
                      <span class="mt-0.5 block text-[15px] font-medium">{{ company.email }}</span>
                    </span>
                  </a>
                  <a v-if="siteConfig.features.whatsapp !== false" :href="whatsappHref" target="_blank" rel="noopener" class="group flex items-start gap-3.5 py-4" @click="trackWhatsApp('contact-page')">
                    <WhatsAppIcon class="mt-0.5 size-4 shrink-0 text-[#128C4A]" />
                    <span>
                      <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">WhatsApp</span>
                      <span class="mt-0.5 block text-[15px] font-medium">Message the shop</span>
                    </span>
                  </a>
                  <div class="flex items-start gap-3.5 py-4">
                    <MapPin :size="15" class="mt-0.5 text-signal-deep" />
                    <span>
                      <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">Address</span>
                      <span class="mt-0.5 block text-[13.5px] leading-relaxed text-ink/70">{{ company.address.street }}<br>{{ company.address.city }}, {{ company.address.state }} {{ company.address.postalCode }}</span>
                    </span>
                  </div>
                  <div class="flex items-start gap-3.5 py-4">
                    <Clock :size="15" class="mt-0.5 text-signal-deep" />
                    <span>
                      <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">Hours</span>
                      <span class="mt-0.5 block text-[13.5px] text-ink/70">{{ company.hours }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <NuxtLink v-if="siteConfig.features.consult !== false" to="/assessment" class="group flex items-center justify-between gap-4 rounded-xl bg-brand-deep p-4 text-bone" @click="trackConsult('contact-page')">
                <span>
                  <span class="block font-mono text-[10px] uppercase tracking-[0.14em] text-brand-soft">Prefer a conversation?</span>
                  <span class="mt-1 block text-[16px] font-medium">Book a free consultation</span>
                  <span class="mt-0.5 block text-[12.5px] text-bone/60">45 minutes, no obligation, written findings.</span>
                </span>
                <span class="flex size-9 shrink-0 items-center justify-center rounded-full border border-bone/25 transition-colors group-hover:border-brand-soft group-hover:bg-brand-soft group-hover:text-brand-deep"><ArrowUpRight :size="15" /></span>
              </NuxtLink>

              <div class="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4">
                <TriangleAlert :size="16" class="mt-0.5 shrink-0 text-danger" />
                <div>
                  <p class="text-[14px] font-medium">Line down right now?</p>
                  <p class="mt-1 text-[13px] leading-relaxed text-ink/60">
                    Call <a :href="`tel:${company.phoneHref}`" class="font-medium underline decoration-danger underline-offset-2">{{ company.phone }}</a> and say it is an emergency. Do not wait on the form.
                  </p>
                </div>
              </div>

              <MapCard />
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <SectionLabel index="—" label="Before you write" />
            <h2 class="type-md mt-6">Quick answers.</h2>
            <p class="mt-3 max-w-xs text-[14px] leading-relaxed text-ink/70">
              Still stuck? Call the shop. A conversation is usually faster than an email chain.
            </p>
            <AppButton to="/quote" variant="outline" size="md" arrow class="mt-6" track="contact-quote">Use the configurator</AppButton>
          </div>
          <div class="lg:col-span-8">
            <FaqList :items="contactFaqs" open-first />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bone py-12">
      <div class="wrap">
        <div class="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <div class="bg-bone p-5">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Suppliers</p>
            <p class="mt-2 text-[14px] leading-relaxed text-ink/60">Send capability statements and lead times to <a :href="`mailto:${company.email}`" class="underline underline-offset-2">{{ company.email }}</a>.</p>
          </div>
          <div class="bg-bone p-5">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Careers</p>
            <p class="mt-2 text-[14px] leading-relaxed text-ink/60">See <NuxtLink to="/careers" class="underline underline-offset-2">open roles</NuxtLink> or send a general application.</p>
          </div>
          <div class="bg-bone p-5">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">Media</p>
            <p class="mt-2 text-[14px] leading-relaxed text-ink/60">For company information or interviews, email us with “Media” in the subject line.</p>
          </div>
        </div>
        <a href="#main" class="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 hover:text-ink">
          Back to top <ArrowUpRight :size="12" class="-rotate-45" />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/company'

useSeo({
  title: 'Privacy',
  description: 'How Vomtek handles the information you submit through this website, and the analytics we collect.',
})

const sections = [
  {
    title: 'What we collect',
    body: [
      'When you submit a quote request, contact form, job application, or newsletter signup, we collect the information you provide: name, email, phone, company, project details, and any links you share.',
      'We also record basic first-party analytics — page views and button clicks — with a random session identifier stored in your browser session. We do not use advertising cookies, cross-site trackers, or fingerprinting.',
    ],
  },
  {
    title: 'Why we collect it',
    body: [
      'To respond to your request, prepare a quote, evaluate an application, or send the newsletter you asked for. We do not sell or rent personal information.',
      'Analytics are used in aggregate to understand which pages and capabilities are useful, so we can improve the site.',
    ],
  },
  {
    title: 'How long we keep it',
    body: [
      'Quote and project records are retained for as long as needed to support the work and meet legal or warranty obligations. Contact messages are retained for up to 24 months. Job applications are retained for 12 months unless you ask us to delete them sooner.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can ask us to access, correct, or delete the information you have submitted. You can unsubscribe from the newsletter at any time using the link in the email or by writing to us.',
      'Our analytics respect the browser Do Not Track and Global Privacy Control signals.',
    ],
  },
  {
    title: 'Who processes it',
    body: [
      'The website and API are operated for Vomtek. Data is stored in access-controlled systems and shared only with service providers necessary to operate the site and respond to your request.',
    ],
  },
  {
    title: 'Contact',
    body: [
      `Questions about this policy can be sent to ${site.email} or by phone at ${site.phone}. Our office is at ${site.address.full}.`,
    ],
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Legal"
      title="Privacy, in plain language."
      lead="We collect what we need to reply to you and nothing more. No advertising trackers, no data resale."
      index="—"
      :crumbs="[{ label: 'Privacy' }]"
    />

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12">
          <aside class="lg:col-span-3">
            <div class="sticky top-28 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">
              <p>Last updated</p>
              <p class="mt-1 text-ink/60">October 2026</p>
            </div>
          </aside>
          <div class="lg:col-span-8">
            <div class="space-y-10">
              <section v-for="section in sections" :key="section.title">
                <h2 class="text-[21px] font-medium tracking-[-0.025em]">{{ section.title }}</h2>
                <div class="mt-3 space-y-3">
                  <p v-for="paragraph in section.body" :key="paragraph" class="max-w-2xl text-[14px] leading-relaxed text-ink/60">{{ paragraph }}</p>
                </div>
              </section>
            </div>

            <div class="mt-12 border-t border-ink/15 pt-6">
              <NuxtLink to="/contact" class="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">Questions? Contact us →</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

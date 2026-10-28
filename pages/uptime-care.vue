<script setup lang="ts">
import { Check, Clock, ShieldCheck, FileCheck2, Phone } from 'lucide-vue-next'

const site = useSiteConfig()
const route = useRoute()

useSeo({
  title: 'Uptime Care — service agreements for critical equipment',
  description: 'Vomtek Uptime Care plans: planned maintenance, thermal scans, priority response, spares audits, and documentation refresh for the panels and motors your plant depends on.',
})

const requestedPlan = computed(() => typeof route.query.plan === 'string' ? route.query.plan : 'priority')

const problems = [
  { title: 'The failure is never the first one', text: 'Most outages are the second or third symptom of a loose termination, a hot lug, or a fan that stopped six months ago. Planned inspection catches it first.' },
  { title: 'The drawings stopped matching', text: 'Field changes accumulate. Spares are guessed. A service agreement includes a documentation refresh so the next technician starts from truth.' },
  { title: 'Nobody answers at 2 a.m.', text: 'A plan is really a promise about response. We will only sell a response time we can staff, and we name the person who owns it.' },
]

const included = [
  { icon: ShieldCheck, title: 'A named owner', text: 'One Vomtek engineer owns your account and knows the equipment.' },
  { icon: Clock, title: 'A response promise', text: 'Priority and critical plans include contractual response windows.' },
  { icon: FileCheck2, title: 'A written record', text: 'Every visit produces findings, photos, and recommended actions.' },
  { icon: Phone, title: 'A direct line', text: 'Plan customers bypass the queue and reach the service desk.' },
]

const faqs = [
  { q: 'What happens during the first assessment?', a: 'A technician walks the equipment with your maintenance lead, performs a visual and thermal inspection, reviews documentation and spares, and produces a written report. There is no charge for the first assessment and no obligation to buy a plan.' },
  { q: 'Which equipment is covered?', a: 'Typically panels, MCCs, drives, motor control, and the motors attached to critical process equipment. We list covered assets in the agreement so there is no ambiguity during a call-out.' },
  { q: 'Can we start with one site?', a: 'Yes. Most agreements start with the single site or line that hurts most, then expand after the first inspection cycle.' },
  { q: 'Do you work alongside our maintenance team?', a: 'Usually. We are an additional layer of expertise and response, not a replacement for the people who run the plant every day.' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-ink text-bone">
      <ResponsivePicture
        asset="control-room"
        alt="Control room operator monitoring process screens"
        :widths="[800, 1200]"
        sizes="100vw"
        :width="1200"
        :height="800"
        img-class="absolute inset-0 h-full w-full object-cover opacity-35 grayscale"
        priority
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/35" aria-hidden="true" />
      <div class="absolute inset-0 grid-bg-dark opacity-30" aria-hidden="true" />

      <div class="wrap relative py-16 md:py-24">
        <nav aria-label="Breadcrumb" class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/50">
          <NuxtLink to="/" class="hover:text-bone">Home</NuxtLink><span class="text-bone/20">/</span><span class="text-bone/60">Uptime Care</span>
        </nav>

        <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <div class="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-brand-soft"><span class="size-1.5 bg-brand-soft" /> Service agreements</div>
            <h1 class="type-xl mt-5 max-w-[15ch]">Keep the line <em class="serif-accent text-brand-soft">running.</em></h1>
            <p class="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone/70">A panel that was perfect on day one still ages. Uptime Care is planned maintenance, priority response, and documentation that stays true — sold as an annual agreement, not a surprise invoice.</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <AppButton to="#assess" variant="signal" size="lg" arrow track="uptime-assessment">Book a free assessment</AppButton>
              <AppButton to="#plans" variant="outline-dark" size="lg" arrow track="uptime-plans">Compare plans</AppButton>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="grid grid-cols-2 gap-px border border-bone/20 bg-bone/20">
              <div v-for="item in [
                { value: '4 hr', label: 'Priority response' },
                { value: '24/7', label: 'Critical escalation' },
                { value: '100%', label: 'Documented visits' },
                { value: '1', label: 'Named owner' },
              ]" :key="item.label" class="bg-ink/70 p-4 backdrop-blur">
                <p class="text-[26px] font-medium leading-none tracking-[-0.04em]">{{ item.value }}</p>
                <p class="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-bone/50">{{ item.label }}</p>
              </div>
            </div>
            <p class="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-bone/45">Response windows apply to Priority and Critical plans and are defined in the agreement.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="01" label="Why it exists" />
        <div class="mt-8 grid gap-8 lg:grid-cols-12">
          <h2 class="type-lg max-w-xl lg:col-span-6" data-reveal>The cheapest outage<br><em class="serif-accent">is the one you prevent.</em></h2>
          <p class="max-w-md text-[13.5px] leading-relaxed text-ink/70 lg:col-span-6">Most of what we find on a first inspection is invisible until it fails: a discoloured lug, a cooling fan drawing too little current, a spare that no longer exists. A plan makes that visible on a schedule.</p>
        </div>
        <div class="mt-10 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <div v-for="(problem, i) in problems" :key="problem.title" class="bg-bone p-6">
            <span class="font-mono text-[11px] text-signal-deep">0{{ i + 1 }}</span>
            <h3 class="mt-4 text-[17px] font-medium tracking-[-0.02em]">{{ problem.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-ink/70">{{ problem.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="plans" class="border-y border-ink/10 bg-bone-2 section-y scroll-mt-24">
      <div class="wrap">
        <SectionLabel index="02" label="Plans" />
        <div class="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="type-lg max-w-xl" data-reveal>Three levels of<br><em class="serif-accent text-signal-deep">attention.</em></h2>
          <p class="max-w-sm text-[14px] leading-relaxed text-ink/65 md:text-right">Final scope and pricing are confirmed after the assessment. The numbers below are starting points, not a quote.</p>
        </div>
        <div class="mt-10">
          <PlanCards :plans="site.plans" />
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <SectionLabel index="03" label="The standard" />
            <h2 class="type-lg mt-7 max-w-[12ch]" data-reveal>What every plan<br><em class="serif-accent">gets right.</em></h2>
            <p class="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/65">No matter the tier, the basics are not optional. The difference is frequency and how fast we move when something fails.</p>
            <figure class="mt-8 overflow-hidden border border-ink/15">
              <div class="aspect-[4/3] overflow-hidden bg-ink">
                <ResponsivePicture
                  asset="electrician-meter"
                  alt="Technician testing a control enclosure"
                  :widths="[480, 800]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  :width="800"
                  :height="600"
                  img-class="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <figcaption class="flex items-center justify-between border-t border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/55">
                <span>Thermal & termination check</span><span>Pexels</span>
              </figcaption>
            </figure>
          </div>
          <div class="lg:col-span-7">
            <div class="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
              <div v-for="item in included" :key="item.title" class="bg-bone p-5">
                <component :is="item.icon" :size="19" :stroke-width="1.4" class="text-signal-deep" />
                <h3 class="mt-4 text-[15px] font-medium">{{ item.title }}</h3>
                <p class="mt-1.5 text-[13px] leading-relaxed text-ink/65">{{ item.text }}</p>
              </div>
            </div>
            <div class="mt-5 border-l-2 border-signal bg-bone-2/50 p-4">
              <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-deep">A note on honesty</p>
              <p class="mt-1.5 text-[13.5px] leading-relaxed text-ink/60">We do not sell “lifetime” coverage or guaranteed uptime. Equipment fails. What we can promise is planned attention, a response window we can staff, and a written record of what we found.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="assess" class="relative overflow-hidden bg-ink text-bone section-y scroll-mt-24">
      <div class="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />
      <div class="absolute -right-20 top-0 size-[420px] rounded-full border border-bone/8" aria-hidden="true" />
      <div class="wrap relative">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <SectionLabel index="04" label="Start here" tone="bone" />
            <h2 class="type-lg mt-7 max-w-[13ch]" data-reveal>Book the<br><em class="serif-accent text-brand-soft">panel health check.</em></h2>
            <p class="mt-4 max-w-sm text-[13.5px] leading-relaxed text-bone/65">45 minutes on site or remote with your maintenance lead. We inspect what we can, review the documentation and spares, and leave you with a written report — whether or not you buy a plan.</p>
            <ul class="mt-6 space-y-2">
              <li v-for="item in ['No charge for the first assessment', 'Written findings within two business days', 'No auto-renewal, no lock-in']" :key="item" class="flex items-start gap-2 text-[13px] text-bone/70"><Check :size="11" class="mt-1 shrink-0 text-brand-soft" /> {{ item }}</li>
            </ul>
            <a :href="`tel:${site.company.phoneHref}`" class="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/65 hover:text-bone"><Phone :size="12" /> {{ site.company.phone }}</a>
          </div>
          <div class="lg:col-span-7">
            <div class="border border-bone/20 bg-ink/50 p-5 backdrop-blur md:p-7">
              <AssessmentForm :default-plan="requestedPlan" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bone section-y">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <SectionLabel index="—" label="Questions" />
            <h2 class="type-md mt-6">Before you<br>sign anything.</h2>
          </div>
          <div class="lg:col-span-8">
            <FaqList :items="faqs" open-first />
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Or start with a project"
      title="Buy the panel first. Keep it running after."
      text="If the equipment is still being specified, start with a quote. We will scope Uptime Care alongside it so the handover is complete."
      primary-label="Scope a project"
      primary-to="/quote"
      secondary-label="See standard systems"
      secondary-to="/systems"
    />
  </div>
</template>

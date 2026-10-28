<script setup lang="ts">
import { Check, Clock, FileCheck2, ShieldCheck, Phone } from 'lucide-vue-next'

const site = useSiteConfig()
const route = useRoute()
const plan = computed(() => typeof route.query.plan === 'string' ? route.query.plan : 'priority')

useSeo({
  title: 'Free panel health assessment',
  description: 'Request a no-charge panel health assessment from Vomtek. A walkthrough, thermal and termination inspection, documentation review, and a written report within two business days.',
})

const steps = [
  { index: '01', title: '45-minute walkthrough', text: 'On site or remote with the person who maintains the equipment. We look at the panels, drives, and motors that matter.' },
  { index: '02', title: 'Findings, not a sales pitch', text: 'Thermal and visual inspection, termination checks where safe, documentation and spares review. A written report within two business days.' },
  { index: '03', title: 'A plan you can choose', text: 'If a service agreement makes sense, we will scope one. If it does not, the report is still yours to act on.' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-ink text-bone">
      <ResponsivePicture
        asset="electrician-meter"
        alt="Electrician testing an industrial control panel"
        :widths="[800, 1200]"
        sizes="100vw"
        :width="1200"
        :height="600"
        img-class="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
        priority
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/30" aria-hidden="true" />
      <div class="absolute inset-0 grid-bg-dark opacity-30" aria-hidden="true" />

      <div class="wrap relative grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-brand-soft"><span class="size-1.5 bg-brand-soft" /> No charge · no obligation</div>
          <h1 class="type-xl mt-5 max-w-[15ch]">Find the failure <em class="serif-accent text-brand-soft">before it finds you.</em></h1>
          <p class="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone/70">A panel health assessment covers the equipment you already own: what is hot, what is loose, what is obsolete, and what you would need if it failed tomorrow. You get the report either way.</p>
          <div class="mt-8 flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/55">
            <span class="flex items-center gap-2"><Clock :size="12" class="text-brand-soft" /> 45 minutes</span>
            <span class="flex items-center gap-2"><FileCheck2 :size="12" class="text-brand-soft" /> Written findings</span>
            <span class="flex items-center gap-2"><ShieldCheck :size="12" class="text-brand-soft" /> No lock-in</span>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-bone/20 bg-ink/50 p-5 backdrop-blur md:p-6">
            <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55">Request the assessment</p>
            <h2 class="mt-2 text-[22px] font-medium tracking-[-0.03em]">Tell us what runs.</h2>
            <div class="mt-4"><AssessmentForm :default-plan="plan" /></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="01" label="What to expect" />
        <div class="mt-10 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <div v-for="step in steps" :key="step.index" class="bg-bone p-6">
            <span class="font-mono text-[11px] text-signal-deep">{{ step.index }}</span>
            <h3 class="mt-4 text-[18px] font-medium tracking-[-0.02em]">{{ step.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-ink/70">{{ step.text }}</p>
          </div>
        </div>

        <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-6">
            <h2 class="type-lg max-w-xl" data-reveal>A report you can<br><em class="serif-accent text-signal-deep">actually act on.</em></h2>
            <p class="mt-4 max-w-lg text-[13.5px] leading-relaxed text-ink/70">No 40-page template. Findings ranked by risk, photos, part references where applicable, and a clear recommendation: address now, plan for the next outage, or leave it alone.</p>
            <ul class="mt-6 space-y-2">
              <li v-for="item in ['Thermal and visual inspection', 'Termination and torque check where safe', 'Spares and obsolescence review', 'Documentation gap summary', 'Prioritised action list']" :key="item" class="flex items-start gap-2 text-[13.5px] text-ink/60"><Check :size="12" class="mt-1 shrink-0 text-signal-deep" /> {{ item }}</li>
            </ul>
          </div>
          <div class="lg:col-span-6">
            <div class="overflow-hidden border border-ink/15">
              <div class="aspect-[16/10] overflow-hidden bg-ink">
                <ResponsivePicture asset="panel-line" alt="Industrial control enclosures on a shop floor" :widths="[480, 800, 1200]" sizes="(max-width: 1024px) 100vw, 50vw" :width="1200" :height="750" img-class="h-full w-full object-cover opacity-85 grayscale transition-all duration-700 hover:grayscale-0" />
              </div>
              <div class="flex items-center justify-between border-t border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/55">
                <span>Build floor / Houston</span><span>Vomtek reference</span>
              </div>
            </div>
            <a :href="`tel:${site.company.phoneHref}`" class="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep"><Phone :size="12" /> Or call {{ site.company.phone }}</a>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Prefer to compare plans?"
      title="Start with the assessment. Choose a plan after."
      text="The assessment is the same starting point for every Uptime Care agreement. There is no obligation to continue."
      primary-label="See Uptime Care"
      primary-to="/uptime-care"
      secondary-label="Talk to the team"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, Check } from 'lucide-vue-next'
import { services } from '~/data/services'

const site = useSiteConfig()
const visible = computed(() => services
  .filter(service => site.value.services[service.slug]?.enabled !== false)
  .map(service => ({ ...service, lead: site.value.services[service.slug]?.lead || service.lead })))

useSeo({
  title: 'Capabilities — control panels, PCB, harnesses, motors, field service',
  description: 'Explore Vomtek’s capabilities: UL 508A control panel design and build, PCB layout, wire harness assembly, motor rewinding and testing, panel repair, and field service in Houston, TX.',
})

const engagements = [
  { index: 'A', title: 'Project', text: 'A defined scope with a drawing set, a delivery date, and a factory acceptance test.' },
  { index: 'B', title: 'On-call', text: 'Emergency response and troubleshooting for the equipment you already run.' },
  { index: 'C', title: 'Service agreement', text: 'Scheduled maintenance, thermal surveys, and priority response for critical assets.' },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Capabilities"
      title="Seven ways we take the risk out of the build."
      lead="One team for design, assembly, testing, and startup. Every capability below ends with documentation you can hand to the next person."
      index="03 / 08"
      :crumbs="[{ label: 'Capabilities' }]"
    />

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-2">
          <NuxtLink
            v-for="(service, i) in visible"
            :key="service.slug"
            :to="`/services/${service.slug}`"
            class="group relative flex flex-col bg-bone p-6 transition-colors duration-500 hover:bg-bone-2 md:p-8"
            data-reveal
            :style="`--reveal-delay: ${(i % 2) * 80}ms`"
          >
            <span class="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden="true" />
            <div class="flex items-start justify-between">
              <div class="size-11 text-ink/65 transition-colors group-hover:text-signal-deep">
                <ServiceGlyph :variant="service.glyph" />
              </div>
              <span class="font-mono text-[11px] tracking-[0.1em] text-ink/45">{{ service.index }}</span>
            </div>

            <h2 class="mt-6 max-w-[18ch] text-[22px] font-medium leading-tight tracking-[-0.03em] md:text-[25px]">
              {{ service.name }}
            </h2>
            <p class="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink/70">{{ service.lead }}</p>

            <ul class="mt-5 space-y-1.5">
              <li v-for="item in service.included.slice(0, 3)" :key="item" class="flex items-start gap-2 text-[13px] leading-relaxed text-ink/60">
                <Check :size="11" :stroke-width="2" class="mt-0.5 shrink-0 text-signal-deep" />
                {{ item }}
              </li>
            </ul>

            <div class="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 md:mt-7">
              <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">{{ service.delivery }}</span>
              <span class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70 transition-colors group-hover:text-signal-deep">
                Detail
                <ArrowUpRight :size="13" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="—" label="Ways to engage" />
        <div class="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 class="type-lg max-w-xl lg:col-span-7">Start with one job.<br><em class="serif-accent">Stay for the standard.</em></h2>
          <p class="max-w-md text-[14px] leading-relaxed text-ink/70 lg:col-span-5">
            Most clients begin with a single panel, harness, or repair. The relationship usually grows into scheduled maintenance, retrofits, and a standing call for the problems nobody else wants.
          </p>
        </div>

        <div class="mt-10 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          <div v-for="item in engagements" :key="item.index" class="bg-bone-2 p-6">
            <span class="font-mono text-[11.5px] text-signal-deep">{{ item.index }}</span>
            <h3 class="mt-5 text-[20px] font-medium tracking-[-0.03em]">{{ item.title }}</h3>
            <p class="mt-2 text-[14px] leading-relaxed text-ink/70">{{ item.text }}</p>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <AppButton to="/quote" size="md" arrow track="services-quote">Scope a project</AppButton>
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Response within one business day</p>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Not sure where to start?"
      title="Describe the failure. We’ll name the capability."
      text="Send us what happened, what the equipment does, and what downtime costs. We will point you to the right group — even if it is not us."
      primary-label="Talk to an engineer"
      primary-to="/contact"
      secondary-label="See our divisions"
      secondary-to="/divisions"
    />
  </div>
</template>

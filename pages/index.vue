<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { process, principles, standards, panelTypes, heroTicker, industries } from '~/data/company'
import { fetchArticles } from '~/composables/useContentApi'
import { fetchCatalog } from '~/composables/useCatalog'
import type { CatalogSystem } from '~/types/site'

useSeo({
  title: 'Custom control panels, PCB design & field service',
  description: 'Vomtek is a Houston engineering and manufacturing company building UL 508A control panels, PCB assemblies, wire harnesses, and electrical systems — designed, tested, and commissioned by one accountable team.',
})

const site = useSiteConfig()

const { data: articleData, execute: loadArticles } = useAsyncData('home-field-notes', fetchArticles, { immediate: false })
const { data: catalogData, execute: loadCatalog } = useAsyncData<CatalogSystem[]>('home-catalog', fetchCatalog, { immediate: false })

onServerPrefetch(async () => {
  await Promise.all([loadArticles(), loadCatalog()])
})

onMounted(() => {
  if (!articleData.value) void loadArticles()
  if (!catalogData.value) void loadCatalog()
})
const systems = computed(() => (catalogData.value ?? []).slice(0, 3))
const articles = computed(() => (articleData.value ?? []).slice(0, 3))
</script>

<template>
  <div>
    <HeroStory :hero="site.hero" :company="site.company" />

    <MarqueeStrip :items="heroTicker" />

    <!-- ============ MANIFESTO ============ -->
    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="01" label="The shop" />

        <div class="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-7">
            <h2 class="type-lg max-w-[20ch]" data-reveal>
              A control panel is the <em class="serif-accent text-signal-deep">nervous system</em> of a plant. We build it like one.
            </h2>
          </div>
          <div class="lg:col-span-5 lg:pt-2" data-reveal style="--reveal-delay: 120ms">
            <p class="text-[15.5px] leading-relaxed text-ink/60">
              Vomtek is a Houston engineering and manufacturing company. We combine panel design, PCB layout, motor service, fabrication, and field work under one roof — so the buck stops with one team, not a chain of subcontractors.
            </p>
            <p class="mt-4 text-[15.5px] leading-relaxed text-ink/60">
              Our customers run water treatment plants, food lines, energy facilities, and fleets. What they have in common is that downtime costs more than the equipment.
            </p>
            <NuxtLink to="/about" class="group mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-signal-deep">
              More about Vomtek
              <ArrowUpRight :size="13" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </NuxtLink>
          </div>
        </div>

        <div class="mt-14 grid grid-cols-2 gap-px border border-ink/12 bg-ink/12 md:mt-20 lg:grid-cols-4">
          <div v-for="(stat, i) in site.stats" :key="stat.label" class="bg-bone p-5 md:p-6" data-reveal :style="`--reveal-delay: ${i * 70}ms`">
            <p class="text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.045em]">{{ stat.value }}</p>
            <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70">{{ stat.label }}</p>
            <p class="mt-1 text-[12.5px] text-ink/55">{{ stat.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <PhotoCarousel
      v-if="site.sections.carousel !== false && site.carousel.enabled !== false"
      :items="site.carousel.items"
      :eyebrow="site.carousel.eyebrow"
      :title="site.carousel.title"
      :subtitle="site.carousel.subtitle"
    />

    <!-- ============ DIVISIONS ============ -->
    <section v-if="site.sections.divisions !== false" class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="02" label="Divisions" />
        <div class="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="type-lg max-w-xl" data-reveal>
            Six disciplines.<br><em class="serif-accent">One standard.</em>
          </h2>
          <p class="max-w-sm text-[14px] leading-relaxed text-ink/70 md:pb-1 md:text-right" data-reveal style="--reveal-delay: 100ms">
            Electrical, instrumentation, automotive, mechanical, fabrication, and facilities — sharing a shop floor, a documentation standard, and a phone number.
          </p>
        </div>

        <div class="mt-12 md:mt-16">
          <DivisionExplorer />
        </div>
      </div>
    </section>

    <!-- ============ CAPABILITIES ============ -->
    <section v-if="site.sections.capabilities !== false" class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-4">
            <div class="lg:sticky lg:top-28">
              <SectionLabel index="03" label="Capabilities" />
              <h2 class="type-lg mt-8 max-w-[13ch]" data-reveal>
                Built in-house.<br><em class="serif-accent text-signal-deep">Signed off in writing.</em>
              </h2>
              <p class="mt-6 max-w-sm text-[14.5px] leading-relaxed text-ink/70">
                Design, manufacturing, testing, and field service are not separate vendors here. Every deliverable leaves with drawings, test data, and a name attached to it.
              </p>
              <AppButton to="/services" variant="outline" size="md" arrow class="mt-8" track="home-all-services">
                All capabilities
              </AppButton>

              <div class="mt-10 border border-ink/12 bg-bone-2/60 p-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Typical engagement</p>
                <p class="mt-2 text-[13.5px] leading-relaxed text-ink/65">
                  A panel that must replace a 20-year-old lineup without a shutdown — engineered, built, FAT-tested, and staged around your production calendar.
                </p>
                <NuxtLink to="/quote" class="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">
                  Scope a project <ArrowRight :size="12" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="lg:col-span-8">
            <ServiceRows />
          </div>
        </div>
      </div>
    </section>


    <!-- ============ STANDARD SYSTEMS ============ -->
    <section v-if="site.sections.catalog !== false && site.features.catalog !== false && systems.length" class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <SectionLabel index="—" label="Standard systems" />
        <div class="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="type-lg max-w-xl" data-reveal>
            Fixed scope.<br><em class="serif-accent text-signal-deep">Shorter lead time.</em>
          </h2>
          <div class="max-w-sm md:text-right">
            <p class="text-[13.5px] leading-relaxed text-ink/70">Pre-engineered panel families built around the work we do repeatedly — so the quote is faster, the build is repeatable, and the documentation is already written.</p>
            <NuxtLink to="/systems" class="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">Explore all systems <ArrowUpRight :size="12" /></NuxtLink>
          </div>
        </div>
        <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SystemCard v-for="(system, i) in systems" :key="system.slug" :system="system" :index="i" data-reveal :style="`--reveal-delay: ${i * 80}ms`" />
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-4">
          <p class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Every system is still engineered to your site. The standard is the starting point.</p>
          <AppButton to="/systems" variant="outline" size="md" arrow track="home-systems">Standard systems</AppButton>
        </div>
      </div>
    </section>

    <!-- ============ PANEL INDEX ============ -->
    <section v-if="site.sections.panelIndex !== false" class="relative overflow-hidden bg-ink text-bone section-y">
      <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
      <div class="absolute -right-24 top-0 size-[420px] rounded-full border border-bone/6" aria-hidden="true" />
      <div class="absolute -right-4 top-24 size-[240px] rounded-full border border-brand-soft/20" aria-hidden="true" />

      <div class="wrap relative">
        <SectionLabel index="04" label="Panel index" tone="bone" />

        <div class="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 class="type-lg max-w-xl lg:col-span-7" data-reveal>
            If it needs a label,<br><em class="serif-accent text-brand-soft">we build it.</em>
          </h2>
          <p class="max-w-md text-[14.5px] leading-relaxed text-bone/65 lg:col-span-5" data-reveal style="--reveal-delay: 100ms">
            A working index of the panel types we design and assemble. Custom configurations are the norm — if it is not on this list, it is a conversation, not a limitation.
          </p>
        </div>

        <div class="mt-12 border-t border-bone/15" data-reveal>
          <div class="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-bone/10 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/45 md:grid-cols-[6rem_1fr_1.1fr]">
            <span>Code</span>
            <span>Panel type</span>
            <span class="hidden md:block">Typical application</span>
          </div>

          <div
            v-for="panel in panelTypes"
            :key="panel.code"
            class="group grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b border-bone/10 py-4 transition-colors hover:bg-bone/[0.04] md:grid-cols-[6rem_1fr_1.1fr] md:py-5"
          >
            <span class="font-mono text-[11.5px] tracking-[0.06em] text-brand-soft/80">{{ panel.code }}</span>
            <span class="text-[15px] font-medium text-bone/85 transition-transform duration-300 group-hover:translate-x-1 md:text-[16px]">{{ panel.name }}</span>
            <span class="col-span-2 text-[13px] leading-relaxed text-bone/55 md:col-span-1 md:text-[14px]">{{ panel.note }}</span>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p class="max-w-md font-mono text-[11px] leading-relaxed uppercase tracking-[0.12em] text-bone/45">
            Built to UL 508A · designed to NFPA 70 · documented as built
          </p>
          <AppButton to="/quote" variant="signal" size="md" arrow track="panel-index-quote">Specify your panel</AppButton>
        </div>
      </div>
    </section>

    <!-- ============ PROCESS ============ -->
    <section v-if="site.sections.process !== false" class="section-y bg-bone-2">
      <div class="wrap">
        <SectionLabel index="05" label="The process" />
        <div class="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 class="type-lg max-w-2xl lg:col-span-7" data-reveal>
            Nothing ships until it <em class="serif-accent">earns its nameplate.</em>
          </h2>
          <p class="max-w-md text-[14.5px] leading-relaxed text-ink/70 lg:col-span-5" data-reveal style="--reveal-delay: 100ms">
            Five stages, each with a deliverable you can hold us to. No stage closes on a verbal confirmation.
          </p>
        </div>

        <div class="mt-12 grid gap-px border border-ink/12 bg-ink/12 md:mt-16 md:grid-cols-2 lg:grid-cols-5" data-reveal>
          <div
            v-for="step in process"
            :key="step.index"
            class="group relative flex flex-col bg-bone-2 p-5 lg:p-6"
          >
            <span class="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden="true" />
            <div class="flex items-center justify-between">
              <span class="font-mono text-[11.5px] tracking-[0.1em] text-signal-deep">{{ step.index }}</span>
              <span class="size-1.5 bg-ink/15 transition-colors group-hover:bg-signal" aria-hidden="true" />
            </div>
            <h3 class="mt-6 text-[20px] font-medium tracking-[-0.03em]">{{ step.title }}</h3>
            <p class="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink/70">{{ step.text }}</p>
            <div class="mt-5 border-t border-ink/12 pt-3">
              <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Output</p>
              <p class="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink/65">{{ step.output }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============ INDUSTRIES ============ -->
    <section v-if="site.sections.industries !== false" class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="—" label="Where it runs" />
        <div class="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 class="type-lg max-w-xl lg:col-span-7" data-reveal>Built for the places<br><em class="serif-accent">that cannot stop.</em></h2>
          <p class="max-w-md text-[13.5px] leading-relaxed text-ink/70 lg:col-span-5">Water plants, power infrastructure, and production lines. Different industries, one requirement: the equipment has to be there tomorrow.</p>
        </div>
        <IndustryGrid class="mt-10" />
      </div>
    </section>

    <!-- ============ WHY / STANDARDS ============ -->
    <section v-if="site.sections.principles !== false" class="relative overflow-hidden bg-ink text-bone section-y">
      <div class="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />
      <div class="wrap relative">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <SectionLabel index="06" label="Why Vomtek" tone="bone" />
            <h2 class="type-lg mt-8 max-w-[12ch]" data-reveal>
              The boring things,<br><em class="serif-accent text-brand-soft">relentlessly.</em>
            </h2>
            <p class="mt-6 max-w-sm text-[14.5px] leading-relaxed text-bone/65">
              Nobody buys a panel because the drawings are good. They buy it because the drawings are good at 2 a.m., three years later, when the line is down.
            </p>
            <div class="mt-8 flex flex-wrap gap-2">
              <span v-for="industry in industries.slice(0, 6)" :key="industry" class="rounded-full border border-bone/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-bone/70">
                {{ industry }}
              </span>
            </div>
          </div>

          <div class="lg:col-span-7">
            <ul class="border-t border-bone/15">
              <li v-for="(principle, i) in principles" :key="principle.title" class="group border-b border-bone/15 py-5 md:py-6" data-reveal :style="`--reveal-delay: ${i * 60}ms`">
                <div class="flex items-start gap-4 md:gap-6">
                  <span class="mt-1 font-mono text-[11px] tracking-[0.1em] text-brand-soft/70">0{{ i + 1 }}</span>
                  <div>
                    <h3 class="text-[17px] font-medium tracking-[-0.02em] text-bone/90">{{ principle.title }}</h3>
                    <p class="mt-1.5 max-w-xl text-[14px] leading-relaxed text-bone/60">{{ principle.text }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-14 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="standard in standards" :key="standard.code" class="bg-ink p-5">
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-soft">{{ standard.code }}</p>
            <p class="mt-3 text-[14px] font-medium text-bone/85">{{ standard.label }}</p>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-bone/55">{{ standard.note }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ============ UPTIME CARE ============ -->
    <section v-if="site.sections.plans !== false && site.features.plans !== false" class="relative overflow-hidden bg-ink text-bone section-y">
      <ResponsivePicture
        asset="control-room"
        alt="Control room operator monitoring a process"
        :widths="[800, 1200]"
        sizes="100vw"
        :width="1200"
        :height="800"
        img-class="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" aria-hidden="true" />
      <div class="wrap relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <SectionLabel index="—" label="Uptime Care" tone="bone" />
          <h2 class="type-lg mt-7 max-w-xl" data-reveal>The panel is the start.<br><em class="serif-accent text-brand-soft">Staying up is the job.</em></h2>
          <p class="mt-5 max-w-lg text-[14.5px] leading-relaxed text-bone/65">Planned maintenance, priority response, spares held, and documentation that stays current. Annual agreements for the equipment you already depend on.</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div v-for="item in [
              { value: '4 hr', label: 'Priority response' },
              { value: '2×', label: 'Annual thermal scans' },
              { value: '1', label: 'Accountable team' },
            ]" :key="item.label" class="border-t border-bone/15 pt-3">
              <p class="text-[24px] font-medium leading-none tracking-[-0.04em]">{{ item.value }}</p>
              <p class="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-bone/50">{{ item.label }}</p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-bone/20 bg-ink/50 p-6 backdrop-blur">
            <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55">Plans from</p>
            <p class="mt-2 text-[42px] font-semibold leading-none tracking-[-0.05em]">$1,800</p>
            <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/50">per site / year</p>
            <p class="mt-3 text-[13px] leading-relaxed text-bone/60">Start with a free panel health assessment. We will tell you what needs attention before you commit to a plan.</p>
            <div class="mt-5 flex flex-col gap-2">
              <AppButton to="/uptime-care" variant="signal" size="md" arrow block track="home-uptime">Compare plans</AppButton>
              <AppButton to="/assessment" variant="outline-dark" size="md" arrow block track="home-assessment">Book an assessment</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FOUNDATION ============ -->
    <section v-if="site.features.foundation !== false && site.sections.foundation !== false" class="section-y bg-bone">
      <div class="wrap">
        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <SectionLabel index="07" label="Des Foundation" />
            <h2 class="type-lg mt-8 max-w-xl" data-reveal>
              Powering more<br><em class="serif-accent text-signal-deep">than plants.</em>
            </h2>
            <p class="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/60">
              The Des Foundation extends Vomtek's engineering mindset to the community: learning support, family stability, and practical skills for young people who deserve a better start. It is not a marketing program. It is a commitment.
            </p>
            <AppButton to="/foundation" variant="outline" size="md" arrow class="mt-8" track="home-foundation">
              Visit the foundation
            </AppButton>
          </div>

          <div class="lg:col-span-5" data-reveal="scale">
            <div class="relative overflow-hidden rounded-xl bg-brand-deep p-8 text-bone md:p-10">
              <div class="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
              <div class="relative">
                <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65">Des Foundation · Houston, Texas</p>
                <blockquote class="mt-6 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em] text-brand-soft">
                  “Every child deserves a life saver.”
                </blockquote>
                <p class="mt-5 max-w-xs text-[14px] leading-relaxed text-bone/60">
                  Education support, community health, and skills programs for the next generation of builders.
                </p>
                <NuxtLink to="/foundation" class="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone">
                  Support the work <ArrowRight :size="13" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ INSIGHTS ============ -->
    <section v-if="site.sections.insights !== false" class="border-t border-ink/10 bg-bone section-y">
      <div class="wrap">
        <SectionLabel index="08" label="Field notes" />
        <div class="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="type-lg max-w-xl" data-reveal>
            What we learn<br><em class="serif-accent">on the floor.</em>
          </h2>
          <AppButton to="/insights" variant="outline" size="md" arrow track="home-insights">All field notes</AppButton>
        </div>

        <div class="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          <ArticleCard
            v-for="(article, i) in articles"
            :key="article.slug"
            :article="article"
            :index="i"
            data-reveal
            :style="`--reveal-delay: ${i * 90}ms`"
          />
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Next step"
      title="Bring us the problem. We’ll bring the panel."
      text="Tell us what the process has to do, when it has to be running, and what failed last time. We will tell you what it takes to make it reliable."
      primary-label="Scope your project"
      primary-to="/quote"
      secondary-label="Call the shop"
      secondary-to="/contact"
    />
  </div>
</template>

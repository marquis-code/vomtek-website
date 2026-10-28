<script setup lang="ts">
import { ArrowUpRight, MapPin, Clock, Briefcase } from 'lucide-vue-next'
import { fetchJobs } from '~/composables/useContentApi'

useSeo({
  title: 'Careers — build things that get switched on',
  description: 'Work at Vomtek in Houston: controls engineering, panel building, PCB design, field service, machining, and fabrication. Real ownership from drawing to startup.',
})

const { data } = await useAsyncData('careers-jobs', fetchJobs)
const jobs = computed(() => (data.value ?? []).filter(j => j.active))
const divisions = computed(() => ['All', ...Array.from(new Set(jobs.value.map(j => j.division)))])
const activeDivision = ref('All')
const visibleJobs = computed(() => activeDivision.value === 'All'
  ? jobs.value
  : jobs.value.filter(j => j.division === activeDivision.value))

const reasons = [
  { title: 'The whole system', text: 'You will see the panel, the machine, and the plant it runs — not just your slice of a drawing.' },
  { title: 'Real ownership', text: 'Engineers talk to customers. Builders sign their work. The person who designed it answers the phone at startup.' },
  { title: 'Craft is visible', text: 'Neat wiring, accurate drawings, and a clean shop are not optional. They are how we are judged.' },
  { title: 'Room to grow', text: 'We invest in people who want to learn the next discipline, not just the next title.' },
]

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Open roles at Vomtek',
  itemListElement: jobs.value.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://vomtek.com/careers/${job.slug}`,
    name: job.title,
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Careers"
      title="Build things that get switched on."
      lead="Vomtek is a place for people who like seeing the physical result of their work — and who care whether the drawings match the panel."
      index="05 / 08"
      :crumbs="[{ label: 'Careers' }]"
    >
      <template #aside>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="reason in ['Houston, TX', 'Full-time', 'Hands-on']" :key="reason" class="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink/60">{{ reason }}</span>
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="—" label="Why here" />
        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <h2 class="type-lg max-w-xl lg:col-span-6" data-reveal>Work you can<br><em class="serif-accent">point at.</em></h2>
          <p class="max-w-md text-[14px] leading-relaxed text-ink/70 lg:col-span-6">
            There is no separating the desk from the shop here. The engineer who sized the drive walks the panel on the bench. The builder who wired it hears what happened at startup. That feedback loop is the job.
          </p>
        </div>

        <div class="mt-10 overflow-hidden border border-ink/15" data-reveal="mask">
          <div class="relative aspect-[16/7] bg-ink">
            <ResponsivePicture asset="machine-team" alt="Two technicians operating a CNC machine" :widths="[800, 1200]" sizes="100vw" :width="1200" :height="525" img-class="h-full w-full object-cover opacity-80 grayscale" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden="true" />
            <p class="absolute bottom-4 left-4 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-bone/60">Houston shop floor / engineers, builders, and technicians working the same problem.</p>
          </div>
        </div>

        <div class="mt-8 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(reason, i) in reasons" :key="reason.title" class="bg-bone p-6">
            <span class="font-mono text-[11px] text-signal-deep">0{{ i + 1 }}</span>
            <h3 class="mt-5 text-[17px] font-medium tracking-[-0.02em]">{{ reason.title }}</h3>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/70">{{ reason.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="—" label="Open roles" />
            <h2 class="type-lg mt-7">Come build with us.</h2>
          </div>
          <p class="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink/55">
            {{ jobs.length }} open roles · Houston, TX<br>Applications reviewed by a person
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-2">
          <button
            v-for="division in divisions"
            :key="division"
            type="button"
            class="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
            :class="activeDivision === division ? 'border-brand-deep bg-brand-deep text-white' : 'border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink'"
            @click="activeDivision = division"
          >
            {{ division }}
          </button>
        </div>

        <div class="mt-6 border-t border-ink/15">
          <NuxtLink
            v-for="job in visibleJobs"
            :key="job.slug"
            :to="`/careers/${job.slug}`"
            class="group grid gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-bone/50 md:grid-cols-12 md:items-center"
          >
            <div class="md:col-span-5">
              <div class="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal-deep">
                <span>{{ job.division }}</span>
                <span class="text-ink/40">/</span>
                <span class="text-ink/55">{{ job.level }}</span>
              </div>
              <h3 class="mt-2 text-[21px] font-medium tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 md:text-[23px]">{{ job.title }}</h3>
            </div>
            <p class="text-[14px] leading-relaxed text-ink/70 md:col-span-5">{{ job.summary }}</p>
            <div class="flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
              <div class="flex flex-col gap-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink/50">
                <span class="flex items-center gap-1.5"><MapPin :size="10" /> {{ job.location }}</span>
                <span class="flex items-center gap-1.5"><Clock :size="10" /> {{ job.type }}</span>
              </div>
              <span class="flex size-9 shrink-0 items-center justify-center border border-ink/15 transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
                <ArrowUpRight :size="14" />
              </span>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-10 flex flex-col gap-4 border border-ink/15 bg-bone p-6 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-start gap-4">
            <Briefcase :size="20" class="mt-1 shrink-0 text-signal-deep" />
            <div>
              <p class="text-[16px] font-medium">Nothing fits — but you belong here anyway?</p>
              <p class="mt-1 text-[14px] leading-relaxed text-ink/70">Send a general application. We keep good people on file and call when the role opens.</p>
            </div>
          </div>
          <AppButton to="/contact?reason=Careers" variant="outline" size="md" arrow track="careers-general">General application</AppButton>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Referrals welcome"
      title="Know someone who takes pride in a torque wrench?"
      text="Send them our way. Good builders, engineers, and technicians are the constraint on how much work we can take."
      primary-label="See open roles"
      primary-to="/careers"
      secondary-label="Contact the team"
      secondary-to="/contact"
    />
  </div>
</template>

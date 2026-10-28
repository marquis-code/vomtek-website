<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check, MapPin, Clock, Building2 } from 'lucide-vue-next'
import { fetchJob, fetchJobs } from '~/composables/useContentApi'
import { site } from '~/data/company'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: job } = await useAsyncData(`job-${slug.value}`, () => fetchJob(slug.value), { watch: [slug] })

if (!job.value) {
  throw createError({ statusCode: 404, statusMessage: 'Role not found' })
}

const { data: allData } = await useAsyncData('careers-all', fetchJobs)
const otherRoles = computed(() => (allData.value ?? []).filter(j => j.slug !== slug.value && j.active).slice(0, 3))

const posted = computed(() => formatContentDate(job.value!.postedAt, { month: 'long', day: 'numeric', year: 'numeric' }))

const hiringSteps = [
  { title: 'Application review', text: 'A person reads it. If there is a fit, we reply within a week.' },
  { title: 'Conversation', text: 'A 30-minute call about your experience and what you want to build.' },
  { title: 'Shop visit', text: 'Meet the team, walk the floor, and see the work up close.' },
  { title: 'Offer', text: 'Clear scope, clear pay, and a start date that respects your notice period.' },
]

useSeo({
  title: `${job.value!.title} — ${job.value!.division}, Houston`,
  description: job.value!.summary,
  type: 'article',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.value!.title,
  description: job.value!.summary,
  datePosted: job.value!.postedAt,
  employmentType: job.value!.type.toUpperCase().replace('-', '_'),
  hiringOrganization: { '@type': 'Organization', name: 'Vomtek', sameAs: 'https://vomtek.com' },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2401 Fountain View Dr, Ste 312',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
  },
  directApply: true,
})
</script>

<template>
  <div v-if="job">
    <section class="relative overflow-hidden border-b border-ink/10 bg-bone">
      <div class="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div class="wrap relative pb-12 pt-8 md:pb-16 md:pt-10">
        <NuxtLink to="/careers" class="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60 hover:text-ink">
          <ArrowLeft :size="12" class="transition-transform group-hover:-translate-x-0.5" />
          All roles
        </NuxtLink>

        <div class="mt-10 grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <div class="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span class="bg-signal px-2.5 py-1 text-ink">{{ job.division }}</span>
              <span class="text-ink/55">{{ job.level }}</span>
              <span class="text-ink/20">/</span>
              <span class="text-ink/55">Posted {{ posted }}</span>
            </div>
            <h1 class="type-xl mt-6 max-w-[18ch]">{{ job.title }}</h1>
            <p class="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70">{{ job.summary }}</p>
            <div class="mt-6 flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60">
              <span class="flex items-center gap-2"><MapPin :size="12" /> {{ job.location }}</span>
              <span class="flex items-center gap-2"><Clock :size="12" /> {{ job.type }}</span>
              <span class="flex items-center gap-2"><Building2 :size="12" /> {{ job.division }}</span>
            </div>
          </div>

          <div class="lg:col-span-4">
            <div class="border border-ink/15 bg-bone-2/60 p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Apply</p>
              <p class="mt-3 text-[14px] leading-relaxed text-ink/60">A short application is enough. We read every one and reply if there is a fit.</p>
              <a href="#apply" class="mt-4 inline-flex h-10 items-center gap-2 bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:bg-signal hover:text-ink">
                Jump to application <ArrowUpRight :size="12" />
              </a>
              <p class="mt-4 border-t border-ink/10 pt-3 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-ink/50">
                Questions? {{ site.email }}<br>{{ site.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bone py-14 md:py-20">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <div data-reveal>
              <SectionLabel index="—" label="What you will do" />
              <ul class="mt-5 border-t border-ink/15">
                <li v-for="item in job.responsibilities" :key="item" class="flex items-start gap-3 border-b border-ink/15 py-3.5 text-[14px] leading-relaxed text-ink/70">
                  <span class="mt-2 size-1.5 shrink-0 bg-signal" />
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="mt-12" data-reveal>
              <SectionLabel index="—" label="What we need" />
              <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
                <li v-for="item in job.requirements" :key="item" class="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink/65">
                  <Check :size="12" :stroke-width="2" class="mt-1 shrink-0 text-signal-deep" />
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="job.niceToHave.length" class="mt-10" data-reveal>
              <SectionLabel index="—" label="Nice to have" />
              <ul class="mt-4 space-y-2">
                <li v-for="item in job.niceToHave" :key="item" class="text-[14px] leading-relaxed text-ink/65">— {{ item }}</li>
              </ul>
            </div>

            <div id="apply" class="mt-14 scroll-mt-28">
              <SectionLabel index="—" label="Apply" />
              <h2 class="mt-6 text-[26px] font-medium tracking-[-0.03em]">Tell us what you have built.</h2>
              <p class="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink/70">No cover-letter theater. A few sentences about your experience and a resume link are enough to start.</p>
              <div class="mt-8">
                <JobApplicationForm :job-slug="job.slug" :job-title="job.title" />
              </div>
            </div>
          </div>

          <aside class="lg:col-span-5">
            <div class="lg:sticky lg:top-28 space-y-4">
              <div class="border border-ink/15 bg-bone-2/60 p-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">How we hire</p>
                <ol class="mt-4">
                  <li v-for="(step, i) in hiringSteps" :key="step.title" class="flex gap-3 border-b border-ink/10 py-3 last:border-b-0">
                    <span class="font-mono text-[10.5px] text-signal-deep">0{{ i + 1 }}</span>
                    <div>
                      <p class="text-[13.5px] font-medium">{{ step.title }}</p>
                      <p class="mt-0.5 text-[12.5px] leading-relaxed text-ink/65">{{ step.text }}</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div class="border border-ink/15 bg-ink p-5 text-bone">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">Working here</p>
                <p class="mt-3 text-[14px] leading-relaxed text-bone/60">
                  Houston-based, hands-on, and deliberately small enough that your work is visible. If you want to see the panel you designed get switched on, this is the place.
                </p>
                <NuxtLink to="/about" class="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">About Vomtek <ArrowUpRight :size="12" /></NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="otherRoles.length" class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="flex items-end justify-between">
          <SectionLabel index="—" label="Other roles" />
          <NuxtLink to="/careers" class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 hover:text-ink">All roles →</NuxtLink>
        </div>
        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <NuxtLink v-for="role in otherRoles" :key="role.slug" :to="`/careers/${role.slug}`" class="group border border-ink/15 bg-bone p-5 transition-colors hover:border-ink/40">
            <p class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-deep">{{ role.division }}</p>
            <h3 class="mt-3 text-[19px] font-medium tracking-[-0.025em]">{{ role.title }}</h3>
            <div class="mt-3 flex items-center justify-between">
              <span class="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink/50">{{ role.level }}</span>
              <ArrowUpRight :size="14" class="text-ink/45 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-deep" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

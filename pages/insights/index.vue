<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { fetchArticles } from '~/composables/useContentApi'

useSeo({
  title: 'Field notes — control panels, motors, standards, and field service',
  description: 'Practical engineering writing from the Vomtek shop floor: panel specification, motor failure analysis, UL 508A and NFPA 70, retrofits, and documentation.',
})

const { data } = await useAsyncData('insights-index', fetchArticles)
const articles = computed(() => data.value ?? [])
const categories = computed(() => ['All', ...Array.from(new Set(articles.value.map(a => a.category)))])
const activeCategory = ref('All')

const filtered = computed(() => activeCategory.value === 'All'
  ? articles.value
  : articles.value.filter(a => a.category === activeCategory.value))

const featured = computed(() => filtered.value[0] ?? null)
const rest = computed(() => filtered.value.slice(1))
</script>

<template>
  <div>
    <PageHero
      eyebrow="Field notes"
      title="What we learn on the floor."
      lead="No listicles. Practical notes on panel design, motor reliability, standards, and the field problems that do not make it into a brochure."
      index="04 / 08"
      :crumbs="[{ label: 'Field notes' }]"
    >
      <template #aside>
        <div class="mt-6 flex items-center gap-3 border-t border-ink/15 pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          Written by the people doing the work
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="flex flex-wrap items-center gap-2 border-b border-ink/12 pb-6">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
            :class="activeCategory === category ? 'border-brand-deep bg-brand-deep text-white' : 'border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink'"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
          <span class="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45 sm:block">{{ filtered.length }} notes</span>
        </div>

        <div v-if="featured" class="mt-8 md:mt-12">
          <NuxtLink
            :to="`/insights/${featured.slug}`"
            class="group grid border border-ink/15 bg-bone transition-colors hover:border-ink/40 lg:grid-cols-2"
            data-reveal
          >
            <div class="relative aspect-[16/10] overflow-hidden border-b border-ink/15 bg-ink text-bone lg:aspect-auto lg:min-h-[380px] lg:border-b-0 lg:border-r">
              <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
              <svg class="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 opacity-40 transition-transform duration-1000 group-hover:rotate-6" viewBox="0 0 300 300" fill="none" aria-hidden="true">
                <g stroke="#f2efe6" stroke-opacity=".45">
                  <circle cx="150" cy="150" r="140" />
                  <circle cx="150" cy="150" r="104" stroke-dasharray="4 8" />
                  <circle cx="150" cy="150" r="66" />
                  <line x1="10" y1="150" x2="290" y2="150" stroke-dasharray="2 10" />
                  <line x1="150" y1="10" x2="150" y2="290" stroke-dasharray="2 10" />
                  <rect x="118" y="118" width="64" height="64" />
                </g>
                <circle cx="150" cy="150" r="6" fill="#007d48" />
              </svg>
              <div class="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-bone/60">
                <span>Featured / {{ featured.category }}</span>
                <span>{{ featured.readingTime }} min read</span>
              </div>
              <div class="absolute left-5 top-5 flex items-center gap-2 border border-signal/50 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                <span class="size-1 bg-signal" /> Lead note
              </div>
            </div>

            <div class="flex flex-col justify-between p-6 md:p-8 lg:p-10">
              <div>
                <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                  <span>{{ formatContentDate(featured.publishedAt, { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
                  <span class="text-ink/20">/</span>
                  <span>{{ featured.author }}</span>
                </div>
                <h2 class="mt-5 text-[clamp(1.8rem,3vw,2.7rem)] font-medium leading-[1.06] tracking-[-0.04em]">
                  {{ featured.title }}
                </h2>
                <p class="mt-4 max-w-md text-[14px] leading-relaxed text-ink/70">{{ featured.excerpt }}</p>
              </div>
              <div class="mt-8 flex items-center justify-between border-t border-ink/10 pt-4">
                <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Read the note</span>
                <span class="flex size-9 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
                  <ArrowUpRight :size="15" :stroke-width="1.5" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-if="rest.length" class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            v-for="(article, i) in rest"
            :key="article.slug"
            :article="article"
            :index="i + 1"
            data-reveal
            :style="`--reveal-delay: ${(i % 3) * 80}ms`"
          />

          <NuxtLink
            v-if="rest.length % 3 !== 0"
            to="/quote"
            class="group relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-ink/15 bg-ink p-6 text-bone"
            :class="rest.length % 3 === 1 ? 'lg:col-span-2' : ''"
            data-reveal
          >
            <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
            <div class="absolute -right-10 -top-10 size-40 rounded-full border border-signal/25" aria-hidden="true" />
            <div class="relative">
              <p class="font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">Your project</p>
              <p class="mt-4 max-w-[16ch] text-[24px] font-medium leading-[1.05] tracking-[-0.03em]">Have a problem worth writing about?</p>
            </div>
            <div class="relative flex items-center justify-between border-t border-bone/15 pt-4">
              <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60">Start a conversation</span>
              <span class="flex size-8 items-center justify-center rounded-full border border-bone/20 transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                <ArrowUpRight :size="14" />
              </span>
            </div>
          </NuxtLink>
        </div>

        <div v-if="!filtered.length" class="py-20 text-center">
          <p class="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink/55">Nothing filed under this category yet.</p>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="grid items-center gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <SectionLabel index="—" label="Field notes, by email" />
            <h2 class="type-lg mt-7 max-w-xl" data-reveal>One useful note<br><em class="serif-accent">a month.</em></h2>
            <p class="mt-4 max-w-md text-[14px] leading-relaxed text-ink/70">
              What broke, what we learned, and what we would specify differently. Written for the people who maintain the equipment, not for search engines.
            </p>
          </div>
          <div class="lg:col-span-5 lg:pl-10">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Have a problem worth writing about?"
      title="The next field note could be your project."
      text="Bring us the failure, the deadline, or the line that cannot stop. We will bring the engineering and — eventually — the lesson."
      primary-label="Start a project"
      primary-to="/quote"
      secondary-label="See capabilities"
      secondary-to="/services"
    />
  </div>
</template>

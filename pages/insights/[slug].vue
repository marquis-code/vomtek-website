<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Check, Link2 } from 'lucide-vue-next'
import { fetchArticle, fetchArticles } from '~/composables/useContentApi'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: article } = await useAsyncData(`article-${slug.value}`, () => fetchArticle(slug.value), {
  watch: [slug],
})

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Field note not found' })
}

const { data: allData } = await useAsyncData('insights-all', fetchArticles)
const related = computed(() => (allData.value ?? []).filter(a => a.slug !== article.value?.slug).slice(0, 3))

const published = computed(() => formatContentDate(article.value!.publishedAt, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}))

const copied = ref(false)
async function copyLink() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2200)
  }
  catch { /* clipboard unavailable */ }
}

useSeo({
  title: article.value!.title,
  description: article.value!.excerpt,
  type: 'article',
  image: `${useRuntimeConfig().public.siteUrl}/og.png`,
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.value!.title,
  description: article.value!.excerpt,
  datePublished: article.value!.publishedAt,
  dateModified: article.value!.publishedAt,
  author: { '@type': 'Organization', name: article.value!.author },
  publisher: { '@type': 'Organization', name: 'Vomtek' },
  mainEntityOfPage: `${useRuntimeConfig().public.siteUrl}/insights/${article.value!.slug}`,
})

definePageMeta({})
</script>

<template>
  <div v-if="article">
    <article>
      <section class="relative overflow-hidden border-b border-ink/10 bg-bone">
        <div class="pointer-events-none absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div class="wrap relative pb-12 pt-8 md:pb-16 md:pt-10">
          <NuxtLink to="/insights" class="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink">
            <ArrowLeft :size="12" class="transition-transform group-hover:-translate-x-0.5" />
            All field notes
          </NuxtLink>

          <div class="mt-10 max-w-4xl">
            <div class="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span class="bg-ink px-2.5 py-1 text-bone">{{ article.category }}</span>
              <span class="text-ink/55">{{ published }}</span>
              <span class="text-ink/20">/</span>
              <span class="text-ink/55">{{ article.readingTime }} min read</span>
            </div>

            <h1 class="mt-6 text-[clamp(2.3rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              {{ article.title }}
            </h1>
            <p class="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-ink/70">{{ article.excerpt }}</p>

            <div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
              <div class="flex items-center gap-3">
                <span class="flex size-9 items-center justify-center border border-ink/20 font-mono text-[11px]">VT</span>
                <div>
                  <p class="text-[13px] font-medium">{{ article.author }}</p>
                  <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">Vomtek Engineering</p>
                </div>
              </div>
              <button
                type="button"
                class="group flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink/65 transition-colors hover:border-brand hover:text-brand"
                @click="copyLink"
              >
                <Check v-if="copied" :size="12" class="text-signal-deep" />
                <Link2 v-else :size="12" />
                {{ copied ? 'Link copied' : 'Copy link' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div class="relative h-[220px] overflow-hidden border-b border-bone/10 bg-ink md:h-[300px]">
        <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
        <svg class="absolute right-[8%] top-1/2 size-[420px] -translate-y-1/2 opacity-50 md:size-[520px]" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <g stroke="#f2efe6" stroke-opacity=".4">
            <circle cx="200" cy="200" r="186" />
            <circle cx="200" cy="200" r="148" stroke-dasharray="4 8" />
            <circle cx="200" cy="200" r="96" />
            <circle cx="200" cy="200" r="44" />
            <line x1="8" y1="200" x2="392" y2="200" stroke-dasharray="2 10" />
            <line x1="200" y1="8" x2="200" y2="392" stroke-dasharray="2 10" />
            <rect x="158" y="158" width="84" height="84" />
          </g>
          <circle cx="200" cy="200" r="8" fill="#007d48" />
        </svg>
        <div class="absolute inset-0 flex items-center">
          <div class="wrap">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">Vomtek field note · {{ article.category }}</p>
            <p class="mt-2 max-w-md font-mono text-[11.5px] leading-relaxed uppercase tracking-[0.12em] text-bone/70">Specification / diagnosis / documentation</p>
          </div>
        </div>
      </div>

      <section class="bg-bone py-14 md:py-20">
        <div class="wrap">
          <div class="grid gap-12 lg:grid-cols-12">
            <aside class="hidden lg:col-span-3 lg:block">
              <div class="sticky top-28 space-y-6">
                <div>
                  <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Published</p>
                  <p class="mt-1 text-[13.5px] text-ink/60">{{ published }}</p>
                </div>
                <div>
                  <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Author</p>
                  <p class="mt-1 text-[13.5px] text-ink/60">{{ article.author }}</p>
                </div>
                <div>
                  <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Tags</p>
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <span v-for="tag in article.tags" :key="tag" class="border border-ink/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/60">{{ tag }}</span>
                  </div>
                </div>
                <div class="border-t border-ink/12 pt-5">
                  <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Need this on your equipment?</p>
                  <NuxtLink to="/contact" class="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">Talk to us <ArrowUpRight :size="12" /></NuxtLink>
                </div>
              </div>
            </aside>

            <div class="lg:col-span-8 lg:col-start-4">
              <div class="prose-tech max-w-2xl">
                <template v-for="(block, i) in article.body" :key="i">
                  <p v-if="block.type === 'p'">{{ block.text }}</p>
                  <h2 v-else-if="block.type === 'h2'">{{ block.text }}</h2>
                  <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
                  <ul v-else-if="block.type === 'list'">
                    <li v-for="item in block.items" :key="item">{{ item }}</li>
                  </ul>
                </template>
              </div>

              <div class="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tag in article.tags" :key="tag" class="border border-ink/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/55">{{ tag }}</span>
                </div>
                <button type="button" class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 hover:text-ink" @click="copyLink">
                  <Check v-if="copied" :size="12" class="text-signal-deep" />
                  <Link2 v-else :size="12" />
                  {{ copied ? 'Copied' : 'Share this note' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>

    <section v-if="related.length" class="border-t border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="flex items-end justify-between">
          <SectionLabel index="—" label="Related notes" />
          <NuxtLink to="/insights" class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 hover:text-ink">All notes →</NuxtLink>
        </div>
        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <ArticleCard v-for="(rel, i) in related" :key="rel.slug" :article="rel" :index="i" />
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="From note to project"
      title="If this sounds like your plant, let’s talk."
      text="We can review your drawings, your failure history, or a panel that nobody can explain. The first conversation is free."
      primary-label="Talk to an engineer"
      primary-to="/contact"
      secondary-label="See capabilities"
      secondary-to="/services"
    />
  </div>
</template>

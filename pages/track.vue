<script setup lang="ts">
import { site } from '~/data/company'

useSeo({
  title: 'Track a project',
  description: 'Look up the status of your Vomtek project using the reference on your acknowledgement email.',
})

useSeoMeta({ robots: 'noindex, follow' })

const statuses = [
  { code: 'received', label: 'Received', text: 'Your request is in the queue and has been acknowledged.' },
  { code: 'engineering_review', label: 'Engineering review', text: 'An engineer is reviewing scope, drawings, and lead times.' },
  { code: 'quoted', label: 'Quote issued', text: 'A written scope and estimate has been sent for approval.' },
  { code: 'approved', label: 'Approved for build', text: 'Purchase order received. Materials are being released.' },
  { code: 'in_build', label: 'In build', text: 'Assembly or service work is underway, with FAT scheduled.' },
  { code: 'shipped', label: 'Shipped / complete', text: 'Equipment has shipped or field work is complete.' },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Project tracking"
      title="Know exactly where it stands."
      lead="Enter the reference from your acknowledgement email. You will see the current stage, the history, and the indicative lead time."
      index="—"
      :crumbs="[{ label: 'Track a project' }]"
    >
      <template #aside>
        <div class="mt-6 flex items-center gap-3 border-t border-ink/15 pt-5">
          <span class="size-1.5 animate-pulse-led bg-signal" />
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Updated by the project engineer</p>
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <TrackLookup />
          </div>

          <div class="lg:col-span-5">
            <div class="border border-ink/15 p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">What the stages mean</p>
              <ul class="mt-3 divide-y divide-ink/10">
                <li v-for="(stage, i) in statuses" :key="stage.code" class="flex gap-3 py-3">
                  <span class="mt-0.5 font-mono text-[10px] text-ink/40">0{{ i + 1 }}</span>
                  <div>
                    <p class="text-[13.5px] font-medium">{{ stage.label }}</p>
                    <p class="mt-0.5 text-[12px] leading-relaxed text-ink/60">{{ stage.text }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-4 border border-ink/15 bg-bone-2/50 p-5">
              <p class="text-[14px] font-medium">Lost your reference?</p>
              <p class="mt-1 text-[13px] leading-relaxed text-ink/65">Call the shop with your company name and project description. We will find it.</p>
              <a :href="`tel:${site.phoneHref}`" class="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">{{ site.phone }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-ink/10 bg-bone-2 py-14">
      <div class="wrap">
        <div class="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div class="max-w-xl">
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-deep">Transparency</p>
            <h2 class="mt-3 text-[26px] font-medium tracking-[-0.03em]">Every project gets a reference. Every stage gets a record.</h2>
            <p class="mt-2 text-[14px] leading-relaxed text-ink/70">It is part of the same discipline we bring to drawings and test reports: if it happened, it is written down and attributable.</p>
          </div>
          <AppButton to="/quote" size="md" arrow track="track-new-quote">Start a new request</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, Heart, GraduationCap, Wrench, Users } from 'lucide-vue-next'

useSeo({
  title: 'Des Foundation — every child deserves a life saver',
  description: 'The Des Foundation supports education, skills, family stability, and community programs. Learn what it funds and how to support the work.',
})

const programs = [
  {
    icon: GraduationCap,
    title: 'Learning support',
    text: 'School fees, books, uniforms, and tutoring for children whose families cannot cover the gap between ambition and cost.',
  },
  {
    icon: Wrench,
    title: 'Skills for the future',
    text: 'Practical trades exposure and mentorship for young people who learn by building — the same instinct that drives our shop.',
  },
  {
    icon: Users,
    title: 'Family stability',
    text: 'Targeted support for households in crisis, coordinated with local community leaders rather than decided from a distance.',
  },
  {
    icon: Heart,
    title: 'Community events',
    text: 'Health outreach, school supplies, and the annual trek and walk that bring supporters and neighbors together.',
  },
]

const principles = [
  { title: 'Local decisions', text: 'Programs are shaped with the people who live in the community, not designed in a boardroom and shipped in.' },
  { title: 'Long-term commitments', text: 'A child supported for one term is a gesture. Supported through school, it is a different life.' },
  { title: 'Visible costs', text: 'We will tell you what a program costs and what it pays for. Vague charity is easy to sell and hard to trust.' },
  { title: 'Dignity first', text: 'No cameras in a child’s face. Support is not content.' },
]

const supportOptions = [
  { label: 'Give monthly', text: 'The most useful kind of support — predictable funding for school terms.', to: '#give' },
  { label: 'Fund a program', text: 'Underwrite supplies, fees, or an event with a named contribution.', to: '#programs' },
  { label: 'Volunteer skills', text: 'Teach a trade, mentor a student, or help with logistics.', to: '/contact?reason=Des%20Foundation' },
]
</script>

<template>
  <div>
    <PageHero
      tone="bone"
      eyebrow="Des Foundation"
      title="Every child deserves a life saver."
      lead="The foundation extends Vomtek’s engineering mindset into the community: fund what works, measure what changed, and stay long enough to matter."
      index="07 / 08"
      :crumbs="[{ label: 'Des Foundation' }]"
    >
      <template #aside>
        <div class="mt-6 border-t border-bone/20 pt-5">
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/55">Community · Education · Opportunity</p>
          <a href="#give" class="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">Pledge support <ArrowUpRight :size="12" /></a>
        </div>
      </template>
    </PageHero>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <SectionLabel index="—" label="Why it exists" />
            <h2 class="type-lg mt-7 max-w-xl" data-reveal>Hope is not<br><em class="serif-accent text-signal-deep">a strategy.</em> Support is.</h2>
            <div class="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink/60">
              <p>
                Vomtek was built by people who understand what a practical opportunity can do for a family. The Des Foundation exists to make those opportunities less random.
              </p>
              <p>
                We focus on children and young people at the point where a small, consistent intervention changes the trajectory: school fees, learning support, a first exposure to a trade, a mentor who shows up.
              </p>
              <p>
                The foundation is intentionally small and deliberately hands-on. We would rather do three things well for a decade than launch ten programs we cannot follow through on.
              </p>
            </div>
          </div>

          <div class="lg:col-span-5" data-reveal="scale">
            <div class="relative overflow-hidden border border-ink/15 bg-signal p-8 text-ink md:p-10">
              <div class="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
              <p class="relative font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65">The promise</p>
              <blockquote class="relative mt-6 font-display text-[clamp(1.9rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">
                “When you give, you are joining a community of supporters to shape the future of a child — not funding a brochure.”
              </blockquote>
              <p class="relative mt-6 border-t border-ink/20 pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/70">
                Education · Skills · Family stability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="programs" class="border-y border-ink/10 bg-bone-2 section-y scroll-mt-24">
      <div class="wrap">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="—" label="What we fund" />
            <h2 class="type-lg mt-7">Four places<br><em class="serif-accent">it goes.</em></h2>
          </div>
          <p class="max-w-sm text-[13.5px] leading-relaxed text-ink/65 md:text-right">
            Every program has a named owner inside the foundation, a budget, and a report at the end of the year.
          </p>
        </div>

        <div class="mt-12 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(program, i) in programs" :key="program.title" class="group flex flex-col bg-bone-2 p-6">
            <div class="flex items-start justify-between">
              <component :is="program.icon" :size="22" :stroke-width="1.4" class="text-signal-deep" />
              <span class="font-mono text-[11px] text-ink/40">0{{ i + 1 }}</span>
            </div>
            <h3 class="mt-6 text-[18px] font-medium tracking-[-0.02em]">{{ program.title }}</h3>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/70">{{ program.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <SectionLabel index="—" label="How we give" />
            <h2 class="type-lg mt-7" data-reveal>The discipline<br><em class="serif-accent text-signal-deep">behind the giving.</em></h2>
            <div class="mt-8 border border-ink/15 bg-bone-2/50 p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">Accountability</p>
              <p class="mt-2 text-[14px] leading-relaxed text-ink/60">
                Support is tracked at the program level. Donors receive an annual summary of what was funded and what it cost — including the parts that did not work.
              </p>
            </div>
          </div>
          <div class="lg:col-span-7">
            <ul class="border-t border-ink/15">
              <li v-for="(principle, i) in principles" :key="principle.title" class="border-b border-ink/15 py-5">
                <div class="flex items-start gap-5">
                  <span class="mt-1 font-mono text-[11px] text-signal-deep">0{{ i + 1 }}</span>
                  <div>
                    <h3 class="text-[17px] font-medium tracking-[-0.02em]">{{ principle.title }}</h3>
                    <p class="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink/70">{{ principle.text }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="give" class="relative overflow-hidden bg-ink text-bone section-y scroll-mt-24">
      <div class="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />
      <div class="absolute -right-20 top-0 size-[420px] rounded-full border border-bone/6" aria-hidden="true" />

      <div class="wrap relative">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <SectionLabel index="—" label="Support the work" tone="bone" />
            <h2 class="type-lg mt-7 max-w-[13ch]" data-reveal>Make an<br><em class="serif-accent text-signal">impact.</em></h2>
            <p class="mt-5 max-w-sm text-[14px] leading-relaxed text-bone/65">
              Pledge a monthly or one-time gift. The foundation team will follow up with the giving details — no card is charged on this site.
            </p>

            <div class="mt-8 divide-y divide-bone/15 border-y border-bone/15">
              <a v-for="option in supportOptions" :key="option.label" :href="option.to" class="group flex items-start justify-between gap-4 py-4">
                <span>
                  <span class="block text-[14px] font-medium text-bone/85">{{ option.label }}</span>
                  <span class="mt-0.5 block text-[13px] leading-relaxed text-bone/55">{{ option.text }}</span>
                </span>
                <ArrowUpRight :size="14" class="mt-1 shrink-0 text-bone/45 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
              </a>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="border border-bone/20 p-6 md:p-8">
              <FoundationForm />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bone py-14">
      <div class="wrap">
        <div class="flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-8 md:flex-row md:items-center">
          <div>
            <p class="text-[18px] font-medium tracking-[-0.02em]">Want to see the work before you support it?</p>
            <p class="mt-1 text-[14px] text-ink/65">We are happy to walk you through what the foundation funds and who it serves.</p>
          </div>
          <AppButton to="/contact?reason=Des%20Foundation" variant="outline" size="md" arrow track="foundation-contact">Talk to the foundation</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

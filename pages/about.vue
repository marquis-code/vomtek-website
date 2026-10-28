<script setup lang="ts">
import { ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import { values, principles, standards, site, industries } from '~/data/company'

useSeo({
  title: 'About — a Houston engineering and manufacturing company',
  description: 'Vomtek designs, builds, and commissions electrical and control systems from Houston, Texas. One accountable team across six divisions, with documentation and testing built into the work.',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Vomtek',
  description: 'Vomtek is a Houston engineering and manufacturing company delivering control panels, electrical systems, fabrication, and field service.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Vomtek',
    telephone: '+1-713-347-1466',
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2401 Fountain View Dr, Ste 312',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
  },
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="About Vomtek"
      title="We build the layer between power and production."
      lead="An engineering and manufacturing company in Houston, organized around one idea: the team that designs the system should be accountable for it after startup."
      index="01 / 08"
      :crumbs="[{ label: 'About' }]"
    />

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <div class="prose-tech" data-reveal>
              <p>
                Vomtek solves hard problems in panel building, PCB design, wire harness, cable assembly, motor service, and field work. The range is unusual until you look at how industrial equipment actually fails: rarely in one discipline, usually at the seam between several.
              </p>
              <p>
                Our answer is structural. Engineering, panel assembly, fabrication, motor service, and field technicians operate as one company with one documentation standard. When a project moves from a drawing to a shop floor to a live plant, the same people can follow it the whole way.
              </p>
              <p>
                We work with water and wastewater utilities, food and beverage producers, energy facilities, machine builders, and commercial property teams. Some engagements are a single replacement panel. Others are multi-year retrofit programs. The approach does not change: understand the process, design for maintenance, test before it ships, and document what is actually installed.
              </p>
            </div>

            <div class="mt-10 flex flex-wrap items-center gap-8 border-t border-ink/15 pt-7">
              <div>
                <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Based in</p>
                <p class="mt-1 text-[14px] font-medium">Houston, Texas</p>
              </div>
              <div>
                <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Panel certification</p>
                <p class="mt-1 text-[14px] font-medium">UL 508A shop</p>
              </div>
              <div>
                <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Coverage</p>
                <p class="mt-1 text-[14px] font-medium">Gulf Coast & beyond</p>
              </div>
            </div>
          </div>

          <figure class="lg:col-span-5" data-reveal="scale">
            <div class="relative aspect-[4/3] overflow-hidden border border-ink/15 bg-ink" data-reveal="mask">
              <ResponsivePicture
                asset="panel-assembly"
                alt="Control panel assembly with PLC, wiring ducts, and terminal blocks"
                :widths="[480]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                :width="500"
                :height="375"
                img-class="h-full w-full object-cover opacity-90 grayscale transition-all duration-700 hover:grayscale-[0.3]"
              />
              <div class="pointer-events-none absolute inset-0 bg-signal/10 mix-blend-multiply" aria-hidden="true" />
              <div class="absolute bottom-0 left-0 flex items-center gap-2 bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70 backdrop-blur">
                <span class="size-1 animate-pulse-led bg-signal" />
                Panel assembly / Houston
              </div>
            </div>
            <figcaption class="flex items-center justify-between border border-t-0 border-ink/15 px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55">
              <span>Plate 01 — control panel, interior</span>
              <span>Ref VT-2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-ink text-bone section-y">
      <div class="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />
      <div class="wrap relative">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-4">
            <SectionLabel index="—" label="Our mission" tone="bone" />
            <p class="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">Why the company exists</p>
          </div>
          <div class="lg:col-span-8">
            <blockquote class="text-[clamp(1.9rem,3.6vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em]" data-reveal>
              “Design, build, and implement systems that make our clients <em class="serif-accent text-signal">more reliable</em> than they were before we arrived.”
            </blockquote>
            <p class="mt-8 max-w-2xl text-[14.5px] leading-relaxed text-bone/65">
              That is a higher bar than delivering a working panel. It means the equipment is maintainable, the drawings are true, the spares are identified, and the people who run it know what to do when something changes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <div class="grid gap-3 md:grid-cols-3">
          <figure class="relative overflow-hidden rounded-xl border border-ink/15 bg-ink" data-reveal="mask">
            <div class="aspect-[4/5]">
              <ResponsivePicture asset="electrician-meter" alt="Electrician testing a control panel with a multimeter" :widths="[480, 800]" sizes="33vw" :width="800" :height="1000" img-class="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105" />
            </div>
            <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/60">Verification / point-to-point</figcaption>
          </figure>
          <figure class="relative overflow-hidden border border-ink/15 bg-ink md:mt-8" data-reveal="mask" style="--reveal-delay: 100ms">
            <div class="aspect-[4/5]">
              <ResponsivePicture asset="machine-team" alt="Technicians operating a CNC machine" :widths="[480, 800]" sizes="33vw" :width="800" :height="1000" img-class="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105" />
            </div>
            <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/60">People / one accountable team</figcaption>
          </figure>
          <figure class="relative overflow-hidden rounded-xl border border-ink/15 bg-ink" data-reveal="mask" style="--reveal-delay: 180ms">
            <div class="aspect-[4/5]">
              <ResponsivePicture asset="laser-cutting" alt="Laser cutting a sheet metal panel" :widths="[480, 800]" sizes="33vw" :width="800" :height="1000" img-class="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105" />
            </div>
            <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/60">Fabrication / enclosures</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="—" label="Core values" />
        <div class="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="type-lg max-w-xl" data-reveal>What we<br><em class="serif-accent">stand on.</em></h2>
          <p class="max-w-sm text-[13.5px] leading-relaxed text-ink/65 md:text-right">
            Five values, borrowed from the people who built this company. We try to practice them on ordinary Tuesdays, not just in interviews.
          </p>
        </div>

        <div class="mt-12 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-5">
          <div v-for="(value, i) in values" :key="value.title" class="group flex flex-col bg-bone p-5 transition-colors hover:bg-bone-2">
            <span class="font-mono text-[11px] tracking-[0.1em] text-signal-deep">0{{ i + 1 }}</span>
            <h3 class="mt-6 text-[17px] font-medium capitalize tracking-[-0.02em]">{{ value.title }}</h3>
            <p class="mt-2.5 text-[13px] leading-relaxed text-ink/70">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-ink/10 bg-bone-2 section-y">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <SectionLabel index="—" label="How we work" />
            <h2 class="type-lg mt-8 max-w-[13ch]" data-reveal>The principles<br><em class="serif-accent text-signal-deep">behind the habits.</em></h2>
            <p class="mt-5 max-w-sm text-[14px] leading-relaxed text-ink/70">
              These are the rules we use when a project gets difficult — which is the only time they matter.
            </p>
            <figure class="mt-10 max-w-sm">
              <div class="aspect-[4/3] overflow-hidden border border-ink/15 bg-ink">
                <ResponsivePicture
                  asset="motor-rewind"
                  alt="Technician rewinding a large industrial motor"
                  :widths="[480]"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  :width="394"
                  :height="431"
                  img-class="h-full w-full object-cover opacity-90 grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <figcaption class="border border-t-0 border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                Motor rewind bench / field service support
              </figcaption>
            </figure>
          </div>

          <div class="lg:col-span-7">
            <ul class="border-t border-ink/15">
              <li v-for="(principle, i) in principles" :key="principle.title" class="border-b border-ink/15 py-6" data-reveal :style="`--reveal-delay: ${i * 60}ms`">
                <div class="flex items-start gap-5">
                  <span class="mt-1 font-mono text-[11px] tracking-[0.1em] text-signal-deep">0{{ i + 1 }}</span>
                  <div>
                    <h3 class="text-[18px] font-medium tracking-[-0.02em]">{{ principle.title }}</h3>
                    <p class="mt-2 max-w-xl text-[14px] leading-relaxed text-ink/70">{{ principle.text }}</p>
                  </div>
                </div>
              </li>
            </ul>

            <div class="mt-10 flex flex-wrap items-center gap-4">
              <AppButton to="/careers" size="md" arrow track="about-careers">Work with us</AppButton>
              <AppButton to="/contact" variant="outline" size="md" arrow track="about-contact">Talk to the team</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-y bg-bone">
      <div class="wrap">
        <SectionLabel index="—" label="The standard" />
        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <h2 class="type-lg max-w-lg lg:col-span-6" data-reveal>Certified where<br><em class="serif-accent">it counts.</em></h2>
          <p class="max-w-md text-[14px] leading-relaxed text-ink/70 lg:col-span-6">
            Certifications are the floor, not the differentiator. What matters is whether the panel carries the right label, the drawings match the build, and the test results are real.
          </p>
        </div>

        <div class="mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="standard in standards" :key="standard.code" class="bg-bone p-6">
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-deep">{{ standard.code }}</p>
            <p class="mt-3 text-[15px] font-medium">{{ standard.label }}</p>
            <p class="mt-1.5 text-[13px] leading-relaxed text-ink/65">{{ standard.note }}</p>
          </div>
        </div>

        <div class="mt-14 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-3">
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Divisions</p>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/60">Six disciplines, one shop floor, and one project manager who owns the outcome.</p>
            <NuxtLink to="/divisions" class="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">Explore divisions <ArrowUpRight :size="12" /></NuxtLink>
          </div>
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Industries</p>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/60">{{ industries.join(' · ') }}</p>
          </div>
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Community</p>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/60">The Des Foundation carries our engineering mindset into education and community programs.</p>
            <NuxtLink to="/foundation" class="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-deep">Des Foundation <ArrowRight :size="12" /></NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Work with us"
      title="Come see how we build before you trust us with a line."
      text="Visit the shop, meet the engineers, and look at a panel that is mid-build. It is the fastest way to decide whether we are the right team."
      primary-label="Schedule a visit"
      primary-to="/contact"
      secondary-label="See open roles"
      secondary-to="/careers"
    />
  </div>
</template>

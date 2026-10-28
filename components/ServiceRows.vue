<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { services } from '~/data/services'

const site = useSiteConfig()
const visible = computed(() => services.filter(service => site.value.services[service.slug]?.enabled !== false))

</script>

<template>
  <ul class="border-t border-ink/12">
    <li v-for="(service, i) in visible" :key="service.slug" class="group relative border-b border-ink/12">
      <NuxtLink
        :to="`/services/${service.slug}`"
        class="relative flex items-center gap-4 py-5 transition-colors md:gap-7 md:py-6"
        
        
      >
        <span class="w-6 shrink-0 font-mono text-[11px] tracking-[0.1em] text-ink/45">{{ service.index }}</span>
        <span class="size-9 shrink-0 text-ink/60 transition-colors duration-300 group-hover:text-signal-deep md:size-11">
          <ServiceGlyph :variant="service.glyph" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block text-[17px] font-medium leading-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 md:text-[19px]">
            {{ service.name }}
          </span>
          <span class="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-ink/60 transition-colors group-hover:text-ink/60">{{ service.lead }}</span>
        </span>
        <span class="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45 lg:block">{{ service.delivery }}</span>
        <span class="flex size-8 shrink-0 items-center justify-center border border-ink/15 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
          <ArrowUpRight :size="13" :stroke-width="1.5" />
        </span>
        <span class="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden="true" />
      </NuxtLink>
    </li>
  </ul>
</template>

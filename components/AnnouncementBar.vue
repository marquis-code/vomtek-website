<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
const site = useSiteConfig()
</script>

<template>
  <div v-if="site.announcement.enabled" class="relative z-40 bg-brand text-white">
    <div class="wrap flex min-h-9 items-center justify-center gap-3 py-1.5 text-center">
      <span class="hidden size-1 bg-brand-deep sm:block" aria-hidden="true" />
      <p class="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em]">
        {{ site.announcement.text }}
        <NuxtLink v-if="site.announcement.linkUrl" :to="site.announcement.linkUrl" class="ml-2 inline-flex items-center gap-1 underline decoration-white/40 underline-offset-4 hover:decoration-white">
          {{ site.announcement.linkLabel }} <ArrowUpRight :size="10" />
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

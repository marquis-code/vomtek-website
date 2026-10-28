<script setup lang="ts">
import type { PublicSiteConfig } from '~/types/site'
import { siteDefaults } from '~/data/siteDefaults'

const runtime = useRuntimeConfig()
const site = useSiteConfig()

const { data } = await useAsyncData<PublicSiteConfig>('site-config', async () => {
  try {
    const response = await $fetch<PublicSiteConfig>(`${runtime.public.apiBase}/site`, { timeout: 5000 })
    return deepMerge(siteDefaults, response)
  }
  catch {
    return siteDefaults
  }
}, { default: () => siteDefaults })

site.value = data.value
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#007d48" :height="2" :duration="2200" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

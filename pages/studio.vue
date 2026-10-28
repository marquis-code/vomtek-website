<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({ title: 'Studio has moved', robots: 'noindex, nofollow' })

if (import.meta.server) {
  await navigateTo(`${config.public.adminUrl}/login`, { external: true, redirectCode: 302 })
}
else {
  window.location.replace(`${config.public.adminUrl}/login`)
}
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center bg-bone">
    <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Redirecting to Vomtek Studio…</p>
  </div>
</template>

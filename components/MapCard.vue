<script setup lang="ts">
import { MapPin, ArrowUpRight } from 'lucide-vue-next'
const site = useSiteConfig()
</script>

<template>
  <div class="border border-ink/15 bg-bone">
    <div class="relative aspect-[16/10] overflow-hidden bg-ink">
      <div class="absolute inset-0 grid-bg-dark opacity-60" aria-hidden="true" />
      <svg viewBox="0 0 600 380" class="absolute inset-0 h-full w-full" role="img" aria-label="Illustrative map of Vomtek's location in Houston, Texas">
        <g stroke="#f2efe6" stroke-opacity=".16" stroke-width="1">
          <path d="M-20 90 L620 40" />
          <path d="M-20 190 L620 140" />
          <path d="M-20 300 L620 250" />
          <path d="M120 -20 L80 400" />
          <path d="M260 -20 L220 400" />
          <path d="M420 -20 L380 400" />
          <path d="M540 -20 L500 400" />
        </g>
        <g stroke="#f2efe6" stroke-opacity=".28" stroke-width="2">
          <path d="M-20 245 L620 195" />
          <path d="M340 -20 L300 400" />
        </g>
        <g fill="#f2efe6" fill-opacity=".05">
          <rect x="90" y="115" width="120" height="60" />
          <rect x="235" y="215" width="60" height="80" />
          <rect x="405" y="90" width="90" height="70" />
          <rect x="470" y="270" width="100" height="60" />
        </g>
        <g>
          <circle cx="300" cy="210" r="28" fill="#007d48" fill-opacity=".12" />
          <circle cx="300" cy="210" r="14" fill="none" stroke="#007d48" stroke-opacity=".55" />
          <circle cx="300" cy="210" r="4.5" fill="#007d48" />
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#f2efe6" fill-opacity=".35" letter-spacing="1">
          <text x="330" y="206">2401 FOUNTAIN VIEW DR</text>
          <text x="330" y="218" fill-opacity=".2">WESTCHASE / HOUSTON</text>
          <text x="32" y="48">WESTHEIMER RD</text>
          <text x="500" y="330">BELTWAY 8</text>
        </g>
      </svg>

      <div class="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/65">
        <span class="size-1 rounded-full bg-signal" />
        {{ site.company.coordinates }}
      </div>

      <a
        :href="site.company.address.maps"
        target="_blank"
        rel="noopener"
        class="group absolute bottom-4 left-4 inline-flex items-center gap-2 border border-bone/25 bg-ink/70 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone/70 backdrop-blur transition-colors hover:border-signal hover:text-bone"
      >
        <MapPin :size="11" /> Open in maps
        <ArrowUpRight :size="11" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
    <div class="flex items-start justify-between gap-4 border-t border-ink/15 px-4 py-3">
      <p class="font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink/70">{{ site.company.address.full }}</p>
      <p class="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">By appointment</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant: 'panel' | 'pcb' | 'harness' | 'motor' | 'test' | 'repair' | 'field'
}>()
</script>

<template>
  <svg viewBox="0 0 48 48" fill="none" class="size-full" aria-hidden="true">
    <g v-if="variant === 'panel'" stroke="currentColor" stroke-width="1.15">
      <rect x="10" y="5" width="28" height="38" rx="1" />
      <rect x="14" y="9" width="20" height="30" stroke-opacity=".3" />
      <line x1="14" y1="17" x2="34" y2="17" stroke-opacity=".25" />
      <line x1="14" y1="25" x2="34" y2="25" stroke-opacity=".25" />
      <g stroke-opacity=".55">
        <rect x="17" y="11" width="5" height="4" />
        <rect x="24" y="11" width="5" height="4" />
        <rect x="17" y="19" width="5" height="4" />
        <rect x="24" y="19" width="5" height="4" />
      </g>
      <circle cx="31" cy="34" r="2" stroke="var(--color-signal)" />
      <line x1="17" y1="34" x2="25" y2="34" stroke-opacity=".4" />
    </g>

    <g v-else-if="variant === 'pcb'" stroke="currentColor" stroke-width="1.15">
      <rect x="5" y="9" width="38" height="30" rx="1" />
      <rect x="18" y="18" width="12" height="12" stroke="var(--color-signal)" />
      <g stroke-opacity=".4">
        <path d="M18 21 H10 V13" />
        <path d="M18 27 H11 V35" />
        <path d="M30 21 H38 V14" />
        <path d="M30 27 H37 V34" />
        <path d="M21 18 V12 H15" />
        <path d="M27 30 V36 H33" />
      </g>
      <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="39" cy="34" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="35" r="1.2" fill="var(--color-signal)" stroke="none" />
    </g>

    <g v-else-if="variant === 'harness'" stroke="currentColor" stroke-width="1.15">
      <rect x="5" y="13" width="9" height="22" rx="1" />
      <rect x="34" y="13" width="9" height="22" rx="1" />
      <g stroke-opacity=".55">
        <path d="M14 18 C22 18 26 12 34 12" />
        <path d="M14 24 C22 24 26 24 34 24" />
        <path d="M14 30 C22 30 26 36 34 36" />
      </g>
      <g stroke="var(--color-signal)">
        <path d="M14 24 C22 24 26 24 34 24" />
      </g>
      <g stroke-opacity=".35">
        <line x1="9" y1="13" x2="9" y2="35" />
        <line x1="38" y1="13" x2="38" y2="35" />
      </g>
      <circle cx="34" cy="24" r="1.6" fill="var(--color-signal)" stroke="none" />
    </g>

    <g v-else-if="variant === 'motor'" stroke="currentColor" stroke-width="1.15">
      <circle cx="21" cy="24" r="13" />
      <circle cx="21" cy="24" r="5" stroke-opacity=".35" />
      <path d="M21 11 V8" stroke-opacity=".4" />
      <path d="M21 37 V40" stroke-opacity=".4" />
      <path d="M13 15 L9 12" stroke-opacity=".4" />
      <path d="M29 33 L33 36" stroke-opacity=".4" />
      <path d="M34 24 H44" />
      <path d="M34 20 H39" stroke-opacity=".35" />
      <path d="M34 28 H39" stroke-opacity=".35" />
      <path d="M8 24 H13" stroke="var(--color-signal)" />
      <circle cx="21" cy="24" r="1.4" fill="currentColor" stroke="none" />
    </g>

    <g v-else-if="variant === 'test'" stroke="currentColor" stroke-width="1.15">
      <rect x="5" y="10" width="38" height="28" rx="1" />
      <polyline points="9,28 15,28 18,18 22,34 26,15 30,30 34,24 39,24" stroke="var(--color-signal)" />
      <line x1="5" y1="34" x2="43" y2="34" stroke-opacity=".2" />
      <g stroke-opacity=".35">
        <line x1="9" y1="15" x2="17" y2="15" />
        <line x1="9" y1="19" x2="13" y2="19" />
      </g>
      <circle cx="39" cy="15" r="1.4" fill="var(--color-signal)" stroke="none" />
    </g>

    <g v-else-if="variant === 'repair'" stroke="currentColor" stroke-width="1.15">
      <rect x="8" y="6" width="26" height="36" rx="1" />
      <line x1="12" y1="12" x2="30" y2="12" stroke-opacity=".25" />
      <line x1="12" y1="18" x2="30" y2="18" stroke-opacity=".25" />
      <g stroke-opacity=".45">
        <circle cx="15" cy="26" r="2" />
        <circle cx="23" cy="26" r="2" />
        <line x1="12" y1="34" x2="30" y2="34" />
      </g>
      <path d="M35 20 L43 12 L46 15 L38 23 Z" stroke="var(--color-signal)" />
      <path d="M35 20 L31 24 L34 27 L38 23" stroke="var(--color-signal)" />
    </g>

    <g v-else stroke="currentColor" stroke-width="1.15">
      <rect x="17" y="6" width="14" height="8" rx="1" stroke="var(--color-signal)" />
      <rect x="17" y="14" width="14" height="8" rx="1" />
      <rect x="17" y="22" width="14" height="8" rx="1" />
      <path d="M24 30 V37" />
      <path d="M18 37 H30" stroke-opacity=".4" />
      <circle cx="24" cy="10" r="1.3" fill="var(--color-signal)" stroke="none" />
      <circle cx="24" cy="18" r="1.3" fill="currentColor" fill-opacity=".4" stroke="none" />
      <circle cx="24" cy="26" r="1.3" fill="currentColor" fill-opacity=".4" stroke="none" />
    </g>
  </svg>
</template>

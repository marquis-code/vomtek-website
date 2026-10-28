<script setup lang="ts">
const props = withDefaults(defineProps<{
  phrases: string[]
  fallback?: string
  interval?: number
}>(), {
  fallback: 'hold the line.',
  interval: 4200,
})

const list = computed(() => {
  const clean = (props.phrases || []).map(p => p.trim()).filter(Boolean)
  return clean.length ? clean : [props.fallback]
})
const index = ref(0)
const paused = ref(false)
const reduced = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const current = computed(() => list.value[index.value % list.value.length] || props.fallback)

function start() {
  stop()
  if (paused.value || reduced.value || list.value.length < 2) return
  timer = setInterval(() => {
    index.value = (index.value + 1) % list.value.length
  }, props.interval)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  start()
})
onUnmounted(stop)
</script>

<template>
  <span
    class="relative block overflow-hidden align-bottom"
    :style="{ height: '1.12em' }"
    @mouseenter="paused = true; stop()"
    @mouseleave="paused = false; start()"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-500 ease-[var(--ease-out-expo)]"
      enter-from-class="translate-y-full opacity-0"
      leave-active-class="transition duration-300 ease-in"
      leave-to-class="-translate-y-full opacity-0"
    >
      <em :key="current" class="serif-accent block text-signal-deep" aria-hidden="true">{{ current }}</em>
    </Transition>
  </span>
</template>

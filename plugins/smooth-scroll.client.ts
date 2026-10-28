import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.matchMedia('(pointer: coarse)').matches) return

  const lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(1 - t, 3)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  })

  let frame = 0
  function raf(time: number) {
    lenis.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo(0, { immediate: true })
  })

  nuxtApp.provide('lenis', lenis)
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(frame)
    lenis.destroy()
  }, { once: true })
})

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null
  let timer: ReturnType<typeof setTimeout> | null = null
  const observed = new WeakSet<Element>()

  const start = () => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'))
      return
    }

    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
    }

    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      if (observed.has(el)) return
      observed.add(el)
      observer?.observe(el)
    })
  }

  /**
   * Deliberately deferred beyond hydration: mutating classes during Vue's
   * hydration pass produces class mismatches. A short delay is imperceptible
   * and keeps the SSR markup and the client tree identical at hydration time.
   */
  const schedule = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      nextTick(() => requestAnimationFrame(start))
    }, 320)
  }

  nuxtApp.hook('app:mounted', schedule)
  nuxtApp.hook('page:finish', schedule)

  if ('MutationObserver' in window) {
    const mutations = new MutationObserver(schedule)
    nuxtApp.hook('app:mounted', () => {
      mutations.observe(document.body, { childList: true, subtree: true })
    })
  }
})

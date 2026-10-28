import type { Router } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as Router

  const pageView = () => {
    const path = window.location.pathname
    track('page_view', {
      title: document.title,
      referrer: document.referrer || null,
    })
    void path
  }

  router.afterEach(() => {
    window.setTimeout(pageView, 350)
  })

  nuxtApp.hook('app:mounted', () => {
    window.setTimeout(pageView, 500)

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('[data-track]')
      if (!el) return
      track('cta_click', {
        label: el.dataset.track,
        destination: el.getAttribute('href') || el.getAttribute('to') || null,
      })
    }, { passive: true })
  })
})

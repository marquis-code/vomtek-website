import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  telemetry: false,

  css: [
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4010/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://vomtek.com',
      adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'http://localhost:3110',
      phone: '713-347-1466',
      phoneHref: '+17133471466',
      email: 'support@vomtek.com',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s — Vomtek',
      meta: [
        { name: 'theme-color', content: '#004b2b' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', href: '/fonts/clash-display-600.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/satoshi-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/ibm-plex-mono-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      ],
      script: [
        {
          // Enables scroll-reveal only when JS is present, so no content is
          // ever hidden for no-JS visitors or crawlers.
          innerHTML: `document.documentElement.classList.add('js')`,
          type: 'text/javascript',
        },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/': { swr: 15 },
      '/divisions': { swr: 300 },
      '/services': { swr: 300 },
      '/about': { prerender: true },
      '/contact': { swr: 300 },
      '/privacy': { prerender: true },
      '/terms': { prerender: true },
      '/systems': { swr: 60 },
      '/uptime-care': { swr: 60 },

      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

})

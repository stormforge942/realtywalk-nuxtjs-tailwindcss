// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/styles/index.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vesp/nuxt-fontawesome',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/leaflet'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },
  runtimeConfig: {
    public: {
      RECAPCHA_KEY: process.env.RECAPTCHA_SITE_KEY || '',
      EMAIL: process.env.EMAIL || '',
      CELLL: process.env.CELL || '',
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
      API_ENDPOINT: process.env.API_ENDPOINT || '',
      API_ENDPOINT_BUILDER: process.env.API_ENDPOINT_BUILDER || '',
      IS_BUILDER: process.env.IS_BUILDER || 'false'
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'default' }
  },
  build: {
    transpile: ['vue-3-mask']
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: [
        '/about',
        '/privacy-policy',
        '/report-bug',
        '/terms-of-service',
      ]
    }
  }
})
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
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      RECAPCHA_KEY: process.env.RECAPTCHA_SITE_KEY || '',
      EMAIL: process.env.EMAIL || '',
      CELLL: process.env.CELL || '',
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
      API_ENDPOINT: process.env.API_ENDPOINT || ''
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'default' }
  }
})

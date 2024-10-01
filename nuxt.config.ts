// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/styles/index.css'
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vesp/nuxt-fontawesome',
    '@nuxtjs/tailwindcss'
  ],
  i18n: {
    locales: [
      {
        code: 'en', iso: 'en-US', file: 'en.json', name: 'English',
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts'
  },
  tailwindcss: {
    cssPath: ['~/styles/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  }
})
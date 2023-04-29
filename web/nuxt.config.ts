// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@/assets/css/globals.css',
    '@flaticon/flaticon-uicons/css/all/all.css',
  ],
  typescript: {
    shim: false,
    strict: true,
  },
  routeRules: {
    '/': { ssr: true },
    '/app/**': { ssr: false },
  },
})

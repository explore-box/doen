// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  image: {},
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge'],
  css: [
    '@/assets/css/globals.css',
    '@flaticon/flaticon-uicons/css/all/all.css'
  ],
  typescript: {
    shim: false,
    strict: true
  },
  routeRules: {
    '/': { ssr: true },
    '/app/**': { ssr: false }
  }
})

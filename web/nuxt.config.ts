// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      auth: {
        callbackBaseUrl:
          process.env.AUTH_BASE_DOMAIN_CALLBACK || 'http://localhost:3000',
        strategies: {
          github: {
            clientId: process.env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
          },
          google: {
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
          }
        }
      },
      apiBaseUrl: process.env.BACKEND_API_URL || 'http://localhost:4000'
    }
  },
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

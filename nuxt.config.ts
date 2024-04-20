import { Static } from "vue";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/ultimate-slut-checklist/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/ultimate-slut-checklist/favicon.png' }
      ]
    },
    baseURL: '/ultimate-slut-checklist/', // baseURL: '/<repository>/'
    buildAssetsDir: 'nuxt', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  modules: [
    '@nuxt/image'
  ],
  css: ['~/assets/css/main.scss', '~/assets/css/fonts.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variables.scss" as *;'
        }
      }
    }
  },
  ssr: false, //When false
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Habilitar SSR para pre-renderizado
  ssr: true,
  
  // Módulos de Nuxt
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  
  // Configuración de Tailwind
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },
  
  // Configuración de Nuxt Content
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  
  // Configuración de i18n
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'es'
    }
  },
  
  // Configuración de Google Fonts
  googleFonts: {
    families: {
      'Space Grotesk': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600, 700]
    },
    display: 'swap',
    preload: true
  },
  
  // Configuración de TypeScript
  typescript: {
    strict: true,
    typeCheck: false // Desactivado en dev para evitar conflictos con vite-plugin-checker
  },
  
  // Configuración de compatibilidad
  compatibilityDate: '2024-01-01'
})


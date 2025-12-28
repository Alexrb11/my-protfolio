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
    '@pinia/nuxt'
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


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  
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
  } as any,
  
  // Configuración de i18n
  i18n: {
    vueI18n: './i18n.config.ts',
    // baseUrl para SEO - se puede configurar con variable de entorno NUXT_PUBLIC_BASE_URL en producción
    // Si no se define, useLocaleHead usará la URL actual del sitio
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
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
      // @ts-expect-error - lazy es una opción válida de @nuxtjs/i18n
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
  compatibilityDate: '2024-01-01',

  // Configuración de Nitro para prerenderizado
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // Ignorar rutas dinámicas y rutas de Nuxt Content que causan errores 204
      ignore: [
        '/api/**',
        '/__nuxt_content/**',
        '**/*.txt',
        '**/sql_dump.*'
      ],
      // No fallar en errores 204 (No Content) - estas rutas no son páginas reales
      failOnError: false
    },
    // Configuración experimental para mejor manejo de prerenderizado
    experimental: {
      wasm: true
    }
  }
})


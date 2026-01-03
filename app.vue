<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Capturamos la configuración de cabeceras generada por i18n
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id'
  // addSeoAttributes se omite porque es default en v8+
} as any)
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    dir: i18nHead.value.htmlAttrs!.dir as 'ltr' | 'rtl' | 'auto' | undefined
  },
  link: [
    ...(i18nHead.value.link || []), // Inyectamos los hreflang
    { rel: 'icon', type: 'image/png', href: '/assets/icon/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/assets/icon/favicon.svg' },
    { rel: 'shortcut icon', href: '/assets/icon/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icon/apple-touch-icon.png' },
    { rel: 'manifest', href: '/assets/icon/site.webmanifest' }
  ],
  meta: [
    ...(i18nHead.value.meta || []), // Inyectamos los meta tags de i18n
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'Alex Rubio' }
  ]
})
</script>


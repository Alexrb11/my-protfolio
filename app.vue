<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Usar useLocaleHead para gestionar dinámicamente el atributo lang y meta tags
useLocaleHead()

// Meta tags globales básicos (viewport siempre necesario) y favicons
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'Alex Rubio' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/icon/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/assets/icon/favicon.svg' },
    { rel: 'shortcut icon', href: '/assets/icon/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icon/apple-touch-icon.png' },
    { rel: 'manifest', href: '/assets/icon/site.webmanifest' }
  ]
})
</script>


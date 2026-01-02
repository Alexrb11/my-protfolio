<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Usar useLocaleHead para gestionar dinámicamente el atributo lang y meta tags
useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true
})

// Meta tags globales básicos (viewport siempre necesario)
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>


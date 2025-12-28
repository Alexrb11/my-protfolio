<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Meta tags globales
useHead({
  title: 'Alex Rubio - Portfolio 2025',
  meta: [
    { name: 'description', content: 'Portfolio profesional de Alex Rubio - Desarrollador Frontend' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})
</script>


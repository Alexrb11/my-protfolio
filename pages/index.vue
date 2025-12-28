<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-5xl font-bold font-sans mb-4 text-border">
          {{ $t('header.name') }}
        </h1>
        <p class="text-xl font-mono text-gray-700 dark:text-gray-300">
          {{ $t('header.role') }}
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 w-full lg:auto-rows-fr">
        <!-- Profile Card - Izquierda, ocupa 2 filas -->
        <div class="lg:col-span-1 lg:row-span-2">
          <ProfileCard />
        </div>

        <!-- Terminal Window - Derecha arriba, ocupa 3 columnas y 2 filas -->
        <div class="lg:col-span-3 lg:row-span-2 min-h-[500px] lg:min-h-[700px]">
          <TerminalWindow />
        </div>

        <!-- Stack Marquee - Abajo, 3 columnas -->
        <div class="lg:col-span-3">
          <StackMarquee />
        </div>

        <!-- IoT Simulation - Abajo -->
        <div class="lg:col-span-1">
          <IoTSimulation />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

// Meta tags para la página de inicio con i18n y SEO mejorado
useHead({
  title: t('meta.title'),
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    {
      name: 'description',
      content: t('meta.description')
    },
    {
      property: 'og:title',
      content: t('meta.title')
    },
    {
      property: 'og:description',
      content: t('meta.description')
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: t('meta.title')
    },
    {
      name: 'twitter:description',
      content: t('meta.description')
    }
  ]
})
</script>


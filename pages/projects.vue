<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold font-sans mb-4 text-border">
          {{ $t('projects.title') }}
        </h1>
      </div>

      <!-- Projects List Component -->
      <ProjectsList />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Meta tags localizados
useHead({
  title: t('projects.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description')
    }
  ]
})
</script>


<template>
  <div class="projects-list">
    <h2 class="text-3xl font-bold mb-6">{{ $t('projects.title') }}</h2>
    
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-8">
      <p class="font-mono text-border/70">{{ $t('common.loading') }}</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="font-mono text-red-600">{{ $t('common.error') }}</p>
    </div>
    
    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="project in projects"
        :key="project._path"
        class="neo-card bg-white p-6 hover:shadow-lg transition-shadow"
      >
        <!-- Project Title -->
        <h3 class="text-xl font-bold font-mono mb-2">
          {{ project.title }}
        </h3>
        
        <!-- Project Description -->
        <p class="text-sm text-border/70 mb-4">
          {{ project.description }}
        </p>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2 py-1 bg-neo-primary/10 border border-neo-primary text-neo-primary text-xs font-mono"
          >
            {{ tag }}
          </span>
        </div>
        
        <!-- Metrics -->
        <div v-if="project.metrics" class="grid grid-cols-3 gap-2 mb-4">
          <div
            v-for="(value, key) in project.metrics"
            :key="key"
            class="text-center"
          >
            <p class="text-xs text-border/50 font-mono">{{ key }}</p>
            <p class="text-sm font-bold text-neo-primary">{{ value }}</p>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-2">
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 text-center px-4 py-2 bg-neo-primary text-white font-mono text-sm font-bold border-2 border-neo-black transition-all duration-150"
          >
            {{ $t('projects.viewProject') }}
          </a>
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 text-center px-4 py-2 bg-neo-bg text-neo-black font-mono text-sm font-bold border-2 border-neo-black transition-all duration-150"
          >
            {{ $t('projects.viewCode') }}
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getProjects } = useLocalizedContent()
const { locale } = useI18n()

// Obtener proyectos con reactivity al cambio de idioma
const { data: projects, pending, error, refresh } = await useAsyncData(
  `projects-${locale.value}`,
  () => getProjects(),
  {
    watch: [locale]
  }
)

// Recargar cuando cambie el idioma
watch(locale, () => {
  refresh()
})
</script>

<style scoped>
.neo-card {
  border: 2px solid #18181b;
  box-shadow: 4px 4px 0px 0px rgba(24, 24, 27, 1);
  transition: all 0.15s ease;
}

.neo-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px rgba(24, 24, 27, 1);
}
</style>


<template>
  <div v-if="Object.keys(metricsObject).length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
    <div
      v-for="(value, key) in metricsObject"
      :key="key"
      class="bg-surface border-2 border-border shadow-neo-sm rounded-none p-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150"
    >
      <div class="font-mono text-xs text-border/70 uppercase tracking-wider mb-2">
        {{ key }}
      </div>
      <div class="text-2xl font-bold font-sans text-accent">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useRoute } from '#imports'

interface Props {
  metrics?: string | Record<string, string>
}

const props = defineProps<Props>()

const route = useRoute()

// Obtener métricas del proyecto actual
const { data: projectMetrics } = await useAsyncData(
  `project-metrics-${route.params.slug}`,
  async () => {
    const slug = Array.isArray(route.params.slug) 
      ? route.params.slug.join('/') 
      : route.params.slug
    
    const projects = await queryCollection('projects', {
      where: [{ _path: { $contains: slug } }]
    })
    
    return projects[0]?.metrics || {}
  },
  { default: () => ({}) }
)

const metricsObject = computed(() => {
  // Prioridad: props > datos del documento
  if (props.metrics) {
    if (typeof props.metrics === 'string') {
      try {
        return JSON.parse(props.metrics)
      } catch {
        return {}
      }
    }
    return props.metrics
  }
  
  return projectMetrics.value || {}
})
</script>

<template>
  <div
    class="terminal-log group cursor-pointer transition-all duration-200"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <!-- Línea principal del log -->
    <div class="flex flex-wrap items-start gap-1 py-1 px-1 rounded-none">
      <span class="text-gray-500">[</span>
      <span class="text-cyan-400 font-semibold">{{ experience.date }}</span>
      <span class="text-gray-500">]</span>
      <span class="text-white ml-2">Executing process:</span>
      <span class="text-green-400 font-semibold">{{ experience.company }}</span>
      <span class="text-white">...</span>
      <span class="text-white ml-2">Status:</span>
      <span
        :class="[
          'font-semibold',
          experience.status === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'
        ]"
      >
        {{ experience.status }}
      </span>
    </div>

    <!-- Detalles expandidos (acordeón) -->
    <div
      :class="[
        'overflow-hidden transition-all duration-300 ease-in-out',
        isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
      ]"
    >
      <div class="ml-4 pl-4 border-l-2 border-cyan-400/40 space-y-3 py-2">
        <!-- Información del rol -->
        <div class="flex flex-wrap items-center gap-1">
          <span class="text-cyan-400 font-semibold">"Role":</span>
          <span class="text-green-400">"{{ experience.role }}"</span>
        </div>

        <!-- Tecnologías -->
        <div>
          <div class="flex flex-wrap items-center gap-1 mb-2">
            <span class="text-cyan-400 font-semibold">"Technologies":</span>
            <span class="text-gray-500">[</span>
          </div>
          <div class="flex flex-wrap gap-2 ml-4">
            <span
              v-for="(tech, idx) in experience.technologies"
              :key="idx"
              class="text-green-400 bg-green-400/10 px-2 py-1 border border-green-400/40 rounded-none text-xs font-mono"
            >
              "{{ tech }}"
            </span>
          </div>
          <span class="text-gray-500 ml-4">]</span>
        </div>

        <!-- Descripción -->
        <div class="mt-2">
          <div class="flex flex-wrap items-start gap-1">
            <span class="text-cyan-400 font-semibold">"Description":</span>
            <span class="text-green-400 text-xs leading-relaxed">
              "{{ experience.description }}"
            </span>
          </div>
        </div>

        <!-- Separador visual -->
        <div class="text-gray-600 mt-3 text-xs">─────────────────────────────────</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  experience: {
    date: string
    company: string
    role: string
    status: 'ACTIVE' | 'COMPLETED'
    technologies: string[]
    description: string
  }
  index: number
}

const props = defineProps<Props>()

const isExpanded = ref(false)
</script>

<style scoped>
.terminal-log {
  border-radius: 0;
}

.terminal-log:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

/* Efecto de cursor parpadeante en el prompt */
@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-pulse {
  animation: blink 1s infinite;
}

/* Scrollbar personalizado para la terminal */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar {
  width: 6px;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>


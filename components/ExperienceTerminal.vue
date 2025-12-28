<template>
  <BentoCard :col-span="2" :row-span="2">
    <div class="h-full flex flex-col bg-[#1a1a1a] rounded-none overflow-hidden">
      <!-- Barra de título de la terminal -->
      <div class="bg-border text-white px-4 py-2 flex items-center gap-2 font-mono text-sm border-b-2 border-border">
        <div class="flex gap-2">
          <span class="w-3 h-3 bg-red-500 border border-border rounded-none"></span>
          <span class="w-3 h-3 bg-yellow-500 border border-border rounded-none"></span>
          <span class="w-3 h-3 bg-green-500 border border-border rounded-none"></span>
        </div>
        <span class="ml-2">root@alex-portfolio:~</span>
      </div>

      <!-- Contenido de la terminal -->
      <div class="flex-1 p-4 overflow-y-auto font-mono text-sm bg-[#1a1a1a]">
        <!-- Prompt inicial -->
        <div class="mb-4">
          <span class="text-green-400">root@alex-portfolio</span>
          <span class="text-white">:</span>
          <span class="text-blue-400">~</span>
          <span class="text-white">$</span>
          <span class="text-white ml-2">cat experience.log</span>
        </div>

        <!-- Logs de experiencia -->
        <div class="space-y-2">
          <ExperienceLog
            v-for="(experience, index) in experiences"
            :key="index"
            :experience="experience"
            :index="index"
          />
        </div>

        <!-- Prompt final -->
        <div class="mt-4">
          <span class="text-green-400">root@alex-portfolio</span>
          <span class="text-white">:</span>
          <span class="text-blue-400">~</span>
          <span class="text-white">$</span>
          <span class="text-white ml-2 animate-pulse">_</span>
        </div>
      </div>
    </div>
  </BentoCard>
</template>

<script setup lang="ts">
interface Experience {
  date: string
  company: string
  role: string
  status: 'ACTIVE' | 'COMPLETED'
  technologies: string[]
  description: string
}

const experiences: Experience[] = [
  {
    date: '2024-11-01',
    company: 'BISITE_RESEARCH_GROUP',
    role: 'Full Stack Engineer',
    status: 'ACTIVE',
    technologies: ['Blockchain', 'IoT', 'Testing', 'Vue.js', 'Laravel', 'Solidity'],
    description: 'Desarrollo de soluciones blockchain e IoT para proyectos de investigación. Implementación de testing automatizado y arquitectura de microservicios.'
  },
  {
    date: '2023-06-15',
    company: 'TICCYL',
    role: 'Frontend Developer',
    status: 'COMPLETED',
    technologies: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
    description: 'Desarrollo frontend de aplicaciones web modernas. Implementación de componentes reutilizables y optimización de rendimiento.'
  },
  {
    date: '2022-03-01',
    company: 'NTT_DATA',
    role: 'Software Engineer',
    status: 'COMPLETED',
    technologies: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL'],
    description: 'Desarrollo backend de sistemas empresariales. Implementación de APIs RESTful y arquitectura de microservicios en la nube.'
  }
]
</script>


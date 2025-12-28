<template>
  <div class="min-h-screen flex flex-col content-layer">
    <!-- Navbar con glassmorphism y bordes duros -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-surface/80 backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <NuxtLink
            to="/"
            class="text-xl font-bold font-sans text-border hover:text-accent transition-colors"
            aria-label="Ir al inicio"
          >
            Alex Rubio
          </NuxtLink>


          <!-- Navigation Links -->
          <!-- <ul class="flex items-center gap-6 font-mono text-sm">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-accent transition-colors"
                aria-label="Página de inicio"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="hover:text-accent transition-colors"
                aria-label="Proyectos"
              >
                Projects
              </NuxtLink>
            </li>
          </ul> -->
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <!-- Footer estilo IDE - Barra de estado de sistema -->
    <footer
      class="border-t-2 border-border bg-surface/90 backdrop-blur-sm font-mono text-xs"
      role="contentinfo"
      aria-label="Información del sistema"
    >
      <div class="container mx-auto px-4 py-2">
        <div class="flex items-center justify-between">
          <!-- Ruta actual -->
          <div class="flex items-center gap-2">
            <span class="text-accent">$</span>
            <span class="text-border/70">pwd</span>
            <span class="text-border">:</span>
            <span class="text-accent font-semibold">{{ currentPath }}</span>
          </div>

          <!-- Estado del sistema -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-none border border-border"></span>
              <span class="text-border/70">Sistema:</span>
              <span class="text-green-600 dark:text-green-400 font-semibold">Operativo</span>
            </div>
            <div class="text-border/50">
              {{ currentYear }}
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Ruta actual para el footer
const currentPath = computed(() => {
  return route.path === '/' ? '/home' : route.path
})

// Año actual
const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style scoped>
/* Asegurar que el navbar tenga el efecto glassmorphism correcto */
nav {
  background: rgba(255, 255, 255, 0.8);
}

@media (prefers-color-scheme: dark) {
  nav {
    background: rgba(42, 42, 42, 0.8);
  }
}
</style>


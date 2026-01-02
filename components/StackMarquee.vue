<template>
  <BentoCard :col-span="2" :row-span="1">
    <div class="p-4 md:p-6 overflow-hidden relative flex flex-col h-[500px] md:h-auto w-full">
      <h3 class="text-xs font-mono text-border/70 mb-3 uppercase tracking-wider md:mb-4">
        {{ $t('stack.title') }}
      </h3>
      
      <!-- Desktop: Horizontal -->
      <div class="hidden md:flex relative flex-1 overflow-hidden bg-surface items-center justify-center">
        <!-- Gradientes laterales para efecto fade -->
        <div class="absolute -left-px top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-surface to-transparent"></div>
        <div class="absolute -right-px top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-surface to-transparent"></div>
        
        <!-- Marquee container horizontal -->
        <div class="marquee-container-horizontal flex items-center gap-8 py-4">
          <!-- Múltiples copias para loop suave -->
          <div class="marquee-content flex items-center gap-8">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
          <div class="marquee-content flex items-center gap-8" aria-hidden="true">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
          <div class="marquee-content flex items-center gap-8" aria-hidden="true">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
        </div>
      </div>

      <!-- Mobile: Vertical -->
      <div class="md:hidden relative overflow-hidden flex-1 bg-surface flex items-center justify-center py-4">
        <!-- Gradientes superior e inferior para efecto fade -->
        <div class="absolute left-0 right-0 -top-px h-24 z-10 pointer-events-none bg-gradient-to-b from-surface to-transparent"></div>
        <div class="absolute left-0 right-0 -bottom-px h-24 z-10 pointer-events-none bg-gradient-to-t from-surface to-transparent"></div>
        
        <!-- Marquee container vertical -->
        <div class="marquee-container-vertical flex flex-col items-center gap-8 py-4">
          <!-- Múltiples copias para loop suave -->
          <div class="marquee-content-vertical flex flex-col items-center gap-8">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
          <div class="marquee-content-vertical flex flex-col items-center gap-8" aria-hidden="true">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
          <div class="marquee-content-vertical flex flex-col items-center gap-8" aria-hidden="true">
            <StackIcon name="Vue" />
            <StackIcon name="Nuxt" />
            <StackIcon name="Laravel" />
            <StackIcon name="Java" />
            <StackIcon name="Docker" />
            <StackIcon name="Solidity" />
          </div>
        </div>
      </div>
    </div>
  </BentoCard>
</template>

<script setup lang="ts">
// Stack Marquee Component
</script>

<style scoped>
/* Horizontal marquee (Desktop) */
.marquee-container-horizontal {
  animation: marquee-horizontal 20s linear infinite;
  width: fit-content;
}

.marquee-content {
  flex-shrink: 0;
}

@keyframes marquee-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

/* Vertical marquee (Mobile) */
.marquee-container-vertical {
  animation: marquee-vertical 20s linear infinite;
  height: fit-content;
}

.marquee-content-vertical {
  flex-shrink: 0;
}

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% / 3));
  }
}

/* Pausar animación en hover solo en desktop (horizontal) */
@media (min-width: 768px) {
  .marquee-container-horizontal:hover {
    animation-play-state: paused;
  }
}

/* En móvil (vertical), la animación nunca se pausa, incluso con hover */
.marquee-container-vertical:hover {
  /* No hacer nada - la animación continúa siempre en móvil */
}
</style>


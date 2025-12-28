<template>
  <div
    :class="[
      'bg-surface border-2 border-border shadow-neo rounded-none transition-all duration-150 ease-out h-full flex items-center',
      hoverClass
    ]"
    :style="gridStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  colSpan?: number
  rowSpan?: number
}

const props = withDefaults(defineProps<Props>(), {
  colSpan: 1,
  rowSpan: 1
})

const isHovered = ref(false)

const gridStyle = computed(() => {
  return {
    gridColumn: `span ${props.colSpan}`,
    gridRow: `span ${props.rowSpan}`
  }
})

const hoverClass = computed(() => {
  return isHovered.value
    ? 'translate-x-[2px] translate-y-[2px] shadow-none'
    : ''
})
</script>

<style scoped>
/* Asegurar que la transición sea suave */
.transition-all {
  will-change: transform, box-shadow;
}
</style>


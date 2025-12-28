<template>
  <span
    class="inline-flex items-center px-3 py-1 bg-surface border-2 border-border shadow-neo-sm rounded-none font-mono text-xs text-border"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>


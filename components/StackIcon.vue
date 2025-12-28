<template>
  <div
    class="flex flex-col items-center justify-center gap-3 min-w-[75px] md:min-w-[90px]"
    :aria-label="`${name} icon`"
  >
    <Icon
      :name="iconName"
      class="w-32 h-32 md:w-16 md:h-16 text-border"
      aria-hidden="true"
    />
    <span class="text-base md:text-sm font-mono text-border/70 uppercase font-semibold">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
}

const props = defineProps<Props>()

const iconMap: Record<string, string> = {
  Vue: 'logos:vue',
  Nuxt: 'logos:nuxt-icon',
  Laravel: 'logos:laravel',
  Java: 'logos:java',
  Docker: 'logos:docker-icon',
  Solidity: 'logos:solidity'
}

const iconName = computed(() => {
  return iconMap[props.name] || 'mdi:code-tags'
})
</script>


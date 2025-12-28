<template>
  <div class="language-switcher">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="switchLanguage(locale.code)"
      :class="[
        'lang-btn',
        { 'active': currentLocale === locale.code }
      ]"
      :aria-label="$t('aria.switchLanguage', { language: locale.name })"
      :aria-pressed="currentLocale === locale.code"
    >
      <span class="flag" aria-hidden="true">{{ locale.flag }}</span>
      <span class="text">{{ locale.code.toUpperCase() }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string; iso: string }>).map(loc => ({
    ...loc,
    flag: loc.code === 'es' ? '🇪🇸' : '🇬🇧'
  }))
})

const switchLanguage = async (code: string) => {
  await setLocale(code)
  
  // Usar switchLocalePath para cambiar la ruta
  const path = switchLocalePath(code)
  await router.push(path)
}
</script>

<style scoped>
.language-switcher {
  @apply flex gap-2;
}

.lang-btn {
  @apply flex items-center gap-2 px-3 py-2 bg-neo-bg border-2 border-neo-black text-neo-black font-mono font-bold transition-all duration-150 text-sm;
  box-shadow: 2px 2px 0px 0px rgba(24, 24, 27, 1);
}

.lang-btn:hover {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px 0px rgba(24, 24, 27, 1);
}

.lang-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.lang-btn.active {
  @apply bg-neo-primary text-white border-neo-black;
}

.flag {
  @apply text-base;
}

.text {
  @apply text-xs;
}
</style>


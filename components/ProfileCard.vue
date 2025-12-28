<template>
  <div class="neo-card bg-white p-6 h-full flex flex-col items-center justify-center">
    <!-- Avatar -->
    <div class="mb-6">
      <div class="w-40 h-40 border-4 border-neo-black bg-neo-bg flex items-center justify-center overflow-hidden">
        <Icon 
          name="mdi:account-circle" 
          class="w-full h-full text-neo-black"
          :aria-label="$t('profile.imageAlt')"
          role="img"
        />
      </div>
    </div>

    <!-- Name -->
    <h1 class="text-3xl font-bold font-mono text-neo-black mb-2 text-center tracking-tight">
      {{ $t('profile.name') }}
    </h1>

    <!-- Role -->
    <div class="bg-neo-black text-neo-bg px-4 py-2 mb-6">
      <p class="font-mono text-sm font-bold text-center">
        {{ $t('profile.role') }}
      </p>
    </div>

    <!-- Location & Status -->
    <div class="flex flex-col gap-2 mb-6 w-full">
      <div class="flex items-center gap-2 text-sm font-mono">
        <MapPin :size="16" class="text-neo-primary" />
        <span class="text-neo-black">{{ $t('profile.location') }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm font-mono">
        <Briefcase :size="16" class="text-neo-primary" />
        <span class="text-neo-black">{{ $t('profile.organization') }}</span>
      </div>
    </div>

    <!-- Social Badges -->
    <div class="flex flex-col gap-3 w-full">
      <a
        href="https://github.com/Alexrb11"
        target="_blank"
        rel="noopener noreferrer"
        class="neo-button"
        aria-label="GitHub Profile"
      >
        <Github :size="20" />
        <span class="font-mono font-bold">{{ $t('profile.buttons.github') }}</span>
      </a>
      
      <a
        href="https://www.linkedin.com/in/alexrubiobravo/"
        target="_blank"
        rel="noopener noreferrer"
        class="neo-button"
        aria-label="LinkedIn Profile"
      >
        <Linkedin :size="20" />
        <span class="font-mono font-bold">{{ $t('profile.buttons.linkedin') }}</span>
      </a>
      
      <a
        href="mailto:contact@lxr.es"
        class="neo-button"
        aria-label="Email Contact"
      >
        <Mail :size="20" />
        <span class="font-mono font-bold">{{ $t('profile.buttons.email') }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-vue-next'
</script>

<style scoped>
.neo-card {
  border: 2px solid #18181b;
  box-shadow: 4px 4px 0px 0px rgba(24, 24, 27, 1);
}

.neo-button {
  @apply flex items-center justify-center gap-3 px-4 py-3 bg-neo-bg border-2 border-neo-black text-neo-black font-mono font-bold transition-all duration-150;
  box-shadow: 4px 4px 0px 0px rgba(24, 24, 27, 1);
}

.neo-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px rgba(24, 24, 27, 1);
}

.neo-button:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
</style>

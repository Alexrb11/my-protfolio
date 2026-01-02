<template>
  <BentoCard :col-span="1" :row-span="1">
    <div class="p-6 h-full flex flex-col items-center justify-center gap-4">
      <h3 class="text-sm font-mono text-border/70 mb-2 uppercase tracking-wider">
        Connect
      </h3>
      <div class="flex flex-col gap-4 w-full">
        <a
          href="https://github.com/Alexrb11"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 p-4 bg-surface border-2 border-border shadow-neo-sm rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 ease-out"
          :aria-label="$t('profile.buttons.github') + ' - ' + $t('profile.name')"
        >
          <Icon
            name="mdi:github"
            class="w-12 h-12 text-border"
            aria-hidden="true"
          />
          <span class="font-mono text-border font-semibold">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/alexrubiobravo/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 p-4 bg-surface border-2 border-border shadow-neo-sm rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 ease-out"
          :aria-label="$t('profile.buttons.linkedin') + ' - ' + $t('profile.name')"
        >
          <Icon
            name="mdi:linkedin"
            class="w-12 h-12 text-border"
            aria-hidden="true"
          />
          <span class="font-mono text-border font-semibold">LinkedIn</span>
        </a>
      </div>
    </div>
  </BentoCard>
</template>

<script setup lang="ts">
// Socials Card Component
</script>


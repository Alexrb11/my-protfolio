<template>
  <div class="neo-card bg-neo-black flex flex-col h-full max-h-[700px]">
    <!-- Terminal Title Bar -->
    <div class="bg-neo-bg border-b-2 border-neo-black px-4 py-2 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 bg-neo-secondary border border-neo-black"></div>
          <div class="w-3 h-3 bg-yellow-400 border border-neo-black"></div>
          <div class="w-3 h-3 bg-neo-primary border border-neo-black"></div>
        </div>
        <Terminal :size="16" class="text-neo-black ml-2" />
        <span class="font-mono text-sm font-bold text-neo-black">{{ $t('terminal.title') }}</span>
      </div>
      <button
        @click="handleClear"
        class="text-neo-black hover:text-neo-secondary transition-colors"
        :aria-label="$t('aria.clearTerminal')"
        type="button"
      >
        <X :size="18" aria-hidden="true" />
      </button>
    </div>

    <!-- Terminal Output Area -->
    <div
      ref="outputContainer"
      class="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm"
      aria-live="polite"
      aria-atomic="false"
      @click="handleTerminalClick"
    >
      <!-- Welcome Message -->
      <div v-if="terminalStore.history.length === 0" class="text-neo-primary">
        <!-- Desktop: ASCII art completo -->
        <pre class="hidden md:block whitespace-pre text-xs md:text-sm overflow-x-auto font-mono">{{ $t('terminal.welcome.line1') }}
{{ $t('terminal.welcome.line2') }}
{{ $t('terminal.welcome.line3') }}
{{ $t('terminal.welcome.line4') }}
{{ $t('terminal.welcome.line5') }}
{{ $t('terminal.welcome.line6') }}
{{ $t('terminal.welcome.line7') }}</pre>
        <!-- Mobile: Versión simplificada sin caracteres de caja -->
        <div class="md:hidden border-2 border-dashed border-neo-primary p-4 text-center">
          <p class="text-neo-primary font-mono text-sm mb-2">{{ $t('header.name') }}</p>
          <p class="text-neo-primary font-mono text-xs">{{ $t('header.role') }}</p>
        </div>
        <p class="mt-4 text-neo-bg text-xs md:text-sm font-mono">{{ $t('terminal.welcome.hint') }}</p>
      </div>

      <!-- History -->
      <div
        v-for="(entry, index) in terminalStore.history"
        :key="index"
        class="terminal-entry"
      >
        <!-- Command -->
        <div v-if="entry.type === 'command'" class="flex items-start gap-2">
          <span class="text-neo-primary">➜</span>
          <span class="text-neo-bg">~</span>
          <span class="text-neo-bg">{{ entry.content }}</span>
        </div>

        <!-- Output -->
        <div
          v-else-if="entry.type === 'output'"
          class="text-neo-bg whitespace-pre-wrap pl-6"
          :class="{ 'typing-animation': isTyping && index === terminalStore.history.length - 1 }"
        >
          <span v-if="isTyping && index === terminalStore.history.length - 1">
            {{ typedContent }}
          </span>
          <span v-else>{{ entry.content }}</span>
        </div>

        <!-- Error -->
        <div v-else-if="entry.type === 'error'" class="text-neo-secondary pl-6 whitespace-pre-wrap">
          {{ entry.content }}
        </div>
      </div>
    </div>

    <!-- Terminal Input Area -->
    <div class="border-t-2 border-neo-black bg-neo-black px-4 py-3 flex-shrink-0">
      <form @submit.prevent="handleSubmit" class="flex items-center gap-2 mb-3">
        <span class="text-neo-primary font-mono">➜</span>
        <span class="text-neo-bg font-mono">~</span>
        <input
          ref="inputRef"
          v-model="terminalStore.currentInput"
          type="text"
          :disabled="terminalStore.isExecuting"
          class="flex-1 bg-transparent text-neo-bg font-mono outline-none caret-neo-primary disabled:opacity-50 disabled:cursor-not-allowed"
          :placeholder="$t('terminal.placeholder')"
          autocomplete="off"
          spellcheck="false"
          @keydown.up.prevent="handleHistoryUp"
          @keydown.down.prevent="handleHistoryDown"
          @focus="() => {}"
          aria-label="Terminal command input"
        />
      </form>

      <!-- Quick Commands -->
      <div class="border-t border-neo-bg/20 pt-3">
        <p class="font-mono text-[10px] text-neo-bg/50 mb-2 uppercase tracking-wider">{{ $t('terminal.quickCommands') }}</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cmd in quickCommands"
            :key="cmd"
            @click="executeQuickCommand(cmd)"
            :disabled="terminalStore.isExecuting"
            class="quick-cmd-btn disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-label="`${$t(`terminal.commands.${cmd}`)}`"
            type="button"
          >
            {{ cmd }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import { Terminal, X } from 'lucide-vue-next'
import { useTerminal } from '~/composables/useTerminal'

const terminalStore = useTerminal()
const { locale } = useI18n()

const outputContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const quickCommands = ['about', 'stack', 'experience', 'contact', 'help', 'clear']

const executeQuickCommand = (command: string) => {
  terminalStore.currentInput = command
  terminalStore.executeCommand(command)
}

// Typing animation state
const isTyping = ref(false)
const typedContent = ref('')
const typingSpeed = 10 // milliseconds per character

// Typing animation
const typeText = async (text: string) => {
  isTyping.value = true
  typedContent.value = ''
  
  for (let i = 0; i < text.length; i++) {
    typedContent.value += text[i]
    await new Promise(resolve => setTimeout(resolve, typingSpeed))
    // Hacer scroll mientras se escribe
    scrollToBottom()
  }
  
  isTyping.value = false
  // Desbloquear ejecución de comandos cuando termine la animación
  terminalStore.finishExecution()
  // Scroll final
  await nextTick()
  scrollToBottom()
}

// Watch for new output entries
watch(
  () => terminalStore.history.length,
  async (newLength, oldLength) => {
    if (newLength > oldLength) {
      const lastEntry = terminalStore.history[newLength - 1]
      
      if (lastEntry.type === 'output' && lastEntry.content) {
        await typeText(lastEntry.content)
      } else if (lastEntry.type === 'error') {
        // Para errores, desbloquear inmediatamente
        terminalStore.finishExecution()
      }
      
      await nextTick()
      scrollToBottom()
    }
  }
)

// Watch for locale changes to update terminal translations
watch(
  () => locale.value,
  async () => {
    // Actualizar traducciones del historial existente
    terminalStore.updateTranslations()
    await nextTick()
    scrollToBottom()
  }
)

const scrollToBottom = () => {
  if (outputContainer.value) {
    outputContainer.value.scrollTop = outputContainer.value.scrollHeight
  }
}

const handleSubmit = () => {
  if (terminalStore.currentInput.trim()) {
    terminalStore.executeCommand(terminalStore.currentInput)
  }
}

const handleClear = () => {
  terminalStore.clearHistory()
}

const handleHistoryUp = () => {
  terminalStore.navigateHistory('up')
}

const handleHistoryDown = () => {
  terminalStore.navigateHistory('down')
}

// Detectar si es móvil
const isMobile = ref(false)

// Verificar si es móvil al montar
onMounted(() => {
  isMobile.value = globalThis.innerWidth < 768 || 'ontouchstart' in globalThis
  
  // Solo auto-enfocar en desktop, no en móvil
  if (!isMobile.value) {
    inputRef.value?.focus()
  }
})

// Keep input focused (solo en desktop)
const keepFocus = () => {
  // No enfocar automáticamente en móvil para evitar que aparezca el teclado
  if (!isMobile.value) {
    inputRef.value?.focus()
  }
}

// Re-focus on click anywhere in terminal (solo en desktop)
const handleTerminalClick = (event: MouseEvent) => {
  // Solo enfocar si el click fue directamente en el contenedor de la terminal
  // y no en un botón u otro elemento interactivo
  const target = event.target as HTMLElement
  if (target.tagName !== 'BUTTON' && target.tagName !== 'A' && !isMobile.value) {
    keepFocus()
  }
}
</script>

<style scoped>
.neo-card {
  border: 2px solid #18181b;
  box-shadow: 4px 4px 0px 0px rgba(24, 24, 27, 1);
}

.terminal-entry {
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typing-animation {
  position: relative;
}

.typing-animation::after {
  content: '▋';
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Hide scrollbar */
.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Quick command buttons */
.quick-cmd-btn {
  @apply px-2 py-1 bg-neo-bg/10 border border-neo-bg/30 text-neo-bg font-mono text-[10px] font-bold transition-all duration-150 uppercase;
}

.quick-cmd-btn:hover {
  background-color: rgba(34, 211, 238, 0.2);
  border-color: #22d3ee;
  color: #22d3ee;
}

.quick-cmd-btn:active {
  transform: scale(0.95);
}
</style>


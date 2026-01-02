import { defineStore } from 'pinia'

export interface TerminalEntry {
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: number
  command?: string // Comando que generó este output (para actualizar traducciones)
}

export const useTerminalStore = defineStore('terminal', {
  state: () => ({
    history: [] as TerminalEntry[],
    currentInput: '',
    commandHistory: [] as string[],
    historyIndex: -1,
    isExecuting: false
  }),

  actions: {
    addEntry(type: TerminalEntry['type'], content: string, command?: string) {
      this.history.push({
        type,
        content,
        timestamp: Date.now(),
        command
      })
    },

    executeCommand(command: string) {
      const trimmedCommand = command.trim()
      
      if (!trimmedCommand || this.isExecuting) return

      // Bloquear ejecución de nuevos comandos
      this.isExecuting = true

      // Agregar comando al historial
      this.addEntry('command', trimmedCommand)
      this.commandHistory.push(trimmedCommand)
      this.historyIndex = this.commandHistory.length

      // Parsear y ejecutar comando
      const [cmd] = trimmedCommand.toLowerCase().split(' ')
      
      const output = this.getCommandOutput(cmd)
      // Guardar el comando para poder actualizar traducciones después
      this.addEntry(output.type, output.content, cmd)

      // Limpiar input
      this.currentInput = ''
    },

    finishExecution() {
      this.isExecuting = false
    },

    getCommandOutput(cmd: string): { type: 'output' | 'error', content: string } {
      // Obtener i18n instance
      const { $i18n } = useNuxtApp()
      const t = $i18n.t.bind($i18n)
      
      const commands: Record<string, () => { type: 'output' | 'error', content: string }> = {
        about: () => ({
          type: 'output',
          content: t('terminal.responses.about')
        }),

        stack: () => ({
          type: 'output',
          content: t('terminal.responses.stack')
        }),

        experience: () => ({
          type: 'output',
          content: t('terminal.responses.experience')
        }),

        contact: () => ({
          type: 'output',
          content: t('terminal.responses.contact')
        }),

        clear: () => {
          this.history = []
          return {
            type: 'output',
            content: ''
          }
        },

        help: () => ({
          type: 'output',
          content: t('terminal.responses.help')
        }),

        ls: () => ({
          type: 'output',
          content: 'about.txt  stack.json  experience.log  contact.md  README.md'
        }),

        whoami: () => ({
          type: 'output',
          content: 'alex@portfolio'
        })
      }

      const commandFn = commands[cmd]
      
      if (!commandFn) {
        return {
          type: 'error',
          content: t('terminal.responses.error', { command: cmd })
        }
      }

      return commandFn()
    },

    navigateHistory(direction: 'up' | 'down') {
      if (this.commandHistory.length === 0) return

      if (direction === 'up') {
        if (this.historyIndex > 0) {
          this.historyIndex--
          this.currentInput = this.commandHistory[this.historyIndex]
        }
      } else {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++
          this.currentInput = this.commandHistory[this.historyIndex]
        } else {
          this.historyIndex = this.commandHistory.length
          this.currentInput = ''
        }
      }
    },

    clearHistory() {
      this.history = []
    },

    // Actualizar traducciones del historial cuando cambia el idioma
    updateTranslations() {
      const { $i18n } = useNuxtApp()
      const t = $i18n.t.bind($i18n)
      
      this.history.forEach((entry) => {
        // Solo actualizar outputs que tienen un comando asociado
        if (entry.type === 'output' && entry.command) {
          const output = this.getCommandOutput(entry.command)
          entry.content = output.content
        } else if (entry.type === 'error') {
          // Actualizar mensajes de error (buscar patrón en cualquier idioma)
          const errorPattern = /(?:Comando no encontrado|Command not found):\s*(\w+)/
          const match = errorPattern.exec(entry.content)
          if (match && match[1]) {
            const cmd = match[1]
            entry.content = t('terminal.responses.error', { command: cmd })
          }
        }
      })
    }
  }
})

export const useTerminal = () => {
  const store = useTerminalStore()
  return store
}


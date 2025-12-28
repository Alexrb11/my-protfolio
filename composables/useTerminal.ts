import { defineStore } from 'pinia'

export interface TerminalEntry {
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: number
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
    addEntry(type: TerminalEntry['type'], content: string) {
      this.history.push({
        type,
        content,
        timestamp: Date.now()
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
      this.addEntry(output.type, output.content)

      // Limpiar input
      this.currentInput = ''
    },

    finishExecution() {
      this.isExecuting = false
    },

    getCommandOutput(cmd: string): { type: 'output' | 'error', content: string } {
      const commands: Record<string, () => { type: 'output' | 'error', content: string }> = {
        about: () => ({
          type: 'output',
          content: `╔═══════════════════════════════════════════════════════════════╗
║                    ALEX RUBIO BRAVO                      ║
║          Full-Stack Developer & QA Specialist            ║
╚═══════════════════════════════════════════════════════════════╝

📍 Actualmente en: Grupo de Investigación BISITE
🎯 Enfoque: Blockchain, IoT y Código Limpio
💼 Rol: Desarrollo Full-Stack y Aseguramiento de Calidad

Apasionado por construir aplicaciones robustas y escalables con
tecnologías modernas. Experiencia en desarrollo frontend y backend,
con un fuerte enfoque en testing y calidad de código.

Escribe 'stack' para ver mi stack tecnológico
Escribe 'experience' para ver mi historial laboral
Escribe 'contact' para información de contacto`
        }),

        stack: () => ({
          type: 'output',
          content: `╔═══════════════════════════════════════════════════════════════╗
║                       TECH STACK                         ║
╚═══════════════════════════════════════════════════════════════╝

🎨 FRONTEND
   • Vue.js (Composition API, Vue 3)
   • Livewire
   • Tailwind CSS
   • HTML5 & CSS3
   • JavaScript/TypeScript

⚙️  BACKEND
   • Laravel
   • Java (Spring Boot)
   • .NET
   • Express.js
   • TypeScript (Node.js)

🗄️  BASE DE DATOS
   • MySQL (Relacional)
   • MongoDB (NoSQL)

🛠️  HERRAMIENTAS Y METODOLOGÍAS
   • Git (Control de Versiones)
   • Jira (Gestión de Proyectos)
   • Terminal Linux
   • Sourcetree
   • Agile/Scrum

🔗 BLOCKCHAIN Y TECNOLOGÍAS EMERGENTES
   • Solidity
   • Integración IoT
   • Smart Contracts`
        }),

        experience: () => ({
          type: 'output',
          content: `╔═══════════════════════════════════════════════════════════════╗
║                   EXPERIENCIA LABORAL                    ║
╚═══════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────┐
│ 2025 - PRESENTE                                      │
│ GRUPO DE INVESTIGACIÓN BISITE                        │
│ Full-Stack Developer & QA Specialist                 │
└───────────────────────────────────────────────────────────┘

• Desarrollo de funcionalidades backend con Express y TypeScript
• Modelado de bases de datos NoSQL (MongoDB)
• Implementación de interfaces en Vue.js
• Testing y aseguramiento de calidad
• Trabajo en equipo Blockchain
• Integración de sistemas IoT

┌───────────────────────────────────────────────────────────┐
│ 2023 - 2024                                          │
│ TICCYL DIGITAL                                       │
│ Desarrollador Web                                    │
└───────────────────────────────────────────────────────────┘

• Desarrollo web con Laravel y Livewire
• Gestión de bases de datos MySQL
• Control de versiones con Sourcetree y Jira
• Implementación de funcionalidades frontend/backend
• Trabajo en equipo ágil

┌───────────────────────────────────────────────────────────┐
│ 2023                                                 │
│ NTT DATA                                             │
│ Prácticas - Desarrollador de Software                │
└───────────────────────────────────────────────────────────┘

• Formación en proyecto Murex
• Scripts con terminal Linux
• Aprendizaje de metodologías empresariales
• Trabajo con sistemas legacy`
        }),

        contact: () => ({
          type: 'output',
          content: `╔═══════════════════════════════════════════════════════════════╗
║                INFORMACIÓN DE CONTACTO                   ║
╚═══════════════════════════════════════════════════════════════╝

 Email:    contact@lxr.es
 Website:  www.lxr.es
 LinkedIn: linkedin.com/in/alexrubiobravo
 GitHub:   github.com/Alexrb11

¡No dudes en contactarme para colaboraciones, oportunidades
o simplemente para conectar!`
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
          content: `╔═══════════════════════════════════════════════════════════════╗
║                   COMANDOS DISPONIBLES                   ║
╚═══════════════════════════════════════════════════════════════╝

about       - Conoce más sobre Alex Rubio Bravo
stack       - Ver habilidades técnicas y tecnologías
experience  - Ver historial laboral y logros
contact     - Obtener información de contacto
clear       - Limpiar la terminal
help        - Mostrar este mensaje de ayuda

CONSEJO: Usa las teclas ↑/↓ para navegar el historial de comandos`
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
      
      if (commandFn) {
        return commandFn()
      }

      return {
        type: 'error',
        content: `Comando no encontrado: ${cmd}\nEscribe 'help' para ver los comandos disponibles.`
      }
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
    }
  }
})

export const useTerminal = () => {
  const store = useTerminalStore()
  return store
}


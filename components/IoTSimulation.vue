<template>
  <BentoCard :col-span="1" :row-span="1">
    <div class="p-6 h-full flex flex-col min-h-[250px]">
      <h3 class="text-sm font-mono text-border/70 mb-4 uppercase tracking-wider">
        Red IoT
      </h3>
      <div class="flex-1 relative min-h-[180px]">
        <canvas
          ref="canvasRef"
          class="w-full h-full border-2 border-border/20 rounded-none"
          aria-label="Simulación de red IoT con nodos conectándose"
        ></canvas>
      </div>
    </div>
  </BentoCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvasWidth = 280
let canvasHeight = 200

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

let nodes: Node[] = []
let animationFrameId: number | null = null

const updateCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const container = canvas.parentElement
  if (!container) return

  const rect = container.getBoundingClientRect()
  canvasWidth = Math.max(200, rect.width - 8) // Restar padding
  canvasHeight = Math.max(150, rect.height - 8)
  
  canvas.width = canvasWidth
  canvas.height = canvasHeight
}

const initNodes = () => {
  nodes = []
  const nodeCount = 8
  
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.8, // Aumentada la velocidad
      vy: (Math.random() - 0.5) * 0.8,
      radius: 5 // Nodos un poco más grandes
    })
  }
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Limpiar canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // Actualizar posiciones
  nodes.forEach(node => {
    node.x += node.vx
    node.y += node.vy

    // Rebote en los bordes
    if (node.x <= node.radius || node.x >= canvasWidth - node.radius) {
      node.vx *= -1
    }
    if (node.y <= node.radius || node.y >= canvasHeight - node.radius) {
      node.vy *= -1
    }

    // Mantener dentro de los límites
    node.x = Math.max(node.radius, Math.min(canvasWidth - node.radius, node.x))
    node.y = Math.max(node.radius, Math.min(canvasHeight - node.radius, node.y))
  })

  // Dibujar conexiones
  ctx.lineWidth = 1.5
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Conectar nodos cercanos (aumentado el rango a 120px)
      if (distance < 120) {
        const opacity = 1 - distance / 100
        // Usar el color accent para las conexiones
        ctx.strokeStyle = `rgba(255, 77, 0, ${opacity * 0.6})`
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  // Dibujar nodos
  ctx.fillStyle = '#FF4D00'
  ctx.strokeStyle = '#121212'
  ctx.lineWidth = 2

  nodes.forEach(node => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  })

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(async () => {
  await nextTick()
  updateCanvasSize()
  initNodes()
  draw()
  
  // Ajustar tamaño en resize
  window.addEventListener('resize', updateCanvasSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasSize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

</script>


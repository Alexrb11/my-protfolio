# Alex Rubio Portfolio 2025

Portfolio profesional construido con Nuxt 3, Tailwind CSS v4 y diseño Neo-Brutalismo.

## 🚀 Tech Stack

- **Nuxt 3** (SSR/SSG)
- **Tailwind CSS v4**
- **Nuxt Content v3**
- **TypeScript**
- **VueUse**
- **Nuxt Icon**
- **Nuxt Fonts**

## 🎨 Sistema de Diseño

### Neo-Brutalismo Estricto

- **Sombras**: Sombras duras con desplazamiento (box-shadow: 4px 4px 0px 0px)
- **Bordes**: border-2 border-black en todos los contenedores
- **Radio**: Sin bordes redondeados (rounded-none)
- **Tipografía**: 
  - Headings: Space Grotesk
  - Metadata/Tags: JetBrains Mono
- **Anti-AI Aesthetic**: Overlay de ruido SVG en el fondo

### Colores

- `--color-bg`: #F2F0E9 (Papel hueso)
- `--color-surface`: #FFFFFF
- `--color-border`: #121212
- `--color-accent`: #FF4D00 (Naranja internacional)

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📄 Generación Estática

```bash
npm run generate
```

## 📝 Estándares de Código

- Uso exclusivo de `<script setup lang="ts">`
- TypeScript estricto
- Estilos con clases de Tailwind (sin @apply a menos que sea necesario)
- Accesibilidad (ARIA labels) en todos los elementos interactivos
- Uso de `queryContent` de Nuxt Content v3 para data fetching


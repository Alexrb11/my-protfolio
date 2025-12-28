# 🌍 Guía Completa de Internacionalización (i18n)

Esta guía documenta la implementación completa de i18n en tu portafolio con Nuxt 3, soportando **Español (es)** e **Inglés (en)**.

## 📋 Tabla de Contenidos

1. [Configuración](#configuración)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Uso en Componentes](#uso-en-componentes)
4. [Integración con Nuxt Content](#integración-con-nuxt-content)
5. [Rutas Localizadas](#rutas-localizadas)
6. [Mejores Prácticas](#mejores-prácticas)

---

## ⚙️ Configuración

### 1. Módulo i18n en `nuxt.config.ts`

El módulo `@nuxtjs/i18n` ya está configurado con las siguientes opciones:

```typescript
i18n: {
  vueI18n: './i18n.config.ts',
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.json'
    },
    {
      code: 'es',
      iso: 'es-ES',
      name: 'Español',
      file: 'es.json'
    }
  ],
  lazy: true,                           // ✅ Carga diferida
  langDir: 'i18n/locales',              // 📁 Carpeta de traducciones
  defaultLocale: 'es',                  // 🇪🇸 Español por defecto
  strategy: 'prefix_except_default',    // 📍 /en/* pero / para español
  detectBrowserLanguage: {              // 🔍 Detección automática
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: false,
    fallbackLocale: 'es'
  }
}
```

### 2. Archivo de Configuración `i18n.config.ts`

```typescript
export default defineI18nConfig(() => ({
  legacy: false,      // Usar Composition API
  locale: 'es',
  messages: {
    en: {},
    es: {}
  }
}))
```

---

## 📁 Estructura de Archivos

```
Portfolio/
├── i18n/
│   └── locales/
│       ├── es.json      # Traducciones español
│       └── en.json      # Traducciones inglés
├── content/
│   ├── es/              # Contenido en español
│   │   └── projects/
│   │       ├── blockchain-iot-platform.md
│   │       └── nuxt-ecommerce.md
│   └── en/              # Contenido en inglés
│       └── projects/
│           ├── blockchain-iot-platform.md
│           └── nuxt-ecommerce.md
├── components/
│   ├── LanguageSwitcher.vue
│   ├── ProjectsList.vue
│   └── ...
├── composables/
│   ├── useLocalizedContent.ts
│   └── useTerminal.ts
└── i18n.config.ts
```

---

## 🎯 Uso en Componentes

### Opción 1: Usar `$t()` en el Template

```vue
<template>
  <div>
    <h1>{{ $t('header.name') }}</h1>
    <p>{{ $t('header.role') }}</p>
  </div>
</template>
```

### Opción 2: Usar el Composable `useI18n()` en Script

```vue
<script setup lang="ts">
const { t, locale } = useI18n()

// Usar en el template
const title = computed(() => t('meta.title'))

// Meta tags localizados
useHead({
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description')
    }
  ]
})
</script>
```

### Opción 3: Interpolación de Variables

En el JSON:
```json
{
  "terminal": {
    "responses": {
      "error": "Comando no encontrado: {command}\nEscribe 'help' para ver los comandos disponibles."
    }
  }
}
```

En el componente:
```vue
<template>
  <p>{{ $t('terminal.responses.error', { command: 'test' }) }}</p>
</template>
```

---

## 📝 Integración con Nuxt Content

### Estrategia: Carpetas Separadas por Idioma

Hemos organizado el contenido en carpetas separadas:

```
content/
├── es/projects/       # Contenido en español
└── en/projects/       # Contenido en inglés
```

### Composable `useLocalizedContent`

Este composable facilita la obtención de contenido según el idioma actual:

```typescript
const { getProjects, getProjectBySlug, getFeaturedProjects } = useLocalizedContent()

// Obtener todos los proyectos en el idioma actual
const projects = await getProjects()

// Obtener solo proyectos destacados
const featured = await getFeaturedProjects()

// Obtener un proyecto específico
const project = await getProjectBySlug('blockchain-iot-platform')

// Filtrar por etiquetas
const blockchainProjects = await getProjects({ 
  tags: ['Blockchain'],
  limit: 5 
})
```

### Ejemplo de Uso en un Componente

```vue
<script setup lang="ts">
const { getProjects } = useLocalizedContent()
const { locale } = useI18n()

// Se actualiza automáticamente al cambiar el idioma
const { data: projects, refresh } = await useAsyncData(
  `projects-${locale.value}`,
  () => getProjects(),
  { watch: [locale] }
)

watch(locale, () => refresh())
</script>
```

### Actualizar `content.config.ts`

```typescript
export default defineContentConfig({
  collections: {
    projectsEs: defineCollection({
      type: 'content',
      path: 'content/es/projects',
      schema: projectSchema
    }),
    projectsEn: defineCollection({
      type: 'content',
      path: 'content/en/projects',
      schema: projectSchema
    })
  }
})
```

---

## 🔄 Rutas Localizadas

### Estrategia: `prefix_except_default`

- **Español (default)**: `/` → `/about` → `/projects`
- **Inglés**: `/en/` → `/en/about` → `/en/projects`

### Navegación con `localePath()`

```vue
<template>
  <NuxtLink :to="localePath('/')">Home</NuxtLink>
  <NuxtLink :to="localePath('/projects')">Projects</NuxtLink>
</template>
```

### Cambiar de Idioma con `switchLocalePath()`

```vue
<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const changeLanguage = async (code: string) => {
  const path = switchLocalePath(code)
  await router.push(path)
}
</script>
```

---

## 🎨 Componente Language Switcher

Ya incluido en `components/LanguageSwitcher.vue`:

```vue
<template>
  <LanguageSwitcher />
</template>
```

Este componente:
- ✅ Muestra banderas y códigos de idioma
- ✅ Persiste la selección en cookies
- ✅ Cambia la ruta automáticamente
- ✅ Estilizado con TailwindCSS

---

## ✅ Mejores Prácticas

### 1. Organización de Traducciones

Agrupa las traducciones por funcionalidad:

```json
{
  "meta": { ... },
  "header": { ... },
  "profile": { ... },
  "terminal": {
    "title": "...",
    "commands": { ... },
    "responses": { ... }
  }
}
```

### 2. Contenido con Nuxt Content

**✅ Recomendado**: Carpetas separadas por idioma
```
content/es/projects/
content/en/projects/
```

**❌ No recomendado**: Sufijos en archivos
```
content/projects/project-es.md
content/projects/project-en.md
```

### 3. SEO y Meta Tags

Siempre localiza los meta tags:

```vue
<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('meta.title'),
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') }
  ]
})
</script>
```

### 4. Testing de Traducciones

Verifica que todas las claves existan en ambos idiomas:

```bash
# Compara archivos JSON
diff <(jq -S 'keys' locales/es.json) <(jq -S 'keys' locales/en.json)
```

### 5. Lazy Loading

El `lazy: true` en la configuración asegura que solo se carguen las traducciones del idioma actual:

```typescript
i18n: {
  lazy: true,  // ✅ Optimización automática
  langDir: 'locales'
}
```

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Generar sitio estático
npm run generate
```

---

## 📦 Componentes Creados

| Componente | Descripción |
|------------|-------------|
| `LanguageSwitcher.vue` | Selector de idioma con banderas |
| `ProjectsList.vue` | Lista de proyectos localizada |

## 🛠️ Composables Creados

| Composable | Descripción |
|------------|-------------|
| `useLocalizedContent.ts` | Obtener contenido según idioma |
| `useTerminal.ts` | Terminal con comandos traducidos |

---

## 🐛 Troubleshooting

### Problema: Las traducciones no se cargan

**Solución**: Verifica que los archivos JSON estén en `i18n/locales/` y sean válidos.

```bash
# Validar JSON
cat i18n/locales/es.json | jq .
cat i18n/locales/en.json | jq .
```

### Problema: El contenido no cambia al cambiar idioma

**Solución**: Asegúrate de usar `watch` en el `useAsyncData`:

```typescript
const { data, refresh } = await useAsyncData(
  `key-${locale.value}`,
  () => getContent(),
  { watch: [locale] }
)
```

### Problema: Las rutas no tienen prefijo

**Solución**: Verifica la estrategia en `nuxt.config.ts`:

```typescript
i18n: {
  strategy: 'prefix_except_default'  // o 'prefix' para todos
}
```

---

## 📚 Recursos Adicionales

- [Documentación @nuxtjs/i18n](https://i18n.nuxtjs.org/)
- [Vue I18n Docs](https://vue-i18n.intlify.dev/)
- [Nuxt Content Docs](https://content.nuxt.com/)

---

## 🎉 Implementación Completada

✅ Configuración de i18n  
✅ Archivos de traducción (ES/EN)  
✅ Componentes migrados  
✅ Nuxt Content multiidioma  
✅ Language Switcher  
✅ Composables helper  
✅ Documentación completa  

¡Tu portafolio ahora está completamente internacionalizado! 🌍


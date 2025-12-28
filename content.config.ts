import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  metrics: z.record(z.string(), z.string()),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  date: z.string().optional(),
  coverImage: z.string().optional()
})

// Colecciones para español
const projectsEsCollection = defineCollection({
  type: 'content',
  path: 'content/es/projects',
  schema: projectSchema
})

// Colecciones para inglés
const projectsEnCollection = defineCollection({
  type: 'content',
  path: 'content/en/projects',
  schema: projectSchema
})

export default defineContentConfig({
  collections: {
    projectsEs: projectsEsCollection,
    projectsEn: projectsEnCollection
  }
})

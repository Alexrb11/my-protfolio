import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const projectsCollection = defineCollection({
  type: 'content',
  path: 'content/projects',
  schema: z.object({
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
})

export default defineContentConfig({
  collections: {
    projects: projectsCollection
  }
})

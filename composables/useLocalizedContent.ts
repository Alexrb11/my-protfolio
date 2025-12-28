/**
 * Composable para obtener contenido localizado de Nuxt Content
 * Facilita la obtención de contenido según el idioma actual
 */

export const useLocalizedContent = () => {
  const { locale } = useI18n()

  /**
   * Obtiene proyectos según el idioma actual
   * @param query Opciones de filtrado opcionales
   * @returns Array de proyectos en el idioma actual
   */
  const getProjects = async (query?: {
    featured?: boolean
    limit?: number
    tags?: string[]
  }) => {
    const contentPath = `/${locale.value}/projects`
    
    let queryBuilder = queryContent(contentPath)
    
    // Aplicar filtros si existen
    if (query?.featured) {
      queryBuilder = queryBuilder.where('featured', true)
    }
    
    if (query?.tags && query.tags.length > 0) {
      queryBuilder = queryBuilder.where('tags', { $in: query.tags })
    }
    
    // Ordenar por fecha (más reciente primero)
    queryBuilder = queryBuilder.sort({ date: -1 })
    
    // Limitar resultados si se especifica
    if (query?.limit) {
      queryBuilder = queryBuilder.limit(query.limit)
    }
    
    return await queryBuilder.find()
  }

  /**
   * Obtiene un proyecto específico por su slug
   * @param slug El slug del proyecto
   * @returns El proyecto o null
   */
  const getProjectBySlug = async (slug: string) => {
    const contentPath = `/${locale.value}/projects/${slug}`
    return await queryContent(contentPath).findOne()
  }

  /**
   * Obtiene todos los proyectos destacados
   * @returns Array de proyectos destacados
   */
  const getFeaturedProjects = async () => {
    return await getProjects({ featured: true })
  }

  /**
   * Obtiene proyectos por etiqueta
   * @param tag Etiqueta a filtrar
   * @returns Array de proyectos con esa etiqueta
   */
  const getProjectsByTag = async (tag: string) => {
    return await getProjects({ tags: [tag] })
  }

  return {
    getProjects,
    getProjectBySlug,
    getFeaturedProjects,
    getProjectsByTag
  }
}


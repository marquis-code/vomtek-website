import type { CatalogSystem } from '~/types/site'
import { catalogFallback } from '~/data/catalogFallback'

export async function fetchCatalog(): Promise<CatalogSystem[]> {
  const runtime = useRuntimeConfig()
  try {
    const response = await $fetch<{ items: CatalogSystem[] }>(`${runtime.public.apiBase}/catalog`, { timeout: 5000 })
    return response.items?.length ? response.items : catalogFallback
  }
  catch {
    return catalogFallback
  }
}

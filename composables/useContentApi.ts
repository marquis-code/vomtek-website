import type { Article, Job } from '~/types/content'
import { fallbackArticles, fallbackJobs } from '~/data/fallback'

/**
 * API access with graceful degradation. Content pages must never fail because
 * the API is restarting — they fall back to the editorial seed.
 */
export function useApiBase(): string {
  return useRuntimeConfig().public.apiBase
}

export async function apiRequest<T>(path: string, options: Record<string, unknown> = {}): Promise<T> {
  const base = useApiBase()
  const result = await $fetch(`${base}${path}`, {
    timeout: 5000,
    ...options,
  } as never)
  return result as T
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const data = await apiRequest<{ items: Article[] }>('/insights')
    return data.items?.length ? data.items : fallbackArticles
  }
  catch {
    return fallbackArticles
  }
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  try {
    return await apiRequest<Article>(`/insights/${slug}`)
  }
  catch {
    return fallbackArticles.find(a => a.slug === slug) ?? null
  }
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    const data = await apiRequest<{ items: Job[] }>('/careers')
    return data.items?.length ? data.items : fallbackJobs
  }
  catch {
    return fallbackJobs
  }
}

export async function fetchJob(slug: string): Promise<Job | null> {
  try {
    return await apiRequest<Job>(`/careers/${slug}`)
  }
  catch {
    return fallbackJobs.find(j => j.slug === slug) ?? null
  }
}

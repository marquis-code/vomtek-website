import seed from '~/data/seed.json'
import type { Article, Job } from '~/types/content'

/**
 * Editorial fallback content. The NestJS API is the source of truth at runtime;
 * this keeps every page renderable (and buildable) if the API is unreachable.
 */
export const fallbackArticles = seed.articles as unknown as Article[]
export const fallbackJobs = seed.jobs as unknown as Job[]

export const articleBySlug = (slug: string) => fallbackArticles.find(a => a.slug === slug)
export const jobBySlug = (slug: string) => fallbackJobs.find(j => j.slug === slug)

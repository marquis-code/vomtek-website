export interface DivisionCapability {
  title: string
  text: string
}

export interface Division {
  slug: string
  index: string
  name: string
  navLabel: string
  headline: string
  lead: string
  intro: string[]
  capabilities: DivisionCapability[]
  scope: string[]
  industries: string[]
  deliverables: string[]
  meta: { label: string; value: string }[]
  related: { label: string; to: string }[]
}

export interface Service {
  slug: string
  index: string
  name: string
  navLabel: string
  headline: string
  lead: string
  description: string[]
  included: string[]
  specs: { label: string; value: string }[]
  faqs: { q: string; a: string }[]
  related: string[]
  delivery: string
  glyph: 'panel' | 'pcb' | 'harness' | 'motor' | 'test' | 'repair' | 'field'
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: number
  publishedAt: string
  author: string
  tone: 'ink' | 'signal' | 'bone'
  body: ArticleBlock[]
  tags: string[]
}

export interface Job {
  slug: string
  title: string
  division: string
  location: string
  type: string
  level: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  postedAt: string
  active: boolean
}

export interface PanelType {
  code: string
  name: string
  note: string
}

export interface ProcessStep {
  index: string
  title: string
  text: string
  output: string
}

export interface ValueItem {
  title: string
  text: string
}

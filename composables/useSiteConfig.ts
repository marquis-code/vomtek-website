import type { PublicSiteConfig } from '~/types/site'
import { siteDefaults } from '~/data/siteDefaults'

export function useSiteConfig() {
  return useState<PublicSiteConfig>('site-config', () => siteDefaults)
}

let sessionId: string | null = null

function getSessionId(): string {
  if (sessionId) return sessionId
  try {
    const existing = sessionStorage.getItem('vt_sid')
    if (existing) {
      sessionId = existing
      return existing
    }
    sessionId = crypto.randomUUID()
    sessionStorage.setItem('vt_sid', sessionId)
  }
  catch {
    sessionId = 'anon'
  }
  return sessionId
}

export function isTrackingAllowed(): boolean {
  if (import.meta.server) return false
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  if (nav.doNotTrack === '1' || nav.globalPrivacyControl) return false
  return true
}

/**
 * First-party, cookie-free funnel tracking. Events land in MongoDB and drive
 * the lead-attribution reporting in the admin dashboard.
 */
export function track(name: string, meta: Record<string, unknown> = {}) {
  if (!isTrackingAllowed()) return
  const base = useRuntimeConfig().public.apiBase
  const payload = JSON.stringify({
    name,
    path: window.location.pathname,
    sessionId: getSessionId(),
    meta,
  })

  // fetch with keepalive survives most navigations and lets the browser
  // negotiate CORS properly (a JSON sendBeacon would require a preflight).
  fetch(`${base}/analytics/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
    mode: 'cors',
  }).catch(() => {})
}

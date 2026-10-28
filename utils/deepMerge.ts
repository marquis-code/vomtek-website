type Dict = Record<string, unknown>

export function deepMerge<T>(base: T, patch: unknown): T {
  if (Array.isArray(patch)) return patch as T
  if (!patch || typeof patch !== 'object') return (patch === undefined ? base : patch) as T
  if (!base || typeof base !== 'object' || Array.isArray(base)) return patch as T

  const output: Dict = { ...(base as Dict) }
  for (const [key, value] of Object.entries(patch as Dict)) {
    if (value === undefined) continue
    output[key] = deepMerge(output[key], value)
  }
  return output as T
}

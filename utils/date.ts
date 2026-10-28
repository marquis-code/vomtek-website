/**
 * Date-only strings (YYYY-MM-DD) are parsed at local noon so they do not shift
 * a day backwards for users west of UTC (e.g. Houston).
 */
export function parseContentDate(value: string | Date): Date {
  if (value instanceof Date) return value
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T12:00:00`)
  return new Date(value)
}

export function formatContentDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
): string {
  const date = parseContentDate(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', options)
}

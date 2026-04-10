export const API_URL = import.meta.env.VITE_API_URL ?? ''

export function getPublicCareerUrl(companySlug: string) {
  return `${window.location.origin}/careers/${companySlug}`
}

export function getPublicJobUrl(companySlug: string, jobSlug: string) {
  return `${window.location.origin}/j/${companySlug}/${jobSlug}`
}

export function formatSalaryRange(min?: number | null, max?: number | null) {
  if (!min && !max) {
    return null
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`
  }

  if (min) {
    return `From ${formatter.format(min)}`
  }

  return `Up to ${formatter.format(max!)}`
}

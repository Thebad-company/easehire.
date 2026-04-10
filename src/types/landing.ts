import type { LucideIcon } from 'lucide-react'

export type Metric = {
  value: string
  label: string
  detail: string
}

export type FeatureTile = {
  title: string
  description: string
  icon: LucideIcon
  stat: string
  tone: 'light' | 'dark' | 'accent'
  gridClass?: string
}

export type UseCase = {
  audience: string
  title: string
  description: string
  bullets: string[]
  metric: string
  accent: string
}

export type Testimonial = {
  name: string
  role: string
  company: string
  quote: string
  result: string
  initials: string
  accent: string
}

export type PricingTier = {
  name: string
  price: string
  description: string
  cta: string
  href: string
  featured?: boolean
  features: string[]
}

export type PipelineStage = {
  name: string
  count: string
  candidates: {
    name: string
    role: string
    initials: string
    score: string
    accent: string
  }[]
}

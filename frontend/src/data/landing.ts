import {
  BarChart3,
  Briefcase,
  CalendarDays,
  LayoutDashboard,
  Users,
  Workflow,
} from 'lucide-react'
import type {
  Metric,
  FeatureTile,
  UseCase,
  Testimonial,
  PricingTier,
  PipelineStage,
} from '../types/landing'

export const heroMetrics: Metric[] = [
  {
    value: '10+',
    label: 'job boards integrated',
    detail: 'Post to LinkedIn, Indeed, Google Jobs, CareerJet, and more from one place.',
  },
  {
    value: '35%',
    label: 'less admin work',
    detail: 'Automated screening and candidate routing saves hours every week.',
  },
  {
    value: '1 place',
    label: 'to manage hiring',
    detail: 'All candidates from all sources in one unified pipeline.',
  },
]

export const partnerLogos = ['Northstar', 'Helio', 'Summit', 'Arcwell', 'Lattice', 'PulseOps']

export const workflowSteps = [
  {
    number: '01',
    title: 'Post to 10+ job boards from one command center',
    description: 'LinkedIn, Indeed, Google Jobs, CareerJet, and more. No more logging into each platform separately.',
  },
  {
    number: '02',
    title: 'All applications flow into one pipeline',
    description: 'Candidates from every source land in your ATS. Screen, rate, and move them through your custom stages.',
  },
  {
    number: '03',
    title: 'See which sources actually work',
    description: 'Real-time analytics show you which job boards deliver quality candidates. Stop wasting budget on low-performing channels.',
  },
]

export const featureTiles: FeatureTile[] = [
  {
    title: 'Multi-Site Job Posting',
    description: 'Post to LinkedIn, Indeed, Google Jobs, CareerJet, and your careers page from one dashboard.',
    icon: Briefcase,
    stat: '10+ job boards integrated',
    tone: 'light',
    gridClass: 'lg:col-span-2',
  },
  {
    title: 'Centralized Applicant Tracking',
    description: 'All candidates from every source in one unified pipeline. No more scattered spreadsheets.',
    icon: LayoutDashboard,
    stat: 'Single source of truth',
    tone: 'dark',
    gridClass: 'lg:row-span-2',
  },
  {
    title: 'Customizable Pipelines',
    description: 'Build recruitment workflows that match your hiring process, not the other way around.',
    icon: Workflow,
    stat: 'Unlimited custom stages',
    tone: 'accent',
  },
  {
    title: 'Bulk & Individual Selection',
    description: 'Move candidates in bulk or one-by-one. Flexible selection for your workflow.',
    icon: Users,
    stat: 'Flexible candidate management',
    tone: 'light',
  },
  {
    title: 'Job Analytics',
    description: 'See which job boards deliver quality candidates. Optimize your recruiting spend.',
    icon: BarChart3,
    stat: 'Real-time source performance',
    tone: 'accent',
  },
  {
    title: 'Interview Scheduling',
    description: 'Automated scheduling keeps candidates warm and reduces coordination overhead.',
    icon: CalendarDays,
    stat: 'Less back-and-forth',
    tone: 'light',
    gridClass: 'lg:col-span-2',
  },
]

export const useCases: UseCase[] = [
  {
    audience: 'Small Businesses & Startups',
    title: 'Stop juggling LinkedIn, Indeed, and spreadsheets. Hire faster with less chaos.',
    description:
      'One dashboard for job posting, candidate tracking, and analytics. No more logging into 5 different platforms.',
    bullets: [
      'Post to 10+ job boards at once',
      'All candidates in one place',
      'See which sources work best',
    ],
    metric: 'Save 5+ hours per week',
    accent: 'from-lime-400 to-slate-600',
  },
  {
    audience: 'HR & Recruiting Teams',
    title: 'Build custom pipelines that match your hiring process.',
    description:
      'Create workflows that work for you. Bulk select candidates, automate follow-ups, and track everything in real-time.',
    bullets: [
      'Customizable hiring stages',
      'Bulk and individual selection',
      'Automated candidate routing',
    ],
    metric: '35% less admin work',
    accent: 'from-slate-700 to-slate-500',
  },
  {
    audience: 'Recruitment Agencies',
    title: 'Manage multiple clients and roles without losing track.',
    description:
      'Separate pipelines for each client. Track source quality. Deliver faster shortlists with real data.',
    bullets: [
      'Client-specific workflows',
      'Job analytics by source',
      'Faster candidate delivery',
    ],
    metric: '3x faster shortlist delivery',
    accent: 'from-lime-400 to-slate-600',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Hiring Manager',
    company: 'Tech Startup',
    quote:
      'We were posting jobs on LinkedIn, Indeed, and Google separately. Now it\'s one click. We get better candidates because we\'re reaching more people without extra work.',
    result: 'Save 5 hours/week',
    initials: 'SC',
    accent: 'from-lime-400 to-slate-600',
  },
  {
    name: 'James Rodriguez',
    role: 'Recruitment Lead',
    company: 'Mid-Size Company',
    quote:
      'The analytics actually show us which job boards work. We stopped wasting money on platforms that don\'t deliver. That alone paid for the tool.',
    result: '40% lower recruiting costs',
    initials: 'JR',
    accent: 'from-slate-700 to-slate-500',
  },
  {
    name: 'Emma Thompson',
    role: 'Agency Owner',
    company: 'Recruitment Agency',
    quote:
      'Managing multiple clients used to be a nightmare. Now each client has their own pipeline, and I can see exactly where every candidate is. Clients love the transparency.',
    result: '3x faster delivery',
    initials: 'ET',
    accent: 'from-lime-400 to-slate-600',
  },
]

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small teams just getting started with multi-board posting.',
    cta: 'Start Free',
    href: '#final-cta',
    features: ['Up to 3 active roles', 'Post to 5 job boards', 'Basic ATS', 'Email support'],
  },
  {
    name: 'Professional',
    price: '$99/mo',
    description: 'For growing teams that need automation and analytics.',
    cta: 'Start Free Trial',
    href: '#final-cta',
    featured: true,
    features: ['Unlimited active roles', 'Post to 10+ job boards', 'Job analytics', 'Bulk candidate selection', 'Interview scheduling'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For agencies and large organizations with custom needs.',
    cta: 'Book Demo',
    href: '#final-cta',
    features: ['Everything in Professional', 'Custom integrations', 'Dedicated support', 'Advanced permissions', 'SLA guarantee'],
  },
]

export const pipelineStages: PipelineStage[] = [
  {
    name: 'Applied',
    count: '128',
    candidates: [
      { name: 'Maya Chen', role: 'Sr Product Designer', initials: 'MC', score: '96', accent: 'from-lime-400 to-lime-300' },
      { name: 'Liam Torres', role: 'Frontend Engineer', initials: 'LT', score: '91', accent: 'from-slate-600 to-slate-500' },
    ],
  },
  {
    name: 'Screening',
    count: '42',
    candidates: [
      { name: 'Ava Brooks', role: 'Growth Marketer', initials: 'AB', score: '88', accent: 'from-lime-400 to-slate-600' },
    ],
  },
  {
    name: 'Interview',
    count: '18',
    candidates: [
      { name: 'Noah Patel', role: 'Sales Lead', initials: 'NP', score: '93', accent: 'from-slate-700 to-slate-600' },
    ],
  },
  {
    name: 'Offer',
    count: '7',
    candidates: [
      { name: 'Sofia Kim', role: 'People Ops', initials: 'SK', score: '90', accent: 'from-lime-400 to-slate-500' },
    ],
  },
]

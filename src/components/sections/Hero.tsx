import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { reveal } from '@/lib/motion'
import { heroMetrics } from '@/data/landing'
import { HeroStage } from './HeroStage'

export function Hero() {
  return (
    <motion.section
      className="grid items-start gap-12 pt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:pt-32"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <Badge
          variant="soft"
          className="w-fit rounded-lg px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]"
        >
          <BrainCircuit className="mr-2 size-3.5" /> AI-powered hiring automation
        </Badge>
        <h1 className="font-display mt-6 text-5xl font-bold tracking-[-0.02em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1]">
          Hire faster,
          <br />
          <span className="text-slate-400">without the</span>
          <br />
          <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-lime-400 bg-clip-text text-transparent">
            tool sprawl
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
          Post to LinkedIn, Indeed, Google Jobs, and more from one dashboard. Screen candidates
          faster. Track everything in one place.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <Button asChild size="xl" variant="secondary" className="font-semibold">
            <Link to="/sign-up">
              Start Free Trial
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="font-semibold">
            <a href="#final-cta">
              Book Demo
              <ChevronRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> No credit card required
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-2">
            <Users className="size-4 text-indigo-500" /> Trusted by 4,000+ recruiters
          </span>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 w-full">
          {heroMetrics.map((metric, index) => (
            <motion.div key={metric.label} {...reveal(index * 0.06 + 0.08)}>
              <div className="flex h-full flex-col rounded-lg border border-slate-200/70 bg-white/96 p-4 shadow-sm">
                <p className="font-display text-3xl font-bold tracking-[-0.04em] text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{metric.label}</p>
                <p className="mt-2 flex-1 text-xs leading-5 text-slate-500">{metric.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <HeroStage />
    </motion.section>
  )
}

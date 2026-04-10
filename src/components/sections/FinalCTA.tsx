import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, ChevronRight, Globe2, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { reveal } from '@/lib/motion'

export function FinalCTA() {
  return (
    <motion.section id="final-cta" {...reveal(0.14)}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-8 text-slate-950 shadow-sm lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Badge
              variant="outline"
              className="rounded-lg px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold"
            >
              Final CTA
            </Badge>
            <h2 className="font-display mt-6 text-balance text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4.5rem] lg:leading-[0.95]">
              Stop posting jobs in 5 different places.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              One dashboard for job posting, candidate tracking, and analytics. Start your free
              trial today—no credit card required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="secondary">
                <a href="#top">
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-slate-200/70 bg-white text-slate-950 hover:bg-slate-50"
              >
                <a href="mailto:demo@easehire.com">
                  Book Demo
                  <ChevronRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Zap,
                title: 'Automate admin',
                body: 'Screening, follow-up, and stage movement stay in motion automatically.',
              },
              {
                icon: Users,
                title: 'Align stakeholders',
                body: 'Recruiters, managers, and leadership work from the same live system.',
              },
              {
                icon: BrainCircuit,
                title: 'Use AI with context',
                body: 'Prioritize candidates faster without turning hiring into a black box.',
              },
              {
                icon: Globe2,
                title: 'Scale cleanly',
                body: 'Expand your hiring motion without adding more tool sprawl and process debt.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-5">
                <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

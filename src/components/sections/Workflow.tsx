import { motion } from 'framer-motion'
import { CalendarDays, Globe2, Search } from 'lucide-react'
import { reveal } from '@/lib/motion'
import { workflowSteps } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'

export function Workflow() {
  return (
    <motion.section {...reveal(0.08)}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white px-6 py-7 text-slate-950 shadow-sm sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="How it works"
            title="Three clear steps from job post to signed offer"
            description="EaseHire keeps each stage moving with less admin, faster feedback, and better visibility into who should move forward."
          />
          <div className="rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-sm text-slate-600 font-medium">
            Smooth workflows from post to offer
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <motion.div key={step.number} {...reveal(index * 0.07 + 0.08)}>
              <div className="h-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-6">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-5xl font-bold tracking-[-0.04em] text-slate-200">
                    {step.number}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    {index === 0 ? (
                      <Globe2 className="size-5" />
                    ) : index === 1 ? (
                      <Search className="size-5" />
                    ) : (
                      <CalendarDays className="size-5" />
                    )}
                  </div>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.02em] text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

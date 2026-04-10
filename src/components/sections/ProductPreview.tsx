import { motion } from 'framer-motion'
import { reveal } from '@/lib/motion'
import { pipelineStages } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'
import { CandidateMiniCard } from '../shared/CandidateMiniCard'

export function ProductPreview() {
  return (
    <motion.section {...reveal(0.1)}>
      <SectionIntro
        eyebrow="Product preview"
        title="See the product the way hiring teams actually use it"
        description="Track candidates, monitor source quality, and get AI-guided next steps from one focused recruiting workspace."
      />
      <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold">
                  Pipeline preview
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950">
                  Track candidates with less noise
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600 font-medium">
                {['Product roles', 'Remote', 'This month'].map((chip) => (
                  <span key={chip} className="rounded-lg border border-slate-200/70 bg-white px-3 py-2">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {pipelineStages.map((stage) => (
                <div key={stage.name} className="rounded-lg border border-slate-200/70 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold">
                      {stage.name}
                    </p>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {stage.count}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {stage.candidates.map((candidate) => (
                      <CandidateMiniCard
                        key={`${stage.name}-${candidate.name}`}
                        candidate={candidate}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 sm:p-5">
              <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold">
                Candidate Insight
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-lime-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Maya Chen</p>
                    <p className="text-xs text-slate-500">Sr Product Designer</p>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-600 shadow-sm">
                  Candidate has 8+ years of experience in high-growth SaaS. Strong background in
                  design systems and user research. Highly recommended for the current opening.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-slate-200/70 bg-white p-2 text-center">
                    <p className="text-[10px] text-slate-500">Matching</p>
                    <p className="font-bold text-slate-950">96%</p>
                  </div>
                  <div className="rounded-lg border border-slate-200/70 bg-white p-2 text-center">
                    <p className="text-[10px] text-slate-500">Exp.</p>
                    <p className="font-bold text-slate-950">8 yrs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-indigo-600 p-5 text-white">
              <p className="text-[9px] uppercase tracking-[0.16em] text-indigo-200 font-semibold">
                Pro Tip
              </p>
              <h4 className="mt-3 font-display text-xl font-bold leading-snug">
                Move directly to interview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-indigo-100">
                Candidates with scores above 90% have a 3x higher probability of receiving an offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

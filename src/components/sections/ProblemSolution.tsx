import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { reveal } from '@/lib/motion'

export function ProblemSolution() {
  return (
    <motion.section className="grid gap-12 xl:grid-cols-2 xl:items-start" {...reveal(0.06)}>
      <div>
        <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold">
          Problem to solution
        </p>
        <h2 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
          Why hiring breaks down
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
          Most teams juggle multiple job boards, spreadsheets, and email. Candidates slip through the
          cracks. Nothing gets tracked.
        </p>

        <div className="mt-8 space-y-4">
          {[
            {
              num: '01',
              title: 'Scattered job postings',
              desc: 'LinkedIn, Indeed, Google Jobs, your careers page—all separate.',
            },
            {
              num: '02',
              title: 'Manual screening',
              desc: 'Hours spent reviewing applications instead of talking to candidates.',
            },
            {
              num: '03',
              title: 'Lost candidates',
              desc: 'Top people disappear while waiting for feedback or interview scheduling.',
            },
            {
              num: '04',
              title: 'No visibility',
              desc: "Leaders can't see which sources work or where bottlenecks are.",
            },
          ].map((item) => (
            <div key={item.num} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-sm font-bold text-rose-600">
                {item.num}
              </div>
              <div>
                <p className="font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-emerald-50 to-cyan-50 p-8">
        <p className="text-[9px] uppercase tracking-[0.16em] text-emerald-600 font-semibold">
          The EaseHire way
        </p>
        <h3 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950">
          One system. Everything tracked.
        </h3>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Post to all job boards at once. Screen faster. See everything in one place.
        </p>

        <div className="mt-8 space-y-4">
          {[
            'Post to 10+ job boards from one dashboard',
            'All candidates flow into a single pipeline',
            'Automated screening and follow-ups',
            'Real-time analytics on source quality',
            'See exactly where candidates are stuck',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-3 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

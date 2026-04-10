import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { reveal } from '@/lib/motion'
import { useCases } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'

export function UseCases() {
  return (
    <motion.section {...reveal(0.1)}>
      <SectionIntro
        eyebrow="Use cases"
        title="Built for the teams that need hiring to move quickly"
        description="Whether you're a startup, an internal talent team, or an agency, EaseHire adapts to your workflow without adding more operational drag."
        centered
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {useCases.map((item, index) => (
          <motion.div key={item.audience} {...reveal(index * 0.06 + 0.08)}>
            <Card className="h-full overflow-hidden rounded-xl border-slate-200/70 bg-white/96 shadow-sm">
              <CardContent className="flex h-full flex-col gap-8 p-6 sm:p-7">
                <div className={cn('h-1.5 w-full rounded-full bg-gradient-to-r', item.accent)} />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <Badge
                      variant="outline"
                      className="rounded-lg px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold"
                    >
                      {item.audience}
                    </Badge>
                    <span className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-[-0.04em] text-slate-950">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
                <div className="space-y-3">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm text-slate-600 font-medium"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <Check className="size-4" />
                      </div>
                      {bullet}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

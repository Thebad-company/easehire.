import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { reveal } from '@/lib/motion'
import { testimonials } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'

export function Testimonials() {
  return (
    <motion.section {...reveal(0.12)}>
      <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-8 shadow-sm lg:p-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionIntro
            eyebrow="Social proof"
            title="The tool of choice for teams that value output over admin"
            description="Leaders across talent, operations, and management use EaseHire to keep their hiring engines running clean as they scale."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <motion.div key={testimonial.name} {...reveal(index * 0.05 + 0.08)}>
                <Card className="h-full overflow-hidden rounded-xl border-slate-200/70 bg-white/96 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <Avatar className="size-10 border-slate-200/60 bg-slate-100">
                        <AvatarFallback
                          className={cn('bg-gradient-to-br text-white', testimonial.accent)}
                        >
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                        {testimonial.result}
                      </span>
                    </div>
                    <p className="mt-6 text-sm leading-7 text-slate-600">“{testimonial.quote}”</p>
                    <div className="mt-6">
                      <p className="font-semibold text-slate-950">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

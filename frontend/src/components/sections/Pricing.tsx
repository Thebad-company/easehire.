import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { reveal } from '@/lib/motion'
import { pricingTiers } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'

export function Pricing() {
  return (
    <motion.section id="pricing" {...reveal(0.12)}>
      <SectionIntro
        eyebrow="Pricing"
        title="Pricing that scales with your hiring motion"
        description="Start with a free trial, move into automation as your process matures, and expand with advanced controls when your team needs them."
        centered
      />
      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div key={tier.name} {...reveal(index * 0.05 + 0.08)}>
            <Card
              className={cn(
                'h-full overflow-hidden rounded-xl border-slate-200/70 bg-white/96 shadow-sm',
                tier.featured &&
                  'border-lime-300/50 bg-gradient-to-br from-lime-50 to-slate-50 shadow-md ring-1 ring-lime-300/30'
              )}
            >
              <CardContent className="flex h-full flex-col gap-8 p-6 sm:p-7">
                {tier.featured ? (
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400" />
                ) : null}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p
                        className={cn(
                          'text-[9px] uppercase tracking-[0.16em] font-semibold',
                          tier.featured ? 'text-slate-600' : 'text-slate-500'
                        )}
                      >
                        {tier.featured ? 'Recommended plan' : 'Plan'}
                      </p>
                      <h3
                        className={cn(
                          'font-display mt-3 text-3xl font-bold tracking-[-0.04em]',
                          tier.featured ? 'text-slate-950' : 'text-slate-950'
                        )}
                      >
                        {tier.name}
                      </h3>
                    </div>
                    {tier.featured ? (
                      <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300">
                        Most popular
                      </Badge>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      'mt-4 font-display text-4xl font-bold tracking-[-0.04em]',
                      tier.featured ? 'text-slate-950' : 'text-slate-950'
                    )}
                  >
                    {tier.price}
                  </p>
                  <p
                    className={cn(
                      'mt-3 text-sm leading-6',
                      tier.featured ? 'text-slate-600' : 'text-slate-600'
                    )}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium',
                        tier.featured
                          ? 'border-lime-200 bg-lime-50 text-slate-700'
                          : 'border-slate-200/70 bg-slate-50/50 text-slate-600'
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-8 items-center justify-center rounded-lg',
                          tier.featured ? 'bg-lime-200 text-lime-700' : 'bg-emerald-100 text-emerald-600'
                        )}
                      >
                        <Check className="size-4" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-3">
                  <Button asChild size="xl" variant={tier.featured ? 'secondary' : 'outline'}>
                    <a href={tier.href}>
                      {tier.cta}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                  <p
                    className={cn(
                      'text-center text-sm',
                      tier.featured ? 'text-slate-600' : 'text-slate-500'
                    )}
                  >
                    No credit card required for the free trial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { FeatureTile } from '@/types/landing'

interface FeatureCardProps {
  tile: FeatureTile
}

export function FeatureCard({ tile }: FeatureCardProps) {
  const toneStyles = {
    light: 'border-slate-200/70 bg-white/96 text-slate-950',
    dark: 'border-slate-200/70 bg-slate-50 text-slate-950',
    accent: 'border-slate-200/70 bg-white/96 text-slate-950',
  }

  const descriptionColor = {
    light: 'text-slate-600',
    dark: 'text-slate-600',
    accent: 'text-slate-600',
  }

  const statColor = {
    light: 'bg-slate-950 text-white',
    dark: 'bg-slate-900 text-white',
    accent: 'bg-indigo-600 text-white',
  }

  return (
    <Card
      className={cn(
        'group h-full overflow-hidden rounded-xl p-0 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        toneStyles[tile.tone],
        tile.gridClass
      )}
    >
      <CardContent className="flex h-full flex-col justify-between gap-10 p-6 sm:p-7">
        <div className="space-y-5">
          <div
            className={cn(
              'flex size-11 items-center justify-center rounded-lg',
              tile.tone === 'dark' ? 'bg-slate-200 text-slate-900' : 'bg-slate-900 text-white'
            )}
          >
            <tile.icon className="size-5" />
          </div>
          <div>
            <p
              className={cn(
                'text-[9px] uppercase tracking-[0.2em] font-semibold',
                tile.tone === 'dark' ? 'text-slate-500' : 'text-slate-500'
              )}
            >
              Core capability
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em]">
              {tile.title}
            </h3>
            <p className={cn('mt-3 max-w-md text-sm leading-6', descriptionColor[tile.tone])}>
              {tile.description}
            </p>
          </div>
        </div>
        <div
          className={cn(
            'w-fit rounded-lg px-3 py-2 text-xs font-semibold tracking-[0.02em]',
            statColor[tile.tone]
          )}
        >
          {tile.stat}
        </div>
      </CardContent>
    </Card>
  )
}

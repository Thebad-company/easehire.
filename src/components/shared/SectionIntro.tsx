import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SectionIntroProps {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  light?: boolean
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionIntroProps) {
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
      <Badge
        variant={light ? 'dark' : 'outline'}
        className={cn(
          'mb-4 w-fit rounded-lg px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold',
          centered && 'mx-auto'
        )}
      >
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          'font-display text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1]',
          light ? 'text-white' : 'text-slate-950'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'mt-4 max-w-2xl text-base leading-7 sm:text-lg',
          light ? 'text-slate-300' : 'text-slate-600'
        )}
      >
        {description}
      </p>
    </div>
  )
}

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.02em] transition-colors',
  {
    variants: {
      variant: {
        soft: 'border-indigo-200/70 bg-indigo-50/90 text-indigo-700',
        outline: 'border-slate-200/80 bg-white/75 text-slate-600 backdrop-blur',
        dark: 'border-white/15 bg-slate-950 text-slate-100',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  },
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge }

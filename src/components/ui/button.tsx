import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[1.2rem] border text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-slate-950 bg-slate-950 text-white shadow-[0_20px_44px_-28px_rgba(15,23,42,0.75)] hover:-translate-y-0.5 hover:bg-slate-900',
        secondary:
          'border-transparent bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] text-white shadow-[0_22px_54px_-26px_rgba(79,70,229,0.7)] hover:-translate-y-0.5 hover:shadow-[0_24px_58px_-24px_rgba(79,70,229,0.78)]',
        outline:
          'border-slate-200 bg-white/86 text-slate-700 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white',
        ghost: 'border-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-950',
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[15px]',
        xl: 'h-14 px-7 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }

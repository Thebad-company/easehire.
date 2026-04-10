import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, onCheckedChange, ...props }, ref) => (
  <div className={cn("relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 has-[:checked]:bg-indigo-600 bg-slate-200", className)}>
    <input
      type="checkbox"
      className="absolute h-full w-full opacity-0 cursor-pointer z-10"
      ref={ref}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
    <span
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform translate-x-0.5",
        props.checked && "translate-x-5.5",
        "peer-checked:translate-x-5.5"
      )}
    />
  </div>
))
Switch.displayName = "Switch"

export { Switch }

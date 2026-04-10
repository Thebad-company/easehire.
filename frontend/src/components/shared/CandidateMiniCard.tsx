import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { PipelineStage } from '@/types/landing'

interface CandidateMiniCardProps {
  candidate: PipelineStage['candidates'][number]
}

export function CandidateMiniCard({ candidate }: CandidateMiniCardProps) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-white p-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border-slate-200/60 bg-slate-100">
          <AvatarFallback className={cn('bg-gradient-to-br text-white', candidate.accent)}>
            {candidate.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">{candidate.name}</p>
          <p className="truncate text-xs text-slate-500">{candidate.role}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 font-medium">
        <span>AI match</span>
        <span className="font-semibold text-indigo-600">{candidate.score}%</span>
      </div>
    </div>
  )
}

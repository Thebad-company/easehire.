export function HeroStage() {
  return (
    <div className="relative mx-auto w-full min-w-0">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm sm:p-4">
        <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/60 pb-4 sm:mb-6 sm:pb-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold">
                Recruiting Dashboard
              </p>
              <h3 className="font-display mt-2 text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">
                Your hiring in one place
              </h3>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-lg border border-slate-200/60 bg-white p-4 sm:p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-3 sm:mb-4">
                  Job Boards
                </p>
                <div className="flex flex-wrap gap-2">
                  {['LinkedIn', 'Indeed', 'Google Jobs', 'CareerJet'].map((board) => (
                    <span
                      key={board}
                      className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                    >
                      {board}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200/60 bg-white p-4 sm:p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2 sm:mb-3">
                  Pipeline
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {['Applied', 'Screening', 'Interview', 'Offer'].map((stage) => (
                    <div key={stage} className="rounded-lg bg-slate-100 px-1 py-2 text-center sm:px-2 sm:py-3">
                      <p className="text-[10px] font-semibold text-slate-700 leading-tight">{stage}</p>
                      <p className="mt-1 text-xs sm:text-sm font-bold text-slate-950">42</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="rounded-lg border border-slate-200/60 bg-white p-3 sm:p-4">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2 sm:mb-3">
                  Key Metrics
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-600">Time to hire</span>
                    <span className="font-bold text-slate-950">18 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-600">Offer rate</span>
                    <span className="font-bold text-slate-950">81%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-600">Top source</span>
                    <span className="font-bold text-slate-950">LinkedIn</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200/60 bg-white p-3 sm:p-4">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2 sm:mb-3">
                  Next Steps
                </p>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>✓ Follow up with 5 candidates</p>
                  <p>✓ Schedule 3 interviews</p>
                  <p>✓ Review feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Users, Search, Filter, ExternalLink, BrainCircuit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Application } from '@/types'

export default function CandidatesPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const api = useApi()

  useEffect(() => {
    async function loadCandidates() {
      try {
        const res = await api.get('/api/applications') 
        setApplications(res.data || [])
      } catch (err) {
        console.error('Failed to load all candidates', err)
      } finally {
        setLoading(false)
      }
    }
    loadCandidates()
  }, [api])

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Candidates</h1>
          <p className="text-slate-500 text-sm mt-1">Global view of all applicants across your active jobs.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            placeholder="Search candidates by name or email..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 size-4" />
          Filters
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-white rounded-xl border border-slate-200" />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Users className="mx-auto size-10 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">No candidates found</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
             Share your job listings to start receiving applications.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied For</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-[10px] bg-slate-100 font-bold">
                          {app.candidate?.firstName?.[0] || '?'}{app.candidate?.lastName?.[0] || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{app.candidate?.firstName} {app.candidate?.lastName}</p>
                        <p className="text-xs text-slate-500">{app.candidate?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{app.job?.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="soft" className="capitalize">{app.stage.toLowerCase()}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <BrainCircuit className="size-3.5 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-900">{app.candidate?.aiScore || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/dashboard/jobs/${app.jobId}`}>
                         <ExternalLink className="size-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}

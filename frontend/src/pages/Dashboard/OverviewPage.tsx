import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, UserCheck, TrendingUp, Plus } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Application, ApplicationStage } from '@/types'

interface OverviewStats {
  activeJobsCount: number
  totalCandidatesCount: number
  pipeline: Partial<Record<ApplicationStage, number>>
  recentApplications: Array<
    Pick<Application, 'id' | 'stage' | 'appliedAt'> & {
      candidate: {
        firstName: string
        lastName: string
      }
      job: {
        title: string
      }
    }
  >
}

export default function OverviewPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const api = useApi()

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.get('/api/analytics/overview')
        setStats(res.data)
      } catch (err) {
        console.error('Failed to load stats', err)
      }
    }
    loadStats()
  }, [api])

  const cards = [
    { name: 'Active Jobs', value: stats?.activeJobsCount || 0, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', href: '/dashboard/jobs' },
    { name: 'Total Candidates', value: stats?.totalCandidatesCount || 0, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', href: '/dashboard/candidates' },
    { name: 'Under Review', value: stats?.pipeline?.SCREENING || 0, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/candidates' },
    { name: 'Interviews', value: stats?.pipeline?.INTERVIEW || 0, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', href: '/dashboard/candidates' },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Quick summary of your hiring performance.</p>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link to="/dashboard/jobs/new">
            <Plus className="mr-3 h-5 w-5" />
            Post a Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {cards.map((card) => (
          <Link key={card.name} to={card.href} className="group block">
            <Card className="border-slate-200 group-hover:border-indigo-200 group-hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">{card.name}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
                  </div>
                  <div className={`${card.bg} ${card.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="size-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {stats?.recentApplications?.length > 0 ? (
              stats.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs">
                      {app.candidate.firstName[0]}{app.candidate.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{app.candidate.firstName} {app.candidate.lastName}</p>
                      <p className="text-xs text-slate-500">Applied for <span className="text-indigo-600 font-medium">{app.job.title}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="soft">{app.stage}</Badge>
                    <p className="text-[10px] text-slate-400 mt-1">{new Date(app.appliedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No recent applications to show.</p>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Pipeline Status</h2>
          <div className="space-y-4">
            {stats?.pipeline ? (
              Object.entries(stats.pipeline).map(([stage, count]) => (
                <div key={stage} className="space-y-1.5">
                   <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500 uppercase tracking-wider">{stage}</span>
                      <span className="text-slate-900">{count as number}</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${(count as number / (stats.totalCandidatesCount || 1)) * 100}%` }}
                      />
                   </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">Post a job to see your pipeline metrics.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

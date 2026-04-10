import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, UserCheck, TrendingUp, Plus } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function OverviewPage() {
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, interviews: 0, timeToHire: '12d' })
  const api = useApi()

  useEffect(() => {
    async function loadStats() {
      try {
        // In a real app, we'd have a consolidated stats endpoint
        const jobsRes = await api.get('/api/jobs')
        setStats(prev => ({ ...prev, jobs: jobsRes.pagination.total }))
      } catch (err) {
        console.error('Failed to load stats', err)
      }
    }
    loadStats()
  }, [api])

  const cards = [
    { name: 'Active Jobs', value: stats.jobs, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', href: '/dashboard/jobs' },
    { name: 'Total Candidates', value: stats.candidates, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', href: '/dashboard/candidates' },
    { name: 'Under Review', value: stats.interviews, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/candidates' },
    { name: 'Time to Hire', value: stats.timeToHire, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', href: '/dashboard/jobs' },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Quick summary of your hiring performance.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 italic">No recent activity to show.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Hiring Pipeline</h2>
          <div className="space-y-4">
             <p className="text-sm text-slate-500 italic">Post a job to see your pipeline metrics.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Briefcase, Users, MapPin, ExternalLink } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function JobsListPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const api = useApi()

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await api.get('/api/jobs')
        setJobs(res.items || [])
      } catch (err) {
        console.error('Failed to load jobs', err)
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [])

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Jobs</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all your active and draft job listings.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            New Job
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-xl border border-slate-200" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
              <Briefcase className="size-8" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No jobs posted yet</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Get started by creating your first job listing to start receiving applications.
          </p>
          <Button asChild className="mt-6">
            <Link to="/dashboard/jobs/new">Create Job</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group flex items-center justify-between p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                  <Briefcase className="size-5 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1.5 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.isRemote ? 'Remote' : job.location || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {job._count?.applications || 0} applicants
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={job.status === 'ACTIVE' ? 'soft' : 'outline'}>
                  {job.status}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/dashboard/jobs/${job.id}`}>
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

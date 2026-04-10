import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Briefcase, 
  Calendar,
  ChevronDown,
  ExternalLink,
  BrainCircuit,
  Star
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import type { Application, ApplicationStage, Job } from '@/types'

export default function JobDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const [job, setJob] = useState<Job | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [jobRes, appsRes] = await Promise.all([
          api.get(`/api/jobs/${id}`),
          api.get(`/api/applications/job/${id}`)
        ])
        setJob(jobRes.data)
        setApplications(appsRes.data)
      } catch (err) {
        console.error('Failed to load job details', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id, api])

  const handleStageUpdate = async (appId: string, stage: string) => {
    try {
      await api.patch(`/api/applications/${appId}/stage`, { stage })
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, stage: stage as ApplicationStage } : app
      ))
    } catch (err) {
      console.error('Failed to update stage', err)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-40 bg-white rounded-2xl border border-slate-200" />
        </div>
      </DashboardLayout>
    )
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-slate-500">Job not found.</p>
          <Button onClick={() => navigate('/dashboard/jobs')} className="mt-4">
            Back to Jobs
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard/jobs')}
          className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Briefcase className="size-8 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                <Badge variant={job.status === 'ACTIVE' ? 'soft' : 'outline'}>{job.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {job.isRemote ? 'Remote' : job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  {applications.length} Applicants
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline">Edit Role</Button>
             <Button>Share Job</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants" className="space-y-6">
        <TabsList className="bg-transparent border-b border-slate-200 rounded-none h-auto p-0 gap-8">
          <TabsTrigger 
            value="applicants" 
            className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-slate-500 data-[state=active]:text-slate-900 h-11"
          >
            Applicants
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-slate-500 data-[state=active]:text-slate-900 h-11"
          >
             Job Description
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applicants" className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <Users className="mx-auto size-10 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">No applicants yet</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                Once candidates apply, they will appear here ranked by their AI match score.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.sort((a, b) => (b.candidate?.aiScore || 0) - (a.candidate?.aiScore || 0)).map((app) => (
                <div 
                  key={app.id} 
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm hover:border-indigo-200 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar className="size-12 border-2 border-slate-50">
                      <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">
                        {app.candidate?.firstName?.[0] || '?'}{app.candidate?.lastName?.[0] || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 truncate">
                          {app.candidate?.firstName} {app.candidate?.lastName}
                        </h4>
                        <Badge variant="outline" className="text-[10px] h-5 bg-slate-50">
                           {app.source}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{app.candidate?.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 lg:px-8 flex-1 border-y lg:border-y-0 lg:border-x border-slate-100 py-4 lg:py-0">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <BrainCircuit className="size-3.5 text-indigo-600" />
                        AI Score
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold text-slate-900">{app.candidate?.aiScore || 0}%</span>
                        <div className="flex">
                           {[1,2,3,4,5].map(i => (
                             <Star key={i} className={cn("size-3", i <= Math.round((app.candidate?.aiScore || 0)/20) ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                         AI Summary
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {app.aiSummary || "No summary available."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative group/select">
                      <select
                        value={app.stage}
                        onChange={(e) => handleStageUpdate(app.id, e.target.value)}
                        className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="SCREENING">Screening</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="OFFER">Offer</option>
                        <option value="HIRED">Hired</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={app.candidate?.resumeUrl || '#'} target="_blank" rel="noreferrer">
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                    <Button variant="secondary">
                       View Notes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="details">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">About the Role</h3>
            <div className="prose prose-slate max-w-none">
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

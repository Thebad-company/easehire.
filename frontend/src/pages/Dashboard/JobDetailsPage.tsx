import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckSquare,
  ChevronDown,
  Copy,
  ExternalLink,
  Globe,
  MapPin,
  Network,
  Star,
  Users,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { API_URL, getPublicCareerUrl, getPublicJobUrl } from '@/lib/public'
import type { Application, ApplicationStage, Job } from '@/types'

type FilterKey = 'ALL' | 'TOP_RATED' | 'NEEDS_REVIEW' | 'AI_90' | 'AI_75_89'

const applicantFilters: Array<{ key: FilterKey; label: string }> = [
  { key: 'ALL', label: 'All applicants' },
  { key: 'TOP_RATED', label: 'Top rated' },
  { key: 'NEEDS_REVIEW', label: 'Needs review' },
  { key: 'AI_90', label: 'AI 90+' },
  { key: 'AI_75_89', label: 'AI 75-89' },
]

function matchesFilter(application: Application, filter: FilterKey) {
  const aiScore = application.candidate?.aiScore || 0
  const rating = application.rating || 0

  switch (filter) {
    case 'TOP_RATED':
      return rating >= 4
    case 'NEEDS_REVIEW':
      return rating === 0 || application.stage === 'APPLIED'
    case 'AI_90':
      return aiScore >= 90
    case 'AI_75_89':
      return aiScore >= 75 && aiScore < 90
    default:
      return true
  }
}

export default function JobDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const [job, setJob] = useState<Job | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [bulkUpdating, setBulkUpdating] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const [jobRes, appsRes] = await Promise.all([
          api.get(`/api/jobs/${id}`),
          api.get(`/api/applications/job/${id}`),
        ])
        setJob(jobRes.data)
        setApplications(appsRes.data)
        setSelectedIds([])
      } catch (err) {
        console.error('Failed to load job details', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, api])

  const filteredApplications = useMemo(
    () =>
      [...applications]
        .sort((a, b) => (b.candidate?.aiScore || 0) - (a.candidate?.aiScore || 0))
        .filter((application) => matchesFilter(application, activeFilter)),
    [activeFilter, applications],
  )

  const allVisibleSelected =
    filteredApplications.length > 0 && filteredApplications.every((application) => selectedIds.includes(application.id))

  const publicJobUrl =
    job?.company?.slug && job.slug ? getPublicJobUrl(job.company.slug, job.slug) : null
  const publicCareerUrl = job?.company?.slug ? getPublicCareerUrl(job.company.slug) : null
  const indeedFeedUrl = job?.company?.slug ? `${API_URL}/api/public/feeds/${job.company.slug}/indeed` : null
  const linkedInFeedUrl = job?.company?.slug ? `${API_URL}/api/public/feeds/${job.company.slug}/linkedin` : null

  async function handleStageUpdate(appId: string, stage: string) {
    try {
      await api.patch(`/api/applications/${appId}`, { stage })
      setApplications((previous) =>
        previous.map((application) =>
          application.id === appId ? { ...application, stage: stage as ApplicationStage } : application,
        ),
      )
    } catch (err) {
      console.error('Failed to update stage', err)
    }
  }

  async function handleRatingUpdate(appId: string, rating: number) {
    try {
      await api.patch(`/api/applications/${appId}`, { rating })
      setApplications((previous) =>
        previous.map((application) =>
          application.id === appId ? { ...application, rating } : application,
        ),
      )
    } catch (err) {
      console.error('Failed to update rating', err)
    }
  }

  async function handleBulkStageUpdate(stage: ApplicationStage) {
    if (!selectedIds.length) {
      return
    }

    try {
      setBulkUpdating(true)
      const response = await api.patch('/api/applications/bulk', {
        applicationIds: selectedIds,
        stage,
      })

      const updatedApplications = response.data as Application[]
      setApplications((previous) =>
        previous.map((application) => {
          const updated = updatedApplications.find((item) => item.id === application.id)
          return updated || application
        }),
      )
      setSelectedIds([])
    } catch (err) {
      console.error('Failed to bulk update applications', err)
    } finally {
      setBulkUpdating(false)
    }
  }

  function toggleSelection(applicationId: string) {
    setSelectedIds((previous) =>
      previous.includes(applicationId)
        ? previous.filter((id) => id !== applicationId)
        : [...previous, applicationId],
    )
  }

  function toggleVisibleSelection() {
    const visibleIds = filteredApplications.map((application) => application.id)

    setSelectedIds((previous) =>
      allVisibleSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...previous, ...visibleIds])),
    )
  }

  async function handleCopyPublicLink() {
    if (!publicJobUrl) {
      return
    }

    try {
      await navigator.clipboard.writeText(publicJobUrl)
    } catch (err) {
      console.error('Failed to copy public job URL', err)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-40 rounded-2xl border border-slate-200 bg-white" />
        </div>
      </DashboardLayout>
    )
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
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
          className="mb-6 flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </button>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <Briefcase className="size-8 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                <Badge variant={job.status === 'ACTIVE' ? 'soft' : 'outline'}>{job.status}</Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
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
            <Button onClick={handleCopyPublicLink} disabled={!publicJobUrl}>
              <Copy className="mr-2 size-4" />
              Copy Public Link
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants" className="space-y-6">
        <TabsList className="h-auto gap-8 rounded-none border-b border-slate-200 bg-transparent p-0">
          <TabsTrigger
            value="applicants"
            className="h-11 rounded-none border-b-2 border-transparent px-0 py-3 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Applicants
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="h-11 rounded-none border-b-2 border-transparent px-0 py-3 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Job Description
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="h-11 rounded-none border-b-2 border-transparent px-0 py-3 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applicants" className="space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <Users className="mx-auto mb-4 size-10 text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-900">No applicants yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-slate-500">
                Once candidates apply, they will appear here ranked by their AI match score.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fast screening</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">Focus the shortlist quickly</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {applicantFilters.map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                          activeFilter === filter.key
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white',
                        )}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-[1.4rem] border border-slate-100 bg-slate-50/80 px-4 py-3 md:flex-row md:items-center md:justify-between">
                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleVisibleSelection}
                      className="size-4 rounded border-slate-300 accent-indigo-600"
                    />
                    Select visible applicants ({filteredApplications.length})
                  </label>

                  {selectedIds.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                        <CheckSquare className="size-3.5" />
                        {selectedIds.length} selected
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => handleBulkStageUpdate('INTERVIEW')}
                        disabled={bulkUpdating}
                      >
                        Move to Interview
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleBulkStageUpdate('REJECTED')}
                        disabled={bulkUpdating}
                        className="border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800"
                      >
                        Bulk Reject
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Select applicants to move or reject them in one action.</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(application.id)}
                        onChange={() => toggleSelection(application.id)}
                        className="size-4 rounded border-slate-300 accent-indigo-600"
                      />
                      <Avatar className="size-12 border-2 border-slate-50">
                        <AvatarFallback className="bg-indigo-50 font-bold text-indigo-700">
                          {application.candidate?.firstName?.[0] || '?'}
                          {application.candidate?.lastName?.[0] || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="truncate font-bold text-slate-900">
                            {application.candidate?.firstName} {application.candidate?.lastName}
                          </h4>
                          <Badge variant="outline" className="h-5 bg-slate-50 text-[10px]">
                            {application.source}
                          </Badge>
                          <Badge variant="soft">AI {Math.round(application.candidate?.aiScore || 0)}</Badge>
                        </div>
                        <p className="truncate text-sm text-slate-500">{application.candidate?.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-8 border-y border-slate-100 py-4 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <Star className="size-3.5 text-amber-500" />
                          Recruiter Rating
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((index) => (
                            <button
                              key={index}
                              onClick={() => handleRatingUpdate(application.id, index)}
                              className="transition-transform hover:scale-125"
                            >
                              <Star
                                className={cn(
                                  'size-4 transition-colors',
                                  index <= (application.rating || 0)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200',
                                )}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="min-w-[200px] flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI Summary</div>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                          {application.aiSummary || 'No summary available.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <select
                          value={application.stage}
                          onChange={(event) => handleStageUpdate(application.id, event.target.value)}
                          className="cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option value="APPLIED">Applied</option>
                          <option value="SCREENING">Screening</option>
                          <option value="INTERVIEW">Interview</option>
                          <option value="OFFER">Offer</option>
                          <option value="HIRED">Hired</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      </div>

                      {application.candidate?.resumeUrl ? (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={application.candidate.resumeUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="size-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" disabled>
                          <ExternalLink className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="details">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-bold text-slate-900">About the Role</h3>
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-600">{job.description}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Public distribution</h3>
              <p className="mt-2 text-sm text-slate-500">
                Share a crawler-friendly job page and a branded career hub without sending candidates through Clerk.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-950 p-3 text-white">
                      <Globe className="size-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Public job page</p>
                      <p className="mt-1 break-all text-xs text-slate-500">{publicJobUrl || 'Missing company slug'}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-indigo-600 p-3 text-white">
                      <Users className="size-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Career page</p>
                      <p className="mt-1 break-all text-xs text-slate-500">{publicCareerUrl || 'Missing company slug'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Feed endpoints</h3>
              <p className="mt-2 text-sm text-slate-500">
                Use these endpoints for external job board distribution while Google Jobs indexes the JSON-LD on the public page.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { label: 'Indeed XML feed', value: indeedFeedUrl, icon: Network },
                  { label: 'LinkedIn XML feed', value: linkedInFeedUrl, icon: ExternalLink },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-900 p-3 text-white">
                        <item.icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="mt-1 break-all text-xs text-slate-500">{item.value || 'Missing company slug'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

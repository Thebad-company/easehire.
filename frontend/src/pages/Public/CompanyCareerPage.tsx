import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Globe,
  MapPin,
  Network,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { API_URL, getPublicJobUrl } from '@/lib/public'
import type { PublicCompanyProfile, PublicJobSummary } from '@/types'

interface CompanyJobsResponse {
  company: PublicCompanyProfile
  jobs: PublicJobSummary[]
}

export default function CompanyCareerPage() {
  const { companySlug } = useParams()
  const [data, setData] = useState<CompanyJobsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companySlug) {
      return
    }

    async function loadCompanyJobs() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/public/jobs/${companySlug}`)
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload.error || 'Unable to load company careers page')
        }

        setData(payload.data)
        document.title = `${payload.data.company.name} Careers | EaseHire`
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load company careers page')
      } finally {
        setLoading(false)
      }
    }

    loadCompanyJobs()
  }, [companySlug])

  const accent = data?.company.brandingColor || '#2563eb'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.1),transparent_36%),linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_90px_-54px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex size-16 items-center justify-center rounded-[1.4rem] border border-slate-200 bg-white shadow-sm"
                style={{ boxShadow: `0 18px 50px -34px ${accent}` }}
              >
                {data?.company.logoUrl ? (
                  <img src={data.company.logoUrl} alt={data.company.name} className="h-10 w-10 object-contain" />
                ) : (
                  <span className="text-xl font-bold text-slate-900">
                    {data?.company.name?.slice(0, 1) || 'E'}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Company Careers
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold text-slate-950 sm:text-4xl">
                  {loading ? 'Loading roles...' : data?.company.name || 'Careers'}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  {data?.company.description ||
                    'Browse active roles, read the team story, and apply directly without leaving the job page.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {data?.company.website ? (
                <Button asChild variant="outline">
                  <a href={data.company.website} target="_blank" rel="noreferrer">
                    <Globe className="mr-2 size-4" />
                    Company Site
                  </a>
                </Button>
              ) : null}
              {data?.company.slug ? (
                <Button asChild variant="secondary">
                  <a href={`${API_URL}/api/public/feeds/${data.company.slug}/indeed`} target="_blank" rel="noreferrer">
                    <Network className="mr-2 size-4" />
                    Indeed Feed
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="bg-slate-950 text-white">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Open Roles</p>
              <p className="mt-4 text-4xl font-bold">{data?.jobs.length ?? 0}</p>
              <p className="mt-2 text-sm text-slate-300">Live requisitions available right now.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Distribution Ready</p>
              <p className="mt-4 text-xl font-semibold text-slate-950">Google Jobs + XML feeds</p>
              <p className="mt-2 text-sm text-slate-600">
                Public pages stay crawlable while applications flow back into the recruiter dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Candidate Flow</p>
              <p className="mt-4 text-xl font-semibold text-slate-950">No account required</p>
              <p className="mt-2 text-sm text-slate-600">
                Applicants can submit directly from each job page and land in screening instantly.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Open Positions</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">Find your next role</h2>
            </div>
            {data?.company.slug ? (
              <a
                href={`${API_URL}/api/public/feeds/${data.company.slug}/linkedin`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
              >
                LinkedIn feed
                <ExternalLink className="size-4" />
              </a>
            ) : null}
          </div>

          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-36 animate-pulse rounded-[1.8rem] border border-slate-200 bg-white/80" />
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-lg font-semibold text-slate-950">{error}</p>
                <p className="mt-2 text-sm text-slate-600">Try refreshing the page or checking the company slug.</p>
              </CardContent>
            </Card>
          ) : !data?.jobs.length ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BriefcaseBusiness className="mx-auto size-10 text-slate-300" />
                <p className="mt-4 text-lg font-semibold text-slate-950">No active roles right now</p>
                <p className="mt-2 text-sm text-slate-600">
                  Check back soon for new openings from this team.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {data.jobs.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_90px_-54px_rgba(15,23,42,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-slate-300"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-slate-950">{job.title}</h3>
                        <Badge variant="outline">{job.type || 'Full-time'}</Badge>
                        {job.isRemote ? <Badge>Remote friendly</Badge> : null}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="size-4" />
                          {job.isRemote ? 'Remote' : job.location || 'Location shared on intro call'}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Globe className="size-4" />
                          Published {new Date(job.postedAt || job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(getPublicJobUrl(data.company.slug, job.slug))
                          } catch (err) {
                            console.error('Failed to copy public job URL', err)
                          }
                        }}
                        className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
                      >
                        Copy link
                      </button>
                      <Link
                        to={`/j/${data.company.slug}/${job.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1"
                      >
                        View role
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

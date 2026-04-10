import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { API_URL, formatSalaryRange } from '@/lib/public'
import type { PublicJobDetails } from '@/types'

export default function JobPostingPage() {
  const { companySlug, jobSlug } = useParams()
  const [job, setJob] = useState<PublicJobDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!companySlug || !jobSlug) {
      return
    }

    async function loadJob() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/public/jobs/${companySlug}/${jobSlug}`)
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload.error || 'Unable to load job posting')
        }

        setJob(payload.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load job posting')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [companySlug, jobSlug])

  const salaryRange = useMemo(
    () => formatSalaryRange(job?.salaryMin, job?.salaryMax),
    [job?.salaryMin, job?.salaryMax],
  )

  useEffect(() => {
    if (!job) {
      return
    }

    document.title = `${job.title} at ${job.company.name} | EaseHire`

    const description =
      `${job.title} at ${job.company.name}. ` +
      `${job.isRemote ? 'Remote role.' : `${job.location || 'Location shared after intro.'}`}`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      datePosted: job.postedAt || job.createdAt,
      employmentType: job.type || 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company.name,
        sameAs: job.company.website || undefined,
        logo: job.company.logoUrl || undefined,
      },
      applicantLocationRequirements: job.isRemote
        ? {
            '@type': 'Country',
            name: 'United States',
          }
        : undefined,
      jobLocation: job.isRemote
        ? undefined
        : {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: job.location || 'TBD',
              addressCountry: 'US',
            },
          },
      baseSalary:
        job.salaryMin || job.salaryMax
          ? {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: {
                '@type': 'QuantitativeValue',
                minValue: job.salaryMin || undefined,
                maxValue: job.salaryMax || undefined,
                unitText: 'YEAR',
              },
            }
          : undefined,
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [job])

  async function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!companySlug || !jobSlug) {
      return
    }

    const formData = new FormData(event.currentTarget)

    const payload = {
      candidate: {
        firstName: String(formData.get('firstName') || ''),
        lastName: String(formData.get('lastName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        linkedInUrl: String(formData.get('linkedInUrl') || ''),
        resumeUrl: String(formData.get('resumeUrl') || ''),
      },
      source: 'External',
    }

    try {
      setSubmitting(true)
      setError(null)
      setSuccess(null)

      const response = await fetch(`${API_URL}/api/public/jobs/${companySlug}/${jobSlug}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit application')
      }

      event.currentTarget.reset()
      setSuccess('Application received. The recruiting team can now review it from the dashboard.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  const accent = job?.company.brandingColor || '#0f172a'

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-5">
          <div className="h-12 w-40 rounded-full bg-white/10" />
          <div className="h-56 rounded-[2rem] bg-white/10" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-[540px] rounded-[2rem] bg-white/10" />
            <div className="h-[540px] rounded-[2rem] bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <p className="text-2xl font-bold text-slate-950">{error || 'Job not found'}</p>
          <p className="mt-3 text-sm text-slate-600">The posting may have been removed or the URL is incorrect.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.9),rgba(15,23,42,1)),linear-gradient(180deg,#020617_0%,#0f172a_100%)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to={`/careers/${job.company.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to all roles
        </Link>

        <section className="mt-5 overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/6 shadow-[0_36px_100px_-48px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="dark">{job.type || 'Full-time'}</Badge>
                  {job.isRemote ? <Badge variant="dark">Remote</Badge> : null}
                  <Badge variant="dark">{job.company.name}</Badge>
                </div>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {job.title}
                </h1>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-200">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {job.isRemote ? 'Remote' : job.location || 'Location shared during intro'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" />
                    Posted {new Date(job.postedAt || job.createdAt).toLocaleDateString()}
                  </span>
                  {job.company.website ? (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                      <Globe className="size-4" />
                      Company website
                    </a>
                  ) : null}
                </div>
              </div>

              <div
                className="rounded-[1.8rem] border border-white/12 px-6 py-5 text-left shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)]"
                style={{ background: `linear-gradient(135deg, ${accent}26, rgba(255,255,255,0.04))` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Compensation</p>
                <p className="mt-3 text-3xl font-bold text-white">{salaryRange || 'Discussed in process'}</p>
                <p className="mt-2 text-sm text-slate-200">Applications go straight into the recruiter dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-white/10 bg-white/95 text-slate-950">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-950 p-3 text-white">
                  <BriefcaseBusiness className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Role overview</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">What you’ll work on</h2>
                </div>
              </div>

              <div className="prose mt-8 max-w-none prose-slate">
                <div className="whitespace-pre-wrap text-base leading-8 text-slate-700">{job.description}</div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Fast application flow without sign-up',
                  'Visible to Google Jobs via structured data',
                  'Shared to external boards through XML feeds',
                  'Screened inside the recruiter dashboard',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white text-slate-950">
              <CardContent className="p-8">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-12 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Apply now</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950">Join the shortlist</h2>
                  </div>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleApply}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="firstName" placeholder="First name" required />
                    <Input name="lastName" placeholder="Last name" required />
                  </div>
                  <Input name="email" type="email" placeholder="Email address" required />
                  <Input name="phone" placeholder="Phone number" />
                  <Input name="linkedInUrl" type="url" placeholder="LinkedIn profile URL" />
                  <Input name="resumeUrl" type="url" placeholder="Resume URL" required />
                  <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Resume uploads are represented as a URL in this prototype so public applications work without extra file-storage setup.
                  </p>

                  {success ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {success}
                    </div>
                  ) : null}

                  {error ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {error}
                    </div>
                  ) : null}

                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit application'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/10 text-white">
              <CardContent className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">About the team</p>
                <h3 className="mt-2 text-2xl font-bold">{job.company.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {job.company.description || 'A fast-moving team using EaseHire to distribute roles and review candidates quickly.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

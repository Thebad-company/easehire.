import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Briefcase, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PublicJobPage() {
  const { companySlug, jobSlug } = useParams()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`http://localhost:8000/api/public/jobs/${companySlug}/${jobSlug}`)
        const data = await res.json()
        if (data.success) {
          setJob(data.data)
        }
      } catch (err) {
        console.error('Failed to load job', err)
      } finally {
        setLoading(false)
      }
    }
    loadJob()
  }, [companySlug, jobSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin size-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Job Listing Not Found</h1>
        <p className="text-slate-500 mb-6">This position may have been filled or the link is incorrect.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  const handleApply = () => {
    setApplied(true)
    // In a real implementation, this would open a form and hit the application POST endpoint
  }

  const brandingColor = job.company?.brandingColor || '#4f46e5'

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* SEO JSON-LD for Google Jobs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          "title": job.title,
          "description": job.description,
          "datePosted": job.createdAt,
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.company.name,
            "sameAs": job.company.website
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": job.location || 'Remote'
            }
          },
          "employmentType": job.type
        })}
      </script>

      {/* Nav */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="size-10 bg-indigo-50 rounded-xl flex items-center justify-center overflow-hidden border border-indigo-100 p-1.5">
                {job.company.logoUrl ? (
                  <img src={job.company.logoUrl} alt={job.company.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Briefcase className="size-5 text-indigo-600" />
                )}
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{job.company.name}</p>
                <Link to="/" className="text-lg font-black text-slate-900 leading-none">EaseHire</Link>
             </div>
          </div>
          <Button 
            className="rounded-full px-8 shadow-lg transition-all hover:scale-105" 
            style={{ backgroundColor: brandingColor }}
            onClick={handleApply}
          >
            Apply Now
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-50">{job.type}</Badge>
               {job.isRemote && <Badge variant="outline">Remote</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-indigo-600" />
                {job.location || 'Remote'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-indigo-600" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Role Description</h2>
            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
             {applied ? (
               <div className="py-6 transition-all animate-in fade-in zoom-in duration-500">
                  <div className="size-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CheckCircle2 className="size-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h3>
                  <p className="text-slate-500">Thanks for applying. The team at {job.company.name} will be in touch soon.</p>
               </div>
             ) : (
                <div className="py-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to apply?</h3>
                  <p className="text-slate-500 mb-8">Join {job.company.name} and build the future with us.</p>
                  <Button 
                    size="lg" 
                    className="w-full max-w-sm rounded-full h-14 text-lg font-bold shadow-xl transition-all hover:scale-105"
                    style={{ backgroundColor: brandingColor }}
                    onClick={handleApply}
                  >
                    Submit Application
                  </Button>
                </div>
             )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">About {job.company.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {job.company.description || "Leading innovator in the industry focus on building great products."}
              </p>
              {job.company.website && (
                <a 
                  href={job.company.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Globe className="size-4" />
                  Visit Website
                </a>
              )}
           </div>

           <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-bold mb-4 relative">Why EaseHire?</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6 relative">
                We help companies find and hire the best talent using ethical AI and streamlined workflows. High-growth teams trust us to build their future.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-xs font-medium bg-white/10 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    Secure & Private Applications
                 </div>
                 <div className="flex items-center gap-3 text-xs font-medium bg-white/10 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    Direct Contact with Recruiters
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

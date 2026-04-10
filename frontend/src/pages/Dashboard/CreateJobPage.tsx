import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function CreateJobPage() {
  const navigate = useNavigate()
  const api = useApi()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    isRemote: false,
    salaryMin: '',
    salaryMax: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/jobs', {
        ...formData,
        salaryMin: formData.salaryMin !== '' ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax !== '' ? parseInt(formData.salaryMax) : undefined,
      })
      navigate('/dashboard/jobs')
    } catch (err: any) {
      console.error('Failed to create job', err)
      
      if (err.status === 422 && err.issues) {
        const issues = err.issues.map((i: any) => `${i.field}: ${i.message}`).join('\n')
        alert(`Validation failed:\n${issues}`)
      } else if (err.status === 403) {
        alert('You must complete your company profile before posting a job.')
        navigate('/dashboard')
      } else {
        alert(err.message || 'Failed to create job. Please check all fields.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </button>

        <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
        <p className="text-slate-500 text-sm mt-1 mb-10">
          Fill in the details below to reach thousands of candidates across multiple job boards.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                required
                minLength={3}
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <p className="text-[10px] text-slate-400">At least 3 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                required
                minLength={20}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="min-h-[200px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <p className="text-[10px] text-slate-400">At least 20 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  disabled={formData.isRemote}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  id="remote"
                  checked={formData.isRemote}
                  onCheckedChange={(checked) => setFormData({ ...formData, isRemote: checked, location: checked ? '' : formData.location })}
                />
                <Label htmlFor="remote" className="cursor-pointer">Remote Role</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary (Annual USD)</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="e.g. 120000"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary (Annual USD)</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="e.g. 160000"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-3">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Job Listing
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

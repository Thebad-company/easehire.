import { useState } from 'react'
import { Building2, Loader2, Rocket } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CompanyOnboardingProps {
  onSuccess: () => void
}

export function CompanyOnboarding({ onSuccess }: CompanyOnboardingProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const api = useApi()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Basic slugification
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      
      await api.post('/api/companies', { 
        name, 
        slug: slug || `company-${Math.random().toString(36).slice(2, 7)}` 
      })
      onSuccess()
    } catch (err: any) {
      console.error('Failed to create company', err)
      const msg = err.message || 'Please try a different name.'
      alert(`Failed to create company: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <Building2 className="size-10" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 text-center">Set up your organization</h1>
        <p className="mt-2 text-slate-500 text-center">
          Every recruiter on EaseHire belongs to a company. Create yours to start posting jobs.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              required
              placeholder="e.g. Acme Corp"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>

          <Button type="submit" disabled={loading || !name} className="w-full h-12 text-base font-semibold">
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Rocket className="mr-2 h-5 w-5" />
            )}
            Launch Workspace
          </Button>
        </form>
        
        <p className="mt-8 text-xs text-center text-slate-400">
          By launching, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

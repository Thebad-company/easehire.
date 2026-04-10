import { useState, useEffect } from 'react'
import { Building2, Globe, Save, Bell, Shield, Palette } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApi } from '@/hooks/useApi'
import type { Company } from '@/types'

export default function SettingsPage() {
  const api = useApi()
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState<Company | null>(null)

  useEffect(() => {
    async function loadCompany() {
      try {
        const res = await api.get('/api/companies/mine')
        setCompany(res.data)
      } catch (err) {
        console.error('Failed to load company', err)
      }
    }
    loadCompany()
  }, [api])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())
      await api.patch('/api/companies/mine', data)
      alert('Settings saved successfully!')
    } catch (err) {
      console.error('Failed to save settings', err)
      alert('Failed to save settings.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your organization and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Company Profile Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Company Profile</h3>
              </div>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" name="name" defaultValue={company?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input id="website" name="website" className="pl-10" defaultValue={company?.website} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" defaultValue={company?.industry} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Organization Size</Label>
                  <Input id="size" name="size" defaultValue={company?.size} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <textarea 
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                  defaultValue={company?.description}
                />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="size-4 text-indigo-600" />
                  <h4 className="font-semibold text-slate-900">Branding</h4>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                   <div className="space-y-2">
                      <Label htmlFor="brandingColor">Brand Primary Color</Label>
                      <div className="flex gap-3">
                        <Input 
                          id="brandingColor" 
                          name="brandingColor" 
                          type="color" 
                          className="h-10 w-20 p-1" 
                          defaultValue={company?.brandingColor || '#4f46e5'} 
                        />
                        <Input 
                          type="text" 
                          value={company?.brandingColor || '#4f46e5'} 
                          className="flex-1 font-mono" 
                          readOnly 
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <Input id="logoUrl" name="logoUrl" defaultValue={company?.logoUrl} placeholder="https://..." />
                   </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={loading}>
                  <Save className="mr-2 size-4" />
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Notification Preferences</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">New Application Alerts</p>
                  <p className="text-xs text-slate-500">Get an email whenever someone applies for a job.</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-indigo-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">AI Scoring Notifications</p>
                  <p className="text-xs text-slate-500">Notify me when high-match candidates are found.</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
            <p className="text-xs text-slate-500 mb-6 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
               Your company branding is applied to all public job boards and candidate-facing pages.
            </p>
            {company?.logoUrl && (
              <div className="mb-6">
                <Label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-2">Live Logo Preview</Label>
                <div className="size-20 rounded-xl border border-slate-200 p-2 bg-white flex items-center justify-center">
                   <img src={company.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            )}

          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <Shield className="size-8 mb-4 opacity-80" />
            <h4 className="font-bold text-lg mb-2">Recruiter Access</h4>
            <p className="text-indigo-100 text-sm mb-4">
              Multi-recruiter access and team permissions are available in the Enterprise plan.
            </p>
            <Button variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-none">
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

import { useState } from 'react'
import { Building2, Globe, Save, Bell, Shield } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Settings saved successfully!')
    }, 1000)
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
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input id="website" className="pl-10" defaultValue="https://acme.inc" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology & Software" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Organization Size</Label>
                  <Input id="size" defaultValue="51 - 200 employees" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <textarea 
                  id="description"
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                  defaultValue="Leading the way in innovative software solutions for modern enterprises."
                />
              </div>
            </div>
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
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Save Changes</h4>
            <p className="text-xs text-slate-500 mb-6">
              Updates to your company profile will be visible across all your active job listings.
            </p>
            <Button className="w-full justify-center" onClick={handleSave} disabled={loading}>
              <Save className="mr-2 size-4" />
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>

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

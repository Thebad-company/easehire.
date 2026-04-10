import { useEffect, useState } from 'react'
import { useUser } from '@clerk/react'
import { useApi } from '@/hooks/useApi'
import { CompanyOnboarding } from '@/components/dashboard/CompanyOnboarding'
import OverviewPage from './Dashboard/OverviewPage'

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const api = useApi()
  const [dbUser, setDbUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function syncAndFetch() {
      if (!isLoaded || !isSignedIn || !user) return

      try {
        setIsLoading(true)
        setError(null)
        // 1. Sync user with backend
        await api.post('/api/users/sync', {
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.imageUrl,
        })

        // 2. Fetch full profile (to check companyId)
        const profile = await api.get('/api/users/me')
        setDbUser(profile.data)
      } catch (err: any) {
        console.error('Core dashboard setup failed', err)
        setError(err.message || 'Failed to connect to server')
      } finally {
        setIsLoading(false)
      }
    }

    syncAndFetch()
  }, [isLoaded, isSignedIn])

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Syncing your account...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm max-w-md">
          <p className="text-xl font-bold text-slate-900">Sync Failed</p>
          <p className="text-slate-500 text-sm mt-2">{error}</p>
          <p className="text-slate-400 text-xs mt-4">Make sure your backend server is running and accessible.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 w-full rounded-lg bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Retry Sync
          </button>
        </div>
      </div>
    )
  }

  // If user has no company, force onboarding
  if (!dbUser?.companyId) {
    return <CompanyOnboarding onSuccess={() => window.location.reload()} />
  }

  // If onboarded, show the overview
  return <OverviewPage />
}

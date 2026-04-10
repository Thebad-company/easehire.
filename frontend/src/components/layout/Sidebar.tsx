import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  PlusCircle
} from 'lucide-react'
import { useClerk } from '@clerk/react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/dashboard/candidates', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const { signOut } = useClerk()

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center px-6">
        <Link to="/">
          <img src="/easehire.webp" alt="EaseHire" className="h-8 w-auto" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-4 py-6">
        <Link
          to="/dashboard/jobs/new"
          className="mb-8 flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <PlusCircle className="size-4" />
          Post a Job
        </Link>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-slate-100 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn('size-4', isActive ? 'text-indigo-600' : 'text-slate-400')} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-slate-200 pt-4">
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

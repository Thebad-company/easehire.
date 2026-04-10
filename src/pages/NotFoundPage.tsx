import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-200"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center relative">
              <Search className="size-10 text-indigo-600 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                !
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-black text-slate-900 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Lost in the Pipeline?</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
          </p>

          <div className="space-y-3">
            <Button className="w-full justify-center h-14 text-lg" asChild>
              <Link to="/dashboard">
                <Home className="mr-2 size-5" />
                Back to Dashboard
              </Link>
            </Button>
            
            <Button variant="ghost" className="w-full justify-center h-14 text-slate-600" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 size-5" />
              Go Back
            </Button>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-6 grayscale opacity-40">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Support</span>
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">© 2026 EaseHire</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src="/easehire.webp" alt="EaseHire" className="h-10 w-auto" />
        </a>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-sm">
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="h-9 px-4 text-xs sm:h-10 sm:px-6 sm:text-sm"
          >
            <Link to="/sign-up" className="flex items-center">
              <span className="hidden sm:inline">Start Free Trial</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

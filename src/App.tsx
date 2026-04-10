import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Workflow } from '@/components/sections/Workflow'
import { Features } from '@/components/sections/Features'
import { UseCases } from '@/components/sections/UseCases'
import { ProductPreview } from '@/components/sections/ProductPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function App() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.06),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05),transparent_44%)]" />

      <Header />

      <main
        id="top"
        className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-20 pt-8 sm:gap-20 sm:px-6 lg:gap-32 lg:px-8 lg:pt-14"
      >
        <Hero />
        <ProblemSolution />
        <Workflow />
        <Features />
        <UseCases />
        <ProductPreview />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

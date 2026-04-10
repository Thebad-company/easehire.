export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img src="/easehire.webp" alt="EaseHire" className="h-10 w-auto" />
            <p className="mt-6 max-w-xs text-base leading-7 text-slate-600">
              The modern ATS for teams that value output over admin. One dashboard for all your
              hiring needs.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-950">Product</p>
            <ul className="mt-6 space-y-4">
              {['Features', 'Integrations', 'Pricing', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-slate-600 hover:text-slate-950">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-950">Company</p>
            <ul className="mt-6 space-y-4">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-950">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-950">Legal</p>
            <ul className="mt-6 space-y-4">
              {['Privacy', 'Terms', 'Cookie Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-950">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200/70 pt-8 sm:mt-16 lg:mt-20">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} EaseHire Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

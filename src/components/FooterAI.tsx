import { GraduationCap } from 'lucide-react'

export function FooterAI() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold text-lg">AI w szkole</span>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-background/60">
            <a href="#problem" className="hover:text-background transition-colors">Problem</a>
            <a href="#program" className="hover:text-background transition-colors">Program</a>
            <a href="#korzysci" className="hover:text-background transition-colors">Korzyści</a>
            <a href="#kontakt" className="hover:text-background transition-colors">Kontakt</a>
          </nav>
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} AI w szkole
          </p>
        </div>
      </div>
    </footer>
  )
}

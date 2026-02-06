export function FooterAI() {
  return (
    <footer className="bg-foreground text-background border-t border-background/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-semibold tracking-editorial uppercase">
            AI w szkole
          </span>
          <nav className="flex flex-wrap items-center gap-8">
            <a href="#problem" className="text-xs tracking-wide uppercase text-background/50 hover:text-background transition-colors">Problem</a>
            <a href="#program" className="text-xs tracking-wide uppercase text-background/50 hover:text-background transition-colors">Program</a>
            <a href="#korzysci" className="text-xs tracking-wide uppercase text-background/50 hover:text-background transition-colors">Korzyści</a>
            <a href="#kontakt" className="text-xs tracking-wide uppercase text-background/50 hover:text-background transition-colors">Kontakt</a>
          </nav>
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

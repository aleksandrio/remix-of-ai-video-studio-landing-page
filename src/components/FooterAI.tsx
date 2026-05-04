import { useLang } from '@/lib/i18n'

export function FooterAI() {
  const { lang } = useLang()
  const links = lang === 'pl'
    ? [{ h: '#problem', l: 'Problem' }, { h: '#program', l: 'Program' }, { h: '#formaty', l: 'Współpraca' }, { h: '#korzysci', l: 'Korzyści' }, { h: '#kontakt', l: 'Kontakt' }]
    : [{ h: '#problem', l: 'Problem' }, { h: '#program', l: 'Program' }, { h: '#formaty', l: 'Cooperation' }, { h: '#korzysci', l: 'Benefits' }, { h: '#kontakt', l: 'Contact' }]
  const brand = lang === 'pl' ? 'AI w szkole' : 'AI in school'
  return (
    <footer className="bg-foreground text-background border-t border-background/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-semibold tracking-editorial uppercase">{brand}</span>
          <nav className="flex flex-wrap items-center gap-8">
            {links.map(l => (
              <a key={l.h} href={l.h} className="text-xs tracking-wide uppercase text-background/50 hover:text-background transition-colors">{l.l}</a>
            ))}
          </nav>
          <p className="text-xs text-background/30">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

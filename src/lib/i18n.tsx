import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Languages } from 'lucide-react'

export type Lang = 'pl' | 'en'

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<Ctx>({ lang: 'pl', setLang: () => {}, toggle: () => {} })

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'pl'
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored === 'pl' || stored === 'en') return stored
  const nav = navigator.language?.toLowerCase() || ''
  return nav.startsWith('pl') ? 'pl' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((l) => (l === 'pl' ? 'en' : 'pl'))

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** Helper: pick localized value from {pl,en} object. */
export function useT<T>(d: { pl: T; en: T }): T {
  const { lang } = useLang()
  return d[lang]
}

/** Inline helper: pick by current lang from a {pl,en} pair. */
export function tr<T>(lang: Lang, pl: T, en: T): T {
  return lang === 'pl' ? pl : en
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      className={`p-2 transition-colors duration-300 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest ${className}`}
      aria-label={lang === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
      title={lang === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
    >
      <Languages className="w-4 h-4" />
      <span>{lang === 'pl' ? 'EN' : 'PL'}</span>
    </button>
  )
}

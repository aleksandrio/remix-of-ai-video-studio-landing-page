import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useLang } from '@/lib/i18n'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { lang } = useLang()
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2 transition-colors duration-300 ${className}`}
      aria-label={
        lang === 'pl'
          ? isDark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'
          : isDark ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

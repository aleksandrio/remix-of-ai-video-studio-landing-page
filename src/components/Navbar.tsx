import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#program', label: 'Program' },
  { href: '#korzysci', label: 'Korzyści' },
  { href: '#kontakt', label: 'Kontakt' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? 'bg-background/95 border-b border-border'
          : 'bg-foreground/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo — centered on desktop */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`font-heading text-sm font-bold tracking-editorial uppercase transition-colors duration-300 ${
            isScrolled ? 'text-foreground' : 'text-primary-foreground drop-shadow-md'
          }`}
          style={!isScrolled ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : undefined}
        >
          AI w szkole
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium tracking-editorial uppercase transition-colors duration-300 ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-primary-foreground/80 hover:text-primary-foreground drop-shadow-md'
              }`}
              style={!isScrolled ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#kontakt"
          className={`hidden md:inline-flex text-xs font-semibold tracking-wide uppercase px-6 py-3 transition-all duration-300 ${
            isScrolled
              ? 'border border-foreground text-foreground hover:bg-foreground hover:text-background'
              : 'border border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/20 drop-shadow-md'
          }`}
          style={!isScrolled ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : undefined}
        >
          Umów się
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled ? 'text-foreground' : 'text-primary-foreground drop-shadow-md'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide uppercase text-foreground py-3 border-b border-border/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                className="mt-4 text-sm font-semibold tracking-wide uppercase border border-foreground text-foreground px-6 py-3 text-center hover:bg-foreground hover:text-background transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Umów się
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

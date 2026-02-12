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
  const [isOverDarkSection, setIsOverDarkSection] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Switch to dark text only after scrolling past the hero image
      const heroHeight = window.innerHeight
      setIsScrolled(window.scrollY > heroHeight - 80)

      // Check if navbar is overlapping the Contact section (dark background)
      const contactSection = document.getElementById('kontakt')
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top
        const navbarHeight = 80 // approximate navbar height
        const contactBottom = contactTop + contactSection.offsetHeight
        // If navbar overlaps contact section (which has dark background), use white text
        // Navbar overlaps when contact section's top is above navbar bottom AND contact section's bottom is below navbar top
        setIsOverDarkSection(contactTop <= navbarHeight && contactBottom >= 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
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
        isOverDarkSection
          ? 'bg-foreground/20'
          : isScrolled
          ? 'bg-background/95'
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
            isOverDarkSection || !isScrolled ? 'text-white' : 'text-foreground'
          }`}
          style={isOverDarkSection || !isScrolled ? { textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)' } : undefined}
        >
          AI w szkole
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold tracking-editorial uppercase transition-colors duration-300 ${
                isOverDarkSection || !isScrolled
                  ? 'text-white hover:text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={isOverDarkSection || !isScrolled ? { textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)' } : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#kontakt"
          className={`hidden md:inline-flex text-xs font-semibold tracking-wide uppercase px-6 py-3 transition-all duration-300 ${
            isOverDarkSection || !isScrolled
              ? 'border-2 border-white text-white hover:bg-white/15'
              : 'border border-foreground text-foreground hover:bg-foreground hover:text-background'
          }`}
          style={isOverDarkSection || !isScrolled ? { textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)' } : undefined}
        >
          Umów się
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isOverDarkSection || !isScrolled ? 'text-white' : 'text-foreground'
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

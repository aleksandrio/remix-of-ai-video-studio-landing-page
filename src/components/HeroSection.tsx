import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, BookOpen } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-sky/5" />
      
      {/* Decorative shapes */}
      <div className="absolute top-32 right-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent-emerald/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">Warsztaty dla szkół</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6"
        >
          AI to{' '}
          <span className="text-primary">mentor</span>,
          <br />
          nie ściąga
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Uczę uczniów, jak mądrze korzystać ze sztucznej inteligencji — 
          do nauki, rozwoju i kreatywności, a nie do ściągania.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#kontakt"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Zamów warsztaty
          </a>
          <a
            href="#program"
            className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2"
          >
            Zobacz program
            <ArrowDown className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-emerald rounded-full" />
            <span>Zajęcia stacjonarne w szkole</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>5 dni warsztatów</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-purple rounded-full" />
            <span>Gotowe narzędzia AI</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}

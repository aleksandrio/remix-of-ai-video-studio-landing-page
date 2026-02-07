import { motion } from 'framer-motion'
import heroImage from '@/assets/hero-classroom.jpg'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-bleed hero image */}
      <div className="relative w-full h-screen">
        <img
          src={heroImage}
          alt="Uczniowie pracujący z AI w nowoczesnej klasie"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-foreground/50" />

        {/* Hero content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-medium tracking-editorial uppercase text-primary-foreground/80 mb-6"
          >
            Warsztaty AI dla szkół
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-heading text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-primary-foreground leading-[1.05] max-w-5xl"
          >
            AI to mentor,
            <br />
            nie ściąga.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-base sm:text-lg text-primary-foreground/85 max-w-xl leading-relaxed font-light"
          >
            Uczę uczniów, jak mądrze korzystać ze sztucznej inteligencji — 
            do nauki, rozwoju i kreatywności.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#kontakt"
              className="text-sm font-semibold tracking-wide uppercase bg-primary-foreground text-foreground px-10 py-4 hover:bg-primary-foreground/90 transition-all duration-300"
            >
              Zamów warsztaty
            </a>
            <a
              href="#program"
              className="text-sm font-semibold tracking-wide uppercase border border-primary-foreground text-primary-foreground px-10 py-4 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Zobacz program
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-editorial uppercase text-primary-foreground/60">
            Przewiń
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-primary-foreground/40"
          />
        </motion.div>
      </div>
    </section>
  )
}

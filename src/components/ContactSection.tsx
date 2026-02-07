import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    'Napisz do mnie lub zadzwoń',
    'Ustalimy termin i szczegóły',
    'Przeprowadzę warsztaty w Twojej szkole',
  ]

  return (
    <section id="kontakt" className="py-20 lg:py-32 bg-foreground text-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — headline & steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-medium tracking-editorial uppercase text-background/50 mb-8">
              Kontakt
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-10">
              Zaproś mnie
              <br />
              do Twojej szkoły
            </h2>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  <span className="text-xs font-bold tracking-editorial uppercase text-background/40 w-8 pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-lg font-light leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-sm text-background/50 leading-relaxed max-w-md">
              Szkolenie jest bezpłatne. Opowiem o programie, odpowiem na pytania
              i dostosujemy warsztaty do potrzeb Twojej szkoły.
            </p>
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <a
                href="mailto:kontakt@aiwszkole.pl"
                className="group flex items-center justify-between py-6 border-b border-background/15 hover:border-background/40 transition-colors duration-300"
              >
                <div>
                  <p className="text-xs font-medium tracking-editorial uppercase text-background/40 mb-2">
                    Email
                  </p>
                  <p className="text-xl sm:text-2xl font-heading font-semibold">
                    kowal.alek@gmail.com
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-background/30 group-hover:text-background group-hover:translate-x-1 transition-all duration-300" />
              </a>

              <a
                href="tel:+48123456789"
                className="group flex items-center justify-between py-6 border-b border-background/15 hover:border-background/40 transition-colors duration-300"
              >
                <div>
                  <p className="text-xs font-medium tracking-editorial uppercase text-background/40 mb-2">
                    Telefon
                  </p>
                  <p className="text-xl sm:text-2xl font-heading font-semibold">
                    +48 882 568 124
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-background/30 group-hover:text-background group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>

            <a
              href="mailto:kontakt@aiwszkole.pl?subject=Warsztaty AI w szkole"
              className="mt-12 inline-flex items-center justify-center text-sm font-semibold tracking-wide uppercase bg-background text-foreground px-10 py-4 hover:bg-background/90 transition-all duration-300"
            >
              Napisz do mnie
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

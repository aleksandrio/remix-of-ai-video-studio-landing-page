import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '200px' })
  const widgetLoaded = useRef(false)

  useEffect(() => {
    if (widgetLoaded.current || !isInView) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    widgetLoaded.current = true
  }, [isInView])

  const steps = [
    'Wybierz termin w kalendarzu obok',
    'Porozmawiamy o potrzebach Twojej szkoły',
    'Przeprowadzę warsztaty u Ciebie',
  ]

  return (
    <section id="kontakt" className="pt-20 pb-8 lg:pt-32 lg:pb-10 bg-foreground text-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — header, steps & contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Header */}
            <div className="mb-12">
              <p className="text-xs font-medium tracking-editorial uppercase text-background/50 mb-6">
                Kontakt
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl">
                Zaproś mnie
                <br />
                do swojej szkoły
              </h2>
            </div>

            <div className="space-y-8 mb-12">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  <span className="text-xs font-bold tracking-editorial uppercase text-background/40 w-8 pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-lg font-light leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-background/50 leading-relaxed max-w-md mb-12">
              Szkolenie jest bezpłatne. Opowiem o programie, odpowiem na pytania
              i dostosujemy warsztaty do potrzeb Twojej szkoły.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:kowal.alek@gmail.com"
                className="group flex items-center justify-between py-5 border-b border-background/15 hover:border-background/40 transition-colors duration-300"
              >
                <div>
                  <p className="text-xs font-medium tracking-editorial uppercase text-background/40 mb-1.5">
                    Email
                  </p>
                  <p className="text-lg sm:text-xl font-heading font-semibold">
                    kowal.alek@gmail.com
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-background/30 group-hover:text-background group-hover:translate-x-1 transition-all duration-300" />
              </a>

              <a
                href="tel:+48882568124"
                className="group flex items-center justify-between py-5 border-b border-background/15 hover:border-background/40 transition-colors duration-300"
              >
                <div>
                  <p className="text-xs font-medium tracking-editorial uppercase text-background/40 mb-1.5">
                    Telefon
                  </p>
                  <p className="text-lg sm:text-xl font-heading font-semibold">
                    +48 882 568 124
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-background/30 group-hover:text-background group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Right — Calendly widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="calendly-inline-widget rounded-lg overflow-hidden"
              data-url="https://calendly.com/kowal-alek/30min?hide_gdpr_banner=1&background_color=221f1c&text_color=f5f0e8&primary_color=4d6640"
              style={{ minWidth: '320px', height: '830px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

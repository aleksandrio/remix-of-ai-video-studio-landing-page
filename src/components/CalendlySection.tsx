import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function CalendlySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const widgetLoaded = useRef(false)

  useEffect(() => {
    if (widgetLoaded.current) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    widgetLoaded.current = true
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="umow-sie" className="py-20 lg:py-32 bg-muted" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-6">
            Umów się
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Wybierz termin rozmowy
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Zarezerwuj 30 minut na krótką rozmowę — opowiem o programie i odpowiem na Twoje pytania.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/kowal-alek/30min?hide_gdpr_banner=1&text_color=564905&primary_color=fff0f0"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

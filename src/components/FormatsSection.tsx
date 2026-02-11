import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Globe } from 'lucide-react'

const formats = [
  {
    icon: MapPin,
    label: 'Pełny program',
    title: '5 spotkań na żywo',
    description:
      'Pięć warsztatów po 45 minut, prowadzonych osobiście w Twojej szkole. Każde spotkanie to praktyczna praca z AI — uczniowie dostają materiały do dalszej nauki po każdych zajęciach.',
    details: ['5 × 45 min warsztatów na żywo', 'Materiały po każdym spotkaniu', 'Idealne dla szkół w regionie'],
  },
  {
    icon: Globe,
    label: 'Program hybrydowy',
    title: '1 spotkanie + materiały online',
    description:
      'Jedno intensywne spotkanie na żywo (90 min), które wprowadza uczniów w świat AI. Pozostałe cztery tematy dostarczam jako gotowe materiały online — z promptami, instrukcjami i ćwiczeniami do samodzielnej pracy.',
    details: ['1 × 90 min warsztatów na żywo', '4 moduły online z materiałami', 'Dla szkół spoza regionu'],
  },
]

export function FormatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="formaty" className="py-20 lg:py-32 bg-secondary/40" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Elastyczne podejście
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Warianty współpracy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dopasuję formę warsztatów do potrzeb Twojej szkoły — niezależnie od tego, czy jesteś za rogiem, czy na drugim końcu Polski.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formats.map((format, index) => {
            const Icon = format.icon
            return (
              <motion.div
                key={format.label}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
                className="border border-border bg-card rounded-lg p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                    {format.label}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-semibold mb-4">{format.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{format.description}</p>

                <ul className="mt-auto space-y-3">
                  {format.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

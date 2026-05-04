import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Globe } from 'lucide-react'
import { OnlineMaterialsCard } from './OnlineMaterialsCard'
import { useLang } from '@/lib/i18n'

export function FormatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang } = useLang()

  const t = lang === 'pl' ? {
    eyebrow: 'Elastyczne podejście',
    title: 'Warianty współpracy',
    intro: 'Dopasuję formę warsztatów do potrzeb Twojej szkoły — niezależnie od tego, czy jesteś za rogiem, czy na drugim końcu Polski.',
    formats: [
      {
        icon: MapPin,
        label: 'Pełny program',
        title: '5 spotkań na żywo',
        description: 'Pięć warsztatów po 45 minut, prowadzonych osobiście w Twojej szkole. Każde spotkanie to praktyczna praca z AI. Po zajęciach uczniowie otrzymują podstawowe materiały z promptami użytymi podczas warsztatów.',
        details: ['5 × 45 min warsztatów na żywo', 'Podstawowe materiały z promptami po zajęciach', 'Idealne dla szkół w regionie'],
      },
      {
        icon: Globe,
        label: 'Wariant skrócony',
        title: '1 dłuższe spotkanie na żywo',
        description: 'Jedno intensywne spotkanie na żywo (90 min), które wprowadza uczniów w świat AI. Po zajęciach uczniowie otrzymują podstawowe materiały z promptami użytymi podczas warsztatu.',
        details: ['1 × 90 min warsztatów na żywo', 'Podstawowe materiały z promptami po zajęciach', 'Dla szkół spoza regionu'],
      },
    ],
  } : {
    eyebrow: 'Flexible approach',
    title: 'Cooperation formats',
    intro: 'I’ll tailor the workshop format to your school’s needs — whether you’re around the corner or across the country.',
    formats: [
      {
        icon: MapPin,
        label: 'Full program',
        title: '5 live sessions',
        description: 'Five 45-minute workshops, delivered in person at your school. Each session is hands-on practice with AI. After the classes students receive base materials with the prompts used during the workshops.',
        details: ['5 × 45 min live workshops', 'Base prompt materials after class', 'Ideal for schools in the region'],
      },
      {
        icon: Globe,
        label: 'Short version',
        title: '1 longer live session',
        description: 'One intensive 90-minute live session that introduces students to the world of AI. After the workshop students receive base materials with the prompts used.',
        details: ['1 × 90 min live workshop', 'Base prompt materials after class', 'For schools outside the region'],
      },
    ],
  }

  return (
    <section id="formaty" className="py-20 lg:py-32 bg-secondary/40" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">{t.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">{t.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.formats.map((format, index) => {
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
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">{format.label}</span>
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
          <OnlineMaterialsCard isInView={isInView} />
        </div>
      </div>
    </section>
  )
}

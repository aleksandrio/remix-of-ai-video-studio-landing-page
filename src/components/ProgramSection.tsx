import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const days = [
  {
    day: 1,
    title: 'Wprowadzenie do AI',
    subtitle: 'Czym jest AI i jak z niej korzystać etycznie',
    description:
      'Uczniowie poznają podstawy sztucznej inteligencji, dowiedzą się, jak działają modele językowe i ustalą zasady odpowiedzialnego korzystania z AI w nauce.',
  },
  {
    day: 2,
    title: 'AI jako tutor',
    subtitle: 'Personalizowana nauka z gotowymi narzędziami',
    description:
      'Praktyczne ćwiczenia z narzędziami AI do nauki — od tłumaczenia trudnych koncepcji, przez tworzenie notatek, po quizy dopasowane do poziomu ucznia.',
  },
  {
    day: 3,
    title: 'Języki i konwersacje',
    subtitle: 'Ćwiczenie języków obcych z AI',
    description:
      'Uczniowie rozmawiają z AI w języku obcym, ćwiczą wymowę, gramatykę i słownictwo. AI dostosowuje poziom trudności do każdego ucznia indywidualnie.',
  },
  {
    day: 4,
    title: 'Zapamiętywanie i powtórki',
    subtitle: 'Efektywna nauka z technikami AI',
    description:
      'Fiszki, powtórki rozłożone w czasie i aktywne przypominanie — uczniowie poznają narzędzia AI, które pomagają zapamiętywać materiał na dłużej.',
  },
  {
    day: 5,
    title: 'Projekt końcowy',
    subtitle: 'Kreatywne zastosowanie AI w praktyce',
    description:
      'Uczniowie tworzą własny projekt z pomocą AI — prezentację, esej badawczy lub rozwiązanie problemu. Pokazują, że AI wspiera, a nie zastępuje myślenie.',
  },
]

export function ProgramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="program" className="py-20 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">
            5 dni warsztatów
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Program zajęć
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pięć intensywnych dni, podczas których uczniowie poznają praktyczne zastosowania AI 
            w nauce — korzystając z gotowych, sprawdzonych narzędzi.
          </p>
        </motion.div>

        {/* Info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-8 mb-16 text-sm text-muted-foreground border-y border-border py-6"
        >
          <span>Stacjonarnie w Twojej szkole</span>
          <span>Dla grup do 30 uczniów</span>
          <span>45 min / zajęcia</span>
        </motion.div>

        {/* Days — editorial list */}
        <div className="divide-y divide-border">
          {days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-10 group"
            >
              <div>
                <span className="text-xs font-semibold tracking-editorial uppercase text-muted-foreground">
                  Dzień {day.day}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {day.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-4">{day.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
